import stripe
from stripe.error import InvalidRequestError
import sqlalchemy as sa
from flask import flash
from flask import current_app as app
from app.logger import log
from app import models as m
from app import schema as s
from app.database import db


def create_stripe_customer(user: m.User):
    """Create a Stripe customer for the user."""
    customer = None
    log(log.INFO, "create_stripe_customer for user: %s", user)
    try:
        customer = stripe.Customer.create(
            description=f"Car QR Code Dealer {user.email}",
            email=user.email,
            name=f"{user.first_name} {user.last_name}",
            phone=user.phone,
            address={
                "city": user.city,
                "country": user.country,
                "line1": user.address_of_dealership,
                "postal_code": user.postal_code,
            },
            shipping={
                "address": {
                    "city": user.city,
                    "country": user.country,
                    "line1": user.address_of_dealership,
                    "postal_code": user.postal_code,
                },
                "name": f"{user.first_name} {user.last_name}",
                "phone": user.phone,
            },
        )
    except InvalidRequestError as e:
        log(log.ERROR, "create_stripe_customer: %s", e)
        flash("Error while creating a stripe customer", "danger")

    log(log.INFO, "Created stripe customer: %s", customer)
    flash("Stripe customer created successfully", "success")
    return customer


def update_stripe_customer(user: m.User):
    """Create a Stripe customer for the user."""
    log(log.INFO, "update_stripe_customer for user: %s", user)
    customer_data = s.StripeUpdateCustomer.parse_obj(
        {
            "description": f"Car QR Code Dealer {user.email}",
            "email": user.email,
            "name": f"{user.first_name} {user.last_name}",
            "phone": user.phone,
            "address": {
                "city": user.city,
                "country": user.country,
                "line1": user.address_of_dealership,
                "postal_code": user.postal_code,
                "state": user.province,
            },
            "shipping": {
                "address": {
                    "city": user.city,
                    "country": user.country,
                    "line1": user.address_of_dealership,
                    "postal_code": user.postal_code,
                    "state": user.province,
                },
                "name": f"{user.first_name} {user.last_name}",
                "phone": user.phone,
            },
        },
    )
    try:
        customer = stripe.Customer.modify(
            user.stripe_customer_id,
            **customer_data.dict(exclude_unset=True),
        )

    except InvalidRequestError as e:
        log(log.ERROR, "update_stripe_customer: %s", e)
        flash("Error while updating a stripe customer", "danger")

    log(log.INFO, "Updated stripe customer: %s", customer)
    flash("Stripe customer updated successfully", "success")
    return customer


def get_stripe_products():
    """Get stripe prices and save to DB."""
    prices = stripe.Price.list()
    log(log.INFO, "existing stripe prices: %s", prices)
    for price in prices:
        stripe_price = db.session.scalar(
            m.StripeProductPrice()
            .select()
            .where(m.StripeProductPrice.stripe_price_id == price.id)
        )
        log(log.INFO, "stripe_price: %s", stripe_price)
        if not stripe_price:
            log(log.INFO, "Creating a new stripe_price in db: %s", price)
            stripe_price = m.StripeProductPrice(
                stripe_price_id=price.id,
                currency=price.currency,
                unit_amount=price.unit_amount,
            )
            stripe_price.save()
            log(log.INFO, "New stripe_price is saved: %s", price)
            product_id = price.product
            product = db.session.scalar(
                m.StripeProduct.select().where(
                    m.StripeProduct.stripe_product_id == product_id
                )
            )
            log(log.INFO, "product: %s", product)
            if not product:
                log(log.INFO, "Retrieving stripe_product from stripe: %s", product_id)
                product = stripe.Product.retrieve(product_id)
                log(log.INFO, "Creating a new stripe_product in db: %s", product)
                m.StripeProduct(
                    stripe_product_id=product_id,
                    price_id=stripe_price.id,
                    name=product.name,
                    description=product.description,
                ).save()
                log(log.INFO, "New stripe_product is saved to db: %s", product)


def delete_stripe_products_local():
    delete_products_sql = sa.delete(m.StripeProduct)
    delete_prices_sql = sa.delete(m.StripeProductPrice)
    db.session.execute(delete_products_sql)
    db.session.commit()
    db.session.execute(delete_prices_sql)
    db.session.commit()


def create_subscription_checkout_session(
    user: m.User, subscription_product: m.StripeProduct
) -> str:
    try:
        log(log.INFO, "create_subscription_checkout_session for user: %s", user)
        checkout_session = stripe.checkout.Session.create(
            customer=user.stripe_customer_id,
            success_url=app.config.get("STRIPE_SUBSCRIPTION_SUCCESS_URL"),
            cancel_url=app.config.get("STRIPE_SUBSCRIPTION_CANCEL_URL"),
            line_items=[
                {
                    "price": subscription_product.price.stripe_price_id,
                    "quantity": 1,
                },
            ],
            mode="subscription",
            customer_update={
                "shipping": "auto",
            },
            shipping_address_collection={
                "allowed_countries": [
                    "CA",
                    "US",
                ],
            },
            automatic_tax={
                "enabled": True,
            },
        )
    except InvalidRequestError as e:
        log(log.ERROR, "Error while creating a checkout session - [%s]", e)
        flash(f"Payment error: {e}", "danger")
        return e, 400

    log(log.INFO, "Created checkout_session: %s", checkout_session)
    flash("Checkout session created successfully", "success")
    return checkout_session.url


def create_payment_subscription_checkout_session(
    user: m.User,
    label_names: list[str],
    label_ids: list[str],
    labels_quantity: int,
) -> str:
    log(log.INFO, "create_payment_subscription_checkout_session for user: %s", user)
    try:
        checkout_session = stripe.checkout.Session.create(
            customer=user.stripe_customer_id,
            success_url=app.config.get("STRIPE_SUBSCRIPTION_SUCCESS_URL"),
            cancel_url=app.config.get("STRIPE_SUBSCRIPTION_CANCEL_URL"),
            line_items=[
                {
                    "price_data": {
                        "currency": "cad",
                        "unit_amount": 2000,
                        "product_data": {
                            "name": ",".join(label_names),
                            "description": "Car QR Code Labels",
                        },
                    },
                    "quantity": labels_quantity,
                },
            ],
            payment_intent_data={
                "metadata": {
                    "user_unique_id": user.unique_id,
                    "labels_unique_ids": ",".join(label_ids),
                },
            },
            mode="payment",
            customer_update={
                "shipping": "auto",
            },
            automatic_tax={
                "enabled": True,
            },
        )
    except Exception as e:
        log(log.ERROR, "Error while creating a checkout session - [%s]", e)
        flash(flash(f"Payment error: {e}", "danger"))
        return e, 400

    log(log.INFO, "Created checkout_session: %s", checkout_session)
    flash("Checkout session created successfully", "success")
    return checkout_session.url

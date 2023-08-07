import os
import stripe
from stripe.error import InvalidRequestError
from flask import current_app as app
from app.logger import log
from app import models as m
from app.database import db


def create_stripe_customer(user: m.User):
    """Create a Stripe customer for the user."""
    customer = None
    try:
        customer = stripe.Customer.create(
            description=f"Car QR Code Dealer {user.email}",
            email=user.email,
            name=f"{user.first_name} {user.last_name}",
            phone=user.phone,
            # shipping={
            #     "address": {user.address_of_dealership},
            #     "name": f"{user.first_name} {user.last_name}",
            #     "phone": user.phone,
            # },
        )
    except InvalidRequestError as e:
        log(log.ERROR, "create_stripe_customer: %s", e)
        ...
    return customer


def get_stripe_products():
    """Get stripe prices and save to DB."""
    prices = stripe.Price.list()
    for price in prices:
        stripe_price = db.session.scalar(
            m.StripeProductPrice()
            .select()
            .where(m.StripeProductPrice.stripe_price_id == price.id)
        )
        if not stripe_price:
            stripe_price = m.StripeProductPrice(
                stripe_price_id=price.id,
                currency=price.currency,
                unit_amount=price.unit_amount,
            )
            stripe_price.save()
            log(log.INFO, "get_stripe_price: %s", price)
            product_id = price.product
            product = db.session.scalar(
                m.StripeProduct.select().where(
                    m.StripeProduct.stripe_product_id == product_id
                )
            )
            if not product:
                product = stripe.Product.retrieve(product_id)
                m.StripeProduct(
                    stripe_product_id=product_id,
                    price_id=stripe_price.id,
                    name=product.name,
                    description=product.description,
                ).save()
                log(log.INFO, "get_stripe_product: %s", product)


def delete_stripe_products_local():
    products = db.session.scalars(m.StripeProduct.select()).all()
    for product in products:
        db.session.delete(product)
        db.session.commit()
    prices = db.session.scalars(m.StripeProductPrice.select()).all()
    for price in prices:
        db.session.delete(price)
        db.session.commit()


def create_checkout_session(user: m.User, subscription_product: m.StripeProduct):
    try:
        checkout_session = stripe.checkout.Session.create(
            customer=user.stripe_customer_id,
            success_url=f"{app.config.get('STRIPE_SUBSCRIPTION_SUCCESS_URL')}/{user.unique_id}",
            cancel_url=f"{app.config.get('STRIPE_SUBSCRIPTION_CANCEL_URL')}/{user.unique_id}",
            line_items=[
                {
                    "price": subscription_product.price.stripe_price_id,
                    "quantity": 1,
                },
            ],
            mode="subscription",
            # subscription_data={
            #     "trial_end": int((datetime.now() + timedelta(days=31)).timestamp()),
            # },
        )
    except InvalidRequestError as e:
        log(log.ERROR, "Error while creating a checkout session - [%s]", e)
        ...

    return checkout_session.url

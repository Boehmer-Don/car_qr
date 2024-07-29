from datetime import datetime
import os

import stripe
from flask import (
    Blueprint,
    render_template,
    request,
    flash,
    redirect,
    url_for,
    jsonify,
)
import sqlalchemy as sa
from flask import current_app as app
from flask_mail import Message
from flask_login import current_user, login_user

from app import models as m, db, mail
from app import forms as f
from app.logger import log
from app.controllers import create_stripe_customer, create_subscription_checkout_session

stripe_blueprint = Blueprint("stripe", __name__, url_prefix="/stripe")

stripe.api_key = os.environ.get("STRIPE_SECRET_KEY")


@stripe_blueprint.route("/webhook", methods=["GET", "POST"])
def webhook():
    event = None
    payload = request.data
    sig_header = request.headers["STRIPE_SIGNATURE"]

    try:
        event = stripe.Webhook.construct_event(
            payload,
            sig_header,
            os.environ.get("ENDPOINT_SECRET"),
        )
    except Exception as e:
        raise e

    log(log.INFO, "Stripe received event: %s", event["type"])
    match event["type"]:
        case "invoice.paid":
            log(log.INFO, "INVOICE PAID EVENT\n")
            response = event["data"]["object"]
            gifts_invoice_id = response.metadata.get("gifts_invoice_id")
            log(log.INFO, "GET gifts invoice id: [%s]", gifts_invoice_id)

        case "invoice.sent":
            log(log.INFO, "INVOICE SENT EVENT\n")
            response = event["data"]["object"]
            gifts_invoice_id = response.metadata.get("gifts_invoice_id")
            log(log.INFO, "GET gifts invoice id: [%s]", gifts_invoice_id)

        case "customer.subscription.created":
            log(log.INFO, "CREATING SUBSCRIPTION EVENT\n")
            response = event["data"]["object"]
            user: m.User = db.session.scalar(
                m.User.select().where(m.User.stripe_customer_id == response.customer)
            )
            product: m.StripeProduct = db.session.scalar(
                m.StripeProduct.select().where(
                    m.StripeProduct.stripe_product_id == response.plan.product
                )
            )
            if not user:
                log(log.ERROR, "User [%s] not found", response.customer)
                return jsonify(success=False), 404
            if not product:
                log(log.ERROR, "Product [%s] not found", response.plan.product)
                return jsonify(success=False), 404
            subscription = m.Subscription(
                stripe_subscription_id=response.id,
                user_id=user.id,
                product_id=product.id,
                current_period_start=response.current_period_start,
                current_period_end=response.current_period_end,
                is_active=True,
            )
            subscription.save()
            user.activated = True

            user.save()
            login_user(user)
            log(
                log.INFO,
                "Subscription [%s] created ",
                subscription.stripe_subscription_id,
            )
        case "customer.subscription.updated":
            log(log.INFO, "UPDATING SUBSCRIPTION EVENT\n")
            response = event["data"]["object"]
            subscription: m.Subscription = db.session.scalar(
                m.Subscription.select().where(
                    m.Subscription.stripe_subscription_id == response.id
                )
            )

            subscription.is_active = not response.cancel_at_period_end
            subscription.current_period_start = response.current_period_start
            subscription.current_period_end = response.current_period_end
            subscription.save()
            product: m.StripeProduct = db.session.scalar(
                m.StripeProduct.select().where(
                    m.StripeProduct.stripe_product_id == response.plan.product
                )
            )
            log(
                log.INFO,
                "Subscription [%s] updated ",
                subscription.stripe_subscription_id,
            )
            user: m.User = db.session.scalar(
                m.User.select().where(m.User.stripe_customer_id == response.customer)
            )
            if product.name == "Advanced Plan":
                user.plan = m.UsersPlan.advanced
            elif product.name == "Basic Plan":
                user.plan = m.UsersPlan.basic
            user.save()
            log(log.INFO, "User [%s] updated. User's plan: [%s]", user, user.plan)
        case "customer.subscription.deleted":
            response = event["data"]["object"]
            user: m.User = db.session.scalar(
                m.User.select().where(m.User.stripe_customer_id == response.customer)
            )
            subscription: m.Subscription = db.session.scalar(
                m.Subscription.select().where(
                    m.Subscription.stripe_subscription_id == response.id
                )
            )
            subscription.is_active = False
            subscription.save()
            log(
                log.INFO,
                "Subscription [%s] cancelled ",
                subscription.stripe_subscription_id,
            )
            user.activated = False
            user.save()

        case "customer.updated":
            log(log.INFO, "UPDATING CUSTOMER EVENT\n")
            response = event["data"]["object"]
            user: m.User = db.session.scalar(
                m.User.select().where(m.User.stripe_customer_id == response.id)
            )
            if not user:
                log(log.ERROR, "User [%s] not found", response.id)
                return jsonify(success=False), 404
            user.first_name, user.last_name = (
                response["name"].split(" ", 1) if response["name"] else ("", "")
            )
            user.email = response["email"]
            user.country = response["address"]["country"]
            user.city = (
                response["address"]["city"] if response["address"]["city"] else ""
            )
            user.province = (
                response["address"]["state"] if response["address"]["state"] else ""
            )
            user.address_of_dealership = (
                response["address"]["line1"] if response["address"]["line1"] else ""
            )
            user.phone = response["phone"]
            user.postal_code = response["address"]["postal_code"]

            user.save()
            log(log.INFO, "User [%s] updated ", user)

        case "payment_intent.succeeded":
            log(log.INFO, "ONE TIME PAYMENT EVENT\n")
            response = event["data"]["object"]
            user = db.session.scalar(
                m.User.select().where(m.User.stripe_customer_id == response.customer)
            )
            if not user:
                log(log.ERROR, "User [%s] not found", response.customer)
                return jsonify(success=False), 404
            label_unique_ids = response.metadata.get("labels_unique_ids")
            log(
                log.INFO,
                "Payment intent succeeded. LABEL IDS ARE:\n [%s]",
                label_unique_ids,
            )
            label_unique_ids_list = (
                label_unique_ids.split(",") if label_unique_ids else []
            )
            gifts_invoice_id = response.metadata.get("gifts_invoice_id")
            gifts_invoice = db.session.scalar(
                sa.select(m.GiftsInvoice).where(m.GiftsInvoice.id == gifts_invoice_id)
            )
            if gifts_invoice:
                log(log.INFO, "Gifts invoice [%s] updated", gifts_invoice_id)
                gifts_invoice.is_paid = True
                db.session.commit()

            if not label_unique_ids_list:
                log(log.ERROR, "Labels not found in metadata")
                return jsonify(success=True)

            labels_queryset = []
            for label_id in label_unique_ids_list:
                label: m.Label = db.session.scalar(
                    m.Label.select().where(m.Label.unique_id == label_id)
                )
                if not label:
                    log(log.ERROR, "Label [%s] not found", label_id)
                    continue
                label.date_activated = datetime.now()
                label.status = m.LabelStatus.active
                label.save()
                labels_queryset.append(label)

                # Cancel pending stickers
                sticker: m.Sticker = db.session.scalar(
                    m.Sticker.select().where(m.Sticker.code == label.sticker_id)
                )
                if sticker:
                    sticker.pending = False
                    sticker.save()

            # Notification to admin
            msg = Message(
                subject="New label is activated",
                sender=app.config["MAIL_DEFAULT_SENDER"],
                recipients=[user.email],
            )
            url = url_for(
                "labels.get_active_labels",
                user_unique_id=user.unique_id,
                _external=True,
            )

            msg.html = render_template(
                "email/invoice_notification.html",
                user=user,
                url=url,
                labels=labels_queryset,
                total_amount=(response.amount_received) / 100,
                payment_date=datetime.fromtimestamp(response.created),
                total_amount_with_tax=((response.amount_received) / 100) * 0.12,
            )
            mail.send(msg)
            log(
                log.INFO,
                "Email notification sent to [%s] about labels payment [%s]",
                user.email,
                label,
            )
        case _:
            log(log.ERROR, "Unhandled event type %s", event["type"])
            return jsonify(success=False), 404

    return jsonify(success=True)


# @stripe_blueprint.route("/test", methods=["GET", "POST"])
# def test():
#     labels = db.session.query(m.Label).all()[0:5]
#     return render_template(
#         "email/invoice_notification.html",
#         user=current_user,
#         url="https://google.com",
#         labels=labels,
#         total_amount=100,
#         payment_date=datetime.fromtimestamp(1701350851),
#     )


@stripe_blueprint.route("/subscription", methods=["GET", "POST"])
def subscription():
    form: f.SubscriptionPlanForm = f.SubscriptionPlanForm()
    if form.validate_on_submit():
        # get users stripe plan
        product = db.session.scalar(
            m.StripeProduct.select().where(
                m.StripeProduct.name == form.selected_plan.data
            )
        )
        if not product:
            log(log.ERROR, "Stripe product not found: [%s]", form.selected_plan.data)
            flash("Something went wrong. Please try again later.", "danger")
            return redirect(url_for("stripe.subscription"))

        log(log.INFO, "Pay plan is chosen to change. User: [%s]", current_user)

        if not current_user.stripe_customer_id:
            log(log.INFO, "Creating stripe customer for user: [%s]", current_user)
            stripe_user = create_stripe_customer(current_user)
            current_user.stripe_customer_id = stripe_user.id
            current_user.save()
        stripe_form_url = create_subscription_checkout_session(current_user, product)
        return redirect(stripe_form_url)
    elif form.is_submitted():
        log(log.ERROR, "Form submitted error: [%s]", form.errors)
        flash("Something went wrong. Please try again later.", "danger")
        return redirect(url_for("stripe.subscription"))

    return render_template(
        "user/subscription_update.html",
        user=current_user,
        form=form,
        user_unique_id=current_user.unique_id,
    )


@stripe_blueprint.route("/portal", methods=["GET"])
def portal():
    log(log.INFO, "User [%s] is going to stripe portal", current_user)
    try:
        portal_response = stripe.billing_portal.Session.create(
            customer=current_user.stripe_customer_id,
        )
    except Exception as e:
        log(log.ERROR, "stripe_portal: %s", e)
        flash("Something went wrong. Please try again later.", "danger")

    log(log.INFO, "User [%s] is redirected to stripe portal", current_user)
    return redirect(portal_response.url, code=302)

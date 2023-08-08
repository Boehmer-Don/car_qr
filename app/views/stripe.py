# flake8: noqa F401
import stripe
import os
from datetime import datetime
from flask import (
    Blueprint,
    render_template,
    request,
    flash,
    redirect,
    url_for,
    jsonify,
)
from flask_login import login_required, current_user
import sqlalchemy as sa
from flask import current_app as app
from app.controllers import create_pagination
from app import models as m, db
from app import forms as f
from app.logger import log
from app.controllers.jinja_globals import days_active

stripe_blueprint = Blueprint("stripe", __name__, url_prefix="/stripe")

# stripe.api_key = os.environ.get("STRIPE_PUBLIC_KEY")
stripe.api_key = os.environ.get("STRIPE_SECRET_KEY")


@stripe_blueprint.route("/webhook", methods=["POST"])
def webhook():
    event = None
    payload = request.data
    sig_header = request.headers["STRIPE_SIGNATURE"]

    try:
        event = stripe.Webhook.construct_event(
            payload, sig_header, os.environ.get("ENDPOINT_SECRET")
        )
    except Exception as e:
        raise e

    if event["type"] == "customer.subscription.created":
        response = event["data"]["object"]
        user: m.User = db.session.scalar(
            m.User.select().where(m.User.stripe_customer_id == response.customer)
        )
        subscription = m.Subscription(
            stripe_subscription_id=response.id,
            user_id=user.id,
            product_id=response.plan.product,
            current_period_start=response.current_period_start,
            current_period_end=response.current_period_end,
            is_active=True,
        )
        subscription.save()
    elif event["type"] == "customer.subscription.updated":
        response = event["data"]["object"]
    elif event["type"] == "customer.subscription.deleted":
        response = event["data"]["object"]
    else:
        print("Unhandled event type {}".format(event["type"]))

    return jsonify(success=True)

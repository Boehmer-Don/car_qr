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


@stripe_blueprint.route("/stripe", methods=["POST"])
@login_required
def stripe_payment():
    return {}

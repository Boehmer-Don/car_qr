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


dealer_blueprint = Blueprint("labels", __name__, url_prefix="/labels")


@dealer_blueprint.route("/active", methods=["GET"])
@login_required
def get_active_labels():
    return render_template("label/labels_active.html")


@dealer_blueprint.route("/archived", methods=["GET"])
@login_required
def get_archived_labels():
    ...


@dealer_blueprint.route("/deactivate/<label_unique_id>", methods=["GET", "POST"])
@login_required
def deactivate_label(label_unique_id: str):
    ...


@dealer_blueprint.route("/info", methods=["GET"])
@login_required
def label_details():
    ...


@dealer_blueprint.route("/amount", methods=["GET", "POST"])
@login_required
def new_label_set_amount():
    ...


@dealer_blueprint.route("/details/<label_unique_id>", methods=["GET", "POST"])
@login_required
def new_label_set_details(label_unique_id: str):
    """
    Label fields:
    id
    label_unique_id
    name
    make
    vehicle_model
    year
    mileage
    color
    trim
    type_of_vehicle
    price
    date_received
    url
    views

    """
    ...


@dealer_blueprint.route("/payment/<label_unique_id>", methods=["GET", "POST"])
@login_required
def new_label_payment(label_unique_id: str):
    ...


@dealer_blueprint.route("/l/<label_unique_id>")
def redirect_to_outer_url(label_unique_id: str):
    # Counter
    return redirect(url_outer)

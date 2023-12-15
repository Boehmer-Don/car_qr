# flake8: noqa F401

from datetime import datetime, timedelta

from flask import (
    Blueprint,
    render_template,
    request,
    flash,
    redirect,
    url_for,
    send_file,
)
from flask_login import login_required, current_user
from flask_mail import Message, Mail
import sqlalchemy as sa
from flask import current_app as app
from app.controllers import (
    create_pagination,
    create_payment_subscription_checkout_session,
)
from app import models as m, db
from app import forms as f
from app.logger import log
from app.controllers.date_convert import date_convert
from app.controllers.graphs import create_graph

location_blueprint = Blueprint(
    "labels/locations", __name__, url_prefix="/labels/locations"
)


@location_blueprint.route("/create", methods=["GET", "POST"])
@login_required
def create_label():
    log(log.INFO, "Creating label location")
    form = f.LabelLocationForm()

    if request.method == "POST":
        if form.validate_on_submit():
            label_location = m.LabelLocation(
                user_id=current_user.id,
                name=form.name.data,
            )
            db.session.add(label_location)
            db.session.commit()
            flash("Label location created successfully.", "success")
            log(log.INFO, f"Label location created: {label_location}")
            return redirect(
                url_for(
                    "labels.new_label_set_details",
                    user_unique_id=current_user.unique_id,
                    amount=1,
                )
            )
        else:
            log(log.ERROR, "Error creating label location. [%s]", form.errors)
            flash("Error creating label location.", "danger")

    return render_template(
        "label/location/add_modal.html", form=form, unique_id="add-label-location"
    )

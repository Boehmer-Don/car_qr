# flake8: noqa F401
from flask import (
    Blueprint,
    render_template,
    flash,
    redirect,
    url_for,
)
from flask_login import login_required, current_user
from app.controllers import (
    role_required,
)
from app import models as m, db
from app import forms as f
from app.logger import log

location_blueprint = Blueprint(
    "labels/locations", __name__, url_prefix="/labels/locations"
)


@location_blueprint.route("/create", methods=["GET"])
@login_required
@role_required([m.UsersRole.admin.value, m.UsersRole.dealer.value])
def get_location_modal():
    """htmx"""
    log(log.INFO, "get label location from")
    form = f.LabelLocationForm()

    return render_template(
        "label/location/modal.html",
        form=form,
    )


@location_blueprint.route("/create", methods=["POST"])
@login_required
@role_required([m.UsersRole.admin.value, m.UsersRole.dealer.value])
def create_location():
    """htmx"""
    log(log.INFO, "Creating label location")
    form = f.LabelLocationForm()

    if not form.validate_on_submit():
        log(log.ERROR, "Error creating label location. [%s]", form.errors)
        flash("Error creating label location.", "danger")
        return redirect(
            url_for(
                "labels.new_label_set_details",
                user_unique_id=current_user.unique_id,
                amount=1,
            )
        )
    label_location = m.LabelLocation(
        user_id=current_user.id,
        name=form.name.data,
    )
    db.session.add(label_location)
    db.session.commit()
    log(log.INFO, f"Label location created: {label_location}")
    flash("Label location created successfully.", "success")

    return redirect(
        url_for(
            "labels.new_label_set_details",
            user_unique_id=current_user.unique_id,
            amount=1,
        )
    )

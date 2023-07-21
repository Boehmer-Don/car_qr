# flake8: noqa F401
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
    query = (
        m.Label.select()
        .where(m.Label.user_id == current_user.id)
        .where(m.Label.active)
        .order_by(m.Label.id)
    )
    count_query = (
        sa.select(sa.func.count())
        .select_from(m.Label)
        .where(m.Label.user_id == current_user.id)
        .where(m.Label.active)
    )
    pagination = create_pagination(total=db.session.scalar(count_query))
    return render_template(
        "label/labels_active.html",
        labels=db.session.execute(
            query.offset((pagination.page - 1) * pagination.per_page).limit(
                pagination.per_page
            )
        ).scalars(),
        page=pagination,
    )


@dealer_blueprint.route("/archived", methods=["GET"])
@login_required
def get_archived_labels():
    query = (
        m.Label.select()
        .where(m.Label.user_id == current_user.id)
        .where(m.Label.active == False)
        .order_by(m.Label.id)
    )
    count_query = (
        sa.select(sa.func.count())
        .select_from(m.Label)
        .where(m.Label.user_id == current_user.id)
        .where(m.Label.active == False)
    )
    pagination = create_pagination(total=db.session.scalar(count_query))
    return render_template(
        "label/labels_archived.html",
        labels=db.session.execute(
            query.offset((pagination.page - 1) * pagination.per_page).limit(
                pagination.per_page
            )
        ).scalars(),
        page=pagination,
    )


@dealer_blueprint.route("/deactivate/<label_unique_id>", methods=["GET", "POST"])
@login_required
def deactivate_label(label_unique_id: str):
    ...


@dealer_blueprint.route("/edit", methods=["GET", "POST"])
@login_required
def label_details():
    form: f.UserForm = f.UserForm()
    if form.validate_on_submit():
        query = m.User.select().where(m.User.id == int(form.user_id.data))
        user: m.User | None = db.session.scalar(query)
        if not user:
            log(log.ERROR, "Not found user by id : [%s]", form.user_id.data)
            flash("Failed to find user", "danger")
        user.first_name = form.first_name.data
        user.last_name = form.last_name.data
        user.email = form.email.data
        if form.password.data.strip("*\n "):
            user.password = form.password.data
        user.save()
        if form.next_url.data:
            return redirect(form.next_url.data)
        return redirect(url_for("user.get_all"))

    else:
        log(log.ERROR, "User save errors: [%s]", form.errors)
        flash(f"{form.errors}", "danger")
        return redirect(url_for("user.get_all"))


@dealer_blueprint.route("/amount", methods=["GET", "POST"])
@login_required
def new_label_set_amount():
    return render_template("label/new_label.html")


@dealer_blueprint.route("/reporting", methods=["GET", "POST"])
@login_required
def reporting():
    return render_template("label/reporting.html")


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
    return redirect("url_outer")

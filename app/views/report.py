# flake8: noqa F401
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


report_blueprint = Blueprint("report", __name__, url_prefix="/report")


@report_blueprint.route("/all", methods=["GET", "POST"])
@login_required
def dashboard():
    """
    Time of Day
    Views
    Vehicle Type
    Make
    Model
    Price Range
    """

    views_filter = "NA"
    type_filter = "All"
    make_filter = "All"
    model_filter = "All"
    if request.method == "POST":
        views_filter = request.form.get("views_filter")
        type_filter = request.form.get("type_filter")
        make_filter = request.form.get("make_filter")
        model_filter = request.form.get("model_filter")

    if views_filter == "Asc":
        order_by = m.Label.views.asc()
    elif views_filter == "Desc":
        order_by = m.Label.views.desc()
    else:
        order_by = m.Label.id

    query = (
        m.Label.select().where(m.Label.user_id == current_user.id).order_by(order_by)
    )
    count_query = (
        sa.select(sa.func.count())
        .select_from(m.Label)
        .where(m.Label.user_id == current_user.id)
    )

    if make_filter and make_filter != "All":
        query = query.where(m.Label.make == make_filter)
        count_query = count_query.where(m.Label.make == make_filter)
    if model_filter and model_filter != "All":
        query = query.where(m.Label.vehicle_model == model_filter)
        count_query = count_query.where(m.Label.vehicle_model == model_filter)
    if type_filter and type_filter != "All":
        query = query.where(m.Label.type_of_vehicle == type_filter)
        count_query = count_query.where(m.Label.type_of_vehicle == type_filter)
    if views_filter == "Asc":
        query = query.order_by(m.Label.views.asc())
    elif views_filter == "Desc":
        query = query.order_by(m.Label.views.desc())

    pagination = create_pagination(total=db.session.scalar(count_query))
    labels = (
        db.session.execute(
            query.offset((pagination.page - 1) * pagination.per_page).limit(
                pagination.per_page
            )
        )
        .scalars()
        .all()
    )
    types = list(
        set(
            [
                label.type_of_vehicle
                for label in db.session.scalars(
                    m.Label.select().where(m.Label.user_id == current_user.id)
                ).all()
            ]
        )
    )
    makes = list(
        set(
            [
                label.make
                for label in db.session.scalars(
                    m.Label.select().where(m.Label.user_id == current_user.id)
                ).all()
            ]
        )
    )
    if make_filter and make_filter != "All":
        models = list(
            set(
                [
                    label.vehicle_model
                    for label in db.session.scalars(
                        m.Label.select()
                        .where(m.Label.user_id == current_user.id)
                        .where(m.Label.make == make_filter)
                    ).all()
                ]
            )
        )
    else:
        models = list(
            set(
                [
                    label.vehicle_model
                    for label in db.session.scalars(
                        m.Label.select().where(m.Label.user_id == current_user.id)
                    ).all()
                ]
            )
        )

    return render_template(
        "report/dashboard.html",
        labels=labels,
        makes=makes,
        make_filter=make_filter,
        models=models,
        model_filter=model_filter,
        types=types,
        type_filter=type_filter,
        views_filter=views_filter,
        page=pagination,
    )


@report_blueprint.route("/makefilter", methods=["GET", "POST"])
@login_required
def makefilter():
    make = request.json.get("makeSelected")
    labels = db.session.scalars(
        m.Label.select()
        .where(m.Label.user_id == current_user.id)
        .where(m.Label.make == make)
    ).all()
    models = list(set([label.vehicle_model for label in labels]))
    return {"models": models}


@report_blueprint.route("/delete", methods=["GET", "POST"])
@login_required
def delete():
    ...
    return redirect(url_for("report.get_all"))

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
    make_filter = None
    if request.method == "POST":
        make_filter = request.form.get("make_filter")

    query = (
        m.Label.select().where(m.Label.user_id == current_user.id).order_by(m.Label.id)
    )
    count_query = (
        sa.select(sa.func.count())
        .select_from(m.Label)
        .where(m.Label.user_id == current_user.id)
    )

    if make_filter:
        query = query.where(m.Label.make == make_filter)
        count_query = count_query.where(m.Label.make == make_filter)
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
    makes = [
        label.make
        for label in set(
            db.session.scalars(
                m.Label.select().where(m.Label.user_id == current_user.id)
            ).all()
        )
    ]

    return render_template(
        "report/dashboard.html",
        labels=labels,
        makes=makes,
        make_filter=make_filter,
        page=pagination,
    )


@report_blueprint.route("/delete", methods=["GET", "POST"])
@login_required
def deactivate_label():
    ...
    return redirect(url_for("report.get_all"))

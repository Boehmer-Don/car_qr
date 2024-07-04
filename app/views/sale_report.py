# flake8: noqa E712
import io
import json
from datetime import datetime
from flask import (
    Blueprint,
    render_template,
    request,
    flash,
    redirect,
    session,
    url_for,
    Response,
)
from flask_login import login_required, current_user, login_user, logout_user
from flask_mail import Message
import sqlalchemy as sa

from app.controllers import create_pagination, role_required
from app import models as m, db
from app import forms as f
from app.logger import log

sale_report = Blueprint("sale_report", __name__, url_prefix="/sale-reports")


@sale_report.route("/", methods=["GET"])
@login_required
@role_required([m.UsersRole.seller])
def get_all():
    log(log.INFO, "Getting sale reports")
    stmt = sa.and_(
        m.SaleReport.seller_id == current_user.id,
    )
    query = sa.select(m.SaleReport).where(stmt).order_by(m.SaleReport.created_at.desc())
    count_query = sa.select(sa.func.count()).where(stmt).select_from(m.SaleReport)

    pagination = create_pagination(total=db.session.scalar(count_query))

    return render_template(
        "sale_report/sale_reports.html",
        sale_reports=db.session.execute(
            query.offset((pagination.page - 1) * pagination.per_page).limit(
                pagination.per_page
            )
        ).scalars(),
        page=pagination,
    )

# flake8: noqa E712

from datetime import datetime

from pydantic import ValidationError
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
from app.schema import ad_gift_boxes
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


@sale_report.route("/<sale_rep_unique_id>/gift-box-modal", methods=["GET"])
@login_required
@role_required([m.UsersRole.seller])
def gift_boxs_modal(sale_rep_unique_id: str):

    sale_report = db.session.scalar(
        sa.select(m.SaleReport).where(m.SaleReport.unique_id == sale_rep_unique_id)
    )

    if not sale_report or sale_report.seller_id != current_user.id:
        log(
            log.ERROR,
            "Sale report not found [%s], or not owned by current user",
            sale_rep_unique_id,
        )
        return render_template(
            "toast.html", message="Sale report not found", category="danger"
        )

    form = f.GiftBoxForm()
    form.sale_rep_unique_id.data = sale_rep_unique_id

    gift_boxs = db.session.scalars(sa.select(m.GiftItem)).all()
    defualt_amount = (
        db.session.scalar(
            sa.select(m.GiftItem.price).where(m.GiftItem._is_default.is_(True))
        )
        or 0
    )

    return render_template(
        "sale_report/gift_box_modal.html",
        gift_boxs=gift_boxs,
        sale_report=sale_report,
        defualt_amount=defualt_amount,
        form=form,
    )


@sale_report.route("/set-gift-boxes", methods=["POST"])
@login_required
@role_required([m.UsersRole.seller])
def set_gift_boxes():
    form = f.GiftBoxForm()
    if not form.validate_on_submit():
        log(log.ERROR, "Form validation failed [%s]", form.errors)
        flash(f"Form validation failed [{form.format_errors}]", "danger")
        return redirect(url_for("sale_report.get_all"))

    try:
        gift_boxes = ad_gift_boxes.validate_json(form.gift_boxes.data)
    except ValidationError as e:
        log(log.ERROR, "Gift boxes json validation failed [%s]", e)
        flash("Gift boxes validation failed ", "danger")
        return redirect(url_for("sale_report.get_all"))

    # TODO: Add gift boxes to sale report

    return redirect(url_for("sale_report.get_all"))

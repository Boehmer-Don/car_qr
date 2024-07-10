# flake8: noqa E712

from datetime import datetime

from pydantic import ValidationError
from flask import (
    Blueprint,
    render_template,
    flash,
    redirect,
    url_for,
)
from flask_login import login_required, current_user
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
        sa.not_(sa.exists().where(m.OilChange.sale_rep_id == m.SaleReport.id)),
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


@sale_report.route("/panding-oil", methods=["GET"])
@login_required
@role_required([m.UsersRole.seller])
def get_all_panding_oil():
    log(log.INFO, "Get all panding oil")
    stmt = sa.and_(
        m.SaleReport.seller_id == current_user.id,
        sa.exists().where(m.OilChange.sale_rep_id == m.SaleReport.id),
    )
    query = sa.select(m.SaleReport).where(stmt).order_by(m.SaleReport.created_at.desc())
    count_query = sa.select(sa.func.count()).where(stmt).select_from(m.SaleReport)

    pagination = create_pagination(total=db.session.scalar(count_query))

    return render_template(
        "sale_report/sale_reports_panding_oil.html",
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
    """htmx"""
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

    sale_report = db.session.scalar(
        sa.select(m.SaleReport).where(
            m.SaleReport.unique_id == form.sale_rep_unique_id.data
        )
    )

    if (
        not sale_report
        or sale_report.seller_id != current_user.id
        or sale_report.with_gift_boxes
    ):
        log(
            log.ERROR,
            "Sale report not found [%s], or not owned by current user or already has gift boxes",
            form.sale_rep_unique_id.data,
        )
        flash("Sale report not found", "danger")
        return redirect(url_for("sale_report.get_all"))

    try:
        gift_boxes = ad_gift_boxes.validate_json(form.gift_boxes.data)
    except ValidationError as e:
        log(log.ERROR, "Gift boxes json validation failed [%s]", e)
        flash("Gift boxes validation failed ", "danger")
        return redirect(url_for("sale_report.get_all"))

    if not gift_boxes:
        log(log.ERROR, "Gift boxes is empty")
        flash("Gift boxes is empty", "danger")
        return redirect(url_for("sale_report.get_all"))

    total_amount = sum(box.total_price for box in gift_boxes)

    if total_amount > sale_report.available_amount:
        log(
            log.ERROR,
            "Gift boxes total amount [%s] is greater than available amount [%s]",
            total_amount,
            sale_report.available_amount,
        )
        flash("Gift boxes total amount is greater than available amount", "danger")
        return redirect(url_for("sale_report.get_all"))

    for box in gift_boxes:
        gift_item = db.session.get(m.GiftItem, box.gift_item_id)
        if not gift_item:
            log(log.ERROR, "Gift item not found [%s]", box.gift_item_id)
            flash(f"Gift item not found [{box.gift_item_id}]", "danger")
            return redirect(url_for("sale_report.get_all"))

        db.session.add(
            m.GiftBox(
                sale_result_id=sale_report.id,
                gift_item_id=box.gift_item_id,
                description=gift_item.description,
                qty=box.qty,
                total_price=box.total_price,
            )
        )

    bouyer = m.User(
        first_name=form.first_name.data,
        last_name=form.last_name.data,
        email=form.email.data,
        phone=form.phone.data,
        password=form.password.data,
        role=m.UsersRole.buyer,
        activated=True,
    )

    sale_report.buyer = bouyer

    db.session.commit()

    flash("Gift boxes added successfully", "success")
    return redirect(
        url_for("sale_report.get_all", sale_rep_unique_id=sale_report.unique_id)
    )


@sale_report.route("/<sale_rep_unique_id>/oil-change-modal", methods=["GET"])
@login_required
@role_required([m.UsersRole.seller])
def oil_change_modal(sale_rep_unique_id: str):
    """htmx"""

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

    if sale_report.oil_changes:
        log(
            log.ERROR,
            "Sale report [%s] is already completed",
            sale_rep_unique_id,
        )
        return render_template(
            "toast.html", message="Sale report is already completed", category="success"
        )

    form = f.OilChangeForm()
    form.sale_rep_unique_id.data = sale_rep_unique_id
    today = datetime.now().strftime("%m-%d-%Y")

    return render_template("sale_report/oil_change_modal.html", form=form, today=today)


@sale_report.route("/oil-change-modal", methods=["POST"])
@login_required
@role_required([m.UsersRole.seller])
def set_oil_change_modal():
    """htmx"""
    form = f.OilChangeForm()
    if not form.validate_on_submit():
        log(log.ERROR, "Form validation failed [%s]", form.errors)
        flash(f"Form validation failed [{form.format_errors}]", "danger")
        return redirect(url_for("sale_report.get_all"))

    if not form.is_notfy_by_email.data and not form.is_notfy_by_phone.data:
        log(log.ERROR, "Notify by email or phone is not selected")
        flash("Notify by email or phone is not selected", "danger")
        return redirect(url_for("sale_report.get_all"))

    sale_report = db.session.scalar(
        sa.select(m.SaleReport).where(
            m.SaleReport.unique_id == form.sale_rep_unique_id.data
        )
    )

    if not sale_report or sale_report.seller_id != current_user.id:
        log(
            log.ERROR,
            "Sale report not found [%s], or not owned by current user",
            form.sale_rep_unique_id.data,
        )
        flash("Sale report not found", "danger")
        return redirect(url_for("sale_report.get_all"))

    if sale_report.oil_changes:
        log(
            log.ERROR,
            "Sale report [%s] is already completed",
            form.sale_rep_unique_id.data,
        )
        flash("Sale report is already completed", "success")
        return redirect(url_for("sale_report.get_all"))

    try:
        first_oil_change = datetime.strptime(form.first_oil_change.data, "%Y-%m-%d")
        second_oil_change = datetime.strptime(form.second_oil_change.data, "%Y-%m-%d")
    except ValueError as e:
        log(log.ERROR, "Date validation failed [%s]", e)
        flash("Date validation failed", "danger")
        return redirect(url_for("sale_report.get_all"))

    db.session.add(m.OilChange(sale_rep_id=sale_report.id, date=first_oil_change))
    db.session.add(
        m.OilChange(
            sale_rep_id=sale_report.id,
            date=second_oil_change,
        )
    )

    sale_report.is_notfy_by_email = form.is_notfy_by_email.data
    sale_report.is_notfy_by_phone = form.is_notfy_by_phone.data

    db.session.commit()
    flash("Oil change data added successfully", "success")
    return redirect(url_for("sale_report.get_all"))


@sale_report.route("/<sale_rep_unique_id>/edit-modal", methods=["GET"])
@login_required
@role_required([m.UsersRole.seller])
def edit_modal(sale_rep_unique_id: str):
    """htmx"""

    sale_report = db.session.scalar(
        sa.select(m.SaleReport).where(m.SaleReport.unique_id == sale_rep_unique_id)
    )

    if (
        not sale_report
        or sale_report.seller_id != current_user.id
        or not sale_report.buyer
        or len(sale_report.oil_changes) < 2
    ):
        log(
            log.ERROR,
            "Sale report not found [%s], or not owned by current user",
            sale_rep_unique_id,
        )
        return render_template(
            "toast.html", message="Sale report not found", category="danger"
        )

    form = f.EditSaleRepForm()
    form.sale_rep_unique_id.data = sale_rep_unique_id
    form.unique_id.data = sale_report.buyer.unique_id

    today = datetime.now().strftime("%m-%d-%Y")

    return render_template(
        "sale_report/edit_sale_rep_modal.html",
        form=form,
        sale_report=sale_report,
        buyer=sale_report.buyer,
        today=today,
    )


@sale_report.route("/edit", methods=["POST"])
@login_required
@role_required([m.UsersRole.seller])
def edit():

    form = f.EditSaleRepForm()

    if not form.validate_on_submit():
        log(log.ERROR, "Form validation failed [%s]", form.errors)
        flash(f"Form validation failed [{form.format_errors}]", "danger")
        return redirect(url_for("sale_report.get_all_panding_oil"))

    sale_report = db.session.scalar(
        sa.select(m.SaleReport).where(
            m.SaleReport.unique_id == form.sale_rep_unique_id.data
        )
    )

    if (
        not sale_report
        or sale_report.seller_id != current_user.id
        or not sale_report.buyer
        or len(sale_report.oil_changes) < 2
    ):
        log(
            log.ERROR,
            "Sale report not found [%s], or not owned by current user",
            form.sale_rep_unique_id.data,
        )
        flash("Sale report not found", "danger")
        return redirect(url_for("sale_report.get_all_panding_oil"))

    first_oil_change = sale_report.oil_changes[0]
    second_oil_change = sale_report.oil_changes[1]
    try:
        if form.first_oil_change.data:
            first_oil_change.date = datetime.strptime(
                form.first_oil_change.data, "%Y-%m-%d"
            )
        if form.second_oil_change.data:
            second_oil_change.date = datetime.strptime(
                form.second_oil_change.data, "%Y-%m-%d"
            )
    except ValueError as e:
        log(log.ERROR, "Date validation failed [%s]", e)
        flash("Date validation failed", "danger")
        return redirect(url_for("sale_report.get_all"))

    sale_report.is_notfy_by_email = form.is_notfy_by_email.data
    sale_report.is_notfy_by_phone = form.is_notfy_by_phone.data

    sale_report.buyer.first_name = form.first_name.data
    sale_report.buyer.last_name = form.last_name.data
    sale_report.buyer.email = form.email.data
    sale_report.buyer.phone = form.phone.data
    if form.new_password.data:
        sale_report.buyer.password = form.new_password.data

    db.session.commit()
    flash("Sale report updated successfully", "success")
    return redirect(url_for("sale_report.get_all_panding_oil"))

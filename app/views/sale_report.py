from datetime import date, datetime

import sqlalchemy as sa
from flask import Blueprint, flash, redirect, render_template, request, url_for
from flask import current_app as app
from flask_login import current_user, login_required
from flask_mail import Message
from pydantic import ValidationError

from app import db, mail
from app import forms as f
from app import models as m
from app import schema as s
from app.controllers import create_pagination, role_required
from app.logger import log
from app.schema import ad_gift_boxes

# from .utils import DATE_FORMAT


sale_report = Blueprint("sale_report", __name__, url_prefix="/sale-reports")


@sale_report.route("/", methods=["GET"])
@login_required
@role_required([m.UsersRole.seller])
def get_all():
    log(log.INFO, "Getting sale reports")
    stmt = sa.and_(
        m.SaleReport.seller_id == current_user.id,
        sa.not_(sa.exists().where(m.GiftBox.sale_result_id == m.SaleReport.id)),
    )
    query = (
        sa.select(m.SaleReport)
        .where(stmt)
        .distinct()
        .order_by(m.SaleReport.created_at.desc())
    )
    count_query = (
        sa.select(sa.func.count()).where(stmt).distinct().select_from(m.SaleReport)
    )

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
    query = (
        sa.select(m.SaleReport)
        .join(m.SaleReport.oil_changes)
        .where(
            m.SaleReport.seller_id == current_user.id,
            m.OilChange.is_done.is_(False),
            sa.exists().where(m.GiftBox.sale_result_id == m.SaleReport.id),
        )
        .group_by(m.SaleReport.id)
        .order_by(m.SaleReport.created_at.desc())
    )
    count_query = (
        sa.select(sa.func.count())
        .join(m.SaleReport.oil_changes)
        .where(
            m.SaleReport.seller_id == current_user.id,
            m.OilChange.is_done.is_(False),
            sa.exists().where(m.GiftBox.sale_result_id == m.SaleReport.id),
        )
        .group_by(m.SaleReport.id)
        .select_from(m.SaleReport)
    )

    pagination = create_pagination(total=db.session.scalar(count_query) or 0)

    return render_template(
        "sale_report/sale_reports_panding_oil.html",
        sale_reports=db.session.execute(
            query.offset((pagination.page - 1) * pagination.per_page).limit(
                pagination.per_page
            )
        ).scalars(),
        page=pagination,
    )


@sale_report.route("/expired-oil", methods=["GET"])
@login_required
@role_required([m.UsersRole.seller])
def get_all_expired_oil():
    log(log.INFO, "Get all expired oil")

    sort_status = request.args.get(
        "q", type=s.SaleReportSort, default=s.SaleReportSort.all
    )

    where_stmt = sa.and_(
        m.SaleReport.seller_id == current_user.id,
        m.SaleReport.oil_changes.any(sa.func.DATE(m.OilChange.date) < date.today()),
    )

    if sort_status == s.SaleReportSort.done:
        where_stmt = sa.and_(
            m.SaleReport.seller_id == current_user.id,
            m.SaleReport.oil_changes.any(m.OilChange.is_done.is_(True)),
        )
    elif sort_status == s.SaleReportSort.expired:
        where_stmt = sa.and_(
            m.SaleReport.seller_id == current_user.id,
            m.SaleReport.oil_changes.any(sa.func.DATE(m.OilChange.date) < date.today()),
            m.SaleReport.oil_changes.any(m.OilChange.is_done.is_(False)),
        )

    query = (
        sa.select(m.SaleReport)
        .join(m.SaleReport.oil_changes)
        .where(where_stmt)
        .distinct()
        .order_by(m.SaleReport.created_at.desc())
    )
    count_query = (
        sa.select(sa.func.count())
        .join(m.SaleReport.oil_changes)
        .where(where_stmt)
        .distinct()
        .select_from(m.SaleReport)
    )

    pagination = create_pagination(total=db.session.scalar(count_query))

    return render_template(
        "sale_report/sale_reports_expired_oil.html",
        sale_reports=db.session.execute(
            query.offset((pagination.page - 1) * pagination.per_page).limit(
                pagination.per_page
            )
        ).scalars(),
        page=pagination,
        sort_status=sort_status,
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

    dealer_gift_boxes = db.session.scalars(
        sa.select(m.DealerGiftItem).where(
            m.DealerGiftItem.dealer_id == sale_report.label.user_id,
            m.DealerGiftItem.is_deleted.is_(False),
        )
    ).all()

    today = datetime.now().strftime("%m-%d-%Y")

    return render_template(
        "sale_report/gift_box_modal.html",
        gift_boxs=dealer_gift_boxes,
        sale_report=sale_report,
        form=form,
        today=today,
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

    if not form.is_notfy_by_email.data and not form.is_notfy_by_phone.data:
        log(log.ERROR, "Notify by email or phone is not selected")
        flash("Notify by email or phone is not selected", "danger")
        return redirect(url_for("sale_report.get_all"))

    # try:
    #     first_oil_change = datetime.strptime(form.first_oil_change.data, DATE_FORMAT)
    #     second_oil_change = datetime.strptime(form.second_oil_change.data, DATE_FORMAT)

    #     if first_oil_change.date() >= second_oil_change.date():
    #         raise ValueError("First oil change date should be greater than second")
    # except ValueError as e:
    #     log(log.ERROR, "Date validation failed [%s]", e)
    #     flash(f"Date validation failed Error: {e}", "danger")
    #     return redirect(url_for("sale_report.get_all"))

    total_amount = sum(box.total_price for box in gift_boxes)

    if round(total_amount, 1) > round(sale_report.available_amount, 1):
        log(
            log.ERROR,
            "Gift boxes total amount [%s] is greater than available amount [%s]",
            total_amount,
            sale_report.available_amount,
        )
        flash("Gift boxes total amount is greater than available amount", "danger")
        return redirect(url_for("sale_report.get_all"))

    new_gift_boxes = []
    for box in gift_boxes:
        gift_item = db.session.get(m.DealerGiftItem, box.dealer_gift_item_id)
        if not gift_item or gift_item.is_deleted:
            log(log.ERROR, "Dealer gift item not found [%s]", box.dealer_gift_item_id)
            flash(f"Dealer gift item not found [{box.dealer_gift_item_id}]", "danger")
            return redirect(url_for("sale_report.get_all"))
        gift_box = m.GiftBox(
            sale_result_id=sale_report.id,
            dealer_gift_item_id=box.dealer_gift_item_id,
            price=gift_item.origin_item.price,
            description=gift_item.origin_item.description,
            _sku=gift_item.origin_item.SKU,
            qty=box.qty,
            total_price=round(box.total_price, 2),
            dealer_id=gift_item.dealer_id,
        )
        db.session.add(gift_box)
        new_gift_boxes.append(gift_box)

    # db.session.add(m.OilChange(sale_rep_id=sale_report.id, date=first_oil_change))
    # db.session.add(
    #     m.OilChange(
    #         sale_rep_id=sale_report.id,
    #         date=second_oil_change,
    #     )
    # )

    sale_report.is_notfy_by_email = form.is_notfy_by_email.data
    sale_report.is_notfy_by_phone = form.is_notfy_by_phone.data

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

    gift_box_users = db.session.scalars(
        sa.select(m.User).where(
            m.User.role == m.UsersRole.picker,
            m.User.deleted.is_(False),
            m.User._creator_id == sale_report.seller.creator_id,
        )
    ).all()

    if not gift_box_users:
        log(log.ERROR, "Dealers not found [%s]", sale_report.seller.creator_id)
        return redirect(url_for("sale_report.get_all"))

    # TODO can take time
    for user in gift_box_users:
        msg = Message(
            subject="Gift Box Notifications",
            sender=app.config["MAIL_DEFAULT_SENDER"],
            recipients=[user.email],
        )

        msg.html = render_template(
            "email/gift_box_notifications.html",
            user=user,
            new_gift_boxes=new_gift_boxes,
            sale_report=sale_report,
        )
        mail.send(msg)

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

    # first_oil_change = sale_report.oil_changes[0]
    # second_oil_change = sale_report.oil_changes[1]
    # try:
    #     if form.first_oil_change.data:
    #         first_oil_change.date = datetime.strptime(
    #             form.first_oil_change.data, DATE_FORMAT
    #         )
    #     if form.second_oil_change.data:
    #         second_oil_change.date = datetime.strptime(
    #             form.second_oil_change.data, DATE_FORMAT
    #         )
    #     if first_oil_change.date.date() >= second_oil_change.date.date():
    #         raise ValueError("First oil change date should be greater than second")
    # except ValueError as e:
    #     log(log.ERROR, "Date validation failed [%s]", e)
    #     flash(f"Date validation failed Error: {e}", "danger")
    #     return redirect(url_for("sale_report.get_all_panding_oil"))

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


@sale_report.route("/<sale_rep_unique_id>/buyer", methods=["GET"])
@login_required
@role_required([m.UsersRole.seller])
def buyer_modal_info(sale_rep_unique_id):
    sale_report = db.session.scalar(
        sa.select(m.SaleReport).where(m.SaleReport.unique_id == sale_rep_unique_id)
    )

    if (
        not sale_report
        or sale_report.seller_id != current_user.id
        or not sale_report.buyer
    ):
        log(
            log.ERROR,
            "Sale report not found [%s], or not owned by current user",
            sale_rep_unique_id,
        )
        return render_template(
            "toast.html", message="Sale report not found", category="danger"
        )

    return render_template("sale_report/buyer_info.html", buyer=sale_report.buyer)


# TODO Features The system will then use the preferred contact defined by customer to remind them of their oil change 1 week before & the day before. If it is the home phone, it will send the sales rep an email asking them to call. Once both dates pass, it is removed from this page & archived for now  # noqa: E501

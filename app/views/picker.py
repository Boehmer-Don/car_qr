# flake8: noqa F401

from flask import (
    Blueprint,
    render_template,
    flash,
    redirect,
    url_for,
)
import sqlalchemy as sa
from flask_login import login_required, current_user
from app.controllers import (
    role_required,
)
from app import models as m, db
from app import forms as f
from app.controllers.pagination import create_pagination
from app.logger import log


picker = Blueprint("picker", __name__, url_prefix="/pickers")


@picker.route("/", methods=["GET"])
@login_required
@role_required([m.UsersRole.dealer])
def get_all():
    log(log.INFO, "Getting all pickers")

    where_stmt = sa.and_(
        m.User.role == m.UsersRole.picker,
        m.User.activated,
        m.User.deleted.is_(False),
    )

    query = sa.select(m.User).where(where_stmt).order_by(m.User.created_at.desc())
    count_query = sa.select(sa.func.count()).where(where_stmt).select_from(m.User)

    pagination = create_pagination(total=db.session.scalar(count_query))

    return render_template(
        "picker/pickers.html",
        pickers=db.session.execute(
            query.offset((pagination.page - 1) * pagination.per_page).limit(
                pagination.per_page
            )
        ).scalars(),
        page=pagination,
    )


@picker.route("/sale-reports", methods=["GET"])
@login_required
@role_required([m.UsersRole.picker])
def sale_reports():
    log(log.INFO, "Getting all sale reports for picker")

    query = (
        sa.select(m.SaleReport)
        .join(m.SaleReport.seller)
        .join(m.SaleReport.gift_boxes)
        .where(
            m.SaleReport.seller.has(m.User._creator_id == current_user._creator_id),
            m.SaleReport.gift_boxes.any(m.GiftBox.is_completed.is_(False)),
        )
        .group_by(m.SaleReport.id)
        .order_by(m.SaleReport.created_at.desc())
    )
    count_query = (
        sa.select(sa.func.count())
        .join(m.SaleReport.seller)
        .join(m.SaleReport.gift_boxes)
        .where(
            m.SaleReport.seller.has(m.User._creator_id == current_user._creator_id),
            m.SaleReport.gift_boxes.any(m.GiftBox.is_completed.is_(False)),
        )
        .group_by(m.SaleReport.id)
        .select_from(m.SaleReport)
    )

    pagination = create_pagination(total=db.session.scalar(count_query) or 0)

    return render_template(
        "picker/sale_reports.html",
        sale_reports=db.session.execute(
            query.offset((pagination.page - 1) * pagination.per_page).limit(
                pagination.per_page
            )
        ).scalars(),
        page=pagination,
    )


@picker.route("/sale-reports-history", methods=["GET"])
@login_required
@role_required([m.UsersRole.picker])
def sale_reports_history():
    log(log.INFO, "Getting all sale reports history for picker")

    query = (
        sa.select(m.SaleReport)
        .join(m.SaleReport.seller)
        .join(m.SaleReport.gift_boxes)
        .where(
            m.SaleReport.seller.has(m.User._creator_id == current_user._creator_id),
            m.SaleReport.gift_boxes.any(m.GiftBox.is_completed.is_(True)),
        )
        .group_by(m.SaleReport.id)
        .order_by(m.SaleReport.created_at.desc())
    )
    count_query = (
        sa.select(sa.func.count())
        .join(m.SaleReport.seller)
        .join(m.SaleReport.gift_boxes)
        .where(
            m.SaleReport.seller.has(m.User._creator_id == current_user._creator_id),
            m.SaleReport.gift_boxes.any(m.GiftBox.is_completed.is_(True)),
        )
        .group_by(m.SaleReport.id)
        .select_from(m.SaleReport)
    )

    pagination = create_pagination(total=db.session.scalar(count_query) or 0)

    return render_template(
        "picker/sale_reports_history.html",
        sale_reports=db.session.execute(
            query.offset((pagination.page - 1) * pagination.per_page).limit(
                pagination.per_page
            )
        ).scalars(),
        page=pagination,
    )


@picker.route("/<sale_report_unique_id>/gift-boxes", methods=["GET"])
@login_required
@role_required([m.UsersRole.picker])
def sale_reports_gift_boxes(sale_report_unique_id: str):
    """htmx"""
    log(log.INFO, f"Getting all gift boxes for sale report [{sale_report_unique_id}]")

    sale_report = db.session.scalar(
        sa.select(m.SaleReport).where(m.SaleReport.unique_id == sale_report_unique_id)
    )

    if not sale_report or not sale_report.gift_boxes:
        log(log.INFO, f"Sale report not found [{sale_report_unique_id}]")
        return render_template(
            "toast.html", message="Sale report not found", toast_type="danger"
        )

    form = f.CompleteAllBoex()
    form.sale_report_unique_id.data = sale_report.unique_id

    return render_template(
        "picker/sale_report_gift_boxes.html",
        sale_report=sale_report,
        gift_boxes=sale_report.gift_boxes,
        form=form,
    )


@picker.route("/gift-boxes", methods=["POST"])
@login_required
@role_required([m.UsersRole.picker])
def sale_reports_gift_boxes_complete():
    form = f.CompleteAllBoex()
    if not form.validate_on_submit():
        log(log.INFO, f"Invalid form data [{form.format_errors}]")
        flash(f"Invalid form data [{form.format_errors}]", "danger")
        return redirect(url_for("picker.sale_reports"))
    sale_report = db.session.scalar(
        sa.select(m.SaleReport).where(
            m.SaleReport.unique_id == form.sale_report_unique_id.data
        )
    )

    if not sale_report or not sale_report.gift_boxes:
        log(log.INFO, f"Sale report not found [{form.sale_report_unique_id.data}]")
        flash(f"Invalid form data [{form.format_errors}]", "danger")
        return redirect(url_for("picker.sale_reports"))

    if not sale_report.gift_boxes_completed:
        for gift_box in sale_report.gift_boxes:
            gift_box.is_completed = True
        db.session.commit()
        flash("All gift boxes are completed", "success")

    return redirect(url_for("picker.sale_reports"))


@picker.route("/add-modal", methods=["GET"])
@login_required
@role_required([m.UsersRole.dealer])
def add_modal():
    """htmx"""
    form = f.PickerForm()

    return render_template(
        "picker/add_modal.html",
        form=form,
    )


@picker.route("/add", methods=["POST"])
@login_required
@role_required([m.UsersRole.dealer])
def add():
    form = f.PickerForm()
    if not form.validate_on_submit():
        log(log.INFO, f"Invalid form data [{form.format_errors}]")
        flash(f"Invalid form data [{form.format_errors}]", "danger")
        return redirect(url_for("picker.get_all"))

    m.User(
        email=form.email.data,
        first_name=form.name.data,
        role=m.UsersRole.picker,
        activated=True,
        creator_id=current_user.id,
        password=form.password.data,
    ).save()

    return redirect(url_for("picker.get_all"))


@picker.route("/<picker_unique_id>/edit-modal", methods=["GET"])
@login_required
@role_required([m.UsersRole.dealer])
def edit_modal(picker_unique_id: str):
    """htmx"""

    picker = db.session.scalar(
        sa.select(m.User).where(
            m.User.unique_id == picker_unique_id, m.User.role == m.UsersRole.picker
        )
    )

    if not picker or picker.creator_id != current_user.id:
        log(log.INFO, f"Picker not found or not allowed to edit [{picker_unique_id}]")
        return render_template(
            "toast.html", message="picker not found", toast_type="danger"
        )

    form = f.EditPickerForm()
    form.picker_unique_id.data = picker.unique_id
    form.email.data = picker.email
    form.name.data = picker.first_name

    return render_template(
        "picker/edit_modal.html",
        form=form,
        picker=picker,
    )


@picker.route("/edit", methods=["POST"])
@login_required
@role_required([m.UsersRole.dealer])
def edit():
    form = f.EditPickerForm()
    if not form.validate_on_submit():
        log(log.INFO, f"Invalid form data [{form.format_errors}]")
        flash(f"Invalid form data [{form.format_errors}]", "danger")
        return redirect(url_for("picker.get_all"))

    picker = db.session.scalar(
        sa.select(m.User).where(
            m.User.unique_id == form.picker_unique_id.data,
            m.User.role == m.UsersRole.picker,
        )
    )

    if not picker or picker.creator_id != current_user.id:
        log(
            log.INFO,
            f"Pikcer not found or not allowed to edit [{form.picker_unique_id.data}]",
        )
        flash("Gift box user not found", "danger")
        return redirect(url_for("picker.get_all"))

    picker.email = form.email.data
    picker.first_name = form.name.data

    if form.new_password.data:
        picker.password = form.new_password.data

    db.session.commit()

    return redirect(url_for("picker.get_all"))

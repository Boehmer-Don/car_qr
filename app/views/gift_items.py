from flask import (
    Blueprint,
    render_template,
    flash,
    redirect,
    url_for,
)
from flask_login import login_required, current_user
import sqlalchemy as sa

from app.controllers import create_pagination, role_required, save_file
from app import models as m, db
from app import forms as f
from app.logger import log

gift_item = Blueprint("gift_item", __name__, url_prefix="/gift-items")


@gift_item.route("/", methods=["GET"])
@login_required
@role_required([m.UsersRole.admin])
def get_all():
    log(log.INFO, "Getting all gift items")
    query = sa.select(m.GiftItem).order_by(m.GiftItem.created_at.desc())
    count_query = sa.select(sa.func.count()).select_from(m.GiftItem)

    pagination = create_pagination(total=db.session.scalar(count_query))

    return render_template(
        "gift_item/gift_items.html",
        gift_items=db.session.execute(
            query.offset((pagination.page - 1) * pagination.per_page).limit(
                pagination.per_page
            )
        ).scalars(),
        page=pagination,
    )


@gift_item.route("/dealer", methods=["GET"])
@login_required
@role_required([m.UsersRole.dealer])
def get_all_dealer():
    log(log.INFO, "Getting all gift items for dealer")
    query = (
        sa.select(m.DealerGiftItem)
        .where(
            m.DealerGiftItem.dealer_id == current_user.id,
            m.DealerGiftItem.is_deleted.is_(False),
        )
        .order_by(m.DealerGiftItem.created_at.desc())
    )
    count_query = (
        sa.select(sa.func.count())
        .where(
            m.DealerGiftItem.dealer_id == current_user.id,
            m.DealerGiftItem.is_deleted.is_(False),
        )
        .select_from(m.DealerGiftItem)
    )

    pagination = create_pagination(total=db.session.scalar(count_query))
    return render_template(
        "gift_item/dealer_gift_items.html",
        dealer_gift_items=db.session.execute(
            query.offset((pagination.page - 1) * pagination.per_page).limit(
                pagination.per_page
            )
        ).scalars(),
        page=pagination,
    )


@gift_item.route("/add-modal", methods=["GET"])
@login_required
@role_required([m.UsersRole.admin])
def add_modal():
    """htmx"""
    log(log.INFO, "Getting gift item add modal")
    form = f.GiftItemForm()
    return render_template("gift_item/add_modal.html", form=form)


@gift_item.route("/", methods=["POST"])
@login_required
@role_required([m.UsersRole.admin])
def add():
    log(log.INFO, "Adding gift item")
    form = f.GiftItemForm()
    if not form.validate_on_submit():
        log(log.ERROR, f"Invalid data [{form.format_errors}]")
        flash(f"Invalid data [{form.format_errors}]", "danger")
        return redirect(url_for("gift_item.get_all"))

    image_path = m.DEFUALT_IMAGE_PATH
    if form.image.data:
        image_path = save_file(form.image.data, is_img=True)

    gift_item = m.GiftItem(
        description=form.description.data,
        SKU=form.SKU.data,
        price=form.price.data,
        min_qty=form.min_qty.data,
        max_qty=form.max_qty.data,
        is_default=form.is_default.data,
        is_available=form.make_available.data,
        image_path=str(image_path),
    )
    db.session.add(gift_item)
    db.session.commit()

    if form.apply_to_all.data:
        dealers = db.session.scalars(
            sa.select(m.User).where(
                m.User.role == m.UsersRole.dealer, m.User.deleted.is_(False)
            )
        )

        for dealer in dealers:
            dealer_gift_item = m.DealerGiftItem(
                gift_item_id=gift_item.id,
                dealer_id=dealer.id,
                min_qty=gift_item.min_qty,
                max_qty=gift_item.max_qty,
            )
            db.session.add(dealer_gift_item)
        db.session.commit()
    flash("Gift Item added successfully", "success")
    return redirect(url_for("gift_item.get_all"))


@gift_item.route("/<unique_id>/edit-modal", methods=["GET"])
@login_required
@role_required([m.UsersRole.admin])
def edit_modal(unique_id: str):
    """htmx"""
    log(log.INFO, "Getting gift item edit modal")
    item = db.session.scalar(
        sa.select(m.GiftItem).where(m.GiftItem.unique_id == unique_id)
    )
    if not item:
        log(log.ERROR, f"Gift item with unique id [{unique_id}] not found")
        return render_template(
            "toast.html", message="Gift item not found", category="danger"
        )
    form = f.EditGiftItemForm()
    form.gift_item_unique_id.data = item.unique_id
    form.description.data = item.description
    form.price.data = item.price
    form.SKU.data = item.SKU
    form.min_qty.data = item.min_qty
    form.max_qty.data = item.max_qty
    form.is_default.data = item.is_default
    form.make_available.data = item.is_available
    return render_template("gift_item/edit_modal.html", form=form, item=item)


@gift_item.route("/edit", methods=["POST"])
@login_required
@role_required([m.UsersRole.admin])
def edit():
    log(log.INFO, "Getting gift item edit")
    form = f.EditGiftItemForm()
    if not form.validate_on_submit():
        log(log.ERROR, f"Invalid data [{form.format_errors}]")
        flash(f"Invalid data [{form.format_errors}]", "danger")
        return redirect(url_for("gift_item.get_all"))

    item = db.session.scalar(
        sa.select(m.GiftItem).where(
            m.GiftItem.unique_id == form.gift_item_unique_id.data
        )
    )
    if not item:
        log(
            log.ERROR,
            f"Gift item with unique id [{form.gift_item_unique_id.data}] not found",
        )
        flash("Gift item not found", "danger")
        return redirect(url_for("gift_item.get_all"))

    item.description = form.description.data
    item.price = form.price.data
    item.min_qty = form.min_qty.data
    item.SKU = form.SKU.data
    item.max_qty = form.max_qty.data
    item.is_default = form.is_default.data
    item.is_available = form.make_available.data
    if form.image.data:
        item.image_path = str(save_file(form.image.data, is_img=True))

    db.session.commit()
    flash("Gift Item updated successfully", "success")
    return redirect(url_for("gift_item.get_all"))

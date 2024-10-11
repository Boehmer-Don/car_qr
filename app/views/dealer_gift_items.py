# flake8: noqa E712
from flask import (
    Blueprint,
    render_template,
    request,
)
from flask_login import login_required

import sqlalchemy as sa

from app import models as m, db
from app.controllers.user import role_required
from app.logger import log

bp = Blueprint("gift_item", __name__, url_prefix="/gift-items")


@bp.route("/<unique_id>/gift-items-modal", methods=["GET"])
@login_required
@role_required([m.UsersRole.admin])
def gift_items_modal(unique_id: str):
    """htmx"""

    user = db.session.scalar(sa.select(m.User).where(m.User.unique_id == unique_id))
    if not user:
        log(log.ERROR, "Not found user by id : [%s]", unique_id)
        return render_template(
            "toast.html", message="User not found", category="danger"
        )

    user_gift_items_ids = tuple(item.gift_item_id for item in user.gift_items)

    dealer_gift_items = db.session.scalars(
        sa.select(m.DealerGiftItem).where(
            m.DealerGiftItem.dealer_id == user.id,
            m.DealerGiftItem.is_deleted.is_(False),
        )
    ).all()

    avaleble_gift_items = db.session.scalars(
        sa.select(m.GiftItem).where(
            m.GiftItem.is_available.is_(True), m.GiftItem.id.not_in(user_gift_items_ids)
        )
    ).all()

    return render_template(
        "user/dealer_gift_item/gift_items_modal.html",
        avaleble_gift_items=avaleble_gift_items,
        dealer_gift_items=dealer_gift_items,
        user_gift_items_ids=user_gift_items_ids,
        user=user,
    )


@bp.route(
    "/<user_unique_id>/gift-item/<dealer_item_unque_id>/delete",
    methods=["DELETE"],
)
@login_required
@role_required([m.UsersRole.admin])
def dealer_gift_item(user_unique_id: str, dealer_item_unque_id: str):
    """htmx"""
    user = db.session.scalar(
        sa.select(m.User).where(m.User.unique_id == user_unique_id)
    )
    if not user:
        log(log.ERROR, "Not found user by id : [%s]", user_unique_id)
        return render_template(
            "toast.html", message="User not found", category="danger"
        )
    dealer_gift_item = db.session.scalar(
        sa.select(m.DealerGiftItem).where(
            m.DealerGiftItem.unique_id == dealer_item_unque_id,
            m.DealerGiftItem.is_deleted.is_(False),
        )
    )
    if not dealer_gift_item or dealer_gift_item.dealer_id != user.id:
        log(log.ERROR, "Not found dealer gift item by id : [%s]", dealer_item_unque_id)
        return render_template(
            "toast.html", message="Gift item not found", category="danger"
        )

    gift_item = dealer_gift_item.origin_item
    dealer_gift_item.is_deleted = True
    db.session.commit()
    log(log.INFO, "Gift item deleted from user: [%s]", user)

    if gift_item.is_available:
        return render_template(
            "user/dealer_gift_item/user_gift_item.html", item=gift_item, user=user
        )

    return render_template(
        "toast.html", message="Dealer gift item deleted", category="success"
    )


@bp.route(
    "/<user_unique_id>/gift-item/<gift_item_unque_id>/add",
    methods=["POST"],
)
@login_required
@role_required([m.UsersRole.admin])
def add_dealer_gift_item(user_unique_id: str, gift_item_unque_id: str):
    """htmx"""
    user = db.session.scalar(
        sa.select(m.User).where(m.User.unique_id == user_unique_id)
    )
    if not user:
        log(log.ERROR, "Not found user by id : [%s]", user_unique_id)
        return render_template(
            "toast.html", message="User not found", category="danger"
        )
    gift_item = db.session.scalar(
        sa.select(m.GiftItem).where(m.GiftItem.unique_id == gift_item_unque_id)
    )
    if not gift_item:
        log(log.ERROR, "Not found gift item by id : [%s]", gift_item_unque_id)
        return render_template(
            "toast.html", message="Gift item not found", category="danger"
        )

    dealer_gift_item = db.session.scalar(
        sa.select(m.DealerGiftItem).where(
            m.DealerGiftItem.dealer_id == user.id,
            m.DealerGiftItem.gift_item_id == gift_item.id,
            m.DealerGiftItem.is_deleted.is_(False),
        )
    )

    if dealer_gift_item:
        log(log.ERROR, "Gift item already exists: [%s]", dealer_gift_item)
        return render_template(
            "toast.html",
            message="Gift item already exists",
            category="danger",
        )

    user_gift_item = m.DealerGiftItem(
        dealer_id=user.id,
        gift_item_id=gift_item.id,
        min_qty=gift_item.min_qty,
        max_qty=gift_item.max_qty,
    )
    user_gift_item.save()
    log(log.INFO, "Gift item added to user: [%s]", user)

    return render_template(
        "user/dealer_gift_item/user_gift_item.html", item=user_gift_item, user=user
    )


@bp.route(
    "/<dealer_item_unque_id>/edit",
    methods=["GET"],
)
@login_required
@role_required([m.UsersRole.admin])
def edit_dealer_gift_item(dealer_item_unque_id: str):
    """htmx"""
    dealer_gift_item = db.session.scalar(
        sa.select(m.DealerGiftItem).where(
            m.DealerGiftItem.unique_id == dealer_item_unque_id,
            m.DealerGiftItem.is_deleted.is_(False),
        )
    )
    if not dealer_gift_item:
        log(log.ERROR, "Not found dealer gift item by id : [%s]", dealer_item_unque_id)
        return render_template(
            "toast.html", message="Gift item not found", category="danger"
        )

    return render_template(
        "user/dealer_gift_item/edit_user_gift_item.html",
        item=dealer_gift_item,
        user=dealer_gift_item.dealer,
    )


@bp.route(
    "/<dealer_item_unque_id>/edit",
    methods=["POST"],
)
@login_required
@role_required([m.UsersRole.admin])
def save_dealer_gift_item(dealer_item_unque_id: str):
    """htmx"""
    dealer_gift_item = db.session.scalar(
        sa.select(m.DealerGiftItem).where(
            m.DealerGiftItem.unique_id == dealer_item_unque_id,
            m.DealerGiftItem.is_deleted.is_(False),
        )
    )
    if not dealer_gift_item:
        log(log.ERROR, "Not found dealer gift item by id : [%s]", dealer_item_unque_id)
        return render_template(
            "toast.html", message="Gift item not found", category="danger"
        )

    min_qty = request.form.get("min_qty", type=int)
    max_qty = request.form.get("max_qty", type=int)
    if not min_qty or not max_qty or min_qty >= max_qty:
        log(log.ERROR, "Min qty or max qty is empty")
        return render_template(
            "user/dealer_gift_item/user_gift_item.html",
            item=dealer_gift_item,
            user=dealer_gift_item.dealer,
            message="Please enter correct data",
            category="danger",
        )

    dealer_gift_item.min_qty = min_qty
    dealer_gift_item.max_qty = max_qty
    db.session.commit()

    return render_template(
        "user/dealer_gift_item/user_gift_item.html",
        item=dealer_gift_item,
        user=dealer_gift_item.dealer,
    )

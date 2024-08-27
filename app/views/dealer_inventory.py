import json
from datetime import datetime

from flask import (
    Blueprint,
    flash,
    redirect,
    render_template,
    request,
    url_for,
)
from flask_login import login_required
from pydantic import ValidationError
import sqlalchemy as sa

from app.controllers import create_pagination
from app import models as m, db
from app import schema as s
from app import forms as f
from app.controllers import get_gift_boxes_data, get_replenishment
from app.controllers.user import role_required

from app.logger import log
from app.models import get_week_range


bp = Blueprint("inventory", __name__, url_prefix="/inventory")


@bp.route("/dealers", methods=["GET"])
@login_required
@role_required([m.UsersRole.admin])
def dealers():

    q = request.args.get("q", default="")
    week = request.args.get("week", default="")

    where_stmt = sa.and_(
        m.User.activated,
        m.User.deleted.is_(False),
        m.User.role == m.UsersRole.dealer,
    )

    if q:
        where_stmt = sa.and_(
            where_stmt,
            sa.or_(
                sa.func.lower(m.User.first_name).ilike(f"%{q.lower()}%"),
                sa.func.lower(m.User.last_name).ilike(f"%{q.lower()}%"),
                sa.func.lower(m.User.email).ilike(f"%{q.lower()}%"),
                sa.func.lower(m.User.name_of_dealership).ilike(f"%{q.lower()}%"),
                sa.func.lower(m.User.address_of_dealership).ilike(f"%{q.lower()}%"),
            ),
        )

    if week:
        start_date, end_date = get_week_range(week)
        where_stmt = sa.and_(
            where_stmt,
            sa.func.DATE(m.GiftBox.created_at) <= end_date.date(),
            start_date.date() <= sa.func.DATE(m.GiftBox.created_at),
        )

    query = (
        sa.select(m.User)
        .outerjoin(m.GiftBox, m.GiftBox.dealer_id == m.User.id)
        .where(
            where_stmt,
        )
        .group_by(m.User.id)
        .order_by(m.User.id)
    )
    count_query = (
        sa.select(sa.func.count())
        .outerjoin(m.GiftBox, m.GiftBox.dealer_id == m.User.id)
        .where(
            where_stmt,
        )
        .group_by(m.User.id)
        .select_from(m.User)
    )

    pagination = create_pagination(total=db.session.scalar(count_query) or 0)

    return render_template(
        "user/inventory/dealers.html",
        dealers=db.session.execute(
            query.offset((pagination.page - 1) * pagination.per_page).limit(
                pagination.per_page
            )
        ).scalars(),
        page=pagination,
        q=q,
        week=week,
    )


@bp.route("/dealers/<unique_id>", methods=["GET"])
@login_required
@role_required([m.UsersRole.admin])
def view_orders(unique_id: str):
    """htmx"""

    dealer = db.session.scalar(sa.select(m.User).where(m.User.unique_id == unique_id))

    if not dealer:
        log(log.ERROR, f"Dealer not found: {unique_id}")
        return render_template(
            "toast.html", message="Dealer not found", category="danger"
        )
    week = request.args.get("week", default="")
    start_date, end_date = get_week_range(week)

    gift_boxes_data = get_gift_boxes_data(start_date, end_date, dealer.id)

    return render_template(
        "user/inventory/view_orders_modal.html",
        gift_boxes_data=gift_boxes_data,
        start_date=start_date,
        end_date=end_date,
    )


@bp.route("/dealers/<unique_id>/replenishment", methods=["GET"])
@login_required
@role_required([m.UsersRole.admin])
def view_replenishment(unique_id: str):
    """htmx"""

    dealer = db.session.scalar(sa.select(m.User).where(m.User.unique_id == unique_id))
    if not dealer:
        log(log.ERROR, f"Dealer not found: {unique_id}")
        return render_template(
            "toast.html", message="Dealer not found", category="danger"
        )
    week = request.args.get("week", default="")
    form = f.ReplenishAllInventoryForm()
    start_date, end_date = get_week_range(week)

    gift_boxes_data = get_gift_boxes_data(start_date, end_date, dealer.id)

    gift_boxes_without_replenishment: list[s.ReplenishmentGiftBoxe] = []
    replenishment_gift_boxes: list[s.ReplenishmentGiftBoxe] = []
    for sku, total_quantity, delaer_gift_item in gift_boxes_data:
        if delaer_gift_item.max_qty - total_quantity > delaer_gift_item.min_qty:
            continue
        replenishment = get_replenishment(
            start_date, end_date, sku, delaer_gift_item.id
        )
        status = s.ReplenishmentStatus.mark_as_removed

        if replenishment:
            status = (
                s.ReplenishmentStatus.done
                if replenishment.is_done
                else s.ReplenishmentStatus.removed
            )

        item = s.ReplenishmentGiftBoxe(
            sku=sku,
            total_quantity=total_quantity,
            delaer_gift_item=delaer_gift_item,
            status=status,
        )
        replenishment_gift_boxes.append(item)
        if status == s.ReplenishmentStatus.mark_as_removed:
            gift_boxes_without_replenishment.append(item)

    form.dealers_gift_box_data.data = json.dumps(
        [box.model_dump() for box in gift_boxes_without_replenishment]
    )
    form.week.data = week
    is_all_replenished = len(gift_boxes_without_replenishment) > 0

    return render_template(
        "user/inventory/view_replenishments_modal.html",
        replenishment_gift_boxes=replenishment_gift_boxes,
        start_date=start_date,
        end_date=end_date,
        week=week,
        form=form,
        is_all_replenished=is_all_replenished,
    )


@bp.route("/mark_as_unreplenishment/<unique_id>/<sku>", methods=["POST"])
@login_required
@role_required([m.UsersRole.admin])
def mark_as_unreplenishment(unique_id: str, sku: str):

    week = request.args.get("week", default="")
    delaer_gift_item = db.session.scalar(
        sa.select(m.DealerGiftItem).where(m.DealerGiftItem.unique_id == unique_id)
    )
    if not delaer_gift_item:
        log(log.ERROR, f"Dealer gift item not found: {unique_id}")
        return render_template(
            "toast.html", message="Dealer gift item not found", category="danger"
        )

    start_date, end_date = get_week_range(week)
    if get_replenishment(start_date, end_date, sku, delaer_gift_item.id):
        log(log.INFO, f"Replenishment already exists: {unique_id} {sku}")
        return render_template(
            "toast.html", message="Replenishment already exists", category="danger"
        )

    gift_boxes_data = db.session.scalars(
        sa.select(
            m.GiftBox,
        ).where(
            sa.func.DATE(m.GiftBox.created_at) <= end_date.date(),
            start_date.date() <= sa.func.DATE(m.GiftBox.created_at),
            m.GiftBox._sku == sku,
            m.GiftBox.dealer_gift_item_id == delaer_gift_item.id,
        )
    ).all()
    total_qty = sum(gift_box.qty for gift_box in gift_boxes_data)

    created_at = datetime.now()

    if created_at.date() > end_date.date():
        created_at = end_date

    replenishment = m.DealerGiftIteRreplenishment(
        sku=sku,
        dealer_gift_item_id=delaer_gift_item.id,
        created_at=created_at,
    )
    db.session.add(replenishment)
    db.session.commit()

    return render_template(
        "user/inventory/order.html",
        delaer_gift_item=delaer_gift_item,
        total_qty=total_qty,
        sku=sku,
    )


@bp.route("/replenish_all", methods=["POST"])
@login_required
@role_required([m.UsersRole.admin])
def replenish_all():
    form = f.ReplenishAllInventoryForm()
    if not form.validate_on_submit():

        log(log.ERROR, "Invalid form data for replenish all")
        flash("Invalid form data", "danger")
        return redirect(url_for("user.inventory.dealers"))

    week = form.week.data
    try:
        dealers_gift_box_data = s.adapter_re_gift_boxes.validate_json(
            form.dealers_gift_box_data.data
        )
    except ValidationError as e:
        log(log.ERROR, f"Invalid dealers data: {e}")
        flash("Invalid dealers data", "danger")
        return redirect(url_for("user.inventory.dealers"))

    start_date, end_date = get_week_range(week)

    for dealer_data in dealers_gift_box_data:
        delear_gift_item = db.session.scalar(
            sa.select(m.DealerGiftItem).where(
                m.DealerGiftItem.unique_id == dealer_data.delaer_gift_item.unique_id
            )
        )
        if not delear_gift_item:
            log(
                log.ERROR,
                f"Dealer gift item not found: {dealer_data.delaer_gift_item.unique_id}",
            )
            flash("Dealer gift item not found", "danger")
            return redirect(url_for("user.inventory.dealers", week=week))

        if get_replenishment(
            start_date, end_date, dealer_data.sku, delear_gift_item.id
        ):
            log(
                log.INFO,
                f"Replenishment already exists: {delear_gift_item.id} {dealer_data.sku}",
            )
            continue

        created_at = datetime.now()

        if created_at.date() > end_date.date():
            created_at = end_date

        replenishment = m.DealerGiftIteRreplenishment(
            sku=dealer_data.sku,
            dealer_gift_item_id=delear_gift_item.id,
            created_at=created_at,
            is_done=True,
        )
        db.session.add(replenishment)
    db.session.commit()
    flash("Replenishment has done", "success")

    return redirect(url_for("user.inventory.dealers", week=week))

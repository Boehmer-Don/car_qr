from flask import (
    Blueprint,
    render_template,
    request,
)
from flask_login import login_required
import sqlalchemy as sa

from app.controllers import create_pagination
from app import models as m, db
from app.controllers.user import role_required
from app.logger import log
from app.models import get_week_range


bp = Blueprint("invantory", __name__, url_prefix="/invantory")


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
            start_date.date() < sa.func.DATE(m.GiftBox.created_at),
            sa.func.DATE(m.GiftBox.created_at) < end_date.date(),
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
        "user/invantory/dealers.html",
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
    need_replenishment = request.args.get(
        "need_replenishment", type=bool, default=False
    )
    if not dealer:
        log(log.ERROR, f"Dealer not found: {unique_id}")
        return render_template(
            "toast.html", message="Dealer not found", category="danger"
        )
    week = request.args.get("week", default="")
    start_date, end_date = get_week_range(week)

    total_quantity = sa.func.sum(m.GiftBox.qty).label("total_quantity")

    gift_boxes_data = db.session.execute(
        sa.select(
            m.GiftBox._sku,
            total_quantity,
            m.DealerGiftItem,
        )
        .join(m.DealerGiftItem, m.GiftBox.dealer_gift_item_id == m.DealerGiftItem.id)
        .where(
            start_date.date() < sa.func.DATE(m.GiftBox.created_at),
            sa.func.DATE(m.GiftBox.created_at) < end_date.date(),
            m.GiftBox.dealer_id == dealer.id,
        )
        .group_by(m.GiftBox._sku, m.DealerGiftItem.id, m.GiftBox.dealer_id)
        .order_by(m.GiftBox.dealer_id.asc())
    ).all()

    gift_boxes_data = [
        {
            "sku": sku,
            "total_quantity": total_quantity,
            "delaer_gift_item": delaer_gift_item,
            "is_enough": delaer_gift_item.max_qty - total_quantity
            > delaer_gift_item.min_qty,
        }
        for sku, total_quantity, delaer_gift_item in gift_boxes_data
    ]

    return render_template(
        "user/invantory/view_orders_modal.html",
        gift_boxes_data=gift_boxes_data,
        start_date=start_date,
        end_date=end_date,
        need_replenishment=need_replenishment,
        week=week,
    )


@bp.route("/mark_as_unreplenishment/<unique_id>/<sku>", methods=["POST"])
@login_required
@role_required([m.UsersRole.admin])
def mark_as_unreplenishment(unique_id: str, sku: str):

    week = request.args.get("week", default="")
    delaer_gift_item = db.session.scalar(
        sa.select(m.DealerGiftItem).where(m.DealerGiftItem.unique_id == unique_id)
    )
    # TODO not work properly
    if not delaer_gift_item or delaer_gift_item.get_replenishment(week, sku):
        log(log.ERROR, f"Dealer gift item not found: {unique_id}")
        return render_template(
            "toast.html", message="Dealer gift item not found", category="danger"
        )

    start_date, end_date = get_week_range(week)

    gift_boxes_data = db.session.scalars(
        sa.select(
            m.GiftBox,
        ).where(
            start_date.date() < sa.func.DATE(m.GiftBox.created_at),
            sa.func.DATE(m.GiftBox.created_at) < end_date.date(),
            m.GiftBox._sku == sku,
            m.GiftBox.dealer_gift_item_id == delaer_gift_item.id,
        )
    ).all()
    total_qty = sum(gift_box.qty for gift_box in gift_boxes_data)

    db.session.add(
        m.DealerGiftIteRreplenishment(
            sku=sku,
            dealer_gift_item_id=delaer_gift_item.id,
        )
    )
    db.session.commit()

    return render_template(
        "user/invantory/order.html",
        delaer_gift_item=delaer_gift_item,
        total_qty=total_qty,
        sku=sku,
    )

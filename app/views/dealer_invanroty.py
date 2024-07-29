import io
import json
from datetime import datetime
from flask import (
    Blueprint,
    abort,
    render_template,
    request,
    flash,
    redirect,
    url_for,
    Response,
)
from flask_login import login_required, current_user
from flask_mail import Message

import sqlalchemy as sa

from flask import current_app as app
from app.controllers import create_pagination, update_stripe_customer
from app import models as m, db, mail
from app import forms as f
from app import schema as s
from app.controllers.user import role_required
from app.logger import log
from .utils import get_current_week_range

from .sellers import seller
from .dealer_gift_items import bp as dealer_gift_items_bp

bp = Blueprint("invantory", __name__, url_prefix="/invantory")


@bp.route("/dealers", methods=["GET"])
@login_required
@role_required([m.UsersRole.admin])
def dealers():
    start_date, end_date = get_current_week_range()
    query = (
        sa.select(
            m.User,
        )
        .join(m.DealerGiftItem, m.DealerGiftItem.dealer_id == m.User.id)
        .join(m.GiftItem, m.GiftItem.id == m.DealerGiftItem.gift_item_id)
        .where(m.User.role == m.UsersRole.dealer)
    )

    count_query = (
        sa.select(sa.func.count())
        .join(m.DealerGiftItem, m.DealerGiftItem.dealer_id == m.User.id)
        .join(m.GiftItem, m.GiftItem.id == m.DealerGiftItem.gift_item_id)
        .where(m.User.role == m.UsersRole.dealer)
        .select_from(m.User)
    )

    pagination = create_pagination(total=db.session.scalar(count_query))

    return render_template(
        "user/invantory/dealers.html",
        dealers=db.session.execute(
            query.offset((pagination.page - 1) * pagination.per_page).limit(
                pagination.per_page
            )
        ).scalars(),
        page=pagination,
    )


@bp.route("/dealers/<unique_id>", methods=["GET"])
@login_required
@role_required([m.UsersRole.admin])
def view_orders(unique_id: str):
    """htmx"""

    dealer = db.session.scalar(sa.select(m.User).where(m.User.unique_id == unique_id))
    if not dealer:
        return render_template(
            "toast.html", message="Dealer not found", category="danger"
        )

    return render_template(
        "user/invantory/view_orders_modal.html",
    )

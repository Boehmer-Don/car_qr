from datetime import datetime, timedelta
import sqlalchemy as sa
from flask import render_template, current_app as app

from flask_mail import Message
from app import models as m, db
from app import mail
from app.logger import log


def weekly_inventory_report():
    today = datetime.now().date()
    log(log.INFO, "Weekly inventory report started [%s]", today)
    before_7_days = today - timedelta(days=7)
    total_quantity = sa.func.sum(m.GiftBox.qty).label("total_quantity")

    dealer_gift_items_data = db.session.execute(
        sa.select(m.DealerGiftItem, total_quantity)
        .join(m.GiftBox, m.DealerGiftItem.id == m.GiftBox.dealer_gift_item_id)
        .where(
            before_7_days < sa.func.DATE(m.GiftBox.created_at),
            sa.func.DATE(m.GiftBox.created_at) <= today,
            m.GiftBox.dealer_gift_item_id.isnot(None),
        )
        .group_by(m.DealerGiftItem.id)
        .having(total_quantity > m.DealerGiftItem.min_qty)
        .order_by(m.DealerGiftItem.dealer_id.asc())
    ).all()

    dealer_gift_items_data = [
        data
        for data in dealer_gift_items_data
        if not (data[0].max_qty - data[1] > data[0].min_qty)
    ]

    admins = db.session.scalars(
        sa.select(m.User).where(
            m.User.role == m.UsersRole.admin, m.User.deleted.is_(False)
        )
    ).all()

    for admin in admins:
        msg = Message(
            subject="Weekly inventory report",
            sender=app.config["MAIL_DEFAULT_SENDER"],
            recipients=[admin.email],
        )

        msg.html = render_template(
            "email/weekly_inventory_report.html",
            dealer_gift_items_data=dealer_gift_items_data,
            user=admin,
        )

        mail.send(msg)

from datetime import datetime, timedelta
import sqlalchemy as sa
from flask import render_template, current_app as app
from flask_mail import Message
from app import models as m, db
from app import mail


def weekly_inventory_report():
    today = datetime.now().date()
    before_7_days = today - timedelta(days=7)
    total_quantity = sa.func.sum(m.GiftBox.qty).label("total_quantity")

    dealer_gift_items_data = db.session.execute(
        sa.select(m.DealerGiftItem, total_quantity)
        .join(m.GiftBox, m.DealerGiftItem.id == m.GiftBox.dealer_gift_item_id)
        .where(
            before_7_days < sa.func.DATE(m.GiftBox.created_at),
            m.GiftBox.dealer_gift_item_id.isnot(None),
        )
        .group_by(m.DealerGiftItem.id)
        .having(total_quantity > m.DealerGiftItem.min_qty)
        .order_by(m.DealerGiftItem.dealer_id.asc())
    ).all()

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

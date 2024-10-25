from datetime import datetime, timedelta
import sqlalchemy as sa
from flask import render_template, current_app as app
from flask_mail import Message
from app import models as m, db
from app import mail
from app.logger import log


def notify_missing_payment():
    today = datetime.now().date()
    log(log.INFO, "Notify missing payment [%s]", today)
    before_4_days = today - timedelta(days=4)
    missing_payments = db.session.scalars(
        sa.select(m.GiftsInvoice)
        .where(
            m.GiftsInvoice.is_paid.is_(False),
            sa.func.DATE(m.GiftsInvoice.created_at) == before_4_days,
        )
        .group_by(m.GiftsInvoice.id)
    ).all()

    admins = db.session.scalars(
        sa.select(m.User).where(m.User.role == m.UsersRole.admin, m.User.deleted.is_(False))
    ).all()

    if not missing_payments:
        log(log.INFO, "No missing payment found")
        return

    for admin in admins:
        msg = Message(
            "Missing payment",
            sender=app.config["MAIL_USERNAME"],
            recipients=[admin.email],
        )
        msg.html = render_template(
            "email/missing_payment.html",
            user=admin,
            missing_payments=missing_payments,
        )

        mail.send(msg)

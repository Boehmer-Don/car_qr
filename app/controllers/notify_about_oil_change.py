from datetime import datetime, timedelta
import sqlalchemy as sa
from flask import render_template, current_app as app
from flask_mail import Message
from app import models as m, db
from app import mail
from app.logger import log


def notify_about_oil_change():
    today = datetime.now().date()
    log(log.INFO, "Notify about oil change started [%s]", today)
    before_1_days = today + timedelta(days=1)
    before_7_days = today + timedelta(days=7)
    oil_changes = db.session.scalars(
        sa.select(m.OilChange)
        .where(m.OilChange.is_done.is_(False))
        .where(
            sa.or_(
                sa.func.DATE(m.OilChange.date) == before_1_days,
                sa.func.DATE(m.OilChange.date) == before_7_days,
            )
        )
        .distinct()
    ).all()

    admin_ids = db.session.scalars(
        sa.select(m.User.id).where(m.User.role == m.UsersRole.admin)
    ).all()
    for oil_change in oil_changes:
        sale_rep = oil_change.sale_rep
        buyer = sale_rep.buyer
        if not buyer.email or not sale_rep.is_notfy_by_email:
            log(
                log.INFO,
                "Buyer not found or sale rep notfy by phone [%s]",
                sale_rep.id,
            )
            continue

        notfy_text = ""
        if oil_change.date.date() == before_1_days:
            notfy_text = f"Oil change is due tomorrow for {sale_rep.label.name}."
        elif oil_change.date.date() == before_7_days:
            notfy_text = f"Oil change is due in a week for {sale_rep.label.name}."

        if not notfy_text:
            log(log.INFO, "Notfy text not found [%s]", oil_change.id)
            continue

        services = db.session.scalars(
            sa.select(m.User).where(
                m.User.role == m.UsersRole.service,
                m.User._creator_id.in_(admin_ids + [sale_rep.seller._creator_id]),
            )
        ).all()

        msg = Message(
            subject="New Customer",
            sender=app.config["MAIL_DEFAULT_SENDER"],
            recipients=[buyer.email],
        )

        msg.html = render_template(
            "email/notify_about_oil_change.html",
            notfy_text=notfy_text,
            user=buyer,
            services=services,
        )

        mail.send(msg)

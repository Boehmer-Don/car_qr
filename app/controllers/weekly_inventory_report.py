from datetime import datetime
import sqlalchemy as sa
from flask import render_template, current_app as app

from flask_mail import Message
from app import models as m, db
from app import mail
from app.logger import log


def weekly_inventory_report():
    today = datetime.now().date()
    log(log.INFO, "Weekly inventory report started [%s]", today)

    admins = db.session.scalars(
        sa.select(m.User).where(m.User.role == m.UsersRole.admin, m.User.deleted.is_(False))
    ).all()

    for admin in admins:
        msg = Message(
            subject="Weekly inventory report",
            sender=app.config["MAIL_DEFAULT_SENDER"],
            recipients=[admin.email],
        )

        msg.html = render_template(
            "email/weekly_inventory_report.html",
            user=admin,
        )

        mail.send(msg)

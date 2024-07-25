from datetime import datetime
import sqlalchemy as sa
from flask import render_template, current_app as app
from flask_mail import Message, Mail
from app import models as m, db
from app.logger import log
from .utils import custom_url_for

mail = Mail()


def check_subscriptions():
    log(log.INFO, "Subscriptions check started")
    users = db.session.scalars(
        sa.select(m.User).where(
            m.User.deleted.is_(False), m.User.role == m.UsersRole.dealer
        )
    ).all()
    for user in users:
        if user.subscriptions:
            days_left = (
                datetime.fromtimestamp(user.subscriptions[0].current_period_end)
                - datetime.now()
            ).days
            if 0 < days_left < 21:
                msg = Message(
                    subject="New Customer",
                    sender=app.config["MAIL_DEFAULT_SENDER"],
                    recipients=[user.email],
                )

                msg.html = render_template("email/expiration_notification.htm")
                log(
                    log.INFO,
                    "User [%s], subscription expires in [%s] days",
                    user.email,
                    days_left,
                )
                mail.send(msg)
            elif days_left == 0:
                user.activated = False
                user.save()
                msg = Message(
                    subject="Subscription renewal",
                    sender=app.config["MAIL_DEFAULT_SENDER"],
                    recipients=[user.email],
                )

                url = custom_url_for(f"/auth/activated/{user.unique_id}")
                msg.html = render_template(
                    "email/confirm.htm",
                    user=user,
                    url=url,
                )
                mail.send(msg)
    log(log.INFO, "Subscriptions check ended")

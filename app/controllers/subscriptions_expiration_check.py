from datetime import datetime
import sqlalchemy as sa
from flask import render_template, current_app as app, url_for
from flask_mail import Message, Mail
from app import models as m, db
from app.logger import log
from .utils import custom_url_for

mail = Mail()

SUBSCRIPTION_EXPIRATION_BREAKPOINT_DAYS = [1, 7, 30]


def check_subscriptions():
    log(log.INFO, "Subscriptions check started")
    users = db.session.scalars(
        sa.select(m.User).where(
            m.User.deleted.is_(False), m.User.role == m.UsersRole.dealer
        )
    ).all()
    for user in users:
        if not user.subscriptions:
            continue
        days_left = (
            datetime.fromtimestamp(user.subscriptions[0].current_period_end)
            - datetime.now()
        ).days
        if days_left in SUBSCRIPTION_EXPIRATION_BREAKPOINT_DAYS:
            msg = Message(
                subject="New Customer",
                sender=app.config["MAIL_DEFAULT_SENDER"],
                recipients=[user.email],
            )
            subs_link = custom_url_for(
                url_for("auth.plan", user_unique_id=user.unique_id)
            )
            msg.html = render_template(
                "email/expiration_notification.htm", subs_link=subs_link
            )
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
            user.is_authenticated = False
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

from datetime import datetime
from flask import render_template, current_app as app
from flask_mail import Message, Mail
from app import models as m, db
from app.logger import log


mail = Mail()


def check_subscriptions():
    log(log.INFO, "Subscriptions check started")
    users = db.session.scalars(m.User.select()).all()
    for user in users:
        if user.role == m.UsersRole.dealer:
            days_left = (
                datetime.fromtimestamp(user.subscriptions[0].current_period_end)
                - datetime.now()
            ).days
            if days_left < 21:
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
                # mail.send(msg)
    log(log.INFO, "Subscriptions check ended")

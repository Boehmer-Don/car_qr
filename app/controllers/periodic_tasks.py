from datetime import datetime, timedelta
from flask import render_template, url_for
from flask_mail import Message, Mail
from app import models as m, db
from app.logger import log

mail = Mail()


def subscription_periodic_check(sender):
    expiration_date = datetime.utcnow() + timedelta(days=1)
    msg = Message(
        subject="New Customer",
        sender=sender,
        recipients=[
            # Users with expiring subscription
            "denysburimov@gmail.com",
        ],
    )
    url = url_for("stripe.subscription", _external=True)

    msg.html = render_template(
        "email/subscription_expiration_check.htm",
        expiration_date=expiration_date,
        url=url,
    )
    mail.send(msg)

    # log(log.INFO, "Subscription expires: [%s]", expiration_date)
    return

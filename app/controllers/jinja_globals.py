from datetime import datetime
from flask import url_for
from flask_wtf import FlaskForm
from flask_login import current_user
from app import db
from app import models as m


# Paste in forms in html templates: {{ form_hidden_tag() }}
def form_hidden_tag():
    form = FlaskForm()
    return form.hidden_tag()


def time_delta(created_at: datetime):
    return (datetime.utcnow() - created_at).days


def days_active(date_received: datetime, date_deactivated: datetime):
    if not date_deactivated:
        return (datetime.now() - date_received).days
    return (date_deactivated - date_received).days


def labels_in_cart():
    if isinstance(current_user, m.User):
        labels = db.session.scalars(
            m.Label.select()
            .where(m.Label.user_id == current_user.id)
            .where(m.Label.status == m.LabelStatus.cart)
        ).all()
        return len(labels)
    return 0


def get_user_logo():
    if isinstance(current_user, m.User) and current_user.logo:
        return url_for("user.get_logo", user_unique_id=current_user.unique_id)
    return "#"


def gift_logo(url: str = None):
    sticker_id = url.split("/gift/")[-1]
    label = db.session.scalar(m.Label.select().where(m.Label.sticker_id == sticker_id))
    if label:
        return url_for("user.get_logo", user_unique_id=label.user.unique_id)
    return


def years():
    years = []
    for y in range(1960, datetime.now().year + 2):
        years.append(y)
    return years[::-1]

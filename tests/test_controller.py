from datetime import datetime, timedelta

from flask.testing import FlaskClient
import sqlalchemy as sa

from app import db
from app import models as m
from .utils import set_user

from app.controllers import notify_about_oil_change


def test_notify_about_oil_change(
    populate: FlaskClient,
):

    sale_rep = db.session.scalar(sa.select(m.SaleReport))
    assert sale_rep
    buyer = set_user(populate, role=m.UsersRole.buyer, is_login=False)
    sale_rep.buyer_id = buyer.id

    today = datetime.now().date()
    before_1_days = today - timedelta(days=1)
    before_7_days = today - timedelta(days=7)
    before_8_days = today - timedelta(days=8)

    for _ in range(5):
        oil_change = m.OilChange(
            date=before_1_days,
            is_done=False,
            sale_rep_id=sale_rep.id,
        )
        db.session.add(oil_change)

    for _ in range(5):
        oil_change = m.OilChange(
            date=before_7_days,
            is_done=False,
            sale_rep_id=sale_rep.id,
        )
        db.session.add(oil_change)

    for _ in range(5):
        oil_change = m.OilChange(
            date=before_8_days,
            is_done=False,
            sale_rep_id=sale_rep.id,
        )
        db.session.add(oil_change)

    for _ in range(5):
        oil_change = m.OilChange(
            date=today,
            is_done=True,
            sale_rep_id=sale_rep.id,
        )
        db.session.add(oil_change)

    assert notify_about_oil_change()

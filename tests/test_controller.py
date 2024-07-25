from datetime import datetime, timedelta

from flask.testing import FlaskClient
import sqlalchemy as sa
import pytest

from app import db
from app import models as m
from .utils import set_user

from app.controllers.notify_about_oil_change import notify_about_oil_change
from app.controllers.weekly_inventory_report import weekly_inventory_report


@pytest.mark.skip(reason="This test only for debugging")
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

    assert notify_about_oil_change() is None


@pytest.mark.skip(reason="This test only for debugging")
def test_weekly_inventory_report(populate: FlaskClient):
    today = datetime.now().date()
    gift_item = db.session.get(m.GiftItem, 1)

    dealer_gift_item_one = m.DealerGiftItem(
        dealer_id=1,
        gift_item_id=1,
        min_qty=20,
        max_qty=50,
    )

    dealer_gift_item_two = m.DealerGiftItem(
        dealer_id=1,
        gift_item_id=1,
        min_qty=3,
        max_qty=25,
    )
    db.session.add(dealer_gift_item_one)
    db.session.add(dealer_gift_item_two)
    db.session.commit()

    for i in range(1, 10):
        gift_box_one = m.GiftBox(
            dealer_gift_item_id=dealer_gift_item_one.id,
            sale_result_id=1,
            qty=1,
            created_at=today - timedelta(days=i),
            total_price=1,
            price=gift_item.price,
            _sku=gift_item.SKU,
            description=gift_item.description,
        )
        db.session.add(gift_box_one)
        gift_box_two = m.GiftBox(
            dealer_gift_item_id=dealer_gift_item_two.id,
            sale_result_id=1,
            qty=1,
            created_at=today - timedelta(days=i),
            total_price=1,
            price=gift_item.price,
            _sku=gift_item.SKU,
            description=gift_item.description,
        )
        db.session.add(gift_box_two)
    db.session.commit()

    assert weekly_inventory_report() is None

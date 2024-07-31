from datetime import datetime, timedelta

from flask.testing import FlaskClient
import sqlalchemy as sa
import pytest

from app import db
from app import models as m
from app.controllers.notify_missing_payment import notify_missing_payment
from .utils import set_user

from app.controllers.notify_about_oil_change import notify_about_oil_change
from app.controllers.weekly_inventory_report import weekly_inventory_report
from app.controllers.weekly_dealer_gift_box_invoices import (
    weekly_dealer_gift_box_invoices,
)


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
def test_weekly_notify(stripe_invoice_moke: FlaskClient):
    today = datetime.now()
    gift_item = db.session.get(m.GiftItem, 1)
    dealer = db.session.scalar(
        sa.select(m.User).where(m.User.role == m.UsersRole.dealer)
    )
    dealer.stripe_customer_id = "123"

    dealer_gift_item_one = m.DealerGiftItem(
        dealer_id=dealer.id,
        gift_item_id=1,
        min_qty=20,
        max_qty=50,
    )

    dealer_gift_item_two = m.DealerGiftItem(
        dealer_id=dealer.id,
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
            dealer_id=dealer.id,
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
            dealer_id=dealer.id,
        )
        db.session.add(gift_box_two)
    db.session.commit()

    assert weekly_inventory_report() is None

    assert weekly_dealer_gift_box_invoices() is None


@pytest.mark.skip(reason="This test only for debugging")
def test_missing_payment(populate: FlaskClient):
    today = datetime.now().date()
    before_4_days = today - timedelta(days=4)

    dealer = db.session.scalar(
        sa.select(m.User).where(m.User.role == m.UsersRole.dealer)
    )

    invoice = m.GiftsInvoice(
        dealer_id=dealer.id,
        is_paid=False,
        created_at=before_4_days,
        stripe_invoice_id="123",
        hosted_invoice_url="http://any.com",
    )
    db.session.add(invoice)
    db.session.commit()

    assert notify_missing_payment() is None

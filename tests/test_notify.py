from datetime import datetime, timedelta
from flask.testing import FlaskClient
from app import models as m, db

from app.controllers.weekly_inventory_report import weekly_inventory_report


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

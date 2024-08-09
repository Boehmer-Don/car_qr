import json
import sqlalchemy as sa
from flask.testing import FlaskClient

from app import schema as s
from app import models as m, db
from tests.utils import set_user


def test_dealer_inventory(populate: FlaskClient):
    set_user(populate, role=m.UsersRole.admin)
    delear = db.session.scalar(
        sa.select(m.User).where(m.User.role == m.UsersRole.dealer)
    )

    gift_item = db.session.get(m.GiftItem, 1)
    assert gift_item

    dealer_gift_item = m.DealerGiftItem(
        dealer_id=delear.id,
        gift_item_id=gift_item.id,
        min_qty=1,
        max_qty=2,
    )
    db.session.add(dealer_gift_item)
    gift_box = m.GiftBox(
        dealer_gift_item=dealer_gift_item,
        sale_result_id=1,
        dealer_id=delear.id,
        price=1.0,
        total_price=20.0,
        qty=20,
        _sku="sku",
        description="description",
    )
    db.session.add(gift_box)
    db.session.commit()

    res = populate.get("/user/inventory/dealers")
    assert res.status_code == 200
    assert "Dealers" in res.data.decode()
    assert delear.unique_id in res.data.decode()

    res = populate.get(f"/user/inventory/dealers/{delear.unique_id}")
    assert res.status_code == 200
    assert gift_box.sku in res.data.decode()

    res = populate.get(f"/user/inventory/dealers/{delear.unique_id}/replenishment")
    assert res.status_code == 200
    assert gift_box.sku in res.data.decode()
    assert "mark_as_removed" in res.data.decode()

    res = populate.post(
        f"/user/inventory/mark_as_unreplenishment/{dealer_gift_item.unique_id}/{gift_box.sku}"
    )
    assert res.status_code == 200
    assert b"Removed" in res.data

    mark = db.session.scalar(sa.select(m.DealerGiftIteRreplenishment))
    assert mark
    assert mark.sku == gift_box.sku
    db.session.delete(mark)
    db.session.commit()

    data = json.dumps(
        [
            s.ReplenishmentGiftBoxe(
                sku=gift_box.sku,
                total_quantity=gift_box.qty,
                delaer_gift_item=dealer_gift_item,
                status=s.ReplenishmentStatus.mark_as_removed,
            ).model_dump()
        ]
    )
    res = populate.post(
        "/user/inventory/replenish_all",
        data={"week": "", "dealers_gift_box_data": data},
        follow_redirects=True,
    )
    assert res.status_code == 200
    assert b"Replenishment has done" in res.data

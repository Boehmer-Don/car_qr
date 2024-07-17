import sqlalchemy as sa
from flask.testing import FlaskClient

from app import models as m, db
from tests.utils import set_user


def test_dealer_gift_items(populate: FlaskClient):
    set_user(populate, role=m.UsersRole.admin)

    assert not db.session.scalars(sa.select(m.DealerGiftItem)).all()
    user = db.session.scalar(sa.select(m.User).where(m.User.role == m.UsersRole.dealer))
    assert user
    gift_item = db.session.get(m.GiftItem, 1)
    assert gift_item
    assert gift_item.is_available

    res = populate.get(f"/user/gift-items/{user.unique_id}/gift-items-modal")
    assert res.status_code == 200
    assert gift_item.description in res.data.decode()

    assert not user.gift_items
    res = populate.post(
        f"/user/gift-items/{user.unique_id}/gift-item/{gift_item.unique_id}/add"
    )
    assert res.status_code == 200
    assert user.gift_items

    dealer_gift_item = user.gift_items[0]

    res = populate.get(f"/user/gift-items/{dealer_gift_item.unique_id}/edit")
    assert res.status_code == 200
    assert dealer_gift_item.description in res.data.decode()

    res = populate.post(
        f"/user/gift-items/{dealer_gift_item.unique_id}/edit",
        data=dict(
            min_qty=2,
            max_qty=3,
        ),
    )
    assert res.status_code == 200
    assert dealer_gift_item.min_qty == 2
    assert dealer_gift_item.max_qty == 3

    res = populate.delete(
        f"/user/gift-items/{user.unique_id}/gift-item/{dealer_gift_item.unique_id}/delete",
    )
    assert res.status_code == 200
    assert not user.gift_items

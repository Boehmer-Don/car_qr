import json

from flask.testing import FlaskClient

from app import models as m, db
from tests.utils import login


def test_sale_reports(populate: FlaskClient):
    login(populate, email="test_user_17@gmail.com", password="123456")
    sale_rep = db.session.get(m.SaleReport, 1)
    gift_item = db.session.get(m.GiftItem, 1)
    user_gift_item = m.DealerGiftItem(
        dealer_id=sale_rep.label.user_id,
        gift_item_id=gift_item.id,
        price=gift_item.price,
        description=gift_item.description,
    ).save()
    assert sale_rep
    assert gift_item
    res = populate.get("/sale-reports", follow_redirects=True)
    assert res.status_code == 200
    assert f"{sale_rep.unique_id}" in res.data.decode()

    res = populate.get(f"/sale-reports/{sale_rep.unique_id}/gift-box-modal")
    assert res.status_code == 200
    assert f"{gift_item.description}" in res.data.decode()

    form_data = {
        "sale_rep_unique_id": sale_rep.unique_id,
        "phone": "123-456-7890",
        "first_name": "test",
        "last_name": "user",
        "password": "123456",
        "password_confirmation": "123456",
        "email": "b@b.com",
        "gift_boxes": json.dumps(
            [{"dealerGiftItemId": user_gift_item.id, "qty": 1, "totalPrice": 1}]
        ),
    }
    assert not sale_rep.gift_boxes
    assert not sale_rep.buyer
    res = populate.post(
        "/sale-reports/set-gift-boxes", follow_redirects=True, data=form_data
    )
    assert res.status_code == 200
    assert "Gift boxes added" in res.data.decode()

    assert sale_rep.buyer
    assert sale_rep.gift_boxes

    res = populate.get(f"/sale-reports/{sale_rep.unique_id}/oil-change-modal")
    assert res.status_code == 200
    assert "Set oil change data" in res.data.decode()

    form_data = {
        "sale_rep_unique_id": sale_rep.unique_id,
        "first_oil_change": "01/01/2021",
        "second_oil_change": "01/28/2021",
        "is_notfy_by_email": True,
    }
    res = populate.post(
        "/sale-reports/oil-change-modal",
        follow_redirects=True,
        data=form_data,
    )
    assert res.status_code == 200
    assert "Oil change data added" in res.data.decode()

    res = res = populate.get("/sale-reports/panding-oil")
    assert res.status_code == 200
    assert f"{sale_rep.unique_id}" in res.data.decode()

    res = populate.get(f"/sale-reports/{sale_rep.unique_id}/edit-modal")

    assert res.status_code == 200
    assert sale_rep.oil_changes[0].date.strftime("%m-%d-%Y") in res.data.decode()
    assert "b@b.com" in res.data.decode()

    form_data = {
        "unique_id": sale_rep.buyer.unique_id,
        "sale_rep_unique_id": sale_rep.unique_id,
        "phone": "123-456-7890",
        "first_name": "test",
        "last_name": "user",
        "email": "b2@b.com",
        "first_oil_change": "01/07/2021",
    }
    res = populate.post("/sale-reports/edit", follow_redirects=True, data=form_data)
    assert res.status_code == 200
    assert "Sale report updated" in res.data.decode()

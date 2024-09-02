import io
from pathlib import Path
import sqlalchemy as sa
from flask.testing import FlaskClient

from app import models as m, db
from tests.utils import set_user


test_image = "test.jpg"
test_image_path = Path("tests") / "data" / test_image


test_gift_box = {
    "description": "Test gift box",
    "price": 100.0,
    "min_qty": 1,
    "max_qty": 10,
    "is_default": True,
    "SKU": "SKU",
}


def test_access(client: FlaskClient):
    set_user(client, role=m.UsersRole.seller)
    res = client.get("/gift-items", follow_redirects=True)
    assert res.status_code == 403

    set_user(client, role=m.UsersRole.dealer)
    res = client.get("/gift-items", follow_redirects=True)
    assert res.status_code == 403

    set_user(client, role=m.UsersRole.buyer)
    res = client.get("/gift-items", follow_redirects=True)
    assert res.status_code == 403

    set_user(client, role=m.UsersRole.admin)
    res = client.get("/gift-items", follow_redirects=True)
    assert res.status_code == 200


def test_gift_items_CRUD(client: FlaskClient, mocker):
    mocker.patch("app.views.gift_items.save_file", return_value="test.jpg")

    set_user(client, role=m.UsersRole.admin)

    res = client.get("/gift-items/add-modal")
    assert res.status_code == 200
    assert b"Add Gift Item" in res.data

    with open(test_image_path, "rb") as f:
        file = (io.BytesIO(f.read()), test_image)

    test_gift_box["image"] = file
    res = client.post(
        "/gift-items/",
        data=test_gift_box,
        follow_redirects=True,
    )
    assert res.status_code == 200
    assert b"Gift Item added successfully" in res.data

    res = client.get("/gift-items", follow_redirects=True)
    assert res.status_code == 200
    assert b"Test gift box" in res.data

    gift_item = db.session.scalar(sa.select(m.GiftItem))
    assert gift_item

    res = client.get(f"/gift-items/{gift_item.id}/edit-modal")
    assert res.status_code == 200
    assert b"Gift item not found" in res.data

    res = client.get(f"/gift-items/{gift_item.unique_id}/edit-modal")
    assert res.status_code == 200
    assert b"Edit Gift Item" in res.data

    test_gift_box["description"] = "Updated"
    test_gift_box["price"] = 200.0
    test_gift_box["gift_item_unique_id"] = gift_item.unique_id
    del test_gift_box["image"]

    res = client.post(
        "/gift-items/edit",
        data=test_gift_box,
        follow_redirects=True,
    )
    assert res.status_code == 200
    assert b"Gift Item updated successfully" in res.data
    assert gift_item.description == "Updated"
    assert gift_item.price == 200.0
    assert gift_item.image_path == test_image

    # we don't have this logic yet
    # res = client.delete(f"/gift-items/{gift_item.id}/delete")
    # assert res.status_code == 200
    # assert b"Gift Item deleted successfully" in res.data

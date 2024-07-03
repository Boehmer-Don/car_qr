import sqlalchemy as sa
from flask.testing import FlaskClient

from app import models as m, db
from tests.utils import set_user


test_seller = {
    "first_name": "Test seller",
    "last_name": "Test seller",
    "email": "seller@gmail.com",
    "password": "seller",
    "password_confirmation": "seller",
}


def test_get_create_modal(client: FlaskClient):
    set_user(client, role=m.UsersRole.seller)

    res = client.get("/user/sellers/create", follow_redirects=True)
    assert res.status_code == 403

    set_user(client, role=m.UsersRole.dealer)
    res = client.get("/user/sellers/create")
    assert res.status_code == 200


def test_seller_CRU(client: FlaskClient):

    sellers = db.session.scalars(
        sa.select(m.User).where(m.User.role == m.UsersRole.seller)
    ).all()
    assert not sellers
    user = set_user(client, role=m.UsersRole.dealer)

    assert not user.sellers

    res = client.post(
        "/user/sellers/create",
        data=test_seller,
        follow_redirects=True,
    )
    assert res.status_code == 200
    assert user.sellers
    assert user.sellers[0].email == test_seller["email"]
    assert test_seller["email"] in res.data.decode()

    res = client.get(f"/user/sellers/edit/{user.sellers[0].unique_id}")
    assert res.status_code == 200
    assert test_seller["email"] in res.data.decode()

    test_seller["unique_id"] = user.sellers[0].unique_id
    test_seller["email"] = "new_" + test_seller["email"]

    res = client.post(
        "/user/sellers/edit",
        data=test_seller,
        follow_redirects=True,
    )
    assert res.status_code == 200
    assert user.sellers
    assert user.sellers[0].email == test_seller["email"]


def test_login_as_seller(client: FlaskClient):
    user = set_user(client, role=m.UsersRole.dealer)
    seller = m.User(
        email="seller@gmail.com",
        password="seller",
        role=m.UsersRole.seller,
        seller_id=user.id,
        activated=True,
    ).save()
    res = client.post(
        "/user/sellers/login-as-seller",
        data={"unique_id": seller.unique_id},
        follow_redirects=True,
    )
    assert res.status_code == 200
    assert "You were logged in as seller" in res.data.decode()

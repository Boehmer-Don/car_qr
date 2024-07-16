from flask.testing import FlaskClient

from app import models as m
from app.database import db

from tests.utils import set_user

# generate test data do user service role
test_data = {
    "name": "test",
    "email": "service@email.com",
    "password": "test",
    "address": "test",
    "country": "US",
    "province": "Indiana",
    "city": "test",
    "postal_code": "test",
    "phone": "111-111-1111",
    "password": "test",
    "password_confirmation": "test",
}


def test_get_access(client: FlaskClient):
    set_user(client, role=m.UsersRole.service)
    res = client.get("/services", follow_redirects=True)
    assert res.status_code == 403

    set_user(client, role=m.UsersRole.seller)

    res = client.get("/services", follow_redirects=True)
    assert res.status_code == 403

    set_user(client, role=m.UsersRole.buyer)
    res = client.get("/services", follow_redirects=True)
    assert res.status_code == 403

    set_user(client, role=m.UsersRole.picker)
    res = client.get("/services", follow_redirects=True)
    assert res.status_code == 403

    set_user(client, role=m.UsersRole.admin)
    res = client.get("/services", follow_redirects=True)
    assert res.status_code == 200

    set_user(client, role=m.UsersRole.dealer)
    res = client.get("/services", follow_redirects=True)
    assert res.status_code == 200


def test_get_add_modal(client: FlaskClient):
    set_user(client, role=m.UsersRole.admin)
    res = client.get("/services/add-modal")
    assert res.status_code == 200
    assert b"Add service" in res.data


def test_add(client: FlaskClient):
    set_user(client, role=m.UsersRole.admin)
    services = db.session.query(m.User).filter(m.User.role == m.UsersRole.service).all()
    assert not services
    res = client.post("/services/add", data=test_data, follow_redirects=True)
    assert res.status_code == 200
    services = db.session.query(m.User).filter(m.User.role == m.UsersRole.service).all()
    assert services[0].name_of_dealership in res.data.decode()
    assert services
    assert services[0].email == test_data["email"]

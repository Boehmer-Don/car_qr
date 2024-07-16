from flask.testing import FlaskClient

from app import models as m
from tests.utils import set_user


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


def test_add_modal(client: FlaskClient):
    set_user(client, role=m.UsersRole.admin)
    res = client.get("/services/add-modal")
    assert res.status_code == 200
    assert b"Add service" in res.data

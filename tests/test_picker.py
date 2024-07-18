from flask.testing import FlaskClient

import sqlalchemy as sa
from app import models as m
from app.database import db

from tests.utils import set_user

# generate test data do user service role
test_data = {
    "email": "service@email.com",
    "phone": "111-111-1111",
    "password": "test",
    "password_confirmation": "test",
}


def test_get_access(client: FlaskClient):
    set_user(client, role=m.UsersRole.service)
    res = client.get("/pickers", follow_redirects=True)
    assert res.status_code == 403

    set_user(client, role=m.UsersRole.seller)

    res = client.get("/pickers", follow_redirects=True)
    assert res.status_code == 403

    set_user(client, role=m.UsersRole.buyer)
    res = client.get("/pickers", follow_redirects=True)
    assert res.status_code == 403

    set_user(client, role=m.UsersRole.picker)
    res = client.get("/pickers", follow_redirects=True)
    assert res.status_code == 403

    set_user(client, role=m.UsersRole.admin)
    res = client.get("/pickers", follow_redirects=True)
    assert res.status_code == 403

    set_user(client, role=m.UsersRole.dealer)
    res = client.get("/pickers", follow_redirects=True)
    assert res.status_code == 200


def test_get_add_modal(client: FlaskClient):
    set_user(client, role=m.UsersRole.dealer)
    res = client.get("/pickers/add-modal")
    assert res.status_code == 200
    assert b"Add gift box user" in res.data


def test_add(client: FlaskClient):
    set_user(client, role=m.UsersRole.dealer)
    pickers = db.session.query(m.User).filter(m.User.role == m.UsersRole.picker).all()
    assert not pickers
    res = client.post("/pickers/add", data=test_data, follow_redirects=True)
    assert res.status_code == 200
    pickers = db.session.query(m.User).filter(m.User.role == m.UsersRole.picker).all()
    assert pickers[0].name_of_dealership in res.data.decode()
    assert pickers
    assert pickers[0].email == test_data["email"]


def test_edit(client: FlaskClient):
    set_user(client, role=m.UsersRole.dealer)
    res = client.post("/pickers/add", data=test_data, follow_redirects=True)
    assert res.status_code == 200
    picker = db.session.scalar(
        sa.select(m.User).where(m.User.role == m.UsersRole.picker)
    )
    assert picker

    res = client.get(f"/pickers/{picker.unique_id}/edit-modal")
    assert res.status_code == 200
    assert b"Edit gift box user" in res.data
    assert picker.phone in res.data.decode()
    assert picker.email in res.data.decode()

    del test_data["password"]
    del test_data["password_confirmation"]

    test_data["new_password"] = "new_password"
    test_data["new_password_confirmation"] = "new_password"

    new_email = "new_email@gmail.com"
    test_data["email"] = new_email

    test_data["picker_unique_id"] = picker.unique_id
    res = client.post("/pickers/edit", data=test_data, follow_redirects=True)
    assert res.status_code == 200
    assert picker.email == new_email

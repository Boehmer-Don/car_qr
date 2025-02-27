import io
from pathlib import Path
from flask.testing import FlaskClient
from datetime import datetime

import sqlalchemy as sa
from app import models as m
from app.database import db

from tests.utils import set_user

# generate test data do user service role
test_data = {
    "service_name": "test",
    "email": "service@email.com",
    "password": "test",
    "password_confirmation": "test",
    "address": "test",
    "country": "US",
    "province": "Indiana",
    "city": "test",
    "postal_code": "test",
    "phone": "111-111-1111",
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


def test_edit(client: FlaskClient):
    set_user(client, role=m.UsersRole.admin)
    res = client.post("/services/add", data=test_data, follow_redirects=True)
    assert res.status_code == 200
    service = db.session.scalar(
        sa.select(m.User).where(m.User.role == m.UsersRole.service)
    )
    assert service

    res = client.get(f"/services/{service.unique_id}/edit-modal")
    assert res.status_code == 200
    assert b"Edit service" in res.data
    assert service.name_of_dealership in res.data.decode()
    assert service.email in res.data.decode()

    del test_data["password"]
    del test_data["password_confirmation"]

    test_data["new_password"] = "new_password"
    test_data["new_password_confirmation"] = "new_password"

    new_name = "new_name"
    new_email = "new_email@gmail.com"
    test_data["service_name"] = new_name
    test_data["email"] = new_email

    test_data["service_unique_id"] = service.unique_id
    res = client.post("/services/edit", data=test_data, follow_redirects=True)
    assert res.status_code == 200
    assert service.name_of_dealership == new_name
    assert service.email == new_email

    set_user(client, role=m.UsersRole.dealer)

    # admin create services not dealer, only admin can edit
    res = client.get(f"/services/{service.unique_id}/edit-modal")
    assert res.status_code == 200
    assert b"Service not found" in res.data


def test_confirm_oil_change(populate: FlaskClient, mocker):
    mocker.patch("app.views.service.save_file", return_value="test.jpg")

    buyer = set_user(populate, role=m.UsersRole.buyer, is_login=False)
    set_user(populate, role=m.UsersRole.service)

    sale_rep = db.session.scalar(sa.select(m.SaleReport))
    assert sale_rep
    oil_change = m.OilChange(
        sale_rep_id=sale_rep.id,
        date=datetime.today().date(),
    )
    db.session.add(oil_change)
    sale_rep.buyer_id = buyer.id
    db.session.commit()

    assert not oil_change.is_done

    res = populate.get(
        f"/services/add-records-search?q={oil_change.sale_rep.label.sticker_id}"
    )
    assert res.status_code == 200
    assert oil_change.sale_rep.unique_id in res.data.decode()

    res = populate.get(f"/services/{oil_change.sale_rep.unique_id}/add-record")
    assert res.status_code == 200
    assert b"Confirm" in res.data
    assert not db.session.scalars(sa.select(m.ServiceRecord)).all()

    test_file = "test.pdf"
    test_file_path = Path("tests") / "data" / test_file

    with open(test_file_path, "rb") as f:
        file = (io.BytesIO(f.read()), test_file)

    res = populate.post(
        f"/services/{oil_change.sale_rep.unique_id}/add-record",
        data={"file": file},
        follow_redirects=True,
    )
    assert res.status_code == 200
    assert db.session.scalars(sa.select(m.ServiceRecord)).all()

    res = populate.get("/services/records")
    assert res.status_code == 200

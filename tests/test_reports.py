# flake8: noqa E712
from flask import current_app as app
from flask_login import current_user
from flask.testing import FlaskClient, FlaskCliRunner
from click.testing import Result
from app import models as m, db
from tests.utils import login


def test_reports(populate: FlaskClient):
    login(populate)
    response = populate.get("/report/create")
    assert response
    assert response.status_code == 200
    assert b"Create a report" in response.data
    assert b"Alter the filters to see when your QR Code labels" in response.data

    response = populate.get("/report/create?type_filter=Sedan")
    assert response
    assert response.status_code == 200
    assert b"Sedan" in response.data

    response = populate.get("/report/create?make_filter=Toyota")
    assert response
    assert response.status_code == 200
    assert b"Toyota" in response.data
    assert b"Land Cruiser" in response.data

    response = populate.get("/report/create?model_filter=Land+Cruiser")
    assert response
    assert response.status_code == 200
    assert b"Land Cruiser" in response.data

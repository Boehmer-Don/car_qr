# flake8: noqa E712
from flask import current_app as app
from flask_login import current_user
from flask.testing import FlaskClient, FlaskCliRunner
from click.testing import Result
from app import models as m, db
from tests.utils import login


def test_reports(populate: FlaskClient):
    login(populate)
    response = populate.get("/report/all")
    assert response
    assert response.status_code == 200
    assert b"Create a report" in response.data
    assert b"Alter the filters to see when your QR Code labels" in response.data

    response = populate.post(
        "/report/all", data={"make": "All", "model": "All", "type": "All"}
    )
    assert response
    assert response.status_code == 200

    response = populate.post("/report/all", data={"make": "Toyota", "model": "All"})
    assert b"Toyota" in response.data

    response = populate.post(
        "/report/all", data={"make": "Toyota", "model": "Land Cruiser"}
    )
    assert b"Land Cruiser" in response.data

    # response = populate.get("/report/all?make=All&model=All&type=All")

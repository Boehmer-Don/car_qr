from flask import current_app as app
from flask.testing import FlaskClient
from app import models as m, db
from tests.utils import login


def test_labels_active(populate: FlaskClient):
    login(populate)
    response = populate.get("/labels/active")
    assert response
    assert response.status_code == 200
    assert b"Active Labels" in response.data
    assert b"Welcome Back" in response.data

    labels = db.session.scalars(m.Label.select()).all()
    assert len(labels) == 10
    for label in labels[: app.config["DEFAULT_PAGE_SIZE"]]:
        assert label.name.encode() in response.data


def test_labels_archived(populate: FlaskClient):
    login(populate)
    response = populate.get("/labels/archived")
    assert response
    assert response.status_code == 200

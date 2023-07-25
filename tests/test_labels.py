# flake8: noqa E712
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

    all_labels = db.session.scalars(m.Label.select()).all()
    assert len(all_labels) == 10

    active_labels = db.session.scalars(m.Label.select().where(m.Label.active)).all()
    for label in active_labels[: app.config["DEFAULT_PAGE_SIZE"]]:
        assert label.name.encode() in response.data


def test_labels_archived(populate: FlaskClient):
    login(populate)
    response = populate.get("/labels/archived")
    assert response
    assert response.status_code == 200
    assert b"Archived Labels" in response.data
    assert b"Date Sold" in response.data
    archived_labels = db.session.scalars(
        m.Label.select().where(m.Label.active == False)
    ).all()
    for label in archived_labels[: app.config["DEFAULT_PAGE_SIZE"]]:
        assert label.name.encode() in response.data


def test_views_counter(populate: FlaskClient):
    login(populate)
    all_labels = db.session.scalars(m.Label.select()).all()
    label: m.Label = all_labels[0]
    views_before = label.views
    response = populate.get(f"labels/l/{label.unique_id}")
    assert response
    assert response.status_code == 302
    assert response.location == label.url

    label = db.session.scalar(
        m.Label.select().where(m.Label.unique_id == label.unique_id)
    )
    assert label.views > views_before


def test_label_edit(populate: FlaskClient):
    TEST_LABEL_NAME = "Test Label"
    TEST_LABEL_MODEL = "Test Model"
    TEST_LABEL_TYPE = "Test Type"
    label = db.session.scalar(m.Label.select().where(m.Label.id == 1))
    assert label
    login(populate)
    response = populate.post(
        f"labels/edit",
        data=dict(
            id=label.id,
            unique_id=label.unique_id,
            name=TEST_LABEL_NAME,
            make=label.make,
            vehicle_model=TEST_LABEL_MODEL,
            year=label.year,
            mileage=label.mileage,
            color=label.color,
            trim=label.trim,
            type_of_vehicle=TEST_LABEL_TYPE,
            price=label.price,
            date_received=label.date_received,
            url=label.url,
            user_id=label.user_id,
            views=label.views,
        ),
    )
    assert response
    assert response.status_code == 302

    label = db.session.scalar(m.Label.select().where(m.Label.id == 1))
    assert label.name == TEST_LABEL_NAME
    assert label.vehicle_model == TEST_LABEL_MODEL
    assert label.type_of_vehicle == TEST_LABEL_TYPE

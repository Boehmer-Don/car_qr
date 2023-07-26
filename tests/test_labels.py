# flake8: noqa E712
from flask import current_app as app
from flask_login import current_user
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


def test_deactivate_label(populate: FlaskClient):
    label: m.Label = db.session.scalar(m.Label.select().where(m.Label.id == 1))
    assert label
    login(populate)
    response = populate.post(
        f"labels/deactivate",
        data=dict(
            unique_id=label.unique_id,
        ),
    )
    assert response
    assert response.status_code == 302

    label = db.session.scalar(m.Label.select().where(m.Label.id == 1))
    assert label.active == False
    assert label.date_deactivated


def test_add_new_labels(client: FlaskClient):
    TEST_LABELS_AMOUNT = 5
    login(client)
    response = client.post(
        f"/labels/amount/{current_user.unique_id}",
        data=dict(
            user_unique_id=current_user.unique_id,
            amount=TEST_LABELS_AMOUNT,
        ),
    )
    assert response
    assert response.status_code == 302
    assert (
        response.location
        == f"/labels/details/{current_user.unique_id}/{TEST_LABELS_AMOUNT}"
    )

    forms = {}
    for i in range(1, TEST_LABELS_AMOUNT + 1):
        forms[f"name-{i}"] = f"Test Label {i}"
        forms[f"make-{i}"] = f"Test Make {i}"
        forms[f"vehicle_model-{i}"] = f"Test Model {i}"
        forms[f"year-{i}"] = 2000 + i
        forms[f"mileage-{i}"] = 100000 + i
        forms[f"color-{i}"] = f"Test Color {i}"
        forms[f"trim-{i}"] = f"Test Trim {i}"
        forms[f"type_of_vehicle-{i}"] = f"Test Type {i}"
        forms[f"price-{i}"] = 10000 + i * 1000
        forms[f"url-{i}"] = f"https://www.test.com/{i}"
        forms[f"user_id-{i}"] = current_user.id

    response = client.post(
        f"/labels/details/{current_user.unique_id}/{TEST_LABELS_AMOUNT}",
        data=forms,
    )
    assert response
    assert response.status_code == 302
    assert "/labels/payment/" in response.location
    labels = db.session.scalars(m.Label.select()).all()
    assert len(labels) == TEST_LABELS_AMOUNT
    for label in labels:
        assert label.active

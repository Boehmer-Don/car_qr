# flake8: noqa E712
from flask import current_app as app, url_for
from flask_login import current_user
from flask.testing import FlaskClient, FlaskCliRunner
from click.testing import Result
import sqlalchemy as sa

from app import models as m, db
from tests.utils import login, logout
from .db import add_generic_labels


def test_labels_active(populate: FlaskClient, test_labels_data: dict):
    login(populate)
    response = populate.get("/labels/active")
    assert response
    assert response.status_code == 200
    assert b"Active Labels" in response.data
    assert b"Welcome Back" in response.data

    all_labels = db.session.scalars(m.Label.select()).all()
    assert len(all_labels) == len(test_labels_data)

    active_labels = db.session.scalars(m.Label.select().where(m.Label.status)).all()
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
        m.Label.select()
        .where(m.Label.status == m.LabelStatus.archived)
        .order_by(m.Label.date_deactivated.desc())
    ).all()
    for label in archived_labels[: app.config["DEFAULT_PAGE_SIZE"]]:
        assert label.name.encode() in response.data


def test_views_counter(populate: FlaskClient):
    all_labels = db.session.scalars(m.Label.select()).all()
    label: m.Label = all_labels[0]
    views_before = label.views
    response = populate.get(f"l/{label.sticker_id}")
    assert response
    assert response.status_code == 302
    assert response.location == label.url

    label = db.session.scalar(
        m.Label.select().where(m.Label.unique_id == label.unique_id)
    )
    assert label.views > views_before

    label.gift = "Some Cool Gift"
    label.save()

    response = populate.get(f"l/{label.sticker_id}")
    assert response
    assert response.status_code == 302
    assert response.location == url_for(
        "labels.gift",
        sticker_id=label.sticker_id,
    )


def test_label_add_new(populate: FlaskClient):
    TEST_LABEL_MAKE = "Test MAKE1"
    TEST_LABEL_MODEL = "Test Model1"
    TEST_LABEL_TYPE = "Test Type1"
    TEST_LABEL_TRIM = "Test Trim1"
    TEST_DATA = dict(
        new_make_name=TEST_LABEL_MAKE,
        new_model_name=TEST_LABEL_MODEL,
        new_trim_option=TEST_LABEL_TRIM,
        new_type_name=TEST_LABEL_TYPE,
    )
    login(populate)
    response = populate.post(
        f"labels/add_new_model",
        data=TEST_DATA,
    )
    assert response
    assert response.status_code == 302

    assert db.session.scalar(
        m.CarMake.select().where(m.CarMake.name == TEST_LABEL_MAKE)
    )
    assert db.session.scalar(
        m.CarType.select().where(m.CarType.name == TEST_LABEL_TYPE)
    )

    login(populate)
    response = populate.post(
        f"labels/add_new_model",
        data=TEST_DATA,
    )
    assert response
    assert response.status_code == 302


def test_label_edit(populate: FlaskClient):
    TEST_LABEL_NAME = "Test Label"
    TEST_LABEL_MODEL = "Test Model"
    TEST_LABEL_TYPE = "Test Type"
    TEST_LABEL_GIFT = "Test Gift"
    TEST_LABEL_VIEWS = 10
    label = db.session.scalar(m.Label.select().where(m.Label.id == 1))
    assert label
    login(populate)
    response = populate.post(
        f"labels/edit",
        data=dict(
            id=label.id,
            unique_id=label.unique_id,
            name=TEST_LABEL_NAME,
            sticker_id=label.sticker_id,
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
            views=TEST_LABEL_VIEWS,
            gift=TEST_LABEL_GIFT,
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
    assert label.status == m.LabelStatus.archived
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
        assert label.status == m.LabelStatus.cart

    url = response.location
    response = client.get(url)
    assert response
    assert response.status_code == 200
    assert b"Order Details" in response.data


def test_add_labels(runner: FlaskCliRunner, test_labels_data: dict):
    TEST_USER_ID = 1
    count_before = db.session.query(m.Label).count()
    res: Result = runner.invoke(args=["add-labels", "--user-id", f"{TEST_USER_ID}"])
    assert "DB populated by 10 testing labels for user" in res.stdout
    assert (db.session.query(m.Label).count() - count_before) == len(test_labels_data)


def test_generic_stickers(runner: FlaskClient, populate: FlaskClient):
    runner.invoke(args=["create-admin"])
    login(populate)
    runner.invoke(args=["db-populate"])
    admin = db.session.scalar(
        sa.select(m.User).where(m.User.email == app.config["ADMIN_EMAIL"])
    )
    assert admin
    add_generic_labels()
    generic_stickers = db.session.scalars(
        sa.select(m.Sticker)
        .where(m.Sticker.user.has(m.User.role == m.UsersRole.admin))
        .order_by(m.Sticker.created_at.desc())
    ).all()
    assert generic_stickers
    response = populate.get("/labels/generic")
    assert response.status_code == 200
    assert b"Generic Labels" in response.data
    assert generic_stickers[0].code in response.data.decode()
    # making sure all downloaded stickers are in downloaded state
    response = populate.post(
        "/labels/generic",
        data={"generic-stickers-download": True},
        follow_redirects=True,
    )

    assert response.status_code == 200
    # checking for attachment in response
    assert response.headers["Content-Disposition"].startswith("attachment")
    for sticker in generic_stickers:
        assert sticker.downloaded


# TODO test generate_generic_labels,assign_generic_labels

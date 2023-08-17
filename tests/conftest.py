import pytest
import json
from datetime import datetime, timedelta
from flask import Flask
from flask.testing import FlaskClient

from app import create_app, db
from app import models as m
from tests.utils import register
from tests.db import populate as db_populate, add_labels


@pytest.fixture()
def app(monkeypatch):
    def mock_create_subscription_checkout_session(
        user: m.User, subscription_product: m.StripeProduct
    ):
        return "https://checkout.stripe.com/pay/cs_test_123"

    monkeypatch.setattr(
        "app.controllers.create_subscription_checkout_session",
        mock_create_subscription_checkout_session,
    )

    def mock_create_stripe_customer(user: m.User):
        class StripeCustomer:
            id = "mock_stripe_customer_id"

        return StripeCustomer

    monkeypatch.setattr(
        "app.controllers.create_stripe_customer",
        mock_create_stripe_customer,
    )

    def mock_construct_event(payload, sig_header, secret):
        db_populate(2)
        add_labels(2)
        stripe_customer: m.User = db.session.get(m.User, 2)
        stripe_customer.stripe_customer_id = "test_stripe_customer_id"
        stripe_customer.save()

        labels = db.session.scalars(m.Label.select().where(m.Label.id < 4))
        labels_unique_ids_list = [x.unique_id for x in labels]
        labels_unique_ids = ",".join(labels_unique_ids_list)

        class StripeObject:
            customer = "test_stripe_customer_id"
            metadata = {"labels_unique_ids": labels_unique_ids}

        stripe_object = StripeObject()

        mock_event = {
            "type": "payment_intent.succeeded",
            "data": {"object": stripe_object},
        }
        return mock_event

    monkeypatch.setattr("stripe.Webhook.construct_event", mock_construct_event)

    app = create_app("testing")
    app.config.update(
        {
            "TESTING": True,
        }
    )

    yield app


@pytest.fixture()
def client(app: Flask):
    with app.test_client() as client:
        app_ctx = app.app_context()
        app_ctx.push()

        db.drop_all()
        db.create_all()
        register()

        yield client
        db.drop_all()
        app_ctx.pop()


@pytest.fixture()
def runner(app, client):
    from app import commands

    commands.init(app)

    yield app.test_cli_runner()


@pytest.fixture
def test_labels_data():
    with open("tests/db/test_labels.json", "r") as f:
        labels_data = json.load(f)
    return labels_data


@pytest.fixture
def populate(client: FlaskClient, test_labels_data: dict):
    NUM_TEST_USERS = 15
    for i in range(NUM_TEST_USERS):
        m.User(
            email=f"user{i+1}@mail.com",
            password="password",
            activated=True,
        ).save(False)
    db.session.commit()

    for index, label in enumerate(test_labels_data):
        label_status = m.LabelStatus.active if index < 8 else m.LabelStatus.archived
        date_deactivated = None
        if label_status == m.LabelStatus.archived:
            date_deactivated = datetime.now() + timedelta(days=2)
        m.Label(
            sticker_id=f"QR0000{index + 1}",
            name=label["name"],
            make=label["make"],
            vehicle_model=label["vehicle_model"],
            year=label["year"],
            mileage=label["mileage"],
            color=label["color"],
            trim=label["trim"],
            type_of_vehicle=label["type_of_vehicle"],
            price=label["price"],
            url=label["url"],
            user_id=1,
            status=label_status,
            date_deactivated=date_deactivated,
        ).save()
    yield client

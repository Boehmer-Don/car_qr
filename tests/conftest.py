import pytest
import json
from datetime import datetime, timedelta
from flask import Flask
from flask.testing import FlaskClient

from app import create_app, db
from app import models as m
from tests.utils import register


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
def populate(client: FlaskClient):
    NUM_TEST_USERS = 15
    for i in range(NUM_TEST_USERS):
        m.User(
            email=f"user{i+1}@mail.com",
            password="password",
            activated=True,
        ).save(False)
    db.session.commit()

    with open("tests/db/test_labels.json", "r") as f:
        labels_data = json.load(f)

    for index, label in enumerate(labels_data):
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

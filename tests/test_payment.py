from flask.testing import FlaskClient
import pytest


@pytest.skip("Skipping payment tests", allow_module_level=True)
def test_webhook(client: FlaskClient, monkeypatch):
    headers = {
        "STRIPE_SIGNATURE": "test_stripe_signature",
    }
    response = client.get("/stripe/webhook", headers=headers)

    assert response
    assert response.status_code == 200

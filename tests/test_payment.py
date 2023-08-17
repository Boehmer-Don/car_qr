from flask.testing import FlaskClient


def test_webhook(client: FlaskClient, monkeypatch):
    headers = {
        "STRIPE_SIGNATURE": "test_stripe_signature",
    }
    response = client.get("/stripe/webhook", headers=headers)

    assert response
    assert response.status_code == 200

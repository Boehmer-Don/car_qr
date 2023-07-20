from flask.testing import FlaskClient
from tests.utils import login


def test_labels_list(populate: FlaskClient):
    # login(populate)
    response = populate.get("/labels/active", follow_redirects=True)
    assert response.status_code == 200
    assert b"Active labels" in response.data
    assert b"Welcome Back" in response.data

from flask.testing import FlaskClient

from app import models as m
from tests.utils import set_user


def test_get_location_modal(client: FlaskClient):
    set_user(client, role=m.UsersRole.seller)

    res = client.get("/labels/locations/create", follow_redirects=True)
    assert res.status_code == 403

    set_user(client, role=m.UsersRole.dealer)
    res = client.get("/labels/locations/create")
    assert res.status_code == 200


def test_create_location(client: FlaskClient):
    user = set_user(client, role=m.UsersRole.dealer)

    assert not user.label_locations

    post = client.post(
        "/labels/locations/create",
        data=dict(name="test location"),
        follow_redirects=True,
    )
    assert post.status_code == 200
    assert user.label_locations

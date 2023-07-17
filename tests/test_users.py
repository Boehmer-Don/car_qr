from flask import current_app as app
from flask.testing import FlaskClient, FlaskCliRunner
from click.testing import Result
from app import models as m, db
from tests.utils import login
from app import mail


def test_list(populate: FlaskClient):
    login(populate)
    DEFAULT_PAGE_SIZE = app.config["DEFAULT_PAGE_SIZE"]
    response = populate.get("/user/")
    assert response
    assert response.status_code == 200
    html = response.data.decode()
    users = db.session.scalars(m.User.select().order_by(m.User.id).limit(11)).all()
    assert len(users) == 11
    for user in users[:DEFAULT_PAGE_SIZE]:
        assert user.email in html
    assert users[10].email not in html

    populate.application.config["PAGE_LINKS_NUMBER"] = 6
    response = populate.get("/user/?page=6")
    assert response
    assert response.status_code == 200
    html = response.data.decode()
    assert "/user/?page=6" in html
    assert "/user/?page=3" in html
    assert "/user/?page=8" in html
    assert "/user/?page=10" not in html
    assert "/user/?page=2" not in html


def test_create_admin(runner: FlaskCliRunner):
    res: Result = runner.invoke(args=["create-admin"])
    assert "admin created" in res.output
    query = m.User.select().where(m.User.email == app.config["ADMIN_EMAIL"])
    assert db.session.scalar(query)


def test_populate_db(runner: FlaskCliRunner):
    TEST_COUNT = 56
    count_before = db.session.query(m.User).count()
    res: Result = runner.invoke(args=["db-populate", "--count", f"{TEST_COUNT}"])
    assert f"populated by {TEST_COUNT}" in res.stdout
    assert (db.session.query(m.User).count() - count_before) == TEST_COUNT


def test_delete_user(populate: FlaskClient):
    login(populate)
    uc = db.session.query(m.User).count()
    response = populate.delete("/user/delete/1")
    assert db.session.query(m.User).count() < uc
    assert response.status_code == 200


def test_invite_user(populate: FlaskClient):
    login(populate)
    TESTING_USER_ID = "1"
    TESTING_EMAIL = "user@simple2b.com"
    TESTING_NEXT_URL = "/user/"
    with mail.record_messages() as outbox:
        response = populate.post(
            "/user/resend-invite",
            data={
                "user_id": TESTING_USER_ID,
                "email": TESTING_EMAIL,
                "next_url": TESTING_NEXT_URL,
            },
            follow_redirects=True,
        )

        assert response

        assert b"Your invite has been successfully sent" in response.data
        assert len(outbox) == 1

        assert "toast" in response.data.decode()
        assert "toast-success" in response.data.decode()
        assert "toast-danger" not in response.data.decode()

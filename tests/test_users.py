from flask import current_app as app
from flask.testing import FlaskClient, FlaskCliRunner
from click.testing import Result
import sqlalchemy as sa
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
    assert "/user/?page=2" in html
    assert "/user/?page=3" in html


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
    assert db.session.query(m.User).filter(m.User.deleted is False).count() < uc
    assert response.status_code == 200


def test_invite_user(client: FlaskClient):
    login(client)
    TESTING_USER_ID = "1"
    TESTING_EMAIL = "user@simple2b.com"
    TESTING_NEXT_URL = "/user/"
    with mail.record_messages() as outbox:
        response = client.post(
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


def test_account(client: FlaskClient):
    TEST_EMAIL = "denysburimov@gmail.com"
    TEST_PASSWORD = "password"
    TEST_FIRSTNAME = "Denys"
    TEST_LASTNAME = "Burimov"
    TEST_NAME_OF_DEALERSHIP = "Simple2B"
    TEST_ADDRESS_OF_DEALERSHIP = "Stepana Bandery Ave, 6"
    TEST_COUNTRY = "Ukraine"
    TEST_PROVINCE = "Kyiv"
    TEST_CITY = "Kyiv"
    TEST_POSTAL_CODE = "10000"
    TEST_PHONE = "555-555-55-55"

    login(client)
    user: m.User = db.session.scalar(sa.select(m.User).where(m.User.id == 1))
    response = client.get(f"/user/account/{user.unique_id}")
    assert response.status_code == 200
    response = client.post(
        f"/user/account/{user.unique_id}",
        data=dict(
            email=TEST_EMAIL,
            password=TEST_PASSWORD,
            password_confirmation=TEST_PASSWORD,
            first_name=TEST_FIRSTNAME,
            last_name=TEST_LASTNAME,
            name_of_dealership=TEST_NAME_OF_DEALERSHIP,
            address_of_dealership=TEST_ADDRESS_OF_DEALERSHIP,
            country=TEST_COUNTRY,
            province=TEST_PROVINCE,
            city=TEST_CITY,
            postal_code=TEST_POSTAL_CODE,
            phone=TEST_PHONE,
            plan=m.UsersPlan.basic.value,
        ),
        follow_redirects=True,
    )
    assert response.status_code == 200
    assert b"Your account has been successfully updated" in response.data


def test_subsription(client: FlaskClient):
    login(client)
    user: m.User = db.session.scalar(sa.select(m.User).where(m.User.id == 1))
    response = client.get(f"/user/subscription/{user.unique_id}")
    assert response.status_code == 200
    response = client.post(
        f"/user/subscription/{user.unique_id}",
        data=dict(
            selected_plan=m.UsersPlan.basic.value,
        ),
        follow_redirects=True,
    )
    assert response.status_code == 200
    assert b"You are successfully changed your plan" in response.data

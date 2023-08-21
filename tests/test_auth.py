import re
from flask_mail import Message
from flask.testing import FlaskClient
from app import mail
from app import models as m
from app import db
from tests.utils import register, login


TEST_EMAIL = "denysburimov@gmail.com"
TEST_FIRSTNAME = "Denys"
TEST_LASTNAME = "Burimov"
TEST_NAME_OF_DEALERSHIP = "Simple2B"
TEST_ADDRESS_OF_DEALERSHIP = "Stepana Bandery Ave, 6"
TEST_COUNTRY = "Ukraine"
TEST_PROVINCE = "Kyiv"
TEST_CITY = "Kyiv"
TEST_POSTAL_CODE = "10000"
TEST_PHONE = "555-555-55-55"

TEST_EMAIL_UPDATE = "dburimov@gmail.com"
TEST_FIRSTNAME_UPDATE = "Denis"
TEST_LASTNAME_UPDATE = "Burimov jr."
TEST_NAME_OF_DEALERSHIP_UPDATE = "Simple2B123"
TEST_ADDRESS_OF_DEALERSHIP_UPDATE = "Stepana Bandery Ave, 12"
TEST_COUNTRY_UPDATE = "UKRAINE"
TEST_PROVINCE_UPDATE = "Kyiv Region"
TEST_CITY_UPDATE = "Kyiv City"
TEST_POSTAL_CODE_UPDATE = "10001"
TEST_PHONE_UPDATE = "333-333-33-33"


def test_auth_pages(client: FlaskClient):
    response = client.get("/auth/register")
    assert response.status_code == 200
    response = client.get("/auth/login")
    assert response.status_code == 200
    response = client.get("/auth/logout")
    assert response.status_code == 302
    response = client.get("/auth/forgot")
    assert response.status_code == 200


def test_register(client: FlaskClient):
    with mail.record_messages() as outbox:
        response = client.post(
            "/auth/register",
            data=dict(
                email=TEST_EMAIL,
                password="password",
                password_confirmation="password",
            ),
            follow_redirects=True,
        )

        assert response

        assert (
            b"Registration successful. Checkout you email for confirmation!."
            in response.data
        )

        assert "toast" in response.data.decode()
        assert "toast-success" in response.data.decode()
        assert "toast-danger" not in response.data.decode()

        user = db.session.query(m.User).filter_by(email=TEST_EMAIL).first()
        assert user

        assert len(outbox) == 1
        letter: Message = outbox[0]
        assert letter.subject == "New password"
        assert "Confirm registration" in letter.html
        assert user.unique_id in letter.html
        html: str = letter.html

        pattern = r"https?:\/\/[\w\d\.-]+\/auth\/activated\/[\w\d-]{36}"
        urls = re.findall(pattern, html)
        assert len(urls) == 1
        url = urls[0]
        response = client.post(
            url,
            data=dict(
                first_name=TEST_FIRSTNAME,
                last_name=TEST_LASTNAME,
                name_of_dealership=TEST_NAME_OF_DEALERSHIP,
                address_of_dealership=TEST_ADDRESS_OF_DEALERSHIP,
                country=TEST_COUNTRY,
                province=TEST_PROVINCE,
                city=TEST_CITY,
                postal_code=TEST_POSTAL_CODE,
                phone=TEST_PHONE,
            ),
            follow_redirects=True,
        )
        assert response.status_code == 200

        response = client.post(
            f"/auth/plan/{user.unique_id}",
            data={"selected_plan": "basic"},
            follow_redirects=True,
        )
        assert response.status_code == 200

        response = client.post(
            f"/auth/payment/{user.unique_id}",
            data=dict(
                email=TEST_EMAIL,
                password="password",
                password_confirmation="password",
                first_name=TEST_FIRSTNAME_UPDATE,
                last_name=TEST_LASTNAME_UPDATE,
                name_of_dealership=TEST_NAME_OF_DEALERSHIP_UPDATE,
                address_of_dealership=TEST_ADDRESS_OF_DEALERSHIP_UPDATE,
                country=TEST_COUNTRY_UPDATE,
                province=TEST_PROVINCE_UPDATE,
                city=TEST_CITY_UPDATE,
                postal_code=TEST_POSTAL_CODE_UPDATE,
                phone=TEST_PHONE_UPDATE,
                plan=m.UsersPlan.basic.value,
            ),
        )
        assert response.status_code == 200


def test_forgot(client: FlaskClient):
    response = client.post(
        "/auth/forgot",
        data=dict(
            email=TEST_EMAIL,
        ),
        follow_redirects=True,
    )
    assert b"No registered user with this e-mail" in response.data

    user = m.User(
        email=TEST_EMAIL,
        password="password",
    )
    user.save()
    with mail.record_messages() as outbox:
        response = client.post(
            "/auth/forgot",
            data=dict(
                email=TEST_EMAIL,
            ),
            follow_redirects=True,
        )

        assert (
            b"Password reset successful. For set new password please check your e-mail."
            in response.data
        )
        user: m.User = db.session.scalar(
            m.User.select().where(m.User.email == TEST_EMAIL)
        )
        assert user

        assert len(outbox) == 1
        letter = outbox[0]
        assert letter.subject == "Reset password"
        assert ("/auth/password_recovery/" + user.unique_id) in letter.html

    response = client.post(
        "/auth/password_recovery/" + user.unique_id,
        data=dict(
            password="123456789",
            password_confirmation="123456789",
        ),
        follow_redirects=True,
    )
    assert b"Login successful." in response.data


def test_login_and_logout(client: FlaskClient):
    # Access to logout view before login should fail.
    register("sam@test.com")
    response = login(client, "sam@test.com")
    assert b"Login successful." in response.data
    # Incorrect login credentials should fail.
    response = login(client, "sam@test.com", "wrongpassword")
    assert b"Wrong user ID or password." in response.data
    # Correct credentials should login
    response = login(client, "sam@test.com")
    assert b"Login successful." in response.data


def test_upload_logo(client: FlaskClient):
    TEST_FILENAME = "s2b_logo.png"

    register(TEST_EMAIL)
    user: m.User = db.session.scalar(m.User.select().where(m.User.email == TEST_EMAIL))
    assert user
    with open(f"tests/{TEST_FILENAME}", "rb") as file:
        response = client.post(
            f"/auth/logo-upload/{user.unique_id}", data={"file": file}
        )

    assert response.status_code == 200
    user: m.User = db.session.scalar(m.User.select().where(m.User.email == TEST_EMAIL))
    assert user.logo
    assert user.logo[0].filename == TEST_FILENAME
    assert user.logo[0].mimetype == "image/png"

    with open(f"tests/{TEST_FILENAME}", "rb") as file:
        content = file.read()
        assert user.logo[0].file[:4] == content[:4]

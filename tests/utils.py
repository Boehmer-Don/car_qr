import sqlalchemy as sa

from app.models import User
from app import models as m, db

TEST_ADMIN_NAME = "bob"
TEST_ADMIN_EMAIL = "bob@test.com"
TEST_ADMIN_PASSWORD = "password"


def register(email=TEST_ADMIN_EMAIL, password=TEST_ADMIN_PASSWORD):
    user = User(
        email=email,
        first_name=TEST_ADMIN_NAME,
        last_name="Simple2B",
        role=m.UsersRole.admin,
        activated=True,
    )
    user.password = password
    user.save()
    return user.id


# def login(client, username=TEST_ADMIN_NAME, password=TEST_ADMIN_PASSWORD):
def login(client, email=TEST_ADMIN_EMAIL, password=TEST_ADMIN_PASSWORD):
    return client.post(
        "/auth/login",
        data=dict(user_id=email, password=password),
        follow_redirects=True,
    )


def set_user(
    client, role: m.UsersRole = m.UsersRole.admin, is_login: bool = True
) -> User:
    count = db.session.scalar(sa.select(sa.func.count()).select_from(User)) + 1
    user = User(
        email=f"test_user_{count}@gmail.com",
        first_name=f"Test_{count}",
        last_name=f"User_{count}",
        role=role,
        activated=True,
    )
    password = "123456"
    user.password = password
    user.save()
    if is_login:
        client.post(
            "/auth/login",
            data=dict(user_id=user.email, password=password),
            follow_redirects=True,
        )
    return user


def logout(client):
    return client.get("/logout", follow_redirects=True)

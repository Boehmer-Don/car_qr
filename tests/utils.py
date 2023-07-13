from app.models import User

TEST_ADMIN_NAME = "bob"
TEST_ADMIN_EMAIL = "bob@test.com"
TEST_ADMIN_PASSWORD = "password"


def register(email=TEST_ADMIN_EMAIL, password=TEST_ADMIN_PASSWORD):
    user = User(email=email)
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


def logout(client):
    return client.get("/logout", follow_redirects=True)

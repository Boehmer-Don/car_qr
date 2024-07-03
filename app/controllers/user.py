from functools import wraps
from flask import abort, redirect, request, url_for
from flask_login import current_user


from app.logger import log


def role_required(required_role: list[str]):
    def decorator(func):
        @wraps(func)
        def wrapper(*args, **kwargs):
            if not current_user:
                log(log.ERROR, "User is not authenticated")
                abort(401)

            if current_user.deleted or not current_user.activated:
                log(log.ERROR, "User is deleted or not activated")
                return redirect(url_for("auth.logout"))

            if current_user.role.value not in required_role:
                log(
                    log.ERROR,
                    "User with role :[%s] does not have permission to access route: [%s]",
                    current_user.role.value,
                    request.path,
                )
                abort(403)
            return func(*args, **kwargs)

        return wrapper

    return decorator

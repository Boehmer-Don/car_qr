from flask import redirect, url_for, Blueprint
from flask_login import login_required, current_user


main_blueprint = Blueprint("main", __name__)


@main_blueprint.route("/")
@login_required
def index():
    return redirect(url_for("user.account", user_unique_id=current_user.unique_id))

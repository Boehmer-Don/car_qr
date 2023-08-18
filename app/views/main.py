from flask import redirect, url_for, Blueprint
from flask_login import login_required, current_user
from app import models as m, db


main_blueprint = Blueprint("main", __name__)


@main_blueprint.route("/")
@login_required
def index():
    return redirect(url_for("user.account", user_unique_id=current_user.unique_id))


@main_blueprint.route("/l/<sticker_id>")
def redirect_to_outer_url(sticker_id: str):
    # Check if a dealership has a gift option (add this field to user's model)
    # If yes, redirect to the gift page, then to the client's data form, than to thx page
    # Create client's db model
    # Registration cancels the sticker's pending (at webhook)
    label: m.Label = db.session.scalar(
        m.Label.select().where(m.Label.sticker_id == sticker_id)
    )
    if not label:
        return redirect(url_for("main.landing"))

    user: m.User = db.session.scalar(m.User.select().where(m.User.id == label.user_id))

    if user and user.gift_enabled:
        return redirect(url_for("user.gift", sticker_id=sticker_id))
        # Create user's gift page

    label.views += 1
    label.save()
    return redirect(label.url)

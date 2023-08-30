from flask import (
    current_app as app,
    render_template,
    redirect,
    url_for,
    Blueprint,
    flash,
)
from flask_login import login_required, current_user
from flask_mail import Message, Mail
from app import models as m, db
from app.logger import log


main_blueprint = Blueprint("main", __name__)


@main_blueprint.route("/")
@login_required
def index():
    return redirect(url_for("user.account", user_unique_id=current_user.unique_id))


@main_blueprint.route("/l/<sticker_id>")
def redirect_to_outer_url(sticker_id: str):
    # Registration cancels the sticker's pending (at webhook)
    label: m.Label = db.session.scalar(
        m.Label.select().where(m.Label.sticker_id == sticker_id)
    )
    if not label:
        return redirect(url_for("main.landing"))

    if label.gift:
        return redirect(url_for("labels.gift", sticker_id=sticker_id))
        # Create user's gift page

    label.views += 1
    label.save()
    return redirect(label.url)


@main_blueprint.route("/landing", methods=["GET", "POST"])
def landing():
    mail = Mail()
    form = m.LandingForm()
    if form.validate_on_submit():
        msg = Message(
            subject="New Customer",
            sender=app.config["MAIL_DEFAULT_SENDER"],
            recipients=[app.config.get("ADMIN_EMAIL")],
        )

        msg.html = render_template(
            "email/new_customer.htm",
            name=form.name.data,
            email=form.email.data,
            message=form.message.data,
        )
        mail.send(msg)

        flash("Your credentials are sent to admin", "success")
        return redirect(url_for("main.landing"))
    elif form.is_submitted():
        log(log.WARNING, "Form submitted error: [%s]", form.errors)
        flash("The given data was invalid.", "danger")
    return render_template("landing.html")

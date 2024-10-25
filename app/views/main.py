from flask import (
    current_app as app,
    render_template,
    redirect,
    url_for,
    Blueprint,
    flash,
    request,
)
from flask_login import current_user
from flask_mail import Message, Mail
from app import models as m, db
from app.logger import log
from app.controllers import validate_recaptcha


main_blueprint = Blueprint("main", __name__)


@main_blueprint.route("/")
def index():
    return redirect(url_for("main.landing"))


@main_blueprint.route("/no-content")
def no_content():
    return "", 200


@main_blueprint.route("/l/<sticker_id>")
def redirect_to_outer_url(sticker_id: str):
    log(log.INFO, "Current user: [%s]", current_user)
    label: m.Label = db.session.scalar(
        m.Label.select().where(m.Label.sticker_id == sticker_id)
    )
    if not label:
        log(log.WARNING, "Label not found. Sticker ID: [%s]", sticker_id)
        return redirect(url_for("main.landing"))

    if current_user.is_authenticated:
        log(log.INFO, "Authorized user. Redirecting to outer URL. Label: [%s]", label)
        if label.gift:
            log(log.INFO, "Redirecting to gift page. Label: [%s]", label)
            return redirect(url_for("labels.gift", sticker_id=sticker_id))
        return redirect(label.url)

    log(log.INFO, "Unauthorized user. Counting views. Label: [%s]", label)
    log(log.INFO, "views before: [%s]", label.views)
    view = m.LabelView(label_id=label.id)
    db.session.add(view)
    db.session.commit()
    log(log.INFO, "views after: [%s]", label.views)

    # if label.oil_not_changed:
    #     log(log.INFO, "Label oil_not_changed: [%s]", label)
    #     logout_user()
    #     session.clear()
    #     session["sticker_id"] = sticker_id
    #     return redirect(url_for("auth.login"))

    if label.gift:
        log(log.INFO, "Redirecting to gift page. Label: [%s]", label)
        return redirect(url_for("labels.gift", sticker_id=sticker_id))

    log(log.INFO, "Redirecting to outer URL. Label: [%s]", label)
    return redirect(label.url)


@main_blueprint.route("/landing", methods=["GET", "POST"])
def landing():
    if current_user.is_authenticated:
        if current_user.role.value == "admin":
            return redirect(url_for("user.get_all"))
        elif current_user.role.value == "dealer":
            return redirect(
                url_for("user.account", user_unique_id=current_user.unique_id)
            )

    form = m.LandingForm()
    if request.method == "GET":
        return render_template(
            "landing.html",
            form=form,
            RE_SITE_KEY=app.config["RECAPTCHA_PUBLIC_KEY"],
        )

    if not form.validate_on_submit():
        log(log.WARNING, "Form submitted error: [%s]", form.errors)
        flash("Form submitted error.")
        return redirect(url_for("main.landing"))

    if not validate_recaptcha():
        log(log.WARNING, "Recaptcha validation failed.")
        flash("Recaptcha validation failed.")
        return redirect(url_for("main.landing"))

    mail = Mail()
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
    flash("Thank you for your message. We will get back to you soon.")

    return redirect(url_for("main.landing"))

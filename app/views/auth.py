import io
import json
from PIL import Image
from flask_mail import Message
from flask import Blueprint, render_template, url_for, redirect, flash, request, session
from flask import current_app as app
from flask_login import login_user, logout_user, login_required, current_user
import sqlalchemy as sa
from app import models as m
from app import forms as f
from app import mail, db
from app.controllers import create_stripe_customer, create_subscription_checkout_session
from app.logger import log


auth_blueprint = Blueprint("auth", __name__, url_prefix="/auth")


@auth_blueprint.route("/register", methods=["GET", "POST"])
def register():
    form: f.RegistrationForm = f.RegistrationForm()
    if form.validate_on_submit():
        user = m.User(
            email=form.email.data,
            password=form.password.data,
        )
        log(log.INFO, "Form submitted. User: [%s]", user)
        user.save()

        # create e-mail message
        msg = Message(
            subject="Email Verification",
            sender=app.config["MAIL_DEFAULT_SENDER"],
            recipients=[user.email],
        )
        url = url_for(
            "auth.activate",
            reset_password_uid=user.unique_id,
            _external=True,
        )

        msg.html = render_template(
            "email/confirm.htm",
            user=user,
            url=url,
        )
        mail.send(msg)

        flash(
            "Registration successful. Checkout you email for confirmation!.", "success"
        )
        return redirect(url_for("auth.mail_check"))
    elif form.is_submitted():
        log(log.WARNING, "Form submitted error: [%s]", form.errors)
        flash("The given data was invalid.", "danger")
    return render_template("auth/register.html", form=form)


@auth_blueprint.route("/login", methods=["GET", "POST"])
def login():
    log(log.INFO, "Login page requested. Request method: [%s]", request.method)
    form: f.LoginForm = f.LoginForm(request.form)
    if form.validate_on_submit():
        user: m.User = m.User.authenticate(form.user_id.data, form.password.data)
        log(log.INFO, "Form submitted. User: [%s]", user)
        if not user:
            log(log.WARNING, "Login failed")
            flash("Wrong user ID or password.", "danger")
            return redirect(url_for("auth.login"))
        if not user.activated:
            log(log.WARNING, "Account not activated")
            flash(
                "Your account is not activated yet. Please check your email to confirm it.",
                "danger",
            )
            return redirect(url_for("auth.mail_check"))

        login_user(user)
        log(log.INFO, "Login successful.")
        flash("Login successful.", "success")
        if current_user.role == m.UsersRole.admin:
            log(log.INFO, "Redirecting to users page.")
            return redirect(url_for("user.get_all"))
        else:
            log(log.INFO, "Redirecting to labels page.")
            return redirect(url_for("labels.get_active_labels"))

    elif form.is_submitted():
        log(log.WARNING, "Form submitted error: [%s]", form.errors)
    return render_template("auth/login.html", form=form)


@auth_blueprint.route("/logout")
@login_required
def logout():
    logout_user()
    log(log.INFO, "You were logged out.")
    session.clear()
    return redirect(url_for("auth.login"))


@auth_blueprint.route("/activated/mail-check")
def mail_check():
    return render_template("auth/mail_check.html")


@auth_blueprint.route("/activated/<reset_password_uid>", methods=["GET", "POST"])
def activate(reset_password_uid: str):
    query = m.User.select().where(m.User.unique_id == reset_password_uid)
    user: m.User | None = db.session.scalar(query)

    if not user:
        log(log.INFO, "User not found")
        flash("Incorrect activation link", "danger")
        return redirect(url_for("main.index"))

    form: f.RegistrationStep2Form = f.RegistrationStep2Form()
    if form.validate_on_submit():
        user.unique_id = m.user.gen_password_reset_id()
        user.first_name = form.first_name.data
        user.last_name = form.last_name.data
        user.name_of_dealership = form.name_of_dealership.data
        user.address_of_dealership = form.address_of_dealership.data
        user.country = form.country.data
        user.province = form.province.data
        user.city = form.city.data
        user.postal_code = form.postal_code.data
        user.phone = form.phone.data
        user.save()

        log(log.INFO, "Registration contact info saved. User: [%s]", user)
        return redirect(url_for("auth.plan", user_unique_id=user.unique_id))
    elif form.is_submitted():
        log(log.ERROR, "Form submitted error: [%s]", form.errors)

    return render_template(
        "auth/register_step_2.html",
        form=form,
        reset_password_uid=reset_password_uid,
    )


@auth_blueprint.route("/get_provinces", methods=["GET", "POST"])
def get_provinces():
    country = request.args.get("country")
    provinces = None
    match country:
        case "US":
            with open("tests/db/us_states.json", "r") as f:
                states_data = json.load(f)
                provinces = [s.get("name") for s in states_data]
        case "Canada":
            with open("tests/db/canada_provinces.json", "r") as f:
                provinces_data = json.load(f)
                provinces = [p.get("name") for p in provinces_data]
    return render_template("auth/provinces.html", provinces=provinces)


@auth_blueprint.route("/plan/<user_unique_id>", methods=["GET", "POST"])
def plan(user_unique_id: str):
    query = m.User.select().where(m.User.unique_id == user_unique_id)
    user: m.User | None = db.session.scalar(query)

    if not user:
        log(log.INFO, "User not found")
        flash("Incorrect reset password link", "danger")
        return redirect(url_for("main.index"))

    form: f.SubscriptionPlanForm = f.SubscriptionPlanForm()
    if form.validate_on_submit():
        user.plan = form.selected_plan.data
        user.save()
        log(log.INFO, "Pay plan is chosen. User: [%s]", user)
        if user.plan == m.UsersPlan.advanced:
            return redirect(url_for("auth.logo_upload", user_unique_id=user.unique_id))
        return redirect(url_for("auth.payment", user_unique_id=user.unique_id))
    elif form.is_submitted():
        log(log.ERROR, "Form submitted error: [%s]", form.errors)

    flash("You are successfully signed up!", "success")
    return render_template(
        "auth/register_plan.html",
        user=user,
        form=form,
        user_unique_id=user_unique_id,
    )


@auth_blueprint.route("/payment/<user_unique_id>", methods=["GET", "POST"])
def payment(user_unique_id: str):
    query = m.User.select().where(m.User.unique_id == user_unique_id)
    user: m.User | None = db.session.scalar(query)

    if not user:
        log(log.INFO, "User not found")
        flash("Incorrect reset password link", "danger")
        return redirect(url_for("main.index"))

    provinces = []
    match user.country:
        case "Canada":
            with open("tests/db/canada_provinces.json", "r") as provinces_file:
                provinces_data = json.load(provinces_file)
                provinces = [p.get("name") for p in provinces_data]
        case "US":
            with open("tests/db/us_states.json", "r") as states_file:
                states_data = json.load(states_file)
                provinces = [s.get("name") for s in states_data]

    form: f.PaymentForm = f.PaymentForm()
    if request.method == "GET":
        form.email.data = user.email
        form.first_name.data = user.first_name
        form.last_name.data = user.last_name
        form.name_of_dealership.data = user.name_of_dealership
        form.address_of_dealership.data = user.address_of_dealership
        form.country.data = user.country
        form.province.data = user.province
        form.city.data = user.city
        form.postal_code.data = user.postal_code
        form.plan.data = user.plan.name
        form.phone.data = user.phone

    if form.validate_on_submit():
        user.email = form.email.data
        if form.password.data:
            user.password = form.password.data
        user.first_name = form.first_name.data
        user.last_name = form.last_name.data
        user.name_of_dealership = form.name_of_dealership.data
        user.address_of_dealership = form.address_of_dealership.data
        user.country = form.country.data
        user.province = form.province.data
        user.city = form.city.data
        user.postal_code = form.postal_code.data
        user.plan = form.plan.data
        user.phone = form.phone.data
        user.save()

        # get users stripe plan
        product = db.session.scalar(
            m.StripeProduct.select().where(m.StripeProduct.name == user.plan.value)
        )
        if not product:
            log(log.ERROR, "Stripe product not found: [%s]", user.plan.value)

        # create stripe customer
        stripe_user = create_stripe_customer(user)
        user.stripe_customer_id = stripe_user.id
        user.save()
        stripe_form_url = create_subscription_checkout_session(user, product)
        return redirect(stripe_form_url)
    elif form.is_submitted():
        log(log.ERROR, "Form submitted error: [%s]", form.errors)

    return render_template(
        "auth/register_payment.html",
        user=user,
        form=form,
        user_unique_id=user_unique_id,
        provinces=provinces,
    )


@auth_blueprint.route("/logo-upload/<user_unique_id>", methods=["GET", "POST"])
def logo_upload(user_unique_id: str):
    change_logo = request.args.get("change_logo")

    query = m.User.select().where(m.User.unique_id == user_unique_id)
    user: m.User | None = db.session.scalar(query)

    if not user:
        log(log.INFO, "User not found")
        flash("Incorrect reset password link", "danger")
        return redirect(url_for("main.index"))

    if request.method == "POST":
        # Upload logo image file
        file = request.files["file"]
        log(log.INFO, "File uploaded: [%s]", file)

        IMAGE_MAX_WIDTH = app.config["IMAGE_MAX_WIDTH"]
        img = Image.open(file.stream)
        width, height = img.size

        if width > IMAGE_MAX_WIDTH:
            log(log.INFO, "Resizing image")
            ratio = IMAGE_MAX_WIDTH / width
            new_width = IMAGE_MAX_WIDTH
            new_height = int(height * ratio)
            resized_img = img.resize((new_width, new_height), Image.Resampling.LANCZOS)
            img = resized_img

        try:
            img_byte_arr = io.BytesIO()
            img.save(img_byte_arr, format="PNG")
            img_byte_arr = img_byte_arr.getvalue()
        except Exception as e:
            log(log.ERROR, "Error saving image: [%s]", e)
            flash("Error saving image", "danger")
            return redirect(url_for("auth.logo_upload", user_unique_id=user.unique_id))

        try:
            db.session.execute(
                sa.delete(m.UserLogo).where(m.UserLogo.user_id == user.id)
            )
            db.session.add(
                m.UserLogo(
                    user_id=user.id,
                    filename=file.filename.split("/")[-1],
                    file=img_byte_arr,
                    mimetype=file.content_type,
                )
            )
            db.session.commit()
            flash("Logo uploaded", "success")
        except Exception as e:
            log(log.ERROR, "Error saving logo: [%s]", e)
            flash("Error saving logo", "danger")
            return redirect(url_for("auth.logo_upload", user_unique_id=user.unique_id))

    log(log.INFO, "Uploaded logo for user: [%s]", user)
    return render_template(
        "auth/register_logo_upload.html",
        user=user,
        user_unique_id=user_unique_id,
        change_logo=change_logo,
    )


@auth_blueprint.route("/thankyou-subscription", methods=["GET"])
@login_required
def thankyou_subscription():
    log(log.INFO, "Payment succeeded. User: [%s]", current_user)
    return render_template("auth/thankyou_subscription.html")


@auth_blueprint.route("/thankyou-labels", methods=["GET"])
@login_required
def thankyou_labels():
    log(log.INFO, "Payment succeeded. User: [%s]", current_user)
    return render_template("auth/thankyou_labels.html")


@auth_blueprint.route("/cancel", methods=["GET"])
def cancel():
    log(log.INFO, "Payment failed. User: [%s]", current_user)
    return render_template("auth/cancel.html")


@auth_blueprint.route("/forgot", methods=["GET", "POST"])
def forgot_pass():
    form = f.ForgotForm(request.form)
    if form.validate_on_submit():
        query = m.User.select().where(m.User.email == form.email.data)
        user: m.User = db.session.scalar(query)
        # create e-mail message
        msg = Message(
            subject="Reset password",
            sender=app.config["MAIL_DEFAULT_SENDER"],
            recipients=[user.email],
        )
        url = url_for(
            "auth.password_recovery",
            reset_password_uid=user.unique_id,
            _external=True,
        )
        msg.html = render_template(
            "email/remind.htm",
            user=user,
            url=url,
        )
        mail.send(msg)
        user.reset_password()
        flash(
            "Password reset successful. For set new password please check your e-mail.",
            "success",
        )
    elif form.is_submitted():
        log(log.ERROR, "No registered user with this e-mail")
        flash("No registered user with this e-mail", "danger")
    return render_template("auth/forgot.html", form=form)


@auth_blueprint.route(
    "/password_recovery/<reset_password_uid>", methods=["GET", "POST"]
)
def password_recovery(reset_password_uid):
    if current_user.is_authenticated:
        return redirect(url_for("main.index"))

    query = m.User.select().where(m.User.unique_id == reset_password_uid)
    user: m.User = db.session.scalar(query)

    if not user:
        flash("Incorrect reset password link", "danger")
        return redirect(url_for("main.index"))

    form = f.ChangePasswordForm()

    if form.validate_on_submit():
        user.password = form.password.data
        user.unique_id = m.gen_password_reset_id()
        user.save()
        login_user(user)
        flash("Login successful.", "success")
        return redirect(url_for("main.index"))

    return render_template(
        "auth/reset_password.html",
        form=form,
        unique_id=reset_password_uid,
    )

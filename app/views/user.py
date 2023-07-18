# flake8: noqa E712
from flask import (
    Blueprint,
    render_template,
    request,
    flash,
    redirect,
    url_for,
)
from flask_login import login_required
from flask_mail import Message
import sqlalchemy as sa

from flask import current_app as app
from app.controllers import create_pagination
from app import models as m, db, mail
from app import forms as f
from app.logger import log


bp = Blueprint("user", __name__, url_prefix="/user")


@bp.route("/", methods=["GET"])
@login_required
def get_all():
    q = request.args.get("q", type=str, default=None)
    query = m.User.select().where(m.User.activated).order_by(m.User.id)
    count_query = sa.select(sa.func.count()).select_from(m.User)
    if q:
        query = (
            m.User.select()
            .where(m.User.username.like(f"{q}%") | m.User.email.like(f"{q}%"))
            .order_by(m.User.id)
        )
        count_query = (
            sa.select(sa.func.count())
            .where(m.User.username.like(f"{q}%") | m.User.email.like(f"{q}%"))
            .select_from(m.User)
        )

    pagination = create_pagination(total=db.session.scalar(count_query))

    return render_template(
        "user/users.html",
        users=db.session.execute(
            query.offset((pagination.page - 1) * pagination.per_page).limit(
                pagination.per_page
            )
        ).scalars(),
        page=pagination,
        search_query=q,
        pending_users=db.session.scalars(
            sa.select(m.User).where(m.User.activated == False, m.User.role == "dealer")
        ).all(),
    )


@bp.route("/save", methods=["POST"])
@login_required
def save():
    form: f.UserForm = f.UserForm()
    if form.validate_on_submit():
        query = m.User.select().where(m.User.id == int(form.user_id.data))
        user: m.User | None = db.session.scalar(query)
        if not user:
            log(log.ERROR, "Not found user by id : [%s]", form.user_id.data)
            flash("Failed to find user", "danger")
        user.first_name = form.first_name.data
        user.last_name = form.last_name.data
        user.email = form.email.data
        if form.password.data.strip("*\n "):
            user.password = form.password.data
        user.save()
        if form.next_url.data:
            return redirect(form.next_url.data)
        return redirect(url_for("user.get_all"))

    else:
        log(log.ERROR, "User save errors: [%s]", form.errors)
        flash(f"{form.errors}", "danger")
        return redirect(url_for("user.get_all"))


@bp.route("/delete/<int:id>", methods=["DELETE"])
@login_required
def delete(id: int):
    user = db.session.scalar(m.User.select().where(m.User.id == id))
    if not user:
        log(log.INFO, "There is no user with id: [%s]", id)
        flash("There is no such user", "danger")
        return "no user", 404

    logo = db.session.scalar(sa.select(m.UserLogo).where(m.UserLogo.user_id == 109))
    db.session.delete(logo)
    db.session.delete(user)
    db.session.commit()
    log(log.INFO, "User deleted. User: [%s]", user)
    flash("User deleted!", "success")
    return "ok", 200


@bp.route("/resend-invite", methods=["POST"])
@login_required
def resend_invite():
    form: f.ResendInviteForm = f.ResendInviteForm()
    if form.validate_on_submit():
        query = m.User.select().where(m.User.id == int(form.user_id.data))
        user: m.User | None = db.session.scalar(query)
        if not user:
            log(log.ERROR, "Not found user by id. Creating a new user.")
            user = m.User(email=form.email.data)
            log(log.INFO, "User created: [%s]", user)
            user.save()
            flash("A new user created", "info")

        log(log.INFO, "Sending an invite for user: [%s]", user)
        msg = Message(
            subject="New password",
            sender=app.config["MAIL_DEFAULT_SENDER"],
            recipients=[user.email],
        )
        url = url_for(
            "auth.activate",
            reset_password_uid=user.unique_id,
            _external=True,
        )
        msg.html = render_template(
            "email/confirm_invite.htm",
            user=user,
            url=url,
        )
        mail.send(msg)
        flash("Your invite has been successfully sent!", "success")
        log(log.INFO, "Invite is resend for user: [%s]", user)
        if form.next_url.data:
            return redirect(form.next_url.data)
        return redirect(url_for("user.get_all"))

    else:
        log(log.ERROR, "User save errors: [%s]", form.errors)
        flash(f"{form.errors}", "danger")
        return redirect(url_for("user.get_all"))


@bp.route("/account/<user_unique_id>", methods=["GET", "POST"])
@login_required
def account(user_unique_id: str):
    query = m.User.select().where(m.User.unique_id == user_unique_id)
    user: m.User | None = db.session.scalar(query)

    if not user:
        log(log.INFO, "User not found")
        flash("Incorrect reset password link", "danger")
        return redirect(url_for("main.index"))

    form: f.PaymentForm = f.PaymentForm()
    if request.method == "GET":
        form.email.data = user.email
        form.password.data = user.password
        form.password_confirmation.data = user.password
        form.first_name.data = user.first_name
        form.last_name.data = user.last_name
        form.name_of_dealership.data = user.name_of_dealership
        form.address_of_dealership.data = user.address_of_dealership
        form.country.data = user.country
        form.province.data = user.province
        form.city.data = user.city
        form.postal_code.data = user.postal_code
        form.plan.data = user.plan
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
        log(log.INFO, "User data updated. User: [%s]", user)
        flash("Your account has been successfully updated", "success")
        return redirect(url_for("user.account", user_unique_id=user_unique_id))

    elif form.is_submitted():
        log(log.ERROR, "User save errors: [%s]", form.errors)
        flash(f"{form.errors}", "danger")

    return render_template(
        "user/account.html",
        form=form,
        user=user,
        user_unique_id=user_unique_id,
    )

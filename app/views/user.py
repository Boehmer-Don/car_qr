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
    u = db.session.scalar(m.User.select().where(m.User.id == id))
    if not u:
        log(log.INFO, "There is no user with id: [%s]", id)
        flash("There is no such user", "danger")
        return "no user", 404

    db.session.delete(u)
    db.session.commit()
    log(log.INFO, "User deleted. User: [%s]", u)
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
        user.email = form.email.data
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

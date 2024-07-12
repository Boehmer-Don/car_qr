# flake8: noqa E712
import io
import json
from datetime import datetime
from flask import (
    Blueprint,
    abort,
    render_template,
    request,
    flash,
    redirect,
    url_for,
    Response,
)
from flask_login import login_required, current_user
from flask_mail import Message
import sqlalchemy as sa

from flask import current_app as app
from app.controllers import create_pagination, update_stripe_customer
from app import models as m, db, mail
from app import forms as f
from app.controllers.user import role_required
from app.logger import log

from .sellers import seller


bp = Blueprint("user", __name__, url_prefix="/user")
bp.register_blueprint(seller)


@bp.route("/", methods=["GET"])
@login_required
@role_required([m.UsersRole.admin])
def get_all():
    q = request.args.get("q", type=str, default=None)
    query = (
        m.User.select()
        .where(m.User.activated, m.User.deleted.is_(False), m.User.role == "dealer")
        .order_by(m.User.id)
    )
    count_query = (
        sa.select(sa.func.count())
        .where(m.User.activated, m.User.deleted.is_(False), m.User.role == "dealer")
        .select_from(m.User)
    )
    if q:
        query = (
            m.User.select()
            .where(m.User.activated, m.User.deleted.is_(False), m.User.role == "dealer")
            .where(
                m.User.first_name.ilike(f"%{q}%")
                | m.User.email.ilike(f"%{q}%")
                | m.User.last_name.ilike(f"%{q}%")
                | m.User.name_of_dealership.ilike(f"%{q}%")
            )
            .order_by(m.User.id)
        )
        count_query = (
            sa.select(sa.func.count())
            .where(m.User.activated, m.User.deleted.is_(False))
            .where(
                m.User.first_name.ilike(f"%{q}%")
                | m.User.email.ilike(f"%{q}%")
                | m.User.last_name.ilike(f"%{q}%")
                | m.User.name_of_dealership.ilike(f"%{q}%")
            )
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
            sa.select(m.User)
            .where(m.User.activated.is_(False), m.User.deleted.is_(False))
            .where(m.User.activated.is_(False), m.User.role == "dealer")
        ).all(),
    )


@bp.route("/search", methods=["GET"])
def get_user():
    email_input = request.args.get("email", type=str)
    if not email_input:
        return ""
    emails_query = (
        sa.select(m.User.email)
        .where(
            m.User.first_name.ilike(f"%{email_input}%")
            | m.User.email.ilike(f"%{email_input}%")
            | m.User.last_name.ilike(f"%{email_input}%")
            | m.User.name_of_dealership.ilike(f"%{email_input}%")
        )
        .where(m.User.activated, m.User.deleted.is_(False))
    )
    user_emails: m.User | None = db.session.scalars(emails_query).all()
    return render_template("label/user_search_results.html", user_emails=user_emails)


@bp.route("/admins", methods=["GET"])
@login_required
@role_required([m.UsersRole.admin])
def get_admins():
    if current_user.role != m.UsersRole.admin:
        return redirect(url_for("main.index"))
    q = request.args.get("q", type=str, default=None)
    query = (
        m.User.select()
        .where(m.User.deleted.is_(False), m.User.role == "admin")
        .order_by(m.User.id)
    )
    count_query = (
        sa.select(sa.func.count())
        .where(m.User.deleted.is_(False), m.User.role == "admin")
        .select_from(m.User)
    )
    if q:
        query = (
            m.User.select()
            .where(m.User.deleted.is_(False), m.User.role == "admin")
            .where(
                m.User.first_name.ilike(f"%{q}%")
                | m.User.email.ilike(f"%{q}%")
                | m.User.last_name.ilike(f"%{q}%")
                | m.User.name_of_dealership.ilike(f"%{q}%")
            )
            .order_by(m.User.id)
        )
        count_query = (
            sa.select(sa.func.count())
            .where(m.User.activated, m.User.deleted.is_(False))
            .where(
                m.User.first_name.ilike(f"%{q}%")
                | m.User.email.ilike(f"%{q}%")
                | m.User.last_name.ilike(f"%{q}%")
                | m.User.name_of_dealership.ilike(f"%{q}%")
            )
            .select_from(m.User)
        )

    pagination = create_pagination(total=db.session.scalar(count_query))

    return render_template(
        "user/admins.html",
        users=db.session.execute(
            query.offset((pagination.page - 1) * pagination.per_page).limit(
                pagination.per_page
            )
        ).scalars(),
        page=pagination,
        search_query=q,
    )


@bp.route("/<unique_id>/edit_modal", methods=["GET"])
@login_required
@role_required([m.UsersRole.admin])
def edit_modal(unique_id: str):
    """htmx"""
    user = db.session.scalar(sa.select(m.User).where(m.User.unique_id == unique_id))
    if not user:
        log(log.ERROR, "Not found user by id : [%s]", unique_id)
        return render_template(
            "toast.html", message="User not found", toast_type="danger"
        )
    form: f.UserForm = f.UserForm()

    return render_template("user/edit_modal.html", form=form, user=user)


@bp.route("/save", methods=["POST"])
@login_required
def save():
    form: f.UserForm = f.UserForm()
    if not form.validate_on_submit():
        log(log.ERROR, "User save errors: [%s]", form.errors)
        flash(f"{form.errors}", "danger")
        return redirect(url_for("user.get_all"))
    user = db.session.scalar(
        sa.select(m.User).where(m.User.id == int(form.user_id.data))
    )
    if not user:
        log(log.ERROR, "Not found user by id : [%s]", form.user_id.data)
        flash("Failed to find user", "danger")
        return redirect(url_for("user.get_all"))

    user.first_name = form.first_name.data
    user.last_name = form.last_name.data
    user.email = form.email.data
    if form.password.data and form.password.data.strip("*\n "):
        user.password = form.password.data
    user.save()
    if form.next_url.data:
        return redirect(form.next_url.data)

    if user.role == m.UsersRole.admin:
        return redirect(url_for("user.get_admins"))
    return redirect(url_for("user.get_all"))


@bp.route("/delete/<int:id>", methods=["DELETE"])
@login_required
def delete(id: int):
    user: m.User = db.session.scalar(m.User.select().where(m.User.id == id))
    if not user:
        log(log.INFO, "There is no user with id: [%s]", id)
        flash("There is no such user", "danger")
        return "no user", 404

    user.deleted = True
    user.email = f"{user.email}_{datetime.utcnow().isoformat()}"
    user.save()

    log(log.INFO, "User [%s] is set to deleted.", user)
    flash("User deleted!", "success")
    return "ok", 200


@bp.route("/activation", methods=["POST"])
@login_required
def activation():
    log(log.INFO, "User activation request")
    if current_user.role != m.UsersRole.seller:
        log(log.ERROR, "User [%s] is not a seller", current_user)
        return abort(403)
    current_user.activated = not current_user.activated
    db.session.commit()

    log(log.INFO, "User set [%s] for account.", current_user.activated)
    if current_user.activated:
        return redirect(url_for("user.account", user_unique_id=current_user.unique_id))
    # TODO mabye redirect to login page
    return redirect(url_for("auth.logout"))


@bp.route("/resend-invite", methods=["GET"])
@login_required
@role_required([m.UsersRole.admin])
def resend_invite_modal():
    """htmx"""
    user_email = request.args.get("user_email", type=str, default=None)
    form: f.ResendInviteForm = f.ResendInviteForm()
    if user_email:
        form.email.data = user_email
    return render_template("user/resend_invite_modal.html", form=form)


@bp.route("/resend-invite", methods=["POST"])
@login_required
@role_required([m.UsersRole.admin])
def resend_invite():
    form: f.ResendInviteForm = f.ResendInviteForm()
    if not form.validate_on_submit():
        log(log.ERROR, "User save errors: [%s]", form.errors)
        flash(f"{form.errors}", "danger")
        return redirect(url_for("user.get_all"))

    user = db.session.scalar(sa.select(m.User).where(m.User.email == form.email.data))
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
    return redirect(url_for("user.get_all"))


@bp.route("/account/<user_unique_id>", methods=["GET", "POST"])
@login_required
def account(user_unique_id: str):
    query = m.User.select().where(m.User.unique_id == user_unique_id)
    user: m.User | None = db.session.scalar(query)
    admin_emails = db.session.scalars(
        sa.select(m.User.email).where(m.User.role == m.UsersRole.admin)
    ).all()
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
        case _:
            with open("tests/db/canada_provinces.json", "r") as provinces_file:
                provinces_data = json.load(provinces_file)
                provinces = [p.get("name") for p in provinces_data]

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
        form.plan.data = user.plan.name
        form.phone.data = user.phone
        form.extra_emails.data = user.extra_emails

    if form.validate_on_submit():
        query = (
            m.User.select()
            .where(m.User.email == form.email.data)
            .where(m.User.id != int(user.id))
        )
        if db.session.scalar(query) is not None:
            log(
                log.INFO,
                "User %s tried to switch email to existing email",
                user_unique_id,
            )
            flash("Please, use another email", "danger")
            return redirect(url_for("user.account", user_unique_id=user_unique_id))

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
        user.extra_emails = (
            "" if not form.extra_emails.data.strip() else form.extra_emails.data.strip()
        )
        if user.email in admin_emails:
            log(
                log.INFO, "User %s tried to switch email to admin email", user_unique_id
            )
            flash("Please, use another email", "danger")
            return redirect(url_for("user.account", user_unique_id=user_unique_id))
        user.save()
        update_stripe_customer(user)
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
        provinces=provinces,
    )


@bp.route("/subscription/<user_unique_id>", methods=["GET", "POST"])
@login_required
def subscription(user_unique_id: str):
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
        flash("You are successfully changed your plan!", "success")
        return redirect(url_for("auth.payment", user_unique_id=user.unique_id))
    elif form.is_submitted():
        flash("Something went wrong. Form submission error", "danger")
        log(log.ERROR, "Form submitted error: [%s]", form.errors)

    return render_template(
        "user/subscription.html",
        form=form,
        user=user,
        user_unique_id=user_unique_id,
    )


@bp.route("/client_data/<sticker_id>", methods=["GET", "POST"])
def client_data(sticker_id: str):
    label: m.Label = db.session.scalar(
        m.Label.select().where(m.Label.sticker_id == sticker_id)
    )
    user = label.user

    form: f.Client = f.Client()
    if form.validate_on_submit():
        client = db.session.scalar(
            m.Client.select().where(m.Client.email == form.email.data)
        )
        if client:
            log(log.INFO, "Client already exists: [%s]", client)
            return redirect(url_for("user.thx_client", sticker_id=sticker_id))
        client = m.Client(
            first_name=form.first_name.data,
            last_name=form.last_name.data,
            email=form.email.data,
            phone=form.phone.data,
        )
        client.save()
        log(log.INFO, "Client created: [%s]", client)
        msg = Message(
            subject="Sales Lead",
            sender=app.config["MAIL_DEFAULT_SENDER"],
            recipients=[user.email] + user.extra_emails.split(","),
        )

        msg.html = render_template(
            "email/new_client.htm",
            name=f"{client.first_name} {client.last_name}",
            email=client.email,
            message=client.phone,
            username=f"{user.first_name} {user.last_name}",
            label_name=label.name,
            label_url=label.url,
        )
        mail.send(msg)

        return redirect(url_for("user.thx_client", sticker_id=sticker_id))
    elif form.is_submitted():
        flash("Something went wrong. Form submission error", "danger")
        log(log.ERROR, "Form submitted error: [%s]", form.errors)
        redirect(url_for("labels.gift", sticker_id=sticker_id))

    return render_template(
        "user/client_data.html",
        sticker_id=sticker_id,
        form=form,
        user=user,
    )


@bp.route("/thx_client/<sticker_id>", methods=["GET"])
def thx_client(sticker_id: str):
    label: m.Label = db.session.scalar(
        m.Label.select().where(m.Label.sticker_id == sticker_id)
    )
    return render_template("user/thx_client.html", label_url=label.url, user=label.user)


@bp.route("/logo/<user_unique_id>")
def get_logo(user_unique_id: str):
    user: m.User = db.session.scalar(
        m.User.select().where(m.User.unique_id == user_unique_id)
    )
    if not user:
        log(log.INFO, "User not found")
    logo: m.UserLogo = db.session.scalar(
        m.UserLogo.select().where(m.UserLogo.user_id == user.id)
    )
    if not logo:
        log(log.INFO, "Logo not found")
    buff = io.BytesIO(logo.file)
    return Response(
        buff,
        mimetype="image/png",
    )


@bp.route("/new_admin", methods=["GET", "POST"])
@login_required
@role_required([m.UsersRole.admin])
def new_admin():
    form: f.AdminForm = f.AdminForm()
    if request.method == "GET":
        return render_template("user/new_admin.html", form=form)

    if not form.validate_on_submit():
        log(log.ERROR, "Form validation error: [%s]", form.errors)
        flash(f"{form.errors}", "danger")
        return render_template("user/new_admin.html", form=form)

    user = m.User(
        role=m.UsersRole.admin,
        email=form.email.data,
        phone=form.phone.data,
        first_name=form.first_name.data,
        last_name=form.last_name.data,
        password=form.password.data,
        activated=True,
    )
    log(log.INFO, "Form submitted. New admin: [%s]", user)
    flash("New admin created!", "success")
    user.save()
    return redirect(url_for("user.get_admins"))


@bp.route("/<unique_id>/gift-items-modal", methods=["GET"])
@login_required
@role_required([m.UsersRole.admin])
def gift_items_modal(unique_id: str):
    """htmx"""

    user = db.session.scalar(sa.select(m.User).where(m.User.unique_id == unique_id))
    if not user:
        log(log.ERROR, "Not found user by id : [%s]", unique_id)
        return render_template(
            "toast.html", message="User not found", category="danger"
        )

    user_gift_items_ids = tuple(item.gift_item_id for item in user.gift_items)

    gift_items = db.session.scalars(m.GiftItem.select()).all()
    return render_template(
        "user/gift_items_modal.html",
        gift_items=gift_items,
        user_gift_items_ids=user_gift_items_ids,
        user=user,
    )


@bp.route(
    "/<user_unique_id>/gift-items/<item_unque_id>/add",
    methods=["POST", "DELETE"],
)
@login_required
@role_required([m.UsersRole.admin])
def set_item(user_unique_id: str, item_unque_id: str):

    user = db.session.scalar(
        sa.select(m.User).where(m.User.unique_id == user_unique_id)
    )
    if not user:
        log(log.ERROR, "Not found user by id : [%s]", user_unique_id)
        return render_template(
            "toast.html", message="User not found", category="danger"
        )
    gift_item = db.session.scalar(
        sa.select(m.GiftItem).where(m.GiftItem.unique_id == item_unque_id)
    )
    if not gift_item:
        log(log.ERROR, "Not found gift item by id : [%s]", item_unque_id)
        return render_template(
            "toast.html", message="Gift item not found", category="danger"
        )

    if request.method == "POST":
        user_gift_item = m.DealerGiftItem(
            dealer_id=user.id,
            gift_item_id=gift_item.id,
            description=gift_item.description,
            price=gift_item.price,
        )
        user_gift_item.save()
        log(log.INFO, "Gift item added to user: [%s]", user)

    if request.method == "DELETE":
        user_gift_item = db.session.scalar(
            sa.select(m.DealerGiftItem)
            .where(m.DealerGiftItem.dealer_id == user.id)
            .where(m.DealerGiftItem.gift_item_id == gift_item.id)
        )
        if not user_gift_item:
            log(log.ERROR, "Not found user gift item")
            return render_template(
                "toast.html", message="User gift item not found", category="danger"
            )
        db.session.delete(user_gift_item)
        db.session.commit()
        log(log.INFO, "Gift item deleted from user: [%s]", user)

    return render_template("user/user_gift_item.html", item=gift_item, user=user)

# flake8: noqa E712
import io
import json
from datetime import datetime
from flask import (
    Blueprint,
    render_template,
    request,
    flash,
    redirect,
    session,
    url_for,
    Response,
)
from flask_login import login_required, current_user, login_user, logout_user
from flask_mail import Message
import sqlalchemy as sa

from app.controllers import create_pagination, role_required
from app import models as m, db
from app import forms as f
from app.logger import log

seller = Blueprint("seller", __name__, url_prefix="/sellers")


@seller.route("/", methods=["GET"])
@login_required
@role_required([m.UsersRole.dealer])
def get_user_sellers():
    log(log.INFO, "Getting user sellers")
    login_as_seller_form = f.LoginAsSellerForm()
    q = request.args.get("q", type=str, default=None)
    stmt = sa.and_(
        m.User.deleted.is_(False),
        m.User.role == "seller",
        m.User._seller_id == current_user.id,
    )
    query = sa.select(m.User).where(stmt).order_by(m.User.id)
    count_query = sa.select(sa.func.count()).where(stmt).select_from(m.User)

    if q:
        query = query.where(
            m.User.first_name.ilike(f"%{q}%")
            | m.User.email.ilike(f"%{q}%")
            | m.User.last_name.ilike(f"%{q}%")
        )
        count_query = query.where(
            m.User.first_name.ilike(f"%{q}%")
            | m.User.email.ilike(f"%{q}%")
            | m.User.last_name.ilike(f"%{q}%")
        ).select_from(m.User)

    pagination = create_pagination(total=db.session.scalar(count_query))

    return render_template(
        "seller/sellers.html",
        sellers=db.session.execute(
            query.offset((pagination.page - 1) * pagination.per_page).limit(
                pagination.per_page
            )
        ).scalars(),
        page=pagination,
        login_as_seller_form=login_as_seller_form,
    )


@seller.route("/create", methods=["GET"])
@login_required
@role_required([m.UsersRole.dealer])
def get_create_modal():
    form = f.SellerForm()
    return render_template("seller/add_modal.html", form=form)


@seller.route("/create", methods=["POST"])
@login_required
@role_required([m.UsersRole.dealer])
def create():
    form = f.SellerForm()
    if not form.validate_on_submit():
        log(log.ERROR, "Invalid form data [%s]", form.errors)
        flash(f"Invalid form data [{form.format_errors}]", "danger")
        return redirect(url_for("user.seller.get_user_sellers"))

    user = m.User(
        first_name=form.first_name.data,
        last_name=form.last_name.data,
        email=form.email.data,
        role=m.UsersRole.seller,
        _seller_id=current_user.id,
        password=form.password.data,
        activated=True,
    )
    db.session.add(user)
    db.session.commit()
    flash("Seller created", "success")
    return redirect(url_for("user.seller.get_user_sellers"))


@seller.route("/edit/<unique_id>", methods=["GET"])
@login_required
@role_required([m.UsersRole.dealer])
def get_edit_modal(unique_id: str):
    user = db.session.scalar(sa.select(m.User).where(m.User.unique_id == unique_id))

    if not user or user.seller_id != current_user.id:
        log(log.ERROR, "Seller not found [%s]", unique_id)
        return render_template(
            "toast.html", message="Seller not found", category="danger"
        )
    form = f.EditSellerFrom()
    return render_template("seller/edit_modal.html", form=form, user=user)


@seller.route("/edit", methods=["POST"])
@login_required
@role_required([m.UsersRole.dealer])
def edit():
    form = f.EditSellerFrom()
    if not form.validate_on_submit():
        log(log.ERROR, "Invalid form data [%s]", form.errors)
        flash(f"Invalid form data [{form.format_errors}]", "danger")
        return redirect(url_for("user.seller.get_user_sellers"))
    user = db.session.scalar(
        sa.select(m.User).where(m.User.unique_id == form.unique_id.data)
    )

    if not user:
        log(log.ERROR, "Seller not found [%s]", form.unique_id.data)
        flash("Seller not found", "danger")
        return redirect(url_for("user.seller.get_user_sellers"))

    user.first_name = form.first_name.data
    user.last_name = form.last_name.data
    user.email = form.email.data
    user.activated = form.activated.data
    if form.new_password.data:
        user.password = form.new_password.data

    db.session.commit()

    return redirect(url_for("user.seller.get_user_sellers"))


@seller.route("/login-as-seller", methods=["POST"])
@login_required
@role_required([m.UsersRole.dealer])
def login_as_seller():
    form = f.LoginAsSellerForm()
    if not form.validate_on_submit():
        log(log.ERROR, "Invalid form data [%s]", form.errors)
        flash(f"Invalid form data [{form.format_errors}]", "danger")
        return redirect(url_for("user.seller.get_user_sellers"))
    seller = db.session.scalar(
        sa.select(m.User).where(m.User.unique_id == form.unique_id.data)
    )
    if not seller or seller.seller_id != current_user.id:
        log(log.ERROR, "Seller not found [%s]", form.unique_id.data)
        flash("Seller not found", "danger")
        return redirect(url_for("user.seller.get_user_sellers"))
    logout_user()
    log(log.INFO, "You were logged out.")
    session.clear()

    login_user(seller)
    log(log.INFO, "You were logged in as seller [%s]", seller.unique_id)
    flash("You were logged in as seller", "success")
    return redirect(url_for("user.account", user_unique_id=seller.unique_id))

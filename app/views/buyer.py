from flask import Blueprint, render_template, url_for, redirect, flash, request
from flask_login import login_user, login_required, current_user
import sqlalchemy as sa
from app import models as m
from app import forms as f
from app import db
from app.controllers.user import role_required
from app.logger import log


buyer_blueprint = Blueprint("buyer", __name__, url_prefix="/buyer")


@buyer_blueprint.route("/<sticker_id>", methods=["GET", "POST"])
def login(sticker_id: str):
    form = f.LoginForm()

    if request.method == "GET":
        return render_template("buyer/login.html", form=form, sticker_id=sticker_id)

    if not form.validate_on_submit():
        log(log.WARNING, "Form validation failed. Form: [%s]", form)
        flash("Data validation failed", "danger")
        return render_template("buyer/login.html", form=form, sticker_id=sticker_id)

    user: m.User = m.User.authenticate(form.user_id.data, form.password.data)
    log(log.INFO, "Form submitted. User: [%s]", user)
    if not user:
        log(log.WARNING, "Login failed")
        flash("Wrong user email or password.", "danger")
        return render_template("buyer/login.html", form=form, sticker_id=sticker_id)

    if user.role != m.UsersRole.buyer:
        log(log.WARNING, "Unauthorized user. User: [%s]", user)
        flash(
            "You are not authorized to access this page.",
            "danger",
        )
        return redirect(url_for("auth.login"))

    label = db.session.scalar(
        sa.select(m.Label).where(m.Label.sticker_id == sticker_id)
    )

    if not label or not label.oil_not_changed:
        log(log.WARNING, "Unauthorized user. User: [%s]", user)
        flash(
            "You are not authorized to access this page.",
            "danger",
        )
        return redirect(url_for("auth.login"))

    oil_change = db.session.scalar(
        sa.select(m.OilChange)
        .where(
            m.OilChange.sale_rep_id == label.sale_report.id,
            m.OilChange.is_done.is_(False),
        )
        .order_by(m.OilChange.date.asc())
    )
    if not oil_change:
        log(log.INFO, "Oil change not found. Oil change: [%s]", oil_change)
        flash("Data validation failed", "danger")
        return redirect(url_for("auth.login"))
    login_user(user)
    log(log.INFO, "Login successful.")
    flash("Login successful.", "success")
    form = f.OilChangeDoneForm()
    form.oil_change_unique_id.data = oil_change.unique_id

    return render_template("buyer/confirm_oil_change.html", label=label, form=form)


@buyer_blueprint.route("/confirm-oil-change", methods=["POST"])
@login_required
@role_required([m.UsersRole.buyer])
def confirm_oil_change():
    form = f.OilChangeDoneForm()
    if not form.validate_on_submit():
        log(log.WARNING, "Form validation failed. Form: [%s]", form)
        flash("Data validation failed", "danger")
        return redirect(url_for("main.landing"))
    oil_change = db.session.scalar(
        sa.select(m.OilChange).where(
            m.OilChange.unique_id == form.oil_change_unique_id.data
        )
    )
    if not oil_change or oil_change.sale_rep.buyer_id != current_user.id:
        log(
            log.WARNING,
            "Oil change not found. ID: [%s]",
        )
        flash("Data is not valid", "danger")

        return redirect(url_for("main.landing"))

    if not oil_change.is_not_done:
        log(
            log.WARNING, "Oil change date is in the future. Date: [%s]", oil_change.date
        )
        flash(
            f"it's too soon to change the oil in the car, try {oil_change.date.strftime('%d/%m/%Y')}",
            "danger",
        )
        return redirect(url_for("main.landing"))

    log(log.INFO, "Submit form oil_change: [%s]", oil_change.unique_id)
    oil_change.is_done = True
    db.session.commit()

    return render_template(
        "buyer/confirm_oil_change.html",
        label=oil_change.sale_rep.label,
        form=form,
        is_done=oil_change.is_done,
    )

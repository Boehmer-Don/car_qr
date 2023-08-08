# flake8: noqa F401
from datetime import datetime
from flask import (
    Blueprint,
    render_template,
    request,
    flash,
    redirect,
    url_for,
)
from flask_login import login_required, current_user
import sqlalchemy as sa
from flask import current_app as app
from app.controllers import (
    create_pagination,
    create_payment_subscription_checkout_session,
)
from app import models as m, db
from app import forms as f
from app.logger import log


dealer_blueprint = Blueprint("labels", __name__, url_prefix="/labels")


@dealer_blueprint.route("/active", methods=["GET"])
@login_required
def get_active_labels():
    query = (
        m.Label.select()
        .where(m.Label.user_id == current_user.id)
        .where(m.Label.status == m.LabelStatus.active)
        .order_by(m.Label.id)
    )
    count_query = (
        sa.select(sa.func.count())
        .select_from(m.Label)
        .where(m.Label.user_id == current_user.id)
        .where(m.Label.status == m.LabelStatus.active)
    )
    pagination = create_pagination(total=db.session.scalar(count_query))
    return render_template(
        "label/labels_active.html",
        labels=db.session.execute(
            query.offset((pagination.page - 1) * pagination.per_page).limit(
                pagination.per_page
            )
        ).scalars(),
        page=pagination,
    )


@dealer_blueprint.route("/archived", methods=["GET"])
@login_required
def get_archived_labels():
    query = (
        m.Label.select()
        .where(m.Label.user_id == current_user.id)
        .where(m.Label.status == m.LabelStatus.archived)
        .order_by(m.Label.id)
    )
    count_query = (
        sa.select(sa.func.count())
        .select_from(m.Label)
        .where(m.Label.user_id == current_user.id)
        .where(m.Label.status == m.LabelStatus.archived)
    )
    pagination = create_pagination(total=db.session.scalar(count_query))
    labels = db.session.execute(
        query.offset((pagination.page - 1) * pagination.per_page).limit(
            pagination.per_page
        )
    ).scalars()
    return render_template(
        "label/labels_archived.html",
        labels=labels,
        page=pagination,
    )


@dealer_blueprint.route("/deactivate", methods=["GET", "POST"])
@login_required
def deactivate_label():
    form: f.DeactivateLabelForm = f.DeactivateLabelForm()
    if form.validate_on_submit():
        label: m.Label = db.session.scalar(
            sa.select(m.Label).where(m.Label.unique_id == form.unique_id.data)
        )
        if not label:
            log(log.ERROR, "Failed to find label : [%s]", form.unique_id.data)
            flash("Failed to find label", "danger")
            return redirect(
                url_for(
                    "labels.get_active_labels",
                    user_unique_id=current_user.unique_id,
                )
            )
        label.status = m.LabelStatus.archived
        label.date_deactivated = datetime.utcnow()
        label.save()
        log(log.INFO, "Deactivated label : [%s]", form.unique_id.data)
    elif form.is_submitted():
        log(log.ERROR, "User save errors: [%s]", form.errors)
        flash(f"Failed to validate form: {form.errors}", "danger")
    return redirect(url_for("labels.get_archived_labels"))


@dealer_blueprint.route("/edit", methods=["GET", "POST"])
@login_required
def label_details():
    form: f.LabelForm = f.LabelForm()
    if form.validate_on_submit():
        label = db.session.scalar(
            sa.select(m.Label).where(m.Label.unique_id == form.unique_id.data)
        )
        if not label:
            log(log.ERROR, "Failed to find label : [%s]", form.unique_id.data)
            flash("Failed to find label", "danger")
            return redirect(
                url_for(
                    "labels.get_active_labels",
                    user_unique_id=current_user.unique_id,
                )
            )
        label.sticker_id = form.sticker_id.data
        label.name = form.name.data
        label.make = form.make.data
        label.vehicle_model = form.vehicle_model.data
        label.year = form.year.data
        label.mileage = form.mileage.data
        label.color = form.color.data
        label.trim = form.trim.data
        label.type_of_vehicle = form.type_of_vehicle.data
        label.price = form.price.data
        label.url = form.url.data
        label.save()
        if form.next_url.data:
            return redirect(form.next_url.data)
        return redirect(url_for("user.get_all"))

    elif form.is_submitted():
        log(log.ERROR, "User save errors: [%s]", form.errors)
        flash(f"{form.errors}", "danger")
        return redirect(url_for("user.get_all"))


@dealer_blueprint.route("/reporting", methods=["GET", "POST"])
@login_required
def reporting():
    return render_template("label/reporting.html")


@dealer_blueprint.route("/amount/<user_unique_id>", methods=["GET", "POST"])
@login_required
def new_label_set_amount(user_unique_id: str):
    form: f.LabelsAmountForm = f.LabelsAmountForm()
    if form.validate_on_submit():
        labels_amount = int(form.amount.data)
        log(
            log.INFO,
            "Creating [%s] labels for user [%s]",
            labels_amount,
            user_unique_id,
        )
        return redirect(
            url_for(
                "labels.new_label_set_details",
                user_unique_id=user_unique_id,
                amount=labels_amount,
            )
        )
    return render_template(
        "label/new_label.html",
        user_unique_id=user_unique_id,
        form=form,
    )


@dealer_blueprint.route("/details/<user_unique_id>/<amount>", methods=["GET", "POST"])
@login_required
def new_label_set_details(user_unique_id: str, amount: int):
    if request.method == "POST":
        for i in range(1, int(amount) + 1):
            label = m.Label(
                sticker_id=request.form.get(f"sticker-number-{i}"),
                name=request.form.get(f"name-{i}"),
                make=request.form.get(f"make-{i}"),
                vehicle_model=request.form.get(f"vehicle_model-{i}"),
                year=request.form.get(f"year-{i}"),
                mileage=request.form.get(f"mileage-{i}"),
                color=request.form.get(f"color-{i}"),
                trim=request.form.get(f"trim-{i}"),
                type_of_vehicle=request.form.get(f"type_of_vehicle-{i}"),
                price=request.form.get(f"price-{i}"),
                url=request.form.get(f"url-{i}"),
                status=m.LabelStatus.cart,
                user_id=current_user.id,
            ).save()
            log(log.INFO, "Created label [%s]", label)
        # log(log.INFO, "Created [%s] labels: [%s]", amount)
        return redirect(
            url_for("labels.new_label_payment", user_unique_id=user_unique_id)
        )

    return render_template(
        "label/new_labels_details.html",
        user_unique_id=user_unique_id,
        amount=amount,
    )


@dealer_blueprint.route("/payment/<user_unique_id>/", methods=["GET", "POST", "PUT"])
@login_required
def new_label_payment(user_unique_id: str):
    labels = db.session.scalars(
        m.Label.select().where(m.Label.status == m.LabelStatus.cart)
    ).all()
    if request.method == "POST":
        if request.form.get("edit"):
            for index, label in enumerate(labels):
                label.sticker_id = request.form.get(f"sticker-number-{index + 1}")
                label.name = request.form.get(f"name-{index + 1}")
                label.make = request.form.get(f"make-{index + 1}")
                label.vehicle_model = request.form.get(f"vehicle_model-{index + 1}")
                label.year = request.form.get(f"year-{index + 1}")
                label.mileage = request.form.get(f"mileage-{index + 1}")
                label.color = request.form.get(f"color-{index + 1}")
                label.trim = request.form.get(f"trim-{index + 1}")
                label.type_of_vehicle = request.form.get(f"type_of_vehicle-{index + 1}")
                label.price = request.form.get(f"price-{index + 1}")
                label.url = request.form.get(f"url-{index + 1}")
                label.user_id = current_user.id
                label.save()

        if request.form.get("payment"):
            # stripe
            stripe_form_url = create_payment_subscription_checkout_session(
                current_user,
                [label.name for label in labels],
                [label.unique_id for label in labels],
                len(labels),
            )

            if stripe_form_url:
                log(log.INFO, "Payment redirect for labels: [%s]", labels)
                return redirect(stripe_form_url)
    return render_template(
        "label/new_labels_payment.html",
        user_unique_id=user_unique_id,
        labels=labels,
    )


@dealer_blueprint.route("/l/<label_unique_id>")
def redirect_to_outer_url(label_unique_id: str):
    label: m.Label = db.session.scalar(
        m.Label.select().where(m.Label.unique_id == label_unique_id)
    )
    label.views += 1
    label.save()
    return redirect(label.url)


@dealer_blueprint.route("/stripe/<user_unique_id>", methods=["GET", "POST"])
def stripe(user_unique_id: str):
    # All labels that are in cart
    return render_template(
        "label/stripe.html",
        user_unique_id=user_unique_id,
    )

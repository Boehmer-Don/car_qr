# flake8: noqa F401
import secrets
import string
import csv
import io
from datetime import datetime
from flask import (
    Blueprint,
    render_template,
    request,
    flash,
    redirect,
    url_for,
    send_file,
    Response,
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
    if current_user.role and current_user.role.value == "admin":
        query = (
            m.Label.select()
            .where(m.Label.status == m.LabelStatus.active)
            .order_by(m.Label.date_activated.desc())
        )
        count_query = (
            sa.select(sa.func.count())
            .select_from(m.Label)
            .where(m.Label.status == m.LabelStatus.active)
        )
    else:
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
    if current_user.role and current_user.role.value == "admin":
        query = (
            m.Label.select()
            .where(m.Label.status == m.LabelStatus.archived)
            .order_by(m.Label.id)
        )
        count_query = (
            sa.select(sa.func.count())
            .select_from(m.Label)
            .where(m.Label.status == m.LabelStatus.archived)
        )
    else:
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
    makes = db.session.scalars(m.CarMake.select()).all()
    models = db.session.scalars(m.CarModel.select()).all()
    trims = db.session.scalars(m.CarTrim.select()).all()
    types = db.session.scalars(m.CarType.select()).all()
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
        return redirect(
            url_for("labels.new_label_payment", user_unique_id=user_unique_id)
        )

    return render_template(
        "label/new_labels_details.html",
        user_unique_id=user_unique_id,
        amount=amount,
        makes=makes,
        models=models,
        trims=trims,
        types=types,
    )


@dealer_blueprint.route("/payment/<user_unique_id>/", methods=["GET", "POST", "PUT"])
@login_required
def new_label_payment(user_unique_id: str):
    labels = db.session.scalars(
        m.Label.select()
        .where(m.Label.user_id == current_user.id)
        .where(m.Label.status == m.LabelStatus.cart)
    ).all()
    makes = db.session.scalars(m.CarMake.select()).all()
    models = db.session.scalars(m.CarModel.select()).all()
    trims = db.session.scalars(m.CarTrim.select()).all()
    types = db.session.scalars(m.CarType.select()).all()
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
                db.session.add(label)
            if len(labels):
                db.session.commit()

        if request.form.get("payment"):
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
        makes=makes,
        models=models,
        trims=trims,
        types=types,
    )


@dealer_blueprint.route("/get_models", methods=["POST"])
def get_models():
    make_name = request.json.get("makeSelected")
    models = db.session.scalars(
        sa.select(m.CarModel.name).where(
            m.CarModel.make.has(m.CarMake.name == make_name)
        )
    ).all()
    return {"models": models}


def generate_alphanumeric_code():
    letters = "".join(secrets.choice(string.ascii_letters) for _ in range(2))
    digits = "".join(
        secrets.choice(string.digits)
        for _ in range(app.config.get("ALPHANUMERIC_CODE_LENGTH") - 2)
    )
    return letters + digits


@dealer_blueprint.route("/generate/<user_unique_id>", methods=["GET", "POST"])
@login_required
def generate(user_unique_id: str):
    query = m.User.select().where(m.User.unique_id == user_unique_id)
    user: m.User | None = db.session.scalar(query)

    if request.method == "POST":
        labels_amount = int(request.form.get("amount"))
        log(
            log.INFO,
            "Generating [%s] labels for user [%s]",
            labels_amount,
            user_unique_id,
        )
        for _ in range(labels_amount):
            generated_code = generate_alphanumeric_code()
            while True:
                if not db.session.scalar(
                    m.Sticker.select().where(m.Sticker.code == generated_code)
                ):
                    break
                generated_code = generate_alphanumeric_code()

            sticker = m.Sticker(
                code=generated_code,
                user_id=user.id,
            )
            db.session.add(sticker)
        if labels_amount:
            db.session.commit()

        return redirect(
            url_for(
                "labels.download",
                user_unique_id=user_unique_id,
                amount=labels_amount,
            )
        )

    if not user:
        log(log.INFO, "User not found")
        flash("Incorrect reset password link", "danger")
        return redirect(url_for("main.index"))

    return render_template(
        "label/generate.html",
        user=user,
        user_unique_id=user_unique_id,
    )


@dealer_blueprint.route("/download", methods=["GET", "POST"])
@login_required
def download():
    user_unique_id = request.args.get("user_unique_id")
    query = m.User.select().where(m.User.unique_id == user_unique_id)
    user: m.User | None = db.session.scalar(query)

    logo_link = None
    if user:
        stickers = db.session.scalars(
            m.Sticker.select()
            .where(m.Sticker.pending == True)
            .where(m.Sticker.user == user)
        ).all()
        if user.logo:
            logo_link = f"user/logo/{user.unique_id}"

    else:
        stickers = db.session.scalars(
            m.Sticker.select().where(m.Sticker.pending == True)
        ).all()

    if request.form.get("logo-download"):
        return send_file(
            io.BytesIO(user.logo[0].file),
            as_attachment=True,
            download_name=f"logo_{user.first_name}_{user.last_name}_{datetime.now()}.png",
            mimetype="image/png",
            max_age=0,
            last_modified=datetime.now(),
        )

    if request.form.get("pending-labels-download"):
        with io.StringIO() as proxy:
            writer = csv.writer(proxy)
            row = [
                "Sticker ID",
                "User's First Name",
                "User's Last Name",
                "User Email",
                "Date Created",
                "Landing URL",
                "Alphanumeric Code",
            ]
            writer.writerow(row)
            for sticker in stickers:
                row = [
                    sticker.id,
                    sticker.user.first_name,
                    sticker.user.last_name,
                    sticker.user.email,
                    sticker.created_at,
                    app.config.get("LANDING_URL"),
                    sticker.code,
                ]
                writer.writerow(row)

            mem = io.BytesIO()
            mem.write(proxy.getvalue().encode("utf-8"))
            mem.seek(0)

        now = datetime.now()
        download_name = f"all_pending_qrs_{now.strftime('%Y-%m-%d-%H-%M-%S')}.csv"
        if user:
            download_name = f"pending_qrs_{user.first_name}_{user.last_name}_{now.strftime('%Y-%m-%d-%H-%M-%S')}.csv"
        return send_file(
            mem,
            as_attachment=True,
            download_name=download_name,
            mimetype="text/csv",
            max_age=0,
            last_modified=now,
        )

    return render_template(
        "label/download.html",
        user_unique_id=user_unique_id,
        user=user,
        stickers=stickers,
        url=app.config.get("LANDING_URL"),
        logo_link=logo_link,
    )


@dealer_blueprint.route("/new_make", methods=["GET", "POST"])
@login_required
def new_make():
    new_make = request.form.get("new_make_name")
    next_url = request.form.get("next_url")

    make = db.session.scalar(sa.select(m.CarMake).where(m.CarMake.name == new_make))
    if not make:
        m.CarMake(name=new_make).save()
        log(log.INFO, "Created new make: [%s]", new_make)
    else:
        log(log.INFO, "Make already exists: [%s]", new_make)

    return redirect(next_url)


@dealer_blueprint.route("/new_model", methods=["GET", "POST"])
@login_required
def new_model():
    new_model = request.form.get("new_model_name")
    next_url = request.form.get("next_url")
    make = request.form.get("model_make")

    make = db.session.scalar(sa.select(m.CarMake).where(m.CarMake.name == make))
    if not make:
        log(log.ERROR, "Failed to find make : [%s]", make)
        flash("Failed to find make", "danger")
        return redirect(next_url)

    model = db.session.scalar(sa.select(m.CarMake).where(m.CarMake.name == new_model))
    if not model:
        m.CarModel(
            name=new_model,
            make_id=make.id,
        ).save()
        log(log.INFO, "Created new model: [%s]", new_model)
    else:
        log(log.INFO, "Model already exists: [%s]", new_model)

    return redirect(next_url)


@dealer_blueprint.route("/new_trim", methods=["GET", "POST"])
@login_required
def new_trim():
    new_trim = request.form.get("new_trim_name")
    next_url = request.form.get("next_url")

    trim = db.session.scalar(sa.select(m.CarTrim).where(m.CarTrim.name == new_trim))
    if not trim:
        m.CarTrim(name=new_trim).save()
        log(log.INFO, "Created new trim: [%s]", new_trim)
    else:
        log(log.INFO, "Trim already exists: [%s]", new_trim)

    return redirect(next_url)


@dealer_blueprint.route("/new_type", methods=["GET", "POST"])
@login_required
def new_type():
    new_type = request.form.get("new_type_name")
    next_url = request.form.get("next_url")

    type = db.session.scalar(sa.select(m.CarType).where(m.CarType.name == new_type))
    if not type:
        m.CarType(name=new_type).save()
        log(log.INFO, "Created new type: [%s]", new_type)
    else:
        log(log.INFO, "Type already exists: [%s]", new_type)

    return redirect(next_url)


@dealer_blueprint.route("/delete_from_cart/<label_unique_id>")
@login_required
def delete_from_cart(label_unique_id):
    label = db.session.scalar(
        sa.select(m.Label).where(m.Label.unique_id == label_unique_id)
    )

    if not label:
        log(log.ERROR, "Failed to find label : [%s]", label_unique_id)
        flash("Failed to find label", "danger")
        return redirect(
            url_for("labels.new_label_payment", user_unique_id=current_user.unique_id)
        )

    if label.status != m.LabelStatus.cart:
        log(log.ERROR, "Label is not in cart : [%s]", label_unique_id)
        flash("Label is not in cart", "danger")
        return redirect(
            url_for("labels.new_label_payment", user_unique_id=current_user.unique_id)
        )

    try:
        db.session.delete(label)
        db.session.commit()
        log(log.INFO, "Deleted label : [%s]", label_unique_id)
    except Exception as e:
        log(log.ERROR, "Failed to delete label: [%s]", e)
        flash("Failed to delete label", "danger")
        return redirect(
            url_for("labels.new_label_payment", user_unique_id=current_user.unique_id)
        )

    return redirect(
        url_for("labels.new_label_payment", user_unique_id=current_user.unique_id)
    )

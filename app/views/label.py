# flake8: noqa F401
import secrets
import string
import csv
import io
from datetime import datetime, timedelta
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
from flask_mail import Message, Mail
import sqlalchemy as sa
from flask import current_app as app
from app.controllers import (
    create_pagination,
    create_payment_subscription_checkout_session,
)
from app import models as m, db
from app import forms as f
from app.logger import log
from app.controllers.date_convert import date_convert


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
            .order_by(m.Label.date_received.desc())
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
            .order_by(m.Label.date_deactivated.desc())
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
            .order_by(m.Label.date_deactivated.desc())
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
        label.price_sold = form.price_sold.data
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


@dealer_blueprint.route("/edit_cart_label/<label_unique_id>", methods=["GET", "POST"])
@login_required
def edit_cart_label(label_unique_id: str):
    label = db.session.scalar(
        sa.select(m.Label).where(m.Label.unique_id == label_unique_id)
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

    makes = db.session.scalars(m.CarMake.select()).all()
    models = db.session.scalars(m.CarModel.select()).all()
    trims = db.session.scalars(m.CarTrim.select()).all()
    types = db.session.scalars(m.CarType.select()).all()

    form: f.LabelForm = f.LabelForm()
    if form.validate_on_submit():
        label.sticker_id = form.sticker_id.data
        label.gift = form.gift.data
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
        return redirect(
            url_for("labels.new_label_payment", user_unique_id=current_user.unique_id)
        )

    elif form.is_submitted():
        log(log.ERROR, "User save errors: [%s]", form.errors)
        flash(f"{form.errors}", "danger")
        return redirect(url_for("user.get_all"))

    return render_template(
        "label/edit_cart_label.html",
        form=form,
        label=label,
        user_unique_id=current_user.unique_id,
        makes=makes,
        models=models,
        trims=trims,
        types=types,
    )


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
            make_input = request.form.get(f"make-{i}")
            make = db.session.scalar(
                m.CarMake.select().where(m.CarMake.name == make_input)
            )
            if not make:
                make = m.CarMake(name=make_input)
                make.save()
                log(log.INFO, "Created new make: [%s]", make_input)
            model_input = request.form.get(f"vehicle_model-{i}")
            model = db.session.scalar(
                m.CarModel.select().where(m.CarModel.name == model_input)
            )
            if not model:
                model = m.CarModel(
                    name=model_input,
                    make_id=make.id,
                )
                model.save()
                log(log.INFO, "Created new model: [%s]", model_input)
            trim_input = request.form.get(f"trim-{i}")
            trim = db.session.scalar(
                m.CarTrim.select().where(m.CarTrim.name == trim_input)
            )
            if not trim:
                m.CarTrim(
                    name=trim_input,
                    model_id=model.id,
                ).save()
                log(log.INFO, "Created new trim: [%s]", trim_input)
            type_input = request.form.get(f"type-{i}")
            vehicle_type = db.session.scalar(
                m.CarType.select().where(m.CarType.name == type_input)
            )
            if not vehicle_type:
                m.CarType(name=type_input).save()
                log(log.INFO, "Created new type: [%s]", type_input)

            url_input = request.form.get(f"url-{i}")
            if url_input and not url_input.startswith("http"):
                url_input = f"https://{url_input}"

            label = m.Label(
                sticker_id=request.form.get(f"sticker-number-{i}"),
                name=request.form.get(f"name-{i}"),
                make=make_input,
                vehicle_model=model_input,
                year=request.form.get(f"year-{i}"),
                mileage=request.form.get(f"mileage-{i}"),
                color=request.form.get(f"color-{i}"),
                trim=trim_input,
                type_of_vehicle=type_input,
                price=request.form.get(f"price-{i}"),
                url=url_input,
                status=m.LabelStatus.cart,
                user_id=current_user.id,
                gift=request.form.get(f"gift-{i}"),
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
                label.gift = request.form.get(f"gift-{index + 1}")
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


@dealer_blueprint.route("/get_makes", methods=["POST"])
def get_makes():
    make_name = request.json.get("makeTyped")
    makes = db.session.scalars(
        sa.select(m.CarMake.name).where(m.CarMake.name.ilike(f"%{make_name}%"))
    ).all()
    return {"makes": makes}


@dealer_blueprint.route("/get_models", methods=["POST"])
def get_models():
    make_name = request.json.get("makeSelected")
    model_typed = request.json.get("modelTyped")

    models_query = sa.select(m.CarModel.name)
    if make_name:
        log(log.INFO, "Make name provided. Fetching all models for [%s]", make_name)
        models_query = models_query.where(
            m.CarModel.make.has(m.CarMake.name == make_name)
        )
    if model_typed:
        log(log.INFO, "Model name provided. Fetching all models for [%s]", model_typed)
        models_query = models_query.where(m.CarModel.name.ilike(f"%{model_typed}%"))
    if not model_typed and not make_name:
        log(log.INFO, "No make or model name provided. Fetching all models.")

    models = db.session.scalars(models_query).all()
    return {"models": models}


def generate_alphanumeric_code():
    letters = "".join(secrets.choice(string.ascii_letters) for _ in range(2))
    digits = "".join(
        secrets.choice(string.digits)
        for _ in range(app.config.get("ALPHANUMERIC_CODE_LENGTH") - 2)
    )
    return letters + digits


@dealer_blueprint.route("/get_trims", methods=["POST"])
def get_trims():
    model_name = request.json.get("modelSelected")

    trims_query = sa.select(m.CarTrim.name)
    if model_name:
        log(
            log.INFO,
            "Model name provided. Fetching make, type and all trims for [%s]",
            model_name,
        )
        model = db.session.scalar(
            sa.select(m.CarModel).where(m.CarModel.name == model_name)
        )
        make = model.make.name
        vehicle_type = model.vehicle_type.name
        trims_query = trims_query.where(
            m.CarTrim.model.has(m.CarModel.name == model_name)
        )
    else:
        log(log.INFO, "No model name provided. Fetching all trims.")

    trims = db.session.scalars(trims_query).all()
    return {"trims": trims, "make": make, "type": vehicle_type}


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
                pending_labels = db.session.scalar(
                    m.Sticker.select().where(m.Sticker.code == generated_code)
                )
                active_labels = db.session.scalar(
                    m.Label.select().where(m.Label.sticker_id == generated_code)
                )
                if not pending_labels and not active_labels:
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


@dealer_blueprint.route("/order/<user_unique_id>")
@login_required
def order(user_unique_id: str):
    query = m.User.select().where(m.User.unique_id == user_unique_id)
    user: m.User | None = db.session.scalar(query)

    if not user:
        log(log.INFO, "User not found")
        flash("Incorrect reset password link", "danger")
        return redirect(url_for("main.index"))

    mail = Mail()
    msg = Message(
        subject="Customer Labels Order",
        sender=app.config["MAIL_DEFAULT_SENDER"],
        recipients=[app.config.get("ADMIN_EMAIL")],
    )

    msg.html = render_template(
        "email/stickers_order.htm",
        name=f"{user.first_name} {user.last_name}",
        email=f"{user.email}",
        dealership=f"{user.name_of_dealership}",
    )
    mail.send(msg)

    flash("Your order is sent to admin", "success")

    return redirect(url_for("labels.get_active_labels"))


@dealer_blueprint.route("/download", methods=["GET", "POST"])
@login_required
def download():
    landing_url = app.config.get("LANDING_URL")
    user_unique_id = request.args.get("user_unique_id")
    query = m.User.select().where(m.User.unique_id == user_unique_id)
    user: m.User | None = db.session.scalar(query)

    logo_link = None
    stickers_query = (
        m.Sticker.select()
        .where(m.Sticker.pending.is_(True))
        .order_by(m.Sticker.created_at.desc())
    )
    if user:
        stickers_query = stickers_query.where(m.Sticker.user == user)
        if user.logo:
            logo_link = f"user/logo/{user.unique_id}"

    start_date = request.args.get("start_date")

    if start_date:
        start_date = date_convert(start_date)
        stickers_query = stickers_query.where(m.Sticker.created_at >= start_date)
    end_date = request.args.get("end_date")
    if end_date:
        end_date = date_convert(end_date)
        stickers_query = stickers_query.where(
            m.Sticker.created_at <= (end_date + timedelta(days=1))
        )

    stickers = db.session.scalars(stickers_query).all()

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
                    f"{landing_url}/{sticker.code}",
                    sticker.code,
                ]
                writer.writerow(row)
                sticker.downloaded = True
                db.session.add(sticker)
            db.session.commit()

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

    user_unique_id = user_unique_id if user else ""
    return render_template(
        "label/download.html",
        user_unique_id=user_unique_id,
        user=user,
        stickers=stickers,
        url=app.config.get("LANDING_URL"),
        logo_link=logo_link,
        start_date=start_date,
        end_date=end_date,
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


@dealer_blueprint.route("/add_new_model", methods=["GET", "POST"])
@login_required
def add_new_model():
    make_input = request.form.get("new_make_name")
    model_input = request.form.get("new_model_name")
    trim_input = request.form.get("new_trim_option")
    type_input = request.form.get("new_type_name")
    next_url = request.form.get("add-create-model-next-url")
    if next_url:
        next_url = next_url.split("?")[0]

    code_selected = request.form.get("add-create-model-code")
    gift_selected = request.form.get("add-create-model-gift")
    name_selected = request.form.get("add-create-model-name")
    year_selected = request.form.get("add-create-model-year")
    mileage_selected = request.form.get("add-create-model-mileage")
    color_selected = request.form.get("add-create-model-color")
    price_selected = request.form.get("add-create-model-price")
    url_selected = request.form.get("add-create-model-url")

    make = db.session.scalar(sa.select(m.CarMake).where(m.CarMake.name == make_input))
    if make_input and not make:
        make = m.CarMake(
            name=make_input,
        )
        make.save()
        log(log.INFO, "Created new make: [%s]", make_input)
    else:
        log(log.INFO, "Make already exists: [%s]", make_input)

    model = db.session.scalar(
        sa.select(m.CarModel).where(m.CarModel.name == model_input)
    )
    if make_input and not model:
        model = m.CarModel(
            name=model_input,
            make_id=make.id,
        )
        model.save()
        log(log.INFO, "Created new model: [%s]", model_input)
    else:
        log(log.INFO, "Model already exists: [%s]", model_input)

    trim = db.session.scalar(sa.select(m.CarTrim).where(m.CarTrim.name == trim_input))
    if trim_input and not trim:
        trim = m.CarTrim(
            name=trim_input,
            model_id=model.id,
        )
        trim.save()
        log(log.INFO, "Created new trim: [%s]", trim_input)
    else:
        log(log.INFO, "Trim already exists: [%s]", trim_input)

    type_of_vehicle = db.session.scalar(
        sa.select(m.CarType).where(m.CarType.name == type_input)
    )
    if type_input and not type_of_vehicle:
        type_of_vehicle = m.CarType(name=type_input)
        type_of_vehicle.save()
        log(log.INFO, "Created new type: [%s]", type_input)
    else:
        log(log.INFO, "Type already exists: [%s]", type_input)

    make_name = make.name.replace(" ", "%20")
    model_name = model.name.replace(" ", "%20")
    trim_name = trim.name.replace(" ", "%20")
    type_name = type_of_vehicle.name.replace(" ", "%20")

    next_url = f"{next_url}?make_selected={make_name}&model_selected={model_name}&trim_selected={trim_name}&type_selected={type_name}&code_selected={code_selected}&gift_selected={gift_selected}&name_selected={name_selected}&year_selected={year_selected}&mileage_selected={mileage_selected}&color_selected={color_selected}&price_selected={price_selected}&url_selected={url_selected}"

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


@dealer_blueprint.route("/check_label_code", methods=["POST"])
@login_required
def check_label_code():
    code = request.json.get("codeTyped")

    existing_labels = db.session.scalars(
        sa.select(m.Label).where(m.Label.sticker_id == code)
    ).all()
    label_exists = False
    if existing_labels:
        log(log.INFO, "Label with code [%s] already exists", code)
        label_exists = True
    else:
        log(log.INFO, "Label with code [%s] does not exist", code)

    pending_labels = db.session.scalars(
        sa.select(m.Sticker)
        .where(m.Sticker.code == code)
        .where(m.Sticker.user_id == current_user.id)
    ).all()

    label_is_pending = False
    if pending_labels:
        log(log.INFO, "Label with code [%s] is printed and pending", code)
        label_is_pending = True
    else:
        log(log.INFO, "Label with code [%s] is not printed", code)

    return {"code": code, "exists": label_exists, "pending": label_is_pending}


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


@dealer_blueprint.route("/gift/<sticker_id>", methods=["GET", "POST"])
def gift(sticker_id: str):
    label: m.Label = db.session.scalar(
        m.Label.select().where(m.Label.sticker_id == sticker_id)
    )

    return render_template(
        "label/gift.html",
        sticker_id=sticker_id,
        label_url=label.url,
        gift=label.gift,
        dealership=label.user.name_of_dealership,
    )

# flake8: noqa F401
import io
import csv
from datetime import datetime
from flask import (
    Blueprint,
    render_template,
    request,
    flash,
    redirect,
    url_for,
    send_file,
)
from flask_login import login_required, current_user
import sqlalchemy as sa
from flask import current_app as app
from app.controllers import create_pagination
from app import models as m, db
from app import forms as f
from app.logger import log
from app.controllers.jinja_globals import days_active

report_blueprint = Blueprint("report", __name__, url_prefix="/report")


@report_blueprint.route("/create", methods=["GET", "POST"])
@login_required
def dashboard():
    exclude = request.args.get("exclude")
    views_filter = request.args.get("views_filter")
    views_filter = views_filter if views_filter and views_filter != "None" else ""
    type_filter = request.args.get("type_filter")
    type_filter = type_filter if type_filter and type_filter != "None" else ""
    make_filter = request.args.get("make_filter")
    make_filter = make_filter if make_filter and make_filter != "None" else ""
    model_filter = request.args.get("model_filter")
    model_filter = model_filter if model_filter and model_filter != "None" else ""
    price_lower = request.args.get("price_lower")
    price_lower = price_lower if price_lower and price_lower != "None" else ""
    price_upper = request.args.get("price_upper")
    price_upper = price_upper if price_upper and price_upper != "None" else ""
    start_date = request.args.get("start_date")
    start_date = start_date if start_date and start_date != "None" else ""
    end_date = request.args.get("end_date")
    end_date = end_date if end_date and end_date != "None" else ""
    date_received = request.args.get("date_received")
    date_received = date_received if date_received and date_received != "None" else ""
    views_options_filter = request.args.get("views_options_filter")
    views_options_filter = (
        views_options_filter
        if views_options_filter and views_options_filter != "None"
        else ""
    )
    download = request.args.get("download")

    if views_filter == "Asc":
        order_by = m.Label.views.asc()
    elif views_filter == "Desc":
        order_by = m.Label.views.desc()
    else:
        order_by = m.Label.id

    query = (
        m.Label.select().where(m.Label.user_id == current_user.id).order_by(order_by)
    )
    count_query = (
        sa.select(sa.func.count())
        .select_from(m.Label)
        .where(m.Label.user_id == current_user.id)
    )

    if exclude:
        exclude_list = exclude.split(",")
        for label_to_exclude in exclude_list:
            query = query.where(m.Label.unique_id != label_to_exclude)
            count_query = count_query.where(m.Label.unique_id != label_to_exclude)

    if start_date and end_date:
        start_date = datetime.strptime(start_date, "%m/%d/%Y")
        end_date = datetime.strptime(end_date, "%m/%d/%Y")
        query = query.where(sa.func.DATE(m.Label.date_received) >= start_date)
        count_query = count_query.where(
            sa.func.DATE(m.Label.date_received) >= start_date
        )
        query = query.where(sa.func.DATE(m.Label.date_received) <= end_date)
        count_query = count_query.where(sa.func.DATE(m.Label.date_received) <= end_date)
    elif date_received and date_received != "None":
        date_received = datetime.strptime(date_received, "%m/%d/%Y").date()
        query = query.where(sa.func.DATE(m.Label.date_received) == date_received)

    if make_filter and make_filter != "All":
        query = query.where(m.Label.make == make_filter)
        count_query = count_query.where(m.Label.make == make_filter)
    if model_filter and model_filter != "All":
        query = query.where(m.Label.vehicle_model == model_filter)
        count_query = count_query.where(m.Label.vehicle_model == model_filter)
    if type_filter and type_filter != "All":
        query = query.where(m.Label.type_of_vehicle == type_filter)
        count_query = count_query.where(m.Label.type_of_vehicle == type_filter)
    if views_filter == "Asc":
        query = query.order_by(m.Label.views.asc())
    elif views_filter == "Desc":
        query = query.order_by(m.Label.views.desc())
    if price_lower:
        query = query.where(m.Label.price >= price_lower)
        count_query = count_query.where(m.Label.price >= price_lower)
    if price_upper:
        query = query.where(m.Label.price <= price_upper)
        count_query = count_query.where(m.Label.price <= price_upper)
    if views_options_filter == "0-10":
        query = query.where(m.Label.views <= 10)
        count_query = count_query.where(m.Label.views <= 10)
    elif views_options_filter == "10-50":
        query = query.where(m.Label.views >= 10).where(m.Label.views <= 50)
        count_query = count_query.where(m.Label.views >= 10).where(m.Label.views <= 50)
    elif views_options_filter == "50-100":
        query = query.where(m.Label.views >= 50).where(m.Label.views <= 100)
        count_query = count_query.where(m.Label.views >= 50).where(m.Label.views <= 100)
    elif views_options_filter == "100-1000":
        query = query.where(m.Label.views >= 100).where(m.Label.views <= 1000)
        count_query = count_query.where(m.Label.views >= 100).where(
            m.Label.views <= 1000
        )

    pagination = create_pagination(total=db.session.scalar(count_query))
    labels = (
        db.session.execute(
            query.offset((pagination.page - 1) * pagination.per_page).limit(
                pagination.per_page
            )
        )
        .scalars()
        .all()
    )
    types = list(
        set(
            [
                label.type_of_vehicle
                for label in db.session.scalars(
                    m.Label.select().where(m.Label.user_id == current_user.id)
                ).all()
            ]
        )
    )
    makes = list(
        set(
            [
                label.make
                for label in db.session.scalars(
                    m.Label.select().where(m.Label.user_id == current_user.id)
                ).all()
            ]
        )
    )
    if make_filter and make_filter != "All":
        models = list(
            set(
                [
                    label.vehicle_model
                    for label in db.session.scalars(
                        m.Label.select()
                        .where(m.Label.user_id == current_user.id)
                        .where(m.Label.make == make_filter)
                    ).all()
                ]
            )
        )
    else:
        models = list(
            set(
                [
                    label.vehicle_model
                    for label in db.session.scalars(
                        m.Label.select().where(m.Label.user_id == current_user.id)
                    ).all()
                ]
            )
        )

    if download == "true":
        labels = db.session.scalars(query).all()
        with io.StringIO() as proxy:
            writer = csv.writer(proxy)
            row = [
                "sticker_id",
                "name",
                "make",
                "vehicle_model",
                "year",
                "mileage",
                "color",
                "trim",
                "type_of_vehicle",
                "price",
                "date_received",
                "date_deactivated",
                "days_active",
                "url",
                "views",
            ]
            writer.writerow(row)
            for label in labels:
                row = [
                    label.sticker_id,
                    label.name,
                    label.make,
                    label.vehicle_model,
                    label.year,
                    label.mileage,
                    label.color,
                    label.trim,
                    label.type_of_vehicle,
                    label.price,
                    label.date_received,
                    label.date_deactivated,
                    days_active(label.date_received, label.date_deactivated),
                    label.url,
                    label.views,
                ]
                writer.writerow(row)

            # Creating the byteIO object from the StringIO Object
            mem = io.BytesIO()
            mem.write(proxy.getvalue().encode("utf-8"))
            mem.seek(0)

        now = datetime.now()
        return send_file(
            mem,
            as_attachment=True,
            download_name=f"report_{current_user.first_name}_{current_user.last_name}_{now.strftime('%Y-%m-%d-%H-%M-%S')}.csv",
            mimetype="text/csv",
            max_age=0,
            last_modified=now,
        )

    return render_template(
        "report/dashboard.html",
        labels=labels,
        makes=makes,
        make_filter=make_filter,
        models=models,
        model_filter=model_filter,
        types=types,
        type_filter=type_filter,
        views_filter=views_filter,
        price_lower=price_lower,
        price_upper=price_upper,
        start_date=start_date,
        end_date=end_date,
        date_received=date_received,
        views_options_filter=views_options_filter,
        exclude=exclude,
        page=pagination,
    )


@report_blueprint.route("/get_models", methods=["POST"])
@login_required
def get_models():
    make = request.json.get("makeSelected")
    labels = db.session.scalars(
        m.Label.select()
        .where(m.Label.user_id == current_user.id)
        .where(m.Label.make == make)
    ).all()
    models = list(set([label.vehicle_model for label in labels]))
    return {"models": models}


@report_blueprint.route("/all", methods=["GET", "POST"])
@login_required
def all():
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
        "report/all.html",
        labels=db.session.execute(
            query.offset((pagination.page - 1) * pagination.per_page).limit(
                pagination.per_page
            )
        ).scalars(),
        page=pagination,
    )

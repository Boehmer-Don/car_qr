# flake8: noqa F401
import io
import csv
from datetime import datetime, timedelta, time
from flask import (
    Blueprint,
    render_template,
    request,
    flash,
    redirect,
    url_for,
    send_file,
)
from flask_pydantic import validate
from flask_login import login_required, current_user
from markupsafe import Markup
import sqlalchemy as sa
from flask import current_app as app

from pyecharts import options as opts
from pyecharts.charts import Bar


from app.controllers import create_pagination
from app import models as m, db
from app import forms as f
from app import schema as s
from app.controllers.graphs import create_bar_graph, create_location_graph
from app.controllers.user import role_required
from app.logger import log
from app.controllers.jinja_globals import days_active
from app.controllers.date_convert import date_convert

report_blueprint = Blueprint("report", __name__, url_prefix="/report")


@report_blueprint.route("/create", methods=["GET", "POST"])
@login_required
@role_required([m.UsersRole.dealer.value, m.UsersRole.admin.value])
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
    trim_filter = request.args.get("trim_filter")
    trim_filter = trim_filter if trim_filter and trim_filter != "None" else ""
    price_lower = request.args.get("price_lower")
    price_lower = price_lower if price_lower and price_lower != "None" else ""
    price_sold_lower = request.args.get("price_sold_lower")
    price_sold_lower = (
        price_sold_lower if price_sold_lower and price_sold_lower != "None" else ""
    )
    price_upper = request.args.get("price_upper")
    price_upper = price_upper if price_upper and price_upper != "None" else ""
    price_sold_upper = request.args.get("price_sold_upper")
    price_sold_upper = (
        price_sold_upper if price_sold_upper and price_sold_upper != "None" else ""
    )
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

    query = sa.select(m.Label).where(m.Label.user_id == current_user.id)

    count_query = (
        sa.select(sa.func.count())
        .select_from(m.Label)
        .where(m.Label.user_id == current_user.id)
    )
    label_locations = db.session.scalars(
        m.LabelLocation.select().where(m.LabelLocation.user_id == current_user.id)
    ).all()
    if exclude and exclude != "None":
        log(log.INFO, f"Excluding labels: {exclude}")
        exclude_list = exclude.split(",")
        for label_to_exclude in exclude_list:
            query = query.where(m.Label.unique_id != label_to_exclude)
            count_query = count_query.where(m.Label.unique_id != label_to_exclude)

    if not start_date and end_date:
        log(log.INFO, f"Filtering by end_date: {end_date}")
        end_date = datetime.strptime(end_date, "%m/%d/%Y")
        query = query.where(sa.func.DATE(m.Label.date_received) <= end_date)
        count_query = count_query.where(sa.func.DATE(m.Label.date_received) <= end_date)
    elif start_date and not end_date:
        log(log.INFO, f"Filtering by start_date: {start_date}")
        start_date = datetime.strptime(start_date, "%m/%d/%Y")
        query = query.where(sa.func.DATE(m.Label.date_received) >= start_date)
        count_query = count_query.where(
            sa.func.DATE(m.Label.date_received) >= start_date
        )
    elif start_date and end_date:
        log(log.INFO, f"Filtering by start_date: {start_date} and end_date: {end_date}")
        start_date = date_convert(start_date)
        end_date = date_convert(end_date)
        query = query.where(sa.func.DATE(m.Label.date_received) >= start_date)
        count_query = count_query.where(
            sa.func.DATE(m.Label.date_received) >= start_date
        )
        query = query.where(sa.func.DATE(m.Label.date_received) <= end_date)
        count_query = count_query.where(sa.func.DATE(m.Label.date_received) <= end_date)
    elif date_received and date_received != "None":
        log(log.INFO, f"Filtering by date_received: {date_received}")

        date_received = date_convert(date_received)

        query = query.where(sa.func.DATE(m.Label.date_received) == date_received)
        count_query = count_query.where(
            sa.func.DATE(m.Label.date_received) == date_received
        )

    if make_filter and make_filter != "All":
        log(log.INFO, f"Filtering by make: {make_filter}")
        query = query.where(m.Label.make == make_filter)
        count_query = count_query.where(m.Label.make == make_filter)
    if model_filter and model_filter != "All":
        log(log.INFO, f"Filtering by model: {model_filter}")
        query = query.where(m.Label.vehicle_model == model_filter)
        count_query = count_query.where(m.Label.vehicle_model == model_filter)
    if type_filter and type_filter != "All":
        log(log.INFO, f"Filtering by type: {type_filter}")
        query = query.where(m.Label.type_of_vehicle == type_filter)
        count_query = count_query.where(m.Label.type_of_vehicle == type_filter)
    if trim_filter and trim_filter != "All":
        log(log.INFO, f"Filtering by trim: {trim_filter}")
        query = query.where(m.Label.trim == trim_filter)
        count_query = count_query.where(m.Label.trim == trim_filter)
    if price_lower:
        log(log.INFO, f"Filtering by price_lower: {price_lower}")
        query = query.where(m.Label.price >= price_lower)
        count_query = count_query.where(m.Label.price >= price_lower)
    if price_sold_lower:
        log(log.INFO, f"Filtering by price_sold_lower: {price_sold_lower}")
        query = query.where(m.Label.price_sold >= price_sold_lower)
        count_query = count_query.where(m.Label.price_sold >= price_sold_lower)
    if price_upper:
        log(log.INFO, f"Filtering by price_upper: {price_upper}")
        query = query.where(m.Label.price <= price_upper)
        count_query = count_query.where(m.Label.price <= price_upper)
    if price_sold_upper:
        log(log.INFO, f"Filtering by price_sold_upper: {price_sold_upper}")
        query = query.where(m.Label.price_sold <= price_sold_upper)
        count_query = count_query.where(m.Label.price_sold <= price_sold_upper)

    query = query.order_by(m.Label.id.desc())

    if views_options_filter in ["0-10", "10-50", "50-100", "100-1000", "1000-10000"]:
        total_views = sa.func.count(m.LabelView.id).label("total_views")
        log(log.INFO, f"Filtering by views_options_filter: {views_options_filter}")
        query = (
            query.add_columns(total_views)
            .join(m.Label._views)
            .group_by(m.Label.id)
            .having(sa.between(total_views, *views_options_filter.split("-")))
            .order_by(sa.text("total_views DESC"))
        )
        count_query = (
            count_query.add_columns(total_views)
            .join(m.Label._views)
            .group_by(m.Label.id)
            .having(sa.between(total_views, *views_options_filter.split("-")))
        )

    count_query = db.session.scalar(count_query)

    view_query = (
        sa.Select(
            sa.func.count(m.LabelView.created_at).label("count"),
            m.LabelView.created_at,
        )
        .join(m.Label)
        .where(
            m.Label.user_id == current_user.id,
        )
        .group_by(m.LabelView.created_at)
        .order_by(m.LabelView.created_at.asc())
    )

    view_data = db.session.execute(view_query).all()
    graph = create_bar_graph(view_data, by_week=True)

    pagination = create_pagination(total=0 if count_query is None else count_query)
    labels = (
        db.session.execute(
            query.offset((pagination.page - 1) * pagination.per_page).limit(
                pagination.per_page
            )
        )
        .scalars()
        .all()
    )
    types = db.session.scalars(
        sa.select(m.Label.type_of_vehicle)
        .where(m.Label.user_id == current_user.id)
        .group_by(m.Label.type_of_vehicle)
    ).all()
    makes = db.session.scalars(
        sa.select(m.Label.make)
        .where(m.Label.user_id == current_user.id)
        .group_by(m.Label.make)
    ).all()
    trims = db.session.scalars(
        sa.select(m.Label.trim)
        .where(m.Label.user_id == current_user.id)
        .group_by(m.Label.trim)
    ).all()
    if make_filter and make_filter != "All":
        log(log.INFO, f"Getting models for make: {make_filter}")
        models = db.session.scalars(
            sa.select(m.Label.vehicle_model)
            .where(m.Label.user_id == current_user.id)
            .where(m.Label.make == make_filter)
            .group_by(m.Label.vehicle_model)
        ).all()
    else:
        log(log.INFO, f"Getting models for all makes")
        models = db.session.scalars(
            sa.select(m.Label.vehicle_model)
            .where(m.Label.user_id == current_user.id)
            .group_by(m.Label.vehicle_model)
        ).all()
    now = datetime.now()
    if download == "true":
        log(log.INFO, f"Downloading report")
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
        locations=label_locations,
        labels=labels,
        makes=makes,
        make_filter=make_filter,
        models=models,
        model_filter=model_filter,
        types=types,
        trims=trims,
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
        graph_view=graph,
    )


@report_blueprint.route("/get_models", methods=["POST"])
@login_required
@role_required([m.UsersRole.dealer.value, m.UsersRole.admin.value])
def get_models():
    make = request.json.get("makeSelected")
    labels = db.session.scalars(
        sa.select(m.Label.vehicle_model)
        .where(m.Label.user_id == current_user.id)
        .where(m.Label.make == make)
        .distinct(m.Label.vehicle_model)
    ).all()
    return {"models": labels}


@report_blueprint.route("/get_label_views_datetime/<unique_id>", methods=["GET"])
@login_required
@role_required([m.UsersRole.dealer.value, m.UsersRole.admin.value])
def get_label_views_datetime(unique_id: str):
    label: m.Label | None = db.session.scalar(
        m.Label.select().where(m.Label.unique_id == unique_id)
    )
    download = request.args.get("download")
    if not label:
        log(log.ERROR, f"Label not found: {unique_id}")
        return {"error": "Label not found"}, 404
    list_views = label.list_views

    if download == "True":
        now = datetime.now()
        log(log.INFO, f"Downloading label views")
        with io.StringIO() as proxy:
            writer = csv.writer(proxy)
            row = [
                "day",
                "time",
                "location",
            ]
            writer.writerow(row)
            for label_view in list_views:
                row = [
                    label_view.day,
                    label_view.time,
                    label.location,
                ]
                writer.writerow(row)

            mem = io.BytesIO()
            mem.write(proxy.getvalue().encode("utf-8"))
            mem.seek(0)
        return send_file(
            mem,
            as_attachment=True,
            download_name=f"label_views_{now.strftime('%Y-%m-%d-%H-%M-%S')}.csv",
            mimetype="text/csv",
            max_age=0,
            last_modified=now,
        )

    return render_template(
        "report/label_views_modal.html",
        list_views=list_views,
        unique_id=label.unique_id,
        location=label.location,
    )


@report_blueprint.route("/all", methods=["GET", "POST"])
@login_required
@role_required([m.UsersRole.dealer.value, m.UsersRole.admin.value])
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


@report_blueprint.route("/get_label_views_graph", methods=["GET"])
@validate()
@login_required
@role_required([m.UsersRole.dealer.value, m.UsersRole.admin.value])
def get_label_views_graph(query: s.QueryModelLabelsGraphView):
    start_date = query.start_date_graph
    end_date = query.end_date_graph
    status = query.status
    label_id = query.label_id
    by_week = False

    if start_date and end_date and label_id:
        where = sa.and_(
            m.LabelView.label_id == label_id,
            m.Label.user_id == current_user.id,
            sa.cast(m.LabelView.created_at, sa.Date).between(
                start_date,
                end_date,
            ),
        )
    elif start_date and end_date and not label_id:
        where = sa.and_(
            m.Label.user_id == current_user.id,
            sa.cast(m.LabelView.created_at, sa.Date).between(
                start_date,
                end_date,
            ),
        )
    elif (not start_date or not end_date) and label_id:
        where = sa.and_(
            m.LabelView.label_id == label_id,
            m.Label.user_id == current_user.id,
        )

    else:
        by_week = True
        where = sa.and_(
            m.Label.user_id == current_user.id,
        )

    view_query: sa.Select = (
        sa.Select(
            sa.func.count(m.LabelView.created_at).label("count"),
            m.LabelView.created_at,
        )
        .join(m.Label)
        .where(where)
    )

    if isinstance(status, m.LabelStatus):
        view_query = view_query.where(m.Label.status == status.name)

    view_query = view_query.group_by(m.LabelView.created_at).order_by(
        m.LabelView.created_at.desc()
    )

    view_data = db.session.execute(view_query).all()
    graph = create_bar_graph(view_data, by_week=by_week)

    return render_template("report/graph_report_label.html", graph=graph)


@report_blueprint.route("/get_label_location_views_graph", methods=["GET"])
@validate()
@login_required
@role_required([m.UsersRole.dealer.value, m.UsersRole.admin.value])
def get_label_location_views_graph(query: s.QueryModelLocationsGraphView):
    start_date = query.start_date_graph
    end_date = query.end_date_graph
    status = query.status
    by_week = False
    if start_date and end_date:
        where = sa.and_(
            m.LabelLocation.user_id == current_user.id,
            sa.cast(m.LabelView.created_at, sa.Date).between(
                start_date,
                end_date,
            ),
        )
    else:
        by_week = True
        where = sa.and_(
            m.LabelLocation.user_id == current_user.id,
        )

    location_query: sa.Select = (
        sa.Select(
            m.LabelLocation.name,
            sa.func.DATE(m.LabelView.created_at).label("date"),
            sa.func.count(m.LabelView.id).label("count"),
        )
        .join(m.Label, m.LabelLocation.id == m.Label.location_id)
        .join(m.LabelView, m.Label.id == m.LabelView.label_id)
        .where(where)
    )
    if isinstance(status, m.LabelStatus):
        location_query = location_query.where(m.Label.status == status.name)

    location_query = location_query.group_by(
        m.LabelLocation.name, m.LabelView.created_at
    ).order_by(m.LabelView.created_at.asc())

    result = db.session.execute(location_query).all()
    location_names = db.session.scalars(
        sa.select(m.LabelLocation.name)
        .where(m.LabelLocation.user_id == current_user.id)
        .order_by(m.LabelLocation.name)
    ).all()

    graph = create_location_graph(
        select_result=result, location_names=location_names, by_week=by_week
    )

    return render_template("report/graph_report_label.html", graph=graph)

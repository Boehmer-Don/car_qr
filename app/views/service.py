# flake8: noqa F401
from flask import (
    Blueprint,
    render_template,
    flash,
    redirect,
    url_for,
)
import sqlalchemy as sa
from flask_login import login_required, current_user
from app.controllers import (
    role_required,
)
from app import models as m, db
from app import forms as f
from app.controllers.pagination import create_pagination
from app.logger import log

from .utils import get_canada_provinces

service = Blueprint("service", __name__, url_prefix="/services")


@service.route("/", methods=["GET"])
@login_required
@role_required([m.UsersRole.admin, m.UsersRole.dealer])
def get_all():
    log(log.INFO, "Getting all services")

    admin_ids = db.session.scalars(
        sa.select(m.User.id).where(m.User.role == m.UsersRole.admin)
    ).all()

    where_stmt = sa.and_(
        m.User.role == m.UsersRole.service,
        m.User.activated,
        m.User.deleted.is_(False),
        m.User._creator_id.in_(admin_ids + [current_user.id]),
    )

    query = sa.select(m.User).where(where_stmt).order_by(m.User.created_at.desc())
    count_query = sa.select(sa.func.count()).where(where_stmt).select_from(m.User)

    pagination = create_pagination(total=db.session.scalar(count_query))

    return render_template(
        "service/services.html",
        services=db.session.execute(
            query.offset((pagination.page - 1) * pagination.per_page).limit(
                pagination.per_page
            )
        ).scalars(),
        page=pagination,
    )


@service.route("/add-modal", methods=["GET"])
@login_required
@role_required([m.UsersRole.admin, m.UsersRole.dealer])
def add_modal():
    """htmx"""
    form = f.ServiceForm()
    form.province.choices = get_canada_provinces()

    return render_template(
        "service/add_modal.html",
        form=form,
    )


@service.route("/add", methods=["POST"])
@login_required
@role_required([m.UsersRole.admin, m.UsersRole.dealer])
def add():
    form = f.ServiceForm()
    if not form.validate_on_submit():
        log(log.INFO, f"Invalid form data [{form.format_errors}]")
        flash(f"Invalid form data [{form.format_errors}]", "danger")
        return redirect(url_for("service.get_all"))

    m.User(
        email=form.email.data,
        name_of_dealership=form.name.data,
        phone=form.phone.data,
        address_of_dealership=form.address.data,
        country=form.country.data,
        province=form.province.data,
        city=form.city.data,
        postal_code=form.postal_code.data,
        role=m.UsersRole.service,
        activated=True,
        creator_id=current_user.id,
    ).save()

    return redirect(url_for("service.get_all"))

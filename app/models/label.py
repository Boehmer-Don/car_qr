# flake8: noqa F401
from datetime import datetime
import enum
from uuid import uuid4
import sqlalchemy as sa
from sqlalchemy import orm
from sqlalchemy.ext.hybrid import hybrid_property
from werkzeug.security import generate_password_hash, check_password_hash

from app.database import db
from .utils import ModelMixin
from app.logger import log
from app import schema as s


def gen_label_unique_id() -> str:
    return str(uuid4())


class Label(db.Model, ModelMixin):
    __tablename__ = "labels"

    """
    Label fields:
    id
    unique_id
    name
    make
    vehicle_model
    year
    mileage
    color
    trim
    type_of_vehicle
    price
    date_received
    url

    """

    id: orm.Mapped[int] = orm.mapped_column(primary_key=True)
    name: orm.Mapped[str] = orm.mapped_column(sa.String(64), default="")
    make: orm.Mapped[str] = orm.mapped_column(sa.String(64), default="")
    unique_id: orm.Mapped[str] = orm.mapped_column(
        sa.String(36),
        default=gen_label_unique_id,
    )
    created_at: orm.Mapped[datetime] = orm.mapped_column(
        sa.DateTime,
        default=datetime.utcnow,
    )
    activated: orm.Mapped[bool] = orm.mapped_column(sa.Boolean, default=False)

    def __repr__(self):
        return f"<{self.id}:{self.name}>"

    @property
    def json(self):
        u = s.User.from_orm(self)
        return u.json()

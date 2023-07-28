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
from .user import User


def gen_label_unique_id() -> str:
    return str(uuid4())


class LabelStatus(enum.Enum):
    active = "active"
    cart = "cart"
    archived = "archived"


class Label(db.Model, ModelMixin):
    __tablename__ = "labels"

    id: orm.Mapped[int] = orm.mapped_column(primary_key=True)
    unique_id: orm.Mapped[str] = orm.mapped_column(
        sa.String(36),
        default=gen_label_unique_id,
    )
    sticker_identifier: orm.Mapped[str] = orm.mapped_column(
        sa.String(64), default="", nullable=True
    )
    name: orm.Mapped[str] = orm.mapped_column(sa.String(64), default="")
    make: orm.Mapped[str] = orm.mapped_column(sa.String(64), default="")
    vehicle_model: orm.Mapped[str] = orm.mapped_column(sa.String(64), default="")
    year: orm.Mapped[str] = orm.mapped_column(sa.Integer, default=2000)
    mileage: orm.Mapped[str] = orm.mapped_column(sa.Integer, default=10000)
    color: orm.Mapped[str] = orm.mapped_column(sa.String(64), default="")
    trim: orm.Mapped[str] = orm.mapped_column(sa.String(64), default="")
    type_of_vehicle: orm.Mapped[str] = orm.mapped_column(sa.String(64), default="")
    price: orm.Mapped[str] = orm.mapped_column(sa.Integer, default=0)
    date_received: orm.Mapped[datetime] = orm.mapped_column(
        sa.DateTime,
        default=datetime.utcnow,
    )
    date_deactivated: orm.Mapped[datetime] = orm.mapped_column(
        sa.DateTime,
        default=None,
        nullable=True,
    )
    url: orm.Mapped[str] = orm.mapped_column(sa.String(64), default="")
    label_status: orm.Mapped[LabelStatus] = orm.mapped_column(
        sa.Enum(LabelStatus), default=LabelStatus.cart
    )
    user_id: orm.Mapped[int] = orm.mapped_column(
        sa.Integer,
        sa.ForeignKey("users.id"),
    )
    views: orm.Mapped[str] = orm.mapped_column(sa.Integer, nullable=True, default=0)

    user: orm.Mapped[User] = orm.relationship("User", backref="labels")

    def __repr__(self):
        return f"<{self.id}:{self.name}>"

    @property
    def json(self):
        label = s.Label.from_orm(self)
        return label.json()

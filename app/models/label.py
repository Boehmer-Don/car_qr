# flake8: noqa F401
from typing import TYPE_CHECKING, Optional, Union
from datetime import datetime
import enum
import sqlalchemy as sa
from sqlalchemy import orm

from app.database import db
from .utils import ModelMixin, generate_uuid

from .user import User
from .label_view import LabelView


if TYPE_CHECKING:
    from .label_location import LabelLocation
    from .sale_report import SaleReport


class LabelStatus(enum.Enum):
    cart = "cart"
    active = "active"
    archived = "archived"


class Label(db.Model, ModelMixin):
    __tablename__ = "labels"

    id: orm.Mapped[int] = orm.mapped_column(primary_key=True)
    unique_id: orm.Mapped[str] = orm.mapped_column(
        sa.String(36),
        default=generate_uuid,
    )
    sticker_id: orm.Mapped[str | None] = orm.mapped_column(sa.String(16), default="")
    location_id: orm.Mapped[int | None] = orm.mapped_column(
        sa.ForeignKey("label_locations.id"),
    )
    name: orm.Mapped[str] = orm.mapped_column(sa.String(256), default="")
    make: orm.Mapped[str] = orm.mapped_column(sa.String(64), default="")
    vehicle_model: orm.Mapped[str] = orm.mapped_column(sa.String(64), default="")
    year: orm.Mapped[int] = orm.mapped_column(sa.Integer, default=2000)
    mileage: orm.Mapped[int] = orm.mapped_column(sa.Float, default=10000)
    color: orm.Mapped[str] = orm.mapped_column(sa.String(64), default="")
    trim: orm.Mapped[str] = orm.mapped_column(sa.String(64), default="")
    type_of_vehicle: orm.Mapped[str] = orm.mapped_column(sa.String(64), default="")
    price: orm.Mapped[int] = orm.mapped_column(sa.Float, default=0)
    price_sold: orm.Mapped[int] = orm.mapped_column(sa.Float, default=0, nullable=True)
    date_received: orm.Mapped[datetime] = orm.mapped_column(
        sa.DateTime,
        default=datetime.utcnow,
        server_default=sa.func.now(),
    )
    date_activated: orm.Mapped[datetime] = orm.mapped_column(
        sa.DateTime,
        nullable=True,
    )
    date_deactivated: orm.Mapped[datetime] = orm.mapped_column(
        sa.DateTime,
        nullable=True,
    )
    url: orm.Mapped[str] = orm.mapped_column(sa.String(255), default="")
    status: orm.Mapped[LabelStatus] = orm.mapped_column(
        sa.Enum(LabelStatus), default=LabelStatus.cart
    )
    user_id: orm.Mapped[int] = orm.mapped_column(
        sa.Integer,
        sa.ForeignKey("users.id"),
    )
    gift: orm.Mapped[str] = orm.mapped_column(sa.String(128), default="", nullable=True)

    user: orm.Mapped[User] = orm.relationship("User", backref="labels")
    _views: orm.Mapped[list[LabelView]] = orm.relationship(
        back_populates="label",
        order_by=LabelView.created_at.desc(),
    )

    _location: orm.Mapped[Optional["LabelLocation"]] = orm.relationship(
        back_populates="labels",
    )

    sale_report: orm.Mapped[Union["SaleReport", None]] = orm.relationship(
        back_populates="label",
        uselist=False,
    )

    def __repr__(self):
        return f"<{self.id}:{self.name}>"

    @property
    def oil_not_changed(self) -> bool:
        return bool(self.sale_report and self.sale_report.oil_change_not_done)

    @property
    def location(self) -> str:
        return self._location.name if self._location else ""

    @property
    def location_object(self) -> Optional["LabelLocation"]:
        return self._location

    @property
    def mileage_formated(self) -> str:
        if not self.mileage:
            return "0"
        return f"{self.mileage:,.0f}"

    @property
    def views(self) -> int:
        return len(self._views)

    @property
    def list_views(self) -> list[LabelView]:
        return self._views

    @property
    def price_formated(self) -> str:
        return format(self.price, ",")

    @property
    def json(self):
        from app import schema as s

        label = s.Label.model_json_schema(self)
        return label

from typing import TYPE_CHECKING

from datetime import datetime
import sqlalchemy as sa
from sqlalchemy import orm
from sqlalchemy.ext.hybrid import hybrid_property

from app.database import db
from .utils import ModelMixin, generate_uuid

if TYPE_CHECKING:
    from .label import Label
    from .user import User
    from .gift_box import GiftBox
    from .oil_change import OilChange


class SaleReport(db.Model, ModelMixin):
    __tablename__ = "sale_reports"

    id: orm.Mapped[int] = orm.mapped_column(primary_key=True)
    unique_id: orm.Mapped[str] = orm.mapped_column(
        sa.String(36),
        default=generate_uuid,
    )
    seller_id: orm.Mapped[int] = orm.mapped_column(
        sa.ForeignKey("users.id"),
    )
    label_id: orm.Mapped[int] = orm.mapped_column(
        sa.ForeignKey("labels.id"),
    )
    buyer_id: orm.Mapped[int | None] = orm.mapped_column(
        sa.ForeignKey("users.id"),
    )

    created_at: orm.Mapped[datetime] = orm.mapped_column(
        sa.DateTime,
        default=datetime.now,
    )

    pickup_date: orm.Mapped[datetime] = orm.mapped_column(sa.DateTime)

    is_notfy_by_email: orm.Mapped[bool] = orm.mapped_column(sa.Boolean, default=False)
    is_notfy_by_phone: orm.Mapped[bool] = orm.mapped_column(sa.Boolean, default=False)
    is_electric_car: orm.Mapped[bool] = orm.mapped_column(sa.Boolean, default=False)
    description: orm.Mapped[str] = orm.mapped_column(sa.String(264), default="")

    label: orm.Mapped["Label"] = orm.relationship(
        viewonly=True, back_populates="sale_report"
    )

    seller: orm.Mapped["User"] = orm.relationship(foreign_keys=[seller_id])
    buyer: orm.Mapped["User"] = orm.relationship(foreign_keys=[buyer_id])

    gift_boxes: orm.Mapped[list["GiftBox"]] = orm.relationship(
        back_populates="sale_rep"
    )

    oil_changes: orm.Mapped[list["OilChange"]] = orm.relationship(
        back_populates="sale_rep", order_by="OilChange.id.asc()"
    )

    @property
    def total_boxes_price(self) -> float:
        return sum(gift_box.total_price for gift_box in self.gift_boxes)

    @property
    def gift_boxes_completed(self) -> bool:
        return all(gift_box.is_completed for gift_box in self.gift_boxes)

    @hybrid_property
    def with_gift_boxes(self) -> bool:
        return bool(self.gift_boxes)

    @property
    def oil_change_not_done(self) -> bool:
        return any(oil_change.is_not_done for oil_change in self.oil_changes)

    @property
    def oil_change_done(self) -> bool:
        return all(oil_change.is_done for oil_change in self.oil_changes)

    @property
    def sold_date(self):
        return self.pickup_date.strftime("%Y-%m-%d")

    @property
    def sold_time(self):
        return self.pickup_date.strftime("%H:%M:%S")

    @property
    def available_amount(self):
        return round(self.label.price_sold * 0.001, 2)

    def __repr__(self):
        return f"<{self.id}: at {self.created_at}>"

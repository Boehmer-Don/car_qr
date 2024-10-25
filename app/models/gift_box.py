from typing import TYPE_CHECKING
from datetime import datetime
import sqlalchemy as sa
from sqlalchemy import orm

from app.database import db
from .utils import ModelMixin, generate_uuid

if TYPE_CHECKING:
    from .dealer_gift_item import DealerGiftItem
    from .sale_report import SaleReport


class GiftBox(db.Model, ModelMixin):
    __tablename__ = "gift_boxes"

    id: orm.Mapped[int] = orm.mapped_column(primary_key=True)
    sale_result_id: orm.Mapped[int] = orm.mapped_column(sa.ForeignKey("sale_reports.id"))
    dealer_gift_item_id: orm.Mapped[int] = orm.mapped_column(sa.ForeignKey("dealer_gift_items.id"))
    # this field for a search query
    dealer_id: orm.Mapped[int] = orm.mapped_column(sa.ForeignKey("users.id"))

    unique_id: orm.Mapped[str] = orm.mapped_column(
        sa.String(36),
        default=generate_uuid,
    )
    created_at: orm.Mapped[datetime] = orm.mapped_column(
        sa.DateTime,
        default=datetime.now,
    )
    description: orm.Mapped[str] = orm.mapped_column(sa.String(512))
    _sku: orm.Mapped[str] = orm.mapped_column(sa.String(255))
    price: orm.Mapped[float] = orm.mapped_column(sa.Float)
    total_price: orm.Mapped[float] = orm.mapped_column(sa.Float)
    qty: orm.Mapped[int] = orm.mapped_column(sa.Integer)
    is_completed: orm.Mapped[bool] = orm.mapped_column(sa.Boolean, default=False)

    dealer_gift_item: orm.Mapped["DealerGiftItem"] = orm.relationship()
    sale_rep: orm.Mapped["SaleReport"] = orm.relationship(back_populates="gift_boxes")

    @property
    def sku(self):
        return self._sku

    def __repr__(self):
        return f"<{self.id}:{self.created_at} SKU: {self.sku} > "

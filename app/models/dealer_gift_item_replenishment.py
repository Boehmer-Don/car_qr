from typing import TYPE_CHECKING

from datetime import datetime
import sqlalchemy as sa
from sqlalchemy import orm

from app.database import db
from .utils import ModelMixin, generate_uuid

if TYPE_CHECKING:
    from .dealer_gift_item import DealerGiftItem


class DealerGiftIteRreplenishment(db.Model, ModelMixin):
    __tablename__ = "dealer_gift_item_replenishments"

    id: orm.Mapped[int] = orm.mapped_column(primary_key=True)
    dealer_gift_item_id: orm.Mapped[int] = orm.mapped_column(
        sa.ForeignKey("dealer_gift_items.id")
    )

    sku: orm.Mapped[str] = orm.mapped_column(sa.String(255))

    unique_id: orm.Mapped[str] = orm.mapped_column(
        sa.String(36),
        default=generate_uuid,
    )
    created_at: orm.Mapped[datetime] = orm.mapped_column(
        sa.DateTime,
        default=datetime.now,
    )

    is_done: orm.Mapped[bool] = orm.mapped_column(sa.Boolean, default=False)

    dealer_gift_item: orm.Mapped["DealerGiftItem"] = orm.relationship()

    def __repr__(self):
        return f"<DealerGiftIteRreplenishment {self.id}:{self.created_at}>"

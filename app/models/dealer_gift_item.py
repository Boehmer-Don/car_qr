from typing import TYPE_CHECKING

from datetime import datetime
import sqlalchemy as sa
from sqlalchemy import orm


from app.database import db
from .utils import ModelMixin, generate_uuid, get_week_range
from .dealer_gift_item_replenishment import DealerGiftIteRreplenishment

if TYPE_CHECKING:
    from .user import User
    from .gift_item import GiftItem


class DealerGiftItem(db.Model, ModelMixin):
    __tablename__ = "dealer_gift_items"

    id: orm.Mapped[int] = orm.mapped_column(primary_key=True)

    dealer_id: orm.Mapped[int] = orm.mapped_column(
        sa.ForeignKey("users.id"),
    )
    gift_item_id: orm.Mapped[int] = orm.mapped_column(
        sa.ForeignKey("gift_items.id"),
    )

    unique_id: orm.Mapped[str] = orm.mapped_column(
        sa.String(36),
        default=generate_uuid,
    )
    created_at: orm.Mapped[datetime] = orm.mapped_column(
        sa.DateTime,
        default=datetime.utcnow,
    )

    min_qty: orm.Mapped[int] = orm.mapped_column(sa.Integer)
    max_qty: orm.Mapped[int] = orm.mapped_column(sa.Integer)
    is_deleted: orm.Mapped[bool] = orm.mapped_column(sa.Boolean, default=False)

    dealer: orm.Mapped["User"] = orm.relationship("User", back_populates="gift_items")
    origin_item: orm.Mapped["GiftItem"] = orm.relationship()

    def get_replenishment(self, week, sku) -> DealerGiftIteRreplenishment:

        start_date, end_date = get_week_range(week)

        return db.session.scalar(
            sa.select(DealerGiftIteRreplenishment).where(
                DealerGiftIteRreplenishment.dealer_gift_item_id == self.id,
                start_date.date()
                < sa.func.DATE(DealerGiftIteRreplenishment.created_at),
                sa.func.DATE(DealerGiftIteRreplenishment.created_at) < end_date.date(),
            )
        )

    def __repr__(self):
        return f"<User gift item {self.id}:{self.created_at}>"

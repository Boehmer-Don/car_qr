from datetime import datetime
import sqlalchemy as sa
from sqlalchemy import orm

from app.database import db
from .utils import ModelMixin, generate_uuid


class GiftBox(db.Model, ModelMixin):
    __tablename__ = "gift_boxes"

    id: orm.Mapped[int] = orm.mapped_column(primary_key=True)
    sale_result_id: orm.Mapped[int] = orm.mapped_column(
        sa.ForeignKey("sale_reports.id")
    )
    gift_item_id: orm.Mapped[int] = orm.mapped_column(sa.ForeignKey("gift_items.id"))

    unique_id: orm.Mapped[str] = orm.mapped_column(
        sa.String(36),
        default=generate_uuid,
    )
    created_at: orm.Mapped[datetime] = orm.mapped_column(
        sa.DateTime,
        default=datetime.utcnow,
    )

    description: orm.Mapped[str] = orm.mapped_column(sa.String(264))
    total_price: orm.Mapped[float] = orm.mapped_column(sa.Float)
    qty: orm.Mapped[int] = orm.mapped_column(sa.Integer)

    def __repr__(self):
        return f"<{self.id}:{self.created_at}>"

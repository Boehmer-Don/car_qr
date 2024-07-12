from datetime import datetime
import sqlalchemy as sa
from sqlalchemy import orm
from sqlalchemy.ext.hybrid import hybrid_property

from app.database import db
from .utils import ModelMixin, generate_uuid


class GiftItem(db.Model, ModelMixin):
    __tablename__ = "gift_items"

    id: orm.Mapped[int] = orm.mapped_column(primary_key=True)
    unique_id: orm.Mapped[str] = orm.mapped_column(
        sa.String(36),
        default=generate_uuid,
    )
    created_at: orm.Mapped[datetime] = orm.mapped_column(
        sa.DateTime,
        default=datetime.utcnow,
    )

    description: orm.Mapped[str] = orm.mapped_column(sa.String(264))
    price: orm.Mapped[float] = orm.mapped_column(sa.Float)
    min_qty: orm.Mapped[int] = orm.mapped_column(sa.Integer)
    max_qty: orm.Mapped[int] = orm.mapped_column(sa.Integer)

    _is_default: orm.Mapped[bool] = orm.mapped_column(sa.Boolean, default=False)

    @hybrid_property
    def is_default(self):
        return self._is_default

    @is_default.setter  # type: ignore
    def is_default(self, value):
        self._is_default = value

    def __repr__(self):
        return f"<{self.id}:{self.created_at} Default: {self.is_default}>"

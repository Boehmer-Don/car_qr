from typing import TYPE_CHECKING

from datetime import datetime
import sqlalchemy as sa
from sqlalchemy import orm

from app.database import db
from .utils import ModelMixin, generate_uuid

if TYPE_CHECKING:
    from .label import Label


class LabelView(db.Model, ModelMixin):
    __tablename__ = "label_views"

    id: orm.Mapped[int] = orm.mapped_column(primary_key=True)
    unique_id: orm.Mapped[str] = orm.mapped_column(
        sa.String(36),
        default=generate_uuid,
    )
    label_id: orm.Mapped[int] = orm.mapped_column(
        sa.Integer,
        sa.ForeignKey("labels.id"),
    )
    created_at: orm.Mapped[datetime] = orm.mapped_column(
        sa.DateTime,
        default=datetime.utcnow,
    )
    label: orm.Mapped["Label"] = orm.relationship(back_populates="_views")

    @property
    def day(self) -> str:
        return self.created_at.strftime("%Y-%m-%d")

    @property
    def time(self) -> str:
        return self.created_at.strftime("%H:%M:%S")

    def __repr__(self):
        return f"<{self.id}:{self.label_id} - {self.created_at}>"

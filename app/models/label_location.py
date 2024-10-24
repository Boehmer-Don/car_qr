from typing import TYPE_CHECKING

from datetime import datetime
import sqlalchemy as sa
from sqlalchemy import orm

from app.database import db
from .utils import ModelMixin, generate_uuid

if TYPE_CHECKING:
    from .label import Label
    from .user import User


class LabelLocation(db.Model, ModelMixin):
    __tablename__ = "label_locations"

    id: orm.Mapped[int] = orm.mapped_column(primary_key=True)
    unique_id: orm.Mapped[str] = orm.mapped_column(
        sa.String(36),
        default=generate_uuid,
    )
    user_id: orm.Mapped[int] = orm.mapped_column(
        sa.ForeignKey("users.id"),
    )
    name: orm.Mapped[str] = orm.mapped_column(sa.String(64))
    created_at: orm.Mapped[datetime] = orm.mapped_column(
        sa.DateTime,
        default=datetime.now,
    )
    labels: orm.Mapped[list["Label"]] = orm.relationship(back_populates="_location")
    user: orm.Mapped["User"] = orm.relationship(
        back_populates="label_locations", viewonly=True
    )

    def __repr__(self):
        return f"<{self.id}:{self.name} - {self.created_at}>"

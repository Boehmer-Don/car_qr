from typing import TYPE_CHECKING

from datetime import datetime
import sqlalchemy as sa
from sqlalchemy import orm

from app.database import db
from .utils import ModelMixin, generate_uuid

if TYPE_CHECKING:
    from .label import Label


class ServiceRecord(db.Model, ModelMixin):
    __tablename__ = "serivce_records"

    id: orm.Mapped[int] = orm.mapped_column(primary_key=True)
    service_id: orm.Mapped[int] = orm.mapped_column(sa.ForeignKey("users.id"))
    label_id: orm.Mapped[int] = orm.mapped_column(sa.ForeignKey("labels.id"))
    oil_change_id: orm.Mapped[int | None] = orm.mapped_column(sa.ForeignKey("oil_changes.id"))

    unique_id: orm.Mapped[str] = orm.mapped_column(
        sa.String(36),
        default=generate_uuid,
    )
    created_at: orm.Mapped[datetime] = orm.mapped_column(
        sa.DateTime,
        default=datetime.now,
    )
    updated_at: orm.Mapped[datetime] = orm.mapped_column(
        sa.DateTime,
        default=datetime.now,
        onupdate=datetime.now,
    )

    name: orm.Mapped[str] = orm.mapped_column(sa.String(264), default="")
    file_url: orm.Mapped[str] = orm.mapped_column(sa.String(512), default="")

    label: orm.Mapped["Label"] = orm.relationship()

    def __repr__(self):
        return f"<{self.id}:{self.created_at}"

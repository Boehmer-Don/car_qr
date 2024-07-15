from typing import TYPE_CHECKING

from datetime import datetime
import sqlalchemy as sa
from sqlalchemy import orm

from app.database import db
from .utils import ModelMixin, generate_uuid

if TYPE_CHECKING:
    from .sale_report import SaleReport


class OilChange(db.Model, ModelMixin):
    __tablename__ = "oil_changes"

    id: orm.Mapped[int] = orm.mapped_column(primary_key=True)
    unique_id: orm.Mapped[str] = orm.mapped_column(
        sa.String(36),
        default=generate_uuid,
    )
    created_at: orm.Mapped[datetime] = orm.mapped_column(
        sa.DateTime,
        default=datetime.utcnow,
    )
    updated_at: orm.Mapped[datetime] = orm.mapped_column(
        sa.DateTime,
        default=datetime.utcnow,
        onupdate=datetime.utcnow,
    )

    sale_rep_id: orm.Mapped[int] = orm.mapped_column(sa.ForeignKey("sale_reports.id"))

    date: orm.Mapped[datetime] = orm.mapped_column(sa.DateTime)
    is_done: orm.Mapped[bool] = orm.mapped_column(sa.Boolean, default=False)

    sale_rep: orm.Mapped["SaleReport"] = orm.relationship(back_populates="oil_changes")

    @property
    def is_expired(self) -> bool:
        return datetime.today().date() > self.date.date() and not self.is_done

    @property
    def is_not_done(self) -> bool:
        return (
            not self.is_done and datetime.today().date() >= self.date.date()
        )  # wecan't change the oil in the past

    def __repr__(self):
        return f"<{self.id}:{self.created_at}"

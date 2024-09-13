from typing import TYPE_CHECKING

from datetime import datetime
import sqlalchemy as sa
from sqlalchemy import orm

from app.database import db
from .utils import ModelMixin

if TYPE_CHECKING:
    from .user import User


class GiftsInvoice(db.Model, ModelMixin):
    __tablename__ = "gifts_invoices"

    id: orm.Mapped[int] = orm.mapped_column(primary_key=True)

    dealer_id: orm.Mapped[int] = orm.mapped_column(
        sa.ForeignKey("users.id"),
    )
    created_at: orm.Mapped[datetime] = orm.mapped_column(
        sa.DateTime,
        default=datetime.utcnow,
    )

    stripe_invoice_id: orm.Mapped[str] = orm.mapped_column(sa.String(64))
    hosted_invoice_url: orm.Mapped[str] = orm.mapped_column(sa.String(512))
    is_paid: orm.Mapped[bool] = orm.mapped_column(sa.Boolean, default=False)

    dealer: orm.Mapped["User"] = orm.relationship()

    def __repr__(self):
        return f"<GiftsInvoice {self.id}:{self.created_at}>"

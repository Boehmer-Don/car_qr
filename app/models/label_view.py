from datetime import datetime
from uuid import uuid4
import sqlalchemy as sa
from sqlalchemy import orm

from app.database import db
from .utils import ModelMixin


def generate_uuid() -> str:
    return str(uuid4())


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
        server_default=sa.func.now(),
    )

    def __repr__(self):
        return f"<{self.id}:{self.label_id} - {self.created_at}>"

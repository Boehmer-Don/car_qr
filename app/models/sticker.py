from datetime import datetime
import sqlalchemy as sa
from sqlalchemy import orm
from app.database import db
from .utils import ModelMixin
from app.models.user import User


class Sticker(db.Model, ModelMixin):
    __tablename__ = "stickers"

    id: orm.Mapped[int] = orm.mapped_column(primary_key=True)
    code: orm.Mapped[str] = orm.mapped_column(sa.String(8), default="")
    created_at: orm.Mapped[datetime] = orm.mapped_column(
        sa.DateTime,
        default=datetime.now,
    )
    pending: orm.Mapped[bool] = orm.mapped_column(sa.Boolean, default=True)
    downloaded: orm.Mapped[bool] = orm.mapped_column(sa.Boolean, default=False, nullable=False)
    user_id: orm.Mapped[int] = orm.mapped_column(sa.Integer, sa.ForeignKey("users.id"))

    user: orm.Mapped[User] = orm.relationship("User", backref="stickers")

    def __repr__(self):
        return f"<{self.id}: {self.code}>"

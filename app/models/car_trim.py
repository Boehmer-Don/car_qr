import sqlalchemy as sa
from sqlalchemy import orm
from app.database import db
from .utils import ModelMixin


class CarTrim(db.Model, ModelMixin):
    __tablename__ = "trims"

    id: orm.Mapped[int] = orm.mapped_column(primary_key=True)
    name: orm.Mapped[str] = orm.mapped_column(sa.String(64), default="")

    def __repr__(self):
        return f"<{self.id}: {self.name}>"
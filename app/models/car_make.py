import sqlalchemy as sa
from sqlalchemy import orm
from app.database import db
from .utils import ModelMixin


class CarMake(db.Model, ModelMixin):
    __tablename__ = "makes"

    id: orm.Mapped[int] = orm.mapped_column(primary_key=True)
    name: orm.Mapped[str] = orm.mapped_column(sa.String(64), default="")

    def __repr__(self):
        return f"<{self.id}: {self.name}>"

import sqlalchemy as sa
from sqlalchemy import orm
from app.database import db
from .utils import ModelMixin
from .car_make import CarMake


class CarModel(db.Model, ModelMixin):
    __tablename__ = "models"

    id: orm.Mapped[int] = orm.mapped_column(primary_key=True)
    name: orm.Mapped[str] = orm.mapped_column(sa.String(64), default="")

    make_id: orm.Mapped[int] = orm.mapped_column(
        sa.Integer,
        sa.ForeignKey("makes.id"),
        nullable=True,
    )

    make: orm.Mapped[CarMake] = orm.relationship("CarMake", backref="models")

    def __repr__(self):
        return f"<{self.id}: {self.name}>"

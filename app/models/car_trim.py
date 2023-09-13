import sqlalchemy as sa
from sqlalchemy import orm
from app.database import db
from .utils import ModelMixin
from app.models.car_model import CarModel


class CarTrim(db.Model, ModelMixin):
    __tablename__ = "trims"

    id: orm.Mapped[int] = orm.mapped_column(primary_key=True)
    name: orm.Mapped[str] = orm.mapped_column(sa.String(64), nullable=True, index=True)
    model_id: orm.Mapped[int] = orm.mapped_column(
        sa.Integer,
        sa.ForeignKey("models.id"),
        nullable=True,
    )

    model: orm.Mapped[CarModel] = orm.relationship("CarModel", backref="trims")

    def __repr__(self):
        return f"<{self.id}: {self.name}>"

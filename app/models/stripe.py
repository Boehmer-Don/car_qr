from datetime import datetime
import sqlalchemy as sa
from sqlalchemy import orm
from app.database import db
from .utils import ModelMixin

# from app import schema as s


class StripeProductPrice(db.Model, ModelMixin):
    __tablename__ = "stripe_product_prices"

    id: orm.Mapped[int] = orm.mapped_column(primary_key=True)
    stripe_price_id: orm.Mapped[str] = orm.mapped_column(sa.String(64), nullable=False)
    currency: orm.Mapped[str] = orm.mapped_column(sa.String(64), default="cad")
    created_at: orm.Mapped[datetime] = orm.mapped_column(
        sa.DateTime,
        default=datetime.utcnow,
    )
    unit_amount: orm.Mapped[int] = orm.mapped_column(sa.Integer, default=1)

    def __repr__(self):
        return f"<{self.id}: {self.stripe_price_id}>"


class StripeProduct(db.Model, ModelMixin):
    __tablename__ = "stripe_products"

    id: orm.Mapped[int] = orm.mapped_column(primary_key=True)
    stripe_product_id: orm.Mapped[str] = orm.mapped_column(
        sa.String(64), nullable=False
    )
    price_id: orm.Mapped[int] = orm.mapped_column(
        sa.Integer, sa.ForeignKey("stripe_product_prices.id"), nullable=True
    )
    name: orm.Mapped[str] = orm.mapped_column(sa.String(64), nullable=False)
    description: orm.Mapped[str] = orm.mapped_column(sa.String(64), default="")
    created_at: orm.Mapped[datetime] = orm.mapped_column(
        sa.DateTime,
        default=datetime.utcnow,
    )

    price: orm.Mapped[StripeProductPrice] = orm.relationship(
        "StripeProductPrice", backref="stripe_products"
    )

    def __repr__(self):
        return f"<{self.id}: {self.name}>"

import sqlalchemy as sa
from sqlalchemy import orm
from app.database import db
from .utils import ModelMixin
from app.models.user import User


class Subscription(db.Model, ModelMixin):
    __tablename__ = "subscriptions"

    id: orm.Mapped[int] = orm.mapped_column(primary_key=True)
    stripe_subscription_id: orm.Mapped[str] = orm.mapped_column(
        sa.String(64), nullable=False
    )
    user_id: orm.Mapped[int] = orm.mapped_column(
        sa.Integer, sa.ForeignKey("users.id"), nullable=True
    )
    product_id: orm.Mapped[int] = orm.mapped_column(
        sa.Integer, sa.ForeignKey("stripe_products.id"), nullable=True
    )
    current_period_start: orm.Mapped[int] = orm.mapped_column(
        sa.Integer, nullable=False
    )
    current_period_end: orm.Mapped[int] = orm.mapped_column(sa.Integer, nullable=False)
    is_active: orm.Mapped[bool] = orm.mapped_column(sa.Boolean, default=False)

    user: orm.Mapped[User] = orm.relationship(back_populates="subscriptions")

    def __repr__(self):
        return f"<{self.id}: {self.stripe_subscription_id}>"

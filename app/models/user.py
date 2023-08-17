from datetime import datetime
from uuid import uuid4
import enum
from flask_login import UserMixin, AnonymousUserMixin
import sqlalchemy as sa
from sqlalchemy import orm
from sqlalchemy.ext.hybrid import hybrid_property
from werkzeug.security import generate_password_hash, check_password_hash

from app.database import db
from .utils import ModelMixin
from app.logger import log
from app import schema as s


def gen_password_reset_id() -> str:
    return str(uuid4())


class UsersPlan(enum.Enum):
    basic = "Basic Plan"
    advanced = "Advanced Plan"


class UsersRole(enum.Enum):
    admin = "admin"
    dealer = "dealer"


class User(db.Model, UserMixin, ModelMixin):
    __tablename__ = "users"

    id: orm.Mapped[int] = orm.mapped_column(primary_key=True)
    role: orm.Mapped[UsersPlan] = orm.mapped_column(
        sa.Enum(UsersRole), default=UsersRole.dealer
    )
    email: orm.Mapped[str] = orm.mapped_column(
        sa.String(255),
        unique=True,
        nullable=False,
    )
    password_hash: orm.Mapped[str] = orm.mapped_column(sa.String(255), default="")
    activated: orm.Mapped[bool] = orm.mapped_column(sa.Boolean, default=False)
    deleted: orm.Mapped[bool] = orm.mapped_column(
        sa.Boolean, default=False, nullable=True
    )
    created_at: orm.Mapped[datetime] = orm.mapped_column(
        sa.DateTime,
        default=datetime.utcnow,
    )
    unique_id: orm.Mapped[str] = orm.mapped_column(
        sa.String(36),
        default=gen_password_reset_id,
    )
    reset_password_uid: orm.Mapped[str] = orm.mapped_column(
        sa.String(64),
        default=gen_password_reset_id,
    )

    first_name: orm.Mapped[str] = orm.mapped_column(sa.String(64), default="")
    last_name: orm.Mapped[str] = orm.mapped_column(sa.String(64), default="")
    name_of_dealership: orm.Mapped[str] = orm.mapped_column(sa.String(64), default="")
    address_of_dealership: orm.Mapped[str] = orm.mapped_column(
        sa.String(64), default=""
    )
    country: orm.Mapped[str] = orm.mapped_column(sa.String(64), default="")
    province: orm.Mapped[str] = orm.mapped_column(sa.String(64), default="")
    city: orm.Mapped[str] = orm.mapped_column(sa.String(64), default="")
    postal_code: orm.Mapped[str] = orm.mapped_column(sa.String(64), default="")
    phone: orm.Mapped[str] = orm.mapped_column(sa.String(64), default="")
    plan: orm.Mapped[UsersPlan] = orm.mapped_column(
        sa.Enum(UsersPlan), default=UsersPlan.basic
    )
    stripe_customer_id: orm.Mapped[str] = orm.mapped_column(
        sa.String(128), unique=True, nullable=True
    )

    @hybrid_property
    def password(self):
        return self.password_hash

    @password.setter
    def password(self, password):
        self.password_hash = generate_password_hash(password)

    @classmethod
    def authenticate(cls, user_id, password):
        query = cls.select().where(sa.func.lower(cls.email) == sa.func.lower(user_id))
        user = db.session.scalar(query)
        if not user:
            log(log.WARNING, "user:[%s] not found", user_id)

        if user is not None and check_password_hash(user.password, password):
            return user

    def reset_password(self):
        self.password_hash = ""
        self.reset_password_uid = gen_password_reset_id()
        self.save()

    def __repr__(self):
        return f"<{self.id}:{self.email}>"

    @property
    def json(self):
        u = s.User.from_orm(self)
        return u.json()


class AnonymousUser(AnonymousUserMixin):
    pass

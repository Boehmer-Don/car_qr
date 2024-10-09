from app import db
import sqlalchemy as sa
from sqlalchemy import orm
from .user import User


class UserLogo(db.Model):
    id: orm.Mapped[int] = orm.mapped_column(primary_key=True)
    filename: orm.Mapped[str] = orm.mapped_column(sa.String(256), nullable=False)
    mimetype: orm.Mapped[str] = orm.mapped_column(sa.String(32), default="image/png")
    file: orm.Mapped[bytes] = orm.mapped_column(sa.LargeBinary, nullable=False)
    user_id: orm.Mapped[int] = orm.mapped_column(
        sa.Integer,
        sa.ForeignKey(
            "users.id"
        ),
        nullable=True
    )

    user: orm.Mapped[User] = orm.relationship("User", backref="logo")

    def __repr__(self):
        return f"<{self.id}: {self.filename} {self.user}>"

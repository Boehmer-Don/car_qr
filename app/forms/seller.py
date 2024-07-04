import sqlalchemy as sa

from wtforms import PasswordField, StringField, ValidationError, BooleanField
from wtforms.validators import DataRequired, Length, EqualTo, Optional, Email

from app import models as m, db
from .base import BaseForm


class SellerForm(BaseForm):
    first_name = StringField("first_name", validators=[DataRequired(), Length(0, 64)])
    last_name = StringField("last_name", validators=[DataRequired(), Length(0, 64)])
    email = StringField("email", validators=[DataRequired(), Length(0, 255), Email()])
    password = PasswordField("Password", validators=[DataRequired(), Length(6, 30)])
    password_confirmation = PasswordField(
        "Confirm Password",
        validators=[
            DataRequired(),
            EqualTo("password", message="Password do not match."),
        ],
    )

    def validate_email(self, field):
        query = sa.select(m.User).where(m.User.email == field.data)
        if db.session.scalar(query) is not None:
            raise ValidationError("This email is already registered.")


class EditSellerFrom(BaseForm):
    unique_id = StringField("unique_id", validators=[DataRequired()])
    first_name = StringField("first_name", validators=[Optional(), Length(0, 64)])
    last_name = StringField("last_name", validators=[Optional(), Length(0, 64)])
    email = StringField("email", validators=[Optional(), Length(0, 255), Email()])
    activated = BooleanField("Activated", validators=[Optional()])

    new_password = PasswordField("New password", validators=[Optional(), Length(6, 30)])
    new_password_confirmation = PasswordField(
        "Confirm new password",
        validators=[
            Optional(),
            EqualTo("new_password", message="Password do not match."),
        ],
    )

    def validate_email(self, field):
        query = sa.select(m.User).where(
            m.User.email == field.data, m.User.unique_id != self.unique_id.data
        )
        if db.session.scalar(query) is not None:
            raise ValidationError("This email is already registered.")


class LoginAsSellerForm(BaseForm):
    unique_id = StringField("unique_id", validators=[DataRequired()])

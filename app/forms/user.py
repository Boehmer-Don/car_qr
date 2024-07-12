from flask_wtf import FlaskForm
from wtforms import (
    StringField,
    PasswordField,
    SubmitField,
    ValidationError,
    BooleanField,
)
from wtforms.validators import DataRequired, Email, Length, EqualTo, Optional

from app import models as m
from app import db


class UserForm(FlaskForm):
    next_url = StringField("next_url")
    user_id = StringField("user_id", [DataRequired()])
    email = StringField("email", [DataRequired(), Email(), Length(1, 255)])
    activated = BooleanField("activated")
    first_name = StringField("First Name", [DataRequired(), Optional(), Length(0, 64)])
    last_name = StringField("Last Name", [DataRequired(), Length(0, 64)])
    password = PasswordField("Password", validators=[Optional(), Length(6, 30)])
    password_confirmation = PasswordField(
        "Confirm Password",
        validators=[
            Optional(),
            EqualTo("password", message="Password do not match."),
        ],
    )
    submit = SubmitField("Save")

    def validate_email(self, field):
        query = (
            m.User.select()
            .where(m.User.email == field.data)
            .where(m.User.id != int(self.user_id.data))
        )
        if db.session.scalar(query) is not None:
            raise ValidationError("This email is already registered.")


class AdminForm(FlaskForm):
    email = StringField("email", [DataRequired(), Email(), Length(1, 64)])
    phone = StringField(
        "Phone",
        [
            DataRequired(),
            Length(6, 15),
        ],
    )
    first_name = StringField("First Name", [DataRequired(), Length(0, 64)])
    last_name = StringField("Last Name", [DataRequired(), Length(0, 64)])
    password = PasswordField("Password", validators=[DataRequired(), Length(6, 30)])
    password_confirmation = PasswordField(
        "Confirm Password",
        validators=[
            DataRequired(),
            EqualTo("password", message="Password do not match."),
        ],
    )
    submit = SubmitField("Save")

    def validate_email(self, field):
        query = m.User.select().where(m.User.email == field.data)
        if db.session.scalar(query) is not None:
            raise ValidationError("This email is already registered.")


class ResendInviteForm(FlaskForm):
    email = StringField(
        "email",
        [DataRequired(), Email(), Length(1, 255)],
        render_kw={"placeholder": "example@company.com"},
    )

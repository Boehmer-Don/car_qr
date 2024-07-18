from wtforms import (
    HiddenField,
    StringField,
    PasswordField,
    ValidationError,
)
from wtforms.validators import DataRequired, Email, EqualTo, Regexp

from app.models import User
from app import db
from .base import BaseForm


class BasePickerForm(BaseForm):
    email = StringField(
        "Email Address",
        validators=[DataRequired(), Email()],
        render_kw={"placeholder": "Enter your email"},
    )
    phone = StringField(
        "Phone Number",
        validators=[
            DataRequired(message="Phone number is required."),
            Regexp(
                r"^\d{0,3}-\d{0,3}-\d{0,4}$",
                message="Invalid phone number format. Use 10 digits.",
            ),
        ],
    )

    def validate_email(form, field):
        query = User.select().where(User.email == field.data)
        if db.session.scalar(query) is not None:
            raise ValidationError("This email is already registered.")


class PickerForm(BasePickerForm):

    password = PasswordField(
        "Password",
        [
            DataRequired(),
            EqualTo("password_confirmation", message="Passwords must match"),
        ],
        render_kw={"placeholder": "Password"},
    )
    password_confirmation = PasswordField(
        "Repeat Password", render_kw={"placeholder": "Repeat Password"}
    )


class EditPickerForm(BasePickerForm):
    picker_unique_id = HiddenField("Service ID", validators=[DataRequired()])
    new_password = PasswordField(
        "Password",
        [
            EqualTo("new_password_confirmation", message="Passwords must match"),
        ],
        render_kw={"placeholder": "Password"},
    )
    new_password_confirmation = PasswordField(
        "Repeat Password", render_kw={"placeholder": "Repeat Password"}
    )

    def validate_email(form, field):
        query = User.select().where(
            User.email == field.data, User.unique_id != form.picker_unique_id.data
        )
        if db.session.scalar(query) is not None:
            raise ValidationError("This email is already registered.")

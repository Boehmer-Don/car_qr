from wtforms import (
    HiddenField,
    StringField,
    PasswordField,
    ValidationError,
    SelectField,
    FileField,
)
from wtforms.validators import DataRequired, Email, Length, EqualTo, Regexp, Optional

from app.models import User
from app import schema as s
from app import db
from .base import BaseForm


class BaseServiceForm(BaseForm):
    email = StringField(
        "Email Address",
        validators=[DataRequired(), Email()],
        render_kw={"placeholder": "Enter your email"},
    )
    service_name = StringField("Name", validators=[DataRequired(), Length(0, 64)])
    first_name = StringField("First Name", validators=[Optional(), Length(0, 64)], default="")
    last_name = StringField("Last Name", validators=[Optional(), Length(0, 64)], default="")
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
    address = StringField("Address", validators=[DataRequired(), Length(0, 64)])
    country = SelectField(
        "Country",
        validators=[DataRequired()],
        choices=[(c.name, c.value) for c in s.Country],
    )
    province = SelectField(
        "Province",
        validators=[DataRequired(), Length(0, 64)],
        choices=[],
        validate_choice=False,
    )
    city = StringField("City", validators=[DataRequired(), Length(0, 64)])
    postal_code = StringField("Postal Code", validators=[DataRequired(), Length(0, 64)])

    def validate_email(form, field):
        query = User.select().where(User.email == field.data)
        if db.session.scalar(query) is not None:
            raise ValidationError("This email is already registered.")


class ServiceForm(BaseServiceForm):
    password = PasswordField(
        "Password",
        [
            DataRequired(),
            EqualTo("password_confirmation", message="Passwords must match"),
        ],
        render_kw={"placeholder": "Password"},
    )
    password_confirmation = PasswordField("Repeat Password", render_kw={"placeholder": "Repeat Password"})


class EditServiceForm(BaseServiceForm):
    service_unique_id = HiddenField("Service ID", validators=[DataRequired()])
    new_password = PasswordField(
        "Password",
        [
            EqualTo("new_password_confirmation", message="Passwords must match"),
        ],
        render_kw={"placeholder": "Password"},
    )
    new_password_confirmation = PasswordField("Repeat Password", render_kw={"placeholder": "Repeat Password"})

    def validate_email(form, field):
        query = User.select().where(User.email == field.data, User.unique_id != form.service_unique_id.data)
        if db.session.scalar(query) is not None:
            raise ValidationError("This email is already registered.")


class ServiceRecordForm(BaseForm):
    file = FileField("File Name", validators=[DataRequired()])

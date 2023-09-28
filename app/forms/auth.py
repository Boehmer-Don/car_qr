from flask_wtf import FlaskForm
from wtforms import (
    StringField,
    PasswordField,
    SubmitField,
    ValidationError,
    SelectField,
    BooleanField,
)
from wtforms.validators import DataRequired, Email, Length, EqualTo, Optional

from app.models import User
from app import db


class LoginForm(FlaskForm):
    user_id = StringField("Email", [DataRequired()])
    password = PasswordField("Password", [DataRequired()])
    submit = SubmitField("Login")


class RegistrationForm(FlaskForm):
    email = StringField("Email Address", validators=[DataRequired(), Email()])
    password = PasswordField("Password", validators=[DataRequired(), Length(6, 30)])
    password_confirmation = PasswordField(
        "Confirm Password",
        validators=[
            DataRequired(),
            EqualTo("password", message="Password do not match."),
        ],
    )
    submit = SubmitField("Register")

    def validate_email(form, field):
        query = User.select().where(User.email == field.data)
        if db.session.scalar(query) is not None:
            raise ValidationError("This email is already registered.")


class RegistrationStep2Form(FlaskForm):
    first_name = StringField("First Name", validators=[DataRequired(), Length(0, 255)])
    last_name = StringField("Last Name", validators=[DataRequired(), Length(0, 255)])
    name_of_dealership = StringField(
        "Name of Dealership", validators=[DataRequired(), Length(0, 255)]
    )
    address_of_dealership = StringField(
        "Address of Dealership", validators=[DataRequired(), Length(0, 255)]
    )
    country = StringField("Country", validators=[DataRequired(), Length(0, 255)])
    province = StringField("Province", validators=[DataRequired(), Length(0, 255)])
    city = StringField("City", validators=[DataRequired(), Length(0, 255)])
    postal_code = StringField(
        "Postal Code", validators=[DataRequired(), Length(0, 255)]
    )
    phone = StringField("Phone", validators=[DataRequired(), Length(0, 255)])
    gift = StringField("Gift", validators=[Optional(), Length(0, 255)])

    submit = SubmitField("Register")


class SubscriptionPlanForm(FlaskForm):
    selected_plan = StringField("selected_plan")
    submit_button = SubmitField("Submit")


class ForgotForm(FlaskForm):
    email = StringField("Email Address", validators=[DataRequired(), Email()])

    def validate_email(self, email):
        query = User.select().where(User.email == email.data)
        user = db.session.scalar(query)
        if not user:
            raise ValidationError("Email not found")


class ChangePasswordForm(FlaskForm):
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
    submit = SubmitField("Change password")


class PaymentForm(FlaskForm):
    # Account
    email = StringField("Email Address", validators=[Optional(), Email()])
    password = PasswordField("Password", validators=[Optional(), Length(6, 30)])
    password_confirmation = PasswordField(
        "Confirm Password",
        validators=[
            Optional(),
            EqualTo("password", message="Password do not match."),
        ],
    )

    # Contact
    first_name = StringField("First Name", validators=[Optional()])
    last_name = StringField("Last Name", validators=[Optional()])
    name_of_dealership = StringField("Name of Dealership", validators=[Optional()])
    address_of_dealership = StringField(
        "Address of Dealership", validators=[Optional()]
    )
    country = StringField("Country", validators=[Optional()])
    province = StringField("Province", validators=[Optional()])
    city = StringField("City", validators=[Optional()])
    postal_code = StringField("Postal Code", validators=[Optional()])
    phone = StringField("Phone", validators=[Optional()])
    gift_enabled = BooleanField("Enable Gift")
    gift = StringField("Gift", validators=[Optional(), Length(0, 255)])
    extra_emails = StringField("Extra Emails", validators=[Optional(), Length(0, 1024)])

    # Payment Plan
    choices = [
        ("basic", "Basic Plan"),
        ("advanced", "Advanced Plan"),
    ]
    plan = SelectField("Plan", choices=choices)

    submit = SubmitField("Register")

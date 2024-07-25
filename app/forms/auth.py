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
    user_id = StringField(
        "Email", [DataRequired()], render_kw={"placeholder": "Enter your email"}
    )
    password = PasswordField(
        "Password",
        [DataRequired()],
        render_kw={"placeholder": "Enter your password", "autocomplete": "off"},
    )
    submit = SubmitField("Login")


class RegistrationForm(FlaskForm):
    email = StringField(
        "Email Address",
        validators=[DataRequired(), Email()],
        render_kw={"placeholder": "Enter your email"},
    )
    password = PasswordField(
        "Password",
        validators=[DataRequired(), Length(6, 30)],
        render_kw={"placeholder": "Enter your password", "autocomplete": "off"},
    )
    password_confirmation = PasswordField(
        "Confirm Password",
        validators=[
            DataRequired(),
            EqualTo("password", message="Password do not match."),
        ],
        render_kw={"placeholder": "Enter your confirm password", "autocomplete": "off"},
    )
    submit = SubmitField("Register")

    def validate_email(form, field):
        query = User.select().where(User.email == field.data)
        if db.session.scalar(query) is not None:
            raise ValidationError("This email is already registered.")


class RegistrationStep2Form(FlaskForm):
    first_name = StringField("First Name", validators=[DataRequired(), Length(0, 64)])
    last_name = StringField("Last Name", validators=[DataRequired(), Length(0, 64)])
    name_of_dealership = StringField(
        "Name of Dealership", validators=[DataRequired(), Length(0, 64)]
    )
    address_of_dealership = StringField(
        "Address of Dealership", validators=[DataRequired(), Length(0, 64)]
    )
    country = StringField("Country", validators=[DataRequired(), Length(0, 64)])
    province = StringField("Province", validators=[DataRequired(), Length(0, 64)])
    city = StringField("City", validators=[DataRequired(), Length(0, 64)])
    postal_code = StringField("Postal Code", validators=[DataRequired(), Length(0, 64)])
    phone = StringField("Phone", validators=[DataRequired(), Length(0, 14)])
    gift = StringField("Gift", validators=[Optional(), Length(0, 128)])

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
    first_name = StringField("First Name", validators=[Optional(), Length(0, 64)])
    last_name = StringField("Last Name", validators=[Optional(), Length(0, 64)])
    name_of_dealership = StringField(
        "Name of Dealership", validators=[Optional(), Length(0, 64)]
    )
    address_of_dealership = StringField(
        "Address of Dealership", validators=[Optional(), Length(0, 64)]
    )
    country = StringField("Country", validators=[Optional(), Length(0, 64)])
    province = StringField("Province", validators=[Optional(), Length(0, 64)])
    city = StringField("City", validators=[Optional(), Length(0, 64)])
    postal_code = StringField("Postal Code", validators=[Optional(), Length(0, 64)])
    phone = StringField("Phone", validators=[Optional(), Length(0, 14)])
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

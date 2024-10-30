from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, Email, Length, Regexp


class Client(FlaskForm):
    first_name = StringField(
        "First Name",
        validators=[DataRequired(message="First name is required"), Length(3, 32)],
    )
    last_name = StringField(
        "Last Name",
        validators=[DataRequired(message="Last name is required"), Length(3, 32)],
    )
    email = StringField("Email Address", validators=[DataRequired(message="Email is required"), Email()])
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

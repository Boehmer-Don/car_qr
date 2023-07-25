from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, BooleanField


class LabelForm(FlaskForm):
    unique_id = StringField("Unique ID")
    name = StringField("Name")
    make = StringField("Make")
    vehicle_model = StringField("Model")
    year = IntegerField("Year")
    mileage = IntegerField("Mileage")
    color = StringField("Color")
    trim = StringField("Trim")
    type_of_vehicle = StringField("Type of Vehicle")
    price = IntegerField("Price")
    date_received = StringField("Date Received")
    url = StringField("URL")
    active = BooleanField("Active")
    user_id = IntegerField("User ID")
    views = IntegerField("Views")
    next_url = StringField("Next URL")


class DeactivateLabelForm(FlaskForm):
    unique_id = StringField("Unique ID")
    active = BooleanField("Active")
    next_url = StringField("Next URL")


class LabelsAmountForm(FlaskForm):
    user_unique_id = StringField("User Unique ID")
    amount = IntegerField("Amount")

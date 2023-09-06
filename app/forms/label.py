from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, BooleanField, FloatField


class LabelForm(FlaskForm):
    sticker_id = StringField("Unique ID")
    unique_id = StringField("Unique ID")
    name = StringField("Name")
    make = StringField("Make")
    vehicle_model = StringField("Model")
    year = IntegerField("Year")
    mileage = FloatField("Mileage")
    color = StringField("Color")
    trim = StringField("Trim")
    type_of_vehicle = StringField("Type of Vehicle")
    price = FloatField("Price")
    date_received = StringField("Date Received")
    url = StringField("URL")
    user_id = IntegerField("User ID")
    views = IntegerField("Views")
    gift = StringField("Gift")
    next_url = StringField("Next URL")


class DeactivateLabelForm(FlaskForm):
    unique_id = StringField("Unique ID")
    active = BooleanField("Active")
    next_url = StringField("Next URL")
    price_sold = IntegerField("Price Sold")


class LabelsAmountForm(FlaskForm):
    user_unique_id = StringField("User Unique ID")
    amount = IntegerField("Amount")

from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, BooleanField, FloatField
from wtforms.validators import DataRequired, Length


class LabelForm(FlaskForm):
    sticker_id = StringField("Unique ID", validators=[DataRequired(), Length(0, 255)])
    unique_id = StringField("Unique ID", validators=[Length(0, 255)])
    name = StringField("Name", validators=[DataRequired(), Length(0, 255)])
    make = StringField("Make", validators=[DataRequired(), Length(0, 255)])
    vehicle_model = StringField("Model", validators=[DataRequired(), Length(0, 255)])
    year = IntegerField("Year", validators=[DataRequired()])
    mileage = FloatField("Mileage", validators=[DataRequired()])
    color = StringField("Color", validators=[DataRequired(), Length(0, 255)])
    trim = StringField("Trim", validators=[DataRequired(), Length(0, 255)])
    type_of_vehicle = StringField(
        "Type of Vehicle", validators=[DataRequired(), Length(0, 255)]
    )
    price = FloatField("Price", validators=[DataRequired()])
    url = StringField("URL", validators=[DataRequired(), Length(0, 255)])
    user_id = IntegerField("User ID", validators=[DataRequired()])
    views = IntegerField("Views")
    gift = StringField("Gift", validators=[DataRequired(), Length(0, 255)])
    next_url = StringField("Next URL")


class LabelUpdateForm(LabelForm):
    price = StringField("Price", validators=[DataRequired(), Length(1, 255)])
    mileage = StringField("Mileage", validators=[DataRequired(), Length(1, 255)])


class DeactivateLabelForm(FlaskForm):
    unique_id = StringField("Unique ID")
    active = BooleanField("Active")
    next_url = StringField("Next URL")
    price_sold = IntegerField("Price Sold")


class LabelsAmountForm(FlaskForm):
    user_unique_id = StringField("User Unique ID")
    amount = IntegerField("Amount")

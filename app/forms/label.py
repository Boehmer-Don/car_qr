from flask_wtf import FlaskForm
from wtforms import (
    DecimalField,
    HiddenField,
    StringField,
    IntegerField,
    FloatField,
    ValidationError,
    BooleanField,
)
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
    type_of_vehicle = StringField("Type of Vehicle", validators=[DataRequired(), Length(0, 255)])
    price = FloatField("Price", validators=[DataRequired()])
    url = StringField("URL", validators=[DataRequired(), Length(0, 255)])
    user_id = IntegerField("User ID", validators=[DataRequired()])
    views = IntegerField("Views")
    gift = StringField("Gift", validators=[DataRequired(), Length(0, 255)])
    location_id = IntegerField("Location ID", default=None)
    next_url = StringField("Next URL")


class LabelUpdateForm(LabelForm):
    price = StringField("Price", validators=[DataRequired(), Length(1, 255)])
    mileage = StringField("Mileage", validators=[DataRequired(), Length(1, 255)])


class SoldLabelForm(FlaskForm):
    label_unique_id = HiddenField("Label Unique ID", validators=[DataRequired()])
    seller_unique_id = StringField("Seller Unique ID", validators=[DataRequired()])
    pickup_date = StringField("Pickup Date", validators=[DataRequired()])
    pickup_time = StringField("Pickup Time", validators=[DataRequired()])
    is_electric_car = BooleanField("Is Electric Car", default=False)
    price_sold = DecimalField(
        "Price Sold",
        validators=[DataRequired()],
        render_kw={"placeholder": "i.e. 10000", "min": "1"},
    )

    def validate_price_sold(self, field):
        if field.data < 0:
            raise ValidationError("Price sold must be greater than 0")


class LabelsAmountForm(FlaskForm):
    user_unique_id = StringField("User Unique ID")
    amount = IntegerField("Amount")

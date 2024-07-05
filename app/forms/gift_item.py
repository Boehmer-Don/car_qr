from wtforms import (
    DecimalField,
    StringField,
    IntegerField,
    ValidationError,
    BooleanField,
)
from wtforms.validators import DataRequired, Length, Optional
from .base import BaseForm


class GiftItemForm(BaseForm):
    description = StringField(
        "Description", validators=[DataRequired(), Length(0, 255)]
    )
    price = DecimalField("Price", validators=[DataRequired()])
    min_qty = IntegerField("min_qty", validators=[DataRequired()])
    max_qty = IntegerField("max_qty", validators=[DataRequired()])
    is_default = BooleanField("is_default", validators=[DataRequired()], default=False)

    def validate_price(self, field):
        if field.data < 0:
            raise ValidationError("Price must be greater than 0")


class EditGiftItemForm(BaseForm):
    description = StringField("Description", validators=[Optional(), Length(0, 255)])
    price = DecimalField("Price", validators=[Optional()])
    min_qty = IntegerField("min_qty", validators=[Optional()])
    max_qty = IntegerField("max_qty", validators=[Optional()])
    is_default = BooleanField("is_default", validators=[Optional()])

    def validate_price(self, field):
        if field.data < 0:
            raise ValidationError("Price must be greater than 0")

from wtforms import (
    DecimalField,
    StringField,
    IntegerField,
    ValidationError,
    BooleanField,
    HiddenField,
)
from wtforms.validators import DataRequired, Length
from .base import BaseForm


class GiftItemForm(BaseForm):
    description = StringField(
        "Description",
        validators=[DataRequired(), Length(0, 264)],
        render_kw={
            "placeholder": "Enter gift item description",
            "minlength": 1,
            "maxlength": 264,
        },
    )
    price = DecimalField(
        "Price",
        validators=[DataRequired()],
        render_kw={"min": 1, "placeholder": "Enter gift item price"},
    )
    min_qty = IntegerField(
        "min_qty",
        validators=[DataRequired()],
        render_kw={"min": 1, "placeholder": "Enter min qty"},
    )
    max_qty = IntegerField(
        "max_qty",
        validators=[DataRequired()],
        render_kw={"min": 1, "placeholder": "Enter max qty"},
    )
    is_default = BooleanField("is_default", default=True)

    def validate_price(self, field):
        if field.data < 0:
            raise ValidationError("Price must be greater than 0")

    def validate_min_qty(self, field):
        if field.data >= self.max_qty.data:
            raise ValidationError("Min qty must be less than max qty")


class EditGiftItemForm(GiftItemForm):
    gift_item_unique_id = HiddenField("gift_item_id", validators=[DataRequired()])

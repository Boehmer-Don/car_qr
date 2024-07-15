from wtforms import StringField, HiddenField, BooleanField, TextAreaField
from wtforms.validators import DataRequired

from .seller import SellerForm as UserForm, EditSellerFrom as EditUserForm
from .base import BaseForm


class GiftBoxForm(UserForm):
    sale_rep_unique_id = HiddenField("sale_rep_unique_id", validators=[DataRequired()])
    gift_boxes = StringField("gift_boxes", validators=[DataRequired()])


class OilChangeForm(BaseForm):
    sale_rep_unique_id = HiddenField("sale_rep_unique_id", validators=[DataRequired()])
    first_oil_change = StringField("first_oil_change", validators=[DataRequired()])
    second_oil_change = StringField("second_oil_change", validators=[DataRequired()])
    description = TextAreaField("description", default="")
    is_notfy_by_email = BooleanField("is_notfy_by_email", default=False)
    is_notfy_by_phone = BooleanField("is_notfy_by_phone", default=False)


class EditSaleRepForm(EditUserForm):
    sale_rep_unique_id = HiddenField("sale_rep_unique_id", validators=[DataRequired()])
    description = TextAreaField("description", default="")
    first_oil_change = StringField("first_oil_change")
    second_oil_change = StringField("second_oil_change")
    is_notfy_by_email = BooleanField("is_notfy_by_email", default=False)
    is_notfy_by_phone = BooleanField("is_notfy_by_phone", default=False)

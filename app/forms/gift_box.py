from wtforms import StringField, HiddenField
from wtforms.fields import TelField
from wtforms.validators import DataRequired
from .seller import SellerForm


class GiftBoxForm(SellerForm):
    sale_rep_unique_id = HiddenField("sale_rep_unique_id", validators=[DataRequired()])
    phone = TelField("phone", validators=[DataRequired()])
    gift_boxes = StringField("gift_boxes", validators=[DataRequired()])

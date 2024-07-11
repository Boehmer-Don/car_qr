from wtforms import HiddenField
from wtforms.validators import DataRequired

from .base import BaseForm


class OilChangeDoneForm(BaseForm):
    oil_change_unique_id = HiddenField("oil_change_id", validators=[DataRequired()])

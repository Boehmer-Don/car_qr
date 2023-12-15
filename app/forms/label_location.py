from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired, Length


class LabelLocationForm(FlaskForm):
    name = StringField("name", validators=[DataRequired(), Length(0, 64)])

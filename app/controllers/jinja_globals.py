from datetime import datetime
from flask_wtf import FlaskForm


# Paste in forms in html templates: {{ form_hidden_tag() }}
def form_hidden_tag():
    form = FlaskForm()
    return form.hidden_tag()


def time_delta(created_at: datetime):
    return (datetime.utcnow() - created_at).days


def days_active(date_received: datetime, date_deactivated: datetime):
    return (date_deactivated - date_received).days

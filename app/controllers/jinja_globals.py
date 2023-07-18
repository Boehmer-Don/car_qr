from flask_wtf import FlaskForm


# Paste in forms in html templates: {{ form_hidden_tag() }}
def form_hidden_tag():
    form = FlaskForm()
    return form.hidden_tag()

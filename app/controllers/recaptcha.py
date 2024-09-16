# flake8: noqa E501
import requests

from flask import current_app as app
from flask import request

CAPTCHA_URL = "https://www.google.com/recaptcha/api/siteverify"


def validate_recaptcha():
    res = requests.post(
        url=f"{CAPTCHA_URL}?secret={app.config['RECAPTCHA_PRIVATE_KEY']}&response={request.form['g-recaptcha-response']}"
    )
    return True if res.json().get("success", None) else False

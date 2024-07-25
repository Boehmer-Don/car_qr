import urllib.parse

from flask import current_app as app


def custom_url_for(endpoint, **params):
    url = app.config["BASE_URL"] + endpoint
    return url + urllib.parse.urlencode(params)

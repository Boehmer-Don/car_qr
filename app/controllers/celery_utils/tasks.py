import subprocess
from . import celery


@celery.task
def subscriptions_expiration_check():
    flask_proc = subprocess.Popen(["flask", "subscriptions-check"])
    flask_proc.communicate()

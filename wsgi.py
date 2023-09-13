#!/user/bin/env python
import subprocess
from app import create_app
from app import commands
from apscheduler.schedulers.background import BackgroundScheduler


app = create_app()
commands.init(app)
scheduler = BackgroundScheduler()


def subscriptions_expiration_notifier():
    flask_proc = subprocess.Popen(["flask", "subscriptions-check"])
    flask_proc.communicate()


scheduler.add_job(
    subscriptions_expiration_notifier,
    "interval",
    seconds=10,
)
scheduler.start()

if __name__ == "__main__":
    app.run()

from apscheduler.schedulers.background import BackgroundScheduler
from apscheduler.jobstores.sqlalchemy import SQLAlchemyJobStore
from flask import Flask
import subprocess


def subscriptions_expiration_notifier():
    flask_proc = subprocess.Popen(["flask", "subscriptions-check"])
    flask_proc.communicate()


def notify_about_oil_change():
    flask_proc = subprocess.Popen(["flask", "notify-oil-change"])
    flask_proc.communicate()


def notify_weekly_inventory_report():
    flask_proc = subprocess.Popen(["flask", "weekly-inventory-report"])
    flask_proc.communicate()


def set_scheduler(scheduler: BackgroundScheduler, app: Flask):

    JOB_STORES = {
        "default": SQLAlchemyJobStore(url=app.config["ALCHEMICAL_DATABASE_URL"])
    }
    scheduler.configure(jobstores=JOB_STORES)
    scheduler.start()
    scheduler.remove_all_jobs()

    scheduler.add_job(
        id="subscriptions_expiration_notifier",
        func=subscriptions_expiration_notifier,
        trigger="cron",
        hour=app.config["SUBSCRIPTIONS_EXPIRATION_CHECK_HOUR"],
        minute=0,
        second=0,
        replace_existing=True,
    )

    scheduler.add_job(
        id="notify_about_oil_change",
        func=notify_about_oil_change,
        trigger="cron",
        hour=app.config["SUBSCRIPTIONS_EXPIRATION_CHECK_HOUR"],
        minute=30,
        second=0,
        replace_existing=True,
    )

    scheduler.add_job(
        id="notify_weekly_inventory_report",
        func=notify_weekly_inventory_report,
        trigger="cron",
        day_of_week=6,
        hour=17,
        minute=0,
        second=0,
        replace_existing=True,
    )

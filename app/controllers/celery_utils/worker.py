from . import celery
from config import config
from .tasks import subscriptions_expiration_check

conf = config()


@celery.on_after_finalize.connect
def setup_periodic_tasks(sender, **kwargs):
    sender.add_periodic_task(
        # conf.SUBSCRIPTIONS_EXPIRATION_CHECK_INTERVAL,
        10,
        subscriptions_expiration_check.s(),
        name="Subscriptions expiration check",
    )

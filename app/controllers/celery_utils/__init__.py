from celery import Celery
from config import config

conf = config()

celery = Celery(__name__)
celery.conf.broker_url = conf.REDIS_URL_FOR_CELERY
celery.conf.result_backend = conf.REDIS_URL_FOR_CELERY

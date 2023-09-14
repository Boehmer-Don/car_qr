#!/bin/sh
poetry run celery -A app.controllers.celery_utils.worker.celery worker -B

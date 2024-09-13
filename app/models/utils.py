from datetime import datetime, timedelta
from pathlib import Path
from uuid import uuid4
from app import db

DEFUALT_IMAGE_PATH = Path("img/no_picture_default.png")


class ModelMixin(object):
    def save(self, commit=True):
        # Save this model to the database.
        db.session.add(self)
        if commit:
            db.session.commit()
        return self


def generate_uuid() -> str:
    return str(uuid4())


def get_week_range(week: str = "") -> tuple[datetime, datetime]:

    if week:
        year, week = map(int, week.split("-W"))
        start_of_week = datetime.strptime(f"{year} {week} 1", "%G %V %u")

        # Calculate the last day of the given week (Sunday)
        end_of_week = start_of_week + timedelta(days=6)
        return start_of_week, end_of_week

    today = datetime.today()

    # Calculate the start of the week (Monday)
    start_of_week = today - timedelta(days=today.weekday())

    # Calculate the end of the week (Sunday)
    end_of_week = start_of_week + timedelta(days=6)

    return start_of_week, end_of_week

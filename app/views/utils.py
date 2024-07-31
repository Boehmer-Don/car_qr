from datetime import datetime, timedelta
import json


from app import schema as s

DATE_FORMAT = "%m/%d/%Y"


def get_canada_provinces() -> list[s.Region]:
    with open("tests/db/canada_provinces.json", "r") as provinces_file:
        provinces_data = json.load(provinces_file)
    return s.Regions.validate_python(provinces_data)


def get_us_states() -> list[s.Region]:
    with open("tests/db/us_states.json", "r") as states_file:
        states_data = json.load(states_file)
    return s.Regions.validate_python(states_data)


def get_current_week_range(week: str = "") -> tuple[datetime, datetime]:
    # Get the current date

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

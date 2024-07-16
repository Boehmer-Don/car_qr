import json


from app import schema as s


def get_canada_provinces() -> list[s.Region]:
    with open("tests/db/canada_provinces.json", "r") as provinces_file:
        provinces_data = json.load(provinces_file)
    return s.Regions.validate_python(provinces_data)


def get_us_states() -> list[s.Region]:
    with open("tests/db/us_states.json", "r") as states_file:
        states_data = json.load(states_file)
    return s.Regions.validate_python(states_data)

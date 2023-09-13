import re
from datetime import datetime


def date_convert(date_input):
    pattern = r"^\d{4}-\d{2}-\d{2}$"
    if re.match(pattern, date_input):
        date_input = datetime.strptime(date_input, "%Y-%m-%d").date()
    else:
        date_input = datetime.strptime(date_input, "%m/%d/%Y").date()
    return date_input

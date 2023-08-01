import json
from datetime import datetime, timedelta
from random import randint
from typing import Generator
from faker import Faker
from sqlalchemy import func
from app import db
from app import models as m


fake = Faker()

NUM_TEST_USERS = 100


def gen_test_items(num_objects: int) -> Generator[str, None, None]:
    DOMAINS = ("com", "com.br", "net", "net.br", "org", "org.br", "gov", "gov.br")

    i = db.session.query(func.max(m.User.id)).scalar()
    # i = 0

    for _ in range(num_objects):
        i += 1
        # Primary name
        first_name = fake.first_name()

        # Secondary name
        last_name = fake.last_name()

        company = fake.company().split()[0].strip(",")
        address = fake.address()
        country = fake.country()
        city = fake.city()
        postal_code = randint(10000, 99999)
        phone = fake.phone_number()

        # Company DNS
        dns_org = fake.random_choices(elements=DOMAINS, length=1)[0]

        # email formatting
        yield (
            f"{first_name}.{last_name}{i}@{company}.{dns_org}".lower(),
            f"{first_name}{i}".lower(),
            f"{last_name}{i}".lower(),
            f"{company}{i}".lower(),
            f"{address}{i}".lower(),
            f"{country}{i}".lower(),
            f"{country}_province_{i}".lower(),
            f"{city}{i}".lower(),
            f"{postal_code}".lower(),
            f"{phone}",
        )


def populate(count: int = NUM_TEST_USERS):
    users_counter = 0
    for (
        email,
        first_name,
        last_name,
        company,
        address,
        country,
        province,
        city,
        postal_code,
        phone,
    ) in gen_test_items(count):
        is_user_activated = False if users_counter < 7 else True
        email = "dealer@test.com" if users_counter == 7 else email
        plan = m.UsersPlan.advanced if users_counter == 7 else m.UsersPlan.basic
        user = m.User(
            email=email,
            password="pass",
            first_name=first_name,
            last_name=last_name,
            plan=plan,
            activated=is_user_activated,
            name_of_dealership=company,
            address_of_dealership=address,
            country=country,
            province=province,
            city=city,
            postal_code=postal_code,
            phone=phone,
        )
        user.save()
        users_counter += 1


def add_labels(user_id: int = 9):
    with open("tests/db/test_labels.json", "r") as f:
        labels_data = json.load(f)
    for index, label in enumerate(labels_data):
        label_status = m.LabelStatus.active if index < 8 else m.LabelStatus.archived
        date_deactivated = None
        if label_status == m.LabelStatus.archived:
            date_deactivated = datetime.now() + timedelta(days=randint(1, 30))
        label = m.Label(
            sticker_id=f"QR0000{index + user_id}",
            name=label["name"] + str(user_id),
            make=label["make"],
            vehicle_model=label["vehicle_model"],
            year=label["year"],
            mileage=label["mileage"],
            color=label["color"],
            trim=label["trim"],
            type_of_vehicle=label["type_of_vehicle"],
            price=label["price"],
            url=label["url"],
            status=label_status,
            date_deactivated=date_deactivated,
            user_id=user_id,
            views=randint(0, 99),
        )
        label.save()

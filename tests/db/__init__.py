from random import randint
from typing import Generator
from faker import Faker
from sqlalchemy import func
from app import db
from app import models as m


faker = Faker()

NUM_TEST_USERS = 100


def gen_test_items(num_objects: int) -> Generator[str, None, None]:
    from faker import Faker

    fake = Faker()

    DOMAINS = ("com", "com.br", "net", "net.br", "org", "org.br", "gov", "gov.br")

    i = db.session.query(func.max(m.User.id)).scalar()

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
        m.User(
            email=email,
            first_name=first_name,
            last_name=last_name,
            activated=is_user_activated,
            name_of_dealership=company,
            address_of_dealership=address,
            country=country,
            province=province,
            city=city,
            postal_code=postal_code,
            phone=phone,
        ).save(False)
        users_counter += 1

    db.session.commit()

import json
import random
from datetime import datetime, timedelta
from random import randint
from typing import Generator
from faker import Faker
import sqlalchemy as sa
from sqlalchemy import func
from app import db
from app import models as m


fake = Faker()

NUM_TEST_USERS = 50


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
            f"{postal_code}",
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


GIFTS = [
    "Free Oil Changes",
    "Free Maintenance Package",
    "Extended Warranty",
    "Discounted Accessories",
    "Free Car Detailing",
    "Free Fuel",
    "Cash Rebates",
    "Trade-In Bonus",
    "Roadside Assistance",
    "Complimentary Car Rental",
    "Technology Upgrades",
    "VIP Maintenance Services",
    "Discounted Insurance",
    "Free Tires",
    "Gift Cards",
    "Exclusive Events",
    "Personalized Accessories",
    "Service Discounts",
    "Charitable Donations",
    "Special Financing Rates",
]


def add_labels(user_id: int = 9):
    with open("tests/db/test_labels.json", "r") as f:
        labels_data = json.load(f)
    for index, label in enumerate(labels_data):
        label_status = m.LabelStatus.archived if index < 8 else m.LabelStatus.active
        date_received = datetime.now() - timedelta(days=randint(1, 30))
        date_activated = None
        if label_status == m.LabelStatus.active:
            date_activated = date_received + timedelta(days=1)
        date_deactivated = None
        if label_status == m.LabelStatus.archived:
            date_deactivated = date_received + timedelta(days=randint(1, 30))
        gift = random.choice(GIFTS) if index > 10 else None
        label = m.Label(
            sticker_id=f"QR00000{index + user_id}",
            name=f'{label["name"]} {label["make"]}',
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
            date_received=date_received,
            date_activated=date_activated,
            date_deactivated=date_deactivated,
            user_id=user_id,
            views=randint(0, 99),
            gift=gift,
        )
        if label.date_deactivated:
            label.price_sold = label.price - randint(1000, 3000)
        db.session.add(label)
        make = db.session.scalar(m.CarMake.select().where(m.CarMake.name == label.make))
        if not make:
            make = m.CarMake(name=label.make)
            make.save()
        vehicle_type = db.session.scalar(
            m.CarType.select().where(m.CarType.name == label.type_of_vehicle)
        )
        if not vehicle_type:
            vehicle_type = m.CarType(name=label.type_of_vehicle)
            vehicle_type.save()
        model = db.session.scalar(
            m.CarModel.select().where(m.CarModel.name == label.vehicle_model)
        )
        if not model:
            model = m.CarModel(
                name=label.vehicle_model, make_id=make.id, type_id=vehicle_type.id
            )
            model.save()
        trim = db.session.scalar(m.CarTrim.select().where(m.CarTrim.name == label.trim))
        if not trim:
            trim = m.CarTrim(name=label.trim, model_id=model.id)
            trim.save()
    db.session.commit()


def set_users_logo(user_id: int = 9):
    with open("tests/s2b_logo.png", "rb") as file:
        logo_bytes = file.read()
        db.session.execute(sa.delete(m.UserLogo).where(m.UserLogo.user_id == user_id))
        logo = m.UserLogo(
            user_id=user_id,
            filename=f"{datetime.now()}.png",
            file=logo_bytes,
            mimetype="image/png",
        )
        db.session.add(logo)
        db.session.commit()
    print(f"Logo set for user {user_id}")


TEST_STICKERS_QUANTITY = 10


def add_pending_labels(user_id: int = 9):
    for i in range(1, TEST_STICKERS_QUANTITY):
        sticker = m.Sticker(
            code=f"QR0000{i + user_id}",
            user_id=user_id,
            pending=True,
            created_at=datetime.now() - timedelta(days=randint(1, 30)),
        )
        db.session.add(sticker)
    db.session.commit()
    print(f"Sticker set for user {user_id}")

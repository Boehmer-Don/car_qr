import json
import click
from flask import Flask
import sqlalchemy as sa
from sqlalchemy import orm
from app import models as m
from app import db, forms
from app import schema as s


def init(app: Flask):
    # flask cli context setup
    @app.shell_context_processor
    def get_context():
        """Objects exposed here will be automatically available from the shell."""
        return dict(app=app, db=db, m=m, f=forms, s=s, sa=sa, orm=orm)

    if app.config["ENV"] != "production":

        @app.cli.command()
        @click.option("--count", default=100, type=int)
        def db_populate(count: int):
            """Fill DB by dummy data."""
            from tests.db import populate

            populate(count)
            print(f"DB populated by {count} instancies")

        @app.cli.command()
        @click.option("--user-id", default=2, type=int)
        def add_labels(user_id: int):
            """Fill DB by labels for a user."""

            with open("tests/db/test_labels.json", "r") as f:
                labels_data = json.load(f)
            for index, label in enumerate(labels_data):
                active = True if index < 8 else False
                m.Label(
                    name=label["name"],
                    make=label["make"],
                    vehicle_model=label["vehicle_model"],
                    year=label["year"],
                    mileage=label["mileage"],
                    color=label["color"],
                    trim=label["trim"],
                    type_of_vehicle=label["type_of_vehicle"],
                    price=label["price"],
                    url=label["url"],
                    active=active,
                    user_id=user_id,
                ).save()
            print(f"DB populated by 10 testing labels for user {user_id}")

    @app.cli.command("create-admin")
    def create_admin():
        """Create super admin account"""
        query = m.User.select().where(m.User.email == app.config["ADMIN_EMAIL"])
        if db.session.execute(query).first():
            print(f"User with e-mail: [{app.config['ADMIN_EMAIL']}] already exists")
            return
        m.User(
            first_name=app.config["ADMIN_FIRST_NAME"],
            last_name=app.config["ADMIN_LAST_NAME"],
            email=app.config["ADMIN_EMAIL"],
            password=app.config["ADMIN_PASSWORD"],
            role=m.UsersRole.admin,
        ).save()
        print("admin created")

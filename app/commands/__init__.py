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

    @app.cli.command()
    @click.option("--count", default=50, type=int)
    def db_populate(count: int):
        """Fill DB by dummy data."""
        from tests.db import (
            populate,
            add_labels,
            set_users_logo,
            add_pending_labels,
        )

        populate(count)
        add_labels()
        set_users_logo()
        add_pending_labels()
        print(f"DB populated by {count} instancies")

    @app.cli.command()
    @click.option("--user-id", default=9, type=int)
    def add_labels(user_id: int):
        """Fill DB by labels for a user."""
        from tests.db import add_labels

        add_labels(user_id)
        print(f"DB populated by 10 testing labels for user [{user_id}]")

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
            activated=True,
        ).save()
        print("admin created")

    @app.cli.command("get-products")
    def get_products():
        """Get stripe products and"""
        from app.controllers.stripe import get_stripe_products

        get_stripe_products()
        print("Products created")

    @app.cli.command("delete-products")
    def delete_products():
        """Delete stripe products and"""
        from app.controllers.stripe import delete_stripe_products_local

        delete_stripe_products_local()
        print("Products deleted")

    @app.cli.command("delete-user")
    @click.option("--email", type=str)
    def delete_user(email: str):
        """Delete stripe products and"""

        user: m.User = db.session.scalar(m.User.select().where(m.User.email == email))
        if not user:
            print(f"User with email [{email}] not found")
            return

        delete_labels_sql = sa.delete(m.Label).where(m.Label.user_id == user.id)
        delete_stickers_sql = sa.delete(m.Sticker).where(m.Sticker.user_id == user.id)
        delete_logos_sql = sa.delete(m.UserLogo).where(m.UserLogo.user_id == user.id)
        db.session.execute(delete_labels_sql)
        db.session.execute(delete_stickers_sql)
        db.session.execute(delete_logos_sql)
        db.session.commit()
        db.session.delete(user)
        db.session.commit()
        print(f"User {user} deleted")

    @app.cli.command()
    def create_models():
        from app.controllers import create_models

        create_models()

    @app.cli.command()
    def delete_models():
        delete_models_sql = sa.delete(m.CarModel)
        db.session.execute(delete_models_sql)
        db.session.commit()
        delete_makes_sql = sa.delete(m.CarMake)
        db.session.execute(delete_makes_sql)
        db.session.commit()
        print("Makes and models deleted")

    @app.cli.command()
    @click.option("--user-id", default=9, type=int)
    def set_logo(user_id: int):
        from tests.db import set_users_logo

        set_users_logo(user_id)
        print(f"Logo set for user {user_id}")

    @app.cli.command()
    @click.option("--user-id", default=9, type=int)
    def add_pending_labels(user_id: int):
        from tests.db import add_pending_labels

        add_pending_labels(user_id)
        print(f"Pending labels added for user {user_id}")

    @app.cli.command()
    @click.option("--user-id", default=9, type=int)
    def get_pending_labels(user_id: int):
        pending_labels = db.session.scalars(
            m.Sticker.select().where(m.Sticker.user_id == user_id)
        ).all()
        for label in pending_labels:
            print(label.code)

    @app.cli.command()
    def subscriptions_check():
        from app.controllers import check_subscriptions

        check_subscriptions()

    @app.cli.command()
    def models_list():
        models = db.session.scalars(m.CarModel.select()).all()
        for model in models:
            print(model.make.name, model.name, model.trims)

    @app.cli.command()
    def trims_list():
        trims = db.session.scalars(m.CarTrim.select()).all()
        for trim in trims:
            print(trim.name, trim.model)

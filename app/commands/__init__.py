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
            from tests.db import populate, add_labels

            populate(count)
            add_labels()
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

        cart_labels = db.session.scalars(
            m.Label.select().where(m.Label.status == "cart")
        ).all()
        for label in cart_labels:
            db.session.delete(label)
        user: m.User = db.session.scalar(m.User.select().where(m.User.email == email))
        db.session.delete(user)
        db.session.commit()
        print(f"User {user} deleted")

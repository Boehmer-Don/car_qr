from uuid import uuid4
from app import db


class ModelMixin(object):
    def save(self, commit=True):
        # Save this model to the database.
        db.session.add(self)
        if commit:
            db.session.commit()
        return self


def generate_uuid() -> str:
    return str(uuid4())


# Add your own utility classes and functions here.

import stripe
from stripe.error import InvalidRequestError
from app.logger import log
from app import models as m


def create_stripe_customer(user: m.User):
    """Create a Stripe customer for the user."""
    customer = None
    try:
        customer = stripe.Customer.create(
            description=f"Car QR Code Dealer {user.email}",
            email=user.email,
            name=f"{user.first_name} {user.last_name}",
            phone=user.phone,
            # shipping={
            #     "address": {user.address_of_dealership},
            #     "name": f"{user.first_name} {user.last_name}",
            #     "phone": user.phone,
            # },
        )
    except InvalidRequestError as e:
        log(log.ERROR, "create_stripe_customer: %s", e)
        ...
    return customer

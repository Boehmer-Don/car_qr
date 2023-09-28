from pydantic import BaseModel, EmailStr


class StripeCustomerBillingAddress(BaseModel):
    city: str
    country: str
    line1: str
    postal_code: str
    state: str


class StripeCustomerShippingAddress(BaseModel):
    address: StripeCustomerBillingAddress
    name: str
    phone: str
    ...


class StripeUpdateCustomer(BaseModel):
    description: str | None
    email: EmailStr
    name: str
    phone: str
    address: StripeCustomerBillingAddress
    shipping: StripeCustomerShippingAddress

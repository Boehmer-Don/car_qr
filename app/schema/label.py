from datetime import datetime
from pydantic import BaseModel, ConfigDict, field_serializer


class LabelLocation(BaseModel):
    id: int
    name: str

    model_config = ConfigDict(from_attributes=True)


class Label(BaseModel):
    id: int
    unique_id: str
    sticker_id: str
    name: str
    make: str
    vehicle_model: str
    year: str
    mileage: int
    color: str
    trim: str
    type_of_vehicle: str
    price: int
    date_received: datetime
    date_deactivated: datetime | None
    url: str
    user_id: int
    views: int
    gift: str | None
    location_object: LabelLocation | None

    @field_serializer("date_received")
    def serialize_date_received(self, value: datetime):
        return value.isoformat()

    @field_serializer("date_deactivated")
    def serialize_date_deactivated(self, value: datetime | None):
        if value is None:
            return None
        return value.isoformat()

    model_config = ConfigDict(from_attributes=True)

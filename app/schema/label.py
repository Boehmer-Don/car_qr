from datetime import datetime
from pydantic import BaseModel


class Label(BaseModel):
    id: int
    unique_id: str
    sticker_identifier: str
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

    class Config:
        orm_mode = True
        json_encoders = {datetime: lambda v: v.isoformat()}

import enum

from pydantic import BaseModel, ConfigDict, TypeAdapter


class Country(enum.Enum):
    Canada = "Canada"
    US = "US"


class User(BaseModel):
    id: int
    email: str
    first_name: str
    last_name: str

    model_config = ConfigDict(from_attributes=True)


class Region(BaseModel):
    name: str
    abbreviation: str


Regions = TypeAdapter(list[Region])

import enum

from pydantic import BaseModel, ConfigDict, TypeAdapter


class ReplenishmentStatus(enum.Enum):
    removed = "removed"
    done = "done"
    mark_as_removed = "mark_as_removed"


class DelerGiftItem(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    unique_id: str
    min_qty: int
    max_qty: int


class ReplenishmentGiftBoxe(BaseModel):
    sku: str
    total_quantity: int
    delaer_gift_item: DelerGiftItem
    status: ReplenishmentStatus

    model_config = ConfigDict(from_attributes=True, use_enum_values=True)


adapter_re_gift_boxes = TypeAdapter(list[ReplenishmentGiftBoxe])

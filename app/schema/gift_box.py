from pydantic import BaseModel, Field, TypeAdapter


class GiftBox(BaseModel):
    gift_item_id: int = Field(..., alias="giftItemId")
    total_price: float = Field(..., alias="totalPrice")
    qty: int


ad_gift_boxes = TypeAdapter(list[GiftBox])

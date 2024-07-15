from pydantic import BaseModel, Field, TypeAdapter


class GiftBox(BaseModel):
    dealer_gift_item_id: int = Field(..., alias="dealerGiftItemId")
    total_price: float = Field(..., alias="totalPrice")
    qty: int


ad_gift_boxes = TypeAdapter(list[GiftBox])

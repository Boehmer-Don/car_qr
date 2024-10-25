from datetime import datetime
import sqlalchemy as sa

from app.database import db
from app import models as m


def get_gift_boxes_data(
    start_date: datetime, end_date: datetime, dealer_id: int
) -> list[tuple[str, int, m.DealerGiftItem]]:
    total_quantity = sa.func.sum(m.GiftBox.qty).label("total_quantity")

    gift_boxes_data = db.session.execute(
        sa.select(
            m.GiftBox._sku,
            total_quantity,
            m.DealerGiftItem,
        )
        .join(m.DealerGiftItem, m.GiftBox.dealer_gift_item_id == m.DealerGiftItem.id)
        .where(
            sa.func.DATE(m.GiftBox.created_at) <= end_date.date(),
            start_date.date() <= sa.func.DATE(m.GiftBox.created_at),
            m.GiftBox.dealer_id == dealer_id,
        )
        .group_by(m.GiftBox._sku, m.DealerGiftItem.id, m.GiftBox.dealer_id)
        .order_by(m.GiftBox.dealer_id.asc())
    ).all()

    return gift_boxes_data


def get_replenishment(
    start_date: datetime, end_date: datetime, sku: str, dealer_gift_item_id: int
) -> m.DealerGiftIteRreplenishment | None:
    return db.session.scalar(
        sa.select(m.DealerGiftIteRreplenishment).where(
            m.DealerGiftIteRreplenishment.dealer_gift_item_id == dealer_gift_item_id,
            m.DealerGiftIteRreplenishment.sku == sku,
            sa.func.DATE(m.DealerGiftIteRreplenishment.created_at) <= end_date.date(),
            start_date.date() < sa.func.DATE(m.DealerGiftIteRreplenishment.created_at),
        )
    )

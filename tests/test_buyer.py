from datetime import datetime, timedelta
import sqlalchemy as sa
from flask.testing import FlaskClient

from app import models as m, db
from tests.utils import set_user


def test_login_and_confirm(populate: FlaskClient):
    label = db.session.scalar(
        sa.select(m.Label).where(
            m.Label.status == m.LabelStatus.active,
            sa.exists().where(m.SaleReport.label_id == m.Label.id),
        )
    )
    assert label

    for inx in range(1, 3):
        m.OilChange(
            sale_rep_id=label.sale_report.id,
            date=datetime.now() + timedelta(days=inx),
        ).save()

    assert label.oil_not_changed

    res = populate.get(f"/buyer/{label.sticker_id}")
    assert res.status_code == 200

    res = populate.post(
        f"/buyer/{label.sticker_id}",
        data={"password": "password", "user_id": "user1@mail.com"},
    )

    assert res.status_code == 302

    buyer = set_user(populate, role=m.UsersRole.buyer, is_login=False)
    label.sale_report.buyer_id = buyer.id
    db.session.commit()

    res = populate.post(
        f"/buyer/{label.sticker_id}",
        data={"password": "123456", "user_id": buyer.email},
    )
    assert res.status_code == 200
    oil_change = db.session.scalar(
        sa.select(m.OilChange)
        .where(
            m.OilChange.sale_rep_id == label.sale_report.id,
            m.OilChange.is_done.is_(False),
        )
        .order_by(m.OilChange.date.asc())
    )
    assert label.name in res.data.decode()
    assert oil_change
    assert not oil_change.is_done
    assert oil_change.unique_id in res.data.decode()

    res = populate.post(
        "/buyer/confirm-oil-change", data={"oil_change_unique_id": oil_change.unique_id}
    )
    assert res.status_code == 200
    assert oil_change.is_done

import io
from pathlib import Path
from flask.testing import FlaskClient
from datetime import datetime

import sqlalchemy as sa
from app import models as m
from app.database import db

from tests.utils import set_user


def test_confirm_oil_change(populate: FlaskClient, mocker):
    mocker.patch("app.views.service.save_file", return_value="test.jpg")

    buyer = set_user(populate, role=m.UsersRole.buyer)
    sale_rep = db.session.scalar(sa.select(m.SaleReport))
    assert sale_rep
    oil_change = m.OilChange(
        sale_rep_id=sale_rep.id,
        date=datetime.today().date(),
    )
    db.session.add(oil_change)
    sale_rep.buyer_id = buyer.id
    db.session.commit()

    assert not oil_change.is_done

    res = populate.get("/services/add-records-search")
    assert res.status_code == 200
    assert oil_change.sale_rep.unique_id in res.data.decode()

    res = populate.get(f"/services/{oil_change.sale_rep.unique_id}/add-record")
    assert res.status_code == 200
    assert b"Confirm" in res.data
    assert not db.session.scalars(sa.select(m.ServiceRecord)).all()

    test_file = "test.pdf"
    test_file_path = Path("tests") / "data" / test_file

    with open(test_file_path, "rb") as f:
        file = (io.BytesIO(f.read()), test_file)

    res = populate.post(
        f"/services/{oil_change.sale_rep.unique_id}/add-record",
        data={"file": file},
        follow_redirects=True,
    )
    assert res.status_code == 200
    assert db.session.scalars(sa.select(m.ServiceRecord)).all()

    res = populate.get("/services/records")
    assert res.status_code == 200

# flake8: noqa E712

from datetime import datetime

import sqlalchemy as sa
from flask.testing import FlaskClient
from app import models as m, db
from tests.utils import login


def test_reports(populate: FlaskClient):
    login(populate)
    response = populate.get("/report/create")
    assert response
    assert response.status_code == 200
    assert b"Create a report" in response.data
    assert b"Alter the filters to see when your QR Code labels" in response.data

    response = populate.get("/report/create?type_filter=Sedan")
    assert response
    assert response.status_code == 200
    assert b"Sedan" in response.data

    response = populate.get("/report/create?make_filter=Toyota")
    assert response
    assert response.status_code == 200
    assert b"Toyota" in response.data
    assert b"Land Cruiser" in response.data

    response = populate.get("/report/create?model_filter=Land+Cruiser")
    assert response
    assert response.status_code == 200
    assert b"Land Cruiser" in response.data


def test_label_views_graph(populate: FlaskClient, test_labels_data: dict):
    login(populate)
    response = populate.get("/report/get_label_views_graph")
    assert response
    assert response.status_code == 200
    now = datetime.now().strftime("%A")
    assert now.encode(encoding="UTF-8") in response.data
    all_views = db.session.scalars(sa.Select(m.LabelView).order_by(m.LabelView.created_at.asc())).all()
    start_date = all_views[0].created_at.strftime("%Y/%m/%d")
    end_date = all_views[-1].created_at.strftime("%Y/%m/%d")

    response = populate.get(f"/report/get_label_views_graph?start_date_graph={start_date}&end_date_graph={end_date}")
    assert response
    assert response.status_code == 200
    # TODO finish this
    # assert start_date.encode(encoding="UTF-8") in response.data
    # assert end_date.encode(encoding="UTF-8") in response.data

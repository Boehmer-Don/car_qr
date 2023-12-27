from pydantic import BaseModel, ConfigDict
from app import models as m


class QueryModelLabelsGraphView(BaseModel):
    start_date_graph: str | None = None
    end_date_graph: str | None = None
    status: m.LabelStatus | str = ""
    label_id: str | None = None

    model_config = ConfigDict(use_enum_values=True)


class QueryModelLocationsGraphView(BaseModel):
    start_date_graph: str | None = None
    end_date_graph: str | None = None
    status: m.LabelStatus | str = ""

    model_config = ConfigDict(use_enum_values=True)

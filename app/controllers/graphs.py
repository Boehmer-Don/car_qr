import enum

import datetime
from typing import List, Tuple

from pyecharts.charts import Line, Bar  # type: ignore
from pyecharts import options as opts  # type: ignore
from markupsafe import Markup


class DayEvent(enum.Enum):
    MORNING = "Morning (6am - 12pm)"
    AFTERNOON = "Afternoon (12pm - 5pm)"
    EVENING = "Evening (5pm - 12am)"


DateTimeTuple = Tuple[int, datetime.datetime]

WEEK_DAYS = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
]


def create_graph(label_views_data: List[tuple[datetime.date, int]]) -> Markup:
    if not label_views_data:
        return Markup(
            "<h3 class='mt-6 md:mt-0 text-lg font-bold' >The label has no views</h3>"
        )

    dates, values = zip(*label_views_data)

    line = Line(init_opts=opts.InitOpts(width="100%", height="300px"))
    line.set_global_opts(
        title_opts=opts.TitleOpts(title=""),
        legend_opts=opts.LegendOpts(is_show=False),
        yaxis_opts=opts.AxisOpts(name="Views"),
        xaxis_opts=opts.AxisOpts(name="Date"),
    )

    line.add_xaxis(dates)
    line.add_yaxis(
        series_name="Views this day",
        y_axis=values,
        is_smooth=True,
        is_symbol_show=True,
        symbol="circle",
        symbol_size=6,
        linestyle_opts=opts.LineStyleOpts(width=2),
    )
    return Markup(line.render_embed())


def create_bar_graph(view_data: List[DateTimeTuple], by_week: bool = False) -> Markup:
    period_dict = {  # type: ignore
        DayEvent.MORNING.value: [],
        DayEvent.AFTERNOON.value: [],
        DayEvent.EVENING.value: [],
    }
    date_range = []
    if by_week:
        period_dict[DayEvent.MORNING.value] = [0] * len(WEEK_DAYS)
        period_dict[DayEvent.AFTERNOON.value] = [0] * len(WEEK_DAYS)
        period_dict[DayEvent.EVENING.value] = [0] * len(WEEK_DAYS)
        for total, date in view_data:
            day = date.strftime("%A")
            hour = date.hour
            if day in WEEK_DAYS:
                index = WEEK_DAYS.index(day)
                if hour <= 12:
                    period_dict[DayEvent.MORNING.value][index] += total
                elif hour <= 17:
                    period_dict[DayEvent.AFTERNOON.value][index] += total
                else:
                    period_dict[DayEvent.EVENING.value][index] += total
        date_range = WEEK_DAYS

    else:
        for total, date in view_data:
            day = date.strftime("%Y-%m-%d")
            hour = date.hour
            if day not in date_range:
                date_range.append(day)
                period_dict[DayEvent.MORNING.value].append(0)
                period_dict[DayEvent.AFTERNOON.value].append(0)
                period_dict[DayEvent.EVENING.value].append(0)
            index = date_range.index(date.strftime("%Y-%m-%d"))
            if hour <= 12:
                period_dict[DayEvent.MORNING.value][index] += total
            elif hour <= 17:
                period_dict[DayEvent.AFTERNOON.value][index] += total
            else:
                period_dict[DayEvent.EVENING.value][index] += total

    bar = (
        Bar(init_opts=opts.InitOpts(width="100%", height="300px"))
        .add_xaxis(date_range)
        .add_yaxis(
            DayEvent.MORNING.value,
            period_dict[DayEvent.MORNING.value],
        )
        .add_yaxis(
            DayEvent.AFTERNOON.value,
            period_dict[DayEvent.AFTERNOON.value],
        )
        .add_yaxis(
            DayEvent.EVENING.value,
            period_dict[DayEvent.EVENING.value],
        )
        .set_global_opts(
            yaxis_opts=opts.AxisOpts(name="Views"),
            legend_opts=opts.LegendOpts(pos_right="center", pos_top="top"),
        )
    )
    return Markup(bar.render_embed())


def create_location_graph(
    select_result: Tuple[str, datetime.datetime, int],
    location_names: List[str],
    by_week: bool = False,
) -> Markup:
    y_graph_date = dict()  # type: ignore
    datazoom_opts = opts.DataZoomOpts()

    if by_week:
        y_graph_date = {date: {} for date in WEEK_DAYS}
        now = datetime.datetime.now()
        day_range = 14
        start_range = day_range * (now.weekday() + 1)
        datazoom_opts = opts.DataZoomOpts(
            range_start=start_range, range_end=start_range + day_range
        )

    bar = Bar(init_opts=opts.InitOpts(width="100%", height="300px"))
    bar.set_global_opts(
        yaxis_opts=opts.AxisOpts(name="Views"),
        legend_opts=opts.LegendOpts(pos_right="center", pos_top="top"),
        datazoom_opts=datazoom_opts,
    )
    for data in select_result:
        location_name, label_view_date, view_count = data  # type: ignore
        label_view_date = label_view_date.strftime("%A" if by_week else "%Y-%m-%d")  # type: ignore
        if label_view_date not in y_graph_date:
            y_graph_date[label_view_date] = dict()

        if location_name not in y_graph_date[label_view_date]:  # type: ignore
            y_graph_date[label_view_date][location_name] = view_count  # type: ignore
        else:
            y_graph_date[label_view_date][location_name] += view_count  # type: ignore

    x_graph_data = WEEK_DAYS if by_week else list(y_graph_date.keys())
    bar.add_xaxis(x_graph_data)  # type: ignore
    for name in location_names:
        bar.add_yaxis(
            name,
            [y_date[name] if name in y_date else 0 for y_date in y_graph_date.values()],
        )

    return Markup(bar.render_embed())

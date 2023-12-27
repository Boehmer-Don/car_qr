import datetime
from typing import List, Tuple

from pyecharts.charts import Line, Bar  # type: ignore
from pyecharts import options as opts  # type: ignore
from markupsafe import Markup

DateTimeTuple = Tuple[int, datetime.datetime]


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


def create_bar_graph(
    view_data: List[DateTimeTuple], week_dates: List[str] | None = None
) -> Markup:
    period_dict = {  # type: ignore
        "Morning": [],
        "Afternoon": [],
        "Evening": [],
    }
    date_range = []
    if week_dates:
        period_dict["Morning"] = [0] * len(week_dates)
        period_dict["Afternoon"] = [0] * len(week_dates)
        period_dict["Evening"] = [0] * len(week_dates)
        for total, date in view_data:
            day = date.strftime("%Y-%m-%d")
            hour = date.hour
            if day in week_dates:
                index = week_dates.index(day)
                if hour <= 12:
                    period_dict["Morning"][index] += total
                elif hour <= 17:
                    period_dict["Afternoon"][index] += total
                else:
                    period_dict["Evening"][index] += total
        date_range = [
            datetime.datetime.strptime(day, "%Y-%m-%d").strftime("%A")
            for day in week_dates
        ]

    else:
        for total, date in view_data:
            day = date.strftime("%Y-%m-%d")
            hour = date.hour
            if day not in date_range:
                date_range.append(day)
                period_dict["Morning"].append(0)
                period_dict["Afternoon"].append(0)
                period_dict["Evening"].append(0)
            index = date_range.index(date.strftime("%Y-%m-%d"))
            if hour <= 12:
                period_dict["Morning"][index] += total
            elif hour <= 17:
                period_dict["Afternoon"][index] += total
            else:
                period_dict["Evening"][index] += total

    bar = (
        Bar(init_opts=opts.InitOpts(width="100%", height="300px"))
        .add_xaxis(date_range)
        .add_yaxis(
            "Morning",
            period_dict["Morning"],
        )
        .add_yaxis(
            "Afternoon",
            period_dict["Afternoon"],
        )
        .add_yaxis(
            "Evening",
            period_dict["Evening"],
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
    date_period: List[str],
) -> Markup:
    y_graph_date = dict()  # type: ignore
    datazoom_opts = opts.DataZoomOpts()

    if date_period:
        y_graph_date = {date: {} for date in date_period}
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
        label_view_date = label_view_date.strftime("%Y-%m-%d")  # type: ignore
        if label_view_date not in y_graph_date:
            y_graph_date[label_view_date] = dict()

        if location_name not in y_graph_date[label_view_date]:  # type: ignore
            y_graph_date[label_view_date][location_name] = view_count  # type: ignore
        else:
            y_graph_date[label_view_date][location_name] += view_count  # type: ignore

    x_graph_data = (
        [
            datetime.datetime.strptime(day, "%Y-%m-%d").strftime("%A")
            for day in y_graph_date.keys()
        ]
        if date_period
        else list(y_graph_date.keys())
    )
    bar.add_xaxis(x_graph_data)  # type: ignore
    for name in location_names:
        bar.add_yaxis(
            name,
            [y_date[name] if name in y_date else 0 for y_date in y_graph_date.values()],
        )

    return Markup(bar.render_embed())

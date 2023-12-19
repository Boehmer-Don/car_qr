import datetime
from typing import List

from pyecharts.charts import Line, Bar  # type: ignore
from pyecharts import options as opts  # type: ignore
from markupsafe import Markup


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


def create_bar_graph(week_days: List[str], period_dict: dict) -> Markup:
    days_of_week = [
        datetime.datetime.strptime(date, "%Y-%m-%d").strftime("%A")
        for date in week_days
    ]
    bar = (
        Bar(init_opts=opts.InitOpts(width="100%", height="300px"))
        .add_xaxis(days_of_week)
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
            title_opts=opts.TitleOpts(title="Weekday Time Periods"),
            yaxis_opts=opts.AxisOpts(name="Views"),
            legend_opts=opts.LegendOpts(pos_right="center", pos_top="top"),
        )
    )
    return Markup(bar.render_embed())

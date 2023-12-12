from pyecharts.charts import Line
from pyecharts import options as opts
from markupsafe import Markup


def create_graph(label_views_data: list):
    labels_chart = None

    if label_views_data:
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
        labels_chart = Markup(line.render_embed())

    return labels_chart

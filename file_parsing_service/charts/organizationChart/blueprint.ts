import * as shared from "../shared/blueprints.js";

import type { Blueprint } from "../shared/interfaces.js";

export const blueprint: Blueprint = {
    caption: shared.captionBlueprint,
    chart: shared.chartBlueprint,
    legend: shared.legendBlueprint,
    series: {
        ...shared.seriesBlueprint,
        data: {
            from: [
                {
                    type: "string",
                },
            ],
            to: [
                {
                    type: "string",
                },
            ],
        },
    },
    subtitle: shared.subtitleBlueprint,
    title: shared.titleBlueprint,
    xAxis: shared.xAxisBlueprint,
    yAxis: shared.yAxisBlueprint,
};

// do we care about annotations? yes, 'basic line with annotations'
const annotations = [
    {
        draggable: false,
        labels: [
            {
                point: { x: 2000, y: 20000, xAxis: 0, yAxis: 0 },
                text: "3-6",
            },
            {
                point: "max",
                text: "Max",
            },
        ],
    },
];

// the user can give a caption text (optional)
const caption = {
    align: "center", // left, center, right
    text: "This is a caption",
    verticalAlign: "bottom", // top, middle, bottom
};

// these should probably just be constant
const chart = {
    borderColor: "black", // always (probably)
    borderWidth: 1, // always (probably)
    displayErrors: true, // set to false to only display errors in the console
    height: 720, // number or percentage of width
    inverted: false, // useful in organization chart
    plotBorderColor: "black",
    plotBorderWidth: 1,
    polar: false, // set to true with 'line', 'column', 'area' to use polar coordinates
    spacingRight: 40,
    width: 1280, // number or percentage of height
};

// hehe
const credits = {
    href: "https://youtube.com/shorts/80Uh5p8llcg?feature=share",
    text: "myCharts.com",
};

// the user can choose to have a legend (optional)
const legend = {
    align: "right", // left, center, right
    backgroundColor: "gainsboro",
    borderColor: "black",
    borderWidth: 1,
    enabled: true,
    layout: "horizontal", // horizontal, vertical, proximate
    verticalAlign: "bottom", // top, middle, bottom
};

// the user might be able to alter some of these (optional)
const plotOptions = {
    series: {
        dataLabels: {
            enabled: true, // shows point values next to points when true
        },
        enableMouseTracking: false, // disable mouse interactions basically, don't change
        marker: {
            enabled: true, // enable the point dots on the graph
            radius: undefined, // important in network graphs
        },
        pointInterval: undefined, // xi+1 - xi
        pointStart: undefined, // first data point x value
    },
};

const series = [
    {
        type: "wordcloud",
        name: "Dep1",
        data: [
            ["lmao", 12],
            ["xd", 1],
            ["cuck", 7],
            ["heart", 13],
        ],
    },
];

// the user can choose to have a subtitle (optional)
const subtitle = {
    align: "center", // left, center, right
    text: "This is a subtitle",
    verticalAlign: "top", // top, middle, bottom
};

// the user can choose to have a title (optional)
const title = {
    align: "center", // left, center, right
    text: "This is a title",
    verticalAlign: "top", // top, middle, bottom
};

// never change this
const tooltip = {
    enabled: false,
};

// the user can give categories, title and axis type
const xAxis = {
    alternateGridColor: undefined,
    categories: undefined, // ["categ1", "categ2", ...] instead of numbers
    labels: {
        autoRotation: true,
    },
    title: {
        text: "x-Axis Title",
    },
    type: "linear", // linear, logarithmic, datetime, category
};

// the user can give categories, title and axis type
const yAxis = {
    alternateGridColor: "whitesmoke",
    categories: undefined, // ["categ1", "categ2", ...] instead of numbers
    labels: {
        autoRotation: true,
    },
    title: {
        rotation: 270, // set to 0 to make the title text horizontal
        text: "y-Axis Title",
    },
    type: "linear", // linear, logarithmic, datetime, category, treegrid
};

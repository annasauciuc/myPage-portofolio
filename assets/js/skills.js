var w = 900,
    h = 900,
    circleWidth = 5;
var palette = {
    "lightgray": "#EFD81D",
    "gray": "#708284",
    "mediumgray": "#536870",
    "blue": "#3b757F",
    "black": "#000000",
    "white": "#fff"
}

var colors = d3.scale.category20();

var nodes = [
    { name: 'Html5', src: "./../../img/skills/html.svg" },
    { name: 'Css3', src: "./../../img/skills/css64.svg" },
    { name: 'Ubuntu', src: "./../../img/skills/linux.svg", target: [0], value: 58 },
    { name: 'Javascript', src: "../../img/skills/javascript.svg", target: [0, 1], value: 65 },
    {
        name: 'Sass',
        src: "../../img/skills/sass.svg",
        target: [0, 1, 2, 8],
        value: 37
    },
    { name: 'Boostrap', src: "../../img/skills/boostrap.png", target: [0, 1, 2], value: 52 },
    { name: 'Git', src: "../../img/skills/github.svg", target: [0, 3], value: 48 },
    {
        name: 'Terminal',
        src: "../../img/skills/terminal2.svg",
        target: [0, 3, 4],
        value: 40
    },
    { name: 'JQuery', src: "../../img/skills/jquery.svg", target: [0, 3, 4, 5], value: 36 },
    { name: 'JQuery', src: "../../img/skills/scrum-logo.png", target: [0, 3, 4, 5], value: 36 },
    { name: 'Scrum', src: "", target: [0, 1, 2], value: 52 },
    { name: 'Slack', src: "../../img/skills/slack.svg", target: [0, 1, 2], value: 52 },
    { name: 'Visual_Studio_Code', src: "../../img/skills/visual.svg", target: [0, 1, 2], value: 20 }, { name: 'Css3', src: "", target: [0, 1, 2], value: 20 }


];
var links = [];

for (var i = 0; i < nodes.length; i++) {

    if (nodes[i].target !== undefined) {
        for (var x = 0; x < nodes[i].target.length; x++)
            links.push({
                source: nodes[i],
                target: nodes[nodes[i].target[x]]
            });
    };
};

var myChart = d3.select('.skill')
    .append('div')
    .classed('svg-container', true)
    .append('svg')
    .attr('width', '100%')
    .attr('height', '100%')
    .attr('preserveAspectRatio', 'xMaxYMax meet')
    .attr('viewBox', '100 100 900 900')
    .classed('svg-content-responsive', true);

var force = d3.layout.force()
    .nodes(nodes)
    .links([])
    .gravity(0.05)
    .charge(-500)
    .size([w, h]);

var link = myChart.selectAll('line')
    .data(links).enter().append('line')
    .attr('stroke', palette.white)
    .attr('strokeheight', '0')
    .attr('strokewidth', '10');


var node = myChart.selectAll('circle')
    .data(nodes).enter()
    .append('g')
    .call(force.drag);
force.on('tick', function(e) {
    node.attr('transform', function(d, i) {
        return 'translate(' + d.x + ',' + d.y + ')'
    });
    link
        .attr('x1', function(d) { return d.source.x; })
        .attr('y1', function(d) { return d.source.y; })
        .attr('x2', function(d) { return d.target.x; })
        .attr('y2', function(d) { return d.target.y; })
});

node.append("image")
    .attr("xlink:href",
        function(d) { return d.src; })
    .attr("width", 130)
    .attr("height", 130);
force.start();
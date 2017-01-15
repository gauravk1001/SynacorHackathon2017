
function show() {
    d3.selectAll("p").style("color", function() {
        return "hsl(" + Math.random() * 360 + ",100%,50%)";
    });
    // d3.select("body").style("background-color", "blue");
}

function getData() {
    var jsonData = {"nodes":[
                {"r":40, "label":"Node 1"},
                {"r":60, "label":"Node 2"},
                {"r":80, "label":"Node 3"},
                {"r":80, "label":"Node 4"},
                {"r":80, "label":"Node 5"}
    ]};
        
/*    "{\"nodes\":[
        {"x\":80, \"y\":80, \"r\":40, \"label\":\"Node 1\" },
        {"x\":200, \"y\":80, \"r\":60, \"label\":\"Node 2\"},
        {"x\":380, \"y\":80, \"r\":80, \"label\":\"Node 3\"}
    ]}";
*/        
    console.log("returning json data");
    return jsonData.nodes;
}

function dragCircles(n_circles) {

    console.log(n_circles);
    var circleData = getData();

    var svg = d3.select("svg"),
    width = +svg.attr("width"),
    height = +svg.attr("height"),
    radius = 40;
    console.log("here 1");

/*    var circles = d3.range(getData().length + 1).map(function() {
        json = getData();
        return {
            x: Math.round(Math.random() * (width - radius * 2) + radius),
            y: Math.round(Math.random() * (height - radius * 2) + radius),
            r: json.r,
            text: json.label
        };
    });*/ 
    console.log("here 2");

    var color = d3.scaleOrdinal()
        .range(d3.schemeCategory20);

    var circleElem = svg.selectAll("circle")
        .data(circleData);
        
    var circleAttributes = circleElem.enter()
        .append("circle")
        .attr("cx", function(d) { return Math.round(Math.random() * (width - radius * 2) + radius); })
        .attr("cy", function(d) { return Math.round(Math.random() * (height - radius * 2) + radius); })
        .attr("r", function(d) { return d.r; })
        .style("fill", function(d, i) { return color(i); })
        //.attr("stroke", "black")
        .call(d3.drag()
            .on("start", dragstarted)
            .on("drag", dragged)
            .on("end", dragended));

    circleAttributes.append("text")
        .data(circleData)
        .text(function (d) { return d.label; });
/*    var text = svgContainer.selectAll("text")
        .data(circleData)
        .enter()           
        .append("text");

    var textLabels = text
        .attr("x", function(d) { return d.cx; })
        .attr("y", function(d) { return d.cy; })
        .text( function(d) { return d.label})
        .attr("font-family", "sans-serif")
        .attr("font-size", "10px")
        .attr("fill", "black");
*/
    console.log("here 3");

    function dragstarted(d) {
        d3.select(this).raise().classed("active", true);
    }

    function dragged(d) {
        d3.select(this).attr("cx", d.x = d3.event.x).attr("cy", d.y = d3.event.y);
    }

    function dragended(d) {
        d3.select(this).classed("active", false);
    }
}

function clicked() {
    dragCircles(document.getElementById("n_circles").value);
    //console.log(document.getElementById("n_circles").value);
}

window.onload = function() {
    show();
};

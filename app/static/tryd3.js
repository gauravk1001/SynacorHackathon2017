
function show() {
    d3.selectAll("p").style("color", function() {
        return "hsl(" + Math.random() * 360 + ",100%,50%)";
    });
}

function build(full_json) {
    var total = 0;
    var parsed_json = [];
    console.log(JSON.stringify(full_json));
/*    for (var i = 0; i < full_json.length; i++) {
        console.log(full_json[i]);
        total += parseInt(full_json[i].value);
    }
    console.log(total);
*/
    for (var i = 0; i < full_json.length; i++) {
        parsed_json.push({
            r: (full_json[i].value / total),
            label: full_json[i].text
        });
    }
    console.log("done building!");

    return parsed_json;
}

function dragCircles(full_json) {

    console.log(full_json);
    parsed_json = build(full_json);
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

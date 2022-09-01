
function show() {
    d3.selectAll("p").style("color", function() {
        return "hsl(" + Math.random() * 360 + ",100%,50%)";
    });
}

function build(full_string) {
    var max_value = 0;
    var parsed_json = [];
    full_json = JSON.parse(full_string.substring(1, full_string.length - 1));
    console.log(full_json);
    for (var subreddit in full_json) {
        if (full_json.hasOwnProperty(subreddit)) {
            if (full_json[subreddit] > max_value) {
                max_value = full_json[subreddit];
            }
            //console.log(subreddit  + ">" + full_json[subreddit]);
        }
    }
    console.log("total" + max_value);

    for (var subreddit in full_json) {
        if (full_json.hasOwnProperty(subreddit)) {
            parsed_json.push({
                r: (full_json[subreddit] / max_value),
                label: subreddit 
            });
        }
    }
    console.log("done building!" + JSON.stringify(parsed_json));
    return parsed_json;
}

function dragCircles(full_json) {
    //debugger;
    console.log(full_json);
    parsed_json = build(full_json);
    var circleData = parsed_json;
    console.log("circle data" + circleData);

    var svg = d3.select("svg"),
    width = +svg.attr("width"),
    height = +svg.attr("height"),
    radius = 40;
    console.log("here 1");
    console.log("here 2");

    var color = d3.scaleOrdinal()
        .range(d3.schemeCategory20);

    var circleElem = svg.selectAll("circle")
        .data(circleData);
        
    var circleAttributes = circleElem.enter()
        .append("circle")
        .attr("cx", function(d) { return Math.round(Math.random() * (width - radius * 2) + radius); })
        .attr("cy", function(d) { return Math.round(Math.random() * (height - radius * 2) + radius); })
        .attr("r", function(d) {  console.log(d['r']);return (d.r * 120); })
        .style("fill", function(d, i) { return color(i); })
        .call(d3.drag()
            .on("start", dragstarted)
            .on("drag", dragged)
            .on("end", dragended));

    circleAttributes.append("text")
        .attr("x", function(d) { return 100; })
        .attr("y", function(d) { return 200; })
        .attr("font-family", "sans-serif")
        .attr("font-size", "10px")
        .attr("font-color", "black")
        //.text("word");
        .text(function (d) { console.log(d['label']) ;return d.label; });


    circleAttributes.append("a")
        .attr("xlink:href", function(d) { return "http://www.reddit.com/r/" + d.label});

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

function loadCircles() {

}

function clicked() {
    //dragCircles(document.getElementById("n_circles").value);
    //console.log(document.getElementById("n_circles").value);
}

window.onload = function() {
    show();
};

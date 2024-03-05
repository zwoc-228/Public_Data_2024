var set1 = [{x:10,y:8.04},{x:8,y:6.95},{x:13,y:7.58},{x:9,y:8.81},{x:11,y:8.33},{x:14,y:9.96},{x:6,y:7.24},{x:4,y:4.26},{x:12,y:10.84},{x:7,y:4.82},{x:5,y:5.68}]

var set2 = [{x:10,y:9.14},{x:8,y:8.14},{x:13,y:8.74},{x:9,y:8.77},{x:11,y:9.26},{x:14,y:8.1},{x:6,y:6.13},{x:4,y:3.1},{x:12,y:9.13},{x:7,y:7.26},{x:5,y:4.74}]

var set3 = [{x:10,y:7.46},{x:8,y:6.77},{x:13,y:12.74},{x:9,y:7.11},{x:11,y:7.81},{x:14,y:8.84},{x:6,y:6.08},{x:4,y:5.39},{x:12,y:8.15},{x:7,y:6.42},{x:5,y:5.73}]

var set4 = [{x:8,y:6.58},{x:8,y:5.76},{x:8,y:7.71},{x:8,y:8.84},{x:8,y:8.47},{x:8,y:7.04},{x:8,y:5.25},{x:19,y:12.5},{x:8,y:5.56},{x:8,y:7.91},{x:8,y:6.89}]

function barChart(data, columnInUse, fillColor) {
    var svg = d3.select("#chart")
                .append("svg")
                .attr("width", 400)
                .attr("height", 400);

    var yScale = d3.scaleLinear()
                   .domain([0, d3.max(data, function(d) { return d[columnInUse]; })])
                   .range([0, 300]);

    svg.selectAll("rect")
       .data(data)
       .enter()
       .append("rect")
       .attr("width", 35)
       .attr("height", function(d) { return yScale(d[columnInUse]); })
       .attr("x", function(d, i) { return i * 40; })
       .attr("y", function(d) { return 300 - yScale(d[columnInUse]); })
       .attr("fill", fillColor);
       svg.append("text")
       .text(columnInUse + " values")
       .attr("x", 10)
       .attr("y", 10);
       svg.append("line")
       .attr("x1", 0)
       .attr("y1", 300)
       .attr("x2", 400)
       .attr("y2", 300)
       .attr("stroke", "black");
       svg.append("line")
       .attr("x1", 0)
       .attr("y1", 0)
       .attr("x2", 0)
       .attr("y2", 300)
       .attr("stroke", "black");
}
barChart(set1, "x", "#D0104C");
barChart(set1, "y", "#6E75A4");
barChart(set2, "x", "#d35400");
barChart(set2, "y", "#0B346E");
barChart(set3, "x", "#78C2C4");
barChart(set3, "y", "#4F726C");
barChart(set4, "x", "#5DAC81");
barChart(set4, "y", "#ADA142");

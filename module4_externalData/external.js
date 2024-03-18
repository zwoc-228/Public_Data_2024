var jsonData = d3.json("anscombe.json")
Promise.all([jsonData])
.then(function(data){
   function barChart(data,columnInUse,fillColor){
var svg = d3.select("#chart")
      .append("svg")
      .attr("width", 400)
      .attr("height", 500);

var yScale = d3.scaleLinear()
         .domain([0, d3.max(data, function(d) { return d[columnInUse]; })])
         .range([0, 200]);

svg.selectAll("rect")
.data(data)
.enter()
.append("rect")
.attr("width", 15)
.attr("height", function(d) { return yScale(d[columnInUse]); })
.attr("x", function(d, i) { return i * 30; })
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

barChart(data[0]["set1"],"x","#D0104C")
barChart(data[0]["set1"],"y","#6E75A4")
barChart(data[0]["set2"],"x","#d35400")
barChart(data[0]["set2"],"y","#0B346E")
barChart(data[0]["set3"],"x","#78C2C4")
barChart(data[0]["set3"],"y","#4F726C")
barChart(data[0]["set4"],"x","#5DAC81")
barChart(data[0]["set4"],"y","#ADA143")
})

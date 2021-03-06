function myFunctionThree(){
    var svg = d3.select("svg"),
    margin = {top: 30, right: 20, bottom: 230, left: 60},
    w = +svg.attr("width") - margin.left - margin.right,
    h = +svg.attr("height") - margin.top - margin.bottom;

var xScale = d3.scaleBand().rangeRound([0, w]).padding(0.1),
    yScale = d3.scaleLinear().rangeRound([h, 0]);

var g = svg.append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

d3.csv("https://raw.githubusercontent.com/agollakota/cs416_narrativeviz_finalproject/main/Crimes_2020_filtered.csv", function(d) {
  d.COUNT = +d.COUNT;
  return d;
}, function(error, dataset) {
  if (error) throw error;

  xScale.domain(dataset.map(function(d) { return d.CRIME; }));
  yScale.domain([0, d3.max(dataset, function(d) { return d.COUNT; })]);

  g.append("text")
        .attr("x", (w / 2))             
        .attr("y", 0 - (margin.top / 2))
        .attr("text-anchor", "center")  
        .attr("font-family", "sans-serif")
        .attr("font-weight", "bold")
        .style("font-size", "18px") 
        .text("Crime in Chicago 2021");

  g.append("g")
      .attr("class", "axis x-axis")
      .attr("transform", "translate(0," + h + ")")
      .call(d3.axisBottom(xScale));

  g.append("g")
      .attr("class", "axis y-axis")
      .call(d3.axisLeft(yScale))
    .append("text")
      .attr("transform", "rotate(-90)")
      .attr("text-anchor", "end");

  g.selectAll(".bar")
    .data(dataset)
    .enter().append("rect")
      .attr("class", "bar")
      .attr("x", function(d) { return xScale(d.CRIME); })
      .attr("y", function(d) { return yScale(d.COUNT); })
      .attr("width", xScale.bandwidth())
      .attr("height", function(d) { return h - yScale(d.COUNT); })
      .attr("fill", "purple")

      .on("mouseover", function(d) {
        d3.select(this)
          .attr("fill", "green");

          var xPosition = parseFloat(d3.select(this).attr('x')) + xScale.bandwidth() / 2;
          var yPosition = parseFloat(d3.select(this).attr("y")) - 5;

          g.append("text")
             .attr("id", "tooltip")
             .attr("x", xPosition)
             .attr("y", yPosition)
             .attr("text-anchor", "middle")
             .attr("font-family", "sans-serif")
             .attr("font-size", "11px")
             .attr("font-weight", "bold")
             .attr("fill", "black")
             .text(d.COUNT);
      })

      .on("mouseout", function(d) {
        d3.select("#tooltip").remove();
        d3.select(this)
        .transition()
        .duration(250)
          .attr("fill", "purple");
      });

  d3.selectAll(".x-axis .tick text")
    .attr("transform", "rotate(60) translate(8, -10)")
    .attr("font-family", "sans-serif")    
    .style("text-anchor", "start");

});
}
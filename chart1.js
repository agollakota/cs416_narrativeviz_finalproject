function myFunction(){
    var svg = d3.select("svg");
    var path = d3.geoPath();
    
    d3.json("https://cdn.jsdelivr.net/npm/us-atlas@3/counties-10m.json", function(error, us) {
      if (error) throw error;
      
      d3.queue()
      .defer(d3.json, "https://data.cityofchicago.org/resource/w98m-zvie.json");

    var feature = topojson.feature(us, us.objects.states)
    .features
    .filter(function(d) {  return d.id == 17; })[0]; 
      
    var projection = d3.geoIdentity()
    .reflectY(true)  
    .fitSize([650,500],feature); 
        
        path.projection(projection);
    
    
        svg.attr("id", "counties")
        .selectAll("path")
        .data(topojson.feature(us, us.objects.counties).features)
        .enter().append("path")
        .attr("d", path)
        .attr("class", "county-boundary")    
        svg.attr("id", "states")
        .selectAll("path")
        .data(topojson.feature(us, us.objects.states).features.filter(function(d) {  return d.id == 17; })[0])
        .enter().append("path")
        .attr("d", path)
        .attr("id", "state-borders")
        .attr("class", "state")
                    
       svg.append("path")
       .datum(topojson.mesh(us, us.objects.states, function(a, b) { return a !== b; }))
       .attr("id", "state-borders")
       .attr("d", path);

    });
    }
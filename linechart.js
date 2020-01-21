// set the dimensions and margins of the graph
var margin = {top: 10, right: 30, bottom: 50, left: 80},
    width = 600 - margin.left - margin.right,
    height = 520 - margin.top - margin.bottom;

// append the chart object to the body of the page
var chart = d3.select("#my_linechart")
  .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");

function update2(selectedVar) {
  if(selectedVar === 'var3') {

//Read the data
d3.csv("/netflix_oscars/data/oscars_boxoffice.csv", function(data) {

  // group the data: I want to draw one line per group
  var sumstat = d3.nest() // nest function allows to group the calculation per level of a factor
    .key(function(d) { return d.Movie;})
    .entries(data);

console.log(sumstat)

  // Add X axis --> it is a date format
  var x = d3.scaleLinear()
    .domain(d3.extent(data, function(d) { return d.Week; }))
    .range([ 0, width ]);
  chart.append("g")
    .attr("transform", "translate(0," + height + ")")
    .attr("class", "first")
    .call(d3.axisBottom(x).ticks(5));

chart.append("text")             
      .attr("transform",
            "translate(" + (width/2) + " ," + 
                           (height + margin.top + 20) + ")")
      .style("text-anchor", "middle")
      .style("font-size", "15px")
      .attr("class", "first")
      .text("Weeks Since Opening");
  // Add Y axis
  var y = d3.scaleLinear()
    .domain([0, d3.max(data, function(d) { return +d.Est_Cumulative; })])
    .range([ height, 0 ]);  
  chart.append("g")
  	.attr("class", "first")
    .call(d3.axisLeft(y));

d3.selectAll(".second").remove()

chart.append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 0 - margin.left)
      .attr("x",0 - (height / 2))
      .attr("dy", "1em")
      .style("text-anchor", "middle")
      .attr("class", "first")
      .text("Estimated Cumulative Revenue");   
  // color palette
  var res = sumstat.map(function(d){ return d.key }) // list of group names
  console.log(res)
  var color = d3.scaleOrdinal()
    .domain(res)
    .range(['#e41a1c','#377eb8','#4daf4a','#984ea3','#ff7f00','#ffff33','#a65628','#f781bf','#999999'])

  // Draw the line
  chart.selectAll(".line")
      .data(sumstat)
      .enter()
      .append("path")
        .attr("fill", "none")
        .attr("class", "first")
        .attr("stroke", function(d){ return color(d.key) })
        .attr("stroke-width", 1.5)
        .attr("d", function(d){
          return d3.line()
            .x(function(d) { return x(d.Week); })
            .y(function(d) { return y(d.Est_Cumulative); })
            (d.values)
        })
   chart
       .append("line")
         .attr("x1", x(6) )
         .attr("x2", x(6) )
         .attr("y1", y(0))
         .attr("y2", y(1200000))
         .attr("stroke", "grey")
         .attr("stroke-dasharray", "4")
         .attr("class", "first")
   chart
       .append("line")
         .attr("x1", x(6) )
         .attr("x2", x(6) )
         .attr("y1", y(1700000))
         .attr("y2", y(2000000))
         .attr("stroke", "grey")
         .attr("stroke-dasharray", "4")
         .attr("class", "first")
   chart
       .append("line")
         .attr("x1", x(7) )
         .attr("x2", x(7) )
         .attr("y1", y(6600000))
         .attr("y2", y(7600000))
         .attr("stroke", "grey")
         .attr("stroke-dasharray", "4")
         .attr("class", "first")
   chart
       .append("line")
         .attr("x1", x(7) )
         .attr("x2", x(7) )
         .attr("y1", y(0))
         .attr("y2", y(5900000))
         .attr("stroke", "grey")
         .attr("stroke-dasharray", "4")
         .attr("class", "first")
   chart
       .append("line")
         .attr("x1", x(4) )
         .attr("x2", x(4) )
         .attr("y1", y(0))
         .attr("y2", y(200000))
         .attr("stroke", "grey")
         .attr("stroke-dasharray", "4")
         .attr("class", "first")
	chart
       .append("line")
         .attr("x1", x(4) )
         .attr("x2", x(4) )
         .attr("y1", y(500000))
         .attr("y2", y(1450000))
         .attr("stroke", "grey")
         .attr("stroke-dasharray", "4")
         .attr("class", "first")

     chart
       .append("text")
       .attr("x", x(5))
       .attr("y", y(1500000))
       .text("Marriage Story")
       .style("font-size", "13px")
       .style("font-style", "italic")
       .attr("class", "first")
    chart
       .append("text")
       .attr("x", x(5))
       .attr("y", y(1250000))
       .text("begins streaming")
       .style("font-size", "13px")
       .attr("class", "first")

    chart
       .append("text")
       .attr("x", x(6))
       .attr("y", y(6300000))
       .text("The Irishman")
       .style("font-size", "13px")
       .style("font-style", "italic")
       .attr("class", "first")
    chart
       .append("text")
       .attr("x", x(6))
       .attr("y", y(6050000))
       .text("begins streaming")
       .style("font-size", "13px")
       .attr("class", "first")
    chart
       .append("text")
       .attr("x", x(3.12))
       .attr("y", y(1800000))
       .text("Roma")
       .style("font-size", "13px")
       .style("font-style", "italic")
       .attr("class", "first")
    chart
       .append("text")
       .attr("x", x(3.76))
       .attr("y", y(1800000))
       .text("begins")
       .style("font-size", "13px")
       .attr("class", "first")
    chart
       .append("text")
       .attr("x", x(3.12))
       .attr("y", y(1550000))
       .text("streaming")
       .style("font-size", "13px")
       .attr("class", "first")

    chart
       .append("text")
       .attr("x", x(3.12))
       .attr("y", y(309000))
       .text("The Two Popes")
       .style("font-size", "13px")
       .style("font-style", "italic")
       .attr("class", "first")
    chart
       .append("text")
       .attr("x", x(3.12))
       .attr("y", y(89000))
       .text("begins streaming")
       .style("font-size", "13px")
       .attr("class", "first")


})} else {
	d3.csv("/netflix_oscars/data/oscars_boxoffice.csv", function(data) {

  // group the data: I want to draw one line per group
  var sumstat = d3.nest() // nest function allows to group the calculation per level of a factor
    .key(function(d) { return d.Movie;})
    .entries(data);

console.log(sumstat)

  // Add X axis --> it is a date format
  var x = d3.scaleLinear()
    .domain(d3.extent(data, function(d) { return d.Week; }))
    .range([ 0, width ]);
  chart.append("g")
    .attr("transform", "translate(0," + height + ")")
    .attr("class", "second")
    .call(d3.axisBottom(x).ticks(5));
d3.selectAll(".first").remove()

chart.append("text")             
      .attr("transform",
            "translate(" + (width/2) + " ," + 
                           (height + margin.top + 20) + ")")
      .style("text-anchor", "middle")
      .style("font-size", "15px")
      .attr("class", "second")
      .text("Weeks Since Opening");
  // Add Y axis
  var y = d3.scaleLinear()
    .domain([0, d3.max(data, function(d) { return +d.PTA; })])
    .range([ height, 0 ]);  
  chart.append("g")
  	.attr("class", "second")
    .call(d3.axisLeft(y));

chart.append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 0 - margin.left)
      .attr("x",0 - (height / 2))
      .attr("dy", "1em")
      .style("text-anchor", "middle")
      .attr("class", "second")
      .text("Average Revenue per Theater");   
  // color palette
  var res = sumstat.map(function(d){ return d.key }) // list of group names
  console.log(res)
  var color = d3.scaleOrdinal()
    .domain(res)
    .range(['#e41a1c','#377eb8','#4daf4a','#984ea3','#ff7f00','#ffff33','#a65628','#f781bf','#999999'])

  // Draw the line
  chart.selectAll(".line")
      .data(sumstat)
      .enter()
      .append("path")
        .attr("fill", "none")
        .attr("stroke", function(d){ return color(d.key) })
        .attr("stroke-width", 1.5)
        .attr("class", "second")
        .attr("d", function(d){
          return d3.line()
            .x(function(d) { return x(d.Week); })
            .y(function(d) { return y(d.PTA); })
            (d.values)
        })
labels = ['Marriage Story', 'The Irishman', 'The Two Popes', 'Roma']
var legspacing = 25;
var color2 = d3.scaleOrdinal()
    .domain(labels)
    .range(['#e41a1c','#377eb8','#4daf4a','#984ea3'])
  var legend = chart.selectAll(".legend")
                .data(labels)
                .enter()
                .append("g")

            legend.append("rect")
            	.attr("class", "second")
                .attr("fill", color2)
                .attr("width", 20)
                .attr("height", 20)
                .attr("y", function (d, i) {
                    return i * legspacing + 10;
                })
                .attr("x", 250);

            legend.append("text")
                .attr("class", "second")
                .attr("y", function (d, i) {
                    return i * legspacing + 25;
                })
                .attr("x", 280)
                .attr("text-anchor", "start")
                .text(function (d, i) {
                    return labels[i];
                })
                .style("font-style", "italic");
  //  chart
  //      .append("line")
  //        .attr("x1", x(6) )
  //        .attr("x2", x(6) )
  //        .attr("y1", y(0))
  //        .attr("y2", y(1200000))
  //        .attr("stroke", "grey")
  //        .attr("stroke-dasharray", "4")
  //  chart
  //      .append("line")
  //        .attr("x1", x(6) )
  //        .attr("x2", x(6) )
  //        .attr("y1", y(1700000))
  //        .attr("y2", y(2000000))
  //        .attr("stroke", "grey")
  //        .attr("stroke-dasharray", "4")
  //  chart
  //      .append("line")
  //        .attr("x1", x(7) )
  //        .attr("x2", x(7) )
  //        .attr("y1", y(6600000))
  //        .attr("y2", y(7600000))
  //        .attr("stroke", "grey")
  //        .attr("stroke-dasharray", "4")
  //  chart
  //      .append("line")
  //        .attr("x1", x(7) )
  //        .attr("x2", x(7) )
  //        .attr("y1", y(0))
  //        .attr("y2", y(5900000))
  //        .attr("stroke", "grey")
  //        .attr("stroke-dasharray", "4")
  //  chart
  //      .append("line")
  //        .attr("x1", x(4) )
  //        .attr("x2", x(4) )
  //        .attr("y1", y(0))
  //        .attr("y2", y(200000))
  //        .attr("stroke", "grey")
  //        .attr("stroke-dasharray", "4")
  // chart
  //      .append("line")
  //        .attr("x1", x(4) )
  //        .attr("x2", x(4) )
  //        .attr("y1", y(500000))
  //        .attr("y2", y(1450000))
  //        .attr("stroke", "grey")
  //        .attr("stroke-dasharray", "4")

  //    chart
  //      .append("text")
  //      .attr("x", x(5))
  //      .attr("y", y(6000))
  //      .text("Marriage Story")
  //      .style("font-size", "13px")
  //      .style("font-style", "italic")
  //   chart
  //      .append("text")
  //      .attr("x", x(5))
  //      .attr("y", y(3000))
  //      .text("begins streaming")
  //      .style("font-size", "13px")

  //   chart
  //      .append("text")
  //      .attr("x", x(6))
  //      .attr("y", y(12000))
  //      .text("The Irishman")
  //      .style("font-size", "13px")
  //      .style("font-style", "italic")
  //   chart
  //      .append("text")
  //      .attr("x", x(6))
  //      .attr("y", y(9000))
  //      .text("begins streaming")
  //      .style("font-size", "13px")
  //   chart
  //      .append("text")
  //      .attr("x", x(3.12))
  //      .attr("y", y(21000))
  //      .text("Roma")
  //      .style("font-size", "13px")
  //      .style("font-style", "italic")
  //   chart
  //      .append("text")
  //      .attr("x", x(3.96))
  //      .attr("y", y(21000))
  //      .text("begins")
  //      .style("font-size", "13px")
  //   chart
  //      .append("text")
  //      .attr("x", x(3.12))
  //      .attr("y", y(18000))
  //      .text("streaming")
  //      .style("font-size", "13px")

  //   chart
  //      .append("text")
  //      .attr("x", x(3.12))
  //      .attr("y", y(12000))
  //      .text("The Two Popes")
  //      .style("font-size", "13px")
  //      .style("font-style", "italic")
  //   chart
  //      .append("text")
  //      .attr("x", x(3.12))
  //      .attr("y", y(9000))
  //      .text("begins streaming")
  //      .style("font-size", "13px")


})
}}

update2('var3')

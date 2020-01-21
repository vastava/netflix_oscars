// set the dimensions and margins of the graph
var margin = {top: 10, right: 30, bottom: 20, left: 50},
    width = 600 - margin.left - margin.right,
    height = 520 - margin.top - margin.bottom;

// append the svg object to the body of the page
var svg = d3.select("#my_dataviz")
  .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");

function update(selectedVar) {

  if(selectedVar === 'var1') {
// Parse the Data
// d3.csv("https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/data_stacked.csv", function(data) {
d3.csv("/data/oscars_netflix_updated.csv", function(data) {

  // List of subgroups = header of the csv files = soil condition here
  var subgroups = data.columns.slice(22)

  // List of groups = species here = value of the first column called group -> I show them on the X axis
  var groups = d3.map(data, function(d){return(d.Year)}).keys()
  console.log(groups)
  console.log(subgroups)
  // Add X axis
  var x = d3.scaleBand()
      .domain(groups)
      .range([0, width])
      .padding([0.2])
  svg.append("g")
    .attr("transform", "translate(0," + height + ")")
    .attr("class", "axis1")
    .call(d3.axisBottom(x).tickSizeOuter(0));

  // Add Y axis
  var y = d3.scaleLinear()
    .domain([0, 25])
    .range([ height, 0 ]);
  svg.append("g")
    .attr("class", "axis1")
    .call(d3.axisLeft(y));

  // color palette = one color per subgroup
  var bestpic = '#D4AF37';
  var acting = '#71614C';
  var directing = '#A18158';
  var screenplay = '#D2A266';
  var foreign = '#404040';
  var animated = '#B25021';
  var documentary = '#771911';
  var sound = '#501E43';

  var color = d3.scaleOrdinal()
    .domain(subgroups)
    .range([bestpic, directing, directing, acting, acting, acting, acting, screenplay, screenplay, foreign, animated, documentary, documentary, sound, sound, sound, sound, sound, sound, sound, sound])

  //stack the data? --> stack per subgroup
  var stackedData = d3.stack()
    .keys(subgroups)
    (data)

console.log(stackedData)
console.log(data)


d3.selectAll(".anno").remove()
d3.selectAll(".tooltip2").remove()
d3.selectAll(".axis2").remove()
  // ----------------
  // Create a tooltip
  // ----------------
  var tooltip = d3.select("#my_dataviz")
    .append("div")
    .style("opacity", 0)
    .attr("class", "tooltip1")
    .style("background-color", "white")
    .style("border", "solid")
    .style("border-width", "1px")
    .style("border-radius", "5px")
    .style("padding", "10px")
    .style("width", width)

  // Three function that change the tooltip when user hover / move / leave a cell
  var mouseover = function(d) {
    var subgroupName = d3.select(this.parentNode).datum().key;
    // console.log(subgroupName)
    // console.log(subgroupName + " anno")
    var subgroupValue = d.data[subgroupName + " anno"];
    tooltip
        .html("Award: " + subgroupName + "<br>" + "Nominees: <i>" + subgroupValue + "</i>")
        .style("opacity", 1)
  }
  var mousemove = function(d) {
    tooltip
      .style("left", (d3.mouse(this)[0]) + "px") // It is important to put the +90: other wise the tooltip is exactly where the point is an it creates a weird effect
      .style("top", (d3.mouse(this)[1]) + "px")
  }
  var mouseleave = function(d) {
    tooltip
      .style("opacity", 0)
  }

var legspacing = 25;
var labels = ['Best Picture', 'Directing and Cinemotography', 'Acting', 'Screenplay', 'Foreign Language', 'Animated', 'Documentary', 'Sound and Editing'];
var color2 = d3.scaleOrdinal()
    .domain(labels)
    .range([bestpic, directing, acting, screenplay, foreign, animated, documentary, sound])

// [bestpic, directing, acting, screenplay, foreign, animated, documentary, sound]
// console.log(color2)
// console.log(color)

var legend = svg.selectAll(".legend")
                .data(labels)
                .enter()
                .append("g")

            legend.append("rect")
                .attr("class", "legend")
                .attr("fill", color2)
                .attr("width", 20)
                .attr("height", 20)
                .attr("y", function (d, i) {
                    return i * legspacing + 10;
                })
                .attr("x", 10);

            legend.append("text")
                .attr("font-size", "13px")
                .attr("class", "legend")
                .attr("y", function (d, i) {
                    return i * legspacing + 25;
                })
                .attr("x", 40)
                .attr("text-anchor", "start")
                .text(function (d, i) {
                    return labels[i];
                });

console.log(legend)
  // Show the bars
  svg.append("g")
    .selectAll("g")
    // Enter in the stack data = loop key per key = group per group
    .data(stackedData)
    .enter().append("g")
      .attr("fill", function(d) { return color(d.key); })
      .selectAll("rect")
      // enter a second time = loop subgroup per subgroup to add all rectangles
      .data(function(d) { return d; })
      .enter().append("rect")
        .attr("x", function(d) { return x(d.data.Year); })
        .attr("y", function(d) { return y(d[1]); })
        .attr("height", function(d) { return y(d[0]) - y(d[1]); })
        .attr("width",x.bandwidth())
        .attr("stroke", "grey")
      .on("mouseover", mouseover)
      .on("mousemove", mousemove)
      .on("mouseleave", mouseleave)

// legend.remove()

})}else {
  d3.csv("/data/oscars_netflix_movies_updated.csv", function(data) {

  // List of subgroups = header of the csv files = soil condition here
  var subgroups = data.columns.slice(2)

// data.columns.slice(22)
  // List of groups = species here = value of the first column called group -> I show them on the X axis
  var groups = d3.map(data, function(d){return(d.Year)}).keys()
  console.log(groups)
  console.log(subgroups)
  // Add X axis
  var x = d3.scaleBand()
      .domain(groups)
      .range([0, width])
      .padding([0.2])
  svg.append("g")
    .attr("transform", "translate(0," + height + ")")
    .attr("class", "axis2")
    .call(d3.axisBottom(x).tickSizeOuter(0));

  // Add Y axis
  var y = d3.scaleLinear()
    .domain([0, 25])
    .range([ height, 0 ]);
  svg.append("g")
    .attr("class", "axis2")
    .call(d3.axisLeft(y));

console.log(data)
  // color palette = one color per subgroup
  var bestpic = '#000000';
  var acting = '#370503';
  var directing = '#B73A41';
  var screenplay = '#67140E';
  var foreign = '#891D14';
  var animated = '#791934';
  var documentary = '#A72116';
  var sound = '#DF3021';

  var color = d3.scaleOrdinal()
    .domain(subgroups)
    .range([bestpic, acting, screenplay, foreign, documentary, sound, directing, animated].reverse())

  //stack the data? --> stack per subgroup
  var stackedData = d3.stack()
    .keys(subgroups)
    (data)







  // ----------------
  // Create a tooltip
  // ----------------
  var tooltip = d3.select("#my_dataviz")
    .append("div")
    .style("opacity", 0)
    .attr("class", "tooltip2")
    .style("background-color", "white")
    .style("border", "solid")
    .style("border-width", "1px")
    .style("border-radius", "5px")
    .style("padding", "10px")
    .style("width", width)

  // Three function that change the tooltip when user hover / move / leave a cell
  var mouseover = function(d) {
    var subgroupName = d3.select(this.parentNode).datum().key;
    // console.log(subgroupName)
    // console.log(subgroupName + " anno")
    var subgroupValue = d.data[subgroupName];
    tooltip
        .html("Movie: <i>" + subgroupName + "</i><br>" + "Award Nominations: " + subgroupValue)
        .style("opacity", 1)
  }
  var mousemove = function(d) {
    tooltip
      .style("left", (d3.mouse(this)[0]) + "px") // It is important to put the +90: other wise the tooltip is exactly where the point is an it creates a weird effect
      .style("top", (d3.mouse(this)[1]) + "px")
  }
  var mouseleave = function(d) {
    tooltip
      .style("opacity", 0)
  }

var legspacing = 25;
var labels = ['Best Picture', 'Directing and Cinemotography', 'Acting', 'Screenplay', 'Foreign Language', 'Animated', 'Documentary', 'Sound and Editing'];
var color2 = d3.scaleOrdinal()
    .domain(labels)
    .range([bestpic, directing, acting, screenplay, foreign, animated, documentary, sound])


// var img = []
// data.forEach(function(d,i){
//   img.push(d.Img)
// })

// console.log(img)
// var defs= svg.append('defs')
// defs.append('pattern')
//     .attr('id', 'pic1')    
//   .append('svg:image')
//     .attr('xlink:href', img[0])
//     .attr("x", 0)
//     .attr("y", 0);
  // Show the bars

d3.selectAll(".legend").remove()
d3.selectAll(".tooltip1").remove()
d3.selectAll(".axis1").remove()
  svg.append("g")
    .selectAll("g")
    // Enter in the stack data = loop key per key = group per group
    .data(stackedData)
    .enter().append("g")
      .attr("fill", function(d) { return color(d.key); })
      // .attr("fill", "url(#pic1)")
      // .attr("fill",function(d) { return "url(#image)" }  )
      .selectAll("rect")
      // enter a second time = loop subgroup per subgroup to add all rectangles
      .data(function(d) { return d; })
      .enter().append("rect")
        
        .attr("x", function(d) { return x(d.data.Year); })
        .attr("y", function(d) { return y(d[1]); })
        .attr("height", function(d) { return y(d[0]) - y(d[1]); })
        .attr("width",x.bandwidth())
        .attr("stroke", "grey")
      .on("mouseover", mouseover)
      .on("mousemove", mousemove)
      .on("mouseleave", mouseleave)

    svg
       .append("line")
         .attr("x1", x(2019) )
         .attr("x2", x(2017) )
         .attr("y1", y(3))
         .attr("y2", y(11))
         .attr("class", "anno")
         .attr("stroke", "grey")
         .attr("stroke-dasharray", "4")

     svg
       .append("text")
       .attr("x", x(2015))
       .attr("y", y(12))
       .text("In 2019, Roma accounted")
       .attr("class", "anno")
       .style("font-size", "13px")
      svg
       .append("text")
       .attr("x", x(2015))
       .attr("y", y(11))
       .text("for 10/15 of the nominations.")
       .attr("class", "anno")
       .style("font-size", "13px")

    svg
       .append("line")
         .attr("x1", x(2020) )
         .attr("x2", x(2018) )
         .attr("y1", y(6))
         .attr("y2", y(18))
         .attr("stroke", "grey")
         .attr("class", "anno")
         .attr("stroke-dasharray", "4")

     svg
       .append("text")
       .attr("x", x(2016))
       .attr("y", y(19))
       .text("In 2020, The Irishman accounted")
       .attr("class", "anno")
       .style("font-size", "13px")
      svg
       .append("text")
       .attr("x", x(2016))
       .attr("y", y(18))
       .text("for 10/24 of the nominations.")
       .attr("class", "anno")
       .style("font-size", "13px")

})
}}

update('var1')

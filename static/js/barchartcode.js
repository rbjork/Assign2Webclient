// JavaScript Document
function chartrender(data) {
	clearBarGraph();
	var margin = {top: 20, right: 30, bottom: 30, left: 40},
		width = 660 - margin.left - margin.right,
		height = 400 - margin.top - margin.bottom;
	
	var x = d3.scale.ordinal()
		.rangeRoundBands([0, width], .1);
	
	var y = d3.scale.linear()
		.range([height, 0]);
	
	var xAxis = d3.svg.axis()
		.scale(x)
		.orient("bottom");
	
	var yAxis = d3.svg.axis()
		.scale(y)
		.orient("left");
	
	var chart = d3.select(".chart")
		.attr("width", width + margin.left + margin.right)
		.attr("height", height + margin.top + margin.bottom)
	  .append("g")
		.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

	 // data = datalocal;
	  x.domain(data.map(function(d) { return d.name; }));
	  y.domain([0, d3.max(data, function(d) { return d.likes; })]);
	
	  chart.append("g")
		  .attr("class", "x axis")
		  .attr("transform", "translate(0," + height + ")")
		  .call(xAxis);
	
	  chart.append("g")
		  .attr("class", "y axis")
		  .call(yAxis);
	
	  chart.selectAll(".bar")
		  .data(data)
		.enter().append("rect")
		  .attr("class", "bar")
		  .attr("x", function(d) { return x(d.name); })
		  .attr("y", function(d) { return y(d.likes); })
		  .attr("height", function(d) { return height - y(d.likes); })
		  .attr("width", x.rangeBand())
};
	
function clearBarGraph() {
		var myNode = document.getElementById("barchart");
		while (myNode.firstChild) {
    		myNode.removeChild(myNode.firstChild);
		}
		d3.select("#barchart").append("svg:svg")
			.attr("class","chart");
		
}
	
function type(d) {
	  d.value = +d.value; // coerce to number
	  return d;
}

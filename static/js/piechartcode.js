function drawpiechart(data){
	var color = d3.scale.category10();
	//var data = [0 ,1, 2, 0];
	var width = 300;
	var height = 300;
	var min = Math.min(width, height);
	var svg = d3.select('#pie').append('svg');
	var pie = d3.layout.pie().sort(null);
	var arc = d3.svg.arc()
	  .outerRadius(min / 2 * 0.9)
	  .innerRadius(min / 2 * 0.5);
	
	svg.attr({width: width, height: height});
	var g = svg.append('g')
	  .attr('transform', 'translate(' + width / 2 + ',' + height / 2 + ')');
	
	
	g.selectAll('path').data(pie(data))
	  .enter().append('path')
		.style('stroke', 'white')
		.attr('d', arc)
		.attr('fill', function(d, i){ return color(i) });
		
	
}

function clearPieGraph() {
 	var myNode = document.getElementById("pie");
	while (myNode.firstChild) {
    	myNode.removeChild(myNode.firstChild);
	}
}


function drawpiechartlabeled(dataSet){
	var canvasWidth = 300, //width
      canvasHeight = 300,   //height
      outerRadius = 100,   //radius
      color = d3.scale.category20();
	  clearPieGraph();
	  var vis = d3.select("#pie")
      .append("svg:svg") //create the SVG element inside the <body>
        .data([dataSet]) //associate our data with the document
        .attr("width", canvasWidth) //set the width of the canvas
        .attr("height", canvasHeight) //set the height of the canvas
        .append("svg:g") //make a group to hold our pie chart
          .attr("transform", "translate(" + 1.5*outerRadius + "," + 1.5*outerRadius + ")") // relocate center of pie to 'outerRadius,outerRadius'
	

    // This will create <path> elements for us using arc data...
    var arc = d3.svg.arc()
      .outerRadius(outerRadius);

    var pie = d3.layout.pie() //this will create arc data for us given a list of values
      .value(function(d) { return d.likes; }) // Binding each value to the pie
      .sort( function(d) { return null; } );

    // Select all <g> elements with class slice (there aren't any yet)
    var arcs = vis.selectAll("g.slice")
      // Associate the generated pie data (an array of arcs, each having startAngle,
      // endAngle and value properties) 
      .data(pie)
      // This will create <g> elements for every "extra" data element that should be associated
      // with a selection. The result is creating a <g> for every object in the data array
      .enter()
      // Create a group to hold each slice (we will have a <path> and a <text>
      // element associated with each slice)
      .append("svg:g")
      .attr("class", "slice");    //allow us to style things in the slices (like text)

    arcs.append("svg:path")
      //set the color for each slice to be chosen from the color function defined above
      .attr("fill", function(d, i) { return color(i); } )
      //this creates the actual SVG path using the associated data (pie) with the arc drawing function
      .attr("d", arc);

    // Add a legendLabel to each arc slice...
    arcs.append("svg:text")
      .attr("transform", function(d) { //set the label's origin to the center of the arc
        //we have to make sure to set these before calling arc.centroid
        d.outerRadius = outerRadius + 50; // Set Outer Coordinate
        d.innerRadius = outerRadius + 45; // Set Inner Coordinate
        return "translate(" + arc.centroid(d) + ")";
      })
      .attr("text-anchor", "middle") //center the text on it's origin
      .style("fill", "Purple")
      .style("font", "bold 12px Arial")
      .text(function(d, i) { return dataSet[i].name; }); //get the label from our original data array

    // Add a magnitude value to the larger arcs, translated to the arc centroid and rotated.
    arcs.filter(function(d) { return d.endAngle - d.startAngle > .2; }).append("svg:text")
      .attr("dy", ".35em")
      .attr("text-anchor", "middle")
      //.attr("transform", function(d) { return "translate(" + arc.centroid(d) + ")rotate(" + angle(d) + ")"; })
      .attr("transform", function(d) { //set the label's origin to the center of the arc
        //we have to make sure to set these before calling arc.centroid
        d.outerRadius = outerRadius; // Set Outer Coordinate
        d.innerRadius = outerRadius/2; // Set Inner Coordinate
        return "translate(" + arc.centroid(d) + ")rotate(" + angle(d) + ")";
      })
      .style("fill", "White")
      .style("font", "bold 12px Arial")
      .text(function(d) { return d.data.likes; });

    // Computes the angle of an arc, converting from radians to degrees.
    function angle(d) {
      var a = (d.startAngle + d.endAngle) * 90 / Math.PI - 90;
      return a > 90 ? a - 180 : a;
    }
}
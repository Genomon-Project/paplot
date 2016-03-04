(function() {
	packages = {

		// Lazily construct the package hierarchy from class starts.
		root : function(classes) {
			var map = {};

			function find(start, data) {
				var node = map[start], i;
				if (!node) {
					node = map[start] = data || {
						start : start,
						children : []
					};
					if (start.length) {
						node.parent = find(start.substring(0, i = start.lastIndexOf(".")));
						node.parent.children.push(node);
						node.key = start.substring(i + 1);
					}
				}
				return node;
			}

			classes.forEach(function(d) {
				find(d.start, d);
			});

			return map[""];
		},

		// Return a list of ends for the given array of nodes.
		ends : function(nodes) {
			var map = {}, ends = [];

			// Compute a map from start to node.
			nodes.forEach(function(d) {
				map[d.start] = d;
			});

			// For each import, construct a link from the source to target node.
			nodes.forEach(function(d) {
				if (d.ends)
					d.ends.forEach(function(i) {
						ends.push({
							source : map[d.start],
							target : map[i]
						});
					});
			});

			return ends;
		}

	};
})();

// -----------------------------------------------------------------------------
// selection bar plot
// -----------------------------------------------------------------------------

// select items
var bar_dataset = [];
var bar_dataset_items = [[],[],[]];
var bar_dataset_chromos = [];

var brush = 0;
var brush_obj = 0;
var svg ;
var y_axis;

// select params
var svg_h = 150;
var svg_padding_left = 50;   // y-axis
var svg_padding_right = 10;
var svg_padding_top = 10;
var svg_padding_bottom = 50; // x-axis
var bar_padding = 0;
var plot_h = svg_h - svg_padding_top - svg_padding_bottom;
var plot_w = 0;

// resize timer
var timer = false;
window.addEventListener('resize', function() {
	if (timer !== false) {
		clearTimeout(timer);
	}
	timer = setTimeout(function() {
		draw_select_resize();
	}, 200);
});

function x_items() {
    return bar_dataset.key.length + 2;
}

function draw_select_resize() {
	thumb_reset();
	
	// update width
	var svg_w = parseInt(d3.select("body").style("width"), 10) - 200;
	plot_w = svg_w - svg_padding_left - svg_padding_right;

	svg
		.style("width", svg_w + 'px')
	;

	
	if (plot_w / x_items() > 3) {
		bar_padding = 1;
	}
	else {
		bar_padding = 0;
	}
	
	// bar
	svg.selectAll("g.outer").selectAll("rect")
		.attr("x", function(d, i) {
			return svg_padding_left + i * plot_w / x_items();
		})
		.attr("width", function(d, i) {
			return plot_w / x_items() - bar_padding;
		})
		;
	svg.selectAll("g.inner").selectAll("rect")
		.attr("x", function(d, i) {
			return svg_padding_left + i * plot_w / x_items();
		})
		.attr("width", function(d, i) {
			return plot_w / x_items() - bar_padding;
		})
		;
	svg.selectAll("g.snippet").selectAll("rect")
		.attr("x", function(d, i) {
			return svg_padding_left + i * plot_w / x_items();
		})
		.attr("width", function(d, i) {
			return plot_w / x_items() - bar_padding;
		})
		;
    
	// brush
	var brush_schale = d3.scale.linear().range([ svg_padding_left, svg_padding_left + plot_w ]);

	if (brush_obj != 0) {
		brush_obj.remove();
	}
	brush = d3.svg.brush()
		.x(brush_schale)
		.on("brush", function() {
			brushed(brush.extent());
		})
		;
	
	brush_obj=svg.append("g")
		.attr("class", "x brush")
		.call(brush)
		.selectAll("rect")
		.attr("y", svg_padding_top+1)
		.attr("height", plot_h-2)
		;

	// y-axis
	svg.selectAll("g.axis")
	.call(
		y_axis
		.tickSize(-plot_w)
	)
	;
	
	// x-axis
	svg.selectAll("g.grid_x").selectAll("text")
		.attr('transform', function(d, i)  {
			var dx = 0;
			for (var j = 0; j < i; j++){
				dx = dx + bar_dataset_chromos[j];
			}
			dx = dx +  Math.floor(bar_dataset_chromos[j]/2);
			var x = svg_padding_left + (dx * plot_w) / x_items();
			var y = svg_padding_top + plot_h + 14;
			return 'translate(' + x + ', ' + y + ') rotate(0)';
	    })
		;
	svg.selectAll("g.grid_x").selectAll("line")
		.attr("y1", function(d,i){
			if (bar_dataset.key[i].substr(-1) == "0") {
				return svg_padding_top;
			}
			return 0;
		})
		.attr("y2", function(d,i){
			if (bar_dataset.key[i].substr(-1) == "0") {
				return svg_padding_top + plot_h;
			}
			return 0;
		})
		.attr("x1", function(d,i){
			return svg_padding_left + (i * plot_w) / x_items();
		})
		.attr("x2", function(d,i){
			return svg_padding_left + (i * plot_w) / x_items();
		})
		;
}

function max_multi_array(multi_array) {
	if (multi_array.length == 0) {
		return 1;
	}
	
	var sum_array = [];
	for (var i = 0; i< multi_array[0].length; i++) {
		var sum = 0;
		for (var j = 0; j< multi_array.length; j++) {
			sum = sum + multi_array[j][i];
		}
		sum_array[i] = sum;
	}
	return Math.max.apply(null, sum_array);
}

function change_stack()
{
	thumb_reset();
	
	bundle_update();
	
	var sum_array = [];
	if (stack_mode(STACK_OUTER) == true) {
		sum_array.push(bar_dataset.value[0]);
	}
	if (stack_mode(STACK_INNER) == true) {
		sum_array.push(bar_dataset.value[1]);
	}
	if (stack_mode(STACK_SNIPPET) == true) {
		sum_array.push(bar_dataset.value[2]);
	}
	var max = max_multi_array(sum_array);
	
	// bar
	svg.selectAll("g.outer").selectAll("rect")
		.attr("y", function(d) {
			return svg_padding_top + plot_h - (d * plot_h / max);
		})
		.attr("height", function(d) {
			if (stack_mode(STACK_OUTER) == false) {
				return 0;
			}
			return (d * plot_h / max);
		})
		;
	
	svg.selectAll("g.inner").selectAll("rect")
		.attr("y", function(d, i) {
		    var dy = 0;
			if (stack_mode(STACK_OUTER) == true) {
			    dy = dy + bar_dataset.value[0][i];
			}
			return svg_padding_top + plot_h - ((d + dy) * plot_h / max);
		})
		.attr("height", function(d) {
			if (stack_mode(STACK_INNER) == false) {
				return 0;
			}
			return (d * plot_h / max);
		})
		;

    svg.selectAll("g.snippet").selectAll("rect")
		.attr("y", function(d, i) {
		    var dy = 0;
			if (stack_mode(STACK_OUTER) == true) {
			    dy = dy + bar_dataset.value[0][i];
			}
		    if (stack_mode(STACK_INNER) == true) {
			    dy = dy + bar_dataset.value[1][i];
			}
			return svg_padding_top + plot_h - ((d + dy) * plot_h / max);
		})
		.attr("height", function(d) {
			if (stack_mode(STACK_SNIPPET) == false) {
				return 0;
			}
			return (d * plot_h / max);
		})
		;
    
	// y-axis
	var y_scale = d3.scale.linear()
	.domain([0, max])   // original
	.range([plot_h, 0]) // target
	;
	
	svg.selectAll("g.axis")
	.call(
		y_axis
		.scale(y_scale)
		.tickSize(-plot_w)
	)
	;

	svg.selectAll("g.axis").selectAll("line")
		.attr("stroke", "lightgray")
		.attr("shape-rendering", "crispEdges")
		.style("stroke-opacity", 0.7)
	;
}

function draw_select()
{
	bar_dataset = bundle_data_sv.get_select();

	bar_dataset_chromos = [];

	for (var i = 0; i < bar_dataset.key.length; i++) {
		var index = Number(bar_dataset.key[i].substr(5,2));
		if (bar_dataset_chromos.length <= index) {
			bar_dataset_chromos.push(0);
		}
		bar_dataset_chromos[index] = bar_dataset_chromos[index] + 1;
	    
	    for (var j = 0; j < 3; j++) {
	        if (bar_dataset.value[j][i] > 0) {
                // start, end, items
                var start = i * 1 / x_items();
                var end = start + 1 / x_items();
                bar_dataset_items[j].push([start, end, bar_dataset.item[j][i]]);
	        }
	    }
	}

	svg = d3.select("#selector")
		.append("svg")
		.attr("height", svg_h);

	// bar
	svg.append("g")
		.attr("class", "outer")
		.selectAll("rect")
		.data(bar_dataset.value[0])
		.enter()
		.append("rect")
		.attr("y", 0)
		.attr("x", 0)
		.attr("width", 0)
		.attr("height", 0)
		.style("fill", style_sv_bar.bar_color_intra)
		;

	svg.append("g")
		.attr("class", "inner")
		.selectAll("rect")
		.data(bar_dataset.value[1])
		.enter()
		.append("rect")
		.attr("x", 0)
		.attr("y", 0)
		.attr("width", 0)
		.attr("height", 0)
		.style("fill", style_sv_bar.bar_color_inter)
		;

	svg.append("g")
		.attr("class", "snippet")
		.selectAll("rect")
		.data(bar_dataset.value[2])
		.enter()
		.append("rect")
		.attr("x", 0)
		.attr("y", 0)
		.attr("width", 0)
		.attr("height", 0)
		.style("fill", style_sv_bar.bar_color_snippet)
		;
	
	// y-axis
	y_axis = d3.svg.axis();
	svg.append("g")
	.attr("class", "axis")
	.attr("transform", "translate(" + (svg_padding_left-3) + ", " + (svg_padding_top) + ")")
	.call(
		y_axis
		.orient("left")
		.ticks(2)
	)
	;
	
	// x-axis
	svg.append("g")
		.attr("class", "grid_x")
		.selectAll("line")
		.data(bar_dataset_chromos)
		.enter()
		.append("text")
		.text(function(d, i) {
			var dx = 0;
			for (var j = 0; j < i; j++){
				dx = dx + bar_dataset_chromos[j];
			}
			var chrs = key_to_values(style_sv_bar.axis_x_label, bar_dataset.key[dx].substr(5, 2));
//			return "chr" + chrs;
			return chrs;
		})
		.attr("text-anchor", "end")
		.attr("font-size", "10px")
	;
	
	svg.append("g")
		.attr("class", "grid_x")
		.selectAll("line")
		.data(bar_dataset.key)
		.enter()
		.append("line")
		.attr("stroke", function(d,i){
			if (bar_dataset.key[i].substr(-4) == "0000") {
				return "gray";
			}
			return "lightgray";
		})
		.attr("shape-rendering", "crispEdges")
		.style("stroke-opacity", 0.7)
		;

	// x-title
	svg.append("text")
		.attr('transform', function(d, i)  {
			var x = svg_padding_left + 8;
			var y = svg_h - 10;
			return 'translate(' + x + ', ' + y + ') rotate(0)';
	    })
		.text(style_sv_bar.title_x + " (" + bundle_data_sv.node_size_select.toLocaleString() + " [bps])")
		.attr("font-size", "14px")
	;
	
	// y-title
	svg.append("text")
		.attr('transform', function(d, i)  {
			var x = 10;
			var y = svg_h/2;
	    	return 'translate(' + x + ', ' + y + ') rotate(-90)';
	    })
		.text(style_sv_bar.title_y)
        .attr("text-anchor", "middle")
		.attr("font-size", "12px")
	;
	
	
	draw_select_resize();
	change_stack();
}

var STACK_OUTER = 0;
var STACK_INNER = 1;
var STACK_SNIPPET = 2;

function stack_mode(label) {

	if (label == STACK_OUTER) {
		return d3.select("#v1").property("checked");
	}
	if (label == STACK_INNER) {
		return d3.select("#v2").property("checked");
	}
	if (label == STACK_SNIPPET) {
		return d3.select("#v3").property("checked");
	}
}

function brushed(data) {
	
	var hide = false;
	if (d3.select('input[name="q2"]:checked')[0][0].value == "hide") {
		hide = true;
	}
	// data is range [0,1]
	// to item
	
	// search selected item
	var bar_items = [];
	if (stack_mode(STACK_INNER) == true) {
		bar_items = bar_items.concat(bar_dataset_items[STACK_INNER]);
	}
	if (stack_mode(STACK_OUTER) == true) {
		bar_items = bar_items.concat(bar_dataset_items[STACK_OUTER]);
	}
	if (stack_mode(STACK_SNIPPET) == true) {
		bar_items = bar_items.concat(bar_dataset_items[STACK_SNIPPET]);
	}
    
	var match = []
	for (var i=0 ; i < bar_items.length; i++) {
		if (bar_items[i][1] < data[0]) {continue;}
		if (bar_items[i][0] > data[1]) {continue;}
		for (var j=0; j < bar_items[i][2].length; j++) {
			match.push(bar_items[i][2][j]);
		}
	}
	// remove duplicate
	var sort = match.filter(function (x, i, self) {
              return self.indexOf(x) === i;
        });

	// ID to index
	for (var j=0; j<bundle_data_sv.index_ID.length; j++) {
		var find = false;
		for (var i=0 ; i < sort.length; i++) {
			if (bundle_data_sv.index_ID[j] == sort[i]) {
				find = true;
				break;
			}
		}
		
		// view
		if (find == true) {
			if (hide == false) {
				d3.select("#thumb" + j).style("background-color", "#FFFFCC");
			}
			else {
				d3.select("#thumb" + j + "_li").classed("hidden", false);
			}
		}
		else {
			if (hide == false) {
				d3.select("#thumb" + j).style("background-color", "#FFFFFF");
			}
			else {
				d3.select("#thumb" + j + "_li").classed("hidden", true);
			}
		}
	}
}


function thumb_reset() {
	
	if (brush == 0) {
		return;
	}
	brush
		.clear()
		.event(d3.select(".brush"))
	;
	for (var j=0; j<bundle_data_sv.index_ID.length; j++) {
		d3.select("#thumb" + j + "_li").classed("hidden", false);
		d3.select("#thumb" + j).style("background-color", "#FFFFFF");
	}

	svg.selectAll("rect.extent")
		.attr("width", "0")
		.attr("x", "0")
	;
}

// -----------------------------------------------------------------------------
// circos
// -----------------------------------------------------------------------------

var maps = [];

function draw_bandle (obj, ID)
{
	if (maps.indexOf(ID) >= 0) { return; }
	
	var w = 400;
	var h = 400;
	var rx = w / 2;
	var ry = h / 2;
	var rotate = 0;

	var ir = ry-50;
	var or = ry-30;
	var label_t = 50;
	var cluster_size = 50;

	classes = bundle_data_sv.get_data_detail(ID);
	
	var bundle = d3.layout.bundle();

	var line = d3.svg.line.radial()
		.interpolate("bundle")
		.tension(style_sv_detail.link_tension)
		.radius(function(d) { return d.y; })
		.angle(function(d) { return d.x / 180 * Math.PI; });

	var div = d3.select("#" + obj)
		.style("width", w + "px")
		.style("height", w + "px")
		.style("position", "absolute");

	var svg = div.append("svg:svg")
		.attr("width", w)
		.attr("height", w)
		.append("svg:g")
		.attr("transform", "translate(" + rx + "," + ry + ")");
	
	var cluster = d3.layout.cluster()
		.size([360, ry - cluster_size])
		.sort(function(a, b) { return d3.ascending(a.key, b.key); });

	var nodes = cluster.nodes(packages.root(classes[0]));

	var groupData = svg.selectAll("g.group")
		.data(nodes.filter(function(d) { 
			var ret = (d.depth == 2) && d.children;
			return ret; 
		}))
		.enter().append("group")
		.attr("class", "group");

	var groupArc = d3.svg.arc()
		.innerRadius(ir)
		.outerRadius(or)
		.startAngle(function(d) { 
			return (findStartAngle(d.__data__.children)+0) * Math.PI / 180;
		})
		.endAngle(function(d) { 
			return (findEndAngle(d.__data__.children)-0) * Math.PI / 180
		});

	svg.selectAll("g.arc")
		.data(groupData[0])
		.enter().append("svg:path")
		.attr("d", groupArc)
		.attr("class", "groupArc")
		.style("fill", function(d) { return key_to_values(style_sv_detail.arc_fill_color, d.__data__.key); })
		.style("fill-opacity", style_sv_detail.arc_fill_opacity)
		.style("stroke", function(d) { return key_to_values(style_sv_detail.arc_stroke_color, d.__data__.key); })
		.style("stroke-opacity", style_sv_detail.arc_stroke_opacity)
		;
	
	svg.selectAll("g.arc")
		.data(groupData[0])
		.enter().append("svg:g")
		.attr("class", "groupArcLabel")
		.attr("id", function(d) { return "arc-label-" + d.__data__.key; })
		.attr("transform", function(d) { 
			var ret = "rotate(" + (d.__data__.x - 90) + ")translate(" + (d.__data__.y + label_t) + ")"; 
			return ret;
		})
		
		.append("svg:text")
		.attr("dx", function(d) {
			var ret = d.__data__.x < 180 ? 25 : -25;
			return ret;
		})
		.attr("dy", function(d) { 
			return ".31em"; 
		})
		.attr("text-anchor", function(d) { 
			return d.__data__.x < 180 ? "start" : "end";
		})
		.attr("transform", function(d) { 
			return d.__data__.x < 180 ? null : "rotate(180)"; 
		})
		.style("font-size", style_sv_detail.arc_label_fontsize)
		.style("fill", style_sv_detail.arc_label_color)
		.text(function(d) { return key_to_values(style_sv_detail.arc_label_text, d.__data__.key); })
		;
	
	// links
	var names = ["link_outer", "link_inner", "link_snippet"];
	var colors = [style_sv_detail.link_color_intra, style_sv_detail.link_color_inter, style_sv_detail.link_color_snippet];
    var link_data = [];
    
	for (var idx=0; idx<3; idx++) {
		link_data[idx] = setLinkData(classes[idx]);

		var links = packages.ends(cluster.nodes(packages.root(classes[idx])));
		var splines = bundle(links);
		
		svg.append("g")
			.attr("class", names[idx])
			.selectAll("path")
			.data(links)
			.enter()
			.append("path")
			.attr("class", names[idx])
			.attr("d", function(d, i) { 
				return line(splines[i]); 
			})
			.style("stroke", colors[idx])
			.style("stroke-width", style_sv_detail.link_width)
			.style("stroke-opacity", style_sv_detail.link_opacity)
			.style("fill", "none")
		
			.on("mouseover", function(d, i) {
				// link style
				d3.select(this)
					.style("stroke", style_sv_detail.link_select_color)
					.style("stroke-width", style_sv_detail.link_select_width)
					.style("stroke-opacity", style_sv_detail.link_select_opacity)
					;
				
				// remove last tooltip data
				d3.select("#tooltip").selectAll("p#text").remove();
				
				// add text to tooltip
			    var texts = link_data[2];
		   		if (d3.select(this).classed("link_outer") == true) {
		   			texts = link_data[0]
		   		}
		   		if (d3.select(this).classed("link_inner") == true) {
		   			texts = link_data[1]
		   		}
				var result = getLinkData_values(texts, d.source.start, d.target.start);
				d3.select("#tooltip").append("p").attr("id",  "text").text("link detail");
				for (var i = 0; i<result.length; i++) {
					d3.select("#tooltip")
						.append("p")
						.attr("id",  "text").text(result[i]);
				}
				//Show the tooltip
				d3.select("#tooltip").classed("hidden", false);
				
				//Get this bar's x/y values, then argument for the tooltip
				var rect = document.getElementById(obj).getBoundingClientRect();
				var xPosition = parseFloat(rect.left) + window.pageXOffset + 10;
				var yPosition = parseFloat(rect.top) + window.pageYOffset + 10;

				//Update the tooltip position and value
				d3.select("#tooltip")
					.style("left", xPosition + "px")
					.style("top", yPosition + "px")
				;
		   })
		   .on("mouseout", function() {
		   		var color = style_sv_detail.link_color_snippet;
		   		if (d3.select(this).classed("link_outer") == true) {
		   			color = style_sv_detail.link_color_intra;
		   		}
		   		if (d3.select(this).classed("link_inner") == true) {
		   			color = style_sv_detail.link_color_inter;
		   		}
				// link style
				d3.select(this)
					.style("stroke", color)
					.style("stroke-width", style_sv_detail.link_width)
					.style("stroke-opacity", style_sv_detail.link_opacity)
					;
			
				//Hide the tooltip
				d3.select("#tooltip").classed("hidden", true);
			})
			;
	}
	maps.push(ID);
	bundle_update_one(svg, style_sv_detail.link_width);
}

function draw_bandle_thumb (iid, ID)
{
	var w = 140;
	var h = 140;
	var rx = w / 2;
	var ry = h / 2;

	var ir = ry-13;
	var or = ry-10;
	var label_t = 8;
	var cluster_size = 14;
	
	classes = bundle_data_sv.get_data_thumb(ID);
	
	var bundle = d3.layout.bundle();

	var line = d3.svg.line.radial()
		.interpolate("bundle")
		.tension(style_sv_thumb.link_tension)
		.radius(function(d) { return d.y; })
		.angle(function(d) { return d.x / 180 * Math.PI; });

	var div = d3.select("#thumb" + iid)
		.style("width", w + 0 + "px")
		.style("height", w + 20 + "px")
		.style("position", "absolute");

	var svg = div.append("svg:svg")
		.attr("width", w)
		.attr("height", w)
		.append("svg:g")
		.attr("transform", "translate(" + rx + "," + ry + ")")
		;

	var cluster = d3.layout.cluster()
		.size([360, ry - cluster_size])
		.sort(function(a, b) { return d3.ascending(a.key, b.key); });

	var nodes = cluster.nodes(packages.root(classes[0]));

	var groupData = svg.selectAll("g.group")
		.data(nodes.filter(function(d) { 
			var ret = (d.depth == 2) && d.children;
			return ret; 
		}))
		.enter().append("group")
		.attr("class", "group");

	var groupArc = d3.svg.arc()
		.innerRadius(ir)
		.outerRadius(or)
		.startAngle(function(d) { 
			return (findStartAngle(d.__data__.children)-2) * Math.PI / 180;
		})
		.endAngle(function(d) { 
			return (findEndAngle(d.__data__.children)+2) * Math.PI / 180
		});

	svg.selectAll("g.arc")
		.data(groupData[0])
		.enter().append("svg:path")
		.attr("d", groupArc)
		.attr("class", "groupArc")
			.style("fill", function(d) { return key_to_values(style_sv_thumb.arc_fill_color, d.__data__.key); })
		.style("fill-opacity", style_sv_thumb.arc_fill_opacity)
		.style("stroke", function(d) { return key_to_values(style_sv_thumb.arc_stroke_color, d.__data__.key); })
		.style("stroke-width", "1px")
		.style("stroke-opacity", style_sv_thumb.arc_stroke_opacity)
		;

	// links
	var names = ["link_outer", "link_inner", "link_snippet"];
	var colors = [style_sv_thumb.link_color_intra, style_sv_thumb.link_color_inter, style_sv_thumb.link_color_snippet];
	
	for (var idx=0; idx<3; idx++) {
		var links = packages.ends(cluster.nodes(packages.root(classes[idx])));
		var splines = bundle(links);

		svg.append("g")
			.attr("class", names[idx])
			.selectAll("path")
			.data(links)
			.enter()
			.append("path")
			.attr("d", function(d, i) { 
				return line(splines[i]); 
			})
			.style("stroke", colors[idx])
			.style("stroke-width", style_sv_thumb.link_width)
			.style("stroke-opacity", style_sv_thumb.link_opacity)
			.style("fill", "none")
			;
	}
}

function bundle_update_one(svg, width) {

	if (stack_mode(STACK_OUTER) == true) {
		svg.selectAll("g.link_outer").selectAll("path").style("stroke-width", width);
	}
	else {
		svg.selectAll("g.link_outer").selectAll("path").style("stroke-width", "0px");
	}
	
	if (stack_mode(STACK_INNER) == true) {
		svg.selectAll("g.link_inner").selectAll("path").style("stroke-width", width);
	}
	else {
		svg.selectAll("g.link_inner").selectAll("path").style("stroke-width", "0px");
	}
	
	if (stack_mode(STACK_SNIPPET) == true) {
		svg.selectAll("g.link_snippet").selectAll("path").style("stroke-width", width);
	}
	else {
		svg.selectAll("g.link_snippet").selectAll("path").style("stroke-width", "0px");
	}
}

function bundle_update() {
	
	var ids = ["#thumb", "#map"];
	var widths = [style_sv_thumb.link_width, style_sv_detail.link_width];
    
	for (var i = 0; i<bundle_data_sv.index_ID.length; i++) {
		// 0: thumb, 1: detail
		for (var j = 0; j<2; j++) {
			var svg = d3.select(ids[j] + i).select("svg");
			bundle_update_one(svg, widths[j]);
			// detail
			if (maps.indexOf(bundle_data_sv.index_ID[i]) < 0) {
				break;
			}
		}
	}
}

function findStartAngle(children) {
	var min = children[0].x;
	children.forEach(function(d) {
		if (d.x < min)
			min = d.x;
	});
	return min;
}

function findEndAngle(children) {
	var max = children[0].x;
	children.forEach(function(d) {
		if (d.x > max)
		max = d.x;
	});
	return max;
}

function key_to_values(list, key) {
	return list[Number(key)];
}

function list_to_string(list) {
	var text = "";
	for (var i = 0; i < list.length; i++) {
		if (text != "") {
			text = text + ",";
		}
		text = text + list[i];
	}
	return text;
}

function getLinkData_values(data, source_start, target_start) {
	
	var ret = [];
	
	for (var i = 0; i<data.length; i++) {
		if (data[i].start == source_start) {
			for (var j = 0; j<data[i].ends.length; j++) {
				if (data[i].ends[j] == target_start) {
					ret.push(data[i].tooltip[j]);
				}
			}
			break;
		}
	}

	return ret
}

function setLinkData(classes) {
	var data = [];

	for(var i=0; i<classes.length; i++){
		if ((classes[i].tooltip.length) == 0) {
			continue;
		}
		data.push(classes[i]);
	}
	
	return  data;
}

function show_float(idx, ID) {

	draw_bandle("map" + idx, ID);

	pos = get_pos("thumb" + idx);

	d3.select("#float" + idx + "_t")
		.style("color", style_sv_detail.win_header_text_color)
		.style("background-color", style_sv_detail.win_header_background_color)
		;
	
	d3.select("#float" + idx)
		.style("border-color", style_sv_detail.win_border_color)
		.style("border-width", style_sv_detail.win_border_width)
		.style("background-color", style_sv_detail.win_background_color)
		.style("left", String(pos[0]) + "px")
		.style("top", String(pos[1]) + "px")
		.style("visibility", "visible")
		;
}
function hide_float(id) {
	d3.select(id).style("visibility", "hidden");
}

var item = ""
var mouse_x = 0;
var mouse_y = 0;

function mouse_down(event, id) {
	item = id;
	mouse_x = event.screenX;
	mouse_y = event.screenY;
	d3.select(id).style("opacity", 0.4);
	d3.select(id + "_h").classed("float_move", true);
}
function mouse_move(event, id) {
	if (item != id) { return; }
	dist_x = mouse_x - event.screenX;
	dist_y = mouse_y - event.screenY;
	if ((Math.abs(dist_x) < 1) && (Math.abs(dist_y) < 1)) { return; }
	d3.select(id).style("left", String(pos_tonum(d3.select(id).style("left")) - dist_x) + "px");
	d3.select(id).style("top", String(pos_tonum(d3.select(id).style("top")) - dist_y) + "px");

	mouse_x = event.screenX;
	mouse_y = event.screenY;
}
function mouse_up(event, id) {
	if (item != id) { return; }
	item = "";
	mouse_x = 0;
	mouse_y = 0;
	d3.select(id).style("opacity", 1.0);
	d3.select(id + "_h").classed("float_move", false);
}

function mouse_out(id) {
	if (item != id) { return; }
	item = "";
	mouse_x = 0;
	mouse_y = 0;
	d3.select(id).style("opacity", 1.0);
	d3.select(id + "_h").classed("float_move", false);
}

function pos_tonum(pos_txt) {
	return Number(pos_txt.replace(/px/g , ""));
}

function get_pos(id) {
	var rect = document.getElementById(id).getBoundingClientRect();

	var dElm = document.documentElement , dBody = document.body ;
	var scrollX = dElm.scrollLeft || dBody.scrollLeft ;
	var scrollY = dElm.scrollTop || dBody.scrollTop ;

	return [rect.left + scrollX, rect.top + scrollY];
}

function draw_legend(){
	d3.select("#legend0").style("background-color", style_sv_bar.bar_color_intra);
	d3.select("#legend1").style("background-color", style_sv_bar.bar_color_inter);
	d3.select("#legend2").style("background-color", style_sv_bar.bar_color_snippet);
	
	d3.select("#legend0_text").attr("id",  "text").text(style_sv_bar.bar_label_intra);
	d3.select("#legend1_text").attr("id",  "text").text(style_sv_bar.bar_label_inter);
	d3.select("#legend2_text").attr("id",  "text").text(style_sv_bar.bar_label_snippet);

	d3.select("#select_title").attr("id",  "text").text(style_sv_bar.title_top);
}

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

maps = [];

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

	classes = bundle_data_sv.get_data(ID);
	
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

	var roots = packages.root(classes);
	var nodes = cluster.nodes(roots);
	var links = packages.ends(nodes);
	var splines = bundle(links);


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

	var link_data = setLinkData(classes);

	var path = svg.selectAll("path.link")
		.data(links)
		.enter().append("svg:path")
		.attr("class", function(d) {
			return "link source-" + d.source.key + " target-" + d.target.key
		})
		.attr("d", function(d, i) { 
			return line(splines[i]); 
		})
		.style("stroke", function(d) { 
			return getLinkColor(style_sv_detail.link_color_inner, style_sv_detail.link_color_outer, d.source.key, d.target.key);
		})
		.style("stroke-width", style_sv_detail.link_width)
		.style("stroke-opacity", style_sv_detail.link_opacity)
		.style("fill", "none")
		
		.on("mouseover", function(d, i) {
			// link style
			//d3.select(this).classed("select", true);
			d3.select(this)
				.style("stroke", style_sv_detail.link_select_color)
				.style("stroke-width", style_sv_detail.link_select_width)
				.style("stroke-opacity", style_sv_detail.link_select_opacity)
				;
			
			// remove last tooltip data
			d3.select("#tooltip").selectAll("p#text").remove();
			
			// add text to tooltip
			var result = getLinkData_values(link_data, d.source.start, d.target.start);
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
			// link style
			//d3.select(this).classed("select", false);
			//d3.select(this).style ("marker-end", "none");
			d3.select(this)
				.style("stroke", function(d) { 
					return getLinkColor(style_sv_detail.link_color_inner, style_sv_detail.link_color_outer, d.source.key, d.target.key);
				})
				.style("stroke-width", style_sv_detail.link_width)
				.style("stroke-opacity", style_sv_detail.link_opacity)
				;
		
			//Hide the tooltip
			d3.select("#tooltip").classed("hidden", true);
		})
		;
	maps.push(ID);
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
	
	classes = bundle_data_sv_thumb.get_data(ID);
	
	var bundle = d3.layout.bundle();

	var line = d3.svg.line.radial()
		.interpolate("bundle")
		.tension(style_sv_thumb.link_tension)
		.radius(function(d) { return d.y; })
		.angle(function(d) { return d.x / 180 * Math.PI; });

	var div = d3.select("#bundle" + iid)
		.style("width", w + "px")
		.style("height", w + "px")
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

	var roots = packages.root(classes);
	var nodes = cluster.nodes(roots);
	var links = packages.ends(nodes);
	var splines = bundle(links);

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

	var path = svg.selectAll("path.link")
		.data(links)
		.enter().append("svg:path")
		.attr("class", function(d) {
			return "link source-" + d.source.key + " target-" + d.target.key
		})
		.attr("d", function(d, i) { 
			return line(splines[i]); 
		})
		.style("stroke", function(d) {
			return getLinkColor(style_sv_thumb.link_color_inner, style_sv_thumb.link_color_outer, d.source.key, d.target.key)
		})
		.style("stroke-width", style_sv_thumb.link_width)
		.style("stroke-opacity", style_sv_thumb.link_opacity)
		.style("fill", "none")
		;
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
	var ret;
	if (key == "X") {
		ret =  list[22]; 
	}
	else if (key == "Y") {
		ret = list[23]; 
	}
	else {
		ret = list[Number(key)-1];
	}
	return ret; 
}

function getLinkColor(color_inner, color_outer, source_key, target_key) {
	if (source_key.substr(0,2) == target_key.substr(0,2)) {
		return color_inner;
	}
	return color_outer;
}

function getLinkData_values(data, source_start, target_start) {
	
	var ret = [];
	
	for (var i = 0; i<data.length; i++) {
		if (data[i].start == source_start) {
			for (var j = 0; j<data[i].ends.length; j++) {
				if (data[i].ends[j] == target_start) {
					ret.push(data[i].value[j]);
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
		if ((classes[i].value.length) == 0) {
			continue;
		}
		data.push(classes[i]);
	}
	
	return  data;
}

function show_float(idx, ID) {

	draw_bandle("map" + idx, ID);

	pos = get_pos("bundle" + idx);

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

item=""
mouse_x=0;
mouse_y=0;

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

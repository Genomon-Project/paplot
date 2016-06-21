//##### load data
var chart_brush = dc.barChart('#chart_brush'); 
var chart_coverage = dc.barChart('#chart_coverage'); 
var chart_average = dc.barChart('#chart_average'); 
var chart_mapped = dc.barChart('#chart_mapped'); 
var chart_insert = dc.barChart('#chart_insert'); 
var chart_duplicate = dc.barChart('#chart_duplicate'); 
var chart_length = dc.barChart('#chart_length'); 

var data = get_data_base();
render(sort_by(data, "id"));

d3.selectAll('#select input').on('click', function() {
	if (this.value == "name"){
		reset();
		render(sort_by(data, "id"));
	}
	else if (this.value == "val"){
		reset();
		render(sort_by(data, "average_depth"));
	}
})

function sort_by(data, typ) {
	return data.sort(
		function(a,b){
			var aName = a[typ];
			var bName = b[typ];
			if( aName < bName ) return -1;
			if( aName > bName ) return 1;
			return 0;
		}
	);
}

function reset() {
	chart_brush.filterAll();
	chart_average.filterAll();
	chart_coverage.filterAll();
	chart_mapped.filterAll();
	chart_insert.filterAll();
	chart_duplicate.filterAll();
	chart_length.filterAll();
	dc.redrawAll();
}

function getxLabel(v, IDs, idx_start) {
	var m = v.getUTCMonth();
	if ((m >= 11) & (m <= 12)){
		return IDs[v.getFullYear()-idx_start];
	}
	else {
		return ""
	}
}

function render(data) {
	
	var idx_start = 1900;
	var idx_end = idx_start + data.length;
	
	var cf = crossfilter(data);
	var dateFormat = d3.time.format('%Y');
	var numberFormat = d3.format('.3f');
	
	var IDs = [];
	
	for(var i=0; i<data.length; i++){
		var dd = dateFormat.parse(String(i+idx_start));
		var year = d3.time.year(dd);
		data[i].year = year;
		IDs.push(data[i].id);
	}
	
	// ##### Dimension by index (year)
	var dimIndex = cf.dimension(function (d) {
		return d.year;
	});
	
	var gpIndex = dimIndex.group().reduce(
		function(p, v) {
			p.ratio_30x += v.ratio_30x;
			p.ratio_20x += v.ratio_20x - v.ratio_30x;
			p.ratio_10x += v.ratio_10x - v.ratio_20x;
			p.ratio_2x += v.ratio_2x - v.ratio_10x;
			
			p.average_depth += v.average_depth;
			p.count += 1;
			p.id += v.id;
			
			p.read_length_r1 += v.read_length_r1;
			p.read_length_r2 += v.read_length_r2;
			p.mapped += v.mapped_reads/v.total_reads;
			p.mean_insert_size += v.mean_insert_size;
			p.duplicate_reads += v.duplicate_reads/v.total_reads;

			return p;
		},
		function (p, v) {
			p.ratio_30x -= v.ratio_30x;
			p.ratio_20x -= v.ratio_20x - v.ratio_30x;
			p.ratio_10x -= v.ratio_10x - v.ratio_20x;
			p.ratio_2x -= v.ratio_2x - v.ratio_10x;
			
			p.average_depth -= v.average_depth;
			p.count -= 1;
			p.id -= v.id;
			
			p.read_length_r1 -= v.read_length_r1;
			p.read_length_r2 -= v.read_length_r2;
			p.mapped -= v.mapped_reads/v.total_reads;
			p.mean_insert_size -= v.mean_insert_size;
			p.duplicate_reads -= v.duplicate_reads/v.total_reads;
			
			return p;
		},
		function (p, v) {
			return {
				ratio_2x: 0,
				ratio_10x: 0,
				ratio_20x: 0,
				ratio_30x: 0,
				
				average_depth: 0,
				count: 0,
				id: "",
				
				read_length_r1: 0,
				read_length_r2: 0,
				mapped: 0,
				mean_insert_size: 0,
				duplicate_reads: 0,
			};
		}
	)
	//.order(function(d) { return d.average_depth; })
	;
	
	gpIndex.all = function() {
		return gpIndex.top(Infinity);
	}
	
	//# params of chart
	//var width = 960;
	var width = 1200;
	var margin_top = 30;
	var margin_bottom = 20;
	var margin_right = 50;
	var margin_left = 50;

	var height2 = 200;
	//var width2 = 960;
	var width2 = 1200;
	var margin2_top = 30;
	var margin2_bottom = 20;
	var margin2_right = 50;
	var margin2_left = 50;
	
	//##### draw chart of brush
	
	chart_brush
		.width(width)
		.height(80)
		.margins({
			top: margin_top, 
			right: margin_right, 
			bottom: margin_bottom, 
			left: margin_left + 10
		})
		.dimension(dimIndex)
		.group(gpIndex, 'average_depth', function(d) {
		   	return d.value.average_depth;
		 })
		.gap(0)
		.x(d3.time.scale().domain([new Date(idx_start-1, 1, 1), new Date(idx_end, 12, 31)]))
		.xUnits(d3.time.years)
		//.rangeChart(chart_coverage)
		.ordinalColors([style_qc.bar_select_color])
		;
		
	chart_brush
		.xAxis()
		//.tickFormat("")
		.tickValues(0)
		;
	
	chart_brush
		.yAxis()
		.tickValues(0)
		;
	
	//##### draw chart of coverage 
	
	chart_coverage
		.width(width)
		.height(300)
		.margins({top: 
			margin_top, 
			right: margin_right, 
			bottom: margin_bottom, 
			left: margin_left
		})
		.dimension(dimIndex)
		.group(gpIndex, 'ratio_30x', function(d) {
			return d.value.ratio_30x;
		})
		.stack(gpIndex, 'ratio_20x', function(d) {
			return d.value.ratio_20x;
		})
		.stack(gpIndex, 'ratio_10x', function(d) {
			return d.value.ratio_10x;
		})
		.stack(gpIndex, 'ratio_2x', function(d) {
			return d.value.ratio_2x;
		})
		.yAxisLabel(style_qc.bar_coverage_ylabel_text)
		.x(d3.time.scale().domain([new Date(idx_start-1, 1, 1), new Date(idx_end, 12, 31)]))
		.xUnits(d3.time.years)
		.centerBar(true)
		.gap(0)
		.rangeChart(chart_brush)
		.brushOn(false)
		.legend(dc.legend()
			.x(100)
			.y(10)
			.itemHeight(13)
			.gap(0)
			.horizontal(1)
			.autoItemWidth(true)
		)
		.title(function(d) {
	    	return "ID: " + d.value.id + "\n" +
	    	"ratio_2x: " + numberFormat(d.value.ratio_2x + d.value.ratio_10x + d.value.ratio_20x + d.value.ratio_30x) + "\n" +
	    	"ratio_10x: " + numberFormat(d.value.ratio_10x + d.value.ratio_20x + d.value.ratio_30x) + "\n" +
	    	"ratio_20x: " + numberFormat(d.value.ratio_20x + d.value.ratio_30x) + "\n" +
	    	"ratio_30x: " + numberFormat(d.value.ratio_30x);
	    })
		.ordinalColors(style_qc.bar_coverage_color)
		;
	
	chart_coverage
		.xAxis()
		//.tickFormat(function(v) { return getxLabel(v, IDs, idx_start); })
		.tickValues(0)
		;

	//##### draw chart of depth 
	
	chart_average
		.width(width)
		.height(300)
		.margins({
			top: margin_top, 
			right: margin_right, 
			bottom: margin_bottom, 
			left: margin_left
		})
		.dimension(dimIndex)
		.group(gpIndex, 'average_depth', function(d) {
			return d.value.average_depth;
		})
	    .yAxisLabel(style_qc.bar_average_ylabel_text)
	 	.x(d3.time.scale().domain([new Date(idx_start-1, 1, 1), new Date(idx_end, 12, 31)]))
		.xUnits(d3.time.years)   
		.centerBar(true)
		.gap(0)
		.rangeChart(chart_coverage)
		.brushOn(false)
		.renderHorizontalGridLines(true)
		.renderVerticalGridLines(true)
		.legend(dc.legend()
			.x(100)
			.y(10)
			.itemHeight(13)
			.gap(10)
			.horizontal(1)
			.autoItemWidth(true)
		)
	    .title(function(d) {
	    	return "ID: " + d.value.id + "\n" +
	    	"depth average: " + numberFormat(d.value.average_depth);
	    })
		.ordinalColors([style_qc.bar_average_color])
		;
		
	chart_average
		.xAxis()
		//.tickFormat(function(v) { return getxLabel(v, IDs, idx_start); })
		.tickValues(0)
		;

	//##### draw chart of mapped
	
	chart_mapped
		.width(width2)
		.height(height2)
		.margins({
			top: margin2_top, 
			right: margin2_right, 
			bottom: margin2_bottom, 
			left: margin2_left
		})
		.dimension(dimIndex)
		.group(gpIndex, 'mapped_reads rate', function(d) {
			return d.value.mapped;
		})
	    .yAxisLabel(style_qc.bar_mapped_ylabel_text)
	 	.x(d3.time.scale().domain([new Date(idx_start-1, 1, 1), new Date(idx_end, 12, 31)]))
		.xUnits(d3.time.years)   
		.centerBar(true)
		.gap(0)
		.rangeChart(chart_average)
		.brushOn(false)
		.renderHorizontalGridLines(true)
		.renderVerticalGridLines(true)
		.legend(dc.legend()
			.x(100)
			.y(10)
			.itemHeight(13)
			.gap(10)
			.horizontal(1)
			.autoItemWidth(true)
		)
	    .title(function(d) {
	    	return "ID: " + d.value.id + "\n" +
	    	"mapped_reads rate: " + numberFormat(d.value.mapped);
	    })
		.ordinalColors([style_qc.bar_mapped_color])
		;
		
	chart_mapped
		.xAxis()
		//.tickFormat(function(v) { return getxLabel(v, IDs, idx_start); })
		.tickValues(0)
		;
	
	//##### draw chart of insert 
	
	chart_insert
		.width(width2)
		.height(height2)
		.margins({
			top: margin2_top, 
			right: margin2_right, 
			bottom: margin2_bottom, 
			left: margin2_left
		})
		.dimension(dimIndex)
		.group(gpIndex, 'mean_insert_size', function(d) {
			return d.value.mean_insert_size;
		})
	    .yAxisLabel(style_qc.bar_insert_ylabel_text)
	 	.x(d3.time.scale().domain([new Date(idx_start-1, 1, 1), new Date(idx_end, 12, 31)]))
		.xUnits(d3.time.years)   
		.centerBar(true)
		.gap(0)
		.rangeChart(chart_mapped)
		.brushOn(false)
		.renderHorizontalGridLines(true)
		.renderVerticalGridLines(true)
		.legend(dc.legend()
			.x(100)
			.y(10)
			.itemHeight(13)
			.gap(10)
			.horizontal(1)
			.autoItemWidth(true)
		)
	    .title(function(d) {
	    	return "ID: " + d.value.id + "\n" +
	    	"mean_insert_size: " + numberFormat(d.value.mean_insert_size);
	    })
		.ordinalColors([style_qc.bar_insert_color])
		;
		
	chart_insert
		.xAxis()
		//.tickFormat(function(v) { return getxLabel(v, IDs, idx_start); })
		.tickValues(0)
		;
	
	//##### draw chart of duplicate 
	
	chart_duplicate
		.width(width2)
		.height(height2)
		.margins({
			top: margin2_top, 
			right: margin2_right, 
			bottom: margin2_bottom, 
			left: margin2_left
		})
		.dimension(dimIndex)
		.group(gpIndex, 'duplicate_reads rate', function(d) {
			return d.value.duplicate_reads;
		})
	    .yAxisLabel(style_qc.bar_duplicate_ylabel_text)
	 	.x(d3.time.scale().domain([new Date(idx_start-1, 1, 1), new Date(idx_end, 12, 31)]))
		.xUnits(d3.time.years)   
		.centerBar(true)
		.gap(0)
		.rangeChart(chart_insert)
		.brushOn(false)
		.renderHorizontalGridLines(true)
		.renderVerticalGridLines(true)
		.legend(dc.legend()
			.x(100)
			.y(10)
			.itemHeight(13)
			.gap(10)
			.horizontal(1)
			.autoItemWidth(true)
		)
	    .title(function(d) {
	    	return "ID: " + d.value.id + "\n" +
	    	"duplicate_reads rate: " + numberFormat(d.value.duplicate_reads);
	    })
		.ordinalColors([style_qc.bar_duplicate_color])
		;
		
	chart_duplicate
		.xAxis()
		//.tickFormat(function(v) { return getxLabel(v, IDs, idx_start); })
		.tickValues(0)
		;
	
	//##### draw chart of length 
	
	chart_length
		.width(width2)
		.height(height2)
		.margins({
			top: margin2_top, 
			right: margin2_right, 
			bottom: margin2_bottom, 
			left: margin2_left
		})
		.dimension(dimIndex)
		.group(gpIndex, 'read_length_r1', function(d) {
			return d.value.read_length_r1;
		})
		.stack(gpIndex, 'read_length_r2', function(d) {
			return d.value.read_length_r2;
		})
	    .yAxisLabel(style_qc.bar_length_ylabel_text)
	 	.x(d3.time.scale().domain([new Date(idx_start-1, 1, 1), new Date(idx_end, 12, 31)]))
		.xUnits(d3.time.years)
		.centerBar(true)
		.gap(0)
		.rangeChart(chart_duplicate)
		.brushOn(false)
		.renderHorizontalGridLines(true)
		.renderVerticalGridLines(true)
		.legend(dc.legend()
			.x(100)
			.y(10)
			.itemHeight(13)
			.gap(10)
			.horizontal(1)
			.autoItemWidth(true)
		)
	    .title(function(d) {
	    	return "ID: " + d.value.id + "\n" +
	    	"read_length_r1: " + numberFormat(d.value.read_length_r1) + "\n" +
	    	"read_length_r2: " + numberFormat(d.value.read_length_r2);
	    })
		.ordinalColors(style_qc.bar_length_color)
		;
		
	chart_length
		.xAxis()
		//.tickFormat(function(v) { return getxLabel(v, IDs, idx_start); })
		.tickValues(0)
		;
	
	dc.renderAll();
}

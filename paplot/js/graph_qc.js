// *********************************************
// initialize
// *********************************************
// div-dataset
var divs = [];
var legends = [];

function add_div(chart_id) {
    divs.push({
        obj: new mut_bar(chart_id),
        chart_id: chart_id,
    });
    legends.push({
        obj: new legend("legend_" + chart_id),
        chart_id: "legend_" + chart_id + "_svg",
    });
}

// resize timer
var timer = false;
window.addEventListener('resize', function() {
    if (timer !== false) {
        clearTimeout(timer);
    }
    timer = setTimeout(function() {
        brush_reset();
        update_div();
        for (var i = 0; i < divs.length; i++) {
            divs[i].obj.resize();
        }
    }, 200);
});

function update_div() {
    var margin_left = 100, margin_right = 100;
    var w_min = qc_data.Ids.length*6;
    var w_max = qc_data.Ids.length*50;

    // width
    var w = window.innerWidth - margin_left - margin_right;
    if (w < w_min) w = w_min;
    if (w > w_max) w = w_max;
    
    // height
    for (var i = 0; i < divs.length; i++) {
        d3.select("#" + divs[i].chart_id).style("width", Math.floor(w) + "px");
        if (divs[i].chart_id == "chart_brush") {
            d3.select("#" + divs[i].chart_id).style("height", "120px");
        }
        else {
            d3.select("#" + divs[i].chart_id).style("height", "240px");
        }
    }
}

function init() {

    update_div();
    
    var brush_dataset = qc_data.get_dataset("chart_brush");
    var brush_data = [];
    for (var s = 0; s < brush_dataset.data.length; s++) {
        
        for (var d = 0; d < brush_dataset.data[s].length; d++) {
            if (s == 0) brush_data[d] = brush_dataset.data[s][d];
            else brush_data[d] += brush_dataset.data[s][d];
        }
    }
    
    for (var i = 0; i < divs.length; i++) {
        var bar = divs[i].obj;
        var info = qc_data.get_plot_config(divs[i].chart_id);
        var dataset = qc_data.get_dataset(info.chart_id);
        
        for (var s = 0; s < dataset.data.length; s++) {
            bar.dataset[s] = new bar.dataset_template(info.stack_id[s]);
            bar.dataset[s].data = dataset.data[s];
            bar.dataset[s].keys = dataset.key;
            bar.dataset[s].color_fill = info.color[s];
            bar.dataset[s].enable = true;
        };
        
        bar.keys = qc_data.Ids;
        bar.tags[0] = new bar.tag_template("sample_ID");
        bar.tags[0].values = qc_data.Ids;
        bar.tags[0].note = "fix";
        bar.tags[1] = new bar.tag_template("value_of_brush");
        bar.tags[1].values = brush_data;
        bar.tags[1].note = "brush";
        
        bar.options.resizeable_w = true;
        bar.options.resizeable_h = false;
        bar.options.multi_select = false;
        bar.options.padding_left = 0;
        bar.options.padding_right = 0;
        bar.options.padding_top = 10;
        bar.options.padding_bottom = 40;
        bar.options.direction_x = "left-right";
        bar.options.direction_y = "bottom-up";
        
        bar.options.animation.mtime = 0;
        
        if (dataset.tooltip == 0) {
            bar.options.tooltip.enable = false;
        }
        else {
            bar.tooltips = dataset.tooltip;
            bar.options.tooltip.position = "bar";
        }
        
        if (divs[i].chart_id == "chart_brush") {
            bar.options.brush.enable = true;
            bar.options.brush.fill = "blue";
            bar.options.brush.stroke = "blue";
            
            bar.options.grid_y = new bar.grid_template();
            bar.options.grid_y.ticks = 1;
            bar.options.grid_y.wide = 80;
            bar.options.grid_y.border_color = "#DDC";
            bar.options.grid_y.border_opacity = 0.5;
            bar.options.grid_y.orient = "left";
            
            bar.options.grid_xs[0] = new bar.grid_template();
            bar.options.grid_xs[0].keys = qc_data.Ids
            //bar.options.grid_xs[0].labels = qc_data.Ids;
            bar.options.grid_xs[0].labels = new Array(qc_data.Ids.length);
            //bar.options.grid_xs[0].wide = 120;
            bar.options.grid_xs[0].wide = 0;
            bar.options.grid_xs[0].font_size = "10px";
            bar.options.grid_xs[0].sift_x = 0;
            bar.options.grid_xs[0].border_color = "#CCE";
            bar.options.grid_xs[0].border_width = "2px";
            bar.options.grid_xs[0].border_opacity = 0.5;
            bar.options.grid_xs[0].orient = "bottom";
            bar.options.grid_xs[0].text_anchor = "end";
            bar.options.grid_xs[0].text_rotate = "-90";
        }
        else {
            bar.options.zoom.enable = true;
            
            bar.options.grid_y = new bar.grid_template();
            bar.options.grid_y.ticks = 10;
            bar.options.grid_y.wide = 80;
            bar.options.grid_y.border_color = "#DDC";
            bar.options.grid_y.border_opacity = 0.5;
            bar.options.grid_y.orient = "left";

            bar.options.titles[0] = new bar.title_template(info.title_y);
            bar.options.titles[0].orient = "left";
            bar.options.titles[0].wide = 0;
            bar.options.titles[0].text_anchor = "middle";
            bar.options.titles[0].text_rotate = -90;
            bar.options.titles[0].font_size = "12px";
            bar.options.titles[0].sift_x = 8;
        }
        bar.draw();
        downloader.set_event_listner (divs[i].chart_id);
        
        if (d3.select("#x_sort_0").property("checked")) bar.sort(["sample_ID"], [true]);
        else if (d3.select("#x_sort_1").property("checked")) bar.sort(["value_of_brush"], [true]);
        
        // legend
        var legend = legends[i].obj;
        legend.items =  info.label;
        legend.colors = info.color;
        legend.options.title = info.title;
        legend.layout.shape_sift_left = 70;
        legend.draw_svg(true);
        downloader.set_event_listner (legends[i].chart_id);
    }
}

// *********************************************
// selection events
// *********************************************
function chart_selected(key, on) {
    for (var i = 1; i< divs.length; i++) {
        divs[i].obj.bar_select(key, on);
    }
}

function selection_reset() {
    for (var i = 1; i< divs.length; i++) {
        divs[i].obj.reset_select();
    }
}

// *********************************************
// sort functions
// *********************************************
function sort(name) {
    // call plot's sort function
    for (var i = 0; i< divs.length; i++) {
        divs[i].obj.brush_reset();
        divs[i].obj.zoom_reset();
        divs[i].obj.sort([name], [true]);
    }
}

// *********************************************
// brush events
// *********************************************

var last_brush_selection = [];

function chart_brushed(data, range) {
    
    if (data.length < 2) return;
    
    var updated = false;
    if (data.length != last_brush_selection.length) {
        updated = true;
    }
    else {
        for (var d in data) {
            if (last_brush_selection.indexOf(data[d]) >= 0) {
                updated = true;
                break;
            }
        }
    }
    if (updated == false) return;
    
    for (var i = 1; i< divs.length; i++) {
        divs[i].obj.reset_select();
        divs[i].obj.zoom(data);
    }
}

function brush_reset() {
    for (var i = 0; i< divs.length; i++) {
        divs[i].obj.brush_reset();
        divs[i].obj.zoom_reset();
    }
}


// *********************************************
// save image
// *********************************************
function push_export() {
    
    var svgText = ""
    
    var max_width = 0;
    var sift_y = 0;
    
    // each plot
    for (var i = 0; i < divs.length; i++) {

        // legend
        svgText += downloader.svg_text(legends[i].chart_id, 0, sift_y);
        sift_y += Number(d3.select("#" + legends[i].chart_id).select("svg").style("height").replace("px", ""));
        
        var width = Number(d3.select("#" + legends[i].chart_id).select("svg").style("width").replace("px", ""));
        if (max_width < width) {
            max_width = width;
        }
        
        // chart
        svgText += downloader.svg_text(divs[i].chart_id, 0, sift_y);
        sift_y += Number(d3.select("#" + divs[i].chart_id).select("svg").style("height").replace("px", ""));
        
        width = Number(d3.select("#" + divs[i].chart_id).select("svg").style("width").replace("px", ""));
        if (max_width < width) {
            max_width = width;
        }
    }
    
    svgText = downloader.add_svgtag(svgText, sift_y, max_width)

    rect = utils.absolute_position("dw_btn");
    downloader.createMenu ([rect.x + rect.width, rect.y], "btn", "paplot_qc", max_width, sift_y, svgText);
}

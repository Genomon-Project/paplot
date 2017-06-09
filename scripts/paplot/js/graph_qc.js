// *********************************************
// initialize
// *********************************************
var _DEBUG = false;

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

function svg_resize(item_num) {
    
    var margin_left = 200, margin_right = 80, padding_left = 80, padding_right = 100;
    var bar_min1 = 1, bar_min2 = 6, bar_max = 50;
    
    var w = window.innerWidth - margin_left - margin_right;
    
    if (item_num == undefined) {
        item_num = qc_data.Ids.length;
        
        var w_min1 = item_num * bar_min1 + padding_left;
        var w_min2 = item_num * bar_min2 + padding_left;
        var w_max = item_num * bar_max + padding_left;

        // width
        if (w > w_max) w = w_max;
        if (w < w_min1) w = w_min1;
        var w_extend = w;
        if (w_extend < w_min2) w_extend = w_min2;
        
        return {width_fix: w, width_extend: w_extend + padding_right};
    }
    
    var w_min1 = item_num * bar_min1 + padding_left;
    var w_min2 = item_num * bar_min2 + padding_left;

    // width
    if (w < w_min1) w = w_min1;
    var w_extend = w;
    if (w_extend < w_min2) w_extend = w_min2;
    
    return {width_fix: w, width_extend: w_extend + padding_right};
}

function update_div() {
    
    var w = svg_resize();
    
    for (var i = 0; i < divs.length; i++) {
        
        if (divs[i].chart_id == "chart_brush") {
            d3.select("#" + divs[i].chart_id).style("width", w.width_fix + "px");
            d3.select("#" + divs[i].chart_id).style("height", "120px");
        }
        else {
            d3.select("#" + divs[i].chart_id).style("width", w.width_extend + "px");
            d3.select("#" + divs[i].chart_id).style("height", "240px");
        }
    }
}

function load_tag_data(id) {
    var dataset = qc_data.get_dataset(id);
    var data = [];
    for (var s = 0; s < dataset.data.length; s++) {
        
        for (var d = 0; d < dataset.data[s].length; d++) {
            if (s == 0) data[d] = Number(dataset.data[s][d]);
            else data[d] += Number(dataset.data[s][d]);
        }
    }
    return {"id": id, "data": data, "title": qc_data.get_plot_config(id).title};
}

function init() {

    update_div();
    
    var tag_data = [];
    for (var i = 0; i < divs.length; i++) {
        if (divs[i].chart_id == "chart_brush") {
            continue;
        }
        tag_data.push(load_tag_data(divs[i].chart_id));
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
        
        bar.keys = dataset.key;
        bar.tags[0] = new bar.tag_template("sample_ID");
        bar.tags[0].values = dataset.key;
        bar.tags[0].note = "fix";

        for (var k = 0; k < tag_data.length; k++) {
            bar.tags[k+1] = new bar.tag_template(tag_data[k].id);
            bar.tags[k+1].values = tag_data[k].data;
        }
        
        bar.options.resizeable_w = true;
        bar.options.resizeable_h = false;
        bar.options.multi_select = false;
        bar.options.padding_left = 0;
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
        
        // axis-y
        bar.options.grid_y = new bar.grid_template();
        bar.options.grid_y.wide = 80;
        bar.options.grid_y.orient = "left";
        
        if (divs[i].chart_id == "chart_brush") {
            bar.options.padding_right = 0;
            bar.options.brush.enable = true;
            bar.options.brush.fill = "blue";
            bar.options.brush.stroke = "blue";
            
            bar.options.grid_y.ticks = 2;
            bar.options.grid_y.border_color = style_qc.brush_border_y_color;
            bar.options.grid_y.border_opacity = style_qc.brush_border_y_opacity;
        }
        else {
            bar.options.padding_right = 100;
            bar.options.zoom.enable = true;
            
            bar.options.grid_y.ticks = 10;
            bar.options.grid_y.border_color = style_qc.plot_border_y_color;
            bar.options.grid_y.border_opacity = style_qc.plot_border_y_opacity;
            
            bar.options.titles[0] = new bar.title_template(info.title_y);
            bar.options.titles[0].orient = "left";
            bar.options.titles[0].wide = 0;
            bar.options.titles[0].text_anchor = "middle";
            bar.options.titles[0].text_rotate = -90;
            bar.options.titles[0].font_size = style_qc.title_y_font_size; //"12px";
            bar.options.titles[0].sift_x = Number(style_qc.title_y_font_size.replace("px", "")) * 0.8; //8;
        }
        // for debug
        if (_DEBUG == true) {
            bar.options.grid_xs[0] = new bar.grid_template();
            bar.options.grid_xs[0].keys = dataset.key;
            bar.options.grid_xs[0].labels = dataset.key;
            bar.options.grid_xs[0].wide = 40;
            bar.options.grid_xs[0].font_size = "9px";
            bar.options.grid_xs[0].sift_y = 10;
            bar.options.grid_xs[0].orient = "bottom";
            bar.options.grid_xs[0].text_anchor = "middle";
            bar.options.grid_xs[0].text_rotate = "90";
        }
        
        bar.draw();
        downloader.set_event_listner (divs[i].chart_id);

        // legend
        var legend = legends[i].obj;
        legend.items =  info.label;
        legend.colors = info.color;
        legend.options.title = info.title;
        legend.layout.shape_sift_left = 70;
        legend.layout.title_font_size = Number(style_qc.legend_title_font_size.replace("px",""));
        legend.layout.text_font_size = Number(style_qc.legend_text_font_size.replace("px",""));
        legend.svg_id = legends[i].chart_id;
        legend.draw_svg(true);
        downloader.set_event_listner (legends[i].chart_id);
    }
    
    sort("sample_ID", true);
    
    listbox_items = [["sample_ID", "sample ID"]];
    for (var i = 0; i < tag_data.length; i++) {
        listbox_items.push([tag_data[i].id, tag_data[i].title]);
    }

    d3.select("#sort_list")
        .selectAll("option")
        .data(listbox_items)
        .enter()
        .append("option")
        .attr("value", function(d){ return d[0]})
        .text(function(d){ return d[1] })
    ;
    
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
function sort(name, asc) {
    // call plot's sort function
    
    divs[0].obj.sort([name], [asc]);
    
    for (var i = 1; i< divs.length; i++) {
        divs[i].obj.sort_simple(divs[0].obj.asc.sort_list);
    }
    
}

function click_sort() {
    brush_reset();
    
    var obj = d3.select("#sort_list").selectAll("option");
    var name = "";
    var asc = false;
    for (var i = 0; i < obj[0].length; i++) {
        if (obj[0][i].selected == true) {
            name = obj[0][i].value;
            if (i == 0) {
                asc = true;
            }
            break;
        }
    }
    
    sort(name, asc);
}

function click_reset() {
    brush_reset("sample_ID");
    sort("sample_ID", true);
    
    d3.select("#sort_list").selectAll("option")[0][0].selected = true;
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
    
    var w = svg_resize(data.length);
    
    for (var i = 0; i< divs.length; i++) {
        if (divs[i].chart_id == "chart_brush") {
            continue;
        }
        
        d3.select("#" + divs[i].chart_id).style("width", w.width_extend + "px");
        divs[i].obj.reset_select();
        divs[i].obj.zoom(data);
        
    }
}

function brush_reset() {
    
    var w = svg_resize();
    
    for (var i = 0; i< divs.length; i++) {
        if (divs[i].chart_id == "chart_brush") {
            d3.select("#" + divs[i].chart_id).style("width", w.width_fix + "px");
        }
        else {
            d3.select("#" + divs[i].chart_id).style("width", w.width_extend + "px");
        }
        divs[i].obj.resize();
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

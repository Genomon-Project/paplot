// global params
// main-area
var div_mut_bar_top = new dendrogram("div_bar_top");
var div_mut_bar_left = new dendrogram("div_bar_left");
var div_mut_checker = new mut_checker("div_checker");
var divs = [div_mut_bar_top, div_mut_bar_left, div_mut_checker];
var div_legend = new legend();

// sub-plot
var divs_sub = [];

var plot_layout = {};

// figure options
var BAR_TOP_AXIS_Y = 10;//50;
var BAR_LEFT_AXIS_Y = 40;
var MULTI_SELECT = false;
var SPIN_WAIT = 200;

// dataset
var dataset_id = null;
var dataset_gene = null;

function add_subdiv(id, name, type, pos) {
    divs_sub.push({
        obj: new mut_bar(id + "_p"),
        id: id,
        name: name,
        type: type,
        pos: pos,
    });
    divs.push(divs_sub[divs_sub.length-1].obj);
    return divs_sub[divs_sub.length-1].obj;
}

function update_div() {

    var w_center = Number(d3.select("#div_bar_top").style("width").replace("px", ""));
    var h_top = Number(d3.select("#div_bar_top").style("height").replace("px", ""));
    var w_left = Number(d3.select("#div_bar_left").style("width").replace("px", ""));
    var h_left = Number(d3.select("#div_bar_left").style("height").replace("px", ""));
    
    d3.select("#div_mut1").style("width", w_left + "px");
    d3.select("#div_mut1").style("height", h_top + "px");
    d3.select("#div_checker").style("width", w_center + "px");
    d3.select("#div_checker").style("height", h_left + "px");

    var sub_h = 50;
    
    for (var i = 0; i < divs_sub.length; i++) {
        d3.select("#" + divs_sub[i].id + "_t").style("width", w_left + "px");
        d3.select("#" + divs_sub[i].id + "_t").style("height", sub_h + "px");
        d3.select("#" + divs_sub[i].id + "_p").style("width", w_center + "px");
        d3.select("#" + divs_sub[i].id + "_p").style("height", sub_h + "px");
    }
    
    // save layout
    plot_layout.w_left = w_left;
    plot_layout.w_center = w_center;
    
    if (h_left < plot_layout.legend_h) {
        h_left = plot_layout.legend_h;
    }
    plot_layout.h = h_left;
    plot_layout.sub_h = sub_h;
    
    plot_layout.top_bar_x = w_left;
    plot_layout.top_bar_y = 0;
    plot_layout.left_bar_x = 0;
    plot_layout.left_bar_y = w_left + 10 + sub_h * plot_layout.sub_type1_N;
    plot_layout.checker_x = w_left;
    plot_layout.checker_y = w_left + 10 + sub_h * plot_layout.sub_type1_N;
    plot_layout.legend_x = w_left + w_center;
    plot_layout.legend_y = w_left + 10 + sub_h * plot_layout.sub_type1_N;
    
    plot_layout.sub_type1_x = w_left;
    plot_layout.sub_type1_y = w_left;
    plot_layout.sub_type1_legend_x = w_left + w_center;
    plot_layout.sub_type1_legend_y = w_left;
    
    plot_layout.sub_type2_x = w_left;
    plot_layout.sub_type2_y = w_left + 10 + sub_h * plot_layout.sub_type1_N + h_left;
    plot_layout.sub_type2_legend_x = w_left + w_center;
    plot_layout.sub_type2_legend_y = w_left + 10 + sub_h * plot_layout.sub_type1_N + h_left;
    
}

// *********************************************
// save image
// *********************************************
function push_export() {
    
    var svgText = ""

    // bar-top
    svgText += downloader.svg_text("div_bar_top", plot_layout.top_bar_x, plot_layout.top_bar_y);
    
    // bar-left
    svgText += downloader.svg_text("div_bar_left", plot_layout.left_bar_x, plot_layout.left_bar_y);
    
    // checker
    svgText += downloader.svg_text("div_checker", plot_layout.checker_x, plot_layout.checker_y);
    
    // legend
    div_legend.draw_svg(false);
    svgText += downloader.svg_text("legend_svg", plot_layout.legend_x, plot_layout.legend_y);
    
    // subplot
    for (var i = 0; i < divs_sub.length; i++) {
        
        var x_t = 0, y_t = 0;
        var x_p = 0, y_p = 0;
        var x_l = 0, y_l = 0;
        
        if (divs_sub[i].type == 1) {
            x_t = 0;
            y_t = plot_layout.sub_type1_legend_y + plot_layout.sub_h * i;
            x_p = plot_layout.sub_type1_x;
            y_p = plot_layout.sub_type1_y + plot_layout.sub_h * i;
            x_l = plot_layout.sub_type1_legend_x;
            y_l = plot_layout.sub_type1_legend_y + plot_layout.sub_h * i;
        }
        else if (divs_sub[i].type == 2) {
            x_t = 0;
            y_t = plot_layout.sub_type2_legend_y + plot_layout.sub_h * (i - plot_layout.sub_type1_N);
            x_p = plot_layout.sub_type2_x;
            y_p = plot_layout.sub_type2_y + plot_layout.sub_h * (i - plot_layout.sub_type1_N);
            x_l = plot_layout.sub_type2_legend_x;
            y_l = plot_layout.sub_type2_legend_y + plot_layout.sub_h * (i - plot_layout.sub_type1_N);
        }
        else {
            continue;
        }
        
        // plot
        svgText += downloader.svg_text(divs_sub[i].id + "_p", x_p, y_p);
        
        // legend
        svgText += downloader.svg_text(divs_sub[i].id + "_l_svg", x_l, y_l);
        
        // title
        svgText += downloader.virtual_svg_text(mut_data.subdata[i].title, plot_layout.sub_h, plot_layout.w_left, x_t, y_t, 14, true, "end", "center");
    }
    
    var width = plot_layout.w_left + plot_layout.w_center + plot_layout.w_right;
    var height = plot_layout.w_left + plot_layout.h + plot_layout.sub_h * divs_sub.length + 10;
    svgText = downloader.add_svgtag(svgText, height, width)
    
    rect = utils.absolute_position("dw_btn");
    downloader.createMenu ([rect.x + rect.width, rect.y], "btn", "paplot_mut", width, height, svgText);
}

// *********************************************
// selection events
// *********************************************

// selection status
select_state_template = (function() {
        var select_state_template = function() {
            this.keys = [];
            this.flags = [];
            this.set = function(key, on, multi) {
                if (multi == false) {
                    this.keys = [key];
                    this.flags = [on];
                    return;
                }
                var index = this.keys.indexOf(key);
                if ((on == true) && (index < 0)) {
                    this.keys.push(key);
                    this.flags.push(on);
                }
                else if ((on == false) && (index >= 0)) {
                    this.keys.splice(index, 1);
                    this.flags.splice(index, 1);
                }
            };
        };
        return select_state_template;
    })();
var select_state = {x: new select_state_template, y: new select_state_template};
    
div_mut_bar_left.bar_selected = function(key, on) {
    select_state.y.set(key, on, MULTI_SELECT);
    div_mut_bar_left.bar_select(key, on);
    div_mut_checker.bar_select(null, key, on);
}

div_mut_bar_top.bar_selected = function(key, on) {
    select_state.x.set(key, on, MULTI_SELECT);
    div_mut_bar_top.bar_select(key, on);
    div_mut_checker.bar_select(key, null, on);
    for (var i = 0; i< divs_sub.length; i++) {
        divs_sub[i].obj.bar_select(key, on);
    }
}

div_mut_checker.bar_selected = function(key1, key2, on) {
    select_state.x.set(key1, on, MULTI_SELECT);
    select_state.y.set(key2, on, MULTI_SELECT);
    div_mut_checker.bar_select(key1, key2, on);
    div_mut_bar_left.bar_select(key2, on);
    div_mut_bar_top.bar_select(key1, on);
    for (var i = 0; i< divs_sub.length; i++) {
        divs_sub[i].obj.bar_select(key1, on);
    }
}

function sub_selected(key, on) {
    select_state.x.set(key, on, MULTI_SELECT);
    div_mut_bar_top.bar_select(key, on);
    div_mut_checker.bar_select(key, null, on);
    for (var i = 0; i< divs_sub.length; i++) {
        divs_sub[i].obj.bar_select(key, on);
    }
}

function selection_reset() {
    select_state.x.keys = [];
    select_state.x.flags = [];
    select_state.y.keys = [];
    select_state.y.flags = [];
        
    div_mut_bar_top.reset_select();
    div_mut_bar_left.reset_select();
    div_mut_checker.reset_select();
    for (var i = 0; i< divs_sub.length; i++) {
        divs_sub[i].obj.reset_select();
    }
}

function selection_retry() {

    for (var k in select_state.x.keys) {
        
        div_mut_checker.bar_select(select_state.x.keys[k], null, select_state.x.flags[k]);
        div_mut_bar_top.bar_select(select_state.x.keys[k], select_state.x.flags[k]);
        for (var i = 0; i< divs_sub.length; i++) {
            divs_sub[i].obj.bar_select(select_state.x.keys[k], select_state.x.flags[k]);
        }
    }
    for (var k in select_state.y.keys) {
        
        div_mut_checker.bar_select(null, select_state.y.keys[k], select_state.y.flags[k]);
        div_mut_bar_left.bar_select(select_state.y.keys[k], select_state.y.flags[k]);
    }
}

// *********************************************
// init
// *********************************************

function debg(start, before, now, prefix) {
    console.log(prefix + ":" + (now.getTime() - before)/1000 + ", total: " + (now.getTime() - start)/1000);
}

function order_to_pos(order, list) {
    var idx = [];

    for (var c in list) {
        idx.push(order.indexOf(list[c]));
    }
    return idx;
}

function init() {
    
    // radio button's status of func
    var func_flgs = {};
    for (var i=0; i < mut_data.funcs.length; i++) {
        func_flgs[mut_data.funcs[i]] = true;
    }
    
    dataset_gene = mut_data.get_dataset_gene(func_flgs, 0, 257, ["clust_genes"], [false]);
    d3.select("#filter_all_text").text("{num:,}".format({num: mut_data.genes.length}));
    d3.select("#filter_text").text("{num:,}".format({num: dataset_gene.uncut_length}));
    
    var dataset_checker = mut_data.get_dataset_checker(func_flgs, dataset_gene.total_keys);

    // ---------------------------------------------
    // legend
    // ---------------------------------------------
    div_legend.items   = mut_data.range.label;
    div_legend.colors  = mut_data.range.color
    
    div_legend.options.title = "colors";
    div_legend.layout.shape_sift_left = 10;
    
    div_legend.svg_id = "legend_svg";
    div_legend.draw_svg(true);
    downloader.set_event_listner ("legend_svg");
    
    
    // ---------------------------------------------
    // bar-sample 
    // ---------------------------------------------

    div_mut_bar_top.data = mut_data.cluster_id;
    div_mut_bar_top.options.yoko = false;
    div_mut_bar_top.options.padding_left = 1 + BAR_TOP_AXIS_Y;
    div_mut_bar_top.options.padding_right = 1;
    div_mut_bar_top.options.padding_top = 1;
    div_mut_bar_top.options.padding_bottom = 1;
    div_mut_bar_top.nodes.wide_leaf = 2;
    div_mut_bar_top.nodes.wide_branch = 10;
    
    // ---------------------------------------------
    // bar-gene 
    // ---------------------------------------------

    div_mut_bar_left.data = mut_data.cluster_gene;
    div_mut_bar_left.options.yoko = true;
    div_mut_bar_left.options.padding_left = 1;
    div_mut_bar_left.options.padding_right = 1;
    div_mut_bar_left.options.padding_top = 1;
    div_mut_bar_left.options.padding_bottom = 1 + BAR_LEFT_AXIS_Y;
    div_mut_bar_left.nodes.wide_leaf = 75;
    div_mut_bar_left.nodes.wide_branch = 10;
    div_mut_bar_left.nodes.wide_leaf_lateral = 8;
    
    div_mut_bar_top.draw();
    div_mut_bar_left.draw();
    update_div();
    
    // ---------------------------------------------
    // checker 
    // ---------------------------------------------

    for (var i=0; i < mut_data.funcs.length; i++) {
        var data_index = mut_data.funcs.length - i - 1;
        div_mut_checker.dataset[i] = new div_mut_checker.dataset_template(mut_data.funcs[data_index]);
        div_mut_checker.dataset[i].data = dataset_checker.data[data_index];
        div_mut_checker.dataset[i].keys = dataset_checker.keys[data_index];
        div_mut_checker.dataset[i].keys2 = dataset_checker.keys2[data_index];
        
        div_mut_checker.dataset[i].color.mode = "gradient";
        div_mut_checker.dataset[i].color.fill = mut_data.range.color;
        div_mut_checker.dataset[i].color.range = mut_data.range.value;
    
        div_mut_checker.dataset[i].enable = true;
    };

    div_mut_checker.tooltips = dataset_checker.tooltips;
    div_mut_checker.keys = mut_data.Ids_keys;
    div_mut_checker.keys2 = dataset_gene.total_keys;

    div_mut_checker.tags[0] = new div_mut_checker.tag_template("clust_samples");
    div_mut_checker.tags[0].values = order_to_pos(div_mut_bar_top.cluster.leaves, mut_data.Ids);
    div_mut_checker.tags[0].note = "fix";

    div_mut_checker.tags2[0] = new div_mut_checker.tag_template("clust_genes");
    div_mut_checker.tags2[0].values = order_to_pos(div_mut_bar_left.cluster.leaves, mut_data.genes);
    div_mut_checker.tags2[0].note = "fix";
    
    div_mut_checker.options.resizeable_w = true;
    div_mut_checker.options.resizeable_h = true;
    div_mut_checker.options.tooltip.enable = true;
    div_mut_checker.options.tooltip.position = "bar";
    div_mut_checker.options.multi_select = MULTI_SELECT;
    div_mut_checker.options.bar_padding_x = 0;
    div_mut_checker.options.bar_padding_y = 0;
    div_mut_checker.options.padding_left = 1 + BAR_TOP_AXIS_Y;
    div_mut_checker.options.padding_right = 1;
    div_mut_checker.options.padding_top = 1;
    div_mut_checker.options.padding_bottom = 1 + BAR_LEFT_AXIS_Y;
    div_mut_checker.options.direction_x = "left-right";
    div_mut_checker.options.direction_y = "top-down";
    
    // axis-x
    div_mut_checker.options.grids[0] = new div_mut_checker.grid_template();
    div_mut_checker.options.grids[0].axis = "x";
    div_mut_checker.options.grids[0].labels = new Array(mut_data.Ids_keys.length);
    div_mut_checker.options.grids[0].keys = mut_data.Ids_keys;
    div_mut_checker.options.grids[0].wide = 0;
    div_mut_checker.options.grids[0].font_size = "10px";
    div_mut_checker.options.grids[0].border_color = style_mut.virtical_border_x_color;
    div_mut_checker.options.grids[0].border_width = 0;//style_mut.virtical_border_x_width;
    div_mut_checker.options.grids[0].orient = "bottom";
    div_mut_checker.options.grids[0].text_anchor = "end";
    div_mut_checker.options.grids[0].text_rotate = "-90";
    
    // axis-y
    div_mut_checker.options.grids[1] = new div_mut_checker.grid_template();
    div_mut_checker.options.grids[1].axis = "y";
    div_mut_checker.options.grids[1].labels = new Array(dataset_gene.total_keys.length);
    div_mut_checker.options.grids[1].keys = dataset_gene.total_keys;
    div_mut_checker.options.grids[1].wide = 0;
    div_mut_checker.options.grids[1].font_size = "10px";
    div_mut_checker.options.grids[1].border_color = style_mut.horizon_border_x_color;
    div_mut_checker.options.grids[1].border_width = 0;//style_mut.horizon_border_x_width;

    //div_mut_checker.draw();
    
    // ---------------------------------------------
    // sub-plots
    // ---------------------------------------------
    for (var i = 0; i < divs_sub.length; i++) {
        sub_plot(divs_sub[i]);
    }
    
    // ---------------------------------------------
    // draw
    // ---------------------------------------------
    
    plot_layout.legend_h = Number(d3.select("#legend_html").style("height").replace("px", ""));
    
    // width-right
    var legend_w = Number(d3.select("#legend_html").style("width").replace("px", ""));
    var w_right_max = legend_w;
    
    // subplot
    var sub1_counter = 0;
    var sub2_counter = 0;
    for (var i = 0; i < divs_sub.length; i++) {
        
        var sub_legend_w = Number(d3.select("#" + divs_sub[i].id + "_l_svg").style("width").replace("px", ""));
        if (w_right_max < sub_legend_w) w_right_max = sub_legend_w;
        
        // number of sub-plot
        if (divs_sub[i].type == 1) sub1_counter += 1
        else if (divs_sub[i].type == 2) sub2_counter += 1
    }
    plot_layout.w_right = w_right_max;
    plot_layout.sub_type1_N = sub1_counter;
    plot_layout.sub_type2_N = sub2_counter;
    
    //update_div();
    
    div_mut_checker.draw();
    
    downloader.set_event_listner ("div_bar_top");
    downloader.set_event_listner ("div_bar_left");
    downloader.set_event_listner ("div_checker");
    
    for (var i = 0; i < divs_sub.length; i++) {
        divs_sub[i].obj.draw();
        downloader.set_event_listner (divs_sub[i].id + "_p");
    }
    
    // ---------------------------------------------
    // sort
    // ---------------------------------------------
    {
        // sort axis-x
        div_mut_checker.sort(["clust_samples"], [true], "x");
        
        for (var i = 0; i< divs_sub.length; i++) {
            divs_sub[i].obj.sort(["clust_samples"], [true]);
        }

        // sort axis-y
        div_mut_checker.sort(["clust_genes"], [true], "y");
    }
}

function sub_plot(sub) {
    
    var sub_dataset = mut_data.get_sub_data(sub.name);
    
    for (var i=0; i < sub_dataset.stack.length; i++) {
        sub.obj.dataset[i] = new sub.obj.dataset_template("sub_" + sub.name + "_" + i);
        sub.obj.dataset[i].data = sub_dataset.stack[i].data;
        sub.obj.dataset[i].keys = sub_dataset.stack[i].keys;
        sub.obj.dataset[i].color_fill = sub_dataset.stack[i].color_n;
        sub.obj.dataset[i].enable = true;
    };
    
    sub.obj.tooltips = sub_dataset.tooltips;
    sub.obj.keys = mut_data.Ids;
    sub.obj.tags[0] = new sub.obj.tag_template("clust_samples");
    sub.obj.tags[0].values = mut_data.Ids_keys;
    sub.obj.tags[0].note = "fix";

    sub.obj.options.resizeable_w = true;
    sub.obj.options.resizeable_h = true;
    sub.obj.options.tooltip.enable = true;
    sub.obj.options.tooltip.position = "bar";
    sub.obj.options.multi_select = MULTI_SELECT;
    
    sub.obj.options.bar_padding = 0;
    sub.obj.options.padding_left = 1 + BAR_TOP_AXIS_Y;
    sub.obj.options.padding_right = 1;
    sub.obj.options.padding_top = 1;
    sub.obj.options.padding_bottom = 1;
    
    sub.obj.options.direction_x = "left-right";
    sub.obj.options.direction_y = "bottom-up";

    // bar padding
    sub.obj.options.grid_xs[0] = new sub.obj.grid_template();
    sub.obj.options.grid_xs[0].keys = mut_data.Ids_keys
    sub.obj.options.grid_xs[0].labels = new Array(mut_data.Ids.length);
    sub.obj.options.grid_xs[0].border_color = style_mut.sub_border_color;
    sub.obj.options.grid_xs[0].border_width = style_mut.sub_border_width;
    
    // legend
    var div_sub_legend = new legend();
    div_sub_legend.items   = sub_dataset.label.text;
    div_sub_legend.colors  = sub_dataset.label.color;
    
    div_sub_legend.options.svg_size = [0, 50];
    div_sub_legend.layout.padding_left = 30;
    div_sub_legend.layout.padding_top = 10;
    div_sub_legend.options.horizon = true;
    
    div_sub_legend.svg_id = "div_" + sub.name + "_l_svg";
    div_sub_legend.draw_svg(true);
    downloader.set_event_listner ("div_" + sub.name + "_l_svg");
}

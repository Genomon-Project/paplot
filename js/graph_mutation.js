// global params
// main-area
var div_mut_bar_top = new mut_bar("div_bar_top");
var div_mut_bar_left = new mut_bar("div_bar_left");
var div_mut_checker = new mut_checker("div_checker");
var divs = [div_mut_bar_top, div_mut_bar_left, div_mut_checker];
var div_legend = new legend();

// sub-plot
var divs_sub = [];

var plot_layout = {};

// resize timer
var timer = false;

// sort params
var SORT_STATE_DEFAULT_X = {name_list: ["sample_ID"], asc_list: [true]};
var SORT_STATE_DEFAULT_Y = {name_list: ["number_of_mutations"], asc_list: [false]};

var sort_state = {x: {state: "default"}, y: {state: "default"}};
sort_state.x.name_list = [].concat(SORT_STATE_DEFAULT_X.name_list);
sort_state.x.asc_list = [].concat(SORT_STATE_DEFAULT_X.asc_list);
sort_state.y.name_list = [].concat(SORT_STATE_DEFAULT_Y.name_list);
sort_state.y.asc_list = [].concat(SORT_STATE_DEFAULT_Y.asc_list);

var func_flgs = {};
var genes_length = 0;

// figure options
var BAR_TOP_AXIS_Y = 50;
var BAR_LEFT_AXIS_Y = (Number(style_mut.title_gene_y1_font_size.replace("px", ""))+Number(style_mut.title_gene_y2_font_size.replace("px", ""))) * 2//40;
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

// resize timer
window.addEventListener('resize', function() {
    if (timer !== false) {
        clearTimeout(timer);
    }
    timer = setTimeout(function() {
        update_div();
        for (var i = 0; i < divs.length; i++) {
            divs[i].resize();
        }

    }, 200);
});

function update_div() {

    var margin_left = 100, margin_right = 100;
    
    // width
    var w = (window.innerWidth - margin_left - margin_right - plot_layout.w_right)/(1+4);

    // width-center
    var w_center = w*4;
    var w_center_min = mut_data.Ids.length*6 + BAR_TOP_AXIS_Y;
    var w_center_max = mut_data.Ids.length*50 + BAR_TOP_AXIS_Y;
    
    if (w_center < w_center_min) w_center = w_center_min;
    if (w_center > w_center_max) w_center = w_center_max;
    
    // width-left
    var w_left = w;
    var w_left_min = 200;
    var w_left_max = 600;
    
    if (w_left < w_left_min) w_left = w_left_min;
    if (w_left > w_left_max) w_left = w_left_max;

    // height
    var h = genes_length * 12 + BAR_LEFT_AXIS_Y;
    
    w_left = Math.floor(w_left);
    w_center = Math.floor(w_center);
    h = Math.floor(h);
    
    d3.select("#div_mut1").style("width", w_left + "px");
    d3.select("#div_mut1").style("height", w_left + "px");
    d3.select("#div_bar_top").style("width", w_center + "px");
    d3.select("#div_bar_top").style("height", w_left + "px");
    
    d3.select("#div_bar_left").style("width", w_left + "px");
    d3.select("#div_bar_left").style("height", h + "px");
    d3.select("#div_checker").style("width", w_center + "px");
    d3.select("#div_checker").style("height", h + "px");

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
    
    if (h < plot_layout.legend_h) {
        h = plot_layout.legend_h;
    }
    plot_layout.h = h;
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
    plot_layout.sub_type2_y = w_left + 10 + sub_h * plot_layout.sub_type1_N + h;
    plot_layout.sub_type2_legend_x = w_left + w_center;
    plot_layout.sub_type2_legend_y = w_left + 10 + sub_h * plot_layout.sub_type1_N + h;
    
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
// change view gene function
// *********************************************

function filter_sample() {
    var text = d3.select("#viewsample_mutation_max").property("value");
    if (text == "") {
        div_mut_bar_top.set_bar_max(0);
    }
    else {
        div_mut_bar_top.set_bar_max(parseInt(text));
    }
}

function filter_gene() {

    d3.select("#spin").classed("hidden", false);
    
    timer = setTimeout(function() {
        filter_gene_exec();
        d3.select("#spin").classed("hidden", true);
        clearTimeout(timer);
    }, SPIN_WAIT);
    
}

function filter_gene_exec() {

    sort_reset("x");
    
    var gene_th = parseInt(d3.select("#viewgene_rate").property("value"));
    var gene_max = parseInt(d3.select("#viewgene_number").property("value"));
    
    dataset_gene = mut_data.get_dataset_gene(func_flgs, gene_th, gene_max, sort_state.y.name_list, sort_state.y.asc_list);
    d3.select("#filter_text").text("{num:,}".format({num: dataset_gene.uncut_length}));
    var dataset_checker = mut_data.get_dataset_checker(func_flgs, dataset_gene.total_keys);
    
    genes_length = dataset_gene.total_keys.length;
    update_div();
    update_gene_listbox(dataset_gene.total_names);
    
    // bar-left update
    {
        for (var i=0; i < dataset_gene.keys.length; i++) {
            var data_index = dataset_gene.keys.length - i - 1;
            div_mut_bar_left.dataset[i].data = dataset_gene.data[data_index];
            div_mut_bar_left.dataset[i].keys = dataset_gene.keys[data_index];
        };
        
        div_mut_bar_left.tooltips = dataset_gene.tooltips;
        div_mut_bar_left.keys = dataset_gene.total_keys;
        div_mut_bar_left.tags[0].values = dataset_gene.total_names;
        div_mut_bar_left.tags[1].values = dataset_gene.total_nums;
        div_mut_bar_left.options.grid_xs[0].labels = dataset_gene.total_names;
        div_mut_bar_left.options.grid_xs[0].keys = dataset_gene.total_keys;

        div_mut_bar_left.update();
    }
    
    // checker update
    {
        for (var i=0; i < dataset_checker.keys.length; i++) {
            var data_index = dataset_checker.keys.length - i - 1;
            div_mut_checker.dataset[i].data = dataset_checker.data[data_index];
            div_mut_checker.dataset[i].keys = dataset_checker.keys[data_index];
            div_mut_checker.dataset[i].keys2 = dataset_checker.keys2[data_index];
            
            
        };
        div_mut_checker.tooltips = dataset_checker.tooltips;
        div_mut_checker.keys2 = dataset_gene.total_keys;
        div_mut_checker.tags2[0].values = dataset_gene.total_keys;
        div_mut_checker.tags2[1].values = dataset_gene.total_nums;
        div_mut_checker.options.grids[1].labels = new Array(dataset_gene.total_keys.length);
        div_mut_checker.options.grids[1].keys = dataset_gene.total_keys;
        
        div_mut_checker.update();
    }
    
    // sort
    {
        div_mut_bar_left.sort(sort_state.y.name_list, sort_state.y.asc_list);
        div_mut_checker.sort(sort_state.y.name_list, sort_state.y.asc_list, "y");
        
        if (sort_state.x.state == "waterfall") {
            sort_waterfall_exec();
        }
    }
    selection_retry();
}

// *********************************************
// change stack function
// *********************************************

div_legend.stack_change = function(d, i, on) {

    d3.select("#spin").classed("hidden", false);

    timer = setTimeout(function() {
        change_stack_exec(d, on);
        d3.select("#spin").classed("hidden", true);
        clearTimeout(timer);
    }, SPIN_WAIT);
}

function change_stack_exec(name, on) {

    d3.select("#spin").classed("hidden", false);
    
    func_flgs[name] = on;
    var gene_th = parseInt(d3.select("#viewgene_rate").property("value"));
    var gene_max = parseInt(d3.select("#viewgene_number").property("value"));

    dataset_gene = mut_data.get_dataset_gene(func_flgs, gene_th, gene_max, sort_state.y.name_list, sort_state.y.asc_list);
    d3.select("#filter_text").text("{num:,}".format({num: dataset_gene.uncut_length}));
    var dataset_checker = mut_data.get_dataset_checker(func_flgs, dataset_gene.total_keys);
    
    genes_length = dataset_gene.total_keys.length;
    
    update_div();
    update_gene_listbox(dataset_gene.total_names);
    
    // bar-left update
    {
        for (var i=0; i < dataset_gene.keys.length; i++) {
            var data_index = dataset_gene.keys.length - i - 1;
            div_mut_bar_left.dataset[i].data = dataset_gene.data[data_index];
            div_mut_bar_left.dataset[i].keys = dataset_gene.keys[data_index];
            
            div_mut_bar_left.dataset[i].enable = func_flgs[mut_data.funcs[data_index]];
        };
        
        div_mut_bar_left.tooltips = dataset_gene.tooltips;
        div_mut_bar_left.keys = dataset_gene.total_keys;
        div_mut_bar_left.tags[0].values = dataset_gene.total_names;
        div_mut_bar_left.tags[1].values = dataset_gene.total_nums;
        div_mut_bar_left.options.grid_xs[0].labels = dataset_gene.total_names;
        div_mut_bar_left.options.grid_xs[0].keys = dataset_gene.total_keys;

        div_mut_bar_left.update();
    }
    // bar-top update
    {
        for (var f = 0; f < div_mut_bar_top.dataset.length; f++) {
            div_mut_bar_top.dataset[f].enable = func_flgs[div_mut_bar_top.dataset[f].name];
        }
        div_mut_bar_top.change_stack();
    }
    // checker update
    {
        for (var i=0; i < dataset_checker.keys.length; i++) {
            var data_index = dataset_checker.keys.length - i - 1;
            div_mut_checker.dataset[i].data = dataset_checker.data[data_index];
            div_mut_checker.dataset[i].keys = dataset_checker.keys[data_index];
            div_mut_checker.dataset[i].keys2 = dataset_checker.keys2[data_index];
            
            div_mut_checker.dataset[i].enable = func_flgs[mut_data.funcs[data_index]];
        };
        
        div_mut_checker.tooltips = dataset_checker.tooltips;
        div_mut_checker.keys2 = dataset_gene.total_keys;
        div_mut_checker.tags2[0].values = dataset_gene.total_names;
        div_mut_checker.tags2[1].values = dataset_gene.total_nums;
        div_mut_checker.options.grids[1].labels = new Array(dataset_gene.total_keys.length);
        div_mut_checker.options.grids[1].keys = dataset_gene.total_keys;
        
        div_mut_checker.update();
    }
    // update sort-tag
    {
        var id_nums = mut_data.get_id_nums(func_flgs, dataset_id.data, dataset_id.keys);
        
        for (var o = 0; o < divs.length; o++) {
            for (var i = 0; i < divs[o].tags.length; i++) {
                if (divs[o].tags[i].note == "fix") continue;
                if (divs[o].tags[i].note == "sub") continue;
                
                if (divs[o].tags[i].note == "id_num") {
                    divs[o].tags[i].values = id_nums;
                }
                if (divs[o].tags[i].note == "water-fall") {
                    divs[o].tags[i].values = mut_data.get_id_flg_par_gene(divs[o].tags[i].name, func_flgs);
                }
            }
            
            // o == 2 (rect) ‚Ì‚Æ‚«Atag2‚à’Ê‚·
            if (o != 2) continue;
            
            for (var i = 0; i < divs[o].tags2.length; i++) {
                if (divs[o].tags2[i].note == "fix") continue;
                if (divs[o].tags2[i].note == "sub") continue;
                
                if (divs[o].tags2[i].note == "id_num") {
                    divs[o].tags2[i].values = id_nums;
                }
                if (divs[o].tags2[i].note == "water-fall") {
                    divs[o].tags2[i].values = mut_data.get_id_flg_par_gene(divs[o].tags[i].name, func_flgs);
                }
            }
        }
    }
    // sort
    {
        // sort axis-x
        if (sort_state.x.state == "waterfall") {
            sort_waterfall_exec();
        }
        else {
            div_mut_bar_top.sort(sort_state.x.name_list, sort_state.x.asc_list);
            div_mut_checker.sort(sort_state.x.name_list, sort_state.x.asc_list, "x");
            
            for (var i = 0; i< divs_sub.length; i++) {
                divs_sub[i].obj.sort(sort_state.x.name_list, sort_state.x.asc_list);
            }
        }

        // sort axis-y
        div_mut_bar_left.sort(sort_state.y.name_list, sort_state.y.asc_list);
        div_mut_checker.sort(sort_state.y.name_list, sort_state.y.asc_list, "y");
    }
    selection_retry();
}

// *********************************************
// sort functions
// *********************************************

function sort_reset(axis) {
    
    if (axis == "x") {
        sort_state.x.name_list = [].concat(SORT_STATE_DEFAULT_X.name_list);
        sort_state.x.asc_list = [].concat(SORT_STATE_DEFAULT_X.asc_list);
        sort_state.x.state = "default";

        div_mut_bar_top.sort(sort_state.x.name_list, sort_state.x.asc_list);
        div_mut_checker.sort(sort_state.x.name_list, sort_state.x.asc_list, "x");
        
        d3.select("#sort_x_text").text("sample_ID(ASC)");
        
        d3.select("#xID_0").property("checked", true);
        d3.select("#xNum_0").property("checked", true);
        d3.select("#xGene_0").property("checked", true);
        d3.select("#gene_list").selectAll("option")[0][0].selected = true;
        
        for (var i = 0; i < divs_sub.length; i++) {
            divs_sub[i].obj.sort([divs_sub[i].obj.tags[0].name], [true]);
            d3.select("#xSub" + i + "_0").property("checked", true);
        }
        
        d3.select("#waterfall_number").property("value", 30);
    }
    else if (axis == "y") {
        sort_state.y.name_list = [].concat(SORT_STATE_DEFAULT_Y.name_list);
        sort_state.y.asc_list = [].concat(SORT_STATE_DEFAULT_Y.asc_list);
        sort_state.y.state = "default";
        
        d3.select("#sort_y_text").text("number_of_mutations(DESC)");
        d3.select("#yNum_0").property("checked", true);
        d3.select("#yGene_0").property("checked", true);

        filter_gene();
    }
}

function sort(name, option_value, axis) {

    var state = sort_state[axis];
    
    // delete my name
    var index = state.name_list.indexOf(name)
    if (index >= 0) {
        state.name_list.splice(index, 1);
        state.asc_list.splice(index, 1);
    }
    
    if (option_value == 0) {
        // if sort condisions are blank, set default
        if (state.name_list.length == 0) {
            sort_reset(axis);
        }
    }
    else{
        var asc_flg = true;
        if (option_value == 2) asc_flg = false;
        
        // if sort state == initial, delete default.
        if (state.state == "default") {
            state.name_list = [name];
            state.asc_list = [asc_flg];
            state.state = "";
        }
        else {
            state.name_list.push(name);
            state.asc_list.push(asc_flg);
        }
    }
    
    // call plot's sort function
    if (axis == "x") {
        
        div_mut_bar_top.sort(state.name_list, state.asc_list);
        div_mut_checker.sort(state.name_list, state.asc_list, "x");
        for (var i = 0; i< divs_sub.length; i++) {
            divs_sub[i].obj.tags[1].values = mut_data.get_id_nums(func_flgs, dataset_id.data, dataset_id.keys);
            divs_sub[i].obj.sort(state.name_list, state.asc_list);
        }
    }
    else if (axis == "y") {
        filter_gene();
    }
    
    // update page's text
    var text = "";
    for (var i = 0; i< state.name_list.length; i++) {
        if (i == 0) text = state.name_list[i];
        else text = text + " -> " + state.name_list[i];
        
        if (state.asc_list[i]) text = text + "(ASC)";
        else text = text + "(DESC)";
    }
    d3.select("#sort_" + axis + "_text").text(text);
}

function sort_gene() {
    var asc = 0;
    if (d3.select("#xGene_0").property("checked")) asc = 0;
    else if(d3.select("#xGene_1").property("checked")) asc = 1;
    else if(d3.select("#xGene_2").property("checked")) asc = 2;
    
    var obj = d3.select("#gene_list").selectAll("option");
    var name = "";
    for (var i = 0; i < obj[0].length; i++) {
        if (obj[0][i].selected == true) {
            //name = obj[0][i].value;
            name = mut_data.genes_keys[mut_data.genes.indexOf(obj[0][i].value)];
            break;
        }
    }
    
    // add list to tag
    var list = mut_data.get_id_flg_par_gene(name, func_flgs);
    var tag_name = name;
    
    add_tag(div_mut_bar_top, div_mut_bar_top.tags, tag_name, list, "water-fall");
    add_tag(div_mut_checker, div_mut_checker.tags, tag_name, list, "water-fall");
    
    for (var i = 0; i< divs_sub.length; i++) {
        add_tag(divs_sub[i].obj, divs_sub[i].obj.tags, tag_name, list, "water-fall");
    }
    
    // sort
    sort(tag_name, asc, "x");
}

function sort_waterfall() {

    d3.select("#spin").classed("hidden", false);
    
    timer = setTimeout(function() {
        sort_waterfall_exec();
        d3.select("#spin").classed("hidden", true);
        clearTimeout(timer);
    }, SPIN_WAIT);
}

function sort_waterfall_exec() {
    sort_reset("x");
    sort_reset("y");
    
    var genes = [];
    for (var g = 0; g< dataset_gene.total_nums.length; g++) {
        genes.push([dataset_gene.total_keys[g], dataset_gene.total_nums[g]]);
    }
    
    genes.sort(function(a,b){
        if( a[1] < b[1] ) return 1;
        if( a[1] > b[1] ) return -1;
        return 0;
    });
    
    var waterfall_max = parseInt(d3.select("#waterfall_number").property("value"));
    for (var g = 0; g< genes.length; g++) {
        if (genes[g][1] < 1) break;
        if (g >= waterfall_max) break;
        // add list to tag
        var tag_name = genes[g][0];
        var list = mut_data.get_id_flg_par_gene(tag_name, func_flgs);
        
        
        add_tag(div_mut_bar_top, div_mut_bar_top.tags, tag_name, list, "water-fall");
        add_tag(div_mut_checker, div_mut_checker.tags, tag_name, list, "water-fall");
        
        for (var i = 0; i< divs_sub.length; i++) {
            add_tag(divs_sub[i].obj, divs_sub[i].obj.tags, tag_name, list, "water-fall");
        }
        
        // sort
        sort(tag_name, 2, "x");
        sort_state.x.state = "waterfall";
    }
}

function sort_sub(index, asc) {
    var name = divs_sub[index].obj.tags[2].name;
    var list = divs_sub[index].obj.tags[2].values;
    
    add_tag(div_mut_bar_top, div_mut_bar_top.tags, name, list, "sub");
    add_tag(div_mut_checker, div_mut_checker.tags, name, list, "sub");
    
    for (var i = 0; i< divs_sub.length; i++) {
        if (i == index) continue;
        add_tag(divs_sub[i].obj, divs_sub[i].obj.tags, name, list, "sub");
    }
    sort(name, asc, "x");
    
}

function add_tag(obj, tags, name, list, note) {
    var find = false;
    for (var i = 2; i < tags.length; i++) {
        if (tags[i].name == name) {
            find = true;
            break;
        }
    }
    if (find == false) {
        var pos = tags.length;
        tags[pos] = new obj.tag_template(name);
        tags[pos].values = list;
        tags[pos].note = note;
    }
}

// ---------------------------------------------
// gene list-box
// ---------------------------------------------
function update_gene_listbox(genes) {

    listbox_items = [];
    for (var i = 0; i < genes.length; i++) {
        listbox_items.push(genes[i]);
    }
    listbox_items.sort(function(a,b){
        if( a < b ) return -1;
        if( a > b ) return 1;
        return 0;
    });
    
    d3.select("#gene_list")
      .selectAll("option")
      .remove();
    
    d3.select("#gene_list")
      .selectAll("option")
      .data(listbox_items)
      .enter()
      .append("option")
      .attr("value", function(d){ return d})
      .attr("selected", function(d, i){ if(i == 0) return "selected"})
      .text(function(d){ return d });
}

// *********************************************
// init
// *********************************************

function debg(start, before, now, prefix) {
    console.log(prefix + ":" + (now.getTime() - before)/1000 + ", total: " + (now.getTime() - start)/1000);
}
function init() {
    
    // radio button's status of func
    for (var i=0; i < mut_data.funcs.length; i++) {
        func_flgs[mut_data.funcs[i]] = true;
    }
    
    dataset_id = mut_data.get_dataset_id();
    
    var gene_th = parseInt(d3.select("#viewgene_rate").property("value"));
    var gene_max = parseInt(d3.select("#viewgene_number").property("value"));
    if (sort_state.y.name_list.length == 0) {
        sort_state.y.name_list = ["number_of_mutations"];
        sort_state.y.asc_list = [false];
    }
    
    dataset_gene = mut_data.get_dataset_gene(func_flgs, gene_th, gene_max, sort_state.y.name_list, sort_state.y.asc_list);
    d3.select("#filter_all_text").text("{num:,}".format({num: mut_data.genes.length}));
    d3.select("#filter_text").text("{num:,}".format({num: dataset_gene.uncut_length}));
    
    var dataset_checker = mut_data.get_dataset_checker(func_flgs, dataset_gene.total_keys);

    genes_length = dataset_gene.total_keys.length;
    update_gene_listbox(dataset_gene.total_keys);
    
    // ---------------------------------------------
    // legend
    // ---------------------------------------------
    div_legend.items   = mut_data.funcs;
    div_legend.colors  = mut_data.func_colors_n;
    
    div_legend.options.title = style_mut.legend_title;
    div_legend.layout.shape_sift_left = 10;
    div_legend.layout.title_font_size = Number(style_mut.legend_title_font_size.replace("px",""));
    div_legend.layout.text_font_size = Number(style_mut.legend_text_font_size.replace("px",""));
    
    div_legend.html_id = "legend_html";
    div_legend.svg_id = "legend_svg";
    div_legend.draw_html();
    div_legend.draw_svg(false);
    downloader.set_event_listner ("legend_svg");
    
    
    // ---------------------------------------------
    // bar-sample 
    // ---------------------------------------------

    for (var i=0; i < mut_data.funcs.length; i++) {
        var data_index = mut_data.funcs.length - i - 1;
        div_mut_bar_top.dataset[i] = new div_mut_bar_top.dataset_template(mut_data.funcs[data_index]);
        div_mut_bar_top.dataset[i].data = dataset_id.data[data_index];
        div_mut_bar_top.dataset[i].keys = dataset_id.keys[data_index];
        div_mut_bar_top.dataset[i].color_fill = mut_data.func_colors_n[data_index];
        div_mut_bar_top.dataset[i].enable = true;
    };
    
    div_mut_bar_top.tooltips = dataset_id.tooltips;
    
    div_mut_bar_top.keys = mut_data.Ids_keys;
    div_mut_bar_top.tags[0] = new div_mut_bar_top.tag_template("sample_ID");
    div_mut_bar_top.tags[0].values = mut_data.Ids_keys;
    div_mut_bar_top.tags[0].note = "fix";
    div_mut_bar_top.tags[1] = new div_mut_bar_top.tag_template("number_of_mutations");
    div_mut_bar_top.tags[1].values = mut_data.get_id_nums(func_flgs, dataset_id.data, dataset_id.keys);
    div_mut_bar_top.tags[1].note = "id_num";
    
    div_mut_bar_top.options.resizeable_w = true;
    div_mut_bar_top.options.resizeable_h = true;
    div_mut_bar_top.options.tooltip.enable = true;
    div_mut_bar_top.options.tooltip.position = "bar";
    div_mut_bar_top.options.multi_select = MULTI_SELECT;
    div_mut_bar_top.options.bar_padding = 0;
    div_mut_bar_top.options.padding_left = 1;
    div_mut_bar_top.options.padding_right = 1;
    div_mut_bar_top.options.padding_top = 1;
    div_mut_bar_top.options.padding_bottom = 1;
    div_mut_bar_top.options.direction_x = "left-right";
    div_mut_bar_top.options.direction_y = "bottom-up";
    
    div_mut_bar_top.options.grid_y = new div_mut_bar_top.grid_template();
    div_mut_bar_top.options.grid_y.ticks = 2;
    div_mut_bar_top.options.grid_y.wide = BAR_TOP_AXIS_Y;
    div_mut_bar_top.options.grid_y.border_color = style_mut.virtical_border_y_color;
    div_mut_bar_top.options.grid_y.border_opacity = style_mut.virtical_border_y_opacity;
    div_mut_bar_top.options.grid_y.orient = "left";
    
    div_mut_bar_top.options.grid_xs[0] = new div_mut_bar_top.grid_template();
    div_mut_bar_top.options.grid_xs[0].keys = mut_data.Ids
//    div_mut_bar_top.options.grid_xs[0].labels = mut_data.Ids;
    div_mut_bar_top.options.grid_xs[0].labels = new Array(mut_data.Ids.length);
//    div_mut_bar_top.options.grid_xs[0].wide = 120;
    div_mut_bar_top.options.grid_xs[0].wide = 10;
    div_mut_bar_top.options.grid_xs[0].font_size = "9px";
    div_mut_bar_top.options.grid_xs[0].sift_x = 4;
    div_mut_bar_top.options.grid_xs[0].border_color = style_mut.virtical_border_x_color;
    div_mut_bar_top.options.grid_xs[0].border_width = style_mut.virtical_border_x_width;
    div_mut_bar_top.options.grid_xs[0].orient = "bottom";
    div_mut_bar_top.options.grid_xs[0].text_anchor = "end";
    div_mut_bar_top.options.grid_xs[0].text_rotate = "-90";

    div_mut_bar_top.options.titles[0] = new div_mut_bar_top.title_template(style_mut.title_sample);
    div_mut_bar_top.options.titles[0].orient = "top";
    div_mut_bar_top.options.titles[0].wide = 30;
    div_mut_bar_top.options.titles[0].text_anchor = "middle";
    div_mut_bar_top.options.titles[0].text_rotate = 0;
    div_mut_bar_top.options.titles[0].font_size = style_mut.title_sample_font_size;
    div_mut_bar_top.options.titles[1] = new div_mut_bar_top.title_template(style_mut.title_sample_y);
    div_mut_bar_top.options.titles[1].orient = "left";
    div_mut_bar_top.options.titles[1].wide = 0;
    div_mut_bar_top.options.titles[1].text_anchor = "middle";
    div_mut_bar_top.options.titles[1].text_rotate = -90;
    div_mut_bar_top.options.titles[1].font_size = style_mut.title_sample_y_font_size; //"12px";
    div_mut_bar_top.options.titles[1].sift_x = Number(style_mut.title_sample_y_font_size.replace("px", "")) * 0.8; //8;
    
    //div_mut_bar_top.draw();
    
    // ---------------------------------------------
    // bar-gene 
    // ---------------------------------------------

    for (var i=0; i < mut_data.funcs.length; i++) {
        var data_index = mut_data.funcs.length - i - 1;
        div_mut_bar_left.dataset[i] = new div_mut_bar_left.dataset_template(mut_data.funcs[data_index]);
        div_mut_bar_left.dataset[i].data = dataset_gene.data[data_index];
        div_mut_bar_left.dataset[i].keys = dataset_gene.keys[data_index];
        div_mut_bar_left.dataset[i].color_fill = mut_data.func_colors_n[data_index];
        div_mut_bar_left.dataset[i].enable = true;
    };
    
    div_mut_bar_left.tooltips = dataset_gene.tooltips;
    div_mut_bar_left.keys = dataset_gene.total_keys;
    div_mut_bar_left.tags[0] = new div_mut_bar_left.tag_template("name");
    div_mut_bar_left.tags[0].values = dataset_gene.total_names;
    div_mut_bar_left.tags[0].note = "fix";
    div_mut_bar_left.tags[1] = new div_mut_bar_left.tag_template("number_of_mutations");
    div_mut_bar_left.tags[1].values = dataset_gene.total_nums;
    div_mut_bar_left.tags[1].note = "gene_num";
    
    div_mut_bar_left.options.resizeable_w = true;
    div_mut_bar_left.options.resizeable_h = true;
    div_mut_bar_left.options.tooltip.enable = true;
    div_mut_bar_left.options.tooltip.position = "bar";
    div_mut_bar_left.options.multi_select = MULTI_SELECT;
    div_mut_bar_left.options.bar_padding = 0;
    div_mut_bar_left.options.padding_left = 1;
    div_mut_bar_left.options.padding_right = 1;
    div_mut_bar_left.options.padding_top = 1;
    div_mut_bar_left.options.padding_bottom = 1;
    div_mut_bar_left.options.direction_x = "top-down";;
    div_mut_bar_left.options.direction_y = "right-left";
    
    div_mut_bar_left.options.grid_y = new div_mut_bar_left.grid_template();
    div_mut_bar_left.options.grid_y.ticks = 2;
    div_mut_bar_left.options.grid_y.wide = BAR_LEFT_AXIS_Y;
    div_mut_bar_left.options.grid_y.border_color = style_mut.horizon_border_y_color;
    div_mut_bar_left.options.grid_y.border_opacity = style_mut.horizon_border_y_opacity;
    div_mut_bar_left.options.grid_y.orient = "bottom";
    
    div_mut_bar_left.options.grid_xs[0] = new div_mut_bar_left.grid_template();
    div_mut_bar_left.options.grid_xs[0].labels = dataset_gene.total_names;
    div_mut_bar_left.options.grid_xs[0].keys = dataset_gene.total_keys;
    div_mut_bar_left.options.grid_xs[0].wide = 80;
    div_mut_bar_left.options.grid_xs[0].font_size = style_mut.gene_text_font_size;//"9px";
    div_mut_bar_left.options.grid_xs[0].sift_y = 4;
    div_mut_bar_left.options.grid_xs[0].border_color = style_mut.horizon_border_x_color;
    div_mut_bar_left.options.grid_xs[0].border_width = style_mut.horizon_border_x_width;
    div_mut_bar_left.options.grid_xs[0].orient = "right";
    div_mut_bar_left.options.grid_xs[0].text_anchor = "start";
    div_mut_bar_left.options.grid_xs[0].text_rotate = "0";

    div_mut_bar_left.options.titles[0] = new div_mut_bar_left.title_template(style_mut.title_gene);
    div_mut_bar_left.options.titles[0].orient = "left";
    div_mut_bar_left.options.titles[0].wide = 30;
    div_mut_bar_left.options.titles[0].text_anchor = "middle";
    div_mut_bar_left.options.titles[0].text_rotate = -90;
    div_mut_bar_left.options.titles[0].font_size = style_mut.title_gene_font_size;
    div_mut_bar_left.options.titles[1] = new div_mut_bar_left.title_template(style_mut.title_gene_y1);
    div_mut_bar_left.options.titles[1].orient = "bottom";
    div_mut_bar_left.options.titles[1].wide = 0;
    div_mut_bar_left.options.titles[1].text_anchor = "middle";
    div_mut_bar_left.options.titles[1].text_rotate = 0;
    div_mut_bar_left.options.titles[1].font_size = style_mut.title_gene_y1_font_size; //"12px";
    div_mut_bar_left.options.titles[1].sift_y = Number(style_mut.title_gene_y1_font_size.replace("px", "")) * (-0.2) -Number(style_mut.title_gene_y2_font_size.replace("px", "")); //-20;
    div_mut_bar_left.options.titles[2] = new div_mut_bar_left.title_template(style_mut.title_gene_y2);
    div_mut_bar_left.options.titles[2].orient = "bottom";
    div_mut_bar_left.options.titles[2].wide = 0;
    div_mut_bar_left.options.titles[2].text_anchor = "middle";
    div_mut_bar_left.options.titles[2].text_rotate = 0;
    div_mut_bar_left.options.titles[2].font_size = style_mut.title_gene_y2_font_size; //"12px";
    div_mut_bar_left.options.titles[2].sift_y = Number(style_mut.title_gene_y2_font_size.replace("px", "")) * (-0.2); //-8;
    
    //div_mut_bar_left.draw();
    
    // ---------------------------------------------
    // checker 
    // ---------------------------------------------

    for (var i=0; i < mut_data.funcs.length; i++) {
        var data_index = mut_data.funcs.length - i - 1;
        div_mut_checker.dataset[i] = new div_mut_checker.dataset_template(mut_data.funcs[data_index]);
        div_mut_checker.dataset[i].data = dataset_checker.data[data_index];
        div_mut_checker.dataset[i].keys = dataset_checker.keys[data_index];
        div_mut_checker.dataset[i].keys2 = dataset_checker.keys2[data_index];
        //div_mut_checker.dataset[i].color_fill = mut_data.func_colors_n[data_index];
        
        div_mut_checker.dataset[i].color.mode = "mono";
        div_mut_checker.dataset[i].color.fill = mut_data.func_colors_n[data_index];
        
        div_mut_checker.dataset[i].enable = true;
    };

    div_mut_checker.tooltips = dataset_checker.tooltips;
    div_mut_checker.keys = mut_data.Ids_keys;
    div_mut_checker.keys2 = dataset_gene.total_keys;

    div_mut_checker.tags[0] = new div_mut_checker.tag_template("sample_ID");
    div_mut_checker.tags[0].values = mut_data.Ids;
    div_mut_checker.tags[0].note = "fix";
    div_mut_checker.tags[1] = new div_mut_checker.tag_template("number_of_mutations");
    div_mut_checker.tags[1].values = div_mut_bar_top.tags[1].values;
    div_mut_checker.tags[1].note = "id_num";

    div_mut_checker.tags2[0] = new div_mut_checker.tag_template("name");
    div_mut_checker.tags2[0].values = dataset_gene.total_names;
    div_mut_checker.tags2[0].note = "fix";
    div_mut_checker.tags2[1] = new div_mut_checker.tag_template("number_of_mutations");
    div_mut_checker.tags2[1].values = dataset_gene.total_nums;
    div_mut_checker.tags2[1].note = "gene_num";
    
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
    div_mut_checker.options.grids[0].border_width = style_mut.virtical_border_x_width;
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
    div_mut_checker.options.grids[1].border_width = style_mut.horizon_border_x_width;

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
    
    update_div();
    div_mut_bar_top.draw();
    div_mut_bar_left.draw();
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
        div_mut_bar_top.sort(sort_state.x.name_list, sort_state.x.asc_list);
        div_mut_checker.sort(sort_state.x.name_list, sort_state.x.asc_list, "x");
        
        for (var i = 0; i< divs_sub.length; i++) {
            divs_sub[i].obj.sort(sort_state.x.name_list, sort_state.x.asc_list);
        }

        // sort axis-y
        div_mut_bar_left.sort(sort_state.y.name_list, sort_state.y.asc_list);
        div_mut_checker.sort(sort_state.y.name_list, sort_state.y.asc_list, "y");
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
    sub.obj.tags[0] = new sub.obj.tag_template("sample_ID");
    sub.obj.tags[0].values = mut_data.Ids_keys;
    sub.obj.tags[0].note = "fix";
    sub.obj.tags[1] = new sub.obj.tag_template("number_of_mutations");
    sub.obj.tags[1].values = div_mut_bar_top.tags[1].values;
    sub.obj.tags[1].note = "id_num";
    sub.obj.tags[2] = new sub.obj.tag_template("sub_" + sub.name);
    sub.obj.tags[2].values = mut_data.get_sub_values(sub.name);
    sub.obj.tags[2].note = "fix";

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
    div_sub_legend.layout.title_font_size = Number(style_mut.legend_title_font_size.replace("px", ""));
    div_sub_legend.layout.text_font_size = Number(style_mut.legend_text_font_size.replace("px", ""));
    div_sub_legend.options.horizon = true;
    
    div_sub_legend.svg_id = "div_" + sub.name + "_l_svg"
    div_sub_legend.draw_svg(true);
    downloader.set_event_listner ("div_" + sub.name + "_l_svg");
}

// global params
var _DEBUG = false;

var change_list = ["ca","cg","ct","ta","tc","tg"];
var SIGNATURE_W = 0;//450;
var SIGNATURE_H = 200;//150;
var SIGNATURE_TITLE_H = 20;
var SIGNATURE_LEG_H = 50;
var SIGNATURE_AXIS_YW = 100;

var divs = [];
var div_integral = new mut_bar("div_integral");
var div_rate = new mut_bar("div_rate");
var chart_mode = 0;

function add_div(name) {
    divs.push(name);
}

// resize timer
var timer = false;

window.addEventListener('resize', function() {
    if (timer !== false) {
        clearTimeout(timer);
    }
    timer = setTimeout(function() {
        update_div();
        div_integral.resize();
        div_rate.resize();
    }, 200);
});

function update_div() {
    
    var BAR_PADDING_W = 80+10;
    
    var max_width = Number(d3.select("div.container").style("width").replace("px", "")) 
        - Number(d3.select("div.container").style("padding-left").replace("px", ""))
        - Number(d3.select("div.container").style("padding-right").replace("px", ""));
    
    var legend_w = Number(d3.select("#div_rate_legend_svg").select("svg").style("width").replace("px", ""));

    //set integral bar's size
    var w = max_width - legend_w;
    var w_min = sig_data.Ids.length*6 + BAR_PADDING_W;
    var w_max = sig_data.Ids.length*30 + BAR_PADDING_W;
    if (w < w_min) w = w_min;
    if (w > w_max) w = w_max;
    
    if (w < 160 + BAR_PADDING_W) w =  160 + BAR_PADDING_W;
    
    d3.select("#div_integral")
        .style("width", w + "px")
        .style("height", "400px");
    
    d3.select("#div_rate")
        .style("width", w + "px")
        .style("height", "400px");
}

// *********************************************
// init
// *********************************************

function debg(start, before, now, prefix) {
    console.log(prefix + ":" + (now.getTime() - before)/1000 + ", total: " + (now.getTime() - start)/1000);
}

function init() {

    // draw signature
    for (var i = 0; i < divs.length; i++) {
        draw_signature(divs[i], i);
    }

    // draw rate bar
    {
        // legend
        var div_rate_legend = new legend();
        div_rate_legend.items =  sig_data.signatures;
        div_rate_legend.colors = sig_data.sig_colors;
        div_rate_legend.options.title = "signature";
        div_rate_legend.layout.padding_top = 150;
        div_rate_legend.layout.shape_sift_left = 10;
        div_rate_legend.layout.title_font_size = Number(style_signature.legend_rate_title_font_size.replace("px",""));
        div_rate_legend.layout.text_font_size = Number(style_signature.legend_rate_text_font_size.replace("px",""));
        
        div_rate_legend.html_id = "div_rate_legend_html";
        div_rate_legend.svg_id = "div_rate_legend_svg";
        //div_rate_legend.draw_html();
        //div_rate_legend.draw_svg(false);
        div_rate_legend.draw_svg(true);
        downloader.set_event_listner ("div_rate_legend_svg");
        
        update_div();

        var dataset = sig_data.get_bars_data(true);
        
        for (var s = 0; s < dataset.data.length; s++) {
            div_rate.dataset[s] = new div_rate.dataset_template("sig_" + s);
            div_rate.dataset[s].data = dataset.data[s];
            div_rate.dataset[s].keys = dataset.key[s];
            div_rate.dataset[s].color_fill = sig_data.sig_colors[s];
            div_rate.dataset[s].enable = true;
        };
        
        div_rate.keys = sig_data.esc_Ids;
        div_rate.tags[0] = new div_rate.tag_template("sample_ID");
        div_rate.tags[0].values = sig_data.Ids;
        div_rate.tags[0].note = "fix";
        
        div_rate.options.resizeable_w = true;
        div_rate.options.resizeable_h = false;
        div_rate.options.multi_select = false;
        div_rate.options.padding_left = 0;
        div_rate.options.padding_right = 10;
        div_rate.options.padding_top = 100;
        div_rate.options.padding_bottom = 10;
        div_rate.options.direction_x = "left-right";
        div_rate.options.direction_y = "bottom-up";
        div_rate.options.bar_padding = -1;
        
        div_rate.options.zoom.enable = true;
        div_rate.options.animation.mtime = 0;
        
        if (dataset.tooltip == 0) {
            div_rate.options.tooltip.enable = false;
        }
        else {
            div_rate.tooltips = dataset.tooltip;
            div_rate.options.tooltip.position = "bar";
        }
        
        // axis-y
        div_rate.options.grid_y = new div_rate.grid_template();
        div_rate.options.grid_y.wide = 80;
        div_rate.options.grid_y.orient = "left";
        
        div_rate.options.grid_y.ticks = 10;
        div_rate.options.grid_y.border_color = style_signature.plot_border_y_color;
        div_rate.options.grid_y.border_opacity = style_signature.plot_border_y_opacity;
        
        div_rate.options.titles[0] = new div_rate.title_template(style_signature.title_rate_y);
        div_rate.options.titles[0].orient = "left";
        div_rate.options.titles[0].wide = 0;
        div_rate.options.titles[0].text_anchor = "middle";
        div_rate.options.titles[0].text_rotate = -90;
        div_rate.options.titles[0].font_size = style_signature.title_rate_y_font_size; //"12px";
        div_rate.options.titles[0].sift_x = Number(style_signature.title_rate_y_font_size.replace("px", "")) * 0.8; //8;
        
        div_rate.options.titles[1] = new div_rate.title_template(style_signature.title_rate);
        div_rate.options.titles[1].orient = "top";
        div_rate.options.titles[1].wide = 30;
        div_rate.options.titles[1].text_anchor = "left";
        div_rate.options.titles[1].text_rotate = 0;
        div_rate.options.titles[1].font_size = style_signature.title_rate_font_size; //"16px";
        div_rate.options.titles[1].sift_x = Number(style_signature.title_rate_font_size.replace("px", "")) * 0.8; //8;
        
        // for debug
        if (_DEBUG == true) {
            div_rate.options.grid_xs[0] = new div_rate.grid_template();
            div_rate.options.grid_xs[0].keys = sig_data.esc_Ids;
            div_rate.options.grid_xs[0].labels = sig_data.Ids;
            div_rate.options.grid_xs[0].wide = 45;
            div_rate.options.grid_xs[0].font_size = "9px";
            div_rate.options.grid_xs[0].sift_y = 20;
            div_rate.options.grid_xs[0].orient = "bottom";
            div_rate.options.grid_xs[0].text_anchor = "middle";
            div_rate.options.grid_xs[0].text_rotate = "90";
            div_rate.options.grid_xs[0].border_width = "0px";
        }
        
        div_rate.draw();
        downloader.set_event_listner ("div_rate");
    }
    
    // draw integral bar
    {
        // legend
        var div_integral_legend = new legend();
        div_integral_legend.items =  sig_data.signatures;
        div_integral_legend.colors = sig_data.sig_colors;
        div_integral_legend.options.title = "signature";
        div_integral_legend.layout.padding_top = 150;
        div_integral_legend.layout.shape_sift_left = 10;
        div_integral_legend.layout.title_font_size = Number(style_signature.legend_integral_title_font_size.replace("px",""));
        div_integral_legend.layout.text_font_size = Number(style_signature.legend_integral_text_font_size.replace("px",""));
        
        div_integral_legend.html_id = "div_integral_legend_html";
        div_integral_legend.svg_id = "div_integral_legend_svg";
        //div_integral_legend.draw_html();
        //div_integral_legend.draw_svg(false);
        div_integral_legend.draw_svg(true);
        downloader.set_event_listner ("div_integral_legend_svg");
        
        update_div();

        var dataset = sig_data.get_bars_data(false);
        
        for (var s = 0; s < dataset.data.length; s++) {
            div_integral.dataset[s] = new div_integral.dataset_template("sig_" + s);
            div_integral.dataset[s].data = dataset.data[s];
            div_integral.dataset[s].keys = dataset.key[s];
            div_integral.dataset[s].color_fill = sig_data.sig_colors[s];
            div_integral.dataset[s].enable = true;
        };
        
        div_integral.keys = sig_data.esc_Ids;
        div_integral.tags[0] = new div_integral.tag_template("sample_ID");
        div_integral.tags[0].values = sig_data.Ids;
        div_integral.tags[0].note = "fix";
        
        div_integral.tags[1] = new div_integral.tag_template("mutation_num");
        div_integral.tags[1].values = sig_data.mutation_count;
        div_integral.tags[1].note = "fix";
        
        div_integral.options.resizeable_w = true;
        div_integral.options.resizeable_h = false;
        div_integral.options.multi_select = false;
        div_integral.options.padding_left = 0;
        div_integral.options.padding_right = 10;
        div_integral.options.padding_top = 100;
        div_integral.options.padding_bottom = 10;
        div_integral.options.direction_x = "left-right";
        div_integral.options.direction_y = "bottom-up";
        div_integral.options.bar_padding = -1;
        
        div_integral.options.zoom.enable = true;
        div_integral.options.animation.mtime = 0;
        
        if (dataset.tooltip == 0) {
            div_integral.options.tooltip.enable = false;
        }
        else {
            div_integral.tooltips = dataset.tooltip;
            div_integral.options.tooltip.position = "bar";
        }
        
        // axis-y
        div_integral.options.grid_y = new div_integral.grid_template();
        div_integral.options.grid_y.wide = 80;
        div_integral.options.grid_y.orient = "left";
        
        div_integral.options.grid_y.ticks = 10;
        div_integral.options.grid_y.border_color = style_signature.plot_border_y_color;
        div_integral.options.grid_y.border_opacity = style_signature.plot_border_y_opacity;
        
        div_integral.options.titles[0] = new div_integral.title_template(style_signature.title_integral_y);
        div_integral.options.titles[0].orient = "left";
        div_integral.options.titles[0].wide = 0;
        div_integral.options.titles[0].text_anchor = "middle";
        div_integral.options.titles[0].text_rotate = -90;
        div_integral.options.titles[0].font_size = style_signature.title_integral_y_font_size; //"12px";
        div_integral.options.titles[0].sift_x = Number(style_signature.title_integral_y_font_size.replace("px", "")) * 0.8; //8;
        
        div_integral.options.titles[1] = new div_integral.title_template(style_signature.title_integral);
        div_integral.options.titles[1].orient = "top";
        div_integral.options.titles[1].wide = 30;
        div_integral.options.titles[1].text_anchor = "left";
        div_integral.options.titles[1].text_rotate = 0;
        div_integral.options.titles[1].font_size = style_signature.title_integral_font_size; //"16px";
        div_integral.options.titles[1].sift_x = Number(style_signature.title_integral_font_size.replace("px", "")) * 0.8; //8;
        
        // for debug
        if (_DEBUG == true) {
            div_integral.options.grid_xs[0] = new div_integral.grid_template();
            div_integral.options.grid_xs[0].keys = sig_data.esc_Ids;
            div_integral.options.grid_xs[0].labels = sig_data.Ids;
            div_integral.options.grid_xs[0].wide = 45;
            div_integral.options.grid_xs[0].font_size = "9px";
            div_integral.options.grid_xs[0].sift_y = 20;
            div_integral.options.grid_xs[0].orient = "bottom";
            div_integral.options.grid_xs[0].text_anchor = "middle";
            div_integral.options.grid_xs[0].text_rotate = "90";
            div_integral.options.grid_xs[0].border_width = "0px";
        }
        
        div_integral.draw();
        downloader.set_event_listner ("div_integral");
        
        d3.select("#div_integral").classed("hidden", true);
        d3.select("#div_integral_legend_svg").classed("hidden", true);
        d3.select("#div_integral_legend_html").classed("hidden", true);
    }
    // list box
    {
        var options = ["rate", "integral"];
        
        if (sig_data.mutation_count.length == 0) options = ["rate"];
        
        d3.select("#chart_mode")
          .selectAll("option")
          .data(options)
          .enter()
          .append("option")
          .attr("value", function(d){ return d})
          .attr("selected", function(d, i){ if(i == 0) return "selected"})
          .text(function(d){ return d });
        
        d3.select("#chart_mode")
        .on("change", function() {
            if (this[0].selected == true) {
                d3.select("#div_rate").classed("hidden", false);
                d3.select("#div_rate_legend_svg").classed("hidden", false);
                d3.select("#div_rate_legend_html").classed("hidden", false);
                d3.select("#div_integral").classed("hidden", true);
                d3.select("#div_integral_legend_svg").classed("hidden", true);
                d3.select("#div_integral_legend_html").classed("hidden", true);
                chart_mode = 0;
                set_sort_listbox(0);
            }
            else {
                d3.select("#div_rate").classed("hidden", true);
                d3.select("#div_rate_legend_svg").classed("hidden", true);
                d3.select("#div_rate_legend_html").classed("hidden", true);
                d3.select("#div_integral").classed("hidden", false);
                d3.select("#div_integral_legend_svg").classed("hidden", false);
                d3.select("#div_integral_legend_html").classed("hidden", false);
                chart_mode = 1;
                set_sort_listbox(1);
            }
          });
        set_sort_listbox(0);
    }
}

function set_sort_listbox(mode) {
    
    var options = [];
    
    if (mode == 0) options = ["sampleID"];
    else options = ["sampleID", "mutation count"];
    
    d3.select("#chart_sort")
      .selectAll("option")
      .remove();
    
    d3.select("#chart_sort")
      .selectAll("option")
      .data(options)
      .enter()
      .append("option")
      .attr("value", function(d){ return d})
      .attr("selected", function(d, i){ if(i == 0) return "selected"})
      .text(function(d){ return d });
    
    d3.select("#chart_sort")
    .on("change", function() {
        if (this[0].selected == true) {
            sort(["sample_ID"], [true]);
        }
        else {
            sort(["mutation_num"], [false]);
        }
      });
}

function sort(key, asc) {
    if (chart_mode == 1) {
        div_integral.sort(key, asc);
    }
}

function draw_signature(name, signature_id, change_id) {

    var bar_dataset = sig_data.get_data_par_signature(signature_id);
    
    if (SIGNATURE_W == 0) {
        var route_num = sig_data.substitution[0].route.length;
        if (route_num == 16) {
            SIGNATURE_W = 450;
        }
        else {
            SIGNATURE_W = (route_num*0.8*change_list.length) + SIGNATURE_AXIS_YW;
        }
    }
    
    // set signature's size
    d3.select("#" + name)
        .style("width", SIGNATURE_W + "px")
        .style("height", SIGNATURE_H + "px");
    
    var svg_al = d3.select("#" + name).append("svg")
        .attr("id", name + "_svg")
        .style("width", SIGNATURE_W + "px")
        .style("height", SIGNATURE_H + "px");
    
    // title
    svg_al.append("svg")
        .attr("id", name + "_title_svg")
        .style("width", SIGNATURE_W + "px")
        .style("height", SIGNATURE_TITLE_H + "px")
        .append("text")
        .text(sig_data.signatures[signature_id])
        .attr({
            'text-color': "#000",
            'text-anchor': "start",
            'font-size': style_signature.signature_title_font_size, //"12px",
            'font-family': style_general.font_family,
            'transform': 'translate(' + SIGNATURE_AXIS_YW + ',' + style_signature.signature_title_font_size.replace("px", "") + ')',
        });
    
    // append main svg
    var PLOT_H = SIGNATURE_H - SIGNATURE_LEG_H - SIGNATURE_TITLE_H;
    var svg_main = svg_al.append("svg")
        .style("width", SIGNATURE_W + "px")
        .style("height", PLOT_H + "px")
        .attr("y", SIGNATURE_TITLE_H + "px");
    
    
    // legend
    var svg_legend = svg_al.append("svg")
        .attr("id", name + "_legend_svg")
        .style("width", SIGNATURE_W + "px")
        .style("height", SIGNATURE_LEG_H + "px")
        .attr("y", (SIGNATURE_TITLE_H + PLOT_H) + "px");
            
    var div_legend = new legend();
    div_legend.svg_obj = svg_legend;
    
    var change = [];
    var change_colors = [];
    for (var s in sig_data.substitution)  {
        change.push(sig_data.substitution[s].name);
        change_colors.push(sig_data.substitution[s].color);
    }
    div_legend.items =  change;
    div_legend.colors = change_colors;
    div_legend.options.horizon = true;
    div_legend.layout.padding_top = 1;
    div_legend.layout.padding_left = 0;
    div_legend.layout.shape_sift_left = SIGNATURE_AXIS_YW + div_legend.layout.shape_padding/2;
    div_legend.layout.rect_width = (SIGNATURE_W - SIGNATURE_AXIS_YW)/change_list.length - div_legend.layout.shape_padding;
    div_legend.layout.rect_height = 10;
    div_legend.layout.text_font_size = Number(style_signature.signature_title_x_font_size.replace("px",""));
    div_legend.draw_svg(true);

    // each plot
    var pos_x = 0;
    for (var c in change_list)  {
        
        var plot_w = (SIGNATURE_W - SIGNATURE_AXIS_YW)/change_list.length;
        var svg_w = plot_w;
        if (c == 0) svg_w += SIGNATURE_AXIS_YW;
        
        var svg_sub = svg_main.append("svg")
            .attr({
                "id": name + "_" + change_list[c],
                "width": svg_w,
                "height": PLOT_H,
                "x": pos_x,
                "y": 0,
            });
        
        var bar = new mut_bar(name + "_" + change_list[c]);

        bar.svg_obj = svg_sub;
        bar.svg.w = svg_w;
        bar.svg.h = PLOT_H;
        bar.dataset[0] = new bar.dataset_template(change_list[c]);
        bar.dataset[0].data = bar_dataset.data[c];
        bar.dataset[0].keys = sig_data.route_id;
        bar.dataset[0].color_fill = sig_data.substitution[c].color;
        bar.dataset[0].enable = true;

        bar.keys = sig_data.route_id;
        bar.tags[0] = new bar.tag_template("change_list");
        bar.tags[0].values = sig_data.route_id;
        bar.tags[0].note = "fix";
        
        bar.options.resizeable_w = false;
        bar.options.resizeable_h = false;
        bar.options.tooltip.enable = false;
        
        bar.options.multi_select = false;
        var bar_padding = 2;
        
        if (plot_w/sig_data.route_id.length < 3) {
            bar_padding = 0;
        }
        bar.options.bar_padding = bar_padding;
        bar.options.padding_left = 1;
        bar.options.padding_right = 1;
        bar.options.padding_top = 10;
        bar.options.padding_bottom = 4;
        bar.options.direction_x = "left-right";
        bar.options.direction_y = "bottom-up";
        bar.options.tall_fix = sig_data.dataset_sig_max;
        
        // y-axis
        bar.options.grid_y = new bar.grid_template();
        bar.options.grid_y.ticks = 2;
        bar.options.grid_y.wide = 0;
        bar.options.grid_y.border_color = style_signature.border_y_color;
        bar.options.grid_y.border_opacity = style_signature.border_y_opacity;
        bar.options.grid_y.orient = "left";
        
        // title
        if (c == 0) {
            bar.options.titles[0] = new bar.title_template(style_signature.signature_title_y);
            bar.options.titles[0].orient = "left";
            bar.options.titles[0].wide = SIGNATURE_AXIS_YW;
            bar.options.titles[0].text_anchor = "middle";
            bar.options.titles[0].text_rotate = -90;
            bar.options.titles[0].font_size = style_signature.signature_title_y_font_size; //"12px";
        }
        
        bar.draw();
        
        // add tooltip
        var rect_data = [];
        var seg_num = bar_dataset.data[c].length/16;
        for (var s=0; s < seg_num; s++) {
            rect_data.push(c);
        }
        svg_sub.append("g")
            .attr("class", "whole_surface")
            .selectAll("rect")
            //.data([c])
            .data(rect_data)
            .enter()
            .append("rect")
            .attr({
                //"id": name + "_" + change_list[c] + "_surface",
                "width": plot_w/seg_num,
                "height": PLOT_H-15,
                //"x": svg_w - plot_w + 1,
                "y": 10,
                "fill": "yellow",
            })
            .attr("id", function(d, i) {
                return name + "_" + change_list[c] + "_" + i + "_surface";
            })
            .attr("x", function(d, i) {
                return svg_w - plot_w + 1 + plot_w/seg_num*i;
            })
            .style("opacity", 0)
            .on("mouseover", function(d, i) {
                // remove last tooltip data
                d3.select("#tooltip").selectAll("p").remove();
            
                // add text to tooltip
                for (var p=0; p < bar_dataset.tooltip[d][i].length; p++) {
                    var temp = d3.select("#tooltip").append("p").attr("id", "text").append("pre").text(bar_dataset.tooltip[d][i][p]);
                }
                
                //Show the tooltip
                d3.select("#tooltip").classed("hidden", false);
            
                var rect = document.getElementById(this.id).getBoundingClientRect();
                var div_x = parseFloat(rect.left) + window.pageXOffset + 10 + plot_w/seg_num;
                var div_y = parseFloat(rect.top) + window.pageYOffset + 10 + bar.options.padding_top;
            
                //Update the tooltip position and value
                d3.select("#tooltip")
                    .style("left", div_x + "px")
                    .style("top", div_y + "px");
                if (seg_num > 1) {
                    d3.select(this).style("opacity", 0.8);
                }
            })
            .on("mouseout", function() {
                //Hide the tooltip
                d3.select("#tooltip").classed("hidden", true);
                d3.select(this).style("opacity", 0);
            })
        ;
        
        pos_x += svg_w;
    }
    downloader.set_event_listner (name);
}

// *********************************************
// save image
// *********************************************
function push_export() {
    
    // window-width
    var max_width = Number(d3.select("div.container").style("width").replace("px", "")) 
        - Number(d3.select("div.container").style("padding-left").replace("px", ""))
        - Number(d3.select("div.container").style("padding-right").replace("px", ""));
    
    // svg size
    var width = Number(d3.select("#" + divs[0]).select("svg").style("width").replace("px", ""));
    var height = Number(d3.select("#" + divs[0]).select("svg").style("height").replace("px", ""));
    
    var svgText = ""
    var sift_x = 0;
    var sift_y = 0;
    
    // each plot
    for (var i = 0; i < divs.length; i++) {

        svgText += downloader.svg_text(divs[i], sift_x, sift_y);
        sift_x += width;
        
        if (max_width < sift_x+width) {
            sift_x = 0;
            sift_y += height;
        }
    }
    
    var cols_num = Math.floor(max_width/width);
    var rows_num = Math.ceil(divs.length/cols_num);
    
    // integral bar
    var bar_id = "div_rate";
    var leg_id = "div_rate_legend_svg";
    
    if (chart_mode == 1) {
        bar_id = "div_integral";
        leg_id = "div_integral_legend_svg";
    }
    
    var integral_w = Number(d3.select("#" + bar_id).select("svg").style("width").replace("px", ""));
    var integral_h = Number(d3.select("#" + bar_id).select("svg").style("height").replace("px", ""));
    var legend_w = Number(d3.select("#" + leg_id).select("svg").style("width").replace("px", ""));
    var legend_h = Number(d3.select("#" + leg_id).select("svg").style("height").replace("px", ""));
    
    sift_y = rows_num * height;
    svgText += downloader.svg_text(bar_id, 0, sift_y);
    svgText += downloader.svg_text(leg_id, integral_w, sift_y);
    
    // output 
    var svg_w = cols_num * width;
    if (svg_w < integral_w + legend_w) svg_w = integral_w + legend_w;
    
    var svg_h = rows_num * height;
    if (integral_h > legend_h) svg_h += integral_h;
    else svg_h += legend_h;
    
    svgText = downloader.add_svgtag(svgText, svg_h, svg_w)
    
    rect = utils.absolute_position("dw_btn");
    downloader.createMenu ([rect.x + rect.width, rect.y], "btn", "paplot_signature", svg_w, svg_h, svgText);
}

// *********************************************
// bar select event
// *********************************************
div_integral.bar_selected = function(key, on) {
    div_integral.bar_select(key, on);
}
div_rate.bar_selected = function(key, on) {
    div_rate.bar_select(key, on);
}

// global params
var _DEBUG = false;
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
    var w_min = msig_data.Ids.length*6 + BAR_PADDING_W;
    var w_max = msig_data.Ids.length*30 + BAR_PADDING_W;
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
        // set signature's size
        d3.select("#" + divs[i])
            .style("width", "400px")
            .style("height", "240px");
        draw_pmsignature(divs[i], i);
    }
    
    // draw rate bar
    {
        // legend
        var div_rate_legend = new legend();
        div_rate_legend.items =  msig_data.signatures;
        div_rate_legend.colors = msig_data.sig_colors;
        div_rate_legend.options.title = "signature";
        div_rate_legend.layout.padding_top = 150;
        div_rate_legend.layout.shape_sift_left = 10;
        div_rate_legend.layout.title_font_size = Number(style_pmsignature.legend_rate_title_font_size.replace("px",""));
        div_rate_legend.layout.text_font_size = Number(style_pmsignature.legend_rate_text_font_size.replace("px",""));
        div_rate_legend.html_id = "div_rate_legend_html";
        div_rate_legend.svg_id = "div_rate_legend_svg";
        //div_rate_legend.draw_html();
        //div_rate_legend.draw_svg(false);
        div_rate_legend.draw_svg(true);
        downloader.set_event_listner ("div_rate_legend_svg");
        
        update_div();

        var dataset = msig_data.get_bars_data(true);
        
        for (var s = 0; s < dataset.data.length; s++) {
            div_rate.dataset[s] = new div_rate.dataset_template("sig_" + s);
            div_rate.dataset[s].data = dataset.data[s];
            div_rate.dataset[s].keys = dataset.key[s];
            div_rate.dataset[s].color_fill = msig_data.sig_colors[s];
            div_rate.dataset[s].enable = true;
        };
        
        div_rate.keys = msig_data.esc_Ids;
        div_rate.tags[0] = new div_rate.tag_template("sample_ID");
        div_rate.tags[0].values = msig_data.Ids;
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
        div_rate.options.bar_padding = -1
        
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
        div_rate.options.grid_y.border_color = style_pmsignature.plot_border_y_color;
        div_rate.options.grid_y.border_opacity = style_pmsignature.plot_border_y_opacity;
        
        div_rate.options.titles[0] = new div_rate.title_template(style_pmsignature.title_rate_y);
        div_rate.options.titles[0].orient = "left";
        div_rate.options.titles[0].wide = 0;
        div_rate.options.titles[0].text_anchor = "middle";
        div_rate.options.titles[0].text_rotate = -90;
        div_rate.options.titles[0].font_size = style_pmsignature.title_rate_y_font_size;
        div_rate.options.titles[0].sift_x = Number(style_pmsignature.title_rate_y_font_size.replace("px", "")) * 0.8; //8;
        
        div_rate.options.titles[1] = new div_rate.title_template(style_pmsignature.title_rate);
        div_rate.options.titles[1].orient = "top";
        div_rate.options.titles[1].wide = 30;
        div_rate.options.titles[1].text_anchor = "left";
        div_rate.options.titles[1].text_rotate = 0;
        div_rate.options.titles[1].font_size = style_pmsignature.title_rate_font_size;
        div_rate.options.titles[1].sift_x = Number(style_pmsignature.title_rate_font_size.replace("px", "")) * 0.8; //8;
        
        // for debug
        if (_DEBUG == true) {
            div_rate.options.grid_xs[0] = new div_rate.grid_template();
            div_rate.options.grid_xs[0].keys = msig_data.esc_Ids;
            div_rate.options.grid_xs[0].labels = msig_data.Ids;
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
        div_integral_legend.items =  msig_data.signatures;
        div_integral_legend.colors = msig_data.sig_colors;
        div_integral_legend.options.title = "signature";
        div_integral_legend.layout.padding_top = 150;
        div_integral_legend.layout.shape_sift_left = 10;
        div_integral_legend.layout.title_font_size = Number(style_pmsignature.legend_integral_title_font_size.replace("px",""));
        div_integral_legend.layout.text_font_size = Number(style_pmsignature.legend_integral_text_font_size.replace("px",""));
        div_integral_legend.html_id = "div_integral_legend_html";
        div_integral_legend.svg_id = "div_integral_legend_svg";
        //div_integral_legend.draw_html();
        //div_integral_legend.draw_svg(false);
        div_integral_legend.draw_svg(true);
        downloader.set_event_listner ("div_integral_legend_svg");
        
        update_div();

        var dataset = msig_data.get_bars_data(false);
        
        for (var s = 0; s < dataset.data.length; s++) {
            div_integral.dataset[s] = new div_integral.dataset_template("sig_" + s);
            div_integral.dataset[s].data = dataset.data[s];
            div_integral.dataset[s].keys = dataset.key[s];
            div_integral.dataset[s].color_fill = msig_data.sig_colors[s];
            div_integral.dataset[s].enable = true;
        };
        
        div_integral.keys = msig_data.esc_Ids;
        div_integral.tags[0] = new div_integral.tag_template("sample_ID");
        div_integral.tags[0].values = msig_data.Ids;
        div_integral.tags[0].note = "fix";
        
        div_integral.tags[1] = new div_integral.tag_template("mutation_num");
        div_integral.tags[1].values = msig_data.mutation_count;
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
        div_integral.options.bar_padding = -1
        
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
        div_integral.options.grid_y.border_color = style_pmsignature.plot_border_y_color;
        div_integral.options.grid_y.border_opacity = style_pmsignature.plot_border_y_opacity;
        
        div_integral.options.titles[0] = new div_integral.title_template(style_pmsignature.title_integral_y);
        div_integral.options.titles[0].orient = "left";
        div_integral.options.titles[0].wide = 0;
        div_integral.options.titles[0].text_anchor = "middle";
        div_integral.options.titles[0].text_rotate = -90;
        div_integral.options.titles[0].font_size = style_pmsignature.title_integral_y_font_size; //"12px";
        div_integral.options.titles[0].sift_x = Number(style_pmsignature.title_integral_y_font_size.replace("px", "")) * 0.8; //8;
        
        div_integral.options.titles[1] = new div_integral.title_template(style_pmsignature.title_integral);
        div_integral.options.titles[1].orient = "top";
        div_integral.options.titles[1].wide = 30;
        div_integral.options.titles[1].text_anchor = "left";
        div_integral.options.titles[1].text_rotate = 0;
        div_integral.options.titles[1].font_size = style_pmsignature.title_integral_font_size; //"16px";
        div_integral.options.titles[1].sift_x = Number(style_pmsignature.title_integral_font_size.replace("px", "")) * 0.8; //8;
        
        // for debug
        if (_DEBUG == true) {
            div_integral.options.grid_xs[0] = new div_integral.grid_template();
            div_integral.options.grid_xs[0].keys = msig_data.esc_Ids;
            div_integral.options.grid_xs[0].labels = msig_data.Ids;
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
        
        if (msig_data.mutation_count.length == 0) options = ["rate"];
        
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

function draw_pmsignature(name, signature_id) {

    var div_pm1 = new pmsignature(name);
    
    // Alt
    {
        var dataset_alt = msig_data.get_dataset(signature_id, "alt");
        
        div_pm1.signature_rects[0] = new div_pm1.box_template("alt", 4, 4);
        div_pm1.signature_rects[0].position = 0;

        div_pm1.signature_rects[0].data = dataset_alt.data;
        div_pm1.signature_rects[0].tooltips = dataset_alt.tooltip;
        
        var mid = Math.floor(msig_data.dataset_ref[signature_id].length/2);
        var mid_data = msig_data.dataset_ref[signature_id][mid];
        var sum = mid_data[0] + mid_data[1] + mid_data[2] + mid_data[3];
        div_pm1.signature_rects[0].horizontal_rate = [mid_data[0]/sum, mid_data[1]/sum, mid_data[2]/sum, mid_data[3]/sum];
        div_pm1.signature_rects[0].options.colorset = [msig_data.label_colors.A, msig_data.label_colors.C, msig_data.label_colors.G, msig_data.label_colors.T,
            msig_data.label_colors.A, msig_data.label_colors.C, msig_data.label_colors.G, msig_data.label_colors.T,
            msig_data.label_colors.A, msig_data.label_colors.C, msig_data.label_colors.G, msig_data.label_colors.T,
            msig_data.label_colors.A, msig_data.label_colors.C, msig_data.label_colors.G, msig_data.label_colors.T,];
        div_pm1.signature_rects[0].label.text = ["A","C","G","T","A","C","G","T","A","C","G","T","A","C","G","T"];
        div_pm1.signature_rects[0].label.font_size = style_pmsignature.signature_alt_font_size;
    }
    
    // Ref
    for (var i=0; i < msig_data.dataset_ref[signature_id].length; i++) {
        var dataset_ref = msig_data.get_dataset(signature_id, "ref" + i);
        
        div_pm1.signature_rects[i+1] = new div_pm1.box_template("ref_" + i, 4, 1);
        div_pm1.signature_rects[i+1].position = i+1;
    
        div_pm1.signature_rects[i+1].data[0][0] = dataset_ref.data[0];
        div_pm1.signature_rects[i+1].data[1][0] = dataset_ref.data[1];
        div_pm1.signature_rects[i+1].data[2][0] = dataset_ref.data[2];
        div_pm1.signature_rects[i+1].data[3][0] = dataset_ref.data[3];
        
        div_pm1.signature_rects[i+1].tooltips = dataset_ref.tooltip;
        div_pm1.signature_rects[i+1].horizontal_rate = dataset_ref.data;
        div_pm1.signature_rects[i+1].reduce_rate = msig_data.ref_reduce_rate[i];
        div_pm1.signature_rects[i+1].options.colorset = [msig_data.label_colors.A, msig_data.label_colors.C, msig_data.label_colors.G, msig_data.label_colors.T];
        div_pm1.signature_rects[i+1].label.text = ["A","C","G","T"];
        div_pm1.signature_rects[i+1].label.font_size = style_pmsignature.signature_ref_font_size;
    }
    
    // strand
    var dataset_strand = msig_data.get_dataset(signature_id, "strand");
    if (dataset_strand.data.length == 2) {
        div_pm1.strand.data = dataset_strand.data;
        div_pm1.strand.colorset = [msig_data.label_colors.plus, msig_data.label_colors.minus];
        div_pm1.strand.tooltips = dataset_strand.tooltip;
        div_pm1.strand.font_size = style_pmsignature.signature_strand_font_size;
    }

    // border
    div_pm1.options.padding_left = 10;
    div_pm1.options.padding_right = 10;
    div_pm1.options.padding_top = 10;
    div_pm1.options.padding_bottom = 10;
    div_pm1.options.border_width = 1;
    div_pm1.options.border_color = "#CCC";
    div_pm1.options.border_margin_left = 1;
    div_pm1.options.border_margin_right = 1;
    div_pm1.options.border_margin_top = 1;
    div_pm1.options.border_margin_bottom = 1;
    
    // title
    div_pm1.options.titles[0] = new div_pm1.title_template(msig_data.signatures[signature_id]);
    div_pm1.options.titles[0].orient = "top";
    div_pm1.options.titles[0].wide = 30;
    div_pm1.options.titles[0].text_anchor = "left";
    div_pm1.options.titles[0].text_rotate = 0;
    div_pm1.options.titles[0].font_size = style_pmsignature.signature_title_font_size;
    
    // other options
    div_pm1.options.resizeable_w = true;
    div_pm1.options.resizeable_h = true;
    div_pm1.options.tooltip.enable = true;
    div_pm1.options.tooltip.position = "bar";
    
    div_pm1.draw();
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
    downloader.createMenu ([rect.x + rect.width, rect.y], "btn", "paplot_pmsignature", svg_w, svg_h, svgText);
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


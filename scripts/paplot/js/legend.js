legend = (function()
{

    var legend = function()
    {
        this.items =[];
        this.colors =[];
        this.enables =[];
        
        this.options = {
            svg_size : [0,0], // [width, height] (if 0: auto)
            title : "", 
            horizon : false,
        };
        
        this.layout = {
            // common
            font_family: style_general.font_family,
            padding_left: 20,
            padding_top: 20,
            margin_right: 0,
            
            // title
            title_font_size: 16,
            title_height: 36,
            title_sift_left: 0,
            title_sift_top: 0, 
            title_sift_bottom: 0,
            
            // item
            shape_sift_left: 0,
            shape_padding: 5,
            
            // rect
            rect_width: 40,         // (if horizon, case 0: auto)
            rect_height: 16,
            rect_margin_left: 8,
            rect_margin_right: 10,
            
            // text
            text_font_size: 12,
            text_sift_left: 0,
            text_sift_right: 20,
        };
        
        this.html_id;
        this.svg_id;
        this.svg_obj = 0;
    };
    
    var isNode = (typeof process !== "undefined" && typeof require !== "undefined");
    var p = legend.prototype;
    
    // *********************************************
    // version HTML
    // *********************************************
    p.draw_html = function() {
        
        var that = this;
        var p_data = this.preparation("html");
        
        if (this.enables.length == 0) {
            for (var i = 0; i < p_data.enables.length; i++) {
                this.enables.push(p_data.enables[i]);
            }
        }
        
        var css_div_frame = {
            'width' : p_data.svg_width + 'px',
            'height' : p_data.svg_height + 'px',
            'font-family' : this.layout.font_family,
            'padding-left': this.layout.padding_left + 'px',
            'margin-right': this.layout.margin_right + 'px',
            'padding-top': this.layout.padding_top + 'px',
        };
        var css_title = {
            'font-size' : this.layout.title_font_size + 'px',
            'height' : this.layout.title_height + 'px',
            'margin-top' : this.layout.title_sift_top + 'px',
            'margin-bottom' : this.layout.title_sift_bottom + 'px',
            'margin-left' : this.layout.title_sift_left+ 'px',
        };
        var css_div_p = {
            'height': this.layout.rect_height + 'px',
            'margin-top' : '0px',
            'margin-bottom' : this.layout.shape_padding + 'px',
            'margin-rignt': '0px',
        };
        var css_checkbox = {
            'margin-top' : Math.round(this.layout.rect_height/2) + 'px',
            'margin-bottom' : Math.round(this.layout.rect_height/2) + 'px',
            'margin-left' : '0px',
            'margin-rignt': '0px',
            'vertical-align': 'middle',
        };
        var css_rect = {
            'display' : 'inline-block',
            'width' : p_data.rect_width + 'px',
            'height' : this.layout.rect_height + 'px',
            'margin-left' : this.layout.rect_margin_left + 'px',
            'margin-right' : this.layout.rect_margin_right + 'px',
            'vertical-align' : 'middle',
        };
        var css_text = {
            'display' : 'inline-block',
            'font-size' : this.layout.text_font_size + 'px',
            'margin-left' : this.layout.text_sift_left + 'px',
            'margin-right' : this.layout.text_sift_right + 'px',
            'vertical-align': 'middle',
        };
        
        // div
        d3.select("#" + this.html_id).style(css_div_frame);
        
        // title
        if (this.options.title != "") {
            d3.select("#" + this.html_id).append("div").attr("class", "legend_title")
                .text(this.options.title)
                .style(css_title);
        }
        
        var legend_items = d3.select("#" + this.html_id).append("div").attr("class", "legend_items");
        
        // items
        for (var pos = 0; pos < p_data.items.length; pos++) {
            
            // p
            var div_p = legend_items.append("div")
                .style(css_div_p)
                .style('margin-left', function() {
                    var left = '0px'
                    if (that.options.horizon == false) left = that.layout.shape_sift_left + 'px';
                    else if (pos == 0) left = that.layout.shape_sift_left + 'px';
                    return left;
                });
                        
            if (this.options.horizon == true) {
                div_p.style('display', 'inline-block');
            }
            
            // check-box
            var ui = div_p.append("input")
                .attr({
                    'type': "checkbox",
                    'id': this.html_id + "_" + pos,
                    'name': p_data.items[pos],
                    'value': pos,
                })
                .style(css_checkbox)
            ;
            ui.property("checked", this.enables[pos]);
            ui.on("click", function() {
                    var i = d3.select(this).attr("value");
                    that.enables[i] = d3.select(this).property("checked");
                    that.stack_change(d3.select(this).attr("name"), d3.select(this).attr("value"), d3.select(this).property("checked"));
                });
            
            // color-rect
            div_p.append("label")
                .style(css_rect)
                .style("background", p_data.colors[pos])
                .attr("for", this.html_id + "_" + pos);
            
            // text
            div_p.append("label")
                .style(css_text)
                .attr("for", this.html_id + "_" + pos)
                .text(p_data.items[pos]);
        }
    }
    
    // *********************************************
    // version SVG
    // *********************************************
    p.draw_svg = function(display) {
        
        // if svg element is exists, remove
        if (d3.select("#" + this.svg_id).select("svg").empty() == false) {
            d3.select("#" + this.svg_id).select("svg").remove();
        }
        
        // params
        var p_data = this.preparation("svg");
        
        // ordinal
        var ordinal = d3.scale.ordinal()
            .domain(p_data.items)
            .range(p_data.colors);
        
        var legend_color = d3.legend.color()
            .shapePadding(this.layout.shape_padding)
            .shapeWidth(p_data.rect_width)
            .shapeHeight(this.layout.rect_height)
        
        if (this.options.horizon == true) { // horizon
            legend_color
                .scale(ordinal)
                .orient('horizontal')
                ;
        }
        else {  // virtical
            legend_color
                .labelAlign("start")
                .scale(ordinal);
        }
        
        // create objects
        var legend_svg = this.svg_obj;
        if (legend_svg == 0) {
            legend_svg = d3.select("#" + this.svg_id).append("svg");
        }
        
        legend_svg
            .style("width", p_data.svg_width + 'px')
            .style("height", p_data.svg_height + 'px')
            .append("g")
            .attr("class", "legend_class")
            .attr("transform", "translate(" + this.layout.padding_left + "," + this.layout.padding_top + ")")
            ;

        if (this.options.title != "") {
            legend_color.title(this.options.title);
        }
        
        if (isNode == false) {
            legend_svg.select(".legend_class")
                .call(legend_color);
        }
        
        // for bug
        legend_svg.selectAll("g.cell").style("opacity", 1);
        
        legend_svg.selectAll("g.cell").selectAll("rect")
            .attr("transform", "translate(" + this.layout.shape_sift_left + ", 0)")
            ;

        legend_svg.selectAll("g.cell").selectAll("text")
            .attr("font-size", this.layout.text_font_size + "px")
            .attr("font-family", this.layout.font_family);

        if (this.options.horizon == true) {
            var trans = [0,0];

            if (isNode == false) {
                trans = legend_svg.selectAll("g.cell").selectAll("text").attr("transform").replace("translate(", "").replace(")", "").split(",");
                if (trans.length == 1) trans = trans[0].split(" "); // for IE
            }
            legend_svg.selectAll("g.cell").selectAll("text")
                .attr("transform", "translate(" + (this.layout.shape_sift_left + Number(trans[0])) + ", " + trans[1] + ")");
        }
        else {
            legend_svg.selectAll("g.cell").selectAll("text")
                .attr("transform", "translate(" + (this.layout.shape_sift_left + p_data.rect_width + this.layout.rect_margin_right + this.layout.text_sift_left) + ", 12)");
        }
        if (this.options.title != "") {
            legend_svg.selectAll(".legendTitle")
                .attr("font-size", this.layout.title_font_size + "px")
                .attr("font-family", this.layout.font_family);
        }
        
        if (display == false) {
            legend_svg.classed("hidden", true);
        }
    }

    p.preparation = function(mode) {
        
        // use list
        var items_org = [];
        var colors = [];
        var enables = [];
        var i = 0;
        for (i = 0; i < this.items.length; i++) {
            if ((mode == "svg") && (this.enables[i] == false)) continue;
            
            items_org.push(this.items[i]);
            colors.push(this.colors[i]);
            
            if (this.enables.length == 0) {
                enables.push(true);
            }
            else {
                enables.push(this.enables[i]);
            }
        }
        
        
        // duplicate rename from item-list
        var items = [];
        for (i = 0; i < items_org.length; i++) {
            if (items.indexOf(items_org[i]) < 0) {
                items.push(items_org[i]);
                continue;
            }
            var counter = 1;
            while(1) {
                var renamed = items_org[i] + "_" + counter;
                if (items.indexOf(renamed) < 0) {
                    items.push(renamed);
                    break;
                }
                counter += 1;
            }
        }
        
        // params
        var margin = 5;
        
        var title_font_size = 0;
        var title_height = 0;
        var title_width = 0;
        if (this.options.title != "") {
            title_font_size = this.layout.title_font_size;
            title_height = this.layout.title_height;
            if (title_height == 0) {
                title_height = this.layout.title_font_size + margin*2;
            }
            title_width = this.options.title.length * title_font_size;
        }
        
        var max_length = 0;
        for (i = 0; i < items.length; i++) {
            if (items[i].length > max_length) max_length = items[i].length;
        }
        
        // rect-width
        var rect_width = this.layout.rect_width;
        if ((rect_width == 0) && (this.options.horizon == true) && (mode == "svg")) {
            rect_width = max_length*(this.layout.text_font_size-1);
        }
        
        // svg-width
        var svg_width = this.options.svg_size[0];
        if (svg_width == 0) {
            var item_w = rect_width + this.layout.rect_margin_right + this.layout.text_sift_left + max_length * this.layout.text_font_size + this.layout.text_sift_right;
            if (this.options.horizon == true) {
                if (mode == "svg") {
                    svg_width = this.layout.padding_left + this.layout.shape_sift_left + (rect_width + margin*2) * items.length;
                }
                if (mode == "html") {
                    svg_width = this.layout.shape_sift_left + (16 + this.layout.rect_margin_left + item_w) * items.length;
                }
            }
            else {
                if (mode == "svg") {
                    svg_width = this.layout.padding_left + this.layout.shape_sift_left + item_w + 5;
                }
                if (mode == "html") {
                    svg_width = this.layout.shape_sift_left + 16 + this.layout.rect_margin_left + item_w + 5;
                }
            }
        }
        if (title_width > svg_width) {
            svg_width = title_width;
        }
        
        // svg-height
        var svg_height = this.options.svg_size[1];
        if (svg_height == 0) {
            if (this.options.horizon == true) {
                svg_height = this.layout.padding_top + title_height + this.layout.rect_height + this.layout.text_font_size + 10;
            }
            else {
                svg_height = this.layout.padding_top + title_height + items.length * (this.layout.rect_height + this.layout.shape_padding) + 10;
            }
        }
        
        return {"svg_width": svg_width, "svg_height": svg_height, "rect_width": rect_width, "items": items, "colors": colors, "enables": enables};
    }
    // -----------------------------------
    // over-ride
    // -----------------------------------
    p.stack_change = function(d, i, on) { 
        console.log("legend.stack_change(): called base-function, please over-ride.");
    }
    
    return legend;
})();

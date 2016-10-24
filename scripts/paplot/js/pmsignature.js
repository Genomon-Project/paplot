var pmsignature = (function()
{

    var pmsignature = function(id)
    {
        this.id = id;
        this.signature_rects = [];
        
        this.options =
        {
            padding_left: 10,
            padding_right: 10,
            padding_top: 10,
            padding_bottom: 10,
            border_width: 1,
            border_color: "#AAAAAA",
            border_margin_left: 5,
            border_margin_right: 5,
            border_margin_top: 5,
            border_margin_bottom: 5,
            resizeable_w: false,
            resizeable_h: false,
            tooltip: { enable: true, position: "parent", sift_x: 0, sift_y: 0, },
            multi_select: false,
            titles: [],
            
        };
        this.strand = {
            data : [], // [plus, minus]
            colorset: ["#00BEC3","#F263E2"], // [plus, minus]
            text : ["+", "-"],
            font_color: "#FFFFFF",
            font_size: "18px",
            font_family: "'Helvetica Neue', Helvetica, Arial, sans-serif",
            tooltips: [],
        };
        // don't touch
        this.svg_obj = 0;
        this.svg = {
            h: 0,
            w: 0,
        };
        this.plot = {
            h: 0,
            w: 0,
        };
        this.padding = {
            top : 0,
            right : 0,
            bottom : 0,
            left : 0,
        };
        
        this.arrow = {
            path: [{x:0.5, y:0},{x:1.0, y:0.5},{x:0.75, y:0.5},{x:0.75, y:1.0},{x:0.25, y:1.0},{x:0.25, y:0.5},{x:0, y:0.5},],
            colorset: "#A8A8A8",
        };
        this.rect = {
            path: [{x:0, y:0},{x:0, y:1},{x:1, y:1},{x:1, y:0},],
        };
    };
    
    var p = pmsignature.prototype;
    
    // -----------------------------------
    // signature templates
    // -----------------------------------
    p.box_template = (function() {
        var box_template = function(name, a, b) {
            this.name = name;
            this.data = [];
            for (var i = 0; i < a; i++) {
                this.data[i] = [];
                for (var j = 0; j < b; j++) {
                    this.data[i][j] = 0;
                }
            }
                    
            this.tooltips = [];
            this.position = 0;      // alt: 0, left -> right: 1,2,3...
            this.options =
            {
                colorset:["#F8766D", "#7CAE00", "#00BFC4", "#C77CFF"],
            };
            this.label = {
                text: ["A","C","G","T"],
                font_color: "#FFFFFF",
                font_size: "18px",
                font_family: "'Helvetica Neue', Helvetica, Arial, sans-serif",
            };
            
            // for alt
            this.horizontal_rate = [1,0,0,0];
            this.border_width = 0;
            
            // for ref
            this.reduce_rate = 1.0;
        };
        
        var p_sub = box_template.prototype;
        
        p_sub.resize = function(parent, plot_area) {
            
            var f = Number(this.label.font_size.replace(/px/g, "").replace(/em/g, ""));

            var border_width = this.border_width;
            var height = plot_area.height * this.reduce_rate;
            
            parent.svg_obj.selectAll("g." + this.name).selectAll("rect")
                .attr("x", function(d, i) {
                    return plot_area.x + d.x_rate * plot_area.width;
                })
                .attr("y", function(d, i) {
                    var y = plot_area.y + plot_area.height - ((d.h_rate + d.y_rate) * height);
                    if (y < 0) y = 0;
                    return y;
                })
                .attr("width", function(d, i) {
                    return d.w_rate * plot_area.width - border_width;
                })
                .attr("height", function(d, i) {
                    return d.h_rate * height;
                })
            ;
            
            parent.svg_obj.selectAll("g." + this.name + "_label").selectAll("text")
                .attr("x", function(d, i) {
                    return plot_area.x + d.x_rate * plot_area.width + d.w_rate * plot_area.width / 2;
                })
                .attr("y", function(d, i) {
                    var y = plot_area.y + plot_area.height - (d.h_rate * height)/2 - (d.y_rate * height) + f/2;
                    if (y <0) y = 0;
                    return y;
                })
            ;
        }
        
        p_sub.update = function(parent) {
            // call me after draw()
            
            var that = this;
            
            // bar
            parent.svg_obj.selectAll("g." + this.name)
                .selectAll("rect")
                .remove();
            
            var stack_sum = [];
            for (var i=0; i < this.data.length; i++) {
                stack_sum[i] = 0;
                for (var j=0; j < this.data[i].length; j++) {
                    stack_sum[i] += this.data[i][j];
                }
            }
            
            var width_sum = 0;
            for (var i=0; i < this.horizontal_rate.length; i++) {
                width_sum += this.horizontal_rate[i];
            }
            var width_rate_list = [];
            for (var i=0; i < this.horizontal_rate.length; i++) {
                if (width_sum > 0) {
                    width_rate_list[i] = this.horizontal_rate[i]/width_sum;
                }
                else {
                    width_rate_list[i] = 0;
                }
            }
            
            // set dataset from data
            var sum, sift_y, bar_index, width_rate;
            var sift_x = 0;
            var dataset = [];
            var num = this.data[0].length;
            for (var i=0; i < this.data.length * num; i++) {
                if (i%num == 0) {
                    bar_index = Math.floor(i/num);
                    sum = stack_sum[bar_index];
                    width_rate = width_rate_list[bar_index];
                    sift_y = 0;
                    if (bar_index > 0) {
                        sift_x += width_rate_list[bar_index-1];
                    }
                }
                var h_rate = 0;
                if (sum > 0) {
                    h_rate = this.data[bar_index][i%num]/sum;
                }
                dataset[i] = {x_rate: sift_x, y_rate: sift_y, w_rate: width_rate, h_rate: h_rate};
                sift_y += dataset[i].h_rate;
            };
            
            parent.svg_obj.selectAll("g." + this.name)
                .selectAll("rect")
                .data(dataset)
                .enter()
                .append("rect")
                .attr("y", 0)
                .attr("x", 0)
                .attr("width", 0)
                .attr("height", 0)
                .style("fill", function(d, i) {
                    return that.options.colorset[i];
                })
                .attr("class", function(d, i) {
                    return that.label.text[i];
                })
                .on("mouseover", function(d, i) {
                    if (parent.options.tooltip.enable == false) {
                        return;
                    }
                    // remove last tooltip data
                    d3.select("#tooltip").selectAll("p").remove();

                    // add text to tooltip
                    for (var p=0; p < that.tooltips.length; p++) {
                        d3.select("#tooltip").append("p").attr("id", "text").append("pre").text(that.tooltips[p]);
                    }

                    //Show the tooltip
                    d3.select("#tooltip").classed("hidden", false);
                    
                    var x = parent.options.tooltip.sift_x;
                    var y = parent.options.tooltip.sift_y;
                    
                    var rect = document.getElementById(parent.id).getBoundingClientRect();
                    var div_x = parseFloat(rect.left) + window.pageXOffset + 10;
                    var div_y = parseFloat(rect.top) + window.pageYOffset + 10;
                    
                    if (parent.options.tooltip.position == "parent") {
                        x = x + div_x;
                        y = y + div_y;
                    }
                    else if (parent.options.tooltip.position == "bar") {
                        x = x + parseFloat(d3.select(this).attr("x")) + div_x;
                        y = y + parseFloat(d3.select(this).attr("y")) + div_y;
                    }
                    //Update the tooltip position and value
                    d3.select("#tooltip")
                        .style("left", x + "px")
                        .style("top", y + "px");
                })
                .on("mouseout", function() {
                    if (parent.options.tooltip.enable == false) {
                        return;
                    }
                    //Hide the tooltip
                    d3.select("#tooltip").classed("hidden", true);
                })
                ;
            
            // label
            parent.svg_obj.selectAll("g." + this.name + "_label")
                .selectAll("text")
                .remove();
            
            parent.svg_obj.selectAll("g." + this.name + "_label")
                .selectAll("text")
                .data(dataset)
                .enter()
                .append("text")
                .attr("class", function(d, i) {
                    return that.label.text[i];
                })
                .text(function(d, i) {
                    if (d.w_rate < 0.25) return "";
                    if (that.reduce_rate < 0.5) return "";
                    if (d.h_rate < 0.25) return "";
                    return that.label.text[i]; 
                })
                .attr("text-anchor", "middle")
                .attr("font-size", this.label.font_size)
                .attr("font-family", this.label.font_family)
                .style("fill", this.label.font_color)
            ;
            
        }
        
        // -----------------------------------
        // initialize
        // -----------------------------------
        p_sub.initialize = function(parent) {
            
            // rect
            parent.svg_obj.append("g")
                .attr("class", this.name)
                .selectAll("rect")
                .data([])
                .enter()
                ;
            
            // label
            parent.svg_obj.append("g")
                .attr("class", this.name + "_label")
                .selectAll("line")
                .data([])
                .enter()
                ;
        }
        
        return box_template;
    })();
    
    p.title_template = (function() {
        var title_template = function(title) {
            this.title = title;
            this.orient = "";   // "left/right/top/bottom"
            this.wide = 0;
            this.sift_x = 0;
            this.sift_y = 0;
            this.color = "#000";
            this.font_size = "14px";
            this.text_anchor = "middle";
            this.font_family = "'Helvetica Neue', Helvetica, Arial, sans-serif";
            this.text_rotate = 0;
        };
        return title_template;
    })();

    // -----------------------------------
    // get base value each stack's bar
    // -----------------------------------
    p.bar_base = function(dataset, stack_index, key) {
        var base = 0;
        for (var i=0; i < stack_index; i++) {
            if (dataset[i].enable == false) continue;
            var pos = dataset[i].keys.indexOf(key);
            if (pos < 0)  continue;
            base = base + dataset[i].data[pos];
        }
        return base;
    }
    // -----------------------------------
    // resize svg
    // -----------------------------------
    p.resize = function() {
        var that = this;
        
        // ----- update svg size -----
        if (this.options.resizeable_w == true) {
            this.svg.w = parseInt(d3.select("#" + this.id).style("width"), 10);
        }
        if (this.options.resizeable_h == true) {
            this.svg.h = parseInt(d3.select("#" + this.id).style("height"), 10);
        }
        
        // plot area
        this.plot.w = this.svg.w - this.padding.left - this.padding.right;
        this.plot.h = this.svg.h - this.padding.top - this.padding.bottom;
        
        // svg
        this.svg_obj.style("width", this.svg.w + 'px');
        this.svg_obj.style("height", this.svg.h + 'px');

        // ----- set rect size -----
        var grid_size_x = this.plot.w/((this.signature_rects.length - 2)*5 + 4);
        var rect_width = grid_size_x * 4;
        var spacer = grid_size_x;
        var rect_height = this.plot.h/3;
        
        for (var idx=0; idx < this.signature_rects.length; idx++) {
            
            var each_plot_area = {};
            if (this.signature_rects[idx].position == 0) {
                each_plot_area = 
                    {x: this.padding.left + this.plot.w/2 - grid_size_x*2, 
                     y: this.padding.top,
                     width: rect_width, height: rect_height};
            }
            else {
                each_plot_area = 
                    {x: this.padding.left + (rect_width + spacer) * (idx-1), 
                     y: this.padding.top + rect_height * 2,
                     width: rect_width, height: rect_height};
            }
            
            this.signature_rects[idx].resize(this, each_plot_area);
        }
        
        // ----- appendix -----
        // strand
        if (this.strand.data.length == 2) {
            strand_w = rect_width*0.5;
            strand_h = rect_height;
            strand_padding_x = rect_width*0.25;
            strand_padding_y = rect_height*0;
            strand_x = this.padding.left + this.plot.w - rect_width + strand_padding_x;
            strand_y = this.padding.top + rect_height;
            
            this.svg_obj.selectAll("g.strand").selectAll("rect")
                .attr("x", function(d, i) {
                    return (strand_x + strand_w/2 * i);
                })
                .attr("y", function(d) {
                    return strand_y - d*strand_h;
                })
                .attr("width", function(d) {
                    return strand_w/2;
                })
                .attr("height", function(d) {
                    return d*strand_h;
                })
            ;
            var f = Number(this.strand.font_size.replace(/px/g, "").replace(/em/g, ""));
            
            this.svg_obj.selectAll("g.strand_label").selectAll("text")
                .attr("x", function(d, i) {
                    return (strand_x + strand_w/2 * i + strand_w/4);
                })
                .attr("y", function(d) {
                    return strand_y - d*strand_h/2 + f/2;
                })
                ;
        }
        
        // arrow
        arrow_w = rect_width*0.6;
        arrow_h = rect_height*0.6;
        arrow_padding_x = rect_width*0.2;
        arrow_padding_y = rect_height*0.2;
        arrow_x = this.padding.left + this.plot.w/2 - grid_size_x*2 + arrow_padding_x;
        arrow_y = this.padding.top + rect_height + arrow_padding_y;
        
        lineFunction = d3.svg.line()
            .x(function(d) { return d.x * arrow_w + arrow_x; })
            .y(function(d) { return d.y * arrow_h + arrow_y; })
            .interpolate("linear");

        this.svg_obj.selectAll("g.arrow").selectAll("path")
            .attr("d", function(d) { return lineFunction(that.arrow.path) + "Z"; })

        // border-line
        // rect area
        var rect_w = this.svg.w - this.options.border_margin_left - this.options.border_margin_right - this.options.border_width;
        var rect_h = this.svg.h - this.options.border_margin_top - this.options.border_margin_bottom - this.options.border_width;
        var rect_x = this.options.border_margin_left + this.options.border_width/2;
        var rect_y = this.options.border_margin_top + this.options.border_width/2;
        
        //var rect_w = this.svg.w - this.options.border_margin_left - this.options.border_margin_right;
        //var rect_h = this.svg.h - this.options.border_margin_top - this.options.border_margin_bottom;
        //var rect_x = this.options.border_margin_left;
        //var rect_y = this.options.border_margin_top;
        
        lineFunction = d3.svg.line()
            .x(function(d) { return d.x * rect_w + rect_x; })
            .y(function(d) { return d.y * rect_h + rect_y; })
            .interpolate("linear");

        this.svg_obj.selectAll("g.border").selectAll("path")
            .attr("d", function(d) { return lineFunction(that.rect.path) + "Z"; })
        
        // title
        if (this.options.titles.length > 0) {
            var trans = [];
            for (var i = 0; i< this.options.titles.length; i++) {
                trans.push(this.title_pos(this.options.titles[i].wide, this.options.titles[i].orient, this.options.titles[i].text_anchor, 
                        this.options.titles[i].text_rotate, this.options.titles[i].sift_x, this.options.titles[i].sift_y, 
                        this.svg, this.plot, this.padding,
                        this.options.padding_top, this.options.padding_bottom, this.options.padding_right, this.options.padding_left));
            }
            
            this.svg_obj.selectAll("g.title").selectAll("text")
                .attr('transform', function(d,i){
                    return ('translate(' + trans[i] + ') rotate(' + that.options.titles[i].text_rotate + ')');
                });
        }
    }

    // -----------------------------------
    // title's position
    // -----------------------------------
    p.title_pos = function(wide, orient, anchor, rotate, sift_x, sift_y, svg, plot, padding, org_padding_top, org_padding_bottom, org_padding_right, org_padding_left) {
        var x = 0;
        var y = 0;
        if (orient == "left") {
            x = org_padding_left + sift_x;
            y = padding.top + sift_y;
            
            if (String(rotate) == "90") { // 1
                x = x + Math.floor(wide/2);

                if (anchor == "end") { y = y + plot.h; }
                else if (anchor == "middle") { y = y + Math.floor(plot.h/2); }
            }
            else if (String(rotate) == "-90") { // 2
                x = x + Math.floor(wide/2);

                if (anchor == "start") { y = y + plot.h; }
                else if (anchor == "middle") { y = y + Math.floor(plot.h/2); }
            }
            else { // 3 (irregular)
                if (anchor == "end") { y = y + wide; }
                else if (anchor == "middle") { y = y + Math.floor(wide/2); }
            }
        }
        if (orient == "right") {
            x = svg.w - org_padding_left - wide + sift_x;
            y = padding.top + sift_y;
            
            if (String(rotate) == "90") { // 1
                x = x + Math.floor(wide/2);

                if (anchor == "end") { y = y + plot.h; }
                else if (anchor == "middle") { y = y + Math.floor(plot.h/2); }
            }
            else if (String(rotate) == "-90") { // 2
                x = x + Math.floor(wide/2);

                if (anchor == "start") { y = y + plot.h; }
                else if (anchor == "middle") { y = y + Math.floor(plot.h/2); }
            }
            else { // 3 (irregular)
                if (anchor == "end") { y = y + wide; }
                else if (anchor == "middle") { y = y + Math.floor(wide/2); }
            }
        }
        if (orient == "top") {
            x = padding.left + sift_x;
            y = org_padding_top + sift_y;
            
            if (String(rotate) ==  "90") { // 1 (irregular)
                if (anchor ==   "end") { y = y + wide; }
                else if (anchor ==   "middle") { y = y + Math.floor(wide/2); }
            }
            else if (String(rotate) == "-90") { // 2 (irregular)
                if (anchor == "start") { y = y + wide; }
                else if (anchor ==   "middle") { y = y + Math.floor(wide/2); }
            }
            else { // 3
                y = y +Math.floor(wide/2);
                if (anchor == "end") { x = x + plot.w; }
                else if (anchor == "middle") { x = x + Math.floor(plot.w/2); }
            }
        }
        if (orient == "bottom") {
            x = padding.left + sift_x;
            y = svg.h - org_padding_bottom - wide + sift_y;
            
            if (String(rotate) ==  "90") { // 1 (irregular)
                if (anchor ==   "end") { y = y + wide; }
                else if (anchor ==   "middle") { y = y + Math.floor(wide/2); }
            }
            else if (String(rotate) == "-90") { // 2 (irregular)
                if (anchor == "start") { y = y + wide; }
                else if (anchor ==   "middle") { y = y + Math.floor(wide/2); }
            }
            else { // 3
                y = y + wide;
                if (anchor == "end") {
                    x = x + plot.w;
                }
                else if (anchor == "middle") {
                    x = x + Math.floor(plot.w/2);
                }
            }
        }
        return (x + ", " + y);
    }

    // -----------------------------------
    // update
    // -----------------------------------
    p.update = function() {
        // call me after draw()
        
        // rect
        for (var idx=0; idx < this.signature_rects.length; idx++) {
            this.signature_rects[idx].update(this);
        }
        
        // strand
        if (this.strand.data.length == 2) {
            var that = this;

            this.svg_obj.selectAll("g.strand")
                .selectAll("rect")
                .remove();
            
            dataset = [];
            dataset[0] = this.strand.data[0] / (this.strand.data[0] + this.strand.data[1]);
            dataset[1] = this.strand.data[1] / (this.strand.data[0] + this.strand.data[1]);
            this.svg_obj.selectAll("g.strand")
                .selectAll("rect")
                .data(dataset)
                .enter()
                .append("rect")
                .attr("y", 0)
                .attr("x", 0)
                .attr("width", 0)
                .attr("height", 0)
                .style("fill", function(d, i) {
                    return that.strand.colorset[i];
                })
                .attr("class", function(d, i) {
                    if (i == 0) return "plus";
                    return "minus";
                })
                .on("mouseover", function(d, i) {
                    if (that.options.tooltip.enable == false) {
                        return;
                    }
                    // remove last tooltip data
                    d3.select("#tooltip").selectAll("p").remove();

                    // add text to tooltip
                    for (var p=0; p < that.strand.tooltips.length; p++) {
                        d3.select("#tooltip").append("p").attr("id", "text").append("pre").text(that.strand.tooltips[p]);
                    }

                    //Show the tooltip
                    d3.select("#tooltip").classed("hidden", false);
                    
                    var x = that.options.tooltip.sift_x;
                    var y = that.options.tooltip.sift_y;
                    
                    var rect = document.getElementById(that.id).getBoundingClientRect();
                    var div_x = parseFloat(rect.left) + window.pageXOffset + 10;
                    var div_y = parseFloat(rect.top) + window.pageYOffset + 10;
                    
                    if (that.options.tooltip.position == "parent") {
                        x = x + div_x;
                        y = y + div_y;
                    }
                    else if (that.options.tooltip.position == "bar") {
                        x = x + parseFloat(d3.select(this).attr("x")) + div_x;
                        y = y + parseFloat(d3.select(this).attr("y")) + div_y;
                    }
                    //Update the tooltip position and value
                    d3.select("#tooltip")
                        .style("left", x + "px")
                        .style("top", y + "px");
                })
                .on("mouseout", function() {
                    if (that.options.tooltip.enable == false) {
                        return;
                    }
                    //Hide the tooltip
                    d3.select("#tooltip").classed("hidden", true);
                })
                ;
            // label
            this.svg_obj.selectAll("g.strand_label")
                .selectAll("text")
                .remove();
            
            this.svg_obj.selectAll("g.strand_label")
                .selectAll("text")
                .data(dataset)
                .enter()
                .append("text")
                .attr("class", function(d, i) {
                    return that.strand.text[i];
                })
                .text(function(d, i) {
                    if (d.value < 0.25) return "";
                    return that.strand.text[i]; 
                })
                .attr("text-anchor", "middle")
                .attr("font-size", this.strand.font_size)
                .attr("font-family", this.strand.font_family)
                .style("fill", this.strand.font_color)
            ;
        }
        
        this.resize();
    }
    
    // -----------------------------------
    // initialize
    // -----------------------------------
    p.draw = function() {
        var that = this;
        
        this.svg_obj = d3.select("#" + this.id).append("svg");

        // paddings
        this.padding.left = this.options.padding_left;
        this.padding.right = this.options.padding_right;
        this.padding.top = this.options.padding_top;
        this.padding.bottom = this.options.padding_bottom;
        
        var wide_top = [];
        var wide_bottom = [];
        var wide_left = [];
        var wide_right = [];
        
        for (var i = 0; i< this.options.titles.length; i++) {
            switch(this.options.titles[i].orient) {
                case "left":
                    wide_left.push(this.options.titles[i].wide);
                    break;
                case "right":
                    wide_right.push(this.options.titles[i].wide);
                    break;
                case "top":
                    wide_top.push(this.options.titles[i].wide);
                    break;
                case "bottom":
                    wide_bottom.push(this.options.titles[i].wide);
                    break;
                case "":
                    break;
                default:
                    console.log("[debug] this.options.titles[" + i + "].orient: undefined value. " + this.options.titles[i].orient);
                    break;
            }
        }
        if (wide_left.length > 0) {
            this.padding.left = this.padding.left + Math.max.apply(null, wide_left);
        }
        if (wide_right.length > 0) {
            this.padding.right = this.padding.right + Math.max.apply(null, wide_right);
        }
        if (wide_top.length > 0) {
            this.padding.top = this.padding.top + Math.max.apply(null, wide_top);
        }
        if (wide_bottom.length > 0) {
            this.padding.bottom = this.padding.bottom + Math.max.apply(null, wide_bottom);
        }
        
        // rect
        for (var idx=0; idx < this.signature_rects.length; idx++) {
            this.signature_rects[idx].initialize(this);
        }
        
        // strand
        if (this.strand.data.length == 2) {
            this.svg_obj.append("g")
                .attr("class", "strand")
                .selectAll("rect")
                .data([])
                .enter()
                ;
            // label
            this.svg_obj.append("g")
                .attr("class", "strand_label")
                .selectAll("line")
                .data([])
                .enter()
                ;
        }
        // arrow
        this.svg_obj.append("g").attr("class", "arrow")
            .append("path")
            .attr("d", []) 
            .attr("fill", this.arrow.colorset);

        // border-line
        this.svg_obj.append("g").attr("class", "border")
            .append("path")
            .attr("d", []) 
            .attr("fill", "none")
            .attr("stroke", this.options.border_color)
            .attr("stroke-width", this.options.border_width + "px")
            .attr("shape-rendering", "crispEdges");
        
        // title
        if (this.options.titles.length > 0) {
            var titles = this.svg_obj.append("g").attr("class", "title");
            
            for (var i = 0; i< this.options.titles.length; i++) {
                titles
                    .append("text")
                    .text(this.options.titles[i].title)
                    .attr("text-color", this.options.titles[i].text_color)
                    .attr("text-anchor", this.options.titles[i].text_anchor)
                    .attr("font-size", this.options.titles[i].font_size)
                    .attr("font-family", this.options.titles[i].font_family);
            }
        }
        
        this.update();
    }
    
    // -----------------------------------
    // bar select
    // -----------------------------------
    p.bar_select = function(key, on) {
        var that = this;

        for (var idx = 0; idx < this.dataset.length; idx++) {

            this.svg_obj.selectAll("g." + this.dataset[idx].name).selectAll("rect")
                .style("fill", function(d, i) {
                    
                    var target = "selected";
                    if (that.options.multi_select == true) {
                        target = target + "." + key;
                    }
                    
                    // target rect
                    var classes = this.className.baseVal.split(" ");
                    var me = false;
                    for (var k = 0; k< classes.length; k++) {
                        if (classes[k] == key) {
                            me = true;
                            break;
                        }
                    }
                    if (me == true) {
                        d3.select(this).classed(target, on);
                    }
                    else {
                        if (that.options.multi_select == false) {
                            d3.select(this).classed(target, false);
                        }
                    }
                    classes = this.className.baseVal.split(" ");
                    var selected = false;
                    for (var k = 1; k < classes.length; k++) {
                        if (classes[k].indexOf("selected") == 0) {
                            selected = true;
                            break;
                        }
                    }
                    if (selected == true) {
                        return that.dataset[idx].color_fill_hilight;
                    }
                    return that.dataset[idx].color_fill;
                });
        }
        
    }

    p.reset_select = function() {
        var that = this;

        for (var idx = 0; idx < this.dataset.length; idx++) {
            this.svg_obj.selectAll("g." + this.dataset[idx].name).selectAll("rect")
                .style("fill", function(d, i) {
                    
                    var classes = this.className.baseVal.split(" ");
                    for (var k = 0; k< classes.length; k++) {
                        if (classes[k].indexOf("selected") == 0) {
                            d3.select(this).classed(classes[k], false);
                        }
                    }
                    return that.dataset[idx].color_fill;
                });
        }
    }
    // -----------------------------------
    // over-ride
    // -----------------------------------
    p.bar_selected = function(key, on) { 
        console.log("base function, please over-ride.");
    }

    return pmsignature;
})();

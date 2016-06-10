var mut_bar = (function()
{

    var mut_bar = function(id)
    {
        this.id = id;

        this.dataset = [];
        this.keys = [];
        this.tags = [];
        
        this.options =
        {
            padding_left: 10,
            padding_right: 10,
            padding_top: 10,
            padding_bottom: 10,
            resizeable_w: false,
            resizeable_h: false,
            tooltip: { enable: true, position: "parent", sift_x: 0, sift_y: 0, },
            multi_select: false,
            direction_x: "left-right",
            direction_y: "bottom-up",
            grid_xs: [],
            grid_y: 0,
            titles: [],
        };

        // don't touch
        this.svg_obj = 0;
        this.y_axis = 0;
        this.asc = {
            bar : true,
            value : false,
            bar_yoko: false,
            sort_list: [],   // {key: index}
        };
        this.padding = {
            top : 0,
            right : 0,
            bottom : 0,
            left : 0,
        };
        this.plot = {
            h: 0,
            w: 0,
        };
        this.svg = {
            h: 0,
            w: 0,
        };
    };
    
    var p = mut_bar.prototype;
    
    // -----------------------------------
    // data templates
    // -----------------------------------
    p.dataset_template = (function() {
        var dataset_template = function(name) {
            this.data = [];
            this.keys = [];
            this.tooltips = [];
            this.color_fill = "#333";
            this.color_fill_hilight = "#F00";
            this.name = name;
            this.enable = true;
        };
        return dataset_template;
    })();

    p.tag_template = (function() {
        var tag_template = function(name) {
            this.name = name;
            this.values = [];
            this.note = "";     // don't use in this package. for user's.
        };
        return tag_template;
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
            this.text_rotate = 0;
        };
        return title_template;
    })();

    p.grid_template = (function() {
        var grid_template = function() {
            this.orient = "";   // "left/right/top/bottom"
            this.border_color = "#000";
            this.border_width = "1px";
            this.border_opacity = 1.0;
            this.labels = [];
            this.keys = [];
            this.wide = 0;
            this.font_color = "#000";
            this.font_size = "14px";
            this.text_anchor = "middle";
            this.text_rotate = 0;
            
            // axis Y only.
            this.ticks = 2;
            
            // axis X only.
            this.sift_x = 0;
            this.sift_y = 0;
        };
        return grid_template;
    })();

    // -----------------------------------
    // sort
    // -----------------------------------
    p.sort = function(tag_name, asc)
    {
        this.set_sort_item(tag_name, asc);
        this.bar_sort();
    }

    p.set_sort_item = function(tag_name, asc) {
      
        var tags = [];
        for (var j = 0; j< tag_name.length; j++) {
            for (var i = 0; i< this.tags.length; i++) {
                if (this.tags[i].name == tag_name[j]) {
                    tags.push(this.tags[i].values);
                    break;
                }
            }
        }
        
        var item = [];
        for (var i = 0; i< this.keys.length; i++) {
            var tags2 = [];
            for (var j = 0; j< tags.length; j++) {
                tags2[j] = tags[j][i];
            }
            item[i] = [this.keys[i], tags2];
        }
        
        item.sort(
            function(a,b){
                for (var i = 0; i< a[1].length; i++) {
                    var ret1 = 1, ret2 = -1;
                    if (asc[i] == true) {
                        ret1 = -1, ret2 = 1;
                    }
                    if( a[1][i] < b[1][i] ) return ret1;
                    if( a[1][i] > b[1][i] ) return ret2;
                }
                return 0;
            }
        );
        var item_index = {};
        for (var i = 0; i< item.length; i++) {
            item_index[item[i][0]] = i;
        }
            this.asc.sort_list = item_index;

    }

    p.pos_from_sort_list = function(sort_list, key, def) {
        
        if (sort_list.length == 0) return def;
        if (key in sort_list == false) return def;

        return sort_list[key];
    }
    
    p.bar_sort = function() {
        var that = this;

        // bar
        var x_items = this.x_items();
        var x = "x", y = "y";
        var padding1 = this.padding.left, padding2 = this.padding.top;
        var plot1 = this.plot.w, plot2 = this.plot.h;

        if (this.asc.bar_yoko == true) {
            x = "y", y = "x";
            padding1 = this.padding.top, padding2 = this.padding.left;
            plot1 = this.plot.h, plot2 = this.plot.w;
        }

        for (var idx = 0; idx < this.dataset.length; idx++) {
            this.svg_obj.selectAll("g." + this.dataset[idx].name).selectAll("rect")
                .attr(x, function(d, i) {
                    var item = p.pos_from_sort_list(that.asc.sort_list, that.dataset[idx].keys[i], -1);
                    return p.xy_position (that.asc.bar, plot1, padding1, x_items, item, 0);
                });
        }

        // x-axis
        if (this.options.grid_xs.length > 0) {
            this.svg_obj.selectAll("g.label_x").selectAll("text")
                .attr('transform', function(d, i)  {
                    var classes = this.className.baseVal.split(" ");
                    var idx = Number(classes[0]);
                    var f = Number(that.options.grid_xs[idx].font_size.replace(/px/g, "").replace(/em/g, ""));
                    var tx = that.options.grid_xs[idx].sift_x;
                    var ty = that.options.grid_xs[idx].sift_y;
                    var item = p.pos_from_sort_list(that.asc.sort_list, classes[1], -1);

                    if (that.options.grid_xs[idx].orient == "bottom") {
                        tx = tx + p.xy_position(that.asc.bar, that.plot.w, that.padding.left, x_items, item, Math.floor(that.plot.w / x_items / 2));
                        ty = ty + that.padding.top + that.plot.h + f;
                    }
                    else if (that.options.grid_xs[idx].orient == "top") {
                        tx = tx + p.xy_position(that.asc.bar, that.plot.w, that.padding.left, x_items, item, Math.floor(that.plot.w / x_items / 2));
                        ty = ty + that.padding.top - f;
                    }
                    else if (that.options.grid_xs[idx].orient == "left") {
                        tx = tx + that.padding.left - f;
                        ty = ty + p.xy_position(that.asc.bar, that.plot.h, that.padding.top, x_items, item, Math.floor(that.plot.h / x_items / 2));
                    }
                    else if (that.options.grid_xs[idx].orient == "right") {
                        tx = tx + that.padding.left + that.plot.w + f;
                        ty = ty + p.xy_position(that.asc.bar, that.plot.h, that.padding.top, x_items, item, Math.floor(that.plot.h / x_items / 2));
                    }
                    return 'translate(' + tx + ', ' + ty + ') rotate(' + that.options.grid_xs[idx].text_rotate + ')';
                });

            this.svg_obj.selectAll("g.grid_x").selectAll("line")
                .attr(y + "1", function(d,i){
                    if (String(d).length > 0) return padding2;
                    return 0;
                })
                .attr(y + "2", function(d,i){
                    if (String(d).length > 0) return padding2 + plot2;
                    return 0;
                })
                .attr(x + "1", function(d,i){
                    var key = this.className.baseVal.split(" ")[1];
                    var item = p.pos_from_sort_list(that.asc.sort_list, key, -1);
                    return p.xy_position_grid(that.asc.bar, plot1, padding1, x_items, item, 0);
                })
                .attr(x + "2", function(d,i){
                    var key = this.className.baseVal.split(" ")[1];
                    var item = p.pos_from_sort_list(that.asc.sort_list, key, -1);
                    return p.xy_position_grid(that.asc.bar, plot1, padding1, x_items, item, 0);
                });
        }
    }
    
    // -----------------------------------
    // get number of items
    // -----------------------------------
    p.x_items = function() {
        return this.keys.length;
    }
    
    // -----------------------------------
    // update svg size
    // -----------------------------------
    p.update_plot_size = function() {
        
        // svg
        if (this.options.resizeable_w == true) {
            this.svg.w = parseInt(d3.select("#" + this.id).style("width"), 10);
        }
        if (this.options.resizeable_h == true) {
            this.svg.h = parseInt(d3.select("#" + this.id).style("height"), 10);
        }
        
        // plot area
        this.plot.w = this.svg.w - this.padding.left - this.padding.right;
        this.plot.h = this.svg.h - this.padding.top - this.padding.bottom;
    }
    
    // -----------------------------------
    // bar padding
    // -----------------------------------
    p.bar_padding = function(wide, items) {
        if (wide / items > 3) {
            return 1;
        }
        return 0;
    }
    
    // -----------------------------------
    // x/y position
    // -----------------------------------
    p.xy_position = function(asc, wide, padding1, items, i, sift) {
        var pos = 0;
        if (asc == true) {
            return padding1 + i*wide/items + sift;
        }
        return padding1 + wide - (i+1) * wide/items + sift;
    }
    p.xy_position_grid = function(asc, wide, padding1, items, i, sift) {
        var pos = 0;
        if (asc == true) {
            return padding1 + i*wide/items + sift;
        }
        return padding1 + wide - (i) * wide/items + sift;
    }

    // -----------------------------------
    // resize svg
    // -----------------------------------
    p.resize = function() {
        var that = this;
        
        // ----- update size -----
        this.update_plot_size();
        
        // svg
        this.svg_obj.style("width", this.svg.w + 'px');
        this.svg_obj.style("height", this.svg.h + 'px');

        // bar
        var x_items = this.x_items();
        
        for (var idx=0; idx < this.dataset.length; idx++) {
            var obj = this.svg_obj.selectAll("g." + this.dataset[idx].name).selectAll("rect");

            if (this.asc.bar_yoko == true) {
                obj
                    .attr("height", this.plot.h / x_items -  this.bar_padding(this.plot.h, x_items));
            }
            else {
                obj
                    .attr("width", this.plot.w / x_items -  this.bar_padding(this.plot.w, x_items));
            }
        }

        // y-axis
        if (this.options.grid_y != 0) {
            var trans = "";
            var ticksize = 0;
            if (this.options.grid_y.orient == "left") {
                trans = "translate(" + (this.padding.left) + ", " + (this.padding.top) + ")";
                ticksize = -this.plot.w;
            }
            else if (this.options.grid_y.orient == "right") {
                trans = "translate(" + (this.padding.left + this.plot.w) + ", " + (this.padding.top) + ")";
                ticksize = -this.plot.w;
            }
            else if (this.options.grid_y.orient == "top") {
                trans = "translate(" + (this.padding.left) + ", " + (this.padding.top) + ")";
                ticksize = this.plot.h;
            }
            else if (this.options.grid_y.orient == "bottom") {
                trans = "translate(" + (this.padding.left) + ", " + (this.padding.top + this.plot.h) + ")";
                ticksize = this.plot.h;
            }
            this.svg_obj.selectAll("g.axis")
                .attr("transform", trans)
                .call(
                    this.y_axis
                    .tickSize(ticksize)
                );
        }
        
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

        this.bar_sort();
        this.change_stack();
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
    // chenge menbers of stack
    // -----------------------------------
    p.change_stack = function() {
        var that = this;
        
        // get max number from stack
        var sum_array = [];
        for (var i = this.dataset.length - 1; i >= 0; i--) {
            if (this.dataset[i].enable == false) continue;
            
            for (var j = 0; j < this.keys.length ; j++) {
                var key = this.keys[j];
                var pos = this.dataset[i].keys.indexOf(key);
                var value = 0;
                if (pos >= 0) value = this.dataset[i].data[pos];
                
                var base = p.bar_base(this.dataset, i, key);
                sum_array[j] = base + value;
            }
            break;
        }
        var max =  Math.max.apply(null, sum_array);
        if (max == 0) max = 1;
        
        // bar
        var y = "y";
        var height = "height";
        var plot1 = this.plot.h;
        var padding1 = this.padding.top
        if (this.asc.bar_yoko == true) {
            y = "x";
            height = "width";
            plot1 = this.plot.w;
            padding1 = this.padding.left
        }
        for (var idx=0; idx < this.dataset.length; idx++) {
            this.svg_obj.selectAll("g." + this.dataset[idx].name).selectAll("rect")
                    .attr(y, function(d, i) {
                        var base = p.bar_base(that.dataset, idx, that.dataset[idx].keys[i]);
                        if (that.asc.value == true) {
                            return padding1 + (base) * plot1 / max;
                        }
                        return padding1 + plot1 - ((d + base) * plot1 / max);
                    })
                    .attr(height, function(d) {
                        if (that.dataset[idx].enable == false) {
                            return 0;
                        }
                        return (d * plot1 / max);
                    });
        }
        
        // y-axis
        if (this.options.grid_y != 0) {
            var y_range;
            var tick_size = 0;
            
            if (this.asc.bar_yoko == true) {
                tick_size = -this.plot.h;
                
                if (this.asc.value == true) {
                    y_range = [0, this.plot.w];
                }
                else {
                    y_range = [this.plot.w, 0];
                }
                
            }
            else {
                tick_size = -this.plot.w;
                
                if (this.asc.value == true) {
                  y_range = [0, this.plot.h];
                }
                else {
                  y_range = [this.plot.h, 0];
                }
            }
            
            var y_scale = d3.scale.linear()
                .domain([0, max])   // original
                .range(y_range);
            
            this.svg_obj.selectAll("g.axis")
                .call(
                    this.y_axis
                    .scale(y_scale)
                    .tickSize(tick_size)
                );

            this.svg_obj.selectAll("g.tick").selectAll("line")
                .attr("stroke", this.options.grid_y.border_color)
                .attr("shape-rendering", "crispEdges")
                .style("stroke-opacity", this.options.grid_y.border_opacity);
        }
    }
        
    // -----------------------------------
    // update
    // -----------------------------------
    p.update_data = function(idx, data) {
        this.dataset[idx].data = data;
        this.svg_obj
            .selectAll("g." + this.dataset[idx].name)
            .selectAll("rect")
            .data(data);
    }
    p.rect_draw = function() {
        // call me after draw()
        
        var that = this;
        
        // bar
        for (var idx=0; idx < this.dataset.length; idx++) {
            
            this.svg_obj.selectAll("g." + this.dataset[idx].name)
                .selectAll("rect")
                //.data(this.dataset[idx].data)
                //.exit()
                .remove();

            this.svg_obj.selectAll("g." + this.dataset[idx].name)
                .selectAll("rect")
                .data(this.dataset[idx].data)
                .enter()
                .append("rect")
                .attr("y", 0)
                .attr("x", 0)
                .attr("width", 0)
                .attr("height", 0)
                .style("fill", this.dataset[idx].color_fill)
                .attr("class", function(d, i) {
                    return that.dataset[idx].keys[i];
                })
                .on("mouseover", function(d, i) {
                    if (that.options.tooltip.enable == false) {
                        return;
                    }
                    // remove last tooltip data
                    d3.select("#tooltip").selectAll("p#text").remove();

                    // add text to tooltip
                    for (var k=0; k < that.dataset.length; k++) {
                        if (that.dataset[k].name == this.parentNode.className.baseVal) {
                            for (var p=0; p < that.dataset[k].tooltips[i].length; p++) {
                                d3.select("#tooltip").append("p").attr("id", "text").text(that.dataset[k].tooltips[i][p]);
                            }
                            break;
                        }
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
                .on("click", function(d, i) {
                    for (var k=0; k < that.dataset.length; k++) {
                        if (that.dataset[k].name == this.parentNode.className.baseVal) {
                            var target_class = "selected";
                            if (that.options.multi_select == true) {
                                target_class = "selected." + that.dataset[k].keys[i];
                            }
                            var on = !(d3.select(this).classed(target_class));
                            that.bar_selected(that.dataset[k].keys[i], on);
                            break;
                        }
                    }
                });
        }
        
        this.update_plot_size();
        
        // x-axis
        if (this.options.grid_xs.length > 0) {
            grid_data = [];
            grid_idx = [];
            for (var i = 0; i < this.options.grid_xs.length; i++) {
                for (var j = 0; j < this.options.grid_xs[i].labels.length; j++) {
                    grid_data.push(this.options.grid_xs[i].labels[j]);
                    grid_idx.push([i, j]);
                }
            }
            
            // label
            this.svg_obj.selectAll("g.label_x")
                .selectAll("text")
                .remove();
            
            this.svg_obj.selectAll("g.label_x")
                .selectAll("text")
                .data(grid_data)
                .enter()
                .append("text")
                .attr("class", function(d, i) {
                    return grid_idx[i][0] + " " + that.options.grid_xs[grid_idx[i][0]].keys[grid_idx[i][1]];
                })
                .text(function(d, i) {
                    if (that.options.grid_xs[grid_idx[i][0]].wide == 0) {
                    return "";
                    }
                    return d;
                })
                .attr("text-anchor", function(d, i) {
                    return that.options.grid_xs[grid_idx[i][0]].text_anchor;
                })
                .attr("font-size", function(d, i) {
                    return that.options.grid_xs[grid_idx[i][0]].font_size;
                });
            
            // grid
            this.svg_obj.selectAll("g.grid_x")
                .selectAll("line")
                .remove();
            
            this.svg_obj.selectAll("g.grid_x")
                .selectAll("line")
                .data(grid_data)
                .enter()
                .append("line")
                .attr("class", function(d, i) {
                    return grid_idx[i][0] + " " + that.options.grid_xs[grid_idx[i][0]].keys[grid_idx[i][1]];
                })
                .attr("stroke", function(d, i) {
                    return that.options.grid_xs[grid_idx[i][0]].border_color;
                })
                .attr("shape-rendering", "crispEdges")
                .style("stroke-opacity", function(d, i) {
                    return that.options.grid_xs[grid_idx[i][0]].border_opacity;
                });
        }
        this.resize();
    }
    
    // -----------------------------------
    // initialize
    // -----------------------------------
    p.draw = function() {
        var that = this;
        
        this.svg_obj = d3.select("#" + this.id).append("svg");

        // plot asc
        switch (this.options.direction_x) {
            case "bottom-up":
                this.asc.bar = false;
                break;
            case "top-down":
                this.asc.bar = true;
                break;
            case "left-right":
                this.asc.bar = true;
                break;
            case "right-left":
                this.asc.bar = false;
                break;
            default:
                console.log("[debug] this.options.direction_x: undefined value. " + this.options.direction_x);
                break;
        }
        switch (this.options.direction_y) {
            case "bottom-up":
                this.asc.value = false;
                break;
            case "top-down":
                this.asc.value = true;
                break;
            case "left-right":
                this.asc.value = true;
                this.asc.bar_yoko = true;
                break;
            case "right-left":
                this.asc.value = false;
                this.asc.bar_yoko = true;
                break;
            default:
                console.log("[debug] this.options.direction_y: undefined value. " + this.options.direction_y);
                break;
        }
        for (var idx=0; idx < this.dataset.length; idx++) {
            this.svg_obj.append("g")
                .attr("class", this.dataset[idx].name)
                .selectAll("rect")
                .data([])
                .enter()
                ;
        }
        // paddings
        this.padding.left = this.options.padding_left;
        this.padding.right = this.options.padding_right;
        this.padding.top = this.options.padding_top;
        this.padding.bottom = this.options.padding_bottom;
                
        if (this.options.grid_y != 0) {
                
            switch(this.options.grid_y.orient) {
                case "left":
                    this.padding.left = this.padding.left + this.options.grid_y.wide;
                    break;
                case "right":
                    this.padding.right = this.padding.right + this.options.grid_y.wide;
                    break;
                case "top":
                    this.padding.top = this.padding.top + this.options.grid_y.wide;
                    break;
                case "bottom":
                    this.padding.bottom = this.padding.bottom + this.options.grid_y.wide;
                    break;
                case "":
                    break;
                default:
                    console.log("[debug] this.options.grid_y.orient: undefined value. " + this.options.grid_y.orient);
                    break;
            }
        }
        
        for (var i = 0; i< this.options.grid_xs.length; i++) {
            switch(this.options.grid_xs[i].orient) {
                case "left":
                    this.padding.left = this.padding.left + this.options.grid_xs[i].wide;
                    break;
                case "right":
                    this.padding.right = this.padding.right + this.options.grid_xs[i].wide;
                    break;
                case "top":
                    this.padding.top = this.padding.top + this.options.grid_xs[i].wide;
                    break;
                case "bottom":
                    this.padding.bottom = this.padding.bottom + this.options.grid_xs[i].wide;
                    break;
                case "":
                    break;
                default:
                    console.log("[debug] this.options.grid_xs[" + i + "].orient: undefined value. " + this.options.grid_xs[i].orient);
                    break;
            }
        }
        
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

        // y-axis
        if (this.options.grid_y != 0) {
            this.y_axis = d3.svg.axis();
            this.svg_obj.append("g")
                .attr("class", "axis")
                .call(
                    this.y_axis
                    .orient(this.options.grid_y.orient)
                    .ticks(this.options.grid_y.ticks)
                );
        }
        // x-axis
        if (this.options.grid_xs.length > 0) {
            
            this.svg_obj.append("g")
                .attr("class", "label_x")
                .selectAll("line")
                .data([])
                .enter();
            
            this.svg_obj.append("g")
                .attr("class", "grid_x")
                .selectAll("line")
                .data([])
                .enter();
        }
        
        // title
        if (this.options.titles.length > 0) {
            var titles = this.svg_obj.append("g").attr("class", "title");
            
            for (var i = 0; i< this.options.titles.length; i++) {
                titles
                    .append("text")
                    .text(this.options.titles[i].title)
                    .attr("text-color", this.options.titles[i].text_color)
                    .attr("text-anchor", this.options.titles[i].text_anchor)
                    .attr("font-size", this.options.titles[i].font_size);
            }
        }
        
        this.rect_draw();
        this.set_sort_item([this.tags[0].name], [true]);
        //this.resize();
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

    return mut_bar;
})();

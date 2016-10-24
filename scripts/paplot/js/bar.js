var mut_bar = (function()
{

    var mut_bar = function(id)
    {
        this.id = id;

        this.dataset = [];
        this.keys = [];
        this.tags = [];
        this.tooltips = [];
        
        this.options =
        {
            bar_padding: -1,
            padding_left: 10,
            padding_right: 10,
            padding_top: 10,
            padding_bottom: 10,
            resizeable_w: false,
            resizeable_h: false,
            tooltip: { enable: true, position: "parent", sift_x: 0, sift_y: 0, },
            multi_select: false,
            brush: { enable: false, rect: 0, fill: "yellow", stroke: "yellow", opacity: 0.2, },
            direction_x: "left-right",
            direction_y: "bottom-up",
            grid_xs: [],
            grid_y: 0,
            titles: [],
            tall_limit: 0,
            tall_fix: 0,
            bar_min_width: 5,
            bar_max_width: 30,
            color_hilight: "#FFFF00",
            zoom: { enable: false, keys_enable: [], pos_start: -1, pos_end: -1, },
            animation: { mtime: 0, },
            call_back: 0,
        };

        this.svg_obj = 0;
        this.svg = {
            h: 0,
            w: 0,
        };
        
        // don't touch
        this.brush_obj = 0;
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
    };
    
    var p = mut_bar.prototype;
    
    // -----------------------------------
    // data templates
    // -----------------------------------
    p.dataset_template = (function() {
        var dataset_template = function(name) {
            this.data = [];
            this.keys = [];
            this.color_fill = "#333";
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
            this.font_size = "14px";
            this.font_family = "'Helvetica Neue', Helvetica, Arial, sans-serif";
            this.text_anchor = "middle";
            this.text_rotate = 0;
            this.text_color = "#000";
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
            this.font_family = "'Helvetica Neue', Helvetica, Arial, sans-serif";
            this.text_anchor = "middle";
            this.text_rotate = 0;
            
            // axis Y only.
            this.ticks = 2;
            
            // axis X only.
            this.sift_x = 0;
            this.sift_y = 0;
            this.text_anchor_ext = false;
        };
        return grid_template;
    })();

    // -----------------------------------
    // x/y position
    // -----------------------------------
    p._xy_position_grid = function(asc, wide, padding1, items, d, zoom, sift) {

        var pos = asc.sort_list[d];
        if (pos < zoom.pos_start) return -100;
        if (pos >  zoom.pos_end) return -100;

        var i = pos - zoom.pos_start;
        if (asc.bar == true) {
            return padding1 + i*wide/items + sift;
        }
        return padding1 + wide - (i) * wide/items + sift;
    }
    p._xy_position_text = function(asc, wide, padding1, items, d, zoom, sift, ext) {
        var pos = asc.sort_list[d];
        if (pos < zoom.pos_start) return -100;
        if (pos >  zoom.pos_end) return -100;

        var i = pos - zoom.pos_start;
        if (asc.bar == true) {
            if (ext > 0) {
                return padding1 + ext*wide/items + sift;
            }
            return padding1 + i*wide/items + sift;
        }
        if (ext > 0) {
            return padding1 + wide - ext*wide/items + sift;
        }
        return padding1 + wide - (i+1) * wide/items + sift;
    }
    p._xy_position = function(asc, wide, padding1, items, d, zoom, sift) {
        var pos = asc.sort_list[d];
        if (pos < zoom.pos_start) return padding1;
        if (pos >  zoom.pos_end) return padding1 + wide;

        var i = pos - zoom.pos_start;
        if (asc.bar == true) {
            return padding1 + i*wide/items + sift;
        }
        return padding1 + wide - (i+1) * wide/items + sift;
    }
    p._width_position = function(asc, wide, items, d, zoom, bar_padding) {
        var pos = asc.sort_list[d];
        if (pos < zoom.pos_start) return 0;
        if (pos >  zoom.pos_end) return 0;
        return wide / items -  bar_padding;
    }
    
    // -----------------------------------
    // set D3 positions
    // -----------------------------------
    p._set_xw = function() {

        var that = this;

        // paramas
        var x_items = this._x_items();
        
        var w = "width";
        var x = "x", y = "y";
        var padding1 = that.padding.left, padding2 = this.padding.top;
        var plot1 = that.plot.w, plot2 = this.plot.h;
        
        if (this.asc.bar_yoko == true) {
            w = "height";
            x = "y";
            y = "x";
            padding1 = that.padding.top;
            padding2 = that.padding.left;
            plot1 = that.plot.h;
            plot2 = that.plot.w;
        }
        
        var bar_padding = this.options.bar_padding;
        if (bar_padding < 0) {
            if (plot1 / x_items > 10) {
                bar_padding = plot1 / x_items * 0.1;
            }
            else {
                bar_padding = 0;
            }
        }
        
        for (var idx=0; idx < this.dataset.length; idx++) {
            this.svg_obj.selectAll("g." + this.dataset[idx].name).selectAll("rect")
                .transition()
                .duration(this.options.animation.mtime)
                .attr(w, function(d,i) {
                    return p._width_position(that.asc, plot1, x_items, this.className.baseVal, that.options.zoom, bar_padding);
                })
                .attr(x, function(d, i) {
                    return p._xy_position(that.asc, plot1, padding1, x_items, this.className.baseVal, that.options.zoom, 0);
                })
        }

        // transparent-bar
        this.svg_obj.selectAll("g.transparent_bar").selectAll("rect")
            .attr(w, function(d,i) {
                    return p._width_position(that.asc, plot1, x_items, d, that.options.zoom, bar_padding);
                })
                .attr(x, function(d, i) {
                    return p._xy_position(that.asc, plot1, padding1, x_items, d, that.options.zoom, 0);
                })
        
        // x-axis
        if (this.options.grid_xs.length > 0) {
            
            var next_label = [];
            for (var i = 0; i < this.options.grid_xs.length; i++) {
                next_label[i] = [];
                if (this.options.grid_xs[i].wide == 0) continue;
                if (this.options.grid_xs[i].text_anchor_ext == false) continue;
                
                for (var j = 0; j < this.options.grid_xs[i].labels.length; j++) {
                    if (this.options.grid_xs[i].labels[j] == "") {
                        next_label[i][j] = 0;
                        continue;
                    }
                    for (var next = j+1; next < this.options.grid_xs[i].labels.length; next++) {
                        if (this.options.grid_xs[i].labels[next] != "") {
                            next_label[i][j] = next;
                            break;
                        }
                        next_label[i][j] = this.options.grid_xs[i].labels.length; // last
                    }
                }
            }
            var sift = Math.floor(plot1 / x_items / 2);
            
            this.svg_obj.selectAll("g.label_x").selectAll("text")
                .attr('transform', function(d, i)  {
                    if (d == "") return;
                    
                    var classes = this.className.baseVal.split(" ");
                    var idx = Number(classes[0]);
                    var f = Number(that.options.grid_xs[idx].font_size.replace(/px/g, "").replace(/em/g, ""));
                    if (that.options.grid_xs[idx].wide == 0) return;
                    
                    var tx = that.options.grid_xs[idx].sift_x;
                    var ty = that.options.grid_xs[idx].sift_y;
                    
                    if (that.options.grid_xs[idx].text_anchor_ext == true) {
                        var pos = i%x_items;
                        var len = Math.floor((next_label[idx][pos] - pos) / 2);
                        if (len == 0) len = 0.5;
                        
                        if (that.options.grid_xs[idx].orient == "bottom") {
                            tx = tx + p._xy_position_text(that.asc, that.plot.w, that.padding.left, x_items, classes[1], that.options.zoom, 0, len + pos);
                            ty = ty + that.padding.top + that.plot.h + f;
                            
                        }
                        else if (that.options.grid_xs[idx].orient == "top") {
                            tx = tx + p._xy_position_text(that.asc, that.plot.w, that.padding.left, x_items, classes[1], that.options.zoom, 0, len + pos);
                            ty = ty + that.padding.top - f;
                        }
                        else if (that.options.grid_xs[idx].orient == "left") {
                            tx = tx + that.padding.left - f;
                            ty = ty + p._xy_position_text(that.asc, that.plot.h, that.padding.top, x_items, classes[1], that.options.zoom, 0, len + pos);
                        }
                        else if (that.options.grid_xs[idx].orient == "right") {
                            tx = tx + that.padding.left + that.plot.w + f;
                            ty = ty + p._xy_position_text(that.asc, that.plot.h, that.padding.top, x_items, classes[1], that.options.zoom, 0, len + pos);
                        }
                    }
                    else {
                        if (that.options.grid_xs[idx].orient == "bottom") {
                            tx = tx + p._xy_position_text(that.asc, that.plot.w, that.padding.left, x_items, classes[1], that.options.zoom, sift, 0);
                            ty = ty + that.padding.top + that.plot.h + f;
                        }
                        else if (that.options.grid_xs[idx].orient == "top") {
                            tx = tx + p._xy_position_text(that.asc, that.plot.w, that.padding.left, x_items, classes[1], that.options.zoom, sift, 0);
                            ty = ty + that.padding.top - f;
                        }
                        else if (that.options.grid_xs[idx].orient == "left") {
                            tx = tx + that.padding.left - f;
                            ty = ty + p._xy_position_text(that.asc, that.plot.h, that.padding.top, x_items, classes[1], that.options.zoom, sift, 0);
                        }
                        else if (that.options.grid_xs[idx].orient == "right") {
                            tx = tx + that.padding.left + that.plot.w + f;
                            ty = ty + p._xy_position_text(that.asc, that.plot.h, that.padding.top, x_items, classes[1], that.options.zoom, sift, 0);
                        }
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
                    return p._xy_position_grid(that.asc, plot1, padding1, x_items, key, that.options.zoom, 0);
                })
                .attr(x + "2", function(d,i){
                    var key = this.className.baseVal.split(" ")[1];
                    return p._xy_position_grid(that.asc, plot1, padding1, x_items, key, that.options.zoom, 0);
                });
        }
        
    }

    p._set_w_options = function() {
        var that = this;
        
        var x_items = this._x_items();
        
        // brush
        if (this.options.brush.enable == true) {
            var brush_schale = d3.scale.linear().range([ this.padding.left, this.padding.left +this.plot.w ]);

            if (this.brush_obj != 0) {
                this.brush_obj.remove();
            }
            var brush = d3.svg.brush()
                .x(brush_schale)
                .on("brush", function() {
                    var data = brush.extent();
                    var start_index = Math.floor(data[0] * x_items);
                    var end_index = Math.floor(data[1] * x_items);
                    var list = that._keys_from_sort_list(that.asc.sort_list, start_index, end_index);
                    that.brushed(list, data);
                })
                
            
            this.brush_obj = this.svg_obj.append("g")
                .attr("class", "x brush")
                .call(brush)
                .selectAll("rect")
                .attr("y", this.padding.top+1)
                .attr("height", this.plot.h-2)
                .style("fill", this.options.brush.fill)
                .attr("stroke", this.options.brush.stroke)
                .style("opacity", this.options.brush.opacity)
            ;
            
            this.options.brush.rect = brush;
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
                trans.push(this._title_pos(this.options.titles[i].wide, this.options.titles[i].orient, this.options.titles[i].text_anchor, 
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

    p._set_yh = function() {
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
                
                var base = p._bar_base(this.dataset, i, key);
                sum_array[j] = base + value;
            }
            break;
        }
        var max =  Math.max.apply(null, sum_array);
        if (max == 0) max = 1;
        y_size = max
        if ((this.options.tall_limit > 0) && (max > this.options.tall_limit)) y_size = this.options.tall_limit;
        if (this.options.tall_fix > 0) y_size = this.options.tall_fix;
        
        // bar
        var y = "y";
        var height = "height";
        var plot1 = this.plot.h;
        var padding1 = this.padding.top;
        
        if (this.asc.bar_yoko == true) {
            y = "x";
            height = "width";
            plot1 = this.plot.w;
            padding1 = this.padding.left
        }
        for (var idx=0; idx < this.dataset.length; idx++) {
            this.svg_obj.selectAll("g." + this.dataset[idx].name).selectAll("rect")
                .attr(y, function(d, i) {
                    if (that.options.tall_fix == 0) {
                        var base = p._bar_base(that.dataset, idx, that.dataset[idx].keys[i]);
                        if (that.asc.value == true) {
                            if (base > y_size) return padding1 + plot1;
                            return padding1 + (base) * plot1 / y_size;
                        }
                        if ((d + base) > y_size) return padding1;
                        return padding1 + plot1 - ((d + base) * plot1 / y_size);
                    }
                    // TODO add stack-type
                    if (that.asc.value == true) {
                        return padding1 + d * plot1 / y_size;
                    }
                    return padding1 + plot1 - (d * plot1 / y_size);
                })
                .attr(height, function(d, i) {
                    if (that.options.tall_fix == 0) {
                        if (that.dataset[idx].enable == false) {
                            return 0;
                        }
                        var base = p._bar_base(that.dataset, idx, that.dataset[idx].keys[i]);
                        if (base > y_size) return 0;
                        if ((d + base) > y_size) return ((y_size-base) * plot1 / y_size);
                        return (d * plot1 / y_size);
                    }
                    // TODO add stack-type
                    if (that.dataset[idx].enable == false) {
                        return 0;
                    }
                    return d * plot1 / y_size;
                });
        }
        
        // transparent-bar
        this.svg_obj.selectAll("g.transparent_bar").selectAll("rect")
            .attr(height, plot1);
        
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
                .domain([0, y_size])   // original
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
            
            // trans value of dy ".71em" -> "7"
            d3.selectAll("g.tick").selectAll("text")
                .attr("dy", function(d) {
                    var dy = d3.select(this).attr("dy");
                    if (dy.indexOf("em") < 0) {
                        return dy;
                    }
                    return Math.round(Number(dy.replace("em", "")) * 10);
                });
        }
    }
    
    // -----------------------------------
    // sort
    // -----------------------------------
    p.sort = function(tag_name, asc)
    {
        this._set_sort_item(tag_name, asc);
        this._set_xw();
    }

    p.sort_simple = function(sort_list)
    {
        this.asc.sort_list = {};
        for (var k in sort_list) {
            this.asc.sort_list[k] = sort_list[k];
        }
        this._set_xw();
    }
    p._set_sort_item = function(tag_name_org, asc_org) {
      
        var tag_name = [];
        var asc = [];
        for (var i = 0; i < tag_name_org.length; i++) {
            tag_name.push(tag_name_org[i]);
            asc.push(asc_org[i]);
        }
        
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
            //console.log([item[i][0],item[i][1][0], i])
        }
        this.asc.sort_list = item_index;

    }

    p._keys_from_sort_list = function(sort_list, start, end) {
        
        //var x_items = this._x_items();
        var x_items = this.keys.length;
        
        if (start < 0) start = 0;
        if (end < 0) end = 0;
        if (start >= x_items) start = x_items - 1;
        if (end >= x_items) end = x_items - 1;

        var sorted_key = new Array(end - start + 1);
        for (var key in sort_list) {
            if (sort_list[key] < start) continue;
            if (sort_list[key] > end) continue;
            sorted_key[sort_list[key] - start] = key;
        }
        
        return sorted_key;
    }
        
    // -----------------------------------
    // get number of items
    // -----------------------------------
    p._x_items = function() {
        return this.options.zoom.keys_enable.length;
    }

    // -----------------------------------
    // resize svg
    // -----------------------------------
    p._update_plot_size = function() {
        
        if ((this.svg.w == 0) || (this.options.resizeable_w == true)) {
            this.svg.w = parseInt(d3.select("#" + this.id).style("width"), 10);
            this.svg_obj.style("width", this.svg.w + 'px');
        }
        if ((this.svg.h == 0) || (this.options.resizeable_h == true)) {
            this.svg.h = parseInt(d3.select("#" + this.id).style("height"), 10);
            this.svg_obj.style("height", this.svg.h + 'px');
        }
        
        this.plot.w = this.svg.w - this.padding.left - this.padding.right;
        this.plot.h = this.svg.h - this.padding.top - this.padding.bottom;
    }

    p.resize = function() {

        this._update_plot_size();
        
        this._set_w_options();
        this._set_xw();
        this._set_yh();
    }

    // -----------------------------------
    // title's position
    // -----------------------------------
    p._title_pos = function(wide, orient, anchor, rotate, sift_x, sift_y, svg, plot, padding, org_padding_top, org_padding_bottom, org_padding_right, org_padding_left) {
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
    // chenge menbers of stack
    // -----------------------------------
    p.change_stack = function() {
        this._set_yh();
    }
    
    // get base value each stack's bar
    p._bar_base = function(dataset, stack_index, key) {
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
    // set bar's max height
    // -----------------------------------
    p.set_bar_max = function(limit) {
        this.options.tall_limit = limit;
        this._set_yh();
    }
    // -----------------------------------
    // update
    // -----------------------------------
    p.update = function() {
        // call me after draw()
        
        var that = this;
        
        // bar
        for (var idx=0; idx < this.dataset.length; idx++) {
            
            this.svg_obj.selectAll("g." + this.dataset[idx].name)
                .selectAll("rect")
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
                });
        }
        
        // transparent-bar
        this.svg_obj.selectAll("g.transparent_bar")
            .selectAll("rect")
            .remove();

        var y = "y";
        var x = "x";
        var padding1 = this.padding.top;

        if (this.asc.bar_yoko == true) {
            y = "x";
            x = "y";
            padding1 = this.padding.left
        }
        this.svg_obj.selectAll("g.transparent_bar")
            .selectAll("rect")
            .data(this.keys)
            .enter()
            .append("rect")
            .attr(y, padding1)
            .attr(x, 0)
            .attr("width", 0)
            .attr("height", 0)
            .style("fill", this.options.color_hilight)
            .style("opacity", 0)
            .attr("class", function(d, i) {
                return d;
            })
            .on("click", function(d) {
                if (that.options.brush.enable == true) return;
                var target_class = "selected";
                if (that.options.multi_select == true) {
                    target_class = "selected." + d;
                }
                var on = !(d3.select(this).classed(target_class));
                that.bar_selected(d, on);
            })
        ;
        
        if (this.options.tooltip.enable == true) {
            this.svg_obj.selectAll("g.transparent_bar")
            .selectAll("rect")
            .on("mouseover", function(d, i) {
                // remove last tooltip data
                d3.select("#tooltip").selectAll("p").remove();

                // add text to tooltip
                for (var p=0; p < that.tooltips[d].length; p++) {
                    d3.select("#tooltip").append("p").attr("id", "text").append("pre").text(that.tooltips[d][p]);
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
                //Hide the tooltip
                d3.select("#tooltip").classed("hidden", true);
            });
        }
        
        this._update_plot_size();
        
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
                })
                .attr("font-family", function(d, i) {
                    return that.options.grid_xs[grid_idx[i][0]].font_family;
                })
                .attr("text-color", function(d, i) {
                    return that.options.grid_xs[grid_idx[i][0]].text_color;
                })
            ;
            
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
                .attr("stroke-width", function(d, i) {
                    return that.options.grid_xs[grid_idx[i][0]].border_width;
                })
                .attr("shape-rendering", "crispEdges")
                .style("stroke-opacity", function(d, i) {
                    return that.options.grid_xs[grid_idx[i][0]].border_opacity;
                });
        }

        this._zoom_preset();
        this._set_sort_item([this.tags[0].name], [true]);
        
        this._set_w_options();
        this._set_xw();
        this._set_yh();
    }
    
    // -----------------------------------
    // initialize
    // -----------------------------------
    p._init = function() {
        
        // check key value
        for (var idx=0; idx < this.keys.length; idx++) {
            if (this.keys[idx][0].match(/[0-9]+/)) {
                console.log("[WARNING] Key's first character is numeric. " + this.keys[idx]);
            }
        }
        
        var that = this;
        
        if (this.svg_obj == 0) {
            this.svg_obj = d3.select("#" + this.id).append("svg");
        }
        
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
        // bar
        for (var idx=0; idx < this.dataset.length; idx++) {
            this.svg_obj.append("g")
                .attr("class", this.dataset[idx].name)
                .selectAll("rect")
                .data([])
                .enter()
                ;
        }
        
        // transparent-bar
        this.svg_obj.append("g")
            .attr("class", "transparent_bar")
            .selectAll("rect")
            .data([])
            .enter()
            ;
        
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
        
        // y-axis
        if (this.options.grid_y != 0) {
            this.y_axis = d3.svg.axis();
            this.svg_obj.append("g")
                .attr("class", "axis")
                .style("fill", "none")
                .attr("stroke", "#000")
                .attr("shape-rendering", "crispEdges")
                .attr("font-size", "10px")
                .attr("font-family", this.options.grid_y.font_family)
                .call(
                    this.y_axis
                    .orient(this.options.grid_y.orient)
                    .ticks(this.options.grid_y.ticks)
                );
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
                    .attr("font-size", this.options.titles[i].font_size)
                    .attr("font-family", this.options.titles[i].font_family)
                    .attr("text-color", this.options.titles[i].text_color)
                ;
            }
        }
        
    }
        
    p.draw = function() {
        this._init();
        this.update();
    }
    
    // -----------------------------------
    // selection
    // -----------------------------------
    p.bar_select = function(key, on) {
        var multi_select = this.options.multi_select;

        var target = "selected";
        if (multi_select == true) {
            target = target + "." + key;
        }
        
        this.svg_obj.selectAll("g.transparent_bar").selectAll("rect")
            .style("opacity", function(d) {
                
                // target rect
                if (d == key) {
                    d3.select(this).classed(target, on);
                }
                else {
                    if (multi_select == false) {
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
                    return 0.3;
                }
                return 0;
            });
        
    }

    p.reset_select = function() {
        this.svg_obj.selectAll("g.transparent_bar").selectAll("rect")
            .style("opacity", 0);
    }

    // -----------------------------------
    // brush
    // -----------------------------------
    p.brush_reset = function() {
        if (this.options.brush.rect == 0) {
            return;
        }
        this.options.brush.rect
            .clear()
            .event(d3.select(".brush"))
        ;
        this.svg_obj.selectAll("rect.extent")
            .attr("width", "0")
            .attr("x", "0")
        ;
    }

    // -----------------------------------
    // zoom -in/-out
    // -----------------------------------
    p._zoom_preset = function() {
        // set params
        this.options.zoom.keys_enable = [];
        for (var k = 0; k < this.keys.length; k++) {
            this.options.zoom.keys_enable.push(this.keys[k]);
        }
        this.options.zoom.pos_start = 0;
        this.options.zoom.pos_end = this.keys.length -1;
    }
    p.zoom = function(keys) {
        
        if (this.options.zoom.enable == false) return;

        // set params
        this.options.zoom.keys_enable = [];
        for (var k = 0; k < keys.length; k++) {
            this.options.zoom.keys_enable.push(keys[k]);
        }
        this.options.zoom.pos_start = this.asc.sort_list[keys[0]];
        this.options.zoom.pos_end = this.asc.sort_list[keys[keys.length-1]];
        
        this._update_plot_size(); //
        this._set_w_options();    //
        this._set_xw();
    }
    p.zoom_reset = function() {
        
        if (this.options.zoom.enable == false) return;
        
        this._zoom_preset();
        this._set_xw();
    }
    // -----------------------------------
    // over-ride
    // -----------------------------------
    p.bar_selected = function(key, on) { 
        console.log("mut_bar.bar_selected(): called base-function, please over-ride.");
    }
    p.brushed = function(data, range) { 
        console.log("mut_bar.brushed(): called base-function, please over-ride.");
    }
    return mut_bar;
})();

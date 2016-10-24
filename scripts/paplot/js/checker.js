var mut_checker = (function() {
    var mut_checker = function(id) {
        this.id = id;

        this.dataset = [];

        this.keys = [];   // for axis-x
        this.keys2 = [];   // for axis-y
        // labels for sort
        this.tags = [];    // for axis-x
        this.tags2 = [];    // for axis-y
        
        this.options = {
            padding_left: 0,
            padding_right: 0,
            padding_top: 0,
            padding_bottom: 0,
            bar_padding_x: -1,
            bar_padding_y: -1,
            resizeable_w: false,
            resizeable_h: false,
            tooltip: { enable: true, position: "parent", sift_x: 0, sift_y: 0, },
            multi_select: false,
            direction_x: "left-right",
            direction_y: "top-down",
            grids: [],
            color_hilight: "#FF0",
            frame_border_color: "#000"
        };

        // don't touch
        this.svg_obj = 0;
        this.axis = {
            x: {
                asc : true,
                sort_list: [],
                },
            y: {
                asc : true,
                sort_list: [],
                },            
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
    var p = mut_checker.prototype;

    // -----------------------------------
    // data templates
    // -----------------------------------
    p.dataset_template = (function() {
        var dataset_template = function(name) {
            this.data = [];
            this.tooltips = [];
            //this.color_fill = "green";
            this.name = name;
            this.enable = true;
            
            this.keys = [];   // for axis-x
            this.keys2 = [];   // for axis-y
            
            this.color = {
                mode: "mono",
                fill: "pink",
                range: [0,0],
            };
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

    p.grid_template = (function() {
        var grid_template = function() {
            this.axis = "x";    // "'x', 'y'"
            this.orient = "";   // "'left', 'right', 'top', 'bottom'"
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
            this.sift_x = 0;
            this.sift_y = 0;
        };
        return grid_template;
    })();

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
    // sort
    // -----------------------------------
    p.sort = function(tag_name, asc, axis) {

        this.set_sort_item(tag_name, asc, axis);
        this.bar_sort();
    }
    
    p.set_sort_item = function(tag_name_org, asc_org, axis) {

        var tag_name = [];
        var asc = [];
        for (var i = 0; i < tag_name_org.length; i++) {
            tag_name.push(tag_name_org[i]);
            asc.push(asc_org[i]);
        }

        var this_keys = this.keys;
        var this_tags = this.tags;
        if (axis == "y") {
            this_keys = this.keys2;
            this_tags = this.tags2;
        }
        
        var tags = [];
        for (var j = 0; j< tag_name.length; j++) {
            for (var i = 0; i< this_tags.length; i++) {
                if (this_tags[i].name == tag_name[j]) {
                    tags.push(this_tags[i].values);
                    break;
                }
            }
        }
        
        var item = [];
        for (var i = 0; i< this_keys.length; i++) {
            var tags2 = [];
            for (var j = 0; j< tags.length; j++) {
                tags2[j] = tags[j][i];
            }
            item[i] = [this_keys[i], tags2];
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
        
        if (axis == "x") {
            this.axis.x.sort_list = item_index;
        }
        else {
            this.axis.y.sort_list = item_index;
        }
        
    }
    
    p.pos_from_sort_list = function(sort_list, key, def) {
        
        if (sort_list.length == 0) return def;
        if (key in sort_list == false) return def;

        return sort_list[key];
    }
    
    // -----------------------------------
    // sort
    // -----------------------------------
    p.attr_grid = function(attr, number, class_name, grids, axis, plot, padding, items_len) {
        
        var classes = class_name.baseVal.split(" ");
        var key = classes[1];
        
        var x = false;
        if (grids[Number(classes[0])].axis == "x") {
            x = true;
        }
        
        if ((attr == "x") && (x == true)) {
            var item = p.pos_from_sort_list(axis.x.sort_list, key, -1);
            return p.xy_position_grid(axis.x.asc, plot.w, padding.left, items_len, item, 0);
        }
        else if ((attr == "y") && (x == false)) {
            var item = p.pos_from_sort_list(axis.y.sort_list, key, -1);
            return p.xy_position_grid(axis.y.asc, plot.h, padding.top, items_len, item, 0);
        }
        else if ((attr == "x") && (x == false)) {
            if (number == 1) {
                return padding.left;
            }
            return padding.left + plot.w;
        }
        else if ((attr == "y") && (x == true)) {
            if (number == 1) {
                return padding.top;
            }
            return  padding.top + plot.h;
        }
        return 0;
    }
    
    p.bar_sort = function() {
        var that = this;

        // rect
        var x_items = this.x_items();
        var y_items = this.y_items();

        for (var idx = 0; idx < this.dataset.length; idx++) {
            this.svg_obj.selectAll("g." + this.dataset[idx].name).selectAll("rect")
                .attr("x", function(d, i) {
                    var item = p.pos_from_sort_list(that.axis.x.sort_list, that.dataset[idx].keys[i], -1);
                    return p.xy_position (that.axis.x.asc, that.plot.w, that.padding.left, x_items, item, 0);
                })
                .attr("y", function(d, i) {
                    var item = p.pos_from_sort_list(that.axis.y.sort_list, that.dataset[idx].keys2[i], -1);
                    return p.xy_position (that.axis.y.asc, that.plot.h, that.padding.top, y_items, item, 0);
                });
        }

        // transparent-bar
        this.svg_obj.selectAll("g.transparent_bar1").selectAll("rect")
            .attr("x", function(d, i) {
                var item = p.pos_from_sort_list(that.axis.x.sort_list, d, -1);
                return p.xy_position (that.axis.x.asc, that.plot.w, that.padding.left, x_items, item, 0);
            })
            .attr("y", this.padding.top)
        ;
        
        this.svg_obj.selectAll("g.transparent_bar2").selectAll("rect")
                .attr("x", this.padding.left)
                .attr("y", function(d, i) {
                    var item = p.pos_from_sort_list(that.axis.y.sort_list, d, -1);
                    return p.xy_position (that.axis.y.asc, that.plot.h, that.padding.top, y_items, item, 0);
                });
        
        // transparent-rect
        this.svg_obj.selectAll("g.transparent_rect").selectAll("rect")
            .attr("x", function(d, i) {
                var item = p.pos_from_sort_list(that.axis.x.sort_list, d[0], -1);
                return p.xy_position (that.axis.x.asc, that.plot.w, that.padding.left, x_items, item, 0);
            })
            .attr("y", function(d, i) {
                var item = p.pos_from_sort_list(that.axis.y.sort_list, d[1], -1);
                return p.xy_position (that.axis.y.asc, that.plot.h, that.padding.top, y_items, item, 0);
            })
        ;
        
        // axis
        this.svg_obj.selectAll("g.label").selectAll("text")
            .attr('transform', function(d, i)  {
                var classes = this.className.baseVal.split(" ");
                var idx = Number(classes[0]);
                var f = Number(that.options.grids[idx].font_size.replace(/px/g, "").replace(/em/g, ""));
                var tx = that.options.grids[idx].sift_x;
                var ty = that.options.grids[idx].sift_y;

                if (that.options.grids[idx].axis == "x") {
                    if (that.options.grids[idx].orient == "bottom") {
                        var item = p.pos_from_sort_list(that.axis.x.sort_list, classes[1], i);
                        tx = tx + p.xy_position(that.axis.x.asc, that.plot.w, that.padding.left, x_items, item, Math.floor(that.plot.w / x_items / 2));
                        ty = ty + that.padding.top + that.plot.h + f;
                    }
                    else if (that.options.grids[idx].orient == "top") {
                        var item = p.pos_from_sort_list(that.axis.x.sort_list, classes[1], i);
                        tx = tx + p.xy_position(that.axis.x.asc, that.plot.w, that.padding.left, x_items, item, Math.floor(that.plot.w / x_items / 2));
                        ty = ty + that.padding.top - f;
                    }
                }
                else if (that.options.grids[idx].axis == "y") {
                    if (that.options.grids[idx].orient == "left") {
                        var item = p.pos_from_sort_list(that.axis.y.sort_list, classes[1], i);
                        tx = tx + that.padding.left - f;
                        ty = ty + p.xy_position(that.axis.y.asc, that.plot.h, that.padding.top, y_items, item, Math.floor(that.plot.h / y_items / 2));
                    }
                    else if (that.options.grids[idx].orient == "right") {
                        var item = p.pos_from_sort_list(that.axis.y.sort_list, classes[1], i);
                        tx = tx + that.padding.left + that.plot.w + f;
                        ty = ty + p.xy_position(that.axis.y.asc, that.plot.h, that.padding.top, y_items, item, Math.floor(that.plot.h / y_items / 2));
                    }
                }
                return 'translate(' + tx + ', ' + ty + ') rotate(' + that.options.grids[idx].text_rotate + ')';
            });

        this.svg_obj.selectAll("g.grid").selectAll("line")
            .attr("y1", function(){
                return p.attr_grid("y", 1, this.className, that.options.grids, that.axis, that.plot, that.padding, y_items);
            })
            .attr("y2", function(){
                return p.attr_grid("y", 2, this.className, that.options.grids, that.axis, that.plot, that.padding, y_items);
            })
            .attr("x1", function(){
                return p.attr_grid("x", 1, this.className, that.options.grids, that.axis, that.plot, that.padding, x_items);
            })
            .attr("x2", function(){
                return p.attr_grid("x", 2, this.className, that.options.grids, that.axis, that.plot, that.padding, x_items);
            });
    }
    
    // -----------------------------------
    // get number of items
    // -----------------------------------
    p.x_items = function() {
        return this.keys.length;
    }
    p.y_items = function() {
        return this.keys2.length;
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
    p.bar_padding = function(wide, items, def) {
        
        var bar_padding = def;
        if (bar_padding < 0) {
            if (wide / items > 10) {
                bar_padding = wide / items * 0.1;
            }
            else {
                bar_padding = 0;
            }
        }
        return bar_padding;
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

        // transparent-bar
        var width = this.plot.w / this.x_items() -  this.bar_padding(this.plot.w, this.x_items(), this.options.bar_padding_x);
        
        this.svg_obj.selectAll("g.transparent_bar1").selectAll("rect")
            .attr("height", this.plot.h)
            .attr("width", width)
        ;

        var height = this.plot.h / this.y_items() -  this.bar_padding(this.plot.h, this.y_items(), this.options.bar_padding_y);
        
        this.svg_obj.selectAll("g.transparent_bar2").selectAll("rect")
            .attr("height", height)
            .attr("width", this.plot.w)
        ;
        
        // transparent-rect
        this.svg_obj.selectAll("g.transparent_rect").selectAll("rect")
            .attr("height", height)
            .attr("width", width)
        ;
        
        // frame
        var frame_pos = [
            {x1: this.padding.left, y1: this.padding.top, x2: this.padding.left+this.plot.w, y2: this.padding.top},
            {x1: this.padding.left, y1: this.padding.top, x2: this.padding.left, y2: this.padding.top+this.plot.h},
            {x1: this.padding.left, y1: this.padding.top+this.plot.h, x2: this.padding.left+this.plot.w, y2: this.padding.top+this.plot.h},
            {x1: this.padding.left+this.plot.w, y1: this.padding.top, x2: this.padding.left+this.plot.w, y2: this.padding.top+this.plot.h},];
        this.svg_obj.selectAll("g.frame").selectAll("line")
            .attr("x1", function(d,i) { return frame_pos[i].x1; })
            .attr("x2", function(d,i) { return frame_pos[i].x2; })
            .attr("y1", function(d,i) { return frame_pos[i].y1; })
            .attr("y2", function(d,i) { return frame_pos[i].y2; })
        ;
        
        this.bar_sort();
        this.change_stack();
    }
        
    // -----------------------------------
    // chenge menbers of stack
    // -----------------------------------
    p.change_stack = function() {
        var that = this;
        
        // rect-size
        var height = this.plot.h / this.y_items() -  this.bar_padding(this.plot.h, this.y_items(), this.options.bar_padding_y);
        var width = this.plot.w / this.x_items() -  this.bar_padding(this.plot.w, this.x_items(), this.options.bar_padding_x);
        
        for (var idx=0; idx < this.dataset.length; idx++) {
            this.svg_obj.selectAll("g." + this.dataset[idx].name).selectAll("rect")
                .attr("height", function() {
                    if (that.dataset[idx].enable == false) return 0;
                    return height;
                })
                .attr("width", function() {
                    if (that.dataset[idx].enable == false) return 0;
                    return width;
                });
        }
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
                //.style("fill", this.dataset[idx].color.fill)
                .attr("class", function(d, i) {
                    return that.dataset[idx].keys[i] + " " + that.dataset[idx].keys2[i];
                });
                
            if (this.dataset[idx].color.mode == "mono") {
                this.svg_obj.selectAll("g." + this.dataset[idx].name)
                    .selectAll("rect")
                    .style("fill", this.dataset[idx].color.fill)
                    ;
            }
            else if (this.dataset[idx].color.mode == "gradient") {
                var color = this.dataset[idx].color;
                
                this.svg_obj.selectAll("g." + this.dataset[idx].name)
                    .selectAll("rect")
                    .style("fill", function (d) {
                        return utils.color_gradient(d, color.range, color.fill);
                    })
                    ;
            }
        }
        
        // transparent-bar
        var keys = [this.keys, this.keys2];
        var target = ["selected1", "selected2"];
        
        for (var idx=0; idx < 2; idx++) {
            this.svg_obj.selectAll("g.transparent_bar" + (idx+1))
                .selectAll("rect")
                .remove();

            this.svg_obj.selectAll("g.transparent_bar" + (idx+1))
                .selectAll("rect")
                .data(keys[idx])
                .enter()
                .append("rect")
                .attr("y", 0)
                .attr("x", 0)
                .attr("width", 0)
                .attr("height", 0)
                .style("fill", this.options.color_hilight)
                .style("opacity", 0)
                .attr("class", function(d) {
                    return d;
                });
        }
        
        // transparent-rect
        var keys = [];
        for (var idx=0; idx < this.dataset.length; idx++) {
            for (var i=0; i < this.dataset[idx].data.length; i++) {
                var item = [this.dataset[idx].keys[i], this.dataset[idx].keys2[i]];
                keys.push(item);
            }
        }
        keys.sort(function(a,b){
            if( a[0] < b[0] ) return -1;
            if( a[0] > b[0] ) return 1;
            if( a[1] < b[1] ) return -1;
            if( a[1] > b[1] ) return 1;
            return 0;
        });
        var keys_filt = [];
        for (var i = 0; i < keys.length; i++) {
            // delete duplication
            if (i == 0) keys_filt.push(keys[i]);
            var last = keys_filt[keys_filt.length-1];
            if ((last[0] != keys[i][0]) || (last[1] != keys[i][1])) keys_filt.push(keys[i]);
        };

        
        this.svg_obj.selectAll("g.transparent_rect")
            .selectAll("rect")
            .remove();

        this.svg_obj.selectAll("g.transparent_rect")
            .selectAll("rect")
            .data(keys_filt)
            .enter()
            .append("rect")
            .attr("y", 0)
            .attr("x", 0)
            .attr("width", 0)
            .attr("height", 0)
            .style("fill", "white")
            .style("opacity", 0)
            .attr("class", function(d) {
                return d[0] + " " + d[1];
            })
            .on("mouseover", function(d) {
                if (that.options.tooltip.enable == false) {
                    return;
                }
                
                var tooltips = that.tooltips[that.keys.indexOf(d[0])][d[1]];
                if (tooltips == undefined) return;
                
                // remove last tooltip data
                d3.select("#tooltip").selectAll("p").remove();

                // add text to tooltip
                
                for (var p=0; p < tooltips.length; p++) {
                    d3.select("#tooltip").append("p").attr("id", "text").append("pre").text(tooltips[p]);
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
            .on("mouseout", function(d) {
                if (that.options.tooltip.enable == false) {
                    return;
                }
                //Hide the tooltip
                d3.select("#tooltip").classed("hidden", true);
            })
            .on("click", function(d, i) {
                var key1 = "selected1";
                var key2 = "selected2";
                
                if (that.options.multi_select == true) {
                    key1 = key1 + "." + d[0];
                    key2 = key2 + "." + d[1]
                }
                var on1 = that.svg_obj.selectAll("g.transparent_bar1").select("rect." + d[0]).classed(key1);
                var on2 = that.svg_obj.selectAll("g.transparent_bar2").select("rect." + d[1]).classed(key2);
                
                var on = !(on1 && on2);
                that.bar_selected(d[0], d[1], on);
            });

        //this.update_plot_size();
        
        // axis
        grid_data = [];
        grid_idx = [];
        for (var i = 0; i < this.options.grids.length; i++) {
            for (var j = 0; j < this.options.grids[i].labels.length; j++) {
                grid_data.push(this.options.grids[i].labels[j]);
                grid_idx.push([i, j]);
            }
        }
        
        this.svg_obj.selectAll("g.label")
            .selectAll("text")
            .remove();
        
        this.svg_obj.selectAll("g.label")
            .selectAll("text")
            .data(grid_data)
            .enter()
            .append("text")
            .attr("class", function(d, i) {
                return grid_idx[i][0] + " " + that.options.grids[grid_idx[i][0]].keys[grid_idx[i][1]];
            })
            .text(function(d, i) {
                if (that.options.grids[grid_idx[i][0]].wide == 0) {
                    return "";
                }
                return d;
            })
            .attr("text-anchor", function(d, i) {
                return that.options.grids[grid_idx[i][0]].text_anchor;
            })
            .attr("font-size", function(d, i) {
                return that.options.grids[grid_idx[i][0]].font_size;
            })
            .attr("font-family", function(d, i) {
                return that.options.grids[grid_idx[i][0]].font_family;
            })
            .attr("text-color", function(d, i) {
                return that.options.grids[grid_idx[i][0]].text_color;
            })
        ;
        
        this.svg_obj.selectAll("g.grid")
            .selectAll("line")
            .remove();
        
        this.svg_obj.selectAll("g.grid")
            .selectAll("line")
            .data(grid_data)
            .enter()
            .append("line")
            .attr("class", function(d, i) {
                return grid_idx[i][0] + " " + that.options.grids[grid_idx[i][0]].keys[grid_idx[i][1]];
            })
            .attr("stroke", function(d, i) {
                return that.options.grids[grid_idx[i][0]].border_color;
            })
            .attr("stroke-width", function(d, i) {
                return that.options.grids[grid_idx[i][0]].border_width;
            })
            .attr("shape-rendering", "crispEdges")
            .style("stroke-opacity", function(d, i) {
                return that.options.grids[grid_idx[i][0]].border_opacity;
            });
        
        this.set_sort_item([this.tags[0].name], [true], "x");
        this.set_sort_item([this.tags2[0].name], [true], "y");
        this.resize();
    }

    // -----------------------------------
    // initialize
    // -----------------------------------
    p.init = function() {
        
        // check key value
        for (var idx=0; idx < this.keys.length; idx++) {
            if (this.keys[idx][0].match(/[0-9]+/)) {
                console.log("[WARNING] Key's first character is numeric. " + this.keys[idx]);
            }
        }
        
        var that = this;
        
        this.svg_obj = d3.select("#" + this.id).append("svg");
        
        // plot asc
        switch (this.options.direction_x) {
            case "left-right":
                this.axis.x.asc = true;
                break;
            case "right-left":
                this.axis.x.asc = false;
                break;
            default:
                console.log("[debug] this.options.direction_x: undefined value. " + this.options.direction_x);
                break;
        }
        switch (this.options.direction_y) {
            case "bottom-up":
                this.axis.y.asc = false;
                break;
            case "top-down":
                this.axis.y.asc = true;
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
                .enter();
        }
        
        // transparent-bar
        this.svg_obj.append("g")
            .attr("class", "transparent_bar1")
            .selectAll("rect")
            .data([])
            .enter();
        
        this.svg_obj.append("g")
            .attr("class", "transparent_bar2")
            .selectAll("rect")
            .data([])
            .enter();
        
        // transparent-rect
        this.svg_obj.append("g")
            .attr("class", "transparent_rect")
            .selectAll("rect")
            .data([])
            .enter();
        
        // paddings
        this.padding.left = this.options.padding_left;
        this.padding.right = this.options.padding_right;
        this.padding.top = this.options.padding_top;
        this.padding.bottom = this.options.padding_bottom;
        
        for (var i = 0; i < this.options.grids.length; i++) {
            switch(this.options.grids[i].orient) {
                case "left":
                    this.padding.left = this.padding.left + this.options.grids[i].wide;
                    break;
                case "right":
                    this.padding.right = this.padding.right + this.options.grids[i].wide;
                    break;
                case "top":
                    this.padding.top = this.padding.top + this.options.grids[i].wide;
                    break;
                case "bottom":
                    this.padding.bottom = this.padding.bottom + this.options.grids[i].wide;
                    break;
                case "":
                    break;
                default:
                    console.log("[debug] this.options.grids[i].orient: undefined value. " + this.options.grids[i].orient);
                    break;
            }
        }
        
        // axis
        this.svg_obj.append("g")
            .attr("class", "label")
            .selectAll("line")
            .data([])
            .enter();
        
        this.svg_obj.append("g")
            .attr("class", "grid")
            .selectAll("line")
            .data([])
            .enter();
        
        this.svg_obj.append("g")
            .attr("class", "frame")
            .selectAll("line")
            .data([1,1,1,1])
            .enter()
            .append("line")
            .attr("stroke", that.options.frame_border_color)
            .attr("stroke-width", "1px")
            .attr("shape-rendering", "crispEdges")
            ;
    }
    p.draw = function() {
        this.init();
        this.update();
    }
    
    
    // -----------------------------------
    // selection
    // -----------------------------------
    p.bar_select = function(key1, key2, on) {

        var multi_select = this.options.multi_select;
        
        for (var idx = 0; idx < 2; idx++) {

            var key;
            if (idx == 0) key = key1;
            else if (idx == 1) key = key2;
            
            if (key == null) continue;
            
            var target = "selected" + (idx+1);
            if (multi_select == true) {
                target = target + "." + key;
            }
                
            this.svg_obj.selectAll("g.transparent_bar" + (idx+1)).selectAll("rect")
                .style("opacity", function(d, i) {
                    
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
    }

    p.reset_select = function() {
        this.svg_obj.selectAll("g.transparent_bar1").selectAll("rect")
            .style("opacity", 0);
        this.svg_obj.selectAll("g.transparent_bar2").selectAll("rect")
            .style("opacity", 0);
    }
    // -----------------------------------
    // over-ride
    // -----------------------------------
    p.bar_selected = function(key1, key2, on) { 
        console.log("base function, please over-ride.");
    }

    return mut_checker;
})();

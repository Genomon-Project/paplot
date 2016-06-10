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
            resizeable_w: false,
            resizeable_h: false,
            tooltip: { enable: true, position: "parent", sift_x: 0, sift_y: 0, },
            multi_select: false,
            direction_x: "left-right",
            direction_y: "top-down",
            grids: [],
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
            this.color_fill = "#333";
            this.color_fill_hilight = "#F00";
            this.name = name;
            this.enable = true;
            
            this.keys = [];   // for axis-x
            this.keys2 = [];   // for axis-y
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
            this.text_anchor = "middle";
            this.text_rotate = 0;
            this.sift_x = 0;
            this.sift_y = 0;
        };
        return grid_template;
    })();

    // -----------------------------------
    // sort
    // -----------------------------------
    p.sort = function(tag_name, asc, axis) {

        this.set_sort_item(tag_name, asc, axis);
        
        this.bar_sort();
    }
    
    p.set_sort_item = function(tag_name, asc, axis) {

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

        this.bar_sort();
        this.change_stack();
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
        
        // rect
        var x_items = this.x_items();
        var y_items = this.y_items();
        
        for (var idx=0; idx < this.dataset.length; idx++) {
            this.svg_obj.selectAll("g." + this.dataset[idx].name).selectAll("rect")
                .attr("height", function() {
                    if (that.dataset[idx].enable == false) return 0;
                    return that.plot.h / y_items -  that.bar_padding(that.plot.h, y_items);
                })
                .attr("width", function() {
                    if (that.dataset[idx].enable == false) return 0;
                    return that.plot.w / x_items -  that.bar_padding(that.plot.w, x_items);
                });
        }
    }

    // -----------------------------------
    // update
    // -----------------------------------
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
                    return that.dataset[idx].keys[i] + " " + that.dataset[idx].keys2[i];
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
                    var classes = this.className.baseVal.split(" ");
                    
                    var key1 = "selected1";
                    var key2 = "selected2";
                    
                    if (that.options.multi_select == true) {
                        key1 = key1 + "." + classes[0];
                        key2 = key2 + "." + classes[1]
                    }
                    var on = !(d3.select(this).classed(key1) && d3.select(this).classed(key2));
                    that.bar_selected(classes[0], classes[1], on);
                });
        }
        
        this.update_plot_size();
        
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
            });
        
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
            .attr("shape-rendering", "crispEdges")
            .style("stroke-opacity", function(d, i) {
                return that.options.grids[grid_idx[i][0]].border_opacity;
            });
        
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

        this.rect_draw();
        this.set_sort_item([this.tags[0].name], [true], "x");
        this.set_sort_item([this.tags2[0].name], [true], "y");
        //this.resize();
    }
    
    
    // -----------------------------------
    // selection
    // -----------------------------------
    p.bar_select = function(key1, key2, on) {
        var that = this;

        for (var idx = 0; idx < this.dataset.length; idx++) {

            this.svg_obj.selectAll("g." + this.dataset[idx].name).selectAll("rect")
                .style("fill", function(d, i) {
                    
                    // target rect
                    var classes = this.className.baseVal.split(" ");
                    
                    var target1 = "selected1";
                    var target2 = "selected2";
                    
                    if (that.options.multi_select == true) {
                        target1 = target1 + "." + key1;
                        target2 = target2 + "." + key2;
                    }
                    
                    var find_key1 = false;
                    var find_key2 = false;
                    
                    for (var k = 0; k < classes.length; k++) {
                        if (classes[k] == key1) {
                            find_key1 = true;
                        }
                        if (classes[k] == key2) {
                            find_key2 = true;
                        }
                    }
                    
                    if (find_key1 == true) {
                         d3.select(this).classed(target1, on);
                    }
                    else if ((key1 != null) && (that.options.multi_select == false)) {
                         d3.select(this).classed(target1, false);
                    }
                    if (find_key2 == true) {
                         d3.select(this).classed(target2, on);
                    }
                    else if ((key2 != null) && (that.options.multi_select == false)) {
                         d3.select(this).classed(target2, false);
                    }
                    // hilight
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
    p.bar_selected = function(key1, key2, on) { 
        console.log("base function, please over-ride.");
    }

    return mut_checker;
})();

var dendrogram = (function()
{
    var dendrogram = function(id)
    {
        this.id = id;
        this.data = []; // [[0,"",0,""],], [index, id, parent_index, value]
        
        this.options =
        {
            padding_left: 10,
            padding_right: 10,
            padding_top: 10,
            padding_bottom: 10,
            border_width: 0,
            border_color: "#AAAAAA",
            border_margin_left: 0,
            border_margin_right: 0,
            border_margin_top: 0,
            border_margin_bottom: 0,
            resizeable_w: false,
            resizeable_h: false,
            tooltip: { enable: true, position: "parent", sift_x: 0, sift_y: 0, },
            multi_select: false,
            titles: [],
            yoko: false,
        };
        this.nodes = {
            wide_leaf: 100,
            wide_leaf_lateral: 13,
            wide_root: 100,
            wide_branch: 100,
            
            radius: 50,   // for cardinal
            
            link_interpolate: "L", // "L" linear, "C" cardinal

            node_color: "#555",
            leaf_color: "#999",
            stroke_color: "#555",
            stroke_opacity: 1.0,
            stroke_width: "1px",
            text_color: "#FFFFFF",
            font_size: "10px",
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
        this.cluster = {
            layer_num : 0,
            leaves_num : 0,
            leaves : [],
        };
    };
    
    var p = dendrogram.prototype;
    
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
    // resize svg
    // -----------------------------------
    p.resize = function() {
        var that = this;

        // TODO: write code to resize dendrogram
        
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

    p.leaves_num = function(root) {
        var num = 0;
        if (root.children != undefined) {
            for (var n in root.children) {
                num += this.leaves_num(root.children[n]);
            }
        }
        else {
            num += 1;
        }
        return num;
    }
    // -----------------------------------
    // update
    // -----------------------------------
    
    function get_leaves(node) {
        var li = [];

        if (node.children != undefined) { 
            //li.push(node.id)
            for (var c in node.children) {
                var ret = get_leaves(node.children[c]);
                for (var i in ret) li.push(ret[i]);
            }
        }
        else {
            li.push(node.id)
        }
        return li;
    }
        
    p.update = function() {
        // call me after draw()

        var that = this;

        //var stratify = d3.stratify()
        var stratify = d3_v4.stratify()
            .id(function(d) { return d.name; })
            .parentId(function(d) {
                return d.parent; 
             });
        
        var root = stratify(this.data)
                .sort(function(a, b) { 
                return (a.height - b.height) || a.id.localeCompare(b.id); 
                })
                ;
        
        //var root = this.data;
        
        this.cluster.layer_num = root.height;
        this.cluster.leaves_num = this.leaves_num(root);
        this.cluster.leaves = get_leaves(root);
        
        var width = this.cluster.leaves_num * this.nodes.wide_leaf_lateral; 
        var height = this.cluster.layer_num * this.nodes.wide_branch;
        
        if (this.options.yoko == true) {
            // plot area
            this.plot.w = height + this.nodes.wide_leaf + this.nodes.wide_root;
            this.plot.h = width;
        }
        else {
            // plot area
            this.plot.w = width;
            this.plot.h = height+ this.nodes.wide_leaf + this.nodes.wide_root;
        }
        // svg
        this.svg.w = this.plot.w + this.padding.left + this.padding.right;
        this.svg.h = this.plot.h + this.padding.top + this.padding.bottom ;
        this.svg_obj.style("width", this.svg.w + 'px');
        this.svg_obj.style("height", this.svg.h + 'px');
        
        var tree = d3_v4.cluster()
            .size([width, height])
        //.size([200,200])
            .separation(function(a, b) {return 1;})
        ;
        
        tree(root);
        //var cluster = d3.layout.cluster().size([width, height]);
        //var nodes = cluster.nodes(root);
        //var links = cluster.links(nodes);
        
        var trans_x = this.padding.left;
        var trans_y = this.padding.top;
        
        if (this.options.yoko == true) {
            trans_x += this.nodes.wide_root;
        }
        else {
            trans_y += this.nodes.wide_root;
        }
        
        var g = this.svg_obj.append("g").attr("transform", "translate(" + trans_x + "," + trans_y + ")");

        g.selectAll(".link")
            .data(root.descendants().slice(1))
            //.data(links)
            .enter()
            .append("path")
            .attr("class", "link")
            .attr("d", function(d) {
                var text = "";
                if (that.options.yoko == true) {
                    if (that.nodes.link_interpolate == "C") {
                        text = "M" + d.y + "," + d.x + "C" + (d.parent.y + that.nodes.radius) + "," + d.x + " " + (d.parent.y + that.nodes.radius) + "," + d.parent.x + " " + d.parent.y + "," + d.parent.x;
                    }
                    else if (that.nodes.link_interpolate == "L") {
                        text = "M" + d.y + "," + d.x + "L" + d.parent.y + "," + d.x + "L" + d.parent.y + "," + d.parent.x;
                    }
                }
                else {
                    if (that.nodes.link_interpolate == "C") {
                        text = "M" + d.x + "," + d.y + "C" + d.x + "," + d.parent.y + " " + d.parent.x + "," + (d.parent.y + that.nodes.radius) + " " + d.parent.x + "," + d.parent.y;
                    }
                    else if (that.nodes.link_interpolate == "L") {
                        text = "M" + d.x + "," + d.y + "L" + d.x + "," + d.parent.y + "L" + d.parent.x + "," + d.parent.y;
                    }
                }
                return text;
            })
            .style("fill", "none")
            .style("stroke", this.nodes.stroke_color)
            .style("stroke-opacity", this.nodes.stroke_opacity)
            .style("stroke-width", this.nodes.stroke_width)
        ;

        var node = g.selectAll(".node")
            .data(root.descendants())
            //.data(nodes)
            .enter()
            .append("g")
            .attr("transform", function(d) {
                var text = "";
                if (that.options.yoko == true) {
                    text = "translate(" + d.y + "," + d.x + ")";
                }
                else {
                    text = "translate(" + d.x + "," + d.y + ") rotate (-90)";
                }
                return text;
            })

        node.append("circle")
            .attr("r", function(d) {
                if (d.children) return 0;
                return 2.5;
            })
            .style("fill", function(d) {
                if (d.children) return that.nodes.node_color;
                return that.nodes.leaf_color;
            });

        node.append("text")
            .attr("dy", function(d) { 
                if (d.parent == null) return 3;
                if (d.children) return 10;
                return 3;
            })
            .attr("x", function(d) { 
                if (that.options.yoko == true) return d.children ? -8 : 8;
                return d.children ? 8 : -8;
            })
            .style("text-anchor", function(d) {
                if (that.options.yoko == true) return d.children ? "end" : "start"; 
                return d.children ? "start" : "end"; 
            })
            .style("text-color", this.nodes.text_color)
            .style("font-size", this.nodes.font_size)
            .style("font-family", this.nodes.font_family)
            .text(function(d) {
                //return d.id;
                return d.data.label; 
            });
        
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
        
        // dendrogram
        // TODO: write code to initialize dendrogram
        
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
    }

    p.reset_select = function() {
    }
    // -----------------------------------
    // over-ride
    // -----------------------------------
    p.bar_selected = function(key, on) { 
        console.log("base function, please over-ride.");
    }

    return dendrogram;
})();

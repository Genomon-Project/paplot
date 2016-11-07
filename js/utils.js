var utils = (function() {
    utils = {};
    utils.color_gradient = function(value, range, colors) {

        if (value <= range[0]) return colors[0];
        else if (value >= range[range.length-1]) return colors[range.length-1];

        var pos = 0;
        for (var i=0; i < (range.length-1); i++) {
            
            if ((value >= range[i]) && (value < range[i+1])) {
                pos = i;
                break;
            }
        }
        
        var v0 = range[pos];
        var v1 = range[pos+1];
        var color0 = colors[pos];
        var color1 = colors[pos+1];
        
        var ret = "#";
        
        for (var i=0; i < 3; i++) {
            
            var c0 = parseInt(color0.slice(2*i+1, 2*i+3), 16);
            var c1 = parseInt(color1.slice(2*i+1, 2*i+3), 16);
            
            var c = c0 + ((value - v0) * (c1 - c0)) / ((v1 - v0));
            if (c > 255) c = 255;
            if (c < 0) c = 0;
            
            var c16 = Math.round(c).toString(16);
            if (c16.length == 1) c16 = "0" + c16;
            ret = ret + c16;
        }
        return ret;
    };
        
    utils.debg = function(start, before, now, prefix) {
        console.log(prefix + ":" + (now.getTime() - before)/1000 + ", total: " + (now.getTime() - start)/1000);
    }

    // *********************************************
    // user definition ex. for tooltip
    // *********************************************
    utils.text_format = function(format, obj) {

        var text = "";
        for (var f in format) {
            if (format[f].type == 'fix') {
                text += format[f].label;
                continue;
            }
            var replaced = format[f].label;
            for (var k in format[f].keys) {
                var reg = new RegExp("{" + format[f].keys[k] + "}", 'g');
                replaced = replaced.replace(reg, obj[format[f].keys[k]]);
            }
            // case numeric
            if (format[f].type == 'numeric') {
                try{  replaced = eval(replaced);
                } catch(e) {}
                if (format[f].ext != null) {
                    if (format[f].ext == ",") {
                        replaced = String(replaced).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
                    }
                    //if (format[f].ext.indexOf(".") == 0) {
                    //    replaced = parseFloat(replaced).toFixed(parseInt(format[f].ext.substr(1)));
                    //}
                    if (format[f].ext.indexOf(".") >= 0) {
                        
                        replaced = parseFloat(replaced).toFixed(parseInt(format[f].ext.substr(format[f].ext.indexOf(".") + 1)));
                        
                        if (format[f].ext[0] != ".") {
                            
                            var fill_num, fill_chr;
                            if (format[f].ext[0] == 0) {
                                fill_num = Number(format[f].ext.slice(1, format[f].ext.indexOf(".")));
                                fill_chr = '0';
                            }
                            else {
                                fill_num = Number(format[f].ext.slice(0, format[f].ext.indexOf(".")));
                                fill_chr = ' ';
                            }
                            var int_length = replaced.slice(0, replaced.indexOf(".")).length;
                            var fill = "";
                            if (fill_num > int_length) {
                                fill = Array(fill_num - int_length + 1).join(fill_chr);
                            }
                            replaced = fill + replaced;
                        }
                    }
                }
            }
            text += replaced;
        }
        return text;
    };

    // *********************************************
    // absolute position of element
    // *********************************************
    utils.absolute_position = function(id) {
        var element = document.getElementById(id);
        var rect = element.getBoundingClientRect();
        var x = rect.left + window.pageXOffset;
        var y = rect.top + window.pageYOffset;
        
        return {"x": x, "y": y, "width": rect.width, "height": rect.height};
    }
    
    utils.scroll_position = function(document_obj) {
        return{
            x:document_obj.body.scrollLeft || document_obj.documentElement.scrollLeft,
            y:document_obj.body.scrollTop  || document_obj.documentElement.scrollTop
        };
    }
    
    // *********************************************
    // create key list
    // *********************************************
    utils.create_key_list = function(li) {
        
        var key_list = [];
        
        for (var idx=0; idx < li.length; idx++) {
            if (li[idx][0].match(/[^0-9]+/)) {
                key_list.push(li[idx]);
                continue;
            }
            var temp = li[idx];
            while(1) {
                temp = "_" + temp;
                if (li.indexOf(temp) < 0) {
                    break;
                }
            }
            key_list.push(temp);
        }
        return key_list;
    }
    
    return utils;
})();

/*
 * runstant lite
 */
if (String.prototype.format == undefined) {
    String.prototype.format = function(arg)
    {
        var rep_fn = undefined;
        rep_fn = function(m, k) {
            if (k.indexOf(":") < 0) { return arg[k]; }
            var k_split = k.split(":");
            if (k_split[1] == ",") {
                return String(arg[k_split[0]]).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
            }
            if (k_split[1][0] == ".") {
                return arg[k_split[0]].toFixed(parseInt(k_split[1].substr(1)));
            }
            return arg[k_split[0]];
        }
        return this.replace(/\{(\w+:?[A-Za-z0-9,.]+)\}/g, rep_fn);
    }
}

var downloader = (function() {
    downloader = {};

    // *********************************************
    // create menu
    // *********************************************
    downloader.createMenu = function(pos, id, filename, width, height, svgText) {
        if (d3.select("#" + id).select("ul.download_menu").empty() == false) {
            d3.select("#" + id).select("ul.download_menu").remove();
        }
        var css_ul = {
            'position': 'absolute',
            'z-index': '1000', 
            'display': 'inline-block',  
            'margin': '0px', 'padding': '0px', 
            'list-style': 'outside none none', 
            'background-color': 'rgb(255, 255, 255)', 
            'border': '1px solid rgb(204, 204, 204)', 
        };
        var css_li = {
            'padding-top': '5px',
            'padding-bottom': '5px',
            'padding-left': '20px',
            'padding-right': '20px',
            'display': 'block',
            'clear': 'both',
            'font-weight': '400',
            'line-height': '1.42857143',
            'color': '#333',
            'white-space': 'nowrap',
            'text-decoration': 'none',
            'font-size': '14px',
            'cursor': 'pointer',
        };

        var menu = d3.select("#" + id).append("ul").attr("class", "download_menu")
        menu
            .style({
                'left': pos[0] + 'px',
                'top': pos[1] + 'px',
                })
            .style(css_ul)
            .on('mouseleave', function () {
                menu.classed("hidden", true);
            });
        
        menu.append('li')
            .text('Save as SVG...')
            .style(css_li)
            .on('mouseover', function () {
                d3.select(this).style("background-color", "#B6BDD2");
            })
            .on('mouseleave', function () {
                d3.select(this).style("background-color", "#FFF");
            })
            .on('click', function () {
                downloader.download_image(filename, "svg", width, height, svgText);
            })
        ;
        
        menu.append('li')
            .text('Save as PNG...')
            .style(css_li)
            .on('mouseover', function () {
                d3.select(this).style("background-color", "#B6BDD2");
            })
            .on('mouseleave', function () {
                d3.select(this).style("background-color", "#FFF");
            })
            .on('click', function () {
                downloader.download_image(filename, "png", width, height, svgText);
            });
    };

    downloader.set_event_listner = function(id, float_flg) {
        
        var box = document.getElementById(id);

        box.addEventListener("contextmenu", function(e){
            e.preventDefault();
        }, false);
        
        box.addEventListener("mousedown", function(e){
            // right click only
            if (e.button == 2) {
                if (float_flg == undefined) float_flg = false;
            
                var svgText = downloader.svg_text(id, 0, 0);
                var height = Number(d3.select("#" + id).select("svg").style("height").replace("px", ""));
                var width = Number(d3.select("#" + id).select("svg").style("width").replace("px", ""));
            
                svgText = downloader.add_svgtag(svgText, height, width);
                var scroll_pos = utils.scroll_position(document);
                var pos_x = e.clientX + scroll_pos.x;
                var pos_y = e.clientY + scroll_pos.y;
                
                if (float_flg == true) {
                    var rect = utils.absolute_position(id);
                    pos_x -= rect.x;
                    pos_y -= rect.y;
                }
                downloader.createMenu ([pos_x, pos_y], id, id, width, height, svgText);
            }
        }, false);
        
        box.addEventListener("mouseup", function(e){
            e.preventDefault();
        }, false);
    }
    // *********************************************
    // save image
    // *********************************************
    downloader._SVG_HEADER = 'xmlns:xlink="http://www.w3.org/1999/xlink" xmlns="http://www.w3.org/2000/svg" version="1.1"';
    
    downloader.add_svgtag = function(svgText, height, width) {
        return '<svg ' + downloader._SVG_HEADER + ' height="' + height + '" width="' + width + '">' + svgText + '</svg>';
    }

    downloader.svg_text = function(id, tr_x, tr_y) {
        var svgText = document.getElementById(id).innerHTML;
        svgText = svgText.replace(/visibility\s?:\s?hidden/g, "display:none");
        
        return "\n<g transform='translate(" + tr_x + ", " + tr_y + ")'>\n" + svgText + "\n</g>\n";
    }
    
    downloader.virtual_svg_text = function(text, height, width, tr_x, tr_y, font_size, bold, anchor, valign) {
        
        var trans_x = 0;
        var trans_y = font_size;
        var styleText = '<text font-family="' + style_general.font_family + '" font-size="' + font_size + 'px"';
        
        if (bold == true) {
            styleText += ' font-weight="bold"';
        }
        if (anchor == "middle") {
            styleText += ' text-anchor="' + anchor + '"';
            trans_x = width/2;
        }
        else if (anchor == "end") {
            styleText += ' text-anchor="' + anchor + '"';
            trans_x = width;
        }
        if (valign == "center") {
            trans_y = (font_size + height)/2;
        }
        else if (anchor == "bottom") {
            trans_y = height - font_size;
        }
        
        tagText = '<g transform="translate(' + trans_x + ',' + trans_y + ')">' + styleText + '>' + text + '</text></g>';
        
        var svgText = '<svg ' + downloader._SVG_HEADER + ' height="' + height + '" width="' + width + '">' + tagText + '</svg>';
        return "\n<g transform='translate(" + tr_x + ", " + tr_y + ")'>\n" + svgText + "\n</g>\n";
    }
    
    downloader.virtual_svg_rect = function(rgb_color, opacity, height, width, tr_x, tr_y) {
        var tagText = '<rect height="' + height + '" width="' + width + '" style="fill: ' + rgb_color + '; opacity: ' + opacity + ';"></rect>';
        
        var svgText = '<svg ' + downloader._SVG_HEADER + ' height="' + height + '" width="' + width + '">' + tagText + '</svg>';
        return "\n<g transform='translate(" + tr_x + ", " + tr_y + ")'>\n" + svgText + "\n</g>\n";
    }

    downloader.base64 = function(plain_text) {
        // plain-text -> base64
        var base64 = window.btoa(encodeURIComponent(plain_text).replace(/%([0-9A-F]{2})/g, function (match, p1) {
            return String.fromCharCode('0x' + p1);
        }));
        return base64;
    }
    downloader.download_image = function(filename, mode, width, height, svgText) {
        
        if (mode =="svg") {
            downloader.download_content(svgText, mode, filename + '.' + mode);
        }
        else if (mode =="png") {

            var canvas = document.getElementById("dw_canvas")
            canvas.width = width;
            canvas.height = height;
            var context = canvas.getContext('2d');
            var image = new window.Image();
            image.src = 'data:image/svg+xml;charset=utf-8;base64,' + downloader.base64(svgText);
            
            image.onload = function () {
                context.drawImage(image, 0, 0);
                
                try {
                    data_url = canvas.toDataURL('image/png');
                    downloader.download_content(data_url, mode, filename + '.' + mode);
                }
                catch (e) {
                    // canvas.toDataURL = false (IE)
                    var nwin = window.open("", '_blank');
                    nwin.document.open();
                    nwin.document.write("<HTML><HEAD><TITLE>" + filename + "</TITLE><BODY><IMG SRC=" + image.src + " /></BODY></HTML>");
                    nwin.document.close();
                    nwin.focus();
                }
            }
        }
    }
        
    downloader.download_content = function(content, type, name) {
        
        var data_url, bin;
        
        // image
        if (type == "png") {
            mimeType = "image/png";
            bin = atob(content.split(',')[1]);
            data_url = content;
        }
        else {
            // pain-text
            if (type == "svg") {
                mimeType = "image/svg+xml";
            }
            else if (type == "text") {
                mimeType == "text/plain";
            }
            else {
                return;
            }
            bin = content;
            data_url = 'data:' + mimeType + ';base64,' + downloader.base64(content);
        }
        
        var buffer = new Uint8Array(bin.length);
        for (var i = 0; i < bin.length; i++) {
            buffer[i] = bin.charCodeAt(i);
        }
        var blob = new Blob([buffer.buffer], {type : mimeType});
        
        var a = document.createElement('a');
        a.download = name;
        a.target   = '_blank';
        
        if (window.navigator.msSaveBlob) {
            // for IE
            window.navigator.msSaveBlob(blob, name);
        }
        else if (window.URL && window.URL.createObjectURL) {
            // for Firefox
            a.href = window.URL.createObjectURL(blob);
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
        }
        else if (window.webkitURL && window.webkitURL.createObject) {
            // for Chrome
            a.href = window.webkitURL.createObjectURL(blob);
            a.click();
        }
        else {
            // for Safari
            window.open(data_url, '_blank');
        }
    }
    
    return downloader;
})();

var legend = (function()
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
        
        legend_svg.select(".legend_class")
            .call(legend_color);
        
        // for bug
        legend_svg.selectAll("g.cell").style("opacity", 1);
        
        legend_svg.selectAll("g.cell").selectAll("rect")
            .attr("transform", "translate(" + this.layout.shape_sift_left + ", 0)")
            ;

        legend_svg.selectAll("g.cell").selectAll("text")
            .attr("font-size", this.layout.text_font_size + "px")
            .attr("font-family", this.layout.font_family);

        if (this.options.horizon == true) {
            var trans = legend_svg.selectAll("g.cell").selectAll("text").attr("transform").replace("translate(", "").replace(")", "").split(",");
            if (trans.length == 1) trans = trans[0].split(" "); // for IE
            
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
        for (var i = 0; i < this.items.length; i++) {
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
        for (var i = 0; i < items_org.length; i++) {
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
        for (var i = 0; i < items.length; i++) {
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

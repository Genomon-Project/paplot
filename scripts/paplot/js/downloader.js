downloader = (function() {
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
            .attr('id', 'save_svg')
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
            .attr('id', 'save_png')
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
        
        var tagText = '<g transform="translate(' + trans_x + ',' + trans_y + ')">' + styleText + '>' + text + '</text></g>';
        
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
                    downloader.download_content(canvas.toDataURL('image/png'), mode, filename + '.' + mode);
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
        
        var data_url, bin, mimeType;
        
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
                mimeType = "text/plain";
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

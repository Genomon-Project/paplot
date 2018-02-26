utils = (function() {
    utils = {};
    utils.color_gradient = function(value, range, colors) {

        if (value <= range[0]) return colors[0];
        else if (value >= range[range.length-1]) return colors[range.length-1];

        var pos = 0, i = 0;
        for (i = 0; i < (range.length-1); i++) {
            
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
        
        for (i = 0; i < 3; i++) {
            
            var c0 = parseInt(color0.slice(2*i+1, 2*i+3), 16);
            var c1 = parseInt(color1.slice(2*i+1, 2*i+3), 16);
            
            var c = c0 + ((value - v0) * (c1 - c0)) / (v1 - v0);
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
                try{
                    replaced = eval(replaced);
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
        var rep_fn = function(m, k) {
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

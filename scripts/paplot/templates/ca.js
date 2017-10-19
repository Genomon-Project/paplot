var node_name = function(Chr, index, leveling) {
    if (leveling == null) {
        leveling = false;
    }
    var ret;
    if (leveling == true) {
        ret = "root." + Chr + "." + Chr + "_" + ("000" + index).substr(-4);
    }
    else {
        ret = Chr + "_" + ("000" + index).substr(-4);
    }
    return ret;
};

var create_blank_nodes = function(node_size, leveling) {
    if (leveling == null) {
        leveling = false;
    }
    var nodes = [];
    for (var i = 0; i < ca_data.genome_size.length; i++){
        var item_num = Math.floor(ca_data.genome_size[i].size/node_size) + 1;
        if (leveling == false) {
            item_num = item_num + 1;
        }
        for (var j = 0; j < item_num; j++){
            var start;
            if (leveling == true) {
                start = node_name(ca_data.genome_size[i].chr, j, true);
            }
            else {
                start = node_name(ca_data.genome_size[i].chr, j, false);
            }
            nodes.push({"start":start, "ends":[], "tooltip":[]});
        }
    }
    return nodes
};

function tooltip_partial(format, link) {
    
    var obj = {id: link[0], 
        chr1: ca_data.genome_size[Number(link[1])].label, 
        break1: link[2], 
        chr2: ca_data.genome_size[Number(link[3])].label, 
        break2: link[4], func: ca_data.group[link[6]].label};
        
    var tooltip = [];
    
    for (var p = 0; p < link[7].length; p++) {
        for (var p2 = 0; p2 < link[7][p].length; p2++) {
            obj[ca_data.link_header[p2]] = link[7][p][p2];
        }
        for (var t in format.format) {
            var text = text_format(format.format[t], obj);
            if (tooltip.indexOf(text) < 0){
                tooltip.push(text);
            }
        }
    }

    return tooltip;
};
function text_format(format, obj) {

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
                if (format[f].ext[0] == ".") {
                    replaced = parseFloat(replaced).toFixed(parseInt(format[f].ext.substr(1)));
                }
            }
        }
        text += replaced;
    }
    return text;
};

var create_bundle_dataset = function (ID, node_size, tooltip) {

    var i = 0;
    var each_dataset = [];
    for (i = 0; i< ca_data.group.length; i++) {
        each_dataset[i] = create_blank_nodes(node_size);
    }
    
    for (i = 0; i < ca_data.links.length; i++) {
        if (ca_data.links[i][0] != ID) {
            continue;
        }
        
        var start = node_name(ca_data.links[i][1], Math.floor(ca_data.links[i][2]/node_size));
        var index = -1;
        for (var j = 0; j < each_dataset[0].length; j++){
            if (each_dataset[0][j].start == start) {
                index = j;
                break;
            }
        }
        if (index < 0) {
            continue;
        }
        var end_pos = Math.floor(ca_data.links[i][4]/node_size);
        var end = node_name(ca_data.links[i][3], end_pos);
        // if same position, sift end position.
        if (start == end) {
            if (end_pos == Math.floor(ca_data.genome_size[Number(ca_data.links[i][3])].size/node_size)) {
                end = node_name(ca_data.links[i][3], end_pos - 1);
            }
            else {
                end = node_name(ca_data.links[i][3], end_pos + 1);
            }
        }
        
        var group = ca_data.links[i][6];
        each_dataset[group][index].ends.push(end);
        
        // tooltip
        if (tooltip == true) {
            each_dataset[group][index].tooltip.push(tooltip_partial(ca_data.tooltip_format.bundle, ca_data.links[i]));
        }
    }
    
    return each_dataset;
};

ca_data.get_data_thumb = function (ID) {
    return create_bundle_dataset(ID, ca_data.node_size_thumb, false);
};

ca_data.get_arc_data_thumb = function () {
    return create_blank_nodes(ca_data.node_size_thumb, true);
};

ca_data.get_data_detail = function (ID) {
    return create_bundle_dataset(ID, ca_data.node_size_detail, true);
};

ca_data.get_arc_data_detail = function (ID) {
    return create_blank_nodes(ca_data.node_size_detail, true);
};

var key_to_index = function (list, key) {
    
    for (var i = 0; i < list.length; i++) {
        if (list[i] == key) {
            return i
        }
    }
    return -1;
};

ca_data.get_select = function () {
    var node_size = ca_data.node_size_select;
    var i = 0, j= 0;
    
    var key = [];
    for (i = 0; i < ca_data.select_key.length; i++) {
        key[i] = [];
        for (j = 0; j < ca_data.select_key[i].length; j++) {
            key[i][j] = node_name(("0" + ca_data.select_key[i][j][0]).substr(-2), ("0" + ca_data.select_key[i][j][1]).substr(-2), true);
        }
    }
    
    var item = [];
    for (i = 0; i < ca_data.select_item.length; i++) {
        item[i] = [];
        for (j = 0; j < ca_data.select_item[i].length; j++) {
            item[i][j] = [];
            for (var k = 0; k < ca_data.select_item[i][j].length; k++) {
                item[i][j][k] = ca_data.index_ID[ca_data.select_item[i][j][k]];
            }
        }
    }
    
    var all_key = [];
    var c = 0;
    for (i = 0; i < ca_data.genome_size.length; i++){
        var item_num = Math.floor(ca_data.genome_size[i].size/node_size) + 1;
        for (j = 0; j < item_num; j++){
            all_key[c] = node_name(ca_data.genome_size[i].chr, j, true);
            c++;
        }
    }
    
    return {value:ca_data.select_value, key:key, item:item, all_key:all_key};
};

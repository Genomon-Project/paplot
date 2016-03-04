# -*- coding: utf-8 -*-
"""
Created on Wed Feb 03 12:31:47 2016

@author: okada

$Id: sv.py 63 2016-03-03 09:15:29Z aokada $
$Rev: 63 $
"""

########### js template
js_dataset = """
bundle_data_sv.node_size_detail = {node_size_detail};
bundle_data_sv.node_size_thumb = {node_size_thumb};
bundle_data_sv.node_size_select = {node_size_select};

bundle_data_sv.item_num = {item_num};

// sorted by index
bundle_data_sv.index_ID = [
{IDs}
];

bundle_data_sv.genome_size = [
{genome_size}
];

// 0:ID, 1:chr1, 2:break1, 3:direction1, 4:gene_name1, 5:chr2, 6:break2, 7:direction2, 8:gene_name2, 9:type, 10:is_inter, 11:is_snippet
bundle_data_sv.links = [
{links}
];
"""
js_header = """(function() {
bundle_data_sv = {};
"""
js_function = """
var create_blank_nodes = function(node_size) {
    var nodes = [];
    for (var i = 0; i < bundle_data_sv.genome_size.length; i++){
        var item_num = Math.floor(bundle_data_sv.genome_size[i].size/node_size) + 1;
        for (var j = 0; j < item_num; j++){
            var start = "root." + bundle_data_sv.genome_size[i].chr + "." + bundle_data_sv.genome_size[i].chr + "_" + ("000" + j).substr(-4);
            nodes.push({"start":start, "ends":[], "tooltip":[]});
        }
    }
    return nodes
};
    
var create_bundle_dataset = function (ID, node_size, tooltip) {

    var dataset_outer = create_blank_nodes(node_size);
    var dataset_inner = create_blank_nodes(node_size);
    var dataset_snipp = create_blank_nodes(node_size);
    
    for (var i = 0; i < bundle_data_sv.links.length; i++) {
        if (bundle_data_sv.links[i][0] != ID) {
            continue;
        }
        
        var start = "root." + bundle_data_sv.links[i][1] + "." + bundle_data_sv.links[i][1] + "_" + ("000" + Math.floor(bundle_data_sv.links[i][2]/node_size)).substr(-4);
        var index = -1;
        for (var j = 0; j < dataset_outer.length; j++){
            if (dataset_outer[j].start == start) {
                index = j;
                break;
            }
        }
        if (index < 0) {
            continue;
        }
        var end_pos = Math.floor(bundle_data_sv.links[i][6]/node_size);
        var end = "root." + bundle_data_sv.links[i][5] + "." + bundle_data_sv.links[i][5] + "_" + ("000" + end_pos).substr(-4);
        // if same position, sift end position.
        if (start == end) {
            if (end_pos == Math.floor(bundle_data_sv.genome_size[Number(bundle_data_sv.links[i][5])].size/node_size)) {
                end = "root." + bundle_data_sv.links[i][5] + "." + bundle_data_sv.links[i][5] + "_" + ("000" + (end_pos - 1)).substr(-4);
            }
            else {
                end = "root." + bundle_data_sv.links[i][5] + "." + bundle_data_sv.links[i][5] + "_" + ("000" + (end_pos + 1)).substr(-4);
            }
        }
        
        
        // link type
        if (bundle_data_sv.links[i][11] == true) {
            // snippet
            dataset_snipp[index].ends.push(end);
        }
        else if(bundle_data_sv.links[i][10] == true) {
            // inner
            dataset_inner[index].ends.push(end);
        }
        else {
            // outer
            dataset_outer[index].ends.push(end);
        }
        
        // tooltip
        if (tooltip == true) {
            var tooltip_txt = style_sv_detail.arc_label_text[Number(bundle_data_sv.links[i][1])] + ": " +
                bundle_data_sv.links[i][2].toLocaleString() + " (" +
                bundle_data_sv.links[i][3] + ") " +
                bundle_data_sv.links[i][4] + "; " +
                style_sv_detail.arc_label_text[Number(bundle_data_sv.links[i][5])] + ": " +
                bundle_data_sv.links[i][6].toLocaleString() + " (" +
                bundle_data_sv.links[i][7] + ") " +
                bundle_data_sv.links[i][8] + "; " +
                bundle_data_sv.links[i][9];
            
            if (bundle_data_sv.links[i][11] == true) {
                // snippet
                dataset_snipp[index].tooltip.push(tooltip_txt);
            }
            else if(bundle_data_sv.links[i][10] == true) {
                // inner
                dataset_inner[index].tooltip.push(tooltip_txt);
            }
            else {
                // outer
                dataset_outer[index].tooltip.push(tooltip_txt);
            }
        }
    }
    
    ret = [];
    ret.push(dataset_outer);
    ret.push(dataset_inner);
    ret.push(dataset_snipp);
    return ret;
};

bundle_data_sv.get_data_thumb = function (ID) {
    return create_bundle_dataset(ID, bundle_data_sv.node_size_thumb, false);
};

bundle_data_sv.get_data_detail = function (ID) {
    return create_bundle_dataset(ID, bundle_data_sv.node_size_detail, true);
};

var key_to_index = function (list, key) {
    
    for (var i = 0; i < list.length; i++) {
        if (list[i] == key) {
            return i
        }
    }
    return -1;
};

bundle_data_sv.get_select = function () {
    var node_size = bundle_data_sv.node_size_select;
    var dataset = {"key":[], "item":[[],[],[]], "value":[[],[],[]]};
    
    var c = 0;
    for (var i = 0; i < bundle_data_sv.genome_size.length; i++){
        var item_num = Math.floor(bundle_data_sv.genome_size[i].size/node_size) + 1;
        for (var j = 0; j < item_num; j++){
            var key = "root." + bundle_data_sv.genome_size[i].chr + "." + bundle_data_sv.genome_size[i].chr + "_" + ("000" + j).substr(-4);
            dataset.key[c] = key;
            dataset.item[0][c] = [];  // outer
            dataset.item[1][c] = [];  // inner
            dataset.item[2][c] = [];  // snippet
            dataset.value[0][c] = 0;  // outer
            dataset.value[1][c] = 0;  // inner
            dataset.value[2][c] = 0;  // snippet
            c++;
        }
    }
    for (var i = 0; i < bundle_data_sv.links.length; i++) {
        
        var key  = "root." + bundle_data_sv.links[i][1] + "." + bundle_data_sv.links[i][1] + "_" + ("000" + Math.floor(bundle_data_sv.links[i][2]/node_size)).substr(-4);
        var item = "root." + bundle_data_sv.links[i][5] + "." + bundle_data_sv.links[i][5] + "_" + ("000" + Math.floor(bundle_data_sv.links[i][6]/node_size)).substr(-4);

        var idx1 = key_to_index(dataset.key, key);
        var idx2 = key_to_index(dataset.key, item);

        if ((idx1 < 0) || (idx2 < 0)) {
            continue;
        }
        // snippet
        if (bundle_data_sv.links[i][11] == true) {
            // add bp1
            dataset.item[2][idx1].push(bundle_data_sv.links[i][0]);
            
            // add bp2
            dataset.item[2][idx2].push(bundle_data_sv.links[i][0]);
        }
        // outer
        else if (bundle_data_sv.links[i][10] == false) {
            // add bp1
            dataset.item[0][idx1].push(bundle_data_sv.links[i][0]);
        
            // add bp2
            dataset.item[0][idx2].push(bundle_data_sv.links[i][0]);
        }
        // inner
        else {
            // add bp1
            dataset.item[1][idx1].push(bundle_data_sv.links[i][0]);
            // add bp2
            if (key != item) {
                dataset.item[1][idx2].push(bundle_data_sv.links[i][0]);
            }
        }
    }

   
     for (var i = 0; i < dataset.key.length; i++) {
        for (var j = 0; j < 3; j++) {
            if (dataset.item[j][i].length == 0) {
                continue;
            }
            // delete duplication
            var sort = dataset.item[j][i].filter(function (x, y, self) {
                return self.indexOf(x) === y;
             });
            dataset.item[j][i] = sort;
            dataset.value[j][i] = dataset.item[j][i].length;
        }
    }
    
    return dataset;
};
})();
"""

genome_size_template = '{{"chr":"{Chr:0>2}", "size":{size}}}'
links_template = '["{ID}","{Chr1:0>2}",{pos1},"{dir1}","{name1}","{Chr2:0>2}",{pos2},"{dir2}","{name2}","{ttype}",{inter_flg},{snippet_flg}]'

########### html template

li_template = '<li class="thumb" id="thumb{id}_li"><div id="thumb{id}" onclick="show_float(\'{id}\',\'{title}\')"><strong>{title}<br></strong></div></li>\n'
call_template = 'draw_bandle_thumb("{id}", "{title}");\n'
detail_template = """<div class="float_frame" id="float{id}"><table><tr><td class="float_header" id="float{id}_t"><strong>{title}</strong></td><td><input type="button" value="X" onclick="hide_float('#float{id}')" margin="0"></td></tr><tr><td colspan="2" class="float_svg" id="map{id}"></td></tr></table><div class="float_handle" id="float{id}_h" onmousedown="mouse_down(event, '#float{id}')" onmousemove="mouse_move(event, '#float{id}')" onmouseup="mouse_up(event, '#float{id}')" onmouseout="mouse_out('#float{id}')"></div></div>
"""
########### functions

def load_genome_size(config):
    from paplot import tools

    path = tools.config_getpath(config, "genome", "path", "../config/hg19.csv")
    use_chrs = tools.config_getstr(config, "sv", "use_chrs").lower().replace(" ", "").split(",")
    for i in range(len(use_chrs)):
        label = use_chrs[i]
        if label[0:3] == "chr":
            use_chrs[i] = label[3:len(label)]
    
    f = open(path)
    read = f.read()
    f.close()
    
    formatt = read.replace("\r", "\n").replace(" ", "")
    
    genome_size = []
    _max = 0
    for row in formatt.split("\n"):
        items = row.split(",")

        if len(items) < 2:
            continue
        
        if items[1].isdigit() == False:
            continue

        label = items[0].lower()
        if label[0:3] == "chr":
            label = label[3:len(label)]
            
        if len(use_chrs) > 1 and (label in use_chrs) == False:
            continue
        
        if _max < int(items[1]):
            _max = int(items[1])
        genome_size.append([label, int(items[1])])

    for i in range(len(genome_size)):
        if genome_size[i][1] < int(_max/10):
            genome_size[i][1] = int(_max/10)
    
    return genome_size

def calc_node_size(genome_size, total):
    
    _sum = 0
    _min = genome_size[0][1]
    
    for i in range(len(genome_size)):
        _sum += genome_size[i][1]
        if _min > genome_size[i][1]:
            _min = genome_size[i][1]
            
    size = int(_sum/total)
    if _min <= size:
        size = _min - 1

    return size
        
def load_csv(input_file):
    from paplot import data_frame
        
    # data read
    try:
        df = data_frame.load_file(input_file, sept = ",", header = 1)

    except Exception as e:
        print ("failure open data %s, %s" % (input_file, e.message))
        return None
    
    return df

def insite_genome(genome_size, Chr, pos):
    # return [i,   0] : insite
    # return [i,  >0] : range
    # return [-1, -1] : Chr is none

    for i in range(len(genome_size)):
        label = Chr.lower()
        if label[0:3] == "chr":
            label = label[3:len(label)]
        if genome_size[i][0] == label:
            if genome_size[i][1] >= pos:
                return [i, 0]
            else:
                return [i, genome_size[i][1]]
    
    return [-1, -1]

def output_html(input_file, output_js_file, output_html_dir, org_html, project_name, config):
    id_list = convert_tojs(input_file, output_js_file, config)
    if len(id_list) > 0:
        create_html(id_list, output_html_dir, org_html, project_name, config)
        
def convert_tojs(input_file, output_file, config):
    from paplot import tools

    df = load_csv(input_file)
    if df == None:
        return []
        
    if len(df.data) == 0:
        print ("skip blank file %s" % input_file)
        return []
        
    genome_size = load_genome_size(config)
    if len(genome_size) == 0:
        return []

    genome = ""
    for i in range(len(genome_size)):
        if len(genome) > 0:
            genome += ",\n"
        genome += genome_size_template.format(Chr=i, size = genome_size[i][1])

    snippet_th = tools.config_getint(config, "sv", "snippet_threshold")
    snippet_type = tools.config_getstr(config, "sv", "snippet_sv_type").lower().replace(" ", "").split(",")
    
    id_list = []
    links = ""
    for row in df.data:

        chr1 = row[df.name_to_index("chr1")]
        chr2 = row[df.name_to_index("chr2")]        
        pos1 = row[df.name_to_index("break1")]
        pos2 = row[df.name_to_index("break2")]
        
        [index1, rang] = insite_genome(genome_size, chr1, pos1)
        if rang > 0:
            print("breakpoint 1 is over range. chr%s: input=%d, range=%d" % (chr1, pos1, rang))
            continue
        if rang < 0:
            #print("chr1 is undefined. %s" % (chr1))
            continue
        
        [index2, rang] = insite_genome(genome_size, chr2, pos2)
        if rang > 0:
            print("breakpoint 2 is over range. chr%s: input=%d, range=%d" % (chr2, pos2, rang))
            continue
        if rang < 0:
            #print("chr2 is undefined. %s" % (chr2))
            continue
        
        inter_flg = "false"
        snippet_flg = "false"
        if (chr1 == chr2):
            if abs(pos2 - pos1) < snippet_th:
                for t in snippet_type:
                    if row[df.name_to_index("type")].lower() == t:
                        snippet_flg = "true"
                        break
            
            names1 = row[df.name_to_index("gene_name1")].replace(" ", "").split(";")
            names2 = row[df.name_to_index("gene_name1")].replace(" ", "").split(";")
            for n1 in names1:
                for n2 in names2:
                    if n1 == n2:
                        inter_flg = "true"
                        break
        
        if len(links) > 0:
            links += ",\n"
            
        links += links_template.format(ID=row[df.name_to_index("ID")], \
            Chr1=index1, pos1=pos1, dir1=row[df.name_to_index("direction1")], name1=row[df.name_to_index("gene_name1")], \
            Chr2=index2, pos2=pos2, dir2=row[df.name_to_index("direction2")], name2=row[df.name_to_index("gene_name2")], \
            ttype=row[df.name_to_index("type")], inter_flg=inter_flg, snippet_flg=snippet_flg)
            
        id_list.append(row[df.name_to_index("ID")])
    
    id_list_sort = list(set(id_list))
    id_list_sort.sort()
    Ids = ""
    for iid in id_list_sort:
        if len(Ids) > 0:
            Ids += ",\n"
        Ids += "'" + iid + "'"

    f = open(output_file, "w")
    f.write(js_header \
        + js_dataset.format(node_size_detail = calc_node_size(genome_size, 500), \
        node_size_thumb = calc_node_size(genome_size, 60), \
        node_size_select = 5000000,\
        item_num = len(id_list), \
        IDs = Ids, \
        genome_size = genome, \
        links = links)
        + js_function)
    f.close()

    return id_list_sort

def create_html(id_list, output_html_dir, org_html, project_name, config):
    from paplot import tools    
    import os

    div_txt = ""    
    call_txt = ""
    detail_txt = ""
    for i in range(len(id_list)):
        
        div_txt += li_template.format(id = str(i), title = id_list[i])
        call_txt += call_template.format(id = str(i), title = id_list[i])
        detail_txt += detail_template.format(id = str(i), title = id_list[i])
        
    f_template = open(os.path.dirname(os.path.abspath(__file__)) + "/templates/" + org_html)
    html_template = f_template.read()
    f_template.close()
    
    f_html = open(output_html_dir + "/" + org_html, "w")
    f_html.write(
        html_template.format(project = project_name, 
            version = tools.version_text(),
            date = tools.now_string(),
            div_list = div_txt,
            call_list = call_txt,
            details = detail_txt,
            style = "../style/%s" % os.path.basename(tools.config_getpath(config, "style", "path", "default.js")),
        ))
    f_html.close()
    
if __name__ == "__main__":
    pass

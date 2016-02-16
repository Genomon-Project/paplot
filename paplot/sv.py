# -*- coding: utf-8 -*-
"""
Created on Wed Feb 03 12:31:47 2016

@author: okada

$Id: sv.py 39 2016-02-16 06:43:19Z aokada $
$Rev: 39 $
"""

########### js template
js_dataset = """
bundle_data_sv.items = [
{dataset}
];
"""
js_top = """(function() {
bundle_data_sv = {};
"""
js_bottom = """
bundle_data_sv.get_data = function (ID) {
    var dataset = [];
    var nodes = []
    for (var i = 0; i < bundle_data_sv.items.length; i++) {
        if (bundle_data_sv.items[i].ID == ID) {
            nodes = bundle_data_sv.items[i].nodes;
            break;
        }
    }
    for (var i = 0; i < bundle_data_sv.container.length; i++){
        for (var j = 0; j < bundle_data_sv.container[i].num; j++){
            var key = "root." + bundle_data_sv.container[i].index + "." + bundle_data_sv.container[i].index + "_" + ("000" + j).substr(-4);
            
            var find=false;
            for (var k = 0; k < nodes.length; k++) {
                if (nodes[k].start == key) {
                    dataset.push(nodes[k]);
                    find=true;
                    break;
                }
            }
            if (find==false) {
            	dataset.push({"start":key, "ends":[], "value":[]});
            }
        }
    }
    return dataset;
};
})();
"""
js_contain = """
bundle_data_sv.container = [
{contain}
];
"""


js2_dataset = """
bundle_data_sv_thumb.items = [
{dataset}
];
"""

js2_top = """(function() {
bundle_data_sv_thumb = {};
"""
js2_bottom = """
bundle_data_sv_thumb.get_data = function (ID) {
    var dataset = [];
    var nodes = []
    for (var i = 0; i < bundle_data_sv_thumb.items.length; i++) {
        if (bundle_data_sv_thumb.items[i].ID == ID) {
            nodes = bundle_data_sv_thumb.items[i].nodes;
            break;
        }
    }
    for (var i = 0; i < bundle_data_sv_thumb.container.length; i++){
        for (var j = 0; j < bundle_data_sv_thumb.container[i].num; j++){
            var key = "root." + bundle_data_sv_thumb.container[i].index + "." + bundle_data_sv_thumb.container[i].index + "_" + ("000" + j).substr(-4);
            
            var find=false;
            for (var k = 0; k < nodes.length; k++) {
                if (nodes[k].start == key) {
                    dataset.push(nodes[k]);
                    find=true;
                    break;
                }
            }
            if (find==false) {
            	dataset.push({"start":key, "ends":[], "value":[]});
            }
        }
    }
    return dataset;
};
})();
"""
js2_contain = """
bundle_data_sv_thumb.container = [
{contain}
];
"""

dataset_template = '{{"ID":"{ID}", "nodes":[{nodes}]}}'
node_template = '{{"start":"{name1}", "ends":{name2}, "value":{value}}}'
node2_template = '{{"start":"{name1}", "ends":{name2}}}'
name_template = 'root.{Chr}.{Chr}_{pos:0>4}'
contain_template = '{{"index":"{key}", "num":{num}}}'

genome_size = [
    ["01", 249250621],
    ["02", 243199373],
    ["03", 198022430],
    ["04", 191154276],
    ["05", 180915260],
    ["06", 171115067],
    ["07", 159138663],
    ["08", 146364022],
    ["09", 141213431],
    ["10", 135534747],
    ["11", 135006516],
    ["12", 133851895],
    ["13", 115169878],
    ["14", 107349540],
    ["15", 102531392],
    ["16",  90354753],
    ["17",  81195210],
    ["18",  78077248],
    ["19",  59128983],
    ["20",  63025520],
    ["21",  48129895],
    ["22",  51304566],
    [ "X", 155270560],
    [ "Y",  59373566],
]

round_scale_normal = 5000000
round_scale_thumb = 40000000

########### html template

li_template = '<li class="thumb"><div id="bundle{id}" onclick="show_float(\'{id}\',\'{title}\')"><strong>{title}<br></strong></div></li>\n'
call_template = 'draw_bandle_thumb("{id}", "{title}");\n'
detail_template = """<div class="float_frame" id="float{id}"><table><tr><td class="float_header" id="float{id}_t"><strong>{title}</strong></td><td><input type="button" value="X" onclick="hide_float('#float{id}')" margin="0"></td></tr><tr><td colspan="2" class="float_svg" id="map{id}"></td></tr></table><div class="float_handle" id="float{id}_h" onmousedown="mouse_down(event, '#float{id}')" onmousemove="mouse_move(event, '#float{id}')" onmouseup="mouse_up(event, '#float{id}')" onmouseout="mouse_out('#float{id}')"></div></div>
"""
########### functions

def data_toChr(inpt):
    txt = str(inpt)
    
    if len(txt) > 3:
        if txt[0:3].lower() == "chr":
            txt = txt[3:len(txt)]
            
    if txt.isdigit() == True:
        txt = "%02d" % int(txt)

    ret = ""
    for i in range(len(genome_size)):
        if txt == genome_size[i][0]:
            ret = txt
            break

    return ret
    
def getSize(chrom):
    for i in range(len(genome_size)):
        if chrom == genome_size[i][0]:
            return genome_size[i][1]
    
    return 0
        
def load_csv(input_file):
    import pandas
    import os
    
    if os.path.exists(input_file) == False:
        print "file is not exists %s" % input_file
        return []
        
    if os.path.getsize(input_file) == 0:
        print "skip blank file %s" % input_file
        return []
        
    # data read
    usecols = ("ID", "chr1", "chr2", "break1", "break2", "type", "gene_name1", "gene_name2", "direction1", "direction2")
    try:
        data = pandas.read_csv(input_file, \
            usecols=usecols, \
            sep = ",", engine = "python", skip_blank_lines=True)
    except StopIteration:
        print "skip no data file %s" % input_file
        return []
    except Exception as e:
        print "failure open data %s, %s" % (input_file, e.message)
        return []
        
    if len(data) == 0:
        print "no data."
        return []

    data = data.dropna(axis=0, subset=usecols)
        
    return data
    
def convert_tojs(input_file, output_file, config, round_scale = round_scale_normal):

    data = load_csv(input_file)
    if len(data) == 0:
        return False

    id_list = data["ID"][(data["ID"].duplicated() == False)]    
    
    dataset = ""
    for iid in id_list:
        if len(dataset) > 0:
            dataset += ",\n"
            
        dataset += dataset_template.format(ID = iid, nodes = set_nodes(data[(data["ID"] == iid)], round_scale, blank = False, tooltip = True))

    contain = ""
    for i in range(0, len(genome_size)):
        if len(contain) > 0:
            contain += ",\n"
            
        item_num = int(getSize(genome_size[i][0])/round_scale) + 1
        contain += contain_template.format(key = genome_size[i][0], num = item_num)

    f = open(output_file, "w")
    f.write(js_top \
        + js_contain.format(contain = contain) \
        + js_dataset.format(dataset = dataset) \
        + js_bottom)
    f.close()

    return True

def convert_tojs_thumb(input_file, output_file, config, round_scale = round_scale_thumb):

    data = load_csv(input_file)
    if len(data) == 0:
        return False
    
    id_list = data["ID"][(data["ID"].duplicated() == False)]

    dataset = ""
    for iid in id_list:
        if len(dataset) > 0:
            dataset += ",\n"
            
        dataset += dataset_template.format(ID = iid, nodes = set_nodes(data[(data["ID"] == iid)], round_scale, blank = False, tooltip = False))

    contain = ""
    for i in range(0, len(genome_size)):
        if len(contain) > 0:
            contain += ",\n"
            
        item_num = int(getSize(genome_size[i][0])/round_scale) + 1
        contain += contain_template.format(key = genome_size[i][0], num = item_num)
        
    f = open(output_file, "w")
    f.write(js2_top \
        + js2_contain.format(contain = contain) \
        + js2_dataset.format(dataset = dataset) \
        + js2_bottom)
    f.close()

    return True

def pos_name(chr1, start, chr2, end, round_scale):
    
    start = long(start)
    end = long(end)
    name1 = name_template.format(Chr=chr1, pos = start/round_scale)
    name2 = name_template.format(Chr=chr2, pos = end/round_scale)
    
    if name1 != name2:
        return [name1, name2]
    
    if int(getSize(chr2)/round_scale) == int(end/round_scale):
        name2 = name_template.format(Chr=chr2, pos = end/round_scale - 1)
    else:
        name2 = name_template.format(Chr=chr2, pos = end/round_scale + 1)
        
    return [name1, name2]

def set_nodes(data, round_scale, blank = True, tooltip = True):
    
    di = blank_list(round_scale)
    for i in range(len(data)):
        
        #filter
        if (data.iloc[i]["type"].lower() == "inversion"):
            if (data.iloc[i]["chr1"] == data.iloc[i]["chr2"]):
                if (data.iloc[i]["break2"] - data.iloc[i]["break1"]) <= 1000:
                    continue
        
        chr1 = data_toChr(data.iloc[i]["chr1"])
        chr2 = data_toChr(data.iloc[i]["chr2"])

        if chr1 == "" or chr2 == "":
            continue
        
        [name1, name2] = pos_name(chr1, data.iloc[i]["break1"], chr2, data.iloc[i]["break2"], round_scale)

        di[name1][0].append(name2)
        
        if tooltip == True:
            di[name1][1].append(set_tooltip_value(data.iloc[i]))
        
    node_text = ""

    for key, values in sorted(di.items()):
        if blank == False:
            if len(values[0]) == 0:
                continue
            
        if len(node_text) > 0:
            node_text += ",\n"
        
        if tooltip == True:
            node_text += node_template.format(name1 = key, name2 = str(values[0]), value = str(values[1]))
        else:
            node_text += node2_template.format(name1 = key, name2 = str(values[0]))
        
    return node_text;
    
def set_tooltip_value(row):
    import locale
    
    locale.setlocale(locale.LC_ALL, "")
    s = locale.format("%d", row["break1"], grouping=True)
    e = locale.format("%d", row["break2"], grouping=True)

    value = "chr%s. %s, %s, %s; chr%s. %s, %s, %s" % (
        row["chr1"], s, row["direction1"], str(row["gene_name1"]).replace("\[", "").replace("\]", ""),
        row["chr2"], e, row["direction2"], str(row["gene_name2"]).replace("\[", "").replace("\]", ""))
    
    return value
    
def blank_list(round_scale):
    
    di = {}
    for i in range(len(genome_size)):
        
        item_num = int(genome_size[i][1]/round_scale) + 1
        
        for j in range(item_num):
            di.update({name_template.format(Chr = genome_size[i][0], pos = "%04d" % j):[[],[]]})
            
    return di

def create_html(input_file, output_html_dir, org_html, project_name, config):
    from paplot import tools
    import os
    import pandas
    
    data = pandas.read_csv(input_file, sep = ",", engine = "python")
    id_list = data["ID"][(data["ID"].duplicated() == False)]    
    
    id_sort = []
    for iid in id_list:
        id_sort.append(iid)

    id_sort.sort()
    div_txt = ""    
    call_txt = ""
    detail_txt = ""
    for i in range(len(id_sort)):
        div_txt += li_template.format(id = str(i), title = id_sort[i])
        call_txt += call_template.format(id = str(i), title = id_sort[i])
        detail_txt += detail_template.format(id = str(i), title = id_sort[i])
        
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
            style = "../style/%s.js" % config.get("style", "name")
        ))
    f_html.close()
    
if __name__ == "__main__":
    from paplot import tools
    current = "C:\\Users\\okada\\workspace\\trunk\\paplot"
    [config, conf_file] = tools.load_config(current + "/paplot.cfg")
    
    convert_tojs(current + "/paplot/data_sv.csv", current + "/paplot/ACC/ACC/data_sv.js", config)  
#    create_html(current + "/paplot/data_sv.csv", current + "/paplot/ACC/ACC", "bundle_sv.html", "ACC", config)   




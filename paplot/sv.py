# -*- coding: utf-8 -*-
"""
Created on Wed Feb 03 12:31:47 2016

@author: okada

$Id: sv.py 53 2016-02-26 06:38:45Z aokada $
$Rev: 53 $
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

bundle_data_sv.__key_to_index = function (list, key) {
    
    for (var i = 0; i < list.length; i++) {
        if (list[i].key == key) {
            return i
        }
    }
    return -1;
};

bundle_data_sv.get_select = function () {
    var dataset = [];
    
    // create blank list
    for (var i = 0; i < bundle_data_sv.container.length; i++){
        for (var j = 0; j < bundle_data_sv.container[i].num; j++){
            var key = "root." + bundle_data_sv.container[i].index + "." + bundle_data_sv.container[i].index + "_" + ("000" + j).substr(-4);
            
            dataset.push({"key":key, "item":[], "value":0 });
        }
    }

    // set value to blank list
    for (var i = 0; i < bundle_data_sv.items.length;i++) {
        
        var nodes = bundle_data_sv.items[i].nodes;
        ID = bundle_data_sv.items[i].ID;

        for (var j = 0; j < nodes.length; j++) {
            
            // add bp1
            var idx1 = bundle_data_sv.__key_to_index(dataset, nodes[j].start);
            if (idx1 >= 0) {
                dataset[idx1].item.push(ID);
                dataset[idx1].value = dataset[idx1].value + 1;
            }
            
            // add bp2
            for (var k = 0; k < nodes[j].ends.length; k++) {
                if (nodes[j].start != nodes[j].ends[k]) {
                    var idx2 = bundle_data_sv.__key_to_index(dataset, nodes[j].ends[k]);
                    if (idx2 >= 0) {
                        dataset[idx2].item.push(ID);
                        dataset[idx2].value = dataset[idx2].value + 1;
                    }
                }
            }
        }
    }
    
    // delete duplication
    for (var j = 0; j < dataset.length; j++) {
        var sort = dataset[j].item.filter(function (x, i, self) {
              return self.indexOf(x) === i;
        });
        dataset[j].item = sort;
    }
    
    return dataset;
};
})();
"""
js_contain = """
bundle_data_sv.node_size = {node_size};
bundle_data_sv.item_num = {item_num};

// sorted by index
bundle_data_sv.index_ID = [
{IDs}
];
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
    var nodes = [];
    
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

bundle_data_sv_thumb.__key_to_index = function (list, key) {
    
    for (var i = 0; i < list.length; i++) {
        if (list[i].key == key) {
            return i
        }
    }
    return -1;
};

bundle_data_sv_thumb.get_select = function () {
    var dataset = [];
    
    // create blank list
    for (var i = 0; i < bundle_data_sv_thumb.container.length; i++){
        for (var j = 0; j < bundle_data_sv_thumb.container[i].num; j++){
            var key = "root." + bundle_data_sv_thumb.container[i].index + "." + bundle_data_sv_thumb.container[i].index + "_" + ("000" + j).substr(-4);
            
            dataset.push({"key":key, "item":[], "value":0 });
        }
    }

    // set value to blank list
    for (var i = 0; i < bundle_data_sv_thumb.items.length;i++) {
        
        var nodes = bundle_data_sv_thumb.items[i].nodes;
        ID = bundle_data_sv_thumb.items[i].ID;

        for (var j = 0; j < nodes.length; j++) {
            
            // add bp1
            var idx1 = bundle_data_sv_thumb.__key_to_index(dataset, nodes[j].start);
            if (idx1 >= 0) {
                dataset[idx1].item.push(ID);
                dataset[idx1].value = dataset[idx1].value + 1;
            }
            
            // add bp2
            for (var k = 0; k < nodes[j].ends.length; k++) {
                if (nodes[j].start != nodes[j].ends[k]) {
                    var idx2 = bundle_data_sv_thumb.__key_to_index(dataset, nodes[j].ends[k]);
                    if (idx2 >= 0) {
                        dataset[idx2].item.push(ID);
                        dataset[idx2].value = dataset[idx2].value + 1;
                    }
                }
            }
        }
    }
    
    // delete duplication
    for (var j = 0; j < dataset.length; j++) {
        var sort = dataset[j].item.filter(function (x, i, self) {
              return self.indexOf(x) === i;
        });
        dataset[j].item = sort;
    }
    
    return dataset;
};

})();
"""
js2_contain = """
bundle_data_sv_thumb.node_size = {node_size};
bundle_data_sv_thumb.item_num = {item_num};

// sorted by index
bundle_data_sv_thumb.index_ID = [
{IDs}
];
bundle_data_sv_thumb.container = [
{contain}
];
"""

dataset_template = '{{"ID":"{ID}", "nodes":[{nodes}]}}'
node_template = '{{"start":"{name1}", "ends":{name2}, "value":{value}}}'
node2_template = '{{"start":"{name1}", "ends":{name2}}}'
name_template = 'root.{Chr:0>2}.{Chr:0>2}_{pos:0>4}'
contain_template = '{{"index":"{key:0>2}", "num":{num}}}'

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
    
def data_toidx(inpt, genome_size):
    txt = str(inpt).lower()
    
    if len(txt) > 3:
        if txt[0:3] == "chr":
            txt = txt[3:len(txt)]

    for i in range(len(genome_size)):
        if txt == genome_size[i][0]:
            return i

    return -1
        
def load_csv(input_file):
    from paplot import data_frame
        
    # data read
    try:
        df = data_frame.load_file(input_file, sept = ",", header = 1)

    except Exception as e:
        print ("failure open data %s, %s" % (input_file, e.message))
        return None
    
    return df

def create_id_list(df):
    li = list(set(df.column_t("ID")))
    li.sort()
    return li
    
def convert_tojs(input_file, output_file, config):

    df = load_csv(input_file)
    if df == None:
        return False
        
    if len(df.data) == 0:
        print ("skip blank file %s" % input_file)
        return False
        
    genome_size = load_genome_size(config)
    if len(genome_size) == 0:
        return False
    
    node_size = calc_node_size(genome_size, 500)
    
    id_list = create_id_list(df)
    
    dataset = ""
    Ids = ""
    for iid in id_list:
        if len(dataset) > 0:
            dataset += ",\n"
            Ids += ",\n"
            
        dataset += dataset_template.format(ID = iid, \
            nodes = set_nodes(df, iid, genome_size, node_size, blank = False, tooltip = True))
        Ids += "'" + iid + "'"

    contain = ""
    for i in range(len(genome_size)):
        if len(contain) > 0:
            contain += ",\n"
            
        item_num = int(genome_size[i][1]/node_size) + 1
        contain += contain_template.format(key = i, num = item_num)

    f = open(output_file, "w")
    f.write(js_top \
        + js_contain.format(node_size = node_size, contain = contain, item_num = len(id_list), IDs = Ids) \
        + js_dataset.format(dataset = dataset) \
        + js_bottom)
    f.close()

    return True

def convert_tojs_thumb(input_file, output_file, config):

    df = load_csv(input_file)
    if df == None:
        return False
    
    if len(df.data) == 0:
        print ("skip blank file %s" % input_file)
        return False
        
    genome_size = load_genome_size(config)
    if len(genome_size) == 0:
        return False
    
    node_size = calc_node_size(genome_size, 60)
    
    id_list = create_id_list(df)
    
    dataset = ""
    Ids = ""
    for iid in id_list:
        if len(dataset) > 0:
            dataset += ",\n"
            Ids += ",\n"
        
        dataset += dataset_template.format(ID = iid, \
            nodes = set_nodes(df, iid, genome_size, node_size, blank = False, tooltip = False))
        Ids += "'" + iid + "'"

    contain = ""
    for i in range(len(genome_size)):
        if len(contain) > 0:
            contain += ",\n"
            
        item_num = int(genome_size[i][1]/node_size) + 1
        contain += contain_template.format(key = i, num = item_num)
        
    f = open(output_file, "w")
    f.write(js2_top \
        + js2_contain.format(node_size = node_size, contain = contain, item_num = len(id_list), IDs = Ids) \
        + js2_dataset.format(dataset = dataset) \
        + js2_bottom)
    f.close()

    return True

def pos_name(chr1, start, chr2, end, genome_size, node_size):

    start = int(start)
    end = int(end)
    name1 = name_template.format(Chr=chr1, pos = int(start/node_size))
    name2 = name_template.format(Chr=chr2, pos = int(end/node_size))
    
    if name1 != name2:
        return [name1, name2]
    
    if int(genome_size[chr2][1]/node_size) == int(end/node_size):
        name2 = name_template.format(Chr=chr2, pos = int(end/node_size) - 1)
    else:
        name2 = name_template.format(Chr=chr2, pos = int(end/node_size) + 1)
        
    return [name1, name2]

def set_nodes(df, iid, genome_size, node_size, blank = True, tooltip = True):
    
    di = blank_list(genome_size, node_size)
    
    ID = df.name_to_index("ID")
    TYPE = df.name_to_index("type")
    CHR1 = df.name_to_index("chr1")
    CHR2 = df.name_to_index("chr2")
    BREAK1 = df.name_to_index("break1")
    BREAK2 = df.name_to_index("break2")
    DIR1 = df.name_to_index("direction1")
    DIR2 = df.name_to_index("direction2")
    NAME1 = df.name_to_index("gene_name1")
    NAME2 = df.name_to_index("gene_name2")
    
    for row in df.data:
        if row[ID] != iid:
            continue
        #filter
        if (row[TYPE].lower() == "inversion"):
            if (row[CHR1] == row[CHR2]):
                if (row[BREAK2] - row[BREAK1]) <= 1000:
                    continue
        
        chr1 = data_toidx(row[CHR1], genome_size)
        chr2 = data_toidx(row[CHR2], genome_size)

        if chr1 == -1 or chr2 == -1:
            continue
        
        [name1, name2] = pos_name(chr1, row[BREAK1], chr2, row[BREAK2], genome_size, node_size)

        if (name1 in di) == False:
            print ("this link [%s:%s] is over range(%d), skip." % (row[CHR1], row[BREAK1], genome_size[chr1][1]))
            continue
        if (name2 in di) == False:
            print ("this link [%s:%s] is over range(%d), skip." % (row[CHR2], row[BREAK2], genome_size[chr2][1]))
            continue
        
        di[name1][0].append(name2)
        
        if tooltip == True:
            import locale        
            
            locale.setlocale(locale.LC_ALL, "")
            s = locale.format("%d", row[BREAK1], grouping=True)
            e = locale.format("%d", row[BREAK2], grouping=True)
        
            value = "chr%s. %s, %s, %s; chr%s. %s, %s, %s" % (
                row[CHR1], s, row[DIR1], str(row[NAME1]).replace("\[", "").replace("\]", ""),
                row[CHR2], e, row[DIR2], str(row[NAME2]).replace("\[", "").replace("\]", ""))
                
            di[name1][1].append(value)
        
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
    
def blank_list(genome_size, node_size):
    
    di = {}
    for i in range(len(genome_size)):
        
        item_num = int(genome_size[i][1]/node_size) + 1
        
        for j in range(item_num):
            di.update({name_template.format(Chr = i, pos = "%04d" % j):[[],[]]})
    
    return di

def create_html(input_file, output_html_dir, org_html, project_name, config):
    from paplot import tools
    import os
    
    df = load_csv(input_file)
    
    id_list = create_id_list(df)
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

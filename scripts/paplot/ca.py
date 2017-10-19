# -*- coding: utf-8 -*-
"""
Created on Wed Feb 03 12:31:47 2016

@author: okada

$Id: ca.py 205 2017-08-08 06:25:59Z aokada $
"""

########### js template
js_header = """(function() {
ca_data = {};
"""
js_footer = """
})();
Object.freeze(ca_data);
"""

js_dataset = """
ca_data.node_size_detail = {node_size_detail};
ca_data.node_size_thumb = {node_size_thumb};
ca_data.node_size_select = {node_size_select};
ca_data.genome_size = [
{genome_size}
];

ca_data.index_ID = [{IDs}];
ca_data.group = [{group}];
ca_data.tooltip_format = {{ bundle:{tooltip}, }};
ca_data.link_header = [{link_header}];
"""
genome_size_template = '{{"chr":"{Chr:0>2}", "size":{size}, "color":"{color}", "label":"{label}",}}'
group_template = '{{"name":"{name}", "label":"{label}", "color":"{color}" }}'

js_links_1 = """// 0:ID, 1:chr1, 2:break1, 3:chr2, 4:break2, 5:is_outer, 6:group_id, 7:tooltip_data
ca_data.links = ["""
js_links_2 = "];"
links_template = '["{ID}","{Chr1:0>2}",{pos1},"{Chr2:0>2}",{pos2},{inner_flg},{group_id},[{tooltip}]],'

js_selection = """
ca_data.select_value = [{value}];
ca_data.select_key = [{key}];
ca_data.select_item = [{item}];
"""

########### html template

li_template = '<li class="thumb" id="thumb{id}_li"><strong>{title}<br></strong><div id="thumb{id}" onclick="show_float(event,\'{id}\',\'{title}\')"></div></li>\n'
call_template = 'draw_bandle_thumb("{id}", "{title}");\n'
detail_template = """<div class="float_frame" id="float{id}"><table><tr><td class="float_header" id="float{id}_t"><strong>{title}</strong></td><td><input type="button" value="X" onclick="hide_float('#float{id}')" margin="0"></td></tr><tr><td colspan="2" class="float_svg" id="map{id}"></td></tr></table><div class="float_handle" id="float{id}_h" onmousedown="mouse_down(event, '#float{id}')" onmousemove="mouse_move(event, '#float{id}')" onmouseup="mouse_up(event, '#float{id}')" onmouseout="mouse_out('#float{id}')"></div></div>
"""
########### functions

def load_genome_size(config):
    import os
    import paplot.subcode.tools as tools
    
    default_path = os.path.dirname(os.path.abspath(__file__)) + "/templates/genome_size_hg19.csv"
    path = tools.config_getpath(config, "genome", "path", default_path)
    
    settings = tools.config_getstr(config, "ca", "use_chrs").replace(" ", "").split(",")
    use_chrs = [];
    colors = [];
    labels = [];
    
    for i in range(len(settings)):
        items = settings[i].split(":")
        use_chrs.append(items[0].lower())
        labels.append("")
        colors.append("#BBBBBB")
        
        for j in range(len(items)):
            if j == 0: 
                if items[j][0:3] == "chr":
                    use_chrs[i] = items[j][3:]
                    
            elif j == 1:
                labels[i] = items[j]
            elif j == 2:
                colors[i] = items[j]

    if len(use_chrs) < 1:
        return []
        
    f = open(path)
    read = f.read()
    f.close()
    
    formatt = read.replace("\r", "\n").replace(" ", "")
    
    genome_size = []
    _max = 0
    for row in formatt.split("\n"):
        sept = ","
        if row.find(",") < 0:
            sept = "\t"
        items = row.split(sept)

        if len(items) < 2:
            continue
        
        if items[1].isdigit() == False:
            continue

        label = items[0].lower()
        if label[0:3] == "chr":
            label = label[3:len(label)]
            
        if (label in use_chrs) == False:
            continue
        
        pos = use_chrs.index(label)
        
        if _max < int(items[1]):
            _max = int(items[1])
        
        if labels[pos] == "":
            labels[pos] = items[0]
            
        genome_size.append([label, int(items[1]), colors[pos], labels[pos]])

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
            
    size = int(_sum/(total - len(genome_size)))
    if _min <= size:
        size = _min - 1

    return size

def insite_genome(genome_size, chrom, pos):
    # return [i,   0] : insite
    # return [i,  >0] : range
    # return [-1, -1] : chrom is none

    for i in range(len(genome_size)):
        label = chrom.lower()
        if label[0:3] == "chr":
            label = label[3:len(label)]
        if genome_size[i][0] == label:
            if genome_size[i][1] >= pos:
                return [i, 0]
            else:
                return [i, genome_size[i][1]]
    
    return [-1, -1]

def output_html(output_di, positions, config):
    data = convert_tojs(output_di["dir"] + "/" + output_di["data"], output_di["dir"] + "/" + output_di["js"], positions, config)
    if data != None:
        create_html(data, output_di, config)
        return True
    
    return False

def convert_tojs(input_file, output_file, positions, config):

    import paplot.subcode.data_frame as data_frame
    import paplot.subcode.merge as merge
    import paplot.subcode.tools as tools
    import paplot.convert as convert
    import os
    import math
    
    genome_size = load_genome_size(config)

    if len(genome_size) == 0:
        return None

    genome = ""
    for i in range(len(genome_size)):
        if len(genome) > 0:
            genome += ",\n"
        genome += genome_size_template.format(Chr=i, size = genome_size[i][1], color = genome_size[i][2], label = genome_size[i][3])

    cols_di = merge.position_to_dict(positions)

    # data read
    try:
        df = data_frame.load_file(input_file, header = 1, \
            sept = tools.config_getstr(config, "result_format_ca", "sept"), \
            comment = tools.config_getstr(config, "result_format_ca", "comment") \
            )
    except Exception as e:
        print ("failure open data %s, %s" % (input_file, e.message))
        return None

    if len(df.data) == 0:
        print ("no data %s" % input_file)
        return None

    # group list
    if "group" in cols_di:
        for f in range(len(df.data)):
            group_pos = df.name_to_index(cols_di["group"])
            group = df.data[f][group_pos]
            df.data[f][group_pos] = group.replace(" ", "_")
            if group == "":
                df.data[f][group_pos] = "_blank_"
    
        [groups, colors_n] = convert.group_list(df.column(cols_di["group"]), "ca", "group", config)
        labels = groups
        
    else:
        groups = ["outer", "inner"]
        labels = ["Inter-chromosome", "Intra-chromosome"]
        colors_n = ["#9E4A98", "#51BF69"]
    
    conbined = []
    for i in range(len(groups)):
        conbined.append(group_template.format(name = groups[i], label = labels[i], color = colors_n[i]))
        
    group_text = ",".join(conbined)
    
    # ID list
    id_list = []
    for row in df.data:
        iid = row[df.name_to_index(cols_di["id"])]
        if iid != "": id_list.append(iid)
    id_list = list(set(id_list))
    id_list.sort()

    option_keys = tools.dict_keys(cols_di)
    option_keys.remove("id")
    option_keys.remove("chr1")
    option_keys.remove("break1")
    option_keys.remove("chr2")
    option_keys.remove("break2")
    if "group" in option_keys:
        option_keys.remove("group")
    
    # node_size
    node_size_select = tools.config_getint(config, "ca", "selector_split_size", 5000000)
      
    f = open(output_file, "w")

    f.write(js_header \
        + js_dataset.format(node_size_detail = calc_node_size(genome_size, 500), \
            node_size_thumb = calc_node_size(genome_size, 250), \
            node_size_select = node_size_select,\
            genome_size = genome, \
            IDs = convert.list_to_text(id_list), \
            group = group_text, \
            tooltip = convert.pyformat_to_jstooltip_text(cols_di, config, "ca", "result_format_ca", "tooltip_format"), \
            link_header = convert.list_to_text(option_keys), \
            ))
            
    # write links
    data_links = []
    
    f.write(js_links_1)
    
    for row in df.data:
        iid = row[df.name_to_index(cols_di["id"])]
        if iid == "": continue

        chr1 = str(row[df.name_to_index(cols_di["chr1"])])
        pos1 = row[df.name_to_index(cols_di["break1"])]
        chr2 = str(row[df.name_to_index(cols_di["chr2"])])
        pos2 = row[df.name_to_index(cols_di["break2"])]        

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
        
        inner_flg = "false"
        if (chr1 == chr2):
            inner_flg = "true"
        
        tooltip_items = []
        for k in range(len(option_keys)):
            key = option_keys[k]
            if cols_di[key] == "": continue
            tooltip_items.append(row[df.name_to_index(cols_di[key])])
        
        group_id = -1
        if "group" in cols_di:
            group_id = convert.value_to_index(groups, row[df.name_to_index(cols_di["group"])], -1)
        else:
            if inner_flg == "false":
                group_id = 0
            else:
                group_id = 1
        
        data_links.append([iid, index1, pos1, index2, pos2, group_id])
        
        f.write(links_template.format(ID = iid, \
            Chr1=index1, pos1=pos1, Chr2=index2, pos2=pos2, \
            inner_flg = inner_flg, \
            group_id = group_id , \
            tooltip = "[" + convert.list_to_text(tooltip_items) + "],"))

    f.write(js_links_2)

    # integral bar item
    link = []
    for g in range(len(groups)):
        link.append({})
        
    for l in data_links:
        
        bp1 = "root.{Chr:0>2}.{Chr:0>2}_{Pos:0>3}".format(Chr = l[1], Pos = int(math.floor(l[2]/node_size_select)))
        bp2 = "root.{Chr:0>2}.{Chr:0>2}_{Pos:0>3}".format(Chr = l[3], Pos = int(math.floor(l[4]/node_size_select)))
        
        group = l[5]
        #print group
        # add bp1
        if not bp1 in link[group]:
            link[group][bp1] = []
        link[group][bp1].append(l[0])
        
        # add bp2
        if bp1 != bp2:
            if not bp2 in link[group]:
                link[group][bp2] = []
            link[group][bp2].append(l[0])
            
    select_item_text = ""
    select_value_text = ""
    select_key_text = ""
    
    for g in range(len(groups)):
        items = []
        values = []
        keys = []
        
        for i in link[g]:
            
            values.append(len(link[g][i]))
            
            # split key to chr and pos
            parts = i.split(".")[2].split("_")
            keys.append([int(parts[0]), int(parts[1])])
            
            # delete duplication
            sort = sorted(list(set(link[g][i])))
            
            temp = []
            for t in sort:
                temp.append(id_list.index(t))
            items.append(temp)

        select_value_text += "[%s]," % (",".join(map(str,values)).replace(" ", ""))
        select_key_text += "[%s]," % (",".join(map(str,keys)).replace(" ", ""))
        select_item_text += "[%s]," % (",".join(map(str,items)).replace(" ", ""))
        
    f.write(js_selection.format(
        value = select_value_text,
        key = select_key_text,
        item = select_item_text
    ))
    
    f_template = open(os.path.dirname(os.path.abspath(__file__)) + "/templates/data_ca.js")
    js_function = f_template.read()
    f_template.close()
    f.write(js_function)
    f.write(js_footer)

    f.close()
    
    return {"id_list":id_list, "group_list":groups, "color":colors_n}

def create_html(dataset, output_di, config):
    import os
    import paplot.prep as prep
    import paplot.subcode.tools as tools
    
    div_txt = ""
    call_txt = ""
    detail_txt = ""
    for i in range(len(dataset["id_list"])):
        div_txt += li_template.format(id = str(i), title = dataset["id_list"][i])
        detail_txt += detail_template.format(id = str(i), title = dataset["id_list"][i])
        call_txt += call_template.format(id = str(i), title = dataset["id_list"][i])
#        if i >= 50:
#            if i == 50:
#                call_txt += call_later_header
#            call_txt += call_later_template.format(id = str(i), title = dataset["id_list"][i])
#        else:
#            call_txt += call_template.format(id = str(i), title = dataset["id_list"][i])
        
    f_template = open(os.path.dirname(os.path.abspath(__file__)) + "/templates/graph_ca.html")
    html_template = f_template.read()
    f_template.close()
    
    f_html = open(output_di["dir"] + "/" + output_di["html"], "w")
    f_html.write(
        html_template.format(project = output_di["project"], 
            title = output_di["title"], 
            data_js = output_di["js"],
            version = prep.version_text(),
            date = tools.now_string(),
            div_list = div_txt,
            call_list = call_txt,
            details = detail_txt,
            style = "../style/%s" % os.path.basename(tools.config_getpath(config, "style", "path", "default.js")),
        ))
    f_html.close()

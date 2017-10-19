# -*- coding: utf-8 -*-
"""
Created on Wed Mar 16 15:40:29 2016

@author: okada

$Id: mutation.py 205 2017-08-08 06:25:59Z aokada $
"""

########### js template
js_header = """(function() {
mut_data = {};
"""
js_footer = """
})();
Object.freeze(mut_data);
"""

js_dataset = """
mut_data.Ids = [{Ids}];
mut_data.genes = [{genes}];
mut_data.funcs = [{funcs}];
mut_data.func_colors_n = [{func_colors_n}];
mut_data.mutation_header = [{mutation_header}];
mut_data.tooltip_format = {{
checker_title:{checker_title},checker_partial:{checker_partial},gene_title:{gene_title},gene_partial:{gene_partial},id_title:{id_title},id_partial:{id_partial},
}};
"""

js_mutations_1 = "mut_data.mutations = ["
js_mutations_2 = """];
mut_data.mutations_sum = {mutations_sum};
"""
mu_mutations_template = '[{ID},{func},{gene},{num},[{tooltip}]],'

js_subdata_1 = "mut_data.subdata = ["
js_subdata_2 = "];"
subdata_template = '{{name:"{name}",title:"{title}", type:"{type}",item:[{item}],label:[{label}],colors_n:[{colors_n}],data:[{data}]}},\n'
subdata_data_template = '[{id},{item}],'

########### html template
subplot_template = """
<!-- sub bar -->
<tr>
<td><div id="div_sub{i}_t" class="subplot_title"><b>{title}</b>
      <section>
        <input type="radio" name="optSub{i}" value="0" id="xSub{i}_0" onclick="sort_sub({i}, 0)" checked /><label for="xSub{i}_0" class="radio">None</label>
        <input type="radio" name="optSub{i}" value="1" id="xSub{i}_1" onclick="sort_sub({i}, 1)" />        <label for="xSub{i}_1" class="radio">ASC </label>
        <input type="radio" name="optSub{i}" value="2" id="xSub{i}_2" onclick="sort_sub({i}, 2)" />        <label for="xSub{i}_2" class="radio">DESC</label>
      </section>
</div></td>
<td><div id="div_sub{i}_p"></div></td>
<td><div style="overflow: auto;" id="div_sub{i}_l_svg"></div></td>
</tr>
"""
js_set_sub_add = """
    subs.push(add_subdiv("div_sub{i}", "sub{i}", {type}));"""
js_set_sub_select = """
    subs[{i}].bar_selected = function(key, on) {{
        sub_selected(key, on);
    }}"""
    
########### functions
def genes_list(colmun, colmun_f, colmun_id, funcs, id_list, config):
    
    import paplot.subcode.tools as tools
    import paplot.convert as convert
    
    sept = tools.config_getstr(config, "result_format_mutation", "sept_gene")
    
    genes_di = {}
    ids_di = {}
    
    for i in range(len(colmun)):
        if (colmun_f[i] in funcs) == False: continue
        
        row = colmun[i].replace('"', '')
        splt = []
        if sept == "": splt.append(row)
        else: splt = row.split(sept)
        
        for gene in splt:
            if gene == "": continue
            if gene in ids_di.keys():
                if (colmun_id[i] in ids_di[gene]) == True: continue
                else: ids_di[gene].append(colmun_id[i])
            else:
                ids_di.update({gene: [colmun_id[i]]})
            
            value = 1            
            if gene in genes_di.keys():
                value = genes_di[gene] + 1
            genes_di.update({gene: value})
            
    # gene list
    use_gene_rate = config.getfloat("mutation", "use_gene_rate")
    limited_list = convert.text_to_list(tools.config_getstr(config, "mutation", "limited_gene"), ",")
    nouse_list = convert.text_to_list(tools.config_getstr(config, "mutation", "nouse_gene"), ",")
    
    genes = []
    for key in genes_di:
        if len(limited_list) > 0 and convert.fnmatch_list(key, limited_list) == False:
            continue
        if convert.fnmatch_list(key, nouse_list):
            continue
        if genes_di[key] < float(len(id_list))*use_gene_rate:
            continue

        genes.append(key)

    genes.sort()
    return genes

def output_html(output_di, positions, config):
    dataset = convert_tojs(output_di["dir"] + "/" + output_di["data"], output_di["dir"] + "/" + output_di["js"], positions, config)
    if dataset == None:
        return False
        
    create_html(dataset, output_di, config)
    return True

def convert_tojs(input_file, output_file, positions, config):
    import os
    import paplot.subcode.data_frame as data_frame
    import paplot.subcode.merge as merge
    import paplot.subcode.tools as tools
    import paplot.convert as convert
    
    cols_di = merge.position_to_dict(positions)

    # data read
    try:
        df = data_frame.load_file(input_file, header = 1, \
            sept = tools.config_getstr(config, "result_format_mutation", "sept"), \
            comment = tools.config_getstr(config, "result_format_mutation", "comment") \
            )
    except Exception as e:
        print ("failure open data %s, %s" % (input_file, e.message))
        return None

    if len(df.data) == 0:
        print ("no data %s" % input_file)
        return None

    # func replace 
    for f in range(len(df.data)):
        func_pos = df.name_to_index(cols_di["group"])
        
        if df.data[f][func_pos] == "":
            df.data[f][func_pos] = "_blank_"
            
    [funcs, colors_n] = convert.group_list(df.column(cols_di["group"]), "mutation", "group", config)

    # ID list
    id_list = []
    for row in df.data:
        iid = row[df.name_to_index(cols_di["id"])]
        if iid != "": id_list.append(iid)
    id_list = list(set(id_list))
    id_list.sort()
    
    # gene list
    genes = genes_list(df.column(cols_di["gene"]), \
                        df.column(cols_di["group"]), \
                        df.column(cols_di["id"]), \
                        funcs, id_list, config)    

    option_keys = tools.dict_keys(cols_di)
    option_keys.remove("id")
    option_keys.remove("group")
    option_keys.remove("gene")
            
    # mutation list
    f = open(output_file, "w")
    f.write(js_header)
    f.write(js_mutations_1)

    mutations = {}
    tooltips = {}
    for row in df.data:
        iid = row[df.name_to_index(cols_di["id"])]
        if iid == "": continue
            
        if (iid in mutations) == False:
            mutations[iid] = {}
            tooltips[iid] = {}
                
        func_split = convert.text_to_list(row[df.name_to_index(cols_di["group"])], \
            tools.config_getstr(config, "result_format_mutation", "sept_group"))
        
        tooltip_items = []
        for k in range(len(option_keys)):
            key = option_keys[k]
            if cols_di[key] == "": continue
            tooltip_items.append(row[df.name_to_index(cols_di[key])])
            
        for func in func_split:
            if (func in mutations[iid]) == False:
                mutations[iid][func] = {}
                tooltips[iid][func] = {}

            gene_split = convert.text_to_list(row[df.name_to_index(cols_di["gene"])], \
                tools.config_getstr(config, "result_format_mutation", "sept_gene"))
                
            for gene in gene_split:
                if (gene in mutations[iid][func]) == False:
                    mutations[iid][func][gene] = 1
                    tooltips[iid][func][gene] = []
                else:
                    mutations[iid][func][gene] += 1

                tooltips[iid][func][gene].append(tooltip_items)

    mutations_sum = 0
    for iid in tools.dict_keys(mutations):
        for func in tools.dict_keys(mutations[iid]):
            for gene in tools.dict_keys(mutations[iid][func]):
                idx_i = convert.value_to_index(id_list, iid, -1)
                idx_f = convert.value_to_index(funcs, func, -1)
                idx_g = convert.value_to_index(genes, gene, -1)

                if idx_i >= 0 and idx_f >= 0 and idx_g >= 0:
                    
                    tooltip_items = ""
                    for tips in tooltips[iid][func][gene]: 
                        tooltip_items += "[" + convert.list_to_text(tips) + "],"

                    f.write(mu_mutations_template.format(ID = idx_i, \
                        func = idx_f , \
                        gene = idx_g, \
                        num = mutations[iid][func][gene],
                        tooltip = tooltip_items))
                        
                    mutations_sum += mutations[iid][func][gene]
                    
    f.write(js_mutations_2.format(mutations_sum = mutations_sum))
    
    # write id, func, gene ... list
    f.write(js_dataset.format(
        Ids = convert.list_to_text(id_list), \
        genes = convert.list_to_text(convert.list_prohibition(genes)), \
        funcs = convert.list_to_text(convert.list_prohibition(funcs)), \
        func_colors_n = convert.list_to_text(colors_n), \
        mutation_header = convert.list_to_text(option_keys), \
        checker_title = convert.pyformat_to_jstooltip_text(cols_di, config, "mutation", "result_format_mutation", "tooltip_format_checker_title"), \
        checker_partial = convert.pyformat_to_jstooltip_text(cols_di, config, "mutation", "result_format_mutation", "tooltip_format_checker_partial"), \
        gene_title = convert.pyformat_to_jstooltip_text(cols_di, config, "mutation", "result_format_mutation", "tooltip_format_gene_title"), \
        gene_partial = convert.pyformat_to_jstooltip_text(cols_di, config, "mutation", "result_format_mutation", "tooltip_format_gene_partial"), \
        id_title = convert.pyformat_to_jstooltip_text(cols_di, config, "mutation", "result_format_mutation", "tooltip_format_id_title"), \
        id_partial = convert.pyformat_to_jstooltip_text(cols_di, config, "mutation", "result_format_mutation", "tooltip_format_id_partial"), \
    ))
    
    dataset = {}
    
    ##### subdata #####
    f.write(js_subdata_1)
    subdata = []
    counter = 0
    for sec in config.sections():
        if sec.startswith("mutation_subplot_type1_"):
            ret_val = load_subdata(id_list, sec, config)
            if ret_val == None: continue
            [data_text, item, colors_n, label, title] = ret_val
            
            name = "sub%d" % (counter)
            pos = 1
            counter += 1
            
        elif sec.startswith("mutation_subplot_type2_"):
            ret_val = load_subdata(id_list, sec, config)
            if ret_val == None: continue
            [data_text, item, colors_n, label, title] = ret_val
            
            name = "sub%d" % (counter)
            pos = 2
            counter += 1
            
        else: continue
    
        f.write(subdata_template.format(name = name, \
                title = title, \
                type = tools.config_getstr(config, sec, "mode"), \
                item = convert.list_to_text(item), \
                label = convert.list_to_text(label), \
                colors_n = convert.list_to_text(colors_n), \
                data = data_text ))

        subdata.append({"pos":pos, "label":label, "color":colors_n, "title": title})
         
    f.write(js_subdata_2)
    
    ##### functions #####
    f_template = open(os.path.dirname(os.path.abspath(__file__)) + "/templates/data_mutation.js")
    js_function = f_template.read()
    f_template.close()
    f.write(js_function)
    f.write(js_footer)

    f.close()

    dataset["subdata"] = subdata
    return dataset 

def load_subdata(ids, sec, config):
    import os
    import paplot.subcode.tools as tools
    import paplot.convert as convert
    import paplot.color as color

    input_file = tools.config_getpath(config, sec, "path", default = "")
    if os.path.exists(input_file) == False:
        print ("[ERROR] file is not exist. %s" % input_file)
        return None

    sept = tools.config_getstr(config, sec, "sept")
    mode = tools.config_getstr(config, sec, "mode")
    comment = tools.config_getstr(config, sec, "comment")
    title = tools.config_getstr(config, sec, "title")
    
    label = []
    item = []
    colors_n_di = {}
    colors_h_di = {}
    for name_set in tools.config_getstr(config, sec, "name_set").split(","):
        name_set_split = convert.text_to_list(name_set, ":")
        for i in range(len(name_set_split)):
            text = name_set_split[i]
            if i == 0:
                item.append(text)
                if len(name_set_split) == 1:
                    label.append(text)
            elif i == 1:
                label.append(text)
            elif i == 2:
                colors_n_di[name_set_split[0]] = color.name_to_value(text)
            elif i == 3:
                colors_h_di[name_set_split[0]] = color.name_to_value(text)
    
    # fill in undefined items
    colors_n_di = color.create_color_dict(item, colors_n_di, color.osaka_subway_colors) 
    colors_h_di2 = {}
    for key in colors_n_di:
        if key in colors_h_di: continue
        colors_h_di2[key] = color.saturation_down(colors_n_di[key])
    
    # dict to value
    colors_n = []
    for key in item:
        colors_n.append(colors_n_di[key])
    
    if mode == "range":
        item.remove(item[0])
    
    header = []
    if tools.config_getboolean(config, sec, "header") == True:
        pos_value = -1
        pos_id = -1
    else:
        pos_value = tools.config_getint(config, sec, "col_value")
        pos_id = tools.config_getint(config, sec, "col_ID")
        header = ["",""]
    
    # copy id_list for find check
    unlookup = []
    for iid in ids:
        unlookup.append(iid)
        
    # read
    data_text = ""
    values = []
    for line in open(input_file):
        line = line.strip()
        if len(line.replace(sept, "")) == 0:
            continue
        
        if comment != "" and line.find(comment) == 0:
            continue
        
        if len(header) == 0:
            header = convert.text_to_list(line,sept)
            try:
                colname = tools.config_getstr(config, sec, "col_value")
                pos_value = header.index(colname)
                colname = tools.config_getstr(config, sec, "col_ID")
                pos_id = header.index(colname)
            except Exception as e:
                print(e.message)
                return None
                
            continue
        
        cols = convert.text_to_list(line,sept)
        if (cols[pos_id] in ids) == False: continue
        else: unlookup.remove(cols[pos_id])

        id_pos = ids.index(cols[pos_id])
        
        if mode == "fix":
            if cols[pos_value] in item:
                data_text += subdata_data_template.format(id = id_pos, item = item.index(cols[pos_value]))
            else:
                print("[" + sec + "] name_set: data is undefined." + cols[pos_value] + "\n")
                continue
        elif mode == "range" or mode == "gradient":
            try:
                values.append(float(cols[pos_value]))
            except Exception as e:
                print(colname + ": data type is invalid.\n" + e.message)
                continue
            
            data_text += subdata_data_template.format(id = id_pos, item = cols[pos_value])

    if len(unlookup) > 0:
        print("[WARNING] can't find IDs subplot data.")
        print(unlookup)
        
    if mode == "gradient" and len(values) > 0:
        item[0] = min(values)
        item[1] = max(values)
        
    return [data_text, item, colors_n, label, title] 

def create_html(dataset, output_di, config):
    import os
    import paplot.subcode.tools as tools
    import paplot.prep as prep
    
    sub1_text = ""
    sub2_text = ""
    set_sub_add_text = ""
    set_sub_select_text = ""
    for i in range(len(dataset["subdata"])):
        
        sub_text = subplot_template.format(i = i, title = dataset["subdata"][i]["title"])
        if dataset["subdata"][i]["pos"] == 1:
            sub1_text += sub_text
            set_sub_add_text += js_set_sub_add.format(i = i, type = 1)
        else:
            sub2_text += sub_text
            set_sub_add_text += js_set_sub_add.format(i = i, type = 2)
            
        set_sub_select_text += js_set_sub_select.format(i = i)

    f_template = open(os.path.dirname(os.path.abspath(__file__)) + "/templates/graph_mutation.html")
    html_template = f_template.read()
    f_template.close()
    
    f_html = open(output_di["dir"] + "/" + output_di["html"], "w")
    f_html.write(
        html_template.format(project = output_di["project"], 
            title = output_di["title"], 
            data_js = output_di["js"],
            version = prep.version_text(),
            date = tools.now_string(),
            sub1 = sub1_text,
            sub2 = sub2_text,
            set_sub_add = set_sub_add_text,
            set_sub_select = set_sub_select_text,
            style = "../style/%s" % os.path.basename(tools.config_getpath(config, "style", "path", "default.js")),
        ))
    f_html.close()


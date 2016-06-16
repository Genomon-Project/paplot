# -*- coding: utf-8 -*-
"""
Created on Wed Mar 16 15:40:29 2016

@author: okada

$Id: mut.py 114 2016-06-14 02:08:37Z aokada $
"""

########### js template
js_header = """(function() {
mut_data = {};
"""
js_dataset = """
mut_data.Ids = [{Ids}];
mut_data.genes = [{genes}];
mut_data.funcs = [{funcs}];
mut_data.func_colors_n = [{func_colors_n}];
mut_data.func_colors_h = [{func_colors_h}];
mut_data.mutation_header = [{mutation_header}];
mut_data.tooltip_format = {{
checker_title:{checker_title},checker_partial:{checker_partial},gene_title:{gene_title},gene_partial:{gene_partial},id_title:{id_title},id_partial:{id_partial},
}};
"""
tooltip_templete = "{{format:[{formats}], keys: '{keys}'}}"
tooltip_detail_templete = "{{label:'{label}',type:'{type}',keys:[{keys}],ext:'{ext}'}},"

js_mutations_1 = "mut_data.mutations = ["
js_mutations_2 = """];
mut_data.mutations_sum = {mutations_sum};
"""
mu_mutations_template = '[{ID},{func},{gene},{num},[{tooltip}]],'



js_subdata_1 = "mut_data.subdata = ["
js_subdata_2 = "];"
subdata_template = '{{name:"{name}",title:"{title}", type:"{type}",item:[{item}],colors_n:[{colors_n}],colors_h:[{colors_h}],data:[{data}]}},\n'
subdata_data_template = '[{id},{item}],'

js_function = """
function calc_option(format, pos, sum, value) {
    
    var id = pos[0];
    var func = pos[1];
    var gene = pos[2];
    
    var obj = {id: mut_data.Ids[id], func: mut_data.funcs[func], gene: mut_data.genes[gene],
        '#number_gene': mut_data.genes.length, 
        '#number_id': mut_data.Ids.length, 
        '#number_mutaion_all': mut_data.mutations.length, 
        '#sum_mutaion_all': mut_data.mutations_sum,
        '#sum_item_value': sum,
        '#item_value': value,
    };

    return obj;
}
function tooltip_title(format, pos, sum) {
    
    var obj = calc_option(format, pos, sum, 0);
    
    var tooltip = [];
    for (var t in format.format) {
        tooltip.push(text_format(format.format[t], obj));
    }
    return tooltip;
};

function tooltip_partial(format, pos, mutation, loop, value) {
    
    var obj = calc_option(format, pos, 0, value);
    
    var tooltip = [];
    for (var m in mutation) {
        for (var p = 0; p < mutation[m][4].length; p++) {
            for (var p2 = 0; p2 < mutation[m][4][p].length; p2++) {
                obj[mut_data.mutation_header[p2]] = mutation[m][4][p][p2];
            }
            for (var t in format.format) {
                var text = text_format(format.format[t], obj);
                if (tooltip.indexOf(text) < 0){
                    tooltip.push(text);
                    if (loop == false) { break;}
                }
            }
            if (loop == false) { break;}
        }
        if (loop == false) { break;}
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
            try{  replaced = eval(replaced);
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

mut_data.get_dataset_id = function () {
    
    var data = [];
    var keys = [];
    var tooltips = {};
    var sum_par_id = [];
    for (var i=0; i < mut_data.Ids.length; i++) {
        tooltips[mut_data.Ids[i]] = [];
        sum_par_id[i] = 0;
    }
    
    // par func
    for (var f=0; f < mut_data.funcs.length; f++) {

        data[f] = [];
        keys[f] = [];

        // par ID
        for (var i=0; i < mut_data.Ids.length; i++) {
            
            var data_filt = mut_data.mutations.filter(function(item, index){
                if ((item[0] == i) && (item[1] == f)) return true;
            });
            
            var sum = 0;
            for (var d in data_filt) sum += data_filt[d][3];
            if (sum > 0) {
                data[f].push(sum);
                keys[f].push(mut_data.Ids[i]);
                tooltips[mut_data.Ids[i]].push(tooltip_partial(mut_data.tooltip_format.id_partial, [i, f, null], data_filt, false, sum));
                sum_par_id[i] += sum;
            }
        }
    }
    for (var i=0; i < mut_data.Ids.length; i++) {
        title = tooltip_title(mut_data.tooltip_format.id_title, [i, null, null], sum_par_id[i]);
        for (var t = 0; t < title.length; t++) {
            tooltips[mut_data.Ids[i]].splice(t, 0, title[t]);
        }
    }
    
    var tooltips_ex = [];
    for (var f=0; f < keys.length; f++) {
        tooltips_ex[f] = [];
        
        for (var i=0; i < keys[f].length; i++) {
            tooltips_ex[f].push(tooltips[keys[f][i]]);
        }
    }
    
    return {data: data, keys: keys, tooltips: tooltips_ex};
};

function debg(start, before, now, prefix) {
    console.log(prefix + ":" + (now.getTime() - before)/1000 + ", total: " + (now.getTime() - start)/1000);
}

mut_data.get_dataset_checker = function (func_flgs, use_genes) {
    
    // tooltips
    var tooltips_matrix = [];
    {
        for (var i in mut_data.Ids) {
            tooltips_matrix[i] = {};
        }
        
        for (var d in mut_data.mutations) {
            var data = mut_data.mutations[d];
            if (func_flgs[mut_data.funcs[data[1]]] == false) continue;
            if (use_genes.indexOf(mut_data.genes[data[2]]) < 0) continue;
            
            if (tooltips_matrix[data[0]][mut_data.genes[data[2]]] == null) {
                var data_filt = mut_data.mutations.filter(function(item, index){
                    if ((item[0] == data[0]) && (item[2] == data[2])) return true;
                });
                
                var sum = 0;
                for (var d in data_filt) sum += data_filt[d][3];
                tooltips_matrix[data[0]][mut_data.genes[data[2]]] = tooltip_title(mut_data.tooltip_format.checker_title, [data[0], null, data[2]], sum);
            }
            var texts = tooltip_partial(mut_data.tooltip_format.checker_partial, [data[0],data[1],data[2]], [data], true, 1);
            for (var t in texts) {
                tooltips_matrix[data[0]][mut_data.genes[data[2]]].push(texts[t]);
            }
        }
    }
    
    var data = [];
    var keys = [];
    var keys2 = [];
    var tooltips = [];
    // par func
    for (var f=0; f < mut_data.funcs.length; f++) {
        
        data[f] = [];
        keys[f] = [];
        keys2[f] = [];
        tooltips[f] = [];
        
        if (func_flgs[mut_data.funcs[f]] == false) continue;
        
        var data_filt = mut_data.mutations.filter(function(item, index){
            if (item[1] == f) return true;
        });
        
        // par data
        for (var d in data_filt) {
            if (use_genes.indexOf(mut_data.genes[data_filt[d][2]]) < 0) continue;
            data[f].push(1);
            keys[f].push(mut_data.Ids[data_filt[d][0]]);
            keys2[f].push(mut_data.genes[data_filt[d][2]]);
            tooltips[f].push(tooltips_matrix[data_filt[d][0]][mut_data.genes[data_filt[d][2]]]);
        }
    }
    
    return {data: data, keys: keys, keys2: keys2, tooltips: tooltips};
};

function extract_gene(func_flgs, gene_th, gene_max, sort_name_y, sort_asc_y) {

    var gene_nums = [];
    {
        for (var g=0; g < mut_data.genes.length; g++) {
            gene_nums[g] = 0;
        }
        var gene_Ids = [];
        for (var i in mut_data.Ids) {
            gene_Ids[i] = [];
        }
        for (var d in mut_data.mutations) {
            var data = mut_data.mutations[d];
            if (func_flgs[mut_data.funcs[data[1]]] == false) continue;
            if (gene_Ids[data[0]].indexOf(data[2]) >= 0) continue;
            
            gene_Ids[data[0]].push(data[2]);
            gene_nums[data[2]] += 1;
        }
    }

    // sort
    var gene_obj = [];
    {
        for (var g in mut_data.genes) {
            if (gene_nums[g] * 100.0 / mut_data.Ids.length < gene_th) continue;
            if (gene_nums[g] == 0) continue;

            gene_obj.push({name: mut_data.genes[g], num: gene_nums[g]});
        }
        
        var ret = 1;
        if (sort_asc_y[0] == false) ret = -1;
        
        gene_obj.sort(function (a, b) {
            
            if (sort_name_y[0] == "number_of_mutations") {

                if( a.num < b.num ) return -ret;
                if( a.num > b.num ) return ret;
                if( a.name < b.name ) return -ret;
                if( a.name > b.name ) return ret;
                return 0;
            }
            if (sort_name_y[0] == "name") {

                if( a.name < b.name ) return -ret;
                if( a.name > b.name ) return ret;
                return 0;
            }
        });
    }

    var gene_nums_ex = [];
    var gene_names = [];
    for (var g in gene_obj) {
        if (g >= gene_max) break;
        gene_nums_ex.push(gene_obj[g].num);
        gene_names.push(gene_obj[g].name);
    }
    
    return {names: gene_names, values: gene_nums_ex, uncut_length: gene_obj.length};
};

mut_data.get_dataset_gene = function (func_flgs, gene_th, gene_max, sort_name_y, sort_asc_y) {
    
    var gene_nums = [];
    var genes = [];
    
    for (var f=0; f < mut_data.funcs.length; f++) {
        gene_nums[f] = [];
        genes[f] = [];
    }
    var ex_genes = extract_gene(func_flgs, gene_th, gene_max, sort_name_y, sort_asc_y);

    var gene_ids = [];
    var tooltips = {};
    for (var ex_g=0; ex_g < ex_genes.names.length; ex_g++) {
        var g = mut_data.genes.indexOf(ex_genes.names[ex_g]);
        gene_ids[ex_g] = [];
        tooltips[ex_genes.names[ex_g]] = tooltip_title(mut_data.tooltip_format.gene_title, [null, null, g], ex_genes.values[ex_g]);
    }
    
    // par func
    for (var f=0; f < mut_data.funcs.length; f++) {
        if (func_flgs[mut_data.funcs[f]] == false) continue;
        // par gene
        for (var ex_g=0; ex_g < ex_genes.names.length; ex_g++) {
            var g = mut_data.genes.indexOf(ex_genes.names[ex_g]);
            var data_filt = mut_data.mutations.filter(function(item, index){
                if ((item[2] == g) && (item[1] == f)) return true;
            });
            var sum = 0;
            // par data
            for (var d=0; d < data_filt.length;d++) {
                if (gene_ids[ex_g].indexOf(data_filt[d][0]) >= 0) continue;
                gene_ids[ex_g].push(data_filt[d][0]);
                sum = sum + 1;
            }
            if (sum > 0) {
                var value = sum * 100.0 / mut_data.Ids.length;
                
                gene_nums[f].push(value);
                genes[f].push(ex_genes.names[ex_g]);
                
                var texts = tooltip_partial(mut_data.tooltip_format.gene_partial, [null, f, g], data_filt, false, sum);
                for (var t in texts) {
                    tooltips[ex_genes.names[ex_g]].push(texts[t]);
                }
            }
        }
    }

    var tooltips_ex = [];
    for (var f=0; f < genes.length; f++) {
        tooltips_ex[f] = [];
        for (var g=0; g < genes[f].length; g++) {
            tooltips_ex[f][g] = tooltips[genes[f][g]];
        }
    }

    return {data: gene_nums, keys: genes, tooltips: tooltips_ex, total_keys: ex_genes.names, total_nums: ex_genes.values, uncut_length: ex_genes.uncut_length};
};
    
mut_data.get_id_nums = function (func_flgs, data, keys) {

    var id_nums = [];
    for (var i in mut_data.Ids) {
        id_nums[i] = 0;
    }
    
    for (var f=0; f < data.length; f++) {
        if (func_flgs[mut_data.funcs[f]] == false) continue;
        
        for (var d=0; d < data[f].length; d++) {
            id_nums[mut_data.Ids.indexOf(keys[f][d])] += data[f][d];
        }
    }
    
    return id_nums;
};

// for water-fall
mut_data.get_id_flg_par_gene = function (name, func_flgs) {
    
    var id_nums = [];
    
    // par ID
    var idx_g = 0;
    
    for (var g=0; g < mut_data.genes.length; g++) {
        if (mut_data.genes[g] == name) {
            idx_g = g;
            break;
        }
    }
    
    for (var i in mut_data.Ids) {
        
        var data_filt = mut_data.mutations.filter(function(item, index){
            if ((item[2] == idx_g) && (item[0] == i)) return true;
        });
        
        var sum = 0;
        // par data
        for (var d=0; d < data_filt.length;d++) {
            // count only visible funcs
            if (func_flgs[mut_data.funcs[data_filt[d][1]]] == false) continue;
            //sum = sum + data_filt[d][3];
            sum = 1;
            break;
        }
        
        id_nums.push(sum);
    }
    
    return id_nums;
};

mut_data.get_sub_data = function (name) {
    var stack = [];
    
    var sub = {}
    // par sub
    for (var i = 0; i < mut_data.subdata.length; i++) {
        if (mut_data.subdata[i].name == name) {
            sub = mut_data.subdata[i];
            break;
        }
    }
    if (sub.length == 0) return stack;

    // par item
    var stack_length = sub.item.length;
    if (sub.type == "range") stack_length = stack_length + 1;
    if (sub.type == "gradient") {
        
        var gradient_stack = [];
        for (var i=0; i < sub.data.length; i++) {
            gradient_stack.push(sub.data[i][1]);
        }
        gradient_stack.sort(function(a,b){
            if( a < b ) return -1;
            if( a > b ) return 1;
            return 0;
        });
        var gradient_stack_d = gradient_stack.filter(function (x, i, self) {
            return self.indexOf(x) === i;
        });
        stack_length = gradient_stack_d.length;
    }
    
    for (var i=0; i < stack_length; i++) {
        stack[i] = {};
        stack[i].data = [];
        stack[i].keys = [];
        stack[i].tooltips = [];
        if (sub.type == "gradient") {
            stack[i].color_n = "";
            stack[i].color_h = "";
        }
        else {
            stack[i].color_n = sub.colors_n[i];
            stack[i].color_h = sub.colors_h[i];
        }
    }
    
    // par data
    for (var i=0; i < sub.data.length; i++) {
        
        var id = mut_data.Ids[sub.data[i][0]];
        var s = -1;
        var val = "";
        
        if (sub.type == "range") {
            val = sub.data[i][1];
            for (var l=0; l < sub.item.length; l++) {
                if (val < sub.item[l]) {
                    s = l;
                    break;
                }
            }
            if (s == -1) {
                s = sub.item.length;
            }
        }
        else if (sub.type == "gradient") {
            val = sub.data[i][1];
            for (var l=0; l < gradient_stack_d.length; l++) {
                if (val == gradient_stack_d[l]) {
                    s = l;
                    break;
                }
            }
            if (stack[s].color_n == "") {
                stack[s].color_n = sub_color_gradient(val, sub.item, sub.colors_n);
                stack[s].color_h = sub_color_gradient(val, sub.item, sub.colors_h);
            }
        }
        else { // "fix"
            s = sub.data[i][1];
            if (s >= sub.item.length) {
                console.log(name + ": not contain:" + s);
                continue;
            }
            val = sub.item[s];
        }
        
        var p = stack[s].data.length;
        stack[s].data[p] = 1;
        stack[s].keys[p] = id;
        stack[s].tooltips[p] = [id + ", " + val];
    }
    
    return stack;
};
mut_data.get_sub_values = function (name) {
    var values = [];
    
    for (var f = 0; f < mut_data.subdata.length; f++) {
        if (mut_data.subdata[f].name != name) continue;
        
        // par ID
        for (var i in mut_data.Ids) {
            
            var data_filt = mut_data.subdata[f].data.filter(function(item, index){
                if (item[0] == i) return true;
            });
            
            values.push(data_filt[0][1]);
        }
        break;
    }
    return values;
};

function sub_color_gradient(value, range, colors) {

    var v0 = range[0];
    var v1 = range[1];
    var ret = "#";
    
    for (var i=0; i < 3; i++) {
        
        var c0 = parseInt(colors[0].slice(2*i+1, 2*i+3), 16);
        var c1 = parseInt(colors[1].slice(2*i+1, 2*i+3), 16);
        
        var c = c0 + ((value - v0) * (c1 - c0)) / ((v1 - v0));
        if (c > 255) c = 255;
        if (c < 0) c = 0;
        
        var c16 = Math.round(c).toString(16);
        if (c16.length == 1) c16 = "0" + c16;
        ret = ret + c16;
    }

    return ret;
};

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

"""
########### html template
subplot_template = """
<!-- sub bar -->
<tr>
<td><div id="div_sub{i}_t"><b>{title}</b>
      <section>
        <input type="radio" name="optSub{i}" value="0" id="xSub{i}_0" onclick="sort_sub({i}, 0)" checked /><label for="xSub{i}_0" class="radio">none</label>
        <input type="radio" name="optSub{i}" value="1" id="xSub{i}_1" onclick="sort_sub({i}, 1)" />        <label for="xSub{i}_1" class="radio">ASC </label>
        <input type="radio" name="optSub{i}" value="2" id="xSub{i}_2" onclick="sort_sub({i}, 2)" />        <label for="xSub{i}_2" class="radio">DESC</label>
      </section>
</div></td>
<td><div id="div_sub{i}_p"></div></td>
<td><div style="overflow: auto;" id="div_sub{i}_l">
    {sub_legend}    
</div></td>
</tr>
"""

sub_legend_template = """
    <div class="legend"><div id="sub{i}_legend{n}" class="legend legend_bar"></div><div id="sub{i}_legend{n}_text" class="legend legend_label"></div></div>"""

legend_template = """
    <div><input type="checkbox" id="v{n}" onclick="change_stack('v{n}', '{text}')" checked><div id="legend{n}" class="legend legend_bar"></div><div id="legend{n}_text" class="legend legend_label"></div></div>"""

js_set_legend_template = """
    d3.select("#legend{n}").style("background-color", "{color}");
    d3.select("#legend{n}_text").attr("id", "text").text('{text}');"""
    
js_set_sub_legend = """
    {set_text}
    subs.push(add_subdiv("div_sub{i}", "sub{i}"));"""
js_set_sub_legend_template = """
    d3.select("#sub{i}_legend{n}").style("background-color", "{color}");
    d3.select("#sub{i}_legend{n}_text").attr("id",  "text").text('{text}');"""
js_set_sub_select = """
    subs[{i}].bar_selected = function(key, on) {{
        sub_selected(key, on);
    }}"""
    
########### functions

import paplot.subcode.tools as tools

def value_to_index(li, value, default):
    for i in range(len(li)):
        if li[i] == value:
            return i
    
    return default

def list_to_text(li):
    text = ""
    for item in li:
        text += "'" + str(item) + "',"
    return text

def text_to_list(text, sep):
    splt = []
    if sep == "": splt.append(text)
    else: splt = text.split(sep)
    
    li = []
    for item in splt:
        value = item.strip().rstrip()
        if value != "":
            li.append(value)
    return li
            
def genes_list(colmun, colmun_f, colmun_id, funcs, Ids, config):

    sept = tools.config_getstr(config, "result_format_mutation", "sept_gene")
    use_gene_rate = config.getfloat("mut", "use_gene_rate")
    
    limited_list = text_to_list(tools.config_getstr(config, "mut", "limited_genes"), ",")
    nouse_list = text_to_list(tools.config_getstr(config, "mut", "nouse_genes"), ",")
    
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
    genes = []
    for key in genes_di:
        if len(limited_list) > 0:
            if (key in limited_list) == False: continue   
        if key in nouse_list: continue
        if genes_di[key] < float(len(Ids))*use_gene_rate: continue

        genes.append(key)

    return genes

def funcs_list(colmun, config):

    import paplot.color as color
    
    sept = tools.config_getstr(config, "result_format_mutation", "sept_func")
    limited_list = text_to_list(tools.config_getstr(config, "mut", "limited_funcs"), ",")
    nouse_list = text_to_list(tools.config_getstr(config, "mut", "nouse_funcs"), ",")   
    
    funcs = []
    for row in colmun:
        splt = []
        if sept == "": splt.append(row)
        else: splt = row.split(sept)
        
        for func in splt:
            func = func.strip()
            
            if func == "": continue
            if len(limited_list) > 0:
                if (func in limited_list) == False: continue   
            if func in nouse_list: continue
            funcs.append(func)
            
    # sort list
    funcs = list(set(funcs))
    funcs.sort() 
    
    color_n_list = {};
    color_h_list = {};
    for f in tools.config_getstr(config, "mut", "func_colors").split(","):
        if len(f) == 0: continue
        cols = text_to_list(f, ":")
                
        if len(cols) >= 2:
            color_n_list[cols[0]] = color.name_to_value(cols[1])
        if len(cols) >= 3:
            color_h_list[cols[0]] = color.name_to_value(cols[2])
    
    color_n_list = color.create_color_dict(funcs, color_n_list, color.metro_colors) 
    color_h_list2 = {}
    for key in color_n_list:
        if color_h_list.has_key(key): continue
        color_h_list2[key] = color.Saturation_down(color_n_list[key])
    
    # dict to value
    colors_n = []
    colors_h = []
    
    for key in funcs:
        colors_n.append(color_n_list[key])
        colors_h.append(color_h_list2[key])
        
    return [funcs, colors_n, colors_h]

def pyformat_to_jstooltip_text(config, section, item_startwith):

    import re
    re_compile=re.compile(r"\{[0-9a-zA-Z\+\-\*\/\#\:\,\.\_\ ]+\}")
    re_compile2=re.compile(r"[\+\-\*\/\:]")
    
    keys_list = []
    tooltip_fomat_text = ""

    for option in tools.config_getoptions(config, section, item_startwith):
        
        formt = tools.config_getstr(config, section, option)
        key_text_list = re_compile.findall(formt)
        tooltip_detail_text = ""
        
        for key_text in key_text_list:
            start = formt.find(key_text)
            
            # write fix area
            if start > 0:
                tooltip_detail_text += tooltip_detail_templete.format(label = formt[0:start], type="fix", keys="", ext="")
            
            formt = formt[start+len(key_text):]
            #if len(formt) == 0: break
            
            label_text = key_text.replace(" ", "").replace("{", "").replace("}", "")
            sub_keys = re_compile2.split(label_text)
            
            ttype = "numeric"
            ext = ""
            
                
            # case str
            if len(sub_keys) == 1:
                ttype = "str"

            # case with-extention
            if label_text.find(":") > 0:
                ext_start = label_text.index(":")
                ext=label_text[ext_start+1:]
                label_text = label_text[0:ext_start]
                sub_keys = re_compile2.split(label_text)
            
            for sub_key in sub_keys:
                try:
                    float(sub_key)
                    sub_keys.remove(sub_key)
                except Exception:
                    pass
            
            for sub_key in list(set(sub_keys)):
                label_text = label_text.replace(sub_key, "{" + sub_key +"}")
                    
            tooltip_detail_text += tooltip_detail_templete.format(label= label_text, type=ttype, keys=list_to_text(sub_keys), ext=ext)
            keys_list.extend(sub_keys)
        
        if len(formt) > 0:
            tooltip_detail_text += tooltip_detail_templete.format(label = formt, type="fix", keys="", ext="")
            
        tooltip_fomat_text += "[" + tooltip_detail_text + "],"

    key_text = ""
    for key in list(set(keys_list)):
        key_text += "{" + key + "} "
        
    return tooltip_templete.format(formats = tooltip_fomat_text, keys = key_text)
        
def output_html(input_file, output_js_file, output_html_dir, org_html, project_name, positions, config):
    dataset = convert_tojs(input_file, output_js_file, positions, config)
    if dataset != None:
        create_html(dataset, output_html_dir, org_html, project_name, config)
        return True
    
    return False
    
def convert_tojs(input_file, output_file, positions, config):
    
    import paplot.subcode.data_frame as data_frame
    import paplot.subcode.merge as merge
    
    cols_di = merge.position_to_dict(positions)

    # data read
    try:
        df = data_frame.load_file(input_file, header = 1, \
            sept = tools.config_getstr(config, "merge_format_mutation", "sept"), \
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
        func_pos = df.name_to_index(cols_di["func"])
        func = df.data[f][func_pos]
        df.data[f][func_pos] = func.replace(" ", "_")
        if func == "":
            df.data[f][func_pos] = "(blank)"

    [funcs, colors_n, colors_h] = funcs_list(df.column(cols_di["func"]), config)

    # ID list
    Ids = []
    for row in df.data:
        iid = row[df.name_to_index("id")]
        if iid != "": Ids.append(iid)
    Ids = list(set(Ids))
    Ids.sort()
    
    genes = genes_list(df.column(cols_di["gene"]), \
                        df.column(cols_di["func"]), \
                        df.column(df.name_to_index("id")), \
                        funcs, Ids, config)    

    option_keys = cols_di.keys()
    option_keys.remove("id")
    option_keys.remove("func")
    option_keys.remove("gene")
            
    f = open(output_file, "w")
    f.write(js_header \
        + js_dataset.format(Ids = list_to_text(Ids), \
            genes = list_to_text(genes), \
            funcs = list_to_text(funcs), \
            func_colors_n = list_to_text(colors_n), \
            func_colors_h = list_to_text(colors_h), \
            mutation_header = list_to_text(option_keys), \
            checker_title = pyformat_to_jstooltip_text(config, "mut", "tooltip_format_checker_title"), \
            checker_partial = pyformat_to_jstooltip_text(config, "mut", "tooltip_format_checker_partial"), \
            gene_title = pyformat_to_jstooltip_text(config, "mut", "tooltip_format_gene_title"), \
            gene_partial = pyformat_to_jstooltip_text(config, "mut", "tooltip_format_gene_partial"), \
            id_title = pyformat_to_jstooltip_text(config, "mut", "tooltip_format_id_title"), \
            id_partial = pyformat_to_jstooltip_text(config, "mut", "tooltip_format_id_partial"), \
            ))
            
    # mutation list
    f.write(js_mutations_1)

    mutations = {}
    tooltips = {}
    for row in df.data:
        iid = row[df.name_to_index("id")]
        if iid == "": continue
            
        if (iid in mutations) == False:
            mutations[iid] = {}
            tooltips[iid] = {}
                
        func_split = text_to_list(row[df.name_to_index(cols_di["func"])], \
                                tools.config_getstr(config, "result_format_mutation", "sept_func"))
                                
        tooltip_items = []
        for k in range(len(option_keys)):
            key = option_keys[k]
            if cols_di[key] == "": continue
            tooltip_items.append(row[df.name_to_index(cols_di[key])])
            
        for func in func_split:
            if (func in mutations[iid]) == False:
                mutations[iid][func] = {}
                tooltips[iid][func] = {}

            gene_split = text_to_list(row[df.name_to_index(cols_di["gene"])], \
                                tools.config_getstr(config, "result_format_mutation", "sept_gene"))
            for gene in gene_split:
                if (gene in mutations[iid][func]) == False:
                    mutations[iid][func][gene] = 1
                    tooltips[iid][func][gene] = []
                else:
                    mutations[iid][func][gene] += 1

                tooltips[iid][func][gene].append(tooltip_items)

    mutations_sum = 0
    for iid in mutations:
        for func in mutations[iid]:
            for gene in mutations[iid][func]:
                idx_i = value_to_index(Ids, iid, -1)
                idx_f = value_to_index(funcs, func, -1)
                idx_g = value_to_index(genes, gene, -1)

                if idx_i >= 0 and idx_f >= 0 and idx_g >= 0:
                    
                    tooltip_items = ""
                    for tips in tooltips[iid][func][gene]: 
                        tooltip_items += "[" + list_to_text(tips) + "],"

                    f.write(mu_mutations_template.format(ID = idx_i, \
                        func = idx_f , \
                        gene = idx_g, \
                        num = mutations[iid][func][gene],
                        tooltip = tooltip_items))
                        
                    mutations_sum += mutations[iid][func][gene]
                    
    f.write(js_mutations_2.format(mutations_sum = mutations_sum))
    
    dataset = {"func":funcs, "color":colors_n}
    
    ##### subdata #####
    f.write(js_subdata_1)
    subdata = []
    counter = 0
    for sec in config.sections():
        if sec.startswith("mut_subplot_type1_"):
            ret_val = load_subdata(Ids, sec, config)
            if ret_val == None: continue
            [data_text, item, colors_n, colors_h, label, title] = ret_val
            
            name = "sub%d" % (counter)
            pos = 0
            counter += 1
            
        elif sec.startswith("mut_subplot_type2_"):
            ret_val = load_subdata(Ids, sec, config)
            if ret_val == None: continue
            [data_text, item, colors_n, colors_h, label, title] = ret_val
            
            name = "sub%d" % (counter)
            pos = 1
            counter += 1
            
        else: continue
    
        f.write(subdata_template.format(name = name, \
                title = title, \
                type = tools.config_getstr(config, sec, "mode"), \
                item = list_to_text(item), \
                colors_n = list_to_text(colors_n), \
                colors_h = list_to_text(colors_h), \
                data = data_text ))

        subdata.append({"pos":pos, "label":label, "color":colors_n, "title": title})
         
    f.write(js_subdata_2)
    
    ##### functions #####
    f.write(js_function)
    f.close()

    dataset["subdata"] = subdata
    return dataset 

def load_subdata(ids, sec, config):
    import os
    import paplot.color as color
    
    input_file = tools.config_getpath(config, sec, "path")
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
        name_set_split = text_to_list(name_set, ":")
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
        if colors_h_di.has_key(key): continue
        colors_h_di2[key] = color.Saturation_down(colors_n_di[key])
    
    # dict to value
    colors_n = []
    colors_h = []
    for key in item:
        colors_n.append(colors_n_di[key])
        colors_h.append(colors_h_di2[key])
    
    if mode == "range":
        item.remove(item[0])
    
    header = []
    if tools.config_getboolean(config, sec, "header") == True:
        pos_value = -1
        pos_ID = -1
    else:
        pos_value = tools.config_getint(config, sec, "col_value")
        pos_ID = tools.config_getint(config, sec, "col_ID")
        header = ["",""]
    
    # copy Ids for find check
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
            header = text_to_list(line,sept)
            try:
                colname = tools.config_getstr(config, sec, "col_value")
                pos_value = header.index(colname)
                colname = tools.config_getstr(config, sec, "col_ID")
                pos_ID = header.index(colname)
            except Exception as e:
                print(e.message)
                return None
                
            continue
        
        cols = text_to_list(line,sept)
        if (cols[pos_ID] in ids) == False: continue
        else: unlookup.remove(cols[pos_ID])

        id_pos = ids.index(cols[pos_ID])
        
        if mode == "fix":
            if cols[pos_value] in item:
#                data_text += subdata_data_template.format(id = id_pos, item = '"' + cols[pos_value] + '"')
                data_text += subdata_data_template.format(id = id_pos, item = item.index(cols[pos_value]))
            else:
                print("[" + sec + "] name_set: data is undefined." + cols[pos_value] + "\n")
                continue
        elif mode == "range":
            try:
                values.append(float(cols[pos_value]))
            except Exception as e:
                print(colname + ": data type is invalid.\n" + e.message)
                continue
            
            data_text += subdata_data_template.format(id = id_pos, item = cols[pos_value])
            
        elif mode == "gradient":
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
        
    return [data_text, item, colors_n, colors_h, label, title] 

def create_html(dataset, output_html_dir, org_html, project_name, config):
    import os

    legend_text = ""
    set_legend_text = ""
    for n in range(len(dataset["func"])):
        legend_text += legend_template.format(n = n, text = dataset["func"][n])
        set_legend_text += js_set_legend_template.format(n = n, text = dataset["func"][n], color = dataset["color"][n])
    
    sub1_text = ""
    sub2_text = ""
    set_sub_legend_text = ""
    set_sub_select_text = ""
    for i in range(len(dataset["subdata"])):
        
        sub_legend_text = ""
        set_text = ""
        for n in range(len(dataset["subdata"][i]["label"])):
            sub_legend_text += sub_legend_template.format(i = i, n = n)
            set_text += js_set_sub_legend_template.format(i = i, n = n, \
                                        text = dataset["subdata"][i]["label"][n], \
                                        color = dataset["subdata"][i]["color"][n])
        
        sub_text = subplot_template.format(i = i, sub_legend = sub_legend_text, title = dataset["subdata"][i]["title"])
        if dataset["subdata"][i]["pos"] == 0:
            sub1_text += sub_text
        else:
            sub2_text += sub_text
            
        set_sub_legend_text += js_set_sub_legend.format(i = i, title = dataset["subdata"][i]["title"], set_text = set_text)
        set_sub_select_text += js_set_sub_select.format(i = i)

    f_template = open(os.path.dirname(os.path.abspath(__file__)) + "/templates/" + org_html)
    html_template = f_template.read()
    f_template.close()
    
    f_html = open(output_html_dir + "/" + org_html, "w")
    f_html.write(
        html_template.format(project = project_name, 
            version = tools.version_text(),
            date = tools.now_string(),
            legend = legend_text,
            set_legend = set_legend_text,
            sub1 = sub1_text,
            sub2 = sub2_text,
            set_sub_legend = set_sub_legend_text,
            set_sub_select = set_sub_select_text,
            style = "../style/%s" % os.path.basename(tools.config_getpath(config, "style", "path", "default.js")),
        ))
    f_html.close()
    
if __name__ == "__main__":
    pass

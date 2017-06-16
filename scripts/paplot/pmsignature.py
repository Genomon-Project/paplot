# -*- coding: utf-8 -*-
"""
Created on Wed Mar 16 15:40:29 2016

@author: okada

$Id: pmsignature.py 189 2017-01-25 06:47:57Z aokada $
"""

########### js template
js_header = """(function() {
msig_data = {};
"""
js_dataset = """
msig_data.tooltip_format = {{
    {tooltip_ref}
    alt:{tooltip_alt},
    strand:{tooltip_strand},
    mutation_title:{mutation_title},
    mutation_partial:{mutation_partial},
}};

msig_data.ref_reduce_rate = [1,1,1,1,1];
msig_data.label_colors = {{'A': '{color_A}', 'C': '{color_C}', 'G': '{color_G}', 'T': '{color_T}', 'plus': '{color_plus}', 'minus': '{color_minus}'}};
msig_data.signatures = [{signatures}];
msig_data.sig_colors = [{colors}];

msig_data.dataset_ref = [{dataset_ref}];
msig_data.dataset_alt = [{dataset_alt}];
msig_data.dataset_strand = [{dataset_strand}];

// [ID, signature, value]
msig_data.mutations = [{mutations}];
msig_data.mutation_count = [{mutation_count}];
msig_data.Ids = [{Ids}];
"""
js_tooltip_ref_template = "ref{index}:{tooltip_format},"

js_function = """
msig_data.esc_Ids = [];
for (var i=0; i < msig_data.Ids.length; i++) {
    msig_data.esc_Ids[i] = 'Key' + i;
}

function tooltip_text(format, obj) {
    var tooltip = [];
    for (var t in format.format) {
        tooltip.push(utils.text_format(format.format[t], obj));
    }
    return tooltip;
};

function alt_data(sig_id) {
    
    var data = msig_data.dataset_alt[sig_id];

    var obj = {};
    obj['ca'] = data[1][0];
    obj['cg'] = data[1][2];
    obj['ct'] = data[1][3];
    obj['ta'] = data[3][0];
    obj['tc'] = data[3][1];
    obj['tg'] = data[3][2];
    
    var tooltip = tooltip_text(msig_data.tooltip_format['alt'], obj);
    
    return {
        data: data, 
        tooltip: tooltip, 
    };
};

function ref_data(sig_id, label) {
    
    var data = msig_data.dataset_ref[sig_id][Number(label.replace('ref', ''))];
    
    var obj = {};
    obj['a'] = data[0];
    obj['c'] = data[1];
    obj['g'] = data[2];
    obj['t'] = data[3];

    var tooltip = tooltip_text(msig_data.tooltip_format[label], obj);
    
    return {
        data: data, 
        tooltip: tooltip, 
    };
};

function strand_data(sig_id) {

    var data = msig_data.dataset_strand[sig_id];
    
    var obj = {};
    obj['plus'] = data[0];
    obj['minus'] = data[1];
    
    var tooltip = tooltip_text(msig_data.tooltip_format['strand'], obj);
    
    return {
        data: data, 
        tooltip: tooltip, 
    };
};
    
msig_data.get_dataset = function (sig_id, label) {
    
    var dataset = {};
    
    if (label == 'alt') {
        dataset = alt_data(sig_id);
    }
    else if(label.indexOf('ref') == 0) {
        dataset = ref_data(sig_id, label);
    }
    else if(label == 'strand') {
        dataset = strand_data(sig_id);
    }
    return dataset;
};

msig_data.get_bars_data = function (rate) {
    
    var data = [];
    var keys = [];
    var tooltips = {};
    var sum_par_id = [];
    
    for (var i=0; i < msig_data.Ids.length; i++) {
        tooltips[msig_data.esc_Ids[i]] = [];
        sum_par_id[i] = 0;
    }
    
    // par func
    for (var f=0; f < msig_data.signatures.length; f++) {

        data[f] = [];
        keys[f] = [];

        // par ID
        for (var i=0; i < msig_data.Ids.length; i++) {
            
            var data_filt = msig_data.mutations.filter(function(item, index){
                if ((item[0] == i) && (item[1] == f)) return true;
            });
            
            //var sum = data_filt.length;
            var sum = 0;
            for (var s = 0; s < data_filt.length; s++) {
                sum += data_filt[s][2];
            }
            
            var mutation_count = 1;
            if (rate == false) {
                if (msig_data.mutation_count.length > 0) mutation_count = msig_data.mutation_count[i];
            }
            
            if (sum > 0) {
                sum = sum*mutation_count;
                
                data[f].push(sum);
                keys[f].push(msig_data.esc_Ids[i]);
                
                var obj = {
                    '#sum_mutaion_all': msig_data.mutations.length,
                    '#sum_item_value': sum,
                    'id': msig_data.Ids[i],
                    'sig': msig_data.signatures[f],
                };
                tooltips[msig_data.esc_Ids[i]].push(tooltip_text(msig_data.tooltip_format['mutation_partial'], obj));
                sum_par_id[i] += sum;
            }
        }
    }
    for (var i=0; i < msig_data.Ids.length; i++) {
        var obj = {
            '#sum_mutaion_all': msig_data.mutations.length,
            '#sum_item_value': sum_par_id[i],
            'id': msig_data.Ids[i],
        };
        
        title = tooltip_text(msig_data.tooltip_format['mutation_title'], obj);
        for (var t = 0; t < title.length; t++) {
            tooltips[msig_data.esc_Ids[i]].splice(t, 0, title[t]);
        }
    }
    
    return {data: data, key: keys, tooltip: tooltips};
};
})();
Object.freeze(msig_data);
"""

########### HTML template
html_integral_template = """<table>
<tr>
<td style="vertical-align: top;" ><div style="float: left;" id="div_rate"></div></td>
<td style="vertical-align: top;><!-- legend --> <div style="float: left;" id='div_rate_legend_html'></div><div style="float: left;" id='div_rate_legend_svg'></div></td>
</tr>
<tr>
<td style="vertical-align: top;><div style="float: left;" id="div_integral"></div></td>
<td style="vertical-align: top;><!-- legend --> <div style="float: left;" id='div_integral_legend_html'></div><div style="float: left;" id='div_integral_legend_svg'></div></td>
</tr>
<tr>
<td colspan=2 style="padding-top: 20px;">
<p>view mode: <select id="chart_mode"></select></p>
<p>sort by: <select id="chart_sort"></select></p>
</td>
</tr>
</table>
"""

########### functions
def output_html(params, config):
    dataset = convert_tojs(params, config)
    if dataset != None and dataset != {}:
        create_html(dataset, params, config)
    
    return dataset
    
def convert_tojs(params, config):

    import json
    import paplot.subcode.tools as tools
    import paplot.convert as convert
    import paplot.color as color
    
    # data read
    try:
        jsonData = json.load(open(params["data"]))
    except Exception as e:
        print ("failure open data %s, %s" % (params["data"], e.message))
        return None
    
    key_Ids = tools.config_getstr(config, "result_format_pmsignature", "key_id")
    key_ref = tools.config_getstr(config, "result_format_pmsignature", "key_ref")
    key_alt = tools.config_getstr(config, "result_format_pmsignature", "key_alt")
    key_strand = tools.config_getstr(config, "result_format_pmsignature", "key_strand")
    key_mutations = tools.config_getstr(config, "result_format_pmsignature", "key_mutation")
    key_mutation_count = tools.config_getstr(config, "result_format_pmsignature", "key_mutation_count")
    
    sig_num = len(jsonData[key_ref])
    
    if sig_num == 0:
        print ("no data %s" % params["data"])
        return {}

    # signature names
    signature_list = []
    for s in range(sig_num):
        signature_list.append("signature %d" % (s+1))
    
    # each signature colors
    sig_color_list = color.create_color_array(sig_num, color.r_set2)
    
    # use background?
    if tools.config_getboolean(config, "result_format_pmsignature", "background"):
        signature_list.append("background ")
        sig_color_list.append(color.r_set2_gray)
    
    # Id list
    id_txt = ""
    if key_Ids in jsonData:
        id_txt = convert.list_to_text(jsonData[key_Ids])

    # mutations
    mutations_txt = ""
    if key_mutations in jsonData:
        for m in jsonData[key_mutations]:
            mutations_txt += "[%d,%d,%f]," % (m[0],m[1],m[2])
    
    # signature
    dataset_ref = ""
    for sig in jsonData[key_ref]:
        tmp = ""
        for sub in sig:
            tmp += "[" + ",".join(map(str, sub)) + "],"
        dataset_ref += ("[" + tmp + "],")
    
    dataset_alt = ""
    for sig in jsonData[key_alt]:
        tmp = ""
        for sub in sig:
            tmp += "[" + ",".join(map(str, sub)) + "],"
        dataset_alt += ("[" + tmp + "],")
    
    dataset_strand = ""
    for sig in jsonData[key_strand]:
        dataset_strand += "[" + ",".join(map(str, sig)) + "],"
    
    # tooltips
    # for ref
    keys_di = {"a": "", "c": "", "g": "", "t": "", "ca": "", "cg": "", "ct": "", "ta": "", "tc": "", "tg": "", "plus": "", "minus": "", "id": "", "sig":""}
    
    tooltip_refs_txt = ""
    for r in range(len(jsonData[key_ref][0])):
        tooltip_refs_txt += js_tooltip_ref_template.format(
            index = r, tooltip_format = convert.pyformat_to_jstooltip_text(keys_di, config, "pmsignature", "", "tooltip_format_ref")
        )
    
    mutation_count_txt = ""
    if (key_mutation_count != "") and (key_mutation_count in jsonData.keys()):
        for v in jsonData[key_mutation_count]:
            mutation_count_txt += "%d," % v
        
    # output
    sig_num_sift = 0
    if tools.config_getboolean(config, "result_format_pmsignature", "background"):
        sig_num_sift = 1
    ellipsis = "%s%d" % (params["ellipsis"], (sig_num + sig_num_sift))
    
    js_file = "data_%s.js" % ellipsis
    html_file = "graph_%s.html" % ellipsis
    
    f = open(params["dir"] + "/" + js_file, "w")
    f.write(js_header \
        + js_dataset.format(Ids = id_txt, \
            color_A = tools.config_getstr(config, "pmsignature", "color_A", "#06B838"), \
            color_C = tools.config_getstr(config, "pmsignature", "color_C", "#609CFF"), \
            color_G = tools.config_getstr(config, "pmsignature", "color_G", "#B69D02"), \
            color_T = tools.config_getstr(config, "pmsignature", "color_T", "#F6766D"), \
            color_plus = tools.config_getstr(config, "pmsignature", "color_plus", "#00BEC3"), \
            color_minus = tools.config_getstr(config, "pmsignature", "color_minus", "#F263E2"), \
            signatures = convert.list_to_text(signature_list), \
            colors = convert.list_to_text(sig_color_list), \
            mutations = mutations_txt, \
            dataset_ref = dataset_ref, \
            dataset_alt = dataset_alt, \
            dataset_strand = dataset_strand, \
            tooltip_ref = tooltip_refs_txt, \
            tooltip_alt = convert.pyformat_to_jstooltip_text(keys_di, config, "pmsignature", "", "tooltip_format_alt"), \
            tooltip_strand = convert.pyformat_to_jstooltip_text(keys_di, config, "pmsignature", "", "tooltip_format_strand"), \
            mutation_title = convert.pyformat_to_jstooltip_text(keys_di, config, "pmsignature", "", "tooltip_format_mutation_title"), \
            mutation_partial = convert.pyformat_to_jstooltip_text(keys_di, config, "pmsignature", "", "tooltip_format_mutation_partial"), \
            mutation_count = mutation_count_txt, \
            )
        + js_function)
    f.close()

    integral = True
    if key_Ids == "" or key_mutations == "" or key_mutation_count == "":
        integral = False
    
    return {"sig_num": sig_num,
            "js": js_file,
            "html": html_file,
            "intergral": integral,
            }

def create_html(dataset, params, config):
    import os
    import paplot.subcode.tools as tools
    import paplot.prep as prep
    
    html_div_template = "<div style='float: left;' id='div_pm{id}'></div>\n"
    html_add_template = "add_div('div_pm{id}');\n"

    div_text = ""
    add_text = ""
    for i in range(dataset["sig_num"]):
        div_text += html_div_template.format(id = i)
        add_text += html_add_template.format(id = i)

    integral_text = ""
    if dataset["intergral"] == True:
        integral_text = html_integral_template
        
    f_template = open(os.path.dirname(os.path.abspath(__file__)) + "/templates/graph_pmsignature.html")
    html_template = f_template.read()
    f_template.close()
    
    sig_num_sift = 0
    if tools.config_getboolean(config, "result_format_pmsignature", "background"):
        sig_num_sift = 1
        
    f_html = open(params["dir"] + "/" + dataset["html"], "w")
    f_html.write(
        html_template.format(project = params["project"], 
            title = "%s(#sig %d)" % (params["title"], dataset["sig_num"] + sig_num_sift),
            data_js = dataset["js"],
            version = prep.version_text(),
            date = tools.now_string(),
            divs = div_text,
            add_divs = add_text,
            integral = integral_text,
            style = "../style/%s" % os.path.basename(tools.config_getpath(config, "style", "path", "default.js")),
        ))
    f_html.close()
    
if __name__ == "__main__":
    pass

# -*- coding: utf-8 -*-
"""
Created on Wed Dec 02 17:43:52 2015

@author: okada

$Id: qc.py 177 2016-10-24 04:23:59Z aokada $
"""

########### js template
js_header = """(function() {
qc_data = {};
"""

js_dataset = """
qc_data.Ids = [{IDs}];
qc_data.plots = [{plots}];
qc_data.header = [{header}];
"""
plot_template = "{{chart_id:'{chart_id}', title:'{title}', title_y:'{title_y}', stack:{stack}, stack_id:[{stack_id}], label:[{label}], color:[{color}], tooltip:{tooltip}}},"

js_data1 = "qc_data.value = ["
js_data2 = "];"

js_function = """
function tooltip_partial(format, data) {
    
    var obj = {};
    var tooltip = [];
    
    for (var p = 0; p < data.length; p++) {
        obj[qc_data.header[p]] = data[p];
    }
    for (var t in format.format) {
        var text = text_format(format.format[t], obj);
        tooltip.push(text);
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

qc_data.get_plot_config = function (chart_id) {

    for (var i = 0; i < qc_data.plots.length; i++) {
        if (qc_data.plots[i].chart_id == chart_id) {
            return qc_data.plots[i];
        }
    }
    return null;
};

qc_data.get_dataset = function (chart_id) {
    
    var info = qc_data.get_plot_config(chart_id);
    
    var key = [];
    for (var d = 0; d < qc_data.value.length; d++) {
        key.push(qc_data.value[d][qc_data.header.indexOf("id")]);
    }
    
    var tooltip = 0;
    if (info.tooltip.format.length > 0) {
        tooltip = {};
        for (var d = 0; d < qc_data.value.length; d++) {
            var id = qc_data.value[d][qc_data.header.indexOf("id")];
            tooltip[id] = [];
            
            var tmp_data = tooltip_partial(info.tooltip, qc_data.value[d])
            for (var t in tmp_data) {
                tooltip[id].push(tmp_data[t]);
            }
        }
    }
    
    var data = [];
    for (var s = 0; s < info.stack.format.length; s++) {
        data[s] = [];
    }
    for (var d = 0; d < qc_data.value.length; d++) {
        var tmp_data = tooltip_partial(info.stack, qc_data.value[d]);
        for (var s in tmp_data) {
            data[s].push(Number(tmp_data[s]))
        }
    }
    
    return {data: data, key: key, tooltip: tooltip};
};
})();
Object.freeze(qc_data);
"""

########### html template
html_chart_template = "<div id='legend_{chart_id}_svg'></div><div id='{chart_id}'></div>\n"
html_js_template = """
add_div('{chart_id}');
divs[{i}].obj.bar_selected = function(key, on) {{ chart_selected(key, on); }}
"""
html_js_brushed_template = """
divs[{i}].obj.brushed = function(data, range) {{ chart_brushed(data, range); }}
"""

########### functions
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
    import paplot.color as color
    
    cols_di = merge.position_to_dict(positions)

    # data read
    try:
        df = data_frame.load_file(input_file, header = 1, \
            sept = tools.config_getstr(config, "merge_format_qc", "sept"), \
            comment = tools.config_getstr(config, "result_format_qc", "comment") \
            )
    except Exception as e:
        print ("failure open data %s, %s" % (input_file, e.message))
        return None

    if len(df.data) == 0:
        print ("no data %s" % input_file)
        return None

    # chart list
    plots_text = ""
    plots_option = []
    
    config_sections = config.sections()
    config_sections.sort()
    if "qc_chart_brush" in config_sections:
        config_sections.remove("qc_chart_brush")
        config_sections.insert(0, "qc_chart_brush")
        
    for sec in config.sections():
        if not sec.startswith("qc_chart_"):
            continue
        
        chart_id = sec.replace("qc_chart_", "chart_")
        
        stack_id = []
        label = []
        colors_di = {}
        counter = 0
        for name_set in tools.config_getstr(config, sec, "name_set").split(","):
            name_set_split = convert.text_to_list(name_set, ":")
            if len(name_set_split) == 0:
                continue
            
            stack_id.append("stack" + str(counter))
            label.append(name_set_split[0])
            
            if len(name_set_split) > 1:
                colors_di[name_set_split[0]] = color.name_to_value(name_set_split[1])
            counter += 1
            
        # fill in undefined items
        colors_di = color.create_color_dict(label, colors_di, color.metro_colors) 
        
        # dict to value
        colors_li = []
        for key in label:
            colors_li.append(colors_di[key])
        
        plots_text += plot_template.format(
            chart_id = chart_id, \
            title = tools.config_getstr(config, sec, "title"), \
            title_y = tools.config_getstr(config, sec, "title_y"), \
            stack = convert.pyformat_to_jstooltip_text(cols_di, config, sec, "result_format_qc", "stack"), \
            stack_id = convert.list_to_text(stack_id), \
            label = convert.list_to_text(label), \
            color = convert.list_to_text(colors_li), \
            tooltip = convert.pyformat_to_jstooltip_text(cols_di, config, sec, "result_format_qc", "tooltip_format"), \
            )
        plots_option.append(chart_id)
    
    # ID list
    Ids = []
    for row in df.data:
        iid = row[df.name_to_index(cols_di["id"])]
        if iid != "": Ids.append(iid)
    Ids = list(set(Ids))
    Ids.sort()
    
    # header 
    headers = tools.dict_keys(cols_di)
    
    f = open(output_file, "w")
    f.write(js_header)
    f.write(js_dataset.format(IDs = convert.list_to_text(Ids), \
                            header = convert.list_to_text(headers), \
                            plots = plots_text))    
    f.write(js_data1)
                        
    # values
    for row in df.data:
        iid = row[df.name_to_index(cols_di["id"])]
        if iid == "": continue
            
        values = ""
        for item in headers:
            if len(values) > 0:
                values += ","
            val = row[df.name_to_index(cols_di[item])]
            if type(val) == type(""):
                values += "'" + val + "'"
            elif type(val) == type(0.0):
                values += str('%.2f' % val)
            else:
                values += str(val)
        
        f.write("[" + values + "],")

    f.write(js_data2)
    f.write(js_function)
    f.close()
    
    return {"plots": plots_option}

def create_html(dataset, output_di, config):

    import paplot.subcode.tools as tools
    import paplot.prep as prep
    import os

    chart_txt = ""
    js_txt = ""

    for i in range(len(dataset["plots"])):
        chart_txt += html_chart_template.format(chart_id = dataset["plots"][i])
        js_txt += html_js_template.format(i = str(i), chart_id = dataset["plots"][i])
        if dataset["plots"][i] == "chart_brush":
            js_txt += html_js_brushed_template.format(i = str(i))
        
    f_template = open(os.path.dirname(os.path.abspath(__file__)) + "/templates/graph_qc.html")
    html_template = f_template.read()
    f_template.close()
    
    f_html = open(output_di["dir"] + "/" + output_di["html"], "w")
    f_html.write(
        html_template.format(project = output_di["project"], 
            title = output_di["title"], 
            data_js = output_di["js"],
            version = prep.version_text(),
            date = tools.now_string(),
            charts = chart_txt,
            js_add_div = js_txt,
            style = "../style/%s" % os.path.basename(tools.config_getpath(config, "style", "path", "default.js")),
        ))
    f_html.close()
    


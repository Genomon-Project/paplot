# -*- coding: utf-8 -*-
"""
Created on Wed Dec 02 17:43:52 2015

@author: okada

$Id: qc.py 118 2016-07-05 02:05:54Z aokada $
"""

def convert_tojs(input_file, output_file, positions, config):
    
    js_template = """var base = [
{data}
];
function get_data_base() {{return base;}}
"""
    import paplot.subcode.tools as tools
    
    # read
    header = []
    sept = tools.config_getstr(config, "merge_format_qc", "sept")
    comment = tools.config_getstr(config, "result_format_qc", "comment")
    
    names = {}
    for key in positions["must"]:
        names[positions["must"][key]] = key
    for key in positions["option"]:
        names[positions["option"][key]] = key
    
    data_text = ""
    for line in open(input_file):

        line = line.rstrip()
        if len(line.replace(sept, "")) == 0:
            continue
        
        if comment != "" and line.find(comment) == 0:
            continue
        
        if len(header) == 0:
            header = line.split(sept)
            continue
        
        data = line.split(sept)

        items = {}
        str_list = []
        for i in range(len(data)):
            if names[header[i]] == "id":
                str_list.append(names[header[i]])
            
            items[names[header[i]]] = data[i]
        
        keys = items.keys()
        keys.sort()
        item_text = "{"
        for key in keys:
            if key in str_list:
                item_text += key + ':"' + items[key] + '",'
            else:
                item_text += key + ':' + items[key] + ','
            
        data_text += item_text + "},\n"

    f = open(output_file, "w")
    f.write(js_template.format(data=data_text))
    f.close()

    return True

def create_html(output_html_dir, org_html, project_name, config):

    chart_template = """<div class="row" style="margin-top: 40px;">
    <div id="{chart}"><strong>{title}</strong><br></div>
</div>
"""
    import paplot.subcode.tools as tools
    import os
    
    f_template = open(os.path.dirname(os.path.abspath(__file__)) + "/templates/" + org_html)
    html_template = f_template.read()
    f_template.close()
    
    charts_text = ""
    if config.getboolean("qc", "chart_coverage") == True:
        charts_text += chart_template.format(chart = "chart_coverage", title = "depth coverage")
    
    if config.getboolean("qc", "chart_average") == True:
        charts_text += chart_template.format(chart = "chart_average", title = "depth average")
    
    if config.getboolean("qc", "chart_mapped") == True:
        charts_text += chart_template.format(chart = "chart_mapped", title = "mapped_reads/total_reads")

    if config.getboolean("qc", "chart_insert") == True:
        charts_text += chart_template.format(chart = "chart_insert", title = "mean_insert_size")
    
    if config.getboolean("qc", "chart_duplicate") == True:
        charts_text += chart_template.format(chart = "chart_duplicate", title = "duplicate_reads/total_reads")
    
    if config.getboolean("qc", "chart_length") == True:
        charts_text += chart_template.format(chart = "chart_length", title = "read_length_r1, read_length_r2")

    f_html = open(output_html_dir + "/" + org_html, "w")
    f_html.write(
        html_template.format(project = project_name, 
        version = tools.version_text(),
        date = tools.now_string(),
        charts = charts_text,
        style = "../style/%s" % os.path.basename(tools.config_getpath(config, "style", "path", "default.js")),
        ))
    f_html.close()


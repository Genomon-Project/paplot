# -*- coding: utf-8 -*-
"""
Created on Wed Dec 02 17:43:52 2015

@author: okada

$Id: prep.py 177 2016-10-24 04:23:59Z aokada $
"""

def copy_dir_lib(dst):
    import shutil
    import os
    import glob

    pattern = os.path.dirname(os.path.abspath(__file__)) + "/lib/*/*"
    li_files = glob.glob(pattern)

    for f in li_files:
        dst_dir = dst + "/" + os.path.basename(os.path.dirname(f))
        if os.path.exists(dst_dir) == False:
            os.mkdir(dst_dir)
        shutil.copy(f, dst_dir)

def copy_dir_js(dst):
    import shutil
    import os
    import glob

    pattern = os.path.dirname(os.path.abspath(__file__)) + "/js/*"
    li_files = glob.glob(pattern)
    
    for f in li_files:
        shutil.copy(f, dst)

def copy_dir_style(dst, config):
    
    import paplot.subcode.tools as tools
    import shutil
    import os
    import glob

    pattern = os.path.dirname(os.path.abspath(__file__)) + "/style/*"
    li_files = glob.glob(pattern)
    
    for f in li_files:
        shutil.copy(f, dst)
    
    # for option file
    option = tools.config_getpath(config, "style", "path")
    if len(option) > 0:
        shutil.copy(option, dst)

def copy_dir_layout(dst):
    import shutil
    import os
    import glob

    pattern = os.path.dirname(os.path.abspath(__file__)) + "/layout/*"
    li_files = glob.glob(pattern)
    
    for f in li_files:
        shutil.copy(f, dst)
        
def create_dirs(args_output_dir, project_name, config):
    import os
    
    output_dir = os.path.abspath(args_output_dir)
    if (os.path.exists(output_dir) == False):
        os.makedirs(output_dir)

    output_html_dir = output_dir + "/" + project_name
    if (os.path.exists(output_html_dir) == False):
        os.makedirs(output_html_dir)

    output_js_dir = output_dir + "/js"
    if (os.path.exists(output_js_dir) == False):
        os.makedirs(output_js_dir)
        
    output_lib_dir = output_dir + "/lib"
    if (os.path.exists(output_lib_dir) == False):
        os.makedirs(output_lib_dir)
        
    output_style_dir = output_dir + "/style"
    if (os.path.exists(output_style_dir) == False):
        os.makedirs(output_style_dir)

    output_layout_dir = output_dir + "/layout"
    if (os.path.exists(output_layout_dir) == False):
        os.makedirs(output_layout_dir)

    copy_dir_lib(output_lib_dir)
    copy_dir_js(output_js_dir)
    copy_dir_style(output_style_dir, config)
    copy_dir_layout(output_layout_dir)
    
    return output_html_dir

def _convert_index_item(jsonData):

    proj_template = """<h2>{proj}</h2>
<table style="margin-left:40px;">
{graphs}
</table>"""
    graph_templete = "<tr><td><img src='layout/{icon}'></td><td class='title'>{link}</td><td class='text'>...{overview}</td></tr>"
    link_templete = "<a class='plot' href='{proj}/{output_html}' target=_blank>{name}</a>"
    graph_templete_table = """<tr><td><img src="layout/folder.png"></td><td class="title">{name}</td><td class="text">...{overview}</td></tr>
    <tr><td colspan=3>
    <table style="margin-left:40px;"><tr>
        {td}
    </tr></table>
    </td></tr>"""
    graph_templete_td = "<td><img src='layout/{icon}'></td><td class='text'>{link}</td>"
    link_templete_td = "<a class='plot' href='{proj}/{output_html}' target=_blank>{sub_text}</a>"
    
    output = ""
    for data in jsonData:
        graphs_text = ""
        for graph in data["graphs"]:
            if graph["composite"] == True:
                td_text = ""
                for item in graph["items"]:
                    link_text = item["sub_text"] + ", No Data."
                    icon = "block.png"
                    if item["exists"]:
                        link_text = link_templete_td.format(proj = data["proj"], output_html = item["output_html"], sub_text = item["sub_text"])
                        icon = "bar_chart_1.png"
                    td_text += graph_templete_td.format(icon = icon, link = link_text)
                graphs_text += graph_templete_table.format(name = graph["name"], overview = graph["overview"], td = td_text)
            else:
                item = graph["items"][0]
                link_text = ""
                icon = "block.png"
                overview = "No Data."
                if item["exists"]:
                    link_text = link_templete.format(proj = data["proj"], output_html = item["output_html"], name = graph["name"])
                    icon = "bar_chart_1.png"
                    overview = graph["overview"]
                graphs_text += graph_templete.format(icon = icon, link = link_text, overview = overview)

        output += proj_template.format(proj = data["proj"], graphs = graphs_text)
        
    return output    
    
def _load_metadata(
    output_dir,
    output_html,
    project_name,
    name,
    overview,
    sub_text,
    composite,
    exists
    ):

    import json
    
    argData = {"proj": project_name, \
               "graphs": [{ "name": name, \
                   "overview": overview, \
                   "composite": composite, \
                   "items": [{"output_html":  output_html, "exists":  exists, "sub_text": sub_text}] \
               }]}
    try:
        jsonData = json.load(open(output_dir + "/meta.json"))
        
        # input args to jsonData
        find = False
        for data in jsonData:
            if data["proj"] != project_name: continue
                        
            for graph in data["graphs"]:
                if graph["name"] != name: continue
                for item in graph["items"]:
                    if item["output_html"] != output_html: continue
                    item["exists"] = exists                    
                    item["sub_text"] = sub_text
                    find = True
                    break

                if find == False:
                    graph["items"].append(argData["graphs"][0]["items"][0])
                    find = True
                break
            
            if find == False:
                data["graphs"].append(argData["graphs"][0])
                find = True
            break

        if find == False:
            jsonData.append(argData)
                
    except Exception:
        # create jsonData from args
        jsonData = [argData]
    
    #json.dump(jsonData, open(output_dir + "/meta.json", "w"))
    f = open(output_dir + "/meta.json", "w")
    f.writelines(json.dumps(jsonData, indent=2))
    f.close()
    
    return jsonData
    
def create_index(
    config,
    output_dir,
    output_html,
    project_name,
    name,
    overview = "",
    sub_text = "",
    composite = False,
    remarks = "",
    ):

    import paplot.subcode.tools as tools
    import os

    jsonData = _load_metadata(output_dir, output_html, project_name, name, overview, sub_text, composite, 
                os.path.exists(output_dir + "/" + project_name + "/" + output_html))
    
    link_text = _convert_index_item(jsonData)
    
    f_template = open(os.path.dirname(os.path.abspath(__file__)) + "/templates/index.html")
    html_template = f_template.read()
    f_template.close()
    
    if remarks == "":
        remarks = tools.config_getstr(config, "style", "remarks")
        
    f_html = open(output_dir + "/index.html", "w")
    f_html.write(
        html_template.format(
            version = version_text(),
            date = tools.now_string(),
            remarks = remarks,
            link = link_text
        )
    )
    f_html.close()


def _reload_metadata(output_dir):

    import json
    import os
    try:
        jsonData = json.load(open(output_dir + "/meta.json"))
        
        # input args to jsonData
        for data in jsonData:
            for graph in data["graphs"]:
                for item in graph["items"]:
                    if os.path.exists(output_dir + "/" + data["proj"] + "/" + item["output_html"]) == False:                    
                        graph["items"].remove(item)

                if len(graph["items"]) == 0:
                    data["graphs"].remove(graph)
            
            if len(data["graphs"]) == 0:
                jsonData.remove(data)
                
    except Exception:
        jsonData = []
    
    #json.dump(jsonData, open(output_dir + "/meta.json", "w"))
    f = open(output_dir + "/meta.json", "w")
    f.writelines(json.dumps(jsonData, indent=2))
    f.close()
    
    return jsonData
    
def recreate_index(
    config,
    output_dir,
    remarks = "",
    ):

    import paplot.subcode.tools as tools
    import os

    jsonData = _reload_metadata(output_dir)
    if len(jsonData) == 0:
        print("HTML file is not exists.")
        return
        
    link_text = _convert_index_item(jsonData)
    
    f_template = open(os.path.dirname(os.path.abspath(__file__)) + "/templates/index.html")
    html_template = f_template.read()
    f_template.close()
    
    if remarks == "":
        remarks = tools.config_getstr(config, "style", "remarks")
        
    f_html = open(output_dir + "/index.html", "w")
    f_html.write(
        html_template.format(
            version = version_text(),
            date = tools.now_string(),
            remarks = remarks,
            link = link_text
        )
    )
    f_html.close()

def version_text():
    from paplot import __version__
    return "paplot-" + __version__


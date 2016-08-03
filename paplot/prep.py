# -*- coding: utf-8 -*-
"""
Created on Wed Dec 02 17:43:52 2015

@author: okada

$Id: prep.py 144 2016-08-02 09:07:38Z aokada $
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

def create_index(output_dir, project_name, config):

    link_qc = """<li><a href="{project}/graph_qc.html" target=_blank>QC graphs</a>......Quality Control of bam.</li>
"""
    link_sv = """<li><a href="{project}/graph_sv.html" target=_blank>SV graphs</a>......Structural Variation.</li>
"""
    link_mut = """<li><a href="{project}/graph_mut.html" target=_blank>Mutation matrix</a>......Gene-sample mutational profiles.</li>
"""
    link_sv_nodata = """<li>SV graphs......No Data.</li>
"""
    link_mut_nodata = """<li>Mutation matrix......No Data.</li>
"""
    import paplot.subcode.tools as tools
    import os
    
    f_template = open(os.path.dirname(os.path.abspath(__file__)) + "/templates/index.html")
    html_template = f_template.read()
    f_template.close()
    
    link_text = ""
    if os.path.exists(output_dir + "/" + project_name + "/graph_qc.html") == True:
        link_text += link_qc.format(project = project_name)
    
    if os.path.exists(output_dir + "/" + project_name + "/graph_sv.html") == True:
        link_text += link_sv.format(project = project_name)
        
    elif os.path.exists(output_dir + "/" + project_name + "/data_sv.csv") == True:
        link_text += link_sv_nodata

    if os.path.exists(output_dir + "/" + project_name + "/graph_mut.html") == True:
        link_text += link_mut.format(project = project_name)
    
    elif os.path.exists(output_dir + "/" + project_name + "/data_mut.csv") == True:
        link_text += link_mut_nodata
        
    f_html = open(output_dir + "/index.html", "w")
    f_html.write(
        html_template.format(project = project_name, 
        version = tools.version_text(),
        date = tools.now_string(),
        remarks = tools.config_getstr(config, "style", "remarks"),
        link = link_text
        ))
    f_html.close()


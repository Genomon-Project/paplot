# -*- coding: utf-8 -*-
"""
Created on Wed Dec 02 17:43:52 2015

@author: okada

$Id: tools.py 46 2016-02-22 08:12:39Z aokada $
$Rev: 46 $
"""

def win_to_unix(win_path):
    import re
    
    return re.escape(win_path).replace("\\\\", "/").replace("\\\t", "/t").replace("\\\n", "/n").replace("\\\r", "/r").replace("\\", "")

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
    import shutil
    import os
    import glob

    pattern = os.path.dirname(os.path.abspath(__file__)) + "/style/*"
    li_files = glob.glob(pattern)
    
    for f in li_files:
        shutil.copy(f, dst)
    
    # for option file
    option = config_getpath(config, "style", "path")
    if len(option) > 0:
        shutil.copy(option, dst)

def version_text():
    f = __file__.replace("\\", "/")
    sept = f.split('/')
    return sept[len(sept) - 3]

def config_getint(config, section, item):
    
    value = -1
    if config.has_option(section, item) == True:
        value = config.getint(section, item)

    return value

def config_getstr(config, section, item):
    
    value = ""
    if config.has_option(section, item) == True:
        value = config.get(section, item)

    return value
    
def config_getpath(config, section, item, default=""):
    import os
    
    path = ""
    if config.has_option(section, item) == True:
        path = win_to_unix(config.get(section, item))
        if len(path) > 0 and os.path.exists(path) == False:
            print "can not find file. [%s] %s=%s, so use default." % (section, item, path)
            path = ""
            
    if len(path) == 0 and len(default) > 0:
        path = os.path.dirname(os.path.abspath(__file__)) + "/" + default
        
    return path
        
        
def getID(result_file, mode, config):
    
    import os
    [sec_in, sec_out] = get_section(mode)

    return os.path.basename(result_file).replace(config.get(sec_in, "suffix"), "")

def get_section(mode):
    
    if mode.lower() == "sv":
        section_in = "result_format_sv"
        section_out = "merge_format_sv"
        
    elif mode.lower() == "mutation":
        section_in = "result_format_mutation"
        section_out = "merge_format_mutation"
    
    elif mode.lower() == "qc":
        section_in = "result_format_qc"
        section_out = "merge_format_qc"
    
    return [section_in, section_out]    
    
def load_config(config_file):
    
    import os
    import ConfigParser

    if len(config_file) == 0:
        config_file = os.path.dirname(os.path.abspath(__file__)) + "/../config/paplot.cfg"
        config_file = os.path.abspath(config_file)
    
    if os.path.exists(config_file) == False:
        return [None, config_file]
        
    config = ConfigParser.RawConfigParser()
    config.read(config_file)
    
    return [config, config_file]

def now_string():
    import datetime
    
    return datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    
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

    copy_dir_lib(output_lib_dir)
    copy_dir_js(output_js_dir)
    copy_dir_style(output_style_dir, config)
    
    return output_html_dir
    
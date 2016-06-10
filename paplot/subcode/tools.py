# -*- coding: utf-8 -*-
"""
Created on Wed Dec 02 17:43:52 2015

@author: okada

$Id: tools.py 109 2016-06-02 06:59:42Z aokada $
"""
   
def config_getboolean(config, section, item):
    
    value = False
    if config.has_option(section, item) == True:
        value = config.getboolean(section, item)

    return value
    
def config_getint(config, section, item):
    
    value = -1
    if config.has_option(section, item) == True:
        value = config.getint(section, item)

    return value

def config_getpath(config, section, item, default=""):
    import os
    
    path = ""
    if config.has_option(section, item) == True:
        path = win_to_unix(config.get(section, item).strip())
        if len(path) > 0 and os.path.exists(path) == False:
            print ("can not find file. [%s] %s=%s, so use default." % (section, item, path))
            path = ""
            
    if len(path) == 0 and len(default) > 0:
        path = os.path.dirname(os.path.abspath(__file__)) + "/" + default
        
    return path
    
def config_getstr(config, section, item):
    
    value = ""
    if config.has_option(section, item) == True:
        value = config.get(section, item).strip().replace('"', '')
        
    return value

def config_getoptions(config, section, item_startswith):
    
    li = []
    for item in config.options(section):
        if item.startswith(item_startswith):
            li.append(item)
        
    return li
    
def config_set(config, section, item, value):

    if config.has_section(section) == False:
        config.add_section(section)
        
    config.set(section, item, value)

    return value
    
def get_IDlist(file_list, suffix):
    
    import os
    ids = []
    for f in file_list:
        ids.append(os.path.basename(f).replace(suffix, ""))
    
    return ids
    
def get_inputlist(pattern):
    import glob
    
    inputs = pattern.lstrip("'").lstrip('"').rstrip("'").rstrip('"').split(",")

    all_list = []
    for item in inputs:
        all_list.extend(glob.glob(win_to_unix(item).lstrip(" ").rstrip(" ")))
    
    return list(set(all_list))

def get_section(mode):
    section_in = ""
    section_out = ""
    
    if mode.lower() == "sv":
        section_in = "result_format_sv"
        section_out = "merge_format_sv"
        
    elif mode.lower() == "mutation":
        section_in = "result_format_mutation"
        section_out = "merge_format_mutation"
    
    elif mode.lower() == "summary":
        section_in = "result_format_qc"
        section_out = "merge_format_qc"

    elif mode.lower() == "qc":
        section_in = "result_format_qc"
        section_out = "merge_format_qc"
        
    return [section_in, section_out]    
    
def load_config(config_file):
    
    import os
    import sys
    if sys.version_info.major == 3:
        import configparser as cp
    else:
        import ConfigParser as cp

    if len(config_file) == 0:
        name = version_text().split("-")[0]        
        config_file = os.path.dirname(os.path.abspath(__file__)) + "/../../config/" + name + ".cfg"
        config_file = os.path.abspath(config_file)
    
    if os.path.exists(config_file) == False:
        return [None, config_file]
        
    config = cp.RawConfigParser()
    config.read(config_file)

    return [config, config_file]

def now_string():
    import datetime
    
    return datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    

def print_conf(config, conf_file, name):

    if config == None:
        return 
    
    hello = "hello " + name + " !!!"
    print("*" * len(hello))
    print(hello)
    print("*" * len(hello))
    print("\nconfig file:%s" % conf_file)
    
    for section in config.sections():
        print ("[%s]" % section)
        for item in config.items(section):
            print (item)
        
def version_text():
    f = __file__.replace("\\", "/")
    sept = f.split('/')
    
    for base in sept:
        if base.rfind(".egg") > 0:
            if len(base) == base.rfind(".egg") + len(".egg"):
                return base.replace(".egg", "")
            
    return sept[len(sept) - 3]


def win_to_unix(win_path):
    import re
    
    return re.escape(win_path).replace("\\\\", "/").replace("\\\t", "/t").replace("\\\n", "/n").replace("\\\r", "/r").replace("\\\f", "/f").replace("\\", "")

           
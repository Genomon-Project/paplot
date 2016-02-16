# -*- coding: utf-8 -*-
"""
Created on Wed Dec 02 17:43:52 2015

@author: okada

$Id: tools.py 40 2016-02-16 08:58:53Z aokada $
$Rev: 40 $
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

def copy_dir_style(dst):
    import shutil
    import os
    import glob

    pattern = os.path.dirname(os.path.abspath(__file__)) + "/style/*"
    li_files = glob.glob(pattern)
    
    for f in li_files:
        shutil.copy(f, dst)
        
def version_text():
    f = __file__.replace("\\", "/")
    sept = f.split('/')
    return sept[len(sept) - 3]

def config_getint(config, section, item):
    
    value = -1
    if config.has_option(section, item) == True:
        value = config.getint(section, item)

    return value
        
def load_data(data_file, ID, mode, config):
    
    import pandas
    import os
    
    if os.path.getsize(data_file) == 0:
        print "skip blank file %s" % data_file
        return []
    
    [section_in, section_out] = get_section(mode)
    
    # data read
    header = config.getboolean(section_in, "header")
    sept = config.get(section_in, "sept")
    titles = []
    try:
        if header == False:
            data = pandas.read_csv(data_file, header = None, sep = sept, engine = "python")
            for i in range(len(data.iloc[0])):
                titles.append("v%02d" % i)
            data.columns = titles
        else:
            data = pandas.read_csv(data_file, sep = sept, engine = "python")
            titles = data.columns.get_values()

    except StopIteration:
        print "skip no data file %s" % data_file
        return []
    except Exception as e:
        print "failure open data %s, %s" % (data_file, e.message)
        return []
        
    if config_getint(config, section_in, "col_pos_ID") < 0:
        tmp = []
        for i in range(0,len(data[titles[0]])):
            tmp.append(ID)
        df_addition_col = pandas.DataFrame([tmp]).T
        df_addition_col.columns =["ID"]
        data_cat = pandas.concat([df_addition_col, data], axis=1)
    
    else:
        data_cat = data

    return data_cat
    
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
    
    elif mode.lower() == "summary":
        section_in = "result_format_summary"
        section_out = "merge_format_summary"
    
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
    
def create_dirs(args_output_dir, project_name):
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
    copy_dir_style(output_style_dir)
    
    return output_html_dir
    
# -*- coding: utf-8 -*-
"""
Created on Wed Dec 02 17:43:52 2015

@author: okada

$Id: prep.py 57 2016-02-26 08:25:17Z aokada $
$Rev: 57 $
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
    
    from paplot import tools
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
    
       
def print_conf(config, conf_file):
    print ("**********************")
    print ("   hello paplot !!!")
    print ("**********************")
    print ("\nconfig file:%s" % conf_file)
    
    for section in config.sections():
        print ("[%s]" % section)
        for item in config.items(section):
            print (item)

def load_data(data_file, ID, mode, config):
    
    from paplot import tools
    from paplot import data_frame
    
    [section_in, section_out] = tools.get_section(mode)
    
    # data read
    header = config.getboolean(section_in, "header")
    if header < 0:
        header = 0
    sept = config.get(section_in, "sept")        
    
    try:
        df = data_frame.load_file(data_file, sept = sept, header = header)
        
    except Exception as e:
        print ("failure open data %s, %s" % (data_file, e.message))
        return None

    if df == None:
        return None
        
    if len(df.data) == 0:
        return df
    
    # titles
    titles = df.title
    if len(titles) == 0:
        for i in range(len(df.data[0])):
            titles.append("v%02d" % i)
        df.title = titles

    # ID column
    if tools.config_getint(config, section_in, "col_pos_ID") < 0:
        cat_item = []
        for i in range(0,len(df.data)):
            cat_item.append(ID)

        li = ["ID"]
        li.extend(df.title)
        df.concat([cat_item, df.data], li) 

    return df
    
def set_header_info(mode, config):
    
    from paplot import tools
    
    [section_in, section_out] = tools.get_section(mode)
    info = {}

    
    cor = 0
    if tools.config_getint(config, section_in, "col_pos_ID") < 0:
        cor = 1
            
    if mode == "sv":
        
        info = {"ID": tools.config_getint(config, section_in, "col_pos_ID") + cor, \
            "chr1":tools.config_getint(config, section_in, "col_pos_chr1") + cor, \
            "chr2":tools.config_getint(config, section_in, "col_pos_chr2") + cor, \
            "break1":tools.config_getint(config, section_in, "col_pos_start") + cor, \
            "break2":tools.config_getint(config, section_in, "col_pos_end") + cor, \
            "type":tools.config_getint(config, section_in, "col_pos_type") + cor, \
            "gene_name1":tools.config_getint(config, section_in, "col_pos_gene_name1") + cor, \
            "gene_name2":tools.config_getint(config, section_in, "col_pos_gene_name2") + cor, \
            "direction1":tools.config_getint(config, section_in, "col_pos_dir1") + cor, \
            "direction2":tools.config_getint(config, section_in, "col_pos_dir2") + cor
            }

    elif mode == "mutation":
        info = {"ID":tools.config_getint(config, section_in, "col_pos_chr1") + cor, \
            "chr":tools.config_getint(config, section_in, "col_pos_start") + cor, \
            "start":tools.config_getint(config, section_in, "col_pos_end") + cor, \
            "end":tools.config_getint(config, section_in, "col_pos_ID") + cor
            }
        
    elif mode == "qc":
        info = {"ID": tools.config_getint(config, section_in, "col_pos_ID") + cor, \
            "duplicate_reads":tools.config_getint(config, section_in, "col_pos_duplicate_reads") + cor, \
            "mapped_reads":tools.config_getint(config, section_in, "col_pos_mapped_reads") + cor, \
            "total_reads":tools.config_getint(config, section_in, "col_pos_total_reads") + cor, \
            "average_depth":tools.config_getint(config, section_in, "col_pos_average_depth") + cor, \
            "mean_insert_size":tools.config_getint(config, section_in, "col_pos_mean_insert_size") + cor, \
            "ratio_2x":tools.config_getint(config, section_in, "col_pos_ratio_2x") + cor, \
            "ratio_10x":tools.config_getint(config, section_in, "col_pos_ratio_10x") + cor, \
            "ratio_20x":tools.config_getint(config, section_in, "col_pos_ratio_20x") + cor, \
            "ratio_30x":tools.config_getint(config, section_in, "col_pos_ratio_30x") + cor, \
            "read_length_r1":tools.config_getint(config, section_in, "col_pos_read_length_r1") + cor, \
            "read_length_r2":tools.config_getint(config, section_in, "col_pos_read_length_r2") + cor            
            }
    
    info_sort = sorted(info.items(), key=lambda x: x[1])
    
    usecols = []
    title = []
    for i in range(len(info_sort)):
        usecols.append(info_sort[i][1])
        title.append(info_sort[i][0])
        
    return [usecols, title]
    
def merge_result(files, output_file, mode, config):

    from paplot import tools
    import os
    
    first = True
    
    for file_path in files:
        if os.path.exists(file_path) == False:
            print ("[WARNING] file is not exist. %s" % file_path)
            continue

        ID = tools.getID(file_path, mode, config) 
        df = load_data(file_path, ID, mode, config)
        
        if df == None:
            print ("failure read file %s" % file_path)
            continue
            
        if len(df.data) == 0:
            print ("skip blank file %s" % file_path)
            continue
            
        if first == True:
            df.save(output_file, header = True, mode = "w")
            first = False
        else:
            df.save(output_file, header = False, mode = "a")


def extract_result(data_file, output_file, mode, config):

    from paplot import data_frame
    
    [usecols, title] = set_header_info(mode, config)
    
    # data read
    try:
        if len(usecols) > 0:
            df = data_frame.load_file(data_file, sept = ",", header = 1, usecol = usecols)
            df.title = title
        else:
            df = data_frame.load_file(data_file, sep = ",", header = 1)
            
        df.save(output_file, header = True, mode = "w")
    
    except IndexError as e:
        print ("column position is invalid. check your config file.")
        return False
    except Exception as e:
        print ("failure open data %s, %s" % (data_file, e.message))
        return False
        
    return True
    
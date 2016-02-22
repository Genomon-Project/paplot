# -*- coding: utf-8 -*-
"""
Created on Wed Dec 02 17:43:52 2015

@author: okada

$Id: prep.py 46 2016-02-22 08:12:39Z aokada $
$Rev: 46 $
"""

def print_conf(config, conf_file):
    print "**********************"
    print "   hello paplot !!!"
    print "**********************"
    print "\nconfig file:%s" % conf_file
    
    for section in config.sections():
        print "[%s]" % section
        for item in config.items(section):
            print item

def load_data(data_file, ID, mode, config):
    
    from paplot import tools
    import pandas
    import os
    
    if os.path.getsize(data_file) == 0:
        print "skip blank file %s" % data_file
        return []
    
    [section_in, section_out] = tools.get_section(mode)
    
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
        
    if tools.config_getint(config, section_in, "col_pos_ID") < 0:
        tmp = []
        for i in range(0,len(data[titles[0]])):
            tmp.append(ID)
        df_addition_col = pandas.DataFrame([tmp]).T
        df_addition_col.columns =["ID"]
        data_cat = pandas.concat([df_addition_col, data], axis=1)
    
    else:
        data_cat = data

    return data_cat
    
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
    
    for result_file in files:
        if os.path.exists(result_file) == False:
            print "[WARNING] file is not exist. %s" % result_file
            continue

        ID = tools.getID(result_file, mode, config) 
        data = load_data(result_file, ID, mode, config)
        
        if len(data) == 0:
            continue
            
        if first == True:
            data.to_csv(output_file, index = False, header = True, mode = "w")
            first = False
        else:
            data.to_csv(output_file, index = False, header = False, mode = "a")


def extract_result(data_file, output_file, mode, config):

    import pandas
    
    [usecols, title] = set_header_info(mode, config)
    
    # data read
    try:
        if len(usecols) > 0:
            data = pandas.read_csv(data_file, usecols=usecols, sep = ",", engine = "python")
            data.columns = title
        else:
            data = pandas.read_csv(data_file, sep = ",", engine = "python")
            
        data.to_csv(output_file, index = False, header = True, mode = "w")
        
    except StopIteration:
        print "skip no data file %s" % data_file
        return False
    except Exception as e:
        print "failure open data %s, %s" % (data_file, e.message)
        return False
        
    return True
    
# -*- coding: utf-8 -*-
"""
Created on Wed Dec 02 17:43:52 2015

@author: okada

$Id: merge.py 204 2017-08-02 08:23:55Z aokada $
"""

from . import tools

def load_potisions(mode, config):

    [section_in, section_out] = tools.get_section(mode)
    header = tools.config_getboolean(config, section_in, "header")
    
    must = {}
    opts = {}
    for option in config.options(section_in):
        param = ""
        if option.startswith("col_"):
            param = option.replace("col_", "")
        
        if len(param) > 0:
            value = config.get(section_in, option)
            if value == "":
                continue
            
            if param.startswith("opt_"):
                if header == True:
                    opts[param.replace("opt_", "")] = value
                else:
                    opts[param.replace("opt_", "")] = config.getint(section_in, option)
            else:
                if header == True:
                    must[param] = value
                else:
                    must[param] = config.getint(section_in, option)
                
    return {"must": must, "option": opts}
    
def _load_option(mode, config):

    [section_in, section_out] = tools.get_section(mode)
    
    # data read
    header = config.getboolean(section_in, "header")
    if header < 0:
        header = 0
    sept = config.get(section_in, "sept").replace("\\t", "\t").replace("\\n", "\n").replace("\\r", "\r")
    comment = tools.config_getstr(config, section_in, "comment")
    lack = tools.config_getstr(config, section_out, "lack_column_complement")
    suffix = tools.config_getstr(config, section_in, "suffix")
    suffix_filt = tools.config_getstr(config, section_in, "suffix_filt")
    
    # return option dict
    return {"header": header, "sept": sept, "comment": comment, "lack": lack, "suffix": suffix, "suffix_filt": suffix_filt}
    
def _merge_metadata(files, option):

    import os

    # read all file's meta-data
    meta_data = []
    headers = []
    for file_path in files:
        if len(option["comment"]) == 0:
            break
        
        for line in open(file_path):
            line = line.rstrip("\r\n")
            if len(line) == 0:
                continue
            
            if line.find(option["comment"]) == 0:
                data = line.split(":")
                if len(data) < 2:
                    continue
                
                meta_data.append([data[0].replace(" ", ""), data[1].strip(), file_path])
                headers.append(data[0].replace(" ", ""))
            else:
                break
    
    # merge meta-data
    headers = list(set(headers))
    headers.sort()
    meta_text = ""
    for header in headers:
        values = {}
        for meta in meta_data:
            if meta[0] == header:
                if (meta[1] in values) == False:
                    values[meta[1]] = []
                values[meta[1]].append(meta[2])
                
        for key in values:
            meta_text += header + ":" + key
            if len(values[key]) != len(files):
                f_text = ""
                for f in values[key]:
                    if len(f_text) > 0:
                        f_text += ";"
                    f_text += os.path.basename(f).replace(option["suffix"], "").replace(option["suffix_filt"], "")
                meta_text += ":" + f_text
            meta_text += "\n"
    
    return meta_text

def _merge_title(files, mode, option, config):

    if option["header"] == False:
        return []
        
    # titles
    merged_title = []
    for file_path in files:
        title = []
        for line in open(file_path):
            
            line = line.rstrip("\r\n")
            if len(line.replace(option["sept"], "")) == 0:
                continue
            
            if len(option["comment"]) > 0 and line.find(option["comment"]) == 0:
                continue
                
            title = line.split(option["sept"])
            break
        
        for col in title:
            if (col in merged_title) == False:
                merged_title.append(col)
    
    return merged_title.sort()

def merge_result(files, ids, output_file, mode, config, extract = False):

    [section_in, section_out] = tools.get_section(mode)
    
    if tools.config_getboolean(config, section_in, "header") == True:
        return with_header(files, ids, output_file, mode, config, extract)
    else:
        return with_noheader(files, ids, output_file, mode, config, extract)
    
def with_header(files, ids, output_file, mode, config, extract = False):

    def calc_map(header, all_header):
        mapper = [-1]*len(all_header)
        for i in range(len(all_header)):
            if all_header[i] in header:
                mapper[i] = header.index(all_header[i])
            else:
                mapper[i] = -1
        return mapper
        
    import os

    if len(files) == 0:
        return {}
        
    for file_path in files:
        if os.path.exists(file_path) == False:
            print ("[ERROR] file is not exist. %s" % file_path)
            files.remove(file_path)
            continue 
    
    option = _load_option(mode, config)
    if option["header"] == False:
        print ("[ERROR] header is necessary for this function.")
        return {}
        
    meta_text = _merge_metadata(files, option)

    positions = load_potisions(mode, config)
    
    if extract == False:
        titles = _merge_title(files, mode, option, config)
    else:
        titles = []
        for key in tools.dict_keys(positions["must"]):
            titles.append(positions["must"][key])

        for key in tools.dict_keys(positions["option"]):
            titles.append(positions["option"][key])

    # update positions to merged title
    if ("id" in positions["option"]) == False:
        positions["option"]["id"] = "id"
    if (positions["option"]["id"] in titles) == False:
        titles.insert(0, positions["option"]["id"])
    
    # write meta-data to file
    f = open(output_file + ".tmp", mode = "w")
    f.write(meta_text)
    f.write(option["sept"].join(titles))
    f.write("\n")
    
    for idx in range(len(files)):
        file_path = files[idx]
        
        header = []
        mapper = []
        lines = []
        lines_count = 0
        for line in open(file_path):
            line = line.rstrip("\r\n")
            if len(line.replace(option["sept"], "")) == 0:
                continue
            
            if len(option["comment"]) > 0 and line.find(option["comment"]) == 0:
                continue
            
            if len(header) == 0:
                header = line.split(option["sept"])
                mapper = calc_map(header, titles)
                continue
            
            data = line.split(option["sept"])
            sort_data = []
            for i in range(len(titles)):
                if mapper[i] < 0:
                    if titles[i] == positions["option"]["id"]:
                        sort_data.append(ids[idx])
                    else:
                        sort_data.append(option["lack"])
                else:
                    sort_data.append(data[mapper[i]])
            
            lines.append(option["sept"].join(sort_data) + "\n")
            lines_count += 1
            
            if (lines_count > 10000):
                f.writelines(lines)
                lines = []
                lines_count = 0

        if (lines_count > 0):
            f.writelines(lines)
        
    f.close()

    if os.path.exists(output_file):
        os.remove(output_file)
        
    os.rename(output_file + ".tmp", output_file)
    return positions

def with_noheader(files, ids, output_file, mode, config, extract = False):

    import os

    if len(files) == 0:
        return {}
        
    for file_path in files:
        if os.path.exists(file_path) == False:
            print ("[ERROR] file is not exist. %s" % file_path)
            files.remove(file_path)
            continue 
    
    option = _load_option(mode, config)
    if option["header"] == True:
        print ("[ERROR] this is function for no-header data.")
        return {}
        
    meta_text = _merge_metadata(files, option)
    positions = load_potisions(mode, config)

    usecols = []
    for key in positions["must"]:
        usecols.append(positions["must"][key])
            
    for key in positions["option"]:
        usecols.append(positions["option"][key])
    
    add_id = False
    if ("id" in positions["option"]) == False:
        add_id = True
    
    
    # write meta-data to file
    f = open(output_file + ".tmp", mode = "w")
    f.write(meta_text)
    
    titles = []
    for idx in range(len(files)):
        file_path = files[idx]

        lines = []
        lines_count = 0
        for line in open(file_path):
            line = line.rstrip("\r\n")
            if len(line.replace(option["sept"], "")) == 0:
                continue
            
            if len(option["comment"]) > 0 and line.find(option["comment"]) == 0:
                continue
            
            data = line.split(option["sept"])
            
            # header
            if titles == []:
                if add_id == True:
                    titles.append("id")
                    
                for i in range(1, len(data)+1):
                    if extract == True:
                        if i in usecols:
                            titles.append("v%d" % i)
                    else:
                        titles.append("v%d" % i)

                lines.append(option["sept"].join(titles) + "\n")
                
            # add id
            cat_data = []
            if add_id == True:
                cat_data.append(ids[idx])
                
            for i in range(1, len(data)+1):
                if extract == True:
                    if i in usecols:
                        cat_data.append(data[i-1])
                else:
                    cat_data.append(data[i-1])
            
            lines.append(option["sept"].join(cat_data) + "\n")
            lines_count += 1
            
            if (lines_count > 10000):
                f.writelines(lines)
                lines = []
                lines_count = 0

        if (lines_count > 0):
            f.writelines(lines)
        
    f.close()
    if os.path.exists(output_file):
        os.remove(output_file)
    os.rename(output_file + ".tmp", output_file)
    
    # update positions
    for key in positions["must"]:
        positions["must"][key] = "v%d" % (positions["must"][key])
            
    for key in positions["option"]:
        positions["option"][key] = "v%d" % (positions["option"][key])
        
    if ("id" in positions["option"]) == False:
        positions["option"]["id"] = "id"

    return positions

def position_to_dict(position):
    di = {}
    for key in position["must"]:
        di[key] = position["must"][key]
    for key in position["option"]:
        di[key] = position["option"][key]
    return di
        
if __name__ == "__main__":
    pass

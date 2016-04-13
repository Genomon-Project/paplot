# -*- coding: utf-8 -*-
"""
Created on Wed Dec 02 17:43:52 2015

@author: okada

$Id: merge.py 82 2016-04-11 08:48:18Z aokada $
"""

import tools
import data_frame

def load_potisions(mode, config):

    [section_in, section_out] = tools.get_section(mode)
    header = tools.config_getboolean(config, section_in, "header")
    
    must = {}
    opts = {}
    for option in config.options(section_in):
        param = ""
        if option.find("col_") == 0:
            param = option.replace("col_", "")
        
        if len(param) > 0:
            if param.find("opt_") == 0:
                if header == True:
                    opts[param.replace("opt_", "")] = config.get(section_in, option)
                else:
                    opts[param.replace("opt_", "")] = config.getint(section_in, option)
            else:
                if header == True:
                    must[param] = config.get(section_in, option)
                else:
                    must[param] = config.getint(section_in, option)
                
    return {"must": must, "option": opts}
    
def _load_option(mode, config):

    [section_in, section_out] = tools.get_section(mode)
    
    # data read
    header = config.getboolean(section_in, "header")
    if header < 0:
        header = 0
    sept = config.get(section_in, "sept")
    comment = tools.config_getstr(config, section_in, "comment")
    lack = tools.config_getstr(config, section_out, "lack_column_complement")
    
    # return option dict
    return {"header": header, "sept": sept, "comment": comment, "lack": lack}
    
def _merge_metadata(files, option):

    # read all file's meta-data
    meta_data = []
    headers = []
    for file_path in files:
        if len(option["comment"]) == 0:
            break
        
        for line in open(file_path):
            line = line.rstrip()
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
                if values.has_key(meta[1]) == False:
                    values[meta[1]] = []
                values[meta[1]].append(meta[2])
                
        for key in values:
            meta_text += header + ":" + key
            if len(values[key]) != len(files):
                f_text = ""
                for f in values[key]:
                    if len(f_text) > 0:
                        f_text += ","
                    f_text += f
                meta_text += ":" + f_text
            meta_text += "\n"
    
    return meta_text

def _merge_title(files, option):

    if option["header"] == False:
        return []
        
    # titles
    titles = []
    for file_path in files:
        try:
            title = data_frame.load_title(file_path, sept = option["sept"], header = option["header"], comment = option["comment"])
        except Exception as e:
            print ("failure open data %s, %s" % (file_path, e.message))
            continue
        
        for col in title:
            if (col in titles) == False:
                titles.append(col)
    
    return titles

def merge_result(files, ids, output_file, mode, config):

    import os

    if len(files) == 0:
        return {}
        
    for file_path in files:
        if os.path.exists(file_path) == False:
            print ("[WARNING] file is not exist. %s" % file_path)
            files.remove(file_path)
            continue 
    
    option = _load_option(mode, config)
    meta_text = _merge_metadata(files, option)
    titles = _merge_title(files, option)
    positions = load_potisions(mode, config)

    # update positions to merged title
    if option["header"] == True:
        if ("id" in positions["option"]) == False:
            positions["option"]["id"] = "id"
        if (positions["option"]["id"] in titles) == False:
            titles.insert(0, positions["option"]["id"])

    else:
        add_ID = False
        if ("id" in positions["option"]) == False:
            add_ID = True

            for key in positions["must"]:
                positions["must"][key] += 1
            for key in positions["option"]:
                positions["option"][key] += 1
            positions["option"]["id"] = 0

    # write meta-data to file
    f = open(output_file, mode = "w")
    f.write(meta_text)
            
    first = True
    column_num = []
    
    for idx in range(len(files)):
        file_path = files[idx]
        
        try:
            df = data_frame.load_file(file_path, sept = option["sept"], header = option["header"], comment = option["comment"])
            
        except Exception as e:
            print ("failure open file %s, %s" % (file_path, e.message))
            continue
        
        if df == None:
            print ("failure read file %s" % file_path)
            continue
            
        if len(df.data) == 0:
            print ("skip blank file %s" % file_path)
            continue
        
        ### add lack of data colmuns
        if option["header"] == True:
            new_data = []
            for t in titles:
                if (t in df.title) == True:
                    new_data.append(df.column(t))
                    continue
                
                cat_item = []
                for i in range(0,len(df.data)):
                    if t == positions["option"]["id"]:
                        cat_item.append(ids[idx])
                    else:
                        cat_item.append(option["lack"])
        
                new_data.append(cat_item)
                
            df.concat(new_data, titles)
        
        else:        
            column_num.append([file_path, len(df.data[0])])
            for i in range(len(df.data[0])):
                df.title.append("v%02d" % i)
        
            # ID column
            if add_ID == True:
                cat_item = []
                for i in range(0,len(df.data)):
                    cat_item.append(ids[idx])

                li = ["id"]
                li.extend(df.title)
                df.concat([cat_item, df.data], li)

        # replace "," -> ";"
        df.replace(",", ";")
        
        # write to file
        lines = []
        if first == True:
            title_text = ""
            for i in range(len(df.title)):
                if i > 0:
                    title_text += ","
                title_text += str(df.title[i])
            
            lines.append(title_text + "\n")
            first = False
            
        for row in df.data:
            row_text = ""
            for i in range(len(row)):
                if i > 0:
                    row_text += ","
                row_text += str(row[i])
        
            lines.append(row_text + "\n")
            
        f.writelines(lines)
        
    f.close()
    
    # warning message
    # no header and different columns num
    if option["header"] == False:
        cols = []
        for item in column_num:
            cols.append(item[1])
        li = list(set(cols))
        if len(li) > 1:
            print("[WARNING] merged files, different in columns number with no header.")
            for item in column_num:
                print("%d columns: %s" % (item[1], item[0]))
    
    return positions
      
def header_info(data_file, colpos, mode, data_options):

    [section_in, section_out] = tools.get_section(mode)
    
    try:
        title = data_frame.load_title(data_file, sept = data_options["sept"], header = data_options["header"], comment = data_options["comment"])
    except Exception as e:
        print ("failure open file %s, %s" % (data_file, e.message))
        return [[],[]]
    
    info = {}
    for key in colpos["must"]:
        if type(colpos["must"][key]) == type(""):
            if (colpos["must"][key] in title) == False:
                print ("column header '" + str(colpos["must"][key]) + "' is none. check your config file.")
                return [[],[]]
        
            info[key] = title.index(colpos["must"][key])
            
        elif type(colpos["must"][key]) == type(0):
            info[key] = colpos["must"][key]
            
    for key in colpos["option"]:
        if type(colpos["option"][key]) == type(""):
            if (colpos["option"][key] in title) == False: continue
        
            info[key] = title.index(colpos["option"][key])
            
        elif type(colpos["option"][key]) == type(0):
            info[key] = colpos["option"][key]
            
        
    info_sort = sorted(info.items(), key=lambda x: x[1])

    usecols = []
    title = []
    for i in range(len(info_sort)):
        usecols.append(info_sort[i][1])
        title.append(info_sort[i][0])
    
    return [usecols, title]
    
def extract_result(data_file, output_file, colpos, mode, config):
    # options read
    data_options = {"sept": ',', "header": True, "comment": '#'}
    [usecols, title] = header_info(data_file, colpos, mode, data_options)
    
    # data read
    try:
        if len(usecols) > 0:
            df = data_frame.load_file(data_file, sept = ",", header = 1, usecol = usecols)
            df.title = title
        else:
            return False

        df.save(output_file, header = True, mode = "w")
    
    except IndexError as e:
        print ("column position is invalid. check your config file.")
        return False
    except Exception as e:
        print ("failure open file %s, %s" % (data_file, e.message))
        return False
        
    return True

if __name__ == "__main__":
    pass

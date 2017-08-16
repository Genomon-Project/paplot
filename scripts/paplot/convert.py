# -*- coding: utf-8 -*-
"""
Created on Thu May 12 12:34:57 2016

@author: okada

$Id: convert.py 208 2017-08-16 06:16:25Z aokada $
"""
import paplot.subcode.tools as tools

def prohibition(text):
    import re
    new_text = re.sub(r'[\'"/;:\[\] ]', "_", text)
    if re.match(r'^[0-9]', new_text):
        new_text = "_" + new_text
    
    return new_text

def list_prohibition(li):

    li_p = []
    for item in li:
        li_p.append(prohibition(item))

    return li_p

def value_to_index(li, value, default):
    for i in range(len(li)):
        if li[i] == value:
            return i
    
    return default

def list_to_text(li):
    text = ""
    for item in li:
        text += "'" + str(item) + "',"
    
    return text
    
def text_to_list(text, sep):
    splt = []
    if sep == "": splt.append(text)
    else: splt = text.split(sep)
    
    li = []
    for item in splt:
        value = item.strip().rstrip("\r\n")
        if value != "":
            li.append(value)
    return li

def fnmatch_list(target, li):
    import fnmatch
    for value in li:
        if fnmatch.fnmatch(target, value):
            return True
    return False
        
def group_list(colmun, mode, name, config):

    import paplot.color as color
    
    option_input = ""

    if mode == "mutation":
        option_input = "result_format_mutation"
    elif mode == "ca":
        option_input = "result_format_ca"
    else:
        return []
    
    sept = tools.config_getstr(config, option_input, "sept_%s" % name)
    limited_list = text_to_list(tools.config_getstr(config, mode, "limited_%s" % name), ",")
    nouse_list = text_to_list(tools.config_getstr(config, mode, "nouse_%s" % name), ",")

    funcs = []
    for row in colmun:
        splt = []
        if sept == "": splt.append(row)
        else: splt = row.split(sept)
        
        for func in splt:
            func = func.strip()
            
            if func == "":
                continue
            
            if len(limited_list) > 0:
                #if (func in limited_list) == False:
                if fnmatch_list(func, limited_list) == False:
                    continue

            #if func in nouse_list:
            if fnmatch_list(func, nouse_list):
                continue
            funcs.append(func)
            
    # sort list
    funcs = list(set(funcs))
    funcs.sort() 
    
    color_list = {};
    for f in tools.config_getstr(config, mode, "%s_color" % name).split(","):
        if len(f) == 0: continue
        cols = text_to_list(f, ":")
        if len(cols) >= 2:
            color_list[cols[0]] = color.name_to_value(cols[1])
    
    color_list = color.create_color_dict(funcs, color_list, color.metro_colors)
    
    # dict to value
    colors = []    
    for key in funcs:
        colors.append(color_list[key])
        
    return [funcs, colors]

def pyformat_to_jstooltip_text(positions, config, section_fmt, section_col, item_startwith):

    tooltip_templete = "{{format:[{formats}], keys: '{keys}'}}"
    tooltip_detail_templete = "{{label:'{label}',type:'{type}',keys:[{keys}],ext:'{ext}'}},"
        
    import re
    re_compile=re.compile(r"\{[0-9a-zA-Z\+\-\*\/\#\:\,\.\_\ ]+\}")
    re_compile2=re.compile(r"[\+\-\*\/\:]")
    
    keys_list = []
    tooltip_fomat_text = ""

    for option in tools.config_getoptions(config, section_fmt, item_startwith):
        
        formt = tools.config_getstr(config, section_fmt, option)
        key_text_list = re_compile.findall(formt)
        tooltip_detail_text = ""

        for key_text in key_text_list:
            start = formt.find(key_text)
            
            # write fix area
            if start > 0:
                tooltip_detail_text += tooltip_detail_templete.format(label = formt[0:start], type="fix", keys="", ext="")
            
            key_text = key_text.lower()
            formt = formt[start+len(key_text):]
            
            label_text = key_text.replace(" ", "").replace("{", "").replace("}", "")
            sub_keys = re_compile2.split(label_text)
            
            ttype = "numeric"
            ext = ""
            
            # case str
            if len(sub_keys) == 1:
                ttype = "str"

            # case with-extention
            if label_text.find(":") > 0:
                ext_start = label_text.index(":")
                ext=label_text[ext_start+1:]
                label_text = label_text[0:ext_start]
                sub_keys = re_compile2.split(label_text)
            
            for sub_key in sub_keys:
                # remove numeric block
                try:
                    float(sub_key)
                    sub_keys.remove(sub_key)
                except Exception:
                    pass
            
            check = True
            for sub_key in list(set(sub_keys)):
                
                if not sub_key in positions.keys():
                    if not sub_key.startswith("#"):
                        print("[WARNING] key:{key} is not defined.".format(key = sub_key))
                        check = False
                        break
                label_text = label_text.replace(sub_key, "{" + sub_key +"}")

            if check == True:
                tooltip_detail_text += tooltip_detail_templete.format(label= label_text, type=ttype, keys=list_to_text(sub_keys), ext=ext)
                keys_list.extend(sub_keys)
        
        if len(formt) > 0:
            tooltip_detail_text += tooltip_detail_templete.format(label=formt, type="fix", keys="", ext="")
        
        tooltip_fomat_text += "[" + tooltip_detail_text + "],"

    key_text = ""
    keys_dup = list(set(keys_list))
    keys_dup.sort()
    for key in keys_dup:
        key_text += "{" + key.lower() + "} "
        
    return tooltip_templete.format(formats = tooltip_fomat_text, keys = key_text)

if __name__ == "__main__":
    pass

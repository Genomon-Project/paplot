# -*- coding: utf-8 -*-
"""
Created on Thu Feb 25 11:34:07 2016

@author: okada

$Id: data_frame.py 177 2016-10-24 04:23:59Z aokada $
"""

class DataFrame:
    """Tables data class"""

    def __init__(self):
        self.data = []
        self.title = []

    def column(self, col):
        if type(col) == type(""):
            col_index = self.name_to_index(col)
            
        elif type(col) == type(0):
            col_index = col
        else:
            return []
            
        li = []
        for row in self.data:
            li.append(row[col_index])
            
        return li
        
    def concat(self, data, title):

        new_title = []
        for item in title:
            new_title.extend(item)
        
        cat = []
        for pos in range(len(data[0])):
            cat_row = []
            for li in data:
                if type(li[0]) == type([]):
                    cat_row.extend(li[pos])
                else:
                    cat_row.append(li[pos])
                
            cat.append(cat_row)
        
        self.title = title
        self.data = cat

    def extract(self, col_index, filt, complete=False):

        extra = []
        for row in self.data:
            push = False
            if type(filt) == type([]):
                for v in filt:
                    if complete == True:
                        if row[col_index] == v:
                            push = True
                            break
                    else:
                        if v in row[col_index]:
                            push = True
                            break
            else:
                if complete == True:
                    if row[col_index] == filt:
                        push = True
                else:
                    if filt in row[col_index]:
                        push = True
            
            if push == True:
                extra.append(row)
        
        ret = DataFrame()
        ret.data = extra
        for item in self.title:
            ret.title.append(item)
            
        return ret
        
    def name_to_index(self, name):
        for index in range(len(self.title)):
            if self.title[index] == name:
                return index
            
        return -1
    
    def replace(self, before, after):
        for i in range(len(self.data)):
            for j in range(len(self.data[i])):
                if type(self.data[i][j]) == type(""):
                    self.data[i][j] = self.data[i][j].replace(before, after)
                
    def save(self, filepath, sept = ",", header = True, mode = "w"):
               
        lines = []
        if header == True:
            title_text = ""
            for i in range(len(self.title)):
                if i > 0:
                    title_text += sept
                title_text += str(self.title[i])

            lines.append(title_text + "\n")
            
        for row in self.data:
            row_text = ""
            for i in range(len(row)):
                if i > 0:
                    row_text += sept
                row_text += str(row[i])
        
            lines.append(row_text + "\n")

        f = open(filepath, mode)
        f.writelines(lines)
        f.close()

def _usecol(filepath, sept, header, skipfooter, comment):
    # file read end
    end = sum(1 for line in open(filepath)) - skipfooter
    
    # create usecol
    max_colnum = 0
    header_counter = -1
    footer_counter = -1
    
    for line in open(filepath):
        footer_counter += 1
        
        line = line.rstrip("\r\n")
        if len(line) == 0: continue
        if len(comment) > 0 and line.find(comment) == 0: continue
            
        header_counter += 1
        if header_counter < header: continue
        if footer_counter >= end: break
            
        # count columns num
        cols = line.split(sept)
        if max_colnum < len(cols):
            max_colnum = len(cols)
    
    usecol = range(0, max_colnum)
    
    return usecol

def _f_usecol(usecol):

    cols = []
    for u in usecol:
        if u >= 0:
            cols.append(u)

    return cols
    
def load_title(filepath, sept = ",", usecol = None, header = 0, skipfooter = 0, comment = "#"):
    
    # filepath is exists
    import os
    if os.path.exists(filepath) == False:
        print("File is not exist. %s" % filepath)
        return []
    
    sept = sept.replace("\\t", "\t").replace("\\n", "\n").replace("\\r", "\r")

    # create usecol
    if usecol == None:
        usecol = _usecol(filepath, sept, header, skipfooter, comment)
    else:
        usecol = _f_usecol(usecol)
        
    # create title
    title = []
    i = -1
    for line in open(filepath):
        line = line.rstrip("\r\n")
        if len(line) == 0: continue
        if len(comment) > 0 and line.find(comment) == 0: continue
            
        i += 1
        if i >= header: break  
        
        cols = line.split(sept)
        
        for j in range(len(usecol)):
            value = cols[usecol[j]]
            
            if i == 0:
                title.append(value)
            else:
                title[j] += value

    return title
     
def load_file(filepath, sept = ",", usecol = None, header = 0, skipfooter = 0, comment = "#"):
    
    df = DataFrame()
    
    # filepath is exists
    import os
    if os.path.exists(filepath) == False:
        print("File is not exist. %s" % filepath)
        return df
    
    # file read
    end = sum(1 for line in open(filepath)) - skipfooter

    sept = sept.replace("\\t", "\t").replace("\\n", "\n").replace("\\r", "\r")

    # create usecol
    if usecol == None:
        usecol = _usecol(filepath, sept, header, skipfooter, comment)
    else:
        usecol = _f_usecol(usecol)
    
    # create title
    title = load_title(filepath, sept, usecol, header, skipfooter, comment)

    # load to data[row][col]
    tmp = []
    header_counter = -1
    footer_counter = -1
    
    for line in open(filepath):
        footer_counter += 1
        
        line = line.rstrip("\r\n")
        if len(line) == 0: continue
        if len(comment) > 0 and line.find(comment) == 0: continue
            
        header_counter += 1
        if header_counter < header: continue
        if footer_counter >= end: break 

        cols = line.split(sept)
        picks = []
        for j in usecol:
            value = ""
            if (j >= 0) and (j < len(cols)):
                value = cols[j]
            picks.append(value)
                
        tmp.append(picks)
    
    # change type
    TYPE_INT = 0
    TYPE_FLOAT = 1
    TYPE_TEXT = 2
    
    type_list = []
    for i in usecol:
        type_list.append(TYPE_INT)
    
    for row in tmp:
        for pos in range(len(row)):
            if type_list[pos] == TYPE_TEXT:
                continue
            
            if type_list[pos] == TYPE_INT:
                try:
                    dummy = int(row[pos])
                except Exception:
                    type_list[pos] = TYPE_FLOAT
            
            if type_list[pos] == TYPE_FLOAT:
                try:
                    dummy = float(row[pos])
                except Exception:
                    type_list[pos] = TYPE_TEXT
        
    data = []
    for row in tmp:
        li = []
        for pos in range(len(row)):
            if type_list[pos] == TYPE_INT:
                li.append(int(row[pos]))
            elif type_list[pos] == TYPE_FLOAT:
                li.append(float(row[pos]))
            else:
                li.append(row[pos])
                
        data.append(li)
        
    df.data = data
    df.title = title

    return df

if __name__ == "__main__":
    pass

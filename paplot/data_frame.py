# -*- coding: utf-8 -*-
"""
Created on Thu Feb 25 11:34:07 2016

@author: okada

$Id: data_frame.py 52 2016-02-26 01:25:42Z aokada $
$Rev: 52 $
"""

class DataFrame:
    """Tables data class"""

    def __init__(self):
        self.data = []
        self.title = []

    def column(self, col_index):
        li = []
        for row in self.data:
            li.append(row[col_index])
            
        return li
    
    def column_t(self, col_name):
        return self.column(self.name_to_index(col_name))
        
    def name_to_index(self, name):
        for index in range(len(self.title)):
            if self.title[index] == name:
                return index
            
        return -1
    
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
        
    def save(self, filepath, sept = ",", header = True, mode = "w"):
        
        title_text = ""
        if header == True:
            for item in self.title:
                if len(title_text) > 0:
                    title_text += sept
                title_text += str(item)
            
            title_text += "\n"
    
        data_text = ""
        for row in self.data:
            row_text = ""
            for item in row:
                if len(row_text) > 0:
                    row_text += sept
                row_text += str(item)
        
            data_text += row_text + "\n"
        
        f = open(filepath, mode)
        f.write(title_text)
        f.write(data_text)
        f.close()
      
def load_file(filepath, sept = ",", usecol = None, header = 0, skipfooter = 0):
    
    df = DataFrame()
    
    # filepath is exists
    import os
    if os.path.exists(filepath) == False:
        print("File is not exist. %s" % filepath)
        return df
    
    # file read
    f = open(filepath)
    read = f.read()
    
    rows = read.replace("\r\n","\n").replace("\r","\n").split("\n")
    start = header
    end = len(rows) - skipfooter

    sept = sept.replace("\\t", "\t").replace("\\n", "\n").replace("\\r", "\r")

    # create usecol
    if usecol == None:
        last = 0
        for i in range(start,end):
            cols = rows[i].split(sept)
            if last < len(cols):
                last = len(cols)
        
        usecol = range(0,last)
    
    # create title
    title = []
    for i in range(0,header):
        row = rows[i]
        
        # skip blank row
        if len(row) == 0:
            continue
        
        cols = row.split(sept)
        
        for j in range(len(usecol)):
            if i == 0:
                title.append(cols[usecol[j]])
            else:
                title[j] += (cols[usecol[j]])

    # load to data[row][col]
    tmp = []
    for i in range(start,end):
        row = rows[i]
        
        # skip blank row
        if len(row) == 0:
            continue
        
        cols = row.split(sept)
        picks = []
        for j in usecol:
            if j < len(cols):
                picks.append(cols[j])
            else:
                picks.append("")
                
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

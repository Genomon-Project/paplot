# -*- coding: utf-8 -*-
"""
Created on Tue Jun 28 13:18:34 2016

@author: okada
"""

def load_text(path):
    f = open(path)
    text = f.read().replace("\r\n", "\n").replace("\r", "\n").split("\n")
    f.close()
    
    return text

def load_html(path):
    import re
    
    text = load_text(path)
    
    for i in range(len(text)):
        if re.search("^ *<title.*>.+</title> *$", text[i]):
            text[i] = ""
        elif re.search("^Generated on [0-9]{4}-[0-9]{1,2}-[0-9]{1,2} [0-9]{1,2}:[0-9]{1,2}:[0-9]{1,2} for .+ paplot-[0-9]+.[0-9]+.[0-9]+.$", text[i]):
            text[i] = ""
        elif re.search("^ *<h2.*>.* .*- .*</h2> *$", text[i]):
            text[i] = ""
        
    return text


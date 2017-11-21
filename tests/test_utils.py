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


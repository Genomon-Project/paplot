# -*- coding: utf-8 -*-
"""
Created on Tue Jun 28 13:18:34 2016

@author: okada
"""

import os
import sys
TARGET = os.path.abspath(os.path.dirname(__file__) + "/../scripts/")
sys.path.append(TARGET)

import unittest
import test_utils
import paplot.run

class TestSet(unittest.TestCase):

    CURRENT = os.path.abspath(os.path.dirname(__file__) + "/../")
    dataset = CURRENT + "/dataset/ca/"
    ALT = CURRENT + "/alt/func_ca"
    
    args = test_utils.init_args()
    
    # init class
    @classmethod
    def setUpClass(cls):
        pass
        
    # terminated class
    @classmethod
    def tearDownClass(cls):
        pass

    # init method
    def setUp(self):
        self.args.title = "CA graphs"
        self.args.ellipsis = "qc"
        self.args.overview = "Chromosomal Aberration."
        #self.args.remarks = ""

    # terminated method
    def tearDown(self):
        pass
        
    def test1_01_merge(self):
        
        self.args.input = self.dataset + "/cover/merge.csv"
        self.args.config_file = self.dataset + "/cover/paplot.cfg"
        self.args.output_dir = self.ALT
        self.args.project_name = sys._getframe().f_code.co_name
        
        ret = paplot.run.ca_main(self.args)
        self.assertEqual(ret, None)

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
    dataset = CURRENT + "/dataset/signature/"
    ALT = CURRENT + "/alt/func_signature"
    
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
        self.args.title = "Signature"
        self.args.ellipsis = "signature"
        self.args.overview = "Mutational signatures."
        #self.args.remarks = ""

    # terminated method
    def tearDown(self):
        pass
        
    def test1_01_minimal(self):
        
        self.args.input = self.dataset + "/cover/minimal.json"
        self.args.config_file = self.dataset + "/cover/minimal.cfg"
        self.args.output_dir = self.ALT
        self.args.project_name = sys._getframe().f_code.co_name
        
        ret = paplot.run.signature_main(self.args)
        self.assertEqual(ret, None)

        
    def test1_02_stack(self):
        
        self.args.input = self.dataset + "/cover/stack.json"
        self.args.config_file = self.dataset + "/cover/stack.cfg"
        self.args.output_dir = self.ALT
        self.args.project_name = sys._getframe().f_code.co_name
        
        ret = paplot.run.signature_main(self.args)
        self.assertEqual(ret, None)

        
    def test1_03_bg_false(self):
        
        self.args.input = self.dataset + "/cover/bg_true.json"
        self.args.config_file = self.dataset + "/cover/bg_true.cfg"
        self.args.output_dir = self.ALT
        self.args.project_name = sys._getframe().f_code.co_name

        ret = paplot.run.signature_main(self.args)
        self.assertEqual(ret, None)

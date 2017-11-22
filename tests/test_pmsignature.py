# -*- coding: utf-8 -*-
"""
Created on Tue Jun 28 13:18:34 2016

@author: okada
"""

import unittest
import os
import sys
import test_utils
import subprocess

class TestSet(unittest.TestCase):

    CURRENT = os.path.dirname(__file__)
    dataset = CURRENT + "/dataset/pmsignature/"
    REF = CURRENT + "/ref/pmsignature/"
    ALT = CURRENT + "/alt/pmsignature/"
    
    # init class
    @classmethod
    def setUpClass(cls):
        import shutil
        if os.path.exists(cls.ALT):
            shutil.rmtree(cls.ALT)
        os.makedirs(cls.ALT)
        
    # terminated class
    @classmethod
    def tearDownClass(cls):
        pass

    # init method
    def setUp(self):
        pass

    # terminated method
    def tearDown(self):
        pass
        
    def test1_01_minimal(self):
        name = sys._getframe().f_code.co_name
        subprocess.check_call('python paplot pmsignature %s/minimal/data.json %s %s -c %s/minimal/paplot.cfg' % (self.dataset, self.ALT, name, self.dataset), shell=True)

        ref = test_utils.load_text(self.REF + name + "/data_pmsignature2.js")
        alt = test_utils.load_text(self.ALT + name + "/data_pmsignature2.js")
        self.assertEqual(ref, alt)

        ref = test_utils.load_html(self.REF + name + "/graph_pmsignature2.html")
        alt = test_utils.load_html(self.ALT + name + "/graph_pmsignature2.html")
        self.assertEqual(ref, alt)

    def test1_02_stack(self):
        name = sys._getframe().f_code.co_name
        subprocess.check_call('python paplot pmsignature %s/stack/data2.json %s %s -c %s/stack/paplot.cfg' % (self.dataset, self.ALT, name, self.dataset), shell=True)

        ref = test_utils.load_text(self.REF + name + "/data_pmsignature2.js")
        alt = test_utils.load_text(self.ALT + name + "/data_pmsignature2.js")
        self.assertEqual(ref, alt)

        ref = test_utils.load_html(self.REF + name + "/graph_pmsignature2.html")
        alt = test_utils.load_html(self.ALT + name + "/graph_pmsignature2.html")
        self.assertEqual(ref, alt)

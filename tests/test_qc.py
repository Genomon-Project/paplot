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
    dataset = CURRENT + "/dataset/qc/"
    REF = CURRENT + "/ref/qc/"
    ALT = CURRENT + "/alt/qc/"
    
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
        
    def test1_01_sample_header_id_csv(self):
        name = "test1_01_sample_header_id_csv"
        subprocess.check_call('python paplot qc "%s/header_id/SAMPLE*.csv" %s %s -c %s/header_id/csv.cfg' % (self.dataset, self.ALT, name, self.dataset), shell=True)
        
        ref = test_utils.load_text(self.REF + "test1_01_sample_header_id_csv/data_qc.js")
        alt = test_utils.load_text(self.ALT + name + "/data_qc.js")
        self.assertEqual(ref, alt)
        
    def test1_02_sample_header_id_tsv(self):
        name = sys._getframe().f_code.co_name
        subprocess.check_call('python paplot qc "%s/header_id/SAMPLE*.tsv" %s %s -c %s/header_id/tsv.cfg' % (self.dataset, self.ALT, name, self.dataset), shell=True)
        
        ref = test_utils.load_text(self.REF + "test1_01_sample_header_id_csv/data_qc.js")
        alt = test_utils.load_text(self.ALT + name + "/data_qc.js")
        self.assertEqual(ref, alt)
        
    def test1_03_merge_header_id_csv(self):
        name = sys._getframe().f_code.co_name
        subprocess.check_call('python paplot qc "%s/header_id/merge.csv" %s %s -c %s/header_id/csv.cfg' % (self.dataset, self.ALT, name, self.dataset), shell=True)
        
        ref = test_utils.load_text(self.REF + "test1_01_sample_header_id_csv/data_qc.js")
        alt = test_utils.load_text(self.ALT + name + "/data_qc.js")
        self.assertEqual(ref, alt)
        
    def test1_04_merge_header_id_tsv(self):
        name = sys._getframe().f_code.co_name
        subprocess.check_call('python paplot qc "%s/header_id/merge.tsv" %s %s -c %s/header_id/tsv.cfg' % (self.dataset, self.ALT, name, self.dataset), shell=True)
        
        ref = test_utils.load_text(self.REF + "test1_01_sample_header_id_csv/data_qc.js")
        alt = test_utils.load_text(self.ALT + name + "/data_qc.js")
        self.assertEqual(ref, alt)
        
    def test1_05_sample_noheader_id_csv(self):
        name = sys._getframe().f_code.co_name
        subprocess.check_call('python paplot qc "%s/noheader_id/SAMPLE*.csv" %s %s -c %s/noheader_id/csv.cfg' % (self.dataset, self.ALT, name, self.dataset), shell=True)
        
        ref = test_utils.load_text(self.REF + "test1_01_sample_header_id_csv/data_qc.js")
        alt = test_utils.load_text(self.ALT + name + "/data_qc.js")
        self.assertEqual(ref, alt)

    def test1_06_sample_noheader_id_tsv(self):
        name = sys._getframe().f_code.co_name
        subprocess.check_call('python paplot qc "%s/noheader_id/SAMPLE*.tsv" %s %s -c %s/noheader_id/tsv.cfg' % (self.dataset, self.ALT, name, self.dataset), shell=True)
        
        ref = test_utils.load_text(self.REF + "test1_01_sample_header_id_csv/data_qc.js")
        alt = test_utils.load_text(self.ALT + name + "/data_qc.js")
        self.assertEqual(ref, alt)
        
    def test1_07_merge_noheader_id_csv(self):
        name = sys._getframe().f_code.co_name
        subprocess.check_call('python paplot qc "%s/noheader_id/merge.csv" %s %s -c %s/noheader_id/csv.cfg' % (self.dataset, self.ALT, name, self.dataset), shell=True)
        
        ref = test_utils.load_text(self.REF + "test1_01_sample_header_id_csv/data_qc.js")
        alt = test_utils.load_text(self.ALT + name + "/data_qc.js")
        self.assertEqual(ref, alt)

    def test1_08_merge_noheader_id_tsv(self):
        name = sys._getframe().f_code.co_name
        subprocess.check_call('python paplot qc "%s/noheader_id/merge.tsv" %s %s -c %s/noheader_id/tsv.cfg' % (self.dataset, self.ALT, name, self.dataset), shell=True)
        
        ref = test_utils.load_text(self.REF + "test1_01_sample_header_id_csv/data_qc.js")
        alt = test_utils.load_text(self.ALT + name + "/data_qc.js")
        self.assertEqual(ref, alt)
        
    def test1_09_sample_header_noid_csv(self):
        name = sys._getframe().f_code.co_name
        subprocess.check_call('python paplot qc "%s/header_noid/SAMPLE*.csv" %s %s -c %s/header_noid/csv.cfg' % (self.dataset, self.ALT, name, self.dataset), shell=True)
        
        ref = test_utils.load_text(self.REF + "test1_01_sample_header_id_csv/data_qc.js")
        alt = test_utils.load_text(self.ALT + name + "/data_qc.js")
        self.assertEqual(ref, alt)
        
    def test1_10_sample_header_noid_tsv(self):
        name = sys._getframe().f_code.co_name
        subprocess.check_call('python paplot qc "%s/header_noid/SAMPLE*.tsv" %s %s -c %s/header_noid/tsv.cfg' % (self.dataset, self.ALT, name, self.dataset), shell=True)
        
        ref = test_utils.load_text(self.REF + "test1_01_sample_header_id_csv/data_qc.js")
        alt = test_utils.load_text(self.ALT + name + "/data_qc.js")
        self.assertEqual(ref, alt)
        
    def test1_13_sample_noheader_noid_csv(self):
        name = sys._getframe().f_code.co_name
        subprocess.check_call('python paplot qc "%s/noheader_noid/SAMPLE*.csv" %s %s -c %s/noheader_noid/csv.cfg' % (self.dataset, self.ALT, name, self.dataset), shell=True)
        
        ref = test_utils.load_text(self.REF + "test1_01_sample_header_id_csv/data_qc.js")
        alt = test_utils.load_text(self.ALT + name + "/data_qc.js")
        self.assertEqual(ref, alt)

    def test1_14_sample_noheader_noid_tsv(self):
        name = sys._getframe().f_code.co_name
        subprocess.check_call('python paplot qc "%s/noheader_noid/SAMPLE*.tsv" %s %s -c %s/noheader_noid/tsv.cfg' % (self.dataset, self.ALT, name, self.dataset), shell=True)
        
        ref = test_utils.load_text(self.REF + "test1_01_sample_header_id_csv/data_qc.js")
        alt = test_utils.load_text(self.ALT + name + "/data_qc.js")
        self.assertEqual(ref, alt)

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

    CURRENT = os.path.abspath(os.path.dirname(__file__) + "/../")
    dataset = CURRENT + "/dataset/"
    REF = CURRENT + "/ref/"
    ALT = CURRENT + "/src/"
    
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
        
    def test1_01_qc(self):
        self.assertEqual(
            subprocess.check_call('python paplot qc %s/qc/cover/merge.csv %s html -c %s/qc/cover/paplot.cfg' % (self.dataset, self.ALT, self.dataset), shell=True),
            0)
        
    def test1_02_ca(self):
        self.assertEqual(
            subprocess.check_call('python paplot ca %s/ca/cover/merge.csv %s html -c %s/ca/cover/paplot.cfg' % (self.dataset, self.ALT, self.dataset), shell=True),
            0)

    def test1_03_mutation(self):
        self.assertEqual(
            subprocess.check_call('python paplot mutation %s/mutation/cover/merge.csv %s html -c %s/mutation/cover/paplot.cfg' % (self.dataset, self.ALT, self.dataset), shell=True),
            0)

    def test1_04_signature(self):
        self.assertEqual(
            subprocess.check_call('python paplot signature %s/signature/cover/stack.json %s html -c %s/signature/cover/stack.cfg' % (self.dataset, self.ALT, self.dataset), shell=True),
            0)
        
    def test1_05_pmsignature(self):
        self.assertEqual(
            subprocess.check_call('python paplot pmsignature %s/pmsignature/cover/stack.json %s html -c %s/pmsignature/cover/stack.cfg' % (self.dataset, self.ALT, self.dataset), shell=True),
            0)

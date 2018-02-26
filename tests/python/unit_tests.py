# -*- coding: utf-8 -*-
"""
Created on Tue Jun 28 13:18:34 2016

@author: okada

$ pip install coverage
$ coverage run setup.py test
$ coverage report
$ coverage html 
$ open htmlcov/index.html 
"""


import unittest

def suite():
    suite = unittest.TestSuite()

    import func_qc
    suite.addTests(unittest.makeSuite(func_qc.TestSet))
    
    import func_ca
    suite.addTests(unittest.makeSuite(func_ca.TestSet))
    
    import func_mutation
    suite.addTests(unittest.makeSuite(func_mutation.TestSet))
    
    import func_signature
    suite.addTests(unittest.makeSuite(func_signature.TestSet))
    
    import func_pmsignature
    suite.addTests(unittest.makeSuite(func_pmsignature.TestSet))
    
    import test_qc
    suite.addTests(unittest.makeSuite(test_qc.TestSet))
    
    import test_ca
    suite.addTests(unittest.makeSuite(test_ca.TestSet))
    
    import test_mutation
    suite.addTests(unittest.makeSuite(test_mutation.TestSet))
    
    import test_signature
    suite.addTests(unittest.makeSuite(test_signature.TestSet))
    
    import test_pmsignature
    suite.addTests(unittest.makeSuite(test_pmsignature.TestSet))
    
    import test_pre_cover
    suite.addTests(unittest.makeSuite(test_pre_cover.TestSet))
    
    return suite

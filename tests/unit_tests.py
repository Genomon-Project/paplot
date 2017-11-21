# -*- coding: utf-8 -*-
"""
Created on Tue Jun 28 13:18:34 2016

@author: okada
"""

import unittest

def suite():
    suite = unittest.TestSuite()

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

    return suite

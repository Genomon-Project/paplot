# -*- coding: utf-8 -*-
"""
$Id: setup.py 177 2016-10-24 04:23:59Z aokada $
"""

from setuptools import setup, find_packages
from scripts.paplot import __version__

import sys
sys.path.append('./paplot')
sys.path.append('./tests')

setup(name='paplot',
      version=__version__,
      description="parser result files created by genomon",
      long_description="""\n
parser result files created by genomon (SV, mutaion-call and so on)""",
      classifiers=[], # Get strings from http://pypi.python.org/pypi?%3Aaction=list_classifiers
      keywords='genomon post analysis',
      author='ai okada',
      author_email='genomon.devel@gmail.com',
      url='https://github.com/Genomon-Project/paplot.git',
      license='License of GenomonPipeline',
      package_dir = {'': 'scripts'},
      packages=['paplot', 'paplot.subcode'],
      scripts=['paplot'],
      data_files=[('config', ['paplot.cfg']), ('config', ['genome/hg19.csv']), ('example', ['example/mutation/sample_summary.csv'])],
      include_package_data=True,
      zip_safe=False,
      install_requires=[
          # -*- Extra requirements: -*-
      ],
      entry_points="""
      # -*- Entry points: -*-
      """,
      package_data = {
          'paplot': ['lib/*/*','js/*','templates/*.html', 'style/*', 'layout/*'],
      },
      test_suite = 'unit_tests.suite',
)

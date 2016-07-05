# -*- coding: utf-8 -*-
"""
$Id: setup.py 118 2016-07-05 02:05:54Z aokada $
"""

from setuptools import setup, find_packages

version = '0.3.1'

import sys
sys.path.append('./paplot')
sys.path.append('./tests')

setup(name='paplot',
      version=version,
      description="parser result files created by genomon",
      long_description="""\n
parser result files created by genomon (SV, mutaion-call and so on)""",
      classifiers=[], # Get strings from http://pypi.python.org/pypi?%3Aaction=list_classifiers
      keywords='genomon post analysis',
      author='aokada',
      author_email='genomon.devel@gmail.com',
      url='https://github.com/Genomon-Project/paplot.git',
      license='GPL-3',
      packages=find_packages(exclude=['ez_setup', 'examples', 'tests']),
      scripts=['pa_plot'],
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
          'paplot': ['lib/*/*','js/*','templates/*.html', 'style/*'],
      },
      test_suite = 'unit_tests.suite',
)

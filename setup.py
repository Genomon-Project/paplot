# -*- coding: utf-8 -*-
"""
$Id: setup.py 46 2016-02-22 08:12:39Z aokada $
$Rev: 46 $
"""

from setuptools import setup, find_packages

version = '0.2.4'

setup(name='paplot',
      version=version,
      description="parser result files created by genomon",
      long_description="""\n
parser result files created by genomon (SV, mutaion-call and so on)""",
      classifiers=[], # Get strings from http://pypi.python.org/pypi?%3Aaction=list_classifiers
      keywords='genomon post analysis',
      author='aokada',
      author_email='genomon_team@gamil.com',
      url='https://github.com/Genomon-Project/Genomon.git',
      license='GPL-3',
      packages=find_packages(exclude=['ez_setup', 'examples', 'tests']),
      scripts=['pa_plot'],
      data_files=[('config', ['paplot.cfg']), ('config', ['genome/hg19.csv'])],
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
      }
)

# -*- coding: utf-8 -*-
"""
$Id: setup.py 204 2017-08-02 08:23:55Z aokada $
"""

from setuptools import setup, find_packages
from scripts.paplot import __version__

import sys
sys.path.append('./paplot')
sys.path.append('./tests')

import os

def package_files(directory):
    paths = []
    for (path, directories, filenames) in os.walk(directory):
        for filename in filenames:
            paths.append(os.path.join(path, filename))
    return paths

data_files=[
    ('paplot-data-' + __version__ + "/config_template", package_files('config_template')),
    ('paplot-data-' + __version__ + "/genome", package_files('genome')),
]
for path in package_files('example'):
    if path.endswith(".zip"): continue
    data_files.append(('paplot-data-' + __version__ + "/" + os.path.dirname(path), [path]))

setup(name='paplot',
      version=__version__,
      description="Automatic generation of cancer genome interactive report.",
      long_description="""paplot outputs files described by javascript (use D3.js, https://d3js.org/ ) and HTML.
These interactive figures  allow users to enjoy filtering, focusing and sorting the visualized contents as their necessity, without re-executing drawing tools with different parameters.
Furthermore, by moving the mouse, the user can efficiently obtain various information.
""",

      classifiers=[
          #   3 - Alpha
          #   4 - Beta
          #   5 - Production/Stable
          'Development Status :: 3 - Alpha',
          # Indicate who your project is intended for
          'Intended Audience :: Science/Research',
          'Topic :: Scientific/Engineering :: Bio-Informatics',

          'License :: OSI Approved :: MIT License',
          'Programming Language :: Python :: 2',
          'Programming Language :: Python :: 2.7',
          'Programming Language :: Python :: 3',
          'Programming Language :: Python :: 3.2',
          'Programming Language :: Python :: 3.3',
          'Programming Language :: Python :: 3.4',
          'Programming Language :: Python :: 3.5',
      ], # Get strings from http://pypi.python.org/pypi?%3Aaction=list_classifiers
      
      keywords='post analysis genome bioinfomatics',
      author='Ai Okada',
      author_email='genomon.devel@gmail.com',
      url='https://github.com/Genomon-Project/paplot.git',
      license='MIT',
      
      package_dir = {'': 'scripts'},
      packages=['paplot', 'paplot.subcode'],
      scripts=['paplot'],
      data_files=data_files,
      include_package_data=True,
      zip_safe=False,
      install_requires=[
          # -*- Extra requirements: -*-
      ],
      entry_points="""
      # -*- Entry points: -*-
      """,
      package_data = {
          'paplot': ['lib/*/*','js/*','templates/*', 'style/*', 'layout/*'],
      },
      test_suite = 'unit_tests.suite',
)

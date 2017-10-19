[![Build Status](https://travis-ci.org/Genomon-Project/paplot.svg?branch=master)](https://travis-ci.org/Genomon-Project/paplot)
[![Quality Gate](https://sonarcloud.io/api/badges/gate?key=paplot)](https://sonarcloud.io/dashboard?id=paplot)
[![License](https://img.shields.io/badge/license-MIT-red.svg?style=flat)](https://opensource.org/licenses/MIT)
[![Documentation](https://img.shields.io/badge/docs-latest-blue.svg?style=flat)](http://paplot-doc.readthedocs.io)
<!-- [![PyPI version](https://badge.fury.io/py/xxx.svg)](http://badge.fury.io/py/xxx)-->

# paplot

Welcome to Post Analysis PLOT (paplot).

paplot creates interactive graphs from text data of genome analysis.

## 1. Demo

Output example by paplot.

http://genomon-project.github.io/paplot/

-------------------------------------------------------------------------

## 2. Documents

English:

http://paplot-doc.readthedocs.org/en/latest/

Japanese:

http://paplot-doc.readthedocs.org/ja/latest/


-------------------------------------------------------------------------

## 3. Dependency

 - python >= 2.7

Required web browser for viewing result file.
(Tested in the following)

 - Firefox 48
 - Google Chrome 44
 - Internet Explorer 11

-------------------------------------------------------------------------

## 4. Install

```
git clone https://github.com/Genomon-Project/paplot.git
cd paplot

python setup.py build install --user
```

-------------------------------------------------------------------------

## 5. Run

For example, (using sample data)

```
cd {paplot install directory}

 # QC Report
paplot qc example/qc_brush/data.csv ./tmp demo

 # Chromosomal Aberration Report
paplot ca example/ca_option/data.csv ./tmp demo

 # Mutation Matrix Report
paplot mutation example/mutation_option/data.csv ./tmp demo

 # Mutational Signature Report 
paplot signature "example/signature_stack/data*.json" ./tmp demo

 # pmsignature Report (see https://github.com/friend1ws/pmsignature)
paplot pmsignature "example/pmsignature_stack/data*.json" ./tmp demo
```

## 6. Description 

```
$ paplot -h
usage: paplot [-h] [--version]
              {conf,index,qc,ca,mutation,signature,pmsignature} ...

positional arguments:
  {conf,index,qc,ca,mutation,signature,pmsignature}
    conf                view config file
    index               re-create index file
    qc                  plot QC Report
    ca                  plot Chromosomal Aberration Report
    mutation            plot Mutation Matrix Report
    signature           plot Mutational Signature Report
    pmsignature         plot pmsignature Report

optional arguments:
  -h, --help            show this help message and exit
  --version             show program's version number and exit

```

### 6.1 QC Report

```
$ paplot qc -h
usage: paplot qc [-h] [--config_file CONFIG_FILE] [--title TITLE]
                 [--ellipsis ELLIPSIS] [--overview OVERVIEW]
                 [--remarks REMARKS]
                 input output_dir project_name

positional arguments:
  input                 input files path
  output_dir            output file path
  project_name          project name

optional arguments:
  -h, --help            show this help message and exit
  --config_file CONFIG_FILE
                        config file
  --title TITLE         report's title
  --ellipsis ELLIPSIS   report file's ID
  --overview OVERVIEW   overview about report file
  --remarks REMARKS     optional text
```

### 6.2 Chromosomal Aberration Report

```
$ paplot ca -h
usage: paplot ca [-h] [--config_file CONFIG_FILE] [--title TITLE]
                 [--ellipsis ELLIPSIS] [--overview OVERVIEW]
                 [--remarks REMARKS]
                 input output_dir project_name

positional arguments:
  input                 input files path
  output_dir            output file path
  project_name          project name

optional arguments:
  -h, --help            show this help message and exit
  --config_file CONFIG_FILE
                        config file
  --title TITLE         report's title
  --ellipsis ELLIPSIS   report file's ID
  --overview OVERVIEW   overview about report file
  --remarks REMARKS     optional text
```

### 6.3 Mutation Matrix Report

```
$ paplot mutation -h
usage: paplot mutation [-h] [--config_file CONFIG_FILE] [--title TITLE]
                       [--ellipsis ELLIPSIS] [--overview OVERVIEW]
                       [--remarks REMARKS]
                       input output_dir project_name

positional arguments:
  input                 input files path
  output_dir            output file path
  project_name          project name

optional arguments:
  -h, --help            show this help message and exit
  --config_file CONFIG_FILE
                        config file
  --title TITLE         report's title
  --ellipsis ELLIPSIS   report file's ID
  --overview OVERVIEW   overview about report file
  --remarks REMARKS     optional text
```

### 6.4 Mutational Signature Report

```
$ paplot signature -h
usage: paplot signature [-h] [--config_file CONFIG_FILE] [--title TITLE]
                        [--ellipsis ELLIPSIS] [--overview OVERVIEW]
                        [--remarks REMARKS]
                        input output_dir project_name

positional arguments:
  input                 input files path
  output_dir            output file path
  project_name          project name

optional arguments:
  -h, --help            show this help message and exit
  --config_file CONFIG_FILE
                        config file
  --title TITLE         report's title
  --ellipsis ELLIPSIS   report file's ID
  --overview OVERVIEW   overview about report file
  --remarks REMARKS     optional text
```

### 6.5 pmsignature Report

About pmsignaute?, see https://github.com/friend1ws/pmsignature)

```
$ paplot pmsignature -h
usage: paplot pmsignature [-h] [--config_file CONFIG_FILE] [--title TITLE]
                          [--ellipsis ELLIPSIS] [--overview OVERVIEW]
                          [--remarks REMARKS]
                          input output_dir project_name

positional arguments:
  input                 input files path
  output_dir            output file path
  project_name          project name

optional arguments:
  -h, --help            show this help message and exit
  --config_file CONFIG_FILE
                        config file
  --title TITLE         report's title
  --ellipsis ELLIPSIS   report file's ID
  --overview OVERVIEW   overview about report file
  --remarks REMARKS     optional text
```

## 7. Tree of output directory

<pre>
{output_dir}
  |
  |- {project_name}
  |    |- (data files and html files)
  |
  |- js
  |    |- (paplot's js files)
  |
  |- lib
  |    |- (3rd-party's libraries)
  |
  |- style
  |    |- default.js
  |
  |- index.html        <--------- open your browser

</pre>

## 8. License 

See document LICENSE.

## A. Javascript Libraries

Javascript Libraries used in paplot are listed below.

 - D3.js <https://d3js.org/>
 - d3-legend <http://d3-legend.susielu.com>

See document under ./paplot/lib/<each lib>.


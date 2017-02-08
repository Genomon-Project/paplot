# paplot

Welcome to Post Analysis PLOT (PAPLOT).

Paplot creates interactive graphs from text data of genome analysis.

## 1. Demo

Output example by PAPLOT.

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

# create bar graphs of qc
paplot qc "example/qc/SAMPLE*" ./demo demo --config_file ./example/example.cfg

# create bundle graphs of Structural Variation (SV)
paplot ca "example/sv/SAMPLE*" ./demo demo --config_file ./example/example.cfg

# create sample-mutation plot (Mutation Matrix)
paplot mutation example/mutation/sample_merge.csv ./demo demo --config_file ./example/example.cfg

# create signature plot
paplot signature "example/signature/Nik_Zainal_2012.full.*.json" ./demo demo --config_file ./example/example.cfg

# create pmsignature plot (see https://github.com/friend1ws/pmsignature)
paplot pmsignature "example/pmsignature/Nik_Zainal_2012.ind.*.json" ./demo demo --config_file ./example/example.cfg
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
    qc                  plot Quarity Control graphs
    ca                  plot Chromosomal Aberration graphs
    mutation            plot mutation-matrix graph
    signature           plot signature graphs
    pmsignature         plot pmsignature graphs

optional arguments:
  -h, --help            show this help message and exit
  --version             show program's version number and exit
```

### 6.1 QC

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

### 6.2 CA

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

### 6.3 mutation-matrix

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

### 6.4 signature

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

### 6.5 pmsignature

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


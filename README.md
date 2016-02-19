# paplot

Welcome to Post Analysis PLOT (PAPLOT).

Paplot creates interactive graphs from text data of genome analysis.

-------------------------------------------------------------------------

##Dependency

 - python >= 2.7

Required web browser for viewing result file.
(Tested in the following)

 - Firefox 48
 - Google Chrome 44
 - Internet Explorer 11

-------------------------------------------------------------------------

##Install

```
git clone https://github.com/Genomon-Project/paplot.git
cd paplot

python setup.py build install --user
```

-------------------------------------------------------------------------

##Run

For example, (using sample data)

```
cd {paplot install directory}

# create bar graphs of qc
pa_plot qc "example/qc/*.csv" ~/tmp DUMMY --config_file example/example.cfg

# create bundle graphs of Structural Variation (SV)
pa_plot sv "example/sv/*.txt" ~/tmp DUMMY --config_file example/example.cfg
```

<br>

Description 

```
pa_plot {qc, sv} [-h] [--version] [--config_file CONFIG_FILE]
                  input output_dir project_name

```

 - `{qc, sv}`
 
    Sub commands

<br>

 - `input`

    Input data files,<br>
    Use wildcard('*') to specify multiple files, and take `"` last and first.

<br>

 - `output_dir`

    output directory path,<br>
    see following section.

<br>

 - `project_name`
 
   project name,<br>
   it is output html's title.
    
<br>

 - `--config_file` 

    configure file,<br>
    if not specified, use the default.
    
<br>

### (2) tree of output directory

<pre>
{output_dir}
  ｜
  ├ {project_name}
  ｜  ├ data_qc.csv
  ｜  ├ data_qc.js
  ｜  ├ data_sv.csv
  ｜  ├ data_sv.js
  ｜  ├ data_sv_thumb.js
  ｜  ├ graph_sv.html        <--------- open your browser
  ｜  ├ graph_qc.html        <--------- open your browser
  ｜  ├ merge_qc.csv
  ｜  └ merge_sv.csv
  ├ js
  ｜  ├ bundle_sv.js
  ｜  ├ graph_qc.js
  ｜  └ paplot.css
  ├  lib
  ｜  ├ crossfilter_v.1.3.12
  ｜  ├ d3_v3.5.13
  ｜  └ dc.js_v2.0.0-beta.25
  └ style
      └ default.js

</pre>

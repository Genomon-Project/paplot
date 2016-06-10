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

http://paplot-jp.readthedocs.org/ja/latest/


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
pa_plot qc "example/qc/*.csv" ~/tmp DUMMY --config_file example/example.cfg

# create bundle graphs of Structural Variation (SV)
pa_plot sv "example/sv/*.txt" ~/tmp DUMMY --config_file example/example.cfg

# create sample-mutation plot (Mutation Matrix)
pa_plot sv example/mutation/sample_merge.csv ~/tmp DUMMY --config_file example/example.cfg
```

Description 

```
pa_plot {qc, sv} [-h] [--version] [--config_file CONFIG_FILE]
                  input output_dir project_name

```

 - `{qc, sv, mutation}`
 
    Sub commands

 - `input`

    Input data files,<br>
    Use wildcard('*') to specify multiple files, and take `"` last and first.

 - `output_dir`

    output directory path,<br>
    see following section.

 - `project_name`
 
   project name,<br>
   it is output html's title.

 - `--config_file` 

    configure file,<br>
    if not specified, use the default.

## 6. Tree of output directory

<pre>
{output_dir}
  |
  ├ {project_name}
  |  └ (data files and html files)
  |
  ├ js
  |  └ (paplot's js files)
  |
  ├  lib
  |  └ (3rd-party's libraries)
  |
  ├ style
  |  └ default.js
  |
  └  index.html        <--------- open your browser

</pre>


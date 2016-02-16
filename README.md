# paplot

genome解析結果からインタラクティブなグラフを作成します。

-------------------------------------------------------------------------

##Dependency

 - python >= 2.7

-------------------------------------------------------------------------

##Install

```
git clone https://github.com/Genomon-Project/paplot.git
cd paplot

python setup.py build install --user
```

-------------------------------------------------------------------------

##Run

実行例

```
pa_plot qc "/home/genomon/ACC/summary/*/*.tsv" ./work ACC
```

<br>
<br>

オプション解説

```
pa_plot {qc, sv} [-h] [--version] [--config_file CONFIG_FILE]
                  input output_dir project_name

```

 - `{qc, sv}`
 
    実行モード

<br>

 - `input`

    入力ファイル複数指定する場合はワイルドカードを使用し、””で囲むこと

<br>

 - `output_dir`

    出力ディレクトリ
    
    ディレクトリ構成は (2) 実行結果のディレクトリ 参照

<br>

 - `project_name`
 
    プロジェクト名。出力結果のタイトルになります。
    
<br>

 - `--config_file` 

    設定しなければデフォルトの設定ファイルを使用します。

    デフォルトの設定ファイル `paplot.cfg` はpaplotインストールディレクトリ直下にあります。

    ※このファイルを編集しても変更は反映されません。--config_file オプションで変更したファイルを渡してください。

<br>
<br>


### (2) 実行結果のディレクトリ

<pre>
{output_dir}
  ｜
  ├ {project_name}
  ｜  ├ bundle_sv.html        <--------- ブラウザで開く
  ｜  ├ data_qc.csv
  ｜  ├ data_qc.js
  ｜  ├ data_sv.csv
  ｜  ├ data_sv.js
  ｜  ├ data_sv_thumb.js
  ｜  ├ graph_qc.html         <--------- ブラウザで開く
  ｜  ├ merge_qc.csv
  ｜  └merge_sv.csv
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


### (3) 設定ファイル

 - 設定ファイルはインストールディレクトリ直下にあります。

paplot.cfg

<pre>
<font color="green"># 
# $Id: paplot.cfg 37 2016-02-16 05:19:48Z aokada $
# $Rev: 37 $
# </font>
[gene]
<font color="green"># name = gh19</font>

[style]
name = default

[sv]
<font color="green"># use_chrs = </font>

[qc]
chart_coverage=True
chart_average=True
chart_mapped=True
chart_insert=True
chart_duplicate=True
chart_length=True

[result_format_sv]
suffix = .genomonSV.result.txt

sept = \t
header = False
col_pos_chr1 = 0
col_pos_start = 1
col_pos_dir1 = 2
col_pos_chr2 = 3
col_pos_end = 4
col_pos_dir2 = 5
col_pos_type = 7
col_pos_gene_name1 = 8
col_pos_gene_name2 = 9
#col_pos_ID =

[result_format_summary]
suffix = .tsv

sept = \t
header = True
#col_pos_ID =
col_pos_duplicate_reads = 26
col_pos_mapped_reads = 17
col_pos_total_reads = 14
col_pos_average_depth = 29
col_pos_mean_insert_size = 23
col_pos_ratio_2x = 31
col_pos_ratio_10x = 32
col_pos_ratio_20x = 33
col_pos_ratio_30x = 34
col_pos_read_length_r1 = 6
col_pos_read_length_r2 = 7

</pre>


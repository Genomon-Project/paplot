# -*- coding: utf-8 -*-
"""
Created on Wed Dec 02 17:43:52 2015

@author: okada

$Id: run_qc.py 40 2016-02-16 08:58:53Z aokada $
$Rev: 40 $
"""
prog = "pa_plot qc"

def main(argv):
    from paplot import tools
    from paplot import qc
    from paplot import prep
    import argparse
    import glob
    
    
    parser = argparse.ArgumentParser(prog = prog)
    
    parser.add_argument("--version", action = "version", version = tools.version_text())
    parser.add_argument("input", help = "input files path", type = str)
    parser.add_argument("output_dir", help = "output file path", type = str)
    parser.add_argument("project_name", help = "project name", type = str)
    parser.add_argument("--config_file", help = "config file", type = str, default = "")
    
    args = parser.parse_args(argv)
    
    # config
    if len(args.config_file) > 0:
        [config, conf_file] = tools.load_config(args.config_file)
    else:
        [config, conf_file] = tools.load_config("")

    # call functions
    input_list = glob.glob(args.input)
    if len(input_list) == 0:
        print "input no file."
        return
        
    # dirs
    output_html_dir = tools.create_dirs(args.output_dir, args.project_name)
    
    if prep.merge_result(input_list, output_html_dir + "/merge_qc.csv", "summary", config) == False:
        print "input file is invalid."
        return
    if prep.extract_result(output_html_dir + "/merge_qc.csv", output_html_dir + "/data_qc.csv", "summary", config) == False:
        print "input file is invalid."
        return
    if qc.convert_tojs(output_html_dir + "/data_qc.csv", output_html_dir + "/data_qc.js") == False:
        print "input file is invalid."
        return
        
    qc.create_html(output_html_dir, "graph_qc.html", args.project_name, config)

    
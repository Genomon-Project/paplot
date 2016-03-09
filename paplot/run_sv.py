# -*- coding: utf-8 -*-
"""
Created on Wed Dec 02 17:43:52 2015

@author: okada

$Id: run_sv.py 65 2016-03-08 05:18:34Z aokada $
$Rev: 65 $
"""
prog = "pa_plot sv"

def main(argv):
    from paplot import tools
    from paplot import sv
    from paplot import prep
    import argparse
    
    parser = argparse.ArgumentParser(prog = prog)
    
    parser.add_argument("--version", action = "version", version = tools.version_text())
    parser.add_argument("input", help = "input files path", type = str)
    parser.add_argument("output_dir", help = "output file path", type = str)
    parser.add_argument("project_name", help = "project name", type = str)
    parser.add_argument("--config_file", help = "config file", type = str, default = "")
    
    args = parser.parse_args(argv)
    
    # config
    if len(args.config_file) > 0:
        [config, conf_file] = tools.load_config(tools.win_to_unix(args.config_file))
    else:
        [config, conf_file] = tools.load_config("")

    input_list = get_inputlist(args.input)
    if len(input_list) == 0:
        print ("input no file.")
        return
        
    # dirs
    output_html_dir = prep.create_dirs(tools.win_to_unix(args.output_dir), args.project_name, config)
        
    if prep.merge_result(input_list, output_html_dir + "/merge_sv.csv", "sv", config) == False:
        print ("prep.merge_result: input file is invalid.")
        return
    if prep.extract_result(output_html_dir + "/merge_sv.csv", output_html_dir + "/data_sv.csv", "sv", config) == False:
        print ("prep.extract_result: input file is invalid.")
        return
    sv.output_html(output_html_dir + "/data_sv.csv", output_html_dir + "/data_sv.js", \
                output_html_dir, "graph_sv.html", args.project_name, config)
    
    prep.create_index(args.output_dir,  args.project_name, config)
    
# -*- coding: utf-8 -*-
"""
Created on Wed Dec 02 17:43:52 2015

@author: okada

$Id: run_sv.py 117 2016-06-29 01:43:38Z aokada $
"""
prog = "pa_plot sv"

def main(argv):
    import paplot.subcode.tools as tools
    import paplot.subcode.merge as merge
    import paplot.sv as sv
    import paplot.prep as prep
    import argparse
    
    parser = argparse.ArgumentParser(prog = prog)
    
    parser.add_argument("--version", action = "version", version = tools.version_text())
    parser.add_argument("input", help = "input files path", type = str)
    parser.add_argument("output_dir", help = "output file path", type = str)
    parser.add_argument("project_name", help = "project name", type = str)
    parser.add_argument("--config_file", help = "config file", type = str, default = "")
    parser.add_argument("--remarks", help = "optional text", type = str, default = "")
    
    args = parser.parse_args(argv)
    
    # config
    if len(args.config_file) > 0:
        [config, conf_file] = tools.load_config(tools.win_to_unix(args.config_file))
    else:
        [config, conf_file] = tools.load_config("")
        
    if len(args.remarks) > 0:
        tools.config_set(config, "style", "remarks", args.remarks)
        
    input_list = tools.get_inputlist(args.input)
    if len(input_list) == 0:
        print ("input no file.")
        return
    
    [sec_in, sec_out] = tools.get_section("sv")
    id_list = tools.get_IDlist(input_list, tools.config_getstr(config, sec_in, "suffix"))
    
    # dirs
    output_html_dir = prep.create_dirs(tools.win_to_unix(args.output_dir), args.project_name, config)
    positions = merge.merge_result(input_list, id_list, output_html_dir + "/data_ca.csv", "sv", config, extract = True)
    if positions == {}:
        print ("merge.merge_result: input file is invalid.")
        return
    sv.output_html(output_html_dir + "/data_ca.csv", output_html_dir + "/data_ca.js", \
                output_html_dir, "graph_ca.html", args.project_name, positions, config)
    
    prep.create_index(args.output_dir,  args.project_name, config)
    
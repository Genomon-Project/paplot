# -*- coding: utf-8 -*-
"""
Created on Wed Dec 02 17:43:52 2015

@author: okada

$Id: run_conf.py 117 2016-06-29 01:43:38Z aokada $
"""
prog = "pa_plot conf"

def main(argv):
    import paplot.subcode.tools as tools
    import argparse
    
    parser = argparse.ArgumentParser(prog = prog)

    parser.add_argument("--version", action = "version", version = tools.version_text())
    parser.add_argument("--config_file", help = "config file", type = str, default = "")

    args = parser.parse_args(argv)
    
    # config
    [config, conf_file] = tools.load_config(args.config_file)
    
    tools.print_conf(config, conf_file, "paplot")
    

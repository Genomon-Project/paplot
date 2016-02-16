# -*- coding: utf-8 -*-
"""
Created on Wed Dec 02 17:43:52 2015

@author: okada

$Id: run_conf.py 35 2016-02-15 09:44:57Z aokada $
$Rev: 35 $
"""
prog = "pa_plot conf"

def main(argv):
    from paplot import tools
    from paplot import prep
    import argparse
    
    parser = argparse.ArgumentParser(prog = prog)

    parser.add_argument("--version", action = "version", version = tools.version_text())
    parser.add_argument("--config_file", help = "config file", type = str, default = "")
    parser.add_argument("--config_text", help = "config text", type = str, default = "")

    args = parser.parse_args(argv)
    
    # config
    if len(args.config_file) > 0:
        [config, conf_file] = tools.load_config(args.config_file)
    elif len(args.config_text) > 0:
        config = tools.parse_config(args.config_text)
        conf_file = ""
    else:
        [config, conf_file] = tools.load_config("")
    
    prep.print_conf(config, conf_file)
    

# -*- coding: utf-8 -*-
"""
Created on Wed Dec 02 17:43:52 2015

@author: okada

$Id: run.py 179 2016-11-07 03:54:23Z aokada $
"""

import paplot.subcode.tools as tools
import paplot.subcode.merge as merge
import paplot.prep as prep

def conf_main(args):
    
    # config
    [config, conf_file] = tools.load_config(tools.win_to_unix(args.config_file))
    
    tools.print_conf(config, conf_file, "paplot")

def index_main(args):
    
    # config
    [config, conf_file] = tools.load_config(tools.win_to_unix(args.config_file))
        
    # dirs
    import os
    
    output_dir = os.path.abspath(args.output_dir)
    if (os.path.exists(output_dir) == False):
        os.makedirs(output_dir)

    prep.recreate_index(config, tools.win_to_unix(args.output_dir), remarks = args.remarks)
                      
def qc_main(args):
    import paplot.qc as qc
    
    # config
    [config, conf_file] = tools.load_config(tools.win_to_unix(args.config_file))
        
    input_list = tools.get_inputlist(tools.win_to_unix(args.input))
    if len(input_list) == 0:
        print ("input no file.")
        return
    
    [sec_in, sec_out] = tools.get_section("qc")
    id_list = tools.get_IDlist(input_list, tools.config_getstr(config, sec_in, "suffix"))
    
    # dirs
    output_html_dir = prep.create_dirs(tools.win_to_unix(args.output_dir), args.project_name, config)
    positions = merge.merge_result(input_list, id_list, output_html_dir + ("/data_%s.csv" % args.ellipsis), "qc", config, extract = True)
    if positions == {}:
        print ("merge.merge_result: input file is invalid.")
        return
    
    html_name = "graph_%s.html" % args.ellipsis
    params_html = {"dir": output_html_dir, \
                 "data": "data_%s.csv" % args.ellipsis, \
                 "js": "data_%s.js" % args.ellipsis, \
                 "html": html_name, \
                 "project": args.project_name, \
                 "title": args.title, \
                 }
    qc.output_html(params_html, positions, config)

    prep.create_index(config, tools.win_to_unix(args.output_dir), html_name, args.project_name, args.title, 
                      overview = args.overview, remarks = args.remarks)

def ca_main(args):
    import paplot.ca as ca
    
    # config
    [config, conf_file] = tools.load_config(tools.win_to_unix(args.config_file))
        
    input_list = tools.get_inputlist(tools.win_to_unix(args.input))
    if len(input_list) == 0:
        print ("input no file.")
        return
    
    [sec_in, sec_out] = tools.get_section("ca")
    id_list = tools.get_IDlist(input_list, tools.config_getstr(config, sec_in, "suffix"))
    
    # dirs
    output_html_dir = prep.create_dirs(tools.win_to_unix(args.output_dir), args.project_name, config)
    positions = merge.merge_result(input_list, id_list, output_html_dir + ("/data_%s.csv" % args.ellipsis), "ca", config, extract = True)
    if positions == {}:
        print ("merge.merge_result: input file is invalid.")
        return
    
    html_name = "graph_%s.html" % args.ellipsis
    params_html = {"dir": output_html_dir, \
                 "data": "data_%s.csv" % args.ellipsis, \
                 "js": "data_%s.js" % args.ellipsis, \
                 "html": html_name, \
                 "project": args.project_name, \
                 "title": args.title, \
                 }
    ca.output_html(params_html, positions, config)
    
    prep.create_index(config, tools.win_to_unix(args.output_dir), html_name, args.project_name, args.title, 
                      overview = args.overview, remarks = args.remarks)
    
    
def mutation_main(args):
    import paplot.mut as mut
    
    # config
    [config, conf_file] = tools.load_config(tools.win_to_unix(args.config_file))
        
    input_list = tools.get_inputlist(tools.win_to_unix(args.input))
    if len(input_list) == 0:
        print ("input no file.")
        return
    
    [sec_in, sec_out] = tools.get_section("mutation")
    id_list = tools.get_IDlist(input_list, tools.config_getstr(config, sec_in, "suffix"))
    
    # dirs
    output_html_dir = prep.create_dirs(tools.win_to_unix(args.output_dir), args.project_name, config)
    positions = merge.merge_result(input_list, id_list, output_html_dir + ("/data_%s.csv" % args.ellipsis), "mutation", config, extract = True)
    if positions == {}:
        print ("merge.merge_result: input file is invalid.")
        return
    
    html_name = "graph_%s.html" % args.ellipsis
    params_html = {"dir": output_html_dir, \
        "data": "data_%s.csv" % args.ellipsis, \
        "js": "data_%s.js" % args.ellipsis, \
        "html": html_name, \
        "project": args.project_name, \
        "title": args.title, \
    }
    mut.output_html(params_html, positions, config)
    
    prep.create_index(config, tools.win_to_unix(args.output_dir), html_name, args.project_name, args.title, 
                      overview = args.overview, remarks = args.remarks)
    
    
def signature_main(args):
    import paplot.signature as signature

    # config
    [config, conf_file] = tools.load_config(tools.win_to_unix(args.config_file))
        
    input_list = tools.get_inputlist(tools.win_to_unix(args.input))
    if len(input_list) == 0:
        print ("input no file.")
        return
    
    if args.ellipsis == "":
        args.ellipsis = "signature%d" % args.sig_num
    if args.sub_text == "":
        args.sub_text = "#sig %d" % args.sig_num
        
    # dirs
    output_html_dir = prep.create_dirs(tools.win_to_unix(args.output_dir), args.project_name, config)    
    
    html_name = "graph_%s.html" % args.ellipsis    
    params_html = {"dir": output_html_dir, \
                 "data": input_list, \
                 "js": "data_%s.js" % args.ellipsis, \
                 "html": html_name, \
                 "project": args.project_name, \
                 "title": args.title, \
                 "sig_num": args.sig_num, \
                 }
    signature.output_html(params_html, config)
    
    prep.create_index(config, tools.win_to_unix(args.output_dir), html_name, args.project_name, args.title, 
                      overview = args.overview, sub_text = args.sub_text, composite = True, remarks = args.remarks)


def pmsignature_main(args):
    import paplot.pmsignature as pmsignature

    # config
    [config, conf_file] = tools.load_config(tools.win_to_unix(args.config_file))
        
    input_list = tools.get_inputlist(tools.win_to_unix(args.input))
    if len(input_list) == 0:
        print ("input no file.")
        return
    
    if args.ellipsis == "":
        args.ellipsis = "pmsignature%d" % args.sig_num
    if args.sub_text == "":
        args.sub_text = "#sig %d" % args.sig_num
        
    # dirs
    output_html_dir = prep.create_dirs(tools.win_to_unix(args.output_dir), args.project_name, config)
    
    html_name = "graph_%s.html" % args.ellipsis
    params_html = {"dir": output_html_dir, \
                 "data": input_list, \
                 "js": "data_%s.js" % args.ellipsis, \
                 "html": html_name, \
                 "project": args.project_name, \
                 "title": args.title, \
                 "sig_num": args.sig_num, \
                 }
    pmsignature.output_html(params_html, config)
    
    prep.create_index(config, tools.win_to_unix(args.output_dir), html_name, args.project_name, args.title, 
                      overview = args.overview, sub_text = args.sub_text, composite = True, remarks = args.remarks)
                      

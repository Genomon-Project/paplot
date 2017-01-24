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
    
    # dirs
    output_html_dir = prep.create_dirs(tools.win_to_unix(args.output_dir), args.project_name, config)    
    
    for input_file in input_list:
        params_in = {"dir": output_html_dir, \
                    "data": input_file, \
                    "project": args.project_name, \
                    "title": args.title, \
                    "ellipsis": args.ellipsis, \
                    }
        params_out = signature.output_html(params_in, config)
        
        if params_out == None:
            continue
        
        if params_out == {}:
            prep.create_index(config, tools.win_to_unix(args.output_dir), "", args.project_name, args.title, 
                              overview = args.overview, sub_text = "",
                              composite = True, remarks = args.remarks)
            continue
            
        sig_num_sift = 0
        if tools.config_getboolean(config, "result_format_signature", "background"):
            sig_num_sift = 1
        prep.create_index(config, tools.win_to_unix(args.output_dir), params_out["html"], args.project_name, args.title, 
                          overview = args.overview, sub_text = "#sig %d" % (params_out["sig_num"] + sig_num_sift),
                          composite = True, remarks = args.remarks)

def pmsignature_main(args):
    import paplot.pmsignature as pmsignature

    # config
    [config, conf_file] = tools.load_config(tools.win_to_unix(args.config_file))
        
    input_list = tools.get_inputlist(tools.win_to_unix(args.input))
    if len(input_list) == 0:
        print ("input no file.")
        return
       
    # dirs
    output_html_dir = prep.create_dirs(tools.win_to_unix(args.output_dir), args.project_name, config)
    
    for input_file in input_list:
        params_in = {"dir": output_html_dir, \
                    "data": input_file, \
                    "project": args.project_name, \
                    "title": args.title, \
                    "ellipsis": args.ellipsis, \
                    }
        params_out = pmsignature.output_html(params_in, config)
        
        if params_out == None:
            continue

        if params_out == {}:
            prep.create_index(config, tools.win_to_unix(args.output_dir), "", args.project_name, args.title, 
                              overview = args.overview, sub_text = "",
                              composite = True, remarks = args.remarks)
            continue
            
        sig_num_sift = 0
        if tools.config_getboolean(config, "result_format_pmsignature", "background"):
            sig_num_sift = 1
        prep.create_index(config, tools.win_to_unix(args.output_dir), params_out["html"], args.project_name, args.title, 
                          overview = args.overview, sub_text = "#sig %d" % (params_out["sig_num"] + sig_num_sift), 
                          composite = True, remarks = args.remarks)
                          

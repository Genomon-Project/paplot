#!/bin/bash
#
set -xv
set -eu

data_dir=./example

# qc
paplot qc ${data_dir}/qc_minimal/data.csv    ./demo qc_minimal    --ellipsis minimal    -c ${data_dir}/qc_minimal/paplot.cfg
paplot qc ${data_dir}/qc_stack/data.csv      ./demo qc_stack      --ellipsis stack      -c ${data_dir}/qc_stack/paplot.cfg
paplot qc ${data_dir}/qc_variation/data.csv  ./demo qc_variation  --ellipsis variation  -c ${data_dir}/qc_variation/paplot.cfg
paplot qc ${data_dir}/qc_brush/data.csv      ./demo qc_brush      --ellipsis brush      -c ${data_dir}/qc_brush/paplot.cfg
paplot qc ${data_dir}/qc_noheader/data.csv   ./demo qc_noheader   --ellipsis noheader   -c ${data_dir}/qc_noheader/paplot.cfg

# ca
paplot ca ${data_dir}/ca_minimal/data.csv  ./demo ca_minimal  --ellipsis minimal  -c ${data_dir}/ca_minimal/paplot.cfg
paplot ca ${data_dir}/ca_group/data.csv    ./demo ca_group    --ellipsis group    -c ${data_dir}/ca_group/paplot.cfg
paplot ca ${data_dir}/ca_option/data.csv   ./demo ca_option   --ellipsis option   -c ${data_dir}/ca_option/paplot.cfg
paplot ca ${data_dir}/ca_noheader/data.csv ./demo ca_noheader --ellipsis noheader -c ${data_dir}/ca_noheader/paplot.cfg

# mutation
paplot mutation ${data_dir}/mutation_minimal/data.csv  ./demo mutation_minimal  --ellipsis minimal  -c ${data_dir}/mutation_minimal/paplot.cfg
paplot mutation ${data_dir}/mutation_option/data.csv   ./demo mutation_option   --ellipsis option   -c ${data_dir}/mutation_option/paplot.cfg
paplot mutation ${data_dir}/mutation_noheader/data.csv ./demo mutation_noheader --ellipsis noheader -c ${data_dir}/mutation_noheader/paplot.cfg
paplot mutation ${data_dir}/mutation_subplot/data.csv  ./demo mutation_subplot  --ellipsis subplot  -c /home/travis/build/Genomon-Project/paplot/tests/example/mutation_subplot/paplot.cfg

# signature
paplot signature ${data_dir}/signature_minimal/data.json        ./demo signature_minimal     --ellipsis signature_minimal -c ${data_dir}/signature_minimal/paplot.cfg
paplot signature "${data_dir}/signature_multi_class/data*.json" ./demo signature_multi_class --ellipsis multi_class       -c ${data_dir}/signature_multi_class/paplot.cfg
paplot signature "${data_dir}/signature_stack/data*.json"       ./demo signature_stack       --ellipsis stack             -c ${data_dir}/signature_stack/paplot.cfg

# pmsignature
paplot pmsignature ${data_dir}/pmsignature_minimal/data.json        ./demo pmsignature_minimal      --ellipsis pmsignature_minimal -c ${data_dir}/pmsignature_minimal/paplot.cfg
paplot pmsignature "${data_dir}/pmsignature_multi_class/data*.json" ./demo pmsignature_multi_class  --ellipsis multi_class         -c ${data_dir}/pmsignature_multi_class/paplot.cfg
paplot pmsignature "${data_dir}/pmsignature_stack/data*.json"       ./demo pmsignature_stack        --ellipsis stack               -c ${data_dir}/pmsignature_stack/paplot.cfg
paplot pmsignature ${data_dir}/pmsignature_nobackground/data.json   ./demo pmsignature_nobackground --ellipsis nobackground        -c ${data_dir}/pmsignature_nobackground/paplot.cfg


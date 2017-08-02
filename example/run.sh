
# mutation
paplot mutation mutation_minimal/data.csv  ./demo1 mutation_minimal  --ellipsis minimal  --config_file ./mutation_minimal/paplot.cfg
paplot mutation mutation_option/data.csv   ./demo1 mutation_option   --ellipsis option   --config_file ./mutation_option/paplot.cfg
paplot mutation mutation_subplot/data.csv  ./demo1 mutation_subplot  --ellipsis subplot  --config_file ./mutation_subplot/paplot.cfg
paplot mutation mutation_noheader/data.csv ./demo1 mutation_noheader --ellipsis noheader --config_file ./mutation_noheader/paplot.cfg

# qc
paplot qc qc_minimal/data.csv    ./demo1 qc_minimal  --ellipsis minimal    --config_file ./qc_minimal/paplot.cfg
paplot qc qc_multi_plot/data.csv ./demo1 qc_multi    --ellipsis multi_plot --config_file ./qc_multi_plot/paplot.cfg
paplot qc qc_brush/data.csv      ./demo1 qc_brush    --ellipsis brush      --config_file ./qc_brush/paplot.cfg
paplot qc qc_noheader/data.csv   ./demo1 qc_noheader --ellipsis noheader   --config_file ./qc_noheader/paplot.cfg

# ca
paplot ca ca_minimal/data.csv  ./demo1 ca_minimal  --ellipsis minimal  --config_file ./ca_minimal/paplot.cfg
paplot ca ca_group/data.csv    ./demo1 ca_group    --ellipsis group   --config_file ./ca_group/paplot.cfg
paplot ca ca_option/data.csv   ./demo1 ca_option   --ellipsis option   --config_file ./ca_option/paplot.cfg
paplot ca ca_noheader/data.csv ./demo1 ca_noheader --ellipsis noheader --config_file ./ca_noheader/paplot.cfg

# signature
paplot signature signature_minimal/data.json ./demo1 signature_minimal --ellipsis signature_minimal --config_file ./signature_minimal/paplot.cfg
paplot signature "signature_multi_class/data*.json" ./demo1 signature_multi_class --ellipsis multi_class --config_file ./signature_multi_class/paplot.cfg
paplot signature "signature_integral/data*.json" ./demo1 signature_integral --ellipsis integral --config_file ./signature_integral/paplot.cfg

# pmsignature
paplot pmsignature pmsignature_minimal/data.json ./demo1 pmsignature_minimal --ellipsis pmsignature_minimal --config_file ./pmsignature_minimal/paplot.cfg
paplot pmsignature "pmsignature_multi_class/data*.json" ./demo1 pmsignature_multi_class --ellipsis multi_class --config_file ./pmsignature_multi_class/paplot.cfg
paplot pmsignature "pmsignature_integral/data*.json" ./demo1 pmsignature_integral --ellipsis integral --config_file ./pmsignature_integral/paplot.cfg
paplot pmsignature pmsignature_nobackground/data.json ./demo1 pmsignature_nobackground --ellipsis nobackground --config_file ./pmsignature_nobackground/paplot.cfg


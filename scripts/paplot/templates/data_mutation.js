mut_data.Ids_keys = utils.create_key_list(mut_data.Ids);
mut_data.genes_keys = utils.create_key_list(mut_data.genes);

function calc_option(format, pos, sum, value) {
    
    var id = pos[0];
    var func = pos[1];
    var gene = pos[2];
    
    var obj = {id: mut_data.Ids[id], group: mut_data.funcs[func], gene: mut_data.genes[gene],
        '#number_gene': mut_data.genes.length, 
        '#number_id': mut_data.Ids.length, 
        '#number_mutaion_all': mut_data.mutations.length, 
        '#sum_mutaion_all': mut_data.mutations_sum,
        '#sum_item_value': sum,
        '#item_value': value,
    };

    return obj;
}
function tooltip_title(format, pos, sum) {
    
    var obj = calc_option(format, pos, sum, 0);
    
    var tooltip = [];
    for (var t in format.format) {
        tooltip.push(utils.text_format(format.format[t], obj));
    }
    return tooltip;
};

function tooltip_partial(format, pos, mutation, loop, value) {
    
    var obj = calc_option(format, pos, 0, value);
    
    var tooltip = [];
    for (var m in mutation) {
        for (var p = 0; p < mutation[m][4].length; p++) {
            for (var p2 = 0; p2 < mutation[m][4][p].length; p2++) {
                obj[mut_data.mutation_header[p2]] = mutation[m][4][p][p2];
            }
            for (var t in format.format) {
                var text = utils.text_format(format.format[t], obj);
                if (tooltip.indexOf(text) < 0){
                    tooltip.push(text);
                    if (loop == false) { break;}
                }
            }
            if (loop == false) { break;}
        }
        if (loop == false) { break;}
    }
    return tooltip;
};

mut_data.get_dataset_id = function () {
    
    var data = [];
    var keys = [];
    var tooltips = {};
    var sum_par_id = [];
    for (var i1=0; i1 < mut_data.Ids_keys.length; i1++) {
        tooltips[mut_data.Ids_keys[i1]] = [];
        sum_par_id[i1] = 0;
    }
    
    // par func
    for (var f=0; f < mut_data.funcs.length; f++) {

        data[f] = [];
        keys[f] = [];

        // par ID
        for (var i2=0; i2 < mut_data.Ids_keys.length; i2++) {
            
            var data_filt = mut_data.mutations.filter(function(item, index){
                if ((item[0] == i2) && (item[1] == f)) return true;
            });
            
            var sum = 0;
            for (var d in data_filt) sum += data_filt[d][3];
            if (sum > 0) {
                data[f].push(sum);
                keys[f].push(mut_data.Ids_keys[i2]);
                tooltips[mut_data.Ids_keys[i2]].push(tooltip_partial(mut_data.tooltip_format.id_partial, [i2, f, null], data_filt, false, sum));
                sum_par_id[i2] += sum;
            }
        }
    }
    for (var i3=0; i3 < mut_data.Ids_keys.length; i3++) {
        var title = tooltip_title(mut_data.tooltip_format.id_title, [i3, null, null], sum_par_id[i3]);
        for (var t = 0; t < title.length; t++) {
            tooltips[mut_data.Ids_keys[i3]].splice(t, 0, title[t]);
        }
    }
    
    return {data: data, keys: keys, tooltips: tooltips};
};

mut_data.get_dataset_checker = function (func_flgs, use_genes) {
    
    // tooltips
    var tooltips_matrix = [];
    {
        for (var i in mut_data.Ids_keys) {
            tooltips_matrix[i] = {};
        }
        
        for (var d1 in mut_data.mutations) {
            var data_tmp = mut_data.mutations[d1];
            if (func_flgs[mut_data.funcs[data_tmp[1]]] == false) continue;
            if (use_genes.indexOf(mut_data.genes_keys[data_tmp[2]]) < 0) continue;
            
            if (tooltips_matrix[data_tmp[0]][mut_data.genes_keys[data_tmp[2]]] == null) {
                var data_filt = mut_data.mutations.filter(function(item, index){
                    if ((item[0] == data_tmp[0]) && (item[2] == data_tmp[2])) return true;
                });
                
                var sum = 0;
                for (var d2 in data_filt) sum += data_filt[d2][3];
                tooltips_matrix[data_tmp[0]][mut_data.genes_keys[data_tmp[2]]] = tooltip_title(mut_data.tooltip_format.checker_title, [data_tmp[0], null, data_tmp[2]], sum);
            }
            var texts = tooltip_partial(mut_data.tooltip_format.checker_partial, [data_tmp[0],data_tmp[1],data_tmp[2]], [data_tmp], true, 1);
            for (var t in texts) {
                tooltips_matrix[data_tmp[0]][mut_data.genes_keys[data_tmp[2]]].push(texts[t]);
            }
        }
    }
    
    var data = [];
    var keys = [];
    var keys2 = [];
    for (var f=0; f < mut_data.funcs.length; f++) {
        
        data[f] = [];
        keys[f] = [];
        keys2[f] = [];
        
        if (func_flgs[mut_data.funcs[f]] == false) continue;
        
        var data_filt2 = mut_data.mutations.filter(function(item, index){
            if (item[1] == f) return true;
        });
        
        // par data
        for (var d3 in data_filt2) {
            if (use_genes.indexOf(mut_data.genes_keys[data_filt2[d3][2]]) < 0) continue;
            data[f].push(1);
            keys[f].push(mut_data.Ids_keys[data_filt2[d3][0]]);
            keys2[f].push(mut_data.genes_keys[data_filt2[d3][2]]);
        }
    }
    
    return {data: data, keys: keys, keys2: keys2, tooltips: tooltips_matrix};
};

function extract_gene(func_flgs, gene_th, gene_max, sort_name_y, sort_asc_y) {

    var g = 0
    var gene_nums = [];
    {
        for (g = 0; g < mut_data.genes_keys.length; g++) {
            gene_nums[g] = 0;
        }
        var gene_Ids = [];
        for (var i in mut_data.Ids_keys) {
            gene_Ids[i] = [];
        }
        for (var d in mut_data.mutations) {
            var data = mut_data.mutations[d];
            if (func_flgs[mut_data.funcs[data[1]]] == false) continue;
            if (gene_Ids[data[0]].indexOf(data[2]) >= 0) continue;
            
            gene_Ids[data[0]].push(data[2]);
            gene_nums[data[2]] += 1;
        }
    }

    // sort
    var gene_obj = [];
    {
        for (g in mut_data.genes_keys) {
            if (gene_nums[g] * 100.0 / mut_data.Ids_keys.length < gene_th) continue;
            if (gene_nums[g] == 0) continue;

            gene_obj.push({name: mut_data.genes[g], num: gene_nums[g]});
        }
        
        var ret = 1;
        if (sort_asc_y[0] == false) ret = -1;
        
        gene_obj.sort(function (a, b) {
            
            if (sort_name_y[0] == "number_of_mutations") {

                if( a.num < b.num ) return -ret;
                if( a.num > b.num ) return ret;
                if( a.name < b.name ) return -ret;
                if( a.name > b.name ) return ret;
                return 0;
            }
            if (sort_name_y[0] == "name") {

                if( a.name < b.name ) return -ret;
                if( a.name > b.name ) return ret;
                return 0;
            }
        });
    }

    var gene_nums_ex = [];
    var gene_keys = [];
    var gene_names = [];
    for (g in gene_obj) {
        if (g >= gene_max) break;
        gene_nums_ex.push(gene_obj[g].num);
        gene_keys.push(mut_data.genes_keys[mut_data.genes.indexOf(gene_obj[g].name)]);
        gene_names.push(gene_obj[g].name);
    }
    
    return {keys: gene_keys, names: gene_names, values: gene_nums_ex, uncut_length: gene_obj.length};
};

mut_data.get_dataset_gene = function (func_flgs, gene_th, gene_max, sort_name_y, sort_asc_y) {
    
    var gene_nums = [];
    var genes = [];
    var g = 0, ex_g = 0, f = 0;
    
    for (f=0; f < mut_data.funcs.length; f++) {
        gene_nums[f] = [];
        genes[f] = [];
    }
    var ex_genes = extract_gene(func_flgs, gene_th, gene_max, sort_name_y, sort_asc_y);

    var gene_ids = [];
    var tooltips = {};
    for (ex_g=0; ex_g < ex_genes.keys.length; ex_g++) {
        g = mut_data.genes_keys.indexOf(ex_genes.keys[ex_g]);
        gene_ids[ex_g] = [];
        tooltips[ex_genes.keys[ex_g]] = tooltip_title(mut_data.tooltip_format.gene_title, [null, null, g], ex_genes.values[ex_g]);
    }
    
    // par func
    for (f=0; f < mut_data.funcs.length; f++) {
        if (func_flgs[mut_data.funcs[f]] == false) continue;
        // par gene
        for (ex_g=0; ex_g < ex_genes.keys.length; ex_g++) {
            g = mut_data.genes_keys.indexOf(ex_genes.keys[ex_g]);
            var data_filt = mut_data.mutations.filter(function(item, index){
                if ((item[2] == g) && (item[1] == f)) return true;
            });
            var sum = 0;
            // par data
            for (var d=0; d < data_filt.length;d++) {
                if (gene_ids[ex_g].indexOf(data_filt[d][0]) >= 0) continue;
                gene_ids[ex_g].push(data_filt[d][0]);
                sum = sum + 1;
            }
            if (sum > 0) {
                var value = sum * 100.0 / mut_data.Ids_keys.length;
                
                gene_nums[f].push(value);
                genes[f].push(ex_genes.keys[ex_g]);
                
                var texts = tooltip_partial(mut_data.tooltip_format.gene_partial, [null, f, g], data_filt, false, sum);
                for (var t in texts) {
                    tooltips[ex_genes.keys[ex_g]].push(texts[t]);
                }
            }
        }
    }

    return {data: gene_nums, keys: genes, tooltips: tooltips, total_keys: ex_genes.keys, total_names: ex_genes.names, total_nums: ex_genes.values, uncut_length: ex_genes.uncut_length};
};
    
mut_data.get_id_nums = function (func_flgs, data, keys) {

    var id_nums = [];
    for (var i in mut_data.Ids_keys) {
        id_nums[i] = 0;
    }
    
    for (var f=0; f < data.length; f++) {
        if (func_flgs[mut_data.funcs[f]] == false) continue;
        
        for (var d=0; d < data[f].length; d++) {
            id_nums[mut_data.Ids_keys.indexOf(keys[f][d])] += data[f][d];
        }
    }
    
    return id_nums;
};

// for water-fall
mut_data.get_id_flg_par_gene = function (name, func_flgs) {
    
    var id_nums = [];
    
    // par ID
    var idx_g = 0;
    
    for (var g = 0; g < mut_data.genes_keys.length; g++) {
        if (mut_data.genes_keys[g] == name) {
            idx_g = g;
            break;
        }
    }
    
    for (var i in mut_data.Ids_keys) {
        
        var data_filt = mut_data.mutations.filter(function(item, index){
            if ((item[2] == idx_g) && (item[0] == i)) return true;
        });
        
        var sum = 0;
        // par data
        for (var d=0; d < data_filt.length;d++) {
            // count only visible funcs
            if (func_flgs[mut_data.funcs[data_filt[d][1]]] == false) continue;
            sum = 1;
            break;
        }
        
        id_nums.push(sum);
    }
    
    return id_nums;
};

mut_data.get_sub_data = function (name) {
    var i = 0;
    var sub = {}
    // par sub
    for (i = 0; i < mut_data.subdata.length; i++) {
        if (mut_data.subdata[i].name == name) {
            sub = mut_data.subdata[i];
            break;
        }
    }
    if (sub.length == 0) return {};

    // par item
    var stack_length = sub.item.length;
    if (sub.type == "range") stack_length = stack_length + 1;
    
    var gradient_stack_d = [];
    if (sub.type == "gradient") {
        
        var gradient_stack = [];
        for (i = 0; i < sub.data.length; i++) {
            gradient_stack.push(sub.data[i][1]);
        }
        gradient_stack.sort(function(a,b){
            if( a < b ) return -1;
            if( a > b ) return 1;
            return 0;
        });
        gradient_stack_d = gradient_stack.filter(function (x, i, self) {
            return self.indexOf(x) === i;
        });
        stack_length = gradient_stack_d.length;
    }
    
    var stack = [];
    var tooltips = {};
    
    for (i = 0; i < stack_length; i++) {
        stack[i] = {};
        stack[i].data = [];
        stack[i].keys = [];
        
        if (sub.type == "gradient") {
            stack[i].color_n = "";
        }
        else {
            stack[i].color_n = sub.colors_n[i];
        }
    }
    
    // par data
    for (i = 0; i < sub.data.length; i++) {
        
        var id = mut_data.Ids_keys[sub.data[i][0]];
        var s = -1, l = 0;
        var val = "";
        
        if (sub.type == "range") {
            val = sub.data[i][1];
            for (l = 0; l < sub.item.length; l++) {
                if (val < sub.item[l]) {
                    s = l;
                    break;
                }
            }
            if (s == -1) {
                s = sub.item.length;
            }
        }
        else if (sub.type == "gradient") {
            val = sub.data[i][1];
            for (l = 0; l < gradient_stack_d.length; l++) {
                if (val == gradient_stack_d[l]) {
                    s = l;
                    break;
                }
            }
            if (stack[s].color_n == "") {
                stack[s].color_n = utils.color_gradient(val, sub.item, sub.colors_n);
            }
        }
        else { // "fix"
            s = sub.data[i][1];
            if (s >= sub.item.length) {
                console.log(name + ": not contain:" + s);
                continue;
            }
            val = sub.item[s];
        }
        
        var p = stack[s].data.length;
        stack[s].data[p] = 1;
        stack[s].keys[p] = id;
        tooltips[id] = [id + ", " + val];
    }
    
    return {stack: stack, tooltips: tooltips, label: {type: sub.type, text: sub.label, color: sub.colors_n}};
};
mut_data.get_sub_values = function (name) {
    var values = [];
    
    for (var f = 0; f < mut_data.subdata.length; f++) {
        if (mut_data.subdata[f].name != name) continue;
        
        // par ID
        for (var i in mut_data.Ids_keys) {
            
            var data_filt = mut_data.subdata[f].data.filter(function(item, index){
                if (item[0] == i) return true;
            });
            
            values.push(data_filt[0][1]);
        }
        break;
    }
    return values;
};

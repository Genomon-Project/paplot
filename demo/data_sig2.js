(function() {
sig_data = {};

sig_data.tooltip_format = {
    signature_title:{format:[[{label:'{sig}',type:'str',keys:['sig',],ext:''},],], keys: '{sig} '},
    signature_partial:{format:[[{label:'{route}',type:'str',keys:['route',],ext:''},{label:': ',type:'fix',keys:[],ext:''},{label:'{#sum_item_value}',type:'numeric',keys:['#sum_item_value',],ext:'6.2'},],], keys: '{#sum_item_value} {route} '},
    mutation_title:{format:[[{label:'{id}',type:'str',keys:['id',],ext:''},],], keys: '{id} '},
    mutation_partial:{format:[[{label:'{sig}',type:'str',keys:['sig',],ext:''},{label:': ',type:'fix',keys:[],ext:''},{label:'{#sum_item_value}',type:'numeric',keys:['#sum_item_value',],ext:'.2'},],], keys: '{#sum_item_value} {sig} '},
};

sig_data.signatures = ['signature 1',];
sig_data.sig_colors = ['#f39700',];
sig_data.dataset_sig = [[[10018.463,8112.0106,9076.6361,5070.8689,19496.2532,18838.5448,16625.6694,19328.0607,23250.75,19512.7717,20876.3295,16061.0078,18811.8861,15964.8632,7045.6177,18075.0599],[1645.5833,1955.3806,2687.4637,1726.5732,5250.3047,7541.97,22549.0943,4434.1244,6679.6544,5795.5905,7946.6984,9540.8983,8794.8601,8050.8221,3867.5091,12326.9466],[8119.38,7666.5729,66027.3526,8265.9932,11316.6359,17778.6403,77015.639,15363.9611,16430.875,25414.6467,78839.9076,24517.0575,13588.7623,17224.8795,33977.2858,12808.719],[941.2381,1611.3303,1133.294,0,0,2032.5852,6274.9945,370.4524,91.5521,1889.5622,513.1969,0.003,0,144.4215,0,0],[9629.2844,4496.7161,17364.3573,8575.8483,6225.5499,3498.1722,30475.0266,9451.4878,9120.0219,13822.2191,24924.0449,9254.1333,3383.1898,5321.1345,9445.826,3139.9858],[0,701.3784,2404.125,143.9431,0,5459.6484,4756.8995,279.2463,1029.489,2500.9475,7257.3316,478.3534,99.426,301.7394,0,143.265],],];
sig_data.dataset_sig_max = 78839.9076;
sig_data.route_id = ['AA','AC','AG','AT','CA','CC','CG','CT','GA','GC','GG','GT','TA','TC','TG','TT',];
sig_data.substitution = [{name: 'C > A', color: '#1BBDEB', route: ['ApCpA','ApCpC','ApCpG','ApCpT','CpCpA','CpCpC','CpCpG','CpCpT','GpCpA','GpCpC','GpCpG','GpCpT','TpCpA','TpCpC','TpCpG','TpCpT',],},{name: 'C > G', color: '#211D1E', route: ['ApCpA','ApCpC','ApCpG','ApCpT','CpCpA','CpCpC','CpCpG','CpCpT','GpCpA','GpCpC','GpCpG','GpCpT','TpCpA','TpCpC','TpCpG','TpCpT',],},{name: 'C > T', color: '#E62623', route: ['ApCpA','ApCpC','ApCpG','ApCpT','CpCpA','CpCpC','CpCpG','CpCpT','GpCpA','GpCpC','GpCpG','GpCpT','TpCpA','TpCpC','TpCpG','TpCpT',],},{name: 'T > A', color: '#CFCFCF', route: ['ApTpA','ApTpC','ApTpG','ApTpT','CpTpA','CpTpC','CpTpG','CpTpT','GpTpA','GpTpC','GpTpG','GpTpT','TpTpA','TpTpC','TpTpG','TpTpT',],},{name: 'T > C', color: '#ACD577', route: ['ApTpA','ApTpC','ApTpG','ApTpT','CpTpA','CpTpC','CpTpG','CpTpT','GpTpA','GpTpC','GpTpG','GpTpT','TpTpA','TpTpC','TpTpG','TpTpT',],},{name: 'T > G', color: '#EDC7C4', route: ['ApTpA','ApTpC','ApTpG','ApTpT','CpTpA','CpTpC','CpTpG','CpTpT','GpTpA','GpTpC','GpTpG','GpTpT','TpTpA','TpTpC','TpTpG','TpTpT',],},];
sig_data.Ids = ['TCGA-OR-A5J1','TCGA-OR-A5J2','TCGA-OR-A5J3','TCGA-OR-A5J4','TCGA-OR-A5J5','TCGA-OR-A5J6','TCGA-OR-A5J7','TCGA-OR-A5J8','TCGA-OR-A5J9','TCGA-OR-A5JA','TCGA-OR-A5JB','TCGA-OR-A5JC','TCGA-OR-A5JD','TCGA-OR-A5JE','TCGA-OR-A5JF','TCGA-OR-A5JG','TCGA-OR-A5JH','TCGA-OR-A5JI','TCGA-OR-A5JJ','TCGA-OR-A5JK','TCGA-OR-A5JL','TCGA-OR-A5JM','TCGA-OR-A5JO','TCGA-OR-A5JP','TCGA-OR-A5JQ','TCGA-OR-A5JR','TCGA-OR-A5JS','TCGA-OR-A5JT','TCGA-OR-A5JU','TCGA-OR-A5JV','TCGA-OR-A5JW','TCGA-OR-A5JX','TCGA-OR-A5JY','TCGA-OR-A5JZ','TCGA-OR-A5K0','TCGA-OR-A5K1','TCGA-OR-A5K2','TCGA-OR-A5K3','TCGA-OR-A5K4','TCGA-OR-A5K5','TCGA-OR-A5K6','TCGA-OR-A5K8','TCGA-OR-A5K9','TCGA-OR-A5KB','TCGA-OR-A5KO','TCGA-OR-A5KP','TCGA-OR-A5KQ','TCGA-OR-A5KS','TCGA-OR-A5KT','TCGA-OR-A5KU','TCGA-OR-A5KV','TCGA-OR-A5KW','TCGA-OR-A5KX','TCGA-OR-A5KY','TCGA-OR-A5KZ','TCGA-OR-A5L1','TCGA-OR-A5L2','TCGA-OR-A5L3','TCGA-OR-A5L4','TCGA-OR-A5L5','TCGA-OR-A5L6','TCGA-OR-A5L8','TCGA-OR-A5L9','TCGA-OR-A5LA','TCGA-OR-A5LB','TCGA-OR-A5LC','TCGA-OR-A5LD','TCGA-OR-A5LE','TCGA-OR-A5LF','TCGA-OR-A5LG','TCGA-OR-A5LH','TCGA-OR-A5LI','TCGA-OR-A5LJ','TCGA-OR-A5LK','TCGA-OR-A5LL','TCGA-OR-A5LN','TCGA-OR-A5LO','TCGA-OR-A5LP','TCGA-OR-A5LR','TCGA-OR-A5LS','TCGA-OR-A5LT','TCGA-OU-A5PI','TCGA-P6-A5OF','TCGA-P6-A5OH','TCGA-PA-A5YG','TCGA-PK-A5H8','TCGA-PK-A5H9','TCGA-PK-A5HA','TCGA-PK-A5HB','TCGA-PK-A5HC',];

// [ID, signature, value]
sig_data.mutations = [[0,0,0.758900],[0,1,0.241000],[1,0,0.828600],[1,1,0.171300],[2,0,0.905300],[2,1,0.094600],[3,0,0.520700],[3,1,0.479200],[4,0,1.000000],[4,1,0.000000],[5,0,0.826400],[5,1,0.173500],[6,0,0.759700],[6,1,0.240200],[7,0,0.796100],[7,1,0.203800],[8,0,0.819900],[8,1,0.180000],[9,0,0.999900],[9,1,0.000000],[10,0,0.680600],[10,1,0.319300],[11,0,0.829500],[11,1,0.170400],[12,0,0.702100],[12,1,0.297800],[13,0,0.728400],[13,1,0.271500],[14,0,0.601600],[14,1,0.398300],[15,0,0.825300],[15,1,0.174600],[16,0,0.825000],[16,1,0.174900],[17,0,0.631600],[17,1,0.368300],[18,0,0.706200],[18,1,0.293700],[19,0,0.800400],[19,1,0.199500],[20,0,0.863100],[20,1,0.136800],[21,0,0.797200],[21,1,0.202700],[22,0,0.865500],[22,1,0.134400],[23,0,0.733400],[23,1,0.266500],[24,0,0.774700],[24,1,0.225200],[25,0,0.724300],[25,1,0.275600],[26,0,0.888200],[26,1,0.111700],[27,0,0.809800],[27,1,0.190100],[28,0,0.851300],[28,1,0.148600],[29,0,0.884000],[29,1,0.115900],[30,0,0.702700],[30,1,0.297200],[31,0,0.856700],[31,1,0.143200],[32,0,0.717800],[32,1,0.282100],[33,0,0.859900],[33,1,0.140000],[34,0,0.785700],[34,1,0.214200],[35,0,0.703000],[35,1,0.296900],[36,0,0.722500],[36,1,0.277400],[37,0,0.794900],[37,1,0.205000],[38,0,0.999200],[38,1,0.000700],[39,0,0.630900],[39,1,0.369000],[40,0,0.805100],[40,1,0.194800],[41,0,0.768700],[41,1,0.231200],[42,0,0.738000],[42,1,0.261900],[43,0,0.612800],[43,1,0.387100],[44,0,0.913000],[44,1,0.086900],[45,0,0.862300],[45,1,0.137600],[46,0,0.898200],[46,1,0.101700],[47,0,0.781900],[47,1,0.218000],[48,0,0.737700],[48,1,0.262200],[49,0,0.814500],[49,1,0.185400],[50,0,0.850100],[50,1,0.149800],[51,0,0.744300],[51,1,0.255600],[52,0,0.745200],[52,1,0.254700],[53,0,0.867900],[53,1,0.132000],[54,0,0.692400],[54,1,0.307500],[55,0,0.753000],[55,1,0.246900],[56,0,0.747000],[56,1,0.252900],[57,0,0.728000],[57,1,0.271900],[58,0,0.899400],[58,1,0.100500],[59,0,0.790700],[59,1,0.209200],[60,0,0.867900],[60,1,0.132000],[61,0,0.759800],[61,1,0.240100],[62,0,0.842000],[62,1,0.157900],[63,0,0.899900],[63,1,0.100000],[64,0,0.947800],[64,1,0.052100],[65,0,0.892700],[65,1,0.107200],[66,0,0.583300],[66,1,0.416600],[67,0,0.853600],[67,1,0.146300],[68,0,0.903500],[68,1,0.096400],[69,0,0.827200],[69,1,0.172700],[70,0,0.727400],[70,1,0.272500],[71,0,0.838300],[71,1,0.161600],[72,0,0.989300],[72,1,0.010600],[73,0,0.800600],[73,1,0.199300],[74,0,0.720200],[74,1,0.279700],[75,0,0.925200],[75,1,0.074700],[76,0,0.760200],[76,1,0.239700],[77,0,0.805400],[77,1,0.194500],[78,0,0.743600],[78,1,0.256300],[79,0,0.791300],[79,1,0.208600],[80,0,0.929400],[80,1,0.070500],[81,0,0.824900],[81,1,0.175000],[82,0,0.730100],[82,1,0.269800],[83,0,0.635100],[83,1,0.364800],[84,0,0.685500],[84,1,0.314400],[85,0,0.721600],[85,1,0.278300],[86,0,0.777400],[86,1,0.222500],[87,0,0.860100],[87,1,0.139800],[88,0,0.701900],[88,1,0.298000],[89,0,0.748200],[89,1,0.251700],];

sig_data.esc_Ids = [];
for (var i=0; i < sig_data.Ids.length; i++) {
    sig_data.esc_Ids[i] = 'Key' + i;
}

function tooltip_text(format, obj) {
    var tooltip = [];
    for (var t in format.format) {
        tooltip.push(utils.text_format(format.format[t], obj));
    }
    return tooltip;
};

sig_data.get_data_par_signature = function (signature_id) {
    
    var tooltips = [];

    // par change
    for (var i=0; i < sig_data.substitution.length; i++) {
        
        var sum = 0;
        
        var obj = {
            'sig': sig_data.substitution[i].name,
        };
        tooltips[i] = [];
        segment_index = -1;
        for (var j=0; j < sig_data.dataset_sig[signature_id][i].length; j++) {
            if (j%16 == 0) {
                segment_index += 1;
                tooltips[i][segment_index] = [];
            }
            obj['route'] = sig_data.substitution[i].route[j];
            obj['#sum_item_value'] = sig_data.dataset_sig[signature_id][i][j];
            
            tooltips[i][segment_index].push(tooltip_text(sig_data.tooltip_format['signature_partial'], obj));
            sum += sig_data.dataset_sig[signature_id][i][j];
        }
        
        obj['#sum_group_value'] = sum;
        
        title = tooltip_text(sig_data.tooltip_format['signature_title'], obj);
        for (var s = 0; s < tooltips[i].length; s++) {
            for (var t = 0; t < title.length; t++) {
                tooltips[i][s].splice(t, 0, title[t]);
            }
        }
    }
    
    return {data: sig_data.dataset_sig[signature_id], tooltip: tooltips};
};

sig_data.get_bars_data = function () {
    
    var data = [];
    var keys = [];
    var tooltips = {};
    var sum_par_id = [];
    for (var i=0; i < sig_data.Ids.length; i++) {
        tooltips[sig_data.esc_Ids[i]] = [];
        sum_par_id[i] = 0;
    }
    
    // par func
    for (var f=0; f < sig_data.signatures.length; f++) {

        data[f] = [];
        keys[f] = [];

        // par ID
        for (var i=0; i < sig_data.Ids.length; i++) {
            
            var data_filt = sig_data.mutations.filter(function(item, index){
                if ((item[0] == i) && (item[1] == f)) return true;
            });
            
            //var sum = data_filt.length;
            var sum = 0;
            for (var s = 0; s < data_filt.length; s++) {
                sum += data_filt[s][2];
            }
            
            if (sum > 0) {
                data[f].push(sum);
                keys[f].push(sig_data.esc_Ids[i]);
                
                var obj = {
                    '#sum_mutaion_all': sig_data.mutations.length,
                    '#sum_item_value': sum,
                    'id': sig_data.Ids[i],
                    'sig': sig_data.signatures[f],
                };
                tooltips[sig_data.esc_Ids[i]].push(tooltip_text(sig_data.tooltip_format["mutation_partial"], obj));
                sum_par_id[i] += sum;
            }
        }
    }
    for (var i=0; i < sig_data.Ids.length; i++) {
        var obj = {
            '#sum_mutaion_all': sig_data.mutations.length,
            '#sum_item_value': sum_par_id[i],
            'id': sig_data.Ids[i],
        };
        
        title = tooltip_text(sig_data.tooltip_format["mutation_title"], obj);
        for (var t = 0; t < title.length; t++) {
            tooltips[sig_data.esc_Ids[i]].splice(t, 0, title[t]);
        }
    }
    
    return {data: data, key: keys, tooltip: tooltips};
};
})();
Object.freeze(sig_data);


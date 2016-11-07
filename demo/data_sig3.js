(function() {
sig_data = {};

sig_data.tooltip_format = {
    signature_title:{format:[[{label:'{sig}',type:'str',keys:['sig',],ext:''},],], keys: '{sig} '},
    signature_partial:{format:[[{label:'{route}',type:'str',keys:['route',],ext:''},{label:': ',type:'fix',keys:[],ext:''},{label:'{#sum_item_value}',type:'numeric',keys:['#sum_item_value',],ext:'6.2'},],], keys: '{#sum_item_value} {route} '},
    mutation_title:{format:[[{label:'{id}',type:'str',keys:['id',],ext:''},],], keys: '{id} '},
    mutation_partial:{format:[[{label:'{sig}',type:'str',keys:['sig',],ext:''},{label:': ',type:'fix',keys:[],ext:''},{label:'{#sum_item_value}',type:'numeric',keys:['#sum_item_value',],ext:'.2'},],], keys: '{#sum_item_value} {sig} '},
};

sig_data.signatures = ['signature 1','signature 2',];
sig_data.sig_colors = ['#f39700','#6cbb5a',];
sig_data.dataset_sig = [[[3546.7495,1823.925,3870.9015,0,1607.544,7642.4097,4667.6474,5154.8277,7832.9564,11517.6712,15107.385,4305.2137,0.0002,0,780.0088,607.5225],[1062.3829,2070.5561,2549.7155,1802.2332,3373.5659,7608.5841,27252.6156,2948.9574,7700.845,5253.4783,7681.7365,12041.2745,4122.1412,6759.4598,2729.4379,10323.6733],[9487.0174,9244.9021,88180.6334,10607.4569,11457.7504,20379.0339,100867.1858,16359.049,22077.1118,33643.8641,105090.99,30850.2726,11513.4833,19809.4333,45135.0674,13553.1636],[1422.4258,2338.6151,963.1812,0,0,1661.197,3314.2226,267.4218,0.0008,2656.1341,249.801,110.8246,0,218.9553,0,0],[12598.4296,5973.268,22502.0976,12126.0069,7608.4139,5296.9787,40421.8096,12537.5694,12018.6883,18749.1471,33387.5217,12171.5914,4998.2346,8022.9161,13025.1291,4789.5738],[87.3821,1521.2286,3443.6804,228.0169,0,8194.3349,6412.0657,636.2045,1778.2502,3664.8497,10497.5343,935.5435,145.7665,766.1433,0.002,257.0026],],[[26552.8855,24195.8365,20565.288,19614.838,62733.8554,46578.8303,43011.1206,54559.3062,55051.8962,37391.1307,31363.1174,41311.2021,58547.8033,54140.4356,20903.2354,55928.3466],[5709.0186,3250.44,3260.4254,2953.6929,12505.0487,9032.1672,8725.2001,10110.1943,5106.8982,8697.5872,8302.7214,4134.0447,21734.0035,12705.9366,7075.7944,17926.8846],[5897.998,4209.0168,4677.2333,2864.2462,12060.8824,11093.5414,10102.9805,13283.5558,1877.6409,3844.3755,6190.8897,7558.1685,18779.0213,10568.4907,3074.7185,11455.9498],[599.275,879.4447,3734.1659,0.0006,3054.048,5542.1436,17477.8189,4660.8163,1805.0375,940.3985,4280.2814,1434.5278,0,0.0006,850.1534,0],[2299.3448,1503.711,4229.194,643.982,2949.9509,558.0508,4827.284,2675.146,1661.4781,1263.6893,2861.7027,2087.4407,0,0,891.9352,696.1165],[0,0,1185.3406,0,0,0,2267.2889,0,0,494.1374,0,0,0,0,428.1955,0],],];
sig_data.dataset_sig_max = 105090.99;
sig_data.route_id = ['AA','AC','AG','AT','CA','CC','CG','CT','GA','GC','GG','GT','TA','TC','TG','TT',];
sig_data.substitution = [{name: 'C > A', color: '#1BBDEB', route: ['ApCpA','ApCpC','ApCpG','ApCpT','CpCpA','CpCpC','CpCpG','CpCpT','GpCpA','GpCpC','GpCpG','GpCpT','TpCpA','TpCpC','TpCpG','TpCpT',],},{name: 'C > G', color: '#211D1E', route: ['ApCpA','ApCpC','ApCpG','ApCpT','CpCpA','CpCpC','CpCpG','CpCpT','GpCpA','GpCpC','GpCpG','GpCpT','TpCpA','TpCpC','TpCpG','TpCpT',],},{name: 'C > T', color: '#E62623', route: ['ApCpA','ApCpC','ApCpG','ApCpT','CpCpA','CpCpC','CpCpG','CpCpT','GpCpA','GpCpC','GpCpG','GpCpT','TpCpA','TpCpC','TpCpG','TpCpT',],},{name: 'T > A', color: '#CFCFCF', route: ['ApTpA','ApTpC','ApTpG','ApTpT','CpTpA','CpTpC','CpTpG','CpTpT','GpTpA','GpTpC','GpTpG','GpTpT','TpTpA','TpTpC','TpTpG','TpTpT',],},{name: 'T > C', color: '#ACD577', route: ['ApTpA','ApTpC','ApTpG','ApTpT','CpTpA','CpTpC','CpTpG','CpTpT','GpTpA','GpTpC','GpTpG','GpTpT','TpTpA','TpTpC','TpTpG','TpTpT',],},{name: 'T > G', color: '#EDC7C4', route: ['ApTpA','ApTpC','ApTpG','ApTpT','CpTpA','CpTpC','CpTpG','CpTpT','GpTpA','GpTpC','GpTpG','GpTpT','TpTpA','TpTpC','TpTpG','TpTpT',],},];
sig_data.Ids = ['TCGA-OR-A5J1','TCGA-OR-A5J2','TCGA-OR-A5J3','TCGA-OR-A5J4','TCGA-OR-A5J5','TCGA-OR-A5J6','TCGA-OR-A5J7','TCGA-OR-A5J8','TCGA-OR-A5J9','TCGA-OR-A5JA','TCGA-OR-A5JB','TCGA-OR-A5JC','TCGA-OR-A5JD','TCGA-OR-A5JE','TCGA-OR-A5JF','TCGA-OR-A5JG','TCGA-OR-A5JH','TCGA-OR-A5JI','TCGA-OR-A5JJ','TCGA-OR-A5JK','TCGA-OR-A5JL','TCGA-OR-A5JM','TCGA-OR-A5JO','TCGA-OR-A5JP','TCGA-OR-A5JQ','TCGA-OR-A5JR','TCGA-OR-A5JS','TCGA-OR-A5JT','TCGA-OR-A5JU','TCGA-OR-A5JV','TCGA-OR-A5JW','TCGA-OR-A5JX','TCGA-OR-A5JY','TCGA-OR-A5JZ','TCGA-OR-A5K0','TCGA-OR-A5K1','TCGA-OR-A5K2','TCGA-OR-A5K3','TCGA-OR-A5K4','TCGA-OR-A5K5','TCGA-OR-A5K6','TCGA-OR-A5K8','TCGA-OR-A5K9','TCGA-OR-A5KB','TCGA-OR-A5KO','TCGA-OR-A5KP','TCGA-OR-A5KQ','TCGA-OR-A5KS','TCGA-OR-A5KT','TCGA-OR-A5KU','TCGA-OR-A5KV','TCGA-OR-A5KW','TCGA-OR-A5KX','TCGA-OR-A5KY','TCGA-OR-A5KZ','TCGA-OR-A5L1','TCGA-OR-A5L2','TCGA-OR-A5L3','TCGA-OR-A5L4','TCGA-OR-A5L5','TCGA-OR-A5L6','TCGA-OR-A5L8','TCGA-OR-A5L9','TCGA-OR-A5LA','TCGA-OR-A5LB','TCGA-OR-A5LC','TCGA-OR-A5LD','TCGA-OR-A5LE','TCGA-OR-A5LF','TCGA-OR-A5LG','TCGA-OR-A5LH','TCGA-OR-A5LI','TCGA-OR-A5LJ','TCGA-OR-A5LK','TCGA-OR-A5LL','TCGA-OR-A5LN','TCGA-OR-A5LO','TCGA-OR-A5LP','TCGA-OR-A5LR','TCGA-OR-A5LS','TCGA-OR-A5LT','TCGA-OU-A5PI','TCGA-P6-A5OF','TCGA-P6-A5OH','TCGA-PA-A5YG','TCGA-PK-A5H8','TCGA-PK-A5H9','TCGA-PK-A5HA','TCGA-PK-A5HB','TCGA-PK-A5HC',];

// [ID, signature, value]
sig_data.mutations = [[0,0,0.689900],[0,1,0.043500],[0,2,0.266500],[1,0,0.681300],[1,1,0.187100],[1,2,0.131500],[2,0,0.767000],[2,1,0.187400],[2,2,0.045400],[3,0,0.327100],[3,1,0.274600],[3,2,0.398100],[4,0,0.993600],[4,1,0.006300],[4,2,0.000000],[5,0,0.813600],[5,1,0.002100],[5,2,0.184200],[6,0,0.609900],[6,1,0.169500],[6,2,0.220400],[7,0,0.380300],[7,1,0.473900],[7,2,0.145600],[8,0,0.735900],[8,1,0.097600],[8,2,0.166300],[9,0,0.000000],[9,1,0.999900],[9,2,0.000000],[10,0,0.230300],[10,1,0.612700],[10,2,0.156900],[11,0,0.709800],[11,1,0.130500],[11,2,0.159600],[12,0,0.620400],[12,1,0.081300],[12,2,0.298100],[13,0,0.570300],[13,1,0.183400],[13,2,0.246100],[14,0,0.504700],[14,1,0.111700],[14,2,0.383500],[15,0,0.742700],[15,1,0.090000],[15,2,0.167100],[16,0,0.628100],[16,1,0.250600],[16,2,0.121200],[17,0,0.649000],[17,1,0.000000],[17,2,0.350900],[18,0,0.718100],[18,1,0.000000],[18,2,0.281800],[19,0,0.733400],[19,1,0.072300],[19,2,0.194100],[20,0,0.889700],[20,1,0.021700],[20,2,0.088500],[21,0,0.687000],[21,1,0.121800],[21,2,0.191000],[22,0,0.730700],[22,1,0.177300],[22,2,0.091900],[23,0,0.591200],[23,1,0.171400],[23,2,0.237300],[24,0,0.720700],[24,1,0.069800],[24,2,0.209300],[25,0,0.763100],[25,1,0.000000],[25,2,0.236800],[26,0,0.847000],[26,1,0.066500],[26,2,0.086300],[27,0,0.584100],[27,1,0.249700],[27,2,0.166100],[28,0,0.775400],[28,1,0.093900],[28,2,0.130600],[29,0,0.712900],[29,1,0.214500],[29,2,0.072500],[30,0,0.567800],[30,1,0.145900],[30,2,0.286100],[31,0,0.738400],[31,1,0.109700],[31,2,0.151800],[32,0,0.547100],[32,1,0.202600],[32,2,0.250100],[33,0,0.861000],[33,1,0.006700],[33,2,0.132100],[34,0,0.603400],[34,1,0.221200],[34,2,0.175300],[35,0,0.662700],[35,1,0.049600],[35,2,0.287500],[36,0,0.609500],[36,1,0.123500],[36,2,0.266800],[37,0,0.752700],[37,1,0.047300],[37,2,0.199900],[38,0,0.991100],[38,1,0.008800],[38,2,0.000000],[39,0,0.499900],[39,1,0.148500],[39,2,0.351500],[40,0,0.650400],[40,1,0.185700],[40,2,0.163800],[41,0,0.652100],[41,1,0.137200],[41,2,0.210500],[42,0,0.602500],[42,1,0.142600],[42,2,0.254800],[43,0,0.042100],[43,1,0.820100],[43,2,0.137600],[44,0,0.724500],[44,1,0.206500],[44,2,0.068900],[45,0,0.753000],[45,1,0.128600],[45,2,0.118300],[46,0,0.822600],[46,1,0.090000],[46,2,0.087300],[47,0,0.810600],[47,1,0.000000],[47,2,0.189300],[48,0,0.636100],[48,1,0.125500],[48,2,0.238200],[49,0,0.723400],[49,1,0.107900],[49,2,0.168500],[50,0,0.687700],[50,1,0.165500],[50,2,0.146700],[51,0,0.635300],[51,1,0.150600],[51,2,0.213900],[52,0,0.706600],[52,1,0.000000],[52,2,0.293300],[53,0,0.711400],[53,1,0.193700],[53,2,0.094800],[54,0,0.567700],[54,1,0.148200],[54,2,0.283900],[55,0,0.617800],[55,1,0.156600],[55,2,0.225500],[56,0,0.546500],[56,1,0.220300],[56,2,0.233000],[57,0,0.742600],[57,1,0.000000],[57,2,0.257300],[58,0,0.599300],[58,1,0.319000],[58,2,0.081600],[59,0,0.714200],[59,1,0.095700],[59,2,0.190000],[60,0,0.728900],[60,1,0.151800],[60,2,0.119100],[61,0,0.736600],[61,1,0.000000],[61,2,0.263300],[62,0,0.746800],[62,1,0.107800],[62,2,0.145200],[63,0,0.791200],[63,1,0.107300],[63,2,0.101300],[64,0,0.880000],[64,1,0.070200],[64,2,0.049700],[65,0,0.677900],[65,1,0.237100],[65,2,0.084900],[66,0,0.526000],[66,1,0.025700],[66,2,0.448100],[67,0,0.847000],[67,1,0.011500],[67,2,0.141400],[68,0,0.844300],[68,1,0.065700],[68,2,0.089800],[69,0,0.740100],[69,1,0.108000],[69,2,0.151700],[70,0,0.644800],[70,1,0.080200],[70,2,0.274800],[71,0,0.818000],[71,1,0.029200],[71,2,0.152700],[72,0,0.948300],[72,1,0.041600],[72,2,0.009900],[73,0,0.668000],[73,1,0.167100],[73,2,0.164700],[74,0,0.574800],[74,1,0.152300],[74,2,0.272800],[75,0,0.800000],[75,1,0.140700],[75,2,0.059100],[76,0,0.523800],[76,1,0.279200],[76,2,0.196900],[77,0,0.704300],[77,1,0.099100],[77,2,0.196400],[78,0,0.732700],[78,1,0.012100],[78,2,0.255100],[79,0,0.698800],[79,1,0.111800],[79,2,0.189300],[80,0,0.739100],[80,1,0.203500],[80,2,0.057200],[81,0,0.663700],[81,1,0.169700],[81,2,0.166500],[82,0,0.597400],[82,1,0.165200],[82,2,0.237200],[83,0,0.503400],[83,1,0.146000],[83,2,0.350400],[84,0,0.529700],[84,1,0.168700],[84,2,0.301500],[85,0,0.523000],[85,1,0.223600],[85,2,0.253200],[86,0,0.668100],[86,1,0.123100],[86,2,0.208600],[87,0,0.697400],[87,1,0.182100],[87,2,0.120300],[88,0,0.674800],[88,1,0.004300],[88,2,0.320800],[89,0,0.512200],[89,1,0.276100],[89,2,0.211500],];

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


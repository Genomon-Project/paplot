(function() {
msig_data = {};

msig_data.tooltip_format = {
    ref0:{format:[[{label:'A: ',type:'fix',keys:[],ext:''},{label:'{a}',type:'numeric',keys:['a',],ext:'.2'},],[{label:'C: ',type:'fix',keys:[],ext:''},{label:'{c}',type:'numeric',keys:['c',],ext:'.2'},],[{label:'G: ',type:'fix',keys:[],ext:''},{label:'{g}',type:'numeric',keys:['g',],ext:'.2'},],[{label:'T: ',type:'fix',keys:[],ext:''},{label:'{t}',type:'numeric',keys:['t',],ext:'.2'},],], keys: '{a} {c} {g} {t} '},ref1:{format:[[{label:'A: ',type:'fix',keys:[],ext:''},{label:'{a}',type:'numeric',keys:['a',],ext:'.2'},],[{label:'C: ',type:'fix',keys:[],ext:''},{label:'{c}',type:'numeric',keys:['c',],ext:'.2'},],[{label:'G: ',type:'fix',keys:[],ext:''},{label:'{g}',type:'numeric',keys:['g',],ext:'.2'},],[{label:'T: ',type:'fix',keys:[],ext:''},{label:'{t}',type:'numeric',keys:['t',],ext:'.2'},],], keys: '{a} {c} {g} {t} '},ref2:{format:[[{label:'A: ',type:'fix',keys:[],ext:''},{label:'{a}',type:'numeric',keys:['a',],ext:'.2'},],[{label:'C: ',type:'fix',keys:[],ext:''},{label:'{c}',type:'numeric',keys:['c',],ext:'.2'},],[{label:'G: ',type:'fix',keys:[],ext:''},{label:'{g}',type:'numeric',keys:['g',],ext:'.2'},],[{label:'T: ',type:'fix',keys:[],ext:''},{label:'{t}',type:'numeric',keys:['t',],ext:'.2'},],], keys: '{a} {c} {g} {t} '},ref3:{format:[[{label:'A: ',type:'fix',keys:[],ext:''},{label:'{a}',type:'numeric',keys:['a',],ext:'.2'},],[{label:'C: ',type:'fix',keys:[],ext:''},{label:'{c}',type:'numeric',keys:['c',],ext:'.2'},],[{label:'G: ',type:'fix',keys:[],ext:''},{label:'{g}',type:'numeric',keys:['g',],ext:'.2'},],[{label:'T: ',type:'fix',keys:[],ext:''},{label:'{t}',type:'numeric',keys:['t',],ext:'.2'},],], keys: '{a} {c} {g} {t} '},ref4:{format:[[{label:'A: ',type:'fix',keys:[],ext:''},{label:'{a}',type:'numeric',keys:['a',],ext:'.2'},],[{label:'C: ',type:'fix',keys:[],ext:''},{label:'{c}',type:'numeric',keys:['c',],ext:'.2'},],[{label:'G: ',type:'fix',keys:[],ext:''},{label:'{g}',type:'numeric',keys:['g',],ext:'.2'},],[{label:'T: ',type:'fix',keys:[],ext:''},{label:'{t}',type:'numeric',keys:['t',],ext:'.2'},],], keys: '{a} {c} {g} {t} '},
    alt:{format:[[{label:'C -> A: ',type:'fix',keys:[],ext:''},{label:'{ca}',type:'numeric',keys:['ca',],ext:'.2'},],[{label:'C -> G: ',type:'fix',keys:[],ext:''},{label:'{cg}',type:'numeric',keys:['cg',],ext:'.2'},],[{label:'C -> T: ',type:'fix',keys:[],ext:''},{label:'{ct}',type:'numeric',keys:['ct',],ext:'.2'},],[{label:'T -> A: ',type:'fix',keys:[],ext:''},{label:'{ta}',type:'numeric',keys:['ta',],ext:'.2'},],[{label:'T -> C: ',type:'fix',keys:[],ext:''},{label:'{tc}',type:'numeric',keys:['tc',],ext:'.2'},],[{label:'T -> G: ',type:'fix',keys:[],ext:''},{label:'{tg}',type:'numeric',keys:['tg',],ext:'.2'},],], keys: '{ca} {cg} {ct} {ta} {tc} {tg} '},
    strand:{format:[[{label:'+ ',type:'fix',keys:[],ext:''},{label:'{plus}',type:'numeric',keys:['plus',],ext:'.2'},{label:' - ',type:'fix',keys:[],ext:''},{label:'{minus}',type:'numeric',keys:['minus',],ext:'.2'},],], keys: '{minus} {plus} '},
    mutation_title:{format:[[{label:'{id}',type:'str',keys:['id',],ext:''},],], keys: '{id} '},
    mutation_partial:{format:[[{label:'{sig}',type:'str',keys:['sig',],ext:''},{label:': ',type:'fix',keys:[],ext:''},{label:'{#sum_item_value}',type:'numeric',keys:['#sum_item_value',],ext:'.2'},],], keys: '{#sum_item_value} {sig} '},
};

msig_data.ref_reduce_rate = [1,1,1,1,1];
msig_data.label_colors = {'A': '#06B838', 'C': '#609CFF', 'G': '#B69D02', 'T': '#F6766D', 'plus': '#00BEC3', 'minus': '#F263E2'};
msig_data.signatures = ['signature 1','signature 2','signature 3','background',];
msig_data.sig_colors = ['#f39700','#6cbb5a','#e60012','#9CAEB7',];
msig_data.Ids = ['TCGA-OR-A5J1','TCGA-OR-A5J2','TCGA-OR-A5J3','TCGA-OR-A5J4','TCGA-OR-A5J5','TCGA-OR-A5J6','TCGA-OR-A5J7','TCGA-OR-A5J8','TCGA-OR-A5J9','TCGA-OR-A5JA','TCGA-OR-A5JB','TCGA-OR-A5JC','TCGA-OR-A5JD','TCGA-OR-A5JE','TCGA-OR-A5JF','TCGA-OR-A5JG','TCGA-OR-A5JH','TCGA-OR-A5JI','TCGA-OR-A5JJ','TCGA-OR-A5JK','TCGA-OR-A5JL','TCGA-OR-A5JM','TCGA-OR-A5JO','TCGA-OR-A5JP','TCGA-OR-A5JQ','TCGA-OR-A5JR','TCGA-OR-A5JS','TCGA-OR-A5JT','TCGA-OR-A5JU','TCGA-OR-A5JV','TCGA-OR-A5JW','TCGA-OR-A5JX','TCGA-OR-A5JY','TCGA-OR-A5JZ','TCGA-OR-A5K0','TCGA-OR-A5K1','TCGA-OR-A5K2','TCGA-OR-A5K3','TCGA-OR-A5K4','TCGA-OR-A5K5','TCGA-OR-A5K6','TCGA-OR-A5K8','TCGA-OR-A5K9','TCGA-OR-A5KB','TCGA-OR-A5KO','TCGA-OR-A5KP','TCGA-OR-A5KQ','TCGA-OR-A5KS','TCGA-OR-A5KT','TCGA-OR-A5KU','TCGA-OR-A5KV','TCGA-OR-A5KW','TCGA-OR-A5KX','TCGA-OR-A5KY','TCGA-OR-A5KZ','TCGA-OR-A5L1','TCGA-OR-A5L2','TCGA-OR-A5L3','TCGA-OR-A5L4','TCGA-OR-A5L5','TCGA-OR-A5L6','TCGA-OR-A5L8','TCGA-OR-A5L9','TCGA-OR-A5LA','TCGA-OR-A5LB','TCGA-OR-A5LC','TCGA-OR-A5LD','TCGA-OR-A5LE','TCGA-OR-A5LF','TCGA-OR-A5LG','TCGA-OR-A5LH','TCGA-OR-A5LI','TCGA-OR-A5LJ','TCGA-OR-A5LK','TCGA-OR-A5LL','TCGA-OR-A5LN','TCGA-OR-A5LO','TCGA-OR-A5LP','TCGA-OR-A5LR','TCGA-OR-A5LS','TCGA-OR-A5LT','TCGA-OU-A5PI','TCGA-P6-A5OF','TCGA-P6-A5OH','TCGA-PA-A5YG','TCGA-PK-A5H8','TCGA-PK-A5H9','TCGA-PK-A5HA','TCGA-PK-A5HB','TCGA-PK-A5HC',];

msig_data.dataset_ref = [[[0.148,0.321,0.356,0.173],[0.152,0.366,0.365,0.115],[0,0.64,0,0.359],[0.135,0.184,0.496,0.184],[0.11,0.344,0.425,0.119],],[[0.211,0.231,0.3,0.256],[0.278,0.232,0.338,0.15],[0,0.934,0,0.065],[0.081,0.092,0.76,0.065],[0.202,0.256,0.332,0.208],],[[0.27,0.23,0.243,0.256],[0.116,0.32,0.232,0.33],[0,0.986,0,0.013],[0.323,0.251,0.159,0.266],[0.25,0.193,0.294,0.262],],];
msig_data.dataset_alt = [[[0,0,0,0],[0.133,0,0.156,0.35],[0,0,0,0],[0.004,0.307,0.047,0],],[[0,0,0,0],[0,0,0,0.934],[0,0,0,0],[0,0.064,0,0],],[[0,0,0,0],[0.77,0,0.115,0.1],[0,0,0,0],[0.013,0,0,0],],];
msig_data.dataset_strand = [[0.477,0.522],[0.53,0.469],[0.411,0.588],];

// [ID, signature, value]
msig_data.mutations = [[0,0,0.000000],[0,1,0.459000],[0,2,0.063000],[0,3,0.477000],[1,0,0.222000],[1,1,0.252000],[1,2,0.100000],[1,3,0.423000],[2,0,0.563000],[2,1,0.175000],[2,2,0.086000],[2,3,0.174000],[3,0,0.158000],[3,1,0.095000],[3,2,0.155000],[3,3,0.590000],[4,0,0.084000],[4,1,0.845000],[4,2,0.032000],[4,3,0.037000],[5,0,0.519000],[5,1,0.178000],[5,2,0.000000],[5,3,0.301000],[6,0,0.298000],[6,1,0.237000],[6,2,0.083000],[6,3,0.381000],[7,0,0.319000],[7,1,0.061000],[7,2,0.394000],[7,3,0.223000],[8,0,0.574000],[8,1,0.115000],[8,2,0.014000],[8,3,0.295000],[9,0,0.039000],[9,1,0.015000],[9,2,0.933000],[9,3,0.010000],[10,0,0.168000],[10,1,0.067000],[10,2,0.420000],[10,3,0.343000],[11,0,0.420000],[11,1,0.124000],[11,2,0.024000],[11,3,0.430000],[12,0,0.426000],[12,1,0.197000],[12,2,0.036000],[12,3,0.339000],[13,0,0.474000],[13,1,0.096000],[13,2,0.066000],[13,3,0.361000],[14,0,0.362000],[14,1,0.077000],[14,2,0.032000],[14,3,0.526000],[15,0,0.789000],[15,1,0.053000],[15,2,0.007000],[15,3,0.149000],[16,0,0.538000],[16,1,0.030000],[16,2,0.083000],[16,3,0.346000],[17,0,0.354000],[17,1,0.181000],[17,2,0.000000],[17,3,0.463000],[18,0,0.580000],[18,1,0.126000],[18,2,0.000000],[18,3,0.292000],[19,0,0.515000],[19,1,0.135000],[19,2,0.000000],[19,3,0.349000],[20,0,0.635000],[20,1,0.143000],[20,2,0.000000],[20,3,0.221000],[21,0,0.597000],[21,1,0.092000],[21,2,0.072000],[21,3,0.236000],[22,0,0.719000],[22,1,0.012000],[22,2,0.060000],[22,3,0.207000],[23,0,0.397000],[23,1,0.131000],[23,2,0.094000],[23,3,0.375000],[24,0,0.514000],[24,1,0.148000],[24,2,0.000000],[24,3,0.337000],[25,0,0.371000],[25,1,0.224000],[25,2,0.000000],[25,3,0.403000],[26,0,0.682000],[26,1,0.096000],[26,2,0.000000],[26,3,0.221000],[27,0,0.298000],[27,1,0.173000],[27,2,0.140000],[27,3,0.387000],[28,0,0.777000],[28,1,0.036000],[28,2,0.038000],[28,3,0.147000],[29,0,0.349000],[29,1,0.188000],[29,2,0.119000],[29,3,0.341000],[30,0,0.449000],[30,1,0.143000],[30,2,0.091000],[30,3,0.315000],[31,0,0.303000],[31,1,0.256000],[31,2,0.012000],[31,3,0.427000],[32,0,0.148000],[32,1,0.211000],[32,2,0.119000],[32,3,0.521000],[33,0,0.668000],[33,1,0.136000],[33,2,0.000000],[33,3,0.195000],[34,0,0.568000],[34,1,0.062000],[34,2,0.071000],[34,3,0.297000],[35,0,0.565000],[35,1,0.087000],[35,2,0.000000],[35,3,0.346000],[36,0,0.537000],[36,1,0.083000],[36,2,0.040000],[36,3,0.338000],[37,0,0.640000],[37,1,0.114000],[37,2,0.000000],[37,3,0.244000],[38,0,0.100000],[38,1,0.792000],[38,2,0.006000],[38,3,0.100000],[39,0,0.220000],[39,1,0.138000],[39,2,0.037000],[39,3,0.604000],[40,0,0.681000],[40,1,0.058000],[40,2,0.077000],[40,3,0.182000],[41,0,0.624000],[41,1,0.057000],[41,2,0.041000],[41,3,0.277000],[42,0,0.310000],[42,1,0.161000],[42,2,0.068000],[42,3,0.458000],[43,0,0.061000],[43,1,0.014000],[43,2,0.634000],[43,3,0.290000],[44,0,0.441000],[44,1,0.240000],[44,2,0.145000],[44,3,0.173000],[45,0,0.581000],[45,1,0.138000],[45,2,0.047000],[45,3,0.232000],[46,0,0.609000],[46,1,0.189000],[46,2,0.010000],[46,3,0.190000],[47,0,0.307000],[47,1,0.260000],[47,2,0.000000],[47,3,0.432000],[48,0,0.484000],[48,1,0.152000],[48,2,0.010000],[48,3,0.352000],[49,0,0.379000],[49,1,0.272000],[49,2,0.049000],[49,3,0.299000],[50,0,0.552000],[50,1,0.126000],[50,2,0.104000],[50,3,0.216000],[51,0,0.564000],[51,1,0.086000],[51,2,0.072000],[51,3,0.277000],[52,0,0.118000],[52,1,0.413000],[52,2,0.000000],[52,3,0.467000],[53,0,0.697000],[53,1,0.058000],[53,2,0.075000],[53,3,0.168000],[54,0,0.389000],[54,1,0.115000],[54,2,0.045000],[54,3,0.448000],[55,0,0.450000],[55,1,0.112000],[55,2,0.039000],[55,3,0.397000],[56,0,0.272000],[56,1,0.187000],[56,2,0.126000],[56,3,0.412000],[57,0,0.434000],[57,1,0.207000],[57,2,0.000000],[57,3,0.358000],[58,0,0.432000],[58,1,0.091000],[58,2,0.179000],[58,3,0.296000],[59,0,0.558000],[59,1,0.115000],[59,2,0.030000],[59,3,0.295000],[60,0,0.413000],[60,1,0.217000],[60,2,0.074000],[60,3,0.293000],[61,0,0.517000],[61,1,0.256000],[61,2,0.000000],[61,3,0.226000],[62,0,0.639000],[62,1,0.071000],[62,2,0.004000],[62,3,0.284000],[63,0,0.559000],[63,1,0.248000],[63,2,0.056000],[63,3,0.135000],[64,0,0.082000],[64,1,0.642000],[64,2,0.092000],[64,3,0.182000],[65,0,0.267000],[65,1,0.241000],[65,2,0.169000],[65,3,0.321000],[66,0,0.284000],[66,1,0.150000],[66,2,0.000000],[66,3,0.564000],[67,0,0.594000],[67,1,0.148000],[67,2,0.000000],[67,3,0.257000],[68,0,0.807000],[68,1,0.045000],[68,2,0.000000],[68,3,0.147000],[69,0,0.729000],[69,1,0.053000],[69,2,0.023000],[69,3,0.193000],[70,0,0.636000],[70,1,0.058000],[70,2,0.020000],[70,3,0.284000],[71,0,0.672000],[71,1,0.103000],[71,2,0.000000],[71,3,0.224000],[72,0,0.068000],[72,1,0.737000],[72,2,0.059000],[72,3,0.133000],[73,0,0.389000],[73,1,0.194000],[73,2,0.064000],[73,3,0.350000],[74,0,0.006000],[74,1,0.306000],[74,2,0.112000],[74,3,0.573000],[75,0,0.761000],[75,1,0.088000],[75,2,0.035000],[75,3,0.114000],[76,0,0.331000],[76,1,0.115000],[76,2,0.127000],[76,3,0.424000],[77,0,0.562000],[77,1,0.179000],[77,2,0.023000],[77,3,0.234000],[78,0,0.449000],[78,1,0.206000],[78,2,0.003000],[78,3,0.340000],[79,0,0.745000],[79,1,0.014000],[79,2,0.000000],[79,3,0.240000],[80,0,0.587000],[80,1,0.129000],[80,2,0.111000],[80,3,0.171000],[81,0,0.499000],[81,1,0.143000],[81,2,0.091000],[81,3,0.265000],[82,0,0.518000],[82,1,0.123000],[82,2,0.058000],[82,3,0.299000],[83,0,0.275000],[83,1,0.139000],[83,2,0.050000],[83,3,0.534000],[84,0,0.227000],[84,1,0.231000],[84,2,0.127000],[84,3,0.413000],[85,0,0.309000],[85,1,0.156000],[85,2,0.104000],[85,3,0.428000],[86,0,0.695000],[86,1,0.019000],[86,2,0.021000],[86,3,0.263000],[87,0,0.338000],[87,1,0.218000],[87,2,0.109000],[87,3,0.333000],[88,0,0.176000],[88,1,0.286000],[88,2,0.000000],[88,3,0.537000],[89,0,0.441000],[89,1,0.053000],[89,2,0.181000],[89,3,0.322000],];

msig_data.esc_Ids = [];
for (var i=0; i < msig_data.Ids.length; i++) {
    msig_data.esc_Ids[i] = 'Key' + i;
}

function tooltip_text(format, obj) {
    var tooltip = [];
    for (var t in format.format) {
        tooltip.push(utils.text_format(format.format[t], obj));
    }
    return tooltip;
};

function alt_data(sig_id) {
    
    var data = msig_data.dataset_alt[sig_id];

    var obj = {};
    obj['ca'] = data[1][0];
    obj['cg'] = data[1][2];
    obj['ct'] = data[1][3];
    obj['ta'] = data[3][0];
    obj['tc'] = data[3][1];
    obj['tg'] = data[3][2];
    
    var tooltip = tooltip_text(msig_data.tooltip_format['alt'], obj);
    
    return {
        data: data, 
        tooltip: tooltip, 
    };
};

function ref_data(sig_id, label) {
    
    var data = msig_data.dataset_ref[sig_id][Number(label.replace('ref', ''))];
    
    var obj = {};
    obj['a'] = data[0];
    obj['c'] = data[1];
    obj['g'] = data[2];
    obj['t'] = data[3];

    var tooltip = tooltip_text(msig_data.tooltip_format[label], obj);
    
    return {
        data: data, 
        tooltip: tooltip, 
    };
};

function strand_data(sig_id) {

    var data = msig_data.dataset_strand[sig_id];
    
    var obj = {};
    obj['plus'] = data[0];
    obj['minus'] = data[1];
    
    var tooltip = tooltip_text(msig_data.tooltip_format['strand'], obj);
    
    return {
        data: data, 
        tooltip: tooltip, 
    };
};
    
msig_data.get_dataset = function (sig_id, label) {
    
    var dataset = {};
    
    if (label == 'alt') {
        dataset = alt_data(sig_id);
    }
    else if(label.indexOf('ref') == 0) {
        dataset = ref_data(sig_id, label);
    }
    else if(label == 'strand') {
        dataset = strand_data(sig_id);
    }
    return dataset;
};

msig_data.get_bars_data = function () {
    
    var data = [];
    var keys = [];
    var tooltips = {};
    var sum_par_id = [];
    
    for (var i=0; i < msig_data.Ids.length; i++) {
        tooltips[msig_data.esc_Ids[i]] = [];
        sum_par_id[i] = 0;
    }
    
    // par func
    for (var f=0; f < msig_data.signatures.length; f++) {

        data[f] = [];
        keys[f] = [];

        // par ID
        for (var i=0; i < msig_data.Ids.length; i++) {
            
            var data_filt = msig_data.mutations.filter(function(item, index){
                if ((item[0] == i) && (item[1] == f)) return true;
            });
            
            //var sum = data_filt.length;
            var sum = 0;
            for (var s = 0; s < data_filt.length; s++) {
                sum += data_filt[s][2];
            }
            
            if (sum > 0) {
                data[f].push(sum);
                keys[f].push(msig_data.esc_Ids[i]);
                
                var obj = {
                    '#sum_mutaion_all': msig_data.mutations.length,
                    '#sum_item_value': sum,
                    'id': msig_data.Ids[i],
                    'sig': msig_data.signatures[f],
                };
                tooltips[msig_data.esc_Ids[i]].push(tooltip_text(msig_data.tooltip_format['mutation_partial'], obj));
                sum_par_id[i] += sum;
            }
        }
    }
    for (var i=0; i < msig_data.Ids.length; i++) {
        var obj = {
            '#sum_mutaion_all': msig_data.mutations.length,
            '#sum_item_value': sum_par_id[i],
            'id': msig_data.Ids[i],
        };
        
        title = tooltip_text(msig_data.tooltip_format['mutation_title'], obj);
        for (var t = 0; t < title.length; t++) {
            tooltips[msig_data.esc_Ids[i]].splice(t, 0, title[t]);
        }
    }
    
    return {data: data, key: keys, tooltip: tooltips};
};
})();
Object.freeze(msig_data);

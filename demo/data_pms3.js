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
msig_data.signatures = ['signature 1','signature 2','background',];
msig_data.sig_colors = ['#f39700','#6cbb5a','#9CAEB7',];
msig_data.Ids = ['TCGA-OR-A5J1','TCGA-OR-A5J2','TCGA-OR-A5J3','TCGA-OR-A5J4','TCGA-OR-A5J5','TCGA-OR-A5J6','TCGA-OR-A5J7','TCGA-OR-A5J8','TCGA-OR-A5J9','TCGA-OR-A5JA','TCGA-OR-A5JB','TCGA-OR-A5JC','TCGA-OR-A5JD','TCGA-OR-A5JE','TCGA-OR-A5JF','TCGA-OR-A5JG','TCGA-OR-A5JH','TCGA-OR-A5JI','TCGA-OR-A5JJ','TCGA-OR-A5JK','TCGA-OR-A5JL','TCGA-OR-A5JM','TCGA-OR-A5JO','TCGA-OR-A5JP','TCGA-OR-A5JQ','TCGA-OR-A5JR','TCGA-OR-A5JS','TCGA-OR-A5JT','TCGA-OR-A5JU','TCGA-OR-A5JV','TCGA-OR-A5JW','TCGA-OR-A5JX','TCGA-OR-A5JY','TCGA-OR-A5JZ','TCGA-OR-A5K0','TCGA-OR-A5K1','TCGA-OR-A5K2','TCGA-OR-A5K3','TCGA-OR-A5K4','TCGA-OR-A5K5','TCGA-OR-A5K6','TCGA-OR-A5K8','TCGA-OR-A5K9','TCGA-OR-A5KB','TCGA-OR-A5KO','TCGA-OR-A5KP','TCGA-OR-A5KQ','TCGA-OR-A5KS','TCGA-OR-A5KT','TCGA-OR-A5KU','TCGA-OR-A5KV','TCGA-OR-A5KW','TCGA-OR-A5KX','TCGA-OR-A5KY','TCGA-OR-A5KZ','TCGA-OR-A5L1','TCGA-OR-A5L2','TCGA-OR-A5L3','TCGA-OR-A5L4','TCGA-OR-A5L5','TCGA-OR-A5L6','TCGA-OR-A5L8','TCGA-OR-A5L9','TCGA-OR-A5LA','TCGA-OR-A5LB','TCGA-OR-A5LC','TCGA-OR-A5LD','TCGA-OR-A5LE','TCGA-OR-A5LF','TCGA-OR-A5LG','TCGA-OR-A5LH','TCGA-OR-A5LI','TCGA-OR-A5LJ','TCGA-OR-A5LK','TCGA-OR-A5LL','TCGA-OR-A5LN','TCGA-OR-A5LO','TCGA-OR-A5LP','TCGA-OR-A5LR','TCGA-OR-A5LS','TCGA-OR-A5LT','TCGA-OU-A5PI','TCGA-P6-A5OF','TCGA-P6-A5OH','TCGA-PA-A5YG','TCGA-PK-A5H8','TCGA-PK-A5H9','TCGA-PK-A5HA','TCGA-PK-A5HB','TCGA-PK-A5HC',];

msig_data.dataset_ref = [[[0.264,0.234,0.256,0.243],[0.113,0.319,0.25,0.316],[0,0.983,0,0.016],[0.321,0.252,0.162,0.263],[0.239,0.207,0.302,0.249],],[[0.176,0.279,0.327,0.216],[0.21,0.307,0.351,0.131],[0,0.757,0,0.242],[0.107,0.137,0.625,0.13],[0.153,0.298,0.387,0.159],],];
msig_data.dataset_alt = [[[0,0,0,0],[0.765,0,0.128,0.088],[0,0,0,0],[0.012,0.004,0,0],],[[0,0,0,0],[0.062,0,0.078,0.616],[0,0,0,0],[0.003,0.219,0.02,0],],];
msig_data.dataset_strand = [[0.414,0.585],[0.499,0.5],];

// [ID, signature, value]
msig_data.mutations = [[0,0,0.058000],[0,1,0.556000],[0,2,0.385000],[1,0,0.102000],[1,1,0.494000],[1,2,0.403000],[2,0,0.138000],[2,1,0.668000],[2,2,0.192000],[3,0,0.164000],[3,1,0.234000],[3,2,0.601000],[4,0,0.013000],[4,1,0.979000],[4,2,0.007000],[5,0,0.000000],[5,1,0.654000],[5,2,0.345000],[6,0,0.094000],[6,1,0.520000],[6,2,0.385000],[7,0,0.410000],[7,1,0.334000],[7,2,0.255000],[8,0,0.041000],[8,1,0.590000],[8,2,0.367000],[9,0,0.943000],[9,1,0.046000],[9,2,0.010000],[10,0,0.421000],[10,1,0.221000],[10,2,0.356000],[11,0,0.036000],[11,1,0.502000],[11,2,0.461000],[12,0,0.053000],[12,1,0.569000],[12,2,0.376000],[13,0,0.120000],[13,1,0.469000],[13,2,0.409000],[14,0,0.057000],[14,1,0.346000],[14,2,0.596000],[15,0,0.065000],[15,1,0.659000],[15,2,0.274000],[16,0,0.123000],[16,1,0.400000],[16,2,0.476000],[17,0,0.000000],[17,1,0.506000],[17,2,0.493000],[18,0,0.000000],[18,1,0.613000],[18,2,0.386000],[19,0,0.000000],[19,1,0.602000],[19,2,0.397000],[20,0,0.000000],[20,1,0.705000],[20,2,0.294000],[21,0,0.084000],[21,1,0.578000],[21,2,0.337000],[22,0,0.106000],[22,1,0.552000],[22,2,0.340000],[23,0,0.106000],[23,1,0.464000],[23,2,0.429000],[24,0,0.000000],[24,1,0.586000],[24,2,0.413000],[25,0,0.000000],[25,1,0.583000],[25,2,0.416000],[26,0,0.016000],[26,1,0.648000],[26,2,0.334000],[27,0,0.164000],[27,1,0.484000],[27,2,0.351000],[28,0,0.063000],[28,1,0.646000],[28,2,0.289000],[29,0,0.137000],[29,1,0.508000],[29,2,0.354000],[30,0,0.122000],[30,1,0.510000],[30,2,0.367000],[31,0,0.045000],[31,1,0.561000],[31,2,0.393000],[32,0,0.128000],[32,1,0.383000],[32,2,0.487000],[33,0,0.003000],[33,1,0.702000],[33,2,0.294000],[34,0,0.109000],[34,1,0.539000],[34,2,0.351000],[35,0,0.000000],[35,1,0.529000],[35,2,0.470000],[36,0,0.064000],[36,1,0.510000],[36,2,0.425000],[37,0,0.000000],[37,1,0.653000],[37,2,0.346000],[38,0,0.000000],[38,1,0.957000],[38,2,0.042000],[39,0,0.042000],[39,1,0.352000],[39,2,0.604000],[40,0,0.121000],[40,1,0.580000],[40,2,0.298000],[41,0,0.074000],[41,1,0.521000],[41,2,0.403000],[42,0,0.074000],[42,1,0.443000],[42,2,0.482000],[43,0,0.640000],[43,1,0.064000],[43,2,0.294000],[44,0,0.161000],[44,1,0.647000],[44,2,0.191000],[45,0,0.071000],[45,1,0.645000],[45,2,0.282000],[46,0,0.028000],[46,1,0.697000],[46,2,0.274000],[47,0,0.000000],[47,1,0.581000],[47,2,0.418000],[48,0,0.019000],[48,1,0.544000],[48,2,0.435000],[49,0,0.066000],[49,1,0.631000],[49,2,0.302000],[50,0,0.149000],[50,1,0.586000],[50,2,0.264000],[51,0,0.113000],[51,1,0.535000],[51,2,0.351000],[52,0,0.000000],[52,1,0.607000],[52,2,0.392000],[53,0,0.124000],[53,1,0.573000],[53,2,0.301000],[54,0,0.063000],[54,1,0.426000],[54,2,0.510000],[55,0,0.064000],[55,1,0.460000],[55,2,0.475000],[56,0,0.141000],[56,1,0.439000],[56,2,0.418000],[57,0,0.000000],[57,1,0.605000],[57,2,0.394000],[58,0,0.216000],[58,1,0.497000],[58,2,0.286000],[59,0,0.063000],[59,1,0.570000],[59,2,0.365000],[60,0,0.096000],[60,1,0.607000],[60,2,0.296000],[61,0,0.021000],[61,1,0.709000],[61,2,0.268000],[62,0,0.036000],[62,1,0.535000],[62,2,0.428000],[63,0,0.074000],[63,1,0.767000],[63,2,0.158000],[64,0,0.066000],[64,1,0.811000],[64,2,0.122000],[65,0,0.193000],[65,1,0.498000],[65,2,0.308000],[66,0,0.000000],[66,1,0.399000],[66,2,0.600000],[67,0,0.008000],[67,1,0.655000],[67,2,0.336000],[68,0,0.035000],[68,1,0.711000],[68,2,0.253000],[69,0,0.040000],[69,1,0.590000],[69,2,0.369000],[70,0,0.032000],[70,1,0.604000],[70,2,0.363000],[71,0,0.023000],[71,1,0.673000],[71,2,0.302000],[72,0,0.049000],[72,1,0.897000],[72,2,0.053000],[73,0,0.075000],[73,1,0.523000],[73,2,0.400000],[74,0,0.110000],[74,1,0.412000],[74,2,0.477000],[75,0,0.086000],[75,1,0.686000],[75,2,0.227000],[76,0,0.156000],[76,1,0.380000],[76,2,0.463000],[77,0,0.037000],[77,1,0.679000],[77,2,0.282000],[78,0,0.003000],[78,1,0.598000],[78,2,0.398000],[79,0,0.059000],[79,1,0.544000],[79,2,0.395000],[80,0,0.149000],[80,1,0.586000],[80,2,0.263000],[81,0,0.132000],[81,1,0.557000],[81,2,0.309000],[82,0,0.097000],[82,1,0.564000],[82,2,0.338000],[83,0,0.067000],[83,1,0.376000],[83,2,0.555000],[84,0,0.131000],[84,1,0.472000],[84,2,0.395000],[85,0,0.123000],[85,1,0.402000],[85,2,0.473000],[86,0,0.058000],[86,1,0.558000],[86,2,0.383000],[87,0,0.125000],[87,1,0.524000],[87,2,0.349000],[88,0,0.000000],[88,1,0.509000],[88,2,0.490000],[89,0,0.200000],[89,1,0.398000],[89,2,0.400000],];

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

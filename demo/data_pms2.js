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
msig_data.signatures = ['signature 1','background',];
msig_data.sig_colors = ['#f39700','#9CAEB7',];
msig_data.Ids = ['TCGA-OR-A5J1','TCGA-OR-A5J2','TCGA-OR-A5J3','TCGA-OR-A5J4','TCGA-OR-A5J5','TCGA-OR-A5J6','TCGA-OR-A5J7','TCGA-OR-A5J8','TCGA-OR-A5J9','TCGA-OR-A5JA','TCGA-OR-A5JB','TCGA-OR-A5JC','TCGA-OR-A5JD','TCGA-OR-A5JE','TCGA-OR-A5JF','TCGA-OR-A5JG','TCGA-OR-A5JH','TCGA-OR-A5JI','TCGA-OR-A5JJ','TCGA-OR-A5JK','TCGA-OR-A5JL','TCGA-OR-A5JM','TCGA-OR-A5JO','TCGA-OR-A5JP','TCGA-OR-A5JQ','TCGA-OR-A5JR','TCGA-OR-A5JS','TCGA-OR-A5JT','TCGA-OR-A5JU','TCGA-OR-A5JV','TCGA-OR-A5JW','TCGA-OR-A5JX','TCGA-OR-A5JY','TCGA-OR-A5JZ','TCGA-OR-A5K0','TCGA-OR-A5K1','TCGA-OR-A5K2','TCGA-OR-A5K3','TCGA-OR-A5K4','TCGA-OR-A5K5','TCGA-OR-A5K6','TCGA-OR-A5K8','TCGA-OR-A5K9','TCGA-OR-A5KB','TCGA-OR-A5KO','TCGA-OR-A5KP','TCGA-OR-A5KQ','TCGA-OR-A5KS','TCGA-OR-A5KT','TCGA-OR-A5KU','TCGA-OR-A5KV','TCGA-OR-A5KW','TCGA-OR-A5KX','TCGA-OR-A5KY','TCGA-OR-A5KZ','TCGA-OR-A5L1','TCGA-OR-A5L2','TCGA-OR-A5L3','TCGA-OR-A5L4','TCGA-OR-A5L5','TCGA-OR-A5L6','TCGA-OR-A5L8','TCGA-OR-A5L9','TCGA-OR-A5LA','TCGA-OR-A5LB','TCGA-OR-A5LC','TCGA-OR-A5LD','TCGA-OR-A5LE','TCGA-OR-A5LF','TCGA-OR-A5LG','TCGA-OR-A5LH','TCGA-OR-A5LI','TCGA-OR-A5LJ','TCGA-OR-A5LK','TCGA-OR-A5LL','TCGA-OR-A5LN','TCGA-OR-A5LO','TCGA-OR-A5LP','TCGA-OR-A5LR','TCGA-OR-A5LS','TCGA-OR-A5LT','TCGA-OU-A5PI','TCGA-P6-A5OF','TCGA-P6-A5OH','TCGA-PA-A5YG','TCGA-PK-A5H8','TCGA-PK-A5H9','TCGA-PK-A5HA','TCGA-PK-A5HB','TCGA-PK-A5HC',];

msig_data.dataset_ref = [[[0.183,0.274,0.328,0.213],[0.201,0.309,0.353,0.135],[0,0.789,0,0.21],[0.116,0.142,0.609,0.131],[0.155,0.296,0.386,0.161],],];
msig_data.dataset_alt = [[[0,0,0,0],[0.125,0,0.079,0.585],[0,0,0,0],[0.001,0.194,0.013,0],],];
msig_data.dataset_strand = [[0.495,0.504],];

// [ID, signature, value]
msig_data.mutations = [[0,0,0.572000],[0,1,0.427000],[1,0,0.502000],[1,1,0.497000],[2,0,0.712000],[2,1,0.287000],[3,0,0.247000],[3,1,0.752000],[4,0,0.987000],[4,1,0.012000],[5,0,0.652000],[5,1,0.347000],[6,0,0.532000],[6,1,0.467000],[7,0,0.349000],[7,1,0.650000],[8,0,0.609000],[8,1,0.390000],[9,0,0.037000],[9,1,0.962000],[10,0,0.279000],[10,1,0.720000],[11,0,0.525000],[11,1,0.474000],[12,0,0.596000],[12,1,0.403000],[13,0,0.515000],[13,1,0.484000],[14,0,0.363000],[14,1,0.636000],[15,0,0.681000],[15,1,0.318000],[16,0,0.431000],[16,1,0.568000],[17,0,0.510000],[17,1,0.489000],[18,0,0.612000],[18,1,0.387000],[19,0,0.609000],[19,1,0.390000],[20,0,0.721000],[20,1,0.278000],[21,0,0.598000],[21,1,0.401000],[22,0,0.583000],[22,1,0.416000],[23,0,0.485000],[23,1,0.514000],[24,0,0.593000],[24,1,0.406000],[25,0,0.584000],[25,1,0.415000],[26,0,0.668000],[26,1,0.331000],[27,0,0.557000],[27,1,0.442000],[28,0,0.660000],[28,1,0.339000],[29,0,0.520000],[29,1,0.479000],[30,0,0.551000],[30,1,0.448000],[31,0,0.583000],[31,1,0.416000],[32,0,0.401000],[32,1,0.598000],[33,0,0.707000],[33,1,0.292000],[34,0,0.583000],[34,1,0.416000],[35,0,0.537000],[35,1,0.462000],[36,0,0.522000],[36,1,0.477000],[37,0,0.658000],[37,1,0.341000],[38,0,0.957000],[38,1,0.042000],[39,0,0.358000],[39,1,0.641000],[40,0,0.611000],[40,1,0.388000],[41,0,0.548000],[41,1,0.451000],[42,0,0.448000],[42,1,0.551000],[43,0,0.150000],[43,1,0.849000],[44,0,0.696000],[44,1,0.303000],[45,0,0.678000],[45,1,0.321000],[46,0,0.717000],[46,1,0.282000],[47,0,0.580000],[47,1,0.419000],[48,0,0.557000],[48,1,0.442000],[49,0,0.653000],[49,1,0.346000],[50,0,0.628000],[50,1,0.371000],[51,0,0.567000],[51,1,0.432000],[52,0,0.610000],[52,1,0.389000],[53,0,0.620000],[53,1,0.379000],[54,0,0.443000],[54,1,0.556000],[55,0,0.477000],[55,1,0.522000],[56,0,0.461000],[56,1,0.538000],[57,0,0.607000],[57,1,0.392000],[58,0,0.534000],[58,1,0.465000],[59,0,0.603000],[59,1,0.396000],[60,0,0.628000],[60,1,0.371000],[61,0,0.722000],[61,1,0.277000],[62,0,0.555000],[62,1,0.444000],[63,0,0.775000],[63,1,0.224000],[64,0,0.849000],[64,1,0.150000],[65,0,0.534000],[65,1,0.465000],[66,0,0.406000],[66,1,0.593000],[67,0,0.659000],[67,1,0.340000],[68,0,0.739000],[68,1,0.260000],[69,0,0.604000],[69,1,0.395000],[70,0,0.615000],[70,1,0.384000],[71,0,0.691000],[71,1,0.308000],[72,0,0.925000],[72,1,0.074000],[73,0,0.555000],[73,1,0.444000],[74,0,0.440000],[74,1,0.559000],[75,0,0.722000],[75,1,0.277000],[76,0,0.421000],[76,1,0.578000],[77,0,0.695000],[77,1,0.304000],[78,0,0.585000],[78,1,0.414000],[79,0,0.573000],[79,1,0.426000],[80,0,0.615000],[80,1,0.384000],[81,0,0.598000],[81,1,0.401000],[82,0,0.615000],[82,1,0.384000],[83,0,0.395000],[83,1,0.604000],[84,0,0.524000],[84,1,0.475000],[85,0,0.436000],[85,1,0.563000],[86,0,0.590000],[86,1,0.409000],[87,0,0.543000],[87,1,0.456000],[88,0,0.521000],[88,1,0.478000],[89,0,0.416000],[89,1,0.583000],];

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

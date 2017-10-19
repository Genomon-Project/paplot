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
msig_data.signatures = ['Signature 1','Signature 2','Signature 3','Background ',];
msig_data.sig_colors = ['#66C2A5','#FC8D62','#8DA0CB','#B3B3B3',];

msig_data.dataset_ref = [[[0.197,0.443,0.093,0.266],[0.01,0.018,0.002,0.969],[0,0.999,0,0],[0.386,0.089,0.012,0.511],[0.381,0.132,0.231,0.254],],[[0.348,0.145,0.179,0.326],[0.36,0.19,0.166,0.281],[0,0.703,0,0.296],[0.306,0.172,0.224,0.296],[0.312,0.18,0.158,0.348],],[[0.166,0.383,0.081,0.369],[0.01,0.036,0.015,0.937],[0,1,0,0],[0.541,0.116,0.073,0.268],[0.188,0.213,0.327,0.27],],];
msig_data.dataset_alt = [[[0,0,0,0],[0.025,0,0.974,0],[0,0,0,0],[0,0,0,0],],[[0,0,0,0],[0.204,0,0.089,0.409],[0,0,0,0],[0.108,0.168,0.019,0],],[[0,0,0,0],[0.085,0,0,0.914],[0,0,0,0],[0,0,0,0],],];
msig_data.dataset_strand = [[0.513,0.486],[0.46,0.539],[0.518,0.481],];

// [ID, signature, value]
msig_data.mutations = [[0,0,0.008000],[0,1,0.535000],[0,2,0.046000],[0,3,0.409000],[1,0,0.108000],[1,1,0.248000],[1,2,0.035000],[1,3,0.607000],[2,0,0.062000],[2,1,0.365000],[2,2,0.062000],[2,3,0.509000],[3,0,0.095000],[3,1,0.264000],[3,2,0.049000],[3,3,0.590000],[4,0,0.044000],[4,1,0.313000],[4,2,0.016000],[4,3,0.626000],[5,0,0.211000],[5,1,0.245000],[5,2,0.138000],[5,3,0.404000],[6,0,0.039000],[6,1,0.306000],[6,2,0.000000],[6,3,0.654000],[7,0,0.016000],[7,1,0.581000],[7,2,0.023000],[7,3,0.378000],[8,0,0.160000],[8,1,0.323000],[8,2,0.122000],[8,3,0.393000],[9,0,0.053000],[9,1,0.621000],[9,2,0.048000],[9,3,0.276000],[10,0,0.074000],[10,1,0.568000],[10,2,0.120000],[10,3,0.236000],[11,0,0.025000],[11,1,0.348000],[11,2,0.056000],[11,3,0.568000],[12,0,0.125000],[12,1,0.470000],[12,2,0.053000],[12,3,0.351000],[13,0,0.027000],[13,1,0.302000],[13,2,0.003000],[13,3,0.667000],[14,0,0.084000],[14,1,0.259000],[14,2,0.045000],[14,3,0.611000],[15,0,0.394000],[15,1,0.029000],[15,2,0.529000],[15,3,0.047000],[16,0,0.114000],[16,1,0.263000],[16,2,0.073000],[16,3,0.549000],[17,0,0.102000],[17,1,0.487000],[17,2,0.091000],[17,3,0.317000],[18,0,0.038000],[18,1,0.438000],[18,2,0.109000],[18,3,0.413000],[19,0,0.292000],[19,1,0.160000],[19,2,0.410000],[19,3,0.136000],[20,0,0.033000],[20,1,0.420000],[20,2,0.045000],[20,3,0.499000],];
msig_data.mutation_count = [796,2599,2340,1877,4146,2633,3679,1112,1029,754,2283,4154,4284,4093,3415,33129,1714,671,1888,3343,1047,];
msig_data.Ids = ['PD3851a','PD3890a','PD3904a','PD3905a','PD3945a','PD4005a','PD4006a','PD4085a','PD4086a','PD4088a','PD4103a','PD4107a','PD4109a','PD4115a','PD4116a','PD4120a','PD4192a','PD4194a','PD4198a','PD4199a','PD4248a',];
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

msig_data.get_bars_data = function (rate) {
    
    var data = [];
    var keys = [];
    var tooltips = {};
    var sum_par_id = [];
    
    for (var i1=0; i1 < msig_data.Ids.length; i1++) {
        tooltips[msig_data.esc_Ids[i1]] = [];
        sum_par_id[i1] = 0;
    }
    
    // par func
    for (var f=0; f < msig_data.signatures.length; f++) {

        data[f] = [];
        keys[f] = [];

        // par ID
        for (var i2=0; i2 < msig_data.Ids.length; i2++) {
            
            var data_filt = msig_data.mutations.filter(function(item, index){
                if ((item[0] == i2) && (item[1] == f)) return true;
            });
            
            //var sum = data_filt.length;
            var sum = 0;
            for (var s = 0; s < data_filt.length; s++) {
                sum += data_filt[s][2];
            }
            
            var mutation_count = 1;
            if (rate == false) {
                if (msig_data.mutation_count.length > 0) mutation_count = msig_data.mutation_count[i2];
            }
            
            if (sum > 0) {
                sum = sum*mutation_count;
                
                data[f].push(sum);
                keys[f].push(msig_data.esc_Ids[i2]);
                
                var obj2 = {
                    '#sum_mutaion_all': msig_data.mutations.length,
                    '#sum_item_value': sum,
                    'id': msig_data.Ids[i2],
                    'sig': msig_data.signatures[f],
                };
                tooltips[msig_data.esc_Ids[i2]].push(tooltip_text(msig_data.tooltip_format['mutation_partial'], obj2));
                sum_par_id[i2] += sum;
            }
        }
    }
    for (var i3=0; i3 < msig_data.Ids.length; i3++) {
        var obj3 = {
            '#sum_mutaion_all': msig_data.mutations.length,
            '#sum_item_value': sum_par_id[i3],
            'id': msig_data.Ids[i3],
        };
        
        var title = tooltip_text(msig_data.tooltip_format['mutation_title'], obj3);
        for (var t = 0; t < title.length; t++) {
            tooltips[msig_data.esc_Ids[i3]].splice(t, 0, title[t]);
        }
    }
    
    return {data: data, key: keys, tooltip: tooltips};
};

})();
Object.freeze(msig_data);

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
msig_data.signatures = ['Signature 1','Signature 2','Signature 3','Signature 4','Background ',];
msig_data.sig_colors = ['#66C2A5','#FC8D62','#8DA0CB','#E78AC3','#B3B3B3',];

msig_data.dataset_ref = [[[0.169,0.378,0.081,0.37],[0.008,0.032,0.011,0.947],[0,0.999,0,0],[0.541,0.12,0.064,0.274],[0.192,0.211,0.321,0.273],],[[0.189,0.452,0.092,0.264],[0.009,0.016,0.001,0.971],[0,0.999,0,0],[0.388,0.084,0.014,0.512],[0.38,0.133,0.237,0.248],],[[0.231,0.214,0.26,0.292],[0.384,0.219,0.256,0.139],[0,0.817,0,0.182],[0.202,0.028,0.639,0.128],[0.201,0.255,0.3,0.243],],[[0.397,0.127,0.141,0.334],[0.324,0.194,0.129,0.352],[0,0.665,0,0.334],[0.335,0.249,0.038,0.376],[0.372,0.139,0.09,0.397],],];
msig_data.dataset_alt = [[[0,0,0,0],[0.1,0,0,0.899],[0,0,0,0],[0,0,0,0],],[[0,0,0,0],[0,0,0.999,0],[0,0,0,0],[0,0,0,0],],[[0,0,0,0],[0,0,0.001,0.815],[0,0,0,0],[0,0.182,0,0],],[[0,0,0,0],[0.295,0,0.172,0.197],[0,0,0,0],[0.152,0.148,0.032,0],],];
msig_data.dataset_strand = [[0.517,0.482],[0.514,0.485],[0.493,0.506],[0.45,0.549],];

// [ID, signature, value]
msig_data.mutations = [[0,0,0.054000],[0,1,0.005000],[0,2,0.227000],[0,3,0.246000],[0,4,0.465000],[1,0,0.042000],[1,1,0.094000],[1,2,0.058000],[1,3,0.251000],[1,4,0.552000],[2,0,0.074000],[2,1,0.046000],[2,2,0.073000],[2,3,0.329000],[2,4,0.476000],[3,0,0.056000],[3,1,0.083000],[3,2,0.071000],[3,3,0.243000],[3,4,0.544000],[4,0,0.023000],[4,1,0.031000],[4,2,0.059000],[4,3,0.340000],[4,4,0.544000],[5,0,0.145000],[5,1,0.193000],[5,2,0.072000],[5,3,0.217000],[5,4,0.372000],[6,0,0.000000],[6,1,0.028000],[6,2,0.059000],[6,3,0.332000],[6,4,0.578000],[7,0,0.037000],[7,1,0.009000],[7,2,0.203000],[7,3,0.374000],[7,4,0.375000],[8,0,0.130000],[8,1,0.147000],[8,2,0.112000],[8,3,0.224000],[8,4,0.384000],[9,0,0.064000],[9,1,0.042000],[9,2,0.250000],[9,3,0.348000],[9,4,0.294000],[10,0,0.141000],[10,1,0.059000],[10,2,0.207000],[10,3,0.357000],[10,4,0.233000],[11,0,0.068000],[11,1,0.015000],[11,2,0.066000],[11,3,0.318000],[11,4,0.530000],[12,0,0.066000],[12,1,0.106000],[12,2,0.150000],[12,3,0.347000],[12,4,0.330000],[13,0,0.009000],[13,1,0.018000],[13,2,0.073000],[13,3,0.298000],[13,4,0.600000],[14,0,0.050000],[14,1,0.072000],[14,2,0.055000],[14,3,0.278000],[14,4,0.542000],[15,0,0.532000],[15,1,0.384000],[15,2,0.019000],[15,3,0.016000],[15,4,0.047000],[16,0,0.078000],[16,1,0.111000],[16,2,0.138000],[16,3,0.089000],[16,4,0.583000],[17,0,0.099000],[17,1,0.096000],[17,2,0.231000],[17,3,0.220000],[17,4,0.351000],[18,0,0.118000],[18,1,0.030000],[18,2,0.161000],[18,3,0.312000],[18,4,0.378000],[19,0,0.416000],[19,1,0.282000],[19,2,0.066000],[19,3,0.081000],[19,4,0.152000],[20,0,0.055000],[20,1,0.028000],[20,2,0.141000],[20,3,0.255000],[20,4,0.519000],];
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

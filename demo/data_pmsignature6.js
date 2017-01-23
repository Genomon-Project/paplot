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
msig_data.signatures = ['signature 1','signature 2','signature 3','signature 4','signature 5','background ',];
msig_data.sig_colors = ['#66C2A5','#FC8D62','#8DA0CB','#E78AC3','#A6D854','#B3B3B3',];
msig_data.Ids = ['PD3851a','PD3890a','PD3904a','PD3905a','PD3945a','PD4005a','PD4006a','PD4085a','PD4086a','PD4088a','PD4103a','PD4107a','PD4109a','PD4115a','PD4116a','PD4120a','PD4192a','PD4194a','PD4198a','PD4199a','PD4248a',];

msig_data.dataset_ref = [[[0.227,0.215,0.259,0.297],[0.379,0.223,0.25,0.146],[0,0.816,0,0.183],[0.199,0.034,0.617,0.149],[0.19,0.258,0.3,0.249],],[[0.199,0.315,0.122,0.362],[0.007,0.018,0.003,0.969],[0,0.998,0,0.001],[0,0.061,0,0.938],[0.118,0.206,0.234,0.44],],[[0.186,0.516,0.078,0.218],[0.011,0.017,0.001,0.969],[0,0.999,0,0],[0.597,0.098,0.02,0.283],[0.518,0.091,0.243,0.146],],[[0.402,0.128,0.139,0.33],[0.33,0.192,0.13,0.346],[0,0.661,0,0.338],[0.355,0.255,0.039,0.349],[0.389,0.138,0.084,0.386],],[[0.164,0.393,0.076,0.364],[0.008,0.034,0.011,0.945],[0,1,0,0],[0.587,0.125,0.07,0.215],[0.198,0.214,0.327,0.26],],];
msig_data.dataset_alt = [[[0,0,0,0],[0,0,0.008,0.807],[0,0,0,0],[0,0.183,0,0],],[[0,0,0,0],[0.038,0,0.754,0.205],[0,0,0,0],[0,0,0.001,0],],[[0,0,0,0],[0,0,0.999,0],[0,0,0,0],[0,0,0,0],],[[0,0,0,0],[0.305,0,0.167,0.188],[0,0,0,0],[0.157,0.147,0.032,0],],[[0,0,0,0],[0.096,0,0,0.903],[0,0,0,0],[0,0,0,0],],];
msig_data.dataset_strand = [[0.502,0.497],[0.552,0.447],[0.49,0.509],[0.438,0.561],[0.509,0.49],];

// [ID, signature, value]
msig_data.mutations = [[0,0,0.233000],[0,1,0.000000],[0,2,0.006000],[0,3,0.244000],[0,4,0.052000],[0,5,0.463000],[1,0,0.053000],[1,1,0.055000],[1,2,0.057000],[1,3,0.241000],[1,4,0.037000],[1,5,0.554000],[2,0,0.076000],[2,1,0.045000],[2,2,0.020000],[2,3,0.325000],[2,4,0.065000],[2,5,0.466000],[3,0,0.072000],[3,1,0.053000],[3,2,0.048000],[3,3,0.222000],[3,4,0.048000],[3,5,0.553000],[4,0,0.062000],[4,1,0.024000],[4,2,0.016000],[4,3,0.332000],[4,4,0.019000],[4,5,0.543000],[5,0,0.076000],[5,1,0.107000],[5,2,0.119000],[5,3,0.197000],[5,4,0.122000],[5,5,0.376000],[6,0,0.068000],[6,1,0.022000],[6,2,0.012000],[6,3,0.312000],[6,4,0.000000],[6,5,0.584000],[7,0,0.214000],[7,1,0.021000],[7,2,0.000000],[7,3,0.355000],[7,4,0.031000],[7,5,0.377000],[8,0,0.125000],[8,1,0.064000],[8,2,0.103000],[8,3,0.215000],[8,4,0.118000],[8,5,0.373000],[9,0,0.256000],[9,1,0.031000],[9,2,0.024000],[9,3,0.325000],[9,4,0.051000],[9,5,0.309000],[10,0,0.217000],[10,1,0.048000],[10,2,0.033000],[10,3,0.346000],[10,4,0.131000],[10,5,0.222000],[11,0,0.075000],[11,1,0.027000],[11,2,0.004000],[11,3,0.287000],[11,4,0.049000],[11,5,0.555000],[12,0,0.158000],[12,1,0.069000],[12,2,0.059000],[12,3,0.331000],[12,4,0.050000],[12,5,0.330000],[13,0,0.077000],[13,1,0.023000],[13,2,0.005000],[13,3,0.272000],[13,4,0.006000],[13,5,0.613000],[14,0,0.059000],[14,1,0.038000],[14,2,0.047000],[14,3,0.265000],[14,4,0.046000],[14,5,0.541000],[15,0,0.019000],[15,1,0.171000],[15,2,0.255000],[15,3,0.016000],[15,4,0.492000],[15,5,0.043000],[16,0,0.144000],[16,1,0.064000],[16,2,0.071000],[16,3,0.096000],[16,4,0.068000],[16,5,0.554000],[17,0,0.234000],[17,1,0.039000],[17,2,0.067000],[17,3,0.236000],[17,4,0.092000],[17,5,0.329000],[18,0,0.163000],[18,1,0.019000],[18,2,0.019000],[18,3,0.303000],[18,4,0.112000],[18,5,0.382000],[19,0,0.070000],[19,1,0.126000],[19,2,0.187000],[19,3,0.077000],[19,4,0.387000],[19,5,0.150000],[20,0,0.154000],[20,1,0.019000],[20,2,0.016000],[20,3,0.235000],[20,4,0.054000],[20,5,0.520000],];
msig_data.mutation_count = [702,2312,2096,1671,3706,2335,3251,997,890,687,2054,3616,3874,3614,3076,30072,1522,594,1649,2983,926,];

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
            
            var mutation_count = 1;
            if (rate == false) {
                if (msig_data.mutation_count.length > 0) mutation_count = msig_data.mutation_count[i];
            }
            
            if (sum > 0) {
                sum = sum*mutation_count;
                
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

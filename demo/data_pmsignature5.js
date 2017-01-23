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
msig_data.signatures = ['signature 1','signature 2','signature 3','signature 4','background ',];
msig_data.sig_colors = ['#66C2A5','#FC8D62','#8DA0CB','#E78AC3','#B3B3B3',];
msig_data.Ids = ['PD3851a','PD3890a','PD3904a','PD3905a','PD3945a','PD4005a','PD4006a','PD4085a','PD4086a','PD4088a','PD4103a','PD4107a','PD4109a','PD4115a','PD4116a','PD4120a','PD4192a','PD4194a','PD4198a','PD4199a','PD4248a',];

msig_data.dataset_ref = [[[0.19,0.454,0.092,0.263],[0.009,0.017,0.001,0.971],[0,0.999,0,0],[0.389,0.084,0.013,0.512],[0.38,0.132,0.238,0.248],],[[0.227,0.218,0.259,0.294],[0.383,0.223,0.25,0.143],[0,0.816,0,0.183],[0.2,0.031,0.629,0.139],[0.193,0.259,0.301,0.246],],[[0.167,0.382,0.08,0.369],[0.008,0.032,0.011,0.947],[0,0.999,0,0],[0.539,0.121,0.065,0.273],[0.19,0.212,0.322,0.274],],[[0.399,0.126,0.141,0.332],[0.322,0.189,0.128,0.358],[0,0.669,0,0.33],[0.34,0.25,0.037,0.371],[0.376,0.141,0.086,0.395],],];
msig_data.dataset_alt = [[[0,0,0,0],[0,0,0.999,0],[0,0,0,0],[0,0,0,0],],[[0,0,0,0],[0,0,0.006,0.809],[0,0,0,0],[0,0.183,0,0],],[[0,0,0,0],[0.1,0,0,0.899],[0,0,0,0],[0,0,0,0],],[[0,0,0,0],[0.299,0,0.175,0.194],[0,0,0,0],[0.153,0.144,0.032,0],],];
msig_data.dataset_strand = [[0.509,0.49],[0.5,0.499],[0.514,0.485],[0.444,0.555],];

// [ID, signature, value]
msig_data.mutations = [[0,0,0.004000],[0,1,0.231000],[0,2,0.052000],[0,3,0.241000],[0,4,0.470000],[1,0,0.099000],[1,1,0.051000],[1,2,0.044000],[1,3,0.249000],[1,4,0.555000],[2,0,0.048000],[2,1,0.073000],[2,2,0.076000],[2,3,0.334000],[2,4,0.467000],[3,0,0.085000],[3,1,0.070000],[3,2,0.060000],[3,3,0.230000],[3,4,0.553000],[4,0,0.031000],[4,1,0.061000],[4,2,0.022000],[4,3,0.337000],[4,4,0.546000],[5,0,0.195000],[5,1,0.073000],[5,2,0.144000],[5,3,0.210000],[5,4,0.374000],[6,0,0.027000],[6,1,0.067000],[6,2,0.000000],[6,3,0.321000],[6,4,0.584000],[7,0,0.010000],[7,1,0.210000],[7,2,0.036000],[7,3,0.363000],[7,4,0.378000],[8,0,0.150000],[8,1,0.122000],[8,2,0.130000],[8,3,0.221000],[8,4,0.375000],[9,0,0.041000],[9,1,0.252000],[9,2,0.061000],[9,3,0.333000],[9,4,0.310000],[10,0,0.062000],[10,1,0.212000],[10,2,0.143000],[10,3,0.361000],[10,4,0.220000],[11,0,0.014000],[11,1,0.072000],[11,2,0.055000],[11,3,0.299000],[11,4,0.557000],[12,0,0.105000],[12,1,0.154000],[12,2,0.064000],[12,3,0.347000],[12,4,0.328000],[13,0,0.019000],[13,1,0.075000],[13,2,0.009000],[13,3,0.280000],[13,4,0.614000],[14,0,0.073000],[14,1,0.058000],[14,2,0.053000],[14,3,0.269000],[14,4,0.545000],[15,0,0.385000],[15,1,0.019000],[15,2,0.534000],[15,3,0.016000],[15,4,0.044000],[16,0,0.120000],[16,1,0.141000],[16,2,0.079000],[16,3,0.098000],[16,4,0.559000],[17,0,0.097000],[17,1,0.231000],[17,2,0.098000],[17,3,0.237000],[17,4,0.335000],[18,0,0.031000],[18,1,0.161000],[18,2,0.117000],[18,3,0.305000],[18,4,0.384000],[19,0,0.282000],[19,1,0.068000],[19,2,0.417000],[19,3,0.078000],[19,4,0.152000],[20,0,0.028000],[20,1,0.150000],[20,2,0.058000],[20,3,0.239000],[20,4,0.523000],];
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

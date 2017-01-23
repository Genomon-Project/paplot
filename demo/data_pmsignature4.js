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
msig_data.signatures = ['signature 1','signature 2','signature 3','background ',];
msig_data.sig_colors = ['#66C2A5','#FC8D62','#8DA0CB','#B3B3B3',];
msig_data.Ids = ['PD3851a','PD3890a','PD3904a','PD3905a','PD3945a','PD4005a','PD4006a','PD4085a','PD4086a','PD4088a','PD4103a','PD4107a','PD4109a','PD4115a','PD4116a','PD4120a','PD4192a','PD4194a','PD4198a','PD4199a','PD4248a',];

msig_data.dataset_ref = [[[0.346,0.147,0.181,0.324],[0.36,0.188,0.166,0.284],[0,0.708,0,0.291],[0.307,0.171,0.227,0.293],[0.308,0.184,0.158,0.347],],[[0.164,0.386,0.08,0.368],[0.01,0.037,0.015,0.936],[0,0.999,0,0],[0.539,0.118,0.074,0.268],[0.187,0.214,0.327,0.27],],[[0.197,0.444,0.092,0.265],[0.01,0.018,0.001,0.969],[0,0.999,0,0],[0.387,0.089,0.012,0.51],[0.381,0.131,0.232,0.253],],];
msig_data.dataset_alt = [[[0,0,0,0],[0.204,0,0.091,0.412],[0,0,0,0],[0.105,0.166,0.019,0],],[[0,0,0,0],[0.085,0,0,0.914],[0,0,0,0],[0,0,0,0],],[[0,0,0,0],[0.024,0,0.974,0],[0,0,0,0],[0,0,0,0],],];
msig_data.dataset_strand = [[0.461,0.538],[0.515,0.484],[0.507,0.492],];

// [ID, signature, value]
msig_data.mutations = [[0,0,0.530000],[0,1,0.044000],[0,2,0.007000],[0,3,0.418000],[1,0,0.235000],[1,1,0.037000],[1,2,0.113000],[1,3,0.613000],[2,0,0.360000],[2,1,0.064000],[2,2,0.065000],[2,3,0.508000],[3,0,0.246000],[3,1,0.054000],[3,2,0.096000],[3,3,0.602000],[4,0,0.303000],[4,1,0.016000],[4,2,0.044000],[4,3,0.635000],[5,0,0.239000],[5,1,0.138000],[5,2,0.214000],[5,3,0.407000],[6,0,0.306000],[6,1,0.000000],[6,2,0.037000],[6,3,0.655000],[7,0,0.580000],[7,1,0.022000],[7,2,0.018000],[7,3,0.379000],[8,0,0.320000],[8,1,0.124000],[8,2,0.161000],[8,3,0.393000],[9,0,0.616000],[9,1,0.046000],[9,2,0.052000],[9,3,0.285000],[10,0,0.568000],[10,1,0.123000],[10,2,0.078000],[10,3,0.229000],[11,0,0.340000],[11,1,0.044000],[11,2,0.024000],[11,3,0.590000],[12,0,0.475000],[12,1,0.050000],[12,2,0.125000],[12,3,0.348000],[13,0,0.285000],[13,1,0.004000],[13,2,0.028000],[13,3,0.682000],[14,0,0.255000],[14,1,0.048000],[14,2,0.085000],[14,3,0.610000],[15,0,0.028000],[15,1,0.531000],[15,2,0.395000],[15,3,0.045000],[16,0,0.271000],[16,1,0.073000],[16,2,0.125000],[16,3,0.530000],[17,0,0.511000],[17,1,0.090000],[17,2,0.104000],[17,3,0.293000],[18,0,0.431000],[18,1,0.108000],[18,2,0.039000],[18,3,0.420000],[19,0,0.158000],[19,1,0.411000],[19,2,0.292000],[19,3,0.136000],[20,0,0.424000],[20,1,0.047000],[20,2,0.033000],[20,3,0.494000],];
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

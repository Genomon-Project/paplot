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
msig_data.signatures = ['Signature 1','Signature 2','Signature 3','Signature 4','Signature 5','Background ',];
msig_data.sig_colors = ['#66C2A5','#FC8D62','#8DA0CB','#E78AC3','#A6D854','#B3B3B3',];

msig_data.dataset_ref = [[[0.4,0.128,0.138,0.332],[0.332,0.197,0.131,0.339],[0,0.657,0,0.342],[0.349,0.254,0.04,0.355],[0.385,0.136,0.089,0.389],],[[0.2,0.314,0.122,0.362],[0.007,0.017,0.003,0.971],[0,0.998,0,0.001],[0,0.064,0,0.935],[0.117,0.209,0.23,0.442],],[[0.231,0.212,0.261,0.295],[0.381,0.219,0.255,0.142],[0,0.817,0,0.182],[0.2,0.031,0.628,0.139],[0.198,0.255,0.299,0.246],],[[0.185,0.514,0.078,0.22],[0.011,0.017,0.001,0.969],[0,0.999,0,0],[0.596,0.096,0.021,0.284],[0.519,0.091,0.244,0.145],],[[0.166,0.389,0.077,0.366],[0.009,0.033,0.011,0.945],[0,1,0,0],[0.588,0.124,0.069,0.218],[0.199,0.213,0.326,0.26],],];
msig_data.dataset_alt = [[[0,0,0,0],[0.301,0,0.164,0.192],[0,0,0,0],[0.157,0.152,0.032,0],],[[0,0,0,0],[0.038,0,0.757,0.202],[0,0,0,0],[0,0,0.001,0],],[[0,0,0,0],[0,0,0.003,0.814],[0,0,0,0],[0,0.182,0,0],],[[0,0,0,0],[0.002,0,0.997,0],[0,0,0,0],[0,0,0,0],],[[0,0,0,0],[0.095,0,0,0.904],[0,0,0,0],[0,0,0,0],],];
msig_data.dataset_strand = [[0.445,0.554],[0.559,0.44],[0.495,0.504],[0.493,0.506],[0.512,0.487],];

// [ID, signature, value]
msig_data.mutations = [[0,0,0.248000],[0,1,0.002000],[0,2,0.229000],[0,3,0.005000],[0,4,0.054000],[0,5,0.459000],[1,0,0.244000],[1,1,0.056000],[1,2,0.060000],[1,3,0.052000],[1,4,0.035000],[1,5,0.551000],[2,0,0.320000],[2,1,0.042000],[2,2,0.076000],[2,3,0.020000],[2,4,0.064000],[2,5,0.475000],[3,0,0.236000],[3,1,0.052000],[3,2,0.073000],[3,3,0.047000],[3,4,0.045000],[3,5,0.544000],[4,0,0.335000],[4,1,0.026000],[4,2,0.061000],[4,3,0.015000],[4,4,0.019000],[4,5,0.541000],[5,0,0.205000],[5,1,0.103000],[5,2,0.074000],[5,3,0.118000],[5,4,0.125000],[5,5,0.373000],[6,0,0.324000],[6,1,0.023000],[6,2,0.061000],[6,3,0.013000],[6,4,0.000000],[6,5,0.577000],[7,0,0.365000],[7,1,0.020000],[7,2,0.207000],[7,3,0.000000],[7,4,0.032000],[7,5,0.373000],[8,0,0.218000],[8,1,0.066000],[8,2,0.115000],[8,3,0.099000],[8,4,0.117000],[8,5,0.383000],[9,0,0.341000],[9,1,0.030000],[9,2,0.254000],[9,3,0.026000],[9,4,0.055000],[9,5,0.293000],[10,0,0.344000],[10,1,0.047000],[10,2,0.212000],[10,3,0.031000],[10,4,0.128000],[10,5,0.234000],[11,0,0.308000],[11,1,0.025000],[11,2,0.069000],[11,3,0.005000],[11,4,0.061000],[11,5,0.529000],[12,0,0.332000],[12,1,0.067000],[12,2,0.153000],[12,3,0.061000],[12,4,0.052000],[12,5,0.331000],[13,0,0.290000],[13,1,0.021000],[13,2,0.075000],[13,3,0.005000],[13,4,0.006000],[13,5,0.599000],[14,0,0.274000],[14,1,0.040000],[14,2,0.056000],[14,3,0.046000],[14,4,0.043000],[14,5,0.538000],[15,0,0.016000],[15,1,0.171000],[15,2,0.019000],[15,3,0.255000],[15,4,0.491000],[15,5,0.046000],[16,0,0.088000],[16,1,0.058000],[16,2,0.140000],[16,3,0.066000],[16,4,0.068000],[16,5,0.577000],[17,0,0.219000],[17,1,0.039000],[17,2,0.234000],[17,3,0.067000],[17,4,0.092000],[17,5,0.345000],[18,0,0.309000],[18,1,0.019000],[18,2,0.162000],[18,3,0.019000],[18,4,0.113000],[18,5,0.375000],[19,0,0.080000],[19,1,0.124000],[19,2,0.067000],[19,3,0.188000],[19,4,0.387000],[19,5,0.151000],[20,0,0.254000],[20,1,0.016000],[20,2,0.144000],[20,3,0.017000],[20,4,0.053000],[20,5,0.515000],];
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

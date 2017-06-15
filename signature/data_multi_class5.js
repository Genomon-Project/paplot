(function() {
sig_data = {};

sig_data.tooltip_format = {
    signature_title:{format:[[{label:'{sig}',type:'str',keys:['sig',],ext:''},],], keys: '{sig} '},
    signature_partial:{format:[[{label:'{route}',type:'str',keys:['route',],ext:''},{label:': ',type:'fix',keys:[],ext:''},{label:'{#sum_item_value}',type:'numeric',keys:['#sum_item_value',],ext:'6.2'},],], keys: '{#sum_item_value} {route} '},
    mutation_title:{format:[], keys: ''},
    mutation_partial:{format:[], keys: ''},
};

sig_data.signatures = ['signature 1','signature 2','signature 3','signature 4','signature 5',];
sig_data.sig_colors = ['#66C2A5','#FC8D62','#8DA0CB','#E78AC3','#A6D854',];
sig_data.dataset_sig = [[[0.0206,0.0147,0.0027,0.0098,0.0124,0.0043,0.0021,0.0103,0.0181,0.0081,0.0032,0.0109,0.0253,0.0159,0.0045,0.0306],[0.0029,0.0054,0.0013,0.0035,0.001,0.0016,0.0016,0.0046,0.0028,0.0037,0,0.001,0,0.0077,0,0.0039],[0.0234,0.0103,0.0734,0.0102,0.0204,0.0162,0.0411,0.0187,0.017,0.015,0.0453,0.0139,0.0376,0.0347,0.0367,0.0361],[0.0083,0.0095,0.0077,0.0188,0.0011,0.0031,0.0021,0.0037,0.0011,0.003,0.0022,0.0023,0.0237,0.0041,0.0038,0.008],[0.0209,0.007,0.0126,0.017,0.0055,0.0071,0.0055,0.0066,0.0089,0.0058,0.0053,0.0132,0.0119,0.0103,0.0062,0.0144],[0.0061,0.0026,0,0.0033,0.002,0.0023,0.0026,0.0072,0.0005,0.0007,0.0011,0.0036,0.0029,0.0027,0.0029,0.0099],],[[0.0271,0.0215,0.003,0.0229,0.0224,0.0216,0.0029,0.0224,0.0149,0.0144,0.0009,0.0135,0.0178,0.0127,0.0016,0.0219],[0.0144,0.0094,0.0042,0.0133,0.0115,0.0106,0.0031,0.0141,0.0075,0.0073,0.0018,0.0111,0,0.0073,0.0008,0.0078],[0.0205,0.0062,0,0.0197,0.0122,0.0086,0.0003,0.0183,0.0121,0.0083,0.0016,0.0113,0.0262,0.0147,0,0.0242],[0.0093,0.0069,0.0129,0.0136,0.0113,0.0148,0.0136,0.0199,0.0078,0.0059,0.0073,0.0126,0.0088,0.01,0.0065,0.0213],[0.0171,0.0089,0.0106,0.0175,0.0085,0.0159,0.0075,0.013,0.0075,0.0062,0.005,0.0075,0.0098,0.0083,0.0063,0.0108],[0.0053,0.0023,0.008,0.0038,0.0041,0.0055,0.0072,0.0094,0.0042,0.0029,0.0096,0.007,0.0064,0.0054,0.009,0.0121],],[[0.0171,0.0136,0,0.0123,0.0205,0.0153,0,0.0154,0.0033,0.01,0.0004,0.0086,0.0251,0.0209,0.0005,0.0354],[0.013,0.0076,0,0.0169,0.0128,0.0096,0.0002,0.0191,0.0052,0.0062,0.0005,0.0101,0.0479,0.0295,0.0007,0.0844],[0.014,0.0107,0.0115,0.016,0.009,0.0103,0.0033,0.0161,0.0099,0.0094,0.0065,0.0104,0,0.0149,0,0.013],[0.0107,0.0068,0.0076,0.0154,0.0069,0.0071,0.0071,0.0104,0.0037,0.0057,0.0053,0.0066,0.014,0.0088,0.0047,0.013],[0.0209,0.0051,0.0143,0.0208,0.0096,0.0056,0.011,0.0168,0.0073,0.0026,0.0042,0.0081,0.0104,0.0046,0.0049,0.009],[0.0031,0.0007,0.0076,0.0085,0.0032,0.003,0.01,0.0132,0.0035,0.003,0.0032,0.0045,0.0063,0.0027,0.0065,0.0103],],[[0.0016,0.0001,0.0002,0.0003,0.0011,0.0006,0.0003,0.0005,0.0012,0.0003,0.0002,0.0003,0.0269,0.0105,0.0016,0.0141],[0.0022,0.0007,0.0001,0.0019,0.0027,0.0005,0.0005,0.0031,0.0008,0.0004,0.0002,0.0013,0.1538,0.0302,0.0055,0.1917],[0.0042,0.0015,0.0024,0.0017,0.0096,0.0026,0.0045,0.0052,0.0045,0.0021,0.0032,0.0028,0.2658,0.052,0.0282,0.1354],[0.0011,0.0006,0.0004,0.0001,0.0002,0.0003,0.0001,0,0.0003,0.0001,0.0004,0,0.0004,0,0.0002,0.0001],[0.0004,0.0003,0.0007,0.0004,0.0001,0.0005,0.001,0.0003,0.0003,0.0003,0.0006,0.0002,0.0002,0.0005,0.0003,0.0004],[0.0002,0.0002,0.0001,0.0001,0,0.0002,0.0001,0,0.0001,0.0002,0.001,0.0002,0.0001,0.0001,0.0001,0.0006],],[[0.0091,0.0138,0.0061,0.013,0.0101,0.0057,0.0057,0,0.0183,0.0016,0.0033,0.0069,0.0021,0.0136,0.0022,0],[0.0208,0.01,0.01,0.0178,0.008,0.0047,0.0081,0.0077,0.0085,0.0046,0.0048,0.0128,0.0295,0.0214,0.009,0.0437],[0.0122,0.0123,0.0468,0.0072,0.0142,0.0075,0.0322,0.0146,0.0092,0.0085,0.0341,0.0128,0,0.0048,0.0245,0.0002],[0.0053,0.0097,0.0067,0.0075,0.006,0.0094,0.0102,0.0107,0.0062,0.003,0.005,0.0087,0.0083,0.0011,0.0059,0.0118],[0.0093,0.0133,0.0143,0.0179,0.0092,0.0097,0.012,0.002,0.0124,0.01,0.0125,0.0096,0.0061,0.0153,0.0046,0.0119],[0.0091,0.0063,0.0096,0.0102,0.0053,0.0052,0.0085,0.0059,0.0073,0.0038,0.0123,0.0089,0.0063,0.0063,0.0115,0.0191],],];
sig_data.dataset_sig_max = 0.2658;
sig_data.route_id = ['AA','AC','AG','AT','CA','CC','CG','CT','GA','GC','GG','GT','TA','TC','TG','TT',];
sig_data.substitution = [{name: 'C > A', color: '#1BBDEB', route: ['ApCpA','ApCpC','ApCpG','ApCpT','CpCpA','CpCpC','CpCpG','CpCpT','GpCpA','GpCpC','GpCpG','GpCpT','TpCpA','TpCpC','TpCpG','TpCpT',],},{name: 'C > G', color: '#211D1E', route: ['ApCpA','ApCpC','ApCpG','ApCpT','CpCpA','CpCpC','CpCpG','CpCpT','GpCpA','GpCpC','GpCpG','GpCpT','TpCpA','TpCpC','TpCpG','TpCpT',],},{name: 'C > T', color: '#E62623', route: ['ApCpA','ApCpC','ApCpG','ApCpT','CpCpA','CpCpC','CpCpG','CpCpT','GpCpA','GpCpC','GpCpG','GpCpT','TpCpA','TpCpC','TpCpG','TpCpT',],},{name: 'T > A', color: '#CFCFCF', route: ['ApTpA','ApTpC','ApTpG','ApTpT','CpTpA','CpTpC','CpTpG','CpTpT','GpTpA','GpTpC','GpTpG','GpTpT','TpTpA','TpTpC','TpTpG','TpTpT',],},{name: 'T > C', color: '#ACD577', route: ['ApTpA','ApTpC','ApTpG','ApTpT','CpTpA','CpTpC','CpTpG','CpTpT','GpTpA','GpTpC','GpTpG','GpTpT','TpTpA','TpTpC','TpTpG','TpTpT',],},{name: 'T > G', color: '#EDC7C4', route: ['ApTpA','ApTpC','ApTpG','ApTpT','CpTpA','CpTpC','CpTpG','CpTpT','GpTpA','GpTpC','GpTpG','GpTpT','TpTpA','TpTpC','TpTpG','TpTpT',],},];

// [ID, signature, value]
sig_data.mutations = [];
sig_data.mutation_count = [];
sig_data.Ids = [];

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

sig_data.get_bars_data = function (rate) {
    
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
            
            var mutation_count = 1;
            if (rate == false) {
                if (sig_data.mutation_count.length > 0) mutation_count = sig_data.mutation_count[i];
            }
            
            if (sum > 0) {
                sum = sum*mutation_count;
            
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

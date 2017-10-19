(function() {
sig_data = {};

sig_data.tooltip_format = {
    signature_title:{format:[[{label:'{sig}',type:'str',keys:['sig',],ext:''},],], keys: '{sig} '},
    signature_partial:{format:[[{label:'{route}',type:'str',keys:['route',],ext:''},{label:': ',type:'fix',keys:[],ext:''},{label:'{#sum_item_value}',type:'numeric',keys:['#sum_item_value',],ext:'6.2'},],], keys: '{#sum_item_value} {route} '},
    mutation_title:{format:[], keys: ''},
    mutation_partial:{format:[], keys: ''},
};

sig_data.signatures = ['Signature 1','Signature 2','Signature 3','Signature 4','Signature 5','Signature 6',];
sig_data.sig_colors = ['#66C2A5','#FC8D62','#8DA0CB','#E78AC3','#A6D854','#FFD92F',];
sig_data.dataset_sig = [[[0.0207,0.0204,0.0077,0.0257,0.0171,0.0174,0.0076,0.0142,0.0254,0.0066,0.0023,0.0137,0.0009,0.0106,0.0016,0],[0.0241,0.0127,0.0138,0.0192,0.0127,0.0095,0.0093,0.0111,0.0103,0.0064,0.0052,0.0158,0,0.0097,0.0075,0.0027],[0.0178,0.0089,0.0126,0.0178,0.0121,0.0033,0.0134,0.0194,0.009,0.0065,0.0139,0.012,0.004,0,0.0071,0.0047],[0.001,0.0075,0.0109,0.0039,0.0097,0.0173,0.0164,0.0248,0.0107,0.0038,0.0078,0.0154,0,0.0048,0.0082,0.0216],[0.005,0.0158,0.0109,0.0175,0.0098,0.0193,0.0091,0.0052,0.0102,0.0107,0.0107,0.0052,0.0048,0.0142,0.0059,0.011],[0.0071,0.0046,0.0125,0.0055,0.0058,0.0068,0.0089,0.0048,0.0075,0.0044,0.0161,0.0104,0.0071,0.0082,0.0133,0.0189],],[[0.0013,0,0.0002,0.0001,0.001,0.0007,0.0003,0.0004,0.0006,0.0003,0.0002,0,0.0268,0.01,0.0015,0.0133],[0.0022,0.0006,0.0001,0.0017,0.0027,0.0005,0.0004,0.0028,0.0008,0.0004,0.0002,0.0013,0.156,0.0297,0.0056,0.1938],[0.0038,0.0011,0,0.0013,0.0094,0.0024,0.003,0.0045,0.0042,0.0016,0.0018,0.0025,0.2728,0.0521,0.028,0.1375],[0.0015,0.0006,0.0006,0.0004,0.0004,0.0004,0.0002,0,0.0003,0.0001,0.0004,0.0001,0.0003,0.0001,0.0001,0.0002],[0.0005,0.0001,0.0004,0.0001,0,0.0004,0.001,0.0002,0.0002,0.0003,0.0006,0.0003,0.0003,0.0004,0.0002,0.0002],[0.0004,0.0003,0.0001,0.0001,0,0.0002,0,0,0.0001,0.0001,0.0012,0.0002,0.0001,0.0001,0.0001,0.0005],],[[0.0249,0.014,0.0022,0.0147,0.0148,0.0088,0.0016,0.0172,0.0213,0.0086,0.0025,0.0154,0.0299,0.0193,0.0036,0.0394],[0.0025,0.0059,0.002,0.0051,0.004,0.0039,0.0014,0.0095,0.0027,0.0038,0,0.0013,0.0092,0.0139,0,0.0225],[0.0246,0.0113,0.0619,0.018,0.0176,0.0129,0.0368,0.0254,0.0167,0.0158,0.0365,0.013,0.0413,0.0397,0.0265,0.05],[0,0.006,0.0056,0.0071,0,0.0043,0.0023,0.0083,0.0018,0.0031,0.0027,0.0036,0.0118,0.0044,0.0044,0.0078],[0.0124,0.0075,0.0099,0.0153,0.0052,0.0089,0.0021,0.0099,0.0055,0.0044,0.0019,0.0058,0.0069,0.0058,0.0061,0.0118],[0,0,0.0002,0,0.0015,0.0014,0.004,0.0048,0,0.0012,0,0.0027,0.0024,0.0025,0.0017,0.0066],],[[0.0145,0.0149,0.0032,0.0046,0.0102,0,0.0028,0.0027,0.012,0.007,0.0038,0.0052,0.0195,0.0128,0.0045,0.02],[0.0054,0.0051,0.001,0.0036,0,0,0.0022,0.0007,0.0033,0.0037,0.0002,0.0021,0,0.0052,0.0005,0],[0.0203,0.0092,0.0761,0.0024,0.0217,0.0182,0.0409,0.011,0.0158,0.013,0.0492,0.0142,0.0328,0.0273,0.0434,0.0207],[0.0179,0.0127,0.0101,0.0292,0.0041,0.0024,0.003,0,0.0008,0.0031,0.0021,0.0016,0.0331,0.0038,0.0032,0.0087],[0.0276,0.0064,0.015,0.0186,0.0062,0.0047,0.01,0.0034,0.0123,0.0071,0.0091,0.0196,0.0158,0.0142,0.0058,0.0159],[0.012,0.0062,0,0.0079,0.0027,0.0035,0.0018,0.0106,0.002,0.0005,0.0033,0.0047,0.0038,0.0031,0.0053,0.014],],[[0.0273,0.0212,0.0018,0.0205,0.0231,0.0211,0.0017,0.0225,0.0113,0.0156,0.0007,0.0126,0.0217,0.014,0.0015,0.0277],[0.0123,0.0085,0.0018,0.0124,0.0107,0.0103,0.0016,0.0147,0.0067,0.0074,0.001,0.0099,0,0.0079,0,0.0104],[0.0208,0.0064,0.0031,0.0188,0.0126,0.0109,0,0.0173,0.0129,0.0092,0.0024,0.0116,0.0198,0.0166,0,0.0218],[0.0124,0.0074,0.013,0.0181,0.011,0.0131,0.0121,0.017,0.0066,0.0062,0.0069,0.0111,0.014,0.011,0.0059,0.0202],[0.0222,0.0072,0.0117,0.0187,0.0086,0.0136,0.0082,0.0148,0.0075,0.0051,0.0042,0.0095,0.0118,0.0074,0.0064,0.0114],[0.0056,0.0021,0.007,0.0048,0.0038,0.0051,0.0071,0.0114,0.0035,0.0026,0.0075,0.0062,0.0064,0.0046,0.0079,0.0113],],[[0,0.0044,0,0.0048,0.0127,0.0076,0,0,0,0,0.0006,0.0028,0.0163,0.0244,0,0.0222],[0.0198,0.0078,0.0023,0.0249,0.0148,0.0082,0.0025,0.0212,0.0062,0.0046,0.0027,0.0142,0.1179,0.0559,0.0062,0.1797],[0.0012,0.015,0.0153,0.0094,0.0039,0.0047,0.0101,0.013,0.0038,0.0067,0.0106,0.0085,0,0.0072,0.003,0.0084],[0.0035,0.0057,0,0.0022,0.003,0.0035,0.005,0.0049,0.0028,0.0045,0.0045,0.0043,0.0024,0.0031,0.004,0.005],[0.0093,0.0064,0.0156,0.0191,0.0106,0,0.0138,0.0126,0.0082,0.0028,0.0073,0.0036,0.0044,0.0054,0.0022,0.0051],[0.0017,0.0009,0.0116,0.0127,0.0038,0.0019,0.0139,0.0098,0.0062,0.0044,0.0047,0.005,0.0065,0.0024,0.008,0.012],],];
sig_data.dataset_sig_max = 0.2728;
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
        var segment_index = -1;
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
        
        var title = tooltip_text(sig_data.tooltip_format['signature_title'], obj);
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
    for (var i1=0; i1 < sig_data.Ids.length; i1++) {
        tooltips[sig_data.esc_Ids[i1]] = [];
        sum_par_id[i1] = 0;
    }
    
    // par func
    for (var f=0; f < sig_data.signatures.length; f++) {

        data[f] = [];
        keys[f] = [];

        // par ID
        for (var i2=0; i2 < sig_data.Ids.length; i2++) {
            
            var data_filt = sig_data.mutations.filter(function(item, index){
                if ((item[0] == i2) && (item[1] == f)) return true;
            });
            
            //var sum = data_filt.length;
            var sum = 0;
            for (var s = 0; s < data_filt.length; s++) {
                sum += data_filt[s][2];
            }
            
            var mutation_count = 1;
            if (rate == false) {
                if (sig_data.mutation_count.length > 0) mutation_count = sig_data.mutation_count[i2];
            }
            
            if (sum > 0) {
                sum = sum*mutation_count;
            
                data[f].push(sum);
                keys[f].push(sig_data.esc_Ids[i2]);
                
                var obj2 = {
                    '#sum_mutaion_all': sig_data.mutations.length,
                    '#sum_item_value': sum,
                    'id': sig_data.Ids[i2],
                    'sig': sig_data.signatures[f],
                };
                tooltips[sig_data.esc_Ids[i2]].push(tooltip_text(sig_data.tooltip_format["mutation_partial"], obj2));
                sum_par_id[i2] += sum;
            }
        }
    }
    for (var i3=0; i3 < sig_data.Ids.length; i3++) {
        var obj3 = {
            '#sum_mutaion_all': sig_data.mutations.length,
            '#sum_item_value': sum_par_id[i3],
            'id': sig_data.Ids[i3],
        };
        
        var title = tooltip_text(sig_data.tooltip_format["mutation_title"], obj3);
        for (var t = 0; t < title.length; t++) {
            tooltips[sig_data.esc_Ids[i3]].splice(t, 0, title[t]);
        }
    }
    
    return {data: data, key: keys, tooltip: tooltips};
};

})();
Object.freeze(sig_data);

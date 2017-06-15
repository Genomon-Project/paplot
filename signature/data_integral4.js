(function() {
sig_data = {};

sig_data.tooltip_format = {
    signature_title:{format:[[{label:'{sig}',type:'str',keys:['sig',],ext:''},],], keys: '{sig} '},
    signature_partial:{format:[[{label:'{route}',type:'str',keys:['route',],ext:''},{label:': ',type:'fix',keys:[],ext:''},{label:'{#sum_item_value}',type:'numeric',keys:['#sum_item_value',],ext:'6.2'},],], keys: '{#sum_item_value} {route} '},
    mutation_title:{format:[[{label:'{id}',type:'str',keys:['id',],ext:''},],], keys: '{id} '},
    mutation_partial:{format:[[{label:'{sig}',type:'str',keys:['sig',],ext:''},{label:': ',type:'fix',keys:[],ext:''},{label:'{#sum_item_value}',type:'numeric',keys:['#sum_item_value',],ext:'.2'},],], keys: '{#sum_item_value} {sig} '},
};

sig_data.signatures = ['signature 1','signature 2','signature 3','signature 4',];
sig_data.sig_colors = ['#66C2A5','#FC8D62','#8DA0CB','#E78AC3',];
sig_data.dataset_sig = [[[0.0131,0.0136,0.0022,0.0129,0.0168,0.0125,0.0022,0.0091,0.0083,0.0065,0.0014,0.0075,0.0139,0.0178,0.0008,0.0192],[0.0177,0.0088,0.004,0.0186,0.0119,0.0083,0.0036,0.0156,0.007,0.0059,0.0025,0.0122,0.0465,0.0283,0.0043,0.0756],[0.0119,0.0112,0.0186,0.0126,0.01,0.0082,0.0107,0.0148,0.0087,0.0081,0.0136,0.011,0,0.0082,0.0077,0.0059],[0.0086,0.0079,0.0074,0.0116,0.0074,0.0089,0.0091,0.0113,0.0052,0.005,0.0057,0.0082,0.01,0.0062,0.0054,0.013],[0.0157,0.0082,0.0145,0.0198,0.0099,0.0074,0.012,0.0113,0.0094,0.0055,0.0076,0.0082,0.0082,0.0084,0.0045,0.0094],[0.0055,0.0032,0.0095,0.0096,0.0042,0.0042,0.0101,0.0106,0.0054,0.0036,0.0075,0.0064,0.0066,0.0044,0.0094,0.0143],],[[0.0016,0.0001,0.0001,0.0004,0.0012,0.0008,0.0002,0.0007,0.001,0.0004,0.0002,0.0003,0.0272,0.0105,0.0015,0.0142],[0.0022,0.0007,0.0001,0.0019,0.0029,0.0006,0.0004,0.0032,0.0008,0.0004,0.0002,0.0013,0.1552,0.0303,0.0054,0.1937],[0.004,0.0014,0.0008,0.0018,0.0094,0.0024,0.0035,0.0051,0.0043,0.0019,0.0022,0.0026,0.2677,0.0522,0.0275,0.1365],[0.0011,0.0005,0.0004,0,0.0003,0.0004,0.0001,0.0001,0.0003,0.0001,0.0004,0.0001,0.0001,0.0001,0.0001,0.0002],[0.0003,0.0002,0.0005,0.0003,0,0.0005,0.0009,0.0005,0.0002,0.0002,0.0005,0,0.0002,0.0003,0.0002,0.0003],[0.0001,0.0001,0.0002,0.0001,0,0.0002,0.0001,0,0.0001,0.0002,0.001,0.0002,0.0001,0.0001,0.0001,0.0004],],[[0.0194,0.0142,0.003,0.0093,0.0124,0.0039,0.002,0.0098,0.0172,0.0073,0.0032,0.0105,0.0247,0.0166,0.0043,0.031],[0.0036,0.0055,0.001,0.0046,0.0016,0.0017,0.0016,0.0053,0.0029,0.0037,0,0.0015,0.0039,0.0102,0.0004,0.0106],[0.0226,0.0109,0.0734,0.0102,0.0198,0.0158,0.0413,0.0186,0.0164,0.0147,0.0454,0.0138,0.0311,0.033,0.0361,0.0325],[0.0079,0.0095,0.0072,0.0184,0.001,0.0028,0.002,0.0033,0.001,0.0029,0.0022,0.0022,0.0236,0.0039,0.0038,0.0078],[0.0205,0.0071,0.013,0.0173,0.0059,0.0065,0.0061,0.0068,0.0091,0.0058,0.0057,0.0131,0.0117,0.0104,0.0061,0.0143],[0.0061,0.0029,0,0.004,0.0021,0.0022,0.0031,0.0075,0.0008,0.0009,0.0014,0.0037,0.0031,0.0027,0.0031,0.0103],],[[0.0264,0.021,0.0028,0.0218,0.0219,0.0204,0.0028,0.0212,0.0146,0.014,0.0009,0.0132,0.0187,0.0137,0.0017,0.0231],[0.0142,0.0093,0.0044,0.0136,0.0113,0.0103,0.0031,0.0142,0.0073,0.0072,0.0017,0.0109,0,0.0086,0.001,0.0096],[0.0205,0.007,0.0055,0.0191,0.0124,0.0094,0.0033,0.0185,0.0124,0.009,0.0047,0.0116,0.0181,0.0146,0.0007,0.0206],[0.0097,0.0072,0.0123,0.0141,0.0105,0.0137,0.0129,0.0187,0.0073,0.0058,0.007,0.0117,0.0101,0.0096,0.0064,0.0203],[0.0179,0.009,0.0112,0.0182,0.0087,0.0149,0.0079,0.0131,0.0078,0.0061,0.0052,0.008,0.0102,0.0087,0.0063,0.0112],[0.0053,0.0021,0.0079,0.0044,0.0041,0.0052,0.0074,0.0097,0.0042,0.0029,0.0089,0.0069,0.0064,0.0052,0.0086,0.0122],],];
sig_data.dataset_sig_max = 0.2677;
sig_data.route_id = ['AA','AC','AG','AT','CA','CC','CG','CT','GA','GC','GG','GT','TA','TC','TG','TT',];
sig_data.substitution = [{name: 'C > A', color: '#1BBDEB', route: ['ApCpA','ApCpC','ApCpG','ApCpT','CpCpA','CpCpC','CpCpG','CpCpT','GpCpA','GpCpC','GpCpG','GpCpT','TpCpA','TpCpC','TpCpG','TpCpT',],},{name: 'C > G', color: '#211D1E', route: ['ApCpA','ApCpC','ApCpG','ApCpT','CpCpA','CpCpC','CpCpG','CpCpT','GpCpA','GpCpC','GpCpG','GpCpT','TpCpA','TpCpC','TpCpG','TpCpT',],},{name: 'C > T', color: '#E62623', route: ['ApCpA','ApCpC','ApCpG','ApCpT','CpCpA','CpCpC','CpCpG','CpCpT','GpCpA','GpCpC','GpCpG','GpCpT','TpCpA','TpCpC','TpCpG','TpCpT',],},{name: 'T > A', color: '#CFCFCF', route: ['ApTpA','ApTpC','ApTpG','ApTpT','CpTpA','CpTpC','CpTpG','CpTpT','GpTpA','GpTpC','GpTpG','GpTpT','TpTpA','TpTpC','TpTpG','TpTpT',],},{name: 'T > C', color: '#ACD577', route: ['ApTpA','ApTpC','ApTpG','ApTpT','CpTpA','CpTpC','CpTpG','CpTpT','GpTpA','GpTpC','GpTpG','GpTpT','TpTpA','TpTpC','TpTpG','TpTpT',],},{name: 'T > G', color: '#EDC7C4', route: ['ApTpA','ApTpC','ApTpG','ApTpT','CpTpA','CpTpC','CpTpG','CpTpT','GpTpA','GpTpC','GpTpG','GpTpT','TpTpA','TpTpC','TpTpG','TpTpT',],},];

// [ID, signature, value]
sig_data.mutations = [[0,0,0.064900],[0,1,0.015700],[0,2,0.588000],[0,3,0.331100],[1,0,0.564100],[1,1,0.093000],[1,2,0.057400],[1,3,0.285300],[2,0,0.093200],[2,1,0.138300],[2,2,0.175100],[2,3,0.593200],[3,0,0.413800],[3,1,0.088900],[3,2,0.092500],[3,3,0.404600],[4,0,0.239400],[4,1,0.045300],[4,2,0.097400],[4,3,0.617700],[5,0,0.507500],[5,1,0.297200],[5,2,0.054300],[5,3,0.140900],[6,0,0.351700],[6,1,0.000000],[6,2,0.071500],[6,3,0.576600],[7,0,0.062200],[7,1,0.010600],[7,2,0.623400],[7,3,0.303600],[8,0,0.513000],[8,1,0.215400],[8,2,0.271300],[8,3,0.000100],[9,0,0.070600],[9,1,0.074500],[9,2,0.697200],[9,3,0.157500],[10,0,0.025000],[10,1,0.192900],[10,2,0.596800],[10,3,0.185200],[11,0,0.023000],[11,1,0.084400],[11,2,0.140300],[11,3,0.752200],[12,0,0.428600],[12,1,0.131200],[12,2,0.391600],[12,3,0.048300],[13,0,0.253700],[13,1,0.016400],[13,2,0.150100],[13,3,0.579600],[14,0,0.355800],[14,1,0.088100],[14,2,0.025300],[14,3,0.530600],[15,0,0.022700],[15,1,0.952300],[15,2,0.024700],[15,3,0.000000],[16,0,0.599700],[16,1,0.109800],[16,2,0.256100],[16,3,0.034200],[17,0,0.250000],[17,1,0.139700],[17,2,0.610100],[17,3,0.000000],[18,0,0.016500],[18,1,0.123000],[18,2,0.542800],[18,3,0.317500],[19,0,0.007400],[19,1,0.694900],[19,2,0.218400],[19,3,0.079100],[20,0,0.148700],[20,1,0.055900],[20,2,0.423800],[20,3,0.371400],];
sig_data.mutation_count = [4001,7174,5804,5712,14470,8572,9542,6290,3656,2597,5718,12025,11346,11099,8837,71019,5435,2170,5187,7108,3550,];
sig_data.Ids = ['PD3851a','PD3890a','PD3904a','PD3905a','PD3945a','PD4005a','PD4006a','PD4085a','PD4086a','PD4088a','PD4103a','PD4107a','PD4109a','PD4115a','PD4116a','PD4120a','PD4192a','PD4194a','PD4198a','PD4199a','PD4248a',];

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

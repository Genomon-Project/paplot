(function() {
sig_data = {};

sig_data.tooltip_format = {
    signature_title:{format:[[{label:'{sig}',type:'str',keys:['sig',],ext:''},],], keys: '{sig} '},
    signature_partial:{format:[[{label:'{route}',type:'str',keys:['route',],ext:''},{label:': ',type:'fix',keys:[],ext:''},{label:'{#sum_item_value}',type:'numeric',keys:['#sum_item_value',],ext:'6.2'},],], keys: '{#sum_item_value} {route} '},
    mutation_title:{format:[[{label:'{id}',type:'str',keys:['id',],ext:''},],], keys: '{id} '},
    mutation_partial:{format:[[{label:'{sig}',type:'str',keys:['sig',],ext:''},{label:': ',type:'fix',keys:[],ext:''},{label:'{#sum_item_value}',type:'numeric',keys:['#sum_item_value',],ext:'.2'},],], keys: '{#sum_item_value} {sig} '},
};

sig_data.signatures = ['signature 1','signature 2','signature 3','signature 4','background ',];
sig_data.sig_colors = ['#66C2A5','#FC8D62','#8DA0CB','#E78AC3','#B3B3B3',];
sig_data.dataset_sig = [[[0.0088,0.0118,0.0012,0.0097,0.0144,0.0069,0.0002,0.002,0.0056,0.0006,0.0003,0.0035,0.0154,0.0216,0,0.023],[0.0186,0.0076,0.0036,0.0216,0.0093,0.0044,0.0024,0.0147,0.0039,0.0024,0.0012,0.0106,0.0756,0.0413,0.0055,0.1249],[0.0102,0.0134,0.0402,0.0105,0.0082,0.0067,0.0215,0.014,0.0069,0.0067,0.0266,0.0102,0,0.0097,0.0175,0.0051],[0.0076,0.0077,0.0033,0.0115,0.0051,0.0033,0.0025,0.0058,0.0028,0.0027,0.0021,0.005,0.0127,0.0018,0.0023,0.0067],[0.0184,0.0072,0.0168,0.0235,0.0109,0.0014,0.0105,0.009,0.0111,0.004,0.0068,0.0086,0.0075,0.0067,0.0016,0.0062],[0.0042,0.0008,0.0077,0.01,0.003,0,0.0076,0.0094,0.0046,0.0017,0.0038,0.0047,0.0051,0,0.0072,0.0123],],[[0.021,0.0155,0.0031,0.0103,0.0127,0.0044,0.002,0.0103,0.018,0.0077,0.0031,0.0108,0.025,0.0162,0.0043,0.0306],[0.0035,0.0054,0.0012,0.0042,0.001,0.0015,0.0014,0.0047,0.0026,0.0033,0,0.0012,0,0.0083,0.0001,0.0053],[0.0236,0.0105,0.0742,0.0106,0.0202,0.0157,0.0415,0.0189,0.0168,0.0147,0.0458,0.014,0.0351,0.0342,0.0366,0.0349],[0.0082,0.0095,0.0076,0.0186,0.0016,0.0031,0.0019,0.0038,0.0012,0.0027,0.002,0.0026,0.0238,0.0036,0.0035,0.0079],[0.0213,0.0071,0.0128,0.0176,0.0058,0.007,0.0051,0.0066,0.0093,0.0058,0.0052,0.0132,0.0119,0.0102,0.0058,0.014],[0.006,0.0024,0,0.0033,0.0019,0.0019,0.0022,0.0072,0.0006,0.0005,0.0014,0.0037,0.0029,0.0024,0.0029,0.0099],],[[0.0016,0,0.0001,0.0004,0.0012,0.0009,0.0003,0.0008,0.001,0.0005,0.0002,0.0003,0.0271,0.0104,0.0015,0.0141],[0.0022,0.0007,0.0001,0.0019,0.0029,0.0007,0.0004,0.0032,0.0009,0.0005,0.0002,0.0014,0.1548,0.0302,0.0054,0.1931],[0.004,0.0014,0.0004,0.0018,0.0094,0.0025,0.0033,0.0051,0.0043,0.0019,0.002,0.0026,0.2677,0.0521,0.0274,0.1364],[0.0011,0.0005,0.0005,0,0.0003,0.0004,0.0002,0.0002,0.0003,0.0002,0.0005,0.0001,0,0.0002,0.0002,0.0003],[0.0003,0.0002,0.0005,0.0002,0,0.0006,0.001,0.0005,0.0002,0.0003,0.0005,0,0.0002,0.0003,0.0003,0.0003],[0.0001,0.0002,0.0002,0.0001,0,0.0003,0.0002,0,0.0001,0.0002,0.0011,0.0002,0.0002,0.0001,0.0001,0.0005],],[[0.0297,0.0239,0.0027,0.0249,0.0241,0.0227,0.002,0.0231,0.015,0.0144,0,0.0134,0.0205,0.0144,0.0012,0.0261],[0.015,0.0094,0.0045,0.0151,0.0107,0.0098,0.0024,0.0148,0.0062,0.0059,0.0009,0.011,0,0.0086,0.0005,0.0116],[0.0223,0.0067,0.0057,0.0218,0.0117,0.0085,0.0025,0.0196,0.0125,0.0082,0.0044,0.0116,0.0161,0.014,0,0.0207],[0.0099,0.0069,0.0127,0.0151,0.0114,0.0139,0.0115,0.0202,0.0075,0.0054,0.0061,0.0125,0.0104,0.009,0.0051,0.0212],[0.0205,0.0092,0.0116,0.0203,0.0095,0.0152,0.0057,0.0133,0.0083,0.0056,0.0037,0.0079,0.0105,0.0075,0.0049,0.0093],[0.0043,0.0005,0.0072,0.0027,0.0035,0.0031,0.005,0.0088,0.0038,0.0017,0.0081,0.0063,0.0057,0.0031,0.0081,0.0109],],];
sig_data.dataset_sig_max = 0.2677;
sig_data.route_id = ['AA','AC','AG','AT','CA','CC','CG','CT','GA','GC','GG','GT','TA','TC','TG','TT',];
sig_data.substitution = [{name: 'C > A', color: '#1BBDEB', route: ['ApCpA','ApCpC','ApCpG','ApCpT','CpCpA','CpCpC','CpCpG','CpCpT','GpCpA','GpCpC','GpCpG','GpCpT','TpCpA','TpCpC','TpCpG','TpCpT',],},{name: 'C > G', color: '#211D1E', route: ['ApCpA','ApCpC','ApCpG','ApCpT','CpCpA','CpCpC','CpCpG','CpCpT','GpCpA','GpCpC','GpCpG','GpCpT','TpCpA','TpCpC','TpCpG','TpCpT',],},{name: 'C > T', color: '#E62623', route: ['ApCpA','ApCpC','ApCpG','ApCpT','CpCpA','CpCpC','CpCpG','CpCpT','GpCpA','GpCpC','GpCpG','GpCpT','TpCpA','TpCpC','TpCpG','TpCpT',],},{name: 'T > A', color: '#CFCFCF', route: ['ApTpA','ApTpC','ApTpG','ApTpT','CpTpA','CpTpC','CpTpG','CpTpT','GpTpA','GpTpC','GpTpG','GpTpT','TpTpA','TpTpC','TpTpG','TpTpT',],},{name: 'T > C', color: '#ACD577', route: ['ApTpA','ApTpC','ApTpG','ApTpT','CpTpA','CpTpC','CpTpG','CpTpT','GpTpA','GpTpC','GpTpG','GpTpT','TpTpA','TpTpC','TpTpG','TpTpT',],},{name: 'T > G', color: '#EDC7C4', route: ['ApTpA','ApTpC','ApTpG','ApTpT','CpTpA','CpTpC','CpTpG','CpTpT','GpTpA','GpTpC','GpTpG','GpTpT','TpTpA','TpTpC','TpTpG','TpTpT',],},];
sig_data.Ids = ['PD3851a','PD3890a','PD3904a','PD3905a','PD3945a','PD4005a','PD4006a','PD4085a','PD4086a','PD4088a','PD4103a','PD4107a','PD4109a','PD4115a','PD4116a','PD4120a','PD4192a','PD4194a','PD4198a','PD4199a','PD4248a',];

// [ID, signature, value]
sig_data.mutations = [[0,0,0.041700],[0,1,0.577200],[0,2,0.016200],[0,3,0.183400],[0,4,0.181300],[1,0,0.310400],[1,1,0.011500],[1,2,0.087100],[1,3,0.297300],[1,4,0.293500],[2,0,0.055600],[2,1,0.166600],[2,2,0.136800],[2,3,0.505200],[2,4,0.135600],[3,0,0.226200],[3,1,0.061100],[3,2,0.085300],[3,3,0.377500],[3,4,0.249600],[4,0,0.135500],[4,1,0.077800],[4,2,0.043000],[4,3,0.572000],[4,4,0.171400],[5,0,0.317600],[5,1,0.000000],[5,2,0.286200],[5,3,0.248500],[5,4,0.147500],[6,0,0.191900],[6,1,0.045600],[6,2,0.000000],[6,3,0.546100],[6,4,0.216200],[7,0,0.072600],[7,1,0.602000],[7,2,0.004300],[7,3,0.257900],[7,4,0.063000],[8,0,0.313300],[8,1,0.214400],[8,2,0.206300],[8,3,0.089900],[8,4,0.176000],[9,0,0.107600],[9,1,0.653000],[9,2,0.062100],[9,3,0.177100],[9,4,0.000000],[10,0,0.045600],[10,1,0.577700],[10,2,0.188900],[10,3,0.120600],[10,4,0.066900],[11,0,0.000000],[11,1,0.147800],[11,2,0.085700],[11,3,0.559800],[11,4,0.206500],[12,0,0.300100],[12,1,0.327200],[12,2,0.117800],[12,3,0.164600],[12,4,0.090100],[13,0,0.138900],[13,1,0.130700],[13,2,0.014800],[13,3,0.512400],[13,4,0.202900],[14,0,0.192200],[14,1,0.000100],[14,2,0.085700],[14,3,0.499600],[14,4,0.222200],[15,0,0.018900],[15,1,0.024300],[15,2,0.952400],[15,3,0.003200],[15,4,0.000900],[16,0,0.298300],[16,1,0.214100],[16,2,0.105100],[16,3,0.000000],[16,4,0.382300],[17,0,0.141200],[17,1,0.568400],[17,2,0.140900],[17,3,0.000000],[17,4,0.149300],[18,0,0.002400],[18,1,0.540100],[18,2,0.126900],[18,3,0.155500],[18,4,0.174900],[19,0,0.004900],[19,1,0.218200],[19,2,0.697200],[19,3,0.044900],[19,4,0.034500],[20,0,0.076500],[20,1,0.410500],[20,2,0.056800],[20,3,0.242900],[20,4,0.213000],];
sig_data.mutation_count = [4001,7174,5804,5712,14470,8572,9542,6290,3656,2597,5718,12025,11346,11099,8837,71019,5435,2170,5187,7108,3550,];

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

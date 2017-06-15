(function() {
sig_data = {};

sig_data.tooltip_format = {
    signature_title:{format:[[{label:'{sig}',type:'str',keys:['sig',],ext:''},],], keys: '{sig} '},
    signature_partial:{format:[[{label:'{route}',type:'str',keys:['route',],ext:''},{label:': ',type:'fix',keys:[],ext:''},{label:'{#sum_item_value}',type:'numeric',keys:['#sum_item_value',],ext:'6.2'},],], keys: '{#sum_item_value} {route} '},
    mutation_title:{format:[[{label:'{id}',type:'str',keys:['id',],ext:''},],], keys: '{id} '},
    mutation_partial:{format:[[{label:'{sig}',type:'str',keys:['sig',],ext:''},{label:': ',type:'fix',keys:[],ext:''},{label:'{#sum_item_value}',type:'numeric',keys:['#sum_item_value',],ext:'.2'},],], keys: '{#sum_item_value} {sig} '},
};

sig_data.signatures = ['signature 1','signature 2','signature 3','signature 4','signature 5',];
sig_data.sig_colors = ['#66C2A5','#FC8D62','#8DA0CB','#E78AC3','#A6D854',];
sig_data.dataset_sig = [[[0.0206,0.0147,0.0027,0.0098,0.0124,0.0043,0.0021,0.0103,0.0181,0.0081,0.0032,0.0109,0.0253,0.0159,0.0045,0.0306],[0.0029,0.0054,0.0013,0.0035,0.001,0.0016,0.0016,0.0046,0.0028,0.0037,0,0.001,0,0.0077,0,0.0039],[0.0234,0.0103,0.0734,0.0102,0.0204,0.0162,0.0411,0.0187,0.017,0.015,0.0453,0.0139,0.0376,0.0347,0.0367,0.0361],[0.0083,0.0095,0.0077,0.0188,0.0011,0.0031,0.0021,0.0037,0.0011,0.003,0.0022,0.0023,0.0237,0.0041,0.0038,0.008],[0.0209,0.007,0.0126,0.017,0.0055,0.0071,0.0055,0.0066,0.0089,0.0058,0.0053,0.0132,0.0119,0.0103,0.0062,0.0144],[0.0061,0.0026,0,0.0033,0.002,0.0023,0.0026,0.0072,0.0005,0.0007,0.0011,0.0036,0.0029,0.0027,0.0029,0.0099],],[[0.0271,0.0215,0.003,0.0229,0.0224,0.0216,0.0029,0.0224,0.0149,0.0144,0.0009,0.0135,0.0178,0.0127,0.0016,0.0219],[0.0144,0.0094,0.0042,0.0133,0.0115,0.0106,0.0031,0.0141,0.0075,0.0073,0.0018,0.0111,0,0.0073,0.0008,0.0078],[0.0205,0.0062,0,0.0197,0.0122,0.0086,0.0003,0.0183,0.0121,0.0083,0.0016,0.0113,0.0262,0.0147,0,0.0242],[0.0093,0.0069,0.0129,0.0136,0.0113,0.0148,0.0136,0.0199,0.0078,0.0059,0.0073,0.0126,0.0088,0.01,0.0065,0.0213],[0.0171,0.0089,0.0106,0.0175,0.0085,0.0159,0.0075,0.013,0.0075,0.0062,0.005,0.0075,0.0098,0.0083,0.0063,0.0108],[0.0053,0.0023,0.008,0.0038,0.0041,0.0055,0.0072,0.0094,0.0042,0.0029,0.0096,0.007,0.0064,0.0054,0.009,0.0121],],[[0.0171,0.0136,0,0.0123,0.0205,0.0153,0,0.0154,0.0033,0.01,0.0004,0.0086,0.0251,0.0209,0.0005,0.0354],[0.013,0.0076,0,0.0169,0.0128,0.0096,0.0002,0.0191,0.0052,0.0062,0.0005,0.0101,0.0479,0.0295,0.0007,0.0844],[0.014,0.0107,0.0115,0.016,0.009,0.0103,0.0033,0.0161,0.0099,0.0094,0.0065,0.0104,0,0.0149,0,0.013],[0.0107,0.0068,0.0076,0.0154,0.0069,0.0071,0.0071,0.0104,0.0037,0.0057,0.0053,0.0066,0.014,0.0088,0.0047,0.013],[0.0209,0.0051,0.0143,0.0208,0.0096,0.0056,0.011,0.0168,0.0073,0.0026,0.0042,0.0081,0.0104,0.0046,0.0049,0.009],[0.0031,0.0007,0.0076,0.0085,0.0032,0.003,0.01,0.0132,0.0035,0.003,0.0032,0.0045,0.0063,0.0027,0.0065,0.0103],],[[0.0016,0.0001,0.0002,0.0003,0.0011,0.0006,0.0003,0.0005,0.0012,0.0003,0.0002,0.0003,0.0269,0.0105,0.0016,0.0141],[0.0022,0.0007,0.0001,0.0019,0.0027,0.0005,0.0005,0.0031,0.0008,0.0004,0.0002,0.0013,0.1538,0.0302,0.0055,0.1917],[0.0042,0.0015,0.0024,0.0017,0.0096,0.0026,0.0045,0.0052,0.0045,0.0021,0.0032,0.0028,0.2658,0.052,0.0282,0.1354],[0.0011,0.0006,0.0004,0.0001,0.0002,0.0003,0.0001,0,0.0003,0.0001,0.0004,0,0.0004,0,0.0002,0.0001],[0.0004,0.0003,0.0007,0.0004,0.0001,0.0005,0.001,0.0003,0.0003,0.0003,0.0006,0.0002,0.0002,0.0005,0.0003,0.0004],[0.0002,0.0002,0.0001,0.0001,0,0.0002,0.0001,0,0.0001,0.0002,0.001,0.0002,0.0001,0.0001,0.0001,0.0006],],[[0.0091,0.0138,0.0061,0.013,0.0101,0.0057,0.0057,0,0.0183,0.0016,0.0033,0.0069,0.0021,0.0136,0.0022,0],[0.0208,0.01,0.01,0.0178,0.008,0.0047,0.0081,0.0077,0.0085,0.0046,0.0048,0.0128,0.0295,0.0214,0.009,0.0437],[0.0122,0.0123,0.0468,0.0072,0.0142,0.0075,0.0322,0.0146,0.0092,0.0085,0.0341,0.0128,0,0.0048,0.0245,0.0002],[0.0053,0.0097,0.0067,0.0075,0.006,0.0094,0.0102,0.0107,0.0062,0.003,0.005,0.0087,0.0083,0.0011,0.0059,0.0118],[0.0093,0.0133,0.0143,0.0179,0.0092,0.0097,0.012,0.002,0.0124,0.01,0.0125,0.0096,0.0061,0.0153,0.0046,0.0119],[0.0091,0.0063,0.0096,0.0102,0.0053,0.0052,0.0085,0.0059,0.0073,0.0038,0.0123,0.0089,0.0063,0.0063,0.0115,0.0191],],];
sig_data.dataset_sig_max = 0.2658;
sig_data.route_id = ['AA','AC','AG','AT','CA','CC','CG','CT','GA','GC','GG','GT','TA','TC','TG','TT',];
sig_data.substitution = [{name: 'C > A', color: '#1BBDEB', route: ['ApCpA','ApCpC','ApCpG','ApCpT','CpCpA','CpCpC','CpCpG','CpCpT','GpCpA','GpCpC','GpCpG','GpCpT','TpCpA','TpCpC','TpCpG','TpCpT',],},{name: 'C > G', color: '#211D1E', route: ['ApCpA','ApCpC','ApCpG','ApCpT','CpCpA','CpCpC','CpCpG','CpCpT','GpCpA','GpCpC','GpCpG','GpCpT','TpCpA','TpCpC','TpCpG','TpCpT',],},{name: 'C > T', color: '#E62623', route: ['ApCpA','ApCpC','ApCpG','ApCpT','CpCpA','CpCpC','CpCpG','CpCpT','GpCpA','GpCpC','GpCpG','GpCpT','TpCpA','TpCpC','TpCpG','TpCpT',],},{name: 'T > A', color: '#CFCFCF', route: ['ApTpA','ApTpC','ApTpG','ApTpT','CpTpA','CpTpC','CpTpG','CpTpT','GpTpA','GpTpC','GpTpG','GpTpT','TpTpA','TpTpC','TpTpG','TpTpT',],},{name: 'T > C', color: '#ACD577', route: ['ApTpA','ApTpC','ApTpG','ApTpT','CpTpA','CpTpC','CpTpG','CpTpT','GpTpA','GpTpC','GpTpG','GpTpT','TpTpA','TpTpC','TpTpG','TpTpT',],},{name: 'T > G', color: '#EDC7C4', route: ['ApTpA','ApTpC','ApTpG','ApTpT','CpTpA','CpTpC','CpTpG','CpTpT','GpTpA','GpTpC','GpTpG','GpTpT','TpTpA','TpTpC','TpTpG','TpTpT',],},];

// [ID, signature, value]
sig_data.mutations = [[0,0,0.532800],[0,1,0.260800],[0,2,0.000000],[0,3,0.015000],[0,4,0.191100],[1,0,0.000000],[1,1,0.257700],[1,2,0.401300],[1,3,0.092900],[1,4,0.247900],[2,0,0.205000],[2,1,0.477000],[2,2,0.205400],[2,3,0.112400],[2,4,0.000000],[3,0,0.039200],[3,1,0.378300],[3,2,0.262300],[3,3,0.088700],[3,4,0.231300],[4,0,0.146800],[4,1,0.494200],[4,2,0.340100],[4,3,0.018600],[4,4,0.000000],[5,0,0.000000],[5,1,0.099900],[5,2,0.419700],[5,3,0.293300],[5,4,0.186900],[6,0,0.000000],[6,1,0.553700],[6,2,0.162500],[6,3,0.000000],[6,4,0.283700],[7,0,0.600800],[7,1,0.221300],[7,2,0.105900],[7,3,0.000000],[7,4,0.071800],[8,0,0.189700],[8,1,0.002200],[8,2,0.348500],[8,3,0.222500],[8,4,0.236900],[9,0,0.681300],[9,1,0.063700],[9,2,0.196900],[9,3,0.054900],[9,4,0.003000],[10,0,0.581000],[10,1,0.090200],[10,2,0.154000],[10,3,0.174700],[10,4,0.000000],[11,0,0.130200],[11,1,0.681700],[11,2,0.000400],[11,3,0.075800],[11,4,0.111600],[12,0,0.340400],[12,1,0.000000],[12,2,0.406600],[12,3,0.123100],[12,4,0.129700],[13,0,0.160500],[13,1,0.491800],[13,2,0.266700],[13,3,0.000000],[13,4,0.080900],[14,0,0.012200],[14,1,0.466600],[14,2,0.294000],[14,3,0.077600],[14,4,0.149400],[15,0,0.005300],[15,1,0.010900],[15,2,0.021400],[15,3,0.961400],[15,4,0.000800],[16,0,0.107400],[16,1,0.116700],[16,2,0.140000],[16,3,0.140300],[16,4,0.495400],[17,0,0.533800],[17,1,0.000000],[17,2,0.119800],[17,3,0.150500],[17,4,0.195700],[18,0,0.524300],[18,1,0.253200],[18,2,0.031900],[18,3,0.117600],[18,4,0.072800],[19,0,0.195400],[19,1,0.074500],[19,2,0.000000],[19,3,0.702900],[19,4,0.027000],[20,0,0.393300],[20,1,0.309100],[20,2,0.105900],[20,3,0.050600],[20,4,0.140800],];
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

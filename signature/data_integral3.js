(function() {
sig_data = {};

sig_data.tooltip_format = {
    signature_title:{format:[[{label:'{sig}',type:'str',keys:['sig',],ext:''},],], keys: '{sig} '},
    signature_partial:{format:[[{label:'{route}',type:'str',keys:['route',],ext:''},{label:': ',type:'fix',keys:[],ext:''},{label:'{#sum_item_value}',type:'numeric',keys:['#sum_item_value',],ext:'6.2'},],], keys: '{#sum_item_value} {route} '},
    mutation_title:{format:[[{label:'{id}',type:'str',keys:['id',],ext:''},],], keys: '{id} '},
    mutation_partial:{format:[[{label:'{sig}',type:'str',keys:['sig',],ext:''},{label:': ',type:'fix',keys:[],ext:''},{label:'{#sum_item_value}',type:'numeric',keys:['#sum_item_value',],ext:'.2'},],], keys: '{#sum_item_value} {sig} '},
};

sig_data.signatures = ['signature 1','signature 2','signature 3',];
sig_data.sig_colors = ['#66C2A5','#FC8D62','#8DA0CB',];
sig_data.dataset_sig = [[[0.0194,0.0143,0.003,0.0096,0.0126,0.0044,0.002,0.0095,0.0168,0.0075,0.0033,0.0104,0.0244,0.017,0.0042,0.0308],[0.004,0.0057,0.0011,0.0051,0.0019,0.002,0.0017,0.0057,0.003,0.0038,0.0002,0.0018,0.0021,0.0113,0.0004,0.0092],[0.0223,0.0112,0.0734,0.0103,0.0195,0.0157,0.0412,0.0187,0.0164,0.0148,0.0456,0.014,0.028,0.0315,0.0351,0.0294],[0.008,0.0096,0.0072,0.0181,0.0012,0.0032,0.0024,0.0037,0.0011,0.003,0.0023,0.0024,0.0235,0.0039,0.0039,0.0078],[0.0206,0.0072,0.0134,0.0179,0.0061,0.0063,0.0065,0.0071,0.0093,0.0058,0.0061,0.0131,0.0118,0.0105,0.0061,0.0144],[0.0062,0.0029,0.0001,0.0041,0.0022,0.0023,0.0034,0.0077,0.0008,0.001,0.0017,0.0039,0.0033,0.0028,0.0034,0.0106],],[[0.0219,0.0189,0.0026,0.0196,0.0211,0.0189,0.0027,0.0177,0.0121,0.0116,0.001,0.0114,0.016,0.0151,0.0011,0.021],[0.017,0.0097,0.0047,0.0169,0.0126,0.0104,0.0035,0.0159,0.0077,0.0071,0.0022,0.0126,0.0141,0.0156,0.0023,0.0309],[0.0171,0.0086,0.0049,0.0176,0.0109,0.0085,0.0029,0.0172,0.0106,0.0083,0.0048,0.0114,0.0052,0.0098,0,0.012],[0.0096,0.0074,0.011,0.0132,0.0103,0.0129,0.0125,0.0174,0.0071,0.0058,0.007,0.0114,0.0092,0.0089,0.0063,0.0189],[0.0172,0.0091,0.0127,0.0193,0.0097,0.013,0.01,0.0132,0.0085,0.0061,0.0062,0.0078,0.0094,0.0086,0.0057,0.0104],[0.0054,0.0026,0.0096,0.0069,0.0044,0.0052,0.0092,0.0105,0.0052,0.0034,0.0092,0.0071,0.007,0.0052,0.0097,0.0136],],[[0.0015,0,0.0001,0.0003,0.0012,0.0007,0.0002,0.0005,0.0009,0.0003,0.0002,0.0002,0.027,0.0106,0.0015,0.0142],[0.0023,0.0007,0.0001,0.002,0.0029,0.0006,0.0004,0.0032,0.0008,0.0004,0.0002,0.0013,0.157,0.0309,0.0056,0.1962],[0.004,0.0015,0.0013,0.0017,0.0094,0.0025,0.0038,0.0051,0.0043,0.0019,0.0025,0.0026,0.2639,0.0517,0.0277,0.1348],[0.0011,0.0006,0.0004,0,0.0002,0.0003,0.0001,0,0.0003,0.0001,0.0004,0,0.0002,0.0001,0.0001,0.0001],[0.0004,0.0002,0.0006,0.0004,0.0001,0.0004,0.001,0.0004,0.0002,0.0002,0.0006,0.0001,0.0002,0.0003,0.0002,0.0003],[0.0001,0.0002,0.0002,0.0001,0,0.0002,0.0002,0,0.0001,0.0002,0.001,0.0002,0.0002,0,0.0001,0.0005],],];
sig_data.dataset_sig_max = 0.2639;
sig_data.route_id = ['AA','AC','AG','AT','CA','CC','CG','CT','GA','GC','GG','GT','TA','TC','TG','TT',];
sig_data.substitution = [{name: 'C > A', color: '#1BBDEB', route: ['ApCpA','ApCpC','ApCpG','ApCpT','CpCpA','CpCpC','CpCpG','CpCpT','GpCpA','GpCpC','GpCpG','GpCpT','TpCpA','TpCpC','TpCpG','TpCpT',],},{name: 'C > G', color: '#211D1E', route: ['ApCpA','ApCpC','ApCpG','ApCpT','CpCpA','CpCpC','CpCpG','CpCpT','GpCpA','GpCpC','GpCpG','GpCpT','TpCpA','TpCpC','TpCpG','TpCpT',],},{name: 'C > T', color: '#E62623', route: ['ApCpA','ApCpC','ApCpG','ApCpT','CpCpA','CpCpC','CpCpG','CpCpT','GpCpA','GpCpC','GpCpG','GpCpT','TpCpA','TpCpC','TpCpG','TpCpT',],},{name: 'T > A', color: '#CFCFCF', route: ['ApTpA','ApTpC','ApTpG','ApTpT','CpTpA','CpTpC','CpTpG','CpTpT','GpTpA','GpTpC','GpTpG','GpTpT','TpTpA','TpTpC','TpTpG','TpTpT',],},{name: 'T > C', color: '#ACD577', route: ['ApTpA','ApTpC','ApTpG','ApTpT','CpTpA','CpTpC','CpTpG','CpTpT','GpTpA','GpTpC','GpTpG','GpTpT','TpTpA','TpTpC','TpTpG','TpTpT',],},{name: 'T > G', color: '#EDC7C4', route: ['ApTpA','ApTpC','ApTpG','ApTpT','CpTpA','CpTpC','CpTpG','CpTpT','GpTpA','GpTpC','GpTpG','GpTpT','TpTpA','TpTpC','TpTpG','TpTpT',],},];

// [ID, signature, value]
sig_data.mutations = [[0,0,0.638000],[0,1,0.342400],[0,2,0.019500],[1,0,0.137200],[1,1,0.730400],[1,2,0.132200],[2,0,0.228400],[2,1,0.634200],[2,2,0.137200],[3,0,0.163500],[3,1,0.718800],[3,2,0.117600],[4,0,0.163100],[4,1,0.778300],[4,2,0.058500],[5,0,0.131800],[5,1,0.524600],[5,2,0.343400],[6,0,0.144100],[6,1,0.835800],[6,2,0.019900],[7,0,0.673400],[7,1,0.311800],[7,2,0.014700],[8,0,0.328000],[8,1,0.403400],[8,2,0.268400],[9,0,0.722800],[9,1,0.190800],[9,2,0.086200],[10,0,0.622000],[10,1,0.180500],[10,2,0.197300],[11,0,0.192300],[11,1,0.725700],[11,2,0.081900],[12,0,0.427800],[12,1,0.389700],[12,2,0.182400],[13,0,0.216300],[13,1,0.751900],[13,2,0.031700],[14,0,0.096600],[14,1,0.793000],[14,2,0.110300],[15,0,0.022300],[15,1,0.020900],[15,2,0.956600],[16,0,0.318700],[16,1,0.521900],[16,2,0.159300],[17,0,0.636400],[17,1,0.186100],[17,2,0.177300],[18,0,0.579500],[18,1,0.296300],[18,2,0.124100],[19,0,0.222700],[19,1,0.080200],[19,2,0.696900],[20,0,0.472100],[20,1,0.460200],[20,2,0.067500],];
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

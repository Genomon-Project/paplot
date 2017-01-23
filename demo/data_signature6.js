(function() {
sig_data = {};

sig_data.tooltip_format = {
    signature_title:{format:[[{label:'{sig}',type:'str',keys:['sig',],ext:''},],], keys: '{sig} '},
    signature_partial:{format:[[{label:'{route}',type:'str',keys:['route',],ext:''},{label:': ',type:'fix',keys:[],ext:''},{label:'{#sum_item_value}',type:'numeric',keys:['#sum_item_value',],ext:'6.2'},],], keys: '{#sum_item_value} {route} '},
    mutation_title:{format:[[{label:'{id}',type:'str',keys:['id',],ext:''},],], keys: '{id} '},
    mutation_partial:{format:[[{label:'{sig}',type:'str',keys:['sig',],ext:''},{label:': ',type:'fix',keys:[],ext:''},{label:'{#sum_item_value}',type:'numeric',keys:['#sum_item_value',],ext:'.2'},],], keys: '{#sum_item_value} {sig} '},
};

sig_data.signatures = ['signature 1','signature 2','signature 3','signature 4','signature 5','background ',];
sig_data.sig_colors = ['#66C2A5','#FC8D62','#8DA0CB','#E78AC3','#A6D854','#B3B3B3',];
sig_data.dataset_sig = [[[0.0162,0.0193,0.0082,0.0242,0.0138,0.0153,0.0082,0.0118,0.0277,0.0041,0.0029,0.0131,0.0004,0.0114,0.0024,0],[0.0224,0.0133,0.0162,0.018,0.012,0.0079,0.0105,0.0095,0.0103,0.0065,0.0055,0.0159,0,0.0109,0.0062,0.0017],[0.0168,0.0098,0.0245,0.0172,0.0123,0.0031,0.0212,0.0196,0.0086,0.0071,0.0213,0.0119,0.0019,0,0.0127,0.0059],[0,0.0074,0.0103,0.0045,0.0071,0.0156,0.0144,0.0237,0.0101,0.003,0.0073,0.0138,0.0013,0.0052,0.0088,0.0228],[0.0034,0.0172,0.0109,0.0161,0.0101,0.0195,0.009,0.0021,0.01,0.0109,0.0115,0.0053,0.0052,0.0167,0.0064,0.0122],[0.0072,0.005,0.013,0.0042,0.0058,0.0063,0.01,0.0025,0.0069,0.0043,0.0141,0.0093,0.0064,0.0082,0.0125,0.0186],],[[0.0022,0.0003,0.0002,0.0006,0.0013,0.0009,0.0003,0.0012,0.0015,0.0007,0.0003,0.0007,0.0274,0.0103,0.0016,0.0145],[0.0018,0.0007,0,0.0014,0.0027,0.0006,0.0004,0.003,0.0008,0.0005,0.0001,0.0011,0.151,0.029,0.0053,0.1878],[0.0046,0.0013,0.0018,0.002,0.0098,0.0028,0.0041,0.0053,0.0047,0.0023,0.0028,0.0028,0.2673,0.0527,0.0279,0.1366],[0.0012,0.0006,0.0007,0.0003,0.0003,0.0005,0.0003,0.0002,0.0003,0.0002,0.0005,0.0001,0.0005,0.0003,0.0003,0.0004],[0.0005,0.0002,0.0005,0.0002,0,0.0008,0.0008,0.0005,0.0002,0.0003,0.0005,0.0003,0.0004,0.0004,0.0004,0.0006],[0.0002,0.0002,0,0,0,0.0003,0,0,0,0.0002,0.001,0.0002,0.0001,0.0002,0,0.0005],],[[0.0193,0.0147,0.0032,0.0085,0.0112,0.0017,0.0022,0.0071,0.0189,0.0059,0.0035,0.0102,0.024,0.0171,0.0046,0.0298],[0.0034,0.0053,0.002,0.0043,0,0,0.0019,0.0036,0.0022,0.0027,0,0.0005,0,0.01,0,0.0051],[0.0235,0.0119,0.0881,0.0091,0.0213,0.0165,0.0495,0.0191,0.0172,0.0156,0.0546,0.0146,0.0249,0.0339,0.0429,0.0297],[0.008,0.0103,0.0067,0.0188,0,0.0014,0.0002,0.0016,0.0004,0.0023,0.0012,0.0013,0.0254,0.0022,0.0033,0.0061],[0.0218,0.0076,0.0139,0.0185,0.006,0.0057,0.0054,0.0051,0.0102,0.0062,0.006,0.0141,0.0118,0.0113,0.0055,0.0144],[0.0064,0.0027,0,0.0036,0.0018,0.0013,0.002,0.0067,0.0005,0.0003,0.0006,0.0035,0.0024,0.0021,0.0027,0.0105],],[[0.0305,0.022,0.0012,0.0212,0.0245,0.0215,0.0008,0.0242,0.011,0.0164,0.0002,0.0133,0.0261,0.0148,0.0013,0.0333],[0.0106,0.0076,0,0.0116,0.0098,0.0101,0.0002,0.015,0.0053,0.0065,0,0.0083,0,0.0075,0,0.0129],[0.0228,0.0062,0.0047,0.0202,0.0129,0.0115,0,0.0186,0.014,0.0098,0.0024,0.0117,0.0276,0.0219,0,0.0286],[0.0119,0.007,0.0127,0.018,0.011,0.0123,0.0107,0.0165,0.0059,0.0061,0.006,0.0105,0.0145,0.0105,0.0048,0.0187],[0.0236,0.006,0.0114,0.0193,0.0083,0.013,0.0062,0.0164,0.0072,0.0042,0.0023,0.0092,0.012,0.0053,0.0057,0.0104],[0.0041,0.0005,0.0047,0.0038,0.003,0.0038,0.0048,0.0116,0.0026,0.0017,0.0061,0.0054,0.0058,0.0033,0.0066,0.0094],],[[0.0038,0.0094,0.0008,0.0077,0.0134,0.0069,0,0,0.0021,0,0,0.0014,0.0135,0.0223,0,0.0186],[0.0211,0.008,0.0042,0.0246,0.0114,0.0052,0.0027,0.0166,0.0049,0.0027,0.002,0.013,0.1004,0.0483,0.005,0.1553],[0.0058,0.0137,0.0298,0.0091,0.0057,0.0048,0.0166,0.0121,0.0045,0.005,0.0206,0.0089,0,0.0042,0.0128,0.0027],[0.0082,0.0071,0.0021,0.0092,0.0054,0.0033,0.0033,0.0055,0.0031,0.0029,0.0027,0.005,0.0091,0.0014,0.0026,0.0066],[0.0159,0.0077,0.0167,0.0229,0.011,0,0.0122,0.0084,0.0108,0.0039,0.0078,0.0071,0.0063,0.0069,0.001,0.0046],[0.0041,0.0013,0.01,0.0106,0.0035,0,0.0103,0.0089,0.0061,0.0024,0.0048,0.005,0.0056,0,0.0082,0.0127],],];
sig_data.dataset_sig_max = 0.2673;
sig_data.route_id = ['AA','AC','AG','AT','CA','CC','CG','CT','GA','GC','GG','GT','TA','TC','TG','TT',];
sig_data.substitution = [{name: 'C > A', color: '#1BBDEB', route: ['ApCpA','ApCpC','ApCpG','ApCpT','CpCpA','CpCpC','CpCpG','CpCpT','GpCpA','GpCpC','GpCpG','GpCpT','TpCpA','TpCpC','TpCpG','TpCpT',],},{name: 'C > G', color: '#211D1E', route: ['ApCpA','ApCpC','ApCpG','ApCpT','CpCpA','CpCpC','CpCpG','CpCpT','GpCpA','GpCpC','GpCpG','GpCpT','TpCpA','TpCpC','TpCpG','TpCpT',],},{name: 'C > T', color: '#E62623', route: ['ApCpA','ApCpC','ApCpG','ApCpT','CpCpA','CpCpC','CpCpG','CpCpT','GpCpA','GpCpC','GpCpG','GpCpT','TpCpA','TpCpC','TpCpG','TpCpT',],},{name: 'T > A', color: '#CFCFCF', route: ['ApTpA','ApTpC','ApTpG','ApTpT','CpTpA','CpTpC','CpTpG','CpTpT','GpTpA','GpTpC','GpTpG','GpTpT','TpTpA','TpTpC','TpTpG','TpTpT',],},{name: 'T > C', color: '#ACD577', route: ['ApTpA','ApTpC','ApTpG','ApTpT','CpTpA','CpTpC','CpTpG','CpTpT','GpTpA','GpTpC','GpTpG','GpTpT','TpTpA','TpTpC','TpTpG','TpTpT',],},{name: 'T > G', color: '#EDC7C4', route: ['ApTpA','ApTpC','ApTpG','ApTpT','CpTpA','CpTpC','CpTpG','CpTpT','GpTpA','GpTpC','GpTpG','GpTpT','TpTpA','TpTpC','TpTpG','TpTpT',],},];
sig_data.Ids = ['PD3851a','PD3890a','PD3904a','PD3905a','PD3945a','PD4005a','PD4006a','PD4085a','PD4086a','PD4088a','PD4103a','PD4107a','PD4109a','PD4115a','PD4116a','PD4120a','PD4192a','PD4194a','PD4198a','PD4199a','PD4248a',];

// [ID, signature, value]
sig_data.mutations = [[0,0,0.202100],[0,1,0.046400],[0,2,0.480400],[0,3,0.202100],[0,4,0.000000],[0,5,0.068800],[1,0,0.045900],[1,1,0.068700],[1,2,0.043700],[1,3,0.322900],[1,4,0.275400],[1,5,0.243100],[2,0,0.091900],[2,1,0.122500],[2,2,0.116300],[2,3,0.515800],[2,4,0.072300],[2,5,0.080900],[3,0,0.154900],[3,1,0.077900],[3,2,0.055100],[3,3,0.365000],[3,4,0.197500],[3,5,0.149300],[4,0,0.017800],[4,1,0.014500],[4,2,0.069400],[4,3,0.595600],[4,4,0.148500],[4,5,0.153900],[5,0,0.065400],[5,1,0.271200],[5,2,0.026200],[5,3,0.261400],[5,4,0.288700],[5,5,0.086800],[6,0,0.365400],[6,1,0.000000],[6,2,0.000700],[6,3,0.472300],[6,4,0.161400],[6,5,0.000000],[7,0,0.079800],[7,1,0.018600],[7,2,0.505600],[7,3,0.336400],[7,4,0.039000],[7,5,0.020400],[8,0,0.008800],[8,1,0.202600],[8,2,0.224200],[8,3,0.152800],[8,4,0.261500],[8,5,0.149900],[9,0,0.031400],[9,1,0.078400],[9,2,0.567700],[9,3,0.261200],[9,4,0.061000],[9,5,0.000000],[10,0,0.000000],[10,1,0.203500],[10,2,0.479900],[10,3,0.235800],[10,4,0.019000],[10,5,0.061600],[11,0,0.292800],[11,1,0.095200],[11,2,0.062300],[11,3,0.504600],[11,4,0.000000],[11,5,0.044900],[12,0,0.004100],[12,1,0.113100],[12,2,0.315400],[12,3,0.250200],[12,4,0.248300],[12,5,0.068600],[13,0,0.089300],[13,1,0.000000],[13,2,0.104800],[13,3,0.528300],[13,4,0.133800],[13,5,0.143600],[14,0,0.120300],[14,1,0.066400],[14,2,0.000000],[14,3,0.483600],[14,4,0.187200],[14,5,0.142300],[15,0,0.000000],[15,1,0.957700],[15,2,0.000000],[15,3,0.000000],[15,4,0.042200],[15,5,0.000000],[16,0,0.219800],[16,1,0.128100],[16,2,0.220100],[16,3,0.000000],[16,4,0.209200],[16,5,0.222500],[17,0,0.033200],[17,1,0.161600],[17,2,0.520000],[17,3,0.045800],[17,4,0.088300],[17,5,0.150900],[18,0,0.000000],[18,1,0.134400],[18,2,0.445700],[18,3,0.241600],[18,4,0.000000],[18,5,0.178100],[19,0,0.043700],[19,1,0.712700],[19,2,0.165000],[19,3,0.053500],[19,4,0.008500],[19,5,0.016300],[20,0,0.029700],[20,1,0.060900],[20,2,0.339600],[20,3,0.318500],[20,4,0.055300],[20,5,0.195700],];
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

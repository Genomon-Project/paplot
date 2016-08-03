(function() {
qc_data = {};

qc_data.Ids = ['SAMPLE0','SAMPLE1','SAMPLE10','SAMPLE11','SAMPLE12','SAMPLE13','SAMPLE14','SAMPLE15','SAMPLE16','SAMPLE17','SAMPLE18','SAMPLE19','SAMPLE2','SAMPLE20','SAMPLE21','SAMPLE22','SAMPLE23','SAMPLE24','SAMPLE25','SAMPLE26','SAMPLE27','SAMPLE28','SAMPLE29','SAMPLE3','SAMPLE4','SAMPLE5','SAMPLE6','SAMPLE7','SAMPLE8','SAMPLE9',];
qc_data.plots = [{chart_id:'chart_brush', title:'', title_y:'', stack:{format:[[{label:'{average_depth}',type:'str',keys:['average_depth',],ext:''},],], keys: '{average_depth} '}, stack_id:['stack0',], label:['average',], color:['#E3E5E9',], tooltip:{format:[], keys: ''}},{chart_id:'chart_1', title:'depth coverage', title_y:'coverage', stack:{format:[[{label:'{ratio_30x}',type:'str',keys:['ratio_30x',],ext:''},],[{label:'{ratio_20x}-{ratio_30x}',type:'numeric',keys:['ratio_20x','ratio_30x',],ext:''},],[{label:'{ratio_10x}-{ratio_20x}',type:'numeric',keys:['ratio_10x','ratio_20x',],ext:''},],[{label:'{ratio_2x}-{ratio_10x}',type:'numeric',keys:['ratio_2x','ratio_10x',],ext:''},],], keys: '{ratio_2x} {ratio_10x} {ratio_30x} {ratio_20x} '}, stack_id:['stack0','stack1','stack2','stack3',], label:['ratio_30x','ratio_20x','ratio_10x','ratio_2x',], color:['#2478B4','#FF7F0E','#2CA02C','#D62728',], tooltip:{format:[[{label:'ID:',type:'fix',keys:[],ext:''},{label:'{id}',type:'str',keys:['id',],ext:''},],[{label:'ratio_2x: ',type:'fix',keys:[],ext:''},{label:'{ratio_2x}',type:'numeric',keys:['ratio_2x',],ext:'.2'},],[{label:'ratio_10x: ',type:'fix',keys:[],ext:''},{label:'{ratio_10x}',type:'numeric',keys:['ratio_10x',],ext:'.2'},],[{label:'ratio_20x: ',type:'fix',keys:[],ext:''},{label:'{ratio_20x}',type:'numeric',keys:['ratio_20x',],ext:'.2'},],[{label:'ratio_30x: ',type:'fix',keys:[],ext:''},{label:'{ratio_30x}',type:'numeric',keys:['ratio_30x',],ext:'.2'},],], keys: '{ratio_2x} {ratio_10x} {id} {ratio_30x} {ratio_20x} '}},{chart_id:'chart_2', title:'depth average', title_y:'average of depth', stack:{format:[[{label:'{average_depth}',type:'str',keys:['average_depth',],ext:''},],], keys: '{average_depth} '}, stack_id:['stack0',], label:['average_depth',], color:['#2478B4',], tooltip:{format:[[{label:'ID:',type:'fix',keys:[],ext:''},{label:'{id}',type:'str',keys:['id',],ext:''},],[{label:'{average_depth}',type:'numeric',keys:['average_depth',],ext:'.2'},],], keys: '{average_depth} {id} '}},{chart_id:'chart_3', title:'mapped_reads/total_reads', title_y:'rate', stack:{format:[[{label:'{mapped_reads}/{total_reads}',type:'numeric',keys:['mapped_reads','total_reads',],ext:''},],], keys: '{total_reads} {mapped_reads} '}, stack_id:['stack0',], label:['mapped_reads/total_reads',], color:['#2478B4',], tooltip:{format:[[{label:'ID:',type:'fix',keys:[],ext:''},{label:'{id}',type:'str',keys:['id',],ext:''},],[{label:'{mapped_reads}/{total_reads}',type:'numeric',keys:['mapped_reads','total_reads',],ext:'.2'},],], keys: '{total_reads} {id} {mapped_reads} '}},{chart_id:'chart_4', title:'mean_insert_size', title_y:'mean_insert_size', stack:{format:[[{label:'{mean_insert_size}',type:'str',keys:['mean_insert_size',],ext:''},],], keys: '{mean_insert_size} '}, stack_id:['stack0',], label:['mean_insert_size',], color:['#2478B4',], tooltip:{format:[[{label:'ID:',type:'fix',keys:[],ext:''},{label:'{id}',type:'str',keys:['id',],ext:''},],[{label:'{mean_insert_size}',type:'numeric',keys:['mean_insert_size',],ext:'.2'},],], keys: '{id} {mean_insert_size} '}},{chart_id:'chart_5', title:'duplicate_reads/total_reads', title_y:'rate', stack:{format:[[{label:'{duplicate_reads}/{total_reads}',type:'numeric',keys:['duplicate_reads','total_reads',],ext:''},],], keys: '{total_reads} {duplicate_reads} '}, stack_id:['stack0',], label:['duplicate_reads/total_reads',], color:['#2478B4',], tooltip:{format:[[{label:'ID:',type:'fix',keys:[],ext:''},{label:'{id}',type:'str',keys:['id',],ext:''},],[{label:'{duplicate_reads}/{total_reads}',type:'numeric',keys:['duplicate_reads','total_reads',],ext:'.2'},],], keys: '{total_reads} {id} {duplicate_reads} '}},{chart_id:'chart_6', title:'read_length_r1, read_length_r2', title_y:'read_length', stack:{format:[[{label:'{read_length_r1}',type:'str',keys:['read_length_r1',],ext:''},],[{label:'{read_length_r2}',type:'str',keys:['read_length_r2',],ext:''},],], keys: '{read_length_r2} {read_length_r1} '}, stack_id:['stack0','stack1',], label:['read_length_r1','read_length_r2',], color:['#2478B4','#FF7F0E',], tooltip:{format:[[{label:'ID:',type:'fix',keys:[],ext:''},{label:'{id}',type:'str',keys:['id',],ext:''},],[{label:'r1: ',type:'fix',keys:[],ext:''},{label:'{read_length_r1}',type:'numeric',keys:['read_length_r1',],ext:','},],[{label:'r2: ',type:'fix',keys:[],ext:''},{label:'{read_length_r2}',type:'numeric',keys:['read_length_r2',],ext:','},],], keys: '{read_length_r2} {id} {read_length_r1} '}},];
qc_data.header = ['average_depth','duplicate_reads','id','mapped_reads','mean_insert_size','ratio_10x','ratio_20x','ratio_2x','ratio_30x','read_length_r1','read_length_r2','total_reads',];
qc_data.value = [[70.0474,7964009,'SAMPLE0',56262203,343.92,0.768,0.6844,0.9796,0.6747,265,270,94315157],[65.7578,5297450,'SAMPLE1',33860998,351.23,0.7725,0.7655,0.8489,0.6131,140,200,50340277],[79.2468,6677377,'SAMPLE10',42026268,254.54,0.8664,0.8114,0.9129,0.7709,245,105,91491485],[57.0187,4694248,'SAMPLE11',88052624,638.58,0.648,0.6313,0.9002,0.5283,160,295,45779338],[56.8754,4117077,'SAMPLE12',53133100,937.79,0.7634,0.6118,0.9115,0.513,245,140,44936207],[56.3643,4876706,'SAMPLE13',80905156,683.46,0.777,0.5399,0.9584,0.5115,245,255,69481336],[61.2099,7885535,'SAMPLE14',87262118,750.69,0.7648,0.6132,0.9284,0.5695,205,140,98637407],[59.6889,9626645,'SAMPLE15',71859220,991.14,0.7307,0.6754,0.8545,0.5495,295,245,45926490],[67.7888,9386857,'SAMPLE16',70964954,709.45,0.7697,0.6721,0.9621,0.647,210,140,79883229],[58.9151,1635412,'SAMPLE17',12086409,865.65,0.7705,0.5713,0.8959,0.5455,295,145,82545007],[62.619,7470808,'SAMPLE18',22574857,600.3,0.902,0.5852,0.9919,0.5704,265,125,37671560],[67.4675,7986392,'SAMPLE19',47234823,559.43,0.8272,0.8107,0.9356,0.618,140,145,48211895],[63.375,8347508,'SAMPLE2',88010999,496.34,0.8236,0.6045,0.9814,0.5889,120,175,90635480],[55.3307,7138343,'SAMPLE20',22399169,511.25,0.6965,0.5497,0.9466,0.5078,105,250,34533646],[64.5386,9901039,'SAMPLE21',69541829,129.2,0.7852,0.7093,0.8566,0.6022,240,100,71129050],[57.1832,7590138,'SAMPLE22',57904670,460.28,0.6346,0.5549,0.9034,0.5423,170,225,74627576],[79.1567,8522864,'SAMPLE23',28982192,396.3,0.9013,0.8193,0.9589,0.7615,160,200,42618281],[54.9026,2571314,'SAMPLE24',97405324,989.53,0.682,0.5332,0.9103,0.5081,240,180,57989549],[62.1023,2280924,'SAMPLE25',50101692,165.61,0.742,0.6105,0.8642,0.5883,270,260,59472175],[55.8067,1104591,'SAMPLE26',47907389,750.31,0.7779,0.6143,0.8136,0.5017,280,140,49876287],[61.4498,1617257,'SAMPLE27',52800804,115.3,0.8118,0.7185,0.8244,0.558,185,105,16262100],[61.7747,1132653,'SAMPLE28',85814766,930.26,0.9166,0.6356,0.9413,0.5532,150,100,58937974],[77.7188,8485139,'SAMPLE29',27606775,203.44,0.8688,0.7654,0.9651,0.7536,290,115,85935701],[70.9654,6726021,'SAMPLE3',89163960,696.23,0.8303,0.7032,0.9047,0.6801,120,140,72885114],[69.9653,9794813,'SAMPLE4',28793615,731.98,0.9452,0.672,0.9776,0.6518,230,110,92572101],[62.7939,9957241,'SAMPLE5',71290366,888.8,0.9439,0.9211,0.9525,0.5245,215,265,29193095],[60.4026,5588705,'SAMPLE6',56156227,303.7,0.7136,0.7093,0.7441,0.5626,125,155,47526656],[62.7957,9267061,'SAMPLE7',53115657,444.53,0.7848,0.7247,0.9503,0.572,165,135,85950331],[65.8415,5433218,'SAMPLE8',31572200,266.25,0.6839,0.6644,0.9052,0.6365,295,155,41341138],[71.0792,1674241,'SAMPLE9',33812378,257.35,0.8914,0.8532,0.9809,0.6495,135,225,20827838],];
function tooltip_partial(format, data) {
    
    var obj = {};
    var tooltip = [];
    
    for (var p = 0; p < data.length; p++) {
        obj[qc_data.header[p]] = data[p];
    }
    for (var t in format.format) {
        var text = text_format(format.format[t], obj);
        tooltip.push(text);
    }

    return tooltip;
};

function text_format(format, obj) {

    var text = "";
    for (var f in format) {
        if (format[f].type == 'fix') {
            text += format[f].label;
            continue;
        }
        var replaced = format[f].label;
        for (var k in format[f].keys) {
            var reg = new RegExp("{" + format[f].keys[k] + "}", 'g');
            replaced = replaced.replace(reg, obj[format[f].keys[k]]);
        }
        // case numeric
        if (format[f].type == 'numeric') {
            try{  replaced = eval(replaced);
            } catch(e) {}
            if (format[f].ext != null) {
                if (format[f].ext == ",") {
                    replaced = String(replaced).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
                }
                if (format[f].ext[0] == ".") {
                    replaced = parseFloat(replaced).toFixed(parseInt(format[f].ext.substr(1)));
                }
            }
        }
        text += replaced;
    }
    return text;
};

qc_data.get_plot_config = function (chart_id) {

    for (var i = 0; i < qc_data.plots.length; i++) {
        if (qc_data.plots[i].chart_id == chart_id) {
            return qc_data.plots[i];
        }
    }
    return null;
};

qc_data.get_dataset = function (chart_id) {
    
    var info = qc_data.get_plot_config(chart_id);
    
    var key = [];
    for (var d = 0; d < qc_data.value.length; d++) {
        key.push(qc_data.value[d][qc_data.header.indexOf("id")]);
    }
    
    var tooltip = 0;
    if (info.tooltip.format.length > 0) {
        tooltip = {};
        for (var d = 0; d < qc_data.value.length; d++) {
            var id = qc_data.value[d][qc_data.header.indexOf("id")];
            tooltip[id] = [];
            
            var tmp_data = tooltip_partial(info.tooltip, qc_data.value[d])
            for (var t in tmp_data) {
                tooltip[id].push(tmp_data[t]);
            }
        }
    }
    
    var data = [];
    for (var s = 0; s < info.stack.format.length; s++) {
        data[s] = [];
    }
    for (var d = 0; d < qc_data.value.length; d++) {
        var tmp_data = tooltip_partial(info.stack, qc_data.value[d]);
        for (var s in tmp_data) {
            data[s].push(Number(tmp_data[s]))
        }
    }
    
    return {data: data, key: key, tooltip: tooltip};
};
})();
Object.freeze(qc_data);

(function() {
qc_data = {};

qc_data.Ids = ['SAMPLE1','SAMPLE10','SAMPLE11','SAMPLE12','SAMPLE13','SAMPLE14','SAMPLE15','SAMPLE16','SAMPLE17','SAMPLE18','SAMPLE19','SAMPLE2','SAMPLE20','SAMPLE21','SAMPLE22','SAMPLE23','SAMPLE24','SAMPLE25','SAMPLE26','SAMPLE27','SAMPLE28','SAMPLE29','SAMPLE3','SAMPLE30','SAMPLE4','SAMPLE5','SAMPLE6','SAMPLE7','SAMPLE8','SAMPLE9',];
qc_data.plots = [{chart_id:'chart_1', title:'chart1 - Depth average', title_y:'Average of depth', stack:{format:[[{label:'{keya1}',type:'str',keys:['keya1',],ext:''},],], keys: '{keya1} '}, stack_id:['stack0',], label:['Average depth',], color:['#2478B4',], tooltip:{format:[[{label:'Sample:',type:'fix',keys:[],ext:''},{label:'{id}',type:'str',keys:['id',],ext:''},],[{label:'{keya1}',type:'numeric',keys:['keya1',],ext:'.2'},],], keys: '{id} {keya1} '}},{chart_id:'chart_2', title:'chart2 - Read length', title_y:'Read length', stack:{format:[[{label:'{keyb1}',type:'str',keys:['keyb1',],ext:''},],[{label:'{keyb2}',type:'str',keys:['keyb2',],ext:''},],], keys: '{keyb1} {keyb2} '}, stack_id:['stack0','stack1',], label:['Read length r1','Read length r2',], color:['#2478B4','#FF7F0E',], tooltip:{format:[[{label:'Sample:',type:'fix',keys:[],ext:''},{label:'{id}',type:'str',keys:['id',],ext:''},],[{label:'Read1: ',type:'fix',keys:[],ext:''},{label:'{keyb1}',type:'numeric',keys:['keyb1',],ext:','},],[{label:'Read2: ',type:'fix',keys:[],ext:''},{label:'{keyb2}',type:'numeric',keys:['keyb2',],ext:','},],], keys: '{id} {keyb1} {keyb2} '}},];
qc_data.header = ['id','keya1','keyb1','keyb2',];
qc_data.value = [['SAMPLE1',70.05,75,75],['SAMPLE2',65.76,75,75],['SAMPLE3',63.38,75,75],['SAMPLE4',70.97,75,75],['SAMPLE5',69.97,75,75],['SAMPLE6',62.79,75,75],['SAMPLE7',60.40,75,75],['SAMPLE8',62.80,75,75],['SAMPLE9',65.84,75,75],['SAMPLE10',71.08,75,75],['SAMPLE11',79.25,100,100],['SAMPLE12',57.02,100,100],['SAMPLE13',56.88,100,100],['SAMPLE14',56.36,100,100],['SAMPLE15',61.21,100,100],['SAMPLE16',59.69,100,100],['SAMPLE17',67.79,100,100],['SAMPLE18',58.92,100,100],['SAMPLE19',62.62,100,100],['SAMPLE20',67.47,100,100],['SAMPLE21',55.33,150,150],['SAMPLE22',64.54,150,150],['SAMPLE23',57.18,150,150],['SAMPLE24',79.16,150,150],['SAMPLE25',54.90,150,150],['SAMPLE26',62.10,150,150],['SAMPLE27',55.81,150,150],['SAMPLE28',61.45,150,150],['SAMPLE29',61.77,150,150],['SAMPLE30',77.72,150,150],];
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

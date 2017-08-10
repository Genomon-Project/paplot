(function() {
qc_data = {};

qc_data.Ids = ['SAMPLE1','SAMPLE10','SAMPLE11','SAMPLE12','SAMPLE13','SAMPLE14','SAMPLE15','SAMPLE16','SAMPLE17','SAMPLE18','SAMPLE19','SAMPLE2','SAMPLE20','SAMPLE21','SAMPLE22','SAMPLE23','SAMPLE24','SAMPLE25','SAMPLE26','SAMPLE27','SAMPLE28','SAMPLE29','SAMPLE3','SAMPLE30','SAMPLE4','SAMPLE5','SAMPLE6','SAMPLE7','SAMPLE8','SAMPLE9',];
qc_data.plots = [{chart_id:'chart_1', title:'Depth average', title_y:'Average of depth', stack:{format:[[{label:'{keya1}',type:'str',keys:['keya1',],ext:''},],], keys: '{keya1} '}, stack_id:['stack0',], label:['Average depth',], color:['#2478B4',], tooltip:{format:[[{label:'Sample:',type:'fix',keys:[],ext:''},{label:'{id}',type:'str',keys:['id',],ext:''},],[{label:'{keya1}',type:'numeric',keys:['keya1',],ext:'.2'},],], keys: '{id} {keya1} '}},{chart_id:'chart_2', title:'Depth coverage', title_y:'Coverage', stack:{format:[[{label:'{keyb1}',type:'str',keys:['keyb1',],ext:''},],[{label:'{keyb2}',type:'str',keys:['keyb2',],ext:''},],[{label:'{keyb3}',type:'str',keys:['keyb3',],ext:''},],[{label:'{keyb4}',type:'str',keys:['keyb4',],ext:''},],], keys: '{keyb1} {keyb2} {keyb3} {keyb4} '}, stack_id:['stack0','stack1','stack2','stack3',], label:['Ratio 30x','Ratio 20x','Ratio 10x','Ratio  2x',], color:['#2478B4','#FF7F0E','#2CA02C','#D62728',], tooltip:{format:[[{label:'Sample:',type:'fix',keys:[],ext:''},{label:'{id}',type:'str',keys:['id',],ext:''},],[{label:'Ratio  2x: ',type:'fix',keys:[],ext:''},{label:'{keyb4}',type:'numeric',keys:['keyb4',],ext:'.2'},],[{label:'Ratio 10x: ',type:'fix',keys:[],ext:''},{label:'{keyb3}',type:'numeric',keys:['keyb3',],ext:'.2'},],[{label:'Ratio 20x: ',type:'fix',keys:[],ext:''},{label:'{keyb2}',type:'numeric',keys:['keyb2',],ext:'.2'},],[{label:'Ratio 30x: ',type:'fix',keys:[],ext:''},{label:'{keyb1}',type:'numeric',keys:['keyb1',],ext:'.2'},],], keys: '{id} {keyb1} {keyb2} {keyb3} {keyb4} '}},];
qc_data.header = ['id','keya1','keyb1','keyb2','keyb3','keyb4',];
qc_data.value = [['SAMPLE1',70.05,0.67,0.68,0.77,0.98],['SAMPLE2',65.76,0.61,0.77,0.77,0.85],['SAMPLE3',63.38,0.59,0.60,0.82,0.98],['SAMPLE4',70.97,0.68,0.70,0.83,0.90],['SAMPLE5',69.97,0.65,0.67,0.95,0.98],['SAMPLE6',62.79,0.52,0.92,0.94,0.95],['SAMPLE7',60.40,0.56,0.71,0.71,0.74],['SAMPLE8',62.80,0.57,0.72,0.78,0.95],['SAMPLE9',65.84,0.64,0.66,0.68,0.91],['SAMPLE10',71.08,0.65,0.85,0.89,0.98],['SAMPLE11',79.25,0.77,0.81,0.87,0.91],['SAMPLE12',57.02,0.53,0.63,0.65,0.90],['SAMPLE13',56.88,0.51,0.61,0.76,0.91],['SAMPLE14',56.36,0.51,0.54,0.78,0.96],['SAMPLE15',61.21,0.57,0.61,0.76,0.93],['SAMPLE16',59.69,0.55,0.68,0.73,0.85],['SAMPLE17',67.79,0.65,0.67,0.77,0.96],['SAMPLE18',58.92,0.55,0.57,0.77,0.90],['SAMPLE19',62.62,0.57,0.59,0.90,0.99],['SAMPLE20',67.47,0.62,0.81,0.83,0.94],['SAMPLE21',55.33,0.51,0.55,0.70,0.95],['SAMPLE22',64.54,0.60,0.71,0.79,0.86],['SAMPLE23',57.18,0.54,0.55,0.63,0.90],['SAMPLE24',79.16,0.76,0.82,0.90,0.96],['SAMPLE25',54.90,0.51,0.53,0.68,0.91],['SAMPLE26',62.10,0.59,0.61,0.74,0.86],['SAMPLE27',55.81,0.50,0.61,0.78,0.81],['SAMPLE28',61.45,0.56,0.72,0.81,0.82],['SAMPLE29',61.77,0.55,0.64,0.92,0.94],['SAMPLE30',77.72,0.75,0.77,0.87,0.97],];
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

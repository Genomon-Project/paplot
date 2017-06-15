(function() {
qc_data = {};

qc_data.Ids = ['SAMPLE1','SAMPLE10','SAMPLE11','SAMPLE12','SAMPLE13','SAMPLE14','SAMPLE15','SAMPLE16','SAMPLE17','SAMPLE18','SAMPLE19','SAMPLE2','SAMPLE20','SAMPLE21','SAMPLE22','SAMPLE23','SAMPLE24','SAMPLE25','SAMPLE26','SAMPLE27','SAMPLE28','SAMPLE29','SAMPLE3','SAMPLE30','SAMPLE4','SAMPLE5','SAMPLE6','SAMPLE7','SAMPLE8','SAMPLE9',];
qc_data.plots = [{chart_id:'chart_1', title:'depth average', title_y:'average of depth', stack:{format:[[{label:'{average_depth}',type:'str',keys:['average_depth',],ext:''},],], keys: '{average_depth} '}, stack_id:['stack0',], label:['average_depth',], color:['#2478B4',], tooltip:{format:[[{label:'ID:',type:'fix',keys:[],ext:''},{label:'{id}',type:'str',keys:['id',],ext:''},],[{label:'{average_depth}',type:'numeric',keys:['average_depth',],ext:'.2'},],], keys: '{average_depth} {id} '}},];
qc_data.header = ['average_depth','id',];
qc_data.value = [[70.05,'SAMPLE1'],[65.76,'SAMPLE2'],[63.38,'SAMPLE3'],[70.97,'SAMPLE4'],[69.97,'SAMPLE5'],[62.79,'SAMPLE6'],[60.40,'SAMPLE7'],[62.80,'SAMPLE8'],[65.84,'SAMPLE9'],[71.08,'SAMPLE10'],[79.25,'SAMPLE11'],[57.02,'SAMPLE12'],[56.88,'SAMPLE13'],[56.36,'SAMPLE14'],[61.21,'SAMPLE15'],[59.69,'SAMPLE16'],[67.79,'SAMPLE17'],[58.92,'SAMPLE18'],[62.62,'SAMPLE19'],[67.47,'SAMPLE20'],[55.33,'SAMPLE21'],[64.54,'SAMPLE22'],[57.18,'SAMPLE23'],[79.16,'SAMPLE24'],[54.90,'SAMPLE25'],[62.10,'SAMPLE26'],[55.81,'SAMPLE27'],[61.45,'SAMPLE28'],[61.77,'SAMPLE29'],[77.72,'SAMPLE30'],];
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

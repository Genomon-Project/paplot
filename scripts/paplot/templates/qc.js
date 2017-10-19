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
            try{
                replaced = eval(replaced);
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
    for (var d1 = 0; d1 < qc_data.value.length; d1++) {
        key.push(qc_data.value[d1][qc_data.header.indexOf("id")]);
    }
    
    var tooltip = 0;
    if (info.tooltip.format.length > 0) {
        tooltip = {};
        for (var d2 = 0; d2 < qc_data.value.length; d2++) {
            var id = qc_data.value[d2][qc_data.header.indexOf("id")];
            tooltip[id] = [];
            
            var tmp_data2 = tooltip_partial(info.tooltip, qc_data.value[d2])
            for (var t in tmp_data2) {
                tooltip[id].push(tmp_data2[t]);
            }
        }
    }
    
    var data = [];
    for (var s = 0; s < info.stack.format.length; s++) {
        data[s] = [];
    }
    for (var d3 = 0; d3 < qc_data.value.length; d3++) {
        var tmp_data3 = tooltip_partial(info.stack, qc_data.value[d3]);
        for (var s3 in tmp_data3) {
            data[s3].push(Number(tmp_data3[s3]))
        }
    }
    
    return {data: data, key: key, tooltip: tooltip};
};

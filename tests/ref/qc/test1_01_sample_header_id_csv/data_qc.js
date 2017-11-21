(function() {
qc_data = {};

qc_data.Ids = ['SAMPLE00','SAMPLE01','SAMPLE02',];
qc_data.plots = [{chart_id:'chart_1', title:'Chart 1: Average depth', title_y:'Average of depth', stack:{format:[[{label:'{average_depth}',type:'str',keys:['average_depth',],ext:''},],], keys: '{average_depth} '}, stack_id:['stack0',], label:['Average depth',], color:['#2478B4',], tooltip:{format:[[{label:'Sample:',type:'fix',keys:[],ext:''},{label:'{id}',type:'str',keys:['id',],ext:''},],[{label:'{average_depth}',type:'numeric',keys:['average_depth',],ext:'.2'},],], keys: '{average_depth} {id} '}},{chart_id:'chart_2', title:'Chart 2: Read length', title_y:'Read length', stack:{format:[[{label:'{read_length_r1}',type:'str',keys:['read_length_r1',],ext:''},],[{label:'{read_length_r2}',type:'str',keys:['read_length_r2',],ext:''},],], keys: '{read_length_r1} {read_length_r2} '}, stack_id:['stack0','stack1',], label:['Read length r1','Read length r2',], color:['#2478B4','#FF7F0E',], tooltip:{format:[[{label:'Sample:',type:'fix',keys:[],ext:''},{label:'{id}',type:'str',keys:['id',],ext:''},],[{label:'Read1: ',type:'fix',keys:[],ext:''},{label:'{read_length_r1}',type:'numeric',keys:['read_length_r1',],ext:','},],[{label:'Read2: ',type:'fix',keys:[],ext:''},{label:'{read_length_r2}',type:'numeric',keys:['read_length_r2',],ext:','},],], keys: '{id} {read_length_r1} {read_length_r2} '}},{chart_id:'chart_3', title:'Chart 3: Mapped reads / Total reads', title_y:'Rate', stack:{format:[[{label:'{mapped_reads}/{total_reads}',type:'numeric',keys:['mapped_reads','total_reads',],ext:''},],], keys: '{mapped_reads} {total_reads} '}, stack_id:['stack0',], label:['Mapped reads / Total reads',], color:['#2478B4',], tooltip:{format:[[{label:'Sample:',type:'fix',keys:[],ext:''},{label:'{id}',type:'str',keys:['id',],ext:''},],[{label:'{mapped_reads}/{total_reads}',type:'numeric',keys:['mapped_reads','total_reads',],ext:'.2'},],], keys: '{id} {mapped_reads} {total_reads} '}},{chart_id:'chart_4', title:'Chart 4: Depth coverage', title_y:'Coverage', stack:{format:[[{label:'{ratio_30x}',type:'str',keys:['ratio_30x',],ext:''},],[{label:'{ratio_20x}-{ratio_30x}',type:'numeric',keys:['ratio_20x','ratio_30x',],ext:''},],[{label:'{ratio_10x}-{ratio_20x}',type:'numeric',keys:['ratio_10x','ratio_20x',],ext:''},],[{label:'{ratio_2x}-{ratio_10x}',type:'numeric',keys:['ratio_2x','ratio_10x',],ext:''},],], keys: '{ratio_10x} {ratio_20x} {ratio_2x} {ratio_30x} '}, stack_id:['stack0','stack1','stack2','stack3',], label:['Ratio 30x','Ratio 20x','Ratio 10x','Ratio  2x',], color:['#2478B4','#FF7F0E','#2CA02C','#D62728',], tooltip:{format:[[{label:'Sample:',type:'fix',keys:[],ext:''},{label:'{id}',type:'str',keys:['id',],ext:''},],[{label:'Ratio  2x: ',type:'fix',keys:[],ext:''},{label:'{ratio_2x}',type:'numeric',keys:['ratio_2x',],ext:'.2'},],[{label:'Ratio 10x: ',type:'fix',keys:[],ext:''},{label:'{ratio_10x}',type:'numeric',keys:['ratio_10x',],ext:'.2'},],[{label:'Ratio 20x: ',type:'fix',keys:[],ext:''},{label:'{ratio_20x}',type:'numeric',keys:['ratio_20x',],ext:'.2'},],[{label:'Ratio 30x: ',type:'fix',keys:[],ext:''},{label:'{ratio_30x}',type:'numeric',keys:['ratio_30x',],ext:'.2'},],], keys: '{id} {ratio_10x} {ratio_20x} {ratio_2x} {ratio_30x} '}},];
qc_data.header = ['average_depth','duplicate_reads','id','mapped_reads','mean_insert_size','ratio_10x','ratio_20x','ratio_2x','ratio_30x','read_length_r1','read_length_r2','total_reads',];
qc_data.value = [[70.05,7964009,'SAMPLE00',56262203,343.92,0.77,0.68,0.98,0.67,265,270,94315157],[65.76,5297450,'SAMPLE01',33860998,351.23,0.77,0.77,0.85,0.61,140,200,50340277],[63.38,8347508,'SAMPLE02',88010999,496.34,0.82,0.60,0.98,0.59,120,175,90635480],];function tooltip_partial(format, data) {
    
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

})();
Object.freeze(qc_data);

(function() {
qc_data = {};

qc_data.Ids = ['SAMPLE1','SAMPLE10','SAMPLE11','SAMPLE12','SAMPLE13','SAMPLE14','SAMPLE15','SAMPLE16','SAMPLE17','SAMPLE18','SAMPLE19','SAMPLE2','SAMPLE20','SAMPLE21','SAMPLE22','SAMPLE23','SAMPLE24','SAMPLE25','SAMPLE26','SAMPLE27','SAMPLE28','SAMPLE29','SAMPLE3','SAMPLE30','SAMPLE4','SAMPLE5','SAMPLE6','SAMPLE7','SAMPLE8','SAMPLE9',];
qc_data.plots = [{chart_id:'chart_brush', title:'', title_y:'', stack:{format:[[{label:'{average_depth}',type:'str',keys:['average_depth',],ext:''},],], keys: '{average_depth} '}, stack_id:['stack0',], label:['Average depth',], color:['#E3E5E9',], tooltip:{format:[], keys: ''}},{chart_id:'chart_1', title:'Chart 1: Average depth', title_y:'Average of depth', stack:{format:[[{label:'{average_depth}',type:'str',keys:['average_depth',],ext:''},],], keys: '{average_depth} '}, stack_id:['stack0',], label:['Average depth',], color:['#2478B4',], tooltip:{format:[[{label:'Sample:',type:'fix',keys:[],ext:''},{label:'{id}',type:'str',keys:['id',],ext:''},],[{label:'{average_depth}',type:'numeric',keys:['average_depth',],ext:'.2'},],], keys: '{average_depth} {id} '}},{chart_id:'chart_2', title:'Chart 2: Read length', title_y:'Read length', stack:{format:[[{label:'{read_length_r1}',type:'str',keys:['read_length_r1',],ext:''},],[{label:'{read_length_r2}',type:'str',keys:['read_length_r2',],ext:''},],], keys: '{read_length_r1} {read_length_r2} '}, stack_id:['stack0','stack1',], label:['Read length r1','Read length r2',], color:['#2478B4','#FF7F0E',], tooltip:{format:[[{label:'Sample:',type:'fix',keys:[],ext:''},{label:'{id}',type:'str',keys:['id',],ext:''},],[{label:'Read1: ',type:'fix',keys:[],ext:''},{label:'{read_length_r1}',type:'numeric',keys:['read_length_r1',],ext:','},],[{label:'Read2: ',type:'fix',keys:[],ext:''},{label:'{read_length_r2}',type:'numeric',keys:['read_length_r2',],ext:','},],], keys: '{id} {read_length_r1} {read_length_r2} '}},{chart_id:'chart_3', title:'Chart 3: Mapped reads / Total reads', title_y:'Rate', stack:{format:[[{label:'{mapped_reads}/{total_reads}',type:'numeric',keys:['mapped_reads','total_reads',],ext:''},],], keys: '{mapped_reads} {total_reads} '}, stack_id:['stack0',], label:['Mapped reads / Total reads',], color:['#2478B4',], tooltip:{format:[[{label:'Sample:',type:'fix',keys:[],ext:''},{label:'{id}',type:'str',keys:['id',],ext:''},],[{label:'{mapped_reads}/{total_reads}',type:'numeric',keys:['mapped_reads','total_reads',],ext:'.2'},],], keys: '{id} {mapped_reads} {total_reads} '}},{chart_id:'chart_4', title:'Chart 4: Depth coverage', title_y:'Coverage', stack:{format:[[{label:'{ratio_30x}',type:'str',keys:['ratio_30x',],ext:''},],[{label:'{ratio_20x}-{ratio_30x}',type:'numeric',keys:['ratio_20x','ratio_30x',],ext:''},],[{label:'{ratio_10x}-{ratio_20x}',type:'numeric',keys:['ratio_10x','ratio_20x',],ext:''},],[{label:'{ratio_2x}-{ratio_10x}',type:'numeric',keys:['ratio_2x','ratio_10x',],ext:''},],], keys: '{ratio_10x} {ratio_20x} {ratio_2x} {ratio_30x} '}, stack_id:['stack0','stack1','stack2','stack3',], label:['Ratio 30x','Ratio 20x','Ratio 10x','Ratio  2x',], color:['#2478B4','#FF7F0E','#2CA02C','#D62728',], tooltip:{format:[[{label:'Sample:',type:'fix',keys:[],ext:''},{label:'{id}',type:'str',keys:['id',],ext:''},],[{label:'Ratio  2x: ',type:'fix',keys:[],ext:''},{label:'{ratio_2x}',type:'numeric',keys:['ratio_2x',],ext:'.2'},],[{label:'Ratio 10x: ',type:'fix',keys:[],ext:''},{label:'{ratio_10x}',type:'numeric',keys:['ratio_10x',],ext:'.2'},],[{label:'Ratio 20x: ',type:'fix',keys:[],ext:''},{label:'{ratio_20x}',type:'numeric',keys:['ratio_20x',],ext:'.2'},],[{label:'Ratio 30x: ',type:'fix',keys:[],ext:''},{label:'{ratio_30x}',type:'numeric',keys:['ratio_30x',],ext:'.2'},],], keys: '{id} {ratio_10x} {ratio_20x} {ratio_2x} {ratio_30x} '}},];
qc_data.header = ['average_depth','id','mapped_reads','ratio_10x','ratio_20x','ratio_2x','ratio_30x','read_length_r1','read_length_r2','total_reads',];
qc_data.value = [[70.05,'SAMPLE1',56262203,0.77,0.68,0.98,0.67,75,75,94315157],[65.76,'SAMPLE2',33860998,0.77,0.77,0.85,0.61,75,75,50340277],[63.38,'SAMPLE3',88010999,0.82,0.60,0.98,0.59,75,75,90635480],[70.97,'SAMPLE4',89163960,0.83,0.70,0.90,0.68,75,75,72885114],[69.97,'SAMPLE5',28793615,0.95,0.67,0.98,0.65,75,75,92572101],[62.79,'SAMPLE6',71290366,0.94,0.92,0.95,0.52,75,75,29193095],[60.40,'SAMPLE7',56156227,0.71,0.71,0.74,0.56,75,75,47526656],[62.80,'SAMPLE8',53115657,0.78,0.72,0.95,0.57,75,75,85950331],[65.84,'SAMPLE9',31572200,0.68,0.66,0.91,0.64,75,75,41341138],[71.08,'SAMPLE10',33812378,0.89,0.85,0.98,0.65,75,75,20827838],[79.25,'SAMPLE11',42026268,0.87,0.81,0.91,0.77,100,100,91491485],[57.02,'SAMPLE12',88052624,0.65,0.63,0.90,0.53,100,100,45779338],[56.88,'SAMPLE13',53133100,0.76,0.61,0.91,0.51,100,100,44936207],[56.36,'SAMPLE14',80905156,0.78,0.54,0.96,0.51,100,100,69481336],[61.21,'SAMPLE15',87262118,0.76,0.61,0.93,0.57,100,100,98637407],[59.69,'SAMPLE16',71859220,0.73,0.68,0.85,0.55,100,100,45926490],[67.79,'SAMPLE17',70964954,0.77,0.67,0.96,0.65,100,100,79883229],[58.92,'SAMPLE18',12086409,0.77,0.57,0.90,0.55,100,100,82545007],[62.62,'SAMPLE19',22574857,0.90,0.59,0.99,0.57,100,100,37671560],[67.47,'SAMPLE20',47234823,0.83,0.81,0.94,0.62,100,100,48211895],[55.33,'SAMPLE21',22399169,0.70,0.55,0.95,0.51,150,150,34533646],[64.54,'SAMPLE22',69541829,0.79,0.71,0.86,0.60,150,150,71129050],[57.18,'SAMPLE23',57904670,0.63,0.55,0.90,0.54,150,150,74627576],[79.16,'SAMPLE24',28982192,0.90,0.82,0.96,0.76,150,150,42618281],[54.90,'SAMPLE25',97405324,0.68,0.53,0.91,0.51,150,150,57989549],[62.10,'SAMPLE26',50101692,0.74,0.61,0.86,0.59,150,150,59472175],[55.81,'SAMPLE27',47907389,0.78,0.61,0.81,0.50,150,150,49876287],[61.45,'SAMPLE28',52800804,0.81,0.72,0.82,0.56,150,150,16262100],[61.77,'SAMPLE29',85814766,0.92,0.64,0.94,0.55,150,150,58937974],[77.72,'SAMPLE30',27606775,0.87,0.77,0.97,0.75,150,150,85935701],];
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

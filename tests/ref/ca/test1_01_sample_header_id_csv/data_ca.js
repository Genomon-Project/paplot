(function() {
ca_data = {};

ca_data.node_size_detail = 6503523;
ca_data.node_size_thumb = 13697687;
ca_data.node_size_select = 5000000;
ca_data.genome_size = [
{"chr":"00", "size":249250621, "color":"#BBBBBB", "label":"1",},
{"chr":"01", "size":243199373, "color":"#BBBBBB", "label":"2",},
{"chr":"02", "size":198022430, "color":"#BBBBBB", "label":"3",},
{"chr":"03", "size":191154276, "color":"#BBBBBB", "label":"4",},
{"chr":"04", "size":180915260, "color":"#BBBBBB", "label":"5",},
{"chr":"05", "size":171115067, "color":"#BBBBBB", "label":"6",},
{"chr":"06", "size":159138663, "color":"#BBBBBB", "label":"7",},
{"chr":"07", "size":146364022, "color":"#BBBBBB", "label":"8",},
{"chr":"08", "size":141213431, "color":"#BBBBBB", "label":"9",},
{"chr":"09", "size":135534747, "color":"#BBBBBB", "label":"10",},
{"chr":"10", "size":135006516, "color":"#BBBBBB", "label":"11",},
{"chr":"11", "size":133851895, "color":"#BBBBBB", "label":"12",},
{"chr":"12", "size":115169878, "color":"#BBBBBB", "label":"13",},
{"chr":"13", "size":107349540, "color":"#BBBBBB", "label":"14",},
{"chr":"14", "size":102531392, "color":"#BBBBBB", "label":"15",},
{"chr":"15", "size":90354753, "color":"#BBBBBB", "label":"16",},
{"chr":"16", "size":81195210, "color":"#BBBBBB", "label":"17",},
{"chr":"17", "size":78077248, "color":"#BBBBBB", "label":"18",},
{"chr":"18", "size":59128983, "color":"#BBBBBB", "label":"19",},
{"chr":"19", "size":63025520, "color":"#BBBBBB", "label":"20",},
{"chr":"20", "size":48129895, "color":"#BBBBBB", "label":"21",},
{"chr":"21", "size":51304566, "color":"#BBBBBB", "label":"22",},
{"chr":"22", "size":155270560, "color":"#BBBBBB", "label":"X",},
{"chr":"23", "size":59373566, "color":"#BBBBBB", "label":"Y",}
];

ca_data.index_ID = ['SAMPLE00','SAMPLE01','SAMPLE02',];
ca_data.group = [{"name":"outer", "label":"Inter-chromosome", "color":"#9E4A98" },{"name":"inner", "label":"Intra-chromosome", "color":"#51BF69" }];
ca_data.tooltip_format = { bundle:{format:[[{label:'[',type:'fix',keys:[],ext:''},{label:'{chr1}',type:'str',keys:['chr1',],ext:''},{label:'] ',type:'fix',keys:[],ext:''},{label:'{break1}',type:'numeric',keys:['break1',],ext:','},{label:' (',type:'fix',keys:[],ext:''},{label:'{dir1}',type:'str',keys:['dir1',],ext:''},{label:') ',type:'fix',keys:[],ext:''},{label:'{gene_name1}',type:'str',keys:['gene_name1',],ext:''},{label:'; [',type:'fix',keys:[],ext:''},{label:'{chr2}',type:'str',keys:['chr2',],ext:''},{label:'] ',type:'fix',keys:[],ext:''},{label:'{break2}',type:'numeric',keys:['break2',],ext:','},{label:' (',type:'fix',keys:[],ext:''},{label:'{dir2}',type:'str',keys:['dir2',],ext:''},{label:') ',type:'fix',keys:[],ext:''},{label:'{gene_name2}',type:'str',keys:['gene_name2',],ext:''},{label:'; ',type:'fix',keys:[],ext:''},{label:'{type}',type:'str',keys:['type',],ext:''},],], keys: '{break1} {break2} {chr1} {chr2} {dir1} {dir2} {gene_name1} {gene_name2} {type} '}, };
ca_data.link_header = ['dir1','dir2','gene_name1','gene_name2','type',];
// 0:ID, 1:chr1, 2:break1, 3:chr2, 4:break2, 5:is_outer, 6:group_id, 7:tooltip_data
ca_data.links = [["SAMPLE00","13",16019088,"11",62784483,false,0,[['-','+','LS7T1EG444','4GRRIO5AVR','deletion',],]],["SAMPLE00","08",99412502,"06",129302434,false,0,[['-','+','FQFW16UF5U','QP779MLPNV','translocation',],]],["SAMPLE00","12",84663781,"17",52991509,false,0,[['+','-','Q9VX1I9U3I','7XM09ETN40','deletion',],]],["SAMPLE00","00",153160367,"21",33751554,false,0,[['+','+','CEE2SPV1R1','PVYYQIVS8G','inversion',],]],["SAMPLE00","17",12249358,"02",146222593,false,0,[['-','+','HH9OL7CK6G','XD80LI4E6Q','translocation',],]],["SAMPLE00","20",8658030,"22",133492043,false,0,[['+','-','I20EVP15ZM','WPE8O5H237','tandem_duplication',],]],["SAMPLE00","11",120178477,"00",155354923,false,0,[['+','-','IMYXD3TCA4','3MNN5J0MDN','deletion',],]],["SAMPLE01","10",101374238,"21",26701405,false,0,[['+','+','FZ7LOS66RD','9WYBJR57E0','translocation',],]],["SAMPLE01","01",121708638,"06",137424167,false,0,[['-','-','5655M5E46B','HB14VJXDHV','translocation',],]],["SAMPLE01","15",43027789,"21",23791492,false,0,[['+','-','REFSIL0H2M','L5EA31R8U0','inversion',],]],["SAMPLE01","18",3862589,"15",37135239,false,0,[['-','+','1IRWHVZLH8','6FUR9YMZOH','deletion',],]],["SAMPLE01","19",50294222,"00",164250235,false,0,[['+','-','DOH5G0YRQ9','9TWYMR5CZ2','inversion',],]],["SAMPLE01","22",67392415,"14",3327412,false,0,[['+','+','EM36MRX9B3','G4FPLN527D','translocation',],]],["SAMPLE02","21",34268355,"09",19871820,false,0,[['+','+','9SVRQCFVCO','2BEWSO91FZ','tandem_duplication',],]],["SAMPLE02","01",51849987,"19",47304716,false,0,[['-','+','9HK7LTVZST','DNCS44WCW0','inversion',],]],["SAMPLE02","05",66742149,"05",31916435,true,1,[['-','+','TJJCWQ6K6J','V5X8Y5QHVS','translocation',],]],];
ca_data.select_value = [[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2,1,1],[1,1],];
ca_data.select_key = [[[0,30],[0,31],[0,32],[1,10],[1,24],[2,29],[6,25],[6,27],[8,19],[9,3],[10,20],[11,12],[11,24],[12,16],[13,3],[14,0],[15,7],[15,8],[17,2],[17,10],[18,0],[19,9],[19,10],[20,1],[21,4],[21,5],[21,6],[22,13],[22,26]],[[5,6],[5,13]],];
ca_data.select_item = [[[0],[0],[1],[2],[1],[0],[0],[1],[0],[2],[1],[0],[0],[0],[0],[1],[1],[1],[0],[0],[1],[2],[1],[0],[1],[1],[0,2],[1],[0]],[[2],[2]],];
var node_name = function(Chr, index, leveling) {
    if (leveling == null) {
        leveling = false;
    }
    var ret;
    if (leveling == true) {
        ret = "root." + Chr + "." + Chr + "_" + ("000" + index).substr(-4);
    }
    else {
        ret = Chr + "_" + ("000" + index).substr(-4);
    }
    return ret;
};

var create_blank_nodes = function(node_size, leveling) {
    if (leveling == null) {
        leveling = false;
    }
    var nodes = [];
    for (var i = 0; i < ca_data.genome_size.length; i++){
        var item_num = Math.floor(ca_data.genome_size[i].size/node_size) + 1;
        if (leveling == false) {
            item_num = item_num + 1;
        }
        for (var j = 0; j < item_num; j++){
            var start;
            if (leveling == true) {
                start = node_name(ca_data.genome_size[i].chr, j, true);
            }
            else {
                start = node_name(ca_data.genome_size[i].chr, j, false);
            }
            nodes.push({"start":start, "ends":[], "tooltip":[]});
        }
    }
    return nodes
};

function tooltip_partial(format, link) {
    
    var obj = {id: link[0], 
        chr1: ca_data.genome_size[Number(link[1])].label, 
        break1: link[2], 
        chr2: ca_data.genome_size[Number(link[3])].label, 
        break2: link[4], func: ca_data.group[link[6]].label};
        
    var tooltip = [];
    
    for (var p = 0; p < link[7].length; p++) {
        for (var p2 = 0; p2 < link[7][p].length; p2++) {
            obj[ca_data.link_header[p2]] = link[7][p][p2];
        }
        for (var t in format.format) {
            var text = text_format(format.format[t], obj);
            if (tooltip.indexOf(text) < 0){
                tooltip.push(text);
            }
        }
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

var create_bundle_dataset = function (ID, node_size, tooltip) {

    var i = 0;
    var each_dataset = [];
    for (i = 0; i< ca_data.group.length; i++) {
        each_dataset[i] = create_blank_nodes(node_size);
    }
    
    for (i = 0; i < ca_data.links.length; i++) {
        if (ca_data.links[i][0] != ID) {
            continue;
        }
        
        var start = node_name(ca_data.links[i][1], Math.floor(ca_data.links[i][2]/node_size));
        var index = -1;
        for (var j = 0; j < each_dataset[0].length; j++){
            if (each_dataset[0][j].start == start) {
                index = j;
                break;
            }
        }
        if (index < 0) {
            continue;
        }
        var end_pos = Math.floor(ca_data.links[i][4]/node_size);
        var end = node_name(ca_data.links[i][3], end_pos);
        // if same position, sift end position.
        if (start == end) {
            if (end_pos == Math.floor(ca_data.genome_size[Number(ca_data.links[i][3])].size/node_size)) {
                end = node_name(ca_data.links[i][3], end_pos - 1);
            }
            else {
                end = node_name(ca_data.links[i][3], end_pos + 1);
            }
        }
        
        var group = ca_data.links[i][6];
        each_dataset[group][index].ends.push(end);
        
        // tooltip
        if (tooltip == true) {
            each_dataset[group][index].tooltip.push(tooltip_partial(ca_data.tooltip_format.bundle, ca_data.links[i]));
        }
    }
    
    return each_dataset;
};

ca_data.get_data_thumb = function (ID) {
    return create_bundle_dataset(ID, ca_data.node_size_thumb, false);
};

ca_data.get_arc_data_thumb = function () {
    return create_blank_nodes(ca_data.node_size_thumb, true);
};

ca_data.get_data_detail = function (ID) {
    return create_bundle_dataset(ID, ca_data.node_size_detail, true);
};

ca_data.get_arc_data_detail = function (ID) {
    return create_blank_nodes(ca_data.node_size_detail, true);
};

ca_data.get_select = function () {
    var node_size = ca_data.node_size_select;
    var i = 0, j= 0;
    
    var key = [];
    for (i = 0; i < ca_data.select_key.length; i++) {
        key[i] = [];
        for (j = 0; j < ca_data.select_key[i].length; j++) {
            key[i][j] = node_name(("0" + ca_data.select_key[i][j][0]).substr(-2), ("0" + ca_data.select_key[i][j][1]).substr(-2), true);
        }
    }
    
    var item = [];
    for (i = 0; i < ca_data.select_item.length; i++) {
        item[i] = [];
        for (j = 0; j < ca_data.select_item[i].length; j++) {
            item[i][j] = [];
            for (var k = 0; k < ca_data.select_item[i][j].length; k++) {
                item[i][j][k] = ca_data.index_ID[ca_data.select_item[i][j][k]];
            }
        }
    }
    
    var all_key = [];
    var c = 0;
    for (i = 0; i < ca_data.genome_size.length; i++){
        var item_num = Math.floor(ca_data.genome_size[i].size/node_size) + 1;
        for (j = 0; j < item_num; j++){
            all_key[c] = node_name(ca_data.genome_size[i].chr, j, true);
            c++;
        }
    }
    
    return {value:ca_data.select_value, key:key, item:item, all_key:all_key};
};

})();
Object.freeze(ca_data);

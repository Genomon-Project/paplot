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

ca_data.index_ID = ['SAMPLE1','SAMPLE10','SAMPLE2','SAMPLE3','SAMPLE4','SAMPLE5','SAMPLE6','SAMPLE7','SAMPLE8','SAMPLE9',];
ca_data.group = [{"name":"A", "label":"A", "color":"#66C2A5" },{"name":"B", "label":"B", "color":"#FC8D62" },{"name":"C", "label":"C", "color":"#8DA0CB" },{"name":"D", "label":"D", "color":"#E78AC3" }];
ca_data.tooltip_format = { bundle:{format:[[{label:'[',type:'fix',keys:[],ext:''},{label:'{chr1}',type:'str',keys:['chr1',],ext:''},{label:'] ',type:'fix',keys:[],ext:''},{label:'{break1}',type:'numeric',keys:['break1',],ext:','},{label:'; [',type:'fix',keys:[],ext:''},{label:'{chr2}',type:'str',keys:['chr2',],ext:''},{label:'] ',type:'fix',keys:[],ext:''},{label:'{break2}',type:'numeric',keys:['break2',],ext:','},],], keys: '{break1} {break2} {chr1} {chr2} '}, };
ca_data.link_header = [];
// 0:ID, 1:chr1, 2:break1, 3:chr2, 4:break2, 5:is_outer, 6:group_id, 7:tooltip_data
ca_data.links = [["SAMPLE1","13",16019088,"11",62784483,false,2,[[],]],["SAMPLE1","08",99412502,"06",129302434,false,1,[[],]],["SAMPLE1","12",84663781,"17",52991509,false,0,[[],]],["SAMPLE1","00",153160367,"21",33751554,false,2,[[],]],["SAMPLE1","17",12249358,"02",146222593,false,1,[[],]],["SAMPLE1","20",8658030,"22",133492043,false,1,[[],]],["SAMPLE1","11",120178477,"00",155354923,false,3,[[],]],["SAMPLE2","10",101374238,"21",26701405,false,1,[[],]],["SAMPLE2","01",121708638,"06",137424167,false,2,[[],]],["SAMPLE2","15",43027789,"21",23791492,false,2,[[],]],["SAMPLE2","18",3862589,"15",37135239,false,1,[[],]],["SAMPLE2","19",50294222,"00",164250235,false,1,[[],]],["SAMPLE2","22",67392415,"14",3327412,false,1,[[],]],["SAMPLE3","21",34268355,"09",19871820,false,0,[[],]],["SAMPLE3","01",51849987,"19",47304716,false,3,[[],]],["SAMPLE3","05",66742149,"05",31916435,true,0,[[],]],["SAMPLE4","07",135644313,"02",116748248,false,3,[[],]],["SAMPLE4","06",6037836,"20",34855497,false,3,[[],]],["SAMPLE4","06",109724564,"13",106387943,false,0,[[],]],["SAMPLE4","21",21329746,"18",49132777,false,1,[[],]],["SAMPLE4","09",79484145,"21",48499740,false,1,[[],]],["SAMPLE4","09",79484145,"16",20945220,false,2,[[],]],["SAMPLE4","10",122930352,"21",22765050,false,2,[[],]],["SAMPLE4","23",30102935,"16",20945220,false,1,[[],]],["SAMPLE4","06",88998071,"06",88999025,true,1,[[],]],["SAMPLE4","06",134692916,"05",59279632,false,1,[[],]],["SAMPLE4","03",18658364,"03",18658859,true,2,[[],]],["SAMPLE4","05",58073561,"06",113049570,false,3,[[],]],["SAMPLE4","21",12753561,"09",93983219,false,3,[[],]],["SAMPLE4","09",127888623,"09",127889381,true,0,[[],]],["SAMPLE5","05",170379443,"16",80831681,false,1,[[],]],["SAMPLE5","08",1133301,"06",134732389,false,2,[[],]],["SAMPLE5","07",77149226,"15",26753461,false,1,[[],]],["SAMPLE5","06",16278731,"09",83172731,false,0,[[],]],["SAMPLE5","10",83471004,"13",85966489,false,1,[[],]],["SAMPLE5","04",20810285,"21",7340004,false,0,[[],]],["SAMPLE5","06",150114646,"23",3930914,false,2,[[],]],["SAMPLE6","20",3692977,"20",44510875,true,2,[[],]],["SAMPLE6","17",17920148,"22",144608009,false,0,[[],]],["SAMPLE6","03",149672094,"02",185716105,false,2,[[],]],["SAMPLE6","14",30455273,"01",78238193,false,0,[[],]],["SAMPLE6","17",31707099,"01",187464066,false,1,[[],]],["SAMPLE6","22",13113310,"21",22014231,false,0,[[],]],["SAMPLE6","07",43600568,"10",4511056,false,1,[[],]],["SAMPLE6","06",121989817,"07",145405637,false,1,[[],]],["SAMPLE6","15",67070418,"02",1508171,false,3,[[],]],["SAMPLE6","00",244043779,"00",71692260,true,1,[[],]],["SAMPLE7","12",108406515,"03",103771354,false,3,[[],]],["SAMPLE7","00",192482367,"16",39548764,false,2,[[],]],["SAMPLE7","18",24395717,"02",10876086,false,2,[[],]],["SAMPLE7","03",174399989,"19",59075611,false,2,[[],]],["SAMPLE7","06",7433935,"10",28020133,false,1,[[],]],["SAMPLE7","06",30987719,"14",31607367,false,3,[[],]],["SAMPLE8","11",5808948,"00",126650799,false,0,[[],]],["SAMPLE8","22",62416825,"08",103363021,false,3,[[],]],["SAMPLE8","21",49569332,"10",43957639,false,0,[[],]],["SAMPLE8","17",33987824,"08",20235198,false,1,[[],]],["SAMPLE8","11",82038786,"03",188188728,false,1,[[],]],["SAMPLE8","00",238731382,"04",147513508,false,3,[[],]],["SAMPLE8","18",30665368,"14",88366003,false,0,[[],]],["SAMPLE8","13",82447532,"20",15166596,false,1,[[],]],["SAMPLE8","20",17082231,"19",15076736,false,2,[[],]],["SAMPLE8","00",139050751,"18",17400358,false,2,[[],]],["SAMPLE9","06",95490728,"08",89410590,false,2,[[],]],["SAMPLE9","09",21675120,"23",27300286,false,2,[[],]],["SAMPLE9","01",172625375,"02",140646175,false,1,[[],]],["SAMPLE9","08",1853842,"17",59233042,false,1,[[],]],["SAMPLE9","08",54636902,"13",55352858,false,3,[[],]],["SAMPLE9","07",21951154,"06",54405063,false,2,[[],]],["SAMPLE9","14",42446898,"19",9996637,false,2,[[],]],["SAMPLE9","00",8928882,"23",33387475,false,3,[[],]],["SAMPLE9","15",32688406,"07",77568655,false,1,[[],]],["SAMPLE9","05",103119146,"05",939420,true,3,[[],]],["SAMPLE9","18",14532685,"09",6879161,false,0,[[],]],["SAMPLE10","05",22883110,"12",103743864,false,2,[[],]],["SAMPLE10","03",170386551,"09",18115326,false,0,[[],]],["SAMPLE10","12",1987292,"15",30986341,false,2,[[],]],["SAMPLE10","14",98927733,"19",45592948,false,1,[[],]],["SAMPLE10","09",23863882,"04",171994772,false,1,[[],]],["SAMPLE10","22",38494022,"07",41894232,false,3,[[],]],["SAMPLE10","13",72225317,"12",80044106,false,2,[[],]],["SAMPLE10","11",40058944,"00",248492226,false,1,[[],]],["SAMPLE10","22",14558186,"14",22615302,false,1,[[],]],["SAMPLE10","09",59857362,"07",15918102,false,3,[[],]],];
ca_data.select_value = [[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2,1,1,1,1,1,1],[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2,1,1,1,1,1,1,1,1,1,1,1,1,1,2,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],[1,1,1,1,1,1,1,1,1,1,2,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],];
ca_data.select_key = [[[18,6],[18,2],[17,10],[21,9],[11,1],[21,1],[1,15],[21,4],[21,6],[6,3],[5,6],[14,17],[6,21],[10,8],[17,3],[9,25],[4,4],[12,16],[22,28],[3,34],[9,1],[9,3],[22,2],[0,25],[13,21],[5,13],[14,6],[9,16]],[[15,7],[18,0],[16,16],[0,49],[18,9],[17,11],[6,1],[21,9],[0,32],[8,4],[19,10],[8,0],[13,16],[13,17],[21,5],[21,4],[10,20],[10,5],[20,1],[11,8],[15,5],[1,34],[0,48],[6,25],[6,24],[6,26],[2,28],[7,15],[7,8],[0,14],[3,37],[15,6],[9,4],[22,26],[7,29],[14,19],[1,37],[20,3],[2,29],[17,2],[16,4],[17,6],[8,19],[11,16],[6,17],[19,9],[10,0],[10,16],[9,15],[5,34],[5,11],[14,4],[14,0],[23,6],[4,34],[22,13],[22,2]],[[18,4],[2,37],[0,38],[7,4],[15,8],[0,30],[19,11],[8,0],[13,14],[10,24],[21,4],[21,6],[20,3],[5,4],[20,0],[18,3],[12,0],[20,8],[6,27],[6,26],[3,34],[15,6],[2,2],[12,16],[0,27],[16,4],[16,7],[19,3],[19,1],[1,24],[11,12],[9,4],[13,3],[8,17],[6,10],[3,29],[6,30],[12,20],[6,19],[23,0],[23,5],[3,3],[9,15],[14,8]],[[0,31],[13,11],[21,2],[8,20],[1,10],[5,20],[22,7],[6,1],[20,6],[6,22],[11,24],[7,27],[4,29],[7,8],[2,0],[0,47],[7,3],[2,23],[0,1],[15,13],[8,10],[5,0],[19,9],[6,6],[5,11],[12,21],[3,20],[14,6],[9,18],[23,6],[22,12],[9,11]],];
ca_data.select_item = [[[8],[9],[0],[8],[8],[5],[6],[6],[3],[5],[3],[8],[4],[8],[6],[4],[5],[0],[6],[1],[9],[1,3],[6],[8],[4],[3],[6],[5]],[[2],[2],[5],[1],[4],[9],[7],[4],[2],[8],[2],[9],[8],[5],[2],[4],[2],[7],[0],[1],[5],[9],[6],[0],[6],[4],[9],[5,9],[6],[6],[8],[9],[1],[0],[6],[1],[6],[8],[0],[0],[4],[6,8],[0],[8],[4],[1],[6],[5],[4],[5],[4],[1],[2],[4],[1],[2],[1]],[[7],[6],[7],[9],[2],[0],[7],[5],[1],[4],[2,4],[0],[8],[1],[6],[8],[1],[6],[2],[5],[7],[1],[7],[1],[8],[4],[7],[8],[9],[2],[0],[9],[0],[9],[9],[6],[5],[1],[9],[5],[9],[4],[4],[9]],[[0],[9],[4],[8],[3],[9],[1],[4],[4],[4],[0],[4],[8],[1],[6],[8],[1],[4],[9],[6],[9],[9],[3],[7],[4],[7],[7],[7],[4],[9],[8],[1]],];
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

var key_to_index = function (list, key) {
    
    for (var i = 0; i < list.length; i++) {
        if (list[i] == key) {
            return i
        }
    }
    return -1;
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

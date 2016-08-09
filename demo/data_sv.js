(function() {
bundle_data_sv = {};

bundle_data_sv.node_size_detail = 6503523;
bundle_data_sv.node_size_thumb = 13697687;
bundle_data_sv.node_size_select = 5000000;
bundle_data_sv.genome_size = [
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

bundle_data_sv.index_ID = ['SAMPLE0','SAMPLE1','SAMPLE2','SAMPLE3','SAMPLE4','SAMPLE5','SAMPLE6','SAMPLE7','SAMPLE8','SAMPLE9',];
bundle_data_sv.group = [{"name":"outer", "label":"Inter Chromosome", "color":"#9E4A98" },{"name":"inner", "label":"Intra Chromosome", "color":"#51BF69" }];
bundle_data_sv.tooltip_format = { bundle:{format:[[{label:'[',type:'fix',keys:[],ext:''},{label:'{chr1}',type:'str',keys:['chr1',],ext:''},{label:'] ',type:'fix',keys:[],ext:''},{label:'{break1}',type:'numeric',keys:['break1',],ext:','},{label:' (',type:'fix',keys:[],ext:''},{label:'{dir1}',type:'str',keys:['dir1',],ext:''},{label:') ',type:'fix',keys:[],ext:''},{label:'{gene_name1}',type:'str',keys:['gene_name1',],ext:''},{label:'; [',type:'fix',keys:[],ext:''},{label:'{chr2}',type:'str',keys:['chr2',],ext:''},{label:'] ',type:'fix',keys:[],ext:''},{label:'{break2}',type:'numeric',keys:['break2',],ext:','},{label:' (',type:'fix',keys:[],ext:''},{label:'{dir2}',type:'str',keys:['dir2',],ext:''},{label:') ',type:'fix',keys:[],ext:''},{label:'{gene_name2}',type:'str',keys:['gene_name2',],ext:''},{label:'; ',type:'fix',keys:[],ext:''},{label:'{type}',type:'str',keys:['type',],ext:''},],], keys: '{dir2} {dir1} {chr2} {chr1} {break1} {break2} {type} {gene_name2} {gene_name1} '}, };
bundle_data_sv.link_header = ['dir2','dir1','gene_name2','type','gene_name1',];
// 0:ID, 1:chr1, 2:break1, 3:chr2, 4:break2, 5:is_outer, 6:group_id, 7:tooltip_data
bundle_data_sv.links = [["SAMPLE0","13",16019088,"11",62784483,false,0,[['+','-','4GRRIO5AVR','deletion','LS7T1EG444',],]],["SAMPLE0","08",99412502,"06",129302434,false,0,[['+','-','QP779MLPNV','translocation','FQFW16UF5U',],]],["SAMPLE0","12",84663781,"17",52991509,false,0,[['-','+','7XM09ETN40','deletion','Q9VX1I9U3I',],]],["SAMPLE0","00",153160367,"21",33751554,false,0,[['+','+','PVYYQIVS8G','inversion','CEE2SPV1R1',],]],["SAMPLE0","17",12249358,"02",146222593,false,0,[['+','-','XD80LI4E6Q','translocation','HH9OL7CK6G',],]],["SAMPLE0","20",8658030,"22",133492043,false,0,[['-','+','WPE8O5H237','tandem_duplication','I20EVP15ZM',],]],["SAMPLE0","11",120178477,"00",155354923,false,0,[['-','+','3MNN5J0MDN','deletion','IMYXD3TCA4',],]],["SAMPLE1","10",101374238,"21",26701405,false,0,[['+','+','9WYBJR57E0','translocation','FZ7LOS66RD',],]],["SAMPLE1","01",121708638,"06",137424167,false,0,[['-','-','HB14VJXDHV','translocation','5655M5E46B',],]],["SAMPLE1","15",43027789,"21",23791492,false,0,[['-','+','L5EA31R8U0','inversion','REFSIL0H2M',],]],["SAMPLE1","18",3862589,"15",37135239,false,0,[['+','-','6FUR9YMZOH','deletion','1IRWHVZLH8',],]],["SAMPLE1","19",50294222,"00",164250235,false,0,[['-','+','9TWYMR5CZ2','inversion','DOH5G0YRQ9',],]],["SAMPLE1","22",67392415,"14",3327412,false,0,[['+','+','G4FPLN527D','translocation','EM36MRX9B3',],]],["SAMPLE2","21",34268355,"09",19871820,false,0,[['+','+','2BEWSO91FZ','tandem_duplication','9SVRQCFVCO',],]],["SAMPLE2","01",51849987,"19",47304716,false,0,[['+','-','DNCS44WCW0','inversion','9HK7LTVZST',],]],["SAMPLE2","05",66742149,"05",31916435,true,1,[['+','-','V5X8Y5QHVS','translocation','TJJCWQ6K6J',],]],["SAMPLE3","07",135644313,"02",116748248,false,0,[['-','-','SOA8DC1SVF','translocation','UGR3O3UQS3',],]],["SAMPLE3","06",6037836,"20",34855497,false,0,[['-','-','F5J3QLOZ5I','inversion','KEHLYR1QQS',],]],["SAMPLE3","06",109724564,"13",106387943,false,0,[['-','+','E44HKKEN06','tandem_duplication','FUJKDGDW5K',],]],["SAMPLE3","21",21329746,"18",49132777,false,0,[['-','+','T456SI8NFE','tandem_duplication','Z3JQJDLZ5Q',],]],["SAMPLE3","09",79484145,"21",48499740,false,0,[['-','+','U985JNNU2W','translocation','BEW4LC26A9',],]],["SAMPLE3","10",122930352,"21",22765050,false,0,[['-','+','JPUS6N5749','deletion','46NNN0OFRV',],]],["SAMPLE3","23",30102935,"16",20945220,false,0,[['-','+','EUAXA4NFHN','translocation','WX0R8IGEK7',],]],["SAMPLE3","06",88998071,"06",88999025,true,1,[['+','-','523QAD1C8I','inversion','523QAD1C8I',],]],["SAMPLE3","06",134692916,"05",59279632,false,0,[['-','-','LUJESA5CAC','tandem_duplication','QVH5C6GNQK',],]],["SAMPLE3","03",18658364,"03",18658859,true,1,[['-','-','76CX2VBN92','deletion','76CX2VBN92',],]],["SAMPLE3","05",58073561,"06",113049570,false,0,[['-','+','PHN2WTGOLS','inversion','XQY7GCETVS',],]],["SAMPLE3","21",12753561,"09",93983219,false,0,[['-','+','7LYZCPRWQE','tandem_duplication','OWWS9EYKPA',],]],["SAMPLE3","09",127888623,"09",127889381,true,1,[['-','-','1V92D2XBKB','tandem_duplication','1V92D2XBKB',],]],["SAMPLE4","05",170379443,"16",80831681,false,0,[['-','-','7XL15GMBTG','deletion','LEEM78T94A',],]],["SAMPLE4","08",1133301,"06",134732389,false,0,[['+','-','XVL9G2Y5X9','tandem_duplication','AUGJHPYY5R',],]],["SAMPLE4","07",77149226,"15",26753461,false,0,[['-','+','5NKT2ASPG3','tandem_duplication','H0Y20DBD1E',],]],["SAMPLE4","06",16278731,"09",83172731,false,0,[['-','+','YZ6WS39WMB','translocation','93AESRZLEE',],]],["SAMPLE4","10",83471004,"13",85966489,false,0,[['+','+','M4DTGT0ML5','inversion','L7M0UDTPQ5',],]],["SAMPLE4","04",20810285,"21",7340004,false,0,[['+','+','JAUV7W6UKT','tandem_duplication','71MB9E5TTO',],]],["SAMPLE4","06",150114646,"23",3930914,false,0,[['-','+','QM0BXA34DC','translocation','NSOMTTCSG2',],]],["SAMPLE5","20",3692977,"20",44510875,true,1,[['+','-','7SBB6O5SCF','tandem_duplication','RV1LGQXB9D',],]],["SAMPLE5","17",17920148,"22",144608009,false,0,[['+','+','FLPJ3LKYEK','inversion','TNFICY6HOP',],]],["SAMPLE5","03",149672094,"02",185716105,false,0,[['+','+','MLKJP6DHMF','inversion','FU23DJ4Q20',],]],["SAMPLE5","14",30455273,"01",78238193,false,0,[['-','-','ERQ3B751EJ','translocation','SHU259UCN0',],]],["SAMPLE5","17",31707099,"01",187464066,false,0,[['-','+','2KCD4ABQKF','deletion','3BBXNLV4L0',],]],["SAMPLE5","22",13113310,"21",22014231,false,0,[['-','-','8TCTGP98KC','tandem_duplication','EJWJPOI28R',],]],["SAMPLE5","07",43600568,"10",4511056,false,0,[['-','-','ZAR4QCMZQC','deletion','CLQE7SHAC0',],]],["SAMPLE5","06",121989817,"07",145405637,false,0,[['+','+','Y3ZK0NSAAI','translocation','X0ACLQM3T6',],]],["SAMPLE5","15",67070418,"02",1508171,false,0,[['+','+','K5OMKPB6X1','translocation','2PL9Y1IHDT',],]],["SAMPLE5","00",244043779,"00",71692260,true,1,[['+','+','EGRJWCKCR4','tandem_duplication','80UBEXTRIK',],]],["SAMPLE6","12",108406515,"03",103771354,false,0,[['-','-','7GO6H15CL3','tandem_duplication','D4MV8CVUMH',],]],["SAMPLE6","00",192482367,"16",39548764,false,0,[['-','-','7GFQ9EX33K','tandem_duplication','GBSS53RWD7',],]],["SAMPLE6","18",24395717,"02",10876086,false,0,[['-','-','40ZZ3JOOCL','tandem_duplication','G9R6FMQ0UX',],]],["SAMPLE6","03",174399989,"19",59075611,false,0,[['+','+','XO7PGNX7TR','inversion','P0AFN2SI82',],]],["SAMPLE6","06",7433935,"10",28020133,false,0,[['-','-','89X8VFQJCD','inversion','FI152UQ37C',],]],["SAMPLE6","06",30987719,"14",31607367,false,0,[['+','+','CL4XGDKUG0','tandem_duplication','1JIJ86YDS3',],]],["SAMPLE7","11",5808948,"00",126650799,false,0,[['+','+','9R3ZGE3IXH','inversion','DHHTZS0BXA',],]],["SAMPLE7","22",62416825,"08",103363021,false,0,[['+','-','HF1ETI110G','deletion','7AX4FKAKAK',],]],["SAMPLE7","21",49569332,"10",43957639,false,0,[['-','-','9L8Z8B3IMV','tandem_duplication','ZJGH7LM6AV',],]],["SAMPLE7","17",33987824,"08",20235198,false,0,[['-','+','AX3PXI48GR','tandem_duplication','8XM6N804SW',],]],["SAMPLE7","11",82038786,"03",188188728,false,0,[['-','+','8YJYOLTITN','deletion','S129U3CYCM',],]],["SAMPLE7","00",238731382,"04",147513508,false,0,[['+','+','GN5Z3BYX2X','tandem_duplication','XLUN7MJTAJ',],]],["SAMPLE7","18",30665368,"14",88366003,false,0,[['-','-','CT1IP0EUVH','deletion','GK7YOHPRXS',],]],["SAMPLE7","13",82447532,"20",15166596,false,0,[['-','-','MURBDM2A6G','deletion','496U6Z0SVN',],]],["SAMPLE7","20",17082231,"19",15076736,false,0,[['-','-','14AI31M02V','inversion','CO9P7G1IGG',],]],["SAMPLE7","00",139050751,"18",17400358,false,0,[['+','+','OPGCA72Z00','inversion','CAWBGB2XGN',],]],["SAMPLE8","06",95490728,"08",89410590,false,0,[['-','+','UJX2LBYPRZ','deletion','FYDK568GIN',],]],["SAMPLE8","09",21675120,"23",27300286,false,0,[['+','+','GO8C5MYWF9','tandem_duplication','WEK2P6N7A8',],]],["SAMPLE8","01",172625375,"02",140646175,false,0,[['-','+','EMJPDIYB8B','inversion','RIYAPG7Y85',],]],["SAMPLE8","08",1853842,"17",59233042,false,0,[['-','-','H52A5JY270','deletion','IEOOJSNII2',],]],["SAMPLE8","08",54636902,"13",55352858,false,0,[['+','+','MKR4ZN37FR','translocation','1UWZ33GM3B',],]],["SAMPLE8","07",21951154,"06",54405063,false,0,[['-','-','X0EYXQTYU2','translocation','MHS14HPP3R',],]],["SAMPLE8","14",42446898,"19",9996637,false,0,[['-','-','ATU9W7QOBH','tandem_duplication','UNHE56HB00',],]],["SAMPLE8","00",8928882,"23",33387475,false,0,[['+','-','NGMDE51OG3','inversion','LH7ZVFY9KG',],]],["SAMPLE8","15",32688406,"07",77568655,false,0,[['+','-','SCZE01KD0Z','inversion','QIS13ZEE2H',],]],["SAMPLE8","05",103119146,"05",939420,true,1,[['-','-','F6JNF1FF11','deletion','ZPU0C5WVUB',],]],["SAMPLE8","18",14532685,"09",6879161,false,0,[['+','+','4PSGVQVNXP','deletion','YB2O0CHDU4',],]],["SAMPLE9","05",22883110,"12",103743864,false,0,[['-','+','P0L7N6I28J','inversion','RE9I9P9P2B',],]],["SAMPLE9","03",170386551,"09",18115326,false,0,[['-','-','B2I9RFL1QS','translocation','7HK6HBA03P',],]],["SAMPLE9","12",1987292,"15",30986341,false,0,[['-','-','ZP6CM7GTIZ','tandem_duplication','20LWDLGBW9',],]],["SAMPLE9","14",98927733,"19",45592948,false,0,[['+','+','UXHC93P2H6','translocation','F7RNE23QBU',],]],["SAMPLE9","09",23863882,"04",171994772,false,0,[['+','+','ATLMZ8104J','inversion','GEEUZIZ38F',],]],["SAMPLE9","22",38494022,"07",41894232,false,0,[['-','+','LOFLF6ZT3A','translocation','FCB5OOKVCS',],]],["SAMPLE9","13",72225317,"12",80044106,false,0,[['-','+','JRKN4SU57O','tandem_duplication','ELNV107ABY',],]],["SAMPLE9","11",40058944,"00",248492226,false,0,[['-','+','X3ZE2O929G','deletion','PAJPAEH2O7',],]],["SAMPLE9","22",14558186,"14",22615302,false,0,[['-','-','W9F9D9M11L','inversion','6SRCV24HTA',],]],["SAMPLE9","09",59857362,"07",15918102,false,0,[['-','+','EX3SWZNHFF','tandem_duplication','GG53SLDQZQ',],]],];
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
    for (var i = 0; i < bundle_data_sv.genome_size.length; i++){
        var item_num = Math.floor(bundle_data_sv.genome_size[i].size/node_size) + 1;
        if (leveling == false) {
            item_num = item_num + 1;
        }
        for (var j = 0; j < item_num; j++){
            var start;
            if (leveling == true) {
                start = node_name(bundle_data_sv.genome_size[i].chr, j, true);
            }
            else {
                start = node_name(bundle_data_sv.genome_size[i].chr, j, false);
            }
            nodes.push({"start":start, "ends":[], "tooltip":[]});
        }
    }
    return nodes
};

function tooltip_partial(format, link) {
    
    var obj = {id: link[0], 
        chr1: bundle_data_sv.genome_size[Number(link[1])].label, 
        break1: link[2], 
        chr2: bundle_data_sv.genome_size[Number(link[3])].label, 
        break2: link[4], func: bundle_data_sv.group[link[6]].label};
        
    var tooltip = [];
    
    for (var p = 0; p < link[7].length; p++) {
        for (var p2 = 0; p2 < link[7][p].length; p2++) {
            obj[bundle_data_sv.link_header[p2]] = link[7][p][p2];
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

var create_bundle_dataset = function (ID, node_size, tooltip) {

    var each_dataset = [];
    for (var i = 0; i< bundle_data_sv.group.length; i++) {
        each_dataset[i] = create_blank_nodes(node_size);
    }
    
    for (var i = 0; i < bundle_data_sv.links.length; i++) {
        if (bundle_data_sv.links[i][0] != ID) {
            continue;
        }
        
        var start = node_name(bundle_data_sv.links[i][1], Math.floor(bundle_data_sv.links[i][2]/node_size));
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
        var end_pos = Math.floor(bundle_data_sv.links[i][4]/node_size);
        var end = node_name(bundle_data_sv.links[i][3], end_pos);
        // if same position, sift end position.
        if (start == end) {
            if (end_pos == Math.floor(bundle_data_sv.genome_size[Number(bundle_data_sv.links[i][3])].size/node_size)) {
                end = node_name(bundle_data_sv.links[i][3], end_pos - 1);
            }
            else {
                end = node_name(bundle_data_sv.links[i][3], end_pos + 1);
            }
        }
        
        var group = bundle_data_sv.links[i][6];
        each_dataset[group][index].ends.push(end);
        
        // tooltip
        if (tooltip == true) {
            each_dataset[group][index].tooltip.push(tooltip_partial(bundle_data_sv.tooltip_format.bundle, bundle_data_sv.links[i]));
        }
    }
    
    return each_dataset;
};

bundle_data_sv.get_data_thumb = function (ID) {
    return create_bundle_dataset(ID, bundle_data_sv.node_size_thumb, false);
};

bundle_data_sv.get_arc_data_thumb = function () {
    return create_blank_nodes(bundle_data_sv.node_size_thumb, true);
};

bundle_data_sv.get_data_detail = function (ID) {
    return create_bundle_dataset(ID, bundle_data_sv.node_size_detail, true);
};

bundle_data_sv.get_arc_data_detail = function (ID) {
    return create_blank_nodes(bundle_data_sv.node_size_detail, true);
};

var key_to_index = function (list, key) {
    
    for (var i = 0; i < list.length; i++) {
        if (list[i] == key) {
            return i
        }
    }
    return -1;
};

bundle_data_sv.get_select = function () {
    var node_size = bundle_data_sv.node_size_select;
    
    var link = [];
    for (var i = 0; i< bundle_data_sv.group.length; i++) {
        link[i] = {};
    }
    for (var i = 0; i < bundle_data_sv.links.length; i++) {
        
        var bp1 = node_name(bundle_data_sv.links[i][1], Math.floor(bundle_data_sv.links[i][2]/node_size), true);
        var bp2 = node_name(bundle_data_sv.links[i][3], Math.floor(bundle_data_sv.links[i][4]/node_size), true);
        
        var group = bundle_data_sv.links[i][6];
        
        // add bp1
        if (link[group][bp1] == undefined) {
            link[group][bp1] = [];
        }
        link[group][bp1].push(bundle_data_sv.links[i][0]);
        
        // add bp2
        if (bp1 != bp2) {
            if (link[group][bp2] == undefined) {
                link[group][bp2] = [];
            }
            link[group][bp2].push(bundle_data_sv.links[i][0]);
        }
    }
    
    var item = [];
    var value = [];
    var key = [];
    for (var g = 0; g < bundle_data_sv.group.length; g++) {
        item[g] = [];
        value[g] = [];
        key[g] = [];
        for (var i in link[g]) {
            // delete duplication
            var sort = link[g][i].filter(function (x, y, self) {
                return self.indexOf(x) === y;
             });
            //item[g][i] = sort;
            value[g].push(link[g][i].length);
            key[g].push(i);
            item[g].push(sort);
        }
    }
    
    var all_key = [];
    var c = 0;
    for (var i = 0; i < bundle_data_sv.genome_size.length; i++){
        var item_num = Math.floor(bundle_data_sv.genome_size[i].size/node_size) + 1;
        for (var j = 0; j < item_num; j++){
            all_key[c] = node_name(bundle_data_sv.genome_size[i].chr, j, true);
            c++;
        }
    }
    
    return {value:value, key:key, item:item, all_key:all_key};
};
})();
Object.freeze(bundle_data_sv);

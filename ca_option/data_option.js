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
ca_data.group = [{"name":"outer", "label":"Inter-chromosome", "color":"#9E4A98" },{"name":"inner", "label":"Intra-chromosome", "color":"#51BF69" }];
ca_data.tooltip_format = { bundle:{format:[[{label:'[',type:'fix',keys:[],ext:''},{label:'{chr1}',type:'str',keys:['chr1',],ext:''},{label:'] ',type:'fix',keys:[],ext:''},{label:'{break1}',type:'numeric',keys:['break1',],ext:','},{label:' (',type:'fix',keys:[],ext:''},{label:'{dir1}',type:'str',keys:['dir1',],ext:''},{label:') ',type:'fix',keys:[],ext:''},{label:'{gene_name1}',type:'str',keys:['gene_name1',],ext:''},{label:'; [',type:'fix',keys:[],ext:''},{label:'{chr2}',type:'str',keys:['chr2',],ext:''},{label:'] ',type:'fix',keys:[],ext:''},{label:'{break2}',type:'numeric',keys:['break2',],ext:','},{label:' (',type:'fix',keys:[],ext:''},{label:'{dir2}',type:'str',keys:['dir2',],ext:''},{label:') ',type:'fix',keys:[],ext:''},{label:'{gene_name2}',type:'str',keys:['gene_name2',],ext:''},{label:'; ',type:'fix',keys:[],ext:''},{label:'{type}',type:'str',keys:['type',],ext:''},],], keys: '{break1} {break2} {chr1} {chr2} {dir1} {dir2} {gene_name1} {gene_name2} {type} '}, };
ca_data.link_header = ['dir1','dir2','gene_name1','gene_name2','type',];
// 0:ID, 1:chr1, 2:break1, 3:chr2, 4:break2, 5:is_outer, 6:group_id, 7:tooltip_data
ca_data.links = [["SAMPLE1","13",16019088,"11",62784483,false,0,[['-','+','LS7T1EG444','4GRRIO5AVR','deletion',],]],["SAMPLE1","08",99412502,"06",129302434,false,0,[['-','+','FQFW16UF5U','QP779MLPNV','translocation',],]],["SAMPLE1","12",84663781,"17",52991509,false,0,[['+','-','Q9VX1I9U3I','7XM09ETN40','deletion',],]],["SAMPLE1","00",153160367,"21",33751554,false,0,[['+','+','CEE2SPV1R1','PVYYQIVS8G','inversion',],]],["SAMPLE1","17",12249358,"02",146222593,false,0,[['-','+','HH9OL7CK6G','XD80LI4E6Q','translocation',],]],["SAMPLE1","20",8658030,"22",133492043,false,0,[['+','-','I20EVP15ZM','WPE8O5H237','tandem_duplication',],]],["SAMPLE1","11",120178477,"00",155354923,false,0,[['+','-','IMYXD3TCA4','3MNN5J0MDN','deletion',],]],["SAMPLE2","10",101374238,"21",26701405,false,0,[['+','+','FZ7LOS66RD','9WYBJR57E0','translocation',],]],["SAMPLE2","01",121708638,"06",137424167,false,0,[['-','-','5655M5E46B','HB14VJXDHV','translocation',],]],["SAMPLE2","15",43027789,"21",23791492,false,0,[['+','-','REFSIL0H2M','L5EA31R8U0','inversion',],]],["SAMPLE2","18",3862589,"15",37135239,false,0,[['-','+','1IRWHVZLH8','6FUR9YMZOH','deletion',],]],["SAMPLE2","19",50294222,"00",164250235,false,0,[['+','-','DOH5G0YRQ9','9TWYMR5CZ2','inversion',],]],["SAMPLE2","22",67392415,"14",3327412,false,0,[['+','+','EM36MRX9B3','G4FPLN527D','translocation',],]],["SAMPLE3","21",34268355,"09",19871820,false,0,[['+','+','9SVRQCFVCO','2BEWSO91FZ','tandem_duplication',],]],["SAMPLE3","01",51849987,"19",47304716,false,0,[['-','+','9HK7LTVZST','DNCS44WCW0','inversion',],]],["SAMPLE3","05",66742149,"05",31916435,true,1,[['-','+','TJJCWQ6K6J','V5X8Y5QHVS','translocation',],]],["SAMPLE4","07",135644313,"02",116748248,false,0,[['-','-','UGR3O3UQS3','SOA8DC1SVF','translocation',],]],["SAMPLE4","06",6037836,"20",34855497,false,0,[['-','-','KEHLYR1QQS','F5J3QLOZ5I','inversion',],]],["SAMPLE4","06",109724564,"13",106387943,false,0,[['+','-','FUJKDGDW5K','E44HKKEN06','tandem_duplication',],]],["SAMPLE4","21",21329746,"18",49132777,false,0,[['+','-','Z3JQJDLZ5Q','T456SI8NFE','tandem_duplication',],]],["SAMPLE4","09",79484145,"21",48499740,false,0,[['+','-','BEW4LC26A9','U985JNNU2W','translocation',],]],["SAMPLE4","09",79484145,"16",20945220,false,0,[['+','-','BEW4LC26A9','U985JNNU2W','translocation',],]],["SAMPLE4","10",122930352,"21",22765050,false,0,[['+','-','46NNN0OFRV','JPUS6N5749','deletion',],]],["SAMPLE4","23",30102935,"16",20945220,false,0,[['+','-','WX0R8IGEK7','EUAXA4NFHN','translocation',],]],["SAMPLE4","06",88998071,"06",88999025,true,1,[['-','+','523QAD1C8I','523QAD1C8I','inversion',],]],["SAMPLE4","06",134692916,"05",59279632,false,0,[['-','-','QVH5C6GNQK','LUJESA5CAC','tandem_duplication',],]],["SAMPLE4","03",18658364,"03",18658859,true,1,[['-','-','76CX2VBN92','76CX2VBN92','deletion',],]],["SAMPLE4","05",58073561,"06",113049570,false,0,[['+','-','XQY7GCETVS','PHN2WTGOLS','inversion',],]],["SAMPLE4","21",12753561,"09",93983219,false,0,[['+','-','OWWS9EYKPA','7LYZCPRWQE','tandem_duplication',],]],["SAMPLE4","09",127888623,"09",127889381,true,1,[['-','-','1V92D2XBKB','1V92D2XBKB','tandem_duplication',],]],["SAMPLE5","05",170379443,"16",80831681,false,0,[['-','-','LEEM78T94A','7XL15GMBTG','deletion',],]],["SAMPLE5","08",1133301,"06",134732389,false,0,[['-','+','AUGJHPYY5R','XVL9G2Y5X9','tandem_duplication',],]],["SAMPLE5","07",77149226,"15",26753461,false,0,[['+','-','H0Y20DBD1E','5NKT2ASPG3','tandem_duplication',],]],["SAMPLE5","06",16278731,"09",83172731,false,0,[['+','-','93AESRZLEE','YZ6WS39WMB','translocation',],]],["SAMPLE5","10",83471004,"13",85966489,false,0,[['+','+','L7M0UDTPQ5','M4DTGT0ML5','inversion',],]],["SAMPLE5","04",20810285,"21",7340004,false,0,[['+','+','71MB9E5TTO','JAUV7W6UKT','tandem_duplication',],]],["SAMPLE5","06",150114646,"23",3930914,false,0,[['+','-','NSOMTTCSG2','QM0BXA34DC','translocation',],]],["SAMPLE6","20",3692977,"20",44510875,true,1,[['-','+','RV1LGQXB9D','7SBB6O5SCF','tandem_duplication',],]],["SAMPLE6","17",17920148,"22",144608009,false,0,[['+','+','TNFICY6HOP','FLPJ3LKYEK','inversion',],]],["SAMPLE6","03",149672094,"02",185716105,false,0,[['+','+','FU23DJ4Q20','MLKJP6DHMF','inversion',],]],["SAMPLE6","14",30455273,"01",78238193,false,0,[['-','-','SHU259UCN0','ERQ3B751EJ','translocation',],]],["SAMPLE6","17",31707099,"01",187464066,false,0,[['+','-','3BBXNLV4L0','2KCD4ABQKF','deletion',],]],["SAMPLE6","22",13113310,"21",22014231,false,0,[['-','-','EJWJPOI28R','8TCTGP98KC','tandem_duplication',],]],["SAMPLE6","07",43600568,"10",4511056,false,0,[['-','-','CLQE7SHAC0','ZAR4QCMZQC','deletion',],]],["SAMPLE6","06",121989817,"07",145405637,false,0,[['+','+','X0ACLQM3T6','Y3ZK0NSAAI','translocation',],]],["SAMPLE6","15",67070418,"02",1508171,false,0,[['+','+','2PL9Y1IHDT','K5OMKPB6X1','translocation',],]],["SAMPLE6","00",244043779,"00",71692260,true,1,[['+','+','80UBEXTRIK','EGRJWCKCR4','tandem_duplication',],]],["SAMPLE7","12",108406515,"03",103771354,false,0,[['-','-','D4MV8CVUMH','7GO6H15CL3','tandem_duplication',],]],["SAMPLE7","00",192482367,"16",39548764,false,0,[['-','-','GBSS53RWD7','7GFQ9EX33K','tandem_duplication',],]],["SAMPLE7","18",24395717,"02",10876086,false,0,[['-','-','G9R6FMQ0UX','40ZZ3JOOCL','tandem_duplication',],]],["SAMPLE7","03",174399989,"19",59075611,false,0,[['+','+','P0AFN2SI82','XO7PGNX7TR','inversion',],]],["SAMPLE7","06",7433935,"10",28020133,false,0,[['-','-','FI152UQ37C','89X8VFQJCD','inversion',],]],["SAMPLE7","06",30987719,"14",31607367,false,0,[['+','+','1JIJ86YDS3','CL4XGDKUG0','tandem_duplication',],]],["SAMPLE8","11",5808948,"00",126650799,false,0,[['+','+','DHHTZS0BXA','9R3ZGE3IXH','inversion',],]],["SAMPLE8","22",62416825,"08",103363021,false,0,[['-','+','7AX4FKAKAK','HF1ETI110G','deletion',],]],["SAMPLE8","21",49569332,"10",43957639,false,0,[['-','-','ZJGH7LM6AV','9L8Z8B3IMV','tandem_duplication',],]],["SAMPLE8","17",33987824,"08",20235198,false,0,[['+','-','8XM6N804SW','AX3PXI48GR','tandem_duplication',],]],["SAMPLE8","11",82038786,"03",188188728,false,0,[['+','-','S129U3CYCM','8YJYOLTITN','deletion',],]],["SAMPLE8","00",238731382,"04",147513508,false,0,[['+','+','XLUN7MJTAJ','GN5Z3BYX2X','tandem_duplication',],]],["SAMPLE8","18",30665368,"14",88366003,false,0,[['-','-','GK7YOHPRXS','CT1IP0EUVH','deletion',],]],["SAMPLE8","13",82447532,"20",15166596,false,0,[['-','-','496U6Z0SVN','MURBDM2A6G','deletion',],]],["SAMPLE8","20",17082231,"19",15076736,false,0,[['-','-','CO9P7G1IGG','14AI31M02V','inversion',],]],["SAMPLE8","00",139050751,"18",17400358,false,0,[['+','+','CAWBGB2XGN','OPGCA72Z00','inversion',],]],["SAMPLE9","06",95490728,"08",89410590,false,0,[['+','-','FYDK568GIN','UJX2LBYPRZ','deletion',],]],["SAMPLE9","09",21675120,"23",27300286,false,0,[['+','+','WEK2P6N7A8','GO8C5MYWF9','tandem_duplication',],]],["SAMPLE9","01",172625375,"02",140646175,false,0,[['+','-','RIYAPG7Y85','EMJPDIYB8B','inversion',],]],["SAMPLE9","08",1853842,"17",59233042,false,0,[['-','-','IEOOJSNII2','H52A5JY270','deletion',],]],["SAMPLE9","08",54636902,"13",55352858,false,0,[['+','+','1UWZ33GM3B','MKR4ZN37FR','translocation',],]],["SAMPLE9","07",21951154,"06",54405063,false,0,[['-','-','MHS14HPP3R','X0EYXQTYU2','translocation',],]],["SAMPLE9","14",42446898,"19",9996637,false,0,[['-','-','UNHE56HB00','ATU9W7QOBH','tandem_duplication',],]],["SAMPLE9","00",8928882,"23",33387475,false,0,[['-','+','LH7ZVFY9KG','NGMDE51OG3','inversion',],]],["SAMPLE9","15",32688406,"07",77568655,false,0,[['-','+','QIS13ZEE2H','SCZE01KD0Z','inversion',],]],["SAMPLE9","05",103119146,"05",939420,true,1,[['-','-','ZPU0C5WVUB','F6JNF1FF11','deletion',],]],["SAMPLE9","18",14532685,"09",6879161,false,0,[['+','+','YB2O0CHDU4','4PSGVQVNXP','deletion',],]],["SAMPLE10","05",22883110,"12",103743864,false,0,[['+','-','RE9I9P9P2B','P0L7N6I28J','inversion',],]],["SAMPLE10","03",170386551,"09",18115326,false,0,[['-','-','7HK6HBA03P','B2I9RFL1QS','translocation',],]],["SAMPLE10","12",1987292,"15",30986341,false,0,[['-','-','20LWDLGBW9','ZP6CM7GTIZ','tandem_duplication',],]],["SAMPLE10","14",98927733,"19",45592948,false,0,[['+','+','F7RNE23QBU','UXHC93P2H6','translocation',],]],["SAMPLE10","09",23863882,"04",171994772,false,0,[['+','+','GEEUZIZ38F','ATLMZ8104J','inversion',],]],["SAMPLE10","22",38494022,"07",41894232,false,0,[['+','-','FCB5OOKVCS','LOFLF6ZT3A','translocation',],]],["SAMPLE10","13",72225317,"12",80044106,false,0,[['+','-','ELNV107ABY','JRKN4SU57O','tandem_duplication',],]],["SAMPLE10","11",40058944,"00",248492226,false,0,[['+','-','PAJPAEH2O7','X3ZE2O929G','deletion',],]],["SAMPLE10","22",14558186,"14",22615302,false,0,[['-','-','6SRCV24HTA','W9F9D9M11L','inversion',],]],["SAMPLE10","09",59857362,"07",15918102,false,0,[['+','-','GG53SLDQZQ','EX3SWZNHFF','tandem_duplication',],]],];
ca_data.select_value = [[1,1,1,1,1,1,1,2,2,1,2,1,2,1,1,1,2,1,1,1,1,1,2,1,1,1,1,1,1,2,1,1,2,1,1,1,1,1,2,1,2,1,1,1,4,1,2,1,1,1,1,1,1,1,1,2,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2,1,1,2,2,1,1,1,2,1,1,1,1,1,1,2,1,1,1,2,1,1,1,1,1,1,1,1,1,1,1,1,1,2,1,1,1,2,1,1,1,1,1,1,1,1,1,2,1],[1,1,1,1,1,1,1,1,1,1,1],];
ca_data.select_key = [[[17,10],[17,11],[19,10],[19,11],[8,20],[22,7],[14,17],[3,34],[22,2],[3,37],[9,4],[9,1],[9,3],[14,19],[17,3],[17,2],[17,6],[19,3],[8,19],[19,1],[7,4],[8,10],[19,9],[8,17],[10,16],[2,0],[3,29],[3,20],[14,4],[14,6],[14,0],[4,34],[7,15],[14,8],[0,38],[0,32],[0,30],[0,31],[21,9],[8,4],[8,0],[21,1],[21,2],[21,5],[21,4],[1,10],[21,6],[10,5],[13,17],[10,0],[12,0],[10,8],[13,11],[0,49],[4,29],[7,8],[2,2],[1,37],[0,47],[7,3],[0,25],[0,27],[13,21],[6,30],[18,4],[18,6],[18,0],[18,3],[18,2],[16,16],[13,14],[13,16],[10,24],[1,34],[11,24],[10,20],[6,21],[6,22],[6,25],[6,24],[6,27],[6,26],[7,27],[4,4],[12,16],[15,6],[7,29],[0,1],[15,13],[16,4],[16,7],[11,16],[1,24],[11,12],[13,3],[6,10],[5,11],[6,19],[23,0],[23,5],[23,6],[15,7],[2,37],[15,5],[15,8],[11,1],[11,8],[6,3],[5,4],[20,1],[1,15],[6,6],[22,28],[22,26],[20,3],[2,23],[2,29],[2,28],[6,1],[18,9],[20,6],[22,13],[5,34],[12,21],[12,20],[9,18],[9,16],[22,12],[9,15],[9,11]],[[20,0],[5,13],[20,8],[0,14],[0,48],[9,25],[5,6],[3,3],[5,0],[6,17],[5,20]],];
ca_data.select_item = [[[0],[9],[2],[7],[8],[1],[8],[1,7],[1,6],[8],[1,9],[9],[1,3],[1],[6],[0],[6,8],[8],[0],[9],[9],[9],[1,3],[9],[5],[6],[6],[7],[1],[6,7],[2],[1],[5,9],[9],[7],[2],[0],[0],[4,8],[8],[5,9],[5],[4],[2],[2,4,6],[3],[0,3],[7],[5],[6],[1],[8],[9],[1],[8],[1,6],[7],[6],[8],[1],[8],[8],[4],[5],[7],[8],[2],[8],[9],[5],[1],[8],[4],[9],[0],[2],[4],[4],[0],[6],[2],[4,5],[4],[5],[0,1],[1,9],[6],[9],[6],[4],[7],[8],[2],[0],[0],[9],[4],[9],[5],[9],[4,9],[2],[6],[5],[2],[8],[1],[5],[1],[0],[6],[7],[6],[0],[8],[4],[0],[9],[4,7],[4],[4],[2],[5],[7],[1],[4],[5],[8],[4],[1]],[[6],[3],[6],[6],[6],[4],[3],[4],[9],[4],[9]],];

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
    for (var i = 0; i< ca_data.group.length; i++) {
        each_dataset[i] = create_blank_nodes(node_size);
    }
    
    for (var i = 0; i < ca_data.links.length; i++) {
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
    
    var key = [];
    for (var i = 0; i < ca_data.select_key.length; i++) {
        key[i] = [];
        for (var j = 0; j < ca_data.select_key[i].length; j++) {
            key[i][j] = node_name(("0" + ca_data.select_key[i][j][0]).substr(-2), ("0" + ca_data.select_key[i][j][1]).substr(-2), true);
        }
    }
    
    var item = [];
    for (var i = 0; i < ca_data.select_item.length; i++) {
        item[i] = [];
        for (var j = 0; j < ca_data.select_item[i].length; j++) {
            item[i][j] = [];
            for (var k = 0; k < ca_data.select_item[i][j].length; k++) {
                item[i][j][k] = ca_data.index_ID[ca_data.select_item[i][j][k]];
            }
        }
    }
    
    var all_key = [];
    var c = 0;
    for (var i = 0; i < ca_data.genome_size.length; i++){
        var item_num = Math.floor(ca_data.genome_size[i].size/node_size) + 1;
        for (var j = 0; j < item_num; j++){
            all_key[c] = node_name(ca_data.genome_size[i].chr, j, true);
            c++;
        }
    }
    
    return {value:ca_data.select_value, key:key, item:item, all_key:all_key};
};
})();
Object.freeze(ca_data);

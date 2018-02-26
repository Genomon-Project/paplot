const assert = require('power-assert');

require('../src/style/default.js');
require('../src/js/utils.js');
require('../src/js/legend.js');
require('../src/js/downloader.js');
require('../src/js/bar.js');
require('../src/js/bundle.js');
require('../src/js/checker.js');
require('../src/js/pmsignature.js');

require('../src/html/data_qc.js');
require('../src/html/data_mutation.js');
require('../src/html/data_ca.js');
require('../src/html/data_signature2.js');
require('../src/html/data_pmsignature2.js');

(function() {
    test_jsdom = {};

    test_jsdom.run = function() {
    
        describe( 'Tests pass through use jsdom...', function () {

            beforeEach(() => {
                var jsdom = require('jsdom');

                global.document = jsdom.jsdom('<html><body></body></html>')
                global.window = document.defaultView;
                global.navigator = window.navigator;
                global.location = window.location;
            });
            afterEach(() => {
                delete global.document;
                delete global.window;
                delete global.navigator;
                delete global.location;

                delete require.cache[require.resolve('../src/lib/d3_v3.5.13/d3.min.js')];
                delete require.cache[require.resolve('../src/lib/d3-legend_v1.10.0/d3-legend.min.js')];
            });

            it("QC init", () => {

                global.document.body.innerHTML =`
                    <select id="sort_list" style="margin-left:10"></select>
                    <input type="button" value="Sort" onclick="qc_draw.click_sort()">
                    <input type="button" value="Reset" onclick="qc_draw.click_reset()">
                    <button type="button" onclick="qc_draw.push_export()" id="dw_btn" style="margin-bottom: 20px;"></button><div id="btn"></div>
                    <div id='legend_chart_brush_svg'></div><div id='chart_brush'></div>
                    <div id='legend_chart_1_svg'></div><div id='chart_1'></div>
                    <div id='legend_chart_2_svg'></div><div id='chart_2'></div>
                    <div id="tooltip" class="hidden"></div>
                    <canvas id="dw_canvas" class="hidden"></canvas>
                `;

                d3 = require('../src/lib/d3_v3.5.13/d3.min.js');
                require('../src/lib/d3-legend_v1.10.0/d3-legend.min.js');
                require('../src/js/graph_qc.js')

                qc_draw.add_div('chart_brush');
                qc_draw.divs[0].obj.bar_selected = function(key, on) { qc_draw.chart_selected(key, on); }
                qc_draw.divs[0].obj.brushed = function(data, range) { qc_draw.chart_brushed(data, range); }
                qc_draw.add_div('chart_1');
                qc_draw.divs[1].obj.bar_selected = function(key, on) { qc_draw.chart_selected(key, on); }
                qc_draw.add_div('chart_2');
                qc_draw.divs[2].obj.bar_selected = function(key, on) { qc_draw.chart_selected(key, on); }
                qc_draw.init();
                qc_draw.click_sort();
                qc_draw.click_reset();
                qc_draw.push_export();
                qc_draw.selection_reset();

                assert.equal(0,0)
            });

            it("CA init", () => {

                global.document.body.innerHTML =`
                    <input type="radio" name="q2" value="hilight" onclick="ca_draw.thumb_reset()" checked> Highlight
                    <input type="radio" name="q2" value="hide" onclick="ca_draw.thumb_reset()"> Hide
                    <input type="button" value="Reset" onclick="ca_draw.thumb_reset()">
                    <button type="button" onclick="ca_draw.push_export()" id="dw_btn" style="margin-bottom: 20px;"></button><div id="btn"></div>
                    <div id='legend_html'></div><div id='legend_svg'></div>
                    <div id="selector"></div>
                    <ul>
                    <li class="thumb" id="thumb0_li"><strong>SAMPLE1<br></strong><div id="thumb0" onclick="ca_draw.show_float(event,'0','SAMPLE1')"></div></li>
                    <li class="thumb" id="thumb1_li"><strong>SAMPLE10<br></strong><div id="thumb1" onclick="ca_draw.show_float(event,'1','SAMPLE10')"></div></li>
                    <li class="thumb" id="thumb2_li"><strong>SAMPLE2<br></strong><div id="thumb2" onclick="ca_draw.show_float(event,'2','SAMPLE2')"></div></li>
                    <li class="thumb" id="thumb3_li"><strong>SAMPLE3<br></strong><div id="thumb3" onclick="ca_draw.show_float(event,'3','SAMPLE3')"></div></li>
                    </ul>
                    <div class="float_frame" id="float0"><table><tr><td class="float_header" id="float0_t"><strong>SAMPLE1</strong></td><td><input type="button" value="X" onclick="ca_draw.hide_float('#float0')" margin="0"></td></tr><tr><td colspan="2" class="float_svg" id="map0"></td></tr></table><div class="float_handle" id="float0_h" onmousedown="ca_draw.mouse_down(event, '#float0')" onmousemove="ca_draw.mouse_move(event, '#float0')" onmouseup="ca_draw.mouse_up(event, '#float0')" onmouseout="ca_draw.mouse_out('#float0')"></div></div>
                    <div class="float_frame" id="float1"><table><tr><td class="float_header" id="float1_t"><strong>SAMPLE10</strong></td><td><input type="button" value="X" onclick="ca_draw.hide_float('#float1')" margin="0"></td></tr><tr><td colspan="2" class="float_svg" id="map1"></td></tr></table><div class="float_handle" id="float1_h" onmousedown="ca_draw.mouse_down(event, '#float1')" onmousemove="ca_draw.mouse_move(event, '#float1')" onmouseup="ca_draw.mouse_up(event, '#float1')" onmouseout="ca_draw.mouse_out('#float1')"></div></div>
                    <div class="float_frame" id="float2"><table><tr><td class="float_header" id="float2_t"><strong>SAMPLE2</strong></td><td><input type="button" value="X" onclick="ca_draw.hide_float('#float2')" margin="0"></td></tr><tr><td colspan="2" class="float_svg" id="map2"></td></tr></table><div class="float_handle" id="float2_h" onmousedown="ca_draw.mouse_down(event, '#float2')" onmousemove="ca_draw.mouse_move(event, '#float2')" onmouseup="ca_draw.mouse_up(event, '#float2')" onmouseout="ca_draw.mouse_out('#float2')"></div></div>
                    <div class="float_frame" id="float3"><table><tr><td class="float_header" id="float3_t"><strong>SAMPLE3</strong></td><td><input type="button" value="X" onclick="ca_draw.hide_float('#float3')" margin="0"></td></tr><tr><td colspan="2" class="float_svg" id="map3"></td></tr></table><div class="float_handle" id="float3_h" onmousedown="ca_draw.mouse_down(event, '#float3')" onmousemove="ca_draw.mouse_move(event, '#float3')" onmouseup="ca_draw.mouse_up(event, '#float3')" onmouseout="ca_draw.mouse_out('#float3')"></div></div>
                    <div id="tooltip" class="hidden"></div>
                    <canvas id="dw_canvas" class="hidden"></canvas>
                `;

                d3 = require('../src/lib/d3_v3.5.13/d3.min.js');
                require('../src/lib/d3-legend_v1.10.0/d3-legend.min.js');
                require('../src/js/graph_ca.js')

                ca_draw.draw_select();

                ca_draw.draw_bandle_thumb("0", "SAMPLE1");
                ca_draw.draw_bandle_thumb("1", "SAMPLE10");
                ca_draw.draw_bandle_thumb("2", "SAMPLE2");
                ca_draw.draw_bandle_thumb("3", "SAMPLE3");


                var event = { 
                    screenX: 0, 
                    screenY: 0, 
                    target: {tagName: "svg"}
                };
                ca_draw.show_float(event,'0','SAMPLE1');
                ca_draw.mouse_down(event, '#float0');
                ca_draw.mouse_move(event, '#float0');
                ca_draw.mouse_up(event, '#float0');
                ca_draw.mouse_out('#float0');
                ca_draw.thumb_reset();
                ca_draw.hide_float('#float0');

                ca_draw.push_export();

                assert.equal(0,0)
            });

            it("signature init", () => {

                global.document.body.innerHTML =`
                    <div class="container">

                    <button type="button" onclick="sig_draw.push_export()" id="dw_btn" style="margin-bottom: 20px;"></button><div id="btn"></div>
                    <div style='float: left;' id='div_pm0'></div>
                    <div style='float: left;' id='div_pm1'></div>

                    <div style="float: left;" id="div_rate"></div>
                    <div style="float: left;" id='div_rate_legend_html'></div>
                    <div style="float: left;" id='div_rate_legend_svg'></div>
                    <div style="float: left;" id="div_integral"></div>
                    <div style="float: left;" id='div_integral_legend_html'></div>
                    <div style="float: left;" id='div_integral_legend_svg'></div>
                    <select id="chart_mode"></select></p>
                    <select id="chart_sort"></select></p>
                    </div>

                    <div id="tooltip" class="hidden"></div>
                    <div id="spin" class="hidden"></div>
                    <canvas id="dw_canvas" class="hidden"></canvas>
                `;

                d3 = require('../src/lib/d3_v3.5.13/d3.min.js');
                require('../src/lib/d3-legend_v1.10.0/d3-legend.min.js');
                require('../src/js/graph_signature.js')

                sig_draw.add_div('div_pm0');
                sig_draw.add_div('div_pm1');
                sig_draw.init();
                sig_draw.push_export();

                assert.equal(0,0)
            });

            it("pmsignature init", () => {

                global.document.body.innerHTML =`
                    <div class="container">
                    <button type="button" onclick="msig_draw.push_export()" id="dw_btn" style="margin-bottom: 20px;"></button><div id="btn"></div>
                    <div style='float: left;' id='div_pm0'></div>

                    <div style="float: left;" id="div_rate"></div>
                    <div style="float: left;" id='div_rate_legend_html'></div>
                    <div style="float: left;" id='div_rate_legend_svg'></div>
                    <div style="float: left;" id="div_integral"></div>
                    <div style="float: left;" id='div_integral_legend_html'></div>
                    <div style="float: left;" id='div_integral_legend_svg'></div>
                    <select id="chart_mode"></select></p>
                    <select id="chart_sort"></select></p>
                    </div>

                    <div id="tooltip" class="hidden"></div>
                    <div id="spin" class="hidden"></div>
                    <canvas id="dw_canvas" class="hidden"></canvas>
                `;

                d3 = require('../src/lib/d3_v3.5.13/d3.min.js');
                require('../src/lib/d3-legend_v1.10.0/d3-legend.min.js');
                require('../src/js/graph_pmsignature.js')

                msig_draw.add_div('div_pm0');
                msig_draw.init();
                msig_draw.push_export();
                var btn_svg = document.getElementById("save_svg");
                btn_svg.click();
                var btn_png = document.getElementById("save_svg");
                btn_png.click();
                
                assert.equal(0,0)
            });

            it("MutationMatrix init", () => {

                global.document.body.innerHTML =`
                    <input type="button" value="Reset" onclick="sort_reset('x')" style="margin-left:20" />
                    <div id="sort_x_text" class="selected_text">Sample ID (ASC)</div>
                    <input type="radio" name="ID" value="0" id="xID_0" onclick="sort('sample_ID', 0, 'x')" checked /><label for="xID_0" class="radio">None</label>
                    <input type="radio" name="ID" value="1" id="xID_1" onclick="sort('sample_ID', 1, 'x')" /><label for="xID_1" class="radio">ASC </label>
                    <input type="radio" name="ID" value="2" id="xID_2" onclick="sort('sample_ID', 2, 'x')" /><label for="xID_2" class="radio">DESC</label>
                    <input type="radio" name="mutation_num" value="0" id="xNum_0" onclick="sort('number_of_mutations', 0, 'x')" checked /><label for="xNum_0" class="radio">None</label>
                    <input type="radio" name="mutation_num" value="1" id="xNum_1" onclick="sort('number_of_mutations', 1, 'x')" /><label for="xNum_1" class="radio">ASC </label>
                    <input type="radio" name="mutation_num" value="2" id="xNum_2" onclick="sort('number_of_mutations', 2, 'x')" /><label for="xNum_2" class="radio">DESC</label>
                    <input type="radio" name="gene" value="0" id="xGene_0" checked /><label for="xGene_0" class="radio">None</label>
                    <input type="radio" name="gene" value="1" id="xGene_1" /><label for="xGene_1" class="radio">ASC </label>
                    <input type="radio" name="gene" value="2" id="xGene_2" /><label for="xGene_2" class="radio">DESC&nbsp;&nbsp;&nbsp;</label>
                    <select id="gene_list"></select>
                    <input type="button" value="Add sort key" onclick="sort_gene()" style="margin-left:10" />
                    <input type="number" id="waterfall_number" name="waterfall_number" min="1" step="1" value="30" style="width:80px;" />
                    <input type="button" value="Gantt-chart" onclick="sort_waterfall()" style="margin-left:10" />

                    <input type="button" value="Reset" onclick="sort_reset('y')" style="margin-left:20" />
                    <div id="sort_y_text" class="selected_text">Number of mutations (DESC)</div>
                    <input type="radio" name="mutation_sum" value="0" id="yNum_0" onclick="sort('number_of_mutations', 0, 'y')" checked /><label for="yNum_0" class="radio">None</label>
                    <input type="radio" name="mutation_sum" value="1" id="yNum_1" onclick="sort('number_of_mutations', 1, 'y')" /><label for="yNum_1" class="radio">ASC </label>
                    <input type="radio" name="mutation_sum" value="2" id="yNum_2" onclick="sort('number_of_mutations', 2, 'y')" /><label for="yNum_2" class="radio">DESC</label>
                    <input type="radio" name="gene_name" value="0" id="yGene_0" onclick="sort('name', 0, 'y')" checked /><label for="yGene_0" class="radio">None</label>
                    <input type="radio" name="gene_name" value="1" id="yGene_1" onclick="sort('name', 1, 'y')" /><label for="yGene_1" class="radio">ASC </label>
                    <input type="radio" name="gene_name" value="2" id="yGene_2" onclick="sort('name', 2, 'y')" /><label for="yGene_2" class="radio">DESC</label>

                    <input type="number" id="viewsample_mutation_max" name="viewgene_rate" min="0" step="1" value="" style="width:100px;" /> (Number of mutation)
                    <input type="button" value="Update filter" onclick="filter_sample()" style="margin-top:10" />

                    <div id="filter_all_text" class="selected_text"></div>
                    <div id="filter_text" class="selected_text"></div>
                    <input type="number" id="viewgene_rate" name="viewgene_rate" min="0" max="100" step="1" value="0" style="width:50px;" />
                    <input type="number" id="viewgene_number" name="viewgene_number" min="1" step="1" value="100" style="width:100px;" />
                    <input type="button" value="Update filter" onclick="filter_gene()" style="margin-top:10" />

                    <div  id="div_mut1"></div>
                    <div id="div_bar_top"></div>
                    <div id="div_mut2"><button type="button" onclick="push_export()" id="dw_btn" style="margin-left: 20px; margin-top: 30px;"></button><div id="btn"></div></div>

                    <div id="div_bar_left"></div>
                    <div id="div_checker"></div>
                    <div id='legend_html'></div>
                    <div id='legend_svg'></div>

                    <div id="div_sub0_t" class="subplot_title">
                    <input type="radio" name="optSub0" value="0" id="xSub0_0" onclick="sort_sub(0, 0)" checked /><label for="xSub0_0" class="radio">None</label>
                    <input type="radio" name="optSub0" value="1" id="xSub0_1" onclick="sort_sub(0, 1)" />        <label for="xSub0_1" class="radio">ASC </label>
                    <input type="radio" name="optSub0" value="2" id="xSub0_2" onclick="sort_sub(0, 2)" />        <label for="xSub0_2" class="radio">DESC</label>
                    </div>
                    <div id="div_sub0_p"></div>
                    <div style="overflow: auto;" id="div_sub0_l_svg"></div>

                    <div id="div_sub1_t" class="subplot_title">
                    <input type="radio" name="optSub1" value="0" id="xSub1_0" onclick="sort_sub(1, 0)" checked /><label for="xSub1_0" class="radio">None</label>
                    <input type="radio" name="optSub1" value="1" id="xSub1_1" onclick="sort_sub(1, 1)" />        <label for="xSub1_1" class="radio">ASC </label>
                    <input type="radio" name="optSub1" value="2" id="xSub1_2" onclick="sort_sub(1, 2)" />        <label for="xSub1_2" class="radio">DESC</label>
                    </div>
                    <div id="div_sub1_p"></div>
                    <div style="overflow: auto;" id="div_sub1_l_svg"></div>

                    <div id="div_sub2_t" class="subplot_title">
                    <input type="radio" name="optSub2" value="0" id="xSub2_0" onclick="sort_sub(2, 0)" checked /><label for="xSub2_0" class="radio">None</label>
                    <input type="radio" name="optSub2" value="1" id="xSub2_1" onclick="sort_sub(2, 1)" />        <label for="xSub2_1" class="radio">ASC </label>
                    <input type="radio" name="optSub2" value="2" id="xSub2_2" onclick="sort_sub(2, 2)" />        <label for="xSub2_2" class="radio">DESC</label>
                    </div>
                    <div id="div_sub2_p"></div>
                    <div style="overflow: auto;" id="div_sub2_l_svg"></div>

                    <div id="tooltip" class="hidden"></div>
                    <div id="spin" class="hidden"></div>
                    <canvas id="dw_canvas" class="hidden"></canvas>
                `;

                d3 = require('../src/lib/d3_v3.5.13/d3.min.js');
                require('../src/lib/d3-legend_v1.10.0/d3-legend.min.js');
                require('../src/js/graph_mutation.js')
                
                var subs = [];

                subs.push(mut_draw.add_subdiv("div_sub0", "sub0", 1));
                subs.push(mut_draw.add_subdiv("div_sub1", "sub1", 2));
                subs.push(mut_draw.add_subdiv("div_sub2", "sub2", 2));
                mut_draw.init();

                subs[0].bar_selected = function(key, on) {mut_draw.sub_selected(key, on);}
                subs[1].bar_selected = function(key, on) {mut_draw.sub_selected(key, on);}
                subs[2].bar_selected = function(key, on) {mut_draw.sub_selected(key, on);}
                
                mut_draw.sort('sample_ID', 0, 'x');
                mut_draw.sort('sample_ID', 1, 'x');
                mut_draw.sort('sample_ID', 2, 'x');
                mut_draw.sort('number_of_mutations', 0, 'x');
                mut_draw.sort('number_of_mutations', 1, 'x');
                mut_draw.sort('number_of_mutations', 2, 'x');
                mut_draw.sort_gene();
                mut_draw.sort_waterfall();
                mut_draw.sort_reset('y');
                mut_draw.sort('number_of_mutations', 0, 'y');
                mut_draw.sort('number_of_mutations', 1, 'y');
                mut_draw.sort('number_of_mutations', 2, 'y');
                mut_draw.sort('name', 0, 'y');
                mut_draw.sort('name', 1, 'y');
                mut_draw.sort('name', 2, 'y');
                mut_draw.filter_sample();
                mut_draw.filter_gene();
                mut_draw.push_export();
                mut_draw.sort_sub(0, 0);
                mut_draw.sort_sub(0, 1);
                mut_draw.sort_sub(0, 2);
                mut_draw.sort_sub(1, 0);
                mut_draw.sort_sub(1, 1);
                mut_draw.sort_sub(1, 2);
                mut_draw.sort_sub(2, 0);
                mut_draw.sort_sub(2, 1);
                mut_draw.sort_sub(2, 2);
                mut_draw.sort_reset('x');

                assert.equal(0,0)
            });
        })
    }
})();

const assert = require('power-assert');

require('../src/js/utils.js');
require('../src/html/data_qc.js');
require('../src/html/data_mutation.js');
require('../src/html/data_ca.js');
require('../src/html/data_signature2.js');
require('../src/html/data_pmsignature2.js');

(function() {
    test_function = {};

    test_function.run = function() {
        describe('Tests data function...' , () => {
            describe('qc_data', () => {

                // TODO: , 区切りのtooltipテストケース追加

                describe('qc_data.get_plot_config.1', () => {
                    var tooltip = qc_data.get_plot_config('chart_brush');
                    it('qc_data.get_plot_config.1.1', () => {
                       assert.equal(tooltip.title, '')
                    })
                })
                describe('qc_data.get_plot_config.2', () => {
                    it('qc_data.get_plot_config.2.1', () => {
                        var tooltip = qc_data.get_plot_config('');
                        assert.equal(tooltip, null)
                    })
                })
                describe('qc_data.get_dataset.1', () => {
                    it('qc_data.get_dataset.1.1', () => {
                        var dataset = qc_data.get_dataset ('chart_brush');
                        assert.equal(dataset.data[0][0], 70.05);
                    })
                })
                describe('qc_data.get_dataset.2', () => {
                    it('qc_data.get_dataset.2.1', () => {
                        var dataset = qc_data.get_dataset ('chart_1');
                        assert.equal(dataset.data[0][0], 70.05);
                    })
                })
            })

            describe('ca_data', () => {

                // TODO: 不要関数削除
                // TODO: ca_data.get_arc_data_detail() から不要引数 'ID' 削除

                describe('ca_data.get_data_thumb.1', () => {
                    var dataset = ca_data.get_data_thumb ('SAMPLE00');
                    it('ca_data.get_data_thumb.1.1', () => {
                        assert.equal(dataset[0][11].start, '00_0011');
                    })
                    it('ca_data.get_data_thumb.1.2', () => {
                        assert.deepEqual(dataset[0][11].ends, ['21_0002']);
                    })
                    it('ca_data.get_data_thumb.1.3', () => {
                        assert.deepEqual(dataset[0][11].tooltip, []);
                    })
                })
                describe('ca_data.get_data_thumb.2', () => {
                    var dataset = ca_data.get_data_thumb ('');
                    it('ca_data.get_data_thumb.2.1', () => {
                        assert.equal(dataset[0][0].start, '00_0000');
                    })
                    it('ca_data.get_data_thumb.2.2', () => {
                        assert.deepEqual(dataset[0][0].ends, []);
                    })
                    it('ca_data.get_data_thumb.2.3', () => {
                        assert.deepEqual(dataset[0][0].tooltip, []);
                    })
                })
                describe('ca_data.get_arc_data_thumb.1', () => {
                    var dataset = ca_data.get_arc_data_thumb ();
                    it('ca_data.get_arc_data_thumb.1.1', () => {
                        assert.equal(dataset[0].start, 'root.00.00_0000');
                    })
                    it('ca_data.get_arc_data_thumb.1.2', () => {
                        assert.deepEqual(dataset[0].ends, []);
                    })
                    it('ca_data.get_arc_data_thumb.1.3', () => {
                        assert.deepEqual(dataset[0].tooltip, []);
                    })
                })
                describe('ca_data.get_data_detail.1', () => {
                    var dataset = ca_data.get_data_detail ('SAMPLE00');
                    it('ca_data.get_data_detail.1.1', () => {
                        assert.equal(dataset[0][23].start, '00_0023');
                    })
                    it('ca_data.get_data_detail.1.2', () => {
                        assert.deepEqual(dataset[0][23].ends, ['21_0005']);
                    })
                    it('ca_data.get_data_detail.1.3', () => {
                        assert.deepEqual(dataset[0][23].tooltip, [['[1] 153,160,367 (+) CEE2SPV1R1; [22] 33,751,554 (+) PVYYQIVS8G; inversion']]);
                    })
                })
                describe('ca_data.get_data_detail.2', () => {
                    var dataset = ca_data.get_data_detail ('');
                    it('ca_data.get_data_detail.2.1', () => {
                        assert.equal(dataset[0][0].start, '00_0000');
                    })
                    it('ca_data.get_data_detail.2.2', () => {
                        assert.deepEqual(dataset[0][0].ends, []);
                    })
                    it('ca_data.get_data_detail.2.3', () => {
                        assert.deepEqual(dataset[0][0].tooltip, []);
                    })
                })
                describe('ca_data.get_arc_data_detail.1', () => {
                    var dataset = ca_data.get_arc_data_detail ('SAMPLE00');
                    it('ca_data.get_arc_data_detail.1.1', () => {
                        assert.equal(dataset[0].start, 'root.00.00_0000');
                    })
                    it('ca_data.get_arc_data_detail.1.2', () => {
                        assert.deepEqual(dataset[0].ends, []);
                    })
                    it('ca_data.get_arc_data_detail.1.3', () => {
                        assert.deepEqual(dataset[0].tooltip, []);
                    })
                })
                describe('ca_data.get_select.1', () => {
                    var dataset = ca_data.get_select ();
                    it('ca_data.get_select.1.1', () => {
                        assert.equal(dataset.value[0][0], 1);
                    })
                    it('ca_data.get_select.1.2', () => {
                        assert.equal(dataset.key[0][0], 'root.00.00_0030');
                    })
                    it('ca_data.get_select.1.3', () => {
                        assert.deepEqual(dataset.item[0][0], ['SAMPLE00']);
                    })
                })
            })
            describe('mut_data', () => {

            // TODO: 

                describe('mut_data.get_dataset_id.1', () => {
                    var dataset = mut_data.get_dataset_id();
                    it('mut_data.get_dataset_id.1.1', () => {
                        assert.equal(dataset.data[0][0], 2);
                    })
                    it('mut_data.get_dataset_id.1.2', () => {
                        assert.equal(dataset.keys[0][0], 'SAMPLE00');
                    })
                    it('mut_data.get_dataset_id.1.3', () => {
                        assert.deepEqual(dataset.tooltips["SAMPLE00"][0], 'Sample:SAMPLE00, 21');
                    })
                    it('mut_data.get_dataset_id.1.4', () => {
                        assert.deepEqual(dataset.tooltips["SAMPLE00"][1], ['Mutation Type:UTR3, 2']);
                    })
                })

                describe('mut_data.get_dataset_checker.1', () => {
                    var dataset = mut_data.get_dataset_checker({'exonic': true}, ['KRAS']);
                    it('mut_data.get_dataset_checker.1.1', () => {
                        assert.deepEqual(dataset.data[0], [1]);
                    })
                    it('mut_data.get_dataset_checker.1.2', () => {
                        assert.deepEqual(dataset.keys[0], ['SAMPLE00']);
                    })
                    it('mut_data.get_dataset_checker.1.3', () => {
                        assert.deepEqual(dataset.keys2[0], ['KRAS']);
                    })
                    it('mut_data.get_dataset_checker.1.4', () => {
                        assert.deepEqual(dataset.tooltips[0], {'KRAS': ['Sample:SAMPLE00, Gene:KRAS, 2', 'Mutation Type[UTR3]', 'Mutation Type[exonic]']});
                    })
                })
                describe('mut_data.get_dataset_gene.1', () => {
                    var dataset = mut_data.get_dataset_gene({'exonic': true}, 0, 10, ["number_of_mutations"], [false]);
                    it('mut_data.get_dataset_gene.1.1', () => {
                        assert.equal(dataset.data[3][0].toFixed(1), 33.3);
                    })
                    it('mut_data.get_dataset_gene.1.2', () => {
                        assert.equal(dataset.keys[0][0], 'NFE2L2');
                    })
                    it('mut_data.get_dataset_gene.1.3', () => {
                        assert.deepEqual(dataset.tooltips['NFE2L2'][0], 'Gene:NFE2L2, 2');
                    })
                    it('mut_data.get_dataset_gene.1.4', () => {
                        assert.deepEqual(dataset.tooltips['NFE2L2'][1], 'Mutation Type:UTR3, 1');
                    })
                })
                describe('mut_data.get_id_nums.1', () => {
                    var dataset = mut_data.get_dataset_id();
                    var id_nums = mut_data.get_id_nums({'exonic': true}, dataset.data, dataset.keys);
                    it('mut_data.get_id_nums.1.1', () => {
                        assert.equal(id_nums[0], 21);
                    })
                })
                describe('mut_data.get_id_flg_par_gene.1', () => {
                    var dataset = mut_data.get_id_flg_par_gene('SAMPLE00', {'exonic': true});
                    it('mut_data.get_id_flg_par_gene.1.1', () => {
                        assert.equal(dataset[2], 1);
                    })
                })
                describe('mut_data.get_sub_data.1', () => {
                    var dataset = mut_data.get_sub_data('sub0');
                    it('mut_data.get_sub_data.1.1', () => {
                        assert.deepEqual(dataset.stack[1].data[0], 1);
                    })
                    it('mut_data.get_sub_data.1.2', () => {
                        assert.deepEqual(dataset.stack[1].keys[0], 'SAMPLE00');
                    })
                    it('mut_data.get_sub_data.1.3', () => {
                        assert.equal(dataset.stack[1].color_n, '#ff0000');
                    })
                    it('mut_data.get_sub_data.1.4', () => {
                        assert.deepEqual(dataset.tooltips['SAMPLE00'], ['SAMPLE00, F']);
                    })
                    it('mut_data.get_sub_data.1.5', () => {
                        assert.deepEqual(dataset.label, {
                            type: 'fix',
                            text: [ 'Male', 'Female' ],
                            color: [ '#0000ff', '#ff0000' ] 
                        });
                    })
                })
                describe('mut_data.get_sub_data.2', () => {
                    var dataset = mut_data.get_sub_data('sub1');
                    it('mut_data.get_sub_data.2.1', () => {
                        assert.deepEqual(dataset.stack[1].data[0], 1);
                    })
                    it('mut_data.get_sub_data.2.2', () => {
                        assert.deepEqual(dataset.stack[1].keys[0], 'SAMPLE00');
                    })
                    it('mut_data.get_sub_data.2.3', () => {
                        assert.equal(dataset.stack[1].color_n, '#0079BA');
                        
                    })
                    it('mut_data.get_sub_data.2.4', () => {
                        assert.deepEqual(dataset.tooltips['SAMPLE00'], ['SAMPLE00, 30']);
                    })
                    it('mut_data.get_sub_data.2.5', () => {
                        assert.deepEqual(dataset.label, {
                            type: 'range',
                            text: ['0-19', '20-39' ,'40-59' ,'60over'],
                            color: ['#E51721', '#0079BA', '#019A68', '#522886'] 
                        });
                    })
                })
                describe('mut_data.get_sub_data.3', () => {
                    var dataset = mut_data.get_sub_data('sub2');
                    it('mut_data.get_sub_data.3.1', () => {
                        assert.deepEqual(dataset.stack[0].data[0], 1);
                    })
                    it('mut_data.get_sub_data.3.2', () => {
                        assert.deepEqual(dataset.stack[0].keys[0], 'SAMPLE01');
                    })
                    it('mut_data.get_sub_data.3.3', () => {
                        assert.equal(dataset.stack[0].color_n, '#0000ff');
                    })
                    it('mut_data.get_sub_data.3.4', () => {
                        assert.deepEqual(dataset.tooltips['SAMPLE00'], ['SAMPLE00, 40']);
                    })
                    it('mut_data.get_sub_data.3.5', () => {
                        assert.deepEqual(dataset.label, {
                            type: 'gradient',
                            text: ['Min(15)', 'Max(40)'],
                            color: ['#0000ff', '#ff0000'] 
                        });
                    })
                })

                describe('mut_data.get_sub_values.1', () => {
                    var values = mut_data.get_sub_values('sub0');
                    it('mut_data.get_sub_values.1.1', () => {
                        assert.equal(values[0], 1)
                    })
                })
            })

            describe('sig_data', () => {

                describe('var rect = sig_data.get_data_par_signature.1', () => {
                    var dataset = sig_data.get_data_par_signature(0);
                    it('var rect = sig_data.get_data_par_signature.1.1', () => {
                        assert.equal(dataset.data[0][0], 0.0021);
                    })
                    it('var rect = sig_data.get_data_par_signature.1.2', () => {
                        assert.equal(dataset.tooltip[0][0][0], 'C > A');
                    })
                    it('var rect = sig_data.get_data_par_signature.1.3', () => {
                        assert.deepEqual(dataset.tooltip[0][0][1], [ 'ApCpA:      0.00' ]);
                    })
                })
                describe('var rect = sig_data.get_bars_data.1', () => {
                    var dataset = sig_data.get_bars_data(true);
                    it('var rect = sig_data.get_bars_data.1.1', () => {
                        assert.equal(dataset.data[0][0], 0.0882);
                    })
                    it('var rect = sig_data.get_bars_data.1.2', () => {
                        assert.equal(dataset.key[0][0], 'Key0');
                    })
                    it('var rect = sig_data.get_bars_data.1.3', () => {
                        assert.deepEqual(dataset.tooltip['Key0'],  [ 'PD3851a', [ 'Signature 1: 0.09' ], [ 'Signature 2: 0.91' ] ]);
                    })
                })
                describe('var rect = sig_data.get_bars_data.2', () => {
                    var dataset = sig_data.get_bars_data(false);
                    it('var rect = sig_data.get_bars_data.2.1', () => {
                        assert.equal(dataset.data[0][0], 352.8882);
                    })
                    it('var rect = sig_data.get_bars_data.2.2', () => {
                        assert.equal(dataset.key[0][0], 'Key0');
                    })
                    it('var rect = sig_data.get_bars_data.2.3', () => {
                        assert.deepEqual(dataset.tooltip['Key0'], [ 'PD3851a', [ 'Signature 1: 352.89' ], [ 'Signature 2: 3647.71' ] ]);
                    })
                })
            })
            describe('msig_data', () => {

                describe('var rect = msig_data.get_data_par_signature.1', () => {
                    var dataset = msig_data.get_dataset(0, 'alt');
                    it('var rect = msig_data.get_data_par_signature.1.1', () => {
                        assert.deepEqual(dataset.data[0], [ 0, 0, 0, 0 ]);
                    })
                    it('var rect = msig_data.get_data_par_signature.1.2', () => {
                        assert.equal(dataset.tooltip[0], "C -> A: 0.06");
                    })
                })
                describe('var rect = msig_data.get_data_par_signature.2', () => {
                    var dataset = msig_data.get_dataset(0, 'ref0');
                    it('var rect = msig_data.get_data_par_signature.2.1', () => {
                        assert.equal(dataset.data[0], 0.189);
                    })
                    it('var rect = msig_data.get_data_par_signature.2.2', () => {
                        assert.equal(dataset.tooltip[0], "A: 0.19");
                    })
                })
                describe('var rect = msig_data.get_data_par_signature.3', () => {
                    var dataset = msig_data.get_dataset(0, 'strand');
                    it('var rect = msig_data.get_data_par_signature.3.1', () => {
                        assert.equal(dataset.data[0], 0.514);
                        })
                    it('var rect = msig_data.get_data_par_signature.3.2', () => {
                        assert.equal(dataset.tooltip[0], "+ 0.51 - 0.48");
                    })
                })
                describe('var rect = msig_data.get_bars_data.1', () => {
                    var dataset = msig_data.get_bars_data(true);
                    it('var rect = msig_data.get_bars_data.1.1', () => {
                        assert.equal(dataset.data[0][0], 0.09);
                    })
                    it('var rect = msig_data.get_bars_data.1.2', () => {
                        assert.equal(dataset.key[0][0], 'Key0');
                    })
                    it('var rect = msig_data.get_bars_data.1.3', () => {
                        assert.deepEqual(dataset.tooltip['Key0'],  [ 'PD3851a', [ 'Signature 1: 0.09' ], [ 'Background : 0.91' ] ]);
                    })
                })
                describe('var rect = msig_data.get_bars_data.2', () => {
                    var dataset = msig_data.get_bars_data(false);
                    it('var rect = msig_data.get_bars_data.2.1', () => {
                        assert.equal(dataset.data[0][0], 71.64);
                    })
                    it('var rect = msig_data.get_bars_data.2.2', () => {
                        assert.equal(dataset.key[0][0], 'Key0');
                    })
                    it('var rect = msig_data.get_bars_data.2.3', () => {
                        assert.deepEqual(dataset.tooltip['Key0'], [ 'PD3851a', [ 'Signature 1: 71.64' ], [ 'Background : 723.56' ] ]);
                    })
                })
            })
        })
    }
})();

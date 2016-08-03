(function(){
style_general = {
    font_family: "'Helvetica Neue', Helvetica, Arial, sans-serif",
}
    
// style of quality check graphs
style_qc = {
};

// style of genome-wide bar plot
style_sv_bar = {
    // title's text options
    title_top: "Genome-wide SVs identify",
    title_y: "samples with SV breakp.",
    title_x: "Chromosome",
    
    // circular sector's label options
    axis_x_label: [
        "1",  // chr1
        "2",  // chr2
        "3",  // chr3
        "4",  // chr4
        "5",  // chr5
        "6",  // chr6
        "7",  // chr7
        "8",  // chr8
        "9",  // chr9
        "10", // chr10
        "11", // chr11
        "12", // chr12
        "13", // chr13
        "14", // chr14
        "15", // chr15
        "16", // chr16
        "17", // chr17
        "18", // chr18
        "19", // chr19
        "20", // chr20
        "21", // chr21
        "22", // chr22
        "X",  // chrX
        "Y",  // chrY
    ],
};

// style of thumbnails
style_sv_thumb = {
    // circular sector's fill color options
    arc_fill_color: [
        "#BBBBBB", // chr1
        "#BBBBBB", // chr2
        "#BBBBBB", // chr3
        "#BBBBBB", // chr4
        "#BBBBBB", // chr5
        "#BBBBBB", // chr6
        "#BBBBBB", // chr7
        "#BBBBBB", // chr8
        "#BBBBBB", // chr9
        "#BBBBBB", // chr10
        "#BBBBBB", // chr11
        "#BBBBBB", // chr12
        "#BBBBBB", // chr13
        "#BBBBBB", // chr14
        "#BBBBBB", // chr15
        "#BBBBBB", // chr16
        "#BBBBBB", // chr17
        "#BBBBBB", // chr18
        "#BBBBBB", // chr19
        "#BBBBBB", // chr20
        "#BBBBBB", // chr21
        "#BBBBBB", // chr22
        "#BBBBBB", // chrX
        "#BBBBBB", // chrY
    ],
    arc_fill_opacity: 1.0,
    
    // circular sector's edge color options
    arc_stroke_color: [
        "#BBBBBB", // chr1
        "#BBBBBB", // chr2
        "#BBBBBB", // chr3
        "#BBBBBB", // chr4
        "#BBBBBB", // chr5
        "#BBBBBB", // chr6
        "#BBBBBB", // chr7
        "#BBBBBB", // chr8
        "#BBBBBB", // chr9
        "#BBBBBB", // chr10
        "#BBBBBB", // chr11
        "#BBBBBB", // chr12
        "#BBBBBB", // chr13
        "#BBBBBB", // chr14
        "#BBBBBB", // chr15
        "#BBBBBB", // chr16
        "#BBBBBB", // chr17
        "#BBBBBB", // chr18
        "#BBBBBB", // chr19
        "#BBBBBB", // chr20
        "#BBBBBB", // chr21
        "#BBBBBB", // chr22
        "#BBBBBB", // chrX
        "#BBBBBB", // chrY
    ],
    arc_stroke_opacity: 1.0,
    
    // link options
    link_width: "1px",
    link_opacity: 1.0,
};

// style of detail image (on click)
style_sv_detail = {
    // windows header
    win_header_text_color: "#000000",
    win_header_background_color: "#CFCFCF",
    win_border_color: "#D3D3D3",
    win_border_width: "1px",
    win_background_color: "white",
    
    // circular sector's fill color options
    arc_fill_color: [
        "#BBBBBB", // chr1
        "#BBBBBB", // chr2
        "#BBBBBB", // chr3
        "#BBBBBB", // chr4
        "#BBBBBB", // chr5
        "#BBBBBB", // chr6
        "#BBBBBB", // chr7
        "#BBBBBB", // chr8
        "#BBBBBB", // chr9
        "#BBBBBB", // chr10
        "#BBBBBB", // chr11
        "#BBBBBB", // chr12
        "#BBBBBB", // chr13
        "#BBBBBB", // chr14
        "#BBBBBB", // chr15
        "#BBBBBB", // chr16
        "#BBBBBB", // chr17
        "#BBBBBB", // chr18
        "#BBBBBB", // chr19
        "#BBBBBB", // chr20
        "#BBBBBB", // chr21
        "#BBBBBB", // chr22
        "#BBBBBB", // chrX
        "#BBBBBB", // chrY
    ],
    arc_fill_opacity: 1.0,
    
    // circular sector's edge color options
    arc_stroke_color: [
        "#BBBBBB", // chr1
        "#BBBBBB", // chr2
        "#BBBBBB", // chr3
        "#BBBBBB", // chr4
        "#BBBBBB", // chr5
        "#BBBBBB", // chr6
        "#BBBBBB", // chr7
        "#BBBBBB", // chr8
        "#BBBBBB", // chr9
        "#BBBBBB", // chr10
        "#BBBBBB", // chr11
        "#BBBBBB", // chr12
        "#BBBBBB", // chr13
        "#BBBBBB", // chr14
        "#BBBBBB", // chr15
        "#BBBBBB", // chr16
        "#BBBBBB", // chr17
        "#BBBBBB", // chr18
        "#BBBBBB", // chr19
        "#BBBBBB", // chr20
        "#BBBBBB", // chr21
        "#BBBBBB", // chr22
        "#BBBBBB", // chrX
        "#BBBBBB", // chrY
    ],
    arc_stroke_opacity: 1.0,
    
    // circular sector's label options
    arc_label_text: [
        "1",  // chr1
        "2",  // chr2
        "3",  // chr3
        "4",  // chr4
        "5",  // chr5
        "6",  // chr6
        "7",  // chr7
        "8",  // chr8
        "9",  // chr9
        "10", // chr10
        "11", // chr11
        "12", // chr12
        "13", // chr13
        "14", // chr14
        "15", // chr15
        "16", // chr16
        "17", // chr17
        "18", // chr18
        "19", // chr19
        "20", // chr20
        "21", // chr21
        "22", // chr22
        "X",  // chrX
        "Y",  // chrY
    ],
    arc_label_fontsize: "10px",
    arc_label_color: "#333333",
    
    // link options
    link_width: "2px",
    link_opacity: 1.0,
    
    // link(on mouse) options
    link_select_color: "#d62728",
    link_select_width: "3px",
    link_select_opacity: 1.0,
};

// style of mutaion-matrix
style_mut = {
    // title's text options
    title_sample: "Sample",
    title_sample_y: "Number of mutation",
    
    title_gene: "Genes",
    title_gene_y1: "% Samples",
    title_gene_y2: "with mutation",
    
    func_title: "functions",
};
})();

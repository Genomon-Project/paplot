(function(){
// style of quality check graphs
style_qc = {
    bar_select_color: "#1F77B4",

    bar_coverage_ylabel_text: "coverage",
    bar_coverage_color: [
        "#1F77B4", // ratio_30x
        "#FF7F0E", // ratio_20x
        "#2CA02C", // ratio_10x
        "#D62728", // ratio_2x
    ],
    
    bar_average_ylabel_text: "average of depth",
    bar_average_color: "#1F77B4",
    
    bar_mapped_ylabel_text: "mapped_reads / total_reads",
    bar_mapped_color: "#1F77B4",
    
    bar_insert_ylabel_text: "mean_insert_size",
    bar_insert_color: "#1F77B4",
    
    bar_duplicate_ylabel_text: "duplicate_reads / total_reads",
    bar_duplicate_color: "#1F77B4",
    
    bar_length_ylabel_text: "read_length",
    bar_length_color: [
        "#1F77B4", // r1
        "#FF7F0E", // r2
    ],
};

// style of genome-wide bar plot
style_sv_bar = {
    
    // fill color options
    bar_color_outer: "#9E4A98",
    bar_color_inner: "#51BF69",
    bar_color_snippet: "goldenrod",
    
    // legend's text options
    bar_label_outer: "Inter Chromosome",
    bar_label_inner: "Intra Chromosome",
    bar_label_snippet: "Short Inversion",
    
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
        "crimson",          // index1
        "lightpink",        // index2
        "mediumvioletred",  // index3
        "violet",           // index4
        "darkmagenta",      // index5
        "mediumpurple",     // index6
        "mediumblue",       // index7
        "lightsteelblue",   // index8
        "deepskyblue",      // index9
        "lightblue",        // index10
        "seagreen",         // index11
        "palegreen",        // index12
        "darkgreen",        // index13
        "limegreen",        // index14
        "darkolivegreen",   // index15
        "yellowgreen",      // index16
        "olivedrab",        // index17
        "yellow",           // index18
        "olive",            // index19
        "gold",             // index20
        "orange",           // index21
        "bisque",           // index22
        "darkorange",       // index23
        "sandybrown",       // index24
        "saddlebrown",      // index25
        "rosybrown",        // index26
    ],
    arc_fill_opacity: 0.5,
    
    // circular sector's edge color options
    arc_stroke_color: [
        "#BBBBBB",          // index1
        "#BBBBBB",          // index2
        "#BBBBBB",          // index3
        "#BBBBBB",          // index4
        "#BBBBBB",          // index5
        "#BBBBBB",          // index6
        "#BBBBBB",          // index7
        "#BBBBBB",          // index8
        "#BBBBBB",          // index9
        "#BBBBBB",          // index10
        "#BBBBBB",          // index11
        "#BBBBBB",          // index12
        "#BBBBBB",          // index13
        "#BBBBBB",          // index14
        "#BBBBBB",          // index15
        "#BBBBBB",          // index16
        "#BBBBBB",          // index17
        "#BBBBBB",          // index18
        "#BBBBBB",          // index19
        "#BBBBBB",          // index20
        "#BBBBBB",          // index21
        "#BBBBBB",          // index22
        "#BBBBBB",          // index23
        "#BBBBBB",          // index24
        "#BBBBBB",          // index25
        "#BBBBBB",          // index26
    ],
    arc_stroke_opacity: 1.0,
    
    // link options
    link_color_outer: "#9E4A98",
    link_color_inner: "#51BF69",
    link_color_snippet: "goldenrod",
    link_width: "1px",
    link_opacity: 1.0,
    link_tension: 0.85,
};

// style of detail image (on click)
style_sv_detail = {
    // windows header
    win_header_text_color: "white",
    win_header_background_color: "steelblue",
    win_border_color: "dimgray",
    win_border_width: "3px",
    win_background_color: "aliceblue",
    
    // circular sector's fill color options
    arc_fill_color: [
        "#BBBBBB",          // index1
        "#BBBBBB",          // index2
        "#BBBBBB",          // index3
    ],
    arc_fill_opacity: 0.5,
    
    // circular sector's edge color options
    arc_stroke_color: [
        "#BBBBBB",          // index1
        "#BBBBBB",          // index2
        "#BBBBBB",          // index3
        "#BBBBBB",          // index4
        "#BBBBBB",          // index5
        "#BBBBBB",          // index6
        "#BBBBBB",          // index7
        "#BBBBBB",          // index8
        "#BBBBBB",          // index9
        "#BBBBBB",          // index10
        "#BBBBBB",          // index11
        "#BBBBBB",          // index12
        "#BBBBBB",          // index13
        "#BBBBBB",          // index14
        "#BBBBBB",          // index15
        "#BBBBBB",          // index16
        "#BBBBBB",          // index17
        "#BBBBBB",          // index18
        "#BBBBBB",          // index19
        "#BBBBBB",          // index20
        "#BBBBBB",          // index21
        "#BBBBBB",          // index22
        "#BBBBBB",          // index23
        "#BBBBBB",          // index24
        "#BBBBBB",          // index25
        "#BBBBBB",          // index26
    ],
    arc_stroke_opacity: 1.0,
    
    // circular sector's label options
    arc_label_text: [
        "idx1",             // chr1
        "idx2",             // chr2
        "idx3",             // chr3
        "idx4",             // chr4
        "idx5",             // chr5
        "idx6",             // chr6
        "idx7",             // chr7
        "idx8",             // chr8
        "idx9",             // chr9
        "idx10",            // chr10
        "idx11",            // chr11
        "idx12",            // chr12
        "idx13",            // chr13
        "idx14",            // chr14
        "idx15",            // chr15
        "idx16",            // chr16
        "idx17",            // chr17
        "idx18",            // chr18
        "idx19",            // chr19
        "idx20",            // chr20
        "idx21",            // chr21
        "idx22",            // chr22
        "idx23",            // chrX
        "idx24",            // chrY
    ],
    arc_label_fontsize: "10px",
    arc_label_color: "slategray",
    
    // link options
    link_color_outer: "navy",
    link_color_inner: "orange",
    link_color_snippet: "goldenrod",
    link_width: "2px",
    link_opacity: 0.5,
    link_tension: 0.85,
    
    // link(on mouse) options
    link_select_color: "red",
    link_select_width: "3px",
    link_select_opacity: 1.0,
};
})();

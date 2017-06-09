(function(){
style_general = {
    font_family: "'Helvetica Neue', Helvetica, Arial, sans-serif",
}

// style of quality check graphs
style_qc = {
    brush_border_y_color: "#DDDDCC",
    brush_border_y_opacity: 0.5,
    plot_border_y_color: "#DDDDCC",
    plot_border_y_opacity: 0.2,
    title_y_font_size: "18px", //"12px",
    legend_title_font_size: "20px", //"16px",
    legend_text_font_size: "18px", //"12px",
};

// style of genome-wide bar plot
style_sv_bar = {
    // title's text options
    title_y: "number",
    title_y_font_size: "18px", //"12px",

    title_x: "Chromosome",
    title_x_font_size: "18px", //"14px",
    
    legend_title: "Genome-wide CAs identify",
    legend_title_font_size: "20px", //"16px",
    legend_text_font_size: "18px", //"12px",
    
    border_x_main_color: "#E0E0E0",
    border_x_main_width: "1px",
    border_x_sub_color: "#A6A6A6",
    border_x_sub_width: "1px",
    border_y_color: "#DDDDCC",
    border_y_opacity: 0.5,
    
    axis_x_font_size: "12px", //"9px",
};

// style of thumbnails
style_sv_thumb = {
    // circular sector's color options
    arc_fill_opacity: 1.0,
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
    
    // circular sector's color options
    arc_fill_opacity: 1.0,
    arc_stroke_opacity: 1.0,
    
    // circular sector's label options
    arc_label_fontsize: "14px",//"10px",
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
    title_sample_font_size: "18px", //"14px",
    title_sample_y: "Number of mutation",
    title_sample_y_font_size: "18px", //"12px",
    virtical_border_x_color: "#CCCCEE",
    virtical_border_x_width: "1px",
    virtical_border_y_color: "#DDDDCC",
    virtical_border_y_opacity: 0.5,
    
    title_gene: "Genes",
    title_gene_font_size: "18px", //"14px",
    title_gene_y1: "% Samples",
    title_gene_y2: "with mutations",
    title_gene_y1_font_size: "18px", //"12px",
    title_gene_y2_font_size: "18px", //"12px",
    horizon_border_x_color: "#CCCCEE",
    horizon_border_x_width: "1px",
    horizon_border_y_color: "#DDDDCC",
    horizon_border_y_opacity: 0.5,
    
    // legend
    legend_title: "functions",
    legend_title_font_size: "20px", //"16px",
    legend_text_font_size: "18px", //"12px",
    
    // gene
    gene_text_font_size: "14px", //"9px",
    
    // subplot
    sub_border_color: "#FFFFFF",
    sub_border_width: "1px",
    
};

// style of signature
style_signature = {
    // stack-integral
    title_integral: "Signature integral",
    title_integral_font_size: "20px", //"16px",
    title_integral_y: "membership",
    title_integral_y_font_size: "18px", //"12px",
    legend_integral_title_font_size: "20px", //"16px",
    legend_integral_text_font_size: "18px", //"12px",
    
    // stack-rate
    title_rate: "Signature rate",
    title_rate_font_size: "20px", //"16px",
    title_rate_y: "membership",
    title_rate_y_font_size: "18px", //"12px",
    legend_rate_title_font_size: "20px", //"16px",
    legend_rate_text_font_size: "18px", //"12px",
    
    //stack-common
    plot_border_y_color: "#DDDDCC",
    plot_border_y_opacity: 0.5,
    
    // signature
    signature_title_font_size: "20px", //"12px",
    signature_title_y: "probaility",
    signature_title_y_font_size: "20px", //"12px",
    signature_title_x_font_size: "14px", //"12"px
    border_y_color: "#DDDDCC",
    border_y_opacity: 0.5,
};

// style of pmsignature
style_pmsignature = {
    // stack-integral
    title_integral: "Signature integral",
    title_integral_font_size: "20px", //"16px",
    title_integral_y: "membership",
    title_integral_y_font_size: "18px", //"12px",
    legend_integral_title_font_size: "20px", //"16px",
    legend_integral_text_font_size: "18px", //"12px",
    
    // stack-rate
    title_rate: "Signature rate",
    title_rate_font_size: "20px", //"16px",
    title_rate_y: "membership",
    title_rate_y_font_size: "18px", //"12px",
    legend_rate_title_font_size: "20px", //"16px",
    legend_rate_text_font_size: "18px", //"12px",
    
    //stack-common
    plot_border_y_color: "#DDDDCC",
    plot_border_y_opacity: 0.5,
    
    // signature
    signature_alt_font_size: "14px", //"10px",
    signature_ref_font_size: "14px", //"10px",
    signature_strand_font_size: "14px", //"10px",
    signature_title_font_size: "20px", //"12px",
};
})();

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
	link_color_inner: "#51BF69",
	link_color_outer: "#9E4A98",
	link_width: "1px",
	link_opacity: 1.0,
	link_tension: 0.85,
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
	link_color_inner: "#51BF69",
	link_color_outer: "#9E4A98",
	link_width: "2px",
	link_opacity: 1.0,
	link_tension: 0.85,
	
	// link(on mouse) options
	link_select_color: "#d62728",
	link_select_width: "3px",
	link_select_opacity: 1.0,
};
})();

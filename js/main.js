var $debug = document.getElementById("debug");
 	$("#aboutme").click(function (){show_detail();});
	$("#mainbox").click(function (){hide_detail();});
	b_beforeclicked_id = -1 ;
var hide_detail_t
	
function show_detail(){
	$("#detail").css("margin","0 0 0 -10px");
	$('#mainbox').css('z-index','80');
	hide_detail_t=setTimeout("hide_detail()",8000);
}
function hide_detail(){
		$('#detail').css('margin','-150px 0 0 -10px');
		$('#mainbox').css('z-index','-1');	
		clearTimeout(hide_detail_t);
	};
//导航栏
$("#b_nav0").click(function (){
	var b_nowclicked_id = 0;
	switch_pages(b_nowclicked_id,b_beforeclicked_id);
});
$("#b_nav1").click(function (){
	var b_nowclicked_id = 1;
	switch_pages(b_nowclicked_id,b_beforeclicked_id);
});
$("#b_nav2").click(function (){
	var b_nowclicked_id = 2;
	switch_pages(b_nowclicked_id,b_beforeclicked_id);
});
$("#b_nav3").click(function (){
	var b_nowclicked_id = 3;
	switch_pages(b_nowclicked_id,b_beforeclicked_id);
});
function switch_pages(n,b){
	if (n != b) {
		$("#nav"+n).css({
			"background" : "red" ,
			"margin-left" : "-350px" ,
			"opacity" : "1"
		});
		$("#nav"+b).css({
			"background" : "red" ,
			"margin-left" : "0" ,
			"opacity" : "0"
		});	
		$("#b_nav"+n).css({
			"font-weight":"bold",
			"opacity" : "1"
		});
		$("#b_nav"+b).css({
			"font-weight":"normal",
			"opacity" : "0.9"
		});
		b_beforeclicked_id = n;
	}
};
/*
var $column = $("#column");
	$mainbox = $("#mainbox");
	DocumentEvent = $("#aboutme_text");
	$debug = document.getElementById("debug");
	
/* 自适应窗体 start*
function updatevalue(){		//更新窗体数据
	mainbox_width = parseInt($mainbox.css("width"));
	main_height = parseInt($mainbox.css("height"));
	column_width = parseInt($column.css("width"));
	column_height = parseInt($column.css("height"));
};
function resize(){		//调整
	updatevalue();
	//$column.css("width")=mainbox_width
	
	if (mainbox_width > 620) {
		$debug.innerHTML=mainbox_width+"<br>"
						+main_height+"<br>"
						+column_width+"<br>"
						+column_height+"<br>";
						
						
		
	}else {
		
	}

	
};
/* 自适应窗体 end /
*/

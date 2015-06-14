var $debug = document.getElementById("debug");
$("#aboutme").click(function (){show_detail();});
$('#mainbox').click(function (){hide_detail();});
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
/*导航栏*/
$("#nav span").click(function (){
	
});

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

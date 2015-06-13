
$("#aboutme").click(function (){
	$("#detail").css("margin","0 0 0 -10px")
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

var url_g  //转存一下url
var hostURL = "http://deepkolos.github.io/"

//进入动画
function wellCome(){
	$("#column").css({"margin-top":"0px" , "opacity":"1"});
	$("#mainBox").css({ "opacity":"1","margin-top":"50px"});
	
}

//离开动画
function goodBye(){
	$("#column").css({"margin-top":"0px" , "opacity":"0"});
	$("#mainBox").css({"margin-top":"10%" , "opacity":"0"});
}
//延迟执行
function delayRun(func,time) {
	var thenRun = setTimeout("window.location.assign(url_g)",time)
}

//设置超链接延迟
function openURL(url){
	goodBye();
	url_g = url ;
	delayRun("window.location.assign(url_g)",400)
}

//前进后退 
//$("#back").click(function (){goodBye();delayRun("window.history.back()",400)});
//$("#forward").click(function (){goodBye();delayRun("window.history.froward()",400)});

//导航栏按钮
$("#b_nav0").click(function (){openURL(hostURL);});
$("#b_nav2").click(function (){openURL();});
$("#b_nav3").click(function (){openURL();});

//dir 特别对待
$("#b_nav1").click(function (){openURL();});



//文章数据储存--点击量
function loadXML(url){
	if (window.XMLHttpRequest)
	  {// code for IE7+, Firefox, Chrome, Opera, Safari
	  xmlhttp=new XMLHttpRequest();
	  }
	else
	  {// code for IE6, IE5
	  xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
	  }
	xmlhttp.open("GET", url ,false);
	xmlhttp.send();
	xmlDoc=xmlhttp.responseXML;
}

loadXML(hostURL+"data.xml");


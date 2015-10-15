var gameBox = id("gaming");
var startBox = id("start");
var menuButton = id("menuButton");
var rangeButton = id("range");
var pkButton = id("pk");
var restartButton = id("restart");
var shareButton = id("share");
var navbar = id("nav");
var goGame = id("goGame");
var used_timeBox = id("used_time");
var pageBox ={
	start : "0px",
	gaming : "-480px",
	suspend : "-"+2*480+"px",
	end : "-"+3*480+"px"
}
var page = id("page");
var toggleMenu = -1;
var list = new Array();
var list_ramdon = new Array();
//default setting
var shape = "square" ;
var size = 4 ;
var difficulty = "normal" ;
var symbol = "number" ;
var gaming = 1 ;
var startTime,stopTime;

//setting of event 
//菜单显示
menuButton.onmousedown = function (){
	toggleMenu = toggleMenu*-1 ;
	if (toggleMenu == 1) nav.style.overflow = "visible";
	if (toggleMenu == -1) nav.style.overflow = "hidden";
}
page.onmousedown = function (){
	if (toggleMenu == 1){
		nav.style.overflow = "hidden";
		toggleMenu = toggleMenu*-1 ;
	}
	
}
//功能按钮
rangeButton.onmousedown = function (){
	startBox.style.marginTop = pageBox.suspend;
}
pkButton.onmousedown = function (){
	startBox.style.marginTop = pageBox.end;
}
restartButton.onmousedown = function (){
	startBox.style.marginTop = pageBox.start;
	
}
shareButton.onmousedown = function (){
	
}
//设置shape
id("shape").getElementsByTagName("div")[1].onmousedown = function (){
	id("shape").getElementsByClassName("active")[0].style.marginLeft = (1-1)*50+"px" ;
	shape = 1 ;
}
id("shape").getElementsByTagName("div")[2].onmousedown = function (){
	id("shape").getElementsByClassName("active")[0].style.marginLeft = (2-1)*50+"px" ;
	shape = 2 ;
}
id("shape").getElementsByTagName("div")[3].onmousedown = function (){
	id("shape").getElementsByClassName("active")[0].style.marginLeft = (3-1)*50+"px" ;
	shape = 3 ;
}
id("shape").getElementsByTagName("div")[4].onmousedown = function (){
	id("shape").getElementsByClassName("active")[0].style.marginLeft = (4-1)*50+"px" ;
	shape = 4 ;
}
//size
id("size").getElementsByTagName("div")[1].onmousedown = function (){
	id("size").getElementsByClassName("active")[0].style.marginLeft = (1-1)*50+"px" ;
	size = 4 ;
}
id("size").getElementsByTagName("div")[2].onmousedown = function (){
	id("size").getElementsByClassName("active")[0].style.marginLeft = (2-1)*50+"px" ;
	size = 5 ;
}
id("size").getElementsByTagName("div")[3].onmousedown = function (){
	id("size").getElementsByClassName("active")[0].style.marginLeft = (3-1)*50+"px" ;
	size = 6 ;
}
id("size").getElementsByTagName("div")[4].onmousedown = function (){
	id("size").getElementsByClassName("active")[0].style.marginLeft = (4-1)*50+"px" ;
	size = 7 ;
}
//symbol
id("symbol").getElementsByTagName("div")[1].onmousedown = function (){
	id("symbol").getElementsByClassName("active")[0].style.marginLeft = (1-1)*50+"px" ;
	symbol = 1 ;
}
id("symbol").getElementsByTagName("div")[2].onmousedown = function (){
	id("symbol").getElementsByClassName("active")[0].style.marginLeft = (2-1)*50+"px" ;
	symbol = 2 ;
}
//difficulty
id("difficulty").getElementsByTagName("div")[1].onmousedown = function (){
	id("difficulty").getElementsByClassName("active")[0].style.marginLeft = (1-1)*50+"px" ;
	difficulty = 1 ;
}
id("difficulty").getElementsByTagName("div")[2].onmousedown = function (){
	id("difficulty").getElementsByClassName("active")[0].style.marginLeft = (2-1)*50+"px" ;
	difficulty = 2 ;
}
//alert(id("menu").getElementsByTagName("div").length)
//游戏开始
goGame.onmousedown = function (){
	gaming = 1 ;
	startBox.style.marginTop = pageBox.gaming;
	ramdomList();
	createTable();
	var getDate = new Date() ;
	startTime = getDate.getTime();
}
//game initialize
//生成随机数
function ramdomList(){
	for (var i = 1 ; i <= size*size ; i++){
		list[i-1]=i;
	}
	for (var i = list.length ; i > 0 ; i--){
		var ramdon = Math.floor(Math.random()*list.length);
		list_ramdon[size*size-i] = list[ramdon];
		list.splice(ramdon,1);
	}
	//alert("list_ramdon:"+list_ramdon); 
}
//随机数与表格合并
function combineTable(){
	
	
} 
//生成表格
function createTable(){
	gameBox.innerHTML = "";
	var button = "";
	var littleboxWidth = (360-17-5*size)/size ;
	for (var i = 0 ; i < size*size ; i++){
		button += "<div id='"+list_ramdon[i]+"' onmousedown='checkClick("+list_ramdon[i]+")'" 
		button += " style='width:"+littleboxWidth+"px;height:"+littleboxWidth+"px;line-height:"+littleboxWidth+"px;font-size:"+littleboxWidth/1.6+"px;'>"
		button += list_ramdon[i]+"</div>"
	}
	gameBox.innerHTML = button ;
}

//Gaming
function checkClick(i){
	if (i == gaming){
		//alert("yes");
		gaming++
	}else{
		//alert("not ok")
	}
	if (gaming == size*size+1){
		var getDate = new Date() ;
		stopTime = getDate.getTime();
		startBox.style.marginTop = pageBox.end;
		used_timeBox.innerHTML = (stopTime-startTime)/1000+"s"
	}
}


document.onselectstart = function (){return false}
//basic packing
function id(id){
	return document.getElementById(id);
}
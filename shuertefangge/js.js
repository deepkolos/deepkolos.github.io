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
var tooglePage = 0 ;
var list = new Array();
var list_ramdon = new Array();
var LetterTable = new Array();
LetterTable[0] = "A" ;
LetterTable[1] = "B" ;
LetterTable[2] = "C" ;
LetterTable[3] = "D" ;
LetterTable[4] = "E" ;
LetterTable[5] = "F" ;
LetterTable[6] = "G" ;
LetterTable[7] = "H" ;
LetterTable[8] = "I" ;
LetterTable[9] = "J" ;
LetterTable[10] = "K" ;
LetterTable[11] = "L" ;
LetterTable[12] = "M" ;
LetterTable[13] = "N" ;
LetterTable[14] = "O" ;
LetterTable[15] = "P" ;
LetterTable[16] = "Q" ;
LetterTable[17] = "R" ;
LetterTable[18] = "S" ;
LetterTable[19] = "T" ;
LetterTable[20] = "U" ;
LetterTable[21] = "V" ;
LetterTable[22] = "W" ;
LetterTable[23] = "Y" ;
LetterTable[24] = "X" ;
LetterTable[25] = "Z" ;
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
	if (toggleMenu == 1){
		//nav.style.overflow = "visible";
		menuButton.getElementsByTagName("div")[0].className = "menuButton_toggle_top" ;
		menuButton.getElementsByTagName("div")[2].className = "menuButton_toggle_bottom" ;
		id("shape").style.transition = "all .2s ease-out .0s" ;
		id("size").style.transition = "all .2s ease-out .1s" ;
		id("symbol").style.transition = "all .2s ease-out .2s" ;
		id("difficulty").style.transition = "all .2s ease-out .3s" ;
		id("shape").style.marginLeft ="0px" ;
		id("size").style.marginLeft = "0px" ;
		id("symbol").style.marginLeft = "0px" ;
		id("difficulty").style.marginLeft = "0px" ;
	}
	if (toggleMenu == -1){
		//var t = setTimeout(function (){nav.style.overflow = "hidden";},400);
		menuButton.getElementsByTagName("div")[0].className = "" ;
		menuButton.getElementsByTagName("div")[2].className = "" ;
		id("shape").style.transition = "all .2s ease-out .3s" ;
		id("size").style.transition = "all .2s ease-out .2s" ;
		id("symbol").style.transition = "all .2s ease-out .1s" ;
		id("difficulty").style.transition = "all .2s ease-out .0s" ;
		id("shape").style.marginLeft = "-200px" ;
		id("size").style.marginLeft = "-200px" ;
		id("symbol").style.marginLeft = "-100px" ;
		id("difficulty").style.marginLeft = "-100px" ;
	}
	startBox.style.marginTop = pageBox.start;
}
page.onmousedown = function (){
	if (toggleMenu == 1){
		//nav.style.overflow = "hidden";
		menuButton.getElementsByTagName("div")[0].className = "" ;
		menuButton.getElementsByTagName("div")[2].className = "" ;
		id("shape").style.transition = "all .2s ease-out .3s" ;
		id("size").style.transition = "all .2s ease-out .2s" ;
		id("symbol").style.transition = "all .2s ease-out .1s" ;
		id("difficulty").style.transition = "all .2s ease-out .0s" ;
		id("shape").style.marginLeft = "-200px" ;
		id("size").style.marginLeft = "-200px" ;
		id("symbol").style.marginLeft = "-100px" ;
		id("difficulty").style.marginLeft = "-100px" ;
		toggleMenu = toggleMenu*-1 ;
	}
	
}
//功能按钮
/*
rangeButton.onmousedown = function (){
	startBox.style.marginTop = pageBox.suspend;
	
}
pkButton.onmousedown = function (){
	startBox.style.marginTop = pageBox.end;
}
*/
restartButton.onmousedown = function (){
	startBox.style.marginTop = pageBox.start;
	restartButton.style.transform = "rotate(360deg)" ;
	restartButton.style.transition = "all .2s ease-in .0s" ;
	var t = setTimeout(function (){restartButton.style.transform = "rotate(0deg)" ;restartButton.style.transition = "all .0s ease-in .0s" ;},220);
}
document.getElementsByClassName("restart")[0].onmousedown = function (){
	startBox.style.marginTop = pageBox.start;
	restartButton.style.transform = "rotate(360deg)" ;
	restartButton.style.transition = "all .2s ease-in .0s" ;
	var t = setTimeout(function (){restartButton.style.transform = "rotate(0deg)" ;restartButton.style.transition = "all .0s ease-in .0s" ;},220);
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
	size = 4 ;
	id("size").getElementsByClassName("active")[0].style.marginLeft = (1-1)*50+"px" ;
}
id("size").getElementsByTagName("div")[2].onmousedown = function (){
	size = 5 ;
	id("size").getElementsByClassName("active")[0].style.marginLeft = (2-1)*50+"px" ;
}
id("size").getElementsByTagName("div")[3].onmousedown = function (){
	if (!(size <= 5 && symbol == "letter")){
		id("size").getElementsByClassName("active")[0].style.marginLeft = (3-1)*50+"px" ;
		size = 6 ;
	}
}
id("size").getElementsByTagName("div")[4].onmousedown = function (){
	if (!(size <= 5 && symbol == "letter")){
		id("size").getElementsByClassName("active")[0].style.marginLeft = (4-1)*50+"px" ;
		size = 7 ;
	}
}

//symbol
id("symbol").getElementsByTagName("div")[1].onmousedown = function (){
	id("symbol").getElementsByClassName("active")[0].style.marginLeft = (1-1)*50+"px" ;
	symbol = "number" ;
}
id("symbol").getElementsByTagName("div")[2].onmousedown = function (){
	if(size <= 5){
	id("symbol").getElementsByClassName("active")[0].style.marginLeft = (2-1)*50+"px" ;
	symbol = "letter" ;
	}
}
//difficulty
id("difficulty").getElementsByTagName("div")[1].onmousedown = function (){
	id("difficulty").getElementsByClassName("active")[0].style.marginLeft = (1-1)*50+"px" ;
	difficulty = "normal" ;
}
id("difficulty").getElementsByTagName("div")[2].onmousedown = function (){
	id("difficulty").getElementsByClassName("active")[0].style.marginLeft = (2-1)*50+"px" ;
	difficulty = "easy" ;
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
	if (symbol == "number"){ var showsymbol = list_ramdon[i] ;}
	if (symbol == "letter"){ var showsymbol = LetterTable[list_ramdon[i]-1] ;}
		button += "<div id='button"+list_ramdon[i]+"' onmousedown='checkClick("+list_ramdon[i]+")'" 
		button += " style='width:"+littleboxWidth+"px;height:"+littleboxWidth+"px;line-height:"+littleboxWidth+"px;font-size:"+littleboxWidth/1.6+"px;'>"
		button += showsymbol+"</div>"
	}
	gameBox.innerHTML = button ;
}

//Gaming
function checkClick(i){
	id("button"+i).style.background = "gray" ;
	if (difficulty !== "easy"){var t = setTimeout(function(){id("button"+i).style.background = "none" ;},100)}
	if (i == gaming || i.toString() == LetterTable[gaming-1]){
		//alert("yes");
		gaming ++ ;
		if (difficulty == "easy") document.getElementById("button"+i).style.background = "red" ;
	}else{
		//  ?
		//alert("not ok"+i);
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
function domClass(domClass){
	return document.getElementsByName(domClass);
}
var cellNumWidth 
    ,cellNumHeight
    ,cellNum  
    ,eggs 
    ,eggsFound
    ,eggsUncovered
    ,list_Eggs 
    ,list_Empty 
    ,list_Uncovered 
    ,list_NumInCell
    ,startAt
    ,endAt
    ,isMark
    ,gameBox;
    
$$$("gameStart").onmousedown = function (){
    $("#gameStart").css({display:"none"} );
    $("#flags")
        .velocity({
            left: "55%" ,
            top: "10%" ,
            scale : 0.3,
            rotateZ  : 360
        },{
            duration:400,
            easying:"ease",
            complete:function(){
                gameStart();
                $(this).find(".setting").velocity({height:0,opacity:0});
                $(this).find(".gaming").velocity({opacity:1});
                },
            
        } );
     $("#background img").velocity({opacity:0.1});
};
//setting
var difficluty = 0;
var hasEggs = false ;
var hasRewards = false ;
var hasInterrupt = false ;
var version2 = false ;

$("#difficulty span").mousedown(function (){
    difficluty = $("#difficulty span").index($(this));
    $("#difficulty").velocity({ marginTop : -30*difficluty });
});
$(".checkBox").mousedown(function (){
    switch($(".checkBox").index($(this))){
        case 0 : hasEggs = (hasEggs)? false :true;break;
        case 1 : hasRewards = (hasRewards)? false :true;break;
        case 2 : hasInterrupt = (hasInterrupt)? false :true;break;
        case 3 : version2 = (version2)? false :true;break;
    }
    $(this).find(".isChecked").css({background:($(this).find(".isChecked").css("background") == "black" )?"none":"black"});
});
$(".choice").mousedown(function() {
    $(this).css({overflow:(($(this).css("overflow") == "visible") ? "hidden" :"visible")});
});



function gameStart(){
    cellNumWidth = 8*((difficluty > 0)?2:1);
    cellNumHeight = 11*((difficluty-1 > 0)?2:1) ;
    cellNum = cellNumHeight * cellNumWidth ;
    eggs = Math.floor( cellNum / 4.8 );
    eggsUncovered = 0;
    eggsFound = 0 ;
    list_Eggs = new Array();
    list_Empty = new Array();
    list_Uncovered = new Array();
    list_NumInCell = new Array(new Array());//如何声明一个二维数组？？
    //生成地图
    var cells = "";
        gameBox = $$$("gameBox");
    for ( var i = 0 ; i < cellNumHeight ; i++){
        for( var j = 0 ; j < cellNumWidth ; j++){
            cells += "<div id='cell-"+j+"-"+i+"' onmousedown='uncover("+j+","+i+")'></div>" ;
            
        }
    }
    $("#gameBox").css({
        width:((difficluty > 0)?2:1)*360,
        height:((difficluty-1 > 0)?2:1)*480
    });
    gameBox.innerHTML = cells ; 
    $("#gameBox").scrollLeft(100);
    //生成eggs
    for ( var i = 1 ; i <= eggs ; i++){
        var x = getRandom(cellNumWidth);
        var y = getRandom(cellNumHeight);
        var cellOfEgg = $$$("cell-"+x+"-"+y);
        if( isEgg( x , y ) ) i--;
        else {
            setCSS( $$$("cell-"+x+"-"+y) , EggDivBefore);
            list_Eggs[list_Eggs.length] = Array(x,y) ;
        };
    }

    //生成数字
    for ( var i = 0 ; i < cellNumHeight ; i++){
        for( var j = 0 ; j < cellNumWidth ; j++){
            var count = numAround(j,i,list_Eggs);
            if(count == 0 ) 
                list_Empty[list_Empty.length] = Array(j,i);
        }
    }
    $("#progressInf").html(eggs-eggsFound);
    for(var x = -1 ; x <= cellNumWidth ;x++){
        list_Uncovered[list_Uncovered.length] = Array( x , -1 );
        list_Uncovered[list_Uncovered.length] = Array( x , cellNumHeight );
    }
    for(var y = -1 ; y <= cellNumHeight ;y++){
        list_Uncovered[list_Uncovered.length] = Array( cellNumWidth , y );
        list_Uncovered[list_Uncovered.length] = Array( -1 , y );
    }
    //点击一次变成标注
    isMark = false;
    $$$("flags").onmousedown = function(){
        isMark = true;
        $(".triangleBottom").css({borderTopColor:"yellow"});
        $(".triangleTop").css({borderBottomColor:"yellow"});
        $("#flags").css({background:"yellow"});
    };
    var start_time = new Date() ;
    startAt = start_time.getTime();
}

//判断是否是egg
function isEgg(x,y,where){
	return isInArray( x , y , list_Eggs , where );
}
//判断是否是空白
function isEmpty(x,y,where){
	return isInArray( x , y , list_Empty ,where);
}
//判断是否是已被揭开
function isUncovered(x,y,where){
	return isInArray( x , y , list_Uncovered , where );
}

//周围list_*个数

function numAround(j,i,array){
	var count = 0;
		for(var l = 0 ; l <= array.length-1 ; l++){
			if( array[l][0] == j-1 && array[l][1] == i-1 ) count++;
			if( array[l][0] == j && array[l][1] == i-1 ) count++;
			if( array[l][0] == j+1 && array[l][1] == i-1 ) count++;
			if( array[l][0] == j-1 && array[l][1] == i ) count++;
			if( array[l][0] == j+1 && array[l][1] == i ) count++;
			if( array[l][0] == j-1 && array[l][1] == i+1 ) count++;
			if( array[l][0] == j && array[l][1] == i+1 ) count++;
			if( array[l][0] == j+1 && array[l][1] == i+1 ) count++;
		}
		return count;
}
//在边缘添加空白的方块,处理边缘计数问题
//list_Empty list_Uncovered
/*for(var x = -1 ; x <= cellNumWidth ;x++){
    list_Uncovered[list_Uncovered.length] = Array( x , -1 );
    list_Uncovered[list_Uncovered.length] = Array( x , cellNumHeight );
}
for(var y = -1 ; y <= cellNumHeight ;y++){
    list_Uncovered[list_Uncovered.length] = Array( cellNumWidth , y );
    list_Uncovered[list_Uncovered.length] = Array( -1 , y );
}
*/
//判断发现egg
function isEggFonud(j,i){
	var count = true;
    if( !isEgg(j-1,i-1) && !isUncovered(j-1,i-1)) count = false ;
    if( !isEgg(j,i-1) && !isUncovered(j,i-1)) count = false ;
    if( !isEgg(j+1,i-1) && !isUncovered(j+1,i-1)) count = false ;
    if( !isEgg(j-1,i) && !isUncovered(j-1,i)) count = false ;
    if( !isEgg(j+1,i) && !isUncovered(j+1,i)) count = false ;
    if( !isEgg(j-1,i+1) && !isUncovered(j-1,i+1)) count = false ;
    if( !isEgg(j,i+1) && !isUncovered(j,i+1)) count = false ;
    if( !isEgg(j+1,i+1) && !isUncovered(j+1,i+1)) count = false ;
	return count;
}

//事件处理
function uncover(x,y){
	var cell = $$$("cell-"+x+"-"+y);
    if(isMark && !isUncovered(x,y)){
        setCSS( cell ,{
            background:((cell.style.backgroundColor == "yellow")?"black":"yellow")
        });
        $(".triangleBottom").css({borderTopColor:"deepskyblue"});
        $(".triangleTop").css({borderBottomColor:"deepskyblue"});
        $("#flags").css({background:"deepskyblue"});
        isMark = false;
    }
	//如果点开的从是未点开的
	else if( !isUncovered( x , y ) ){
		list_Uncovered[list_Uncovered.length] = Array( x , y );
		if( numAround(x,y,list_Eggs) != 0 )
			cell.innerHTML = numAround(x,y,list_Eggs);
		//如果点开的从是未点开的,并且是egg
	if(isEgg(x,y)){
		setCSS( cell , EggDivAfter );
		/*if(eggsUncovered == eggs-1)
			;//eggsEvent("bye");
		else*/
			eggsUncovered++;
        notify("点错而已威,忽略TA");
		//eggsEvent(isEgg(x,y,true));
		//如果点开的从是未点开的,并且是空格
	}else if( isEmpty( x , y ) || numAround(x,y,list_Eggs) == 1){// 
		//找出所有需要处理的附近的空格
		var list_needToHandle = new Array();
			list_needToHandle[0] = Array( x , y );
		for (var i = 0 ; i < list_needToHandle.length ; i++ ){
			var x = list_needToHandle[i][0] ;
			var y = list_needToHandle[i][1] ;
		
		function addNeedToHandle(x,y){
			if( x >= 0 && y >= 0 && x < cellNumWidth && y < cellNumHeight ) {
				if( (isEmpty( x , y ) || getRandom(10) == 2) && !isUncovered( x , y )  )
					list_needToHandle[list_needToHandle.length] = Array( x , y ); 
				
			}
		}
		handleAround(x,y,addNeedToHandle);
		function needToUncover(x,y){
			if( !isEgg(x,y)  &&  !isUncovered( x,y ) && x >= 0 && y >= 0 && x < cellNumWidth && y < cellNumHeight  ){
				var cell = $$$("cell-"+x+"-"+y);
				if( numAround(x,y,list_Eggs) != 0 )
					cell.innerHTML = numAround(x,y,list_Eggs);
				cell.style.background = "#F0F8FF"; 
				list_Uncovered[list_Uncovered.length] = Array( x , y );
			}
		}
		
		handleAround(x,y,needToUncover);
		
		//style 设置
		cell.style.background = "#F0F8FF";

		}
		//如果点开的从是未点开的,是其他
	}else {	
	cell.style.background = "#F0F8FF";
	}
	}
	else if(isEgg(x,y)){
		//eggsEvent(isEgg(x,y,true));
	}
    //检查是否把雷扫完了
    eggsFound = 0;
    for(var i = 0 ; i < list_Eggs.length ; i++ )
        if( isEggFonud( list_Eggs[i][0],list_Eggs[i][1] ) )
            eggsFound++
    $("#progressInf").html(eggs-eggsFound);
    $("#progressBar").velocity({width:parseInt(eggsFound/eggs*190)});
    if(eggsFound == eggs) {
        $(".gaming .container").velocity({ marginTop : -99 });
        var end_time = new Date() ;
            endAt = end_time.getTime(); 
        $("#usedTime").html(parseInt((endAt-startAt)/1000)+"s");
        $(".triangleBottom").css({borderTopColor:"red"});
        $(".triangleTop").css({borderBottomColor:"red"});
        $("#flags").velocity({
            left: "25%" ,
            top: "25%" ,
            scale : 1,
            rotateZ  : 0
        },{
            duration:400,
            easying:"ease",
            complete:function(){
                gameBox.innerHTML = "";
                $("#gameStart").css({display:"inline"} );
                $$$("flags").onmousedown = function(){
                    $("#flags .setting").velocity({height:150,opacity:1});
                    $("#flags .gaming").velocity({opacity:0});
                    $(".triangleBottom").css({borderTopColor:"deepskyblue"});
                    $(".triangleTop").css({borderBottomColor:"deepskyblue"});
                    $("#progressBar").velocity({width:0});
                    $(".gaming .container").velocity({ marginTop : 0 });
                    $("#background img").velocity({opacity:0.1});
                };
                },
            
        } );
        
        if(hasRewards) notify("MineSweeper For Gali* ");
    }
}

//eggs event
function eggsEvent(thisEgg){
	gotoPage(thisEgg);
	switch (thisEgg){
		case 0: notify("С��Ʒ���������ϣ����²�"); notify("��Ȼ��������");break;
		case 1: notify("��һ��Miss������Ƭ�����Ѱ�");break;
		case 2: notify("����Ӧ�ô�������û������");break;
		case 3: notify("û������ǿ��������");break;
		case 4: notify("�����������ǿ��Ĺ�");break;
		case 5: notify("ΰ��ʱʱ�̿����洺��");break;
		case 6: notify("Big water Fish");break;
		case 7: notify("�Ǻ�");break;
		case 8: notify("�кܶ�����Ҫ����");break;
		case 9: notify("��־");break;
		case 10: notify("¬��");break;
		case 11: notify("����");break;
		case 12: notify("����Ӧ�ô�������û������");break;
		case 13: notify("������������");break;
		case 14: notify("��ͷ");break;
		case 15: notify("��ʵ����һ��������Ƭ����");notify("һ����ѡ��18��");notify("ֻ�Ǻ�ɨ�׽���������EggSweeper");notify("�����Ǳ���ǿ׳������");break;
		case 16: notify("����");break;
		case 17: notify("�ð����Ըе��Ǳ�");notify("��������ȥ�ĸ��У�bye");break;
		case "bye":break;
		
	}
}

//通知plan 显示样式根据内容来确定，
var notification = $$$("notification");
var list_notification_g ;
function notifyContainer(){
	var list_notification = new Array();
	var isShowing = false ;
	var isDealing = 0 ;
	function send(content){//相当于这个变成程序的入口，参数都从这里进去？？？
		list_notification[list_notification.length] = content;
		list_notification_g = list_notification;
		if( !isShowing )
			startTimeCount();
	}
	function startTimeCount(){
		isShowing = true ;
		//showing
		html = notification.innerHTML + "<div><span>"+list_notification[isDealing]+"</span></div>";
		notification.innerHTML = html;
		(function (){
			var isDealingCahe = isDealing;
			setTimeout(function (){
				//通知ing的样式
				notification.style.zIndex = "20";
				$( notification.getElementsByTagName("div")[isDealingCahe] ).velocity( notificationDivBefore,300 );
			},50);
		})();
		//EndTimeCount
		(function (){
		var isDealingCahe = isDealing;
		var time = 800 + list_notification[isDealingCahe].length*50 ;
		setTimeout(function (){
			isShowing = false ;
			isDealing++;
			//处理通知ed
			(function (){
			var isDealingCahe1 = isDealingCahe;
			setTimeout(function (){
				//通知ed的样式
				$( notification.getElementsByTagName("div")[isDealingCahe1]).velocity( notificationDivAfter ,300);
			},50);
			})();
			if(isDealing > list_notification.length-1){
				setTimeout(function (){
					//check again
					if(isDealing > list_notification.length-1)
						notification.style.zIndex = "-1";
				},300);
			}
			else{
				startTimeCount();
			}
		},time);
		})();
	}
	return send;
}
var notify = notifyContainer();
//notify("����ɨ�׵ĺ������ϰ�--����ר��");
//notify("�о�ϲŶ");


//showAttrOf(window);

function confirmContainer(){
	//confirm template 
	var confirmTemplate = document.createElement("div");
	var contentDiv = document.createElement("div");
	var checkBoxYes = document.createElement("div");
	var checkBoxNo = document.createElement("div");
	var contentTxtSpan = document.createElement("span");
	var txtCheckBoxYes = document.createTextNode("�ǵ�");
	var txtCheckBoxNo = document.createTextNode("����");
	var txtContent = document.createTextNode("");
	contentTxtSpan.appendChild(txtContent);
	confirmTemplate.appendChild(contentDiv); 
	confirmTemplate.appendChild(checkBoxYes);
	confirmTemplate.appendChild(checkBoxNo);
	checkBoxYes.appendChild(txtCheckBoxYes);
	checkBoxNo.appendChild(txtCheckBoxNo);
	contentDiv.appendChild(contentTxtSpan);
	setCSS( confirmTemplate , {
		width: "270px",
		height: "auto",
		position: "absolute",
		background: "black",
		zIndex: "20",
		left: "45px",
		top: "250px",
		opacity: "0",
		transition: "all .5s ease .1s"
	});
	setCSS( contentDiv , {
		width: "100%",
		height: "auto",
		background: "white",
		padding: "10px 0px",
		textAlign: "center"
		
	});
	setCSS( contentTxtSpan , {
		width: "100%",
		height: "auto",
		background: "white",
		padding: "10px 10px"
		
	});
	setCSS( checkBoxYes , {
		width: "50%",
		height: "auto",
		padding: "10px 0px",
		background: "red",
		float: "left",
		textAlign: "center"
	});
	setCSS( checkBoxNo , {
		width: "50%",
		height: "auto",
		background: "blue",
		padding: "10px 0px",
		float: "left",
		textAlign: "center"
	});
	
	function confirm(content,yesFn,noFn){
		contentTxtSpan.innerHTML = content;
		function closeComfirm(){
			setTimeout(function(){
				$$$("controlPanle").removeChild(confirmTemplate);
				contentTxtSpan.removeChild(txtContent);
			},520);
			setCSS( confirmTemplate , {
				top: "250px",
				opacity: "0"
			});
		}
		checkBoxYes.onmousedown = function (){
			closeComfirm();
			yesFn();
		};
		checkBoxNo.onmousedown = function (){
			closeComfirm();
			noFn();
		};
		$$$("controlPanle").appendChild(confirmTemplate);
		void function (){
			setTimeout(function (){
				setCSS( confirmTemplate , {
					top: "200px",
					opacity: "1"
				});
			},50);
		}();
	}
	return confirm;
}
//var confirm = confirmContainer();

/*
confirm("test",(function(){
	//yesfn
		alert("yes");
	}),(function(){
	//nofn
	alert("no");
	}));
*/

//这里可以试一下模仿C#的委托(函数引用)

//���δ�����������  --�������ظ�����һ�����ڵĻ�������Ҫ��һ��confirm��conten ��¼����notify����һ��
//����ʵ�ֿ��Եȴ�ȷ�ϣ�������    ----ֱ�Ӱ���Ӧ�¼�����ȥ
//��дһ�����Թ��̵��ӳ�ִ����--then

//send("<div>no ok </div>"); //����divԪ�ظı���notification�µ�div�������Լ����ţ����Գ���ָ������
							 //��������ֻ���������治ʹ��div��ǩ
//done: disappear delay depenes on string length


//中Egg的事件响应

function gotoPage(iEgg){
	$$$("pageOfEvent").getElementsByTagName("div")[iEgg].style.zIndex = "10";
	setCSS( pageOfEvent.getElementsByTagName("div")[iEgg] , imgPageOfEventBefore );
	(function (){
		setTimeout(function (){
			setCSS( pageOfEvent.getElementsByTagName("div")[iEgg] , imgPageOfEventIng );
		},50);
	})();
}

//循环绑定事件
(function (){
	for (var i = 0 ; i < $$$("pageOfEvent").getElementsByTagName("div").length; i++ ){
		(function (){
			var iCache = i;
			$$$("pageOfEvent").getElementsByTagName("div")[iCache].onmousedown = function (){
			setCSS( $$$("pageOfEvent").getElementsByTagName("div")[iCache] , imgPageOfEventAfter );
			setTimeout(function (){
				$$$("pageOfEvent").getElementsByTagName("div")[iCache].style.zIndex = "-1";
			},300);
			}
		})();
	}
})();

//动画处理 

function setCSS(elem,setstyle){//下一步模仿jquery中$$$().CSS({});
	for(var p in setstyle){
		elem.style[p] = setstyle[p];
	}
}
//要变化的样式表
var notificationDivBefore = {
	//background : "red",
	top : "50%",
	opacity : "1"
};
var notificationDivAfter = {
	//background : "white",
	top : "55%",
	opacity : "0"
};
var EggDivBefore = {
	color : "red"
};
var EggDivAfter = {
	color: "red",
	background : "red"
};
var imgPageOfEventBefore = {
	opacity: "0"
	//left: "180px"
};
var imgPageOfEventIng = {
	opacity: "1"
	//left: "0px"
};
var imgPageOfEventAfter = {
	opacity: "0"
	//left: "-180px"
};



//basic function 

document.onselectstart = function (){return false}
function $$$(elem){
	/*
	$$$.setCSS : function ( attr ){
		if( attr == "background" ) return elem.style.background;
		if( attr == "top" ) return elem.style.background;
		if( attr == "left" ) return elem.style.background;
		if( attr == "right" ) return elem.style.background;
		if( attr == "bottom" ) return elem.style.background;
		if( attr == "background" ) return elem.style.background;
		if( attr == "background" ) return elem.style.background;
	}
	*/
	return document.getElementById(elem);
	
}
//��ʾobj����������
function showAttrOf(obj){
	for(var attr in obj){
		console.log(attr+":"+obj[attr]);
	}
}
//处理x,y距离为1的方格
function handleAround(x,y,func){
	func(x-1,y-1);
	func(x,y-1);
	func(x+1,y-1);
	func(x-1,y);
	func(x+1,y);
	func(x-1,y+1);
	func(x,y+1);
	func(x+1,y+1);
}
//查找是否在某个数列中存在，二维
function isInArray( x , y , array , where ){
	var flag = 0 ;
	for (var i = 0 ; i <= array.length-1 ; i++)
		if( array[i][0] == x && array[i][1] == y ) 
			flag = (where == undefined ) ? 1 : i;
	return flag;
}

//生成自定义范围的随机数 
function getRandom( range_Start , range_Stop){ 
	//注：如果想生成0到9的随机数，需要写成0-10，因为使用floor处理
	////：如果只有一个参数，默认start为0
	if (range_Stop == undefined ){ range_Stop = range_Start ; range_Start = 0 ; }
	return Math.floor(Math.random()*(range_Stop - range_Start))+range_Start ;
}


//learning log


/*//������ö��
var notificationDivAfter = {
	background : "",
	top : "",
	//opacity : 
};
for(var p in notificationDivAfter){
	alert(p+"--"+notificationDivAfter[p]);
}
*/

///��һ��obj�е���������һ��obj������ͬ���ֵ�����������ͬ��

/*
function setE(elem,setstyle){
	elem.style = setstyle;
	for(var p in setstyle){
		for(var i in elem.style){
			if( p == i ) 
				elem.style[p] = setstyle[p] ;
		}
		//Ȼ���ҷ�����ͨ��[p]����ȡstyle��p�����ԣ�����ζ��elem.style[p] = setstyle[p] ;�;����ˣ�����
		
		//elem.style.p = setstyle[p]; //�����в�ͨӦΪp�����ܴ���style������p��ָ������������
		//elem.style.background = "red";
		//console.log(elem);
		//console.log(p+":"+elem.style.p);
		//console.log(elem.style.background);
		//console.log(elem.style.top);
		//console.log(elem.style.opacity);
	}
}
*/
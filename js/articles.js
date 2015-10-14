//build a data base of articles for a better approach of sorting,showing and pagination.
var articles_list = new Array;
var articles = new Object;

function addArticle(title,year,month,day,label,text){
	var articles = {
			title : title ,
			time : {
				year:year,
				month:month,
				day:day,
				full:year+"/"+month+"/"+day
			} ,
			label : label , 
			text : text
		}
	articles_list[articles_list.length] = articles ;
}

//add Article here Plan:Later I will separate this to another js file
//text planing to use markdown ! 

addArticle("hello world0",15,9,9,"life",
	"I hope Object can save string like this        ， ok?"
	);

addArticle("hello world1",15,9,8,"life",
	"I hope Object can save string like this        ， ok?"   
	);

addArticle("hello world2",15,9,7,"life",
	"I hope Object can save string like this        ， ok?"
	);

//showArticleList
function showlList(){
	
}

//sortArticles 
//Later I want to separate time into 3 attributes:year,month,day 
//Or I can build a parser to parse time when need to using that 3 attributes.

//My train of thought : 
//1:create a new Array to store the sorted result
//2:sort by some attributes 
function sortArticles(method){
	
	
}

//show article here
function showArticles(){
	for (var i = 0 ; i <= articles_list.length-1; i++) {
		//list them out 
		var article = articles_list[i] ;
		var title = article.title ;
		var timefull = article.time.full ;
		var text = article.text ;
		var label = article.label ;
		//because I don't know how to pack it into a component in a very "nice" way 
		//so --
		
		
	}
	alert(articles_list[0].title +"<br/>"+ articles_list[0].text);
}

showArticles();

//how can i store read_times in js ? if js can do that i have to turn to xml for help

// test 
function newElement(_tag,attr,text){
	var tag = document.createElement(_tag) ;
	
}

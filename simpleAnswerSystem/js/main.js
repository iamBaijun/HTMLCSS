var array = new Array();
var timeId;
window.onload=function(){
	document.getElementById("setUpNone").onclick=function(){
		document.getElementById("setUp").style.display="none";
	}
	
	document.getElementById("create").onclick=function(){
		createAtithmetic();
	}
	document.getElementById("fraction").onclick=function(){
		getFraction();
	}
}

//获取所有的值进行计算分数

//生成运算
function createAtithmetic(){
	//获取位数
	var count = document.getElementById("selectCount").value;
	var index = document.getElementById("listIndex").value;
	var arithmetics = document.getElementsByName("arithmetic");
	document.getElementById("fraction").style.display="block";
	var arithmetic;
	for(var i =0;i<arithmetics.length;i++){
		if(arithmetics[i].checked){
			arithmetic = arithmetics[i].value;
		}
	}
	//设定分数统计
	document.getElementById("f1").value=index;
	document.getElementById("f2").value='';
	var countTime = 0;
	var countTimeStr = '';
	if(timeId){
		window.clearInterval(timeId);
	}
	timeId = window.setInterval(function(){
		countTime++;
		if(countTime<60){
			countTimeStr = countTime + '秒';
		}else if(countTime<3600){
			countTimeStr = Math.floor(countTime/60) +'分' + (countTime%60) +'秒';
		}
		document.getElementById("f4").value=countTimeStr;
		document.getElementById("f3").value=getTime();
	},1000);
	addArithmetic(count,index,arithmetic);

}
//将运算添加到页面
function addArithmetic(len,count,index){
	var main = document.getElementById('main');
	var str = '';
	for(var i=0;i<count;i++){
		var num1 = getNum(len);
		var num2 = getNum(len);
		while(num2 == 0){
			num2 = getNum(len);
		}
		while(num2>num1){
			num1 = getNum(len);
			num2 = getNum(len);
		}
		var num3 = 0;
		
		var arithmetic = randArithmetic(index);
		switch(arithmetic){
			case '+':
				num3 = num1 + num2;
				break;
			case '*':
				num3 = num1 * num2;
				break;
			case '-':
				num3 = num1 - num2;
				break;
			case '/':
				num3 = Math.round(num1/num2);
				break;
			default:
			num3 = 0;
		}
		array[i] = num3;
		str += '<tr><td>序号'+(i+1)+':</td><td>'+num1+'</td><td>'+arithmetic+'</td><td>'+num2+'</td><td> = '+
		'</td><td><input type="text" placeholder="请写入答案" /></td>'+
		'<td><span></span></td></tr>';
	}
	main.innerHTML = str;
}

//随机产生运算符
function randArithmetic(index){
	var arithmetic = new Array('+','-','*','/');
	if(-1<index&&index<4){
		return arithmetic[index]
	}else{
		return arithmetic[Math.floor(Math.random()*4)];
	}
	
}

//产生随机数
function getNum(len){
	var num = Math.floor(Math.random()*(Math.pow(10,len)));
	while((num+'').length<len){
		num = Math.floor(Math.random()*(Math.pow(10,len)));
	}
	return num;
}
//获取当前时间
function getTime(){
	var year = new Date().getFullYear();
	var month = new Date().getMonth();
	var day = new Date().getDate();
	var h = new Date().getHours();
	var m = new Date().getMinutes();
	var s = new Date().getSeconds();
	return year+'年'+month+'月'+day+'日 '+h+':'+m+':'+s;
}
function KeyDown(){
    //alert(22);
    if ((window.event.altKey)&&
    ((window.event.keyCode==37)|| //屏蔽 Alt+ 方向键 ←
    (window.event.keyCode==39))){ //屏蔽 Alt+ 方向键 →
    alert("不准你使用ALT+方向键前进或后退网页！");
    event.returnValue=false;
    }
    if (event.keyCode==116){ //屏蔽 F5 刷新键
        alert("禁止F5刷新网页！");
        event.keyCode=0;
        event.returnValue=false;
    }
    if ((event.ctrlKey)&&(event.keyCode==82)){ //屏蔽 Ctrl+R
        alert("禁止Ctrl+R刷新网页！");
        event.returnValue=false;
    }
    if ((event.shiftKey)&&(event.keyCode==121)){ //屏蔽 shift+F10
        alert("禁止shift+F10刷新网页！");
        event.returnValue=false;
    }
}
function getFraction(){
	//获取所有的答案
	var main = document.getElementById("main");
	var elements = main.getElementsByTagName('input');
	var eleSpan = main.getElementsByTagName('span');
	var count = 0;
	for(var i=0;i<elements.length;i++){
		var element = elements[i];
		var val = elements[i].value;
		if(array[i] == val&&!isNaN(val)){
			count += 1;
			eleSpan[i].innerHTML='恭喜答对了';
			eleSpan[i].style.color='green';
		}else{
			//count += 0;
			eleSpan[i].innerHTML='抱歉答错了';
			eleSpan[i].style.color='red';
		}
	}
	document.getElementById("f2").value=count;
	if(timeId){
		window.clearInterval(timeId);
	}
}

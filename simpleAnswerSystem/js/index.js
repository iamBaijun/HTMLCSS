window.onload=function(){
	var butt = document.getElementById("butt");
	butt.onclick=function(){
		check();
	}
}

//获取账号密码
function check(){
	var account = byId("account");
	var pass = byId("pass");
	//获取当前日期
	var nowDate = new Date();
	
	var checkPass = (nowDate.getMonth()+1)+""+(nowDate.getDate())+""+(nowDate.getDay())
	if(checkPass == pass){
		document.getElementById("passError").style.display="none";
		document.getElementById("mainHtml").style.display="block";
	}else{
		document.getElementById("mainHtml").style.display="none";
		document.getElementById("passError").style.display="block";
	}
}


//通过id 获取value
function byId(key){
	return document.getElementById(key).value;
}

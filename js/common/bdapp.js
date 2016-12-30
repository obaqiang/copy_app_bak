
function isOnline(){
	if(!navigator.onLine){
		alert('网络连接断开');
	}
}



function bdGetJson(url, data_list, apiGetJsonType, callback) {
	//	url:接口的路径
	//	data_list：接口的参数
	//	apiGetJsonType:是否跨域
	//	callback:对返回的数据进行操作的方法

	if(apiGetJsonType == "json") {
		mui.ajax(url, {
			data: data_list,
			dataType: 'json', //服务器返回json格式数据
			type: 'get', //HTTP请求类型
			timeout: 10000, //超时时间设置为10秒；
			headers: {
				'Content-Type': 'application/json'
			},
			success: function(data) {
				//服务器返回响应，根据响应结果，分析是否登录成功；
				//console.log(data);

				callback(data);
			},
			error: function(xhr, type, errorThrown) {
				//异常处理；
				console.log(type);
			}
		});
	} else if(apiGetJsonType == "jsonp") {
		mui.getJSONP(url, data_list, function(data) {
			//服务器返回响应，根据响应结果，分析是否登录成功；
			console.log(data_list);
			callback(data);

		});
	}
}

//设置cookie
function setCookie(name, value) {
	var Days = 30;
	var exp = new Date();
	exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000);
	document.cookie = name + "=" + escape(value) + ";expires=" + exp.toGMTString();

}

//读取cookie
function getCookie(name) {
	var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
	if(arr = document.cookie.match(reg)){
		console.log(arr[2]);
		return unescape(arr[2]);
	}else{
		console.log('缓存读取失败');
		return null;
	}
		
}



function UserInfo(){
};

//清除登录信息
UserInfo.clear = function(){
    plus.storage.removeItem('username');
    plus.storage.removeItem('password');
    plus.storage.removeItem('token');
}

//检查是否包含自动登录的信息
UserInfo.auto_login = function(){
    var username = UserInfo.username();
    var pwd = UserInfo.password();
    if(!username || !pwd){
        return false;
    }
    return true;
}

//检查是否已登录
UserInfo.has_login = function(){
    var username = UserInfo.username();
    var pwd = UserInfo.password();
    var token = UserInfo.token();
    var member_id = UserInfo.member_id();
    if(!username || !pwd || !token){
    	console.log('未登陆过');
        return false;
    }
    console.log('已登陆过');
    return true;
};

UserInfo.username = function(){
    if(arguments.length == 0){
        return plus.storage.getItem('username');        
    }
    if(arguments[0] === ''){
        plus.storage.removeItem('username');
        return;
    }
    plus.storage.setItem('username', arguments[0]);
};

UserInfo.password = function(){
    if(arguments.length == 0){
        return plus.storage.getItem('password');        
    }
    if(arguments[0] === ''){
        plus.storage.removeItem('password');
        return;
    }
    plus.storage.setItem('password', arguments[0]);
};

UserInfo.token = function(){
    if(arguments.length == 0){
        return plus.storage.getItem('token');       
    }
    if(arguments[0] === ''){
        plus.storage.removeItem('token');
        return;
    }
    plus.storage.setItem('token', arguments[0]);
};
UserInfo.member_id = function(){
    if(arguments.length == 0){
        return plus.storage.getItem('member_id');       
    }
    if(arguments[0] === ''){
        plus.storage.removeItem('member_id');
        return;
    }
    plus.storage.setItem('member_id', arguments[0]);
};
function isOnline() {
	if(!navigator.onLine) {
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
	if(arr = document.cookie.match(reg)) {
		console.log(arr[2]);
		return unescape(arr[2]);
	} else {
		console.log('缓存读取失败');
		return null;
	}

}

function UserInfo() {};

//清除登录信息
UserInfo.clear = function() {
	plus.storage.removeItem('username');
	plus.storage.removeItem('password');
	plus.storage.removeItem('token');
}

//检查是否包含自动登录的信息
UserInfo.auto_login = function() {
	var username = UserInfo.username();
	var pwd = UserInfo.password();
	if(!username || !pwd) {
		return false;
	}
	return true;
}

//检查是否已登录
UserInfo.has_login = function() {
	var username = UserInfo.username();
	var pwd = UserInfo.password();
	var token = UserInfo.token();
	var member_id = UserInfo.member_id();
	if(!username || !pwd || !token) {
		console.log('未登陆过');
		return false;
	}
	console.log('已登陆过');
	return true;
};

UserInfo.username = function() {
	if(arguments.length == 0) {
		return plus.storage.getItem('username');
	}
	if(arguments[0] === '') {
		plus.storage.removeItem('username');
		return;
	}
	plus.storage.setItem('username', arguments[0]);
};

UserInfo.password = function() {
	if(arguments.length == 0) {
		return plus.storage.getItem('password');
	}
	if(arguments[0] === '') {
		plus.storage.removeItem('password');
		return;
	}
	plus.storage.setItem('password', arguments[0]);
};

UserInfo.token = function() {
	if(arguments.length == 0) {
		return plus.storage.getItem('token');
	}
	if(arguments[0] === '') {
		plus.storage.removeItem('token');
		return;
	}
	plus.storage.setItem('token', arguments[0]);
};
UserInfo.member_id = function() {
	if(arguments.length == 0) {
		return plus.storage.getItem('member_id');
	}
	if(arguments[0] === '') {
		plus.storage.removeItem('member_id');
		return;
	}
	plus.storage.setItem('member_id', arguments[0]);
};

function getLocalTime(nS) {
	return new Date(parseInt(nS) * 1000).toLocaleString().substr(0, 18)
}

//当前时间转时间戳
function datetime_to_unix(datetime) {
	var tmp_datetime = datetime.replace(/:/g, '-');
	tmp_datetime = tmp_datetime.replace(/ /g, '-');
	var arr = tmp_datetime.split("-");
	var now = new Date(Date.UTC(arr[0], arr[1] - 1, arr[2], arr[3] - 8, arr[4], arr[5]));
	return parseInt(now.getTime() / 1000);
}

// 时间戳转时间
function unix_to_datetime(unix) {
	var now = new Date(parseInt(unix) * 1000);
	return now.toLocaleString().replace(/年|月/g, "-").replace(/日/g, " ");
}

//js截取字符串，中英文都能用
//如果给定的字符串大于指定长度，截取指定长度返回，否者返回源字符串。
function cutstr(str, len) {
	var str_length = 0;
	var str_len = 0;
	str_cut = new String();
	str_len = str.length;
	for(var i = 0; i < str_len; i++) {
		a = str.charAt(i);
		str_length++;
		if(escape(a).length > 4) {
			//中文字符的长度经编码之后大于4
			str_length++;
		}
		str_cut = str_cut.concat(a);
		if(str_length >= len) {
			str_cut = str_cut.concat("...");
			return str_cut;
		}
	}
	//如果给定字符串小于指定长度，则返回源字符串；
	if(str_length < len) {
		return str;
	}
}

//账单页面和红包页面进入时的月份显示
function monthShow(month_time) {
	switch(month_time) {
		case 1:
			$('.bill_month').children().eq(0).addClass('bg_cb');
			break;
		case 2:
			$('.bill_month').children().eq(1).addClass('bg_cb');
			break;
		case 3:
			$('.bill_month').children().eq(2).addClass('bg_cb');
			break;
		case 4:
			$('.bill_month').children().eq(3).addClass('bg_cb');
			break;
		case 5:
			$('.bill_month').children().eq(4).addClass('bg_cb');
			break;
		case 6:
			$('.bill_month').children().eq(5).addClass('bg_cb');
			break;
		case 7:
			$('.bill_month').children().eq(6).addClass('bg_cb');
			break;
		case 8:
			$('.bill_month').children().eq(7).addClass('bg_cb');
			break;
		case 9:
			$('.bill_month').children().eq(8).addClass('bg_cb');
			break;
		case 10:
			$('.bill_month').children().eq(9).addClass('bg_cb');
			break;
		case 11:
			$('.bill_month').children().eq(10).addClass('bg_cb');
			break;
		case 12:
			$('.bill_month').children().eq(11).addClass('bg_cb');
			break;

	}
}

//定时小黑色弹框
function Alert(alert_text) {
	$('.alert_bl').remove();
	var alert_div = '<div class="alert_bl" style="display:none;"><span>' + alert_text + '</span></div>';
	$('body').append(alert_div);
	$('.alert_bl').fadeIn();
	setTimeout("$('.alert_bl').fadeOut()", 1500);
}
var oldback = mui.back;
mui.back = function() {
	mui.currentWebview.opener().show('none');
	oldback();
}
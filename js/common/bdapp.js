//var apiGetJsonType="jsonp";  //跨域 jsonp

function bdGetJson(url,data_list,apiGetJsonType,callback) {
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
		mui.getJSONP(url, data_list,function(data) {
			//服务器返回响应，根据响应结果，分析是否登录成功；
			console.log(data_list);
			callback(data);

		});
	}
}


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
	var pwd_hook_status = UserInfo.pwd_hook_status();
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
	var pwd_hook_status = UserInfo.pwd_hook_status();
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
UserInfo.pwd_hook_status = function() {
	if(arguments.length == 0) {
		return plus.storage.getItem('pwd_hook_status');
	}
	if(arguments[0] === '') {
		plus.storage.removeItem('pwd_hook_status');
		return;
	}
	plus.storage.setItem('pwd_hook_status', arguments[0]);
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

function showTel(data) {
	$('.show_tel').remove();
	var tel_div =
		'<div class="show_tel"></div>';
	$('body').append(tel_div);

	for(var i = 0; i < data.length; i++) {
		var tel_span =
			'<span class="tel">' + data[i] + '</span>';
		$('.show_tel').append(tel_span);

	}
	var cancel_div = '<span id="tel_cancel">取消</span>';
	$('.show_tel').append(cancel_div);

}

//拍照及选择图片start
function getImage() {
	var c = plus.camera.getCamera();
	c.captureImage(function(e) {
		plus.io.resolveLocalFileSystemURL(e, function(entry) {
			var s = entry.toLocalURL() + "?version=" + new Date().getTime();
			uploadHead(s); /*上传图片*/
		}, function(e) {
			console.log("读取拍照文件错误：" + e.message);
		});
	}, function(s) {
		console.log("error" + s);
	}, {
		filename: "_doc/head.png"
	})
}

//本地相册选择 
function galleryImg() {
	plus.gallery.pick(function(a) {
		plus.io.resolveLocalFileSystemURL(a, function(entry) {
			plus.io.resolveLocalFileSystemURL("_doc/", function(root) {
				root.getFile("head.png", {}, function(file) {
					//文件已存在 
					file.remove(function() {
						console.log("file remove success");
						entry.copyTo(root, 'head.png', function(e) {
								var e = e.fullPath + "?version=" + new Date().getTime();
								uploadHead(e); /*上传图片*/
								//变更大图预览的src 
								//目前仅有一张图片，暂时如此处理，后续需要通过标准组件实现 
							},
							function(e) {
								console.log('copy image fail:' + e.message);
							});
					}, function() {
						console.log("delete image fail:" + e.message);
					});
				}, function() {
					//文件不存在 
					entry.copyTo(root, 'head.png', function(e) {
							var path = e.fullPath + "?version=" + new Date().getTime();
							uploadHead(path); /*上传图片*/
						},
						function(e) {
							console.log('copy image fail:' + e.message);
						});
				});
			}, function(e) {
				console.log("get _www folder fail");
			})
		}, function(e) {
			console.log("读取拍照文件错误：" + e.message);
		});
	}, function(a) {}, {
		filter: "image"
	})
};

function compressImage(imgPath) {
	plus.zip.compressImage({
			src: imgPath,
			dst: imgPath,
			quality: 20
		},
		function() {
			alert("Compress success!");
		},
		function(error) {
			alert("Compress error!");
		});
}
//上传头像图片 
function uploadHead(imgPath) {

	var mainImage = $('.img_upload')[0];
	console.log(mainImage);

	console.log("imgPath = " + imgPath);
	mainImage.src = imgPath;
	mainImage.style.width = "60px";
	mainImage.style.height = "60px";

	var image = new Image();
	console.log('imgPath:' + imgPath);
	image.src = imgPath;
	image.onload = function() {
		var imgData = getBase64Image(image);

		/*在这里调用上传接口*/
		//              mui.ajax("图片上传接口", { 
		//                  data: { 
		//                       
		//                  }, 
		//                  dataType: 'json', 
		//                  type: 'post', 
		//                  timeout: 10000, 
		//                  success: function(data) { 
		//                      console.log('上传成功'); 
		//                  }, 
		//                  error: function(xhr, type, errorThrown) { 
		//                      mui.toast('网络异常，请稍后再试！'); 
		//                  } 
		//              }); 
	}
}
//将图片压缩转成base64 
function getBase64Image(img) {
	var canvas = document.createElement("canvas");
	var width = img.width;
	var height = img.height;
	// calculate the width and height, constraining the proportions 
	if(width > height) {
		if(width > 100) {
			height = Math.round(height *= 100 / width);
			width = 100;
		}
	} else {
		if(height > 100) {
			width = Math.round(width *= 100 / height);
			height = 100;
		}
	}
	canvas.width = width; /*设置新的图片的宽度*/
	canvas.height = height; /*设置新的图片的长度*/
	var ctx = canvas.getContext("2d");
	ctx.drawImage(img, 0, 0, width, height); /*绘图*/
	var dataURL = canvas.toDataURL("image/png", 0.8);
	return dataURL.replace("data:image/png;base64,", "");
}

//拍照及选择图片end
if(navigator.userAgent.indexOf("Html5Plus") < 0) { //不支持5+ API
	var member_id = GetQueryString('member_id');
	var token = GetQueryString('token');
	var Member = GetQueryString('Member');

	var getvips_url = test_url + '/api/member/GetVips';
	var getstoreshopinfo_url = test_url + '/api/Store/GetStoreShopInfo';
	var getunreadcount_url = test_url + '/api/member/GetUnreadCount';
	var getvipdiminfo_url = yehongbing_url + '/api/member/GetVipDimInfo';

	var page_num = 1;
	var page_size = 10;

	function main_pinjie(data) {
		if(page_num == 1) {
			$('.card_area').empty();
		}

		var Vips = data.Data.Vips;
		if(Vips == '' && page_num == 1) {
			var no_data_div =
				'<div class="no_data">暂无数据</div>';
			$('.card_area').append(no_data_div);
		} else {
			for(var i = 0; i < Vips.length; i++) {
				var vip_id = Vips[i].id;
				var store_id = Vips[i].store_id;
				var store_name = Vips[i].store_name;
				var store_tel = Vips[i].store_tel;
				var cardtype_name = Vips[i].cardtype_name;
				var tl_imgurl = Vips[i].tl_imgurl;
				var tl_bagurl = Vips[i].tl_bagurl;
				var tl_bagurl1 = Vips[i].tl_bagurl1;
				var BalanceArray = Vips[i].BalanceArray;
				var store_tel = Vips[i].store_tel;
				var vip_sn = Vips[i].vip_sn;
				if(i % 2 == 0) { //如果是偶数
					var card_list_div = '<div class="card_list" store_tel="' + store_tel + '" store_id="' + store_id + '" vip_id="' + vip_id + '">' +
						'<img class="card_in" src="' + tl_imgurl + '" alt="" />' +
						'<img class="card_out" src="' + tl_bagurl1 + '" alt="" />' +
						'<span class="card_shop_name">' + store_name + '</span>' +
						'<span class="card_shop_num">' + vip_sn + '</span>' +
						'<span class="card_shop_type">' + cardtype_name + '</span>' +
						'<span class="card_shop_prize">' + BalanceArray + '</span>' +
						'<img class="card_shop_tel" src="../../images/50px_50px_icon_P.png" alt="" />' +
						'</div>';
				} else {
					var card_list_div = '<div class="card_list_c" store_tel="' + store_tel + '" store_id="' + store_id + '" vip_id="' + vip_id + '">' +
						'<img class="card_out_c" src="' + tl_bagurl + '" alt="" />' +
						'<img class="card_in_c" src="' + tl_imgurl + '" alt="" />' +
						'<span class="card_shop_name_c">' + store_name + '</span>' +
						'<span class="card_shop_num_c">' + vip_sn + '</span>' +
						'<span class="card_shop_type_c">' + cardtype_name + '</span>' +
						'<span class="card_shop_prize_c">' + BalanceArray + '</span>' +
						'<img class="card_shop_tel_c" src="../../images/50px_50px_icon_P.png" alt="" />' +
						'</div>';
				}
				$('.card_area').append(card_list_div);

				mui(".card_area").on('tap', '.card_list,.card_list_c', function() {
					var vip_id = $(this).attr('vip_id');
					var store_id = $(this).attr('store_id');
//					var webview = mui.openWindow({
//						url: 'index_main_card/index_main_card_detail.html',
//						extras: {
//							member_id: member_id,
//							vip_id: vip_id,
//							token: token,
//							store_id: store_id
//						}
//					});
					window.location.href='index_main_card/index_main_card_detail.html?member_id='+member_id+'&token='+token+'&vip_id='+vip_id+'&store_id='+store_id;




				})

			}
		}

	}

	function GetVips(getvips_url, member_id, page_num, page_size, token) {
		$.getJSON(getvips_url + '?member_id=' + member_id + '&page_num=' + page_num + '&page_size=' + page_size + '&token=' + token,
			function(data) {
//				console.log(data);
				main_pinjie(data);
			})

	}
	GetVips(getvips_url, member_id, page_num, page_size, token);

	//				搜索功能接口

	function GetVipDimInfo(getvipdiminfo_url, member_id, member_name, token) {
		$.getJSON(getvipdiminfo_url + '?member_id=' + member_id + '&member_name=' + member_name + '&token=' + token,
			function(data) {
				console.log(data);
				main_pinjie(data);
			})

	};

	//				搜索功能
	$('#search').change(function() {
		var member_name = $('#search').val();
		GetVipDimInfo(getvipdiminfo_url, member_id, member_name, token);
	});

}
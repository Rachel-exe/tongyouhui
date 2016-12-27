$(function() {
	//选择类型
	$('.tag_types').click(function() {
		var tag_txt = $(this).text();
		$('.input_type').val(tag_txt);
		//方法一
		// $('.tag_types').removeClass('tagSelect_active').removeClass('tag_select');//  replace(/tagSelect_active/gm,'');
		// $(this).siblings().addClass('tag_select');
		// $(this).addClass('tagSelect_active');
		//方法二
		$('.type').find('.tagSelect_active').removeClass('tagSelect_active').addClass('tag_select');
		$(this).removeClass('tag_select').addClass('tagSelect_active');
	})

	//增加目的地
	$('.add_terminal').click(function() {
			//限制数量
			if ($('.terminal').find('input').length == 7) return;

			var _html = ' <input type=\"text\" class=\"input_terminal form-control\" style="width: 90px;\"> ';
			$('.admit_terminal').before(_html);

			$('.add_terminal').hide();
			$('.admit_terminal').show();
		})
		//确定目的地
	$('.admit_terminal').click(function() {
		//改变已编辑的input样式
		$(this).prev().removeClass('input_terminal').addClass('comple_input_tag').attr('title', '点击删除目的地').attr('readonly', 'readonly');
		$('.comple_input_tag').click(function() {
			$(this).remove();
		})
		$('.admit_terminal').hide();
		$('.add_terminal').show();
	})

	//增加标签
	// $('.add_tag').click(function() {
	// 	//限制数量
	// 	if ($('.tag').find('input').length == 7) return;
	// 	//改变已编辑的input样式
	// 	$(this).prev().removeClass('input_tag').addClass('comple_input_tag').attr('title', '点击删除标签').attr('readonly', 'readonly');
	// 	var _html = ' <input type=\"text\" class=\"input_tag form-control\" style="width: 120px;\" > ';
	// 	$(this).before(_html);
	// 	$('.comple_input_tag').click(function() {
	// 		$(this).remove();
	// 	})
	// })

	//选择标签
	var _html_tag = '';
	$(".tag").delegate(".tag_select", "click", function() {
		$(this).removeClass('tag_select').addClass('tagSelect_active');
		_html_tag += $(this).text() + ' ';
		// $('.input_tag').val(_html_tag);
	});
	$(".tag").delegate(".tagSelect_active", "click", function() {
		$(this).removeClass('tagSelect_active').addClass('tag_select');
		var val_cancel = $(this).text().trim() + ' ';
		// console.log(val_cancel);
		// console.log(_html_tag);
		// console.log('休闲 '==val_cancel);
		_html_tag = _html_tag.replace(/val_cancel/g, '');
		// $('.input_tag').val(_html_tag);
	});
	//发团时间类型
	$('.comple_fatuan').delegate('.times', 'click', function() {
		$('.show_days').hide();
		$('.show_times').show();
	})
	$('.comple_fatuan').delegate('.days', 'click', function() {
		$('.show_times').hide();
		$('.show_days').show();
	})
	$('.timeType_select span').click(function() {
		$(this).removeClass('tag_select').addClass('tagSelect_active');
		$(this).siblings().removeClass('tagSelect_active').addClass('tag_select');
	})

	//选择每周几
	var _html_day = '';
	$(".tuanqi_days").delegate(".week_day", "click", function() {
		$(this).removeClass('week_day').addClass('weekDay_active');
	});
	$(".tuanqi_days").delegate(".weekDay_active", "click", function() {
		$(this).removeClass('weekDay_active').addClass('week_day');
	});

	//增加发团日期
	$('.add_fatuan').click(function() {
		// var idx_fatuan = $('.comple_fatuan tr').length - 1;
		// var tr_html = $('.comple_fatuan tr:eq(' + idx_fatuan + ')').html(); //获取最后一个tr的html
		// var td_first = '<td class="timeType_select" rowspan="100">' + ($('.comple_fatuan tr:eq(' + idx_fatuan + ') td:eq(0)').html()) + '</td>'; //获取tr中第一个td的html
		// tr_html = tr_html.replace(td_first, '');
		// console.log(tr_html);
		// $('.comple_fatuan').append('<tr>' + tr_html + '</tr>');
		// var start_city=$(obj).parent().parent().find('.start_city').val();
		// console.log(start_city);
		var idx_fatuan = $(this).parent().parent().index() - 1;
		var _html = $(this).parent().parent().parent().find('.fatuan_tr:eq(' + idx_fatuan + ')').clone(true, true);

		// console.log(typeof(_html));//object
		$('.tbl_fatuan').append(_html);
		var idx_last = $('.fatuan_tr').length - 1;
		$('.fatuan_tr:eq(' + idx_last + ')').find('.timeType_select').remove();
		$('.fatuan_tr:eq(' + idx_last + ')').find('.tuanqi_times').empty();
		$('.fatuan_tr:eq(' + idx_last + ')').find('.tuanqi_times').append('<input type=\"text\" class=\"times_start form-control datePicker\" style=\"width: 95px;\"> - <input type=\"text\" class=\"times_end form-control datePicker\" style=\"width: 95px;\">')
	});

	//删除table
	$('.del_tbl').click(function() {
		if ($(this).parent().parent().parent().parent().parent().find('.del_tbl').length == 1) return;
		$(this).parent().parent().parent().parent().remove();
		if ($(this).parent().parent().parent().parent().find('.schedule_tr').length > 0) {
			//重新渲染日子
			var s_day = $('.schedule_day');
			var i = 1;
			s_day.each(function() {
					$(this).text(i);
					i++;
				})
				//重新渲染单选框name序号
			var s_hotel = $('.hotel');
			var j = 0;
			s_hotel.each(function() {
					$(this).children('input').attr('name', 'hotel_' + j);
					j++;
				})
				//重新渲染多选框name序号
			var s_food = $('.food');
			var m = 0;
			s_food.each(function() {
				$(this).children('input').attr('name', 'food_' + m);
				m++;
			})
		}
	})

	//增加集合信息
	$('.add_gather').click(function() {
		var idx_gather = $(this).parent().parent().index() - 1;
		// alert(idx_gather);
		var _html = $(this).parent().parent().parent().find('.gather_tr:eq(' + idx_gather + ')').clone(true, true);
		console.log(typeof(_html));
		$('.comple_gather').append(_html);
	})

	//添加行程安排
	$('.add_schedule').click(function() {
		//添加tr
		var idx_schedule = $(this).parent().parent().parent().parent().index() - 1;
		var _html = $('.sec_schedule').find('.schedule:eq(' + idx_schedule + ')').clone(true, true);
		$('.sec_schedule').append(_html);
		//重新渲染日子
		var s_day = $('.schedule_day');
		var i = 0;
		s_day.each(function() {
			$(this).text(i + 1);
			i++;
		})

		//重新渲染单选框name序号
		var s_hotel = $('.hotel');
		var j = 0;
		s_hotel.each(function() {
			$(this).children('input').attr('name', 'hotel_' + j);
			j++;
		})

		//重新渲染多选框name序号
		var s_food = $('.food');
		var m = 0;
		s_food.each(function() {
			$(this).children('input').attr('name', 'food_' + m);
			m++;
		})

	})

	//显示下一页
	$('.next_page2').click(function() {
		$('.page1').hide();
		$('.page2').show();
	})
	$('.next_page3').click(function() {
		$('.page2').hide();
		$('.page3').show();
	})
	$('.last_page1').click(function() {
		$('.page2').hide();
		$('.page1').show();
	})
	$('.last_page2').click(function() {
		$('.page3').hide();
		$('.page2').show();
	})
})
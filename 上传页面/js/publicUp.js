//删除tr

$('table').on('click','.del_tr',function() {

	if ($(this).parent().parent().parent().find('.del_tr').length == 1) return;

	$(this).parent().parent().remove();
})

//绑定日历插件
$('.tuanqi_times').delegate('.datePicker', 'click', function() {
	$('.datePicker').datepicker({
		dateFormat: 'yy-mm-dd'
	});
})

$('.ticket_times').delegate('.datePicker', 'click', function() {
	$('.datePicker').datepicker({
		dateFormat: 'yy-mm-dd'
	});
})
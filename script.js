$(document).ready(function(){
	$('div').click(function(){
		$(this).hide();
	});
});

$(document).ready(function(){
	$('vanish').click(function(){
		$(this).vanish('slow');
	});
});

$(document).ready(function(){
	$('button').click(function(){
		$('#fadeIn1').fadeIn(5000);
	});
});
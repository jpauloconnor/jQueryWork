$(document).ready(function(){
	$('#hideButton').click(function(){
		$('#elephant').hide();
	});
	$('#fadeInButton').click(function(){
		$('#elephant').fadeIn(2000);
	});
	$('#shakeButton').click(function(){
		$('#elephant').effect("shake");
	});
	/*
	$('bounceButton').click(function(){
		$('#elephant').bounce();
	});*/
	$( "#rightButton" ).click(function() {
  		$( "#elephant" ).animate({ "left": "+=50px" }, "slow" );
	});
 
	$( "#leftButton" ).click(function(){
  		$( "#elephant" ).animate({ "left": "-=50px" }, "slow" );
	});

	$( "#explode" ).click(function(){
		$( "#elephant").hide("explode", {pieces: 16}, 2000);
	});
	$( "#piece-together" ).click(function(){
		$( "#elephant").show("explode", {pieces: 16}, 2000);
	});
});

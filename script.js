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

$(document).ready(function(){
	$("#rotate1").click(function(){
		$(this).rotate();
	}).click();

	$('#rotate2').click(function() {
    	$(this).rotate({ count:4, duration:0.6, easing:'ease-out' });
  	});
	$('#rotate3').click(function() {
		$(this).rotate({ endDeg:180, persist:true });
		}, function() {
		$(this).rotate({ endDeg:360 });
	});

	$('#rotate4').click(function() {
	    $(this).rotate({ endDeg:180, persist:true });
	  }, function() {
	    $(this).rotate({ endDeg:-360, duration:0.8, easing:'ease-in' });
	});

	$('#rotate5').click(function() {
	    $(this).rotate({ startDeg:-25, endDeg:0, easing:'ease-in' });
	});

	$('#rotate6').click(function() {
	    $(this)
	      .css({ position:'relative', left:0 })
	      .rotate({ count:2, easing:'ease-in', animate:{ left:120 } })
	      .fadeTo(400, 0.1)
	      .fadeTo(300, 1)
	      .delay(200)
	      .rotate({ endDeg:-360, count:3, easing:'ease-out', animate:{ left:0 } });
	});

	$('#rotate7').click(function() {
	    $(this).rotate({ count:99999, forceJS:true });
	 	}, function() {
	   	$(this).stop();
	});
});




/*
jQuery-Rotate-Plugin v0.2 by anatol.at
http://jsfiddle.net/Anatol/T6kDR/
*/
$.fn.rotate=function(options) {
  var $this=$(this), prefixes, opts, wait4css=0;
  prefixes=['-Webkit-', '-Moz-', '-O-', '-ms-', ''];
  opts=$.extend({
    startDeg: false,
    endDeg: 360,
    duration: 1,
    count: 1,
    easing: 'linear',
    animate: {},
    forceJS: false
  }, options);

  function supports(prop) {
    var can=false, style=document.createElement('div').style;
    $.each(prefixes, function(i, prefix) {
      if (style[prefix.replace(/\-/g, '')+prop]==='') {
        can=true;
      }
    });
    return can;
  }

  function prefixed(prop, value) {
    var css={};
    if (!supports.transform) {
      return css;
    }
    $.each(prefixes, function(i, prefix) {
      css[prefix.toLowerCase()+prop]=value || '';
    });
    return css;
  }

  function generateFilter(deg) {
    var rot, cos, sin, matrix;
    if (supports.transform) {
      return '';
    }
    rot=deg>=0 ? Math.PI*deg/180 : Math.PI*(360+deg)/180;
    cos=Math.cos(rot);
    sin=Math.sin(rot);
    matrix='M11='+cos+',M12='+(-sin)+',M21='+sin+',M22='+cos+',SizingMethod="auto expand"';
    return 'progid:DXImageTransform.Microsoft.Matrix('+matrix+')';
  }

  supports.transform=supports('Transform');
  supports.transition=supports('Transition');

  opts.endDeg*=opts.count;
  opts.duration*=opts.count;

  if (supports.transition && !opts.forceJS) { // CSS-Transition
    if ((/Firefox/).test(navigator.userAgent)) {
      wait4css=(!options||!options.animate)&&(opts.startDeg===false||opts.startDeg>=0)?0:25;
    }
    $this.queue(function(next) {
      if (opts.startDeg!==false) {
        $this.css(prefixed('transform', 'rotate('+opts.startDeg+'deg)'));
      }
      setTimeout(function() {
        $this
          .css(prefixed('transition', 'all '+opts.duration+'s '+opts.easing))
          .css(prefixed('transform', 'rotate('+opts.endDeg+'deg)'))
          .css(opts.animate);
      }, wait4css);

      setTimeout(function() {
        $this.css(prefixed('transition'));
        if (!opts.persist) {
          $this.css(prefixed('transform'));
        }
        next();
      }, (opts.duration*1000)-wait4css);
    });

  } else { // JavaScript-Animation + filter
    if (opts.startDeg===false) {
      opts.startDeg=$this.data('rotated') || 0;
    }
    opts.animate.perc=100;

    $this.animate(opts.animate, {
      duration: opts.duration*1000,
      easing: $.easing[opts.easing] ? opts.easing : '',
      step: function(perc, fx) {
        var deg;
        if (fx.prop==='perc') {
          deg=opts.startDeg+(opts.endDeg-opts.startDeg)*perc/100;
          $this
            .css(prefixed('transform', 'rotate('+deg+'deg)'))
            .css('filter', generateFilter(deg));
        }
      },
      complete: function() {
        if (opts.persist) {
          while (opts.endDeg>=360) {
            opts.endDeg-=360;
          }
        } else {
          opts.endDeg=0;
          $this.css(prefixed('transform'));
        }
        $this.css('perc', 0).data('rotated', opts.endDeg);
      }
    });
  }

  return $this;
};
/**
 * jQuery css3D slider
 * v 1.0.0 / 23 july 2012
 * 
 * Depends on:
 * 	 jquery 1.4.4+
 * Copyright (c) 2012 Ali M Al-brrak
 * 
 */

(function($) {
	$.fn.css3DSlider = function(o) {
		function errorMsg() {
			alert('متصفحك غير داعم')
		}

		function use2D() {
			var thita, containerWidth, containerHeight, panelsCount, panelWidth, panelHeight, carouselSize, carouselSizeType, styleText, $panels, $style, $control,
				browsers = ['', '-webkit-', '-moz-', '-o-', '-ms-'],
				browser = null,
				testing = ['transitionProperty', 'WebkitTransition', 'MozTransition', 'OTransition', 'MsTransition'];
			for (var i in testing) {
				if (testing[i] in document.body.style) {
					browser = i;
				}
			}
			transition = browsers[browser] + 'transition';
			transform = browsers[browser] + 'transform';
			panelsCount = $(o.panels).length;
			containerWidth = $(o.container).width();
			containerHeight = $(o.container).height();

			border = Number($(o.panels).first().css('borderWidth').replace(/px/g, ''));
			panelWidth = containerWidth - (o.xMargin + border) * 2;
			panelHeight = containerHeight - (o.yMargin + border) * 2;
			panelSize = o.isHorizontal ? $(o.container).outerWidth() : $(o.container).outerHeight();
			panelSize += o.rotateZ ? panelSize / panelsCount : 0;
			carouselSize = (panelSize) * panelsCount;
			carouselSizeType = o.isHorizontal ? 'width' : 'height';

			thita = 360 / panelsCount;

			styleText = o.container + '{ position: relative; }';
			styleText += o.carousel + '{ position: relative; ' + transition + ':right ' + o.duration / 1000 + 's; right:' + o.nawPanel * (-panelSize) + 'px; ' + carouselSizeType + ':' + carouselSize + 'px; }';
			styleText += o.panels + '{position: absolute; margin:' + o.yMargin + 'px ' + o.xMargin + 'px; width:' + panelWidth + 'px; height:' + panelHeight + 'px;' + transition + ':' + transform + ' ' + o.duration / 1000 + 's;}';

			$control = $('<div />', {
				'class' : 'control'
			});
			$panels = $(o.panels);
			$panels.each(function(i, $panel) {
				var right = i * panelSize;
				var rz = (i - o.nawPanel) * thita;
				var rotate = o.rotateZ ? transform + ': rotate( ' + rz + 'deg );' : '';
				styleText += o.panels + ':nth-child(' + (i + 1) + ') {' + rotate + ' right:' + right + 'px;}';
				var $nov = $('<div />', {
					'class' : o.novClass,
					'data-numpanel' : i
				});
				$nov.html(i + 1);
				$control.append($nov);
			});
			$style = $('<style />', {
				rel : "stylesheet",
				type : "text/css",
				media : "screen"
			});
			$style.html(styleText);
			$('head').append($style);
			$(o.container).append($control);
			$('.control .' + o.novClass).click(function() {
				$('.control .' + o.novClass).removeClass(o.selcetClass);
				$(this).addClass(o.selcetClass);
				var $this = $(this), i = $this.data('numpanel'), $carousel = $(o.carousel), np = o.nawPanel % panelsCount;
				o.nawPanel = i;
				styleText = o.container + '{ position: relative; }';
				styleText += o.carousel + '{ position: relative; ' + transition + ':right ' + o.duration / 1000 + 's; right:' + o.nawPanel * (-panelSize) + 'px; ' + carouselSizeType + ':' + carouselSize + 'px; }';
				styleText += o.panels + '{position: absolute; margin:' + o.yMargin + 'px ' + o.xMargin + 'px; width:' + panelWidth + 'px; height:' + panelHeight + 'px;' + transition + ':' + transform + ' ' + o.duration / 1000 + 's;}';
				$panels.each(function(i, $panel) {
					var right = i * panelSize;
					var rz = (i - o.nawPanel) * thita;
					var rotate = o.rotateZ ? transform + ': rotate( ' + rz + 'deg );' : '';
					styleText += o.panels + ':nth-child(' + (i + 1) + ') {' + rotate + ' right:' + right + 'px;}';
				});
				$style.html(styleText);
			});
		}

		function next() {
			var $novs = $('.control .' + o.novClass);
			var novslsCount = $novs.length;
			if (o.nawPanel + 1 < novslsCount) {
				$novs.eq(o.nawPanel % 15 + 1).trigger('click');
			} else {
				$novs.eq(0).trigger('click');
			}
			setTimeout(next, o.delay);
		}

		var o = jQuery.extend({
			container : '.container',
			carousel : '.carousel',
			panels : '.carousel figure',
			novClass : 'nov',
			selcetClass : 'selcet',
			xMargin : 10,
			yMargin : 10,
			nawPanel : 0,
			duration : 1000,
			isHorizontal : true,
			backface : 'visible',
			rotateZ : false,
			debug : errorMsg,
			delay : 3000,
		}, o);

		return this.each(function() {
			var tz, rotate, thita, containerWidth, containerHeight, panelsCount, panelWidth, panelHeight, styleText, $panels, $style, $control, browsers = ['', '-webkit-', '-moz-', '-o-', '-ms-'], browser = null, testing = ['perspectiveProperty', 'WebkitPerspective', 'MozPerspective', 'OPerspective', 'MsPerspective'];
			for (var i in testing) {
				if (testing[i] in document.body.style) {
						browser = i;
				}
			}

			if (browser == null)
				o.debug();
			else {
				perspective = browsers[browser] + 'perspective';
				transform = browsers[browser] + 'transform';
				transformOrigin = browsers[browser] + 'transform-origin';
				transformStyle = browsers[browser] + 'transform-style';
				transition = browsers[browser] + 'transition';
				backfaceVisibility = browsers[browser] + 'backface-visibility';

				panelsCount = $(o.panels).length;
				containerWidth = $(o.container).width();
				containerHeight = $(o.container).height();

				panelWidth = containerWidth - o.xMargin * 2;
				panelHeight = containerHeight - o.yMargin * 2;
				panelSize = o.isHorizontal ? containerWidth : containerHeight;
				if (o.rotateZ)
					panelSize += panelSize / panelsCount;

				thita = 360 / panelsCount;
				rotate = 'rotate' + (o.isHorizontal ? 'Y' : 'X');
				tz = Math.round((panelSize / 2 ) / Math.tan(Math.PI / panelsCount));
				styleText = o.container + '{' + perspective + ':400px; position: relative;}';
				styleText += o.carousel + '{ width: 100%; height: 100%; position: absolute; ' + transformStyle + ':preserve-3d; ' + transition + ':' + transform + ' ' + o.duration / 1000 + 's; ' + transform + ': translateZ( ' + (-tz) + 'px ) ' + rotate + '( ' + (-o.nawPanel * thita) + 'deg )  }';
				styleText += o.panels + '{position: absolute; margin: 0; display: block; width:' + panelWidth + 'px; height:' + panelHeight + 'px; top:' + o.yMargin + 'px; left:' + o.xMargin + 'px; ' + backfaceVisibility + ':' + o.backface + '; ' + transition + ':' + transform + ' ' + o.duration / 1000 + 's;}';
				$panels = $(o.panels);
				$control = $('<div />', {
					'class' : 'control'
				});

				$panels.each(function(i, $panel) {
					var angle = thita * i;
					var rz = (i - o.nawPanel) * thita;
					var rotateZ = o.rotateZ ? 'rotateZ( ' + rz + 'deg )' : '';
					styleText += o.panels + ':nth-child(' + (i + 1) + ') {' + transform + ': ' + rotate + '( ' + angle + 'deg ) translateZ( ' + tz + 'px ) ' + rotateZ + ';}';
					var $nov = $('<div />', {
						'class' : o.novClass,
						'data-numpanel' : i
					});
					$nov.html(i + 1);
					$control.append($nov);
				});
				$style = $('<style />', {
					rel : "stylesheet",
					type : "text/css",
					media : "screen"
				});
				$style.html(styleText);
				$('head').append($style);
				$(o.container).append($control);

				$('.control .' + o.novClass).click(function() {
					$('.control .' + o.novClass).removeClass(o.selcetClass);
					$(this).addClass(o.selcetClass);
					var $this = $(this), i = $this.data('numpanel'), $carousel = $(o.carousel), np = o.nawPanel % panelsCount;
					i = (i - np < panelsCount + np - i) ? o.nawPanel + (i - np) : o.nawPanel - (panelsCount + np - i);
					o.nawPanel = i;
					styleText = o.container + '{' + perspective + ':400px; position: relative;}';
					styleText += o.carousel + '{ width: 100%; height: 100%; position: absolute; ' + transformStyle + ':preserve-3d; ' + transition + ':' + transform + ' ' + o.duration / 1000 + 's; ' + transform + ': translateZ( ' + (-tz) + 'px ) ' + rotate + '( ' + (-o.nawPanel * thita) + 'deg )  }';
					styleText += o.panels + '{position: absolute; margin: 0 ; display: block; width:' + panelWidth + 'px; height:' + panelHeight + 'px; top:' + o.yMargin + 'px; left:' + o.xMargin + 'px; ' + backfaceVisibility + ':' + o.backface + '; ' + transition + ':' + transform + ' ' + o.duration / 1000 + 's;}';
					$panels.each(function(i, $panel) {
						var angle = thita * i;
						var rz = (i - o.nawPanel) * thita;
						var rotateZ = o.rotateZ ? 'rotateZ( ' + rz + 'deg )' : '';
						styleText += o.panels + ':nth-child(' + (i + 1) + ') {' + transform + ': ' + rotate + '( ' + angle + 'deg ) translateZ( ' + tz + 'px ) ' + rotateZ + ';}';
					});
					$style.html(styleText);
				});
			}
			setTimeout(next, o.delay);
		});
	}
})(jQuery)
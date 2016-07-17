$(function(){
	var $bigImg = $('#big-img');
	var $bigImgs = $('img', $bigImg);
	var $bgImg = $('#bg-img');
	var $bgImgs = $('div', $bgImg);
	var $smallImgs = $('#small-img img');
	var $content = $('#content');
	var $next = $('#next');
	var $prev = $('#prev');
	var $bg1 = $('#bg-img1');
	var $bg2 = $('#bg-img2');
	var $bg3 = $('#bg-img3');
	var bigImgWidth = $bigImgs.first().outerWidth();
	var distance;
	var nowIdx = 0;
	$(window).on('resize', function(){
		ResizeHandle();
	});
	ResizeHandle();
	$next.on('click', function(){
		nowIdx++;
		if(nowIdx == $bigImgs.length){
			nowIdx = 0;
		}
		changeImg();
	});
	$prev.on('click', function(){
		nowIdx--;
		if(nowIdx == -1){
			nowIdx = $bigImgs.length - 1;
		}
		changeImg();
	});
	$smallImgs.on('click', function(){
		nowIdx = $(this).index();
		changeImg();
	});
	$smallImgs.hover(function(){
		$(this).css('top', -10);
	}, function(){
		$(this).css('top', 0);
	});
	function changeImg(){
		var leftVal = -nowIdx * (bigImgWidth + distance);
		$bigImg.stop().animate({
			left : leftVal
		});
		$bg1.stop().animate({
			left: leftVal / 8
		});
		$bg2.stop().animate({
			left: leftVal / 4
		});
		$bg3.stop().animate({
			left: leftVal / 2
		});
		$smallImgs.eq(nowIdx).addClass('selected').siblings().removeClass('selected');
	}
	function ResizeHandle(){
		distance = ($('body').width() -bigImgWidth ) / 2;
		if(distance <= 0 ){
			return;
		}
		var bgImgWidth = (distance + bigImgWidth) * $bigImgs.length;
		$bgImg.css('width', bgImgWidth);
		$bgImgs.css('width', bgImgWidth);
		$bigImg.css('width', bgImgWidth);
		$bigImgs.css({
			marginRight : distance,
		});
		$content.css({
			left: distance,
		});
		$bigImg.css('left', -nowIdx * (bigImgWidth + distance));
	}
});
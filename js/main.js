function checkSizeScreen($src){
	var $windowWidth=$(window).width();
	var src=$src;
	var b=src.lastIndexOf('/')+1;
	var name=src.substr(src.lastIndexOf('/')+1);
	var way=src.substring(0,b);
	if ($windowWidth<769 && $windowWidth>425) {
		var $src=way+'tablet'+name;	
	}
	if ($windowWidth<426) {
		var $src=way+'mobile'+name;
	}
	return $src;
}
function srsWEBP($src){
	var $src=$src.toLowerCase();
	var $attr=$src.substr(($src.lastIndexOf('.') +1) ).toLowerCase();
	if ($('html').hasClass('webp')) {
		var $formats=['jpg','jpeg', 'png'];
		for (var i = 0; i < $formats.length; i++) {
			if ($attr==$formats[i]) {
				var srsWEBP=$src.replace($attr,'webp')
			}
		}
		return srsWEBP;
	}
	else{
		return $src;
	}
}
$(document).ready(function() {
	var $windowHeight= $(window).height();

	var bodySrcWebp='url(resources/'+checkSizeScreen(srsWEBP('table.jpg'))+')';
	var avatarSrcWebp='url(resources/'+srsWEBP('avatar425.png')+')';
	$('html').css('background-image', bodySrcWebp);
	$('.avatar').css('background-image', avatarSrcWebp);

	$('.btttoggle').on('click', function(event) {
		event.preventDefault();
		var $dropContent=$(this).parent().siblings('.dropcontent');
		if (!($dropContent).hasClass('active')) {
			$dropContent.toggleClass('active');
			$dropContent.slideDown();
		}else{
			$dropContent.slideUp();
			$dropContent.toggleClass('active');
		}
	});
	var $heitBottom=$windowHeight-50;
	var $arrow=$('.arrow');
	$arrow.css('top', $heitBottom);


	$(window).on('scroll', function() {
		if($(this).scrollTop() > $windowHeight) {
			$arrow.show();
		}else{
			if (!$arrow.hasClass('active')) {
				$arrow.hide()
			}	
		}	
	});
	$arrow.on('click', function() {

		$arrow.show();
		if (!$(this).hasClass('down')) {
			$heightClick=$(window).scrollTop();
			$("html,body").animate({scrollTop:0},"slow");
			$arrow.addClass('down');
			$arrow.addClass('active');
		}
		else{
			$("html,body").animate({scrollTop:$heightClick},"slow");
			$arrow.removeClass('down');
		}
	});
		$('.sendMail, .close, .backgroundModal').on('click', function() {
			event.preventDefault();
			if ($('.togglemodal').hasClass('hide')) {
			$('.modal, .backgroundModal').removeClass('hide');
		}else{
			$('.modal, .backgroundModal').addClass('hide');
		}
	});
		function invalid($val) {
			var val=$val;
			var $error=$('.error');
			$(val).css('box-shadow', ('0 0 9px 1px red'));
			error.show().css('color', 'red');
		}
		function valid($val) {
			var val=$val;
			var $error=$('.error');
			$(val).css('box-shadow', ('0 0 9px 1px green'));
			error.show().css('color', 'green');
			error.text("Ок");
			$(val).addClass('valid')
		}

		var regular = /^[a-z0-9_-]+@[a-z0-9-]+\.[a-z]{2,6}$/i;
		var error=$('.error');
		var formArea=$('.formArea')
		
		formArea.keyup(function() {
			if($(this).val()!=''){
				if ($(this).hasClass('email') && $(this).val().toLowerCase().search(regular)!=0) {
					error.text("Проверьте правильность ввода email");
					invalid($(this));
				}else{
				valid($(this));
				}	
			}else{
				error.text("Поле не может быть пустым");
				invalid($(this));
			}
		});

		$('.btn').on('click', function(event) {
			if ($('.valid').length==3) {
				for (var i = 0; i < formArea.length; i++) {
					if(formArea[i]['value']==''){
						event.preventDefault();
						error.text("Проверьте правильность ввода полей");
						invalid($("form"));
						return false;
					};
				}
			valid($("form"));
			$.ajax({
				url: $('form').attr('action'),
				type: $('form').attr('method'),
				data: $('form').serialize(),
				cache: false,
				success:function (result) {
					if (result) {
					$('.modal, .backgroundModal').addClass('hide');
					alert('Сообщение отправлено');
					}else{
					alert('Проверьте правильность заполнения формы');
					}

				},
			})
			
			
			// $('form').submit(); 
			event.preventDefault();
			}else{
				error.text("Проверьте правильность ввода полей");
				invalid($(this));
				event.preventDefault();
			}
		});


});
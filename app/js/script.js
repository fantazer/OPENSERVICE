(function($){
    $(window).load(function(){
        $(".scroll-link").mPageScroll2id({
				    highlightClass:"left-nav-el-active",
				    offset:40,
				     onComplete:function(){
				    	$('.header-navs').hide();
				    }
				});
    });
 })(jQuery);

$(document).ready(function(){
	var shrinkHeader = 250;
	var heightHeader=$('.header').height();
	$(window).scroll(function() {
		var scroll = $(this).scrollTop();
		if ( scroll >= shrinkHeader ) {
				$('.header').addClass('shrink');
				$('body').css('paddingTop',heightHeader);
			}
			else {
					$('.header').removeClass('shrink');
					$('body').css('paddingTop',0);
			}
	});

	function setHeight() {
	   var windowHeight = $(window).height(),
	       $block = $('.main-section');
	    if(windowHeight < 650) {
	         $block.css({'height': windowHeight + 'px'})
	    } else {
	       $block.css({'height': ''})
	    }
	}

	setHeight();
	$(window).on('resize orientationchange', setHeight);

	//validate
		$('.validate-form').each(function() {
		var curentForm = $(this);
    $(this).validate({
    			highlight: function(element) {
							$(element).parent().addClass("field-error");
					},
					unhighlight: function(element) {
							$(element).parent().removeClass("field-error");
					},
		    	rules:{ //правила для полей
						name:{
							required:true,
							minlength:5
						},
						phone:{
							required:true,
							minlength:5,
							number:true
						},
						email:{
							required:true,
							email:true
						},
						agree: {
							required: true
						}
					},
					messages:{
						name:{
							required: 'Обязательное поле',
							minlength:'Имя должно быть длиннее',
						},
						phone:{
							required: 'Обязательное поле',
							number:'Введите правильный номер',
							minlength:'Номер должен быть длиннее',
						},
						email:{
							required: 'Это поле обязатлеьно для заполнения',
							email:'Введите правильный адресс'
						},
						agree:{
							required: 'Необходимо согласие',
						}
					},

					submitHandler : function(form){
						$.ajax({ //отправка ajax
						            type: "POST",
						            url: "sender.php",
						            data: $(form).serialize(),
						            timeout: 3000,
						            success: function () {
				            			console.log(data);
 								}
							});
					$('.modal-close').click(); // автозакрытие окна
							setTimeout(function(){
										$('.modal-true').bPopup({
											closeClass:'modal-close',
												position:['auto','auto'], // position center
												follow: [true,true],
												autoClose: 2000
										});
										$(':input','.validate-form') //очитска формы от данных
										  .not(':button, :submit, :reset, :hidden')
										  .val('')
										  .removeAttr('checked')
										  .removeAttr('selected')
							},2000)

				}
		    });
		});


	$(".time").owlCarousel({
	 items : 5,
		responsive : {
				0:{
					items : 2
				},
				768:{
					items : 2
				},
				960:{
					items : 5
				},

			},
	 margin:30,
	 autoHeight : true,
	 dots: false,
	 autoplay : false,
	 nav:false
	 }
	);
	var owl = $('.time');
	owl.owlCarousel();
	$('.slider-control-el--right').click(function() {
	    owl.trigger('next.owl.carousel');
	})
	$('.slider-control-el--left').click(function() {
	    owl.trigger('prev.owl.carousel', [300]);
	})
	/* ###### For only ies  ######*/
	//if(/MSIE \d|Trident.*rv:/.test(navigator.userAgent)){
	//	//code
	//}

	function detectIE() {
	var ua = window.navigator.userAgent;

	var msie = ua.indexOf('MSIE ');
	if (msie > 0) {
		// IE 10 or older => return version number
		return parseInt(ua.substring(msie + 5, ua.indexOf('.', msie)), 10);
	}

	var trident = ua.indexOf('Trident/');
	if (trident > 0) {
		// IE 11 => return version number
		var rv = ua.indexOf('rv:');
		return parseInt(ua.substring(rv + 3, ua.indexOf('.', rv)), 10);
	}

	var edge = ua.indexOf('Edge/');
	if (edge > 0) {
		// Edge (IE 12+) => return version number
		return parseInt(ua.substring(edge + 5, ua.indexOf('.', edge)), 10);
	}

	// other browser
	return false;
}

	console.log(detectIE());
	if (detectIE() <= 14 && detectIE()) {
		$('body').empty();
		$('body').prepend('' +
		 '<div class="old-browser">' +
			'<div class="old-browser-text"> Сайт не поддерживае Браузер Internet Explorer</div><br>' +
			'<div class="old-browser-text"> Установите <br><br> Chrome Firefox Opera </div><br>' +
		'</div>');
	}

	//for init SVG 
	svg4everybody();
	// ==== clear storage =====
	 localStorage.clear();
	 sessionStorage.clear();
	 $(window).unload(function(){
		 localStorage.clear();
	 });
	// ==== clear storage end =====

	
	/* ###### For SlideToggle Elements  ######*/
	var hideToggle = function(targetClick,toggleEl) {
		$(targetClick).click(function(event){
				$(toggleEl).slideToggle("fast");
		});

	};
	hideToggle('.menu-toggle','.header-navs');


	$(window).resize(function(){
		heightHeader=$('.header').height();
	});
})

//cash SVG

;( function( window, document )
{
	'use strict';

	var file  = 'img/pack.html',
		revision = 1;

	if( !document.createElementNS || !document.createElementNS( 'http://www.w3.org/2000/svg', 'svg' ).createSVGRect )
		return true;

	var isLocalStorage = 'localStorage' in window && window[ 'localStorage' ] !== null,
		request,
		data,
		insertIT = function()
		{
			document.body.insertAdjacentHTML( 'afterbegin', data );
		},
		insert = function()
		{
			if( document.body ) insertIT();
			else document.addEventListener( 'DOMContentLoaded', insertIT );
		};

	if( isLocalStorage && localStorage.getItem( 'inlineSVGrev' ) == revision )
	{
		data = localStorage.getItem( 'inlineSVGdata' );
		if( data )
		{
			insert();
			return true;
		}
	}

	try
	{
		request = new XMLHttpRequest();
		request.open( 'GET', file, true );
		request.onload = function()
		{
			if( request.status >= 200 && request.status < 400 )
			{
				data = request.responseText;
				insert();
				if( isLocalStorage )
				{
					localStorage.setItem( 'inlineSVGdata',  data );
					localStorage.setItem( 'inlineSVGrev',   revision );
				}
			}
		}
		request.send();
	}
	catch( e ){}

}( window, document ) );
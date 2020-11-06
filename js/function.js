$(function() {
	// --------------변수--------------
	//header
	const $gnb = $('.gnb>li')
	const $lnb = $('.lnb-container')
	const $lang = $('.lang a')
	//section
	const $indicator = $('#slides > .slides-indicator > li > a')
	const $slides = $('#slides > .slides-container')
	const $snslist = $('.sns-list')
	//기타
	let nowIdx = 0
	let intervalId = null

	// --------------함수--------------
	const moveFn = function() {
		$indicator.eq(nowIdx).parent().addClass('on').siblings().removeClass('on')
		$slides.stop().animate({
			left: -100 * nowIdx + '%'
		})
	}
	// 자동재생
	const autoPlay = function() {
		clearInterval(intervalId)
		intervalId = setInterval(function() {
			if (nowIdx < 7) {
				nowIdx++
			} else {
				nowIdx = 0
			}
			moveFn()
		}, 4000)
	}

	// -----------------초기화--------------
	autoPlay()

	// -----------------이벤트 등록--------------
	//gnb 클릭했을 경우 click했을 경우
	$gnb.on('click', function() {
		nowIdx = $gnb.index(this)
		$lnb.eq(nowIdx).stop().toggle()
		$(this).siblings().children('.lnb-container').hide()
		$(this).addClass('on').siblings().removeClass('on')
	})

	//lang
	$lang.on('click', function() {
		$(this).parent().addClass('on').siblings().removeClass('on')
	})

	// 서브메뉴 활성화
	$lnb.find('li').on({
		mouseenter: function() {
			$(this).addClass('on')
		},
		mouseleave: function() {
			$(this).removeClass('on')
		}
	})

	// 모바일용 - 클릭하면 맨 위로 이동하는 이벤트
	$('.gotop').on('click', function(evt) {
		evt.preventDefault()
		$('html,body').stop().animate(
			{
				scrollTop: 0
			},
			400
		)
	})

	//<section>
	//슬라이드 인디케이터 활성화
	$indicator.on('click', function(evt) {
		nowIdx = $indicator.index(this)
		moveFn()
		evt.preventDefault()
	})

	//sns-list 나타나는(show) 이벤트
	$('.sns').on('click', function() {
		$snslist.show()
	})
	//sns-list 사라지는(hide) 이벤트
	$snslist.find('.btn_clse').on('click', function(evt) {
		$snslist.hide()
		evt.preventDefault()
	})
	//모바일용 - 메뉴 펼치기 버튼
	$('.btn-nav_m').on('click', function(evt) {
		$('	header > nav ').show()
	})

	//모바일용 - 메뉴 펼치기 버튼
	$('.nav-clse ').on('click', function(evt) {
		$('	header > nav ').hide()
	})

	// 모바일용 -  sns 탭메뉴
	const $snsTapMnu = $('.sns-list-cont-mnu>li>a')
	const $snsItem = $('.sns-list-cont>div')
	$snsTapMnu.on('click', function(evt) {
		nowIdx = $snsTapMnu.index(this)
		$(this).parent().addClass('on').siblings().removeClass('on')
		$snsItem.eq(nowIdx).find('.sns-list-cont-item-sub').show()
		$snsItem.eq(nowIdx).siblings().find('.sns-list-cont-item-sub').hide()
		evt.preventDefault()
	})
})

$(function() {
	// 모바일용 -  news
	const $news = $(' .news-container-list ')
	let nowIdx = 0

	const newsMoveFn = function() {
		$news.stop().animate({
			left: -100 * nowIdx + '%'
		})
		$('.page>span').text(nowIdx + 1)
	}

	$('.news .xi-angle-left-min').on('click', function() {
		if (nowIdx > 0) {
			nowIdx--
		} else {
			nowIdx = 5
		}
		newsMoveFn()
	})
	$('.news .xi-angle-right-min').on('click', function() {
		if (nowIdx < 5) {
			nowIdx++
		} else {
			nowIdx = 0
		}
		newsMoveFn()
	})
})

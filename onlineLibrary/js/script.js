// click events
$(document).ready(function(){
    $(".iconMenu").click(function(){
        $(this).toggleClass("on");
        $(".menuModal").toggleClass("on");
        $(".searchModal").removeClass("on");
        $(".navBtnM .iconSearch svg").removeClass("on");
    });
    $(".iconSearch").click(function(){
        $(".searchModal").toggleClass("on");
        $(".menuModal").removeClass("on");
        $(".iconMenu").removeClass("on");
        $(".navBtnM .iconSearch svg").toggleClass("on");
    });
    $(".navBtnPC").click(function(){
        $(".searchModal").toggleClass("on");
        $(".navBtnPC svg").toggleClass("on");
    });
    $(".menuModal .menuModalList li").click(function() {
        if ($(this).hasClass("on")) {
            $(this).removeClass("on");
        } else {
            $(".menuModal .menuModalList li").removeClass("on");
            $(this).addClass("on");
        }
    });

    $(".subjectGroup").click(function(){
        $(".subjectGroup").addClass("on");
        $(".timeGroup").removeClass("on");
        $(".boxWrapSubject").addClass("on");
        $(".boxWrapTime").removeClass("on");
    });
    $(".timeGroup").click(function(){
        $(".timeGroup").addClass("on");
        $(".subjectGroup").removeClass("on");
        $(".boxWrapTime").addClass("on");
        $(".boxWrapSubject").removeClass("on");
    });
});

// swiper events
const swiper1 = new Swiper('.swiperSec1', {
    slidesPerView: 2,
    spaceBetween: 12,
    autoplay: {
        delay: 2000
    },
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    },
    breakpoints: {
        400: {
            slidesPerView: 3,  //브라우저가 768보다 클 때
            spaceBetween: 12,
        },
        767: {
            slidesPerView: 6,  //브라우저가 768보다 클 때
            spaceBetween: 16,
        },
        1439: {
            slidesPerView: 8,  //브라우저가 1024보다 클 때
            spaceBetween: 16,
        },
    },
});
$('.swiper-slide').hover(function(){
    swiper1.autoplay.stop();
}, function(){
    swiper1.autoplay.start();
});

// city logo rolling
document.addEventListener("DOMContentLoaded", () => {
    const ul = document.querySelector(".logoCityWrap"); // 정확한 ul 선택
    const sec5 = document.querySelector(".sec5");

    // 요소 복제하여 무한 롤링 구현
    const clone = ul.cloneNode(true); // ul을 복제
    sec5.appendChild(clone); // 복제된 ul을 sec5에 추가

    // 마우스 오버 시 애니메이션 멈추기
    sec5.addEventListener("mouseenter", () => {
        ul.style.animationPlayState = "paused";
        clone.style.animationPlayState = "paused";
    });

    sec5.addEventListener("mouseleave", () => {
        ul.style.animationPlayState = "running";
        clone.style.animationPlayState = "running";
    });
});

// scroll top
$(window).on('scroll', function() {
    if ($(window).scrollTop() > 300) { // 특정 수치(300px) 이상 스크롤 시
        $('.scrollTop').stop(true, true).fadeIn(300); // 300ms 동안 서서히 나타남
    } else {
        $('.scrollTop').stop(true, true).fadeOut(300); // 300ms 동안 서서히 사라짐
    }
});

$('.scrollTop').click(function() {
    $('html, body').animate({ scrollTop: 0 }, 500); // 부드럽게 스크롤
});


// animate on scroll
AOS.init();
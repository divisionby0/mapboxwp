jQuery(".cart__btn").click(function () {
    toggleModal();
});

var modalCart = document.querySelector('.modalCart');

function toggleModal() {
    modalCart.classList.toggle('show-modalCart');
}
function closeModal() {
    modalCart.classList.remove('show-modalCart');
}
function windowOnClick(event) {
    if (event.target === modalCart) {
        toggleModal();
    }
}
window.addEventListener("click", windowOnClick);

jQuery(".modalCart__itemCountCircle-plus").click(function () {
    var num = jQuery(this).parent().find(".modalCart__itemCountNum").html();
    num = Number(num);
    num++;
    if(num == 2) jQuery(this).parent().find(".modalCart__itemCountCircle-minus").removeClass("modalCart__itemCountCircle-gray");
    jQuery(this).parent().find(".modalCart__itemCountNum").html(num);
});

jQuery(".modalCart__itemCountCircle-minus").click(function () {
    var num = jQuery(this).parent().find(".modalCart__itemCountNum").html();
    num = Number(num);
    if(num > -1) num--;
    if(num == -1) jQuery(this).parent().find(".modalCart__itemCountCircle-minus").addClass("modalCart__itemCountCircle-gray");
    jQuery(this).parent().find(".modalCart__itemCountNum").html(num);
});

jQuery(".modalCart__close").click(function () {
    var arr = document.querySelectorAll(".modalCart__item");
    if(arr.length > 1) {
        jQuery(this).parent().remove();
    } else {
        toggleModal();
        jQuery(this).parent().remove();
    }
});
jQuery(".shopping__close").click(function () {
    jQuery(this).parent().remove();
});

/*
$(document).mouseup(function (e){
    var div = $(".cart");
    if (!div.is(e.target)
        && div.has(e.target).length === 0) {
        //closeModal();
    }
});
*/

jQuery(".order__payItem").click(function () {
   jQuery(".order__payItem").removeClass("order__payItem-active");
   jQuery(this).addClass("order__payItem-active");
});

jQuery(".index__headerSwitcherBlockText").click(function () {
    if(!jQuery(this).hasClass("index__headerSwitcherBlockText-active")){
        jQuery(".index__headerSwitcherBlockText").removeClass("index__headerSwitcherBlockText-active");
        jQuery(this).addClass("index__headerSwitcherBlockText-active");
        if(jQuery(".index__headerSwitcherThumb").hasClass("index__headerSwitcherThumb-right")){
            jQuery(".index__headerSwitcherThumb").removeClass("index__headerSwitcherThumb-right");
        }
        else {
            jQuery(".index__headerSwitcherThumb").addClass("index__headerSwitcherThumb-right");
        }
    }
});

(function (){
    link = jQuery('.js-scroll-link');
    link.on('click', function () {
        var id = jQuery(this).attr('href');
        var top = jQuery("[data-id=" + id.substr(1)+ "]").offset().top;
        jQuery('body,html').animate({ scrollTop: top }, 1500);
    });
})();



$('.timepicker').wickedpicker({twentyFour: true, title: 'Выбор времени'});


$('.dropdown-menu').overlayScrollbars({});

function resize404() {
    var header = document.querySelector(".site-header");
    var content = document.querySelector(".site-content-404");
    var footer = document.querySelector(".site-footer");

    content.style.height = (window.innerHeight - header.offsetHeight - footer.offsetHeight) + "px";
}
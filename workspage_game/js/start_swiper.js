var mySwiper = new Swiper('.swiper-container', {
    loop: true,
    direction: 'horizontal',
    loop: true,
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },

});
window.onload = function() {
    document.body.addEventListener("touchmove", function(event) {
        event.preventDefault();
    });
};
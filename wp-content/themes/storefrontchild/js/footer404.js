$( document ).ready(function() {
    resize404();
});

function resize404() {
    var header = document.querySelector(".site-header");
    var content = document.querySelector(".site-content-404");
    var footer = document.querySelector(".site-footer");

    content.style.height = (window.innerHeight - header.offsetHeight - footer.offsetHeight) + "px";
}




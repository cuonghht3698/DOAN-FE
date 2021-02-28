$(document).ready(function() {
    $(".product-cart").hide();
    $(".dropdown-menu ").hide();
    $(".product").hover(function() {
        $(this).find(".hang").animate({
            'marginTop': "-68px"
        });
        $(this).find(".product-cart").toggle();

    }, function() {
        $(this).find(".hang").animate({
            'marginTop': "-30px"
        });

        $(this).find(".product-cart").toggle();
    });

    $(".btn-group ").hover(function() {
        $(this).find(".dropdown-menu ").show();


    }, function() {
        $(".dropdown-menu ").hide();
    });




});

$(".top-selling .next").click(function() {


    var check = parseInt($(".product-mid").css("left"));


    if (check > -1400)
        $(".product-mid").animate({
            left: "-=400"
        });
    else {
        $(".product-mid").css({
            "left": "-1315px"
        });
    }
});
$(".top-selling .prev").click(function() {
    var check = parseInt($(".product-mid").css("left"));
    if (check < 0)
        $(".product-mid").animate({
            left: "+=400"
        });
    else {
        $(".product-mid").css({
            "left": "15px"
        });
    }
});
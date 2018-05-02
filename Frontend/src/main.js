$(function() {
    //This code will execute when the page is ready
    var PizzaMenu = require('./pizza/PizzaMenu');
    var PizzaCart = require('./pizza/PizzaCart');
    var cart = PizzaCart.Cart;
    // var Pizza_List = require('./Pizza_List');

    PizzaCart.initialiseCart();
    PizzaMenu.initialiseMenu();


    $('.cleanOrderBtn').click(function () {
        PizzaCart.clean();
    });

    $(".navPills li").on("click", function () {
        $(".navPills li").removeClass("active");
        $(this).addClass("active");
        var selector = $(this).find('a').data('filter');
        PizzaMenu.filterPizza(selector);
    });

    $(".buttNext").click(function () {
        var name = $('#enterName').val();
        var phone = $('#enterPhone').val();
        var address = $('#enterAddress').val();
        var nameValid = checkInput(name, '.name', '#name-help');
        var phoneValid = checkInput(phone, '.phone', '#phone-help');
        var addressValid = checkInput(address, '.address', '#address-help');

        if(nameValid && phoneValid && addressValid){
            PizzaCart.createOrder(function (err, data) {
                if (err) {
                    alert("Can't create order");
                } else {
                    // data
                    alert("Order success" + JSON.stringify(data));}
            });
        }
    });

    function checkInput(input, a, help) {
        if(a === '.phone'){
            if (input.substr(1).match(/^\d+$/) && ((input.startsWith("0") && input.length === 10) || (input.startsWith("+380")&& input.length === 13))){
                $('#phone-help').hide();
                $('.phone').removeClass("has-error");
                $('.phone').addClass("has-success");
                return true;
            }else {
                $('.phone').removeClass("has-success");
                $('.phone').addClass('has-error');
                $('#phone-help').show();
                return false;
            }
        }else {
            if (input.match(/^[a-zA-Zа-яА-Я \-]{1,25}$/)) {
                $(help).hide();
                $(a).removeClass("has-error");
                $(a).addClass("has-success");
                return true;
            } else {
                $(a).removeClass("has-success");
                $(a).addClass('has-error');
                $(help).show();
                return false;
            }
        }
    }

    $('#enterName').keyup(function(){
        var name = $('#enterName').val();
        checkInput(name, '.name', '#name-help');
    });

    $('#enterPhone').keyup(function(){
        var phone = $('#enterPhone').val();
        checkInput(phone, '.phone', '#phone-help');
    });

    $('#enterAddress').keyup(function(){
        var address = $('#enterAddress').val();
        checkInput(address, '.address', '#address-help');
    });


});
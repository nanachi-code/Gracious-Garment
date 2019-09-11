(function ($) {
    "use strict";
    let cartObject = [] //* global pointer to cart   
    let cartOptions = { //* global pointer to cart options
        'billing': {
            'billingName': '',
            'billingAddress': '',
            'billingPhone': '',
        },
        'delivery': {
            'deliveryName': '',
            'deliveryAddress': '',
            'deliveryPhone': '',
        },
        'comment': '',
        'payment': '',
        'shipping': ''
    };

    //* localStorage function
    function getLocalData(name) {
        return localStorage.getItem(name)
    }

    function setLocalData(name, value) {
        if (value != null) {
            localStorage.setItem(name, value);
        } else {
            localStorage.removeItem(name);
        }
    }

    function initCart() {
        //* Check in browser memory if there are a saved cart
        if ((getLocalData('graciousCart') != null)) {
            //* if previous cart is present then load it
            cartObject = JSON.parse(getLocalData('graciousCart'));
        } else {
            setLocalData('graciousCart', JSON.stringify(cartObject));
        }

        if (getLocalData('graciousCartOptions') != null) {
            //* if previous cart options are present then load it
            cartOptions = JSON.parse(getLocalData('graciousCartOptions'));
        } else {

            setLocalData('graciousCartOptions', JSON.stringify(cartOptions));
        }
    }

    //* Save address info on submit
    $('#address-form').submit(() => {
        cartOptions.billing = {
            billingName: $("#billingName").val(),
            billingAddress: $("#billingAddress").val(),
            billingPhone: $("#billingPhone").val(),
        };

        cartOptions.delivery = {
            deliveryName: $("#deliveryName").val(),
            deliveryAddress: $("#deliveryAddress").val(),
            deliveryPhone: $("#deliveryPhone").val(),
        };

        cartOptions.comment = $("#comment").val();

        setLocalData('graciousCartOptions', JSON.stringify(cartOptions));
    });

    //* Copy delivery info from billing info on checkbox tick
    $("#copyInfo").change(function() {
        if (this.checked) {
            $("#deliveryName").val($("#billingName").val());
            $("#deliveryAddress").val($("#billingAddress").val());
            $("#deliveryPhone").val($("#billingPhone").val());
        } else {
            $("#deliveryName").val("");
            $("#deliveryAddress").val("");
            $("#deliveryPhone").val("");
        }
    });

    //* Button get selected class on click, also remove selected class from all other button with same type delivery/payment
    $('.delivery').on('click', function () {
        $('span.delivery').removeClass('option-selected')
        $(this).addClass('option-selected');
        
        alert($('.delivery.option-selected').attr('data-value'))
    });

    $('.payment').on('click', function () {
        $('span.payment').removeClass('option-selected')
        $(this).addClass('option-selected');
    });


    //* Save payment & shipping option on submit
    $('#payment-form').submit(function () {
        cartOptions.payment = $('.payment.option-selected').attr('data-value');
        cartOptions.shipping = $('.delivery.option-selected').attr('data-value');

        setLocalData('graciousCartOptions', JSON.stringify(cartOptions));
    });

    //* Load header cart
    function loadHeaderCart() {
        if (cartObject.length != 0) {
            //* if cartObject is set then display the header cart
            let totalPrice = 0;

            $.each(cartObject, function (index, element) {
                let singleTotalPrice = element.price * element.quantity;
                let cartHTML =
                    `<div class="cart-product py-2">
                        <div class="row">
                            <div class="col-md-4">
                                <div>
                                    <img src="${element.imgURL}" alt="">
                                </div>
                            </div>
                            <div class="col-md-8">
                                <div>
                                    <h6 class="text-dark text-left text-bold">${element.name}<br>
                                        by <span class="brand">${element.brand}</span>
                                    </h6>
                                </div>
                                <div class="float-left text-dark mt-2">
                                    <span class="price-tag">$${element.price} </span>
                                    <span class="cart-quantity text-bold">x ${element.quantity}</span>
                                </div>
                            </div>
                        </div>
                    </div>`

                $('.cart-checkout').parent().prepend(cartHTML);

                totalPrice += Number(singleTotalPrice)
            });

            $('cart-total-quantity').text(cartObject.length);
            $('#cart-total-price').text('$' + totalPrice);
            $('#header-cart-price').find('.price-tag').text('$' + totalPrice);
        } else {
            let cartHTML =
                `<div class="cart-product py-2">
                    <span class="text-dark">Cart is empty</span>
                </div>`

            $('#header-cart-product').prepend(cartHTML);
            $('#header-cart-quantity').text('0');
            $('#header-cart-price').find('.price-tag').text('$0');
            $('#header-cart-total').text('$0');
        }
    }

    //* Load cart page
    function loadPageCart() {
        //* Load cart
        if (cartObject.length != 0) {
            //* if cartObject is set then display the header cart
            let totalPrice = 0;
            cartObject.forEach((element) => {
                let singleTotalPrice = element.price * element.quantity;
                let cartHTML =
                    `<div class="row">
                        <div class="col-md-8 align-self-center">
                            <div class="row py-2">
                                <div class="col-md-2"><img src="${element.imgURL}" alt=""></div>
                                <div class="col-md-10 align-self-center">
                                    <h5 class="py-2">${element.name} by <a href="/brand/${element.brand}" class="brand">${element.brand}</a></h5>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-2 py-2 align-self-center">
                            <input type="number" class="form-control text-26 border-0 text-bold" value="${element.quantity}" name="product">
                        </div>
                        <div class="col-md-2 align-self-center">
                            <div class="row">
                                <div class="col-md-9">
                                    <h5 class="py-2 price-tag text-secondary">${element.quantity} x $${element.price}</h5>
                                    <h1 class="price-tag text-bold">$${singleTotalPrice}</h1>
                                </div>
                                <div class="col-md-3">
                                    <div class="remove-cart btn" data-name="${element.name}">x</div>
                                </div>
                            </div>
                        </div>
                    </div>`

                $('#cart-product').prepend(cartHTML);

                totalPrice += Number(singleTotalPrice);
            });

            $('#cart-price').find('.cart-total-quantity').text(cartObject.length);
            $('#cart-price').find('.cart-total-price').text('$' + totalPrice);
        } else {
            let cartHTML =
                `<div class="py-2">
                    <span class="text-dark text-18">Cart is empty</span>
                </div>`

            $('#cart-product').prepend(cartHTML);
            $('#cart-price').find('.cart-total-quantity').text('0');
            $('#cart-price').find('.cart-total-price').text('$0');
        }
    }

    //* Load summary page
    function loadPageSummary() {
        if (cartObject.length != 0) {
            //* if cartObject is set then display the header cart
            let totalPrice = 0;
            cartObject.forEach((element) => {
                let singleTotalPrice = element.price * element.quantity;
                let cartHTML =
                    `<div class="row">
                        <div class="col-md-8 align-self-center">
                            <div class="row py-2">
                                <div class="col-md-2"><img src="${element.imgURL}" alt=""></div>
                                <div class="col-md-10 align-self-center">
                                    <h5 class="text-bold py-2">${element.name} by <a href="/brand/${element.brand}" class="brand">${element.brand}</a></h5>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-2 py-2 align-self-center">
                            <div class="text-26 col-md-5 text-bold">${element.quantity}</div>
                        </div>
                        <div class="col-md-2 align-self-center">
                            <div>
                                <h5 class="py-2 price-tag text-secondary">${element.quantity} x $${element.price}</h5>
                                <h1 class="price-tag text-bold">$${singleTotalPrice}</h1>
                            </div>
                        </div>
                    </div>`

                $('#summary-product').prepend(cartHTML);

                totalPrice += Number(singleTotalPrice);
            });

            $('#summary-price').find('.cart-total-quantity').text(cartObject.length);
            $('#summary-price').find('.cart-total-price').text('$' + totalPrice);
        } else {
            let cartHTML =
                `<div class="py-2">
                    <span class="text-dark text-18">Cart is empty</span>
                </div>`

            $('#summary-product').prepend(cartHTML);
            $('#summary-price').find('.cart-total-quantity').text('0');
            $('#summary-price').find('.cart-total-price').text('$0');
        }

        //* Load option
        if (cartOptions) {
            //* Load billing info
            $('.billing-name').text(cartOptions.billing.billingName);
            $('.billing-address').text(cartOptions.billing.billingAddress);
            $('.billing-phone').text(cartOptions.billing.billingPhone);

            //* Load delivery info
            $('.delivery-name').text(cartOptions.delivery.deliveryName);
            $('.delivery-address').text(cartOptions.delivery.deliveryAddress);
            $('.delivery-phone').text(cartOptions.delivery.deliveryPhone);

            //* Load shipping option
            $('.shipping-option').text(cartOptions.shipping);

            //* Load payment option
            $('.payment-option').text(cartOptions.payment);
        }
    }

    //* Session cart methods
    //* Add to cart
    function addToCart(name, brand, price, quantity, imgURL) {
        let tempIndex = cartObject.findIndex((element) => {
            return element.name == name;
        });

        let tempValue = cartObject.find((element) => {
            return element.name == name;
        });

        if (tempIndex != -1 && tempValue != undefined) {
            tempValue.quantity = Number(tempValue.quantity) + Number(quantity);
            cartObject.splice(tempIndex, 1, tempValue);
        } else {
            //* if not then add new item to localStorage
            let cartItem = {
                'name': name,
                'brand': brand,
                'price': price,
                'imgURL': imgURL,
                'quantity': quantity
            };
            cartObject.push(cartItem);
        }

        setLocalData('graciousCart', JSON.stringify(cartObject));
    }

    //* Add an item to cart on click
    $('.add-cart').click(() => {
        let name = $('#product-name').text();
        let brand = $('#product-brand').text();
        let price = $('#product-price').attr('data-price');
        let imgURL = $('#product-img').attr('src');
        let quantity = $('#product-quantity').val();
        addToCart(name, brand, price, quantity, imgURL);
        alert('Item added to cart successfully.');
    });

    //* Remove from cart
    function removeFromCart(name) {
        let afterFilter = cartObject.filter((element) => {
            element.name != name;
        })

        cartObject = afterFilter;
        setLocalData('graciousCart', JSON.stringify(cartObject));
    }

    //* Remove an item from cart on click
    $('.remove-cart').click((e) => {
        e.preventDefault();
        removeFromCart($(this).attr('data-name'));
        $(this).parent().parent().parent().parent().parent().remove();
        alert('Item removed from cart successfully.');
    });

    $(document).ready(function () {
        initCart();
        loadHeaderCart();
        loadPageCart();
        loadPageSummary();
        // console.log(cartObject);

    });


})(jQuery);
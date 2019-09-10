(function ($) {
    "use strict";
    let cartObject = null; //* global pointer to cart   
    let cartOptions = null //* global pointer to cart options


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
        if (getLocalData('graciousCart') != null) {
            //* if previous cart is present then load it
            cartObject = JSON.parse(getLocalData('graciousCart'));
        }
        if (getLocalData('graciousCartOptions') != null) {
            //* if previous cart options are present then load it
            cartOptions = JSON.parse(getLocalData('graciousCartOptions'));
        }
    }

    $('#address-form').submit(function () {
        cartOptions = {
            'billing': {
                'billingName': $("#billingName").val(),
                'billingAddress': $("#billingAddress").val(),
                'billingPhone': $("#billingPhone").val(),
            },

            'delivery': {
                'deliveryName': $("#deliveryName").val(),
                'deliveryAddress': $("#deliveryAddress").val(),
                'deliveryPhone': $("#deliveryPhone").val(),
            },
            'comment': $("#comment").val(),
            'shipping': '',
            'payment': ''
        }
        setLocalData('graciousCartOptions', JSON.stringify(cartOptions));
    });

    $("#copyAddress").change(function () {
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

    $('.remove-cart').click(function (e) {
        e.preventDefault();
        removeFromCart($(this).attr('data-id'));
        $(this).parent().parent().parent().parent().remove();
    });

    //* Load header cart
    function loadHeaderCart() {
        if (cartObject != null) {
            //* if cartObject is set then display the header cart
            let totalPrice;
            cartObject.forEach(element => {
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
                                    <span class="price-tag">/$${element.price}</span>
                                    <span class="cart-quantity text-bold">x ${element.quantity}</span>
                                </div>
                            </div>
                        </div>
                    </div>`

                $('.cart-checkout').parent().prepend(cartHTML);

                totalPrice += singleTotalPrice
            });

            $('cart-total-quantity').text(cartObject.length());
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
        if (cartObject != null) {
            //* if cartObject is set then display the header cart
            let totalPrice;
            cartObject.forEach(element => {
                let singleTotalPrice = element.price * element.quantity;
                let cartHTML =
                    `<div class="row border-top border-3">
                        <div class="col-md-8 align-self-center">
                            <div class="row py-2">
                                <div class="col-md-2"><img src="${element.imageURL}" alt=""></div>
                                <div class="col-md-10 align-self-center">
                                    <h5 class="text-bold line">${element.name} by <a href="" class="brand">${element.brand}</a></h5>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-2 line align-self-center">
                            <input type="number" class="form-control text-26 col-md-5 text-bold" value="${element.quantity}">
                        </div>
                        <div class="col-md-2 align-self-center">
                            <div class="row>
                                <div class="col-md-9">
                                    <h5 class="line price-tag text-secondary">${element.quantity}x/$${element.price}</h5>
                                    <h1 class="price-tag text-bold">/$${singleTotalPrice}</h1>
                                </div>
                                <div class="col-md-3">
                                    <div class="remove-cart" data-id="${element.id}">x</div>
                                </div>
                            </div>
                        </div>
                    </div>`

                $('#cart-product').prepend(cartHTML);

                totalPrice += singleTotalPrice
            });

            $('#cart-price').find('.cart-total-quantity').text(cartObject.length());
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
        if (cartObject != null) {
            //* if cartObject is set then display the header cart
            let totalPrice;
            cartObject.forEach(element => {
                let singleTotalPrice = element.price * element.quantity;
                let cartHTML =
                    `<div class="row border-top border-3">
                        <div class="col-md-8 align-self-center">
                            <div class="row py-2">
                                <div class="col-md-2"><img src="${element.imageURL}" alt=""></div>
                                <div class="col-md-10 align-self-center">
                                    <h5 class="text-bold line">${element.name} by <a href="" class="brand">${element.brand}</a></h5>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-2 line align-self-center">
                            <div class="text-26 col-md-5 text-bold">${element.quantity}</div>
                        </div>
                        <div class="col-md-2 align-self-center">
                            <div>
                                <h5 class="line price-tag text-secondary">${element.quantity}x/$${element.price}</h5>
                                <h1 class="price-tag text-bold">/$${singleTotalPrice}</h1>
                            </div>
                        </div>
                    </div>`

                $('#summary-product').prepend(cartHTML);

                totalPrice += singleTotalPrice
            });

            $('#summary-price').find('.cart-total-quantity').text(cartObject.length());
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
    }

    //* Cart methods
    //* Add to cart
    function addToCart(id, name, brand, price, quantity, imgURL) {
        //* Check if this item is already in the cart or not
        cartObject.forEach(element => {
            //* if it is already in the cart then increase the quantity
            if (element.id == id) {
                element.quantity = element.quantity + quantity;
            }
        });
        //* if not then add new item to localStorage
        let cartItem = {
            'id': id,
            'name': name,
            'brand': brand,
            'price': price,
            'imgURL': imgURL,
            'quantity': quantity
        };
        cartObject.push(cartItem);
        setLocalData('graciousCart', JSON.stringify(cartObject));
    }

    //* Remove from cart
    function removeFromCart(id) {
        let afterFilter = cartObject.filter((element) => {
            element.id != id;
        })

        cartObject = afterFilter;
        setLocalData('graciousCart', JSON.stringify(cartObject));
    }

    $(document).ready(function () {
        initCart();
        loadHeaderCart();
        loadPageCart();
        loadPageSummary();
    });


})(jQuery);
(function ($) {
    "use strict";
    let cartObject = null; //* global pointer to cart

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
            //* if previous cart is present load it
            cartObject = JSON.parse(getLocalData('graciousCart'));
        }
    }

    function loadHeaderCart() {
        if (cartObject != null) {
            //* if cartObject is set then display the header cart
            let totalPrice;
            cartObject.forEach(element => {
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

                totalPrice += element.price
            });
            $('cart-total-quantity').text(cartObject.length());
            $('#cart-total-price').text('$'+totalPrice);
            $('.cart-checkout').find('.price-tag').text('$'+totalPrice);
        } else {
            let cartHTML =
                `<div class="cart-product py-2">
                    <span class="text-dark">Cart is empty</span>
                </div>`
            
            $('.cart-checkout').parent().prepend(cartHTML);
            $('#cart-total-quantity').text('0');
            $('.cart-checkout').find('.price-tag').text('$0');
            $('#cart-total-price').text('$0');
        }
    }

    function addToCart(id, name, brand, size, color, price, quantity, imgURL) {
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
            'size': size,
            'color': color,
            'price': price,
            'imgURL': imgURL,
            'quantity': quantity
        };
        cartObject.push(cartItem);
        setLocalData('graciousCart', JSON.stringify(cartObject));
    }

    $(window).ready(function () {
        initCart();
        loadHeaderCart();
    });
})(jQuery);
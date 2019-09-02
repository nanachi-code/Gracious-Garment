(function ($) {
    "use strict";
    let cartObject = null; // global pointer to cart

    //* localStorage function
    function getLocalData(name) {
        return localStorage.getItem(name)
    }

    function setLocalData(name, value) {
        if (value != null)
            localStorage.setItem(name, value);
        else
            localStorage.removeItem(name);
    }

    function initCart() {
        // Check in browser memory if there are a saved cart
        if (getLocalData('graciousCart') != null) {
            // if previous cart is present load it
            cartObject = JSON.parse(getLocalData('graciousCart'));
        } else {
            console.log("Cart is empty!");
        }
    }

    function addToCart(name, brand, size, color, price, imgURL) {
        //* Add new item to localStorage
        let cartItem = {
            'name': name,
            'brand': brand,
            'size': size,
            'color': color,
            'price': price,
            'imgURL': imgURL
        };
        cartObject.push(cartItem);
        setLocalData('graciousCart', JSON.stringify(cartObject));

        //* Append HTML to header cart
        let productHTML =
            `<div class="cart-product py-2">
                <div class="row">
                    <div class="col-md-4">
                        <div>
                            <img src="${imgURL}" alt="">
                        </div>
                    </div>
                    <div class="col-md-8">
                        <div>
                            <h6 class="text-dark text-left text-bold">${name}<br>
                                by <span class="brand">${brand}</span>
                            </h6>
                        </div>
                        <div class="price-tag text-dark float-left">
                            ${price}
                        </div>
                    </div>
                </div>
            </div>`;
        $('.cart-checkout').prepend(productHTML);
    }

    $(window).ready(function () {
        initCart();
    });
})(jQuery);
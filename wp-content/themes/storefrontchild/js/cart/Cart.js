///<reference path="request/SetQuantityRequest.ts"/>
///<reference path="request/EmptyCartRequest.ts"/>
///<reference path="request/GetCartEmptyInfoPhraseRequest.ts"/>
///<reference path="../common/lib/events/EventBus.ts"/>
var Cart = (function () {
    function Cart(j$) {
        this.currencySymbol = "дублоноФФ :)";
        this.j$ = j$;
        this.quantityElements = new List("quantityElement");
        this.parseCurrencySymbol();
        this.createItems();
        this.createEmptyButton();
        this.createListeners();
    }
    Cart.prototype.createItems = function () {
        var _this = this;
        var elements = this.getElements();
        var i = 0;
        var total = elements.length;
        for (i = 0; i < total; i++) {
            var element = this.j$(elements[i]);
            var key = element.data("key");
            var decrementButton = element.find(".modalCart__itemCountCircle-minus");
            var quantityElement = element.find(".modalCart__itemCountNum");
            var incrementButton = element.find(".modalCart__itemCountCircle-plus");
            this.quantityElements[key] = quantityElement;
            decrementButton.click(function (event) { return _this.onDecrementButtonClicked(event); });
            incrementButton.click(function (event) { return _this.onIncrementButtonClicked(event); });
        }
    };
    Cart.prototype.getElements = function () {
        return this.j$(".shopping__item");
    };
    Cart.prototype.onDecrementButtonClicked = function (event) {
        var key = this.getKey(event);
        var element = this.quantityElements[key];
        var newQuantity = element.text();
        this.updateSidebar(key, parseInt(newQuantity));
        if (newQuantity == "0") {
            this.removeElement(key);
        }
        var request = new SetQuantityRequest(this.j$);
        request.execute(key, newQuantity);
    };
    Cart.prototype.onIncrementButtonClicked = function (event) {
        var key = this.getKey(event);
        var element = this.quantityElements[key];
        var newQuantity = element.text();
        this.updateSidebar(key, parseInt(newQuantity));
        var request = new SetQuantityRequest(this.j$);
        request.execute(key, newQuantity);
    };
    Cart.prototype.getKey = function (event) {
        var element = this.j$(event.currentTarget);
        var cartItemElement = this.j$(element.parent().parent().parent());
        return cartItemElement.data("key");
    };
    Cart.prototype.createEmptyButton = function () {
        var _this = this;
        var emptyButton = this.j$("#emptyCart");
        emptyButton.click(function () { return _this.emptyButtonClicked(); });
    };
    Cart.prototype.emptyButtonClicked = function () {
        var request = new EmptyCartRequest(this.j$);
        request.execute();
    };
    Cart.prototype.removeElement = function (key) {
        this.quantityElements[key].parent().parent().parent().remove();
        delete this.quantityElements[key];
    };
    Cart.prototype.removeSidebarElement = function (key) {
        var element = this.j$('.shopping__totalBlockOrderItem[data-key="' + key + '"]');
        element.remove();
    };
    Cart.prototype.updateSidebar = function (key, newQuantity) {
        var element = this.j$('.shopping__totalBlockOrderItem[data-key="' + key + '"]');
        var quantityElement = element.find(".shopping__totalBlockOrderItemNum");
        if (newQuantity == 0) {
            this.removeSidebarElement(key);
            var cartIsEmpty = this.detectCartIsEmpty();
            if (cartIsEmpty == true) {
                this.j$(".wc-proceed-to-checkout").remove();
                this.j$("#emptyCart").remove();
                this.j$(".cart_totals").remove();
                this.getCartEmptyInfoHtml();
            }
        }
        else {
            quantityElement.text("x" + newQuantity);
        }
        // calculate total cost
        var newTotalCost = this.numberWithSpaces(this.getTotalCost().toString());
        var html = newTotalCost.toString();
        html += " <span class='woocommerce-Price-currencySymbol'>" + this.currencySymbol + "</span>";
        this.j$(".woocommerce-Price-amount").html(html);
    };
    Cart.prototype.getTotalCost = function () {
        var cost = 0;
        var elements = this.j$(".shopping__totalBlockOrderItem");
        var i;
        var total = elements.length;
        for (i = 0; i < total; i++) {
            var element = this.j$(elements[i]);
            var quantity = parseInt(this.getQuantity(element));
            var priceElement = element.find(".shopping__totalBlockOrderItemPrice");
            var priceElementText = priceElement.text();
            priceElementText = priceElementText.replace(/\s/g, '');
            var price = parseInt(priceElementText.split(this.currencySymbol)[0].trim());
            var itemCost = quantity * price;
            cost += itemCost;
        }
        return cost;
    };
    Cart.prototype.parseCurrencySymbol = function () {
        this.currencySymbol = this.j$(".woocommerce-Price-currencySymbol").html();
    };
    Cart.prototype.numberWithSpaces = function (x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    };
    Cart.prototype.getQuantity = function (element) {
        var quantityElement = element.find(".shopping__totalBlockOrderItemNum");
        var quantityText = quantityElement.text();
        return quantityText.substring(1, quantityText.length);
    };
    Cart.prototype.detectCartIsEmpty = function () {
        var elements = this.j$(".shopping__totalBlockOrderItem");
        return elements.length == 0;
    };
    Cart.prototype.getCartEmptyInfoHtml = function () {
        var request = new GetCartEmptyInfoPhraseRequest(this.j$);
        request.execute();
    };
    Cart.prototype.createListeners = function () {
        var _this = this;
        EventBus.addEventListener("CART_EMPTY_INFO_PHRASE_LOAD_COMPLETE", function (data) { return _this.onCartEmptyInfoPhraseLoadComplete(data); });
    };
    Cart.prototype.onCartEmptyInfoPhraseLoadComplete = function (phrase) {
        this.showCartEmptyElement(phrase);
    };
    Cart.prototype.showCartEmptyElement = function (phrase) {
        var element = this.j$("<p class='cart-empty woocommerce-info'>" + phrase + "</p>");
        element.appendTo(this.j$(".woocommerce-notices-wrapper"));
    };
    return Cart;
}());
//# sourceMappingURL=Cart.js.map
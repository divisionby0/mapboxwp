var SetQuantityRequest = (function () {
    function SetQuantityRequest(j$) {
        this.j$ = j$;
    }
    SetQuantityRequest.prototype.execute = function (key, newQuantity) {
        var _this = this;
        this.j$.ajax({
            url: ajaxurl,
            type: 'POST',
            data: { action: "cart_set_quantity", key: key, newQuantity: newQuantity }
        }).done(function (data) { return _this.onResponse(data); });
    };
    SetQuantityRequest.prototype.onResponse = function (data) {
        console.log("set cart item quantity response data= ", data);
    };
    return SetQuantityRequest;
}());
//# sourceMappingURL=SetQuantityRequest.js.map
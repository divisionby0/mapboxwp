var EmptyCartRequest = (function () {
    function EmptyCartRequest(j$) {
        this.j$ = j$;
    }
    EmptyCartRequest.prototype.execute = function () {
        var _this = this;
        this.j$.ajax({
            url: ajaxurl,
            type: 'POST',
            data: { action: "empty_cart" }
        }).done(function (data) { return _this.onResponse(data); });
    };
    EmptyCartRequest.prototype.onResponse = function (data) {
        console.log("increment result: ", data);
    };
    return EmptyCartRequest;
}());
//# sourceMappingURL=EmptyCartRequest.js.map
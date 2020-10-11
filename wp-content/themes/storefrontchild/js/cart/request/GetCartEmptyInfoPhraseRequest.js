///<reference path="../../common/lib/events/EventBus.ts"/>
var GetCartEmptyInfoPhraseRequest = (function () {
    function GetCartEmptyInfoPhraseRequest(j$) {
        this.j$ = j$;
    }
    GetCartEmptyInfoPhraseRequest.prototype.execute = function () {
        var _this = this;
        this.j$.ajax({
            url: ajaxurl,
            type: 'POST',
            data: { action: "get_cart_empty_info_html" }
        }).done(function (data) { return _this.onResponse(data); });
    };
    GetCartEmptyInfoPhraseRequest.prototype.onResponse = function (data) {
        EventBus.dispatchEvent("CART_EMPTY_INFO_PHRASE_LOAD_COMPLETE", data);
    };
    return GetCartEmptyInfoPhraseRequest;
}());
//# sourceMappingURL=GetCartEmptyInfoPhraseRequest.js.map
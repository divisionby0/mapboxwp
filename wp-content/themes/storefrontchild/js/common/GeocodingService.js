///<reference path="lib/events/EventBus.ts"/>
var GeocodingService = (function () {
    function GeocodingService(j$, settings) {
        this.url = "";
        this.reverseUrl = "";
        this.token = "";
        this.j$ = j$;
        this.url = settings[0];
        this.reverseUrl = settings[1];
        this.token = settings[2];
    }
    GeocodingService.prototype.getCity = function (lat, lng) {
        var _this = this;
        var url = this.buildReverseUrl(lat, lng);
        this.j$.get(url, function (data, status) { return _this.onReverseResult(data, status); });
    };
    GeocodingService.prototype.getCoordinates = function (cityName) {
        var _this = this;
        console.log("getCoordinates cityName=" + cityName);
        var url = this.buildUrl(cityName);
        console.log("url=", url);
        /*
        this.j$.ajax({
            type: "POST",
            url: ajaxurl,
            data: data,
            dataType: "json",
            success: (response)=>this.onResponse(response),
            error: (XMLHttpRequest, textStatus, errorThrown)=>this.onFail(XMLHttpRequest, textStatus, errorThrown)
        });
        */
        /*
        this.j$(url, null)
            .done((result)=>this.onResult(result))
            .fail((xhr, status, error)=>this.onFail(xhr, status, error));
        */
        this.j$.ajax(url, {
            type: 'GET',
            success: function (data, status, xhr) { return _this.onResult(data, status, xhr); },
            error: function (jqXhr, textStatus, errorMessage) { return _this.onFail(jqXhr, textStatus, errorMessage); }
        });
        // orig
        //this.j$.get(url, (data,status) =>this.onResult(data,status), (xhr, errorText, errorThrown)=>this.onFail(xhr, errorText, errorThrown));
    };
    /*
    private onResult(data:any):any{
        EventBus.dispatchEvent(GeocodingService.ON_GEOCODING_RESULT, {data:data});
    }
    */
    GeocodingService.prototype.onFail = function (xhr, errorText, errorThrown) {
        console.error("onFail ", xhr, errorText, errorThrown);
        // EventBus.dispatchEvent(GeocodingService.ON_GEOCODING_FAIL, {xhr:xhr, status:status, error:error});
    };
    GeocodingService.prototype.onResult = function (data, status, xhr) {
        EventBus.dispatchEvent(GeocodingService.ON_GEOCODING_RESULT, { data: data, status: status });
    };
    GeocodingService.prototype.buildUrl = function (cityName) {
        return this.url + cityName + "&key=" + this.token;
    };
    GeocodingService.prototype.buildReverseUrl = function (lat, lng) {
        return this.reverseUrl + "latlng=" + lat + "," + lng + "&key=" + this.token;
    };
    GeocodingService.prototype.onReverseResult = function (data, status) {
        EventBus.dispatchEvent(GeocodingService.ON_REVERSED_GEOCODING_RESULT, { data: data, status: status });
    };
    GeocodingService.ON_GEOCODING_RESULT = "ON_GEOCODING_RESULT";
    GeocodingService.ON_GEOCODING_FAIL = "ON_GEOCODING_FAIL";
    GeocodingService.ON_REVERSED_GEOCODING_RESULT = "ON_REVERSED_GEOCODING_RESULT";
    return GeocodingService;
}());
//# sourceMappingURL=GeocodingService.js.map
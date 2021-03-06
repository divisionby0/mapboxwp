///<reference path="SearchCityModel.ts"/>
///<reference path="../../../GeocodingService.ts"/>
var SearchCityController = (function () {
    function SearchCityController(model) {
        var _this = this;
        this.model = model;
        EventBus.addEventListener(SearchCityEvent.ON_CITY_NAME, function (name) { return _this.onSearchCityName(name); });
        EventBus.addEventListener(SearchCityEvent.ON_CITY_NAME_EMPTY, function () { return _this.onSearchCityNameEmpty(); });
        EventBus.addEventListener(GeocodingService.ON_GEOCODING_RESULT, function (data) { return _this.onGeocodingResult(data); });
    }
    SearchCityController.prototype.onSearchCityName = function (name) {
        this.model.findCoordinates(name);
    };
    SearchCityController.prototype.onGeocodingResult = function (data) {
        this.model.onGeocodingResult(data);
    };
    SearchCityController.prototype.onSearchCityNameEmpty = function () {
        console.log("onSearchCityNameEmpty ");
        this.model.onSearchCityNameEmpty();
    };
    return SearchCityController;
}());
//# sourceMappingURL=SearchCityController.js.map
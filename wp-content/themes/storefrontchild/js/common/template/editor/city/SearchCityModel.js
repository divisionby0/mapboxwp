///<reference path="SearchCityView.ts"/>
///<reference path="SearchCityResultParses.ts"/>
///<reference path="../../../GeocodingService.ts"/>
var SearchCityModel = (function () {
    function SearchCityModel(view, geocodingService) {
        this.view = view;
        this.geocodingService = geocodingService;
    }
    SearchCityModel.prototype.findCoordinates = function (cityName) {
        this.view.disable();
        this.geocodingService.getCoordinates(cityName);
    };
    SearchCityModel.prototype.onSearchCityNameEmpty = function () {
        this.view.enable();
        this.view.clear();
    };
    SearchCityModel.prototype.onGeocodingResult = function (data) {
        //console.log("onGeocodingResult data=",data);
        this.view.enable();
        var resultParser = new SearchCityResultParses();
        var resultData = resultParser.parse(data);
        var status = resultData.status;
        if (status != "error") {
            this.view.setCities(resultData.collection);
        }
        else {
            alert("Error: " + resultData.error);
        }
    };
    SearchCityModel.prototype.setCity = function (cityName) {
        this.view.setCity(cityName);
    };
    return SearchCityModel;
}());
//# sourceMappingURL=SearchCityModel.js.map
///<reference path="../../Template.ts"/>
///<reference path="../../../GeocodingService.ts"/>
///<reference path="SearchCityView.ts"/>
///<reference path="SearchCityModel.ts"/>
///<reference path="SearchCityController.ts"/>
///<reference path="../../../lib/events/EventBus.ts"/>
///<reference path="../EditorEvent.ts"/>
///<reference path="../../TemplateUtil.ts"/>
var SearchCity = (function () {
    function SearchCity(j$, currentTemplate) {
        this.j$ = j$;
        this.currentTemplate = currentTemplate;
        this.getGeocodingAdminData();
    }
    SearchCity.prototype.setDefaultCity = function () {
        console.log("set default city this.currentTemplate=", this.currentTemplate);
        console.log("this.currentCoord=", this.currentCoord);
        this.onCityChanged({ coord: [this.currentTemplate.getLat(), this.currentTemplate.getLng()], city: this.currentTemplate.getCity() });
        EventBus.dispatchEvent(EditorEvent.CITY_CHANGED, { city: this.currentCity, coord: this.currentCoord });
    };
    SearchCity.prototype.getGeocodingAdminData = function () {
        var _this = this;
        this.j$.ajax({
            url: ajaxUrl,
            type: 'POST',
            data: 'action=getGeocodingAdminData'
        })
            .done(function (data) { return _this.onGeocodingAdminDataLoaded(data); })
            .fail(function (error) { return _this.onGeocodingAdminDataLoadError(error); });
    };
    SearchCity.prototype.onGeocodingAdminDataLoaded = function (data) {
        try {
            this.geocodingSettings = JSON.parse(data);
        }
        catch (error) {
            console.error("Error parsing admin geocoding data. error=", error);
        }
        if (this.geocodingSettings) {
            this.onGeocodingAdminDataReady();
        }
        else {
            alert("Error parsing admin geocoding data");
        }
    };
    SearchCity.prototype.onGeocodingAdminDataLoadError = function (error) {
        console.error("onGeocodingAdminDataLoadError. error=", error);
    };
    SearchCity.prototype.onGeocodingAdminDataReady = function () {
        this.createGeocodingService();
        this.create();
        this.createListeners();
        this.setDefaultCity();
    };
    SearchCity.prototype.createGeocodingService = function () {
        this.geocodingService = new GeocodingService(this.j$, this.geocodingSettings);
    };
    SearchCity.prototype.create = function () {
        var view = new SearchCityView(this.j$);
        var model = new SearchCityModel(view, this.geocodingService);
        new SearchCityController(model);
    };
    SearchCity.prototype.createListeners = function () {
        var _this = this;
        EventBus.addEventListener(EditorEvent.CITY_CHANGED, function (data) { return _this.onCityChanged(data); });
        // find city by template's data
        //EventBus.addEventListener(GeocodingService.ON_GEOCODING_RESULT, (data)=>this.onDefaultCityGeocodingResult(data));
        //this.getDefaultCity();
    };
    SearchCity.prototype.onCityChanged = function (data) {
        var coord = data.coord;
        var city = data.city;
        this.j$("#user_lat").val(parseFloat(coord[0]).toFixed(4));
        this.j$("#user_lon").val(parseFloat(coord[1]).toFixed(4));
        // update template
        this.currentTemplate.setCity(city);
        this.currentTemplate.setLat(coord[0]);
        this.currentTemplate.setLng(coord[1]);
        this.currentCity = city;
        this.currentCoord = coord;
        EventBus.dispatchEvent(EditorEvent.COORDINATES_CHANGED, coord);
        EventBus.dispatchEvent("UPDATE_STARMAP", null);
    };
    SearchCity.prototype.onDefaultCityGeocodingResult = function (data) {
        var _this = this;
        console.log("onDefaultCityGeocodingResult data=", data);
        EventBus.removeEventListener(GeocodingService.ON_GEOCODING_RESULT, function (data) { return _this.onDefaultCityGeocodingResult(data); });
        var resultParser = new SearchCityResultParses();
        var resultData = resultParser.parse(data);
        var firstCity = this.getFirstCity(resultData);
        EventBus.dispatchEvent(EditorEvent.CITY_CHANGED, firstCity);
        EventBus.dispatchEvent(EditorEvent.COORDINATES_CHANGED, firstCity.coord);
    };
    SearchCity.prototype.getFirstCity = function (data) {
        var cities = data.collection;
        var firstCityData = cities.get(0);
        var coord = firstCityData.coord;
        var cityName = firstCityData.name;
        if (firstCityData) {
            return { coord: coord, city: cityName };
        }
        else {
            console.error("Did'n find template default city");
        }
    };
    SearchCity.prototype.getDefaultCity = function () {
        console.log("getDefaultCity()");
        var defaultCity = TemplateUtil.getCurrentCity(this.currentTemplate);
        console.log("defaultCity=" + defaultCity);
        EventBus.dispatchEvent(SearchCityEvent.ON_CITY_NAME, defaultCity);
    };
    SearchCity.prototype.getCurrentLocation = function () {
        var _this = this;
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(function (position) { return _this.onCurrentPosition(position); }, function (error_message) { return _this.onCurrentPositionError(error_message); });
        }
        else {
            console.error('geolocation is not enabled on this browser - need to use default city');
        }
    };
    SearchCity.prototype.onCurrentPosition = function (position) {
        var _this = this;
        this.currentCoord = [position.coords.latitude, position.coords.longitude];
        console.log('Current position: latitude ' + position.coords.latitude + ' longitude ' + position.coords.longitude);
        EventBus.addEventListener(GeocodingService.ON_REVERSED_GEOCODING_RESULT, function (data) { return _this.onCityByCoordinatesGeocodingResult(data); });
        this.geocodingService.getCity(position.coords.latitude, position.coords.longitude);
    };
    SearchCity.prototype.onCurrentPositionError = function (error_message) {
        console.error('An error has occured while retrieving location' + error_message.message);
    };
    SearchCity.prototype.onCityByCoordinatesGeocodingResult = function (data) {
        console.log("onCityByCoordinatesGeocodingResult data=", data);
        var resultParser = new SearchCityResultParses();
        var resultData = resultParser.parse(data);
        console.log("resultData:", resultData);
        var firstCity = this.getFirstCity(resultData);
        console.log("first city:", firstCity);
        if (!firstCity.city || !firstCity.coord) {
            console.log("City did not get. Using default city...");
            this.getDefaultCity();
        }
        else {
            this.currentTemplate.setCity(firstCity.name);
            this.currentTemplate.setLat(firstCity.coord[0]);
            this.currentTemplate.setLng(firstCity.coord[1]);
            this.currentCity = firstCity.name;
            EventBus.dispatchEvent(EditorEvent.CITY_CHANGED, firstCity);
            EventBus.dispatchEvent(EditorEvent.COORDINATES_CHANGED, firstCity.coord);
        }
    };
    return SearchCity;
}());
//# sourceMappingURL=SearchCity.js.map
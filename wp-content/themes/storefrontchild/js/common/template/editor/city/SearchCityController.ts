///<reference path="SearchCityModel.ts"/>
///<reference path="../../../GeocodingService.ts"/>
class SearchCityController{
    private model:SearchCityModel;
    
    constructor(model:SearchCityModel){
        this.model = model;
        EventBus.addEventListener(SearchCityEvent.ON_CITY_NAME, (name)=>this.onSearchCityName(name));
        EventBus.addEventListener(SearchCityEvent.ON_CITY_NAME_EMPTY, ()=>this.onSearchCityNameEmpty());
        EventBus.addEventListener(GeocodingService.ON_GEOCODING_RESULT, (data)=>this.onGeocodingResult(data));
    }
    
    private onSearchCityName(name:string):void{
        this.model.findCoordinates(name);
    }

    private onGeocodingResult(data:any):void {
        this.model.onGeocodingResult(data);
    }

    private onSearchCityNameEmpty():void {
        console.log("onSearchCityNameEmpty ");
        this.model.onSearchCityNameEmpty();
    }
}

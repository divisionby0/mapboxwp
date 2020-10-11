///<reference path="../../Template.ts"/>
///<reference path="../../../GeocodingService.ts"/>
///<reference path="SearchCityView.ts"/>
///<reference path="SearchCityModel.ts"/>
///<reference path="SearchCityController.ts"/>
///<reference path="../../../lib/events/EventBus.ts"/>
///<reference path="../EditorEvent.ts"/>
///<reference path="../../TemplateUtil.ts"/>
declare var ajaxUrl:string;
class SearchCity{
    private j$:any;
    private currentTemplate:Template;
    private geocodingService:GeocodingService;
    private currentCity:any;
    private currentCoord:any[];
    private geocodingSettings:string[];

    constructor(j$:any, currentTemplate:Template){
        console.log("new SearchCity");
        this.j$ = j$;
        this.currentTemplate = currentTemplate;
        this.createListeners();
        this.getGeocodingAdminData();
    }

    private setDefaultCity():void{
        console.log("set default city this.currentTemplate=",this.currentTemplate);
        console.log("this.currentCoord=",this.currentCoord);

        this.onCityChanged({coord:[this.currentTemplate.getLat(), this.currentTemplate.getLng()], city:this.currentTemplate.getCity()});
        EventBus.dispatchEvent(EditorEvent.CITY_CHANGED, {city:this.currentCity,coord:this.currentCoord});
    }

    private getGeocodingAdminData():void{
        this.j$.ajax({
            url: ajaxUrl,
            type: 'POST',
            data: 'action=getGeocodingAdminData'
        })
            .done((data)=>this.onGeocodingAdminDataLoaded(data))
            .fail((error)=>this.onGeocodingAdminDataLoadError(error));
    }
    
    private onGeocodingAdminDataLoaded(data:string):void{
        try{
            this.geocodingSettings = JSON.parse(data);
        }
        catch(error){
            console.error("Error parsing admin geocoding data. error=",error);
        }

        if(this.geocodingSettings){
            this.onGeocodingAdminDataReady();
        }
        else{
            alert("Error parsing admin geocoding data");
        }
    }

    private onGeocodingAdminDataLoadError(error:any):void{
        console.error("onGeocodingAdminDataLoadError. error=",error);
    }

    private onGeocodingAdminDataReady():void{
        this.createGeocodingService();
        this.create();
        //this.createListeners();

        this.setDefaultCity();
    }

    private createGeocodingService():void {
        this.geocodingService = new GeocodingService(this.j$, this.geocodingSettings);
    }

    private create():void {
        var view:SearchCityView = new SearchCityView(this.j$);
        var model:SearchCityModel = new SearchCityModel(view, this.geocodingService);
        new SearchCityController(model);
    }

    private createListeners():void {
        console.log("createListeners()");
        EventBus.addEventListener(EditorEvent.CITY_CHANGED, (data)=>this.onCityChanged(data));
    }

    private onCityChanged(data:any):void{
        console.log("onCityChanged data=",data);
        var coord:any = data.coord;
        var city:string = data.city;

        this.j$("#user_lat").val(parseFloat(coord[0]).toFixed(4));
        this.j$("#user_lon").val(parseFloat(coord[1]).toFixed(4));

        // update template
        this.currentTemplate.setCity(city);
        this.currentTemplate.setLat(coord[0]);
        this.currentTemplate.setLng(coord[1]);

        this.currentCity = city;
        this.currentCoord = coord;

        console.log("coord changed");
        EventBus.dispatchEvent(EditorEvent.COORDINATES_CHANGED, coord);
        EventBus.dispatchEvent("UPDATE_STARMAP", null);
    }

    private onDefaultCityGeocodingResult(data:any):void{
        console.log("onDefaultCityGeocodingResult data=",data);
        EventBus.removeEventListener(GeocodingService.ON_GEOCODING_RESULT, (data)=>this.onDefaultCityGeocodingResult(data));

        var resultParser:SearchCityResultParses = new SearchCityResultParses();
        var resultData = resultParser.parse(data);

        var firstCity:any = this.getFirstCity(resultData);
        EventBus.dispatchEvent(EditorEvent.CITY_CHANGED, firstCity);

        EventBus.dispatchEvent(EditorEvent.COORDINATES_CHANGED, firstCity.coord);
    }

    private getFirstCity(data:any):any{
        var cities:any = data.collection;
        var firstCityData:any = cities.get(0);

        var coord:any = firstCityData.coord;
        var cityName:string = firstCityData.name;

        if(firstCityData){
            return {coord:coord, city:cityName};
        }
        else{
            console.error("Did'n find template default city");
        }
    }

    private getDefaultCity():void {
        console.log("getDefaultCity()");
        var defaultCity:string = TemplateUtil.getCurrentCity(this.currentTemplate);
        console.log("defaultCity="+defaultCity);

        EventBus.dispatchEvent(SearchCityEvent.ON_CITY_NAME, defaultCity);
    }

    private getCurrentLocation():void{
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition((position)=>this.onCurrentPosition(position), (error_message)=>this.onCurrentPositionError(error_message));
        } else {
            console.error('geolocation is not enabled on this browser - need to use default city');
        }
    }

    private onCurrentPosition(position:Position):void{
        this.currentCoord = [position.coords.latitude, position.coords.longitude];
        console.log('Current position: latitude '+ position.coords.latitude+ ' longitude '+ position.coords.longitude);

        EventBus.addEventListener(GeocodingService.ON_REVERSED_GEOCODING_RESULT, (data)=>this.onCityByCoordinatesGeocodingResult(data));

        this.geocodingService.getCity(position.coords.latitude, position.coords.longitude);
    }
    private onCurrentPositionError(error_message:PositionError):void{
        console.error('An error has occured while retrieving location'+ error_message.message);
    }

    private onCityByCoordinatesGeocodingResult(data:any):void{
        console.log("onCityByCoordinatesGeocodingResult data=",data);

        var resultParser = new SearchCityResultParses();
        var resultData = resultParser.parse(data);

        console.log("resultData:",resultData);

        var firstCity:any = this.getFirstCity(resultData);

        console.log("first city:",firstCity);

        if(!firstCity.city || !firstCity.coord){
            console.log("City did not get. Using default city...");
            this.getDefaultCity();
        }
        else{
            this.currentTemplate.setCity(firstCity.name);
            this.currentTemplate.setLat(firstCity.coord[0]);
            this.currentTemplate.setLng(firstCity.coord[1]);

            this.currentCity = firstCity.name;

            EventBus.dispatchEvent(EditorEvent.CITY_CHANGED, firstCity);

            EventBus.dispatchEvent(EditorEvent.COORDINATES_CHANGED, firstCity.coord);
        }
    }
}

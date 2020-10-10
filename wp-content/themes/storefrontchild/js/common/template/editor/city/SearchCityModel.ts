///<reference path="SearchCityView.ts"/>
///<reference path="SearchCityResultParses.ts"/>
///<reference path="../../../GeocodingService.ts"/>
class SearchCityModel{
    private view:SearchCityView;
    private geocodingService:GeocodingService;
    
    constructor(view:SearchCityView, geocodingService:GeocodingService){
        this.view = view;
        this.geocodingService = geocodingService;
    }
    
    public findCoordinates(cityName:string):void{
        this.view.disable();
        this.geocodingService.getCoordinates(cityName);
    }
    
    public onSearchCityNameEmpty():void{
        this.view.enable();
        this.view.clear();
    }
    
    public onGeocodingResult(data:any):void{
        console.log("onGeocodingResult data=",data);
        
        this.view.enable();

        var resultParser:SearchCityResultParses = new SearchCityResultParses();
        
        var resultData:any = resultParser.parse(data);
        
        var status:string = resultData.status;
        
        if(status != "error"){
            this.view.setCities(resultData.collection);
        }
        else{
            alert("Error: "+resultData.error);
        }
    }

    public setCity(cityName:string):void {
        this.view.setCity(cityName);
    }
}

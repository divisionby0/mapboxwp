///<reference path="lib/events/EventBus.ts"/>
class GeocodingService{
    private j$:any;
    private url:string = "";
    private reverseUrl:string = "";
    private token:string = "";
    
    public static ON_GEOCODING_RESULT:string = "ON_GEOCODING_RESULT";
    public static ON_GEOCODING_FAIL:string = "ON_GEOCODING_FAIL";
    public static ON_REVERSED_GEOCODING_RESULT:string = "ON_REVERSED_GEOCODING_RESULT";

    constructor(j$:any, settings:string[]){ //TODO передать в конструкторе токен
        this.j$ = j$;
        this.url = settings[0];
        this.reverseUrl = settings[1];
        this.token = settings[2];
    }

    public getCity(lat:any, lng:any):any{
        var url:string = this.buildReverseUrl(lat, lng);
        this.j$.get(url, (data,status) =>this.onReverseResult(data,status));
    }

    public getCoordinates(cityName:string):void{
        var url:string = this.buildUrl(cityName);
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
            type: 'GET',  // http method
            success: (data, status, xhr)=> this.onResult(data, status, xhr),
            error: (jqXhr, textStatus, errorMessage)=>this.onFail(jqXhr, textStatus, errorMessage)
        });

        // orig
        //this.j$.get(url, (data,status) =>this.onResult(data,status), (xhr, errorText, errorThrown)=>this.onFail(xhr, errorText, errorThrown));
    }

    /*
    private onResult(data:any):any{
        EventBus.dispatchEvent(GeocodingService.ON_GEOCODING_RESULT, {data:data});
    }
    */

    private onFail(xhr, errorText, errorThrown):any{
        console.error("onFail ",xhr, errorText, errorThrown);
       // EventBus.dispatchEvent(GeocodingService.ON_GEOCODING_FAIL, {xhr:xhr, status:status, error:error});
    }


    private onResult(data:any,status:string, xhr:any):void{
        EventBus.dispatchEvent(GeocodingService.ON_GEOCODING_RESULT, {data:data, status:status});
    }


    private buildUrl(cityName:string):string{
        return this.url+cityName+"&key="+this.token;
    }
    
    private buildReverseUrl(lat:any, lng:any):string {
        return this.reverseUrl+"latlng="+lat+","+lng+"&key="+this.token;
    }

    private onReverseResult(data:any, status:any):void {
        EventBus.dispatchEvent(GeocodingService.ON_REVERSED_GEOCODING_RESULT, {data:data, status:status});
    }
}

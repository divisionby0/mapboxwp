class SearchCityResultParses{

    private city:any = null;
    private country:any = "";
    private center:any = null;

    constructor(){

    }

    public parse(data:any):any{
        var collection:List<any> = new List<any>("cities");
        var status:string = data.status;

        console.log("parsing geocoding result...");
        
        if(status == "success"){
            var responseStatus:string = data.data.status;
            
            if(responseStatus == "REQUEST_DENIED"){
                return {status:"error", error:data.data.error_message};
            }
            
            if(responseStatus != "ZERO_RESULTS"){
                var features:any[] = data.data.results;
                var i:number;
                var j:number;

                //console.log("features:",features,"length=",length);

                if (features.length>0) {
                    var c, lc, component;

                    for (var r = 0, rl = features.length; r < rl; r += 1) {
                        var result = features[r];

                        if (!this.city && result.types[0] === 'locality') {
                            for (c = 0, lc = result.address_components.length; c < lc; c += 1) {
                                component = result.address_components[c];

                                if (component.types[0] === 'locality') {
                                    this.city = component.long_name;
                                    //this.center = [result.geometry.location.lng, result.geometry.location.lat];
                                    this.center = [result.geometry.location.lat, result.geometry.location.lng];
                                    this.parse(data);
                                    break;
                                }
                            }
                        }
                        else if (this.country === "") {
                            for (c = 0, lc = result.address_components.length; c < lc; c += 1) {
                                component = result.address_components[c];

                                if (component.types[0] === 'country') {
                                    this.country = component.long_name;
                                    break;
                                }
                            }
                        }

                        if (this.city && this.country && this.center) {
                            break;
                        }
                    }
                    collection.add({name:this.city, country:this.country, coord:this.center});
                }
                else{
                    console.error("No results");
                }
            }

            return {status:status, collection:collection};
        }
        else{
            return {status:"error", error:"Unknown error"};
        }
    }

    private isCity(id:string):boolean{
        if(id.indexOf("place") != -1){
            return true;
        }
        else{
            return false;
        }
    }
}

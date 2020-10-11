///<reference path="TextLayerView.ts"/>
class CityLayerView extends TextLayerView{

    protected onDestroy() {
        super.onDestroy();
        /*
        EventBus.removeEventListener(EditorEvent.CITY_CHANGED, (data)=>this.onCityChanged(data));
        EventBus.removeEventListener(EditorEvent.TEXT_1_CHANGED, (data)=>this.onCityTextChanged(data));
        EventBus.removeEventListener(EditorEvent.CITY_VISIBILITY_CHANGED, (data)=>this.onCityVisibilityChanged(data));
        */
    }
    
    protected createListeners():void{
        EventBus.addEventListener(EditorEvent.CITY_CHANGED, (data)=>this.onCityChanged(data));
        EventBus.addEventListener(EditorEvent.TEXT_1_CHANGED, (data)=>this.onCityTextChanged(data));
        EventBus.addEventListener(EditorEvent.CITY_VISIBILITY_CHANGED, (data)=>this.onCityVisibilityChanged(data));
    }

    protected onCityTextChanged(text:string):void{
        try{
            this.layerContainer.text(text.toUpperCase());
        }
        catch(error){
            
        }
    }
    
    protected onCityChanged(data:any):void {
        var city:string = data.city;
        this.layerContainer.text(city.toUpperCase());
    }

    private onCityVisibilityChanged(data:any):void {
        var visible:boolean = data.visible;
        
        if(visible){
            this.layerContainer.show();
        }
        else{
            this.layerContainer.hide();
        }
    }
}

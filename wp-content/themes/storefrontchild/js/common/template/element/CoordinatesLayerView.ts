///<reference path="CityLayerView.ts"/>
class CoordinatesLayerView extends CityLayerView{

    protected onDestroy() {
        super.onDestroy();
        EventBus.removeEventListener(EditorEvent.TEXT_3_CHANGED, (text)=>this.onText3Changed(text));
        EventBus.removeEventListener(EditorEvent.COORDINATES_CHANGED, (coord)=>this.onCoordinatesChanged(coord));
        EventBus.removeEventListener(EditorEvent.COORDINATES_VISIBILITY_CHANGED, (data)=>this.onCoordinatesVisibilityChanged(data));
    }
    
    protected createListeners():void{
        EventBus.addEventListener(EditorEvent.TEXT_3_CHANGED, (text)=>this.onText3Changed(text));
        EventBus.addEventListener(EditorEvent.COORDINATES_CHANGED, (coord)=>this.onCoordinatesChanged(coord));
        EventBus.addEventListener(EditorEvent.COORDINATES_VISIBILITY_CHANGED, (data)=>this.onCoordinatesVisibilityChanged(data));
    }

    protected onCoordinatesChanged(data:any):void {
        var coordinates:string = data[0]+" "+data[1];
        console.log("onCoordinatesChanged coordinates:",coordinates);
        this.layerContainer.text(coordinates);
    }

    private onCoordinatesVisibilityChanged(data:any):void {
        var visible:boolean = data.visible;
        console.log("onCoordinatesVisibilityChanged");


        if(visible){
            this.layerContainer.show();
        }
        else{
            this.layerContainer.hide();
        }
    }

    private onText3Changed(text:string):void {
        this.layerContainer.text(text.toUpperCase());
    }
}

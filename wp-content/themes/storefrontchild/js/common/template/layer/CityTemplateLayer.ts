///<reference path="TextTemplateLayer.ts"/>
///<reference path="../../lib/events/EventBus.ts"/>
///<reference path="../editor/EditorEvent.ts"/>
class CityTemplateLayer extends TextTemplateLayer{
    
    constructor(id:string, aspectRatio:number, type:string, text:string, color:string, fontSize:string, left:any = null, top:any = null, right:any = null, bottom:any = null, changeable:boolean, textAlign:string, fontWeight:string){
        super(id, aspectRatio, type,  text, color, fontSize, left, top, right, bottom, changeable, textAlign, fontWeight);
        this.createListener();
    }

    protected onDestroy():void {
        /*
        EventBus.removeEventListener(EditorEvent.CITY_CHANGED, (data)=>this.onCityChanged(data));
        EventBus.removeEventListener(EditorEvent.CITY_VISIBILITY_CHANGED, (data)=>this.onCityVisibilityChanged(data));
        */
    }
    
    protected createListener() {
        EventBus.addEventListener(EditorEvent.CITY_CHANGED, (data)=>this.onCityChanged(data));
        EventBus.addEventListener(EditorEvent.CITY_VISIBILITY_CHANGED, (data)=>this.onCityVisibilityChanged(data));
        //EventBus.addEventListener(EditorEvent.TEXT_1_CHANGED, (text)=>this.onText_1_changed(text));
    }
    
    protected onCityChanged(data:any):void {
        //console.log("onCityChanged data=",data);
        var city:string = data.city;
        this.text = city;
    }

    private onCityVisibilityChanged(data:any):void {
        this.visible = data.visible;
    }

    /*
    private onText_1_changed(data:any):void {
        console.log("CityTemplateLayer onText_1_changed data=",data.text);
        this.text = data.text.toUpperCase();
    }
    */
}

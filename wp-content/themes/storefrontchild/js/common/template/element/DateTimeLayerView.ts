///<reference path="TextLayerView.ts"/>
///<reference path="../editor/EditorEvent.ts"/>
///<reference path="../../lib/events/EventBus.ts"/>
class DateTimeLayerView extends TextLayerView{
    private objectId:string = "dtL_"+Math.round(Math.random()*1000);

    private selfTemplateLayer:TextTemplateLayer;

    protected create():void {
        super.create();
        this.selfTemplateLayer =  (this.layer as TextTemplateLayer);
    }

    protected onDestroy() {
        super.onDestroy();
        
        // TODO тут обратить внимание, если сдеклать так ()=>this.onDateTimeChanged(), то не отписывается от событий при destroy
        EventBus.removeEventListener(EditorEvent.DATE_TIME_CHANGED, ()=>this.onDateTimeChanged());
        EventBus.removeEventListener(EditorEvent.DATE_VISIBILITY_CHANGED, ()=>this.onDateVisibilityChanged());
        EventBus.removeEventListener(EditorEvent.TIME_VISIBILITY_CHANGED, ()=>this.onTimeVisibilityChanged());
    }
    
    protected createListeners():void{
        EventBus.addEventListener(EditorEvent.DATE_TIME_CHANGED, ()=>this.onDateTimeChanged());
        EventBus.addEventListener(EditorEvent.DATE_VISIBILITY_CHANGED, ()=>this.onDateVisibilityChanged());
        EventBus.addEventListener(EditorEvent.TIME_VISIBILITY_CHANGED, ()=>this.onTimeVisibilityChanged());
    }

    private onDateTimeChanged():void {
        this.layerContainer.text(this.selfTemplateLayer.getText());
    }

    private onDateVisibilityChanged():void {
        this.layerContainer.text(this.selfTemplateLayer.getText());
    }
    
    private onTimeVisibilityChanged():void {
        this.layerContainer.text(this.selfTemplateLayer.getText());
    }
}

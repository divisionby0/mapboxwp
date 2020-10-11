///<reference path="EditorEvent.ts"/>
///<reference path="../../lib/events/EventBus.ts"/>
///<reference path="../Template.ts"/>
///<reference path="../layer/TextTemplateLayer.ts"/>
///<reference path="../element/LayerView.ts"/>
///<reference path="../LayerId.ts"/>
class TemplateEditorView{
    protected j$:any;

    private constellationLinesButton:any;
    private starsMultiColorsButton:any;
    private dateButton:any;
    private timeButton:any;
    private cityButton:any;
    private borderButton:any;
    private circleBorderButton:any;
    private coordinatesButton:any;
    
    protected text_1_input:any;
    protected text_2_input:any;
    protected text_3_input:any;

    private sendAutomaticSettingsChangedInterval:number = 2000;

    constructor(j$:any){
        this.j$ = j$;
        this.addControls();
        this.createListeners();
    }

    public setData(template:Template):void {
        var layersIterator:ListIterator = template.getLayersIterator();
        while(layersIterator.hasNext()){
            var layer:TemplateLayer = layersIterator.next();

            if(layer instanceof TextTemplateLayer){
                var textLayer:TextTemplateLayer = (layer as TextTemplateLayer);

                var layerId:string = textLayer.getId();
                var layerText:string = textLayer.getText();

                if(layerId == LayerId.TEXT_LAYER_1_ID){
                    this.text_1_input.val(layerText);
                }
                if(layerId == LayerId.TEXT_LAYER_2_ID){
                    this.text_2_input.val(layerText);
                }
            }
        }
    }

    public reset(settings:any):void {
        if(this.constellationLinesButton){
            settings.constellations ? this.constellationLinesButton.attr('checked',true) : this.constellationLinesButton.attr('checked',false);
        }

        if(this.starsMultiColorsButton){
            this.starsMultiColorsButton.attr('checked',false);
        }
        if(this.dateButton){
            settings.date ? this.dateButton.attr('checked',true) : this.dateButton.attr('checked',false);
        }
        if(this.timeButton){
            settings.time ? this.timeButton.attr('checked',true) : this.timeButton.attr('checked',true);
        }
        if(this.cityButton){
            settings.place ? this.cityButton.attr('checked',true) : this.cityButton.attr('checked',false);
        }
        if(this.borderButton){
            settings.border ? this.borderButton.attr('checked',true) : this.borderButton.attr('checked',false);
        }
        if(this.circleBorderButton){
            settings.circle ? this.circleBorderButton.attr('checked',true) : this.circleBorderButton.attr('checked',false);
        }
        if(this.coordinatesButton){
            settings.coordinates ? this.coordinatesButton.attr('checked',true) : this.coordinatesButton.attr('checked',false);
        }

        setTimeout(()=>this.sendAutomaticSettingsChanged(), this.sendAutomaticSettingsChangedInterval);
    }

    
    protected createListeners():void {
        this.constellationLinesButton.change(()=>this.onConstellationsChanged());
        this.starsMultiColorsButton.change(()=>this.onStarsChanged());
        this.circleBorderButton.change(()=>this.onCircleBorderChanged());
        this.borderButton.change(()=>this.onBorderChanged());
        this.cityButton.change(()=>this.onCityVisibilityChanged());
        this.coordinatesButton.change(()=>this.onCoordinatesVisibilityChanged());
        
        this.dateButton.change(()=>this.onDateVisibilityChanged());
        this.timeButton.change(()=>this.onTimeVisibilityChanged());
        
        this.text_1_input.on("input", ()=>this.onText1Changed());
        this.text_2_input.on("input", ()=>this.onText2Changed());
        this.text_3_input.on("input", ()=>this.onText3Changed());
    }

    protected addControls():void {
        this.constellationLinesButton = this.j$('#constellationLinesButton');

        this.starsMultiColorsButton = this.j$('#starsMultiColorsButton');
        this.dateButton = this.j$('#dateButton');
        this.timeButton = this.j$('#timeButton');
        this.cityButton = this.j$('#placeButton');
        this.borderButton = this.j$('#borderButton');
        this.circleBorderButton = this.j$('#circleBorderButton');
        this.coordinatesButton = this.j$('#coordinatesButton');

        this.text_1_input = this.j$("#text_1_input");
        this.text_2_input = this.j$("#text_2_input");
        this.text_3_input = this.j$("#text_3_input");
    }

    private onConstellationsChanged():void {
        EventBus.dispatchEvent(EditorEvent.CONSTELLATIONS_CHANGED, this.constellationLinesButton.is(':checked'));
    }
    private onStarsChanged():void{
        EventBus.dispatchEvent(EditorEvent.STARS_CHANGED, this.starsMultiColorsButton.is(':checked'));
    }

    private onCircleBorderChanged():void {
        EventBus.dispatchEvent(EditorEvent.CIRCLE_BORDER_CHANGED, this.circleBorderButton.is(':checked'));
    }

    private onBorderChanged():void {
        EventBus.dispatchEvent(EditorEvent.BORDER_CHANGED, this.borderButton.is(':checked'));
    }

    private onText1Changed():void {
        EventBus.dispatchEvent(EditorEvent.TEXT_1_CHANGED, {text:this.text_1_input.val(), elementId:LayerId.TEXT_LAYER_1_ID});
    }

    private onText2Changed():void {
        EventBus.dispatchEvent(EditorEvent.TEXT_2_CHANGED, {text:this.text_2_input.val(), elementId:LayerId.TEXT_LAYER_2_ID});
    }

    private onText3Changed():void {
        //EventBus.dispatchEvent(EditorEvent.TEXT_2_CHANGED, {text:this.text_2_input.val(), elementId:LayerId.TEXT_LAYER_2_ID});
    }

    private onCityVisibilityChanged():void {
        var data:any = {visible:this.cityButton.is(':checked')};
        EventBus.dispatchEvent(EditorEvent.CITY_VISIBILITY_CHANGED, data);
    }
    private onCoordinatesVisibilityChanged():void {
        var data:any = {visible:this.coordinatesButton.is(':checked')};
        EventBus.dispatchEvent(EditorEvent.COORDINATES_VISIBILITY_CHANGED, data);
    }

    private onDateVisibilityChanged():void {
        var data:any = {visible:this.dateButton.is(':checked')};
        EventBus.dispatchEvent(EditorEvent.DATE_VISIBILITY_CHANGED, data);
    }

    private onTimeVisibilityChanged():void {
        var data:any = {visible:this.timeButton.is(':checked')};
        EventBus.dispatchEvent(EditorEvent.TIME_VISIBILITY_CHANGED, data);
    }

    private sendAutomaticSettingsChanged():void {
        this.onConstellationsChanged();
        this.onStarsChanged();
        this.onCircleBorderChanged();
        this.onBorderChanged();
        this.onText1Changed();
        this.onText2Changed();

        this.onText3Changed();
        this.onCityVisibilityChanged();
        this.onCoordinatesVisibilityChanged();

        this.onDateVisibilityChanged();
        this.onTimeVisibilityChanged();
    }
}

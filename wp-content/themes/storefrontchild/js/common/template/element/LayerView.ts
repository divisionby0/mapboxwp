///<reference path="../layer/TemplateLayer.ts"/>
///<reference path="ITemplateSizeProvider.ts"/>
class LayerView{
    protected j$:any;
    protected layer:TemplateLayer;
    protected parentId:string;
    protected selfId:string;
    protected currentWidth:number;
    protected style:string = "position:absolute;";
    protected layerContainer:any;
    
    protected currentHeight:number;
    protected templateWidthProvider:ITemplateSizeProvider;
    protected coeff:number;
    
    constructor(j$:any, layer:TemplateLayer, parentId:string, selfId:string, templateSizeProvider:ITemplateSizeProvider, coeff:number){
        this.j$ = j$;
        this.layer = layer;
        this.parentId = parentId;
        this.selfId = selfId;
        this.templateWidthProvider = templateSizeProvider;
        this.coeff = coeff;
        this.createListeners();
        this.create();
        this.createResizeListener();
        this.onResize(null);
    }
    
    public getId():string{
        return this.layer.getId();
    }
    
    public destroy():void{
        this.onDestroy();
    }

    protected createResizeListener():void{
        this.j$(window).on("resize",(event)=>this.onResize(event));
        //this.j$( window ).resize((event)=>this.onResize(event));
    }
    protected removeResizeListener():void{
        this.j$(window).off("resize",(event)=>this.onResize(event));
        //this.j$( window ).resize((event)=>this.onResize(event));
    }

    protected create():void {
        if(this.layer.hasLeft()){
            this.style+="left:"+this.layer.getLeft()+";";
        }
        if(this.layer.hasRight()){
            this.style+="right:"+this.layer.getRight()+";";
        }
        if(this.layer.hasTop()){
            this.style+="top:"+this.layer.getTop()+";";
        }
        if(this.layer.hasBottom()){
            this.style+="bottom:"+this.layer.getBottom()+";";
        }
    }

    protected calculateHeight():void{
        this.currentWidth = this.templateWidthProvider.getTemplateWidth();
        var aspectRatio:number = this.layer.getAspectRatio();
        this.currentHeight = this.templateWidthProvider.getTemplateHeight();
    }
    
    protected onResize(event:any):void{
        this.calculateHeight();
    }
    
    protected createListeners():void{
        
    }

    protected onDestroy() {
        if(this.layerContainer){
            this.layerContainer.remove();
        }
    }
}

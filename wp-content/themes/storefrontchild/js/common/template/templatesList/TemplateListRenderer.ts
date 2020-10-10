///<reference path="../Template.ts"/>
///<reference path="../../lib/events/EventBus.ts"/>
class TemplateListRenderer{
    private j$:any;
    private parent:any;
    private data:Template;

    public static NORMAl:string = "NORMAL";
    public static SELECTED:string = "SELECTED";

    private state:string;

    private index:number;
    private imageElement:any;
    
    constructor(j$:any, parent:any, data:Template, index:number){
        this.j$ = j$;
        this.parent = parent;
        this.data = data;

        this.index = index;
        
        this.createChildren();
        this.createListener();
    }

    private createChildren():void {

        //var imageContainer:any = this.j$("<div class='col-md-2' style='padding: 1.2em!important;'></div>");
        this.imageElement = this.j$("<img src='"+this.data.getPreview()+"' class='index__patternBlockImg js-scroll-link'>");
        
        this.imageElement.appendTo(this.parent);
        //imageContainer.appendTo(this.parent);
    }

    private createListener():void {
        this.imageElement.click(()=>this.onClicked());
    }

    private onClicked() {
        console.log("onClicked() ",this.index);
        EventBus.dispatchEvent(Template.ON_SELECT, this.index)
    }
}

///<reference path="TemplatesListModel.ts"/>
///<reference path="../../lib/events/EventBus.ts"/>
///<reference path="../Template.ts"/>
///<reference path="../../AppEvent.ts"/>
class TemplatesListController{
    
    private model:TemplatesListModel;
    constructor(model:TemplatesListModel){
        this.model = model;
        EventBus.addEventListener(AppEvent.TEMPLATES_LOADED,(collection)=>this.onTemplatesLoaded(collection))
    }

    private onTemplatesLoaded(collection:List<Template>):void {
        this.model.onCollectionLoaded(collection);
    }
}

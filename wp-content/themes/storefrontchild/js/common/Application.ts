///<reference path="template/Template.ts"/>
///<reference path="template/TemplatesParser.ts"/>
///<reference path="AppEvent.ts"/>
///<reference path="GeocodingService.ts"/>
///<reference path="template/TemplateBuilder.ts"/>
///<reference path="template/templatesList/TemplatesListController.ts"/>
///<reference path="template/templatesList/TemplatesListModel.ts"/>
///<reference path="template/templatesList/TemplatesListView.ts"/>
///<reference path="template/editor/city/SearchCityView.ts"/>
///<reference path="template/editor/city/SearchCityModel.ts"/>
///<reference path="template/editor/city/SearchCityController.ts"/>
///<reference path="template/TemplateUtil.ts"/>
///<reference path="template/editor/datetime/DateSelectView.ts"/>
///<reference path="template/editor/datetime/DateSelectModel.ts"/>
///<reference path="template/editor/datetime/DateSelectController.ts"/>
///<reference path="template/editor/city/SearchCity.ts"/>
///<reference path="template/editor/TemplateEditorModel.ts"/>
///<reference path="template/editor/TemplateEditorController.ts"/>
///<reference path="template/editor/TemplateEditor.ts"/>
declare var ajaxurl:string;
declare var html2canvas:any;
class Application{
    protected j$:any;
    protected templatesData:any;
    private templates:List<Template>;
    protected currentTemplate:Template;
    private currentTemplateIndex:number = 0;
    private templateBuilder:TemplateBuilder;
    private printWidth:number;
    private printHeight:number;
    private templateWidth:number;
    private printSizeCoeff:number;
    private printImageElementStyle:string;
    private tempImageContainer:any;
    private dataURL:string;

    private currentProductId:string;
    private templateEditor:TemplateEditor;

    constructor(j$:any){
        this.j$ = j$;
        this.createTemplatesList();
        this.loadTemplates();
    }
    
    public loadTemplates():void{
        this.j$.ajax({
            url: ajaxurl,
            type: 'POST',
            data: 'action='+this.getAjaxActionName()
        })
            .done((data)=>this.onTemplatesLoaded(data));
    }
    
    protected onTemplatesLoaded(data:any):void{
        this.templatesData = data;
        
        var parser = new TemplatesParser(this.j$);
        this.templates = parser.parse(data);

        EventBus.dispatchEvent(AppEvent.TEMPLATES_LOADED, this.templates);

        this.currentTemplate = this.templates.get(this.currentTemplateIndex);
        EventBus.dispatchEvent("TEMPLATE_CHANGED", this.currentTemplate);

        var printWidth:number = this.currentTemplate.getPrintWidth();
        var printHeight:number = this.currentTemplate.getPrintHeight();
        
        this.createTemplateElement(printWidth/printHeight);
        this.currentProductId = this.getCurrentProductId();
        this.createListeners();
        this.onTemplatesLoadedRestActions();
    }
    
    protected getAjaxActionName():string{
        return "";
    }

    protected onTemplatesLoadedRestActions():void {
        this.createSearchCity();
        this.createDatepicker();
        this.createAddToCartButtonListener();

        var view:TemplateEditorView= new TemplateEditorView(this.j$);
        var model:TemplateEditorModel = new TemplateEditorModel(view);
        new TemplateEditorController(model);
        
        EventBus.addEventListener(Template.ON_SELECT, (index)=>this.onTemplateSelected(index));
    }

    private createTemplatesList():void{
        var templatesListView = new TemplatesListView(this.j$);
        var templatesListModel = new TemplatesListModel(templatesListView);
        new TemplatesListController(templatesListModel);
    }

    private createTemplateElement(coeff:number) {
        if(this.templateBuilder){
            this.templateBuilder.destroy();
            this.templateBuilder = null;
        }

        this.templateBuilder = new TemplateBuilder(this.j$, this.currentTemplate, "templateElement", this.getTemplateSelfContainerId(), coeff);
    }

    protected getTemplateSelfContainerId():string{
        return "";
    }

    private createListeners():void {
    }
    
    private getCurrentProductId():string{
        //var productElement = $();
        var productElement = this.j$('[id^=product-]');
        if(productElement!=undefined){
            var productId:string = productElement.data("productid");
            console.log("productId="+productId);
            return productId;
        }
        else{
            console.error("Product id not defined");
        }
    }

    private createSearchCity():void {
        new SearchCity(this.j$, this.currentTemplate);
    }

    private createDatepicker(){
        var dateSelectView:DateSelectView = new DateSelectView(this.j$);
        var dateSelectModel:DateSelectModel = new DateSelectModel(dateSelectView);
        new DateSelectController(dateSelectModel);
    }

    private createAddToCartButtonListener():void{
        this.j$("#addToCartButton").click(()=>this.onAddToCartButtonClicked());
    }

    private onAddToCartButtonClicked():void {
        this.destroyTemplateBuilder();
        this.clearTemplateElement();
        this.scrollTop();
        this.preparePrintImagePreferences();
        this.createPrintImageContainer();
        this.buildPrintSizeTemplate();
        this.renderPrintSizeImage();
    }

    private destroyTemplateBuilder():void {
        if(this.templateBuilder){
            this.templateBuilder.destroy();
            this.templateBuilder = null;
        }
    }

    private clearTemplateElement():void {
        this.j$("#templateElement").empty();
    }

    private scrollTop():void {
        window.scrollTo(0, 0);
    }

    private preparePrintImagePreferences():void {
        this.printWidth = this.currentTemplate.getPrintWidth();
        this.printHeight = this.currentTemplate.getPrintHeight();

        this.templateWidth = this.j$("#templateElement").outerWidth();

        this.printSizeCoeff = this.printWidth/this.templateWidth;

        this.printImageElementStyle = "position:relative; display:block; float:left; width:"+this.printWidth+"px; height:"+this.printHeight+"px;";
    }

    private createPrintImageContainer():void {
        this.tempImageContainer = this.j$("<div id='printImageContainer' style='"+this.printImageElementStyle+"'></div>");
        this.tempImageContainer.appendTo(document.body);

    }

    private buildPrintSizeTemplate():void {
        this.templateBuilder = new TemplateBuilder(this.j$, this.currentTemplate, "printImageContainer", "printCanvas", this.printSizeCoeff);
    }

    private renderPrintSizeImage():void {
        html2canvas(document.querySelector("#printImageContainer")).then((canvas)=>this.onPrintImageCanvas(canvas));
    }

    private onPrintImageCanvas(canvas:any):void{
        this.tempImageContainer.empty();
        this.tempImageContainer.remove();
        this.tempImageContainer = null;

        this.dataURL = canvas.toDataURL();

        this.savePrintSizeImage();
    }

    private savePrintSizeImage():void{
        this.j$.ajax({
            url: ajaxurl,
            type: 'POST',
            data: {action:"create_astro_map_order",imgBase64:this.dataURL, quantity:1, productId:this.currentProductId}
        }).done((data)=>this.onSaveRequestResponse(data));
    }

    private onSaveRequestResponse(data:any):void{
        console.log("Complete data=",data);
        console.log("current template: ",this.currentTemplate);

        alert("add to cart complete");

        this.showSavedTemplate();
    }

    private showSavedTemplate(){
        console.log("showSavedTemplate");
        var savedCurrentTemplateIndex = this.currentTemplateIndex;
        this.currentTemplateIndex = -1;
        console.log("loading template by index "+savedCurrentTemplateIndex);
        EventBus.dispatchEvent(Template.ON_SELECT, savedCurrentTemplateIndex);
    }

    private onTemplateSelected(index:number):void {
        console.log("onTemplateSelected "+index);
        if(index==this.currentTemplateIndex){
            return;
        }
        this.currentTemplateIndex = index;
        this.currentTemplate = this.templates.get(this.currentTemplateIndex);

        EventBus.dispatchEvent("TEMPLATE_CHANGED", this.currentTemplate);

        this.createTemplateElement(1);
    }
}

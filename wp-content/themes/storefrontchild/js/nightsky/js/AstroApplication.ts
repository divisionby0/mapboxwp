///<reference path="../../common/Application.ts"/>
///<reference path="../../common/template/editor/TemplateEditorView.ts"/>
///<reference path="../../common/template/editor/TemplateEditorModel.ts"/>
///<reference path="../../common/template/editor/TemplateEditorController.ts"/>
class AstroApplication extends Application{
    protected getTemplateSelfContainerId():string{
        return "planicanvaZZ";
    }

    protected getAjaxActionName():string{
        return "get_astro_map_templates";
    }

    /*
    protected onTemplatesLoadedRestActions():void {
        super.onTemplatesLoadedRestActions();

        console.log("Astro app onTemplatesLoadedRestActions()");

        this.createTemplateEditor();
    }
    */

    /*
    private createTemplateEditor():void {
        var view:TemplateEditorView= new TemplateEditorView(this.j$);
        var model:TemplateEditorModel = new TemplateEditorModel(view);
        new TemplateEditorController(model);
    }
    */
}

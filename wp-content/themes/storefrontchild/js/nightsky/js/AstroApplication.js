var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
///<reference path="../../common/Application.ts"/>
///<reference path="../../common/template/editor/TemplateEditorView.ts"/>
///<reference path="../../common/template/editor/TemplateEditorModel.ts"/>
///<reference path="../../common/template/editor/TemplateEditorController.ts"/>
var AstroApplication = (function (_super) {
    __extends(AstroApplication, _super);
    function AstroApplication() {
        _super.apply(this, arguments);
    }
    AstroApplication.prototype.getTemplateSelfContainerId = function () {
        return "planicanvaZZ";
    };
    AstroApplication.prototype.getAjaxActionName = function () {
        return "get_astro_map_templates";
    };
    return AstroApplication;
}(Application));
//# sourceMappingURL=AstroApplication.js.map
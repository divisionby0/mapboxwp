///<reference path="../Template.ts"/>
///<reference path="../../lib/events/EventBus.ts"/>
var TemplateListRenderer = (function () {
    function TemplateListRenderer(j$, parent, data, index) {
        this.j$ = j$;
        this.parent = parent;
        this.data = data;
        this.index = index;
        this.createChildren();
        this.createListener();
    }
    TemplateListRenderer.prototype.createChildren = function () {
        //var imageContainer:any = this.j$("<div class='col-md-2' style='padding: 1.2em!important;'></div>");
        this.imageElement = this.j$("<img src='" + this.data.getPreview() + "' class='index__patternBlockImg js-scroll-link'>");
        this.imageElement.appendTo(this.parent);
        //imageContainer.appendTo(this.parent);
    };
    TemplateListRenderer.prototype.createListener = function () {
        var _this = this;
        this.imageElement.click(function () { return _this.onClicked(); });
    };
    TemplateListRenderer.prototype.onClicked = function () {
        console.log("onClicked() ", this.index);
        EventBus.dispatchEvent(Template.ON_SELECT, this.index);
    };
    TemplateListRenderer.NORMAl = "NORMAL";
    TemplateListRenderer.SELECTED = "SELECTED";
    return TemplateListRenderer;
}());
//# sourceMappingURL=TemplateListRenderer.js.map
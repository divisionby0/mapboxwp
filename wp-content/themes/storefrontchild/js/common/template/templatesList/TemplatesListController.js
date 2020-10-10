///<reference path="TemplatesListModel.ts"/>
///<reference path="../../lib/events/EventBus.ts"/>
///<reference path="../Template.ts"/>
///<reference path="../../AppEvent.ts"/>
var TemplatesListController = (function () {
    function TemplatesListController(model) {
        var _this = this;
        this.model = model;
        EventBus.addEventListener(AppEvent.TEMPLATES_LOADED, function (collection) { return _this.onTemplatesLoaded(collection); });
    }
    TemplatesListController.prototype.onTemplatesLoaded = function (collection) {
        this.model.onCollectionLoaded(collection);
    };
    return TemplatesListController;
}());
//# sourceMappingURL=TemplatesListController.js.map
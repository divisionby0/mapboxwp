var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
///<reference path="TextLayerView.ts"/>
///<reference path="../editor/EditorEvent.ts"/>
///<reference path="../../lib/events/EventBus.ts"/>
var DateTimeLayerView = (function (_super) {
    __extends(DateTimeLayerView, _super);
    function DateTimeLayerView() {
        _super.apply(this, arguments);
        this.objectId = "dtL_" + Math.round(Math.random() * 1000);
    }
    DateTimeLayerView.prototype.create = function () {
        _super.prototype.create.call(this);
        this.selfTemplateLayer = this.layer;
    };
    DateTimeLayerView.prototype.onDestroy = function () {
        var _this = this;
        _super.prototype.onDestroy.call(this);
        // TODO тут обратить внимание, если сдеклать так ()=>this.onDateTimeChanged(), то не отписывается от событий при destroy
        EventBus.removeEventListener(EditorEvent.DATE_TIME_CHANGED, function () { return _this.onDateTimeChanged(); });
        EventBus.removeEventListener(EditorEvent.DATE_VISIBILITY_CHANGED, function () { return _this.onDateVisibilityChanged(); });
        EventBus.removeEventListener(EditorEvent.TIME_VISIBILITY_CHANGED, function () { return _this.onTimeVisibilityChanged(); });
    };
    DateTimeLayerView.prototype.createListeners = function () {
        var _this = this;
        EventBus.addEventListener(EditorEvent.DATE_TIME_CHANGED, function () { return _this.onDateTimeChanged(); });
        EventBus.addEventListener(EditorEvent.DATE_VISIBILITY_CHANGED, function () { return _this.onDateVisibilityChanged(); });
        EventBus.addEventListener(EditorEvent.TIME_VISIBILITY_CHANGED, function () { return _this.onTimeVisibilityChanged(); });
    };
    DateTimeLayerView.prototype.onDateTimeChanged = function () {
        this.layerContainer.text(this.selfTemplateLayer.getText());
    };
    DateTimeLayerView.prototype.onDateVisibilityChanged = function () {
        this.layerContainer.text(this.selfTemplateLayer.getText());
    };
    DateTimeLayerView.prototype.onTimeVisibilityChanged = function () {
        this.layerContainer.text(this.selfTemplateLayer.getText());
    };
    return DateTimeLayerView;
}(TextLayerView));
//# sourceMappingURL=DateTimeLayerView.js.map
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
///<reference path="CityLayerView.ts"/>
var CoordinatesLayerView = (function (_super) {
    __extends(CoordinatesLayerView, _super);
    function CoordinatesLayerView() {
        _super.apply(this, arguments);
    }
    CoordinatesLayerView.prototype.onDestroy = function () {
        var _this = this;
        _super.prototype.onDestroy.call(this);
        EventBus.removeEventListener(EditorEvent.TEXT_3_CHANGED, function (text) { return _this.onText3Changed(text); });
        EventBus.removeEventListener(EditorEvent.COORDINATES_CHANGED, function (coord) { return _this.onCoordinatesChanged(coord); });
        EventBus.removeEventListener(EditorEvent.COORDINATES_VISIBILITY_CHANGED, function (data) { return _this.onCoordinatesVisibilityChanged(data); });
    };
    CoordinatesLayerView.prototype.createListeners = function () {
        var _this = this;
        EventBus.addEventListener(EditorEvent.TEXT_3_CHANGED, function (text) { return _this.onText3Changed(text); });
        EventBus.addEventListener(EditorEvent.COORDINATES_CHANGED, function (coord) { return _this.onCoordinatesChanged(coord); });
        EventBus.addEventListener(EditorEvent.COORDINATES_VISIBILITY_CHANGED, function (data) { return _this.onCoordinatesVisibilityChanged(data); });
    };
    CoordinatesLayerView.prototype.onCoordinatesChanged = function (data) {
        var coordinates = data[0] + " " + data[1];
        console.log("onCoordinatesChanged coordinates:", coordinates);
        this.layerContainer.text(coordinates);
    };
    CoordinatesLayerView.prototype.onCoordinatesVisibilityChanged = function (data) {
        var visible = data.visible;
        console.log("onCoordinatesVisibilityChanged");
        if (visible) {
            this.layerContainer.show();
        }
        else {
            this.layerContainer.hide();
        }
    };
    CoordinatesLayerView.prototype.onText3Changed = function (text) {
        this.layerContainer.text(text.toUpperCase());
    };
    return CoordinatesLayerView;
}(CityLayerView));
//# sourceMappingURL=CoordinatesLayerView.js.map
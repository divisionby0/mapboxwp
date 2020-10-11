var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
///<reference path="TextLayerView.ts"/>
var CityLayerView = (function (_super) {
    __extends(CityLayerView, _super);
    function CityLayerView() {
        _super.apply(this, arguments);
    }
    CityLayerView.prototype.onDestroy = function () {
        _super.prototype.onDestroy.call(this);
        /*
        EventBus.removeEventListener(EditorEvent.CITY_CHANGED, (data)=>this.onCityChanged(data));
        EventBus.removeEventListener(EditorEvent.TEXT_1_CHANGED, (data)=>this.onCityTextChanged(data));
        EventBus.removeEventListener(EditorEvent.CITY_VISIBILITY_CHANGED, (data)=>this.onCityVisibilityChanged(data));
        */
    };
    CityLayerView.prototype.createListeners = function () {
        var _this = this;
        EventBus.addEventListener(EditorEvent.CITY_CHANGED, function (data) { return _this.onCityChanged(data); });
        EventBus.addEventListener(EditorEvent.TEXT_1_CHANGED, function (data) { return _this.onCityTextChanged(data); });
        EventBus.addEventListener(EditorEvent.CITY_VISIBILITY_CHANGED, function (data) { return _this.onCityVisibilityChanged(data); });
    };
    CityLayerView.prototype.onCityTextChanged = function (text) {
        try {
            this.layerContainer.text(text.toUpperCase());
        }
        catch (error) {
        }
    };
    CityLayerView.prototype.onCityChanged = function (data) {
        var city = data.city;
        this.layerContainer.text(city.toUpperCase());
    };
    CityLayerView.prototype.onCityVisibilityChanged = function (data) {
        var visible = data.visible;
        if (visible) {
            this.layerContainer.show();
        }
        else {
            this.layerContainer.hide();
        }
    };
    return CityLayerView;
}(TextLayerView));
//# sourceMappingURL=CityLayerView.js.map
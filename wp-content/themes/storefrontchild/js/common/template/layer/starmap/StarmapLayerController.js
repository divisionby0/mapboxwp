///<reference path="StarmapLayerModel.ts"/>
var StarmapLayerController = (function () {
    function StarmapLayerController(model) {
        var _this = this;
        this.model = model;
        console.log("new StarmapLayerController id=", this.model.getId());
        EventBus.addEventListener(EditorEvent.DATE_TIME_CHANGED, function (date) { return _this.onDateTimeChanged(date); });
        EventBus.addEventListener(EditorEvent.CITY_CHANGED, function (data) { return _this.onCityChanged(data); });
        EventBus.addEventListener(EditorEvent.STARS_CHANGED, function (value) { return _this.onStarsChanged(value); });
        EventBus.addEventListener(EditorEvent.CONSTELLATIONS_CHANGED, function (value) { return _this.onConstellationsChanged(value); });
        EventBus.addEventListener(EditorEvent.CIRCLE_BORDER_CHANGED, function (value) { return _this.onCircleBorderChanged(value); });
    }
    StarmapLayerController.prototype.onStarsChanged = function (value) {
        this.model.setHasColoredStars(value);
    };
    StarmapLayerController.prototype.onConstellationsChanged = function (value) {
        this.model.setHasConstellations(value);
    };
    StarmapLayerController.prototype.onCircleBorderChanged = function (value) {
        this.model.hasCircleBorder(value);
    };
    StarmapLayerController.prototype.onDateTimeChanged = function (date) {
        this.model.onDateTimeChanged(date);
    };
    StarmapLayerController.prototype.onCityChanged = function (data) {
        this.model.onCityChanged(data);
    };
    return StarmapLayerController;
}());
//# sourceMappingURL=StarmapLayerController.js.map
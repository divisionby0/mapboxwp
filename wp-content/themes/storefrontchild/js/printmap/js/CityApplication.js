var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
///<reference path="../../common/Application.ts"/>
var CityApplication = (function (_super) {
    __extends(CityApplication, _super);
    function CityApplication() {
        _super.apply(this, arguments);
    }
    CityApplication.prototype.getTemplateSelfContainerId = function () {
        return "map12";
    };
    CityApplication.prototype.getAjaxActionName = function () {
        return "get_city_map_templates";
    };
    return CityApplication;
}(Application));
//# sourceMappingURL=CityApplication.js.map
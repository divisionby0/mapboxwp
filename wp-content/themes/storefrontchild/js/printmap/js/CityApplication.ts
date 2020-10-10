///<reference path="../../common/Application.ts"/>
class CityApplication extends Application{
    protected getTemplateSelfContainerId():string{
        return "map12";
    }

    protected getAjaxActionName():string{
        return "get_city_map_templates";
    }
}

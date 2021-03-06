///<reference path="Template.ts"/>
///<reference path="layer/DivTemplateLayer.ts"/>
///<reference path="layer/TextTemplateLayer.ts"/>
///<reference path="layer/ImageTemplateLayer.ts"/>
///<reference path="layer/LayerType.ts"/>
///<reference path="layer/BorderCircleTemplateLayer.ts"/>
///<reference path="layer/starmap/StarmapLayerModel.ts"/>
///<reference path="layer/CityTemplateLayer.ts"/>
///<reference path="layer/CoordinatesTemplateLayer.ts"/>
///<reference path="layer/DateTimeTemplateLayer.ts"/>
///<reference path="layer/starmap/StarmapLayerController.ts"/>
///<reference path="layer/geographicMap/MapLayerModel.ts"/>
///<reference path="layer/geographicMap/MapLayerController.ts"/>
///<reference path="layer/CountryTemplateLayer.ts"/>
///<reference path="layer/LabelsContainerTemplateLayer.ts"/>
///<reference path="layer/MapCityTemplateLayer.ts"/>
///<reference path="layer/MapCountryTemplateLayer.ts"/>
///<reference path="layer/MapCoordinatesTemplateLayer.ts"/>
var TemplatesParser = (function () {
    function TemplatesParser(j$) {
        this.starmaps = new Array(); // prevent GC ?
        this.j$ = j$;
        this._that = this;
    }
    TemplatesParser.prototype.parse = function (data) {
        var parser = new DOMParser();
        var xmlDoc = parser.parseFromString(data, "text/xml");
        var collection = new List("templates");
        var templates = xmlDoc.getElementsByTagName("template");
        var total = templates.length;
        var i;
        var j;
        for (i = total - 1; i > -1; i--) {
            var templateData = templates[i];
            var name = templateData.getAttribute("name");
            var size = templateData.getAttribute("printSize");
            var preview = templateData.getAttribute("preview");
            var aspectRatio = parseFloat(templateData.getAttribute("aspectRatio"));
            var wh = size.split("x");
            var width = parseInt(wh[0]);
            var height = parseInt(wh[1]);
            var layers = new List("layers");
            var layersData = templateData.getElementsByTagName("layer");
            var totalLayers = layersData.length;
            var defaultCoordinates;
            var defaultCity;
            for (j = 0; j < totalLayers; j++) {
                var layerData = layersData[j];
                var id = layerData.getAttribute("id");
                var type = layerData.getAttribute("type");
                var left = layerData.getAttribute("left");
                var top = layerData.getAttribute("top");
                var right = layerData.getAttribute("right");
                var bottom = layerData.getAttribute("bottom");
                var changeable = layerData.getAttribute("changeable");
                var border = layerData.getAttribute("border");
                if (changeable == null) {
                    changeable = false;
                }
                else {
                    if (changeable == "true") {
                        changeable = true;
                    }
                    else if (changeable == "false") {
                        changeable = false;
                    }
                }
                var templateLayer;
                var text;
                switch (type) {
                    case LayerType.DIV_LAYER_TYPE:
                        var backgroundColor = layerData.getAttribute("backgroundColor");
                        var backgroundAlpha = layerData.getAttribute("backgroundAlpha");
                        if (left == null && right == null && top == null && bottom == null) {
                            left = "0";
                            right = "0";
                            top = "0";
                            bottom = "0";
                        }
                        templateLayer = new DivTemplateLayer(id, aspectRatio, type, left, top, right, bottom, changeable, backgroundColor, backgroundAlpha, border);
                        layers.add(templateLayer);
                        break;
                    case LayerType.TEXT_LAYER_TYPE:
                        text = layerData.childNodes[0].nodeValue.toUpperCase();
                        var textColor = layerData.getAttribute("color");
                        var fontSize = layerData.getAttribute("size");
                        var fontWeight = layerData.getAttribute("fontWeight");
                        var textAlign = layerData.getAttribute("text-align");
                        templateLayer = new TextTemplateLayer(id, aspectRatio, type, text, textColor, fontSize, left, top, right, bottom, changeable, textAlign, fontWeight);
                        layers.add(templateLayer);
                        break;
                    case LayerType.CITY_LAYER_TYPE:
                        try {
                            text = layerData.childNodes[0].nodeValue.toUpperCase();
                            defaultCity = text;
                        }
                        catch (error) {
                            text = "";
                        }
                        var textColor = layerData.getAttribute("color");
                        var fontSize = layerData.getAttribute("size");
                        var fontWeight = layerData.getAttribute("fontWeight");
                        var textAlign = layerData.getAttribute("text-align");
                        templateLayer = new CityTemplateLayer(id, aspectRatio, type, text, textColor, fontSize, left, top, right, bottom, changeable, textAlign, fontWeight);
                        layers.add(templateLayer);
                        break;
                    case LayerType.MAP_CITY_LAYER_TYPE:
                        try {
                            text = layerData.childNodes[0].nodeValue.toUpperCase();
                        }
                        catch (error) {
                            text = "";
                        }
                        var textColor = layerData.getAttribute("color");
                        var fontSize = layerData.getAttribute("size");
                        var fontWeight = layerData.getAttribute("fontWeight");
                        var textAlign = layerData.getAttribute("text-align");
                        templateLayer = new MapCityTemplateLayer(id, aspectRatio, type, text, textColor, fontSize, left, top, right, bottom, changeable, textAlign, fontWeight);
                        layers.add(templateLayer);
                        break;
                    case LayerType.COUNTRY_LAYER_TYPE:
                        try {
                            text = layerData.childNodes[0].nodeValue.toUpperCase();
                        }
                        catch (error) {
                            text = "";
                        }
                        var textColor = layerData.getAttribute("color");
                        var fontSize = layerData.getAttribute("size");
                        var fontWeight = layerData.getAttribute("fontWeight");
                        var textAlign = layerData.getAttribute("text-align");
                        templateLayer = new CountryTemplateLayer(id, aspectRatio, type, text, textColor, fontSize, left, top, right, bottom, changeable, textAlign, fontWeight);
                        layers.add(templateLayer);
                        break;
                    case LayerType.MAP_COUNTRY_LAYER_TYPE:
                        try {
                            text = layerData.childNodes[0].nodeValue.toUpperCase();
                        }
                        catch (error) {
                            text = "";
                        }
                        var textColor = layerData.getAttribute("color");
                        var fontSize = layerData.getAttribute("size");
                        var fontWeight = layerData.getAttribute("fontWeight");
                        var textAlign = layerData.getAttribute("text-align");
                        templateLayer = new MapCountryTemplateLayer(id, aspectRatio, type, text, textColor, fontSize, left, top, right, bottom, changeable, textAlign, fontWeight);
                        layers.add(templateLayer);
                        break;
                    case LayerType.COORDINATES_LAYER_TYPE:
                        try {
                            text = layerData.childNodes[0].nodeValue;
                            if (text != undefined && text != "") {
                                defaultCoordinates = text.split(",");
                            }
                        }
                        catch (error) {
                            text = "";
                        }
                        var textColor = layerData.getAttribute("color");
                        var fontSize = layerData.getAttribute("size");
                        var fontWeight = layerData.getAttribute("fontWeight");
                        var textAlign = layerData.getAttribute("text-align");
                        templateLayer = new CoordinatesTemplateLayer(id, aspectRatio, type, text, textColor, fontSize, left, top, right, bottom, changeable, textAlign, fontWeight);
                        layers.add(templateLayer);
                        break;
                    case LayerType.MAP_COORDINATES_LAYER_TYPE:
                        try {
                            text = layerData.childNodes[0].nodeValue;
                        }
                        catch (error) {
                            text = "";
                        }
                        var textColor = layerData.getAttribute("color");
                        var fontSize = layerData.getAttribute("size");
                        var fontWeight = layerData.getAttribute("fontWeight");
                        var textAlign = layerData.getAttribute("text-align");
                        templateLayer = new MapCoordinatesTemplateLayer(id, aspectRatio, type, text, textColor, fontSize, left, top, right, bottom, changeable, textAlign, fontWeight);
                        layers.add(templateLayer);
                        break;
                    case LayerType.DATE_TIME_LAYER_TYPE:
                        try {
                            text = layerData.childNodes[0].nodeValue;
                        }
                        catch (error) {
                            text = "";
                        }
                        var textColor = layerData.getAttribute("color");
                        var fontSize = layerData.getAttribute("size");
                        var fontWeight = layerData.getAttribute("fontWeight");
                        var textAlign = layerData.getAttribute("text-align");
                        templateLayer = new DateTimeTemplateLayer(id, aspectRatio, type, text, textColor, fontSize, left, top, right, bottom, changeable, textAlign, fontWeight);
                        layers.add(templateLayer);
                        break;
                    case LayerType.IMAGE_LAYER_TYPE:
                        var url = layerData.getAttribute("url");
                        templateLayer = new ImageTemplateLayer(id, aspectRatio, type, url, left, top, right, bottom, changeable);
                        layers.add(templateLayer);
                        break;
                    case LayerType.BORDER_CIRCLE_LAYER_TYPE:
                        var radius = layerData.getAttribute("radius");
                        var radiusColor = layerData.getAttribute("color");
                        var radiusWidth = layerData.getAttribute("width");
                        var border = layerData.getAttribute("border");
                        templateLayer = new BorderCircleTemplateLayer(id, aspectRatio, type, left, top, right, bottom, changeable, radius, radiusWidth, radiusColor, border);
                        layers.add(templateLayer);
                        break;
                    case LayerType.STARMAP_LAYER_TYPE:
                        var starsColor = layerData.getAttribute("starsColor");
                        var backgroundColor = layerData.getAttribute("backgroundColor");
                        var constellationColor = layerData.getAttribute("constellationColor");
                        var borderColor = layerData.getAttribute("borderColor");
                        var borderWeight = parseFloat(layerData.getAttribute("borderWeight"));
                        templateLayer = new StarmapLayerModel(id, aspectRatio, type, left, top, right, bottom, changeable, starsColor, backgroundColor, constellationColor, borderColor, borderWeight);
                        var starmapLayerController = new StarmapLayerController(templateLayer);
                        this.starmaps.push(starmapLayerController);
                        console.log("new starmap layer controller added ", starmapLayerController);
                        layers.add(templateLayer);
                        break;
                    case LayerType.MAP_LAYER_TYPE:
                        var normalStyle = layerData.getAttribute("normalStyle");
                        var noStreetLabelsStyle = layerData.getAttribute("noStreeLabelsStyle");
                        var zoom = layerData.getAttribute("zoom");
                        var border = layerData.getAttribute("border");
                        var lat = layerData.getAttribute("lat");
                        var lng = layerData.getAttribute("lng");
                        var position = [lng, lat];
                        if (left == null && right == null && top == null && bottom == null) {
                            left = "0";
                            right = "0";
                            top = "0";
                            bottom = "0";
                        }
                        templateLayer = new MapLayerModel(id, aspectRatio, type, left, top, right, bottom, border, changeable, zoom, [noStreetLabelsStyle, normalStyle], position);
                        new MapLayerController(templateLayer);
                        layers.add(templateLayer);
                        break;
                    case LayerType.LABELS_CONTAINER:
                        var backgroundColor = layerData.getAttribute("backgroundColor");
                        var backgroundAlpha = layerData.getAttribute("backgroundAlpha");
                        if (left == null && right == null && top == null && bottom == null) {
                            left = "0";
                            right = "0";
                            top = "0";
                            bottom = "0";
                        }
                        templateLayer = new LabelsContainerTemplateLayer(id, aspectRatio, type, left, top, right, bottom, changeable, backgroundColor, backgroundAlpha, border);
                        layers.add(templateLayer);
                        break;
                }
            }
            var template = new Template(name, preview, width, height, layers, aspectRatio);
            if (defaultCoordinates) {
                template.setLat(defaultCoordinates[0]);
                template.setLng(defaultCoordinates[1]);
            }
            if (defaultCity) {
                template.setCity(defaultCity);
            }
            collection.add(template);
        }
        return collection;
    };
    TemplatesParser.prototype.parseStyles = function (stylesString) {
        console.log("stylesString=", stylesString);
        var stylesObj = JSON.parse(stylesString);
        //return [stylesObj.normal, stylesObj.noStreetLabels];
        return ["", ""];
    };
    return TemplatesParser;
}());
//# sourceMappingURL=TemplatesParser.js.map
///<reference path="../Template.ts"/>
///<reference path="../layer/LayerType.ts"/>
///<reference path="../layer/TextTemplateLayer.ts"/>
///<reference path="DivLayerView.ts"/>
///<reference path="TextLayerView.ts"/>
///<reference path="BorderCircleLayerView.ts"/>
///<reference path="../layer/starmap/StarmapLayerView.ts"/>
///<reference path="ImageLayerView.ts"/>
///<reference path="ITemplateSizeProvider.ts"/>
///<reference path="CityLayerView.ts"/>
///<reference path="CoordinatesLayerView.ts"/>
///<reference path="DateTimeLayerView.ts"/>
///<reference path="../layer/geographicMap/MapLayerView.ts"/>
///<reference path="../layer/geographicMap/MapLayerModel.ts"/>
///<reference path="CountryLayerView.ts"/>
///<reference path="BlobImageLayerView.ts"/>
///<reference path="LabelsContainerLayerView.ts"/>
///<reference path="MapCityLayerView.ts"/>
///<reference path="MapCountryLayerView.ts"/>
///<reference path="MapCoordinatesLayerView.ts"/>
var TemplateElementView = (function () {
    function TemplateElementView(j$, parentContainerId, selfContainerId, coeff) {
        this.views = new List("layerViews");
        this.j$ = j$;
        this.parentContainerId = parentContainerId;
        this.selfContainerId = selfContainerId;
        this.coeff = coeff;
    }
    TemplateElementView.prototype.destroy = function () {
        console.log("TemplateElementView destroy");
        var viewsIterator = this.views.getIterator();
        while (viewsIterator.hasNext()) {
            var currentLayerView = viewsIterator.next();
            if (currentLayerView) {
                currentLayerView.destroy();
                currentLayerView = null;
            }
        }
        this.views = new List("layerViews");
    };
    TemplateElementView.prototype.getTemplateWidth = function () {
        return this.j$("#" + this.parentContainerId).outerWidth();
    };
    TemplateElementView.prototype.getTemplateHeight = function () {
        var aspectRatio = parseFloat(this.data.getAspectRatio());
        return this.getTemplateWidth() * aspectRatio;
    };
    TemplateElementView.prototype.setData = function (data) {
        this.data = data;
        var layersIterator = data.getLayersIterator();
        this.views = new List("layerViews");
        //console.log("total layers: "+data.totalLayers());
        var layerView;
        while (layersIterator.hasNext()) {
            var layer = layersIterator.next();
            var layerType = layer.getType();
            // TODO в шаблоне сделать слой-контейнер для текстов, добавить его, во вьюхах добавлять их в этот контейнер
            switch (layerType) {
                case LayerType.DIV_LAYER_TYPE:
                    layerView = new DivLayerView(this.j$, layer, this.parentContainerId, this.selfContainerId, this, this.coeff);
                    break;
                case LayerType.LABELS_CONTAINER:
                    layerView = new LabelsContainerLayerView(this.j$, layer, this.parentContainerId, this.selfContainerId, this, this.coeff);
                    break;
                case LayerType.TEXT_LAYER_TYPE:
                    layerView = new TextLayerView(this.j$, layer, this.parentContainerId, this.selfContainerId, this, this.coeff);
                    break;
                case LayerType.CITY_LAYER_TYPE:
                    layerView = new CityLayerView(this.j$, layer, this.parentContainerId, this.selfContainerId, this, this.coeff);
                    break;
                case LayerType.COUNTRY_LAYER_TYPE:
                    layerView = new CountryLayerView(this.j$, layer, this.parentContainerId, this.selfContainerId, this, this.coeff);
                    break;
                case LayerType.COORDINATES_LAYER_TYPE:
                    layerView = new CoordinatesLayerView(this.j$, layer, this.parentContainerId, this.selfContainerId, this, this.coeff);
                    break;
                case LayerType.DATE_TIME_LAYER_TYPE:
                    layerView = new DateTimeLayerView(this.j$, layer, this.parentContainerId, this.selfContainerId, this, this.coeff);
                    break;
                case LayerType.IMAGE_LAYER_TYPE:
                    layerView = new ImageLayerView(this.j$, layer, this.parentContainerId, this.selfContainerId, this, this.coeff);
                    break;
                case LayerType.BLOB_IMAGE_LAYER_TYPE:
                    layerView = new BlobImageLayerView(this.j$, layer, this.parentContainerId, this.selfContainerId, this, this.coeff);
                    break;
                case LayerType.BORDER_CIRCLE_LAYER_TYPE:
                    layerView = new BorderCircleLayerView(this.j$, layer, this.parentContainerId, this.selfContainerId, this, this.coeff);
                    break;
                case LayerType.STARMAP_LAYER_TYPE:
                    layerView = new StarmapLayerView(this.j$, layer, this.parentContainerId, this.selfContainerId, this, this.coeff);
                    layer.setView(layerView);
                    break;
                case LayerType.MAP_LAYER_TYPE:
                    layerView = new MapLayerView(this.j$, layer, this.parentContainerId, this.selfContainerId, this, this.coeff);
                    layer.setView(layerView);
                    break;
                case LayerType.MAP_CITY_LAYER_TYPE:
                    layerView = new MapCityLayerView(this.j$, layer, "labelsContainer", this.selfContainerId, this, this.coeff);
                    layer.setView(layerView);
                    break;
                case LayerType.MAP_COUNTRY_LAYER_TYPE:
                    layerView = new MapCountryLayerView(this.j$, layer, "labelsContainer", this.selfContainerId, this, this.coeff);
                    layer.setView(layerView);
                    break;
                case LayerType.MAP_COORDINATES_LAYER_TYPE:
                    layerView = new MapCoordinatesLayerView(this.j$, layer, "labelsContainer", this.selfContainerId, this, this.coeff);
                    layer.setView(layerView);
                    break;
            }
            this.views.add(layerView);
        }
        this.resize();
    };
    TemplateElementView.prototype.resize = function () {
        this.j$("#" + this.parentContainerId).height(this.getTemplateHeight());
    };
    return TemplateElementView;
}());
//# sourceMappingURL=TemplateElementView.js.map
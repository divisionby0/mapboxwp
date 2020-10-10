///<reference path="EditorEvent.ts"/>
///<reference path="../../lib/events/EventBus.ts"/>
///<reference path="../Template.ts"/>
///<reference path="../layer/TextTemplateLayer.ts"/>
///<reference path="../element/LayerView.ts"/>
///<reference path="../LayerId.ts"/>
var TemplateEditorView = (function () {
    function TemplateEditorView(j$) {
        this.sendAutomaticSettingsChangedInterval = 2000;
        this.j$ = j$;
        this.addControls();
        this.createListeners();
    }
    TemplateEditorView.prototype.setData = function (template) {
        var layersIterator = template.getLayersIterator();
        while (layersIterator.hasNext()) {
            var layer = layersIterator.next();
            if (layer instanceof TextTemplateLayer) {
                var textLayer = layer;
                var layerId = textLayer.getId();
                var layerText = textLayer.getText();
                if (layerId == LayerId.TEXT_LAYER_1_ID) {
                    this.text_1_input.val(layerText);
                }
                if (layerId == LayerId.TEXT_LAYER_2_ID) {
                    this.text_2_input.val(layerText);
                }
            }
        }
    };
    TemplateEditorView.prototype.reset = function (settings) {
        var _this = this;
        console.log("reset");
        if (this.constellationLinesButton) {
            settings.constellations ? this.constellationLinesButton.attr('checked', true) : this.constellationLinesButton.attr('checked', false);
        }
        if (this.starsMultiColorsButton) {
            this.starsMultiColorsButton.attr('checked', false);
        }
        if (this.dateButton) {
            settings.date ? this.dateButton.attr('checked', true) : this.dateButton.attr('checked', false);
        }
        if (this.timeButton) {
            settings.time ? this.timeButton.attr('checked', true) : this.timeButton.attr('checked', true);
        }
        if (this.cityButton) {
            settings.place ? this.cityButton.attr('checked', true) : this.cityButton.attr('checked', false);
        }
        if (this.borderButton) {
            settings.border ? this.borderButton.attr('checked', true) : this.borderButton.attr('checked', false);
        }
        if (this.circleBorderButton) {
            settings.circle ? this.circleBorderButton.attr('checked', true) : this.circleBorderButton.attr('checked', false);
        }
        if (this.coordinatesButton) {
            settings.coordinates ? this.coordinatesButton.attr('checked', true) : this.coordinatesButton.attr('checked', false);
        }
        setTimeout(function () { return _this.sendAutomaticSettingsChanged(); }, this.sendAutomaticSettingsChangedInterval);
    };
    TemplateEditorView.prototype.createListeners = function () {
        var _this = this;
        this.constellationLinesButton.change(function () { return _this.onConstellationsChanged(); });
        this.starsMultiColorsButton.change(function () { return _this.onStarsChanged(); });
        this.circleBorderButton.change(function () { return _this.onCircleBorderChanged(); });
        this.borderButton.change(function () { return _this.onBorderChanged(); });
        this.cityButton.change(function () { return _this.onCityVisibilityChanged(); });
        this.coordinatesButton.change(function () { return _this.onCoordinatesVisibilityChanged(); });
        this.dateButton.change(function () { return _this.onDateVisibilityChanged(); });
        this.timeButton.change(function () { return _this.onTimeVisibilityChanged(); });
        this.text_1_input.on("input", function () { return _this.onText1Changed(); });
        this.text_2_input.on("input", function () { return _this.onText2Changed(); });
        this.text_3_input.on("input", function () { return _this.onText3Changed(); });
    };
    TemplateEditorView.prototype.addControls = function () {
        console.log("addControls()");
        this.constellationLinesButton = this.j$('#constellationLinesButton');
        this.starsMultiColorsButton = this.j$('#starsMultiColorsButton');
        this.dateButton = this.j$('#dateButton');
        this.timeButton = this.j$('#timeButton');
        this.cityButton = this.j$('#placeButton');
        this.borderButton = this.j$('#borderButton');
        this.circleBorderButton = this.j$('#circleBorderButton');
        this.coordinatesButton = this.j$('#coordinatesButton');
        this.text_1_input = this.j$("#text_1_input");
        this.text_2_input = this.j$("#text_2_input");
        this.text_3_input = this.j$("#text_3_input");
    };
    TemplateEditorView.prototype.onConstellationsChanged = function () {
        EventBus.dispatchEvent(EditorEvent.CONSTELLATIONS_CHANGED, this.constellationLinesButton.is(':checked'));
    };
    TemplateEditorView.prototype.onStarsChanged = function () {
        EventBus.dispatchEvent(EditorEvent.STARS_CHANGED, this.starsMultiColorsButton.is(':checked'));
    };
    TemplateEditorView.prototype.onCircleBorderChanged = function () {
        EventBus.dispatchEvent(EditorEvent.CIRCLE_BORDER_CHANGED, this.circleBorderButton.is(':checked'));
    };
    TemplateEditorView.prototype.onBorderChanged = function () {
        EventBus.dispatchEvent(EditorEvent.BORDER_CHANGED, this.borderButton.is(':checked'));
    };
    TemplateEditorView.prototype.onText1Changed = function () {
        EventBus.dispatchEvent(EditorEvent.TEXT_1_CHANGED, { text: this.text_1_input.val(), elementId: LayerId.TEXT_LAYER_1_ID });
    };
    TemplateEditorView.prototype.onText2Changed = function () {
        EventBus.dispatchEvent(EditorEvent.TEXT_2_CHANGED, { text: this.text_2_input.val(), elementId: LayerId.TEXT_LAYER_2_ID });
    };
    TemplateEditorView.prototype.onText3Changed = function () {
        //EventBus.dispatchEvent(EditorEvent.TEXT_2_CHANGED, {text:this.text_2_input.val(), elementId:LayerId.TEXT_LAYER_2_ID});
    };
    TemplateEditorView.prototype.onCityVisibilityChanged = function () {
        var data = { visible: this.cityButton.is(':checked') };
        EventBus.dispatchEvent(EditorEvent.CITY_VISIBILITY_CHANGED, data);
    };
    TemplateEditorView.prototype.onCoordinatesVisibilityChanged = function () {
        var data = { visible: this.coordinatesButton.is(':checked') };
        EventBus.dispatchEvent(EditorEvent.COORDINATES_VISIBILITY_CHANGED, data);
    };
    TemplateEditorView.prototype.onDateVisibilityChanged = function () {
        var data = { visible: this.dateButton.is(':checked') };
        EventBus.dispatchEvent(EditorEvent.DATE_VISIBILITY_CHANGED, data);
    };
    TemplateEditorView.prototype.onTimeVisibilityChanged = function () {
        var data = { visible: this.timeButton.is(':checked') };
        EventBus.dispatchEvent(EditorEvent.TIME_VISIBILITY_CHANGED, data);
    };
    TemplateEditorView.prototype.sendAutomaticSettingsChanged = function () {
        this.onConstellationsChanged();
        this.onStarsChanged();
        this.onCircleBorderChanged();
        this.onBorderChanged();
        this.onText1Changed();
        this.onText2Changed();
        this.onText3Changed();
        this.onCityVisibilityChanged();
        this.onCoordinatesVisibilityChanged();
        this.onDateVisibilityChanged();
        this.onTimeVisibilityChanged();
    };
    return TemplateEditorView;
}());
//# sourceMappingURL=TemplateEditorView.js.map
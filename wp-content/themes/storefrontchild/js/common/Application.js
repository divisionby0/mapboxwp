///<reference path="template/Template.ts"/>
///<reference path="template/TemplatesParser.ts"/>
///<reference path="AppEvent.ts"/>
///<reference path="GeocodingService.ts"/>
///<reference path="template/TemplateBuilder.ts"/>
///<reference path="template/templatesList/TemplatesListController.ts"/>
///<reference path="template/templatesList/TemplatesListModel.ts"/>
///<reference path="template/templatesList/TemplatesListView.ts"/>
///<reference path="template/editor/city/SearchCityView.ts"/>
///<reference path="template/editor/city/SearchCityModel.ts"/>
///<reference path="template/editor/city/SearchCityController.ts"/>
///<reference path="template/TemplateUtil.ts"/>
///<reference path="template/editor/datetime/DateSelectView.ts"/>
///<reference path="template/editor/datetime/DateSelectModel.ts"/>
///<reference path="template/editor/datetime/DateSelectController.ts"/>
///<reference path="template/editor/city/SearchCity.ts"/>
///<reference path="template/editor/TemplateEditorModel.ts"/>
///<reference path="template/editor/TemplateEditorController.ts"/>
///<reference path="template/editor/TemplateEditor.ts"/>
var Application = (function () {
    function Application(j$) {
        this.currentTemplateIndex = 0;
        this.j$ = j$;
        this.createTemplatesList();
        this.loadTemplates();
    }
    Application.prototype.loadTemplates = function () {
        var _this = this;
        this.j$.ajax({
            url: ajaxurl,
            type: 'POST',
            data: 'action=' + this.getAjaxActionName()
        })
            .done(function (data) { return _this.onTemplatesLoaded(data); });
    };
    Application.prototype.onTemplatesLoaded = function (data) {
        this.templatesData = data;
        var parser = new TemplatesParser(this.j$);
        this.templates = parser.parse(data);
        EventBus.dispatchEvent(AppEvent.TEMPLATES_LOADED, this.templates);
        this.currentTemplate = this.templates.get(this.currentTemplateIndex);
        EventBus.dispatchEvent("TEMPLATE_CHANGED", this.currentTemplate);
        var printWidth = this.currentTemplate.getPrintWidth();
        var printHeight = this.currentTemplate.getPrintHeight();
        this.createTemplateElement(printWidth / printHeight);
        this.currentProductId = this.getCurrentProductId();
        this.createListeners();
        this.onTemplatesLoadedRestActions();
    };
    Application.prototype.getAjaxActionName = function () {
        return "";
    };
    Application.prototype.onTemplatesLoadedRestActions = function () {
        var _this = this;
        this.createSearchCity();
        this.createDatepicker();
        this.createAddToCartButtonListener();
        var view = new TemplateEditorView(this.j$);
        var model = new TemplateEditorModel(view);
        new TemplateEditorController(model);
        EventBus.addEventListener(Template.ON_SELECT, function (index) { return _this.onTemplateSelected(index); });
    };
    Application.prototype.createTemplatesList = function () {
        var templatesListView = new TemplatesListView(this.j$);
        var templatesListModel = new TemplatesListModel(templatesListView);
        new TemplatesListController(templatesListModel);
    };
    Application.prototype.createTemplateElement = function (coeff) {
        if (this.templateBuilder) {
            this.templateBuilder.destroy();
            this.templateBuilder = null;
        }
        this.templateBuilder = new TemplateBuilder(this.j$, this.currentTemplate, "templateElement", this.getTemplateSelfContainerId(), coeff);
    };
    Application.prototype.getTemplateSelfContainerId = function () {
        return "";
    };
    Application.prototype.createListeners = function () {
    };
    Application.prototype.getCurrentProductId = function () {
        //var productElement = $();
        var productElement = this.j$('[id^=product-]');
        if (productElement != undefined) {
            var productId = productElement.data("productid");
            console.log("productId=" + productId);
            return productId;
        }
        else {
            console.error("Product id not defined");
        }
    };
    Application.prototype.createSearchCity = function () {
        new SearchCity(this.j$, this.currentTemplate);
    };
    Application.prototype.createDatepicker = function () {
        var dateSelectView = new DateSelectView(this.j$);
        var dateSelectModel = new DateSelectModel(dateSelectView);
        new DateSelectController(dateSelectModel);
    };
    Application.prototype.createAddToCartButtonListener = function () {
        var _this = this;
        this.j$("#addToCartButton").click(function () { return _this.onAddToCartButtonClicked(); });
    };
    Application.prototype.onAddToCartButtonClicked = function () {
        this.destroyTemplateBuilder();
        this.clearTemplateElement();
        this.scrollTop();
        this.preparePrintImagePreferences();
        this.createPrintImageContainer();
        this.buildPrintSizeTemplate();
        this.renderPrintSizeImage();
    };
    Application.prototype.destroyTemplateBuilder = function () {
        if (this.templateBuilder) {
            this.templateBuilder.destroy();
            this.templateBuilder = null;
        }
    };
    Application.prototype.clearTemplateElement = function () {
        this.j$("#templateElement").empty();
    };
    Application.prototype.scrollTop = function () {
        window.scrollTo(0, 0);
    };
    Application.prototype.preparePrintImagePreferences = function () {
        this.printWidth = this.currentTemplate.getPrintWidth();
        this.printHeight = this.currentTemplate.getPrintHeight();
        this.templateWidth = this.j$("#templateElement").outerWidth();
        this.printSizeCoeff = this.printWidth / this.templateWidth;
        this.printImageElementStyle = "position:relative; display:block; float:left; width:" + this.printWidth + "px; height:" + this.printHeight + "px;";
    };
    Application.prototype.createPrintImageContainer = function () {
        this.tempImageContainer = this.j$("<div id='printImageContainer' style='" + this.printImageElementStyle + "'></div>");
        this.tempImageContainer.appendTo(document.body);
    };
    Application.prototype.buildPrintSizeTemplate = function () {
        this.templateBuilder = new TemplateBuilder(this.j$, this.currentTemplate, "printImageContainer", "printCanvas", this.printSizeCoeff);
    };
    Application.prototype.renderPrintSizeImage = function () {
        var _this = this;
        html2canvas(document.querySelector("#printImageContainer")).then(function (canvas) { return _this.onPrintImageCanvas(canvas); });
    };
    Application.prototype.onPrintImageCanvas = function (canvas) {
        this.tempImageContainer.empty();
        this.tempImageContainer.remove();
        this.tempImageContainer = null;
        this.dataURL = canvas.toDataURL();
        this.savePrintSizeImage();
    };
    Application.prototype.savePrintSizeImage = function () {
        var _this = this;
        this.j$.ajax({
            url: ajaxurl,
            type: 'POST',
            data: { action: "create_astro_map_order", imgBase64: this.dataURL, quantity: 1, productId: this.currentProductId }
        }).done(function (data) { return _this.onSaveRequestResponse(data); });
    };
    Application.prototype.onSaveRequestResponse = function (data) {
        console.log("Complete data=", data);
        console.log("current template: ", this.currentTemplate);
        alert("add to cart complete");
        this.showSavedTemplate();
    };
    Application.prototype.showSavedTemplate = function () {
        console.log("showSavedTemplate");
        var savedCurrentTemplateIndex = this.currentTemplateIndex;
        this.currentTemplateIndex = -1;
        console.log("loading template by index " + savedCurrentTemplateIndex);
        EventBus.dispatchEvent(Template.ON_SELECT, savedCurrentTemplateIndex);
    };
    Application.prototype.onTemplateSelected = function (index) {
        console.log("onTemplateSelected " + index);
        if (index == this.currentTemplateIndex) {
            return;
        }
        this.currentTemplateIndex = index;
        this.currentTemplate = this.templates.get(this.currentTemplateIndex);
        EventBus.dispatchEvent("TEMPLATE_CHANGED", this.currentTemplate);
        this.createTemplateElement(1);
    };
    return Application;
}());
//# sourceMappingURL=Application.js.map
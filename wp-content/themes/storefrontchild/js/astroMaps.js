var templates;
var templateBuilder;

var currentTemplateIndex = 0;
var currentTemplate;

var geocodingService;
var currentCity;
var currencurrentCoordtCoord;
var productId;

function getAstroTemplates(){
    $.ajax({
        url: ajaxurl,
        type: 'POST',
        data: 'action=get_astro_map_templates'
    })
        .done(function( data ) {
            onTemplatesLoaded(data);
        });
}

function onTemplatesLoaded(data){
    var parser = new TemplatesParser($);
    templates = parser.parse(data);

    console.log("templates:",templates);

    //EventBus.dispatchEvent("ON_TEMPLATES_LOADED", templates);
    EventBus.dispatchEvent(AppEvent.TEMPLATES_LOADED, templates);

    currentTemplate = templates.get(currentTemplateIndex);
    EventBus.dispatchEvent("TEMPLATE_CHANGED", currentTemplate);

    createTemplateElement(currentTemplate, "templateElement", "planicanvaZZ", 1);

    geocodingService = new GeocodingService($);

    createSearchCity();
    createDatepicker();
    getCurrentLocation();
    getCurrentProductId();
}

function getCurrentProductId(){
    //var productElement = $();
    var productElement = $('[id^=product-]');
    if(productElement!=undefined){
        productId = productElement.data("productid");
        console.log("productId="+productId);
    }
    else{
        console.error("Product id not defined");
    }
}

EventBus.addEventListener(Template.ON_SELECT, function(index){

    if(index==currentTemplateIndex){
        return;
    }

    if(templateBuilder){
        console.log("destroy template builder");
        templateBuilder.destroy();
        templateBuilder = null;
    }
    $("#templateElement").empty();

    currentTemplateIndex = index;

    currentTemplate = templates.get(currentTemplateIndex);
    currentTemplate.setCity(currentCity);

    EventBus.dispatchEvent("TEMPLATE_CHANGED", currentTemplate);

    createTemplateElement(currentTemplate, "templateElement", "planicanvaZZ", 1);
});


function createSearchCity(){
    var view = new SearchCityView($);
    var model = new SearchCityModel(view, geocodingService);
    new SearchCityController(model);

    EventBus.addEventListener(EditorEvent.CITY_CHANGED, function(data){
        var coord = data.coord;
        var city = data.city;
        $("#user_lat").val(parseFloat(coord[0]).toFixed(4));
        $("#user_lon").val(parseFloat(coord[1]).toFixed(4));

        EventBus.dispatchEvent(EditorEvent.COORDINATES_CHANGED, coord);

        // update template
        currentTemplate.setCity(city);
        currentTemplate.setLat(coord[0]);
        currentTemplate.setLng(coord[1]);

        currentCity = city;
        currentCoord = coord;

        EventBus.dispatchEvent("UPDATE_STARMAP", null);
    });

    function onDefaultCityGeocodingResult(data){
        EventBus.removeEventListener(GeocodingService.ON_GEOCODING_RESULT, onDefaultCityGeocodingResult);

        var resultParser = new SearchCityResultParses();
        var resultData = resultParser.parse(data);

        var firstCity = getFirstCity(resultData);
        EventBus.dispatchEvent(EditorEvent.CITY_CHANGED, firstCity);

        EventBus.dispatchEvent(EditorEvent.COORDINATES_CHANGED, firstCity.coord);
    }
    // find city by template's data
    EventBus.addEventListener(GeocodingService.ON_GEOCODING_RESULT, onDefaultCityGeocodingResult);

    var defaultCity = TemplateUtil.getCurrentCity(currentTemplate);
    EventBus.dispatchEvent(SearchCityEvent.ON_CITY_NAME, defaultCity);
}

function createDatepicker(){
    var dateSelectView = new DateSelectView($);
    var dateSelectModel = new DateSelectModel(dateSelectView);
    new DateSelectController(dateSelectModel);
}

function getCurrentLocation(){
    if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(
            function success(position) {
                currentCoord = [position.coords.latitude, position.coords.longitude];
                console.log('latitude '+ position.coords.latitude+ ' longitude '+ position.coords.longitude);

                EventBus.addEventListener(GeocodingService.ON_REVERSED_GEOCODING_RESULT, onCityByCoordinatesGeocodingResult);

                geocodingService.getCity(position.coords.latitude, position.coords.longitude);
            },
            function error(error_message) {
                console.error('An error has occured while retrieving location'+ error_message.message);
            }
        );
    } else {
        console.error('geolocation is not enabled on this browser');
    }
}

function createTemplateElement(template, parentContainerId, selfContainerId, coeff){
    //console.log("createTemplateElement");

    if(templateBuilder){
        templateBuilder.destroy();
        templateBuilder = null;
    }
    //console.log("create template builder");
    templateBuilder = new TemplateBuilder($, template, parentContainerId, selfContainerId, coeff);
}

function getFirstCity(data){
    var cities = data.collection;
    var firstCityData = cities.get(0);

    var coord = firstCityData.coord;
    var cityName = firstCityData.name;

    if(firstCityData){
        return {coord:coord, city:cityName};
    }
    else{
        console.error("Did'n find template default city");
    }
}

function createTemplateEditor(){
    var view = new TemplateEditorView($);
    var model = new TemplateEditorModel(view);
    new TemplateEditorController(model);
}

function createTemplatesList(){
    var templatesListView = new TemplatesListView($);
    var templatesListModel = new TemplatesListModel(templatesListView);
    new TemplatesListController(templatesListModel);
}

function createAstroMapOrder(){
    console.log("createAstroMapOrder");

    //TODO remove prev astromap
    if(templateBuilder){
        console.log("destroy template builder");
        templateBuilder.destroy();
        templateBuilder = null;
    }
    $("#templateElement").empty();

    window.scrollTo(0, 0);

    var quantity = 1;

    var printWidth = currentTemplate.getPrintWidth();
    var printHeight = currentTemplate.getPrintHeight();

    var templateWidth = $("#templateElement").outerWidth();

    var coeff = printWidth/templateWidth;

    var style = "position:relative; display:block; float:left; width:"+printWidth+"px; height:"+printHeight+"px;";

    var tempContainer = $("<div id='printImageContainer' style='"+style+"'></div>");
    tempContainer.appendTo(document.body);

    console.log("create printsize image");
    createTemplateElement(currentTemplate, "printImageContainer", "printCanvas", coeff);

    html2canvas(document.querySelector("#printImageContainer")).then(function(canvas){
        tempContainer.empty();
        tempContainer.remove();
        tempContainer = null;

        var dataURL = canvas.toDataURL();

        $.ajax({
            url: ajaxurl,
            type: 'POST',
            data: {action:"create_astro_map_order",imgBase64:dataURL, quantity:1, productId:productId}
        }).done(function(data) {
            console.log("Complete data=",data);
            console.log("current template: ",currentTemplate);

            showSavedTemplate();
        });
    });
}

function showSavedTemplate(){
    //console.log("showSavedTemplate");
    var savedCurrentTemplateIndex = currentTemplateIndex;
    currentTemplateIndex = -1;
    //console.log("loading template by index "+savedCurrentTemplateIndex);
    EventBus.dispatchEvent(Template.ON_SELECT, savedCurrentTemplateIndex);
}

function sendImage(blob){
    
}

createTemplateEditor();
createTemplatesList();




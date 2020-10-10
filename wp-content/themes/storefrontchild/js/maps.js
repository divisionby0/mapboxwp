console.log("MAPS");
function getCityTemplates(){
    console.log("getCityTemplates()");
    $.ajax({
        url: ajaxurl,
        type: 'POST',
        data: 'action=get_city_map_templates'
    })
        .done(function( data ) {
            onTemplatesLoaded(data);
        });
}

function onTemplatesLoaded(data){
    console.log("Templates loaded data=",data);

    var parser = new TemplatesParser($);
    templates = parser.parse(data);

    console.log("templates:",templates);

    EventBus.dispatchEvent("ON_TEMPLATES_LOADED", templates);
    console.log("event dispatched");
}

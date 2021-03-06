console.log("STORE");
$( document ).ready(function() {
    createListeners();
    switch(productCategory){
        case "Stars":
            new AstroApplication($);
            //getAstroTemplates();
            break;
        case "Map":
            new CityApplication($);
            //getCityTemplates();
            break;
    }
    
    afterInitActions();
});


function afterInitActions(){
    var cartPageElement = $("#cartPageElement");
    if(cartPageElement.text() == "isCart"){
        new Cart($);
    }
}

function createListeners(){
    $(".single_add_to_cart_button").click((event)=>onAddToCardButtonClicked(event));
}

function onAddToCardButtonClicked(event){
    event.stopPropagation();
    console.log("add to card clicked");
    createAstroMapOrder();
    
    return false;
}
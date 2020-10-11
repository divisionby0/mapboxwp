///<reference path="request/SetQuantityRequest.ts"/>
///<reference path="request/EmptyCartRequest.ts"/>
///<reference path="request/GetCartEmptyInfoPhraseRequest.ts"/>
///<reference path="../common/lib/events/EventBus.ts"/>
class Cart{
    private j$:any;

    protected quantityElements:any[];
    protected currencySymbol:string = "дублоноФФ :)";

    constructor(j$:any){
        this.j$ = j$;
        this.quantityElements = new List<any>("quantityElement");
        this.parseCurrencySymbol();
        this.createItems();
        this.createEmptyButton();
        
        this.createListeners();
    }

    private createItems():void {
        var elements:any[] = this.getElements();
        var i:number =0;
        var total:number = elements.length;

        for(i=0; i<total; i++){
            var element:any = this.j$(elements[i]);
            
            var key:string = element.data("key");

            var decrementButton:any = element.find(".modalCart__itemCountCircle-minus");
            var quantityElement:any = element.find(".modalCart__itemCountNum");
            var incrementButton:any = element.find(".modalCart__itemCountCircle-plus");

            this.quantityElements[key] = quantityElement;

            decrementButton.click((event)=>this.onDecrementButtonClicked(event));
            incrementButton.click((event)=>this.onIncrementButtonClicked(event));
        }
    }
    
    protected getElements():any[]{
        return this.j$(".shopping__item");
    }

    private onDecrementButtonClicked(event:any):void {
        var key:string = this.getKey(event);
        var element:any = this.quantityElements[key];
        var newQuantity:string = element.text();

        this.updateSidebar(key, parseInt(newQuantity));

        if(newQuantity == "0"){
            this.removeElement(key);
        }


        var request:SetQuantityRequest = new SetQuantityRequest(this.j$);
        request.execute(key, newQuantity);
    }
    private onIncrementButtonClicked(event:any):void {
        var key:string = this.getKey(event);
        var element:any = this.quantityElements[key];
        var newQuantity:string = element.text();

        this.updateSidebar(key, parseInt(newQuantity));

        var request:SetQuantityRequest = new SetQuantityRequest(this.j$);
        request.execute(key, newQuantity);
    }

    private getKey(event:any):string{
        var element:any = this.j$(event.currentTarget);
        var cartItemElement:any = this.j$(element.parent().parent().parent());
        return cartItemElement.data("key");
    }

    protected createEmptyButton():void {
        var emptyButton:any = this.j$("#emptyCart");
        emptyButton.click(()=>this.emptyButtonClicked());
    }

    private emptyButtonClicked():void {
        var request:EmptyCartRequest = new EmptyCartRequest(this.j$);
        request.execute();
    }

    private removeElement(key:string):void {
        this.quantityElements[key].parent().parent().parent().remove();
        delete this.quantityElements[key];
    }

    private removeSidebarElement(key:string):void{
        var element:any = this.j$('.shopping__totalBlockOrderItem[data-key="'+key+'"]');
        element.remove();
    }

    private updateSidebar(key:string, newQuantity:number):void {

        var element:any = this.j$('.shopping__totalBlockOrderItem[data-key="'+key+'"]');

        var quantityElement:any = element.find(".shopping__totalBlockOrderItemNum");

        if(newQuantity == 0){
            this.removeSidebarElement(key);

            var cartIsEmpty:boolean = this.detectCartIsEmpty();

            if(cartIsEmpty == true){
                this.j$(".wc-proceed-to-checkout").remove();
                this.j$("#emptyCart").remove();
                this.j$(".cart_totals").remove();
                
                this.getCartEmptyInfoHtml();
            }
        }
        else{
            quantityElement.text("x"+newQuantity);
        }

        // calculate total cost
        var newTotalCost:string = this.numberWithSpaces(this.getTotalCost().toString());

        var html:string = newTotalCost.toString();
        html += " <span class='woocommerce-Price-currencySymbol'>"+this.currencySymbol+"</span>";

        this.j$(".woocommerce-Price-amount").html(html);
    }

    private getTotalCost():number {
        var cost:number = 0;

        var elements:any[] = this.j$(".shopping__totalBlockOrderItem");
        var i:number;

        var total:number = elements.length;
        for(i=0; i<total; i++){
            var element:any = this.j$(elements[i]);
            var quantity:number = parseInt(this.getQuantity(element));

            var priceElement:any = element.find(".shopping__totalBlockOrderItemPrice");
            var priceElementText:string = priceElement.text();

            priceElementText = priceElementText.replace(/\s/g, '');

            var price:number = parseInt(priceElementText.split(this.currencySymbol)[0].trim());

            var itemCost:number = quantity*price;
            cost+=itemCost;
        }

        return cost;
    }

    private parseCurrencySymbol():void {
        this.currencySymbol = this.j$(".woocommerce-Price-currencySymbol").html();
    }

    private numberWithSpaces(x:string):string {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    }

    private getQuantity(element:any):string{
        var quantityElement:any = element.find(".shopping__totalBlockOrderItemNum");
        var quantityText:string = quantityElement.text();
        return quantityText.substring(1, quantityText.length);
    }

    private detectCartIsEmpty():boolean {
        var elements:any[] = this.j$(".shopping__totalBlockOrderItem");
        return elements.length == 0;
    }

    private getCartEmptyInfoHtml():void {
        var request:GetCartEmptyInfoPhraseRequest = new GetCartEmptyInfoPhraseRequest(this.j$);
        request.execute();
    }

    private createListeners():void {
        EventBus.addEventListener("CART_EMPTY_INFO_PHRASE_LOAD_COMPLETE", (data)=>this.onCartEmptyInfoPhraseLoadComplete(data))
    }
    
    private onCartEmptyInfoPhraseLoadComplete(phrase:string):void{
        this.showCartEmptyElement(phrase);
    }


    private showCartEmptyElement(phrase:string):void {
        var element:any = this.j$("<p class='cart-empty woocommerce-info'>"+phrase+"</p>");
        element.appendTo(this.j$(".woocommerce-notices-wrapper"));
    }
}

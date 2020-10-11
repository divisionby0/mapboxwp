///<reference path="../../common/lib/events/EventBus.ts"/>
declare var ajaxurl:string;
class GetCartEmptyInfoPhraseRequest {
    private j$:any;

    constructor(j$:any) {
        this.j$ = j$;
    }


    public execute():void{
        this.j$.ajax({
            url: ajaxurl,
            type: 'POST',
            data: {action:"get_cart_empty_info_html"}
        }).done((data)=>this.onResponse(data));
    }

    private onResponse(data:any):void {
        EventBus.dispatchEvent("CART_EMPTY_INFO_PHRASE_LOAD_COMPLETE", data);
    }
}
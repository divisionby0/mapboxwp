declare var ajaxurl:string;
class EmptyCartRequest {
    private j$:any;

    constructor(j$:any) {
        this.j$ = j$;
    }

    public execute():void{
        this.j$.ajax({
            url: ajaxurl,
            type: 'POST',
            data: {action:"empty_cart"}
        }).done((data)=>this.onResponse(data));
    }

    private onResponse(data:any):void {
        console.log("increment result: ",data);
    }
}
declare var ajaxurl:string;
class SetQuantityRequest {
    private j$:any;
    
    constructor(j$:any) {
        this.j$ = j$;
    }

    public execute(key:string, newQuantity:string):void{
        this.j$.ajax({
            url: ajaxurl,
            type: 'POST',
            data: {action:"cart_set_quantity",key:key, newQuantity:newQuantity}
        }).done((data)=>this.onResponse(data));
    }

    private onResponse(data:any):void {
        console.log("set cart item quantity response data= ",data);
    }
}
///<reference path="../Template.ts"/>
///<reference path="TemplateListRenderer.ts"/>
declare var siteUrl:string;
class TemplatesListView{
    
    private j$:any;
    private data:List<Template>;

    private mobileMinScreenWidth:number = 480;

    constructor(j$:any){
        this.j$ = j$;
    }

    public setData(collection:List<Template>):void {
        this.data = collection;

        var linesCounter:number = 1;
        var counter:number = 0;
        var iterator:ListIterator = collection.getIterator();

        var total:number = collection.size();

        var container:any = this.j$("#templatesListContainer");

        var patternBlock:any = this.j$("<div id='line_"+linesCounter+"' class='index__patternBlockLine'></div>");
        patternBlock.appendTo(container);

        var doubleImageBlock:any = this.j$("<div class='index__patternBlockDoubleImg'></div>");
        doubleImageBlock.appendTo(patternBlock);

        while(iterator.hasNext()){
            var template:Template = iterator.next();
            new TemplateListRenderer(this.j$, doubleImageBlock, template, counter);
            counter++;

            var divide2Result:number = counter % 2;
            var divide4Result:number = counter % 4;

            var isFinalItem:boolean = (counter == total);

            if(divide4Result == 0) {
                this.closeBlock(patternBlock);
                linesCounter++;

                if (counter < total) {
                    patternBlock = this.j$("<div id='line_"+linesCounter+"' class='index__patternBlockLine'></div>");
                    patternBlock.appendTo(container);
                }
            }

            if(divide2Result == 0){
                this.closeDoubleImageBlock(doubleImageBlock);

                if(counter<total){
                    doubleImageBlock = this.j$("<div class='index__patternBlockDoubleImg'></div>");
                    doubleImageBlock.appendTo(patternBlock);
                }
                else if(isFinalItem){
                    this.closeBlock(patternBlock);
                }
            }
            else{
                if(isFinalItem){
                    this.closeDoubleImageBlock(doubleImageBlock);
                    this.closeBlock(patternBlock);
                }
            }

            if(total == 1 || total < 4){
                this.closeDoubleImageBlock(doubleImageBlock);
                this.closeBlock(patternBlock);
                linesCounter++;
            }
        }
    }

    private closeBlock(lineElement:any):any{
        var shelfElement:any = this.j$("<img src='"+siteUrl+"/wp-content/themes/storefrontchild/assets/shelf.png' alt='shelf' class='index__patternBlockLineShelf'>");
        shelfElement.appendTo(lineElement);
    }
    
    private closeDoubleImageBlock(lineElement:any):any{
        var shelfElement:any = this.j$("<img src='"+siteUrl+"/wp-content/themes/storefrontchild/assets/shelf.png' alt='shelf' class='index__patternBlockLineShelf-mobile'>");
        shelfElement.appendTo(lineElement);
    }

    private isMobile():boolean{
        var width:number = this.j$(window).width();
        if(width > 480){
            return false;
        }
        else{
            return true;
        }
    }
}

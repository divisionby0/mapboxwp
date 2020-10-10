///<reference path="../Template.ts"/>
///<reference path="TemplateListRenderer.ts"/>
var TemplatesListView = (function () {
    function TemplatesListView(j$) {
        this.mobileMinScreenWidth = 480;
        this.j$ = j$;
    }
    TemplatesListView.prototype.setData = function (collection) {
        this.data = collection;
        var linesCounter = 1;
        var counter = 0;
        var iterator = collection.getIterator();
        var total = collection.size();
        var container = this.j$("#templatesListContainer");
        var patternBlock = this.j$("<div id='line_" + linesCounter + "' class='index__patternBlockLine'></div>");
        patternBlock.appendTo(container);
        var doubleImageBlock = this.j$("<div class='index__patternBlockDoubleImg'></div>");
        doubleImageBlock.appendTo(patternBlock);
        while (iterator.hasNext()) {
            var template = iterator.next();
            new TemplateListRenderer(this.j$, doubleImageBlock, template, counter);
            counter++;
            var divide2Result = counter % 2;
            var divide4Result = counter % 4;
            var isFinalItem = (counter == total);
            if (divide4Result == 0) {
                this.closeBlock(patternBlock);
                linesCounter++;
                if (counter < total) {
                    patternBlock = this.j$("<div id='line_" + linesCounter + "' class='index__patternBlockLine'></div>");
                    patternBlock.appendTo(container);
                }
            }
            if (divide2Result == 0) {
                this.closeDoubleImageBlock(doubleImageBlock);
                if (counter < total) {
                    doubleImageBlock = this.j$("<div class='index__patternBlockDoubleImg'></div>");
                    doubleImageBlock.appendTo(patternBlock);
                }
                else if (isFinalItem) {
                    this.closeBlock(patternBlock);
                }
            }
            else {
                if (isFinalItem) {
                    this.closeDoubleImageBlock(doubleImageBlock);
                    this.closeBlock(patternBlock);
                }
            }
            if (total == 1 || total < 4) {
                this.closeDoubleImageBlock(doubleImageBlock);
                this.closeBlock(patternBlock);
                linesCounter++;
            }
        }
    };
    TemplatesListView.prototype.closeBlock = function (lineElement) {
        var shelfElement = this.j$("<img src='" + siteUrl + "/wp-content/themes/storefrontchild/assets/shelf.png' alt='shelf' class='index__patternBlockLineShelf'>");
        shelfElement.appendTo(lineElement);
    };
    TemplatesListView.prototype.closeDoubleImageBlock = function (lineElement) {
        var shelfElement = this.j$("<img src='" + siteUrl + "/wp-content/themes/storefrontchild/assets/shelf.png' alt='shelf' class='index__patternBlockLineShelf-mobile'>");
        shelfElement.appendTo(lineElement);
    };
    TemplatesListView.prototype.isMobile = function () {
        var width = this.j$(window).width();
        if (width > 480) {
            return false;
        }
        else {
            return true;
        }
    };
    return TemplatesListView;
}());
//# sourceMappingURL=TemplatesListView.js.map
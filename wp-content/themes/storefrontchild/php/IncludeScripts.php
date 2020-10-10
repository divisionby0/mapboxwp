<?php


class IncludeScripts
{
    private $category;
    private static $MAP_CATEGORY = "Map";
    private static $ASTRO_MAP_CATEGORY = "Stars";

    function __construct()
    {
        $this->category = getPostCategory();
        $this->createJSConstants();

        wp_dequeue_style( 'storefront-style' );
        wp_dequeue_style( 'storefront-woocommerce-style' );

        define( 'CHILD_DIR', get_stylesheet_directory_uri() );

        $this->createCss();

        wp_enqueue_script( 'jqueryCustom',  CHILD_DIR .'/js/common/lib/jquery-3.4.1.min.js');
        wp_enqueue_script( 'jqueryUi',  CHILD_DIR .'/js/common/lib/jquery-ui.min.js');

        wp_enqueue_script( 'collections',  CHILD_DIR .'/js/common/lib/collections.min.js', array(), false, true);
        wp_enqueue_script( 'eventBus',  CHILD_DIR .'/js/common/lib/events/EventBus.js', array(), false, true);
        wp_enqueue_script( 'html2Canvas',  CHILD_DIR .'/js/common/lib/html2canvas.js', array(), false, true);
        wp_enqueue_script( 'bootstrapToggle',  'https://gitcdn.github.io/bootstrap-toggle/2.2.2/js/bootstrap2-toggle.min.js', array(), false, true);
        wp_enqueue_script( 'canvas2Blob',  '//cdn.jsdelivr.net/canvas-toblob/0.1/canvas-toBlob.min.js', array(), false, true);
        wp_enqueue_script( 'fileSaver',  '//cdn.jsdelivr.net/npm/filesaver.js@1.3.4/FileSaver.min.js', array(), false, true);
        wp_enqueue_script( 'appUtils',  CHILD_DIR .'/js/common/lib/Utils.js', array(), false, true);

        wp_enqueue_script( 'geocodingService',  CHILD_DIR .'/js/common/GeocodingService.js', array(), false, true);

        wp_enqueue_script('searchResultParser', CHILD_DIR .'/js/common/template/editor/city/SearchCityResultParses.js', array(), false, true);
        wp_enqueue_script('searchCityEvent', CHILD_DIR .'/js/common/template/editor/city/SearchCityEvent.js', array(), false, true);
        wp_enqueue_script('cityListRenderer', CHILD_DIR .'/js/common/template/editor/city/CityListRenderer.js', array(), false, true);
        wp_enqueue_script('searchCityView', CHILD_DIR .'/js/common/template/editor/city/SearchCityView.js', array(), false, true);
        wp_enqueue_script('searchCityModel', CHILD_DIR .'/js/common/template/editor/city/SearchCityModel.js', array(), false, true);
        wp_enqueue_script('searchCityController', CHILD_DIR .'/js/common/template/editor/city/SearchCityController.js', array(), false, true);
        wp_enqueue_script('searchCity', CHILD_DIR .'/js/common/template/editor/city/SearchCity.js', array(), false, true);
        
        wp_enqueue_script('dateSelectView', CHILD_DIR .'/js/common/template/editor/datetime/DateSelectView.js', array(), false, true);
        wp_enqueue_script('dateSelectModel', CHILD_DIR .'/js/common/template/editor/datetime/DateSelectModel.js', array(), false, true);
        wp_enqueue_script('dateSelectController', CHILD_DIR .'/js/common/template/editor/datetime/DateSelectController.js', array(), false, true);
        wp_enqueue_script('layerId', CHILD_DIR .'/js/common/template/LayerId.js', array(), false, true);
        wp_enqueue_script('templateUtil', CHILD_DIR .'/js/common/template/TemplateUtil.js', array(), false, true);
        wp_enqueue_script('templateListRenderer', CHILD_DIR .'/js/common/template/templatesList/TemplateListRenderer.js', array(), false, true);
        wp_enqueue_script('templateEditor', CHILD_DIR .'/js/common/template/editor/TemplateEditor.js', array(), false, true);
        wp_enqueue_script('templateListView', CHILD_DIR .'/js/common/template/templatesList/TemplatesListView.js', array(), false, true);
        wp_enqueue_script('templateListModel', CHILD_DIR .'/js/common/template/templatesList/TemplatesListModel.js', array(), false, true);
        wp_enqueue_script('templateListController', CHILD_DIR .'/js/common/template/templatesList/TemplatesListController.js', array(), false, true);
        wp_enqueue_script('templateLayer', CHILD_DIR .'/js/common/template/layer/TemplateLayer.js', array(), false, true);
        wp_enqueue_script('divTemplateLayer', CHILD_DIR .'/js/common/template/layer/DivTemplateLayer.js', array(), false, true);
        wp_enqueue_script('borderCircleTemplateLayer', CHILD_DIR .'/js/common/template/layer/BorderCircleTemplateLayer.js', array(), false, true);
        wp_enqueue_script('textTemplateLayer', CHILD_DIR .'/js/common/template/layer/TextTemplateLayer.js', array(), false, true);
        wp_enqueue_script('cityTemplateLayer', CHILD_DIR .'/js/common/template/layer/CityTemplateLayer.js', array(), false, true);
        wp_enqueue_script('coordinatesTemplateLayer', CHILD_DIR .'/js/common/template/layer/CoordinatesTemplateLayer.js', array(), false, true);
        wp_enqueue_script('dateTimeTemplateLayer', CHILD_DIR .'/js/common/template/layer/DateTimeTemplateLayer.js', array(), false, true);
        wp_enqueue_script('imageTemplateLayer', CHILD_DIR .'/js/common/template/layer/ImageTemplateLayer.js', array(), false, true);
        wp_enqueue_script('layerView', CHILD_DIR .'/js/common/template/element/LayerView.js', array(), false, true);
        wp_enqueue_script('textLayerView', CHILD_DIR .'/js/common/template/element/TextLayerView.js', array(), false, true);
        wp_enqueue_script('cityLayerView', CHILD_DIR .'/js/common/template/element/CityLayerView.js', array(), false, true);
        wp_enqueue_script('coordinatesLayerView', CHILD_DIR .'/js/common/template/element/CoordinatesLayerView.js', array(), false, true);
        wp_enqueue_script('dateTimeLayerView', CHILD_DIR .'/js/common/template/element/DateTimeLayerView.js', array(), false, true);
        wp_enqueue_script('divLayerView', CHILD_DIR .'/js/common/template/element/DivLayerView.js', array(), false, true);
        wp_enqueue_script('borderCircleLayerView', CHILD_DIR .'/js/common/template/element/BorderCircleLayerView.js', array(), false, true);
        wp_enqueue_script('imageLayerView', CHILD_DIR .'/js/common/template/element/ImageLayerView.js', array(), false, true);
        wp_enqueue_script('parameter', CHILD_DIR .'/js/common/template/layer/Parameter.js', array(), false, true);
        wp_enqueue_script('border', CHILD_DIR .'/js/common/template/layer/border/Border.js', array(), false, true);
        wp_enqueue_script('borderCssBuilder', CHILD_DIR .'/js/common/template/layer/border/BorderSccBuilder.js', array(), false, true);
        wp_enqueue_script('templateElementView', CHILD_DIR .'/js/common/template/element/TemplateElementView.js', array(), false, true);
        wp_enqueue_script('templateElementModel', CHILD_DIR .'/js/common/template/element/TemplateElementModel.js', array(), false, true);
        wp_enqueue_script('templateElementController', CHILD_DIR .'/js/common/template/element/TemplateElementController.js', array(), false, true);
        wp_enqueue_script('editorEvent', CHILD_DIR .'/js/common/template/editor/EditorEvent.js', array(), false, true);
        wp_enqueue_script('templateEditorView', CHILD_DIR .'/js/common/template/editor/TemplateEditorView.js', array(), false, true);
        wp_enqueue_script('templateEditorModel', CHILD_DIR .'/js/common/template/editor/TemplateEditorModel.js', array(), false, true);
        wp_enqueue_script('templateEditorController', CHILD_DIR .'/js/common/template/editor/TemplateEditorController.js', array(), false, true);
        wp_enqueue_script('template', CHILD_DIR .'/js/common/template/Template.js', array(), false, true);
        wp_enqueue_script('templatesParser', CHILD_DIR .'/js/common/template/TemplatesParser.js', array(), false, true);
        wp_enqueue_script('layerType', CHILD_DIR .'/js/common/template/layer/LayerType.js', array(), false, true);
        wp_enqueue_script('templateBuilder', CHILD_DIR .'/js/common/template/TemplateBuilder.js', array(), false, true);

        wp_enqueue_script('customStore', CHILD_DIR .'/js/store.js', array(), false, true);

        wp_enqueue_script('wickedpicker', CHILD_DIR .'/js/common/lib/wickedpicker.js', array(), false, true);
        wp_enqueue_script('overlayScrollbars', CHILD_DIR .'/js/common/lib/OverlayScrollbars/js/jquery.overlayScrollbars.min.js', array(), false, true);

        wp_enqueue_script('markupHelper', CHILD_DIR .'/js/markup_helper.js', array(), false, true);

        wp_enqueue_script('appEvent', CHILD_DIR .'/js/common/AppEvent.js', array(), false, true);
        wp_enqueue_script('app', CHILD_DIR .'/js/common/Application.js', array(), false, true);
        
        if($this->category === self::$ASTRO_MAP_CATEGORY ) {
            wp_enqueue_script('starmapLayerModel', CHILD_DIR .'/js/common/template/layer/starmap/StarmapLayerModel.js', array(), false, true);
            wp_enqueue_script('starmapLayerController', CHILD_DIR .'/js/common/template/layer/starmap/StarmapLayerController.js', array(), false, true);
            wp_enqueue_script('starmapLayerView', CHILD_DIR .'/js/common/template/layer/starmap/StarmapLayerView.js', array(), false, true);

            wp_enqueue_script('moonFinder', CHILD_DIR .'/js/nightsky/js/starmap/MoonFinder.js', array(), false, true);
            wp_enqueue_script('planetFinder', CHILD_DIR .'/js/nightsky/js/starmap/PlanetFinder.js', array(), false, true);
            wp_enqueue_script('skyTransform', CHILD_DIR .'/js/nightsky/js/starmap/SkyTransform.js', array(), false, true);
            wp_enqueue_script('starmap', CHILD_DIR .'/js/nightsky/js/starmap/Starmap.js', array(), false, true);
            wp_enqueue_script('starmapLib', CHILD_DIR .'/js/nightsky/js/lib.js', array(), false, true);
            wp_enqueue_script('astroApp', CHILD_DIR .'/js/nightsky/js/AstroApplication.js', array(), false, true);

        }
        else if($this->category === self::$MAP_CATEGORY){
            wp_enqueue_script('cityApp', CHILD_DIR .'/js/printmap/js/CityApplication.js', array(), false, true);
            wp_enqueue_script('maps', CHILD_DIR .'/js/maps.js', array(), false, true);
        }
    }

    private function createCss(){
        wp_enqueue_style( 'bootstrap',  CHILD_DIR .'/js/common/lib/bootstrap.min.css');
        wp_enqueue_style( 'jQueryUI',  CHILD_DIR .'/js/common/lib/jquery-ui.min.css');
        wp_enqueue_style( 'bootstrapToggle',  'https://gitcdn.github.io/bootstrap-toggle/2.2.2/css/bootstrap2-toggle.min.css');
        wp_enqueue_style( 'wickedpickerCss',  CHILD_DIR .'/js/common/lib/wickedpicker.min.css');
        wp_enqueue_style( 'overlayScrollbarsCss',  CHILD_DIR .'/js/common/lib/OverlayScrollbars/css/OverlayScrollbars.min.css');

        if($this->category === self::$ASTRO_MAP_CATEGORY ) {
            wp_enqueue_style( 'astroMapsCss',  CHILD_DIR .'/js/nightsky/css/astro.css');
        }
        else if($this->category === self::$MAP_CATEGORY){

        }
    }

    private function createJSConstants(){
        echo '<script type="text/javascript">
           var ajaxurl = "' . admin_url('admin-ajax.php') . '";
           var productCategory = "'.$this->category.'";
         </script>';
    }
}
<?php
// TODO If you want to see the PHP errors when using ajax, open up the wp-includes/load.php file & on line 336, change this line:
// TODO в момент создания преквью из PNG иногда возникает ошибка в логах (Allowed memory size of 134217728 bytes exhausted (tried to allocate 34823316 bytes) in D:\workspaces\DenverServers\home\mapboxwp\www\wp-content\themes\storefrontchild\php\ImagePreviewCreator.php on line 31)
// TODO сделал memory_limit = 256M в php.ini
// TODO woocommerce cart additional data https://stackoverflow.com/questions/25188365/how-to-retrieve-cart-item-data-with-woocommerce
include_once('php/MapTemplatePostType.php');
include_once('php/AstroMapTemplateType.php');
include_once('php/GetAstroMapsRequest.php');
include_once('php/GetCityMapsRequest.php');
include_once('php/IncludeScripts.php');
include_once('php/DisableWYSIWYGEditor.php');
include_once('php/DisableWYSIWYGEditorButtons.php');
include_once('php/ImageSaver.php');
include_once('php/AstroImageSaver.php');
include_once('php/ImagePreviewCreator.php');
include_once('php/MapboxAdminSettings.php');

$currencySymbol;

function createPostType(){
    new MapTemplatePostType();
    new AstroMapTemplateType();
}

new DisableWYSIWYGEditor();

function custom_edit_page_js(){
    new DisableWYSIWYGEditorButtons();
}
function getAstroMapTemplates() {
    $astroMapsRequest = new GetAstroMapsRequest();
    return $astroMapsRequest->execute();
}
function getCityMapTemplates() {
    $cityMapsRequest = new GetCityMapsRequest();
    return $cityMapsRequest->execute();
}
function includeScripts() {
    new IncludeScripts();

    if(is_404()){
        wp_register_script('footer404', get_stylesheet_directory_uri() .'/js/footer404.js', array(), true);
        wp_enqueue_script('footer404');
    }
}

function getPostCategory(){
    $postId = get_the_ID();
    $categories = get_the_terms($postId, 'product_cat');
    if($categories){
        $category = $categories[0]->name;
        return $category;
    }
    else{
        return null;
    }
}

function createAstroMapOrder(){
    $imageData = $_POST['imgBase64'];
    $quantity = $_POST['quantity'];
    $productId = $_POST['productId'];
    
    if( $imageData!= '') {
        $astroImageSaver = new AstroImageSaver($imageData);
        $createImageResult = $astroImageSaver->save();
        
        // TODO add to cart
        $resultData = json_decode($createImageResult);
        $image = $resultData->image;
        $preview = $resultData->preview;
        
        $result = WC()->cart->add_to_cart( $productId, 1, 0, array(), array("userImagePreview"=>$preview, "printSizeImage"=>$image) );
        echo "product added to cart. productId=".$productId." preview=".$preview." result=".$result;
    }
    else{
        echo "Empty image data";
    }

    //echo "astro ajax response OK";
    wp_die();
}


// add to cart hooks
add_filter( 'woocommerce_get_cart_item_from_session', function ( $cartItemData, $cartItemSessionData, $cartItemKey ) {
    if ( isset( $cartItem['userImagePreview'] ) && isset($cartItem['printSizeImage'])) {
        $cartItemData['userImagePreview'] = $cartItemSessionData['userImagePreview'];
        $cartItemData['printSizeImage'] = $cartItemSessionData['printSizeImage'];
    }

    return $cartItemData;
}, 10, 3 );


add_filter( 'woocommerce_get_item_data', function ( $data, $cartItem ) {
    if ( isset( $cartItem['userImagePreview'] ) && isset($cartItem['printSizeImage']) ) {
        $data[] = array(
            'name' => 'data',
            'value' => json_encode(["preview"=>$cartItem['userImagePreview'], "printSize"=>$cartItem['printSizeImage']])
        );
    }
    else{
        $data[] = array(
            'name' => 'data',
            'value' => 'no preview and print size data provided'
        );
    }

    return $data;
}, 10, 2 );


// convert cart item to order
add_action('woocommerce_add_order_item_meta','add_product_custom_field_to_order_item_meta', 9, 3 );

function add_product_custom_field_to_order_item_meta( $item_id, $item_values, $item_key ) {
    // the meta-key is 'Date event' because it's going to be the label too
    if( ! empty( $item_values['printSizeImage'] ) ){
        wc_update_order_item_meta( $item_id, 'printSizeImage',  $item_values['printSizeImage']  );
    }
    else{
        error_log("printSizeImage not set");
    }

    if( ! empty( $item_values['userImagePreview'] ) ){
        wc_update_order_item_meta( $item_id, 'userImagePreview',  $item_values['userImagePreview']  );
    }
    else{
        error_log("userImagePreview not set");
    }
}
// end of add to cart hooks
function showOrderMeta($item_id, $item, $product){
    $printSizeImage = wc_get_order_item_meta( $item_id, 'printSizeImage');
    $userImagePreview = wc_get_order_item_meta( $item_id, 'userImagePreview');
    if(isset($printSizeImage) && $printSizeImage!="" && isset($userImagePreview) && $userImagePreview!=""){
        echo "<p><a target='_blank' href='".site_url()."/wp-content/uploads/customerMaps/{$printSizeImage}'>КАРТИНКА ДЛЯ ПЕЧАТИ</a></p>";
        echo "<p><a target='_blank' href='".site_url()."/wp-content/uploads/customerMaps/{$userImagePreview}'>Миниатюра</a></p>";
    }
}

function getMapboxAccessData(){
    $mapboxAccessToken = get_option( 'mapboxAccessToken', '' );
    $mapTilerAccessToken = get_option( 'mapTilerAccessToken', '' );

    echo json_encode(["mapboxAccessToken"=>$mapboxAccessToken, "mapTilerAccessToken"=>$mapTilerAccessToken]);
    wp_die();
}

function testAjax(){
    echo "Ajax test OK";
    wp_die();
}

/*  storefront-template-functions.php OVERRIDE*/
function storefront_page_header() {
}
function storefront_header_container() {
}
function storefront_header_container_close() {
}
function storefront_skip_links() {
    ?>
    <?php
}
function storefront_primary_navigation_wrapper() {
}
function storefront_primary_navigation() {
    ?>
    <?php
}
function storefront_primary_navigation_wrapper_close() {
}

function storefront_site_title_or_logo( $echo = true ) {
    if ( function_exists( 'the_custom_logo' ) && has_custom_logo() ) {
        $logo = get_custom_logo();
        $html = is_home() ? '<h1 class="logo">' . $logo . '</h1>' : $logo;
    } else {
        $tag = is_home() ? 'h1' : 'div';

        $html = '<' . esc_attr( $tag ) . ' class="beta site-title"><a href="' . esc_url( home_url( '/' ) ) . '" rel="home" class="site-title-desktop">' . esc_html( get_bloginfo( 'name' ) ) . '</a><a href="' . esc_url( home_url( '/' ) ) . '" rel="home" class="site-title-mobile">' . esc_html( get_bloginfo( 'name' ) ) . '</a></' . esc_attr( $tag ) . '>';
    }

    if ( ! $echo ) {
        return $html;
    }

    echo $html; // WPCS: XSS ok.
}
/*
END OF storefront-template-functions.php OVERRIDE
*/

/*  override storefront\inc\woocommerce\storefront-woocommerce-template-functions.php */
function storefront_header_cart() {
}

/* override mobile footer with cart */
function storefront_handheld_footer_bar(){
}

function getCustomFooter(){
    $stylesheetDir = get_stylesheet_directory_uri();

    echo '<footer id="colophon" class="site-footer" role="contentinfo">
		<div class="wrapper">
			<div class="footer__leftBlock">
				<div class="footer__leftBlockSocial">
					<div class="site-info">mapboxwp</div>
					<div class="footer__leftBlockIcons">
						<a href="#"><img src="'.$stylesheetDir.'/assets/insta.svg" alt="insta" class="footer__leftBlockSocialIcon"></a>
						<a href="#"><img src="'.$stylesheetDir.'/assets/tg.svg" alt="tg" class="footer__leftBlockSocialIcon"></a>
					</div>
				</div>
				<div class="footer__leftBlockLinks">
					<a href="#" class="footer__leftBlockLink">Доставка</a>
					<a href="#" class="footer__leftBlockLink">Оплата</a>
				</div>
			</div>
			<div class="footer__contactBlock">
				<div class="footer__contactBlockItem">
					<img src="'.$stylesheetDir.'/assets/mail.svg" alt="mail" class="footer__contactBlockIcon">
					<p class="footer__contactBlockText">test@mail.ru</p>
				</div>
				<div class="footer__contactBlockItem">
					<img src="'.$stylesheetDir.'/assets/phone.svg" alt="phone" class="footer__contactBlockIcon">
					<a href="tel:+88120000000" class="footer__contactBlockText">8 (812) 000-00-00</a>
				</div>
			</div>
		</div>
	</footer>';
}

function storefront_site_branding() {
    ?>
    <div class="site-branding">
        <?php
        storefront_site_title_or_logo();
        ?>
    </div>

    <?php $assetsFolder = get_stylesheet_directory_uri()."/assets/"; ?>

    <div class="cart__btn">
        <img src="<?php echo $assetsFolder."cart.svg"; ?>" alt="cart" class="cart__icon">
        <span class="cart__btnNumber cart__btnNumber-active">2</span>
    </div>
    <div class="cart__block">
        <div class="modalCart">
            <div class="modalCart__content">
                <div id="modalCartItems" class="modalCart__items">

                </div>
                <div class="modalCart__sum">
                    <p class="modalCart__sumText">
                        Подытог:<span id="modalCartSum" class="modalCart__sumNum">5 000 ₽</span>
                    </p>
                </div>
            </div>
        </div>
    </div>
    <?php
}

/* breadcrumbs */
add_filter( 'woocommerce_breadcrumb_defaults', 'change_breadcrumbs',20);

function change_breadcrumbs( $defaults ) {
    $defaults['wrap_before'] = '<div class="storefront-breadcrumb"><div class="wrapper"><nav class="woocommerce-breadcrumb">';
    return $defaults;
}

add_action('template_redirect', 'remove_shop_breadcrumbs' );

function remove_shop_breadcrumbs(){

    $isProductPage = is_product();
    $is_404 = is_404();

    if ($isProductPage == 1 || $is_404 == 1){
        remove_action( 'storefront_before_content', 'woocommerce_breadcrumb', 10 );
    }
}

function storefront_before_content() {
    $style = "background:url('".get_stylesheet_directory_uri()."/assets/starConstructorBg.png"."') no-repeat center; background-size:cover;";
    ?>
    <div id="primary" class="stars" style="<?php echo $style; ?>" data-id="constructor">
        <div id="main" class="wrapper">
            <h2 class="index__headline">2. Укажите место события и персонализируйте свою карту</h2>
    <?php
}


/*  remove search in header */
add_action( 'init', 'jk_remove_storefront_header_search' );
function jk_remove_storefront_header_search() {
    remove_action( 'storefront_header', 'storefront_product_search', 40 );
}

function showCartOrders(){
    $names = array();
    $cart = WC()->cart->get_cart();
    $items = array();

    //var_dump($cart);

    global $currencySymbol;

    foreach ($cart as $cart_item_key => $cart_item ) {
        echo "<p>cart item</p>";
        $_product   = apply_filters( 'woocommerce_cart_item_product', $cart_item['data'], $cart_item, $cart_item_key );
        //$product_id = apply_filters( 'woocommerce_cart_item_product_id', $cart_item['product_id'], $cart_item, $cart_item_key );

        if ( $_product && $_product->exists() && $cart_item['quantity'] > 0 && apply_filters( 'woocommerce_cart_item_visible', true, $cart_item, $cart_item_key ) ) {
            $productTitle = $_product->get_title();

            array_push($items, $cart_item);

            if (!in_array($productTitle, $names))
            {
                array_push($names, $productTitle);
            }
        }
    }

    for($i=0; $i<sizeof($items); $i++){
        echo "<div class='shopping__totalBlockOrderItem'>";
            $cartItem = $items[$i];
            $itemName = $cartItem["data"]->get_name();
            $itemQuantity = $cartItem["quantity"];

            $price = $cartItem['data']->get_price();

            echo "<p class='shopping__totalBlockOrderItemName'>".$itemName."</p>";
            echo "<p class='shopping__totalBlockOrderItemNum'>x".$itemQuantity."</p>";
            echo "<p class='shopping__totalBlockOrderItemPrice'>".$price;
            echo "<span class='woocommerce-Price-currencySymbol'> ".$currencySymbol."</span>";
            echo "</p>";
        echo "</div>";
    }
}

function showTotalAndDeliveryBlock(){

    global $currencySymbol;

    global $woocommerce;
    $amount2 = intval( preg_replace( '#[^\d.]#', '', $woocommerce->cart->get_cart_total() ) );

    $captionText = esc_attr( translate( 'Subtotal', 'woocommerce' ) );

    echo "<div class='shopping__totalBlockDeliveryItem'>";
    echo "<p class='shopping__totalBlockDeliveryText'>".$captionText."</p>";
    echo "<p class='woocommerce-Price-amount amount shopping__totalBlockDeliveryNum'>".$amount2."";

    echo "<span class='woocommerce-Price-currencySymbol'> ".$currencySymbol."</span></p>";
    echo "</div>";
}

new MapboxAdminSettings();

add_filter( 'woocommerce_show_page_title', 'not_a_cart_page' );
function not_a_cart_page() {
    echo "<div>is_cart()e=".is_cart()."</div>";
    return boolval(!is_cart());
}

function addActionsToHeader(){
    echo "<script type='application/javascript'>var siteUrl='".get_site_url()."'</script>";
    echo "<script type='application/javascript'>var ajaxUrl = '".admin_url('admin-ajax.php')."'</script>";

    $isCartPage = is_page( 'cart' );

    if($isCartPage){
        global $currencySymbol;
        $currencySymbol = get_woocommerce_currency_symbol();

        /*
        echo "<p>adding test product...</p>";
        $testProduct = array();
        WC()->cart->add_to_cart( 29 );

        echo "<p>cart:</p>";
        $WC_Cart = WC()->cart->get_cart();
        var_dump($WC_Cart);
        */
    }
}

function getGeocodingAdminData(){
    $url = get_option( 'googleAPIsURL', '' );
    $reverseUrl = get_option( 'googleAPIsReverseURL', '' );
    $token = get_option( 'googleAPIsGeocodingToken', '' );
    echo json_encode(array($url, $reverseUrl, $token));
    wp_die();
}

// add same product to cart twice instead of changing quantity
function addNewProductInsteadChangeQuantity( $cart_item_data, $product_id ) {
    $distinctive_cart_item_key = md5( microtime() . rand() );
    $cart_item_data['distinctive_key'] = $distinctive_cart_item_key;
    return $cart_item_data;
}
add_filter('woocommerce_add_cart_item_data','addNewProductInsteadChangeQuantity',11,2);
add_filter('woocommerce_is_sold_individually','__return_true' );
// end of  add same product to cart twice instead of changing quantity


add_action("woocommerce_after_order_itemmeta", "showOrderMeta", 10, 3);

/**
 * Remove related products output
 */
remove_action( 'woocommerce_after_single_product_summary', 'woocommerce_output_related_products', 20 );

// remove category info output
remove_action( 'woocommerce_single_product_summary', 'woocommerce_template_single_meta', 40 );

// remove ADD_TO_CARD button from product page
remove_action( 'woocommerce_after_shop_loop_item', 'woocommerce_template_loop_add_to_cart', 10 );
remove_action( 'woocommerce_single_product_summary', 'woocommerce_template_single_add_to_cart', 30 );

add_action( 'wp_enqueue_scripts', 'includeScripts' );

add_filter( 'admin_footer', 'custom_edit_page_js', 99);
add_action( 'init', 'createPostType' );
add_action( 'wp_ajax_get_astro_map_templates', 'getAstroMapTemplates' );
add_action( 'wp_ajax_nopriv_get_astro_map_templates', 'getAstroMapTemplates' );

add_action( 'wp_ajax_get_city_map_templates', 'getCityMapTemplates' );
add_action( 'wp_ajax_nopriv_get_city_map_templates', 'getCityMapTemplates' );

add_action( 'wp_ajax_create_astro_map_order', 'createAstroMapOrder' );
add_action( 'wp_ajax_nopriv_create_astro_map_order', 'createAstroMapOrder' );


add_action( 'wp_ajax_getMapboxAccessData', 'getMapboxAccessData' );
add_action( 'wp_ajax_nopriv_getMapboxAccessData', 'getMapboxAccessData' );

add_action( 'wp_ajax_testAjax', 'createAstroMapOrder' );
add_action( 'wp_ajax_nopriv_testAjax', 'createAstroMapOrder' );

add_action( 'wp_ajax_getGeocodingAdminData', 'getGeocodingAdminData' );
add_action( 'wp_ajax_nopriv_getGeocodingAdminData', 'getGeocodingAdminData' );


add_action( 'wp_head', 'addActionsToHeader' );

<?php
/**
 * Cart Page
 *
 * This template can be overridden by copying it to yourtheme/woocommerce/cart/cart.php.
 *
 * HOWEVER, on occasion WooCommerce will need to update template files and you
 * (the theme developer) will need to copy the new files to your theme to
 * maintain compatibility. We try to do this as little as possible, but it does
 * happen. When this occurs the version of the template file will be bumped and
 * the readme will list any important changes.
 *
 * @see     https://docs.woocommerce.com/document/template-structure/
 * @package WooCommerce/Templates
 * @version 3.8.0
 */

defined( 'ABSPATH' ) || exit;

do_action( 'woocommerce_before_cart' ); ?>
<div class="shopping__block">
    <form class="woocommerce-cart-form" action="<?php echo esc_url( wc_get_cart_url() ); ?>" method="post">
        <?php do_action( 'woocommerce_before_cart_table' ); ?>

        <div class="shopping__items">
            <?php
            foreach ( WC()->cart->get_cart() as $cart_item_key => $cart_item ) {
                $_product   = apply_filters( 'woocommerce_cart_item_product', $cart_item['data'], $cart_item, $cart_item_key );
                $product_id = apply_filters( 'woocommerce_cart_item_product_id', $cart_item['product_id'], $cart_item, $cart_item_key );

                if ( $_product && $_product->exists() && $cart_item['quantity'] > 0 && apply_filters( 'woocommerce_cart_item_visible', true, $cart_item, $cart_item_key ) ) {
                    $product_permalink = apply_filters( 'woocommerce_cart_item_permalink', $_product->is_visible() ? $_product->get_permalink( $cart_item ) : '', $cart_item, $cart_item_key );
                    //$product_name = esc_attr_e( 'Product', 'woocommerce' );
                    //echo "<h2>product name: ".$product_name."</h2>";
                    ?>
                    <div class="shopping__item">
                        <?php
                        $thumbnail = get_the_post_thumbnail_url($product_id);
                        ?>
                        <img src="<?php echo $thumbnail;?>" alt="card" class="modalCart__itemImg">
                        <div class="modalCart__itemContent">
                            <p class="modalCart__itemName"><?php echo $_product->get_title();?></p>
                        </div>
                        <div class="modalCart__itemCountAndSumBlock">
                            <div class="modalCart__itemCountBlock">
                                <div class="modalCart__itemCountCircle modalCart__itemCountCircle-minus modalCart__itemCountCircle-gray">
                                    <span>-</span>
                                </div>
                                <p class="modalCart__itemCountNum">1</p>
                                <div class="modalCart__itemCountCircle modalCart__itemCountCircle-plus">
                                    <span>+</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <?php
                }
            }
            ?>
        </div>
        
    </form>

    <?php do_action( 'woocommerce_before_cart_collaterals' ); ?>

    <div class="cart-collaterals">
        <?php
        do_action( 'woocommerce_cart_collaterals' );
        ?>
    </div>
</div>
<?php do_action( 'woocommerce_after_cart' ); ?>

<?php

class GetFromCart
{
    private $names;
    private $cart;
    private $items;
    
    function __construct()
    {
        $this->names = array();
        $this->items = array();
        $this->cart = WC()->cart->get_cart();
    }
    
    public function execute(){
        
        $returnArray = array(); 
        
        foreach ($this->cart as $cart_item_key => $cart_item ) {
            $_product   = apply_filters( 'woocommerce_cart_item_product', $cart_item['data'], $cart_item, $cart_item_key );
            //$product_id = apply_filters( 'woocommerce_cart_item_product_id', $cart_item['product_id'], $cart_item, $cart_item_key );

            if ( $_product && $_product->exists() && $cart_item['quantity'] > 0 && apply_filters( 'woocommerce_cart_item_visible', true, $cart_item, $cart_item_key ) ) {
                $productTitle = $_product->get_title();

                array_push($this->items, $cart_item);

                if (!in_array($productTitle, $this->names))
                {
                    array_push($this->names, $productTitle);
                }
            }
        }

        for($i=0; $i<sizeof($this->items); $i++){
            $cartItemData = $this->items[$i];

            $productId = $cartItemData["product_id"];
            //$productKey = $cartItemData["distinctive_key"];
            
            $productKey = $cartItemData["key"];
            
            $name = $cartItemData["data"]->get_name();
            $price = get_post_meta($productId , '_price', true);
            $quantity = $cartItemData["quantity"];
            $previewImage = $cartItemData["userImagePreview"];
            $printSizeImage = $cartItemData["printSizeImage"];
            
            $cartItem = new CartItem($productId, $productKey, $name, $price, $quantity, $previewImage, $printSizeImage);
            
            array_push($returnArray, $cartItem);
        }
        
        return $returnArray;
    }
}
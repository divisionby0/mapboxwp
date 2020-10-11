<?php

class MiniCartElement
{
    private $iconUrl;
    private $deleteProductIconUrl;
    private $thumbnailsBaseUrl;
    private $currencySymbol;
    function __construct($thumbnailsBaseUrl, $currencySymbol)
    {
        $this->thumbnailsBaseUrl = $thumbnailsBaseUrl;
        $this->currencySymbol = $currencySymbol;

        $assetsFolder = get_stylesheet_directory_uri()."/assets/";
        $this->iconUrl = $assetsFolder."cart.svg";
        $this->deleteProductIconUrl = $assetsFolder."close.svg";

        $this->create();
    }

    private function create()
    {
        $cartItemsGetter = new GetFromCart();
        $cartItems = $cartItemsGetter->execute();

        $totalCost = $this->getCostTotal($cartItems);

        $totalCost = number_format($totalCost,0,"", " ");

        $totalItems = sizeof($cartItems);

        echo '<div class="cart">';
        echo '<div class="cart__btn">';
        echo '<img src="'.$this->iconUrl.'" alt="cart" class="cart__icon">';
        echo '<span class="cart__btnNumber cart__btnNumber-active">'.$totalItems.'</span>';
        echo '</div>';

        echo '<div class="cart__block">';
        echo '<div class="modalCart">';
        echo '<div class="modalCart__content">';
        echo '<div id="modalCartItems" class="modalCart__items">';

        for($i=0; $i<sizeof($cartItems); $i++){
            new MiniCartItemRenderer($cartItems[$i], $this->currencySymbol, $this->deleteProductIconUrl, $this->thumbnailsBaseUrl);
        }
        
        echo '</div>';
        
        echo '<div class="modalCart__sum">';
        echo '<p class="modalCart__sumText">';
        echo esc_attr( translate( 'Subtotal', 'woocommerce' ) ).': ';
        echo '<span id="modalCartSum" class="modalCart__sumNum">'.$totalCost.' <span class="woocommerce-Price-currencySymbol">'.$this->currencySymbol.'</span></span>';
        echo '</p></div>';

        $checkoutButtonText = esc_html( translate( 'Proceed to checkout', 'woocommerce' ) );

        echo '<a href="#" class="modalCart__makeOrder">'.$checkoutButtonText.'</a>';

        echo '</div></div></div></div>';
    }

    private function getCostTotal($cartItems){
        $costTotal = 0;

        for($i=0; $i<sizeof($cartItems); $i++){
            $cartItem = $cartItems[$i];

            $price = $cartItem->getPrice();
            $quantity = $cartItem->getQuantity();

            $cost = $price*$quantity;
            $costTotal+=$cost;
        }

        return $costTotal;
    }
}
<?php

class MiniCartItemRenderer
{
    function __construct($data, $currencySymbol, $deleteButtonImage, $thumbnailsBaseUrl)
    {
        $thumb = $thumbnailsBaseUrl.$data->getPreviewImage();
        
        echo '<div class="modalCart__item" data-key="'.$data->getKey().'">';
        echo '<img src="'.$thumb.'" alt="card" class="modalCart__itemImg">';
        echo '<div class="modalCart__itemContent">';
        echo '<p class="modalCart__itemName">'.$data->getName().'</p>';
        echo '<div class="modalCart__itemCountAndSumBlock">';
        echo '<div class="modalCart__itemCountBlock">';
        echo '<div class="modalCart__itemCountCircle modalCart__itemCountCircle-minus modalCart__itemCountCircle-gray"><span>-</span></div>';
        echo '<p class="modalCart__itemCountNum">'.$data->getQuantity().'</p>';
        echo '<div class="modalCart__itemCountCircle modalCart__itemCountCircle-plus"><span>+</span></div>';
        echo '</div>';
        echo '<p class="modalCart__itemSum">'.number_format($data->getPrice(),0,"", " ");
        echo ' <span class="woocommerce-Price-currencySymbol">'.$currencySymbol.'</span>';
        echo '</p>';
        echo '</div></div>';
        echo '<img src="'.$deleteButtonImage.'" alt="close" class="modalCart__close">';
        echo '</div>';

    }
}
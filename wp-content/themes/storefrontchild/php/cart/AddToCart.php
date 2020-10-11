<?php

class AddToCart
{
    private $data;
    private $productId;
    
    function __construct($data, $productId)
    {
        $this->data = $data;
        $this->productId = $productId;
    }
    
    public function execute(){
        $resultData = json_decode($this->data);
        $image = $resultData->image;
        $preview = $resultData->preview;

        $result = WC()->cart->add_to_cart( $this->productId, 1, 0, array(), array("userImagePreview"=>$preview, "printSizeImage"=>$image) );
        return array("productId"=>$this->productId, "preview"=>$preview, "result"=>$result);
    }
}
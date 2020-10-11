<?php

class CartItem
{
    private $productId;
    private $key;
    private $name;
    private $price;
    
    private $quantity;
    private $previewImage;
    private $printSizeImage;

    function __construct($productId, $key, $name, $price, $quantity, $previewImage, $printSizeImage)
    {
        $this->productId = $productId;
        $this->key = $key;
        $this->name = $name;
        $this->price = $price;
        $this->quantity = $quantity;
        $this->previewImage = $previewImage;
        $this->printSizeImage = $printSizeImage;
    }
    
    public function getProductId(){
        return $this->productId;
    }
    public function getKey(){
        return $this->key;
    }
    
    public function getName(){
        return $this->name;
    }
    public function getPrice(){
        return $this->price;
    }
    public function getQuantity(){
        return $this->quantity;
    }
    public function getPreviewImage(){
        return $this->previewImage;
    }
    public function getPrintSizeImage(){
        return $this->printSizeImage;
    }
}
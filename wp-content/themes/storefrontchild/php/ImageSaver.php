<?php

class ImageSaver
{
    protected $imageData;
    protected $filePath;
    protected $fileName;
    protected $randomValue;
    protected $folder;
    
    function __construct($imageBase64Data)
    {
        $this->randomValue = random_int(0,100000);
        $this->folder = get_home_path()."wp-content/uploads/customerMaps/";
        
        $base_to_php = explode(',', $imageBase64Data);
        $this->imageData = base64_decode($base_to_php[1]);

        $this->filePath = $this->getFilePath();
    }
    
    public function save(){
        file_put_contents($this->filePath, $this->imageData);
        
        $previewCreator = new ImagePreviewCreator($this->filePath, $this->randomValue, $this->getType(), $this->folder);
        $preview = $previewCreator->create();
        
        return json_encode(["result"=>"complete", "image"=>$this->fileName, "preview"=>$preview]);
    }
    
    protected function getFilePath(){
        $this->fileName = "map_".$this->randomValue.".png";
        return $this->folder.$this->fileName;
    }
    protected function getType(){
        return "map";
    }
}
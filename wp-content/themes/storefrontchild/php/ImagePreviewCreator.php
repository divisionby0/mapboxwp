<?php

class ImagePreviewCreator
{
    private $thumb;
    private $randomValue;
    private $type;
    private $folder;
    private $fileName;
    private $maxWidth = 400;
    private $maxHeight = 566;

    function __construct($srcImage, $randomValue, $type, $folder)
    {
        $this->randomValue = $randomValue;
        $this->type = $type;
        $this->folder = $folder;

        list($orig_width, $orig_height) = getimagesize($srcImage);

        $width = $orig_width;
        $height = $orig_height;

        if ($height > $this->maxHeight) {
            $width = ($this->maxHeight / $height) * $width;
            $height = $this->maxHeight;
        }

        if ($width > $this->maxWidth) {
            $height = ($this->maxWidth / $width) * $height;
            $width = $this->maxWidth;
        }

        $this->thumb = imagecreatetruecolor($width, $height);

        $image = imagecreatefrompng($srcImage);

        imagecopyresampled($this->thumb, $image, 0, 0, 0, 0, $width, $height, $orig_width, $orig_height);
    }
    
    public function create(){
        if($this->type == "map"){
            $this->fileName = "map_".$this->randomValue."_preview.jpg";
            $previewPath = $this->folder.$this->fileName;
        }
        else if($this->type == "astroMap"){
            $this->fileName = "astroMap_".$this->randomValue."_preview.jpg";
            $previewPath = $this->folder.$this->fileName;
        }
        else{
            die("undefined map type");
        }
        //$previewPath =  get_home_path()."wp-content/uploads/customerMaps/map_".$this->randomValue."_preview.jpg";

        imagejpeg($this->thumb, $previewPath);

        return $this->fileName;
    }
}
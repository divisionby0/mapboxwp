<?php

class AstroImageSaver extends ImageSaver
{
    protected function getFilePath(){
        $this->fileName = "astroMap_".$this->randomValue.".png";
        return $this->folder.$this->fileName;
    }

    protected function getType(){
        return "astroMap";
    }
}
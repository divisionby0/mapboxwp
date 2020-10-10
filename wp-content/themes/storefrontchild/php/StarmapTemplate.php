<?php


class StarmapTemplate
{
    private $name;
    private $preview;
    private $printSize;
    private $content;

    function __construct($name, $printSize, $preview, $content)
    {
        $this->name = $name;
        $this->printSize = $printSize;
        $this->preview = $preview;
        $this->content = $content;
    }
    
    function getPreview(){
        return $this->preview;
    }
    
    function getPrintSize(){
        return $this->printSize;
    }
    
    function getName(){
        return $this->name;
    }
    
    function getContent(){
        return $this->content;
    }
}
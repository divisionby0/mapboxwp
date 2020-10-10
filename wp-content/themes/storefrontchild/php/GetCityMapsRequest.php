<?php


class GetCityMapsRequest extends GetAstroMapsRequest
{
    protected function getPostType(){
        return "map_template";
    }
}
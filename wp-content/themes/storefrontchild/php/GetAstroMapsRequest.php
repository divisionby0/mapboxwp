<?php


class GetAstroMapsRequest
{
    private $args;
    
    function __construct()
    {
        $this->args = array(
            'post_type'=> $this->getPostType(),
            'areas'    => 'painting',
            'posts_per_page' => -1
        );
    }
    
    public function execute(){
        $query = new WP_Query($this->args);

        $xmlString = '<?xml version="1.0" encoding="utf-8"?><templates>';

        while ($query->have_posts()) {
            $query->the_post();
            $post_id = get_the_ID();
            $thumb = get_the_post_thumbnail_url();
            $printSize = "2481x3509";
            $title = get_the_title();
            $content = apply_filters('the_content', get_post_field('post_content', $post_id));

            $content = str_replace("<p>", "", $content);
            $content = str_replace("</p>", "", $content);

            $xmlString .='<template name="'.$title.'" printSize="'.$printSize.'" preview="'.$thumb.'" aspectRatio="1.414">';
            $xmlString .=$content;

            $xmlString .='</template>';
        }

        $xmlString .='</templates>';

        echo $xmlString;

        wp_die(); // выход нужен для того, чтобы в ответе не было ничего лишнего, только то что возвращает функция
    }
    
    protected function getPostType(){
        return "astro_map_template";
    }
}
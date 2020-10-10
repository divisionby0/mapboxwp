<?php


class AstroMapTemplateType
{
    function __construct()
    {
        register_post_type( 'astro_map_template',
            array(
                'labels' => array(
                    'name' => __( 'Шаблоны астро-карт' ),
                    'singular_name' => __( 'Шаблон астро-карты' )
                ),
                'public' => true,
                'has_archive' => false,
                'rewrite' => array('slug' => 'astro_map_template'),
                'supports' => array('title', 'editor', 'thumbnail'),
            )
        );
    }
}
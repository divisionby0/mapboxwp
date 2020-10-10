<?php

/**
 * Created by PhpStorm.
 * User: ilya
 * Date: 20.03.2020
 * Time: 18:48
 */
class MapTemplatePostType
{
    function __construct()
    {
        register_post_type( 'map_template',
            array(
                'labels' => array(
                    'name' => __( 'Шаблоны карт' ),
                    'singular_name' => __( 'Шаблон карты' )
                ),
                'public' => true,
                'has_archive' => false,
                'rewrite' => array('slug' => 'map_template'),
                'supports' => array('title', 'editor', 'thumbnail'),
            )
        );
    }
}
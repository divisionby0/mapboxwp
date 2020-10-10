<?php


class DisableWYSIWYGEditor
{
    function __construct()
    {
        add_filter('user_can_richedit', function( $default ){
            if( get_post_type() === 'map_template' || get_post_type() === 'astro_map_template' ) {
                return false;
            }
            return $default;
        });
    }
}
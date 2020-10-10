<?php


class DisableWYSIWYGEditorButtons
{
    function __construct()
    {
        if( get_post_type() === 'map_template' || get_post_type() === 'astro_map_template' ) {
            echo '<style type="text/css">
        #ed_toolbar{
            display:none!important;
        }
        </style>';
        }
    }
}
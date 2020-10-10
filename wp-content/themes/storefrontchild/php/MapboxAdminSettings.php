<?php


class MapboxAdminSettings
{
    function __construct()
    {
        add_filter('admin_init', function(){
            register_setting('general', 'mapboxAccessToken', 'esc_attr');
            add_settings_field('mapboxAccessToken_admin_field', '<label for="mapboxAccessToken">'.__('Mapbox access token' , 'mapboxAccessToken' ).'</label>' , function(){
                $value = get_option( 'mapboxAccessToken', '' );
                echo '<input type="text" id="mapboxAccessToken" name="mapboxAccessToken" value="' . $value . '" />';
            }, 'general');
        });

        
        add_filter('admin_init', function(){
            register_setting('general', 'mapTilerAccessToken', 'esc_attr');
            add_settings_field('mapTilerAccessToken_admin_field', '<label for="mapTilerAccessToken">'.__('Map tiler access token' , 'mapTilerAccessToken' ).'</label>' , function(){
                $value = get_option( 'mapTilerAccessToken', '' );
                echo '<input type="text" id="mapTilerAccessToken" name="mapTilerAccessToken" value="' . $value . '" />';
            }, 'general');
        });

        add_filter('admin_init', function(){
            register_setting('general', 'googleAPIsURL', 'esc_attr');
            add_settings_field('googleAPIsURL_admin_field', '<label for="googleAPIsURL">'.__('Google APIs geocoding url' , 'googleAPIsURL' ).'</label>' , function(){
                $value = get_option( 'googleAPIsURL', '' );
                echo '<input type="text" id="googleAPIsURL" name="googleAPIsURL" value="' . $value . '" />';
            }, 'general');
        });
        
        add_filter('admin_init', function(){
            register_setting('general', 'googleAPIsReverseURL', 'esc_attr');
            add_settings_field('googleAPIsReverseURL_admin_field', '<label for="googleAPIsReverseURL">'.__('Google APIs reverse geocoding url' , 'googleAPIsReverseURL' ).'</label>' , function(){
                $value = get_option( 'googleAPIsReverseURL', '' );
                echo '<input type="text" id="googleAPIsReverseURL" name="googleAPIsReverseURL" value="' . $value . '" />';
            }, 'general');
        });
        
        add_filter('admin_init', function(){
            register_setting('general', 'googleAPIsGeocodingToken', 'esc_attr');
            add_settings_field('googleAPIsGeocodingToken_admin_field', '<label for="googleAPIsGeocodingToken">'.__('Google APIs geocoding token' , 'googleAPIsGeocodingToken' ).'</label>' , function(){
                $value = get_option( 'googleAPIsGeocodingToken', '' );
                echo '<input type="text" id="googleAPIsGeocodingToken" name="googleAPIsGeocodingToken" value="' . $value . '" />';
            }, 'general');
        });
    }
}
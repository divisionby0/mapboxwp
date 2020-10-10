<?php
/**
 * Template used to display post content on single pages.
 *
 * @package storefront
 */

?>
<article id="post-<?php the_ID(); ?>" <?php post_class(); ?>>

	<?php
	do_action( 'storefront_single_post_top' );
	do_action( 'storefront_single_post' );
	do_action( 'storefront_single_post_bottom' );
	?>

</article><!-- #post-## -->

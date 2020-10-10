<?php
/**
 * The template for displaying 404 pages (not found).
 *
 * @package storefront
 */

get_header("404"); ?>
	<div id="primary" class="content-area">

		<main id="main" class="site-main" role="main">

			<div class="error-404 not-found">

				<div class="page-content">

					<header class="page-header">
						<h1 class="page-title page-title-404"><?php esc_html_e( 'Oops! That page can&rsquo;t be found.', 'storefront' ); ?></h1>
					</header><!-- .page-header -->

					<img src="<?php echo get_stylesheet_directory_uri();?>/assets/404.png" alt="404" class="error__img">

				</div><!-- .page-content -->
			</div><!-- .error-404 -->

		</main><!-- #main -->
	</div><!-- #primary -->
</div></div>
<?php
getCustomFooter();

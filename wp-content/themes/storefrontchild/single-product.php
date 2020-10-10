<?php

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}
get_header( 'shop' );

global $post;
$catName = "";
$terms = get_the_terms( $post->ID, 'product_cat' );
foreach ($terms as $term) {
	$catName = get_the_category_by_ID($term->term_id);
	break;
}

$templateUrl = get_stylesheet_directory_uri();
$shelfImageUrl = $templateUrl."/assets/shelf.png";

$starsConstructorStepOneText = "1. Выберите шаблон карты звездного неба";
$citymapConstructorStepOneText = "1. Выберите шаблон географической карты";

$stepOneText = "";

switch($catName){
	case "Stars":
		$stepOneText = $starsConstructorStepOneText;
		break;
	case "Map":
		$stepOneText = $citymapConstructorStepOneText;
		break;
}
?>
	<div data-id="patterns" class="site-content site-content-patterns" tabindex="-1">
		<div class="col-full">

			<div class="woocommerce"></div>
			<div class="content-area">
				<main class="site-main" role="main">

					<article id="post-<?php echo $post->ID;?>" class="post-<?php echo $post->ID;?> page type-page status-publish hentry">
						<div class="entry-content">
							<button href="#constructor" class="index__headerContentBtn index__headerContentBtn-mobile js-scroll-link">Создать карту</button>
							<h2 class="index__headline"><?php echo $stepOneText;?></h2>

							<div id="templatesListContainer" class="index__patternBlock"></div>
						</div>
					</article>
				</main>
			</div>
		</div>
	</div>

	<?php
		do_action( 'woocommerce_before_main_content' );
	?>
		<?php while ( have_posts() ) : ?>
			<?php the_post(); ?>

			<?php wc_get_template_part( 'content', 'single-product' ); ?>

		<?php endwhile; // end of the loop. ?>

	<?php
		do_action( 'woocommerce_after_main_content' );
	?>

	<?php
		//do_action( 'woocommerce_sidebar' );
	?>

<?php
get_footer( 'shop' );

/* Omit closing PHP tag at the end of PHP files to avoid "headers already sent" issues. */

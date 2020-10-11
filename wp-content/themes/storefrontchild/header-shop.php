<!doctype html>
<html <?php language_attributes(); ?>>
<head>
    <meta charset="<?php bloginfo( 'charset' ); ?>">
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=2.0">
    <link rel="profile" href="http://gmpg.org/xfn/11">
    <link rel="pingback" href="<?php bloginfo( 'pingback_url' ); ?>">

    <?php wp_head(); ?>
</head>

<?php

global $post;
$catName = "";
$terms = get_the_terms( $post->ID, 'product_cat' );
foreach ($terms as $term) {
    $catName = get_the_category_by_ID($term->term_id);
    break;
}

$content_post = get_post($post->ID);
$content = $content_post->post_content;
?>

<body <?php body_class(); ?>>

<?php wp_body_open(); ?>

<?php do_action( 'storefront_before_site' ); ?>
<div id="page" class="hfeed site">
    <?php
    do_action( 'storefront_before_header' );
    ?>
    <?php
    $class = "site-header index__header";

    $templateUrl = get_stylesheet_directory_uri();
    $cartImageUrl = $templateUrl."/assets/cart.svg";
    $closeImageUrl = $templateUrl."/assets/close.svg";

    $cardIndexPageImage = $templateUrl."/assets/card_big.png";
    $headerScrollDownImage = $templateUrl."/assets/scrollBtn.png";

    $style = " background-size: cover; background-repeat:no-repeat; background-position:center; background:url(&#39;";

    if($catName === "Map"){
        $style.=get_stylesheet_directory_uri()."/assets/cityBg.png";
        $cardIndexPageImage = $templateUrl."/assets/card_city_big.png";
    }
    else{
        $style.=get_stylesheet_directory_uri()."/assets/starBg.png";
    }
    $style.="&#39;)";
    ?>
    <header id="masthead" class="<?php echo $class;?>" role="banner" style="<?php storefront_header_styles(); echo $style;?>;">
        <div class="index__headerWrapper">
            <div class="site-branding">
                <div class="beta site-title">
                    <a href="<?php echo get_site_url(); ?>" class="site-title-desktop noselect" rel="home"><?php echo get_bloginfo( 'name' ); ?></a>
                    <a href="<?php echo get_site_url(); ?>" class="site-title-mobile noselect" rel="home"><?php echo get_bloginfo( 'name' ); ?></a>
                </div>
            </div>

            <div class="index__headerSwitcherBlock">
                <span class="index__headerSwitcherThumb index__headerSwitcherThumb-right"></span>
                <p class="index__headerSwitcherBlockText noselect">Звёзды</p>
                <p class="index__headerSwitcherBlockText noselect index__headerSwitcherBlockText-active">Города</p>
            </div>

            <div class="cart">
                <div class="cart__btn">
                    <img src="<?php echo $cartImageUrl;?>" alt="cart" class="cart__icon">
                    <span class="cart__btnNumber cart__btnNumber-active">2</span>
                </div>
                <div class="cart__block">
                    <div class="modalCart" onclick="void(0)">
                        <div class="modalCart__content">
                            <div class="modalCart__items">
                                <div class="modalCart__item">
                                    <img src="<?php echo $cartImageUrl;?>" alt="card" class="modalCart__itemImg">
                                    <div class="modalCart__itemContent">
                                        <p class="modalCart__itemName">Базовая карта звёздного неба</p>
                                        <div class="modalCart__itemCountAndSumBlock">
                                            <div class="modalCart__itemCountBlock">
                                                <div class="modalCart__itemCountCircle modalCart__itemCountCircle-minus modalCart__itemCountCircle-gray"><span>-</span></div>
                                                <p class="modalCart__itemCountNum">1</p>
                                                <div class="modalCart__itemCountCircle modalCart__itemCountCircle-plus"><span>+</span></div>
                                            </div>
                                            <p class="modalCart__itemSum">2 500 <span class="woocommerce-Price-currencySymbol">₽</span></p>
                                        </div>
                                    </div>
                                    <img src="<?php echo $closeImageUrl;?>" alt="close" class="modalCart__close">
                                </div>
                                <div class="modalCart__item">
                                    <img src="<?php echo $cartImageUrl;?>" alt="card" class="modalCart__itemImg">
                                    <div class="modalCart__itemContent">
                                        <p class="modalCart__itemName">Базовая карта звёздного неба</p>
                                        <div class="modalCart__itemCountAndSumBlock">
                                            <div class="modalCart__itemCountBlock">
                                                <div class="modalCart__itemCountCircle modalCart__itemCountCircle-minus modalCart__itemCountCircle-gray"><span>-</span></div>
                                                <p class="modalCart__itemCountNum">1</p>
                                                <div class="modalCart__itemCountCircle modalCart__itemCountCircle-plus"><span>+</span></div>
                                            </div>
                                            <p class="modalCart__itemSum">2 500 <span class="woocommerce-Price-currencySymbol">₽</span></p>
                                        </div>
                                    </div>
                                    <img src="<?php echo $closeImageUrl;?>" alt="close" class="modalCart__close">
                                </div>
                            </div>
                            <div class="modalCart__sum">
                                <p class="modalCart__sumText">Подытог: <span class="modalCart__sumNum">5 000 <span class="woocommerce-Price-currencySymbol">₽</span></span></p>
                            </div>
                            <a href="#" class="modalCart__makeOrder">Оформить заказ</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="wrapper wrapper-index">
            <div class="index__headerContent">
                <div class="index__headerContentTextBlock">
                    <h1 class="index__headerContentHeadline noselect"><?php echo $content;?></h1>
                    <div class="index__headerMobileImgBlock">
                        <p class="index__headerContentText noselect"><?php echo get_the_excerpt();?></p>
                        <div class="index__headerImgBlock index__headerImgBlock-mobile">
                            <img src="<?php echo $cardIndexPageImage;?>" alt="card" class="index__headerImgBlockImg">
                        </div>
                    </div>
                    <button href="#patterns" class="index__headerContentBtn js-scroll-link">Создать карту</button>
                </div>
                <div class="index__headerImgBlock">
                    <img src="<?php echo $cardIndexPageImage;?>" alt="card" class="index__headerImgBlockImg">
                </div>
            </div>
        </div>
        <div class="index__headerScrollBtnBlock">
            <img src="<?php echo $headerScrollDownImage; ?>" alt="scrollBtn" href="#patterns" class="index__headerScrollBtn  js-scroll-link">
        </div>
    </header>

    <?php
    do_action( 'storefront_before_content' );
    ?>
    <!-- todo убрать и сделать как в верстке -->
    <!--<div id="content" class="site-content" tabindex="-1">
        <div class="col-full">
    -->
<?php
do_action( 'storefront_content_top' );

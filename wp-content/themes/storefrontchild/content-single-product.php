<?php
defined( 'ABSPATH' ) || exit;
global $product;
?>
<div id="product-<?php the_ID(); ?>" data-productId="<?php the_ID(); ?>" <?php wc_product_class( '', $product ); ?>>
	<div class="constructor__block">
		<div id="templateElement" class="constructor__resultBlock">

		</div>

		<div class="constructor__settingsBlock" id="templateSettingsContainer">
			<div class="constructor__settingsTextAndInputBlock">
				<p class="constructor__settingsHeadline">
					Место события
				</p>
				<input type="text" id="cityInput" placeholder="Укажите место события" autocomplete="off">

				<span class="dropdown-menu ap-with-places" role="listbox" id="placesListbox" style="position: absolute; top: 100%; z-index: 100; left: 0px; right: auto; display: none;">
					<div id="places">
						<div style="width: 100%; background-color: lightgray; min-height:20px; height:auto; padding: 2px; border: 1px solid gray; cursor: pointer;">
							<div class="noselect" data-city="Москва" style="display:block; float:left; width: 100%; font-size: 0.9em;">Москва, Россия</div>
						</div>
					</div>
				</span>
			</div>

			<div class="constructor__settingsRow">
				<div class="constructor__settingsTextAndInputBlock constructor__settingsTextAndInputBlock-date">
					<p class="constructor__settingsHeadline">
						Дата
					</p>
					<input type="date" id="datepicker" class=" hasDatepicker" style="text-align: center;">
				</div>
				<div class="constructor__settingsTextAndInputBlock constructor__settingsTextAndInputBlock-time">
					<p class="constructor__settingsHeadline">
						Время
					</p>
					<input class="timepicker" type="text" id="timeInput" style="text-align: center;">
				</div>
			</div>

			<button id="currentTimeButton" class="constructor__settingsNowBtn" type="button">
				Сейчас
			</button>
			<div class="col-md-4">
				<input id="user_date" size="36" onchange="get_user_obs()" value="" type="text" style="display: none;">
				<input id="user_dec" value="<" onclick="dec_button()" type="button" style="display: none;">
				<input id="user_inc" value=">" onclick="inc_button()" type="button" style="display: none;">
				<input id="geoloc" value="Use My Location" onclick="getGeoPos()" type="button" style="display: none;">
			</div>

			<p class="constructor__settingsHeadline">
				На карте будут
			</p>

			<div class="constructor__settingSelectorsBlock">
				<div class="constructor__settingSelectorsColumn">
					<div class="constructor__settingSelectorsItem">
						<p class="constructor__settingSelectorsItemText">
							Созвездия
						</p>
						<input id="constellationLinesButton" checked="" type="checkbox">
					</div>
					<div class="constructor__settingSelectorsItem">
						<p class="constructor__settingSelectorsItemText">
							Координаты
						</p>
						<input id="coordinatesButton" type="checkbox" checked="" data-onstyle="default">
					</div>
					<div class="constructor__settingSelectorsItem">
						<p class="constructor__settingSelectorsItemText">
							Окружность
						</p>
						<input id="circleBorderButton" type="checkbox" checked="" data-onstyle="default">
					</div>
					<div class="constructor__settingSelectorsItem">
						<p class="constructor__settingSelectorsItemText">
							Ч/б звёзды
						</p>
						<input id="starsMultiColorsButton" type="checkbox" checked="">
					</div>
				</div>

				<div class="constructor__settingSelectorsColumn constructor__settingSelectorsColumn-right">
					<div class="constructor__settingSelectorsItem">
						<p class="constructor__settingSelectorsItemText">Дата</p>
						<input id="dateButton" type="checkbox" checked="" data-onstyle="default">
					</div>
					<div class="constructor__settingSelectorsItem">
						<p class="constructor__settingSelectorsItemText">Место</p>
						<input id="placeButton" type="checkbox" checked="" data-onstyle="default">
					</div>
					<div class="constructor__settingSelectorsItem">
						<p class="constructor__settingSelectorsItemText">Рамка</p>
						<input id="borderButton" type="checkbox" checked="" data-onstyle="default">
					</div>
					<div class="constructor__settingSelectorsItem">
						<p class="constructor__settingSelectorsItemText">Время</p>
						<input id="timeButton" type="checkbox" checked="" data-onstyle="default">
					</div>
				</div>
			</div>

			<div class="row">
				<div class="col-md-3" style="display: none!important;">
					<input id="user_dsos" onchange="get_user_obs()" type="checkbox"> DSOs &nbsp; &nbsp;
				</div>

				<div class="col-md-4" style="display: none!important;">
					<input id="user_starlab" onchange="get_user_obs()" type="checkbox"> Имена звезд
				</div>

				<div class="col-md-4" style="display: none!important;">
					<input id="user_conlab" onchange="get_user_obs()" type="checkbox"> Имена созвездий
				</div>
			</div>

			<div class="row" style="display: none;">
				<div class="col-md-4">
					<select name="increment" id="increment" style="display: none;">
						<option value="1" selected="selected">hour</option>
						<option value="24">day</option>
						<option value="168">week</option>
						<option value="720">month</option>
						<option value="8760">year</option>
					</select>
				</div>
			</div>

			<div class="col-md-12" style="display: none;">
				<div class="col-md-6">
					<input id="user_lat" class="form-control" onchange="get_user_obs()" value="" type="text" placeholder="Широта">
				</div>
				<div class="col-md-6">
					<input id="user_lon" class="form-control" onchange="get_user_obs()" value="" type="text" placeholder="Долгота">
				</div>
			</div>

			<div class="constructor__settingsTextAndInputBlock constructor__settingsTextAndInputBlock-bigInput">
				<p class="constructor__settingsHeadline">Текст на вашей карте</p>
				<input id="text_1_input" type="text" placeholder="Шаблон 1 Заголовок">
				<textarea id="text_2_input" type="text" placeholder="Шаблон 1 Текст"></textarea>
			</div>
		</div>
	</div>

	<div class="summary entry-summary">
		<?php
		//do_action( 'woocommerce_single_product_summary' );
		?>
	</div>
</div>

<button id="addToCartButton" class="index__headerContentBtn constructor__blockAddToCartBtn" type="button">Добавить в корзину</button>

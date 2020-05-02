<?php

	namespace SingleLink;

	class Themes {
		function __construct() {
			add_shortcode('theme_select', 'theme_select');
		}

		function get_theme_css($theme_id) {
			if(!$theme_id) {
				$profile = get_profile_settings();
				$theme_id = $profile['selected_theme'];
			}
			
			$params = array(
				'where'   => 'ID=' . $theme_id,
				'limit'   => 1  // Return all rows
			);
			
			$theme = pods( 'singlelink_theme' )->find($params);
			
			while($theme->fetch()) {
				
				$textColor = $theme->display('secondary_color');
				
				if($theme->display('text_color')) {
					$textColor = $theme->display('text_color');
				}
				
				$styles = '
				<style type="text/css">
					.content {
						background: ' . $theme->display('primary_color') . ';
					}
					
					.blocks a {
						background: ' . $theme->display('secondary_color') . ';
						color: ' . $theme->display('primary_color') . ';
					}
					
					.headline {
						color: ' . $textColor . ';
					}
					
					.subtitle {
						opacity: .65;
						color: ' . $textColor . ';
					}
				</style>';
				
				$styles .= "<style type='text/css'>" . $theme->display('custom_styles') . "</style>";
				
				$colour = $theme->display('primary_color');
				$rgb = HTMLToRGB($colour);
				$hsl = RGBToHSL($rgb);
				if($hsl->lightness < 200) {
				  // background is dark
					$styles .= '
					<style type="text/css">
						img {
							filter: grayscale(1) invert(1) !important;
						}
					</style>';
				}
		
				return $styles;
			}
			return;
			
		}
		
		function theme_select($profile_id) {
			
			if(!empty($_POST) && !empty($_POST['selectedTheme'])) {
				// Update changes to profile selected theme
				get_bare_profile_settings()->save('selected_theme', $_POST['selectedTheme']);
			}
			
			// Get current profile settings
			$profile = get_profile_settings();
			if(!$profile) return 'no profile :(';
			
			$content = '';
			$styles = '
			<style type="text/css">
				.theme-select {
					display: flex;
					flex-direction: row;
					flex-wrap: wrap;
					background: #FFF;
					border-radius: 8px;
					min-height: 30px;
					padding: 20px;
					box-sizing: border-box;
				}
				
				.theme {
					display: flex;
					flex-direction: column;
					width: 100px;
					height: 100px;
					margin: 0 10px 10px 0;
					padding: 8px;
					border-radius: 8px;
					box-shadow: inset 0 0 0 0 rgba(255,255,255,0);
					transition: .2s ease-in-out;
					overflow: hidden;
					position: relative;
					cursor: pointer;
				}
				
				.click-overlay {
					position: absolute;
					top: 0;
					left: 0;
					right: 0;
					bottom: 0;
					width: 100%;
					height: 100;
					cursor: pointer;
					z-index: 1;
				}
				
				.theme.selected {
					box-shadow: inset 0 0 0 2px rgba(0,0,0,.15);
				}
				
				.theme-select-label {
					margin: 0 0 10px 0;
					text-align: left;
					font-size: 20px;
					font-weight: 700;
				}
				
				.theme-preview {
					display: flex;
					justify-content: center;
					align-items: center;
					flex: 1;
					border-radius: 8px;
				}
				
				.theme-accent {
					display: flex;
					width: 42px;
					height: 42px;
					border-radius: 100px;
					justify-content: center;
					align-items: center;
				}
				
				.theme-accent i {
					font-size: 40px;
					color: rgba(0,0,0,.5);
				}
				
				.theme-background {
					display: flex;
					justify-content: center;
					align-items: center;
					border-radius: 4px;
					background: rgba(0,0,0,.025);
					flex: 1;
				}
			</style>';
			$scripts = '
				<script type="text/javascript">
					function submitForm(action, method, input) {
						var form;
						form = jQuery("<form />", {
							action: action,
							method: method,
							style: "display: none;"
						});
						if (typeof input !== "undefined" && input !== null) {
							jQuery.each(input, function (name, value) {
								jQuery("<input />", {
									type: "hidden",
									name: name,
									value: value
								}).appendTo(form);
							});
						}
						form.appendTo("body").submit();
					}
					
					setTimeout(function() {
						var $ = jQuery;
						var selectedTheme = ' . $profile['selected_theme'] . ';
						$(".theme").on("click", function(event) {
							if(!$(event.target.parentElement).attr("theme-id")) return;
							$(".theme").removeClass("selected");
							$(event.target.parentElement).addClass("selected");
							selectedTheme = $(event.target.parentElement).attr("theme-id");
							submitForm("' . get_permalink(get_the_ID()) . '", "POST", {
								selectedTheme: selectedTheme
							});
						});
					}, 500);
				</script>';
			
			// Fetch all profile themes
			$theme = pods( 'singlelink_theme' )->find();
		
			$content .= '<h3 class="theme-select-label">Themes</h3>';
			$content .= '<div class="theme-select">';
				// Loop through the records returned
				while ( $theme->fetch() ) {
					
					if($profile['selected_theme'] == $theme->display('id')) {
						$themeClass = 'theme selected';
					} else {
						$themeClass = 'theme';
					}
					
					$textColor = $theme->display('secondary_color');
				
					if($theme->display('text_color')) {
						$textColor = $theme->display('text_color');
					}
					
					$content .= '<div class="' . $themeClass . '" theme-id="' . $theme->display('id') . '">';
						$content .= '<div class="click-overlay"></div>';
						$content .='<div class="theme-background" style="background: ' . $theme->display('primary_color') . '">';
							$content .= '<div class="theme-accent" style="box-shadow: 0 0 0 2px ' . $textColor . '; background: ' . $theme->display('secondary_color') . '"></div>';
						$content .= '</div>';
					$content .= '</div>';
				}
					// Add custom theme icon
					$content .= '<div class="theme">';
						$content .= '<div class="theme-background">';
							$content .= '<div class="theme-accent"><i class="fa fa-cog"></i></div>';
						$content .= '</div>';
					$content .= '</div>';
					
			$content .= '</div>';
			
			
			return $content . $styles . $scripts;
			
		}
		
		function HTMLToRGB($htmlCode)
		  {
			if($htmlCode[0] == '#')
			  $htmlCode = substr($htmlCode, 1);
		
			if (strlen($htmlCode) == 3)
			{
			  $htmlCode = $htmlCode[0] . $htmlCode[0] . $htmlCode[1] . $htmlCode[1] . $htmlCode[2] . $htmlCode[2];
			}
		
			$r = hexdec($htmlCode[0] . $htmlCode[1]);
			$g = hexdec($htmlCode[2] . $htmlCode[3]);
			$b = hexdec($htmlCode[4] . $htmlCode[5]);
		
			return $b + ($g << 0x8) + ($r << 0x10);
		  }
		
		function RGBToHSL($RGB) {
			$r = 0xFF & ($RGB >> 0x10);
			$g = 0xFF & ($RGB >> 0x8);
			$b = 0xFF & $RGB;
		
			$r = ((float)$r) / 255.0;
			$g = ((float)$g) / 255.0;
			$b = ((float)$b) / 255.0;
		
			$maxC = max($r, $g, $b);
			$minC = min($r, $g, $b);
		
			$l = ($maxC + $minC) / 2.0;
		
			if($maxC == $minC)
			{
			  $s = 0;
			  $h = 0;
			}
			else
			{
			  if($l < .5)
			  {
				$s = ($maxC - $minC) / ($maxC + $minC);
			  }
			  else
			  {
				$s = ($maxC - $minC) / (2.0 - $maxC - $minC);
			  }
			  if($r == $maxC)
				$h = ($g - $b) / ($maxC - $minC);
			  if($g == $maxC)
				$h = 2.0 + ($b - $r) / ($maxC - $minC);
			  if($b == $maxC)
				$h = 4.0 + ($r - $g) / ($maxC - $minC);
		
			  $h = $h / 6.0; 
			}
		
			$h = (int)round(255.0 * $h);
			$s = (int)round(255.0 * $s);
			$l = (int)round(255.0 * $l);
		
			return (object) Array('hue' => $h, 'saturation' => $s, 'lightness' => $l);
		  }
	}

?>
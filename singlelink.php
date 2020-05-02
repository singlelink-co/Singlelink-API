<?php
/*
   Plugin Name: SingleLink
   Plugin URI: https://singlelink.co
   description: Bridge your content and consumers together with just one link.
   Version: 0.9.0
   Author: NCLA Group
   Author URI: https://nclagroup.org
   License: unlicensed
   */
/*
if ( !class_exists( 'SingleLink' ) ) {
	class SingleLink
	{
       function init() {
		   // Require other functions
		   require('');
	   }
	}
}

SingleLink::init();
*/

namespace SingleLink;

class core {
	function init() {
		include '';
	}
}

// Launch SingleLink
\SingleLink\core::init();

 ?>
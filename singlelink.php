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
		// Setup Version Management
		include_once( plugin_dir_path( __FILE__ ) . '/includes/version-management.php' );
		$updater = new \SingleLink\Version_Management( __FILE__ );
		$updater->set_username( 'Neutron-Creative' );
		$updater->set_repository( 'SingleLink' );
		$updater->authorize( '3fe4f97f2f19ab79059619cccc48a135331369cc' );
		$updater->initialize();
	}
}

// Launch SingleLink
\SingleLink\core::init();

 ?>
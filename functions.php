<?php

function rest_theme_scripts() {

	wp_enqueue_style( 'style', get_stylesheet_uri() );

	$base_url  = esc_url_raw( home_url() );
	$base_path = rtrim( parse_url( $base_url, PHP_URL_PATH ), '/' );
	if ( defined( 'RT_VUE_DEV' ) && RT_VUE_DEV ) {
		wp_enqueue_script( 'rest-theme-vue', 'http://localhost:8080/dist/build.js', array( 'jquery' ), '1.0.0', true );
	} else {
		wp_enqueue_script( 'rest-theme-vue', get_template_directory_uri() . '/dist/build.js', array( 'jquery' ), '1.0.0', true );
	}
	wp_localize_script( 'rest-theme-vue', 'rtwp', array(
		'root'      => esc_url_raw( rest_url() ),
		'base_url'  => $base_url,
		'base_path' => $base_path ? $base_path . '/' : '/',
		'nonce'     => wp_create_nonce( 'wp_rest' ),
		'site_name' => get_bloginfo( 'name' ),
	) );
}

add_action( 'wp_enqueue_scripts', 'rest_theme_scripts' );

if ( function_exists( 'register_nav_menus' ) ) {
	register_nav_menus(
		array(
		'primary-menu' => __( 'Primary Menu' ),
		'secondary-menu' => __( 'Secondary Menu' ),
		)
	);
}

add_filter( 'excerpt_more', '__return_false' );

add_action( 'after_setup_theme', 'rt_theme_setup' );

function rt_theme_setup() {

	add_theme_support( 'post-thumbnails' );

}

function rt_custom_rewrite_rule() {
	global $wp_rewrite;
	$wp_rewrite->front               = $wp_rewrite->root . 'blog/';
	$wp_rewrite->permalink_structure = $wp_rewrite->root . 'blog/%postname%/';
	$wp_rewrite->page_structure      = $wp_rewrite->root . 'page/%pagename%/';
	$wp_rewrite->add_rule( '^blog$', 'index.php', 'top' );

}
add_action( 'init', 'rt_custom_rewrite_rule' );

//Forcing permalink structure
add_action( 'permalink_structure_changed', 'rt_forcee_perma_struct', 10, 2 );

function rt_forcee_perma_struct( $old, $new ) {

	update_option( 'permalink_structure', 'blog/%postname%' );

}
// Polyfill for wp_title()
add_filter( 'wp_title','rt_vue_title', 10, 3 );

function rt_vue_title( $title, $sep, $seplocation ) {

	if ( false !== strpos( $title, __( 'Page not found' ) ) ) {
		$replacement = ucwords( str_replace( '/', ' ', $_SERVER['REQUEST_URI'] ) );
		$title       = str_replace( __( 'Page not found' ), $replacement, $title );
	}
	return $title;
}

// Include featured image in rest api post json response
add_action( 'rest_api_init', 'rt_add_thumbnail' );

function rt_add_thumbnail() {
	// Add featured image
	register_rest_field( 'post',
		'featured_image_src', //NAME OF THE NEW FIELD TO BE ADDED - you can call this anything
		array(
			'get_callback'    => 'get_image_src',
			'update_callback' => null,
			'schema'          => null,
			 )
	);
}
// Get featured image
function get_image_src( $object, $field_name, $request ) {

	$feat_img_array['full'] = wp_get_attachment_image_src( $object['featured_media'], 'full', false );
	$feat_img_array['thumbnail'] = wp_get_attachment_image_src( $object['featured_media'], 'thumbnail', false );
	$feat_img_array['srcset'] = wp_get_attachment_image_srcset( $object['featured_media'] );
	$image = is_array( $feat_img_array ) ? $feat_img_array : 'false';
	return $image;

}

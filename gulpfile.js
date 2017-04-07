// Load plugins
var gulp			= require( 'gulp' );

// Plugins related to styles
var sass			= require( 'gulp-sass' );
var autoprefixer	= require( 'gulp-autoprefixer' ); // Concatenates JS files
var combineMq		= require( 'gulp-combine-mq' ); // Combine media queries


// Plugins related to JS
var concat			= require( 'gulp-concat' ); // Concatenates JS files
var uglify			= require( 'gulp-uglify' ); // Minifies JS files


// Plugin to Notify after task completed
var notify			= require( 'gulp-notify' ); // Notify after completing tasks


// Plugins to Check text domain
var checktextdomain = require( 'gulp-checktextdomain' ); //Check textdomain


// Plugins realted image.
var imagemin		= require( 'gulp-imagemin' ); // Minify PNG, JPEG, GIF and SVG images with imagemin.


// Plugins related to language translation
var wpPot			= require( 'gulp-wp-pot' );
var sort			= require( 'gulp-sort' ); // Recommended to prevent unnecessary changes in pot-file.


// Plugins to watch tasks
var watch			= require( 'gulp-watch' );

//plugin to copy JS file

var gulpCopy = require('gulp-copy');


// Browsers you care about for autoprefixing.
var autoprefixer_browsers = ['last 2 versions', 'ie 9', 'ios 6', 'android 4'];


var gulp = require('gulp');
var path = require('path');
var swPrecache = require('sw-precache');

// Styles
gulp.task( 'sass', function() {
  return gulp.src( './sass/*.scss' )
	.pipe( autoprefixer( autoprefixer_browsers ) )
	.pipe( sass.sync().on( 'error', sass.logError ) )
	.pipe( combineMq() )
	.pipe( gulp.dest( '.' ) )
	.pipe( notify( {
		message: 'TASK: "sass" Completed!',
		onLast : true
	} ) );
} );


// Site Scripts
gulp.task( 'scripts', function() {
	return gulp.src( [
		'js/src/*.js','js/vendor/*.js'
	] )
	.pipe( concat( 'main.min.js' ) )
	.pipe( uglify() )
	.pipe( gulp.dest( './js/' ) )
	.pipe( notify( {
		message: 'TASK: "scripts" Completed!',
		onLast : true
	} ) );
} );


// Images
gulp.task( 'images', function() {
  return gulp.src( 'assets/img/*' )
	.pipe( imagemin( {
		optimizationLevel: 7,
		progressive      : true,
		interlaced       : true
	} ) )
	.pipe( gulp.dest( 'assets/img' ) )
	.pipe( notify( {
		message: 'TASK: "images" Completed!',
		onLast : true
	} ) );
} );


// Watch tasks
gulp.task( 'watch', function() {
	gulp.watch( './sass/**/*.{scss,sass}', ['sass'] );
	gulp.watch( ['./js/src/*.js', './js/vendor/*.js'], ['scripts'] );
} );
//Copy
gulp.task('copy', function () {
	gulp.src('node_modules/sw-toolbox/sw-toolbox.js')
		.pipe(gulp.dest('js/vendor'))
});


gulp.task('service-worker', function(callback) {

  var paths = {
  	src: './'
  };
  swPrecache.write(path.join(paths.src, 'service-worker.js'), {
    staticFileGlobs: [
		'index.html',
		'style.css',
		'js/main.min.js',
		'dist/build.js'
    ],
    importScripts: [
      'js/vendor/sw-toolbox.js',
      'sw/toolbox-script.js'
    ],
    stripPrefix: paths.src
  }, callback);
});
// Default tasks
gulp.task('config', ['copy', 'images','service-worker' ,'sass' ,'scripts' ]);
gulp.task( 'default', ['watch'] );

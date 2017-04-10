// Load plugins
var gulp			= require( 'gulp' );

var sass			= require( 'gulp-sass' );
var autoprefixer	= require( 'gulp-autoprefixer' ); // Concatenates JS files
var combineMq		= require( 'gulp-combine-mq' ); // Combine media queries

// Plugin to Notify after task completed
var notify			= require( 'gulp-notify' ); // Notify after completing tasks

// Plugins to watch tasks
var watch			= require( 'gulp-watch' );

// Browsers you care about for autoprefixing.
var autoprefixer_browsers = ['last 2 versions', 'ie 9', 'ios 6', 'android 4'];


var gulp = require('gulp');
var path = require('path');

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


// Watch tasks
gulp.task( 'watch', function() {
	gulp.watch( './sass/**/*.{scss,sass}', ['sass'] );
} );
//Copy


gulp.task( 'default', ['watch'] );

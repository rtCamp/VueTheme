<p align="center">
<a href="https://rtcamp.com" target="_blank"><img width="200"src="https://rtcamp.com/wp-content/uploads/2018/04/rtcamp-logo-1.svg"></a>
</p>


# VueTheme - WordPress Theme + VueJs
WordPress theme using WP REST API and [VueJs 2](http://vuejs.org) by [rtCamp](https://rtcamp.com).
This theme is base theme for WordPress theme developers.

## How to use?
1. Go to your WP theme directory (in `/wp-content/theme/`)
2. Clone / Download this repo
3. Activate your theme from WordPress theme's backend
4. This theme will display menu which has set display location to Primary Menu. 
5. Make sure you fulfill all the requirements before using theme. (See [Requirements](#requirements))

## How to use it for development?
1. Go to your WP theme directory & navigate to VueTheme.
2. Install dependencies `npm install`
1. Make sure you add `define( 'RT_VUE_DEV', true );` in `wp-config.php` to get asset files from webpack dev server.
3. To start dev server with hot reload `npm run dev`
4. To create build for production with minification `npm run build`

## Requirements
* [WP API Menus plugin](https://wordpress.org/plugins/wp-api-menus/)
* WordPress Version 4.7+

## Frameworks / Packages used
* [Vue 2](http://vuejs.org)
* [Vue-Router](https://github.com/vuejs/vue-router)
* [Vuex](https://github.com/vuejs/vuex)
* [Axios](https://github.com/mzabriskie/axios)
* [Babel](https://babeljs.io)
* [Webpack](https://webpack.js.org/)
* [Foundation CSS Grid](http://foundation.zurb.com/grid.html)
* [Gulp](http://gulpjs.com/)

<p align="center">
<a href="https://wordpress.org" target="_blank"><img width="200"src="https://s.w.org/about/images/logos/wordpress-logo-hoz-rgb.png"></a>
<a href="https://vuejs.org" target="_blank"><img width="50"src="https://vuejs.org/images/logo.png"></a>
</p>

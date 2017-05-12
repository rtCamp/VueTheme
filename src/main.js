import Vue from 'vue';
import VueRouter from 'vue-router';
import Vuex from 'vuex';
import { HTTP as axios } from './axios/axios';
import VueProgressiveImage from 'progressive-image/dist/vue';

Vue.prototype.$http = axios;

Vue.use( Vuex );
Vue.use( VueRouter );
Vue.use( VueProgressiveImage, {
	removePreview: true
} );

Vue.config.debug = true;
Vue.config.devTools = true;

//Import all vue components
import posts from './components/posts.vue';
Vue.component( 'posts', posts );
import post from './components/post.vue';
Vue.component( 'post', post );
import header from './components/theme-header.vue';
Vue.component( 'theme-header', header );
import footer from './components/theme-footer.vue';
Vue.component( 'theme-footer', footer );
import page from './components/page.vue';
Vue.component( 'page', page );
import category from './components/category.vue';
Vue.component( 'category', category );
import tag from './components/tag.vue';
Vue.component( 'tag', tag );
//Create main vue component
const App = Vue.extend( {
	template: '<div id="page" class="hfeed site"><theme-header></theme-header>' +
			'<main><router-view></router-view></main>' +
			'<theme-footer></theme-footer></div>',
	computed: {
	}
} );

//Define route for vue app
//ref : http://router.vuejs.org/en/
const router = new VueRouter( {
	mode: 'history',
	routes: [

		{ path: '/blog/:page(\\d+)?', name: 'home', component: posts },
		{ path: '/blog/:name', name: 'post', component: post },
		{ path: '/page/:name', name: 'page', component: page },
		{ path: '/category/:name', name: 'cat', component: category },
		{ path: '/tag/:name', name: 'tag', component: tag },
		{ path: '/', redirect: '/blog' },

	]
} );

//Define vuex store
const store = new Vuex.Store( {
	state: {
		title: ''
	},
	mutations: {
		rtChangeTitle( state, value ) {
			// mutate state
			state.title = value;
			document.title = ( state.title ? state.title + ' - ' : '' ) + rtwp.site_name;
		}
	}
} );

//Create instance of main component
new App( {
	store,
	router
} ).$mount( '#app' );


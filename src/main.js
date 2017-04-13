import Vue from 'vue';
import VueRouter from 'vue-router';
import Vuex from 'vuex'
//Use vue route
Vue.use(Vuex)
Vue.use(VueRouter)

Vue.config.debug = true;
Vue.config.devTools = true;

//Import all vue compononets
import posts from './components/posts.vue'
Vue.component('posts', posts)
import post from './components/post.vue'
Vue.component('post', post)
import header from './components/theme-header.vue'
Vue.component('theme-header', header)
import footer from './components/theme-footer.vue'
Vue.component('theme-footer', footer)
import page from './components/page.vue'

//Create main vue component
var App = Vue.extend({
	template: '<div id="page" class="hfeed site"><theme-header></theme-header>' +
			  '<main><router-view></router-view></main>' +
			  '<theme-footer></theme-footer></div>',
	mounted:function(){
		//this.rtChangeTitle('');
	},
	computed:{

		rtChangeTitle:function (title) {
			document.title = (title ? title + ' - ' : '') + rtwp.site_name;
		}
	}
});

//Define route for vue app
//ref : http://router.vuejs.org/en/
const router = new VueRouter({
	mode: 'history',
	base: __dirname,
	routes: [

		{ path: '/', name:'home',component: posts },
		{ path: '/post/:name', name:'post', component: post },
		{ path: '/page/:name', name:'page', component: page },

	]
});

const store = new Vuex.Store({
	state: {
		title: ''
	},
	mutations: {
	rtChangeTitle(state, value) {
	  // mutate state
	  state.title = value;
	  document.title = (state.title ?state. title + ' - ' : '') + rtwp.site_name;
	}
}
})
//Create instatnce of main component
new App( {
	store,
	router
}).$mount('#app');


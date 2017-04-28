<template>

	<header id="masthead" class="site-header" role="banner">

		<div class="row">

			<div class="column medium-2">

				<router-link :to="{ name: 'home'}" class="site-name"> {{ site_name }} </router-link>

			</div>

			<div class="column medium-10">

				<a id="primary-nav-button">
					Menu
				</a>
				<nav v-show="ok" id="site-navigation">

					<ul>
						<li v-for="item in menus" v-if="item.type != 'custom'">
							 <router-link :to="{ name: 'page', params: { name: getUrlName( item.url ) }}"> {{ item.title }} </router-link>
						</li>
					</ul>

				</nav>

			</div>

		</div>

	</header>

</template>

<script>
export default {

	mounted: function () {

		//console.log( wp.api.collections );
		this.getMenu();
	},
	data() {
		return {
			menus: [],
			site_name: rtwp.site_name,

		}
	},
	methods: {

		getMenu: function () {

			var vm = this;

			vm.$http.get( 'wp-api-menus/v2/menu-locations/primary-menu')
			.then( (res) => {
				vm.menus = res.data;
			})
			.catch( (res) => {
				console( `Something wen wrong : ${res}` );
			})

		},
		getUrlName:function( url ) {

			var array = url.split('/');
			var lastsegment = array[array.length-2];
			return lastsegment;
		}


	}

}
</script>

<style>

</style>

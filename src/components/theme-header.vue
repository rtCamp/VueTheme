<template>

	<header id="masthead" class="site-header" role="banner">

		<div class="row">

			<div class="column medium-2">

				<router-link :to="{ name: 'home'}" class="site-name"> {{ site_name }} </router-link>

			</div>

			<div class="column medium-10">

				<a id="primary-nav-button" class="menu-toggle" href="#site-navigation">
					Menu
				</a>

				<nav id="site-navigation">

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
			var url =  rtwp.root + 'wp-api-menus/v2/menu-locations/primary-menu';
			$ = jQuery;

			$.ajax({

				url: url,
				type: 'GET',
				dataType: 'json',
				contentType: 'application/json; charset=utf-8',

				success: function (response) {

					vm.menus = response;
					console.log( vm.menus );

				},
				error: function (error) {

					console.log(error);
				}

			});

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

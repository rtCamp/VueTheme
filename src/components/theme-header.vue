<template>

	<header id="masthead" class="site-header" role="banner">
		<div class="row">
			<nav id="site-navigation">
				<ul>
					<li v-for="item in menus" v-if="item.type != 'custom'">
						<router-link :to="{ name: 'page', params: { id:item.object_id }}"> {{ item.title }} </router-link>
					</li>
				</ul>
			</nav>
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
			menus: []
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

		}
	}

}
</script>

<style>

</style>

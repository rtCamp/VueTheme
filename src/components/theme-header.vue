<template>

	<header id="masthead" class="site-header" role="banner">

		<div class="row">

			
			<div class="column large-10 medium-10 small-10">
				<router-link :to="{ name: 'home'}" class="site-name"> {{ site_name }} </router-link>
			</div>

			<div class="column large-2 medium-2 small-2 end">

				<div id="nav-icon1" v-on:click="toggleMenu" v-bind:class="{open: isActive}">
					<span></span>
					<span></span>
					<span></span>
				</div>
				<nav id="site-navigation" v-bind:class="{open: isActive}">

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
			isActive: false

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
		},

		toggleMenu: function() {
			console.log("Clicked" + this.isActive);
			this.isActive = !this.isActive;
		}


	}

}
</script>

<style>
.site-name { display: inline-block; font-weight: normal; font-size: 1.8rem; }

#nav-icon1 {
	display: inline-block;
	width: 50px;
	height: 20px;
	position: relative;
	margin: 13px auto;
	-webkit-transform: rotate(0deg);
	-moz-transform: rotate(0deg);
	-o-transform: rotate(0deg);
	transform: rotate(0deg);
	-webkit-transition: .5s ease-in-out;
	-moz-transition: .5s ease-in-out;
	-o-transition: .5s ease-in-out;
	transition: .5s ease-in-out;
	cursor: pointer;
}

#nav-icon1 span {
	display: block;
	position: absolute;
	height: 5px;
	width: 100%;
	background: #444;
	border-radius: 9px;
	font-weight: normal;
	opacity: 1;
	left: 0;
	-webkit-transform: rotate(0deg);
	-moz-transform: rotate(0deg);
	-o-transform: rotate(0deg);
	transform: rotate(0deg);
	-webkit-transition: .25s ease-in-out;
	-moz-transition: .25s ease-in-out;
	-o-transition: .25s ease-in-out;
	transition: .25s ease-in-out;
}

#nav-icon1 span:nth-child(1) {
	top: 0px;
}

#nav-icon1 span:nth-child(2) {
	top: 10px;
}

#nav-icon1 span:nth-child(3) {
	top: 20px;
}

#nav-icon1.open span:nth-child(1) {
	top: 10px;
	-webkit-transform: rotate(135deg);
	-moz-transform: rotate(135deg);
	-o-transform: rotate(135deg);
	transform: rotate(135deg);
}

#nav-icon1.open span:nth-child(2) {
	opacity: 0;
	left: -60px;
}

#nav-icon1.open span:nth-child(3) {
	top: 10px;
	-webkit-transform: rotate(-135deg);
	-moz-transform: rotate(-135deg);
	-o-transform: rotate(-135deg);
	transform: rotate(-135deg);
}


</style>

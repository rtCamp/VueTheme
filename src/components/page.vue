<style>

</style>

<template>

<transition name="slide-fade">

	<div class="row rt-main" v-if="loaded ==='true'">

		<div class="medium-12 small-12 column" >

			<div class="rt-post">

				<h2 class="rt-post-title"> {{ page.title.rendered }}</h2>

				<div class="rt-post-content rt-content" v-html="page.content.rendered"></div>


			</div>

		</div>

	</div>

</transition>


</template>

<script>
export default {

	mounted: function() {
		this.getPage();
	},

	data() {
		return {
			page: {},
			loaded: 'false',
			pageTitle: ''
		};
	},
	methods: {
		getPage: function() {

			const vm = this;
			vm.loaded = 'false';

			vm.$http.get( 'wp/v2/pages', {
				params: { slug: vm.$route.params.name }
			} )
			.then( ( res ) => {

				vm.page = res.data[ 0 ];
				vm.loaded = 'true';
				vm.pageTitle = vm.page.title.rendered;
				vm.$store.commit( 'rtChangeTitle', vm.pageTitle );

			} )
			.catch( ( res ) => {

				//console.log( `Something went wrong : ${ res }` );

			} );

		}
	},
	watch: {

		'$route'( to, from ) {
			// react to route changes...
			this.getPage();
		}

	}

};
</script>

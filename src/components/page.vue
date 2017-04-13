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
			page:{},
			loaded:'false',
			pageTitle:''
		}

	},

	methods: {
		getPage:function () {

			var vm = this;
			vm.loaded = 'false'
			wp.api.loadPromise.done( function() {

				var post = new wp.api.models.Page();
				post.fetch( { data: { slug:vm.$route.params.name } } ).done( function (data) {
					console.log( data );
					vm.page = data[0];
					vm.loaded = 'true';
					vm.pageTitle = vm.page.title.rendered;
					vm.$store.commit( 'rtChangeTitle', vm.pageTitle );
				});
			});

		}
	},
  	watch: {

		'$route' (to, from) {
			// react to route changes...
			this.getPage();
		}

	}

}
</script>
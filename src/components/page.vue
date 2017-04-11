<style>

</style>

<template>

<div class="row rt-main" >

	<div class="medium-12 small-12 column" >

		<div class="rt-post">

			<h2 class="rt-post-title"> {{ page.title.rendered }}</h2>

			<div class="rt-post-content rt-content" v-html="page.content.rendered"></div>


		</div>

	</div>

</div>



</template>

<script>
export default {

	mounted: function() {
		this.getPage();
	},

	data() {
		return {
			page:{
				title: { rendered: '' },
				content: { rendered: '' }
			}
		}

	},

	methods: {
		getPage:function () {

			var vm = this;
			wp.api.loadPromise.done( function() {

				var post = new wp.api.models.Page( { id: vm.$route.params.id } );
				post.fetch().done( function (data) {
					console.log( data );
					vm.page = data;
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
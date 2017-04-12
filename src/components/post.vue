<style>

</style>

<template>

		<div class="row rt-main" v-if="loaded === 'true'">

			<div class="medium-12 small-12 column" >

				<div class="rt-post">

					<h2 class="rt-post-title"> {{ post.title.rendered }}</h2>


					<div class="rt-post-content rt-content" v-html="post.content.rendered" ></div>


				</div>

			</div>

		</div>



</template>

<script>
export default {

	mounted: function() {

			this.getPost();
	},

	data() {
		return {
			base_path: rtwp.base_path,
			post:{},
			loaded:'false'

		}
	},

	methods: {
		getPost:function () {

			var vm = this;
			wp.api.loadPromise.done( function() {

				var post = new wp.api.models.Post( );
				post.fetch( { data: { _embed:'1', slug:vm.$route.params.name } } ).done( function (data) {
					//console.log( data );
					vm.post = data[0];
					vm.loaded = 'true';
				});
			});

		}
	}
}
</script>
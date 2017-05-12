<style>

</style>

<template>
		<transition name="slide-fade">

			<div class="row rt-main" v-if="loaded === 'true'">

				<div class="medium-12 small-12 column" >

					<div class="rt-post">

						<h2 class="rt-post-title"> {{ post.title.rendered }}</h2>

						<div class="progressive full">

							<img class="lazy"
								v-progressive="post.featured_image_src['full'][0]" 
								:data-srcset="post.featured_image_src['srcset']" 
								:src="post.featured_image_src['full'][0]" 
							/>
						</div>

						<div class="rt-post-content rt-content" v-html="post.content.rendered" ></div>

						<div class="rt-cat-list">
							<router-link v-for="x in post.cat_name" :to="{ name: 'cat', params: { name:x.slug } }" :key="x.id"> {{ x.name }} </router-link>
						</div>

						<div class="rt-tag-list">
							<router-link v-for="x in post.tag_name" :to="{ name: 'tag', params: { name:x.slug } }" :key="x.id"> {{ x.name }} </router-link>
						</div>
					</div>

				</div>

			</div>

		</transition>

</template>

<script>
export default {

	mounted: function() {
		this.getPost();
	},

	data() {
		return {

			base_path: rtwp.base_path,
			post: {},
			loaded: 'false',
			pageTitle: ''
		};
	},

	methods: {

		getPost: function() {

			const vm = this;

			vm.$http.get( 'wp/v2/posts', {
				params: { slug: vm.$route.params.name }
			} )
			.then( ( res ) => {

				vm.post = res.data[ 0 ];
				vm.loaded = 'true';
				vm.pageTitle = vm.post.title.rendered;
				vm.$store.commit( 'rtChangeTitle', vm.pageTitle );

			} )
			.catch( ( res ) => {

				//console.log( `Something went wrong : ${res}` );

			} );

		}

	}
};
</script>

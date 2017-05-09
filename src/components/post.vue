<style>

</style>

<template>
		<transition name="slide-fade">

			<div class="row rt-main" v-if="loaded === 'true'">

				<div class="medium-12 small-12 column" >

					<div class="rt-post">

						<h2 class="rt-post-title">{{ post.title.rendered }}</h2>

                        <h4 class="rt-categories" style="display:inline-block;margin-right: 10px;" v-for="item in categories">{{item.name}}</h4>

						<div class="progressive full">

							<img class="lazy"
								v-progressive="post.featured_image_src['full'][0]" 
								:data-srcset="post.featured_image_src['srcset']" 
								:src="post.featured_image_src['full'][0]" 
							/>
						</div>

						<div class="rt-post-content rt-content" v-html="post.content.rendered" ></div>

					</div>

				</div>

			</div>

		</transition>

</template>

<script>
    /* eslint-disable indent */

    export default {

	mounted: function() {
		this.getPost();
	},

	data() {
		return {

			base_path: rtwp.base_path,
			post: {},
			categories: [],
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
				this.getCategories( res.data[ 0 ].categories );

				vm.loaded = 'true';
				vm.pageTitle = vm.post.title.rendered;
				vm.$store.commit( 'rtChangeTitle', vm.pageTitle );

			} )
			.catch( ( res ) => {

				//console.log( `Something went wrong : ${res}` );

			} );

		},
        getCategories: function( payload ) {
            const vm = this;
            for ( let i = 0; i < payload.length; i++ ) {
                vm.$http.get( 'wp/v2/categories/' + payload[ i ] )
                    .then( ( res ) => {
                        vm.categories.push( res.data );
                    } )
                    .catch( ( res ) => {
                        //console.log( `Something Went Wrong: $(res)` );
                    } );
            }
		}
	}
};
</script>

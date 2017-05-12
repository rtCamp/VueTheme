<style>

</style>

<template>

	<transition name="slide-fade">

		<div class="row rt-main" v-if="loaded === 'true'" >

			<div class="medium-12 small-12 column" v-for="post in posts" :key="post.slug">

				<div class="rt-post">

					<h2 class="rt-post-title"><router-link :to="{ name: 'post', params: { name:post.slug }}"> {{ post.title.rendered }} </router-link> </h2>

					<div class="rt-meta">
						<span class="posted-on">
							Posted On
							<span class="date" v-text="formatDate( post )">
							</span>
						</span>
					</div>

					<div class="progressive full" v-if="post.featured_image_src['full'][0]">

						<img class="lazy" v-progressive="post.featured_image_src['full'][0]" :data-srcset="post.featured_image_src['srcset']" :src="post.featured_image_src['full'][0]" />

					</div>

					<div class="rt-post-excerpt rt-content" v-html="post.excerpt.rendered" > </div>

				</div>

			</div>

		</div>

	</transition>

</template>

<script>
export default {

	mounted: function() {

		const vm = this;

		if ( vm.$route.params.name ) {

			vm.getCatId( vm.$route.params.name );

		}

	},
	data() {

		return {

			posts: {},
			loaded: 'false',
			pageTitle: '',
			totalCount: '',
			catName: ''

		};

	},

	methods: {

		getPosts: function( catId ) {

			const vm = this;
			vm.loaded = 'false';
			vm.$http.get( 'wp/v2/posts', {
				params: { categories: catId }
			} )
			.then( ( res ) => {

				vm.posts = res.data;

				vm.loaded = 'true';

				vm.pageTitle = 'Category' + ' - ' + vm.catName;

				vm.$store.commit( 'rtChangeTitle', vm.pageTitle );

			} )
			.catch( ( res ) => {
				//console.log( `Something went wrong : ${ res }` );
			} );

		},
		getCatId: function( name ) {
			const vm = this;
			vm.catName = name;
			vm.loaded = 'false';
			vm.$http.get( 'wp/v2/categories/?slug=' + name )
			.then( ( res ) => {

				res = res.data[ 0 ];
				vm.totalCount = ( res.data );
				vm.getPosts( res.id );

			} )
			.catch( ( res ) => {
				//console.log( `Something went wrong : ${ res }` );
			} );
		},
		formatDate: function( value ) {

			value = value.date;
			if ( value ) {
				const date = new Date( value );
				const monthNames = [ "January", "February", "March",
					"April", "May", "June", "July",
					"August", "September", "October",
					"November", "December" ];

				const day = date.getDate();
				const monthIndex = date.getMonth();
				const year = date.getFullYear();

				return monthNames[ monthIndex ] + ',' + day + ' ' + year;
			}

		}
	}

};
</script>

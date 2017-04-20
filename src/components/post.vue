<style>

</style>

<template>

		<div class="row rt-main" v-if="loaded === 'true'">

			<div class="medium-12 small-12 column" v-for="data in post">

				<div class="rt-post">

					<h2 class="rt-post-title"><router-link :to="{ name: 'post', params: { name:data.slug }}"> {{ data.title.rendered }} </router-link> </h2>


					<div class="rt-post-content rt-content" v-html="data.content.rendered" ></div>


				</div>

			</div>

			<div class="medium-12 small-12 column" v-for="data in posts" v-if="data.id != mainPage">

			<div class="rt-post">

				<h2 class="rt-post-title"><router-link :to="{ name: 'post', params: { name:data.slug }}"> {{ data.title.rendered }} </router-link> </h2>


				<div class="rt-post-content rt-content" v-html="data.content.rendered" ></div>


			</div>

			</div>

		<infinite-loading :on-infinite="onInfinite" ref="infiniteLoading" :key="post">
			<span slot="no-more">
			There is no more data :(
			</span>
		</infinite-loading>
		</div>

</template>

<script>
import InfiniteLoading from 'vue-infinite-loading'
export default {

	components: {
			InfiniteLoading,
	},

	mounted: function() {

			this.getMainPost();
	},

	data() {
		return {
			base_path: rtwp.base_path,
			post:[],
			loaded:'false',
			postPerPage: '5',
			currentPage: '0',
			totalPages: '',
			mainPage:'',
			posts:[],
			lastScrollTop:'0'
		}
	},

	methods: {
		getMainPost:function () {

			var vm = this;
			wp.api.loadPromise.done( function() {

				var post = new wp.api.models.Post( );
				post.fetch( { data: { slug:vm.$route.params.name } } ).done( function ( data, status, header ) {

					vm.post = vm.post.concat( data );
					vm.totalPages = header.getResponseHeader( 'X-WP-TotalPages');
					vm.mainPage = vm.post[0].id;
					vm.loaded = 'true';

				});
			});

		},
		getPost:function (pageNumber=1) {

			var vm = this;
			wp.api.loadPromise.done( function() {

				var post = new wp.api.models.Post( );
				post.fetch( { data: { per_page: vm.postPerPage,page:pageNumber } } ).done( function ( data, status, header ) {

					vm.posts = vm.posts.concat( data );
					vm.totalPages = header.getResponseHeader( 'X-WP-TotalPages');
					vm.currentPage = parseInt( pageNumber );
					vm.$refs.infiniteLoading.$emit('$InfiniteLoading:loaded');
				});
			});

		},
		onInfinite:function () {

			var vm = this;
			if( parseInt( vm.currentPage )  < parseInt( vm.totalPages ) ) {

				vm.currentPage = parseInt( vm.currentPage ) + 1;
				vm.getPost( vm.currentPage );

			} else {
				vm.$refs.infiniteLoading.$emit('$InfiniteLoading:complete');
			}

		},
		handleScroll:function () {
			var vm = this;
			var st = $(window).scrollTop();
			var scrollPosition = document.documentElement.scrollTop || document.body.scrollTop;
			var windowPosition = jQuery(window).scrollTop();
			if ( st > parseInt( vm.lastScrollTop ) ){
			// downscroll code
				jQuery('h2').not('.rtvisited').each( function () {
				var el = this;
				var pos = $( el ).offset().top -windowPosition;
				var link = $( el ).children('a').attr('href');
				if ( parseInt(pos) <= 0 ) {
					history.pushState(null, null, link );
					jQuery( el ).addClass( 'rtvisited' );

				}
				})
			} else {
			// upscroll code
				jQuery('.rtvisited').each( function () {
					var el = this;
					var pos = $( el ).offset().top -windowPosition;
					var link = $( el ).children('a').attr('href');
					if ( parseInt(pos) >= 0 ) {
						history.pushState(null, null, link );
						jQuery( el ).removeClass( 'rtvisited' );

					}
				})
			}
			vm.lastScrollTop = st;

		}
	},
	created () {
		window.addEventListener('scroll', this.handleScroll);
	},
	destroyed () {
		window.removeEventListener('scroll', this.handleScroll);
	}
}
</script>
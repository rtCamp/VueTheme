<style>

</style>

<template>

	<div class="single-post row" v-if="loaded === 'true'">

		<article v-for="data in post" class="large-12 medium-12 column">

			<header>

				<h2 class="rt-post-title"><router-link :to="{ name: 'post', params: { name:data.slug }}"> {{ data.title.rendered }} </router-link> </h2>

			</header>


			<figure>

			</figure>

			<div class="row">

				<div class="item-meta large-4 medium-4 small-12 column">
					<div class="share">
						<h5>Share</h5>
						<a href="" class="rt-fb" onclick="" target="_blank">
						<i class="icon-facebook"></i>
						</a>
						<a href="" class="rt-tw" onclick="" target="_blank">
						<i class="icon-twitter"></i>
						</a>
						<a href="" class="rt-li" onclick="" target="_blank">
						<i class="icon-linkedin"></i>
						</a>
					</div>
					<div class="byline">

					</div>
					<div class="item-timestamp">

					</div>
				</div>

				<div class="item-body large-8 medium-8 small-12 column" v-html="data.content.rendered">
				</div>

			</div>
		</article>



		<article v-for="data in posts" v-if="data.id != mainPage" class="large-12 medium-12 column">

			<header>

				<h2 class="rt-post-title"><router-link :to="{ name: 'post', params: { name:data.slug }}"> {{ data.title.rendered }} </router-link> </h2>

			</header>


			<figure>

			</figure>

			<div class="row">

				<div class="item-meta large-4 medium-4 small-12 column">
					<div class="share">
						<h5>Share</h5>
						<a href="" class="rt-fb" onclick="" target="_blank">
						<i class="icon-facebook"></i>
						</a>
						<a href="" class="rt-tw" onclick="" target="_blank">
						<i class="icon-twitter"></i>
						</a>
						<a href="" class="rt-li" onclick="" target="_blank">
						<i class="icon-linkedin"></i>
						</a>
					</div>
					<div class="byline">

					</div>
					<div class="item-timestamp">

					</div>
				</div>

				<div class="item-body large-8 medium-8 small-12 column" v-html="data.content.rendered">
				</div>

			</div>

		</article>

		<infinite-loading :on-infinite="onInfinite" ref="infiniteLoading" :key="post">
		<span slot="no-more">
		There is no more data :(
		</span>
		</infinite-loading>

	</div>

</template>

<script>
import InfiniteLoading from 'vue-infinite-loading'
import _ from 'lodash'

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
		handleScroll:_.debounce( function () {
			console.log( 'scroll' );
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

		}, 250 )
	},
	created () {
		window.addEventListener('scroll', this.handleScroll);
	},
	destroyed () {
		window.removeEventListener('scroll', this.handleScroll);
	}
}
</script>
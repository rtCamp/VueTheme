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
						<a :href="'https://www.facebook.com/sharer/sharer.php?' + base_url  + $route.path " class="rt-fb" onclick="return !window.open(this.href, 'rtLogin', 'width=500,height=500')" target="_blank">
						<i class="icon-facebook"></i>
						</a>
						<a :href="'https://twitter.com/home?status=' + base_url  + $route.path " class="rt-tw" onclick="return !window.open(this.href, 'rtLogin', 'width=500,height=500')" target="_blank">
						<i class="icon-twitter"></i>
						</a>
						<a :href="'https://www.linkedin.com/shareArticle?mini=true&url=' + base_url  + $route.path " class="rt-li" onclick="return !window.open(this.href, 'rtLogin', 'width=500,height=500')" target="_blank">
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



		<article v-for="data in posts" class="large-12 medium-12 column">

			<header>

				<h2 class="rt-post-title"><router-link :to="{ name: 'post', params: { name:data.post_name }}"> {{ data.post_title }} </router-link> </h2>

			</header>


			<figure>

			</figure>

			<div class="row">

				<div class="item-meta large-4 medium-4 small-12 column">
					<div class="share">
						<h5>Share</h5>
						<a :href="'https://www.facebook.com/sharer/sharer.php?' + base_url  + $route.path " class="rt-fb" onclick="return !window.open(this.href, 'rtLogin', 'width=500,height=500')" target="_blank">
						<i class="icon-facebook"></i>
						</a>
						<a :href="'https://twitter.com/home?status=' + base_url  + $route.path " class="rt-tw" onclick="return !window.open(this.href, 'rtLogin', 'width=500,height=500')" target="_blank">
						<i class="icon-twitter"></i>
						</a>
						<a :href="'https://www.linkedin.com/shareArticle?mini=true&url=' + base_url  + $route.path " class="rt-li" onclick="return !window.open(this.href, 'rtLogin', 'width=500,height=500')" target="_blank">
						<i class="icon-linkedin"></i>
						</a>
					</div>
					<div class="byline">

					</div>
					<div class="item-timestamp">

					</div>
				</div>

				<div class="item-body large-8 medium-8 small-12 column" v-html="data.post_content">
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
			base_url: rtwp.base_url	,
			post:[],
			loaded:'false',
			postPerPage: '5',
			currentPage: '0',
			totalPages: '',
			mainPage:'',
			posts:[],
			lastScrollTop:'0',
			currentPageId:''
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
					vm.currentPageId = vm.mainPage;
					vm.loaded = 'true';

				});
			});

		},
		getNextPost:function () {

			var vm = this;

			var vm = this;
			var url =  rtwp.root + 'rtvue/v1/next/post/' + vm.currentPageId;
			$ = jQuery;
			$.ajax({

				url: url,
				type: 'GET',
				dataType: 'json',
				contentType: 'application/json; charset=utf-8',

				success: function (response) {

					var res = response.next;
					if( '' === res ){
						vm.$refs.infiniteLoading.$emit('$InfiniteLoading:complete');
					}else {
						vm.posts = vm.posts.concat( res );
						vm.currentPageId = res.ID;
						vm.$refs.infiniteLoading.$emit('$InfiniteLoading:loaded');
					}
				},
				error: function (error) {

					console.log(error);
				}

			});

		},
		onInfinite:function () {

			var vm = this;
			vm.getNextPost();

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
	},
	watch: {

		'$route' (to, from) {
			// react to route changes...
			this.post=[];
			this.posts=[];
			this.getMainPost();
		}

	}
}
</script>
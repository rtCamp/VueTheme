<style>

</style>

<template>

		<div class="medium-6 small-12 column rt-post" v-if="!isSingle">

			<div class="rt-post">

				<h4 class="rt-post-title"> {{ post.title.rendered }}</h4>

				<!--	<p class="rt-post-link"> {{ post.link }} </p> -->
				<div class="line"></div>

				<p class="rt-post-excerpt"  v-html="post.excerpt.rendered" > </p>

				<router-link :to="{ name: 'post', params: { id: post.id }}" class="rt-post-btn">Read More </router-link>

			</div>

		</div>

		<div class="row" v-else>

			<div class="medium-12 small-12 column rt-post" >

				<div class="rt-post">

				<h4 class="rt-post-title"> {{ post.title.rendered }}</h4>

				<!--	<p class="rt-post-link"> {{ post.link }} </p> -->

				<div class="line"></div>

				<p class="rt-post-content" v-html="post.content.rendered" ></p>


				</div>

			</div>

		</div>



</template>

<script>
	export default {

	props: {
		post: {
			type: Object,
			default() {
					return {
					id: 0,
					slug: '',
					title: { rendered: '' },
					content: { rendered: '' }
				}
			}
		}
	},

	mounted: function() {

		if (!this.post.id) {

			this.getPost();
			this.isSingle = true;
		}
	},

	data() {
		return {
			base_path: wp.base_path,
			isSingle: false
		}
	},

	methods: {
		getPost:function () {

		var vm = this;

		var url = wp.root + 'wp/v2/posts/' + vm.$route.params.id;
		$ = jQuery;
		$.ajax({

			url: url,
			type: 'GET',
			dataType: 'json',
			contentType: 'application/json; charset=utf-8',
			success: function (response) {

				vm.post = response;
				console.log( vm.post );

			},
			error: function (error) {

				console.log(error);
			}

		});

		}
	}
}
</script>
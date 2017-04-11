<style>

</style>

<template>

		<div class="medium-12 small-12 column" v-if="!isSingle">

			<div class="rt-post">

				<h2 class="rt-post-title"><router-link :to="{ name: 'post', params: { id: post.id }}"> {{ post.title.rendered }} </router-link> </h2>
				<div class="rt-meta">
				<span class="posted-on">
					Posted On
					<span class="date">
						{{ formatDate( post.date ) }}
					</span>
				</span>
				<span class="authormeta">
					By
					<span class="author">
					{{ post._embedded.author[0].name }}
					</span>
				</span>
				</div>
				<h4></h4>

				<div class="rt-post-excerpt rt-content"  v-html="post.excerpt.rendered" > </div>


			</div>

		</div>

		<div class="row rt-main" v-else>

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
			base_path: rtwp.base_path,
			isSingle: false
		}
	},

	methods: {
		getPost:function () {

			var vm = this;
			wp.api.loadPromise.done( function() {

				var post = new wp.api.models.Post( { id: vm.$route.params.id, _embed:'1' } );
				post.fetch().done( function (data) {
					//console.log( data );
					vm.post = data;
				});
			});

		},
		formatDate:function ( value ) {
			if (value) {
				var date  = new Date( value );
				var monthNames = [
				"January", "February", "March",
				"April", "May", "June", "July",
				"August", "September", "October",
				"November", "December"
				];

				var day = date.getDate();
				var monthIndex = date.getMonth();
				var year = date.getFullYear();

				return monthNames[monthIndex] + ',' + day + ' ' + year;
			}
		}
	}
}
</script>
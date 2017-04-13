<style>

</style>

<template>

    <div class="row rt-main">
        <div class="medium-12 small-12 column rt-pagination">

                <a href="#"  v-if="showPrev" v-on:click="rtShowPrev()"> &LT; prev  </a>
                <a > {{ currentPage }} / {{ totalPages }} </a>
                <a href="#"  v-if="showNext" v-on:click="rtShowNext()"> more &GT; </a>


        </div>

		<transition-group name="slide-fade" class="row">

		<div class="medium-12 small-12 column" v-for="post in posts" v-if="loaded === 'true'" :key="post.slug">

			<div class="rt-post">

				<h2 class="rt-post-title"><router-link :to="{ name: 'post', params: { name:post.slug }}"> {{ post.title.rendered }} </router-link> </h2>
				<div class="rt-meta">
				<span class="posted-on">
					Posted On
					<span class="date">
						{{ formatDate( post.date ) }}
					</span>
				</span>
				<!--
				<span class="authormeta">
					By
					<span class="author">
					{{ post._embedded.author[0].name }}
					</span>
				</span>
				-->
				</div>
				<h4></h4>

				<div class="rt-post-excerpt rt-content"  v-html="post.excerpt.rendered" > </div>


			</div>

		</div>

		</transition-group>

    </div>
</template>

<script>

export default {

    	mounted: function() {

            this.getPosts();

        },

        data() {

        	return {
                posts:{},
                currentPage: '',
                prevPage: '',
                nextPage: '',
                showNext:'true',
                showPrev:'true',
                postCollection:'',
                postPerPage: '10',
                totalPages: '',
                loaded:'false',
				pageTitle:''
            }

        },

        methods: {

            getPosts:function() {

            	var vm = this;

            	wp.api.loadPromise.done( function() {
                	//... use the client here
                    var postsCollection = new wp.api.collections.Posts();
                    vm.postCollection = postsCollection;
                    postsCollection.fetch( { data: { per_page: vm.postPerPage } } ).done( function (data, status, header ) {
                       // console.log( data );
                        vm.posts = data;
                        vm.totalPages = header.getResponseHeader( 'X-WP-TotalPages');
                        vm.currentPage = 1;
                        vm.loaded = 'true';
                        vm.pageTitle = 'Blog';
                        vm.$store.commit( 'rtChangeTitle', vm.pageTitle );
					});

            	} );

            },
            rtChangePage:function(pageNumber) {

                var vm = this;
                vm.loaded = 'false';
                wp.api.loadPromise.done( function() {
                    var postsCollection = vm.postCollection;
                    postsCollection.fetch( { data: { per_page: vm.postPerPage, page: pageNumber } } ).done( function (data, x ,h ) {
                        vm.posts = data;
                        vm.loaded = 'true';
                    });
                });

			},
            rtShowNext:function( event ) {

                var vm = this;

                if( vm.postCollection.hasMore() ) {

                	vm.currentPage = vm.currentPage + 1;

					vm.rtChangePage(vm.currentPage);

				}
            },
            rtShowPrev:function( event ) {

                var vm = this;
                if ( vm.currentPage != 1 ) {

                	vm.currentPage = vm.currentPage - 1;

					vm.rtChangePage(vm.currentPage);

				}
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
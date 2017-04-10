<style>

</style>

<template>

    <div class="row rt-main">
        <div class="medium-12 small-12 column rt-pagination">
            <div class="rt-post rt-pagination">
                <a href="#"  v-if="showPrev" v-on:click="rtShowPrev()"> &LT; prev  </a>
                <a > {{ currentPage }} / {{ totalPages }} </a>
                <a href="#"  v-if="showNext" v-on:click="rtShowNext()"> more &GT; </a>
            </div>

        </div>
        <post v-for="post in posts" :post="post"></post>
    </div>
</template>

<script>

    export default {

    	mounted: function() {

            this.getPosts();

        },

        data() {

        	return {
                posts: [],
                currentPage: '',
                prevPage: '',
                nextPage: '',
                showNext:'true',
                showPrev:'true',
                postCollection:'',
                postPerPage: '10',
                totalPages: ''
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
					});

            	} );

            },
            rtChangePage:function(pageNumber) {

                var vm = this;
                wp.api.loadPromise.done( function() {
                    var postsCollection = vm.postCollection;
                    postsCollection.fetch( { data: { per_page: vm.postPerPage, page: pageNumber } } ).done( function (data, x ,h ) {
                        vm.posts = data;
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
            }


        }
    }
</script>
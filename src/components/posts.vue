<style>

</style>

<template>

    <div class="row rt-main">
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
                posts: []
            }

        },

        methods: {

            getPosts:function () {

            	var vm = this;
            	var url =  wp.root + 'wp/v2/posts';
                $ = jQuery;
            	$.ajax({
                    url: url,
                    type: 'GET',
                    dataType: 'json',
                    contentType: 'application/json; charset=utf-8',
                    success: function (response) {

                        vm.posts = response;
                        console.log( vm.posts );

                    },
                    error: function (error) {
                        console.log(error);
                    }

			    });

            }

        }
    }
</script>
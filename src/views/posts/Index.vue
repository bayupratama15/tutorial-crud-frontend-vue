<template>
  <div class="container mt-5">
    <div class="row">
      <div class="col-md-12">
        <div class="card border-0 rounded shadow">
          <div class="card-body">
            <h4>DATA POST</h4>
            <hr />
            <router-link
              :to="{ name: 'posts.create' }"
              class="btn btn-md btn-success"
              >TAMBAH POST</router-link
            >

            <table class="table table-striped table-bordered mt-4">
              <thead class="thead-dark">
                <tr>
                  <th scope="col">TITLE</th>
                  <th scope="col">CONTENT</th>
                  <th scope="col">OPTIONS</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(post, index) in posts" :key="index">
                  <td>{{ post.title }}</td>
                  <td>{{ post.content }}</td>
                  <td class="text-center">
                    <router-link
                      :to="{ name: 'posts.edit', params: { id: post.id } }"
                      class="btn btn-sm btn-primary mr-1"
                      >EDIT</router-link
                    >
                    <button
                      @click.prevent="postDelete(post.id)"
                      class="btn btn-sm btn-danger ml-1"
                    >
                      DELETE
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { onMounted, ref } from "vue";

export default {
  setup() {
    //reactive state
    let posts = ref([]);

    //mounted
    onMounted(() => {
      //get API from Laravel Backend
      axios
        .get("http://localhost:8000/api/post")
        .then((response) => {
          //assign state posts with response data
          posts.value = response.data.data;
        })
        .catch((error) => {
          console.log(error.response.data);
        });
    });
    //method delete
    function postDelete(id) {
      //delete data post by ID
      axios
        .delete(`http://localhost:8000/api/post/${id}`)
        .then(() => {
          //splice posts
          const index = this.posts.findIndex((post) => post.id === id); // find the post index
          if (~index)
            // if the post exists in array
            this.posts.splice(index, 1); //delete the post
        })
        .catch((error) => {
          console.log(error.response.data);
        });
    }

    //return
    return {
      posts,
      postDelete,
    };
  },
};
</script>

<style>
body {
  background: lightgray;
}
</style>

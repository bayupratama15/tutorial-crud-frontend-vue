//import vue router
import { createRouter, createWebHistory } from "vue-router";

//define a routes
const routes = [
  {
    path: "/",
    name: "posts.index",
    component: () =>
      import(/* webpackChunkName: "post.index" */ "@/views/posts/Index.vue"),
  },
  {
    path: "/create",
    name: "posts.create",
    component: () =>
      import(/* webpackChunkName: "post.create" */ "@/views/posts/Create.vue"),
  },
  {
    path: "/edit/:id",
    name: "posts.edit",
    component: () =>
      import(/* webpackChunkName: "post.edit" */ "@/views/posts/Edit.vue"),
  },
];

//create router
const router = createRouter({
  history: createWebHistory(),
  routes, // config routes
});

export default router;

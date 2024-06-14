// 引入Vue
import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Login from "@/pages/Login.vue";
import Index from "@/pages/Index.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/",
    name: "Index",
    component: Index,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;

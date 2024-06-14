// 引入Vue
import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Login from "@/pages/Login.vue";
import Index from "@/pages/Index.vue";
import verifyCookie from "@/net/VerifyCookie";
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
  {
    path: "/register",
    name: "Register",
    component: () => import("@/pages/Register.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach(async (to, from, next) => {
    const isLoggedIn = await verifyCookie();

    if (to.name === "Login") {
      if (isLoggedIn) {
        // 如果用户已登录，重定向到主页面或其他适当页面
        next({ name: "Index" }); // 假设 "Home" 是主页的名称
      } else {
        next(); // 如果用户未登录，放行到登录页面
      }
    } else {
      if (isLoggedIn) {
        next(); // 如果用户已登录，放行到其他页面
      } else {
        // 如果用户未登录，重定向到登录页面
        next({ name: "Login" });
      }
    }
});

export default router;

import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/form-test",
    name: "FormTest",
    component: () => import("../views/FormTest.vue"),
  },
  {
    path: "/checkbox-test",
    name: "CheckboxTest",
    component: () => import("../views/CheckboxTest.vue"),
  },
];

const router = new VueRouter({
  routes,
});

export default router;

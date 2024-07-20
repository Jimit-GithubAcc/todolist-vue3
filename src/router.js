import { createRouter, createWebHistory } from "vue-router";

import HomePage from "./pages/HomePage.vue";

const routes = [
  { path: "/", component: HomePage },
  { path: "/task/:id", component: () => import("./components/TaskDetail.vue") },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;

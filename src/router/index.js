import { createRouter, createWebHistory } from "vue-router";
import BoardDetail from "../components/BoardDetail.vue";
import Top from "../components/Top.vue";

const routes = [
  {
    path: "/",
    name: "Top",
    component: Top,
  },
  {
    path: "/board/:id",
    name: "BoardDatail",
    component: BoardDetail,
    props: true,
  },
];

const router = createRouter({
  history: createWebHistory("/"),
  routes,
});

export default router;

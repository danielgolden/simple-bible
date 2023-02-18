import { createApp } from "vue";
import Reader from "./components/Reader.vue";
import { createRouter, createWebHistory } from "vue-router";
import "./style.css";
import App from "./App.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "Home",
      component: Reader,
    },
    {
      path: "/:version/:book/:chapter",
      name: "version, book and chapter",
      component: Reader,
    },
    {
      path: "/:book/:chapter",
      name: "Book and chapter",
      component: Reader,
    },
    {
      path: "/about",
      name: "About",
      component: Reader,
    },
  ],
});

createApp(App).use(router).mount("#app");

import { createRouter, createWebHistory } from "vue-router";
import ListaLibros from "../views/ListaLibros.vue";
import DetalleLibro from "../views/DetalleLibro.vue";
import InicioView from "../views/InicioView.vue";
import LoginView from "@/views/LoginView.vue";
import NotFoundView from "@/views/NotFoundView.vue";

const routes = [
  {
    path: "/login",
    name: "login",
    component: LoginView,
  },
  {
    path: "/:pathMatch(.*)*",
    name: "not-found",
    component: NotFoundView,
  },

  {
    path: "/libros",
    name: "libros",
    component: ListaLibros,
    meta: {
      requiereLogin: true,
    },
  },

  {
    path: "/",
    name: "inicio",
    component: InicioView,
  },
  {
    path: "/libros/:id",
    name: "detalle-libro",
    component: DetalleLibro,
    props: true,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  const usuarioLogueado = localStorage.getItem("usuarioLogueado");

  if (to.meta.requiereLogin && !usuarioLogueado) {
    next("/login");
  } else {
    next();
  }
});

export default router;

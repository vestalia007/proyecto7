<template>
  <nav>
    <router-link to="/" class="logo">Editorial Nova</router-link>

    <a v-if="$route.path === '/libros'" href="#" @click.prevent="cerrarSesion">
      Cerrar sesión
    </a>
  </nav>
</template>

<script>
export default {
  methods: {
    cerrarSesion() {
      localStorage.removeItem("usuarioLogueado");
      this.$router.push("/login");
    },
  },
};
</script>

<style lang="scss">
nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 50px;
  background-color: #45050c;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);

  .logo {
    font-size: 24px;
    font-weight: bold;
    color: #eecf6d;
    letter-spacing: 1px;
  }

  a {
    font-weight: bold;
    text-decoration: none;
    color: #eecf6d;
    padding: 8x 16px;
    border-radius: 6px;
    transition: 0.3s;

    &:hover {
      background-color: #d5ac4e;
      color: #45050c;
    }

    &.router-link-exact-active {
      background-color: #d5ac4e;
      color: #45050c;
    }
  }
}
</style>

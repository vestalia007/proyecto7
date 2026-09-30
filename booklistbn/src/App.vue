<template>
  <HeaderNova v-if="$route.path !== '/login'" />
  <div v-else class="header-login"></div>
  <router-view />
  <FooterNova />
</template>

<script>
import FooterNova from "./components/FooterNova.vue";
import HeaderNova from "./components/HeaderNova.vue";

export default {
  components: {
    HeaderNova,
    FooterNova,
  },
};
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap");

html,
body {
  margin: 0;
  min-height: 100%;
  background-color: #f3e3b0;
}

#app {
  font-family: "Roboto", sans-serif;
  text-align: center;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #45050c;
  min-height: 100vh;
  background-color: #f3e3b0;
}

.header-login {
  height: 50px;
  background-color: #45050c;
}
</style>

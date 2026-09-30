<template>
  <div class="inicio">
    <section class="banner" :style="{ backgroundImage: `url(${banner})` }">
      <div class="banner-contenido">
        <h1>Bienvenidos a Editorial Nova</h1>

        <p>Tu aplicación para gestionar tu lista de libros</p>

        <button @click.once="$router.push('/login')">Explorar libros</button>
      </div>
    </section>
  </div>
</template>

<script>
import banner from "../assets/images/banner-editorial.png";

export default {
  data() {
    return {
      bienvenida: false,
      banner,
    };
  },

  methods: {
    mostrarBienvenida() {
      this.bienvenida = true;
      this.$router.push("/libros");
    },
  },
};
</script>

<style lang="scss">
.inicio {
  min-height: calc(100vh - 71px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px;
}

.banner {
  width: 100%;
  max-width: 1200px;
  background-size: cover;
  background-position: center;
  border-radius: 18px;
  overflow: hidden;
  position: relative;
  box-shadow: 0 8px 25px rgba(69, 5, 12, 0.25);
  display: flex;
  align-items: center;
  justify-content: center;
}

.banner::before {
  content: "";
  position: absolute;
  inset: 0;
  background: rgba(69, 5, 12, 0.45);
}

.banner-contenido {
  position: relative;
  text-align: center;
  color: #f3e3b0;
  padding: 40px;
}

.banner-contenido h1 {
  font-size: 48px;
  margin-bottom: 15px;
  text-shadow: 2px 2px 5px rgba(0, 0, 0, 0.4);
}

.banner-contenido p {
  font-size: 22px;
  margin-bottom: 35px;
}

.banner-contenido button {
  border: none;
  background-color: #d5ac4e;
  color: #45050c;
  font-size: 18px;
  font-weight: bold;
  padding: 14px 32px;
  border-radius: 6px;
  cursor: pointer;
  transition: 0.3s;
  box-shadow: 0 4px 10px rgba(69, 5, 12, 0.3);
}

.banner-contenido button:hover {
  background-color: #eecf6d;
  transform: translateY(-2px);
  box-shadow: 0 6px 14px rgba(69, 5, 12, 0.4);
}
</style>

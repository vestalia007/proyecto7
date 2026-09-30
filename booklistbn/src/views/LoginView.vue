<template>
  <div class="login">
    <h2>Iniciar sesión</h2>

    <form @submit.prevent="iniciarSesion">
      <label for="usuario">Usuario:</label>

      <input
        id="usuario"
        type="text"
        v-model="usuario"
        placeholder="Ingresa tu usuario"
      />

      <label for="contrasena">Contraseña:</label>

      <input
        id="contrasena"
        type="password"
        v-model="contrasena"
        placeholder="Ingresa tu contraseña"
      />

      <button type="submit">Iniciar sesión</button>

      <p v-if="error">{{ error }}</p>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      usuario: "",
      contrasena: "",
      error: "",
    };
  },

  methods: {
    iniciarSesion() {
      if (this.usuario === "admin" && this.contrasena === "1234") {
        localStorage.setItem("usuarioLogueado", "true");
        this.$router.push("/libros");
      } else {
        this.error = "Usuario o contraseña incorrectos.";
      }
    },
  },
};
</script>

<style scoped>
.login {
  min-height: calc(100vh - 50px);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 40px 20px;
  box-sizing: border-box;
}

.login h2 {
  margin: 0 0 25px;
  color: #45050c;
  font-size: 30px;
  letter-spacing: 0.5px;
}

.login form {
  width: 100%;
  max-width: 400px;
  padding: 35px;
  box-sizing: border-box;
  background-color: #ffffff;
  border: 1px solid #eadfbd;
  border-radius: 16px;
  box-shadow: 0 8px 24px rgba(69, 5, 12, 0.12);
}

.login label {
  display: block;
  margin-bottom: 7px;
  color: #45050c;
  font-size: 14px;
  font-weight: 700;
  text-align: left;
}

.login input {
  width: 100%;
  padding: 12px;
  margin-bottom: 20px;
  box-sizing: border-box;
  border: 1px solid #d8cdb0;
  border-radius: 8px;
  background-color: #fffdf7;
  color: #45050c;
  font-family: inherit;
  font-size: 15px;
}

.login input::placeholder {
  color: #9b9090;
}

.login input:focus {
  outline: none;
  border-color: #b28a2e;
  box-shadow: 0 0 0 3px rgba(238, 207, 109, 0.35);
}

.login button {
  width: 100%;
  padding: 12px;
  margin-top: 5px;
  border: none;
  border-radius: 8px;
  background-color: #45050c;
  color: #ffffff;
  font-family: inherit;
  font-size: 15px;
  font-weight: 700;
  cursor: pointer;
  transition: background-color 0.2s ease, transform 0.2s ease;
}

.login button:hover {
  background-color: #650913;
  transform: translateY(-1px);
}

.login p {
  margin: 18px 0 0;
  color: #a32626;
  font-size: 14px;
  font-weight: 600;
  text-align: center;
}
</style>

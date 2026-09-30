<template>
  <div class="not-found">
    <div class="not-found-card">
      <span class="codigo">404</span>

      <h1>Página no encontrada</h1>

      <p>
        Lo sentimos, la página que estás buscando no existe o ya no está
        disponible.
      </p>

      <button @click="$router.push('/')">Volver al inicio</button>
    </div>
  </div>
</template>

<style scoped>
.not-found {
  min-height: calc(100vh - 70px);
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 40px 20px;
  box-sizing: border-box;
}

.not-found-card {
  width: 100%;
  max-width: 600px;
  padding: 50px 40px;
  box-sizing: border-box;
  background-color: #ffffff;
  border: 1px solid #eadfbd;
  border-radius: 20px;
  box-shadow: 0 8px 24px rgba(69, 5, 12, 0.12);
  text-align: center;
}

.codigo {
  display: block;
  margin-bottom: 10px;
  color: #eecf6d;
  font-size: 80px;
  font-weight: 700;
  line-height: 1;
  text-shadow: 2px 2px 0 #45050c;
}

.not-found-card h1 {
  margin: 15px 0;
  color: #45050c;
  font-size: 28px;
}

.not-found-card p {
  max-width: 450px;
  margin: 0 auto 30px;
  color: #5d4a4c;
  font-size: 16px;
  line-height: 1.6;
}

.not-found-card button {
  padding: 12px 24px;
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

.not-found-card button:hover {
  background-color: #650913;
  transform: translateY(-1px);
}
</style>

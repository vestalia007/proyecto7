<template>
  <div class="libro-card">
    <h2>{{ libro.titulo }}</h2>
    <div class="portada">
      <router-link :to="`/libros/${libro.id}`">
        <img :src="portada" :alt="`Portada de ${libro.titulo}`" />
      </router-link>
    </div>

    <p>{{ libro.autor }}</p>
    <p>{{ libro.genero }}</p>
    <p>Stock {{ libro.cantidad }}</p>

    <button class="favorito" @click="$emit('toggle-favorito', libro)">
      {{ libro.favorito ? "❤️" : "🤍" }}
    </button>

    <div class="acciones">
      <button @click="$emit('modificar-libro', libro)">Modificar</button>
      <button @click="$emit('eliminar-libro', libro)">Eliminar</button>
    </div>
  </div>
</template>

<script>
import portada1984 from "@/assets/images/1984.jpg";
import portadaCriada from "@/assets/images/elcuentodelacriada.jpg";
import portadaSubterra from "@/assets/images/subterra.jpg";
import portadaBuzon from "@/assets/images/elbuzondelasimpuras.jpg";
import portadaAmi from "@/assets/images/ami.jpg";
import portadaNino from "@/assets/images/Elninoqueenloqueciodeamor-EduardoBarrios.jpg";

const portadas = {
  1984: portada1984,
  "El cuento de la Criada": portadaCriada,
  Subterra: portadaSubterra,
  "El Buzón de las Impuras": portadaBuzon,
  "El niño que enloqueció de amor": portadaNino,
  "Ami, el niño de las estrellas": portadaAmi,
};

export default {
  props: {
    libro: {
      type: Object,
      required: true,
    },
  },

  computed: {
    portada() {
      return portadas[this.libro.titulo];
    },
  },
};
</script>

<style lang="scss">
.libro-card {
  background-color: #ffffff;
  border: 1px solid #eadfbd;
  border-radius: 14px;
  padding: 20px;
  width: 280px;
  min-height: 500px;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: 0 4px 12px rgba(69, 5, 12, 0.08);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.libro-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 22px rgba(69, 5, 12, 0.15);
}

.libro-card h2 {
  width: 100%;
  min-height: 48px;
  margin: 0 0 15px;
  color: #45050c;
  font-size: 20px;
  line-height: 1.2;
  text-align: center;
}

.portada {
  width: 180px;
  height: 260px;
  margin-bottom: 15px;
  overflow: hidden;
  border-radius: 8px;
  background-color: #f7f1dc;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.12);
}

.portada img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.portada:hover img {
  transform: scale(1.04);
}

.libro-card p {
  width: 100%;
  margin: 5px 0;
  color: #5d4a4c;
  font-size: 15px;
  text-align: center;
}

.libro-card p:first-of-type {
  font-weight: 700;
  color: #45050c;
}

.libro-card p:last-of-type {
  margin-top: 10px;
  padding: 7px 12px;
  background-color: #f3e3b0;
  border-radius: 20px;
  color: #45050c;
  font-weight: 700;
}
.favorito {
  border: none;
  background: none;
  font-size: 25px;
  cursor: pointer;
  margin: 10px 0 5px;
  padding: 4px;
  transition: transform 0.2s ease;
}

.favorito:hover {
  transform: scale(1.2);
}

.acciones {
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-top: auto;
  width: 100%;
}

.acciones button {
  padding: 9px 14px;
  border: none;
  border-radius: 7px;
  cursor: pointer;
  font-weight: 600;
  transition: 0.2s ease;
}

.acciones button:first-child {
  background-color: #45050c;
  color: #ffffff;
}

.acciones button:first-child:hover {
  background-color: #650913;
}

.acciones button:last-child {
  background-color: #ead6d6;
  color: #45050c;
}

.acciones button:last-child:hover {
  background-color: #d9baba;
}
</style>

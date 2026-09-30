<template>
  <div class="detalle-libro">
    <h2>Detalle del Libro</h2>

    <div class="detalle-contenido">
      <div class="portada-detalle">
        <img :src="portada" :alt="`Portada de ${libro.titulo}`" />
      </div>

      <div class="informacion-libro">
        <p><strong>Título:</strong> {{ libro.titulo }}</p>
        <p><strong>Autor:</strong> {{ libro.autor }}</p>
        <p><strong>Género:</strong> {{ libro.genero }}</p>

        <div class="stock">
          <strong>Stock:</strong>

          <button @click="reducirStock">−</button>

          <span class="cantidad-stock">{{ libro.cantidad }}</span>

          <button @click="aumentarStock">+</button>
        </div>

        <p><strong>Descripción:</strong> {{ libro.descripcion }}</p>
      </div>
    </div>

    <button @click="mostrarFormularioEvaluacion = !mostrarFormularioEvaluacion">
      {{
        mostrarFormularioEvaluacion
          ? "Ocultar Evaluación"
          : "Agregar Evaluación"
      }}
    </button>

    <div v-show="mostrarFormularioEvaluacion" class="formulario-evaluacion">
      <label for="nombre">Nombre:</label>

      <input
        type="text"
        id="nombre"
        v-model="evaluacion.nombre"
        placeholder="Escribe tu nombre"
      />

      <label for="comentario">Evaluación:</label>

      <textarea
        id="comentario"
        v-model="evaluacion.comentario"
        placeholder="Escribe tu evaluación aquí..."
      ></textarea>

      <button @click="guardarEvaluacion">Guardar</button>
    </div>

    <div v-if="libro.evaluacion" class="evaluacion-guardada">
      <p><strong>Nombre:</strong> {{ libro.evaluacion.nombre }}</p>
      <p><strong>Comentario:</strong> {{ libro.evaluacion.comentario }}</p>
    </div>

    <button class="btn-volver" @click="$router.push('/libros')">
      Volver a la lista de libros
    </button>
  </div>
</template>

<script>
import api from "@/api/api";
import portada1984 from "@/assets/images/1984.jpg";
import portadaCriada from "@/assets/images/elcuentodelacriada.jpg";
import portadaSubterra from "@/assets/images/subterra.jpg";
import portadaBuzon from "@/assets/images/elbuzondelasimpuras.jpg";
import portadaAmi from "@/assets/images/ami.jpg";
import portadaNino from "@/assets/images/Elninoqueenloqueciodeamor-EduardoBarrios.jpg";

export default {
  props: {
    id: {
      type: String,
      required: true,
    },
  },

  data() {
    return {
      libro: {},
      evaluacion: {
        nombre: "",
        comentario: "",
      },
      mostrarFormularioEvaluacion: false,
    };
  },

  computed: {
    portada() {
      switch (this.libro.titulo) {
        case "1984":
          return portada1984;

        case "El cuento de la Criada":
          return portadaCriada;

        case "Subterra":
          return portadaSubterra;

        case "El Buzón de las Impuras":
          return portadaBuzon;

        case "El niño que enloqueció de amor":
          return portadaNino;

        case "Ami, el niño de las estrellas":
          return portadaAmi;

        default:
          return "";
      }
    },
  },

  async created() {
    const respuesta = await api.get(`/libros/${this.id}`);
    this.libro = respuesta.data;
  },

  methods: {
    async aumentarStock() {
      const nuevoStock = this.libro.cantidad + 1;

      const respuesta = await api.patch(`/libros/${this.libro.id}`, {
        cantidad: nuevoStock,
      });

      this.libro = respuesta.data;
    },

    async reducirStock() {
      if (this.libro.cantidad > 0) {
        const nuevoStock = this.libro.cantidad - 1;

        const respuesta = await api.patch(`/libros/${this.libro.id}`, {
          cantidad: nuevoStock,
        });

        this.libro = respuesta.data;
      }
    },

    async guardarEvaluacion() {
      const nuevaEvaluacion = {
        nombre: this.evaluacion.nombre,
        comentario: this.evaluacion.comentario,
      };

      const respuesta = await api.patch(`/libros/${this.libro.id}`, {
        evaluacion: nuevaEvaluacion,
      });

      this.libro = respuesta.data;

      alert("Evaluación guardada correctamente.");

      this.evaluacion.nombre = "";
      this.evaluacion.comentario = "";
    },
  },
};
</script>

<style scoped>
.detalle-libro {
  width: 90%;
  max-width: 900px;
  margin: 40px auto;
  padding: 35px;
  background-color: #ffffff;
  border: 1px solid #eadfbd;
  border-radius: 18px;
  box-shadow: 0 6px 18px rgba(69, 5, 12, 0.1);
  box-sizing: border-box;
  color: #45050c;
}

.detalle-libro h2 {
  margin: 0 0 30px;
  color: #45050c;
  font-size: 28px;
  text-align: center;
}

.detalle-contenido {
  display: grid;
  grid-template-columns: 260px 1fr;
  gap: 40px;
  align-items: center;
  margin-bottom: 30px;
}

.portada-detalle {
  width: 240px;
  height: 350px;
  overflow: hidden;
  border-radius: 12px;
  background-color: #f7f1dc;
  box-shadow: 0 6px 16px rgba(69, 5, 12, 0.15);
}

.portada-detalle img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.informacion-libro {
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
}

.informacion-libro p {
  margin: 12px 0;
}

.detalle-libro p {
  margin: 12px 0;
  line-height: 1.6;
  color: #5d4a4c;
  text-align: center;
}

.detalle-libro strong {
  color: #45050c;
}

.stock {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  width: fit-content;
  margin: 20px auto;
  padding: 10px 15px;
  background-color: #f3e3b0;
  border-radius: 10px;
  font-weight: 700;
}

.stock button {
  width: 30px;
  height: 30px;
  padding: 0;
  border: none;
  border-radius: 50%;
  background-color: #45050c;
  color: #ffffff;
  font-size: 18px;
  font-weight: bold;
  cursor: pointer;
  transition: transform 0.2s ease, background-color 0.2s ease;
}

.stock button:hover {
  background-color: #650913;
  transform: scale(1.08);
}

.cantidad-stock {
  min-width: 25px;
  text-align: center;
  font-size: 18px;
  color: #45050c;
}

.detalle-libro p:last-of-type {
  margin-top: 25px;
  padding: 18px;
  background-color: #fffdf7;
  border: 1px solid #eadfbd;
  border-radius: 10px;
}

.detalle-libro > button {
  display: block;
  margin: 25px auto;
  padding: 10px 20px;
  background-color: #45050c;
  color: #ffffff;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-family: inherit;
  font-size: 15px;
  font-weight: 700;
  transition: transform 0.2s ease, background-color 0.2s ease;
}

.detalle-libro > button:hover {
  background-color: #650913;
  transform: translateY(-1px);
}

.formulario-evaluacion {
  margin-top: 25px;
  padding: 25px;
  background-color: #fffdf7;
  border: 1px solid #eadfbd;
  border-radius: 12px;
}

.formulario-evaluacion label {
  display: block;
  margin-top: 15px;
  margin-bottom: 7px;
  color: #45050c;
  font-weight: 700;
  text-align: center;
}

.evaluacion-guardada p {
  margin: 8px 0;
  text-align: center;
}

.formulario-evaluacion input,
.formulario-evaluacion textarea {
  width: 100%;
  padding: 11px 12px;
  box-sizing: border-box;
  border: 1px solid #d8cdb0;
  border-radius: 8px;
  background-color: #ffffff;
  color: #45050c;
  font-family: inherit;
  font-size: 15px;
}

.formulario-evaluacion input:focus,
.formulario-evaluacion textarea:focus {
  outline: none;
  border-color: #b28a2e;
  box-shadow: 0 0 0 3px rgba(238, 207, 109, 0.35);
}

.formulario-evaluacion textarea {
  min-height: 100px;
  resize: vertical;
}

.evaluacion-guardada {
  margin-top: 25px;
  padding: 20px;
  background-color: #f3e3b0;
  border-radius: 12px;
}

.evaluacion-guardada p {
  margin: 8px 0;
}

.btn-volver {
  display: block;
  margin: 30px auto 0;
  padding: 10px 20px;
  background-color: #ead6d6 !important;
  color: #45050c !important;
}

.btn-volver:hover {
  background-color: #d9baba !important;
}

.portada-detalle {
  width: 220px;
  margin: 0 auto 25px;
}

.portada-detalle img {
  width: 100%;
  height: 320px;
  object-fit: cover;
  border-radius: 10px;
  box-shadow: 0 5px 15px rgba(69, 5, 12, 0.15);
}

@media (max-width: 700px) {
  .detalle-contenido {
    grid-template-columns: 1fr;
    gap: 25px;
  }

  .portada-detalle {
    margin: 0 auto;
  }

  .informacion-libro {
    width: 100%;
  }
}
</style>

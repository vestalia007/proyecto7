<template>
  <h1>Lista de Libros disponibles</h1>
  <FormularioLibro
    :libro-editar="editandoLibro"
    @agregar-libro="agregarLibro"
    @guardar-cambios="modificarLibro"
    @cancelar-edicion="cancelarEdicion"
  />
  <p v-if="!cargando && libros.length === 0">
    <strong>No hay libros registrados todavía.</strong>
  </p>

  <p>Cantidad de libros: {{ libros.length }}</p>

  <p v-if="cargando"><strong>Cargando libros...</strong></p>

  <p v-else-if="error">{{ error }}</p>

  <div class="filtros-libros">
    <select class="filtro-genero" v-model="generoSeleccionado">
      <option value="">Todos los géneros</option>

      <option v-for="genero in generos" :key="genero" :value="genero">
        {{ genero }}
      </option>
    </select>

    <input
      class="filtro-autor"
      type="text"
      v-model="autorSeleccionado"
      placeholder="Buscar por autor"
    />

    <select class="orden-libros" v-model="ordenSeleccionado">
      <option value="">Ordenar libros</option>
      <option value="titulo-asc">Título A-Z</option>
      <option value="titulo-desc">Título Z-A</option>
    </select>
  </div>

  <p v-if="!cargando && librosFiltrados.length === 0">
    <strong>No hay libros para el género seleccionado.</strong>
  </p>

  <div class="contenedor-libros">
    <LibroCard
      v-for="libro in librosFiltrados"
      :key="libro.id"
      :libro="libro"
      @modificar-libro="prepararEdicion"
      @eliminar-libro="eliminarLibro"
      @toggle-favorito="toggleFavorito"
    />
  </div>
</template>

<script>
import FormularioLibro from "../components/FormularioLibro.vue";
import LibroCard from "@/components/LibroCard.vue";

export default {
  components: {
    FormularioLibro,
    LibroCard,
  },

  data() {
    return {
      editandoLibro: null,
      autorSeleccionado: "",
      ordenSeleccionado: "",
    };
  },

  computed: {
    libros() {
      return this.$store.getters["productos/libros"];
    },

    generos() {
      return [
        "Novela",
        "Distopía",
        "Ciencia Ficción",
        "Romance",
        "Misterio",
        "Fantasía",
        "Novela Histórica",
        "Terror",
        "Infantil",
        "Biografía",
        "Historia",
        "Poesía",
      ];
    },

    generoSeleccionado: {
      get() {
        return this.$store.getters["filtros/generoSeleccionado"];
      },

      set(valor) {
        this.$store.dispatch("filtros/seleccionarGenero", valor);
      },
    },

    cargando() {
      return this.$store.getters["productos/cargando"];
    },

    error() {
      return this.$store.getters["productos/error"];
    },

    librosFiltrados() {
      let resultado = [...this.libros];

      if (this.generoSeleccionado) {
        resultado = resultado.filter(
          (libro) => libro.genero === this.generoSeleccionado
        );
      }

      if (this.autorSeleccionado) {
        resultado = resultado.filter((libro) =>
          libro.autor
            .toLowerCase()
            .includes(this.autorSeleccionado.toLowerCase())
        );
      }

      if (this.ordenSeleccionado === "titulo-asc") {
        resultado.sort((a, b) =>
          a.titulo.localeCompare(b.titulo, "es", {
            sensitivity: "base",
          })
        );
      }

      if (this.ordenSeleccionado === "titulo-desc") {
        resultado.sort((a, b) =>
          b.titulo.localeCompare(a.titulo, "es", {
            sensitivity: "base",
          })
        );
      }

      return resultado;
    },
  },

  created() {
    this.$store.dispatch("productos/cargarLibros");
  },

  methods: {
    agregarLibro(nuevoLibro) {
      this.$store.dispatch("productos/agregarLibro", nuevoLibro);
    },

    eliminarLibro(libro) {
      this.$store.dispatch("productos/eliminarLibro", libro.id);
    },

    prepararEdicion(libro) {
      this.editandoLibro = libro;

      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    },

    cancelarEdicion() {
      this.editandoLibro = null;
    },

    async modificarLibro(libroModificado) {
      await this.$store.dispatch("productos/modificarLibro", libroModificado);

      this.editandoLibro = null;
    },

    aumentarStock(libro) {
      libro.cantidad++;
      localStorage.setItem("libros", JSON.stringify(this.libros));
    },

    reducirStock(libro) {
      if (libro.cantidad > 0) {
        libro.cantidad--;
        localStorage.setItem("libros", JSON.stringify(this.libros));
      }
    },

    toggleFavorito(libro) {
      this.$store.dispatch("productos/toggleFavorito", libro);
    },
  },
};
</script>

<style>
table {
  border-collapse: collapse;
  width: 90%;
  margin: 20px auto;
}

th,
td {
  border: 1px solid #ccc;
  padding: 10px;
  text-align: center;
}

th {
  background-color: #e9ecef;
  font-weight: bold;
}

tbody tr:hover {
  background-color: #f1f3f5;
}

.tabla-contenedor {
  width: 95%;
  max-width: 1300px;
  margin: 30px auto;
  padding: 20px 0 70px;
  background-color: #f8f9fa;
  border: 1px solid #ddd;
  border-radius: 15px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.contenedor-libros {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 30px;
  padding: 35px 50px;
  max-width: 1200px;
  margin: 0 auto;
  justify-items: center;
}

.filtros-libros {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 15px;
  flex-wrap: wrap;
  width: 90%;
  max-width: 900px;
  margin: 25px auto 10px;
}

.filtro-genero,
.filtro-autor,
.orden-libros {
  width: 260px;
  padding: 12px 16px;
  box-sizing: border-box;
  border: 1px solid #d8cdb0;
  border-radius: 10px;
  background-color: #ffffff;
  color: #45050c;
  font-family: inherit;
  font-size: 15px;
  font-weight: 600;
  box-shadow: 0 3px 10px rgba(69, 5, 12, 0.08);
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
}

.filtro-autor::placeholder {
  color: #9b9090;
  font-weight: 400;
}

.filtro-genero,
.orden-libros {
  cursor: pointer;
}

.filtro-genero:hover,
.filtro-autor:hover,
.orden-libros:hover {
  border-color: #b28a2e;
}

.filtro-genero:focus,
.filtro-autor:focus,
.orden-libros:focus {
  outline: none;
  border-color: #b28a2e;
  box-shadow: 0 0 0 3px rgba(238, 207, 109, 0.35);
}
</style>

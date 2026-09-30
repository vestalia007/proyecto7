<template>
  <form @submit.prevent="agregarLibro">
    <div class="campos-principales">
      <div>
        <label for="titulo">Título del Libro</label>
        <input
          type="text"
          id="titulo"
          v-model="nuevoLibro.titulo"
          placeholder="Título del libro"
        />
      </div>

      <div>
        <label for="autor">Autor</label>
        <input
          type="text"
          id="autor"
          v-model="nuevoLibro.autor"
          placeholder="Autor del libro"
        />
      </div>

      <div>
        <label for="genero">Género</label>
        <select id="genero" v-model="nuevoLibro.genero">
          <option value="">Seleccione un género</option>
          <option value="Novela">Novela</option>
          <option value="Distopía">Distopía</option>
          <option value="Ciencia Ficción">Ciencia Ficción</option>
          <option value="Romance">Romance</option>
          <option value="Misterio">Misterio</option>
          <option value="Fantasía">Fantasía</option>
          <option value="Novela Histórica">Novela Histórica</option>
          <option value="Terror">Terror</option>
          <option value="Infantil">Infantil</option>

          <optgroup label="Otros">
            <option value="Biografía">Biografía</option>
            <option value="Historia">Historia</option>
            <option value="Poesía">Poesía</option>
          </optgroup>
        </select>
      </div>

      <div>
        <label for="cantidad">Stock</label>
        <input
          type="number"
          id="cantidad"
          v-model.number="nuevoLibro.cantidad"
          min="0"
          placeholder="Cantidad en stock"
        />
      </div>
    </div>

    <div>
      <label for="descripcion">Descripción del libro</label>
      <textarea
        id="descripcion"
        v-model="nuevoLibro.descripcion"
        placeholder="Descripción del libro"
      ></textarea>
    </div>

    <button v-if="libroEditar" type="button" @click="guardarCambios">
      Actualizar
    </button>

    <button v-if="libroEditar" type="button" @click="$emit('cancelar-edicion')">
      Cancelar
    </button>

    <button v-else type="submit">Agregar Libro</button>
  </form>
</template>

<script>
export default {
  props: {
    // Agregar la propiedad libroEditar*/
    libroEditar: {
      type: Object,
      default: null,
    },
  },

  data() {
    return {
      nuevoLibro: {
        titulo: "",
        autor: "",
        genero: "",
        cantidad: 0,
        descripcion: "",
      },
    };
  },

  watch: {
    // Atento a los cambios para realizar ediciones de libros
    libroEditar: {
      handler(nuevoLibro) {
        if (nuevoLibro) {
          this.nuevoLibro = { ...nuevoLibro };
        } else {
          this.nuevoLibro = {
            titulo: "",
            autor: "",
            genero: "",
            cantidad: 0,
            descripcion: "",
          };
        }
      },
      immediate: true,
    },
  },

  methods: {
    agregarLibro() {
      if (
        !this.nuevoLibro.titulo ||
        !this.nuevoLibro.autor ||
        !this.nuevoLibro.genero ||
        this.nuevoLibro.cantidad < 0
      ) {
        alert("Por favor, complete todos los campos correctamente.");
        return;
      }
      this.$emit("agregar-libro", { ...this.nuevoLibro });
      // Limpiar el formulario después de agregar el libro

      this.nuevoLibro = {
        titulo: "",
        autor: "",
        genero: "",
        cantidad: 0,
        descripcion: "",
      };
    },

    guardarCambios() {
      this.$emit("guardar-cambios", { ...this.nuevoLibro });
    },
  },
};
</script>

<style scoped>
form {
  width: 90%;
  max-width: 1050px;
  margin: 30px auto;
  padding: 28px 32px;
  border: 1px solid #eadfbd;
  border-radius: 16px;
  background-color: #ffffff;
  box-shadow: 0 5px 16px rgba(69, 5, 12, 0.08);
  box-sizing: border-box;
}

.campos-principales {
  display: grid;
  grid-template-columns: 2fr 2fr 1.5fr 1fr;
  gap: 18px;
  align-items: start;
}

.campos-principales > div,
form > div {
  display: flex;
  flex-direction: column;
}

form > div {
  margin-bottom: 18px;
}

label {
  margin-bottom: 7px;
  color: #45050c;
  font-weight: 700;
  font-size: 14px;
  text-align: left;
}

input,
select,
textarea {
  width: 100%;
  padding: 11px 12px;
  border: 1px solid #d8cdb0;
  border-radius: 8px;
  box-sizing: border-box;
  background-color: #fffdf7;
  color: #45050c;
  font-family: inherit;
  font-size: 15px;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
}

input::placeholder,
textarea::placeholder {
  color: #9b9090;
}

input:focus,
select:focus,
textarea:focus {
  outline: none;
  border-color: #b28a2e;
  box-shadow: 0 0 0 3px rgba(238, 207, 109, 0.35);
}

textarea {
  min-height: 90px;
  resize: vertical;
}

button {
  padding: 10px 20px;
  margin-right: 8px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-family: inherit;
  font-size: 15px;
  font-weight: 700;
  transition: transform 0.2s ease, background-color 0.2s ease;
}

button:hover {
  transform: translateY(-1px);
}

button:first-of-type {
  background-color: #45050c;
  color: #ffffff;
}

button:first-of-type:hover {
  background-color: #650913;
}

button:nth-of-type(2) {
  background-color: #ead6d6;
  color: #45050c;
}

button:nth-of-type(2):hover {
  background-color: #d9baba;
}

button:focus {
  outline: 3px solid rgba(238, 207, 109, 0.55);
  outline-offset: 2px;
}
</style>

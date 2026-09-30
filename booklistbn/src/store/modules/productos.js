import api from "@/api/api";

export default {
  namespaced: true,

  state: {
    libros: [],
    cargando: false,
    error: null,
  },

  mutations: {
    SET_LIBROS(state, libros) {
      state.libros = libros;
    },

    SET_CARGANDO(state, valor) {
      state.cargando = valor;
    },

    SET_ERROR(state, mensaje) {
      state.error = mensaje;
    },

    AGREGAR_LIBRO(state, libro) {
      state.libros.push(libro);
    },

    ELIMINAR_LIBRO(state, id) {
      state.libros = state.libros.filter((libro) => libro.id !== id);
    },

    ACTUALIZAR_LIBRO(state, libroActualizado) {
      const indice = state.libros.findIndex(
        (libro) => libro.id === libroActualizado.id
      );

      if (indice !== -1) {
        state.libros.splice(indice, 1, libroActualizado);
      }
    },

    ACTUALIZAR_FAVORITO(state, libroActualizado) {
      const indice = state.libros.findIndex(
        (libro) => libro.id === libroActualizado.id
      );

      if (indice !== -1) {
        state.libros.splice(indice, 1, libroActualizado);
      }
    },
  },

  actions: {
    async cargarLibros({ commit }) {
      commit("SET_CARGANDO", true);
      commit("SET_ERROR", null);

      try {
        const respuesta = await api.get("/libros");

        commit("SET_LIBROS", respuesta.data);
      } catch (error) {
        commit("SET_ERROR", "No se pudieron cargar los libros.");
      } finally {
        commit("SET_CARGANDO", false);
      }
    },

    async agregarLibro({ commit }, nuevoLibro) {
      const respuesta = await api.post("/libros", nuevoLibro);

      commit("AGREGAR_LIBRO", respuesta.data);
    },

    async eliminarLibro({ commit }, id) {
      await api.delete(`/libros/${id}`);

      commit("ELIMINAR_LIBRO", id);
    },

    async modificarLibro({ commit }, libroModificado) {
      const respuesta = await api.put(
        `/libros/${libroModificado.id}`,
        libroModificado
      );

      commit("ACTUALIZAR_LIBRO", respuesta.data);
    },

    async toggleFavorito({ commit }, libro) {
      const nuevoFavorito = !libro.favorito;

      const respuesta = await api.patch(`/libros/${libro.id}`, {
        favorito: nuevoFavorito,
      });

      commit("ACTUALIZAR_FAVORITO", respuesta.data);
    },
  },

  getters: {
    libros(state) {
      return state.libros;
    },

    cargando(state) {
      return state.cargando;
    },

    error(state) {
      return state.error;
    },
  },
};

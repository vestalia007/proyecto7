export default {
  namespaced: true,

  state: {
    generoSeleccionado: "",
  },

  mutations: {
    SET_GENERO(state, genero) {
      state.generoSeleccionado = genero;
    },
  },

  actions: {
    seleccionarGenero({ commit }, genero) {
      commit("SET_GENERO", genero);
    },
  },

  getters: {
    generoSeleccionado(state) {
      return state.generoSeleccionado;
    },
  },
};

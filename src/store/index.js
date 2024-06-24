
/* NÃO FUNCIONA, NÃO SEI PQ FIZ ISSO KKK */
import { createStore } from 'vuex';

const store = createStore({
  state: {
    fichas: [] // Estado inicial das fichas
  },
  mutations: {
    adicionarFicha(state, ficha) {
      state.fichas.push(ficha);
    },
    salvarFichas(state) {
      localStorage.setItem('fichas', JSON.stringify(state.fichas));
    },
    carregarFichas(state) {
      const fichas = localStorage.getItem('fichas');
      if (fichas) {
        state.fichas = JSON.parse(fichas);
      }
    }
    // Outras mutações necessárias
  },
  actions: {
    // Caso necessário, adicionar ações para processamento assíncrono
  },
  getters: {
    // Caso necessário, adicionar getters para acesso aos estados calculados
  }
});

export default store;
/* NÃO FUNCIONA */

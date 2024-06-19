<template>
  <q-page>
    <visualizarFichaComp :ficha="fichaSelecionada" />
  </q-page>
</template>

<script>
import visualizarFichaComp from '../components/visualizarFichaComp.vue';

export default {
  components: {
    visualizarFichaComp
  },
  data() {
    return {
      fichaSelecionada: null
    };
  },
  created() {
    // Busca a ficha correspondente com base no parâmetro de ID na rota
    const fichas = JSON.parse(localStorage.getItem('fichas')) || [];
    this.fichaSelecionada = fichas.find(f => f.id === parseInt(this.$route.params.id));
  }
};
</script>

<style scoped>
/* Estilos específicos para a página de visualizar ficha */
</style>

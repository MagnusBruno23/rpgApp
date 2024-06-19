<template>
  <q-page>
    <q-btn label="Adicionar Ficha" @click="navegarParaAdicionar" />

    <div v-for="ficha in fichas" :key="ficha.id" class="q-pa-sm">
      <q-card>
        <q-card-section class="row no-wrap">
          <q-img :src="ficha.foto" v-if="ficha.foto" style="width: 200px; height: 200px; margin-right: 16px;" />
          <div>
            <div class="text-h6">{{ ficha.nome }}</div>
            <div>Classe: {{ ficha.classe.value }}</div>
            <div>Raça: {{ ficha.raca.value }}</div>
            <div>Vantagens: {{ ficha.vantagens.map(v => v.nome).join(', ') }}</div>
            <div>Desvantagens: {{ ficha.desvantagens.join(', ') }}</div>
            <div v-if="ficha.atributos">
              <strong>Atributos:</strong>
              <div>Força: {{ ficha.atributos.forca }}</div>
              <div>Destreza: {{ ficha.atributos.destreza }}</div>
              <div>Agilidade: {{ ficha.atributos.agilidade }}</div>
              <div>Constituição: {{ ficha.atributos.constituicao }}</div>
              <div>Inteligência: {{ ficha.atributos.inteligencia }}</div>
            </div>
          </div>
        </q-card-section>
        <q-card-actions align="right">
          <q-btn flat label="Editar" @click="navegarParaEditar(ficha)" />
          <q-btn flat label="Visualizar" @click="visualizarFicha(ficha)" />
          <q-btn flat label="Excluir" color="negative" @click="excluirFicha(ficha.id)" />
        </q-card-actions>
      </q-card>
    </div>

    <visualizar-ficha-comp
      :ficha="fichaSelecionada"
      :show.sync="showVisualizarModal"
    />
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
      fichas: [],
      showVisualizarModal: false,
      fichaSelecionada: null
    };
  },
  created() {
    this.carregarFichas();
  },
  methods: {
    navegarParaAdicionar() {
      this.$router.push('/adicionar-ficha');
    },
    navegarParaEditar(ficha) {
      this.$router.push(`/editar-ficha/${ficha.id}`);
    },
    visualizarFicha(ficha) {
      this.fichaSelecionada = ficha;
      this.showVisualizarModal = true;
    },
    excluirFicha(id) {
      this.fichas = this.fichas.filter(f => f.id !== id);
      this.salvarFichas();
    },
    salvarFichas() {
      localStorage.setItem('fichas', JSON.stringify(this.fichas));
    },
    carregarFichas() {
      const fichas = JSON.parse(localStorage.getItem('fichas')) || [];
      this.fichas = fichas.map(ficha => ({
        ...ficha,
        vantagens: Array.isArray(ficha.vantagens) ? ficha.vantagens : [],
        desvantagens: Array.isArray(ficha.desvantagens) ? ficha.desvantagens : []
      }));
    }
  }
};
</script>

<style scoped>
/* Estilos específicos para a página de listagem e gerenciamento de fichas */
</style>

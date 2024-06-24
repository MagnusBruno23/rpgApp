<template>
  <q-page class="content-wrapper">
    <q-btn
      label="Adicionar Ficha"
      @click="navegarParaAdicionar"
      style="font-size: 1.2em; padding: 15px 30px; margin-bottom: 20px;"
    />

    <div v-for="ficha in fichas" :key="ficha.id" class="q-pa-sm col-12 col-md-6 col-lg-4">
      <q-card class="content">
        <q-card-section class="row no-wrap items-center">
          <q-img
            :src="ficha.foto"
            v-if="ficha.foto"
            style="width: 100px; height: 100px; margin-right: 16px;"
          />
          <div>
            <div class="text-h6">{{ ficha.nome }}</div>
            <div>Level: {{ ficha.level }}</div>
            <div>Classe: {{ ficha.classe.value }}</div>
            <div>Raça: {{ ficha.raca.value }}</div>
            <div>Vantagens: {{ ficha.vantagens.map(v => v.nome).join(', ') }}</div>
            <div>Desvantagens: {{ ficha.desvantagens.map(d => d.nome).join(', ') }}</div>
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
          <q-btn flat label="Excluir" color="negative" @click="confirmarExclusao(ficha)" />
        </q-card-actions>
      </q-card>
    </div>

    <visualizar-ficha-comp
      :ficha="fichaSelecionada"
      :show.sync="showVisualizarModal"
      @close="showVisualizarModal = false"
    />

    <q-dialog v-model="showConfirmarExclusao">
      <q-card>
        <q-card-section class="row items-center">
          <q-icon name="warning" color="red" size="2em" />
          <div class="text-h6 q-ml-md">Você realmente deseja apagar o personagem?</div>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Não" color="primary" @click="showConfirmarExclusao = false" />
          <q-btn flat label="Sim" color="negative" @click="excluirFichaConfirmada" />
        </q-card-actions>
      </q-card>
    </q-dialog>
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
      showConfirmarExclusao: false,
      fichaSelecionada: null,
      fichaParaExcluir: null
    };
  },
  created() {
    this.carregarFichas();
  },
  methods: {
    navegarParaAdicionar() {
      this.$router.push('/adicionar-ficha/');
    },
    navegarParaEditar(ficha) {
      this.$router.push(`/editar-ficha/${ficha.id}`);
    },
    visualizarFicha(ficha) {
      this.fichaSelecionada = ficha;
      this.showVisualizarModal = true;
    },
    confirmarExclusao(ficha) {
      this.fichaParaExcluir = ficha;
      this.showConfirmarExclusao = true;
    },
    excluirFichaConfirmada() {
      this.fichas = this.fichas.filter(f => f.id !== this.fichaParaExcluir.id);
      this.salvarFichas();
      this.showConfirmarExclusao = false;
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
.content-wrapper {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background: url('~assets/background.jpg') no-repeat center center fixed;
  background-size: cover;
}

.content {
  background-color: #e1c596; /* Fundo branco semitransparente para os cartões */
  padding: 30px; /* Ajuste o padding para aumentar o espaço interno dos cards */
  border-radius: 10px;
  width: 400px; /* Tamanho da ficha */
  margin-bottom: 20px;
}

.q-card-section {
  align-items: center;
}

.q-card-actions {
  display: flex;
  justify-content: flex-end;
}

</style>

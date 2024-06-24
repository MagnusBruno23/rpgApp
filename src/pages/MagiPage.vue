<template>
  <q-page padding>
    <q-card class="q-pa-md">
      <q-card-section class="text-h6">Magias</q-card-section>
      <div class="q-mt-md">
        <q-btn label="Adicionar Magia" @click="showAdicionarMagiaModal = true" />
      </div>
      <q-card-section>
        <div v-for="(magia, index) in magias" :key="index" class="q-pa-sm">
          <div class="row items-center q-mb-md">
            <div class="col">{{ magia.nome }}</div>
            <q-btn flat icon="edit" @click="editarMagia(index)" />
            <q-btn flat icon="visibility" @click="visualizarMagia(index)" />
            <q-btn flat icon="delete" color="negative" @click="confirmarExclusaoMagia(index)" />
          </div>
        </div>
      </q-card-section>
    </q-card>

    <!-- Modal para Adicionar ou Editar Magia -->
    <q-dialog v-model="showAdicionarMagiaModal">
      <q-card>
        <q-card-section class="text-h6">{{ magiaEmEdicaoIndex === null ? 'Adicionar Magia' : 'Editar Magia' }}</q-card-section>
        <q-card-section>
          <q-input filled v-model="magiaEmEdicao.nome" label="Nome da Magia" />
          <q-input filled v-model="magiaEmEdicao.descricao" label="Descrição" type="textarea" />
          <q-input filled v-model.number="magiaEmEdicao.custo" label="Custo" type="number" />
          <q-input filled v-model.number="magiaEmEdicao.cooldown" label="Cooldown" type="number" />
        </q-card-section>
        <q-card-actions align="right">
          <q-btn flat label="Cancelar" @click="cancelarAdicionarMagia" />
          <q-btn flat label="Salvar" color="primary" @click="salvarMagia" />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <!-- Modal para Visualizar Magia -->
    <q-dialog v-model="showVisualizarMagiaModal">
      <q-card>
        <q-card-section class="text-h6">Visualizar Magia</q-card-section>
        <q-card-section>
          <div><strong>Nome:</strong> {{ magiaEmEdicao.nome }}</div>
          <div><strong>Descrição:</strong> {{ magiaEmEdicao.descricao }}</div>
          <div><strong>Custo:</strong> {{ magiaEmEdicao.custo }}</div>
          <div><strong>Cooldown:</strong> {{ magiaEmEdicao.cooldown }}</div>
        </q-card-section>
        <q-card-actions align="right">
          <q-btn flat label="Fechar" @click="showVisualizarMagiaModal = false" />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <!-- Modal para Confirmar Exclusão -->
    <q-dialog v-model="showConfirmarExclusaoModal">
      <q-card>
        <q-card-section class="text-h6">Confirmar Exclusão</q-card-section>
        <q-card-section>
          <p>Você realmente deseja apagar esta magia?</p>
        </q-card-section>
        <q-card-actions align="right">
          <q-btn flat label="Cancelar" @click="showConfirmarExclusaoModal = false" />
          <q-btn flat label="Excluir" color="negative" @click="excluirMagiaConfirmada" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
export default {
  data() {
    return {
      magias: [],
      showAdicionarMagiaModal: false,
      showVisualizarMagiaModal: false,
      showConfirmarExclusaoModal: false,
      magiaEmEdicaoIndex: null,
      magiaEmEdicao: {
        nome: '',
        descricao: '',
        custo: 0,
        cooldown: 0
      }
    };
  },
  methods: {
    salvarMagia() {
      if (this.magiaEmEdicao.nome && this.magiaEmEdicao.descricao && this.magiaEmEdicao.custo >= 0 && this.magiaEmEdicao.cooldown >= 0) {
        if (this.magiaEmEdicaoIndex === null) {
          this.magias.push({ ...this.magiaEmEdicao });
        } else {
          this.magias.splice(this.magiaEmEdicaoIndex, 1, { ...this.magiaEmEdicao });
        }
        this.magiaEmEdicao = {
          nome: '',
          descricao: '',
          custo: 0,
          cooldown: 0
        };
        this.magiaEmEdicaoIndex = null;
        this.showAdicionarMagiaModal = false;
        this.salvarMagias();
      }
    },
    cancelarAdicionarMagia() {
      this.magiaEmEdicao = {
        nome: '',
        descricao: '',
        custo: 0,
        cooldown: 0
      };
      this.magiaEmEdicaoIndex = null;
      this.showAdicionarMagiaModal = false;
    },
    carregarMagias() {
      const fichaId = parseInt(this.$route.params.id, 10);
      const fichas = JSON.parse(localStorage.getItem('fichas')) || [];
      const ficha = fichas.find(f => f.id === fichaId);
      if (ficha && ficha.magias) {
        this.magias = ficha.magias;
      }
    },
    salvarMagias() {
      const fichaId = parseInt(this.$route.params.id, 10);
      const fichas = JSON.parse(localStorage.getItem('fichas')) || [];
      const fichaIndex = fichas.findIndex(f => f.id === fichaId);
      if (fichaIndex !== -1) {
        fichas[fichaIndex].magias = this.magias;
        localStorage.setItem('fichas', JSON.stringify(fichas));
      }
    },
    editarMagia(index) {
      this.magiaEmEdicao = { ...this.magias[index] };
      this.magiaEmEdicaoIndex = index;
      this.showAdicionarMagiaModal = true;
    },
    visualizarMagia(index) {
      this.magiaEmEdicao = { ...this.magias[index] };
      this.showVisualizarMagiaModal = true;
    },
    confirmarExclusaoMagia(index) {
      this.magiaEmEdicaoIndex = index;
      this.showConfirmarExclusaoModal = true;
    },
    excluirMagiaConfirmada() {
      this.magias.splice(this.magiaEmEdicaoIndex, 1);
      this.magiaEmEdicaoIndex = null;
      this.showConfirmarExclusaoModal = false;
      this.salvarMagias();
    }
  },
  created() {
    this.carregarMagias();
  }
};
</script>

<style scoped>
.q-pa-md {
  background-color: #e1c596;
}
</style>

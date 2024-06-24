<template>
  <q-page padding>
    <q-card class="q-pa-md">
      <q-card-section class="text-h6">Habilidades</q-card-section>
      <div class="q-mt-md">
          <q-btn label="Adicionar Habilidade" @click="showAdicionarHabilidadeModal = true" />
        </div>
      <q-card-section>
        <div v-for="(habilidade, index) in habilidades" :key="index" class="q-pa-sm">
          <div class="row items-center q-mb-md">
            <div class="col">{{ habilidade.nome }}</div>
            <q-btn flat icon="edit" @click="editarHabilidade(index)" />
            <q-btn flat icon="visibility" @click="visualizarHabilidade(index)" />
            <q-btn flat icon="delete" color="negative" @click="confirmarExclusaoHabilidade(index)" />
          </div>
        </div>
      </q-card-section>
    </q-card>

    <!-- Modal para Adicionar ou Editar Habilidade -->
    <q-dialog v-model="showAdicionarHabilidadeModal">
      <q-card>
        <q-card-section class="text-h6">{{ habilidadeEmEdicaoIndex === null ? 'Adicionar Habilidade' : 'Editar Habilidade' }}</q-card-section>
        <q-card-section>
          <q-input filled v-model="habilidadeEmEdicao.nome" label="Nome da Habilidade" />
          <q-input filled v-model="habilidadeEmEdicao.descricao" label="Descrição" type="textarea" />
          <q-input filled v-model.number="habilidadeEmEdicao.custo" label="Custo" type="number" />
          <q-input filled v-model.number="habilidadeEmEdicao.cooldown" label="Cooldown" type="number" />
          <q-input filled v-model.number="habilidadeEmEdicao.cooldown" label="Dano" type="number" />
        </q-card-section>
        <q-card-actions align="right">
          <q-btn flat label="Cancelar" @click="cancelarAdicionarHabilidade" />
          <q-btn flat label="Salvar" color="primary" @click="salvarHabilidade" />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <!-- Modal para Visualizar Habilidade -->
    <q-dialog v-model="showVisualizarHabilidadeModal">
      <q-card>
        <q-card-section class="text-h6">Visualizar Habilidade</q-card-section>
        <q-card-section>
          <div><strong>Nome:</strong> {{ habilidadeEmEdicao.nome }}</div>
          <div><strong>Descrição:</strong> {{ habilidadeEmEdicao.descricao }}</div>
          <div><strong>Custo:</strong> {{ habilidadeEmEdicao.custo }}</div>
          <div><strong>Cooldown:</strong> {{ habilidadeEmEdicao.cooldown }}</div>
          <div><strong>Dano:</strong> {{ habilidadeEmEdicao.cooldown }}</div>
        </q-card-section>
        <q-card-actions align="right">
          <q-btn flat label="Fechar" @click="showVisualizarHabilidadeModal = false" />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <!-- Modal para Confirmar Exclusão -->
    <q-dialog v-model="showConfirmarExclusaoModal">
      <q-card>
        <q-card-section class="text-h6">Confirmar Exclusão</q-card-section>
        <q-card-section>
          Você realmente deseja apagar esta habilidade?
        </q-card-section>
        <q-card-actions align="right">
          <q-btn flat label="Não" @click="showConfirmarExclusaoModal = false" />
          <q-btn flat label="Sim" color="primary" @click="excluirHabilidadeConfirmada" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>
<script>
export default {
  data() {
    return {
      habilidades: [],
      showAdicionarHabilidadeModal: false,
      showVisualizarHabilidadeModal: false,
      showConfirmarExclusaoModal: false,
      habilidadeEmEdicaoIndex: null,
      habilidadeParaExcluirIndex: null,
      habilidadeEmEdicao: {
        nome: '',
        descricao: '',
        custo: 0,
        cooldown: 0
      }
    };
  },
  methods: {
    salvarHabilidade() {
      if (this.habilidadeEmEdicao.nome && this.habilidadeEmEdicao.descricao && this.habilidadeEmEdicao.custo >= 0 && this.habilidadeEmEdicao.cooldown >= 0) {
        if (this.habilidadeEmEdicaoIndex === null) {
          this.habilidades.push({ ...this.habilidadeEmEdicao });
        } else {
          this.habilidades.splice(this.habilidadeEmEdicaoIndex, 1, { ...this.habilidadeEmEdicao });
        }
        this.habilidadeEmEdicao = {
          nome: '',
          descricao: '',
          custo: 0,
          cooldown: 0
        };
        this.habilidadeEmEdicaoIndex = null;
        this.showAdicionarHabilidadeModal = false;
        this.salvarHabilidades();
      }
    },
    cancelarAdicionarHabilidade() {
      this.habilidadeEmEdicao = {
        nome: '',
        descricao: '',
        custo: 0,
        cooldown: 0
      };
      this.habilidadeEmEdicaoIndex = null;
      this.showAdicionarHabilidadeModal = false;
    },
    carregarHabilidades() {
      const fichaId = parseInt(this.$route.params.id, 10);
      const fichas = JSON.parse(localStorage.getItem('fichas')) || [];
      const ficha = fichas.find(f => f.id === fichaId);
      if (ficha && ficha.habilidades) {
        this.habilidades = ficha.habilidades;
      }
    },
    salvarHabilidades() {
      const fichaId = parseInt(this.$route.params.id, 10);
      const fichas = JSON.parse(localStorage.getItem('fichas')) || [];
      const fichaIndex = fichas.findIndex(f => f.id === fichaId);
      if (fichaIndex !== -1) {
        fichas[fichaIndex].habilidades = this.habilidades;
        localStorage.setItem('fichas', JSON.stringify(fichas));
      }
    },
    editarHabilidade(index) {
      this.habilidadeEmEdicao = { ...this.habilidades[index] };
      this.habilidadeEmEdicaoIndex = index;
      this.showAdicionarHabilidadeModal = true;
    },
    visualizarHabilidade(index) {
      this.habilidadeEmEdicao = { ...this.habilidades[index] };
      this.showVisualizarHabilidadeModal = true;
    },
    confirmarExclusaoHabilidade(index) {
      this.habilidadeParaExcluirIndex = index;
      this.showConfirmarExclusaoModal = true;
    },
    excluirHabilidadeConfirmada() {
      if (this.habilidadeParaExcluirIndex !== null) {
        this.habilidades.splice(this.habilidadeParaExcluirIndex, 1);
        this.salvarHabilidades();
        this.showConfirmarExclusaoModal = false;
        this.habilidadeParaExcluirIndex = null;
      }
    }
  },
  created() {
    this.carregarHabilidades();
  }
};
</script>
<style scoped>
.q-pa-md {
  background-color: #e1c596;
}

.row.items-center {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.q-card-section {
  display: flex;
  flex-direction: column;
}

.q-card-actions {
  display: flex;
  justify-content: flex-end;
}
</style>

<template>
  <q-page padding>
    <q-card class="q-pa-md">
      <q-card-section class="text-h6">Itens</q-card-section>
      <div class="q-mt-md">
        <q-btn label="Adicionar Item" @click="showAdicionarItemModal = true" />
      </div>
      <q-card-section>
        <div v-for="(item, index) in itens" :key="index" class="q-pa-sm">
          <div class="row items-center q-mb-md">
            <div class="col">{{ item.nome }}</div>
            <q-btn flat icon="edit" @click="editarItem(index)" />
            <q-btn flat icon="visibility" @click="visualizarItem(index)" />
            <q-btn flat icon="delete" color="negative" @click="confirmarExclusaoItem(index)" />
          </div>
        </div>
      </q-card-section>
    </q-card>

    <!-- Modal para Adicionar ou Editar Item -->
    <q-dialog v-model="showAdicionarItemModal">
      <q-card>
        <q-card-section class="text-h6">{{ itemEmEdicaoIndex === null ? 'Adicionar Item' : 'Editar Item' }}</q-card-section>
        <q-card-section>
          <q-input filled v-model="itemEmEdicao.nome" label="Nome do Item" />
          <q-input filled v-model="itemEmEdicao.descricao" label="Descrição" type="textarea" />
        </q-card-section>
        <q-card-actions align="right">
          <q-btn flat label="Cancelar" @click="cancelarAdicionarItem" />
          <q-btn flat label="Salvar" color="primary" @click="salvarItem" />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <!-- Modal para Visualizar Item -->
    <q-dialog v-model="showVisualizarItemModal">
      <q-card>
        <q-card-section class="text-h6">Visualizar Item</q-card-section>
        <q-card-section>
          <div><strong>Nome:</strong> {{ itemEmEdicao.nome }}</div>
          <div><strong>Descrição:</strong> {{ itemEmEdicao.descricao }}</div>
        </q-card-section>
        <q-card-actions align="right">
          <q-btn flat label="Fechar" @click="showVisualizarItemModal = false" />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <!-- Modal para Confirmar Exclusão -->
    <q-dialog v-model="showConfirmarExclusaoModal">
      <q-card>
        <q-card-section class="text-h6">Confirmar Exclusão</q-card-section>
        <q-card-section>
          Você realmente deseja apagar este item?
        </q-card-section>
        <q-card-actions align="right">
          <q-btn flat label="Não" @click="showConfirmarExclusaoModal = false" />
          <q-btn flat label="Sim" color="primary" @click="excluirItemConfirmada" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
export default {
  data() {
    return {
      itens: [],
      showAdicionarItemModal: false,
      showVisualizarItemModal: false,
      showConfirmarExclusaoModal: false,
      itemEmEdicaoIndex: null,
      itemParaExcluirIndex: null,
      itemEmEdicao: {
        nome: '',
        descricao: ''
      }
    };
  },
  methods: {
    salvarItem() {
      if (this.itemEmEdicao.nome && this.itemEmEdicao.descricao) {
        if (this.itemEmEdicaoIndex === null) {
          this.itens.push({ ...this.itemEmEdicao });
        } else {
          this.itens.splice(this.itemEmEdicaoIndex, 1, { ...this.itemEmEdicao });
        }
        this.itemEmEdicao = {
          nome: '',
          descricao: ''
        };
        this.itemEmEdicaoIndex = null;
        this.showAdicionarItemModal = false;
        this.salvarItens();
      }
    },
    cancelarAdicionarItem() {
      this.itemEmEdicao = {
        nome: '',
        descricao: ''
      };
      this.itemEmEdicaoIndex = null;
      this.showAdicionarItemModal = false;
    },
    carregarItens() {
      const fichaId = parseInt(this.$route.params.id, 10);
      const fichas = JSON.parse(localStorage.getItem('fichas')) || [];
      const ficha = fichas.find(f => f.id === fichaId);
      if (ficha && ficha.itens) {
        this.itens = ficha.itens;
      }
    },
    salvarItens() {
      const fichaId = parseInt(this.$route.params.id, 10);
      const fichas = JSON.parse(localStorage.getItem('fichas')) || [];
      const fichaIndex = fichas.findIndex(f => f.id === fichaId);
      if (fichaIndex !== -1) {
        fichas[fichaIndex].itens = this.itens;
        localStorage.setItem('fichas', JSON.stringify(fichas));
      }
    },
    editarItem(index) {
      this.itemEmEdicao = { ...this.itens[index] };
      this.itemEmEdicaoIndex = index;
      this.showAdicionarItemModal = true;
    },
    visualizarItem(index) {
      this.itemEmEdicao = { ...this.itens[index] };
      this.showVisualizarItemModal = true;
    },
    confirmarExclusaoItem(index) {
      this.itemParaExcluirIndex = index;
      this.showConfirmarExclusaoModal = true;
    },
    excluirItemConfirmada() {
      if (this.itemParaExcluirIndex !== null) {
        this.itens.splice(this.itemParaExcluirIndex, 1);
        this.salvarItens();
        this.showConfirmarExclusaoModal = false;
        this.itemParaExcluirIndex = null;
      }
    }
  },
  created() {
    this.carregarItens();
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

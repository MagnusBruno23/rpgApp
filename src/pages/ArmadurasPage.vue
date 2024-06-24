<template>
  <q-page padding>
    <q-card class="q-pa-md">
      <q-card-section class="text-h6">Armaduras</q-card-section>
      <div class="q-mt-md">
        <q-btn label="Adicionar Armadura" @click="showAdicionarArmaduraModal = true" />
      </div>
      <q-card-section>
        <div v-for="(armadura, index) in armaduras" :key="index" class="q-pa-sm">
          <div class="row items-center q-mb-md">
            <div class="col">{{ armadura.nome }}</div>
            <q-btn flat icon="edit" @click="editarArmadura(index)" />
            <q-btn flat icon="visibility" @click="visualizarArmadura(index)" />
            <q-btn flat icon="delete" color="negative" @click="confirmarExclusaoArmadura(index)" />
          </div>
        </div>
      </q-card-section>
    </q-card>

    <!-- Modal para Adicionar ou Editar Armadura -->
    <q-dialog v-model="showAdicionarArmaduraModal">
      <q-card>
        <q-card-section class="text-h6">{{ armaduraEmEdicaoIndex === null ? 'Adicionar Armadura' : 'Editar Armadura' }}</q-card-section>
        <q-card-section>
          <q-input filled v-model="armaduraEmEdicao.nome" label="Nome da Armadura" />
          <q-input filled v-model.number="armaduraEmEdicao.atk" label="ATK" type="number" />
          <q-input filled v-model.number="armaduraEmEdicao.atkM" label="ATK M" type="number" />
          <q-input filled v-model.number="armaduraEmEdicao.rdf" label="RDF" type="number" />
          <q-input filled v-model.number="armaduraEmEdicao.rdm" label="RDM" type="number" />
        </q-card-section>
        <q-card-actions align="right">
          <q-btn flat label="Cancelar" @click="cancelarAdicionarArmadura" />
          <q-btn flat label="Salvar" color="primary" @click="salvarArmadura" />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <!-- Modal para Visualizar Armadura -->
    <q-dialog v-model="showVisualizarArmaduraModal">
      <q-card>
        <q-card-section class="text-h6">Visualizar Armadura</q-card-section>
        <q-card-section>
          <div><strong>Nome:</strong> {{ armaduraEmEdicao.nome }}</div>
          <div><strong>ATK:</strong> {{ armaduraEmEdicao.atk }}</div>
          <div><strong>ATK M:</strong> {{ armaduraEmEdicao.atkM }}</div>
          <div><strong>RDF:</strong> {{ armaduraEmEdicao.rdf }}</div>
          <div><strong>RDM:</strong> {{ armaduraEmEdicao.rdm }}</div>
        </q-card-section>
        <q-card-actions align="right">
          <q-btn flat label="Fechar" @click="showVisualizarArmaduraModal = false" />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <!-- Modal para Confirmar Exclusão -->
    <q-dialog v-model="showConfirmarExclusaoModal">
      <q-card>
        <q-card-section class="text-h6">Confirmar Exclusão</q-card-section>
        <q-card-section>
          Você realmente deseja apagar esta armadura?
        </q-card-section>
        <q-card-actions align="right">
          <q-btn flat label="Não" @click="showConfirmarExclusaoModal = false" />
          <q-btn flat label="Sim" color="primary" @click="excluirArmaduraConfirmada" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
export default {
  data() {
    return {
      armaduras: [],
      showAdicionarArmaduraModal: false,
      showVisualizarArmaduraModal: false,
      showConfirmarExclusaoModal: false,
      armaduraEmEdicaoIndex: null,
      armaduraParaExcluirIndex: null,
      armaduraEmEdicao: {
        nome: '',
        atk: 0,
        atkM: 0,
        rdf: 0,
        rdm: 0
      }
    };
  },
  methods: {
    salvarArmadura() {
      if (this.armaduraEmEdicao.nome && this.armaduraEmEdicao.atk >= 0 && this.armaduraEmEdicao.atkM >= 0 && this.armaduraEmEdicao.rdf >= 0 && this.armaduraEmEdicao.rdm >= 0) {
        if (this.armaduraEmEdicaoIndex === null) {
          this.armaduras.push({ ...this.armaduraEmEdicao });
        } else {
          this.armaduras.splice(this.armaduraEmEdicaoIndex, 1, { ...this.armaduraEmEdicao });
        }
        this.armaduraEmEdicao = {
          nome: '',
          atk: 0,
          atkM: 0,
          rdf: 0,
          rdm: 0
        };
        this.armaduraEmEdicaoIndex = null;
        this.showAdicionarArmaduraModal = false;
        this.salvarArmaduras();
      }
    },
    cancelarAdicionarArmadura() {
      this.armaduraEmEdicao = {
        nome: '',
        atk: 0,
        atkM: 0,
        rdf: 0,
        rdm: 0
      };
      this.armaduraEmEdicaoIndex = null;
      this.showAdicionarArmaduraModal = false;
    },
    carregarArmaduras() {
      const fichaId = parseInt(this.$route.params.id, 10);
      const fichas = JSON.parse(localStorage.getItem('fichas')) || [];
      const ficha = fichas.find(f => f.id === fichaId);
      if (ficha && ficha.armaduras) {
        this.armaduras = ficha.armaduras;
      }
    },
    salvarArmaduras() {
      const fichaId = parseInt(this.$route.params.id, 10);
      const fichas = JSON.parse(localStorage.getItem('fichas')) || [];
      const fichaIndex = fichas.findIndex(f => f.id === fichaId);
      if (fichaIndex !== -1) {
        fichas[fichaIndex].armaduras = this.armaduras;
        localStorage.setItem('fichas', JSON.stringify(fichas));
      }
    },
    editarArmadura(index) {
      this.armaduraEmEdicao = { ...this.armaduras[index] };
      this.armaduraEmEdicaoIndex = index;
      this.showAdicionarArmaduraModal = true;
    },
    visualizarArmadura(index) {
      this.armaduraEmEdicao = { ...this.armaduras[index] };
      this.showVisualizarArmaduraModal = true;
    },
    confirmarExclusaoArmadura(index) {
      this.armaduraParaExcluirIndex = index;
      this.showConfirmarExclusaoModal = true;
    },
    excluirArmaduraConfirmada() {
      if (this.armaduraParaExcluirIndex !== null) {
        this.armaduras.splice(this.armaduraParaExcluirIndex, 1);
        this.salvarArmaduras();
        this.showConfirmarExclusaoModal = false;
        this.armaduraParaExcluirIndex = null;
      }
    }
  },
  created() {
    this.carregarArmaduras();
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

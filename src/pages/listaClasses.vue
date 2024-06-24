<template>
  <q-page padding>
    <div class="q-pa-md">
      <div class="text-h6 q-mb-md">Lista de Classes do RPG</div>

      <q-btn
        v-for="classe in classes"
        :key="classe.id"
        outline
        rounded
        color="primary"
        class="full-width q-mb-sm"
        padding="15px"
        :label="classe.nome"
        @click="selecionarClasse(classe.path)"
      />
    </div>
  </q-page>
</template>

<script>
export default {
  data() {
    return {
      classes: [
        { id: 1, nome: 'Paladino', path: 'paladino' },
        { id: 2, nome: 'Guerreiro', path: 'guerreiro' },
        { id: 3, nome: 'Mago', path: 'mago' },
        { id: 4, nome: 'Ladino', path: 'ladino' },
        { id: 5, nome: 'Samurai', path: 'samurai' },
        { id: 6, nome: 'Clérigo', path: 'clerigo' },
        { id: 7, nome: 'Vampiro', path: 'vampiro' },
        { id: 8, nome: 'Cavaleiro das Trevas', path: 'cavaleiro-das-trevas' },
        { id: 9, nome: 'Necromante', path: 'necromante' },
        { id: 10, nome: 'Mago do Caos', path: 'mago-do-caos' },
        { id: 11, nome: 'Bardo', path: 'bardo' }
      ]
    };
  },
  methods: {
    selecionarClasse(classePath) {
      this.$router.push(`/classe/${classePath}`);
    }
  }
};
</script>

<style scoped>
.q-btn {
  color: #000000 !important; /* Cor do texto dos botões em branco */
}
</style>

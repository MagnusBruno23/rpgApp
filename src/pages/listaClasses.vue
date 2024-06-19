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
        @click="selecionarClasse(classe)"
      />
    </div>
  </q-page>
</template>

<script>
export default {
  data() {
    return {
      classes: [
        { id: 1, nome: 'Classe 1' },
        { id: 2, nome: 'Classe 2' },
        { id: 3, nome: 'Classe 3' },
        { id: 4, nome: 'Classe 4' },
        { id: 5, nome: 'Classe 5' },
        { id: 6, nome: 'Classe 6' },
        { id: 7, nome: 'Classe 7' },
        { id: 8, nome: 'Classe 8' },
        { id: 9, nome: 'Classe 9' },
        { id: 10, nome: 'Classe 10' }
      ]
    };
  },
  methods: {
    selecionarClasse(classe) {
      // Implemente a lógica para lidar com a seleção da classe, se necessário
      console.log(`Classe selecionada: ${classe.nome}`);
    }
  }
};
</script>

<style scoped>
/* Estilos específicos para o componente listaClasses.vue */
</style>

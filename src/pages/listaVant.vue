<template>
  <q-page padding>
    <div class="q-pa-md">
      <div class="text-h6 q-mb-md">Lista de Vantagens do RPG</div>

      <q-btn
        v-for="vantagem in vantagens"
        :key="vantagem.id"
        outline
        rounded
        color="primary"
        class="full-width q-mb-sm"
        padding="15px"
        :label="`Vantagem ${vantagem.id}`"
        @click="selecionarVantagem(vantagem)"
      />
    </div>
  </q-page>
</template>

<script>
export default {
  data() {
    return {
      vantagens: [
        { id: 1, nome: 'Vantagem 1' },
        { id: 2, nome: 'Vantagem 2' },
        { id: 3, nome: 'Vantagem 3' },
        { id: 4, nome: 'Vantagem 4' },
        { id: 5, nome: 'Vantagem 5' },
        { id: 6, nome: 'Vantagem 6' },
        { id: 7, nome: 'Vantagem 7' },
        { id: 8, nome: 'Vantagem 8' },
        { id: 9, nome: 'Vantagem 9' },
        { id: 10, nome: 'Vantagem 10' }
      ]
    };
  },
  methods: {
    selecionarVantagem(vantagem) {
      // Implemente a lógica para lidar com a seleção da vantagem, se necessário
      console.log(`Vantagem selecionada: ${vantagem.nome}`);
    }
  }
};
</script>

<style scoped>
/* Estilos específicos para o componente ListaVant.vue */
</style>

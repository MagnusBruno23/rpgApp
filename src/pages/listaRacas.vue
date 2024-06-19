<template>
  <q-page padding>
    <div class="q-pa-md">
      <div class="text-h6 q-mb-md">Lista de Raças do RPG</div>

      <q-btn
        v-for="raca in racas"
        :key="raca.id"
        outline
        rounded
        color="primary"
        class="full-width q-mb-sm"
        padding="15px"
        :label="raca.nome"
        @click="selecionarRaca(raca)"
      />
    </div>
  </q-page>
</template>

<script>
export default {
  data() {
    return {
      racas: [
        { id: 1, nome: 'Raça 1' },
        { id: 2, nome: 'Raça 2' },
        { id: 3, nome: 'Raça 3' },
        { id: 4, nome: 'Raça 4' },
        { id: 5, nome: 'Raça 5' },
        { id: 6, nome: 'Raça 6' },
        { id: 7, nome: 'Raça 7' },
        { id: 8, nome: 'Raça 8' },
        { id: 9, nome: 'Raça 9' },
        { id: 10, nome: 'Raça 10' }
      ]
    };
  },
  methods: {
    selecionarRaca(raca) {
      // Implemente a lógica para lidar com a seleção da raça, se necessário
      console.log(`Raça selecionada: ${raca.nome}`);
    }
  }
};
</script>

<style scoped>
/* Estilos específicos para o componente listaRacas.vue */
</style>

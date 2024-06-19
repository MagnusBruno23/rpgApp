<template>
  <q-page padding>
    <q-card v-for="ficha in fichas" :key="ficha.id">
      <q-card-section class="text-h6">{{ ficha.nome }}</q-card-section>
      <q-card-section>
        <div>Idade: {{ ficha.idade }}</div>
        <div>Classe: {{ ficha.classe }}</div>
        <div>Raça: {{ ficha.raca }}</div>
        <div>Level: {{ ficha.level }}</div>
        <div>Força: {{ ficha.forca }}</div>
        <div>Agilidade: {{ ficha.agilidade }}</div>
        <div>Inteligência: {{ ficha.inteligencia }}</div>
        <q-img :src="ficha.foto" v-if="ficha.foto" style="width: 100px; height: 100px;" />
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script>
export default {
  data() {
    return {
      fichas: []
    };
  },
  created() {
    // Carregar as fichas salvas ao entrar na página
    this.carregarFichas();
  },
  methods: {
    carregarFichas() {
      // Simular o carregamento das fichas do localStorage ou de uma API
      const fichasSalvas = localStorage.getItem('fichas');
      if (fichasSalvas) {
        // Parse JSON e definir as fichas
        this.fichas = JSON.parse(fichasSalvas);
      }
    }
  }
};
</script>

<style scoped>
/* Estilos específicos para a página fichaView */
.q-card {
  max-width: 400px;
  margin: 16px auto; /* Centraliza o card */
  background-color: #f5f5f5; /* Cor de fundo mais clara */
}

.q-card-section {
  padding: 16px;
}
</style>

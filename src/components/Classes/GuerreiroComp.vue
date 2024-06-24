<template>
  <q-page padding>
    <q-card class="q-pa-md">
      <q-card-section>
        <div class="text-h6">Guerreiro</div>
      </q-card-section>
      <q-card-section>
        <q-img
        src="~assets/classes/guerreiro.png"
        style="max-height: 300px; max-width: 300px"></q-img>
      </q-card-section>
      <q-card-section>
        <div>
          <p><strong>Descrição:</strong> Guerreiros são mestres do combate físico, usando força bruta e habilidades marciais para vencer seus inimigos. Eles são versáteis e podem usar uma variedade de armas e armaduras.</p>
          <p><strong>Características:</strong></p>
          <ul>
            <li>Habilidades de combate</li>
            <li>Versatilidade com armas</li>
            <li>Resistência física</li>
          </ul>
        </div>
      </q-card-section>
      <q-card-actions align="right">
        <q-btn flat label="Voltar" @click="voltar" />
      </q-card-actions>
    </q-card>
  </q-page>
</template>

<script>
export default {
  methods: {
    voltar() {
      this.$router.push('/listaClasses');
    }
  }
};
</script>

<style scoped>
.q-pa-md {
  background-color: #e1c596;
}
</style>

<template>
  <q-page padding>
    <q-card class="q-pa-md">
      <q-card-section>
        <div class="text-h6">Cavaleiro das Trevas</div>
      </q-card-section>
      <q-card-section>
        <q-img
        src="~assets/classes/cavaleiro_trevas.png"
        style="max-height: 300px; max-width: 300px"></q-img>
      </q-card-section>
      <q-card-section>
        <div>
          <p><strong>Descrição:</strong> Cavaleiros das Trevas são guerreiros que abraçaram as forças sombrias. Eles utilizam habilidades de combate e magia das trevas para dominar seus inimigos.</p>
          <p><strong>Características:</strong></p>
          <ul>
            <li>Combate sombrio</li>
            <li>Magia das trevas</li>
            <li>Resistência a ataques mágicos</li>
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

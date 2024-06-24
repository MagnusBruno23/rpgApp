<template>
  <q-page padding>
    <q-card class="q-pa-md">
      <q-card-section>
        <div class="text-h6">Ladino</div>
      </q-card-section>
      <q-card-section>
        <q-img
        src="~assets/classes/ladino.png"
        style="max-height: 300px; max-width: 300px"></q-img>
      </q-card-section>
      <q-card-section>
        <div>
          <p><strong>Descrição:</strong> Ladinos são mestres da furtividade e do subterfúgio. Eles são habilidosos em se mover sem serem detectados e em executar ataques rápidos e precisos.</p>
          <p><strong>Características:</strong></p>
          <ul>
            <li>Furtividade</li>
            <li>Habilidades de ladrão</li>
            <li>Ataques rápidos e precisos</li>
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

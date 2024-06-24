<template>
  <q-page padding>
    <q-card class="q-pa-md">
      <q-card-section>
        <div class="text-h6">Paladino</div>
      </q-card-section>
      <q-card-section>
        <q-img
        src="~assets/classes/paladino.png"
        style="max-height: 300px; max-width: 300px"></q-img>
      </q-card-section>
      <q-card-section>
        <div>
          <p><strong>Descrição:</strong> Os Paladinos são guerreiros sagrados, dedicados à proteção dos inocentes e à erradicação do mal. Eles possuem habilidades de combate e magia divina.</p>
          <p><strong>Características:</strong></p>
          <ul>
            <li>Combate corpo a corpo</li>
            <li>Magia de cura e proteção</li>
            <li>Resistência a venenos e doenças</li>
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

<template>
  <q-page padding>
    <q-card class="q-pa-md">
      <q-card-section>
        <div class="text-h6">Clérigo</div>
      </q-card-section>
      <q-card-section>
        <q-img
        src="~assets/classes/clerigo.png"
        style="max-height: 300px; max-width: 300px"></q-img>
      </q-card-section>
      <q-card-section>
        <div>
          <p><strong>Descrição:</strong> Clérigos são servos devotos das divindades, capazes de canalizar poder divino para curar e proteger seus aliados. Eles são pilares de fé e força espiritual.</p>
          <p><strong>Características:</strong></p>
          <ul>
            <li>Magia divina</li>
            <li>Cura e proteção</li>
            <li>Fé inabalável</li>
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

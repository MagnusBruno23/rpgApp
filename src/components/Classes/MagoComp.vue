<template>
  <q-page padding>
    <q-card class="q-pa-md">
      <q-card-section>
        <div class="text-h6">Mago</div>
      </q-card-section>
      <q-card-section>
        <q-img
        src="~assets/classes/mago.png"
        style="max-height: 300px; max-width: 300px"></q-img>
      </q-card-section>
      <q-card-section>
        <div>
          <p><strong>Descrição:</strong> Magos são mestres das artes arcanas, usando seus conhecimentos para lançar poderosos feitiços. Eles podem manipular os elementos e a realidade para alcançar seus objetivos.</p>
          <p><strong>Características:</strong></p>
          <ul>
            <li>Magia arcana</li>
            <li>Manipulação de elementos</li>
            <li>Conhecimento profundo</li>
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

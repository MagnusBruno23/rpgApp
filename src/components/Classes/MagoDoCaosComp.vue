<template>
  <q-page padding>
    <q-card class="q-pa-md">
      <q-card-section>
        <div class="text-h6">Mago do Caos</div>
      </q-card-section>
      <q-card-section>
        <q-img
        src="~assets/classes/mago_caos.png"
        style="max-height: 300px; max-width: 300px"></q-img>
      </q-card-section>
      <q-card-section>
        <div>
          <p><strong>Descrição:</strong> Magos do Caos são praticantes de uma magia instável e imprevisível. Eles são capazes de lançar feitiços de grande poder, mas que podem ter efeitos inesperados.</p>
          <p><strong>Características:</strong></p>
          <ul>
            <li>Magia instável</li>
            <li>Feitiços poderosos</li>
            <li>Efeitos imprevisíveis</li>
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

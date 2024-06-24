<template>
  <q-page padding>
    <q-card class="q-pa-md">
      <q-card-section>
        <div class="text-h6">Necromante</div>
      </q-card-section>
      <q-card-section>
        <q-img
        src="~assets/classes/necromante.png"
        style="max-height: 300px; max-width: 300px"></q-img>
      </q-card-section>
      <q-card-section>
        <div>
          <p><strong>Descrição:</strong> Necromantes são praticantes da magia negra, capazes de controlar os mortos e manipular a vida e a morte. Eles são temidos por sua habilidade de invocar criaturas mortas-vivas.</p>
          <p><strong>Características:</strong></p>
          <ul>
            <li>Controle dos mortos</li>
            <li>Manipulação da vida e morte</li>
            <li>Invocação de mortos-vivos</li>
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

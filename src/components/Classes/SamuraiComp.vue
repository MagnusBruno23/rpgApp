<template>
  <q-page padding>
    <q-card class="q-pa-md">
      <q-card-section>
        <div class="text-h6">Samurai</div>
      </q-card-section>
      <q-card-section>
        <q-img src="path/to/samurai.jpg" style="width: 100%; height: auto;" />
      </q-card-section>
      <q-card-section>
        <div>
          <p><strong>Descrição:</strong> Samurais são guerreiros disciplinados e leais, conhecidos por sua maestria com a espada e seu código de honra. Eles são treinados para a batalha e para a liderança.</p>
          <p><strong>Características:</strong></p>
          <ul>
            <li>Maestria com a espada</li>
            <li>Disciplina e honra</li>
            <li>Habilidades de liderança</li>
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

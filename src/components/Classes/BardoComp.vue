<template>
  <q-page padding>
    <q-card class="q-pa-md">
      <q-card-section>
        <div class="text-h6">Bardo</div>
      </q-card-section>
      <q-card-section>
        <!--<q-img
        src="~assets/classes/guerreiro.png"
        style="max-height: 300px; max-width: 300px"></q-img>-->
      </q-card-section>
      <q-card-section>
        <div>
          <p><strong>Descrição:</strong> Bardos são artistas e aventureiros, capazes de inspirar e enganar com suas palavras e músicas. Eles usam sua magia para manipular emoções e criar ilusões.</p>
          <p><strong>Características:</strong></p>
          <ul>
            <li>Inspiração</li>
            <li>Magia ilusória</li>
            <li>Manipulação de emoções</li>
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

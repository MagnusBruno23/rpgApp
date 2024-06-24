<template>
  <q-page padding>
    <q-card class="q-pa-md">
      <q-card-section>
        <div class="text-h6">Vampiro</div>
      </q-card-section>
      <q-card-section>
        <q-img
        src="~assets/classes/vampiro.png"
        style="max-height: 300px; max-width: 300px"></q-img>
      </q-card-section>
      <q-card-section>
        <div>
          <p><strong>Descrição:</strong> Vampiros são seres da noite, possuindo habilidades sobrenaturais e uma sede insaciável por sangue. Eles são imortais e têm poderes de regeneração e controle mental.</p>
          <p><strong>Características:</strong></p>
          <ul>
            <li>Imortalidade</li>
            <li>Poderes sobrenaturais</li>
            <li>Sede de sangue</li>
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

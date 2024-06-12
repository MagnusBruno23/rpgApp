<template>
  <div class="row">
      <div class="col">
        <q-input
          rounded
          outlined
          class="full-width"
          padding="15px"
          v-model="namePersonagem"
          label="Nome do Personagem"
        />

        <div><br></div>

        <q-input
          rounded
          outlined
          padding="15px"
          v-model="idade"
          label="Idade"
        />
      </div>
      <div class="col-1">
        <br>
      </div>
      <div class="col">
        foto personagem
      </div>
    </div>

    <div><br></div>

    <div class="row">
      <div class="col">
        <q-btn outline rounded color="primary"
        class="full-width"
        padding="15px"
        label="classe"/>
      </div>
      <div class="col-1">
        <br>
      </div>
      <div class="col">
        <q-btn outline rounded color="primary"
        class="full-width"
        padding="15px"
        label="raça"/>
      </div>
    </div>
</template>

<script>
import { ref } from 'vue';

export default {
  name: 'baseFicha',
  setup () {
    return {
      namePersonagem: ref(''),
      idade: ref('')
    }
  }
}
</script>

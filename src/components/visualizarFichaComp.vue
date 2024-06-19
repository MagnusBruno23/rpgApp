<template>
  <q-dialog v-model="localShow" persistent @hide="fecharModal">
    <q-card>
      <q-card-section>
        <div class="text-h6">Visualizar Ficha</div>
      </q-card-section>
      <q-card-section>
        <div>{{ ficha.nome }}</div>
        <div>Classe: {{ ficha.classe }}</div>
        <div>Raça: {{ ficha.raca }}</div>
        <div>Vantagens: {{ ficha.vantagens ? ficha.vantagens.join(', ') : '' }}</div>
        <div>Desvantagens: {{ ficha.desvantagens ? ficha.desvantagens.join(', ') : '' }}</div>
        <q-img :src="ficha.foto" v-if="ficha.foto" style="width: 100px; height: 100px;" />
      </q-card-section>
      <q-card-actions align="right">
        <q-btn flat label="Fechar" @click="fecharModal" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
export default {
  props: {
    show: Boolean,
    ficha: Object
  },
  data() {
    return {
      localShow: false // Inicialmente o localShow é falso
    };
  },
  watch: {
    show(val) {
      this.localShow = val; // Atualiza o localShow quando a prop show mudar
    },
    localShow(val) {
      this.$emit('update:show', val); // Emite evento para sincronizar com a prop show
    }
  },
  methods: {
    fecharModal() {
      this.localShow = false; // Fecha o modal
      this.$emit('update:show', false); // Emite evento para sincronizar com a prop show
    }
  }
};
</script>

<style scoped>
/* Estilos específicos para o componente visualizarFichaComp */
</style>

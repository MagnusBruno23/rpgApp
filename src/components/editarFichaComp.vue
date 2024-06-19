<template>
  <q-dialog v-model="localShow" persistent @hide="resetForm">
    <q-card>
      <q-card-section>
        <div class="text-h6">Editar Ficha</div>
      </q-card-section>
      <q-card-section>
        <q-input v-model="ficha.nome" label="Nome do Personagem" />
        <q-select v-model="ficha.classe" :options="classes" label="Classe" />
        <q-select v-model="ficha.raca" :options="racas" label="Raça" @input="updateVantagensDesvantagens" />
        <q-file v-model="foto" label="Foto do Personagem" @change="onFileChange" />
        <q-img :src="fotoUrl" v-if="fotoUrl" style="width: 100px; height: 100px;" />
        <q-select v-model="ficha.vantagem" :options="vantagensDisponiveis" label="Vantagens" multiple />
        <q-select v-model="ficha.desvantagem" :options="desvantagensDisponiveis" label="Desvantagens" multiple />
      </q-card-section>
      <q-card-actions align="right">
        <q-btn flat label="Cancelar" @click="closeModal" />
        <q-btn flat label="Salvar" @click="salvarFicha" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
import { classes, racas, vantagens, desvantagens } from '../assets/rpgData';

export default {
  props: {
    ficha: Object,
    show: Boolean
  },
  data() {
    return {
      foto: null,
      fotoUrl: null,
      vantagensDisponiveis: [],
      desvantagensDisponiveis: [],
      localShow: this.show
    };
  },
  computed: {
    classes() {
      return classes;
    },
    racas() {
      return racas;
    }
  },
  watch: {
    show(val) {
      this.localShow = val;
    },
    localShow(val) {
      this.$emit('update:show', val);
    }
  },
  methods: {
    updateVantagensDesvantagens() {
      this.vantagensDisponiveis = vantagens[this.ficha.raca];
      this.desvantagensDisponiveis = desvantagens[this.ficha.raca];
    },
    onFileChange(event) {
      const file = event.target.files[0];
      if (file) {
        this.foto = file;
        this.fotoUrl = URL.createObjectURL(file);
      }
    },
    salvarFicha() {
      if (!this.foto) {
        this.saveFichaData();
      } else {
        const reader = new FileReader();
        reader.onload = (e) => {
          this.saveFichaData(e.target.result);
        };
        reader.readAsDataURL(this.foto);
      }
    },
    saveFichaData(fotoBase64) {
      this.$emit('save-ficha', {
        ...this.ficha,
        foto: fotoBase64 || null
      });
      this.closeModal();
    },
    closeModal() {
      this.localShow = false;
    },
    resetForm() {
      this.foto = null;
      this.fotoUrl = null;
    }
  },
  mounted() {
    // Atualizar vantagens e desvantagens baseado na raça inicial da ficha
    this.updateVantagensDesvantagens();
  }
};
</script>

<style scoped>
/* Estilos específicos para o modal de edição de ficha */
</style>

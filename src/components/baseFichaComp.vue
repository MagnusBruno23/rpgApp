<template>
  <q-dialog v-model="localShow" persistent @hide="resetForm">
    <q-card>
      <q-card-section>
        <div class="text-h6">{{ ficha ? 'Editar Ficha' : 'Criar Ficha' }}</div>
      </q-card-section>
      <q-card-section>
        <q-input v-model="nome" label="Nome do Personagem" />
        <q-select v-model="classe" :options="classes" label="Classe" />
        <q-select v-model="raca" :options="racas" label="Raça" @input="updateVantagensDesvantagens" />
        <q-file v-model="foto" label="Foto do Personagem" @change="onFileChange" />
        <q-img :src="fotoUrl" v-if="fotoUrl" style="width: 100px; height: 100px;" />
        <q-select v-model="vantagem" :options="vantagensDisponiveis" label="Vantagens" multiple />
        <q-select v-model="desvantagem" :options="desvantagensDisponiveis" label="Desvantagens" multiple />
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
    show: Boolean,
    ficha: Object
  },
  data() {
    return {
      nome: '',
      classe: '',
      raca: '',
      foto: null,
      fotoUrl: null,
      vantagem: [],
      desvantagem: [],
      vantagensDisponiveis: [],
      desvantagensDisponiveis: [],
      localShow: false // Inicialmente o localShow é falso
    };
  },
  watch: {
    show(val) {
      this.localShow = val; // Atualiza o localShow quando a prop show mudar
      if (!val) {
        this.resetForm(); // Reseta o formulário se show for falso
      }
    },
    ficha: {
      handler(newFicha) {
        if (newFicha) {
          this.nome = newFicha.nome || '';
          this.classe = newFicha.classe || '';
          this.raca = newFicha.raca || '';
          this.foto = newFicha.foto || null;
          this.fotoUrl = newFicha.foto || null;
          this.vantagem = newFicha.vantagens || [];
          this.desvantagem = newFicha.desvantagens || [];
          this.updateVantagensDesvantagens();
        } else {
          this.resetForm();
        }
      },
      deep: true
    }
  },
  computed: {
    classes() {
      return classes;
    },
    racas() {
      return racas;
    }
  },
  methods: {
    updateVantagensDesvantagens() {
      this.vantagensDisponiveis = vantagens[this.raca] || [];
      this.desvantagensDisponiveis = desvantagens[this.raca] || [];
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
        id: this.ficha ? this.ficha.id : Date.now(),
        nome: this.nome,
        classe: this.classe,
        raca: this.raca,
        foto: fotoBase64 || null,
        vantagens: this.vantagem,
        desvantagens: this.desvantagem
      });
      this.closeModal();
    },
    closeModal() {
      this.localShow = false; // Fecha o modal
      this.$emit('update:show', false); // Emite evento para atualizar a prop show
    },
    resetForm() {
      this.nome = '';
      this.classe = '';
      this.raca = '';
      this.foto = null;
      this.fotoUrl = null;
      this.vantagem = [];
      this.desvantagem = [];
      this.vantagensDisponiveis = [];
      this.desvantagensDisponiveis = [];
    }
  }
};
</script>

<style scoped>
/* Estilos específicos para o componente baseFichaComp */
</style>

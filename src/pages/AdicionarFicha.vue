<template>
  <q-page padding>
    <q-card class="q-pa-md">
      <q-card-section class="text-h6">Adicionar Nova Ficha</q-card-section>

      <q-card-section>
        <q-form @submit.prevent="salvarFicha">
          <q-input filled v-model="ficha.nome" label="Nome do Personagem" />
          <q-select filled v-model="ficha.raca" :options="racas" label="Raça" @input="atualizarVantagensDesvantagens" />
          <q-select filled v-model="ficha.classe" :options="classes" label="Classe" />

          <!-- Campo de seleção de imagem -->
          <q-file
            filled
            v-model="ficha.foto"
            label="Foto do Personagem"
            @input="onFileChange"
            :accept="['image/jpeg', 'image/png']"
          />
          <!-- Exibição da imagem selecionada -->
          <q-img :src="fotoUrl" v-if="fotoUrl" style="width: 100px; height: 100px; margin-top: 16px;" />

          <!-- Botões para abrir modais -->
          <div class="q-mt-md">
            <q-btn label="Distribuir Pontos" @click="showDistribuirPontosModal = true" />
            <q-btn label="Vantagens" @click="showVantagensModal = true" />
            <q-btn label="Desvantagens" @click="showDesvantagensModal = true" />
          </div>

          <!-- Novas informações -->
          <div class="q-mt-md">
            <div>Level: {{ ficha.level }}</div>
            <q-btn label="Adicionar Experiência" @click="showExperienciaModal = true" />
            <div>Pontos de Vida: {{ pontosDeVida }}</div>
            <q-linear-progress :value="pontosDeVida / 50" color="red" size="sm" style="width: 50%;" />
            <div>Pontos de Mana: {{ pontosDeMana }}</div>
            <q-linear-progress :value="pontosDeMana / 20" color="blue" size="sm" style="width: 50%;" />

            <div>Vigor: {{ ficha.vigor }}</div>
            <div>Ataque Base: {{ calcularAtaqueBase }}</div>
            <div>Ataque Base Mágico: {{ calcularAtaqueBaseMagico }}</div>
            <div>Acerto: {{ calcularAcerto }}</div>
            <div>Esquiva: {{ calcularEsquiva }}</div>
            <div>RDF: {{ calcularRDF }}</div>
            <div>RDM: {{ calcularRDM }}</div>
          </div>

          <!-- Botões de ação (Salvar e Cancelar) -->
          <div class="q-mt-md">
            <q-btn type="submit" label="Salvar" color="primary" />
            <q-btn label="Cancelar" @click="cancelar" />
          </div>
        </q-form>
      </q-card-section>
    </q-card>

    <!-- Modais de Distribuição de Pontos, Vantagens, Desvantagens e Experiência -->
    <q-dialog v-model="showDistribuirPontosModal">
      <q-card>
        <q-card-section class="text-h6">Distribuir Pontos</q-card-section>
        <q-card-section class="text-h6">Pontos disponíveis: {{ pontosDisponiveis }}</q-card-section>
        <q-card-section class="row items-center q-mb-sm">
          <div class="col">Força:</div>
          <q-btn icon="remove" @click="ajustarAtributo('forca', -1)" :disable="ficha.atributos.forca <= 1" />
          <div class="q-ml-sm q-mr-sm">{{ ficha.atributos.forca }}</div>
          <q-btn icon="add" @click="ajustarAtributo('forca', 1)" :disable="pontosDisponiveis <= 0" />
        </q-card-section>
        <q-card-section class="row items-center q-mb-sm">
          <div class="col">Destreza:</div>
          <q-btn icon="remove" @click="ajustarAtributo('destreza', -1)" :disable="ficha.atributos.destreza <= 1" />
          <div class="q-ml-sm q-mr-sm">{{ ficha.atributos.destreza }}</div>
          <q-btn icon="add" @click="ajustarAtributo('destreza', 1)" :disable="pontosDisponiveis <= 0" />
        </q-card-section>
        <q-card-section class="row items-center q-mb-sm">
          <div class="col">Agilidade:</div>
          <q-btn icon="remove" @click="ajustarAtributo('agilidade', -1)" :disable="ficha.atributos.agilidade <= 1" />
          <div class="q-ml-sm q-mr-sm">{{ ficha.atributos.agilidade }}</div>
          <q-btn icon="add" @click="ajustarAtributo('agilidade', 1)" :disable="pontosDisponiveis <= 0" />
        </q-card-section>
        <q-card-section class="row items-center q-mb-sm">
          <div class="col">Constituição:</div>
          <q-btn icon="remove" @click="ajustarAtributo('constituicao', -1)" :disable="ficha.atributos.constituicao <= 1" />
          <div class="q-ml-sm q-mr-sm">{{ ficha.atributos.constituicao }}</div>
          <q-btn icon="add" @click="ajustarAtributo('constituicao', 1)" :disable="pontosDisponiveis <= 0" />
        </q-card-section>
        <q-card-section class="row items-center q-mb-sm">
          <div class="col">Inteligência:</div>
          <q-btn icon="remove" @click="ajustarAtributo('inteligencia', -1)" :disable="ficha.atributos.inteligencia <= 1" />
          <div class="q-ml-sm q-mr-sm">{{ ficha.atributos.inteligencia }}</div>
          <q-btn icon="add" @click="ajustarAtributo('inteligencia', 1)" :disable="pontosDisponiveis <= 0" />
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Cancelar" @click="showDistribuirPontosModal = false" />
          <q-btn flat label="Ok" @click="confirmarDistribuicaoPontos" color="primary" />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <!-- Modal para Vantagens -->
    <q-dialog v-model="showVantagensModal">
      <q-card>
        <q-card-section class="text-h6">Selecionar Vantagens</q-card-section>
        <q-card-section class="text-h6">Pontos disponíveis: {{ pontosVantagensDisponiveis }}</q-card-section>

        <q-card-section v-for="vantagem in vantagens" :key="vantagem.nome" class="row items-center q-mb-sm">
          <div class="col">
            <div>{{ vantagem.nome }}</div>
            <div>Requer: {{ vantagem.custo }} Pontos</div>
          </div>
          <q-btn icon="remove" @click="removerVantagem(vantagem)" :disable="!vantagemSelecionada(vantagem)" />
          <div class="q-ml-sm q-mr-sm">{{ contarVantagem(vantagem) }}</div>
          <q-btn icon="add" @click="adicionarVantagem(vantagem)" :disable="pontosVantagensDisponiveis < vantagem.custo || vantagemSelecionada(vantagem)" />
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Cancelar" @click="showVantagensModal = false" />
          <q-btn flat label="Ok" @click="confirmarVantagens" color="primary" />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <!-- Modal para Adicionar Experiência -->
    <q-dialog v-model="showExperienciaModal">
      <q-card>
        <q-card-section class="text-h6">Adicionar Experiência</q-card-section>
        <q-card-section>
          <q-input filled v-model="experienciaInput" label="Pontos de Experiência" type="number" />
        </q-card-section>
        <q-card-actions align="right">
          <q-btn flat label="Cancelar" @click="showExperienciaModal = false" />
          <q-btn flat label="Ok" @click="adicionarExperiencia" color="primary" />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <!-- Modal para Desvantagens -->
    <!-- Implemente conforme necessário -->
  </q-page>
</template>

<script>
import { classes, racas, vantagens, desvantagens } from '../assets/rpgData';

export default {
  data() {
    return {
      ficha: {
        id: Date.now(),
        nome: '',
        idade: null,
        classe: '',
        raca: '',
        level: 0,
        experiencia: 0,
        atributos: {
          forca: 0,
          destreza: 0,
          agilidade: 0,
          constituicao: 0,
          inteligencia: 0
        },
        foto: null,
        vantagens: [],
        desvantagens: [],
        pontosDeVida: 50,
        pontosDeMana: 20,
        vigor: 0
      },
      classes: classes.map(c => ({ label: c, value: c })),
      racas: racas.map(r => ({ label: r, value: r })),
      fotoUrl: null,
      showDistribuirPontosModal: false,
      showVantagensModal: false,
      showDesvantagensModal: false,
      showExperienciaModal: false,
      vantagens: vantagens,
      experienciaInput: 0
    };
  },
  computed: {
    pontosDisponiveis() {
      const totalPontosAtributos = Object.values(this.ficha.atributos).reduce((acc, cur) => acc + cur, 0);
      return 25 - totalPontosAtributos;
    },
    pontosVantagensDisponiveis() {
      const totalPontosVantagens = this.ficha.vantagens.reduce((acc, cur) => acc + cur.custo, 0);
      return 5 - totalPontosVantagens;
    },
    pontosDeVida() {
      return 50 + this.ficha.atributos.constituicao * 3;
    },
    pontosDeMana() {
      return 20 + this.ficha.atributos.constituicao * 3;
    },
    calcularAtaqueBase() {
      return this.ficha.atributos.forca * 2; // Exemplo de cálculo, ajuste conforme necessário
    },
    calcularAtaqueBaseMagico() {
      return this.ficha.atributos.inteligencia * 2; // Exemplo de cálculo, ajuste conforme necessário
    },
    calcularAcerto() {
      return this.ficha.atributos.destreza * 2; // Exemplo de cálculo, ajuste conforme necessário
    },
    calcularEsquiva() {
      return this.ficha.atributos.agilidade * 2; // Exemplo de cálculo, ajuste conforme necessário
    },
    calcularRDF() {
      return this.ficha.atributos.constituicao * 2; // Exemplo de cálculo, ajuste conforme necessário
    },
    calcularRDM() {
      return this.ficha.atributos.inteligencia * 2; // Exemplo de cálculo, ajuste conforme necessário
    }
  },
  methods: {
    salvarFicha() {
      this.carregarFichas();
      this.fichas.push({ ...this.ficha, foto: this.fotoUrl });
      this.salvarFichas();
      this.$router.push('/listaFichas');
    },
    cancelar() {
      this.ficha = {
        id: Date.now(),
        nome: '',
        idade: null,
        classe: '',
        raca: '',
        level: 0,
        experiencia: 0,
        atributos: {
          forca: 1,
          destreza: 1,
          agilidade: 1,
          constituicao: 1,
          inteligencia: 1
        },
        foto: null,
        vantagens: [],
        desvantagens: [],
        pontosDeVida: 50,
        pontosDeMana: 20,
        vigor: 0
      };
      this.fotoUrl = null;
    },
    ajustarAtributo(atributo, valor) {
      if (valor > 0 && this.pontosDisponiveis > 0) {
        this.ficha.atributos[atributo] += valor;
      } else if (valor < 0 && this.ficha.atributos[atributo] > 1) {
        this.ficha.atributos[atributo] += valor;
      }
    },
    adicionarVantagem(vantagem) {
      if (this.pontosVantagensDisponiveis >= vantagem.custo && !this.vantagemSelecionada(vantagem)) {
        this.ficha.vantagens.push(vantagem);
      }
    },
    removerVantagem(vantagem) {
      this.ficha.vantagens = this.ficha.vantagens.filter(v => v !== vantagem);
    },
    vantagemSelecionada(vantagem) {
      return this.ficha.vantagens.includes(vantagem);
    },
    contarVantagem(vantagem) {
      return this.ficha.vantagens.filter(v => v === vantagem).length;
    },
    confirmarDistribuicaoPontos() {
      this.showDistribuirPontosModal = false;
    },
    confirmarVantagens() {
      this.showVantagensModal = false;
    },
    onFileChange(event) {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = e => {
          this.fotoUrl = e.target.result;
          this.ficha.foto = e.target.result;
        };
        reader.readAsDataURL(file);
      }
    },
    atualizarVantagensDesvantagens() {
      this.ficha.desvantagens = desvantagens[this.ficha.raca.value] || [];
    },
    adicionarExperiencia() {
      this.ficha.experiencia += Number(this.experienciaInput);
      this.atualizarLevel();
      this.showExperienciaModal = false;
    },
    atualizarLevel() {
      const xp = this.ficha.experiencia;
      const levelTable = [
        10, 30, 60, 100, 150, 210, 280, 360, 450, 550,
        670, 810, 970, 1150, 1350, 1570, 1810, 2070, 2350, 2650
      ];
      this.ficha.level = levelTable.findIndex(l => xp < l);
    },
    carregarFichas() {
      const fichas = JSON.parse(localStorage.getItem('fichas')) || [];
      this.fichas = fichas.map(ficha => ({
        ...ficha,
        vantagens: Array.isArray(ficha.vantagens) ? ficha.vantagens : [],
        desvantagens: Array.isArray(ficha.desvantagens) ? ficha.desvantagens : []
      }));
    },
    salvarFichas() {
      localStorage.setItem('fichas', JSON.stringify(this.fichas));
    }
  }
};
</script>

<style scoped>
/* Estilos opcionais */
</style>

<template>
  <q-page padding>
    <q-card class="q-pa-md">
      <q-card-section class="text-h6">Editar Ficha</q-card-section>

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

          <div class="q-mt-md">
            <q-btn label="Distribuir Pontos" @click="showDistribuirPontosModal = true" />
            <q-btn label="Vantagens" @click="showVantagensModal = true" />
            <q-btn label="Desvantagens" @click="showDesvantagensModal = true" />
          </div>

          <div class="q-mt-md">
            <div>Level: {{ ficha.level }}</div>
            <q-btn label="Adicionar Experiência" @click="showExperienciaModal = true" />
            <div>Pontos de Vida: {{ pontosDeVida }}</div>
            <q-linear-progress :value="pontosDeVida / vidaMaxima" color="red" size="xs" style="width: 50%;" />
            <div>Pontos de Mana: {{ pontosDeMana }}</div>
            <q-linear-progress :value="pontosDeMana / manaMaxima" color="blue" size="xs" style="width: 50%;" />
            <div>Vigor: {{ ficha.vigor }}</div>
            <div>Ataque Base: {{ ataqueBase }}</div>
            <div>Ataque Base Mágico: {{ ataqueBaseMagico }}</div>
            <div>Acerto: {{ acerto }}</div>
            <div>Esquiva: {{ esquiva }}</div>
            <div>RDF: {{ rdf }}</div>
            <div>RDM: {{ rdm }}</div>
          </div>

          <div class="q-mt-md">
            <q-btn type="submit" label="Salvar" color="primary" />
            <q-btn label="Cancelar" @click="cancelar" />
          </div>
        </q-form>
      </q-card-section>
    </q-card>

    <!-- Modais de Distribuição de Pontos, Vantagens e Desvantagens -->
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
          <div class="col">{{ vantagem.nome }}</div>
          <div class="col q-mx-sm">Requer: {{ vantagem.custo }} Pontos</div>
          <div class="col q-mx-sm">
            <q-btn icon="remove" @click="removerVantagem(vantagem)" :disable="!vantagemSelecionada(vantagem)" />
          </div>
          <div class="col q-mx-sm">{{ contarVantagem(vantagem) }}</div>
          <div class="col q-mx-sm">
            <q-btn icon="add" @click="adicionarVantagem(vantagem)" :disable="pontosVantagensDisponiveis < vantagem.custo || vantagemSelecionada(vantagem)" />
          </div>
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
          <q-input filled v-model="experienciaParaAdicionar" label="Experiência" type="number" />
        </q-card-section>
        <q-card-actions align="right">
          <q-btn flat label="Cancelar" @click="showExperienciaModal = false" />
          <q-btn flat label="Adicionar" color="primary" @click="adicionarExperiencia" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
import { classes, racas, vantagens, desvantagens } from '../assets/rpgData';

export default {
  data() {
    return {
      ficha: {
        id: null,
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
      experienciaParaAdicionar: 0
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
    vidaMaxima() {
      return 50 + this.ficha.atributos.constituicao * 3;
    },
    manaMaxima() {
      return 20 + this.ficha.atributos.constituicao * 3;
    },
    ataqueBase() {
      return this.ficha.atributos.forca * 2;
    },
    ataqueBaseMagico() {
      return this.ficha.atributos.inteligencia * 2;
    },
    acerto() {
      return this.ficha.atributos.destreza * 2;
    },
    esquiva() {
      return this.ficha.atributos.agilidade * 2;
    },
    rdf() {
      return this.ficha.atributos.constituicao * 2;
    },
    rdm() {
      return this.ficha.atributos.inteligencia * 2;
    }
  },
  methods: {
    salvarFicha() {
      this.carregarFichas();
      const fichaIndex = this.fichas.findIndex(f => f.id === this.ficha.id);
      if (fichaIndex !== -1) {
        this.fichas[fichaIndex] = { ...this.ficha, foto: this.fotoUrl };
      } else {
        this.fichas.push({ ...this.ficha, foto: this.fotoUrl });
      }
      this.salvarFichas();
      this.$router.push('/listaFichas');
    },
    cancelar() {
      this.$router.push('/listaFichas');
    },
    ajustarAtributo(atributo, valor) {
      if (this.pontosDisponiveis >= valor) {
        this.ficha.atributos[atributo] += valor;
      }
    },
    adicionarVantagem(vantagem) {
      if (this.pontosVantagensDisponiveis >= vantagem.custo) {
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
          this.ficha.foto = e.target.result; // Certifique-se de que a foto é salva na ficha
        };
        reader.readAsDataURL(file);
      }
    },
    adicionarExperiencia() {
      this.ficha.experiencia += this.experienciaParaAdicionar;
      this.calcularLevel();
      this.showExperienciaModal = false;
    },
    calcularLevel() {
      const xp = this.ficha.experiencia;
      if (xp >= 2650) this.ficha.level = 20;
      else if (xp >= 2350) this.ficha.level = 19;
      else if (xp >= 2070) this.ficha.level = 18;
      else if (xp >= 1810) this.ficha.level = 17;
      else if (xp >= 1570) this.ficha.level = 16;
      else if (xp >= 1350) this.ficha.level = 15;
      else if (xp >= 1150) this.ficha.level = 14;
      else if (xp >= 970) this.ficha.level = 13;
      else if (xp >= 810) this.ficha.level = 12;
      else if (xp >= 670) this.ficha.level = 11;
      else if (xp >= 550) this.ficha.level = 10;
      else if (xp >= 450) this.ficha.level = 9;
      else if (xp >= 360) this.ficha.level = 8;
      else if (xp >= 280) this.ficha.level = 7;
      else if (xp >= 210) this.ficha.level = 6;
      else if (xp >= 150) this.ficha.level = 5;
      else if (xp >= 100) this.ficha.level = 4;
      else if (xp >= 60) this.ficha.level = 3;
      else if (xp >= 30) this.ficha.level = 2;
      else if (xp >= 10) this.ficha.level = 1;
      else this.ficha.level = 0;
    },
    carregarFicha() {
      const id = parseInt(this.$route.params.id, 10);
      const fichas = JSON.parse(localStorage.getItem('fichas')) || [];
      const ficha = fichas.find(f => f.id === id);
      if (ficha) {
        this.ficha = ficha;
        this.fotoUrl = ficha.foto;
      }
    },
    carregarFichas() {
      const fichas = JSON.parse(localStorage.getItem('fichas')) || [];
      this.fichas = fichas;
    },
    salvarFichas() {
      localStorage.setItem('fichas', JSON.stringify(this.fichas));
    }
  },
  created() {
    this.carregarFicha();
  }
};
</script>

<style scoped>
/* Estilos opcionais */
</style>

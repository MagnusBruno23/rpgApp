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
            <q-btn label="Habilidades" @click="navegarParaHabilidades" />
            <q-btn label="Magias" @click="navegarParaMagias" />
            <q-btn label="Itens" @click="navegarParaItens" />
            <q-btn label="Armaduras" @click="navegarParaArmaduras" />
          </div>

          <div class="q-mt-md">
            <div>Level: {{ ficha.level }}</div>
            <div>Experiência: {{ ficha.experiencia }} / {{ proximoNivelXP }}</div>
            <q-linear-progress :value="ficha.experiencia / proximoNivelXP" color="green" size="xs" style="width: 50%;" />
            <q-btn label="Adicionar Experiência" @click="showExperienciaModal = true" />
            <div>Pontos de Vida: {{ pontosDeVida }}</div>
            <q-linear-progress :value="pontosDeVida / vidaMaxima" color="red" size="xs" style="width: 25%;" />
            <div>Pontos de Mana: {{ pontosDeMana }}</div>
            <q-linear-progress :value="pontosDeMana / manaMaxima" color="blue" size="xs" style="width: 25%;" />
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

    <!-- Modal para Distribuição de Pontos -->
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

    <!-- Modal para Desvantagens -->
    <q-dialog v-model="showDesvantagensModal">
      <q-card>
        <q-card-section class="text-h6">Selecionar Desvantagens</q-card-section>
        <q-card-section class="text-h6">Pontos disponíveis: {{ pontosDesvantagensDisponiveis }}</q-card-section>
        <q-card-section>
          <q-card-section v-for="desvantagem in desvantagens" :key="desvantagem.nome" class="row items-center q-mb-sm">
            <div class="col">
              <div>{{ desvantagem.nome }}</div>
              <div>Custo: {{ desvantagem.custo }} Pontos</div>
            </div>
            <q-btn icon="remove" @click="removerDesvantagem(desvantagem)" :disable="!desvantagemSelecionada(desvantagem)" />
            <div class="q-ml-sm q-mr-sm">{{ contarDesvantagem(desvantagem) }}</div>
            <q-btn icon="add" @click="adicionarDesvantagem(desvantagem)" :disable="pontosDesvantagensDisponiveis < desvantagem.custo || desvantagemSelecionada(desvantagem)" />
          </q-card-section>
        </q-card-section>
        <q-card-actions align="right">
          <q-btn flat label="Cancelar" @click="showDesvantagensModal = false" />
          <q-btn flat label="Ok" @click="confirmarDesvantagens" color="primary" />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <!-- Modal para Adicionar Experiência -->
    <q-dialog v-model="showExperienciaModal">
      <q-card>
        <q-card-section class="text-h6">Adicionar Experiência</q-card-section>
        <q-card-section>
          <q-input filled v-model.number="experienciaParaAdicionar" label="Experiência" type="number" :min="0" />
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
      ficha: this.inicializarFicha(),
      classes: classes.map(c => ({ label: c, value: c })),
      racas: racas.map(r => ({ label: r, value: r })),
      vantagens: vantagens,
      desvantagens: desvantagens,
      fotoUrl: null,
      showDistribuirPontosModal: false,
      showVantagensModal: false,
      showDesvantagensModal: false,
      showExperienciaModal: false,
      experienciaParaAdicionar: 0,
      fichas: []
    };
  },
  computed: {
    pontosDisponiveis() {
      const totalAtributos = Object.values(this.ficha.atributos).reduce((acc, cur) => acc + cur, 0);
      const pontosIniciais = 25 + (this.ficha.level * 5);
      return pontosIniciais - totalAtributos;
    },
    pontosVantagensDisponiveis() {
      const totalPontosVantagens = this.ficha.vantagens.reduce((acc, cur) => acc + cur.custo, 0);
      return 5 - totalPontosVantagens;
    },
    pontosDesvantagensDisponiveis() {
      const totalPontosDesvantagens = this.ficha.desvantagens.reduce((acc, cur) => acc + cur.custo, 0);
      return 5 - totalPontosDesvantagens;
    },
    pontosDeVida() {
      return 50 + this.ficha.atributos.constituicao * 3;
    },
    pontosDeMana() {
      return 20 + this.ficha.atributos.inteligencia * 3;
    },
    vidaMaxima() {
      return 50 + this.ficha.atributos.constituicao * 3;
    },
    manaMaxima() {
      return 20 + this.ficha.atributos.inteligencia * 3;
    },
    ataqueBase() {
      return this.ficha.atributos.forca * 2 + this.bonusAtk;
    },
    ataqueBaseMagico() {
      return this.ficha.atributos.inteligencia * 2 + this.bonusAtkM;
    },
    acerto() {
      return this.ficha.atributos.destreza * 2;
    },
    esquiva() {
      return this.ficha.atributos.agilidade * 2;
    },
    rdf() {
      return this.ficha.atributos.constituicao * 2 + this.bonusRdf;
    },
    rdm() {
      return this.ficha.atributos.inteligencia * 2 + this.bonusRdm;
    },
    proximoNivelXP() {
      const xpLevels = [
        10, 30, 60, 100, 150, 210, 280, 360, 450, 550,
        670, 810, 970, 1150, 1350, 1570, 1810, 2070, 2350, 2650
      ];
      let nextLevelXP = xpLevels.find(xp => xp > this.ficha.experiencia);
      return nextLevelXP ? nextLevelXP : "Max Level";
    },
    bonusAtk() {
      return this.ficha.armaduras.reduce((acc, armadura) => acc + (armadura.atk || 0), 0);
    },
    bonusAtkM() {
      return this.ficha.armaduras.reduce((acc, armadura) => acc + (armadura.atkM || 0), 0);
    },
    bonusRdf() {
      return this.ficha.armaduras.reduce((acc, armadura) => acc + (armadura.rdf || 0), 0);
    },
    bonusRdm() {
      return this.ficha.armaduras.reduce((acc, armadura) => acc + (armadura.rdm || 0), 0);
    }
  },
  methods: {
    inicializarFicha() {
      return {
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
        vigor: 0,
        habilidades: [],
        itens: [],
        armaduras: [],
        pontosDistribuicao: 25
      };
    },
    salvarFicha() {
      this.carregarFichas();
      const fichaIndex = this.fichas.findIndex(f => f.id === this.ficha.id);
      if (fichaIndex !== -1) {
        this.fichas[fichaIndex] = { ...this.ficha, foto: this.fotoUrl };
      } else {
        this.ficha.id = this.gerarIdUnico();
        this.fichas.push({ ...this.ficha, foto: this.fotoUrl });
      }
      this.salvarFichas();
      this.$router.push('/listaFichas');
    },
    cancelar() {
      this.$router.push('/listaFichas');
    },
    ajustarAtributo(atributo, valor) {
      if (valor > 0 && this.pontosDisponiveis >= valor) {
        this.ficha.atributos[atributo] += valor;
        this.ficha.pontosDistribuicao -= valor;
      } else if (valor < 0 && this.ficha.atributos[atributo] > 1) {
        this.ficha.atributos[atributo] += valor;
        this.ficha.pontosDistribuicao += Math.abs(valor);
      }
    },
    adicionarVantagem(vantagem) {
      if (this.pontosVantagensDisponiveis >= vantagem.custo && !this.vantagemSelecionada(vantagem)) {
        this.ficha.vantagens.push(vantagem);
      }
    },
    removerVantagem(vantagem) {
      if (this.vantagemSelecionada(vantagem)) {
        this.ficha.vantagens = this.ficha.vantagens.filter(v => v !== vantagem);
      }
    },
    confirmarDistribuicaoPontos() {
      this.showDistribuirPontosModal = false;
    },
    confirmarVantagens() {
      this.showVantagensModal = false;
    },
    confirmarDesvantagens() {
      this.showDesvantagensModal = false;
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
      let adicionado = parseInt(this.experienciaParaAdicionar, 10);
      if (!isNaN(adicionado) && adicionado > 0) {
        this.ficha.experiencia += adicionado;
        this.experienciaParaAdicionar = 0; // Resetar o campo de input
        this.calcularLevel();
      }
      this.showExperienciaModal = false;
    },
    calcularLevel() {
      const levelTable = [
        10, 30, 60, 100, 150, 210, 280, 360, 450, 550,
        670, 810, 970, 1150, 1350, 1570, 1810, 2070, 2350, 2650
      ];
      const oldLevel = this.ficha.level;
      this.ficha.level = levelTable.findIndex(level => this.ficha.experiencia < level);
      const newLevel = this.ficha.level;
      if (newLevel !== -1 && newLevel !== oldLevel) {
        let levelDifference = newLevel - oldLevel;
        this.ficha.pontosDistribuicao += 5 * levelDifference;
      }
    },
    carregarFicha() {
      const id = parseInt(this.$route.params.id, 10);
      const fichas = JSON.parse(localStorage.getItem('fichas')) || [];
      const ficha = fichas.find(f => f.id === id);
      if (ficha) {
        this.ficha = this.atualizarEstruturaFicha(ficha);
        this.fotoUrl = ficha.foto || null;
      }
    },
    carregarFichas() {
      const fichas = JSON.parse(localStorage.getItem('fichas')) || [];
      this.fichas = fichas.map(f => this.atualizarEstruturaFicha(f));
    },
    salvarFichas() {
      localStorage.setItem('fichas', JSON.stringify(this.fichas));
    },
    atualizarEstruturaFicha(ficha) {
      // Certifique-se de que a ficha tenha todos os campos necessários
      const fichaModelo = this.inicializarFicha();
      return { ...fichaModelo, ...ficha };
    },
    gerarIdUnico() {
      return Date.now();
    },
    navegarParaHabilidades() {
      this.$router.push(`/habilidades/${this.ficha.id}`);
    },
    navegarParaMagias(){
      this.$router.push(`/magicas/${this.ficha.id}`);
    },
    navegarParaItens(){
      this.$router.push(`/itens/${this.ficha.id}`);
    },
    navegarParaArmaduras(){
      this.$router.push({ path: `/armaduras/${this.ficha.id}` });
    },
    vantagemSelecionada(vantagem) {
      return this.ficha.vantagens.includes(vantagem);
    },
    contarVantagem(vantagem) {
      return this.ficha.vantagens.filter(v => v.nome === vantagem.nome).length;
    },
    desvantagemSelecionada(desvantagem) {
      return this.ficha.desvantagens.includes(desvantagem);
    },
    contarDesvantagem(desvantagem) {
      return this.ficha.desvantagens.filter(d => d.nome === desvantagem.nome).length;
    },
    adicionarDesvantagem(desvantagem) {
      if (this.pontosDesvantagensDisponiveis >= desvantagem.custo && !this.desvantagemSelecionada(desvantagem)) {
        this.ficha.desvantagens.push(desvantagem);
      }
    },
    removerDesvantagem(desvantagem) {
      if (this.desvantagemSelecionada(desvantagem)) {
        this.ficha.desvantagens = this.ficha.desvantagens.filter(d => d !== desvantagem);
      }
    }
  },
  created() {
    this.carregarFicha();
  }
};
</script>

<style scoped>
.q-pa-md {
  background-color: #e1c596;
}
</style>

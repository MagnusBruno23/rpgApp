<template>
  <q-page padding class="content-wrappe">
    <q-card class="q-pa-md">
      <q-page padding class="content-wrapper">
        <q-card class="opaque-card">
          <q-card-section class="text-h6">Adicionar Nova Ficha</q-card-section>

          <q-card-section>
            <q-form @submit.prevent="salvarFicha">
              <q-input filled v-model="ficha.nome" label="Nome do Personagem" />
              <q-select filled v-model="ficha.raca" :options="racas" label="Raca" @input="atualizarVantagensDesvantagens" />
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
                <q-btn label="Distribuir Pontos" @click="showDistribuirPontosModal = true" /><br>
                <q-btn label="Vantagens" @click="showVantagensModal = true" /><br>
                <q-btn label="Desvantagens" @click="showDesvantagensModal = true" />
              </div>

              <!-- Novas informações -->
              <div class="q-mt-md">
                <div><br>Level: {{ ficha.level }}</div>
                <div><br>Pontos de Vida: {{ pontosDeVida }}</div>
                <q-linear-progress :value="pontosDeVida / 50" color="red" size="sm" style="width: 20%;" />
                <div>Pontos de Mana: {{ pontosDeMana }}</div>
                <q-linear-progress :value="pontosDeMana / 20" color="blue" size="sm" style="width: 20%;" />
                <div><br>Vigor: {{ ficha.vigor }}</div>
                <div>Ataque Base: {{ calcularAtaqueBase }}</div>
                <div>Ataque Base Mágico: {{ calcularAtaqueBaseMagico }}</div>
                <div>Acerto: {{ calcularAcerto }}</div>
                <div>Esquiva: {{ calcularEsquiva }}</div>
                <div>RDF: {{ calcularRDF }}</div>
                <div>RDM: {{ calcularRDM }}</div>
              </div>

              <!-- Botões de ação (Salvar e Limpar) -->
              <div class="q-mt-md">
                <q-btn type="submit" label="Salvar" color="primary" />
                <q-btn label="Limpar" @click="limpar" />
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

        <!-- Janela para Vantagens -->
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

        <!-- Janela para Desvantagens -->
        <q-dialog v-model="showDesvantagensModal">
          <q-card>
            <q-card-section class="text-h6">Selecionar Desvantagens</q-card-section>
            <q-card-section class="text-h6">Pontos disponíveis: {{ pontosDesvantagensDisponiveis }}</q-card-section>

            <q-card-section v-for="desvantagem in desvantagens" :key="desvantagem.nome" class="row items-center q-mb-sm">
              <div class="col">
                <div>{{ desvantagem.nome }}</div>
                <div>Requer: {{ desvantagem.custo }} Pontos</div>
              </div>
              <q-btn icon="remove" @click="removerDesvantagem(desvantagem)" :disable="!desvantagemSelecionada(desvantagem)" />
              <div class="q-ml-sm q-mr-sm">{{ contarDesvantagem(desvantagem) }}</div>
              <q-btn icon="add" @click="adicionarDesvantagem(desvantagem)" :disable="pontosDesvantagensDisponiveis < desvantagem.custo || desvantagemSelecionada(desvantagem)" />
            </q-card-section>

            <q-card-actions align="right">
              <q-btn flat label="Cancelar" @click="showDesvantagensModal = false" />
              <q-btn flat label="Ok" @click="confirmarDesvantagens" color="primary" />
            </q-card-actions>
          </q-card>
        </q-dialog>
      </q-page>
    </q-card>
  </q-page>
</template>

<script>
import { classes, racas, vantagens, desvantagens } from '../assets/rpgData';

export default {
  data() {
    return {
      ficha: {
        id: null, // Mude para null para inicializar como vazio
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
        habilidades: [],
        magias: [],
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
      vantagens: vantagens,
      desvantagens: desvantagens
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
    pontosDesvantagensDisponiveis() {
      const totalPontosDesvantagens = this.ficha.desvantagens.reduce((acc, cur) => acc + cur.custo, 0);
      return 5 - totalPontosDesvantagens;
    },
    pontosDeVida() {
      return 50 + this.ficha.atributos.constituicao * 3;
    },
    pontosDeMana() {
      return 20 + this.ficha.atributos.constituicao * 3;
    },
    calcularAtaqueBase() {
      return this.ficha.atributos.forca * 2;
    },
    calcularAtaqueBaseMagico() {
      return this.ficha.atributos.inteligencia * 2;
    },
    calcularAcerto() {
      return this.ficha.atributos.destreza * 2;
    },
    calcularEsquiva() {
      return this.ficha.atributos.agilidade * 2;
    },
    calcularRDF() {
      return this.ficha.atributos.constituicao * 2;
    },
    calcularRDM() {
      return this.ficha.atributos.inteligencia * 2;
    }
  },
  methods: {
    salvarFicha() {
      this.carregarFichas();
      if (!this.ficha.id) {
        this.ficha.id = Date.now(); // Gera um novo ID
      }
      const fichaIndex = this.fichas.findIndex(f => f.id === this.ficha.id);
      if (fichaIndex !== -1) {
        this.fichas[fichaIndex] = { ...this.ficha, foto: this.fotoUrl };
      } else {
        this.fichas.push({ ...this.ficha, foto: this.fotoUrl });
      }
      this.salvarFichas();
      this.$router.push('/listaFichas');
    },
    limpar() {
      this.ficha = {
        id: null, // Reseta para null ao limpar
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
        habilidades: [],
        magias: [],
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
    adicionarDesvantagem(desvantagem) {
      if (this.pontosDesvantagensDisponiveis >= desvantagem.custo && !this.desvantagemSelecionada(desvantagem)) {
        this.ficha.desvantagens.push(desvantagem);
      }
    },
    removerDesvantagem(desvantagem) {
      this.ficha.desvantagens = this.ficha.desvantagens.filter(d => d !== desvantagem);
    },
    desvantagemSelecionada(desvantagem) {
      return this.ficha.desvantagens.includes(desvantagem);
    },
    contarDesvantagem(desvantagem) {
      return this.ficha.desvantagens.filter(d => d === desvantagem).length;
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
          this.ficha.foto = e.target.result;
        };
        reader.readAsDataURL(file);
      }
    },
    atualizarVantagensDesvantagens() {
      this.ficha.desvantagens = desvantagens[this.ficha.raca.value] || [];
    },
    navegarParaHabilidades() {
      this.salvarFichaTemporaria();
      this.$router.push({ path: `/habilidades/${this.ficha.id}` });
    },
    navegarParaMagias() {
      this.salvarFichaTemporaria();
      this.$router.push({ path: `/magicas/${this.ficha.id}` });
    },
    carregarFichas() {
      const fichas = JSON.parse(localStorage.getItem('fichas')) || [];
      this.fichas = fichas.map(ficha => ({
        ...ficha,
        vantagens: Array.isArray(ficha.vantagens) ? ficha.vantagens : [],
        desvantagens: Array.isArray(ficha.desvantagens) ? ficha.desvantagens : [],
        habilidades: Array.isArray(ficha.habilidades) ? ficha.habilidades : [],
        magias: Array.isArray(ficha.magias) ? ficha.magias : []
      }));
    },
    salvarFichas() {
      localStorage.setItem('fichas', JSON.stringify(this.fichas));
    },
    salvarFichaTemporaria() {
      if (!this.ficha.id) {
        this.ficha.id = Date.now();
      }
      localStorage.setItem('ficha_temporaria', JSON.stringify(this.ficha));
    },
    carregarFichaTemporaria() {
      const fichaTemporaria = JSON.parse(localStorage.getItem('ficha_temporaria'));
      if (fichaTemporaria) {
        this.ficha = fichaTemporaria;
        this.fotoUrl = fichaTemporaria.foto;
        localStorage.removeItem('ficha_temporaria'); // Remover ficha temporária após carregar
      }
    }
  },
  created() {
    this.carregarFichas();
    this.carregarFichaTemporaria();
  }
};
</script>

<style scoped>
.content-wrapper {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background: url('~assets/background.jpg') no-repeat center center fixed;
  background-size: cover;
}

.opaque-card {
  background-color: #e1c596;
  padding: 30px; /* Ajuste o padding para aumentar o espaço interno dos cards */
  border-radius: 50px;
  width: 100%;
  max-width: 500px; /* Ajuste a largura máxima dos cards */
  margin-bottom: 20px;
}
.q-pa-md{
  background-color: #e1c596;
}
</style>

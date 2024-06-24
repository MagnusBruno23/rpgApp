<template>
  <q-page-container>
  <q-page padding>
      <div class="row justify-center">
        <h3>Guerreiro</h3>
      </div>

      <div class="row justify-center">
        <q-img
        src="~assets/classes/guerreiro.png"
        style="max-height: 300px; max-width: 300px"
        class="justify-center"></q-img>
      </div>

      <h6>
        <div class="row">
          <div class="col">
            <div class="row">
              Raças liberadas
            </div>
            <div class="row">
              -> Humano
            </div>
            <div class="row">
              -> Elfo
            </div>
            <div class="row">
              -> Anão
            </div>
            <div class="row">
              -> Super Humano
            </div>
            <div class="row">
              -> Orc
            </div>
            <div class="row">
              -> Minotauro
            </div>
            <div class="row">
              -> Meio Animal
            </div>
          </div>


          <div class="col">
            <div class="row">
              Vantagens
            </div>
            <div class="row">
              -> Armadura: +3 RDF
            </div>
            <div class="row">
              -> Espada de duas mãos: +4 de ataque
            </div>
          </div>
        </div>
      </h6>

      <div class="row justify-center">
        <h3>Habilidades e magias</h3>
      </div>

      <h6>
        <div class="text-weight-bold">
          Level 1
        </div><br/>

        Golpe Devastador<br/>
        Descrição: O guerreiro desfere um golpe poderoso com a sua arma, capaz de causar danos graves e derrubar o inimigo<br/>
        Tipo: Habilidade de ataque<br/>
        Custo de vantagens: 2 pontos<br/>
        Custo: 3 pontos de vigor<br/>
        Duração: Instantânea<br/>
        Alcance: Corpo a corpo<br/>
        Componentes: Uma arma, espada, faca, adaga, qualquer coisa cortante<br/>
        Efeito: O ataque adiciona +10 de dano + seu ataque fisico 1 d20 Extra<br/>
        Tempo de espera: 2 turnos<br/><br/>

        Postura Defensiva<br/>
        Descrição: O guerreiro assume uma postura defensiva, aumentando a sua proteção contra ataques inimigos e podendo contra-atacar se for atingido<br/>
        Tipo: Habilidade de defesa<br/>
        Custo de vantagens: 2 pontos<br/>
        Custo: 5 pontos de vigor<br/>
        Duração: Instantâneo<br/>
        Alcance: Pessoal<br/>
        Componentes: Nenhum<br/>
        Efeito: + 10 de Redução de dano fisico. Cada contra ataque gasta 1 de vigor extra. Nesse modo não ir até o inimigo ataca-lo<br/>
        Tempo de espera: 2 vezes por batalha<br/><br/>

        Rastrear Inimigos<br/>
        Descrição: O guerreiro usa as suas habilidades de sobrevivência para rastrear os seus inimigos, seguindo os seus rastros e sinais<br/>
        Tipo: Habilidade versátil<br/>
        Custo de vantagens: 2 pontos<br/>
        Custo: Nenhum<br/>
        Duração: Indefinida<br/>
        Alcance: Visão<br/>
        Componentes: Nenhum<br/>
        Efeito: O rastrear inimigos permite que o guerreiro encontre e siga os rastros dos seus inimigos, como pegadas, marcas, sangue, cheiro, etc. O guerreiro pode rastrear um número de inimigos igual ao seu modificador de Inteligência, e pode identificar o tipo, o tamanho, o número e a direção dos rastros.<br/>
        Tempo de espera: Nenhum<br/>
        Frequência de uso: Ilimitada<br/>
      </h6>
  </q-page>
</q-page-container>
</template>

<script>

export default {
  // name: 'PageName',
}
</script>

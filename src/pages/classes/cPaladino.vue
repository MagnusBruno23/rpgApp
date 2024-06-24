<template>
  <q-page-container>
  <q-page padding>
      <div class="row justify-center">
        <h3>Paladino</h3>
      </div>

      <div class="row justify-center">
        <q-img
        src="~assets/classes/paladino.png"
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
              -> Aasimar
            </div>
            <div class="row">
              -> Meio Animal
            </div>
          </div>


          <div class="col items-center" style="height: 150px">
            <div class="row">
              Vantagens
            </div>
            <div class="row">
              -> Invoca montaria sagrada
            </div>
            <div class="row">
              -> Espada de duas mãos: +5 de ataque
            </div>
            <div class="row">
              -> Amardura dourada: + 5 RDF e +8 RDM
            </div>
            <div class="row">
              -> Ataque do imperador: Dano de 18 + ataque + d20, custo: 2 de vigor e 20 MP. CD: 3 turnos
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

        Golpe Luz Divina<br/>
        Descrição: O paladino invoca uma luz sagrada que atinge um inimigo, causando dano mágico e reduzindo sua resistência a magia<br/>
        Tipo: Habilidade de ataque<br/>
        Custo de vantagens: 2 pontos<br/>
        Custo: 20 pontos de magia<br/>
        Duração: Instantânea<br/>
        Alcance: Corpo a corpo<br/>
        Efeito: O ataque adiciona +10 de dano + seu ataque fisico 1 d20 Extra<br/>
        Tempo de espera: 3 turnos<br/><br/>
      </h6>
  </q-page>
</q-page-container>
</template>

<script>

export default {
  // name: 'PageName',
}
</script>

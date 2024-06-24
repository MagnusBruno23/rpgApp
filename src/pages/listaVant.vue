<template>
  <q-page padding>
    <div class="q-pa-md">
      <div class="text-h6 q-mb-md">Lista de Vantagens do RPG</div>

      <q-btn
        v-for="vantagem in vantagens"
        :key="vantagem.id"
        outline
        rounded
        color="primary"
        class="full-width q-mb-sm"
        padding="15px"
        :label="vantagem.nome"
        @click="selecionarVantagem(vantagem)"
      />
    </div>

    <q-dialog v-model="showVantagemModal">
      <q-card>
        <q-card-section class="text-h6">{{ vantagemSelecionada.nome }}</q-card-section>
        <q-card-section>
          <div><strong>Descrição:</strong> {{ vantagemSelecionada.descricao }}</div>
          <div><strong>Custo:</strong> {{ vantagemSelecionada.custo }} pontos</div>
        </q-card-section>
        <q-card-actions align="right">
          <q-btn flat label="Fechar" @click="showVantagemModal = false" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
export default {
  data() {
    return {
      vantagens: [
        { id: 1, nome: 'Furtar', descricao: 'Aumenta em +3 a chance de furtar um objeto.', custo: 4 },
        { id: 2, nome: 'Lábia', descricao: 'Aumenta em +4 a chance de convencer alguém.', custo: 4 },
        { id: 3, nome: 'Cavalgar', descricao: 'Você consegue andar a cavalo, pónei, etc.', custo: 1 },
        { id: 4, nome: 'Velejar', descricao: 'Você consegue comandar ou navegar um navio', custo: 5 },
        { id: 5, nome: 'Voar', descricao: 'Seria o mesmo que Cavalgar, porém em um animal alado.', custo: 7 },
        { id: 6, nome: 'Beleza', descricao: 'Aumenta +3 em testes relacionado a sedução, convencer e até mesmo alguns descontos em certos estabelecimentos.', custo: 6 },
        { id: 7, nome: 'Boa fama', descricao: 'Na maioria das cidades você ganha hospitalidade gratuita, comida e roupa lavada. Em outros até mesmo mulheres/homens para se divertir. Ganha descontos em bebidas e outros tipos de estabelecimentos, pode facilmente convencer algumas pessoas mais desprovidas de inteligências a fazerem coisas específicas de fácil entendimento.', custo: 6 },
        { id: 8, nome: 'Arremedo', descricao: 'Capacidade de imitar qualquer som SIMPLES.', custo: 4 },
        { id: 9, nome: 'Destemor', descricao: 'Dificilmente é assustado por algo.', custo: 9 },
        { id: 10, nome: 'Empatia', descricao: 'Sensibilidade extraordinária em relação às outras pessoas. É um talento excelente para identificar impostores, possessões por espíritos, etc.', custo: 8 },
        { id: 11, nome: 'Empatia com animais', descricao: 'Pode compreender as motivações dos animais, sabe se estão hostil, com fome, medo, amigável, etc.', custo: 6 },
        { id: 12, nome: 'Patrono', descricao: 'Possui um mentor, mestre, professor, até mesmo uma organização inteira que pode lhe oferecer ajuda.', custo: 5 },
        { id: 13, nome: 'Reconhecimento social', descricao: 'É membro de uma classe, raça, sexo ou grupo muito respeitado, temido ou venerado pela sociedade.', custo: 6 },
        { id: 14, nome: 'Riqueza', descricao: 'Inicia com um cavalo ou algum tipo de gado, uma casa e 50 moedas de ouro.', custo: 10 },
        { id: 15, nome: 'Senso de direção', descricao: 'Fica muito difícil você se perder em algum caminho', custo: 3 },
        { id: 16, nome: 'Aptidão para armas', descricao: 'Vai escolher um tipo específico de arma que você mais sabe lidar e ela concederá +4 em ataque.', custo: 10 },
        { id: 17, nome: 'Aptidão para magia', descricao: 'Você pode escolher um tipo de magia especifica que gastará menos MP ou ganhar uma porcentagem a mais de dano.', custo: 10 },
        { id: 18, nome: 'Combo físico', descricao: 'No início do jogo o personagem começa com um padrão de movimento/locomoção, mas com essa habilidade você dobra os valores da locomoção. Obs: Só pode comprar essa vantagem enquanto está criando o personagem.', custo: 8 },
        { id: 19, nome: 'Nadar', descricao: 'Você não se afoga em circunstâncias normais', custo: 2 },
        { id: 20, nome: 'Escalar', descricao: 'Essa vantagem não é a mesma coisa que o parkour. Mas em momentos de escaladas ela te ajuda com +6 pontos no teste.', custo: 4 },
        { id: 21, nome: 'Segundo língua', descricao: 'Você aprende uma língua a sua escolha', custo: 7 },
        { id: 22, nome: 'Paquerador(a)', descricao: 'Adiciona +4 pontos no teste pra ter relações com alguém.', custo: 7 },
        { id: 23, nome: 'Senso de perigo', descricao: 'Sempre que houver perigo na sua volta o mestre pedirá pra que jogue um dado para ver se você vai ou não perceber esse perigo.', custo: 7 },
        { id: 24, nome: 'Acrobata', descricao: 'Tudo que vai fazer, fugir, lutar, conversar e a te ir ao banheiro você faz dando piruetas. Adiciona mais fama ao lutar em público usando acrobacia.', custo: 6 },
        { id: 25, nome: 'Equilíbrio perfeito', descricao: 'Você não precisa jogar teste em situações aonde você precisa se equilibrar para não cair, ou para qualquer outro incidente que necessite de equilíbrio.', custo: 7 },
        { id: 26, nome: 'Tecnologia', descricao: 'Você é engenhoso, pode criar coisas modernas na era medieval. Claro que algo bem mais grosseiro, sem chamar muita atenção. Como por exemplo; uma térmica. Não será possível criar nada grandioso como um celular por exemplo.', custo: 10 },
        { id: 27, nome: 'Ferreiro', descricao: 'Pode criar armas básicas, desde armas pequenas a grandes. Para aumentar sua capacidade de criação você precisa upar essa vantagem. Nível 1: Já adquirido ao comprar a vantagem. Facas pequenas, facas grandes, punhal, shurikens, etc. Os danos podem várias de 1 a 4 em ataque, depende do material escolhido. Nível 2: (15 pontos) Espadas, machados, marretas, etc. Dano de 5 a 17 em ataque dependendo do material. Nível 3: (28 pontos) Armas lendárias As armas lendárias são tão bem feitas que ela podem ficar tão conhecidas como a scalibur ou o mijhonir. Os danos podem várias de 20 a 30 de ataque. Elas podem conter pedras misticas de magia que podem dar uma habilidade especial para a arma. As pedras são um material obrigatório para criar uma arma lendária.', custo: 15 },
        { id: 28, nome: 'Curandeiro', descricao: 'Poder de cura.', custo: 12 },
        { id: 29, nome: 'Costureiro', descricao: 'Facilidade para costurar roupas e itens.', custo: 10 },
        { id: 30, nome: 'Autossuficiente', descricao: 'Não precisa comer nem dormir, somente se hidratar.', custo: 10 },
        { id: 31, nome: 'Poder oculto', descricao: 'Com teste crítico positivo, você invoca um poder oculto aumentando em 65% todos seus atributos.', custo: 18 },
        { id: 32, nome: 'Sobrevivência na floresta', descricao: 'Tem os conhecimentos básicos de como conseguir não morrer numa floresta', custo: 2 }
      ],
      showVantagemModal: false,
      vantagemSelecionada: {}
    };
  },
  methods: {
    selecionarVantagem(vantagem) {
      this.vantagemSelecionada = vantagem;
      this.showVantagemModal = true;
    }
  }
};
</script>

<style scoped>
.q-btn {
  color: #000000 !important; /* Cor do texto dos botões em branco */
}
</style>

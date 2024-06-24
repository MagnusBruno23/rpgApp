<template>
  <q-page padding>
    <div>
      <div class="row justify-center items-center">
        <q-img
          src="~assets/rosa_ventos.png"
          width="220px"
          height="220px"
        /><br/>
        <h1>Last Breath</h1>
      </div>

      <q-btn
        outline rounded color="primary"
        class="full-width"
        padding="15px"
        icon="feed"
        label="FICHAS"
        to="listaFichas"
      />
    </div>
    <div><br></div>


    <div>
      <q-btn outline rounded color="primary"
      class="full-width"
      padding="15px"
      icon="sports_mma"
      label="CLASSES"
      to="listaClasses"/>
    </div>
    <div><br></div>

    <div>
      <q-btn outline rounded color="primary"
      class="full-width"
      padding="15px"
      icon="face"
      label="RAÇAS"
      to="listaRacas"/>
    </div>
    <div><br></div>

    <div>
      <q-btn outline rounded color="primary"
      class="full-width"
      padding="15px"
      icon="check"
      label="VANTAGENS"
      to="listaVant"/>
    </div>
    <div><br></div>

    <q-btn outline rounded color="primary"
    class="full-width"
    padding="15px"
    icon="close"
    label="DESVANTAGENS"
    to="listaDesvant"/>
  </q-page>


</template>

<script>
export default {
  // name: 'PageName',
}
</script>

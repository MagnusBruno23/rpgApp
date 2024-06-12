<template>
  <q-item
  :key="id"
  clickable>
    <q-iten-selection side top>
      {{ vant.name }}
    </q-iten-selection>
  </q-item>
</template>

<script>
export default {
  name: 'listaVantComp',
  props:{
    vant:{
      type: Object,
      required: true
    },
    id:{
      type: String,
      required: true
    }
  },
  setup () {
    return {
    }
  }
}
</script>

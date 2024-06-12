<template>
  <q-page padding>
    <q-list separator padding>
      <q-item
      clickable
      v-for="(vant, id) in vant"
      :key="id"
      :vant="vant"
      :id="id">
      <q-item-selection side top>
        {{ vant.name }}
      </q-item-selection>
      </q-item>
    </q-list>
  </q-page>
</template>

<script>
import listaVantComp from 'src/components/listaVantComp.vue';
import moduleData from 'src/store/moduleData';
import { mapGetters } from 'vuex';

export default {
  name: 'listaVant',
  //components:{
  //  listaVantComp
  //},
  computed:{
    ...mapGetters('moduleData', ['vant'])
  },
  props:{
    vant:{
      type: Object,
      required: true
    },
    id:{
      type: String,
      required: true
    },

  data(){
    return{}
  }
}}
</script>

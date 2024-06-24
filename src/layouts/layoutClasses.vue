<template>
<div class="fullscreen bg-image">
  <q-layout view="hHh lpR fFf">

    <q-header elevated class="bg-primary text-white">
      <q-toolbar>
        <q-btn dense flat round icon="home"
        @click="toggleLeftDrawer"
        to="/"/>

        <q-toolbar-title>
          Last Breath
        </q-toolbar-title>

        <q-btn dense flat round icon="arrow_back"
        @click="toggleRightDrawer"
        to="/listaClasses"/>
      </q-toolbar>
    </q-header>


    <q-page-container>
      <q-scroll-area class="fullscreen" style="margin-top: 50px;">
          <router-view />
      </q-scroll-area>
    </q-page-container>

  </q-layout>
</div>
</template>

<script>
import { ref } from 'vue'

export default {
  setup () {
    const leftDrawerOpen = ref(false)

    return {
      leftDrawerOpen,
      toggleLeftDrawer () {
        leftDrawerOpen.value = !leftDrawerOpen.value
      }
    }
  }
}
</script>

<style>


  .bg-image {
    background-image: url(~assets/background.jpg);
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center
  }


</style>

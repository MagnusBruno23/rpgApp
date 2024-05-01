<template>
  <q-layout view="hHh lpR fFf">

    <q-header elevated class="bg-primary text-white">
      <q-toolbar>
        <q-btn dense flat round icon="home"
        @click="toggleLeftDrawer"
        to="/"/>
        <q-toolbar-title>
          Last Breath
        </q-toolbar-title>
        <q-btn dense flat round icon="delete"
        @click="toggleRightDrawer"/>
        <q-btn dense flat round icon="arrow_back"
        @click="toggleRightDrawer"/>
      </q-toolbar>
    </q-header>


    <q-page-container>
      <router-view />
    </q-page-container>

  </q-layout>
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

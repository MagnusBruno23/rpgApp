<template>
  <q-layout view="hHh lpR fFf">

    <q-header elevated class="bg-primary text-white">
      <q-toolbar>
        <q-btn dense flat round icon="menu" @click="toggleLeftDrawer" />
        <q-toolbar-title>
          rpgApp
        </q-toolbar-title>
        <q-btn dense flat round icon="home"
        @click="toggleRightDrawer"
        to="/"/>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" side="left" behavior="mobile" elevated>
      <q-list dense bordered padding class="rounded-borders">

        <q-item
        clickable
        to="/listaFichas"
        exact
        >
        <q-item-section>
          <q-icon name="home"/>
        </q-item-section>
        <q-item-section>
          Fichas
        </q-item-section>
        </q-item>

        <q-item
        clickable
        v-ripple
        to="/listaClasses"
        exact
        >
        <q-item-section>
          Classes
        </q-item-section>
        </q-item>

      <q-item
        clickable
        v-ripple
        to="/listaRacas"
        exact
        >
        <q-item-section>
          Raças
        </q-item-section>
      </q-item>

      <q-item
        clickable
        v-ripple
        to="/listaVant"
        exact
        >
        <q-item-section>
          Vantagens
        </q-item-section>
      </q-item>

      <q-item
        clickable
        v-ripple
        to="/listaDesvant"
        exact
        >
        <q-item-section>
          Desvantagens
        </q-item-section>
      </q-item>
      </q-list>
    </q-drawer>

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

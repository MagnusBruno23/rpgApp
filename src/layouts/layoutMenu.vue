<template>
  <div class="fullscreen bg-image">

    <q-layout view="hHh lpR fFf">
      <q-page-container>
        <q-scroll-area class="fullscreen">
        <router-view />
        </q-scroll-area>
      </q-page-container>

    </q-layout>
  </div>
</template>
<style>

  .bg-image {
    background-image: url(~assets/background.jpg);
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center
  }


</style>

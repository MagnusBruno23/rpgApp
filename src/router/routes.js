const routes = [
  {
    path: '/',
    component: () => import('layouts/layoutMain.vue'),
    children: [
      { path: '', component: () => import('pages/Menu.vue') },
      { path: 'listaFichas', component: () => import('pages/listaFichas.vue') },
      { path: 'listaClasses', component: () => import('pages/listaClasses.vue') },
      { path: 'listaRacas', component: () => import('pages/listaRacas.vue') },
      { path: 'listaVant', component: () => import('pages/listaVant.vue') },
      { path: 'listaDesvant', component: () => import('pages/listaDesvant.vue') }
    ],

    //path: '/',
    //component: () => import('layouts/layoutMain.vue'),
    //children: [
    //  { path: 'listaFichas', component: () => import('pages/listaFichas.vue') },
    //  { path: 'listaClasses', component: () => import('pages/listaClasses.vue') },
    //  { path: 'listaRacas', component: () => import('pages/listaRacas.vue') },
    //  { path: 'listaVant', component: () => import('pages/listaVant.vue') },
    //  { path: 'listaDesvant', component: () => import('pages/listaDesvant.vue') }
    //]

  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes

const routes = [
  {
    path: '/',
    component: () => import('layouts/layoutMenu.vue'),
    children: [
      { path: '', component: () => import('pages/Menu.vue') }

    ]
  },
  {
    path: '/',
    component: () => import('layouts/layoutMain.vue'),
    children: [
      { path: 'listaFichas', component: () => import('pages/listaFichas.vue') },
      { path: 'listaClasses', component: () => import('pages/listaClasses.vue') },
      { path: 'listaRacas', component: () => import('pages/listaRacas.vue') },
      { path: 'listaVant', component: () => import('pages/listaVant.vue') },
      { path: 'listaDesvant', component: () => import('pages/listaDesvant.vue') },
      { path: '/habilidades/:id', component: () => import('pages/HabiPage.vue') },
      { path: '/magicas/:id', component: () => import('pages/MagiPage.vue') },
      { path: '/itens/:id', component: () => import('pages/ItensPage.vue') },
      { path: '/armaduras/:id', component: () => import('pages/ArmadurasPage.vue') },

    ]
  },
  {
    path: '/',
    component: () => import('layouts/layoutFicha.vue'),
    children: [
      { path: 'adicionar-ficha', component: () => import('pages/AdicionarFicha.vue') },
      { path: '/editar-ficha/:id', component: () => import('pages/EditarFicha.vue') }
    ]
  },

  {
    path: '/',
    component: () => import('layouts/layoutRacas.vue'),
    children: [
      { path: 'rHumano', component: () => import('pages/racas/rHumano.vue') },
      { path: 'rElfo', component: () => import('pages/racas/rElfo.vue') },
      { path: 'rOrc', component: () => import('pages/racas/rOrc.vue') },
      { path: 'rAnao', component: () => import('pages/racas/rAnao.vue') },
      { path: 'rMinotauro', component: () => import('pages/racas/rMinotauro.vue') },
      { path: 'rFada', component: () => import('pages/racas/rFada.vue') },
      { path: 'rTiefling', component: () => import('pages/racas/rTiefling.vue') },
      { path: 'rAasimar', component: () => import('pages/racas/rAasimar.vue') },
      { path: 'rMeioAnimal', component: () => import('pages/racas/rMeioAnimal.vue') },
      { path: 'rDraconico', component: () => import('pages/racas/rDraconico.vue') },
      { path: 'rSuperHumano', component: () => import('pages/racas/rSuperHumano.vue') },

    ]
  },
  {
    path: '/',
    component: () => import('layouts/layoutClasses.vue'),
    children: [
      { path: '/classe/paladino', component: () => import('components/Classes/PaladinoComp.vue') },
      { path: '/classe/guerreiro', component: () => import('components/Classes/GuerreiroComp.vue') },
      { path: '/classe/mago', component: () => import('components/Classes/MagoComp.vue') },
      { path: '/classe/ladino', component: () => import('components/Classes/LadinoComp.vue') },
      { path: '/classe/samurai', component: () => import('components/Classes/SamuraiComp.vue') },
      { path: '/classe/clerigo', component: () => import('components/Classes/ClerigoComp.vue') },
      { path: '/classe/vampiro', component: () => import('components/Classes/VampiroComp.vue') },
      { path: '/classe/cavaleiro-das-trevas', component: () => import('components/Classes/CavaleiroComp.vue') },
      { path: '/classe/necromante', component: () => import('components/Classes/NecromanteComp.vue') },
      { path: '/classe/mago-do-caos', component: () => import('components/Classes/MagoDoCaosComp.vue') },
      { path: '/classe/bardo', component: () => import('components/Classes/BardoComp.vue') }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes

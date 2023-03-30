import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,

    },
    {
      path: '/ceshi',
      name: 'ceshi',
      component: () => import('@/views/CeshiView.vue')
    },
    {
      path: '/vuex',
      name: 'vuex',
      component: () => import('@/views/VuexView.vue')
    }



  ]
})

export default router

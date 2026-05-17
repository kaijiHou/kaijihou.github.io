import { createRouter, createWebHashHistory } from 'vue-router'
import Novels from '../views/Novels.vue'

const routes = [
  { path: '/', name: 'home', component: { template: '<div></div>' } },
  { path: '/novels', name: 'novels', component: Novels },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

export default router

import { createRouter, createWebHistory } from 'vue-router'
import LandingPage from '../components/LandingPage.vue'
import Generator from '../components/Generator.vue'
import CaseStudy from '../components/CaseStudy.vue'

const routes = [
  {
    path: '/',
    name: 'Landing',
    component: LandingPage
  },
  {
    path: '/generator',
    name: 'Generator',
    component: Generator
  },
  {
    path: '/case-study',
    name: 'CaseStudy',
    component: CaseStudy
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
import Vue from 'vue'
import VueRouter from 'vue-router'
import Calculator from '../views/Calculator.vue'
import About from '../views/About.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Calculator',
    component: Calculator
  },
  {
    path: '/about',
    name: 'About',
    component: About
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router

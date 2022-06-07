import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import SphereView from '../views/SphereView.vue'
import CubeView from '../views/CubeView.vue'
import ConeView from '../views/ConeView.vue'
import CylinderView from '../views/CylinderView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/sphere',
    name: 'sphere',
    component: SphereView
  },
  {
    path: '/cube',
    name: 'cube',
    component: CubeView
  },
  {
    path: '/cone',
    name: 'cone',
    component: ConeView
  },
  {
    path: '/cylinder',
    name: 'cylinder',
    component: CylinderView
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router

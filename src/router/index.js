import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import SphereView from '../views/SphereView.vue'
import CubesView from '../views/CubesView.vue'
import ConeView from '../views/ConeView.vue'
import CylinderView from '../views/CylinderView.vue'
import TorusView from '../views/TorusView.vue'
import PlaneView from '../views/PlaneView.vue'
import ModelView from '../views/ModelView.vue'


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
    path: '/cubes',
    name: 'cubes',
    component: CubesView
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
  {
    path: '/torus',
    name: 'torus',
    component: TorusView
  },
  {
    path: '/plane',
    name: 'plane',
    component: PlaneView
  },
  {
    path: '/model',
    name: 'model',
    component: ModelView
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router

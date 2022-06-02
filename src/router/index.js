import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../components/Login.vue'
import Home from '../components/Home.vue'
import KimiaDarah from '../components/KimiaDarah.vue'
import Hermatologi from '../components/Hermatologi.vue'
import ImunologiSerologi from '../components/ImunologiSerologi.vue'
import Registrasi from '../components/Registrasi.vue'
import ReviewHasil from '../components/ReviewHasil.vue'
import UpdateData from '../layout/UpdateData.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login
  },
  {
    path: '/Home',
    name: 'Home',
    component: Home,
  },
  {
    path: '/KimiaDarah',
    name: 'Kimia Darah',
    component: KimiaDarah,
    props: true
  },
  {
    path: '/Hermatologi',
    name: 'Hermatologi',
    component: Hermatologi,
    props: true
  },
  {
    path: '/ImunologiSerologi',
    name: 'Imunologi Serologi',
    component: ImunologiSerologi,
    props: true
  },
  {
    path: '/Registrasi',
    name: 'Registrasi',
    component: Registrasi,
    props: true
  },
  {
    path: '/ReviewHasil',
    name: 'Review Hasil',
    component: ReviewHasil,
    props: true
  },
  {
    path: '/UpdateData',
    name: 'Update Data',
    component: UpdateData,
    props: true
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../components/Login.vue'
import Home from '../components/Home.vue'
import KimiaDarah from '../components/KimiaDarah.vue'
import Hematologi from '../components/Hematologi.vue'
import Urinologi from '../components/Urinologi.vue'
import LainLain from '../components/LainLain.vue'
import Registrasi from '../components/Registrasi.vue'
import ReviewHasil from '../components/ReviewHasil.vue'
import PemeriksaanPasien from '../components/PemeriksaanPasien.vue'
import Cetak from '../components/Cetak.vue'

import UpdateData from '../layout/UpdateData.vue'
import UpdatePemeriksaan from '../layout/UpdatePemeriksaan.vue'
import UpdateKimiaDarah from '../layout/UpdateKimiaDarah.vue'
import UpdateHematologi from '../layout/UpdateHematologi.vue'
import UpdateUrinologi from '../layout/UpdateUrinologi.vue'
import UpdateLainLain from '../layout/UpdateLainLain.vue'
import AddPemeriksaan from '../layout/AddPemeriksaan.vue'
import DaftarPemeriksaan from '../layout/DaftarPemeriksaan.vue'
import FormPemeriksaan from '../layout/FormPemeriksaan.vue'
import PreReview from '../layout/PreReview.vue'


Vue.use(VueRouter)

// COMPONENT
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
    path: '/Hematologi',
    name: 'Hematologi',
    component: Hematologi,
    props: true
  },
  {
    path: '/Urinologi',
    name: 'Urinologi',
    component: Urinologi,
    props: true
  },
  {
    path: '/LainLain',
    name: 'Lain Lain',
    component: LainLain,
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
    path: '/PemeriksaanPasien',
    name: 'Pemeriksaan Pasien',
    component: PemeriksaanPasien,
    props: true
  },
  {
    path: '/Cetak',
    name: 'Cetak',
    component: Cetak,
    props: true
  },

// LAYOUT
  {
    path: '/UpdateData',
    name: 'Update Data',
    component: UpdateData,
    props: true
  },
  {
    path: '/UpdatePemeriksaan',
    name: 'Update Pemeriksaan',
    component: UpdatePemeriksaan,
    props: true
  },
  {
    path: '/UpdateKimiaDarah',
    name: 'Update Kimia Darah',
    component: UpdateKimiaDarah,
    props: true
  },
  {
    path: '/UpdateHematologi',
    name: 'Update Hematologi',
    component: UpdateHematologi,
    props: true
  },
  {
    path: '/UpdateUrinologi',
    name: 'Update Urinologi',
    component: UpdateUrinologi,
    props: true
  },
  {
    path: '/UpdateLainLain',
    name: 'Update Lain Lain',
    component: UpdateLainLain,
    props: true
  },
  {
    path: '/AddPemeriksaan',
    name: 'AddPemeriksaan',
    component: AddPemeriksaan,
    props: true
  },
  {
    path: '/DaftarPemeriksaan',
    name: 'Daftar Pemeriksaan',
    component: DaftarPemeriksaan,
    props: true
  },
  {
    path: '/FormPemeriksaan',
    name: 'Form Pemeriksaan',
    component: FormPemeriksaan,
    props: true
  },
  {
    path: '/PreReview',
    name: 'PreReview',
    component: PreReview,
    props: true
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import login from '../components/login.vue'
import logintech from '../components/logintech.vue'
import RequestRepair from '../views/cust/RequestRepair.vue'
import Navcust from '../components/navcust.vue'


const routes = [
  { path: '/', redirect: '/home' },       // redirect จาก / ไป /home
  { path: '/home', component: Home }, // สร้าง route /home ให้ตรงกับ HomePage.vue
  { path: '/login', component: login },
  { path: '/logintech', component: logintech },
  { path: '/request-repair', component: RequestRepair },
  { path: '/navcust', component: Navcust }
  
  
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router

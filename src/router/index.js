import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import login from '../components/login.vue'
import logintech from '../components/logintech.vue'
import RequestRepair from '../views/cust/RequestRepair.vue'
import RepairHistory from '../views/cust/RepairHistory.vue'
import Profile from '../views/cust/Profile.vue'
import Homecust from '../views/cust/Home.vue'
import Dashboard from '../views/tech/Dashboard.vue'

const routes = [
  { path: '/', redirect: '/home' },       // redirect จาก / ไป /home
  { path: '/home', component: Home }, // สร้าง route /home ให้ตรงกับ HomePage.vue
  { path: '/login', component: login },
  { path: '/logintech', component: logintech },
  { path: '/request-repair', component: RequestRepair },
  { path: '/repair-history', component: RepairHistory },
  { path: '/profile', component: Profile },
  { path: '/homecust', component: Homecust },
  {  path: '/dashboard', component: Dashboard }
  
  
  
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router

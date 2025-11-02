import { createRouter, createWebHistory } from 'vue-router'

// ===== Public Pages =====
import Home from '../views/Home.vue'
import Login from '../components/login.vue'
import LoginTech from '../components/logintech.vue'
import Register from '../views/register.vue'

// ===== Customer Pages =====
import Homecust from '../views/cust/Home.vue'
import RequestRepair from '../views/cust/RequestRepair.vue'
import RepairHistory from '../views/cust/RepairHistory.vue'
import RepairDetail from '../views/cust/RepairDetail.vue'
import Profile from '../views/cust/Profile.vue'

// ===== Technician Pages =====
import TechDashboard from '../views/tech/Dashboard.vue'
import TechJobList from '../views/tech/JobList.vue'
import TechHistory from '../views/tech/History.vue'
import TechProfile from '../views/tech/TechnicianProfile.vue'
import JobDetail from '../views/tech/JobDetail.vue'

// ==== admin =====
import LoginAdmin from '../views/admin/LoginAdmin.vue'
import DashboardAdmin from '../views/admin/DashboardAdmin.vue'


const routes = [
  // ===== Public Routes =====
  { 
    path: '/', 
    redirect: '/home' 
  },
  { 
    path: '/home', 
    name: 'Home',
    component: Home 
  },
  { 
    path: '/login', 
    name: 'Login',
    component: Login 
  },
  { 
    path: '/logintech', 
    name: 'LoginTech',
    component: LoginTech 
  },
  { 
    path: '/register', 
    name: 'Register',
    component: Register 
  },

  // ===== Customer Routes =====
  { 
    path: '/homecust', 
    name: 'Homecust',
    component: Homecust,
    meta: { requiresAuth: true, role: 'user' }
  },
  { 
    path: '/request-repair', 
    name: 'RequestRepair',
    component: RequestRepair,
    meta: { requiresAuth: true, role: 'user' }
  },
  { 
    path: '/repair-history', 
    name: 'RepairHistory',
    component: RepairHistory,
    meta: { requiresAuth: true, role: 'user' }
  },
  { 
    path: '/repair-detail/:id', 
    name: 'RepairDetail',
    component: RepairDetail,
    meta: { requiresAuth: true, role: 'user' }
  },
  { 
    path: '/profile', 
    name: 'Profile',
    component: Profile,
    meta: { requiresAuth: true, role: 'user' }
  },

  // ===== Technician Routes =====
  { 
    path: '/dashboard', 
    name: 'TechDashboard',
    component: TechDashboard,
    meta: { requiresAuth: true, role: 'tech' }
  },
  // ⭐ แก้ไขตรงนี้: เปลี่ยนจาก /tech-job-list เป็น /jobs
  { 
    path: '/jobs', 
    name: 'TechJobList',
    component: TechJobList,
    meta: { requiresAuth: true, role: 'tech' }
  },
  { 
    path: '/tech-history', 
    name: 'TechHistory',
    component: TechHistory,
    meta: { requiresAuth: true, role: 'tech' }
  },
  { 
    path: '/tech-profile', 
    name: 'TechProfile',
    component: TechProfile,
    meta: { requiresAuth: true, role: 'tech' }
  },
  { 
    path: '/tech-job-detail/:id', 
    name: 'JobDetail',
    component: JobDetail,
    meta: { requiresAuth: true, role: 'tech' }
  },

  // ===== Admin Routes =====
   { 
    path: '/admin/login',
    name: 'AdminLogin',
    component: LoginAdmin 
  },
  {
    path: '/admin/dashboard',
    name: 'AdminDashboard',
    component: DashboardAdmin,
    meta: { requiresAuth: true, role: 'admin' }
  }

]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// ===== Navigation Guard (ป้องกันเข้าหน้าที่ต้อง Login) =====
// ⭐⭐⭐ ตรงนี้แหละ Navigation Guard ⭐⭐⭐
router.beforeEach((to, from, next) => {
  console.log('🔍 Navigating to:', to.path)
  
  const loggedInUser = JSON.parse(localStorage.getItem('user') || 'null')
  console.log('👤 Current User:', loggedInUser)
  
  // ถ้าหน้านั้นต้อง Auth
  if (to.meta.requiresAuth) {
    if (!loggedInUser) {
      console.warn('❌ ไม่มี Session → Redirect to Login')
      
      // แยก Redirect ตาม Role
      if (to.meta.role === 'tech') {
        next('/logintech')
      } else if (to.meta.role === 'admin') {
        next('/admin/login') // ⭐ Admin
      } else {
        next('/login')
      }
      
    } else if (to.meta.role && loggedInUser.role !== to.meta.role) {
      console.warn('❌ Role ไม่ตรง:', loggedInUser.role, '!==', to.meta.role)
      
      if (to.meta.role === 'tech') {
        next('/logintech')
      } else if (to.meta.role === 'admin') {
        next('/admin/login') // ⭐ Admin
      } else {
        next('/login')
      }
      
    } else {
      console.log('✅ Authorized → Allow')
      next()
    }
  } else {
    // หน้าที่ไม่ต้อง Auth
    next()
  }
})


export default router
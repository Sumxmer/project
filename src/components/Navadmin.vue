<template>
  <nav class="admin-sidebar">
    <div class="sidebar-header">
      <h2>Fix<span>ถึงใจ</span></h2>
      <p>Admin Panel</p>
    </div>

    <div class="sidebar-menu">
      <router-link to="/admin/dashboard" class="menu-item" active-class="active">
        <span class="icon">📊</span>
        <span>Dashboard</span>
      </router-link>
      
      <router-link to="/admin/technicians" class="menu-item" active-class="active">
        <span class="icon">👨‍🔧</span>
        <span>จัดการช่าง</span>
      </router-link>
      
      <router-link to="/admin/customers" class="menu-item" active-class="active">
        <span class="icon">👥</span>
        <span>จัดการลูกค้า</span>
      </router-link>
      
      <router-link to="/admin/jobs" class="menu-item" active-class="active">
        <span class="icon">🔧</span>
        <span>จัดการงาน</span>
      </router-link>
      
      <router-link to="/admin/services" class="menu-item" active-class="active">
        <span class="icon">⚙️</span>
        <span>จัดการบริการ</span>
      </router-link>
    </div>

    <div class="sidebar-footer">
      <div class="admin-info">
        <div class="admin-avatar">{{ adminInitial }}</div>
        <div class="admin-details">
          <p class="admin-name">{{ adminName }}</p>
          <p class="admin-role">ผู้ดูแลระบบ</p>
        </div>
      </div>
      
      <button @click="handleLogout" class="logout-btn">
        <span class="icon">🚪</span>
        <span>ออกจากระบบ</span>
      </button>
    </div>
  </nav>
</template>

<script setup>
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';

const router = useRouter();

const adminName = computed(() => {
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  return user.name || 'Admin';
});

const adminInitial = computed(() => {
  return adminName.value.charAt(0).toUpperCase();
});

async function handleLogout() {
  if (!confirm('ต้องการออกจากระบบใช่หรือไม่?')) return;
  
  try {
    await axios.post('http://localhost:3000/api/admin/logout', {}, {
      withCredentials: true
    });
    localStorage.removeItem('user');
    router.push('/admin/login');
  } catch (error) {
    console.error('Logout error:', error);
    localStorage.removeItem('user');
    router.push('/admin/login');
  }
}
</script>

<style scoped>
.admin-sidebar {
  position: fixed;
  left: 0;
  top: 0;
  width: 250px;
  height: 100vh;
  background: rgba(15, 15, 15, 0.95);
  backdrop-filter: blur(10px);
  border-right: 1px solid rgba(255, 0, 127, 0.3);
  display: flex;
  flex-direction: column;
  z-index: 100;
  box-shadow: 4px 0 20px rgba(0, 0, 0, 0.5);
}

.sidebar-header {
  padding: 2rem 1.5rem;
  border-bottom: 1px solid rgba(255, 0, 127, 0.3);
  text-align: center;
}

.sidebar-header h2 {
  font-size: 2rem;
  margin: 0;
  color: #fff;
  font-weight: 900;
}

.sidebar-header h2 span {
  color: #ff007f;
  text-shadow: 0 0 10px rgba(255, 0, 127, 0.5);
}

.sidebar-header p {
  color: rgba(255, 255, 255, 0.5);
  font-size: 0.85rem;
  margin: 0.5rem 0 0;
  letter-spacing: 1px;
}

.sidebar-menu {
  flex: 1;
  padding: 1.5rem 0;
  overflow-y: auto;
}

.menu-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem 1.5rem;
  color: rgba(255, 255, 255, 0.7);
  text-decoration: none;
  transition: all 0.3s;
  border-left: 3px solid transparent;
  font-weight: 500;
  font-size: 0.95rem;
}

.menu-item:hover {
  background: rgba(255, 0, 127, 0.1);
  color: #ff007f;
  border-left-color: rgba(255, 0, 127, 0.3);
}

.menu-item.active {
  background: rgba(255, 0, 127, 0.15);
  color: #ff007f;
  border-left-color: #ff007f;
  font-weight: 600;
}

.menu-item .icon {
  font-size: 1.4rem;
  min-width: 24px;
  text-align: center;
}

.sidebar-footer {
  padding: 1.5rem;
  border-top: 1px solid rgba(255, 0, 127, 0.3);
}

.admin-info {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  background: rgba(255, 0, 127, 0.1);
  border-radius: 12px;
  margin-bottom: 1rem;
}

.admin-avatar {
  width: 45px;
  height: 45px;
  border-radius: 50%;
  background: linear-gradient(135deg, #ff007f, #ffc400);
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 900;
  font-size: 1.3rem;
  color: white;
  box-shadow: 0 0 15px rgba(255, 0, 127, 0.4);
}

.admin-details {
  flex: 1;
}

.admin-name {
  margin: 0;
  color: white;
  font-weight: 600;
  font-size: 0.95rem;
}

.admin-role {
  margin: 0.2rem 0 0;
  color: rgba(255, 255, 255, 0.5);
  font-size: 0.75rem;
}

.logout-btn {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.8rem;
  padding: 1rem;
  background: rgba(220, 53, 69, 0.2);
  border: 1px solid rgba(220, 53, 69, 0.3);
  color: #ff6b6b;
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.3s;
  font-weight: 600;
  font-size: 0.95rem;
}

.logout-btn:hover {
  background: rgba(220, 53, 69, 0.3);
  border-color: rgba(220, 53, 69, 0.5);
  transform: translateY(-2px);
  box-shadow: 0 4px 15px rgba(220, 53, 69, 0.3);
}

.logout-btn .icon {
  font-size: 1.2rem;
}
</style>
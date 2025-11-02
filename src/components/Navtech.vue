<template>
  <nav class="sidebar">
    <div class="sidebar-header">
      <div class="logo">
        <span class="logo-icon">🔧</span>
        <span class="logo-text">ช่างเทค</span>
      </div>
    </div>

    <ul class="nav-menu">
      <li class="nav-item">
        <router-link to="/dashboard" class="nav-link">
          <span class="nav-icon">📊</span>
          <span class="nav-text">แดชบอร์ด</span>
        </router-link>
      </li>

      <li class="nav-item">
        <router-link to="/jobs" class="nav-link">
          <span class="nav-icon">📋</span>
          <span class="nav-text">งานของฉัน</span>
        </router-link>
      </li>

      <li class="nav-item">
        <router-link to="/tech-history" class="nav-link">
          <span class="nav-icon">📜</span>
          <span class="nav-text">ประวัติงาน</span>
        </router-link>
      </li>

      <li class="nav-item">
        <router-link to="/tech-profile" class="nav-link">
          <span class="nav-icon">👤</span>
          <span class="nav-text">โปรไฟล์</span>
        </router-link>
      </li>
    </ul>

    <div class="sidebar-footer">
      <div class="user-info">
        <div class="user-avatar">
          <img src="https://i.pravatar.cc/40?img=12" alt="User Avatar" />
        </div>
        <div class="user-details">
          <span class="user-name">{{ techName }}</span>
          <span class="user-role">ช่างเทคนิค</span>
        </div>
      </div>
      
      <button @click="logout" class="logout-btn">
        <span class="logout-icon">🚪</span>
        <span class="logout-text">ออกจากระบบ</span>
      </button>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'Navtech',
  
  data() {
    return {
      techName: 'ช่างเทคนิค'
    }
  },
  
  created() {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    if (user && user.name) {
      this.techName = user.name;
    }
  },
  
  methods: {
    logout() {
      if (confirm('คุณต้องการออกจากระบบหรือไม่?')) {
        localStorage.removeItem('user');
        this.$router.push('/logintech');
      }
    }
  }
}
</script>

<style scoped>
/* Sidebar */
.sidebar {
  position: fixed;
  top: 0;
  left: 0;
  width: 220px;
  height: 100vh;
  background: linear-gradient(180deg, rgba(15, 15, 15, 0.98) 0%, rgba(20, 20, 20, 0.98) 100%);
  backdrop-filter: blur(20px);
  border-right: 1px solid rgba(255, 0, 127, 0.3);
  display: flex;
  flex-direction: column;
  z-index: 1000;
  box-shadow: 2px 0 30px rgba(0, 0, 0, 0.5), 0 0 60px rgba(255, 0, 127, 0.1);
  font-family: 'Sarabun', 'Prompt', -apple-system, BlinkMacSystemFont, sans-serif;
}

/* Header */
.sidebar-header {
  padding: 2rem 1.5rem;
  border-bottom: 1px solid rgba(255, 0, 127, 0.2);
}

.logo {
  display: flex;
  align-items: center;
  gap: 0.8rem;
  cursor: pointer;
  transition: all 0.3s ease;
}

.logo:hover {
  transform: translateX(5px);
}

.logo-icon {
  font-size: 2.2rem;
  filter: drop-shadow(0 0 15px rgba(255, 0, 127, 0.6));
  animation: glow 2s ease-in-out infinite;
}

@keyframes glow {
  0%, 100% { 
    filter: drop-shadow(0 0 15px rgba(255, 0, 127, 0.6)); 
  }
  50% { 
    filter: drop-shadow(0 0 25px rgba(255, 0, 127, 0.8)); 
  }
}

.logo-text {
  font-size: 1.6rem;
  font-weight: 800;
  background: linear-gradient(135deg, #ff007f 0%, #ff66b2 50%, #ffc400 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  letter-spacing: -0.5px;
}

/* Navigation Menu */
.nav-menu {
  flex: 1;
  list-style: none;
  padding: 1.5rem 0;
  margin: 0;
  overflow-y: auto;
}

.nav-menu::-webkit-scrollbar {
  width: 4px;
}

.nav-menu::-webkit-scrollbar-track {
  background: rgba(0, 0, 0, 0.2);
}

.nav-menu::-webkit-scrollbar-thumb {
  background: rgba(255, 0, 127, 0.4);
  border-radius: 2px;
}

.nav-menu::-webkit-scrollbar-thumb:hover {
  background: rgba(255, 0, 127, 0.6);
}

.nav-item {
  margin-bottom: 0.5rem;
  padding: 0 1rem;
}

.nav-link {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem 1.2rem;
  text-decoration: none;
  color: rgba(255, 255, 255, 0.7);
  border-radius: 12px;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.nav-link::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  width: 4px;
  height: 100%;
  background: linear-gradient(180deg, #ff007f, #ffc400);
  transform: scaleY(0);
  transition: transform 0.3s ease;
}

.nav-link:hover {
  background: rgba(255, 0, 127, 0.1);
  color: #ffffff;
  transform: translateX(5px);
}

.nav-link:hover::before {
  transform: scaleY(1);
}

.nav-link.router-link-active {
  background: linear-gradient(
    90deg,
    rgba(255, 0, 127, 0.2) 0%,
    rgba(255, 0, 127, 0.05) 100%
  );
  color: #ff007f;
  font-weight: 600;
  box-shadow: 0 4px 20px rgba(255, 0, 127, 0.2);
}

.nav-link.router-link-active::before {
  transform: scaleY(1);
}

.nav-link.router-link-active .nav-icon {
  filter: drop-shadow(0 0 10px rgba(255, 0, 127, 0.6));
}

.nav-icon {
  font-size: 1.5rem;
  min-width: 28px;
  text-align: center;
  transition: all 0.3s ease;
}

.nav-text {
  font-size: 1rem;
  font-weight: 500;
  letter-spacing: 0.3px;
}

/* Footer */
.sidebar-footer {
  padding: 1.5rem 1rem 1rem;
  border-top: 1px solid rgba(255, 0, 127, 0.2);
}

.user-info {
  display: flex;
  align-items: center;
  gap: 0.8rem;
  padding: 0.9rem;
  background: rgba(0, 0, 0, 0.4);
  border-radius: 12px;
  margin-bottom: 1rem;
  border: 1px solid rgba(255, 0, 127, 0.2);
  transition: all 0.3s ease;
}

.user-info:hover {
  background: rgba(0, 0, 0, 0.5);
  border-color: rgba(255, 0, 127, 0.4);
}

.user-avatar {
  position: relative;
}

.user-avatar img {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 2px solid #ff007f;
  object-fit: cover;
  box-shadow: 0 0 15px rgba(255, 0, 127, 0.5);
}

.user-details {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
}

.user-name {
  font-size: 0.9rem;
  font-weight: 600;
  color: #ffffff;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.user-role {
  font-size: 0.75rem;
  color: rgba(255, 0, 127, 0.8);
  text-transform: uppercase;
  letter-spacing: 0.5px;
  font-weight: 500;
}

/* Logout Button */
.logout-btn {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.6rem;
  padding: 1rem;
  background: rgba(220, 53, 69, 0.15);
  border: 1px solid rgba(220, 53, 69, 0.3);
  border-radius: 12px;
  color: #ff6b6b;
  font-size: 0.95rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  font-family: inherit;
}

.logout-btn:hover {
  background: rgba(220, 53, 69, 0.25);
  border-color: rgba(220, 53, 69, 0.5);
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(220, 53, 69, 0.3);
}

.logout-btn:active {
  transform: translateY(0);
}

.logout-icon {
  font-size: 1.3rem;
}

.logout-text {
  letter-spacing: 0.3px;
}

/* Responsive */
@media (max-width: 1024px) {
  .sidebar {
    width: 180px;
  }
  
  .logo-text {
    font-size: 1.4rem;
  }
  
  .nav-text {
    font-size: 0.9rem;
  }
}

@media (max-width: 768px) {
  .sidebar {
    width: 100%;
    height: auto;
    top: auto;
    bottom: 0;
    border-right: none;
    border-top: 1px solid rgba(255, 0, 127, 0.3);
    flex-direction: row;
  }
  
  .sidebar-header {
    display: none;
  }
  
  .nav-menu {
    flex: 1;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    padding: 0.5rem 0;
    overflow-x: auto;
    overflow-y: hidden;
  }
  
  .nav-item {
    margin: 0;
    padding: 0;
  }
  
  .nav-link {
    flex-direction: column;
    padding: 0.7rem 0.8rem;
    gap: 0.3rem;
    min-width: 65px;
    text-align: center;
  }
  
  .nav-link::before {
    width: 100%;
    height: 3px;
    top: 0;
    left: 0;
  }
  
  .nav-link:hover {
    transform: translateY(-3px);
  }
  
  .nav-icon {
    font-size: 1.3rem;
  }
  
  .nav-text {
    font-size: 0.65rem;
  }
  
  .sidebar-footer {
    border-top: none;
    border-left: 1px solid rgba(255, 0, 127, 0.2);
    padding: 0.5rem 0.8rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
  
  .user-info {
    display: none;
  }
  
  .logout-btn {
    width: auto;
    padding: 0.7rem;
    flex-direction: column;
    gap: 0.2rem;
    font-size: 0.65rem;
  }
  
  .logout-icon {
    font-size: 1.2rem;
  }
  
  .logout-text {
    display: none;
  }
}

@media (max-width: 480px) {
  .nav-link {
    padding: 0.6rem 0.7rem;
    min-width: 60px;
  }
  
  .nav-icon {
    font-size: 1.2rem;
  }
  
  .nav-text {
    font-size: 0.6rem;
  }
}

/* Accessibility */
.nav-link:focus-visible,
.logout-btn:focus-visible {
  outline: 2px solid #ff007f;
  outline-offset: 2px;
}

/* Reduced Motion */
@media (prefers-reduced-motion: reduce) {
  .nav-link,
  .logout-btn,
  .logo {
    transition: none;
  }
  
  .logo-icon {
    animation: none;
  }
}
</style>
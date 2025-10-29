<template>
  <nav class="navbar-vertical">
    <div class="logo">
      <span class="logo-text">ลูกค้า<span class="logo-highlight">ที่แสนดี</span></span>
    </div>
    <ul class="nav-links">
      <li>
        <router-link to="/homecust" class="nav-item">
          <span class="nav-icon">🏠</span>
          <span class="nav-text">หน้าแรก</span>
        </router-link>
      </li>
      <li>
        <router-link to="/request-repair" class="nav-item">
          <span class="nav-icon">🔧</span>
          <span class="nav-text">แจ้งซ่อม</span>
        </router-link>
      </li>
      <li>
        <router-link to="/repair-history" class="nav-item">
          <span class="nav-icon">📋</span>
          <span class="nav-text">ประวัติการซ่อม</span>
        </router-link>
      </li>
      <li>
        <router-link to="/profile" class="nav-item">
          <span class="nav-icon">👤</span>
          <span class="nav-text">โปรไฟล์</span>
        </router-link>
      </li>
      <li class="logout-item">
        <router-link to="/Home" class="nav-item logout">
          <span class="nav-icon">🚪</span>
          <span class="nav-text">ออกจากระบบ</span>
        </router-link>
      </li>
    </ul>
    
    <!-- Animated gradient border -->
    <div class="navbar-border"></div>
  </nav>
</template>

<script>
export default {
  name: "Navcust",
};
</script>

<style scoped>
/* Vertical navbar - สไตล์สวยๆ แบบดาร์คโมเดิร์น */
.navbar-vertical {
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 250px;
  background: linear-gradient(180deg, #000000 0%, #1a1a1a 100%);
  backdrop-filter: blur(10px);
  color: white;
  padding: 2rem 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: 4px 0 30px rgba(255, 0, 127, 0.2);
  z-index: 1000;
  overflow: hidden;
}

/* Animated border */
.navbar-border {
  position: absolute;
  top: 0;
  right: 0;
  width: 3px;
  height: 100%;
  background: linear-gradient(180deg, #ff007f, #ff9100, #ffc400, #29e083, #007bff, #9c27b0, #ff4081);
  background-size: 100% 200%;
  animation: borderFlow 5s linear infinite;
}

@keyframes borderFlow {
  0% { background-position: 0% 0%; }
  100% { background-position: 0% 200%; }
}

/* Logo */
.logo {
  margin-bottom: 3rem;
  padding: 0 1.5rem;
  text-align: center;
  cursor: pointer;
  transition: transform 0.3s ease;
}

.logo:hover {
  transform: scale(1.05);
}

.logo-text {
  font-size: 1.8rem;
  font-weight: 900;
  color: #fff;
  text-shadow: 0 0 10px rgba(255, 0, 127, 0.5);
  font-family: 'Space Grotesk', sans-serif;
}

.logo-highlight {
  background: linear-gradient(135deg, #ff007f 0%, #ffc400 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  filter: drop-shadow(0 0 10px rgba(255, 0, 127, 0.5));
}

/* Navigation Links */
.nav-links {
  list-style: none;
  padding: 0;
  width: 100%;
  flex: 1;
  margin: 0;
}

.nav-links li {
  margin-bottom: 0.5rem;
  padding: 0 1rem;
}

.nav-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  color: rgba(255, 255, 255, 0.8);
  text-decoration: none;
  font-weight: 600;
  font-size: 1rem;
  padding: 1rem 1.5rem;
  border-radius: 12px;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  font-family: 'Space Grotesk', sans-serif;
}

/* Hover effect with gradient */
.nav-item::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 0, 127, 0.2), transparent);
  transition: left 0.5s ease;
}

.nav-item:hover::before {
  left: 100%;
}

.nav-item:hover {
  background: linear-gradient(90deg, rgba(255, 0, 127, 0.15), rgba(255, 0, 127, 0.05));
  color: #ff007f;
  transform: translateX(5px);
  box-shadow: 0 4px 15px rgba(255, 0, 127, 0.3);
}

/* Active link */
.nav-item.router-link-active {
  background: linear-gradient(90deg, rgba(255, 0, 127, 0.25), rgba(255, 0, 127, 0.15));
  color: #ff007f;
  border-left: 3px solid #ff007f;
  box-shadow: 0 4px 20px rgba(255, 0, 127, 0.4);
}

/* Icon styling */
.nav-icon {
  font-size: 1.3rem;
  filter: drop-shadow(0 0 5px rgba(255, 0, 127, 0.3));
  transition: transform 0.3s ease;
}

.nav-item:hover .nav-icon {
  transform: scale(1.2);
}

.nav-text {
  font-size: 0.95rem;
}

/* Logout item - พิเศษ */
.logout-item {
  margin-top: auto;
  padding-top: 1rem;
  border-top: 1px solid rgba(255, 0, 127, 0.2);
}

.nav-item.logout {
  background: linear-gradient(90deg, rgba(255, 0, 0, 0.1), rgba(255, 0, 127, 0.1));
  border: 1px solid rgba(255, 0, 127, 0.3);
}

.nav-item.logout:hover {
  background: linear-gradient(90deg, rgba(255, 0, 0, 0.2), rgba(255, 0, 127, 0.2));
  color: #ff4081;
  border-color: #ff4081;
  box-shadow: 0 4px 20px rgba(255, 0, 127, 0.5);
}

/* Responsive */
@media (max-width: 1024px) {
  .navbar-vertical {
    width: 220px;
  }
  
  .logo-text {
    font-size: 1.5rem;
  }
  
  .nav-item {
    font-size: 0.9rem;
    padding: 0.8rem 1.2rem;
  }
}

@media (max-width: 768px) {
  .navbar-vertical {
    position: fixed;
    top: auto;
    bottom: 0;
    left: 0;
    width: 100%;
    height: auto;
    flex-direction: row;
    padding: 0.5rem;
    box-shadow: 0 -4px 30px rgba(255, 0, 127, 0.2);
    background: linear-gradient(90deg, #000000 0%, #1a1a1a 100%);
  }
  
  .navbar-border {
    width: 100%;
    height: 3px;
    top: 0;
    left: 0;
    background: linear-gradient(90deg, #ff007f, #ff9100, #ffc400, #29e083, #007bff, #9c27b0, #ff4081);
    background-size: 200% 100%;
    animation: borderFlowHorizontal 5s linear infinite;
  }
  
  @keyframes borderFlowHorizontal {
    0% { background-position: 0% 0; }
    100% { background-position: 200% 0; }
  }
  
  .logo {
    display: none; /* ซ่อน logo บนมือถือ */
  }
  
  .nav-links {
    display: flex;
    justify-content: space-around;
    width: 100%;
    margin: 0;
  }
  
  .nav-links li {
    margin: 0;
    padding: 0;
    flex: 1;
  }
  
  .nav-item {
    flex-direction: column;
    gap: 0.3rem;
    padding: 0.5rem;
    font-size: 0.7rem;
    border-radius: 8px;
    justify-content: center;
  }
  
  .nav-icon {
    font-size: 1.5rem;
  }
  
  .nav-text {
    font-size: 0.7rem;
  }
  
  .logout-item {
    margin-top: 0;
    padding-top: 0;
    border-top: none;
  }
  
  .nav-item.router-link-active {
    border-left: none;
    border-top: 3px solid #ff007f;
  }
}

@media (max-width: 480px) {
  .nav-text {
    display: none; /* ซ่อนข้อความ แสดงแค่ไอคอน */
  }
  
  .nav-item {
    padding: 0.8rem 0.5rem;
  }
  
  .nav-icon {
    font-size: 1.8rem;
  }
}
</style>
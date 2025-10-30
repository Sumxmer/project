<template>
  <div class="page-wrapper">
    <header class="navbar">
      <div class="navbar-container">
        <div class="logo">
          <span class="logo-text">FIX <span class="logo-highlight">ถึงใจ</span></span>
        </div>
        <nav class="nav-links">
          <a href="#" class="nav-item">หน้าหลัก</a>
          <a href="#" class="nav-item">เกี่ยวกับ</a>
          <a href="#" class="nav-item">บริการ</a>
          <a href="#" class="nav-item">ติดต่อ</a>
        </nav>
      </div>
    </header>

    <div class="hero-section">
      <div class="hero-content">
        <h1 class="hero-text">Fixถึงใจ ไปถึงที่</h1>
        <p class="hero-subtitle">บริการดีมีคุณภาพ พร้อมไปหาคุณทุกที่ทุกเวลา </p>
        
        
        <!-- ปุ่มชมพูเรืองแสง -->
        <router-link to="/login" class="GlowingButton">
          <span class="GlowingButton__content">
            <span>เข้าสู่ระบบ</span>
          </span>
        </router-link>
      </div>
    </div>

    <div class="blue-footer-bar"></div>
  </div>
</template>

<script setup>
// ไม่มี JS logic สำหรับหน้านี้
</script>

<style>
/* ================================================= */
/* Global Reset - แก้ปัญหาช่องว่าง */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html {
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
  overflow-x: hidden;
}

body {
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
  background-color: #000000;
  overflow-x: hidden;
  font-family: 'Space Grotesk', sans-serif;
}

#app {
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
  background-color: #000000;
}
</style>

<style scoped>
/* ================================================= */
/* Page Wrapper - ครอบทั้งหมด */
.page-wrapper {
  position: relative;
  width: 100vw;
  min-height: 100vh;
  margin: 0;
  padding: 0;
  background: linear-gradient(135deg, #000000 0%, #1a1a1a 100%);
  overflow-x: hidden;
}

/* ================================================= */
/* Navbar */
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  padding: 0;
  background: rgba(0, 0, 0, 0.85);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid rgba(255, 0, 127, 0.3);
  z-index: 100;
  box-shadow: 0 4px 30px rgba(255, 0, 127, 0.1);
}

.navbar-container {
  max-width: 1400px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.2rem 2rem;
}

/* Logo */
.logo {
  font-size: 1.8rem;
  font-weight: 900;
  cursor: pointer;
  transition: transform 0.3s ease;
}

.logo:hover {
  transform: scale(1.05);
}

.logo-text {
  color: #fff;
  text-shadow: 0 0 10px rgba(255, 0, 127, 0.5);
}

.logo-highlight {
  color: #ff007f;
  text-shadow: 0 0 20px rgba(255, 0, 127, 0.8);
}

/* Navigation Links */
.nav-links {
  display: flex;
  gap: 2.5rem;
  align-items: center;
}

.nav-item {
  color: rgba(255, 255, 255, 0.9);
  text-decoration: none;
  font-weight: 600;
  font-size: 1rem;
  position: relative;
  padding: 0.5rem 0;
  transition: color 0.3s ease;
}

/* Underline effect */
.nav-item::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 0;
  height: 2px;
  background: linear-gradient(90deg, #ff007f, #ffc400);
  transition: width 0.3s ease;
}

.nav-item:hover {
  color: #ff007f;
}

.nav-item:hover::after {
  width: 100%;
}

/* ================================================= */
/* Hero Section */
.hero-section {
  position: relative;
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 0 2rem;
  overflow: hidden;
}

/* เพิ่มพื้นหลัง particle effect */
.hero-section::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: 
    radial-gradient(2px 2px at 20% 30%, rgba(255, 0, 127, 0.3), transparent),
    radial-gradient(2px 2px at 60% 70%, rgba(255, 196, 0, 0.3), transparent),
    radial-gradient(1px 1px at 50% 50%, rgba(41, 224, 131, 0.3), transparent),
    radial-gradient(2px 2px at 80% 10%, rgba(0, 123, 255, 0.3), transparent);
  background-size: 200% 200%;
  background-position: 0% 0%;
  animation: particles 20s ease infinite;
  pointer-events: none;
  opacity: 0.5;
}

@keyframes particles {
  0%, 100% { background-position: 0% 0%; }
  50% { background-position: 100% 100%; }
}

/* Hero Content */
.hero-content {
  position: relative;
  z-index: 1;
  margin-top: 4rem;
}

/* ข้อความหัวเรื่อง ขยับขึ้นลงเล็กน้อย */
.hero-text {
  font-size: 5rem;
  font-weight: 900;
  margin: 0 0 1rem 0;
  background: linear-gradient(135deg, #ff007f 0%, #ff66b2 50%, #ffc400 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  filter: drop-shadow(0 0 20px rgba(255, 0, 127, 0.5));
  animation: floatText 3s ease-in-out infinite;
}

@keyframes floatText {
  0% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
  100% { transform: translateY(0); }
}

.hero-subtitle {
  font-size: 1.5rem;
  margin-bottom: 2rem;
  color: rgba(255, 255, 255, 0.8);
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.5);
}

/* ================================================= */
/* Glowing Pink Button */
.GlowingButton {
  position: relative;
  display: inline-flex;
  height: 55px;
  width: 200px;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  margin-top: 1.5rem;
  border-radius: 30px;
  color: #fff;
  font-weight: 700;
  font-size: 1.2rem;
  text-align: center;
  background: linear-gradient(135deg, #ff007f 0%, #ff4da6 100%);
  box-shadow: 0 0 20px rgba(255, 0, 127, 0.5), 
              0 0 40px rgba(255, 0, 127, 0.3),
              0 0 60px rgba(255, 0, 127, 0.1);
  transition: all 0.3s ease;
  animation: glowPink 2s ease-in-out infinite alternate;
  overflow: hidden;
}

.GlowingButton::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
  transition: left 0.5s;
}

.GlowingButton:hover::before {
  left: 100%;
}

.GlowingButton:hover {
  transform: translateY(-3px) scale(1.05);
  box-shadow: 0 0 30px rgba(255, 0, 127, 0.7), 
              0 0 60px rgba(255, 0, 127, 0.5),
              0 0 90px rgba(255, 0, 127, 0.3);
}

@keyframes glowPink {
  0% { 
    box-shadow: 0 0 20px rgba(255, 0, 127, 0.5), 
                0 0 40px rgba(255, 0, 127, 0.3),
                0 0 60px rgba(255, 0, 127, 0.1);
  }
  100% { 
    box-shadow: 0 0 30px rgba(255, 0, 127, 0.7), 
                0 0 60px rgba(255, 0, 127, 0.5),
                0 0 90px rgba(255, 0, 127, 0.3);
  }
}

.GlowingButton__content {
  color: #fff;
  position: relative;
  z-index: 1;
  text-shadow: 0 2px 5px rgba(0, 0, 0, 0.3);
}

/* ================================================= */
/* Footer Bar */
.blue-footer-bar {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 4px;
  background-image: linear-gradient(90deg, #ff007f, #ff9100, #ffc400, #29e083, #007bff, #9c27b0, #ff4081);
  background-size: 200% 100%;
  animation: footer-animate 5s linear infinite;
  box-shadow: 0 -2px 20px rgba(255, 0, 127, 0.5);
  z-index: 999;
}

@keyframes footer-animate {
  0% { background-position: 0% 0; }
  100% { background-position: 200% 0; }
}

/* ================================================= */
/* Responsive */
@media screen and (max-width: 1024px) {
  .navbar-container {
    padding: 1rem 1.5rem;
  }
  
  .logo {
    font-size: 1.5rem;
  }
  
  .nav-links {
    gap: 1.5rem;
  }
  
  .nav-item {
    font-size: 0.9rem;
  }
  
  .hero-text { 
    font-size: 3.5rem; 
  }
  
  .hero-subtitle { 
    font-size: 1.2rem; 
  }
}

@media screen and (max-width: 768px) {
  .navbar-container {
    flex-direction: column;
    gap: 1rem;
    padding: 1rem;
  }
  
  .nav-links {
    gap: 1rem;
    flex-wrap: wrap;
    justify-content: center;
  }
  
  .hero-text { 
    font-size: 2.5rem; 
  }
  
  .hero-subtitle { 
    font-size: 1rem; 
  }
  
  .GlowingButton { 
    width: 160px; 
    height: 45px; 
    font-size: 1rem; 
  }
}

@media screen and (max-width: 480px) {
  .hero-text { 
    font-size: 2rem; 
  }
  
  .hero-subtitle { 
    font-size: 0.9rem; 
  }
  
  .nav-item {
    font-size: 0.85rem;
  }
}
</style>
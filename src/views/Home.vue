<template>
  <div class="hero-section">
    <header class="navbar">
      <nav class="nav-links">
        <a href="#" class="nav-item">---</a>
        <a href="#" class="nav-item">About</a>
      </nav>
    </header>

    <div class="hero-content">
      <h1 class="hero-text">Fixถึงใจที่ถึงที่</h1>
      <p class="hero-subtitle">บริการคุณภาพ พร้อมฟิตเนสทุกที่ทุกเวลา</p>
      
      <!-- ปุ่มชมพูเรืองแสง -->
      <router-link to="/login" class="GlowingButton">
        <span class="GlowingButton__content">
          <span>เข้าสู่ระบบ</span>
        </span>
      </router-link>
    </div>

    <div class="blue-footer-bar"></div>
  </div>
</template>

<script setup>
// ไม่มี JS logic สำหรับหน้านี้
</script>

<style scoped>
/* ================================================= */
/* พื้นหลังสีเทาทั่วทั้งหน้า */
:global(html),
:global(body) {
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
  background-color: #808080;
  overflow-x: hidden;
  font-family: 'Space Grotesk', sans-serif;
  box-sizing: border-box;
}

:global(*) {
  background-color: transparent !important;
  box-sizing: border-box;
}

/* ================================================= */
/* Hero Section */
.hero-section {
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  background-color: #808080; /* สีเทา */
  color: #fff;
  position: relative;
  overflow: hidden;
}

/* ================================================= */
/* Navbar */
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 1.5rem 2rem;
  background-color: #808080;
  z-index: 100;
  box-shadow: none;
}

.nav-links {
  display: flex;
  gap: 2rem;
}

.nav-item {
  color: #fff;
  text-decoration: none;
  font-weight: 500;
  transition: color 0.3s;
}

.nav-item:hover {
  color: #ffc400;
}

/* ================================================= */
/* Hero Content */
.hero-content {
  margin-top: 6rem;
}

/* ข้อความหัวเรื่อง ขยับขึ้นลงเล็กน้อย */
.hero-text {
  font-size: 5rem;
  font-weight: 900;
  margin: 0 0 1rem 0;
  color: #ff007f; /* สีชมพู */
  text-shadow: 2px 2px 5px rgba(0, 0, 0, 0.7); /* เงาดำ */
  animation: floatText 3s ease-in-out infinite; /* animation ขยับขึ้นลง */
}

@keyframes floatText {
  0% { transform: translateY(0); }
  50% { transform: translateY(-8px); } /* ขยับขึ้นเล็กน้อย */
  100% { transform: translateY(0); }
}

.hero-subtitle {
  font-size: 1.5rem;
  margin-bottom: 2rem;
  color: rgba(255, 255, 255, 0.9);
}

/* ================================================= */
/* Glowing Pink Button */
.GlowingButton {
  position: relative;
  display: inline-flex;
  height: 50px;
  width: 180px;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  margin-top: 1rem;
  border-radius: 14px;
  color: #fff;
  font-weight: 700;
  font-size: 1.2rem;
  text-align: center;
  background-color: #ff007f;
  box-shadow: 0 0 5px #ff4da6, 0 0 10px #ff66b2, 0 0 15px #ff80bf, 
              0 0 20px #ff99cc, 0 0 25px #ffb3d9;
  transition: 0.3s ease-in-out;
  animation: glowPink 2s linear infinite alternate;
}

.GlowingButton:hover {
  transform: scale(1.05);
  box-shadow: 0 0 10px #ff4da6, 0 0 20px #ff66b2, 0 0 30px #ff80bf, 
              0 0 40px #ff99cc, 0 0 50px #ffb3d9;
}

@keyframes glowPink {
  0% { box-shadow: 0 0 5px #ff4da6, 0 0 10px #ff66b2, 0 0 15px #ff80bf, 
        0 0 20px #ff99cc, 0 0 25px #ffb3d9; }
  50% { box-shadow: 0 0 10px #ff4da6, 0 0 20px #ff66b2, 0 0 25px #ff80bf, 
         0 0 30px #ff99cc, 0 0 35px #ffb3d9; }
  100% { box-shadow: 0 0 5px #ff4da6, 0 0 10px #ff66b2, 0 0 15px #ff80bf, 
         0 0 20px #ff99cc, 0 0 25px #ffb3d9; }
}

/* ปิด overlay/glow เดิม */
.GlowingButton__overlay,
.GlowingButton__glowWrap,
.GlowingButton__glow {
  display: none;
}

.GlowingButton__content {
  color: #fff;
  position: relative;
  z-index: 1;
}

/* ================================================= */
/* Footer Bar */
.blue-footer-bar {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 10px;
  background-image: linear-gradient(90deg, #ff9100, #ffc400, #29e083, #007bff, #9c27b0, #ff4081, #ff1744);
  background-size: 200% 100%;
  animation: footer-animate 4s linear infinite;
}

@keyframes footer-animate {
  0% { background-position: 0% 0; }
  100% { background-position: 100% 0; }
}

/* ================================================= */
/* Responsive */
@media screen and (max-width: 1000px) {
  .hero-text { font-size: 3rem; }
  .hero-subtitle { font-size: 1.1rem; }
  .GlowingButton { width: 140px; height: 40px; font-size: 1rem; }
}
</style>
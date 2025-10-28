<template>
  <div class="hero-section">
    <header class="navbar">
      <div class="logo">Movement Studios</div>
      <nav class="nav-links">
        <a href="#" class="nav-item">Classes</a>
        <a href="#" class="nav-item">About</a>
        <span class="nav-item location">224 Nostrand Ave, Brooklyn, NY</span>
      </nav>
    </header>

    <div class="hero-content">
      <h1 class="hero-text">Fixถึงใจที่ถึงที่</h1>
      <p class="hero-subtitle">บริการคุณภาพ พร้อมฟิตเนสทุกที่ทุกเวลา</p>
      <router-link to="/login">
        <button class="reserve-button-new">เข้าสู่ระบบ</button>
      </router-link>
    </div>

    <div class="blue-footer-bar"></div>
  </div>
</template>

<script setup>
// ไม่มี JS logic
</script>

<style scoped>
:global(body), :global(html) {
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
}
@import url('https://fonts.googleapis.com/css?family=Space+Grotesk:400,700&display=swap');

/* Variables */
.hero-section {
  width: 100vw;   /* เต็มความกว้าง viewport */
  height: 100vh;  /* เต็มความสูง viewport */
  min-height: 100vh;
  background-color: #e0e0e0; /* สีเทาสวยๆ */
  display: flex;
  flex-direction: column;
  justify-content: center; /* กึ่งกลางแนวตั้ง */
  align-items: center;     /* กึ่งกลางแนวนอน */
  box-sizing: border-box;
} 
/* Navbar */
.navbar {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  padding: 1rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;
}
.logo {
  font-size: 1.5rem;
  font-weight: 700;
  letter-spacing: 1px;
  text-shadow: 0 2px 4px rgba(0,0,0,0.5);
}

.nav-links {
  display: flex;
  gap: 2rem;
}

.nav-item {
  color: #fff;
  font-weight: 500;
  text-decoration: none;
  transition: color 0.3s;
}

.nav-item:hover {
  color: var(--yellow);
}

.location {
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.9rem;
}

/* Hero Content */
.hero-content {
  max-width: 600px;
  text-align: left;
  margin-left: 2rem;
}

.hero-text {
  font-size: 4rem;
  font-weight: 900;
  line-height: 1.1;
  margin-bottom: 1rem;
  text-shadow: 0 4px 10px rgba(0,0,0,0.6);
}

.hero-subtitle {
  font-size: 1.25rem;
  margin-bottom: 2rem;
  color: #f0f0f0;
  text-shadow: 0 2px 6px rgba(0,0,0,0.5);
}

/* Gradient Button */
.reserve-button-new {
  border: calc(0.08 * var(--m)) solid transparent;
  position: relative;
  color: #fff;
  font-family: 'Space Grotesk', sans-serif;
  font-size: 1.25rem;
  font-weight: 700;
  border-radius: 50px;
  padding: 0.75rem 2rem;
  display: inline-flex;
  justify-content: center;
  cursor: pointer;
  text-decoration: none;
  background: linear-gradient(#121213, #121213), 
              linear-gradient(#121213 50%, rgba(18,18,19,0.6) 80%, rgba(18,18,19,0)), 
              linear-gradient(90deg, var(--orange), var(--yellow), var(--green), var(--blue), var(--purple), var(--pink), var(--red));
  background-origin: border-box;
  background-clip: padding-box, border-box, border-box;
  background-size: 200%;
  animation: animate 2s infinite linear;
  box-shadow: 0 8px 20px rgba(0,0,0,0.3);
  transition: transform 0.3s;
}

.reserve-button-new:hover {
  transform: scale(1.05);
}

.reserve-button-new::before {
  content: '';
  background: linear-gradient(90deg, var(--orange), var(--yellow), var(--green), var(--blue), var(--purple), var(--pink), var(--red));
  height: 30%;
  width: 60%;
  position: absolute;
  bottom: -20%;
  z-index: -5;
  background-size: 200%;
  animation: animate 2s infinite linear;
  filter: blur(calc(0.8 * var(--m)));
}

.reserve-button-new:hover::before {
  animation: animate 0.5s infinite linear;
}

@keyframes animate {
  0% { background-position: 0 }
  100% { background-position: 200% }
}

/* Footer Bar */
.blue-footer-bar {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 12px;
  background-color: #007bff;
  z-index: 15;
}

/* Responsive */
@media screen and (max-width: 1000px) {
  .hero-section {
    --m: 2rem;
  }
  .hero-text {
    font-size: 2.5rem;
  }
  .hero-subtitle {
    font-size: 1rem;
  }
  .hero-content {
    margin-left: 1rem;
  }
}
</style>

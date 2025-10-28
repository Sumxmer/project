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
/* ================================================= */
/* 1. ตัวแปร และ Global Style (สำคัญสำหรับปุ่ม) */
/* ================================================= */
/* กำหนดตัวแปรสำหรับสีและการปรับขนาด (m) */
.hero-section {
  /* ตัวแปรสีสำหรับปุ่ม Gradient Border (สำคัญ!) */
  --orange: #ff9100;
  --yellow: #ffc400;
  --green: #29e083;
  --blue: #007bff;
  --purple: #9c27b0;
  --pink: #ff4081;
  --red: #ff1744;
  /* ตัวแปรสำหรับขนาดขอบปุ่ม */
  --m: 4rem; /* ใช้ 4rem สำหรับจอใหญ่ */
  /* สีหลักและฟอนต์ */
  --text-color: #ffffff;
  --accent-color: var(--blue);
}

:global(body), :global(html) {
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
  /* ตั้งฟอนต์พื้นฐาน */
  font-family: 'Space Grotesk', sans-serif;
}
@import url('https://fonts.googleapis.com/css?family=Space+Grotesk:400,700,900&display=swap');

/* ================================================= */
/* 2. Hero Section Background & Layout */
/* ================================================= */
.hero-section {
  width: 100vw;
  height: 100vh;
  min-height: 100vh;
  /* **การเพิ่มรูปภาพพื้นหลัง** */
  background: linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.6)), url('https://images.unsplash.com/photo-1549476465-9a84a7e93437?fit=crop&w=1920&h=1080'); /* เปลี่ยน URL รูปภาพนี้เป็นรูปภาพที่คุณต้องการ */
  background-size: cover;
  background-position: center;
  background-attachment: fixed; /* ทำให้พื้นหลังอยู่กับที่เวลามีการ Scroll */
  /* Layout */
  display: flex;
  flex-direction: column;
  justify-content: center; /* กึ่งกลางแนวตั้ง */
  align-items: flex-start; /* **จัดชิดซ้าย** (เพื่อให้เนื้อหาดูดีขึ้น) */
  box-sizing: border-box;
  padding: 0; /* ล้าง Padding เดิม */
  color: var(--text-color); /* ให้สีข้อความเป็นสีขาว */
  position: relative; /* สำคัญสำหรับ navbar และ footer bar */
}

/* ================================================= */
/* 3. Navbar (ปรับให้สีเข้ากับพื้นหลังเข้ม) */
/* ================================================= */
.navbar {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  padding: 1.5rem 4rem; /* เพิ่ม Padding ให้ดูโปร่งขึ้น */
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;
  z-index: 10;
}
.logo {
  font-size: 1.8rem; /* ขยายโลโก้ */
  font-weight: 900;
  letter-spacing: 1px;
  text-shadow: 0 2px 4px rgba(0,0,0,0.8);
}

.nav-links {
  display: flex;
  gap: 2.5rem;
}

.nav-item {
  color: var(--text-color);
  font-weight: 500;
  text-decoration: none;
  transition: color 0.3s;
}

.nav-item:hover {
  color: var(--yellow); /* ใช้ตัวแปรสีเหลืองที่กำหนดไว้ */
}

.location {
  color: rgba(255, 255, 255, 0.8);
  font-size: 0.95rem;
  font-weight: 400;
}

/* ================================================= */
/* 4. Hero Content (จัดให้อยู่กลางจอเยื้องซ้าย) */
/* ================================================= */
.hero-content {
  /* **สำคัญ**: ปรับขนาดและตำแหน่งเพื่อให้ดูสมดุล */
  max-width: 800px;
  text-align: left;
  /* จัดให้อยู่กลางจอด้วยการใช้ margin-left/padding */
  padding-left: 6rem;
}

.hero-text {
  font-size: 5.5rem; /* ขยายให้ใหญ่ขึ้น */
  font-weight: 900;
  line-height: 1.05;
  margin: 0 0 1rem 0;
  text-shadow: 0 6px 15px rgba(0, 0, 0, 0.9);
}

.hero-subtitle {
  font-size: 1.5rem;
  margin-bottom: 2.5rem;
  color: #c0c0c0; /* ปรับสีเทาอ่อนลง */
  text-shadow: 0 2px 6px rgba(0, 0, 0, 0.8);
  font-weight: 400;
}

/* ================================================= */
/* 5. Gradient Button (ปรับปรุงเล็กน้อย) */
/* ================================================= */
.reserve-button-new {
  border: calc(0.08 * var(--m)) solid transparent;
  position: relative;
  color: #fff;
  font-family: 'Space Grotesk', sans-serif;
  font-size: 1.35rem; /* ขยายปุ่ม */
  font-weight: 700;
  border-radius: 50px;
  padding: 0.85rem 2.5rem; /* ขยาย Padding */
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
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.6); /* เงาเข้มขึ้น */
  transition: transform 0.3s;
  z-index: 5;
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
  z-index: -1; /* ปรับ z-index ให้ต่ำกว่าปุ่ม */
  background-size: 200%;
  animation: animate 2s infinite linear;
  filter: blur(calc(0.5 * var(--m))); /* ลด Blur เล็กน้อย */
}

@keyframes animate {
  0% { background-position: 0 }
  100% { background-position: 200% }
}

/* ================================================= */
/* 6. Footer Bar */
/* ================================================= */
.blue-footer-bar {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 12px;
  background: linear-gradient(90deg, var(--orange), var(--yellow), var(--green), var(--blue)); /* ใช้ Gradient ให้เข้าธีม */
  z-index: 10;
}

/* ================================================= */
/* 7. Responsive (สำหรับจอเล็ก) */
/* ================================================= */
@media screen and (max-width: 1000px) {
  .hero-section {
    --m: 2rem; /* ลดขนาดตัวแปร m สำหรับปุ่ม */
    /* จัดกึ่งกลางสำหรับจอเล็ก */
    align-items: center;
    text-align: center;
  }
  .navbar {
    padding: 1rem 2rem;
    flex-direction: column; /* เรียง Navbar ลงมา */
    gap: 0.5rem;
  }
  .nav-links {
    gap: 1.5rem;
    margin-top: 0.5rem;
  }

  .hero-content {
    /* **สำคัญ**: ล้าง margin/padding เพื่อให้เนื้อหาอยู่กึ่งกลาง */
    padding-left: 0;
    max-width: 90%;
    margin: 0;
  }
  .hero-text {
    font-size: 3rem; /* เล็กลงสำหรับมือถือ */
    line-height: 1.1;
  }
  .hero-subtitle {
    font-size: 1.1rem;
    margin-bottom: 2rem;
  }
  .reserve-button-new {
    font-size: 1.1rem;
    padding: 0.6rem 2rem;
  }
}
</style>
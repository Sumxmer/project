<template>
  <div class="hero-section">
    <!-- Navigation Bar ที่จะติดอยู่ด้านบนตลอดเวลา -->
    <header class="navbar">
      <div class="navbar-container">
        <div class="logo">
          <span class="logo-text">Group<span class="logo-highlight">11</span></span>
        </div>
        <nav class="nav-links">
          
          <router-link to="/about" class="nav-item">Developer</router-link>
        </nav>
      </div>
    </header>

    <!-- เนื้อหาหลักของหน้า Hero -->
    <div class="hero-content">
      <h1 class="hero-text">Fixถึงใจที่ถึงที่</h1>
      <p class="hero-subtitle">บริการคุณภาพ พร้อมฟิตเนสทุกที่ทุกเวลา</p>
      
      <!-- ปุ่มเข้าสู่ระบบที่มีเอฟเฟกต์เรืองแสง -->
      <!-- หากคุณยังไม่ได้ติดตั้ง Vue Router ให้ใช้ tag <a> แทน router-link -->
      <router-link to="/login" class="glowing-button">
        <span class="glowing-button__content">
          <span>เข้าสู่ระบบ</span>
        </span>
      </router-link>
      
      <!-- หากไม่มี Vue Router ให้ใช้แบบนี้แทน -->
      <!-- <a href="/login.html" class="glowing-button">
        <span class="glowing-button__content">
          <span>เข้าสู่ระบบ</span>
        </span>
      </a> -->
    </div>

    <!-- แถบสีรุ้งด้านล่าง -->
    <div class="footer-bar"></div>
  </div>
</template>

<script setup>
// ในกรณีที่คุณต้องการเพิ่ม logic ในอนาคต สามารถเขียนได้ที่นี่
// ตัวอย่างเช่น การดึงข้อมูล API หรือการจัดการ state ต่างๆ
</script>

<style scoped>
/* ==================================================================================
   SECTION: การตั้งค่าพื้นฐานสำหรับทั้งหน้าเว็บ
   ==================================================================================
   เราจะกำหนดค่าพื้นฐานให้กับหน้าเว็บทั้งหมดก่อน เพื่อให้แน่ใจว่า
   พื้นหลังสีดำจะขยายเต็มทั้งหน้าจอและไม่มีช่องว่างที่ไม่ต้องการ
*/

/* กำหนดให้ทุก element ใช้ box-sizing แบบ border-box 
   ซึ่งจะทำให้การคำนวณขนาดของ element ง่ายขึ้น 
   เพราะ padding และ border จะรวมอยู่ในความกว้างและความสูงที่เรากำหนด */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

/* ==================================================================================
   SECTION: การตั้งค่าส่วน Hero Section หลัก
   ==================================================================================
   นี่คือคอนเทนเนอร์หลักที่จะครอบคลุมทั้งหน้าจอ
*/

.hero-section {
  /* ใช้ viewport units เพื่อให้แน่ใจว่าจะเต็มหน้าจอ 100% */
  width: 100vw;
  min-height: 100vh;
  
  /* ลบ margin และ padding ออกเพื่อไม่ให้มีช่องว่าง */
  margin: 0;
  padding: 0;
  
  /* ใช้ flexbox เพื่อจัดเรียงเนื้อหาให้อยู่กึ่งกลางทั้งแนวตั้งและแนวนอน */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  
  /* สร้างพื้นหลังแบบ gradient จากสีดำไปสีเทาเข้ม */
  background: linear-gradient(135deg, #000000 0%, #1a1a1a 100%);
  color: #ffffff;
  
  /* position relative เพื่อให้ element ลูกที่เป็น absolute วางตำแหน่งได้ */
  position: relative;
  overflow: hidden;
  
  /* กำหนด font family สำหรับทั้งหน้า */
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

/* สร้างเอฟเฟกต์พื้นหลังแบบมีจุดสีเคลื่อนไหว 
   ใช้ pseudo-element ::before เพื่อไม่ให้กระทบกับเนื้อหาหลัก */
.hero-section::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  
  /* สร้างจุดสีหลายๆ จุดด้วย radial-gradient 
     แต่ละจุดมีสีและตำแหน่งต่างกัน เพื่อสร้างความหลากหลาย */
  background-image: 
    radial-gradient(2px 2px at 20% 30%, rgba(255, 0, 127, 0.3), transparent),
    radial-gradient(2px 2px at 60% 70%, rgba(255, 196, 0, 0.3), transparent),
    radial-gradient(1px 1px at 50% 50%, rgba(41, 224, 131, 0.3), transparent),
    radial-gradient(2px 2px at 80% 10%, rgba(0, 123, 255, 0.3), transparent);
  
  /* ทำให้ background ใหญ่กว่าพื้นที่จริง เพื่อให้ animate ได้ */
  background-size: 200% 200%;
  background-position: 0% 0%;
  
  /* เรียกใช้ animation ชื่อ particles ที่จะทำให้จุดสีเคลื่อนไหว */
  animation: particles 20s ease infinite;
  
  /* ทำให้ไม่สามารถคลิกได้ เพื่อไม่ให้ขวางการคลิกปุ่มหรือลิงก์ */
  pointer-events: none;
  opacity: 0.5;
  
  /* ให้อยู่ด้านหลังเนื้อหาหลัก */
  z-index: 0;
}

/* กำหนด keyframes สำหรับ animation ของจุดสีพื้นหลัง 
   จะทำให้จุดสีเคลื่อนที่จากมุมหนึ่งไปอีกมุมหนึ่งอย่างช้าๆ */
@keyframes particles {
  0%, 100% { 
    background-position: 0% 0%; 
  }
  50% { 
    background-position: 100% 100%; 
  }
}

/* ==================================================================================
   SECTION: Navigation Bar
   ==================================================================================
   แถบเมนูด้านบนที่จะติดอยู่ตลอดเวลาแม้จะเลื่อนหน้าจอ
*/

.navbar {
  /* fixed position จะทำให้แถบนี้อยู่กับที่แม้จะ scroll หน้าจอ */
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  padding: 0;
  
  /* สร้างพื้นหลังโปร่งแสงเล็กน้อย */
  background: rgba(0, 0, 0, 0.85);
  
  /* backdrop-filter จะทำให้สิ่งที่อยู่ด้านหลังเบลอ สร้างเอฟเฟกต์กระจก */
  backdrop-filter: blur(10px);
  
  /* เพิ่มเส้นขอบด้านล่างสีชมพูอ่อน */
  border-bottom: 1px solid rgba(255, 0, 127, 0.3);
  
  /* z-index สูงเพื่อให้แน่ใจว่าจะอยู่ด้านบนสุดเสมอ */
  z-index: 100;
  
  /* เพิ่มเงาเล็กน้อยเพื่อให้ navbar โดดเด่นจากพื้นหลัง */
  box-shadow: 0 4px 30px rgba(255, 0, 127, 0.1);
}

/* คอนเทนเนอร์ภายใน navbar ที่จะจำกัดความกว้างและจัดวาง element */
.navbar-container {
  max-width: 1400px;
  margin: 0 auto; /* จัดให้อยู่กึ่งกลางแนวนอน */
  
  /* ใช้ flexbox เพื่อจัด logo และเมนูให้อยู่คนละฝั่ง */
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.2rem 2rem;
}

/* ==================================================================================
   SECTION: Logo Styling
   ==================================================================================
*/

.logo {
  font-size: 1.8rem;
  font-weight: 900;
  cursor: pointer;
  
  /* เพิ่ม transition เพื่อให้การเปลี่ยนแปลงดูนุ่มนวล */
  transition: transform 0.3s ease;
  
  /* ให้อยู่เหนือพื้นหลัง particle */
  position: relative;
  z-index: 1;
}

/* เมื่อ hover ที่ logo จะขยายใหญ่ขึ้นเล็กน้อย */
.logo:hover {
  transform: scale(1.05);
}

.logo-text {
  color: #ffffff;
  /* เพิ่มเงาเรืองแสงรอบตัวอักษร */
  text-shadow: 0 0 10px rgba(255, 0, 127, 0.5);
}

/* ส่วนที่เป็นภาษาไทย "ถึงใจ" จะมีสีชมพูและเรืองแสงมากกว่า */
.logo-highlight {
  color: #ff007f;
  text-shadow: 0 0 20px rgba(255, 0, 127, 0.8);
}

/* ==================================================================================
   SECTION: Navigation Links
   ==================================================================================
*/

.nav-links {
  display: flex;
  gap: 2.5rem; /* ระยะห่างระหว่างลิงก์แต่ละตัว */
  align-items: center;
  
  /* ให้อยู่เหนือพื้นหลัง particle */
  position: relative;
  z-index: 1;
}

.nav-item {
  color: rgba(255, 255, 255, 0.9);
  text-decoration: none;
  font-weight: 600;
  font-size: 1rem;
  
  /* position relative เพื่อให้ pseudo-element สามารถวางตำแหน่งได้ */
  position: relative;
  padding: 0.5rem 0;
  
  /* transition จะทำให้การเปลี่ยนสีเกิดขึ้นอย่างนุ่มนวล */
  transition: color 0.3s ease;
}

/* สร้างเส้นใต้ด้วย pseudo-element ::after 
   เริ่มต้นจะมีความกว้าง 0 จึงมองไม่เห็น */
.nav-item::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 0;
  height: 2px;
  
  /* ใช้ gradient เพื่อให้เส้นมีสีที่สวยงาม */
  background: linear-gradient(90deg, #ff007f, #ffc400);
  
  /* transition จะทำให้เส้นขยายออกอย่างนุ่มนวล */
  transition: width 0.3s ease;
}

/* เมื่อ hover ข้อความจะเปลี่ยนเป็นสีชมพู */
.nav-item:hover {
  color: #ff007f;
}

/* เมื่อ hover เส้นใต้จะขยายออกจนเต็มความกว้าง */
.nav-item:hover::after {
  width: 100%;
}

/* ==================================================================================
   SECTION: Hero Content
   ==================================================================================
   เนื้อหาหลักที่แสดงอยู่กึ่งกลางหน้าจอ
*/

.hero-content {
  /* เว้นระยะจาก navbar ที่อยู่ด้านบน */
  margin-top: 6rem;
  
  /* ให้อยู่เหนือพื้นหลัง particle */
  z-index: 1;
  position: relative;
  padding: 0 2rem;
}

/* ข้อความหัวเรื่องหลัก */
.hero-text {
  font-size: 5rem;
  font-weight: 900;
  margin: 0 0 1rem 0;
  
  /* สร้างเอฟเฟกต์ตัวอักษรสีรุ้งด้วย gradient 
     background-clip: text จะทำให้เห็นเฉพาะส่วนที่เป็นตัวอักษร */
  background: linear-gradient(135deg, #ff007f 0%, #ff66b2 50%, #ffc400 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  
  /* เพิ่มเงาเรืองแสง */
  filter: drop-shadow(0 0 20px rgba(255, 0, 127, 0.5));
  
  /* animation ที่ทำให้ข้อความลอยขึ้นลงเบาๆ */
  animation: floatText 3s ease-in-out infinite;
}

/* กำหนด keyframes สำหรับ animation ลอยขึ้นลง 
   จะเคลื่อนที่ขึ้นไป 10px แล้วกลับมาที่เดิม วนซ้ำไปเรื่อยๆ */
@keyframes floatText {
  0% { 
    transform: translateY(0); 
  }
  50% { 
    transform: translateY(-10px); 
  }
  100% { 
    transform: translateY(0); 
  }
}

/* ข้อความรอง */
.hero-subtitle {
  font-size: 1.5rem;
  margin-bottom: 2rem;
  color: rgba(255, 255, 255, 0.8);
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.5);
}

/* ==================================================================================
   SECTION: Glowing Button
   ==================================================================================
   ปุ่มสีชมพูที่มีเอฟเฟกต์เรืองแสง
*/

.glowing-button {
  /* ใช้ inline-flex เพื่อให้ปุ่มอยู่กึ่งกลางและมีขนาดตามที่กำหนด */
  position: relative;
  display: inline-flex;
  height: 55px;
  width: 200px;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  margin-top: 1.5rem;
  border-radius: 30px;
  color: #ffffff;
  font-weight: 700;
  font-size: 1.2rem;
  text-align: center;
  
  /* พื้นหลังเป็น gradient สีชมพู */
  background: linear-gradient(135deg, #ff007f 0%, #ff4da6 100%);
  
  /* สร้างเงาเรืองแสงหลายชั้นเพื่อให้ดูโดดเด่น */
  box-shadow: 
    0 0 20px rgba(255, 0, 127, 0.5), 
    0 0 40px rgba(255, 0, 127, 0.3),
    0 0 60px rgba(255, 0, 127, 0.1);
  
  /* transition จะทำให้การเปลี่ยนแปลงทั้งหมดดูนุ่มนวล */
  transition: all 0.3s ease;
  
  /* animation ที่ทำให้เงาเรืองแสงกระพริบเบาๆ */
  animation: glowPink 2s ease-in-out infinite alternate;
  overflow: hidden;
  
  /* ลบ border ที่อาจมาจาก default style */
  border: none;
  cursor: pointer;
}

/* สร้างเอฟเฟกต์แสงวิ่งผ่านด้วย pseudo-element ::before */
.glowing-button::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%; /* เริ่มต้นอยู่นอกปุ่มทางซ้าย */
  width: 100%;
  height: 100%;
  
  /* gradient แนวนอนที่เป็นแสงสีขาว */
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
  
  /* transition จะทำให้แสงเคลื่อนที่อย่างนุ่มนวล */
  transition: left 0.5s;
}

/* เมื่อ hover แสงจะวิ่งจากซ้ายไปขวา */
.glowing-button:hover::before {
  left: 100%;
}

/* เมื่อ hover ปุ่มจะลอยขึ้นเล็กน้อยและเรืองแสงมากขึ้น */
.glowing-button:hover {
  transform: translateY(-3px) scale(1.05);
  box-shadow: 
    0 0 30px rgba(255, 0, 127, 0.7), 
    0 0 60px rgba(255, 0, 127, 0.5),
    0 0 90px rgba(255, 0, 127, 0.3);
}

/* animation สำหรับเงาเรืองแสงที่กระพริบ */
@keyframes glowPink {
  0% { 
    box-shadow: 
      0 0 20px rgba(255, 0, 127, 0.5), 
      0 0 40px rgba(255, 0, 127, 0.3),
      0 0 60px rgba(255, 0, 127, 0.1);
  }
  100% { 
    box-shadow: 
      0 0 30px rgba(255, 0, 127, 0.7), 
      0 0 60px rgba(255, 0, 127, 0.5),
      0 0 90px rgba(255, 0, 127, 0.3);
  }
}

/* ข้อความภายในปุ่ม */
.glowing-button__content {
  color: #ffffff;
  position: relative;
  z-index: 1; /* ให้อยู่เหนือ pseudo-element */
  text-shadow: 0 2px 5px rgba(0, 0, 0, 0.3);
}

/* ==================================================================================
   SECTION: Footer Bar
   ==================================================================================
   แถบสีรุ้งด้านล่างสุดของหน้า
*/

.footer-bar {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 4px;
  
  /* gradient ที่มีหลายสี จะทำให้เกิดเป็นสีรุ้ง */
  background-image: linear-gradient(
    90deg, 
    #ff007f, 
    #ff9100, 
    #ffc400, 
    #29e083, 
    #007bff, 
    #9c27b0, 
    #ff4081
  );
  
  /* ทำให้ background ใหญ่กว่าพื้นที่จริง เพื่อ animate ได้ */
  background-size: 200% 100%;
  
  /* animation ที่ทำให้สีไหลไปมา */
  animation: footer-animate 5s linear infinite;
  
  /* เพิ่มเงาเรืองแสงด้านบน */
  box-shadow: 0 -2px 20px rgba(255, 0, 127, 0.5);
  z-index: 99;
}

/* keyframes สำหรับ animation ของแถบสีรุ้ง 
   จะเลื่อน background position จากซ้ายไปขวาอย่างต่อเนื่อง */
@keyframes footer-animate {
  0% { 
    background-position: 0% 0; 
  }
  100% { 
    background-position: 200% 0; 
  }
}

/* ==================================================================================
   SECTION: Accessibility - Reduced Motion
   ==================================================================================
   สำหรับผู้ใช้ที่เปิด reduced motion ในระบบปฏิบัติการ
   เราจะปิด animation ทั้งหมดเพื่อไม่ให้เกิดอาการไม่สบาย
*/

@media (prefers-reduced-motion: reduce) {
  .hero-text,
  .glowing-button,
  .footer-bar,
  .hero-section::before {
    animation: none;
  }
  
  /* ลด transition time ให้เร็วขึ้นมาก */
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}

/* ==================================================================================
   SECTION: Responsive Design
   ==================================================================================
   ปรับแต่งขนาดและ layout สำหรับหน้าจอขนาดต่างๆ
*/

/* สำหรับหน้าจอขนาดกลาง เช่น tablet แนวนอน */
@media screen and (max-width: 1024px) {
  .navbar-container {
    padding: 1rem 1.5rem;
  }
  
  .logo {
    font-size: 1.5rem;
  }
  
  .nav-links {
    gap: 2rem;
  }
  
  .nav-item {
    font-size: 0.95rem;
  }
  
  .hero-text { 
    font-size: 4rem; 
  }
  
  .hero-subtitle { 
    font-size: 1.3rem; 
  }
}

/* สำหรับหน้าจอขนาดเล็ก เช่น tablet แนวตั้ง */
@media screen and (max-width: 768px) {
  .navbar-container {
    padding: 1rem;
  }
  
  .logo {
    font-size: 1.4rem;
  }
  
  .nav-links {
    gap: 1.5rem;
  }
  
  .nav-item {
    font-size: 0.9rem;
  }
  
  .hero-text { 
    font-size: 3rem; 
  }
  
  .hero-subtitle { 
    font-size: 1.1rem; 
  }
  
  .glowing-button { 
    width: 180px; 
    height: 50px; 
    font-size: 1.1rem; 
  }
}

/* สำหรับหน้าจอมือถือ */
@media screen and (max-width: 600px) {
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
  
  .nav-item {
    font-size: 0.85rem;
  }
  
  .hero-content {
    margin-top: 8rem; /* เพิ่มระยะเพราะ navbar สูงขึ้นเมื่อเป็นแนวตั้ง */
    padding: 0 1rem;
  }
  
  .hero-text { 
    font-size: 2rem; 
  }
  
  .hero-subtitle { 
    font-size: 1rem; 
    margin-bottom: 1.5rem;
  }
  
  .glowing-button { 
    width: 160px; 
    height: 45px; 
    font-size: 1rem; 
  }
}

/* สำหรับหน้าจอมือถือเล็กมาก */
@media screen and (max-width: 375px) {
  .hero-text { 
    font-size: 1.8rem; 
  }
  
  .hero-subtitle { 
    font-size: 0.9rem; 
  }
  
  .glowing-button { 
    width: 150px; 
    height: 42px; 
    font-size: 0.95rem; 
  }
}
</style>

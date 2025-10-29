<template>
  <div class="page-container">
    <Navcust />
    <div class="content-wrapper">
      <header class="header">
        <h1 class="gradient-text">ยินดีต้อนรับ, {{ user.name }}</h1>
        <p class="subtitle">เลือกเมนูด้านล่างเพื่อเริ่มใช้งาน</p>
      </header>

      <div class="shortcut-cards">
        <div class="card repair-card" @click="goTo('/request-repair')">
          <div class="card-glow"></div>
          <div class="icon">🛠️</div>
          <h2>แจ้งซ่อม</h2>
          <p>ส่งงานซ่อมถึงช่างได้ทันที</p>
        </div>
        
        <div class="card history-card" @click="goTo('/repair-history')">
          <div class="card-glow"></div>
          <div class="icon">📜</div>
          <h2>ประวัติการซ่อม</h2>
          <p>ตรวจสอบรายการแจ้งซ่อมของคุณ</p>
        </div>
        
        <div class="card profile-card" @click="goTo('/profile')">
          <div class="card-glow"></div>
          <div class="icon">👤</div>
          <h2>โปรไฟล์</h2>
          <p>แก้ไขข้อมูลส่วนตัวของคุณ</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Navcust from '../../components/Navcust.vue';

export default {
  name: 'HomeCust',
  components: { Navcust },
  data() {
    return {
      user: { name: 'สมชาย ใจดี' }
    }
  },
  methods: {
    goTo(path) {
      this.$router.push(path);
    }
  }
}
</script>

<style scoped>
/* 
  Page Container - นี่คือ element หลักที่ครอบคลุมทั้งหน้า
  เราจะใช้ min-height: 100vh เพื่อให้แน่ใจว่าจะเต็มหน้าจอเสมอ
  แม้ว่าเนื้อหาจะน้อยก็ตาม
*/
.page-container {
  width: 100%;
  min-height: 100vh;
  margin: 0;
  padding: 0;
  background: linear-gradient(135deg, #000000 0%, #1a1a1a 100%);
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  position: relative;
  overflow-x: hidden;
}

/* 
  Content Wrapper - พื้นที่สำหรับเนื้อหาหลัก
  ในหน้าจอขนาดใหญ่จะเว้นระยะทางซ้าย 250px สำหรับ sidebar
  แต่ในมือถือจะไม่มี margin-left เพราะ navbar จะอยู่ด้านล่างแทน
*/
.content-wrapper {
  margin-left: 250px;
  padding: 3rem 2rem;
  min-height: 100vh;
  width: calc(100% - 250px);
  box-sizing: border-box;
}

/* 
  Header Section - ส่วนหัวของหน้า
  ใช้ animation fadeInDown เพื่อให้มีการเคลื่อนไหวเมื่อโหลดหน้า
*/
.header {
  text-align: center;
  margin-bottom: 4rem;
  animation: fadeInDown 0.8s ease;
}

@keyframes fadeInDown {
  from {
    opacity: 0;
    transform: translateY(-30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* 
  Gradient Text - ข้อความหัวเรื่องที่มีสีแบบ gradient
  ใช้เทคนิค background-clip เพื่อให้ gradient แสดงเฉพาะในตัวอักษร
*/
.gradient-text {
  font-size: 3rem;
  font-weight: 900;
  margin-bottom: 1rem;
  background: linear-gradient(135deg, #ff007f 0%, #ff66b2 50%, #ffc400 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  filter: drop-shadow(0 0 20px rgba(255, 0, 127, 0.5));
  line-height: 1.2;
}

/* Subtitle - ข้อความรอง */
.subtitle {
  color: rgba(255, 255, 255, 0.8);
  font-size: 1.3rem;
  font-weight: 400;
  margin: 0;
}

/* 
  Shortcut Cards Container - คอนเทนเนอร์สำหรับการ์ดทั้งหมด
  ใช้ CSS Grid เพื่อจัดวางการ์ดแบบยืดหยุ่น
  auto-fit จะทำให้การ์ดปรับขนาดอัตโนมัติตามพื้นที่ที่มี
*/
.shortcut-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
  animation: fadeInUp 0.8s ease 0.2s both;
  padding: 0;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* 
  Card Base - สไตล์พื้นฐานสำหรับการ์ดแต่ละใบ
  ใช้ position: relative เพื่อให้สามารถวาง pseudo-element ได้
  backdrop-filter: blur จะทำให้มีเอฟเฟกต์กระจกฝ้า
*/
.card {
  position: relative;
  background: linear-gradient(135deg, rgba(26, 26, 26, 0.9), rgba(0, 0, 0, 0.9));
  backdrop-filter: blur(10px);
  border-radius: 20px;
  padding: 2.5rem 2rem;
  text-align: center;
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4);
}

/* 
  Card Glow Effect - เอฟเฟกต์เรืองแสงที่จะปรากฏเมื่อ hover
  ใช้ radial-gradient เพื่อสร้างแสงวงกลมที่ตรงกลาง
  opacity จะเป็น 0 ตอนปกติ และเพิ่มขึ้นเป็น 1 เมื่อ hover
*/
.card-glow {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: radial-gradient(circle at center, rgba(255, 0, 127, 0.15), transparent);
  opacity: 0;
  transition: opacity 0.4s ease;
  pointer-events: none;
  z-index: 0;
}

.card:hover .card-glow {
  opacity: 1;
}

/* 
  Icon - ไอคอน emoji ที่แสดงในการ์ดแต่ละใบ
  เมื่อ hover จะขยายและหมุนเล็กน้อยเพื่อเพิ่มความน่าสนใจ
*/
.card .icon {
  font-size: 4rem;
  margin-bottom: 1.5rem;
  filter: drop-shadow(0 0 15px rgba(255, 0, 127, 0.5));
  transition: transform 0.4s ease;
  position: relative;
  z-index: 1;
}

.card:hover .icon {
  transform: scale(1.2) rotate(5deg);
}

/* Card Title - หัวข้อของการ์ด */
.card h2 {
  margin: 0 0 1rem;
  color: #fff;
  font-size: 1.6rem;
  font-weight: 700;
  transition: color 0.3s ease;
  position: relative;
  z-index: 1;
}

/* Card Description - คำอธิบายของการ์ด */
.card p {
  color: rgba(255, 255, 255, 0.7);
  font-size: 1rem;
  line-height: 1.5;
  margin: 0;
  position: relative;
  z-index: 1;
}

/* 
  Card Variants - สไตล์เฉพาะสำหรับการ์ดแต่ละประเภท
  แต่ละการ์ดจะมีสีเส้นขอบและเงาที่แตกต่างกันเมื่อ hover
*/

/* การ์ดแจ้งซ่อม - ใช้สีชมพู */
.repair-card {
  border-top: 3px solid #ff007f;
}

.repair-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 15px 40px rgba(255, 0, 127, 0.4);
  border-color: #ff007f;
}

.repair-card:hover h2 {
  color: #ff007f;
}

/* การ์ดประวัติการซ่อม - ใช้สีน้ำเงิน */
.history-card {
  border-top: 3px solid #007bff;
}

.history-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 15px 40px rgba(0, 123, 255, 0.4);
  border-color: #007bff;
}

.history-card:hover h2 {
  color: #007bff;
}

.history-card:hover .card-glow {
  background: radial-gradient(circle at center, rgba(0, 123, 255, 0.15), transparent);
}

/* การ์ดโปรไฟล์ - ใช้สีเขียว */
.profile-card {
  border-top: 3px solid #29e083;
}

.profile-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 15px 40px rgba(41, 224, 131, 0.4);
  border-color: #29e083;
}

.profile-card:hover h2 {
  color: #29e083;
}

.profile-card:hover .card-glow {
  background: radial-gradient(circle at center, rgba(41, 224, 131, 0.15), transparent);
}

/* 
  Responsive Design สำหรับ Tablet และหน้าจอขนาดกลาง
  ที่ความกว้าง 768px ลงมา จะปรับ margin และ padding ให้เหมาะสม
*/
@media (max-width: 768px) {
  .content-wrapper {
    margin-left: 0;
    width: 100%;
    padding: 2rem 1rem;
    padding-bottom: 100px;
  }

  .gradient-text {
    font-size: 2.2rem;
  }

  .subtitle {
    font-size: 1.1rem;
  }

  .header {
    margin-bottom: 3rem;
  }

  .shortcut-cards {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }

  .card {
    padding: 2rem 1.5rem;
  }
}

/* 
  Responsive Design สำหรับมือถือขนาดเล็ก
  ที่ความกว้าง 480px ลงมา จะลดขนาดตัวอักษรและไอคอนให้เล็กลง
*/
@media (max-width: 480px) {
  .content-wrapper {
    padding: 1.5rem 1rem;
    padding-bottom: 100px;
  }

  .gradient-text {
    font-size: 1.8rem;
  }

  .subtitle {
    font-size: 1rem;
  }

  .header {
    margin-bottom: 2rem;
  }

  .card .icon {
    font-size: 3rem;
  }

  .card h2 {
    font-size: 1.4rem;
  }

  .card p {
    font-size: 0.9rem;
  }

  .card {
    padding: 1.8rem 1.2rem;
  }

  .shortcut-cards {
    gap: 1.2rem;
  }
}

/* 
  Responsive Design สำหรับมือถือขนาดพิเศษเล็ก
  สำหรับหน้าจอที่เล็กมากๆ เช่น iPhone SE หรือมือถือเก่าๆ
*/
@media (max-width: 375px) {
  .gradient-text {
    font-size: 1.6rem;
  }

  .subtitle {
    font-size: 0.95rem;
  }

  .card .icon {
    font-size: 2.5rem;
    margin-bottom: 1rem;
  }

  .card h2 {
    font-size: 1.3rem;
  }

  .card p {
    font-size: 0.85rem;
  }
}

/* 
  สำหรับผู้ใช้ที่เปิดโหมด reduced motion ในระบบปฏิบัติการ
  เราจะปิด animation ทั้งหมดเพื่อไม่ให้เกิดอาการไม่สบาย
*/
@media (prefers-reduced-motion: reduce) {
  .header,
  .shortcut-cards,
  .card,
  .card .icon {
    animation: none;
    transition-duration: 0.01ms;
  }
}
</style>
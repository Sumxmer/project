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
/* Page Container */
.page-container {
  min-height: 100vh;
  background: linear-gradient(135deg, #000000 0%, #1a1a1a 100%);
  font-family: 'Space Grotesk', sans-serif;
}

/* Content Wrapper */
.content-wrapper {
  margin-left: 250px;
  padding: 3rem 2rem;
  min-height: 100vh;
}

/* Header */
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

.gradient-text {
  font-size: 3rem;
  font-weight: 900;
  margin-bottom: 1rem;
  background: linear-gradient(135deg, #ff007f 0%, #ff66b2 50%, #ffc400 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  filter: drop-shadow(0 0 20px rgba(255, 0, 127, 0.5));
}

.subtitle {
  color: rgba(255, 255, 255, 0.8);
  font-size: 1.3rem;
  font-weight: 400;
}

/* Shortcut Cards */
.shortcut-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
  animation: fadeInUp 0.8s ease 0.2s both;
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

/* Card Base */
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

/* Card Glow Effect */
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
}

.card:hover .card-glow {
  opacity: 1;
}

/* Icon */
.card .icon {
  font-size: 4rem;
  margin-bottom: 1.5rem;
  filter: drop-shadow(0 0 15px rgba(255, 0, 127, 0.5));
  transition: transform 0.4s ease;
}

.card:hover .icon {
  transform: scale(1.2) rotate(5deg);
}

/* Card Title */
.card h2 {
  margin: 0 0 1rem;
  color: #fff;
  font-size: 1.6rem;
  font-weight: 700;
  transition: color 0.3s ease;
}

/* Card Description */
.card p {
  color: rgba(255, 255, 255, 0.7);
  font-size: 1rem;
  line-height: 1.5;
  margin: 0;
}

/* Card Variants */
.repair-card {
  border-top: 3px solid #ff007f;
}

.repair-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 15px 40px rgba(255, 0, 127, 0.4);
  border-color: #ff007f;
}

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

/* Responsive */
@media (max-width: 768px) {
  .content-wrapper {
    margin-left: 0;
    padding: 2rem 1rem;
    padding-bottom: 80px; /* เว้นพื้นที่สำหรับ navbar ล่าง */
  }

  .gradient-text {
    font-size: 2rem;
  }

  .subtitle {
    font-size: 1rem;
  }

  .shortcut-cards {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }

  .card {
    padding: 2rem 1.5rem;
  }
}

@media (max-width: 480px) {
  .gradient-text {
    font-size: 1.8rem;
  }

  .card .icon {
    font-size: 3rem;
  }

  .card h2 {
    font-size: 1.4rem;
  }
}
</style>
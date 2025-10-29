<template>
  <div>
    <Navcust />
    <div class="content-wrapper">
      <header class="header">
        <h1>ยินดีต้อนรับ, {{ user.name }}</h1>
        <p>เลือกเมนูด้านล่างเพื่อเริ่มใช้งาน</p>
      </header>

      <div class="shortcut-cards">
        <div class="card repair" @click="goTo('/request-repair')">
          <div class="icon">🛠️</div>
          <h2>แจ้งซ่อม</h2>
          <p>ส่งงานซ่อมถึงช่างได้ทันที</p>
        </div>
        <div class="card history" @click="goTo('/customer/history')">
          <div class="icon">📜</div>
          <h2>ประวัติการซ่อม</h2>
          <p>ตรวจสอบรายการแจ้งซ่อมของคุณ</p>
        </div>
        <div class="card profile" @click="goTo('/customer/profile')">
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
  name: 'Home',
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
.content-wrapper {
  margin-left: 200px;
  padding: 20px;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  background: #f9f9f9;
  min-height: 100vh;
}

/* Header */
.header {
  text-align: center;
  margin-bottom: 40px;
}

.header h1 {
  font-size: 2.2em;
  margin-bottom: 5px;
  color: #333;
}

.header p {
  color: #666;
  font-size: 1.1em;
}

/* Shortcut Cards */
.shortcut-cards {
  display: flex;
  flex-wrap: wrap;
  gap: 25px;
  justify-content: center;
}

.card {
  background-color: #fff;
  border-radius: 20px;
  padding: 30px 20px;
  width: 220px;
  text-align: center;
  box-shadow: 0 6px 20px rgba(0,0,0,0.12);
  cursor: pointer;
  transition: transform 0.3s, box-shadow 0.3s, background 0.3s;
  position: relative;
}

.card .icon {
  font-size: 2.5em;
  margin-bottom: 15px;
}

/* Color variants */
.card.repair {
  border-top: 5px solid #ff6f00; /* สีส้มแจ้งซ่อม */
}

.card.history {
  border-top: 5px solid #007bff; /* สีฟ้าประวัติ */
}

.card.profile {
  border-top: 5px solid #28a745; /* สีเขียวโปรไฟล์ */
}

.card h2 {
  margin: 0 0 10px;
  color: #333;
}

.card p {
  color: #555;
  font-size: 0.95em;
}

/* Hover effect */
.card:hover {
  transform: translateY(-8px);
  box-shadow: 0 10px 25px rgba(0,0,0,0.15);
  background-color: #f0f8ff;
}

/* Responsive */
@media (max-width: 768px) {
  .content-wrapper {
    margin-left: 0;
  }
  .shortcut-cards {
    flex-direction: column;
    align-items: center;
  }
  .card {
    width: 90%;
  }
}
</style>

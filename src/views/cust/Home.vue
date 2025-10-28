<template>
  <div>
    <Navcust />
    <div class="content-wrapper">
      <header class="header">
        <h1>ยินดีต้อนรับ, {{ user.name }}</h1>
        <p>เลือกเมนูด้านซ้ายเพื่อทำรายการต่าง ๆ</p>
      </header>

      <div class="shortcut-cards">
        <div class="card" @click="goTo('/request-repair')">
          <h2>แจ้งซ่อม</h2>
          <p>ส่งงานซ่อมถึงช่างได้ทันที</p>
        </div>
        <div class="card" @click="goTo('/customer/history')">
          <h2>ประวัติการซ่อม</h2>
          <p>ตรวจสอบรายการแจ้งซ่อมของคุณ</p>
        </div>
        <div class="card" @click="goTo('/customer/profile')">
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
      user: {
        name: 'สมชาย ใจดี'
      }
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
  margin-left: 200px; /* เว้นพื้นที่ navbar */
  padding: 20px;
  font-family: Arial, sans-serif;
}

/* Header */
.header {
  text-align: center;
  margin-bottom: 30px;
}

.header h1 {
  font-size: 2em;
  margin-bottom: 5px;
}

.header p {
  color: #555;
}

/* Shortcut Cards */
.shortcut-cards {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
}

.card {
  background-color: #fff;
  border-radius: 15px;
  padding: 25px;
  width: 200px;
  text-align: center;
  box-shadow: 0 4px 15px rgba(0,0,0,0.1);
  cursor: pointer;
  transition: transform 0.3s, background 0.3s;
}

.card h2 {
  margin-top: 0;
  color: #007bff;
}

.card:hover {
  transform: translateY(-5px);
  background-color: #f0f8ff;
}

/* Responsive */
@media (max-width: 600px) {
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

<template>
  <div>
    <Navcust />
    <div class="content-wrapper">
      <header class="header">
        <h1>โปรไฟล์ของฉัน</h1>
        <p>จัดการข้อมูลส่วนตัวของคุณ</p>
      </header>

      <div class="profile-card">
        <div class="profile-item">
          <label>ชื่อ:</label>
          <span>{{ user.name }}</span>
        </div>
        <div class="profile-item">
          <label>อีเมล:</label>
          <span>{{ user.email }}</span>
        </div>
        <div class="profile-item">
          <label>เบอร์โทร:</label>
          <span>{{ user.phone }}</span>
        </div>

        <button @click="editProfile">แก้ไขข้อมูล</button>
      </div>
    </div>
  </div>
</template>

<script>
import Navcust from '../../components/Navcust.vue';

export default {
  name: 'Profile',
  components: { Navcust },
  data() {
    return {
      user: {
        name: 'สมชาย ใจดี',
        email: 'somchai@example.com',
        phone: '081-234-5678'
      }
    }
  },
  methods: {
    editProfile() {
      alert('คุณสามารถเพิ่มฟังก์ชันแก้ไขข้อมูลต่อได้ที่นี่');
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

/* Profile Card */
.profile-card {
  max-width: 500px;
  margin: 0 auto;
  background-color: #fff;
  border-radius: 15px;
  padding: 25px;
  box-shadow: 0 4px 15px rgba(0,0,0,0.1);
}

.profile-item {
  display: flex;
  justify-content: space-between;
  margin-bottom: 15px;
}

.profile-item label {
  font-weight: bold;
  color: #333;
}

button {
  width: 100%;
  background-color: #007bff;
  color: white;
  padding: 12px;
  font-size: 1em;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  transition: background 0.3s;
}

button:hover {
  background-color: #0056b3;
}

/* Responsive */
@media (max-width: 600px) {
  .content-wrapper {
    margin-left: 0;
  }
}
</style>

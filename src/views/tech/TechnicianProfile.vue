<template>
  <div>
    <Navtech />
    <div class="content-wrapper">
      <header class="header">
        <h1>โปรไฟล์ช่าง</h1>
        <p>แก้ไขข้อมูลส่วนตัวของคุณ</p>
      </header>

      <div class="profile-card">
        <img :src="technician.avatar" alt="รูปช่าง" class="avatar" />

        <!-- ถ้า editMode = false แสดงเป็นข้อความ -->
        <div v-if="!editMode">
          <h2>{{ technician.name }}</h2>
          <p><strong>ตำแหน่ง:</strong> {{ technician.role }}</p>
          <p><strong>เบอร์โทร:</strong> {{ technician.phone }}</p>
          <p><strong>อีเมล:</strong> {{ technician.email }}</p>
          <p><strong>ประสบการณ์:</strong> {{ technician.experience }} ปี</p>

          <button class="edit-btn" @click="editMode = true">แก้ไขโปรไฟล์</button>
        </div>

        <!-- ถ้า editMode = true แสดงฟอร์มแก้ไข -->
        <div v-else>
          <input type="text" v-model="technician.name" placeholder="ชื่อ" />
          <input type="text" v-model="technician.role" placeholder="ตำแหน่ง" />
          <input type="text" v-model="technician.phone" placeholder="เบอร์โทร" />
          <input type="email" v-model="technician.email" placeholder="อีเมล" />
          <input type="number" v-model="technician.experience" placeholder="ประสบการณ์ (ปี)" />

          <div class="button-group">
            <button class="save-btn" @click="saveProfile">บันทึก</button>
            <button class="cancel-btn" @click="cancelEdit">ยกเลิก</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Navtech from '../../components/Navtech.vue';


export default {
  name: 'TechnicianProfile',
  components: { Navtech },
  data() {
    return {
      editMode: false,
      technician: {
        avatar: 'https://i.pravatar.cc/150?img=12',
        name: 'สมชาย ใจดี',
        role: 'ช่างซ่อมทั่วไป',
        phone: '081-234-5678',
        email: 'somchai@example.com',
        experience: 5
      },
      backupTechnician: {} // สำรองข้อมูลก่อนแก้ไข
    }
  },
  methods: {
    saveProfile() {
      this.editMode = false;
      alert('บันทึกข้อมูลเรียบร้อยแล้ว!');
      // ที่นี่สามารถเรียก API เพื่อบันทึกลงเซิร์ฟเวอร์ได้
    },
    cancelEdit() {
      this.technician = { ...this.backupTechnician }; // คืนค่าเดิม
      this.editMode = false;
    }
  },
  watch: {
    editMode(newVal) {
      if (newVal) {
        // เก็บข้อมูลเดิมก่อนแก้ไข
        this.backupTechnician = { ...this.technician };
      }
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
  text-align: center;
}

/* Header */
.header {
  margin-bottom: 40px;
}

.header h1 {
  font-size: 2em;
  margin-bottom: 5px;
  color: #333;
}

.header p {
  color: #666;
}

/* Profile Card */
.profile-card {
  display: inline-block;
  background: #fff;
  border-radius: 20px;
  padding: 30px 40px;
  box-shadow: 0 6px 20px rgba(0,0,0,0.1);
  text-align: center;
}

.avatar {
  width: 140px;
  height: 140px;
  border-radius: 50%;
  object-fit: cover;
  border: 3px solid #007bff;
  margin-bottom: 20px;
}

.profile-card h2 {
  color: #007bff;
  margin-bottom: 15px;
}

.profile-card p {
  color: #555;
  margin: 5px 0;
}

/* ฟอร์ม input */
.profile-card input {
  width: 80%;
  padding: 10px;
  margin: 8px 0;
  border-radius: 8px;
  border: 1px solid #ccc;
}

.button-group {
  margin-top: 15px;
}

.save-btn {
  padding: 10px 20px;
  background-color: #28a745;
  color: #fff;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  margin-right: 10px;
}

.save-btn:hover {
  background-color: #218838;
}

.cancel-btn {
  padding: 10px 20px;
  background-color: #dc3545;
  color: #fff;
  border: none;
  border-radius: 10px;
  cursor: pointer;
}

.cancel-btn:hover {
  background-color: #c82333;
}

/* Responsive */
@media (max-width: 768px) {
  .content-wrapper {
    margin-left: 0;
    padding: 15px;
  }
  .profile-card {
    width: 90%;
    padding: 25px 20px;
  }
  .profile-card input {
    width: 90%;
  }
}
</style>

<template>
  <div class="page-container">
    <Navcust />
    <div class="content-wrapper">
      <header class="header">
        <h1 class="gradient-text">โปรไฟล์ของฉัน</h1>
        <p class="subtitle">จัดการข้อมูลส่วนตัวและที่อยู่ของคุณ</p>
      </header>

      <div class="profile-card">
        <div class="profile-avatar">
          <div class="avatar-circle"> <span class="avatar-icon">👤</span> </div>
          <h2 class="profile-name">{{ user.NAME }}</h2>
        </div>
        <div class="profile-details">
          <div class="profile-item">
            <div class="item-icon">📧</div>
            <div class="item-content">
              <label>อีเมล</label>
              <span>{{ user.EMAIL }}</span>
            </div>
          </div>
          <div class="profile-item">
            <div class="item-icon">📱</div>
            <div class="item-content">
              <label>เบอร์โทร</label>
              <span>{{ user.PHONE }}</span>
            </div>
          </div>
        </div>
      </div>
      <div class="location-card">
        <h2 class="location-title">ที่อยู่ของฉัน</h2>
        
        <div v-if="locations.length > 0" class="location-list">
          <div v-for="loc in locations" :key="loc.LOCATION_ID" class="profile-item">
            <div class="item-icon">📍</div>
            <div class="item-content">
              <label>{{ loc.LOCANAME }}</label> <span>{{ loc.ADDRESS }}</span> </div>
            </div>
        </div>
        
        <div v-if="locations.length === 0 && !isLoading" class="no-location">
          <p>คุณยังไม่ได้เพิ่มที่อยู่</p>
        </div>

        <button class="edit-button" @click="showAddForm = !showAddForm">
          <span class="button-icon">➕</span>
          <span>{{ showAddForm ? 'ซ่อนฟอร์ม' : 'เพิ่มที่อยู่ใหม่' }}</span>
        </button>

        <form v-if="showAddForm" @submit.prevent="addLocation" class="add-location-form">
          <h3>เพิ่มที่อยู่ใหม่</h3>
          <div class="form-group">
            <label>ชื่อที่อยู่ (เช่น บ้าน, คอนโด)</label>
            <input v-model="newLocation.locaname" placeholder="เช่น 'บ้านของฉัน'" required>
          </div>
          <div class="form-group">
            <label>ที่อยู่ (เต็ม)</label>
            <textarea v-model="newLocation.address" placeholder="123 ถนน..." required></textarea>
          </div>
          
          <p v-if="message" :class="isError ? 'error-msg' : 'success-msg'">{{ message }}</p>
          
          <button type="submit" class="submit-button">บันทึกที่อยู่</button>
        </form>

      </div>
      </div>
  </div>
</template>

<script>
import Navcust from '../../components/Navcust.vue';
import axios from 'axios';

export default {
  name: 'Profile',
  components: { Navcust },
  data() {
    return {
      // 1. ข้อมูล User
      user: {
        NAME: 'กำลังโหลด...',
        EMAIL: '...',
        PHONE: '...',
      },
      // ⭐️ 2. ข้อมูล "ลิสต์" ที่อยู่ (ต้องเป็น Array [])
      locations: [],
      isLoading: true,
      
      // ⭐️ 3. ฟอร์มเพิ่มที่อยู่
      showAddForm: false,
      newLocation: {
        locaname: '',
        address: ''
      },
      message: '',
      isError: false
    }
  },
  
  async created() {
    // ⭐️ เช็ก Session (เหมือนเดิม)
    const loggedInUser = JSON.parse(localStorage.getItem('user'));
    if (!loggedInUser || loggedInUser.role !== 'user') {
      this.$router.push('/login');
      return;
    }
    
    // ⭐️ 4. "ยิง API 2 ครั้ง" (พร้อมกัน)
    this.fetchProfileData();
    this.fetchLocations();
  },
  
  methods: {
    // ⭐️ 5. "แยก" ฟังก์ชันดึงข้อมูล
    async fetchProfileData() {
      try {
        const response = await axios.get('http://localhost:3000/api/profile/user', {
          withCredentials: true 
        });
        this.user = response.data;
      } catch (error) {
        this.handleApiError(error);
      }
    },
    
    async fetchLocations() {
      this.isLoading = true;
      try {
        // ⭐️ ยิงไป API /api/locations
        const response = await axios.get('http://localhost:3000/api/locations', {
          withCredentials: true 
        });
        this.locations = response.data; // ⭐️ รับ "ลิสต์" (Array)
        this.isLoading = false;
      } catch (error) {
        this.handleApiError(error);
      }
    },
    
    // ⭐️ 6. "ฟังก์ชัน" สำหรับปุ่ม "เพิ่มที่อยู่"
    async addLocation() {
      this.message = 'กำลังบันทึก...';
      this.isError = false;
      try {
        // ⭐️ ยิงไป API /api/locations/add
        const response = await axios.post('http://localhost:3000/api/locations/add', {
          LOCANAME: this.newLocation.locaname,
          ADDRESS: this.newLocation.address
        }, {
          withCredentials: true
        });
        
        this.message = response.data.message; // "เพิ่มที่อยู่สำเร็จ!"
        
        // "เคลียร์" ฟอร์ม
        this.newLocation.locaname = '';
        this.newLocation.address = '';
        this.showAddForm = false;
        
        // ⭐️ "รีเฟรช" ลิสต์ที่อยู่ใหม่
        this.fetchLocations();
        
      } catch (error) {
        this.isError = true;
        if (error.response) {
          this.message = 'Error: ' + error.response.data.message;
        } else {
          this.message = 'Error: เชื่อมต่อ Backend ไม่ได้';
        }
      }
    },
    
    // (ฟังก์ชันดัก Error รวม)
    handleApiError(error) {
      if (error.response && error.response.status === 401) {
        alert('Session หมดอายุ กรุณาล็อกอินใหม่');
        localStorage.removeItem('user');
        this.$router.push('/login');
      } else {
        this.user.NAME = "Error: ไม่สามารถโหลดข้อมูลได้";
      }
    }
    // (ฟังก์ชัน editProfile (ปุ่มเก่า) เราลบออก)
  }
}
</script>

<style scoped>
/* (CSS ของ Profile Card... เหมือนเดิม) */
.page-container { min-height: 100vh; background: linear-gradient(135deg, #000000 0%, #1a1a1a 100%); font-family: 'Space Grotesk', sans-serif; }
.content-wrapper { margin-left: 250px; padding: 3rem 2rem; min-height: 100vh; display: flex; flex-direction: column; align-items: center; }
.header { text-align: center; margin-bottom: 3rem; animation: fadeInDown 0.8s ease; }
@keyframes fadeInDown { from { opacity: 0; transform: translateY(-30px); } to { opacity: 1; transform: translateY(0); } }
.gradient-text { font-size: 3rem; font-weight: 900; margin-bottom: 1rem; background: linear-gradient(135deg, #ff007f 0%, #ff66b2 50%, #ffc400 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; filter: drop-shadow(0 0 20px rgba(255, 0, 127, 0.5)); }
.subtitle { color: rgba(255, 255, 255, 0.8); font-size: 1.2rem; }
.profile-card { width: 100%; max-width: 600px; background: linear-gradient(135deg, rgba(26, 26, 26, 0.9), rgba(0, 0, 0, 0.9)); backdrop-filter: blur(10px); border-radius: 25px; padding: 3rem 2.5rem; box-shadow: 0 15px 50px rgba(255, 0, 127, 0.2); border: 1px solid rgba(255, 0, 127, 0.3); animation: fadeInUp 0.8s ease; }
@keyframes fadeInUp { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }
.profile-avatar { text-align: center; margin-bottom: 2.5rem; }
.avatar-circle { width: 120px; height: 120px; margin: 0 auto 1.5rem; border-radius: 50%; background: linear-gradient(135deg, #ff007f, #ff66b2); display: flex; align-items: center; justify-content: center; box-shadow: 0 10px 30px rgba(255, 0, 127, 0.4); animation: pulse 2s ease-in-out infinite; }
@keyframes pulse { 0%, 100% { box-shadow: 0 10px 30px rgba(255, 0, 127, 0.4); } 50% { box-shadow: 0 10px 40px rgba(255, 0, 127, 0.6); } }
.avatar-icon { font-size: 4rem; filter: drop-shadow(0 0 10px rgba(255, 255, 255, 0.5)); }
.profile-name { color: #fff; font-size: 2rem; font-weight: 700; margin: 0; }
.profile-details { margin-bottom: 2rem; }
.profile-item { display: flex; align-items: center; gap: 1.5rem; padding: 1.5rem; margin-bottom: 1rem; background: rgba(255, 255, 255, 0.05); border-radius: 15px; border: 1px solid rgba(255, 255, 255, 0.1); transition: all 0.3s ease; }
.profile-item:hover { background: rgba(255, 0, 127, 0.1); border-color: rgba(255, 0, 127, 0.3); transform: translateX(5px); }
.item-icon { font-size: 2rem; width: 50px; height: 50px; display: flex; align-items: center; justify-content: center; background: linear-gradient(135deg, rgba(255, 0, 127, 0.2), rgba(255, 0, 127, 0.1)); border-radius: 12px; }
.item-content { flex: 1; display: flex; flex-direction: column; gap: 0.3rem; }
.item-content label { font-size: 0.85rem; color: rgba(255, 255, 255, 0.6); font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; }
.item-content span { font-size: 1.1rem; color: #fff; font-weight: 500; }
.edit-button { width: 100%; padding: 1.2rem; background: linear-gradient(135deg, #ff007f, #ff4da6); color: #fff; font-size: 1.1rem; font-weight: 700; border: none; border-radius: 15px; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 0.8rem; transition: all 0.3s ease; box-shadow: 0 0 20px rgba(255, 0, 127, 0.4); }
.edit-button:hover { transform: translateY(-3px); box-shadow: 0 10px 30px rgba(255, 0, 127, 0.6); background: linear-gradient(135deg, #ff4da6, #ff007f); }
.button-icon { font-size: 1.3rem; }

/* ⭐️⭐️ 3. "เพิ่ม" CSS สำหรับส่วนที่อยู่ ⭐️⭐️ */
.location-card {
  width: 100%;
  max-width: 600px;
  background: linear-gradient(135deg, rgba(26, 26, 26, 0.9), rgba(0, 0, 0, 0.9));
  backdrop-filter: blur(10px);
  border-radius: 25px;
  padding: 2.5rem;
  box-shadow: 0 15px 50px rgba(0, 123, 255, 0.2);
  border: 1px solid rgba(0, 123, 255, 0.3);
  margin-top: 2rem;
  animation: fadeInUp 1s ease 0.2s; /* Delay animation */
}
.location-title {
  color: #fff;
  font-size: 1.8rem;
  font-weight: 700;
  margin-top: 0;
  margin-bottom: 2rem;
  text-align: center;
  border-bottom: 1px solid rgba(0, 123, 255, 0.3);
  padding-bottom: 1rem;
}
.location-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 2rem;
}
.no-location {
  text-align: center;
  color: rgba(255, 255, 255, 0.5);
  font-size: 1.1rem;
  padding: 2rem 0;
}
.add-location-form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  margin-top: 2rem;
  padding-top: 2rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}
.add-location-form h3 {
  color: #fff;
  margin: 0;
  text-align: center;
  font-size: 1.4rem;
}
.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}
.form-group label {
  color: rgba(255, 255, 255, 0.7);
  font-weight: 600;
  font-size: 0.9rem;
}
.form-group input,
.form-group textarea {
  width: 100%;
  padding: 1rem;
  background: rgba(0, 0, 0, 0.4);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 12px;
  color: #ffffff;
  font-size: 1rem;
  font-family: inherit;
  transition: all 0.3s ease;
  outline: none;
}
.form-group textarea {
  min-height: 100px;
  resize: vertical;
}
.form-group input:focus,
.form-group textarea:focus {
  border-color: #007bff;
  box-shadow: 0 0 15px rgba(0, 123, 255, 0.3);
}
.submit-button {
  padding: 1rem;
  background: linear-gradient(135deg, #007bff, #0056b3);
  color: #fff;
  font-size: 1rem;
  font-weight: 700;
  border: none;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s ease;
}
.submit-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(0, 123, 255, 0.4);
}
.error-msg {
  color: #ff4d4d;
  text-align: center;
}
.success-msg {
  color: #29e083;
  text-align: center;
}
/* (Responsive) */
@media (max-width: 768px) {
  .content-wrapper { margin-left: 0; padding: 2rem 1rem; padding-bottom: 100px; }
  .gradient-text { font-size: 2rem; }
  .profile-card { padding: 2rem 1.5rem; }
  .location-card { padding: 2rem 1.5rem; }
  .avatar-circle { width: 100px; height: 100px; }
  .avatar-icon { font-size: 3rem; }
  .profile-name { font-size: 1.6rem; }
  .profile-item { padding: 1rem; }
  .item-content span { font-size: 1rem; }
}
</style>
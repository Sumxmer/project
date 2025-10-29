<template>
  <div class="page-container">
    <Navcust />
    <div class="content-wrapper">
      <header class="header">
        <h1 class="gradient-text">โปรไฟล์ของฉัน</h1>
        <p class="subtitle">จัดการข้อมูลส่วนตัวของคุณ</p>
      </header>

      <div class="profile-card">
        <div class="profile-avatar">
          <div class="avatar-circle">
            <span class="avatar-icon">👤</span>
          </div>
          <h2 class="profile-name">{{ user.name }}</h2>
        </div>

        <div class="profile-details">
          <div class="profile-item">
            <div class="item-icon">📧</div>
            <div class="item-content">
              <label>อีเมล</label>
              <span>{{ user.email }}</span>
            </div>
          </div>

          <div class="profile-item">
            <div class="item-icon">📱</div>
            <div class="item-content">
              <label>เบอร์โทร</label>
              <span>{{ user.phone }}</span>
            </div>
          </div>

          <div class="profile-item">
            <div class="item-icon">📍</div>
            <div class="item-content">
              <label>ที่อยู่</label>
              <span>{{ user.address }}</span>
            </div>
          </div>
        </div>

        <button class="edit-button" @click="editProfile">
          <span class="button-icon">✏️</span>
          <span>แก้ไขข้อมูล</span>
        </button>
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
        phone: '081-234-5678',
        address: '123 ถนนสุขุมวิท แขวงคลองเตย เขตคลองเตย กรุงเทพฯ 10110'
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
  display: flex;
  flex-direction: column;
  align-items: center;
}

/* Header */
.header {
  text-align: center;
  margin-bottom: 3rem;
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
  font-size: 1.2rem;
}

/* Profile Card */
.profile-card {
  width: 100%;
  max-width: 600px;
  background: linear-gradient(135deg, rgba(26, 26, 26, 0.9), rgba(0, 0, 0, 0.9));
  backdrop-filter: blur(10px);
  border-radius: 25px;
  padding: 3rem 2.5rem;
  box-shadow: 0 15px 50px rgba(255, 0, 127, 0.2);
  border: 1px solid rgba(255, 0, 127, 0.3);
  animation: fadeInUp 0.8s ease;
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

/* Avatar Section */
.profile-avatar {
  text-align: center;
  margin-bottom: 2.5rem;
}

.avatar-circle {
  width: 120px;
  height: 120px;
  margin: 0 auto 1.5rem;
  border-radius: 50%;
  background: linear-gradient(135deg, #ff007f, #ff66b2);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 10px 30px rgba(255, 0, 127, 0.4);
  animation: pulse 2s ease-in-out infinite;
}

@keyframes pulse {
  0%, 100% {
    box-shadow: 0 10px 30px rgba(255, 0, 127, 0.4);
  }
  50% {
    box-shadow: 0 10px 40px rgba(255, 0, 127, 0.6);
  }
}

.avatar-icon {
  font-size: 4rem;
  filter: drop-shadow(0 0 10px rgba(255, 255, 255, 0.5));
}

.profile-name {
  color: #fff;
  font-size: 2rem;
  font-weight: 700;
  margin: 0;
}

/* Profile Details */
.profile-details {
  margin-bottom: 2rem;
}

.profile-item {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  padding: 1.5rem;
  margin-bottom: 1rem;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 15px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: all 0.3s ease;
}

.profile-item:hover {
  background: rgba(255, 0, 127, 0.1);
  border-color: rgba(255, 0, 127, 0.3);
  transform: translateX(5px);
}

.item-icon {
  font-size: 2rem;
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, rgba(255, 0, 127, 0.2), rgba(255, 0, 127, 0.1));
  border-radius: 12px;
}

.item-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
}

.item-content label {
  font-size: 0.85rem;
  color: rgba(255, 255, 255, 0.6);
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.item-content span {
  font-size: 1.1rem;
  color: #fff;
  font-weight: 500;
}

/* Edit Button */
.edit-button {
  width: 100%;
  padding: 1.2rem;
  background: linear-gradient(135deg, #ff007f, #ff4da6);
  color: #fff;
  font-size: 1.1rem;
  font-weight: 700;
  border: none;
  border-radius: 15px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.8rem;
  transition: all 0.3s ease;
  box-shadow: 0 0 20px rgba(255, 0, 127, 0.4);
}

.edit-button:hover {
  transform: translateY(-3px);
  box-shadow: 0 10px 30px rgba(255, 0, 127, 0.6);
  background: linear-gradient(135deg, #ff4da6, #ff007f);
}

.button-icon {
  font-size: 1.3rem;
}

/* Responsive */
@media (max-width: 768px) {
  .content-wrapper {
    margin-left: 0;
    padding: 2rem 1rem;
    padding-bottom: 100px;
  }

  .gradient-text {
    font-size: 2rem;
  }

  .profile-card {
    padding: 2rem 1.5rem;
  }

  .avatar-circle {
    width: 100px;
    height: 100px;
  }

  .avatar-icon {
    font-size: 3rem;
  }

  .profile-name {
    font-size: 1.6rem;
  }

  .profile-item {
    padding: 1rem;
  }

  .item-content span {
    font-size: 1rem;
  }
}
</style>
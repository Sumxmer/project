<template>
  <div class="profile-page">
    <Navtech />
    
    <!-- Wrapper หลักที่มี margin สำหรับ sidebar -->
    <div class="content-wrapper">
      
      <!-- ส่วนหัวของหน้า -->
      <header class="header">
        <div class="header-content">
          <div class="header-icon">👤</div>
          <h1 class="hero-text">โปรไฟล์ช่าง</h1>
          <p class="hero-subtitle">จัดการข้อมูลส่วนตัวของคุณ</p>
        </div>
      </header>

      <!-- การ์ดโปรไฟล์หลัก -->
      <div class="profile-container">
        <div class="profile-card">
          
          <!-- ส่วนรูปโปรไฟล์ -->
          <div class="avatar-section">
            <div class="avatar-wrapper">
              <img :src="technician.avatar" alt="รูปช่าง" class="avatar" />
              <div class="avatar-ring"></div>
            </div>
            <div class="status-badge">
              <span class="status-dot"></span>
              <span class="status-text">ออนไลน์</span>
            </div>
          </div>

          <!-- โหมดแสดงข้อมูล (ไม่ใช่โหมดแก้ไข) -->
          <div v-if="!editMode" class="view-mode">
            <h2 class="technician-name">{{ technician.name }}</h2>
            
            <div class="info-grid">
              <!-- แต่ละช่องข้อมูลจะแสดงด้วย icon และข้อความ -->
              <div class="info-item">
                <span class="info-icon">💼</span>
                <div class="info-content">
                  <span class="info-label">ตำแหน่ง</span>
                  <span class="info-value">{{ technician.role }}</span>
                </div>
              </div>

              <div class="info-item">
                <span class="info-icon">📱</span>
                <div class="info-content">
                  <span class="info-label">เบอร์โทร</span>
                  <span class="info-value">{{ technician.phone }}</span>
                </div>
              </div>

              <div class="info-item">
                <span class="info-icon">📧</span>
                <div class="info-content">
                  <span class="info-label">อีเมล</span>
                  <span class="info-value">{{ technician.email }}</span>
                </div>
              </div>

              <div class="info-item">
                <span class="info-icon">⭐</span>
                <div class="info-content">
                  <span class="info-label">ประสบการณ์</span>
                  <span class="info-value">{{ technician.experience }} ปี</span>
                </div>
              </div>
            </div>

            <!-- ปุ่มเข้าสู่โหมดแก้ไข -->
            <button class="edit-btn" @click="enterEditMode">
              <span>แก้ไขโปรไฟล์</span>
              <span class="btn-icon">✏️</span>
            </button>
          </div>

          <!-- โหมดแก้ไขข้อมูล -->
          <div v-else class="edit-mode">
            <h2 class="edit-title">แก้ไขข้อมูลโปรไฟล์</h2>
            
            <!-- ฟอร์มสำหรับแก้ไขข้อมูล -->
            <div class="form-group">
              <label>
                <span class="label-icon">👤</span>
                <span class="label-text">ชื่อ-นามสกุล</span>
              </label>
              <input 
                type="text" 
                v-model="technician.name" 
                placeholder="กรอกชื่อ-นามสกุล"
                class="form-input"
              />
            </div>

            <div class="form-group">
              <label>
                <span class="label-icon">💼</span>
                <span class="label-text">ตำแหน่ง</span>
              </label>
              <input 
                type="text" 
                v-model="technician.role" 
                placeholder="กรอกตำแหน่ง"
                class="form-input"
              />
            </div>

            <div class="form-group">
              <label>
                <span class="label-icon">📱</span>
                <span class="label-text">เบอร์โทรศัพท์</span>
              </label>
              <input 
                type="tel" 
                v-model="technician.phone" 
                placeholder="กรอกเบอร์โทร"
                class="form-input"
              />
            </div>

            <div class="form-group">
              <label>
                <span class="label-icon">📧</span>
                <span class="label-text">อีเมล</span>
              </label>
              <input 
                type="email" 
                v-model="technician.email" 
                placeholder="กรอกอีเมล"
                class="form-input"
              />
            </div>

            <div class="form-group">
              <label>
                <span class="label-icon">⭐</span>
                <span class="label-text">ประสบการณ์ (ปี)</span>
              </label>
              <input 
                type="number" 
                v-model.number="technician.experience" 
                placeholder="กรอกจำนวนปี"
                class="form-input"
                min="0"
              />
            </div>

            <!-- กลุ่มปุ่มบันทึกและยกเลิก -->
            <div class="button-group">
              <button class="save-btn" @click="saveProfile">
                <span>บันทึกข้อมูล</span>
                <span class="btn-icon">✓</span>
              </button>
              <button class="cancel-btn" @click="cancelEdit">
                <span>ยกเลิก</span>
                <span class="btn-icon">✕</span>
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>

    <!-- แถบ gradient ที่ด้านล่างสุด -->
    <div class="gradient-footer"></div>
  </div>
</template>

<script>
import Navtech from '../../components/Navtech.vue';

export default {
  name: 'TechnicianProfile',
  components: { Navtech },
  
  data() {
    return {
      // สถานะว่าอยู่ในโหมดแก้ไขหรือไม่
      editMode: false,
      
      // ข้อมูลช่าง
      technician: {
        avatar: 'https://i.pravatar.cc/150?img=12',
        name: 'สมชาย ใจดี',
        role: 'ช่างซ่อมทั่วไป',
        phone: '081-234-5678',
        email: 'somchai@example.com',
        experience: 5
      },
      
      // เก็บข้อมูลสำรองก่อนแก้ไข เผื่อกดยกเลิก
      backupTechnician: {}
    }
  },
  
  methods: {
    /**
     * เข้าสู่โหมดแก้ไข และสำรองข้อมูลเดิมไว้
     */
    enterEditMode() {
      this.backupTechnician = { ...this.technician };
      this.editMode = true;
    },
    
    /**
     * บันทึกข้อมูลที่แก้ไข
     * ในระบบจริงควรส่งข้อมูลไป API เพื่อบันทึกลงฐานข้อมูล
     */
    saveProfile() {
      // ตรวจสอบความถูกต้องของข้อมูลก่อนบันทึก
      if (!this.technician.name || !this.technician.email) {
        alert('กรุณากรอกข้อมูลให้ครบถ้วน');
        return;
      }
      
      // ออกจากโหมดแก้ไข
      this.editMode = false;
      
      // แสดงข้อความยืนยัน
      this.showNotification('บันทึกข้อมูลเรียบร้อยแล้ว! ✓');
      
      // ในระบบจริง ควรเรียก API ตรงนี้
      // await this.updateTechnicianProfile(this.technician);
    },
    
    /**
     * ยกเลิกการแก้ไข และคืนค่าข้อมูลเดิม
     */
    cancelEdit() {
      this.technician = { ...this.backupTechnician };
      this.editMode = false;
      this.showNotification('ยกเลิกการแก้ไขแล้ว');
    },
    
    /**
     * แสดงข้อความแจ้งเตือนแบบสวยงาม
     * @param {string} message - ข้อความที่ต้องการแสดง
     */
    showNotification(message) {
      // ในอนาคตอาจใช้ component แจ้งเตือนที่สวยงามกว่า
      alert(message);
    }
  }
}
</script>

<style scoped>
/* ====================================
   Base Page Styles
   ==================================== */

.profile-page {
  min-height: 100vh;
  width: 100%;
  background: linear-gradient(135deg, #0f0f0f 0%, #1a1a1a 50%, #0f0f0f 100%);
  color: #ffffff;
  position: absolute;
  font-family: 'Sarabun', 'Prompt', -apple-system, BlinkMacSystemFont, sans-serif;
}

/* สร้าง particle effect พื้นหลังแบบนุ่มนวล */
.profile-page::before {
  content: '';
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: 
    radial-gradient(circle at 20% 30%, rgba(255, 0, 127, 0.1), transparent 50%),
    radial-gradient(circle at 80% 70%, rgba(255, 196, 0, 0.1), transparent 50%),
    radial-gradient(circle at 40% 80%, rgba(0, 123, 255, 0.08), transparent 50%);
  pointer-events: none;
  z-index: 0;
}

/* ====================================
   Content Wrapper
   ==================================== */

.content-wrapper {
  margin-left: 220px;
  padding: 100px 40px 80px;
  max-width: 2000px;
  position: relative;
  z-index: 1;
}

/* ====================================
   Header Section
   ==================================== */

.header {
  margin-bottom: 3rem;
}

.header-content {
  text-align: center;
  padding-bottom: 2rem;
  border-bottom: 1px solid rgba(255, 0, 127, 0.2);
}

.header-icon {
  font-size: 3.5rem;
  margin-bottom: 1rem;
  display: inline-block;
  filter: drop-shadow(0 0 20px rgba(255, 0, 127, 0.4));
}

.hero-text {
  font-size: 3rem;
  font-weight: 800;
  margin: 0 0 1rem;
  background: linear-gradient(135deg, #ff007f 0%, #ff66b2 50%, #ffc400 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  letter-spacing: -0.5px;
}

.hero-subtitle {
  font-size: 1.2rem;
  color: rgba(255, 255, 255, 0.7);
  margin: 0;
  font-weight: 300;
}

/* ====================================
   Profile Container
   ==================================== */

.profile-container {
  display: flex;
  justify-content: center;
  align-items: center;
}

.profile-card {
  background: rgba(20, 20, 20, 0.8);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 0, 127, 0.3);
  border-radius: 24px;
  padding: 3rem;
  max-width: 600px;
  width: 100%;
  box-shadow: 
    0 8px 32px rgba(0, 0, 0, 0.4),
    0 0 60px rgba(255, 0, 127, 0.1);
  transition: all 0.3s ease;
}

.profile-card:hover {
  border-color: rgba(255, 0, 127, 0.5);
  box-shadow: 
    0 12px 48px rgba(0, 0, 0, 0.5),
    0 0 80px rgba(255, 0, 127, 0.15);
}

/* ====================================
   Avatar Section
   ==================================== */

.avatar-section {
  text-align: center;
  margin-bottom: 2rem;
  position: relative;
}

.avatar-wrapper {
  position: relative;
  display: inline-block;
  margin-bottom: 1rem;
}

.avatar {
  width: 160px;
  height: 160px;
  border-radius: 50%;
  object-fit: cover;
  border: 4px solid #ff007f;
  box-shadow: 
    0 0 30px rgba(255, 0, 127, 0.4),
    0 8px 24px rgba(0, 0, 0, 0.3);
  position: relative;
  z-index: 2;
  transition: all 0.3s ease;
}

.profile-card:hover .avatar {
  transform: scale(1.05);
  box-shadow: 
    0 0 40px rgba(255, 0, 127, 0.6),
    0 12px 32px rgba(0, 0, 0, 0.4);
}

/* วงแหวนรอบรูปโปรไฟล์ */
.avatar-ring {
  position: absolute;
  top: -8px;
  left: -8px;
  right: -8px;
  bottom: -8px;
  border-radius: 50%;
  border: 2px solid transparent;
  background: linear-gradient(135deg, #ff007f, #ffc400, #ff007f);
  background-clip: padding-box;
  opacity: 0.3;
  z-index: 1;
}

/* Status Badge */
.status-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1.2rem;
  background: rgba(41, 224, 131, 0.15);
  border: 1px solid rgba(41, 224, 131, 0.3);
  border-radius: 20px;
  color: #29e083;
  font-size: 0.9rem;
  font-weight: 600;
}

.status-dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: #29e083;
  box-shadow: 0 0 10px rgba(41, 224, 131, 0.6);
  animation: pulse 2s ease-in-out infinite;
}

@keyframes pulse {
  0%, 100% { opacity: 1; transform: scale(1); }
  50% { opacity: 0.7; transform: scale(1.1); }
}

/* ====================================
   View Mode (แสดงข้อมูล)
   ==================================== */

.view-mode {
  animation: fadeIn 0.4s ease;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

.technician-name {
  font-size: 2rem;
  font-weight: 700;
  text-align: center;
  margin: 0 0 2rem;
  background: linear-gradient(135deg, #ffffff 0%, #ff66b2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

/* Grid สำหรับแสดงข้อมูล */
.info-grid {
  display: grid;
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.info-item {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  padding: 1.2rem;
  background: rgba(0, 0, 0, 0.3);
  border: 1px solid rgba(255, 0, 127, 0.15);
  border-radius: 12px;
  transition: all 0.3s ease;
}

.info-item:hover {
  background: rgba(0, 0, 0, 0.4);
  border-color: rgba(255, 0, 127, 0.3);
  transform: translateX(5px);
}

.info-icon {
  font-size: 1.5rem;
  opacity: 0.8;
  min-width: 32px;
  text-align: center;
}

.info-content {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  flex: 1;
}

.info-label {
  font-size: 0.75rem;
  color: rgba(255, 255, 255, 0.5);
  text-transform: uppercase;
  letter-spacing: 1px;
  font-weight: 600;
}

.info-value {
  color: #ffffff;
  font-size: 1.1rem;
  font-weight: 500;
}

/* ====================================
   Edit Mode (แก้ไขข้อมูล)
   ==================================== */

.edit-mode {
  animation: fadeIn 0.4s ease;
}

.edit-title {
  font-size: 1.5rem;
  font-weight: 700;
  text-align: center;
  margin: 0 0 2rem;
  color: #ff007f;
}

.form-group {
  margin-bottom: 1.5rem;
}

.form-group label {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.6rem;
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.8);
  font-weight: 500;
}

.label-icon {
  font-size: 1.1rem;
}

.label-text {
  text-transform: uppercase;
  letter-spacing: 0.5px;
  font-size: 0.75rem;
}

.form-input {
  width: 100%;
  padding: 1rem 1.2rem;
  background: rgba(0, 0, 0, 0.4);
  border: 1px solid rgba(255, 0, 127, 0.3);
  border-radius: 12px;
  color: #ffffff;
  font-size: 1rem;
  font-family: inherit;
  transition: all 0.3s ease;
  outline: none;
}

.form-input::placeholder {
  color: rgba(255, 255, 255, 0.3);
}

.form-input:focus {
  background: rgba(0, 0, 0, 0.5);
  border-color: #ff007f;
  box-shadow: 
    0 0 0 3px rgba(255, 0, 127, 0.1),
    0 0 20px rgba(255, 0, 127, 0.2);
}

.form-input:hover:not(:focus) {
  border-color: rgba(255, 0, 127, 0.5);
}

/* ====================================
   Buttons
   ==================================== */

.edit-btn {
  width: 100%;
  padding: 1.1rem;
  background: linear-gradient(135deg, #ff007f 0%, #ff4da6 100%);
  border: none;
  color: #ffffff;
  font-size: 1rem;
  font-weight: 700;
  letter-spacing: 0.5px;
  cursor: pointer;
  border-radius: 12px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.6rem;
  transition: all 0.3s ease;
  text-transform: uppercase;
  box-shadow: 0 4px 20px rgba(255, 0, 127, 0.3);
}

.edit-btn:hover {
  background: linear-gradient(135deg, #ff4da6 0%, #ff007f 100%);
  box-shadow: 0 6px 30px rgba(255, 0, 127, 0.5);
  transform: translateY(-2px);
}

.edit-btn:active {
  transform: translateY(0);
}

.button-group {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  margin-top: 2rem;
}

.save-btn,
.cancel-btn {
  padding: 1.1rem;
  border: none;
  font-size: 1rem;
  font-weight: 700;
  letter-spacing: 0.5px;
  cursor: pointer;
  border-radius: 12px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.3s ease;
  text-transform: uppercase;
}

.save-btn {
  background: linear-gradient(135deg, #29e083 0%, #1fc66f 100%);
  color: #ffffff;
  box-shadow: 0 4px 20px rgba(41, 224, 131, 0.3);
}

.save-btn:hover {
  background: linear-gradient(135deg, #1fc66f 0%, #29e083 100%);
  box-shadow: 0 6px 30px rgba(41, 224, 131, 0.5);
  transform: translateY(-2px);
}

.cancel-btn {
  background: rgba(220, 53, 69, 0.2);
  color: #ff6b6b;
  border: 2px solid rgba(220, 53, 69, 0.3);
  box-shadow: 0 4px 20px rgba(220, 53, 69, 0.2);
}

.cancel-btn:hover {
  background: rgba(220, 53, 69, 0.3);
  border-color: rgba(220, 53, 69, 0.5);
  box-shadow: 0 6px 30px rgba(220, 53, 69, 0.3);
  transform: translateY(-2px);
}

.btn-icon {
  font-size: 1.2rem;
}

/* ====================================
   Gradient Footer
   ==================================== */

.gradient-footer {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 3px;
  background: linear-gradient(90deg, 
    #ff007f 0%, 
    #ff9100 25%, 
    #ffc400 50%, 
    #29e083 75%, 
    #007bff 100%
  );
  z-index: 1000;
}

/* ====================================
   Responsive Design
   ==================================== */

@media (max-width: 1024px) {
  .content-wrapper {
    margin-left: 180px;
    padding: 90px 30px 70px;
  }
}

@media (max-width: 768px) {
  .content-wrapper {
    margin-left: 0;
    padding: 80px 20px 60px;
  }

  .hero-text {
    font-size: 2.2rem;
  }

  .hero-subtitle {
    font-size: 1rem;
  }

  .profile-card {
    padding: 2rem 1.5rem;
  }

  .avatar {
    width: 130px;
    height: 130px;
  }

  .technician-name {
    font-size: 1.6rem;
  }

  .button-group {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 480px) {
  .content-wrapper {
    padding: 70px 15px 60px;
  }

  .hero-text {
    font-size: 1.8rem;
  }

  .profile-card {
    padding: 1.5rem 1rem;
  }

  .avatar {
    width: 110px;
    height: 110px;
  }

  .technician-name {
    font-size: 1.4rem;
  }

  .info-item {
    padding: 1rem;
  }

  .form-input {
    padding: 0.9rem 1rem;
  }

  .save-btn,
  .cancel-btn,
  .edit-btn {
    padding: 1rem;
    font-size: 0.9rem;
  }
}

/* ====================================
   Accessibility
   ==================================== */

@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}

.edit-btn:focus-visible,
.save-btn:focus-visible,
.cancel-btn:focus-visible,
.form-input:focus-visible {
  outline: 3px solid #ff007f;
  outline-offset: 2px;
}
</style>
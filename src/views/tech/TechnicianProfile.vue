<template>
  <div class="profile-page">
    <Navtech />
    
    <div class="content-wrapper">
      
      <header class="header">
        <div class="header-content">
          <div class="header-icon">👤</div>
          <h1 class="hero-text">โปรไฟล์ช่าง</h1>
          <p class="hero-subtitle">จัดการข้อมูลส่วนตัวและทักษะของคุณ</p>
        </div>
      </header>

      <div class="profile-layout">
        
        <!-- ⭐ Card 1: Profile -->
        <div class="profile-card">
          <div class="avatar-section">
            <div class="avatar-wrapper">
              <img src="https://i.pravatar.cc/150?img=12" alt="รูปช่าง" class="avatar" />
              <div class="avatar-ring"></div>
            </div>
            <div class="status-badge">
              <span class="status-dot"></span>
              <span class="status-text">ออนไลน์</span>
            </div>
          </div>

          <!-- โหมดดูข้อมูล -->
          <div v-if="!editMode" class="view-mode">
            <h2 class="technician-name">{{ technician.TE_NAME }}</h2>
            <div class="info-grid">
              <div class="info-item">
                <span class="info-icon">💼</span>
                <div class="info-content">
                  <span class="info-label">ตำแหน่ง</span>
                  <span class="info-value">{{ technician.TE_TYPE }}</span>
                </div>
              </div>
              <div class="info-item">
                <span class="info-icon">📱</span>
                <div class="info-content">
                  <span class="info-label">เบอร์โทร</span>
                  <span class="info-value">{{ technician.TPHONE }}</span>
                </div>
              </div>
              <!-- ⭐ แสดงค่าแรง -->
              <div class="info-item">
                <span class="info-icon">💰</span>
                <div class="info-content">
                  <span class="info-label">ค่าแรง/ชั่วโมง</span>
                  <span class="info-value wage-value">{{ formatWage(technician.WAGES) }}</span>
                </div>
              </div>
            </div>
            <button class="edit-btn" @click="enterEditMode">
              <span>แก้ไขโปรไฟล์</span>
              <span class="btn-icon">✏️</span>
            </button>
          </div>

          <!-- โหมดแก้ไข -->
          <div v-else class="edit-mode">
            <h2 class="edit-title">แก้ไขข้อมูลโปรไฟล์</h2>
            
            <div class="form-group">
              <label>
                <span class="label-icon">👤</span>
                <span class="label-text">ชื่อ-นามสกุล</span>
              </label>
              <input type="text" v-model="technician.TE_NAME" class="form-input" placeholder="กรอกชื่อ-นามสกุล" />
            </div>
            
            <div class="form-group">
              <label>
                <span class="label-icon">📱</span>
                <span class="label-text">เบอร์โทรศัพท์</span>
              </label>
              <input type="tel" v-model="technician.TPHONE" class="form-input" placeholder="0812345678" />
            </div>
            
            <!-- ⭐ ฟอร์มค่าแรง -->
            <div class="form-group">
              <label>
                <span class="label-icon">💰</span>
                <span class="label-text">ค่าแรง/ชั่วโมง (บาท)</span>
              </label>
              <input 
                type="number" 
                v-model.number="technician.WAGES" 
                class="form-input"
                min="0"
                step="50"
                placeholder="300"
              />
              <small class="input-hint">💡 แนะนำ: 300-1,000 บาท/ชั่วโมง</small>
            </div>
            
            <p v-if="message" :class="isError ? 'error-msg' : 'success-msg'">{{ message }}</p>
            
            <div class="button-group">
              <button class="save-btn" @click="saveProfile">
                <span>บันทึกข้อมูล</span><span class="btn-icon">✓</span>
              </button>
              <button class="cancel-btn" @click="cancelEdit">
                <span>ยกเลิก</span><span class="btn-icon">✕</span>
              </button>
            </div>
          </div>
        </div>

        <!-- ⭐ Card 2: Skills -->
        <div class="profile-card skills-card">
          
          <!-- โหมดดูทักษะ -->
          <div v-if="!editModeSkills" class="view-mode">
            <h2 class="card-title">
              <span class="title-icon">🛠️</span>
              ทักษะ (Skills) ของฉัน
            </h2>
            
            <div v-if="mySkills.length === 0" class="no-data">
              <p>คุณยังไม่ได้เพิ่มทักษะ</p>
            </div>
            
            <div v-else class="skill-list">
              <span v-for="skill in mySkills" :key="skill.SERVICE_ID" class="skill-tag">
                {{ skill.SERVICE_NAME }}
              </span>
            </div>
            
            <button class="edit-btn skills-edit-btn" @click="enterEditSkills">
              <span>แก้ไขทักษะ</span>
              <span class="btn-icon">🛠️</span>
            </button>
          </div>
          
          <!-- โหมดแก้ไขทักษะ -->
          <div v-else class="edit-mode">
            <h2 class="card-title">
              <span class="title-icon">✨</span>
              เลือกทักษะ (Skills)
            </h2>
            
            <div class="skill-checkbox-list">
              <div v-if="allServices.length === 0" class="loading-text">
                ⏳ กำลังโหลด...
              </div>
              <label v-for="service in allServices" :key="service.SERVICE_ID" class="skill-checkbox">
                <input 
                  type="checkbox" 
                  :value="service.SERVICE_ID"
                  v-model="selectedSkills" 
                />
                <span class="checkbox-label">{{ service.SERVICE_NAME }}</span>
              </label>
            </div>
            
            <p v-if="messageSkills" :class="isErrorSkills ? 'error-msg' : 'success-msg'">{{ messageSkills }}</p>
            
            <div class="button-group">
              <button class="save-btn" @click="saveSkills">
                <span>บันทึกทักษะ</span><span class="btn-icon">✓</span>
              </button>
              <button class="cancel-btn" @click="cancelEditSkills">
                <span>ยกเลิก</span><span class="btn-icon">✕</span>
              </button>
            </div>
          </div>
        </div>
        
      </div>
    </div>

    <div class="gradient-footer"></div>
  </div>
</template>

<script>
import Navtech from '../../components/Navtech.vue';
import axios from 'axios';

export default {
  name: 'TechnicianProfile',
  components: { Navtech },
  
  data() {
    return {
      editMode: false,
      isLoading: true,
      message: '',
      isError: false,
      technician: {
        TE_NAME: 'กำลังโหลด...',
        TE_TYPE: '...',
        TPHONE: '...',
        WAGES: 0
      },
      backupTechnician: {},
      editModeSkills: false,
      mySkills: [],
      allServices: [],
      selectedSkills: [],
      messageSkills: '',
      isErrorSkills: false,
    }
  },
  
  async created() {
    const loggedInUser = JSON.parse(localStorage.getItem('user') || '{}');
    if (!loggedInUser || loggedInUser.role !== 'tech') {
      this.$router.push('/logintech');
      return;
    }
    
    this.fetchProfile();
    this.fetchMySkills();
  },
  
  methods: {
    async fetchProfile() {
      try {
        this.isLoading = true;
        const response = await axios.get('http://localhost:3000/api/tech/profile', {
            withCredentials: true
        });
        this.technician = response.data;
        
        if (response.data['WAGES/HOURS'] !== undefined) {
          this.technician.WAGES = response.data['WAGES/HOURS'];
        }
        
        console.log('💰 ค่าแรงปัจจุบัน:', this.technician.WAGES);
        this.isLoading = false;
      } catch (error) {
        this.isLoading = false;
        this.handleApiError(error);
      }
    },
    
    enterEditMode() {
      this.backupTechnician = { ...this.technician };
      this.message = '';
      this.editMode = true;
    },
    
    async saveProfile() {
      if (!this.technician.TE_NAME || !this.technician.TPHONE) {
        this.message = 'กรุณากรอกข้อมูลให้ครบถ้วน';
        this.isError = true;
        return;
      }
      
      if (this.technician.WAGES < 0) {
        this.message = 'ค่าแรงต้องไม่ติดลบ';
        this.isError = true;
        return;
      }
      
      try {
        this.message = 'กำลังบันทึก...';
        const response = await axios.put('http://localhost:3000/api/tech/profile', 
            {
                TE_NAME: this.technician.TE_NAME,
                TPHONE: this.technician.TPHONE,
                WAGES: this.technician.WAGES || 0
            }, 
            { withCredentials: true }
        );
        this.message = response.data.message;
        this.isError = false;
        this.editMode = false;
        
        await this.fetchProfile();
      } catch (error) {
          this.isError = true;
          this.message = 'เกิดข้อผิดพลาด: ' + (error.response?.data?.message || error.message);
      }
    },
    
    cancelEdit() {
      this.technician = { ...this.backupTechnician };
      this.editMode = false;
      this.message = '';
    },

    formatWage(wage) {
      if (!wage || wage === 0) {
        return '⚠️ ยังไม่ตั้งค่า';
      }
      return parseFloat(wage).toLocaleString('th-TH', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      }) + ' บาท/ชม.';
    },

    async fetchMySkills() {
        try {
            const response = await axios.get('http://localhost:3000/api/tech/my-skills', {
                withCredentials: true
            });
            this.mySkills = response.data;
        } catch (error) {
            this.handleApiError(error);
        }
    },
    
    async fetchAllServices() {
        try {
            const response = await axios.get('http://localhost:3000/api/services', {
                withCredentials: true
            });
            this.allServices = response.data;
        } catch (error) {
            this.handleApiError(error);
        }
    },
    
    async enterEditSkills() {
        this.messageSkills = 'กำลังโหลด...';
        await this.fetchAllServices();
        this.selectedSkills = this.mySkills.map(skill => skill.SERVICE_ID);
        this.messageSkills = '';
        this.editModeSkills = true;
    },

    async saveSkills() {
        this.messageSkills = 'กำลังบันทึกทักษะ...';
        try {
            const response = await axios.put('http://localhost:3000/api/tech/my-skills', 
                { skillIds: this.selectedSkills },
                { withCredentials: true }
            );
            
            this.messageSkills = response.data.message;
            this.isErrorSkills = false;
            
            await this.fetchMySkills();
            this.editModeSkills = false;

        } catch (error) {
            this.isErrorSkills = true;
            this.messageSkills = 'เกิดข้อผิดพลาด: ' + (error.response?.data?.message || error.message);
        }
    },
    
    cancelEditSkills() {
        this.editModeSkills = false;
        this.messageSkills = '';
    },
    
    handleApiError(error) {
        if (error.response && error.response.status === 401) {
            alert('Session หมดอายุ กรุณาล็อกอินใหม่');
            localStorage.removeItem('user');
            this.$router.push('/logintech');
        } else {
            this.message = 'Error: ' + (error.response?.data?.message || error.message);
            this.isError = true;
        }
    }
  }
}
</script>

<style scoped>
/* Base Styles */
.error-msg { color: #ff6b6b; font-size: 0.9rem; text-align: center; margin-top: -0.5rem; margin-bottom: 1rem; }
.success-msg { color: #29e083; font-size: 0.9rem; text-align: center; margin-top: -0.5rem; margin-bottom: 1rem; }
.profile-page { min-height: 100vh; width: 100%; background: linear-gradient(135deg, #0f0f0f 0%, #1a1a1a 50%, #0f0f0f 100%); color: #ffffff; position: relative; font-family: 'Sarabun', 'Prompt', -apple-system, BlinkMacSystemFont, sans-serif; }
.profile-page::before { content: ''; position: fixed; top: 0; left: 0; width: 100%; height: 100%; background-image: radial-gradient(circle at 20% 30%, rgba(255, 0, 127, 0.1), transparent 50%), radial-gradient(circle at 80% 70%, rgba(255, 196, 0, 0.1), transparent 50%), radial-gradient(circle at 40% 80%, rgba(0, 123, 255, 0.08), transparent 50%); pointer-events: none; z-index: 0; }

/* ⭐ แก้ไข Content Wrapper - ไม่ให้ Navbar บัง */
.content-wrapper { 
  margin-left: 220px; 
  padding: 2rem 2.5rem 5rem; /* ลด padding-top */
  max-width: 1400px; /* เพิ่มความกว้าง */
  position: relative; 
  z-index: 1;
  margin-right: auto;
}

.header { margin-bottom: 3rem; }
.header-content { text-align: center; padding-bottom: 2rem; border-bottom: 1px solid rgba(255, 0, 127, 0.2); }
.header-icon { font-size: 3.5rem; margin-bottom: 1rem; display: inline-block; filter: drop-shadow(0 0 20px rgba(255, 0, 127, 0.4)); }
.hero-text { font-size: 3rem; font-weight: 800; margin: 0 0 1rem; background: linear-gradient(135deg, #ff007f 0%, #ff66b2 50%, #ffc400 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; letter-spacing: -0.5px; }
.hero-subtitle { font-size: 1.2rem; color: rgba(255, 255, 255, 0.7); margin: 0; font-weight: 300; }

/* Layout */
.profile-layout {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  margin-top: 2rem; /* เพิ่มระยะห่างจาก header */
}

/* Cards */
.profile-card { background: rgba(20, 20, 20, 0.8); backdrop-filter: blur(20px); border: 1px solid rgba(255, 0, 127, 0.3); border-radius: 24px; padding: 2.5rem; width: 100%; box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4), 0 0 60px rgba(255, 0, 127, 0.1); transition: all 0.3s ease; }
.profile-card:hover { border-color: rgba(255, 0, 127, 0.5); box-shadow: 0 12px 48px rgba(0, 0, 0, 0.5), 0 0 80px rgba(255, 0, 127, 0.15); }
.avatar-section { text-align: center; margin-bottom: 2rem; position: relative; }
.avatar-wrapper { position: relative; display: inline-block; margin-bottom: 1rem; }
.avatar { width: 140px; height: 140px; border-radius: 50%; object-fit: cover; border: 4px solid #ff007f; box-shadow: 0 0 30px rgba(255, 0, 127, 0.4), 0 8px 24px rgba(0, 0, 0, 0.3); position: relative; z-index: 2; transition: all 0.3s ease; }
.profile-card:hover .avatar { transform: scale(1.05); box-shadow: 0 0 40px rgba(255, 0, 127, 0.6), 0 12px 32px rgba(0, 0, 0, 0.4); }
.avatar-ring { position: absolute; top: -8px; left: -8px; right: -8px; bottom: -8px; border-radius: 50%; border: 2px solid transparent; background: linear-gradient(135deg, #ff007f, #ffc400, #ff007f); background-clip: padding-box; opacity: 0.3; z-index: 1; }
.status-badge { display: inline-flex; align-items: center; gap: 0.5rem; padding: 0.5rem 1.2rem; background: rgba(41, 224, 131, 0.15); border: 1px solid rgba(41, 224, 131, 0.3); border-radius: 20px; color: #29e083; font-size: 0.9rem; font-weight: 600; }
.status-dot { width: 10px; height: 10px; border-radius: 50%; background: #29e083; box-shadow: 0 0 10px rgba(41, 224, 131, 0.6); animation: pulse 2s ease-in-out infinite; }
@keyframes pulse { 0%, 100% { opacity: 1; transform: scale(1); } 50% { opacity: 0.7; transform: scale(1.1); } }
.view-mode { animation: fadeIn 0.4s ease; }
@keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
.technician-name { font-size: 1.8rem; font-weight: 700; text-align: center; margin: 0 0 1.5rem; background: linear-gradient(135deg, #ffffff 0%, #ff66b2 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
.info-grid { display: grid; gap: 1.2rem; margin-bottom: 1.5rem; }
.info-item { display: flex; align-items: flex-start; gap: 1rem; padding: 1rem; background: rgba(0, 0, 0, 0.3); border: 1px solid rgba(255, 0, 127, 0.15); border-radius: 12px; transition: all 0.3s ease; }
.info-item:hover { background: rgba(0, 0, 0, 0.4); border-color: rgba(255, 0, 127, 0.3); transform: translateX(5px); }
.info-icon { font-size: 1.5rem; opacity: 0.8; min-width: 32px; text-align: center; }
.info-content { display: flex; flex-direction: column; gap: 0.3rem; flex: 1; }
.info-label { font-size: 0.7rem; color: rgba(255, 255, 255, 0.5); text-transform: uppercase; letter-spacing: 1px; font-weight: 600; }
.info-value { color: #ffffff; font-size: 1rem; font-weight: 500; }

/* ⭐ ค่าแรง */
.wage-value {
  color: #29e083 !important;
  font-weight: 700 !important;
  font-size: 1.1rem !important;
}

/* Forms */
.edit-mode { animation: fadeIn 0.4s ease; }
.edit-title { font-size: 1.4rem; font-weight: 700; text-align: center; margin: 0 0 1.5rem; color: #ff007f; }
.card-title { font-size: 1.4rem; font-weight: 700; text-align: center; margin: 0 0 1.5rem; color: #007bff; display: flex; align-items: center; justify-content: center; gap: 0.5rem; }
.title-icon { font-size: 1.6rem; }
.form-group { margin-bottom: 1.2rem; }
.form-group label { display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.5rem; font-size: 0.85rem; color: rgba(255, 255, 255, 0.8); font-weight: 500; }
.label-icon { font-size: 1rem; }
.label-text { text-transform: uppercase; letter-spacing: 0.5px; font-size: 0.7rem; }
.form-input { width: 100%; padding: 0.9rem 1rem; background: rgba(0, 0, 0, 0.4); border: 1px solid rgba(255, 0, 127, 0.3); border-radius: 12px; color: #ffffff; font-size: 0.95rem; font-family: inherit; transition: all 0.3s ease; outline: none; }
.form-input::placeholder { color: rgba(255, 255, 255, 0.3); }
.form-input:focus { background: rgba(0, 0, 0, 0.5); border-color: #ff007f; box-shadow: 0 0 0 3px rgba(255, 0, 127, 0.1), 0 0 20px rgba(255, 0, 127, 0.2); }
.form-input:hover:not(:focus) { border-color: rgba(255, 0, 127, 0.5); }

.input-hint {
  display: block;
  margin-top: 0.4rem;
  font-size: 0.75rem;
  color: rgba(255, 196, 0, 0.7);
  font-style: italic;
}

/* Buttons */
.edit-btn { width: 100%; padding: 1rem; background: linear-gradient(135deg, #ff007f 0%, #ff4da6 100%); border: none; color: #ffffff; font-size: 0.95rem; font-weight: 700; letter-spacing: 0.5px; cursor: pointer; border-radius: 12px; display: flex; justify-content: center; align-items: center; gap: 0.6rem; transition: all 0.3s ease; text-transform: uppercase; box-shadow: 0 4px 20px rgba(255, 0, 127, 0.3); }
.edit-btn:hover { background: linear-gradient(135deg, #ff4da6 0%, #ff007f 100%); box-shadow: 0 6px 30px rgba(255, 0, 127, 0.5); transform: translateY(-2px); }
.edit-btn:active { transform: translateY(0); }

.skills-edit-btn {
  background: linear-gradient(135deg, #007bff 0%, #0056b3 100%);
  box-shadow: 0 4px 20px rgba(0, 123, 255, 0.3);
}
.skills-edit-btn:hover {
  background: linear-gradient(135deg, #0056b3 0%, #007bff 100%);
  box-shadow: 0 6px 30px rgba(0, 123, 255, 0.5);
}

.button-group { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-top: 1.5rem; }
.save-btn, .cancel-btn { padding: 1rem; border: none; font-size: 0.95rem; font-weight: 700; letter-spacing: 0.5px; cursor: pointer; border-radius: 12px; display: flex; justify-content: center; align-items: center; gap: 0.5rem; transition: all 0.3s ease; text-transform: uppercase; }
.save-btn { background: linear-gradient(135deg, #29e083 0%, #1fc66f 100%); color: #ffffff; box-shadow: 0 4px 20px rgba(41, 224, 131, 0.3); }
.save-btn:hover { background: linear-gradient(135deg, #1fc66f 0%, #29e083 100%); box-shadow: 0 6px 30px rgba(41, 224, 131, 0.5); transform: translateY(-2px); }
.cancel-btn { background: rgba(220, 53, 69, 0.2); color: #ff6b6b; border: 2px solid rgba(220, 53, 69, 0.3); box-shadow: 0 4px 20px rgba(220, 53, 69, 0.2); }
.cancel-btn:hover { background: rgba(220, 53, 69, 0.3); border-color: rgba(220, 53, 69, 0.5); box-shadow: 0 6px 30px rgba(220, 53, 69, 0.3); transform: translateY(-2px); }
.btn-icon { font-size: 1.1rem; }
.gradient-footer { position: fixed; bottom: 0; left: 0; width: 100%; height: 3px; background: linear-gradient(90deg, #ff007f 0%, #ff9100 25%, #ffc400 50%, #29e083 75%, #007bff 100%); z-index: 1000; }

/* Skills */
.skills-card {
  border-color: rgba(0, 123, 255, 0.3);
}
.skills-card:hover {
  border-color: rgba(0, 123, 255, 0.5);
  box-shadow: 0 12px 48px rgba(0, 0, 0, 0.5), 0 0 80px rgba(0, 123, 255, 0.15);
}
.no-data {
  text-align: center;
  color: rgba(255, 255, 255, 0.5);
  padding: 2rem 0;
}
.loading-text {
  text-align: center;
  color: rgba(255, 196, 0, 0.8);
  padding: 1rem;
  font-size: 1rem;
}
.skill-list {
  display: flex;
  flex-wrap: wrap;
  gap: 0.7rem;
  margin-bottom: 1.5rem;
  min-height: 80px;
}
.skill-tag {
  background: rgba(0, 123, 255, 0.15);
  border: 1px solid rgba(0, 123, 255, 0.3);
  color: #007bff;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.85rem;
  font-weight: 600;
}
.skill-checkbox-list {
  display: grid;
  gap: 0.8rem;
  margin-bottom: 1.5rem;
  max-height: 350px;
  overflow-y: auto;
  padding-right: 0.5rem;
}
.skill-checkbox-list::-webkit-scrollbar {
  width: 6px;
}
.skill-checkbox-list::-webkit-scrollbar-thumb {
  background: rgba(0, 123, 255, 0.5);
  border-radius: 3px;
}
.skill-checkbox {
  display: flex;
  align-items: center;
  gap: 0.8rem;
  padding: 0.9rem;
  background: rgba(0, 0, 0, 0.3);
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  cursor: pointer;
  transition: all 0.3s ease;
}
.skill-checkbox:hover {
  background: rgba(0, 123, 255, 0.1);
  border-color: rgba(0, 123, 255, 0.3);
}
.skill-checkbox input[type="checkbox"] {
  width: 1.2em;
  height: 1.2em;
  accent-color: #007bff;
  cursor: pointer;
}
.skill-checkbox .checkbox-label {
  color: rgba(255, 255, 255, 0.8);
  font-weight: 500;
  font-size: 0.9rem;
}
.skill-checkbox input[type="checkbox"]:checked + .checkbox-label {
  color: #007bff;
  font-weight: 700;
}

/* ⭐ Responsive - แก้ไขให้ไม่บัง */
@media (max-width: 900px) {
  .profile-layout {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 1024px) { 
  .content-wrapper { 
    margin-left: 180px; 
    padding: 2rem 2rem 4rem;
  } 
}

@media (max-width: 768px) { 
  .content-wrapper { 
    margin-left: 0;
    margin-bottom: 80px; /* เว้นที่สำหรับ Bottom Nav */
    padding: 1.5rem 1.5rem 3rem;
    max-width: 100%;
  } 
  .hero-text { font-size: 2.2rem; } 
  .hero-subtitle { font-size: 1rem; } 
  .profile-card { padding: 2rem 1.5rem; } 
  .avatar { width: 120px; height: 120px; } 
  .technician-name { font-size: 1.6rem; } 
  .button-group { grid-template-columns: 1fr; } 
}

@media (max-width: 480px) { 
  .content-wrapper { 
    padding: 1rem 1rem 2.5rem;
    margin-bottom: 70px;
  } 
  .hero-text { font-size: 1.8rem; } 
  .profile-card { padding: 1.5rem 1rem; } 
  .avatar { width: 100px; height: 100px; } 
  .technician-name { font-size: 1.4rem; } 
  .info-item { padding: 0.9rem; } 
  .form-input { padding: 0.8rem 0.9rem; } 
  .save-btn, .cancel-btn, .edit-btn { padding: 0.9rem; font-size: 0.85rem; } 
}

@media (prefers-reduced-motion: reduce) { *, *::before, *::after { animation-duration: 0.01ms !important; animation-iteration-count: 1 !important; transition-duration: 0.01ms !important; } }
.edit-btn:focus-visible, .save-btn:focus-visible, .cancel-btn:focus-visible, .form-input:focus-visible { outline: 3px solid #ff007f; outline-offset: 2px; }

input[type="number"]::-webkit-inner-spin-button,
input[type="number"]::-webkit-outer-spin-button {
  opacity: 1;
}
</style>
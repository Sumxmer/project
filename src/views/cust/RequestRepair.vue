<template>
  <div class="page-container">
    <Navcust />
    <div class="content-wrapper">
      <header class="header">
        <h1 class="gradient-text">แจ้งซ่อม</h1>
        <p class="subtitle">กรอกข้อมูลด้านล่างเพื่อเรียกช่างถึงที่</p>
      </header>

      <div class="form-card">
        <form @submit.prevent="submitRepair">
          
          <div class="form-group">
            <label class="form-label">
              <span class="label-icon">🔧</span>
              <span>เลือกประเภทบริการ</span>
            </label>
            <div class="service-options">
              <label 
                v-for="service in services" 
                :key="service.SERVICE_ID" 
                class="service-card"
                :class="{ 'active': selectedService === service.SERVICE_ID }"
              >
                <input
                  type="radio"
                  :value="service.SERVICE_ID"
                  v-model="selectedService"
                  class="service-radio"
                />
                <div class="service-content">
                  <span class="service-icon">{{ getServiceIcon(service.SERVICE_NAME) }}</span>
                  <span class="service-text">{{ service.SERVICE_NAME }}</span>
                </div>
              </label>
            </div>
          </div>
          
          
          <div class="form-group">
            <label class="form-label">
              <span class="label-icon">🧑‍🔧</span>
              <span>เลือกช่างเทคนิค</span>
            </label>
            <select v-model="selectedTechnician" required class="form-select" 
                    :disabled="!selectedService">
              <option disabled value="">
                {{ !selectedService ? 'กรุณาเลือกบริการก่อน' : (technicians.length > 0 ? 'เลือกช่างที่รับงานนี้' : 'ไม่พบช่างที่รับงานนี้') }}
              </option>
              <option v-for="tech in technicians" :key="tech.TECHNICIAN_ID" :value="tech.TECHNICIAN_ID">
                {{ tech.TE_NAME }} ({{ tech.TE_TYPE }})
              </option>
            </select>
          </div>

          <div class="form-group">
            <label class="form-label">
              <span class="label-icon">📍</span>
              <span>เลือกที่อยู่ (จาก Profile)</span>
            </label>
            <select v-model="selectedLocation" required class="form-select">
              <option disabled value="">
                {{ locations.length > 0 ? 'เลือกที่อยู่ที่บันทึกไว้' : 'กรุณาไปเพิ่มที่อยู่' }}
              </option>
              <option v-for="loc in locations" :key="loc.LOCATION_ID" :value="loc.LOCATION_ID">
                {{ loc.LOCANAME }} ({{ loc.ADDRESS }})
              </option>
            </select>
            <router-link to="/profile" class="add-location-link">
              + ไปหน้าจัดการ/เพิ่มที่อยู่
            </router-link>
          </div>

          <div class="form-group">
            <label class="form-label">
              <span class="label-icon">🎉</span>
              <span>เลือกโปรโมชั่น (ถ้ามี)</span>
            </label>
            <select v-model="selectedPromotion" class="form-select">
              <option value="">
                {{ promotions.length > 0 ? 'ไม่ใช้โปรโมชั่น' : 'ไม่มีโปรโมชั่นที่ใช้ได้' }}
              </option>
              <option v-for="promo in promotions" :key="promo.PROMO_ID" :value="promo.PROMO_ID">
                {{ promo.PROMO_NAME }} (ลด {{ promo.DISCOUNT * 100 }}%)
              </option>
            </select>
          </div>

          <div class="form-group">
            <label class="form-label">
              <span class="label-icon">📝</span>
              <span>รายละเอียดปัญหา</span>
            </label>
            <textarea 
              v-model="description" 
              rows="5" 
              placeholder="กรอกรายละเอียดปัญหา เช่น อาการเสีย สาเหตุที่พบ..." 
              required
              class="form-textarea"
            ></textarea>
          </div>

          <div class="form-row">
            <div class="form-group">
              <label class="form-label">
                <span class="label-icon">📅</span>
                <span>วันที่</span>
              </label>
              <input 
                v-model="date" 
                type="date" 
                required
                class="form-input"
              />
            </div>
            <div class="form-group">
              <label class="form-label">
                <span class="label-icon">🕐</span>
                <span>เวลา</span>
              </label>
              <input 
                v-model="time" 
                type="time" 
                required
                class="form-input"
              />
            </div>
          </div>

          <div class="form-group">
            <label class="form-label">
              <span class="label-icon">📷</span>
              <span>แนบรูปภาพ (สูงสุด 5 ไฟล์)</span>
            </label>
            <div class="upload-area" @click="$refs.fileInput.click()">
              <input 
                type="file" 
                ref="fileInput"
                @change="handleImageUpload" 
                multiple
                accept="image/*"
                style="display: none;"
              />
              <div v-if="images.length === 0" class="upload-placeholder">
                <span class="upload-icon">📁</span>
                <p>คลิกเพื่อเลือกรูปภาพ</p>
                <p class="upload-hint">รองรับไฟล์ JPG, PNG</p>
              </div>
              <div v-else class="uploaded-files">
                <div v-for="(image, index) in images" :key="index" class="file-item">
                  <span>📷 {{ image.name }}</span>
                  <button type="button" @click.stop="removeImage(index)" class="remove-btn">✕</button>
                </div>
              </div>
            </div>
          </div>

          <p v-if="message" :class="isError ? 'error-msg' : 'success-msg'">
            {{ message }}
          </p>
          
          <button type="submit" class="submit-button">
            <span class="button-icon">🚀</span>
            <span>ส่งงานซ่อม</span>
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import Navcust from '../../components/Navcust.vue';
import axios from 'axios';

export default {
  name: 'RequestRepair',
  components: { Navcust },
  data() {
    return {
      description: '',
      date: '',
      time: '',
      locations: [],
      selectedLocation: '', 
      technicians: [], 
      selectedTechnician: '', 
      promotions: [],
      selectedPromotion: '',
      services: [], 
      selectedService: '', 
      
      images: [], // ⭐️ (สำหรับเก็บ File objects)
      
      message: '',
      isError: false,
      isLoading: true,
    }
  },
  
  async created() {
    const loggedInUser = JSON.parse(localStorage.getItem('user'));
    if (!loggedInUser || loggedInUser.role !== 'user') {
      this.$router.push('/login');
      return;
    }
    this.fetchServices();
    this.fetchLocations();
    this.fetchPromotions(); 
  },
  
  watch: {
    selectedService(newServiceId) {
      if (newServiceId) {
        this.fetchFilteredTechnicians(newServiceId);
      }
      this.selectedTechnician = ''; 
    }
  },
  
  methods: {
    getServiceIcon(serviceName) {
      if (serviceName.includes('แอร์')) return '❄️';
      if (serviceName.includes('ประปา')) return '💧';
      if (serviceName.includes('คอม')) return '💻';
      return '🛠️';
    },
    async fetchServices() {
      try {
        const response = await axios.get('http://localhost:3000/api/services', {
          withCredentials: true 
        });
        this.services = response.data;
      } catch (error) {
        this.handleApiError(error);
      }
    },
    async fetchFilteredTechnicians(serviceId) {
      this.technicians = []; 
      try {
        const response = await axios.get(`http://localhost:3000/api/technicians?service_id=${serviceId}`, {
          withCredentials: true 
        });
        this.technicians = response.data;
      } catch (error) {
        this.handleApiError(error);
      }
    },
    async fetchPromotions() {
      try {
        const response = await axios.get('http://localhost:3000/api/promotions', {
          withCredentials: true 
        });
        this.promotions = response.data;
      } catch (error) {
        this.handleApiError(error);
      }
    },
    async fetchLocations() {
      this.isLoading = true;
      try {
        const response = await axios.get('http://localhost:3000/api/locations', {
          withCredentials: true 
        });
        this.locations = response.data;
        this.isLoading = false;
        if (this.locations.length === 1) {
          this.selectedLocation = this.locations[0].LOCATION_ID;
        }
      } catch (error) {
        this.handleApiError(error);
      }
    },
    
    // ⭐️ (ฟังก์ชันจัดการรูปภาพ)
    handleImageUpload(event) {
      const files = Array.from(event.target.files);
      if (this.images.length + files.length > 5) {
        alert('สามารถอัพโหลดได้สูงสุด 5 ไฟล์');
        return;
      }
      this.images.push(...files);
    },
    removeImage(index) {
      this.images.splice(index, 1);
      this.$refs.fileInput.value = ''; 
    },
    
    // ⭐️ "รื้อ" submitRepair() (ใช้ FormData)
    async submitRepair() {
      this.message = 'กำลังส่งข้อมูล...';
      this.isError = false;

      if (!this.selectedTechnician || !this.description || !this.selectedLocation || !this.date || !this.time) {
        this.message = 'กรุณากรอกข้อมูลให้ครบทุกช่อง (ยกเว้นโปรโมชั่น)';
        this.isError = true;
        return;
      }
      
      const formData = new FormData();
      
      formData.append('description', this.description);
      formData.append('location_id', this.selectedLocation);
      formData.append('date', this.date);
      formData.append('time', this.time);
      formData.append('technician_id', this.selectedTechnician);
      formData.append('promo_id', this.selectedPromotion || '');
      
      for (const file of this.images) {
        formData.append('images', file);
      }

      try {
        const response = await axios.post('http://localhost:3000/api/assignment/create', 
          formData, 
          {
            headers: {
              'Content-Type': 'multipart/form-data'
            },
            withCredentials: true
          }
        );
        
        this.message = response.data.message;
        this.isError = false;
        
        // Reset form
        this.description = '';
        this.selectedLocation = (this.locations.length === 1) ? this.locations[0].LOCATION_ID : '';
        this.selectedTechnician = '';
        this.selectedPromotion = '';
        this.selectedService = '';
        this.images = [];
        this.$refs.fileInput.value = '';
        this.date = '';
        this.time = '';
        
        setTimeout(() => {
            this.$router.push('/repair-history');
        }, 2000);

      } catch (error) {
        this.isError = true;
        if (error.response) {
          this.message = 'Error: ' + error.response.data.message;
        } else {
          this.message = 'Error: เชื่อมต่อ Backend ไม่ได้';
        }
      }
    },
    
    handleApiError(error) {
      if (error.response && error.response.status === 401) {
        alert('Session หมดอายุ กรุณาล็อกอินใหม่');
        localStorage.removeItem('user');
        this.$router.push('/login');
      } else {
        console.error("API Error:", error.message);
      }
    }
  }
}
</script>

<style scoped>
/* (CSS ของเดิม... ไม่ต้องแก้) */
.add-location-link { color: #ff007f; text-decoration: none; font-size: 0.9rem; margin-top: 10px; display: inline-block; transition: all 0.3s ease; }
.add-location-link:hover { text-decoration: underline; color: #ff66b2; }
.error-msg { color: #ff4d4d; background: rgba(255, 0, 0, 0.1); border: 1px solid #ff4d4d; padding: 10px; border-radius: 8px; text-align: center; margin-top: 1rem; }
.success-msg { color: #29e083; background: rgba(41, 224, 131, 0.1); border: 1px solid #29e083; padding: 10px; border-radius: 8px; text-align: center; margin-top: 1rem; }
.page-container { min-height: 100vh; background: linear-gradient(135deg, #000000 0%, #1a1a1a 100%); font-family: 'Space Grotesk', sans-serif; }
.content-wrapper { margin-left: 250px; padding: 3rem 2rem; min-height: 100vh; display: flex; flex-direction: column; align-items: center; }
.header { text-align: center; margin-bottom: 3rem; animation: fadeInDown 0.8s ease; }
@keyframes fadeInDown { from { opacity: 0; transform: translateY(-30px); } to { opacity: 1; transform: translateY(0); } }
.gradient-text { font-size: 3rem; font-weight: 900; margin-bottom: 1rem; background: linear-gradient(135deg, #ff007f 0%, #ff66b2 50%, #ffc400 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; filter: drop-shadow(0 0 20px rgba(255, 0, 127, 0.5)); }
.subtitle { color: rgba(255, 255, 255, 0.8); font-size: 1.2rem; }
.form-card { width: 100%; max-width: 700px; background: linear-gradient(135deg, rgba(26, 26, 26, 0.9), rgba(0, 0, 0, 0.9)); backdrop-filter: blur(10px); border-radius: 25px; padding: 3rem 2.5rem; box-shadow: 0 15px 50px rgba(255, 0, 127, 0.2); border: 1px solid rgba(255, 0, 127, 0.3); animation: fadeInUp 0.8s ease; }
@keyframes fadeInUp { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }
.form-group { margin-bottom: 2rem; }
.form-label { display: flex; align-items: center; gap: 0.8rem; margin-bottom: 0.8rem; color: #fff; font-weight: 600; font-size: 1.05rem; }
.label-icon { font-size: 1.4rem; }
.form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem; }
.form-input, .form-select, .form-textarea { width: 100%; padding: 1rem 1.2rem; background: rgba(255, 255, 255, 0.05); border: 1px solid rgba(255, 255, 255, 0.1); border-radius: 12px; color: #fff; font-size: 1rem; font-family: 'Space Grotesk', sans-serif; transition: all 0.3s ease; }
.form-input::placeholder, .form-textarea::placeholder { color: rgba(255, 255, 255, 0.4); }
.form-input:focus, .form-select:focus, .form-textarea:focus { outline: none; border-color: #ff007f; background: rgba(255, 0, 127, 0.05); box-shadow: 0 0 20px rgba(255, 0, 127, 0.2); }
.form-select { cursor: pointer; }
.form-select:disabled { background: rgba(255, 255, 255, 0.02); color: rgba(255, 255, 255, 0.3); cursor: not-allowed; }
.form-textarea { resize: vertical; min-height: 120px; }
.submit-button { width: 100%; padding: 1.2rem; background: linear-gradient(135deg, #ff007f, #ff4da6); color: #fff; font-size: 1.2rem; font-weight: 700; border: none; border-radius: 15px; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 0.8rem; transition: all 0.3s ease; box-shadow: 0 0 20px rgba(255, 0, 127, 0.4); margin-top: 1rem; }
.submit-button:hover { transform: translateY(-3px); box-shadow: 0 10px 30px rgba(255, 0, 127, 0.6); background: linear-gradient(135deg, #ff4da6, #ff007f); }
.button-icon { font-size: 1.5rem; }

/* (CSS "การ์ด" บริการ) */
.service-options { display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 1rem; }
.service-card { cursor: pointer; position: relative; }
.service-radio { position: absolute; opacity: 0; pointer-events: none; }
.service-content { display: flex; flex-direction: column; align-items: center; gap: 0.8rem; padding: 1.5rem 1rem; background: rgba(0, 0, 0, 0.4); border: 2px solid rgba(255, 0, 127, 0.3); border-radius: 16px; transition: all 0.3s ease; }
.service-icon { font-size: 2.5rem; filter: drop-shadow(0 0 10px rgba(255, 0, 127, 0.3)); transition: transform 0.3s ease; }
.service-text { color: rgba(255, 255, 255, 0.8); font-weight: 600; font-size: 1rem; transition: color 0.3s ease; text-align: center; }
.service-card:hover .service-content { border-color: rgba(255, 0, 127, 0.6); background: rgba(255, 0, 127, 0.1); }
.service-card:hover .service-icon { transform: scale(1.1); }
.service-card.active .service-content { background: linear-gradient(135deg, rgba(255, 0, 127, 0.25), rgba(255, 0, 127, 0.15)); border-color: #ff007f; box-shadow: 0 0 30px rgba(255, 0, 127, 0.4); }
.service-card.active .service-text { color: #ff007f; }
.service-card.active .service-icon { transform: scale(1.15); filter: drop-shadow(0 0 20px rgba(255, 0, 127, 0.6)); }

/* ⭐️ (CSS "Upload Area") ⭐️ */
.upload-area {
  width: 100%;
  padding: 2rem;
  background: rgba(255, 255, 255, 0.03);
  border: 2px dashed rgba(255, 255, 255, 0.2);
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s ease;
}
.upload-area:hover {
  border-color: #ff007f;
  background: rgba(255, 0, 127, 0.05);
}
.upload-placeholder { text-align: center; }
.upload-icon { font-size: 3rem; display: block; margin-bottom: 1rem; }
.upload-placeholder p { color: rgba(255, 255, 255, 0.7); margin: 0.5rem 0; }
.upload-hint { font-size: 0.9rem; color: rgba(255, 255, 255, 0.5); }
.uploaded-files { display: flex; flex-direction: column; gap: 0.8rem; }
.file-item { display: flex; justify-content: space-between; align-items: center; padding: 0.8rem 1rem; background: rgba(255, 0, 127, 0.1); border-radius: 8px; color: #fff; }
.remove-btn { background: rgba(255, 0, 0, 0.2); color: #ff4081; border: 1px solid rgba(255, 0, 0, 0.3); border-radius: 50%; width: 30px; height: 30px; cursor: pointer; transition: all 0.3s ease; font-size: 1.2rem; display: flex; align-items: center; justify-content: center; }
.remove-btn:hover { background: rgba(255, 0, 0, 0.4); transform: scale(1.1); }
/* (จบ CSS ใหม่) */

@media (max-width: 768px) { .content-wrapper { margin-left: 0; padding: 2rem 1rem; padding-bottom: 100px; } .gradient-text { font-size: 2rem; } .form-card { padding: 2rem 1.5rem; } .form-row { grid-template-columns: 1fr; gap: 1rem; } .service-options { grid-template-columns: 1fr 1fr; } }
</style>
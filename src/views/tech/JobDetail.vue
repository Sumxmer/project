<template>
  <div class="job-detail-page">
    <Navtech />
    
    <div class="content-wrapper">
      <header class="header">
        <button @click="goBack" class="back-btn">
          <span class="back-icon">←</span>
          <span>กลับ</span>
        </button>
        <h1 class="hero-text">รายละเอียดงานซ่อม</h1>
      </header>

      <!-- Loading State -->
      <div v-if="isLoading" class="loading-container">
        <div class="loader"></div>
        <p>กำลังโหลดข้อมูล...</p>
      </div>

      <!-- Error State -->
      <div v-if="!isLoading && error" class="error-container">
        <div class="error-icon">⚠️</div>
        <p>{{ error }}</p>
        <button @click="goBack" class="btn-secondary">กลับหน้าก่อนหน้า</button>
      </div>

      <!-- Job Detail Content -->
      <div v-if="!isLoading && !error && job" class="job-detail-container">
        
        <!-- Status Card -->
        <div class="status-card">
          <div class="status-header">
            <span class="status-label">สถานะปัจจุบัน</span>
            <span :class="['status-badge', getStatusClass(job.ASTATUS)]">
              {{ getStatusText(job.ASTATUS) }}
            </span>
          </div>
          
          <!-- Status Actions -->
          <div class="status-actions" v-if="job.ASTATUS !== 'Completed'">
            <button 
              v-if="job.ASTATUS === 'Pending'" 
              @click="updateStatus('In Progress')"
              class="btn-action start-btn"
            >
              <span class="btn-icon">🔧</span>
              <span>เริ่มทำงาน</span>
            </button>
            
            <button 
              v-if="job.ASTATUS === 'In Progress'" 
              @click="openCompleteModal"
              class="btn-action complete-btn"
            >
              <span class="btn-icon">✅</span>
              <span>งานเสร็จสิ้น</span>
            </button>
          </div>
        </div>

        <!-- Customer Info Card -->
        <div class="info-card">
          <h2 class="card-title">
            <span class="title-icon">👤</span>
            ข้อมูลลูกค้า
          </h2>
          <div class="info-grid">
            <div class="info-item">
              <span class="info-label">ชื่อลูกค้า</span>
              <span class="info-value">{{ job.CUSTOMER_NAME }}</span>
            </div>
            <div class="info-item">
              <span class="info-label">เบอร์โทร</span>
              <span class="info-value">
                <a :href="`tel:${job.CUSTOMER_PHONE}`" class="phone-link">
                  📞 {{ job.CUSTOMER_PHONE }}
                </a>
              </span>
            </div>
          </div>
        </div>

        <!-- Job Info Card -->
        <div class="info-card">
          <h2 class="card-title">
            <span class="title-icon">📋</span>
            รายละเอียดงาน
          </h2>
          <div class="info-grid">
            <div class="info-item full-width">
              <span class="info-label">คำอธิบาย</span>
              <p class="info-value description">{{ job.ADESC }}</p>
            </div>
            <div class="info-item">
              <span class="info-label">วันที่แจ้งซ่อม</span>
              <span class="info-value">{{ formatDate(job.ADATE) }}</span>
            </div>
          </div>
        </div>

        <!-- Location Card -->
        <div class="info-card">
          <h2 class="card-title">
            <span class="title-icon">📍</span>
            สถานที่
          </h2>
          <div class="info-grid">
            <div class="info-item full-width">
              <span class="info-label">ชื่อสถานที่</span>
              <span class="info-value">{{ job.LOCANAME }}</span>
            </div>
            <div class="info-item full-width">
              <span class="info-label">ที่อยู่</span>
              <p class="info-value address">{{ job.ADDRESS }}</p>
            </div>
          </div>
        </div>

        <!-- ⭐ Images Card (แก้ไข) -->
        <div class="info-card">
          <h2 class="card-title">
            <span class="title-icon">📷</span>
            รูปภาพประกอบ
          </h2>
          
          <!-- ⭐ แสดงเมื่อมีรูป -->
          <div v-if="job.IMAGES && job.IMAGES.length > 0" class="images-grid">
            <div 
              v-for="(img, index) in job.IMAGES" 
              :key="index" 
              class="image-item"
              @click="openImageModal(img.IMAGE_PATH)"
            >
              <img 
                :src="`http://localhost:3000/uploads/${img.IMAGE_PATH}`" 
                :alt="`รูปภาพ ${index + 1}`"
                class="job-image"
                @error="handleImageError"
              />
              <div class="image-overlay">
                <span class="zoom-icon">🔍</span>
              </div>
            </div>
          </div>
          
          <!-- ⭐ แสดงเมื่อไม่มีรูป -->
          <div v-else class="no-images">
            <div class="no-images-icon">📷</div>
            <p>ไม่มีรูปภาพประกอบ</p>
          </div>
        </div>

        <!-- Price Card (ถ้ามีข้อมูล) -->
        <div class="info-card" v-if="job.TOTAL_PRICE">
          <h2 class="card-title">
            <span class="title-icon">💰</span>
            ราคา
          </h2>
          <div class="price-summary">
            <div class="price-item">
              <span>ค่าอุปกรณ์</span>
              <span>{{ formatPrice(job.TOOLPRICE) }}</span>
            </div>
            <div class="price-item">
              <span>ค่าเดินทาง</span>
              <span>{{ formatPrice(job.TRANSPRICE) }}</span>
            </div>
            <div class="price-item total">
              <span>รวมทั้งสิ้น</span>
              <span>{{ formatPrice(job.TOTAL_PRICE) }}</span>
            </div>
          </div>
        </div>

      </div>
    </div>

    <!-- Complete Job Modal -->
    <div v-if="showCompleteModal" class="modal-overlay" @click="closeCompleteModal">
      <div class="modal-content" @click.stop>
        <h2 class="modal-title">ยืนยันงานเสร็จสิ้น</h2>
        <p class="modal-desc">กรุณากรอกค่าใช้จ่าย</p>
        
        <div class="form-group">
          <label>ค่าอุปกรณ์ (บาท)</label>
          <input 
            type="number" 
            v-model.number="toolPrice" 
            placeholder="0.00"
            class="form-input"
            min="0"
            step="0.01"
          />
        </div>
        
        <div class="form-group">
          <label>ค่าเดินทาง (บาท)</label>
          <input 
            type="number" 
            v-model.number="transPrice" 
            placeholder="0.00"
            class="form-input"
            min="0"
            step="0.01"
          />
        </div>
        
        <div class="total-price">
          <span>รวมทั้งสิ้น:</span>
          <span class="total-amount">{{ formatPrice(toolPrice + transPrice) }}</span>
        </div>
        
        <div class="modal-actions">
          <button @click="completeJob" class="btn-confirm">
            <span>ยืนยัน</span>
          </button>
          <button @click="closeCompleteModal" class="btn-cancel">
            <span>ยกเลิก</span>
          </button>
        </div>
      </div>
    </div>

    <!-- Image Modal -->
    <div v-if="showImageModal" class="modal-overlay" @click="closeImageModal">
      <div class="image-modal-content" @click.stop>
        <button @click="closeImageModal" class="close-btn">✕</button>
        <img :src="`http://localhost:3000/uploads/${selectedImage}`" alt="ภาพขยาย" />
      </div>
    </div>

    <div class="gradient-footer"></div>
  </div>
</template>

<script>
import Navtech from '../../components/Navtech.vue';
import axios from 'axios';

export default {
  name: 'JobDetail',
  components: { Navtech },
  
  data() {
    return {
      isLoading: true,
      error: null,
      job: null,
      showCompleteModal: false,
      toolPrice: 0,
      transPrice: 0,
      showImageModal: false,
      selectedImage: null
    }
  },
  
  async created() {
    const loggedInUser = JSON.parse(localStorage.getItem('user'));
    if (!loggedInUser || loggedInUser.role !== 'tech') {
      this.$router.push('/logintech');
      return;
    }
    
    const assignmentId = this.$route.params.id;
    if (!assignmentId) {
      this.error = 'ไม่พบ ID งาน';
      this.isLoading = false;
      return;
    }
    
    await this.fetchJobDetail(assignmentId);
  },
  
  methods: {
    async fetchJobDetail(id) {
      this.isLoading = true;
      this.error = null;
      
      try {
        const response = await axios.get(`http://localhost:3000/api/tech/assignment-detail/${id}`, {
          withCredentials: true
        });
        
        console.log('📦 Job Detail:', response.data);
        console.log('📷 Images:', response.data.IMAGES);
        
        this.job = response.data;
        this.isLoading = false;
        
      } catch (error) {
        console.error('❌ Error:', error);
        this.isLoading = false;
        
        if (error.response && error.response.status === 401) {
          this.error = 'Session หมดอายุ กรุณาล็อกอินใหม่';
          setTimeout(() => {
            localStorage.removeItem('user');
            this.$router.push('/logintech');
          }, 2000);
        } else if (error.response && error.response.status === 404) {
          this.error = 'ไม่พบงานนี้ หรือคุณไม่มีสิทธิ์ดู';
        } else {
          this.error = 'เกิดข้อผิดพลาด: ' + (error.response?.data?.message || error.message);
        }
      }
    },
    
    // ⭐ ฟังก์ชันจัดการรูปที่โหลดไม่ได้
    handleImageError(event) {
      console.error('❌ ไม่สามารถโหลดรูปภาพ:', event.target.src);
      event.target.src = 'https://via.placeholder.com/300x300?text=Image+Not+Found';
    },
    
    async updateStatus(newStatus) {
      const confirm = window.confirm(`ยืนยันเปลี่ยนสถานะเป็น "${this.getStatusText(newStatus)}" ?`);
      if (!confirm) return;
      
      try {
        await axios.put(
          `http://localhost:3000/api/tech/assignment-status/${this.job.ASSIGNMENT_ID}`,
          { status: newStatus },
          { withCredentials: true }
        );
        
        alert('เปลี่ยนสถานะสำเร็จ!');
        this.job.ASTATUS = newStatus;
        
      } catch (error) {
        console.error('❌ Error:', error);
        alert('เกิดข้อผิดพลาด: ' + (error.response?.data?.message || error.message));
      }
    },
    
    openCompleteModal() {
      this.showCompleteModal = true;
    },
    
    closeCompleteModal() {
      this.showCompleteModal = false;
      this.toolPrice = 0;
      this.transPrice = 0;
    },
    
    async completeJob() {
      if (this.toolPrice < 0 || this.transPrice < 0) {
        alert('กรุณากรอกราคาที่ถูกต้อง');
        return;
      }
      
      try {
        await axios.put(
          `http://localhost:3000/api/tech/assignment-complete/${this.job.ASSIGNMENT_ID}`,
          {
            toolPrice: this.toolPrice,
            transPrice: this.transPrice
          },
          { withCredentials: true }
        );
        
        alert('บันทึกงานเสร็จสิ้นแล้ว!');
        this.closeCompleteModal();
        
        // Reload data
        await this.fetchJobDetail(this.$route.params.id);
        
      } catch (error) {
        console.error('❌ Error:', error);
        alert('เกิดข้อผิดพลาด: ' + (error.response?.data?.message || error.message));
      }
    },
    
    openImageModal(imagePath) {
      this.selectedImage = imagePath;
      this.showImageModal = true;
    },
    
    closeImageModal() {
      this.showImageModal = false;
      this.selectedImage = null;
    },
    
    goBack() {
      this.$router.push('/jobs');
    },
    
    getStatusClass(status) {
      const map = {
        'Pending': 'pending',
        'In Progress': 'processing',
        'Completed': 'completed'
      };
      return map[status] || 'pending';
    },
    
    getStatusText(status) {
      const map = {
        'Pending': '⏳ รอดำเนินการ',
        'In Progress': '🔧 กำลังซ่อม',
        'Completed': '✅ เสร็จสิ้น'
      };
      return map[status] || status;
    },
    
    formatDate(dateString) {
      if (!dateString) return '-';
      const date = new Date(dateString);
      if (isNaN(date.getTime())) return dateString;
      return date.toLocaleDateString('th-TH', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    },
    
    formatPrice(price) {
      if (!price) return '0.00 บาท';
      return parseFloat(price).toLocaleString('th-TH', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      }) + ' บาท';
    }
  }
}
</script>

<style scoped>
/* Base Styles */
.job-detail-page {
  min-height: 100vh;
  background: linear-gradient(135deg, #000000 0%, #1a1a1a 100%);
  color: #fff;
  position: relative;
}

.content-wrapper {
  margin-left: 250px;
  padding: 100px 40px 80px;
  max-width: 1200px;
  margin-right: auto;
}

/* Header */
.header {
  margin-bottom: 2rem;
  display: flex;
  align-items: center;
  gap: 2rem;
}

.back-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.8rem 1.5rem;
  background: rgba(255, 0, 127, 0.1);
  border: 1px solid rgba(255, 0, 127, 0.3);
  color: #ff007f;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: 600;
}

.back-btn:hover {
  background: rgba(255, 0, 127, 0.2);
  transform: translateX(-5px);
}

.back-icon {
  font-size: 1.5rem;
}

.hero-text {
  font-size: 2.5rem;
  font-weight: 900;
  background: linear-gradient(135deg, #ff007f 0%, #ffc400 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

/* Loading & Error */
.loading-container,
.error-container {
  text-align: center;
  padding: 4rem 2rem;
}

.loader {
  width: 50px;
  height: 50px;
  border: 4px solid rgba(255, 0, 127, 0.2);
  border-top-color: #ff007f;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin: 0 auto 1rem;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.error-icon {
  font-size: 4rem;
  margin-bottom: 1rem;
}

/* Cards */
.job-detail-container {
  display: grid;
  gap: 1.5rem;
}

.status-card,
.info-card {
  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 0, 127, 0.3);
  border-radius: 15px;
  padding: 2rem;
}

.status-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
}

.status-label {
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.6);
  text-transform: uppercase;
  letter-spacing: 1px;
}

.status-badge {
  padding: 0.5rem 1.2rem;
  border-radius: 20px;
  font-weight: 700;
  font-size: 0.9rem;
}

.status-badge.pending {
  background: rgba(255, 145, 0, 0.2);
  color: #ff9100;
  border: 1px solid #ff9100;
}

.status-badge.processing {
  background: rgba(255, 0, 127, 0.2);
  color: #ff007f;
  border: 1px solid #ff007f;
}

.status-badge.completed {
  background: rgba(41, 224, 131, 0.2);
  color: #29e083;
  border: 1px solid #29e083;
}

/* Status Actions */
.status-actions {
  display: flex;
  gap: 1rem;
}

.btn-action {
  flex: 1;
  padding: 1rem;
  border: none;
  border-radius: 12px;
  font-weight: 700;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  transition: all 0.3s ease;
}

.start-btn {
  background: linear-gradient(135deg, #ff007f, #ff4da6);
  color: #fff;
}

.start-btn:hover {
  box-shadow: 0 0 30px rgba(255, 0, 127, 0.5);
  transform: translateY(-2px);
}

.complete-btn {
  background: linear-gradient(135deg, #29e083, #1fc66f);
  color: #fff;
}

.complete-btn:hover {
  box-shadow: 0 0 30px rgba(41, 224, 131, 0.5);
  transform: translateY(-2px);
}

/* Info Card */
.card-title {
  display: flex;
  align-items: center;
  gap: 0.8rem;
  font-size: 1.3rem;
  margin-bottom: 1.5rem;
  color: #ff007f;
}

.title-icon {
  font-size: 1.5rem;
}

.info-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
}

.info-item {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.info-item.full-width {
  grid-column: 1 / -1;
}

.info-label {
  font-size: 0.8rem;
  color: rgba(255, 255, 255, 0.5);
  text-transform: uppercase;
  letter-spacing: 1px;
}

.info-value {
  font-size: 1.1rem;
  color: #fff;
  font-weight: 500;
}

.description,
.address {
  line-height: 1.6;
  color: rgba(255, 255, 255, 0.9);
}

.phone-link {
  color: #29e083;
  text-decoration: none;
  transition: all 0.3s ease;
}

.phone-link:hover {
  color: #1fc66f;
  text-shadow: 0 0 10px rgba(41, 224, 131, 0.5);
}

/* ⭐ Images (แก้ไข) */
.images-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 1rem;
}

.image-item {
  position: relative;
  aspect-ratio: 1;
  border-radius: 12px;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.3s ease;
  border: 2px solid rgba(255, 0, 127, 0.3);
}

.image-item:hover {
  transform: scale(1.05);
  border-color: #ff007f;
  box-shadow: 0 0 20px rgba(255, 0, 127, 0.5);
}

.image-item:hover .image-overlay {
  opacity: 1;
}

.job-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.image-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.zoom-icon {
  font-size: 2.5rem;
  color: #fff;
}

/* ⭐ No Images State */
.no-images {
  text-align: center;
  padding: 3rem 2rem;
  background: rgba(0, 0, 0, 0.3);
  border-radius: 12px;
  color: rgba(255, 255, 255, 0.5);
}

.no-images-icon {
  font-size: 4rem;
  margin-bottom: 1rem;
  opacity: 0.3;
}

/* Price */
.price-summary {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.price-item {
  display: flex;
  justify-content: space-between;
  padding: 0.8rem;
  background: rgba(0, 0, 0, 0.3);
  border-radius: 8px;
}

.price-item.total {
  background: rgba(255, 0, 127, 0.1);
  border: 1px solid rgba(255, 0, 127, 0.3);
  font-weight: 700;
  font-size: 1.2rem;
  color: #ff007f;
}

/* Modal */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2000;
}

.modal-content {
  background: linear-gradient(135deg, #1a1a1a, #000);
  border: 1px solid rgba(255, 0, 127, 0.5);
  border-radius: 20px;
  padding: 2.5rem;
  max-width: 500px;
  width: 90%;
  box-shadow: 0 0 50px rgba(255, 0, 127, 0.5);
}

.modal-title {
  font-size: 1.8rem;
  margin-bottom: 0.5rem;
  color: #ff007f;
}

.modal-desc {
  color: rgba(255, 255, 255, 0.7);
  margin-bottom: 2rem;
}

.form-group {
  margin-bottom: 1.5rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  color: rgba(255, 255, 255, 0.8);
  font-weight: 600;
}

.form-input {
  width: 100%;
  padding: 1rem;
  background: rgba(0, 0, 0, 0.5);
  border: 1px solid rgba(255, 0, 127, 0.3);
  border-radius: 12px;
  color: #fff;
  font-size: 1rem;
}

.form-input:focus {
  outline: none;
  border-color: #ff007f;
  box-shadow: 0 0 10px rgba(255, 0, 127, 0.3);
}

.total-price {
  display: flex;
  justify-content: space-between;
  padding: 1rem;
  background: rgba(255, 0, 127, 0.1);
  border-radius: 12px;
  margin-bottom: 2rem;
  font-weight: 700;
  font-size: 1.2rem;
  color: #ff007f;
}

.modal-actions {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}

.btn-confirm,
.btn-cancel,
.btn-secondary {
  padding: 1rem;
  border: none;
  border-radius: 12px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s ease;
}

.btn-confirm {
  background: linear-gradient(135deg, #29e083, #1fc66f);
  color: #fff;
}

.btn-confirm:hover {
  box-shadow: 0 0 30px rgba(41, 224, 131, 0.5);
}

.btn-cancel,
.btn-secondary {
  background: rgba(220, 53, 69, 0.2);
  color: #ff6b6b;
  border: 2px solid rgba(220, 53, 69, 0.3);
}

.btn-cancel:hover,
.btn-secondary:hover {
  background: rgba(220, 53, 69, 0.3);
}

/* Image Modal */
.image-modal-content {
  position: relative;
  max-width: 90%;
  max-height: 90%;
}

.image-modal-content img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  border-radius: 12px;
}

.close-btn {
  position: absolute;
  top: -40px;
  right: 0;
  background: rgba(255, 0, 127, 0.8);
  border: none;
  color: #fff;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  font-size: 1.5rem;
  cursor: pointer;
  transition: all 0.3s ease;
}

.close-btn:hover {
  background: #ff007f;
  transform: rotate(90deg);
}

/* Footer */
.gradient-footer {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 3px;
  background: linear-gradient(90deg, #ff007f, #ff9100, #ffc400, #29e083, #007bff);
  background-size: 200% 100%;
  animation: gradientMove 5s linear infinite;
  z-index: 1000;
}

@keyframes gradientMove {
  0% { background-position: 0% 0; }
  100% { background-position: 200% 0; }
}

/* Responsive */
@media (max-width: 768px) {
  .content-wrapper {
    margin-left: 0;
    padding: 80px 20px 100px;
  }
  
  .header {
    flex-direction: column;
    align-items: flex-start;
  }
  
  .hero-text {
    font-size: 1.8rem;
  }
  
  .info-grid {
    grid-template-columns: 1fr;
  }
  
  .status-actions {
    flex-direction: column;
  }
  
  .modal-actions {
    grid-template-columns: 1fr;
  }
  
  .images-grid {
    grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
  }
}
</style>
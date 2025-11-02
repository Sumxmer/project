<template>
  <div class="hero-section">
    <Navtech />
    <div class="content-wrapper">
      <header class="header">
        <div class="header-content">
          <div class="header-icon">📜</div>
          <h1 class="hero-text">ประวัติการซ่อม</h1>
          <p class="hero-subtitle">รายการงานที่คุณทำเสร็จแล้ว</p>
        </div>
      </header>

      <div class="jobs-container">
        
        <div v-if="isLoading" class="empty">
          <div class="empty-icon">⏳</div>
          <p>กำลังโหลดข้อมูล...</p>
        </div>

        <div v-if="!isLoading && jobs.length === 0" class="empty">
          <div class="empty-icon">📭</div>
          <p>ยังไม่มีประวัติการซ่อม</p>
        </div>

        <!-- ⭐ รายการงาน -->
        <div v-for="job in jobs" :key="job.ASSIGNMENT_ID" class="job-card">
          <div class="card-top">
            <div class="category-badge">{{ job.CATEGORY }}</div>
            <span class="status-dot completed"></span>
          </div>

          <div class="card-content">
            <div class="info-item">
              <span class="info-icon">👤</span>
              <div class="info-text">
                <span class="info-label">ลูกค้า</span>
                <span class="info-value">{{ job.CUSTOMER_NAME }}</span>
              </div>
            </div>

            <div class="info-item">
              <span class="info-icon">📍</span>
              <div class="info-text">
                <span class="info-label">ที่อยู่</span>
                <span class="info-value">{{ job.ADDRESS }}</span>
              </div>
            </div>

            <div class="info-item">
              <span class="info-icon">📅</span>
              <div class="info-text">
                <span class="info-label">วันที่เสร็จ</span>
                <span class="info-value">{{ formatDate(job.COMPLETED_DATE || job.ADATE) }}</span>
              </div>
            </div>

            <div v-if="job.ADESC" class="info-item">
              <span class="info-icon">📝</span>
              <div class="info-text">
                <span class="info-label">รายละเอียดงาน</span>
                <span class="info-value">{{ truncate(job.ADESC, 60) }}</span>
              </div>
            </div>

            <!-- ⭐ แสดงคะแนนแบบย่อ (ถ้ามี) -->
            <div v-if="job.SCORE !== null && job.SCORE !== undefined" class="info-item">
              <span class="info-icon">⭐</span>
              <div class="info-text">
                <span class="info-label">คะแนน</span>
                <span class="info-value rating-preview">
                  <span class="stars-mini">
                    <span v-for="n in 5" :key="n" :class="{ active: n <= Math.floor(job.SCORE) }">
                      {{ n <= Math.floor(job.SCORE) ? '★' : '☆' }}
                    </span>
                  </span>
                  {{ Number(job.SCORE).toFixed(1) }}/5.0
                </span>
              </div>
            </div>

            <!-- ⭐ ปุ่มดูรายละเอียด -->
            <button @click="openDetailModal(job)" class="detail-btn">
              <span>ดูรายละเอียดเพิ่มเติม</span>
              <span class="btn-icon">→</span>
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- ⭐ Modal รายละเอียด -->
    <div v-if="showModal" class="modal-overlay" @click="closeModal">
      <div class="modal-content" @click.stop>
        <button @click="closeModal" class="close-btn">✕</button>
        
        <div class="modal-header">
          <h2 class="modal-title">รายละเอียดงาน</h2>
          <span class="status-badge completed">{{ selectedJob.ASTATUS }}</span>
        </div>

        <div class="modal-body">
          <!-- ข้อมูลลูกค้า -->
          <div class="detail-section">
            <h3 class="section-title">ข้อมูลลูกค้า</h3>
            <div class="detail-row">
              <span class="detail-label">👤 ชื่อ:</span>
              <span class="detail-value">{{ selectedJob.CUSTOMER_NAME }}</span>
            </div>
            <div class="detail-row">
              <span class="detail-label">📍 ที่อยู่:</span>
              <span class="detail-value">{{ selectedJob.ADDRESS }}</span>
            </div>
            <div class="detail-row">
              <span class="detail-label">📅 วันที่เสร็จ:</span>
              <span class="detail-value">{{ formatDate(selectedJob.COMPLETED_DATE || selectedJob.ADATE) }}</span>
            </div>
          </div>

          <!-- รายละเอียดงาน -->
          <div class="detail-section">
            <h3 class="section-title">รายละเอียดงาน</h3>
            <div class="detail-row">
              <span class="detail-label">🔧 ประเภท:</span>
              <span class="detail-value">{{ selectedJob.CATEGORY }}</span>
            </div>
            <div class="detail-row full-width">
              <span class="detail-label">📝 คำอธิบาย:</span>
              <p class="detail-description">{{ selectedJob.ADESC || 'ไม่มีรายละเอียด' }}</p>
            </div>
          </div>

          <!-- ⭐ ค่าใช้จ่าย -->
          <div v-if="selectedJob.INVOICES_ID" class="detail-section price-section">
            <h3 class="section-title">💰 สรุปค่าใช้จ่าย</h3>
            <div class="price-details">
              <div class="price-row">
                <span>ค่าอะไหล่:</span>
                <span>฿{{ Number(selectedJob.TOOLPRICE || 0).toFixed(2) }}</span>
              </div>
              <div class="price-row">
                <span>ค่าเดินทาง:</span>
                <span>฿{{ Number(selectedJob.TRANSPRICE || 0).toFixed(2) }}</span>
              </div>
              <div class="price-row total">
                <span>รวมทั้งหมด:</span>
                <span class="total-amount">฿{{ Number(selectedJob.TOTAL_PRICE || 0).toFixed(2) }}</span>
              </div>
            </div>
          </div>

          <!-- ⭐ คะแนนจากลูกค้า -->
          <div v-if="selectedJob.SCORE !== null && selectedJob.SCORE !== undefined" class="detail-section rating-section">
            <h3 class="section-title">⭐ คะแนนจากลูกค้า</h3>
            <div class="rating-display">
              <div class="stars">
                <span v-for="n in 5" :key="n" class="star" :class="{ active: n <= Math.floor(selectedJob.SCORE) }">
                  {{ n <= Math.floor(selectedJob.SCORE) ? '★' : '☆' }}
                </span>
              </div>
              <span class="rating-score">{{ Number(selectedJob.SCORE).toFixed(1) }}/5.0</span>
            </div>
            <p v-if="selectedJob.RATING_COMMENT" class="rating-comment">
              "{{ selectedJob.RATING_COMMENT }}"
            </p>
            <p v-else class="no-comment">ลูกค้าไม่ได้ทิ้งความคิดเห็น</p>
          </div>
          
          <!-- ⭐ กรณีไม่มีคะแนน -->
          <div v-else class="detail-section">
            <h3 class="section-title">⭐ คะแนนจากลูกค้า</h3>
            <p class="no-rating">ยังไม่มีคะแนนจากลูกค้า</p>
          </div>
        </div>
      </div>
    </div>

    <div class="blue-footer-bar"></div>
  </div>
</template>

<script>
import Navtech from '../../components/Navtech.vue';
import axios from 'axios';

export default {
  name: 'History',
  components: { Navtech },
  
  data() {
    return {
      isLoading: true,
      jobs: [],
      showModal: false,
      selectedJob: {}
    }
  },

  async created() {
    const loggedInUser = JSON.parse(localStorage.getItem('user'));
    if (!loggedInUser || loggedInUser.role !== 'tech') {
      this.$router.push('/logintech');
      return;
    }
    this.fetchHistory();
  },

  methods: {
    async fetchHistory() {
      this.isLoading = true;
      try {
        const response = await axios.get('http://localhost:3000/api/tech/history', {
            withCredentials: true
        });
        
        console.log('📦 History Data:', response.data);
        
        // ⭐ Debug งานแรก
        if (response.data.length > 0) {
          console.log('🔍 งานแรก:', response.data[0]);
          console.log('⭐ SCORE:', response.data[0].SCORE);
          console.log('💬 RATING_COMMENT:', response.data[0].RATING_COMMENT);
          console.log('🆔 RATING_ID:', response.data[0].RATING_ID);
        }
        
        this.jobs = response.data;
        this.isLoading = false;
      } catch (error) {
        this.isLoading = false;
        this.handleApiError(error);
      }
    },

    openDetailModal(job) {
      console.log('📋 Selected Job:', job);
      console.log('⭐ SCORE:', job.SCORE);
      console.log('💬 RATING_COMMENT:', job.RATING_COMMENT);
      this.selectedJob = job;
      this.showModal = true;
      document.body.style.overflow = 'hidden';
    },

    closeModal() {
      this.showModal = false;
      this.selectedJob = {};
      document.body.style.overflow = 'auto';
    },

    truncate(text, length) {
      if (!text) return '';
      return text.length > length ? text.substring(0, length) + '...' : text;
    },

    formatDate(dateString) {
      if (!dateString) return 'N/A';
      const date = new Date(dateString);
      return date.toLocaleDateString('th-TH', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    },

    handleApiError(error) {
        if (error.response && error.response.status === 401) {
            alert('Session หมดอายุ กรุณาล็อกอินใหม่');
            localStorage.removeItem('user');
            this.$router.push('/logintech');
        } else {
            console.error('API Error:', error.message);
        }
    }
  }
}
</script>

<style scoped>
:global(html), :global(body), :global(#app) {
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
  background-color: #000000;
  overflow-x: hidden;
  font-family: 'Space Grotesk', sans-serif;
  box-sizing: border-box;
}

:global(*) {
  box-sizing: border-box;
}

.hero-section {
  width: 100vw;
  min-height: 100vh;
  margin: 0;
  padding: 0;
  background: linear-gradient(135deg, #000000 0%, #1a1a1a 100%);
  color: #fff;
  position: relative;
  overflow-x: hidden;
}

.hero-section::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: 
    radial-gradient(2px 2px at 20% 30%, rgba(255, 0, 127, 0.3), transparent),
    radial-gradient(2px 2px at 60% 70%, rgba(255, 196, 0, 0.3), transparent),
    radial-gradient(1px 1px at 50% 50%, rgba(41, 224, 131, 0.3), transparent),
    radial-gradient(2px 2px at 80% 10%, rgba(0, 123, 255, 0.3), transparent);
  background-size: 200% 200%;
  background-position: 0% 0%;
  animation: particles 20s ease infinite;
  pointer-events: none;
  opacity: 0.5;
  z-index: 0;
}

@keyframes particles {
  0%, 100% { background-position: 0% 0%; }
  50% { background-position: 100% 100%; }
}

.content-wrapper {
  margin-left: 220px;
  padding: 130px 40px 60px 40px;
  min-height: 100vh;
  max-width: 1400px;
  position: relative;
  z-index: 1;
}

.header {
  margin-bottom: 3rem;
}

.header-content {
  text-align: center;
  padding-bottom: 2rem;
  border-bottom: 1px solid rgba(255, 0, 127, 0.3);
}

.header-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
  filter: drop-shadow(0 0 15px rgba(255, 0, 127, 0.5));
  animation: floatIcon 3s ease-in-out infinite;
}

@keyframes floatIcon {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
}

.hero-text {
  font-size: 3rem;
  font-weight: 900;
  margin: 0 0 1rem 0;
  background: linear-gradient(135deg, #ff007f 0%, #ff66b2 50%, #ffc400 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  filter: drop-shadow(0 0 20px rgba(255, 0, 127, 0.5));
  animation: floatText 3s ease-in-out infinite;
}

@keyframes floatText {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-5px); }
}

.hero-subtitle {
  font-size: 1.2rem;
  color: rgba(255, 255, 255, 0.8);
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.5);
}

.jobs-container {
  max-width: 900px;
  margin: 0 auto;
}

.job-card {
  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 0, 127, 0.3);
  border-radius: 15px;
  margin-bottom: 1.5rem;
  overflow: hidden;
  transition: all 0.3s ease;
  box-shadow: 0 4px 20px rgba(255, 0, 127, 0.1);
  position: relative;
}

.job-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 1px;
  background: linear-gradient(90deg, transparent, #ff007f, transparent);
  opacity: 0;
  transition: opacity 0.3s ease;
}

.job-card:hover {
  transform: translateY(-5px);
  border-color: rgba(255, 0, 127, 0.6);
  box-shadow: 0 0 30px rgba(255, 0, 127, 0.2);
}

.job-card:hover::before {
  opacity: 1;
}

.card-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.2rem 1.5rem;
  border-bottom: 1px solid rgba(255, 0, 127, 0.2);
  background: rgba(255, 0, 127, 0.05);
}

.category-badge {
  font-size: 1.1rem;
  font-weight: 700;
  background: linear-gradient(135deg, #ff007f, #ff66b2);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.status-dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  position: relative;
  box-shadow: 0 0 10px currentColor;
}

.status-dot::after {
  content: '';
  position: absolute;
  inset: -4px;
  border-radius: 50%;
  border: 2px solid currentColor;
  opacity: 0.3;
  animation: pulseDot 2s ease-in-out infinite;
}

@keyframes pulseDot {
  0%, 100% {
    opacity: 0.3;
    transform: scale(1);
  }
  50% {
    opacity: 0.1;
    transform: scale(1.2);
  }
}

.status-dot.completed {
  background: #29e083;
  color: #29e083;
}

.card-content {
  padding: 1.5rem;
}

.info-item {
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
}

.info-item:last-of-type {
  margin-bottom: 0;
}

.info-icon {
  font-size: 1.3rem;
  opacity: 0.7;
  min-width: 25px;
}

.info-text {
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
  flex: 1;
}

.info-label {
  font-size: 0.75rem;
  color: rgba(255, 255, 255, 0.5);
  text-transform: uppercase;
  letter-spacing: 1px;
}

.info-value {
  color: #fff;
  font-size: 1rem;
  font-weight: 500;
  line-height: 1.4;
}

/* ⭐ Rating Preview (ในการ์ด) */
.rating-preview {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.stars-mini {
  display: flex;
  gap: 0.1rem;
  font-size: 0.9rem;
  color: rgba(255, 196, 0, 0.3);
}

.stars-mini span.active {
  color: #ffc400;
  text-shadow: 0 0 5px rgba(255, 196, 0, 0.5);
}

.detail-btn {
  width: 100%;
  padding: 1rem;
  margin-top: 1rem;
  background: linear-gradient(135deg, #ff007f 0%, #ff4da6 100%);
  border: none;
  border-radius: 10px;
  color: #ffffff;
  font-size: 1rem;
  font-weight: 700;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(255, 0, 127, 0.3);
}

.detail-btn:hover {
  background: linear-gradient(135deg, #ff4da6 0%, #ff007f 100%);
  box-shadow: 0 6px 25px rgba(255, 0, 127, 0.5);
  transform: translateY(-2px);
}

.detail-btn .btn-icon {
  font-size: 1.2rem;
  transition: transform 0.3s ease;
}

.detail-btn:hover .btn-icon {
  transform: translateX(5px);
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.85);
  backdrop-filter: blur(5px);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
  animation: fadeIn 0.3s ease;
  padding: 2rem;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

.modal-content {
  background: linear-gradient(135deg, rgba(20, 20, 20, 0.98), rgba(0, 0, 0, 0.98));
  border: 1px solid rgba(255, 0, 127, 0.4);
  border-radius: 20px;
  max-width: 700px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 10px 50px rgba(255, 0, 127, 0.3);
  animation: slideUp 0.3s ease;
  position: relative;
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.close-btn {
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: rgba(255, 0, 127, 0.2);
  border: 1px solid rgba(255, 0, 127, 0.4);
  color: #fff;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  font-size: 1.5rem;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 0.3s ease;
  z-index: 1;
}

.close-btn:hover {
  background: rgba(255, 0, 127, 0.4);
  transform: rotate(90deg);
}

.modal-header {
  padding: 2rem 2rem 1.5rem;
  border-bottom: 1px solid rgba(255, 0, 127, 0.3);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.modal-title {
  font-size: 1.8rem;
  font-weight: 800;
  background: linear-gradient(135deg, #ff007f 0%, #ff66b2 50%, #ffc400 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin: 0;
}

.modal-body {
  padding: 2rem;
}

.detail-section {
  margin-bottom: 2rem;
  padding-bottom: 2rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.detail-section:last-child {
  border-bottom: none;
  margin-bottom: 0;
}

.section-title {
  font-size: 1.2rem;
  font-weight: 700;
  color: #ff007f;
  margin: 0 0 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.detail-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.8rem;
  gap: 1rem;
}

.detail-row.full-width {
  flex-direction: column;
  align-items: flex-start;
}

.detail-label {
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.6);
  font-weight: 600;
  min-width: 120px;
}

.detail-value {
  font-size: 1rem;
  color: #fff;
  font-weight: 500;
  text-align: right;
  flex: 1;
}

.detail-description {
  margin: 0.5rem 0 0;
  padding: 1rem;
  background: rgba(0, 0, 0, 0.3);
  border-radius: 8px;
  color: rgba(255, 255, 255, 0.9);
  line-height: 1.6;
  border-left: 3px solid #ff007f;
}

.price-section {
  background: rgba(41, 224, 131, 0.05);
  border: 1px solid rgba(41, 224, 131, 0.2);
  border-radius: 12px;
  padding: 1.5rem;
}

.price-details {
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
}

.price-row {
  display: flex;
  justify-content: space-between;
  font-size: 1rem;
  color: rgba(255, 255, 255, 0.8);
}

.price-row.total {
  margin-top: 0.8rem;
  padding-top: 0.8rem;
  border-top: 1px solid rgba(41, 224, 131, 0.3);
  font-weight: 700;
  font-size: 1.2rem;
  color: #29e083;
}

.total-amount {
  color: #29e083;
  font-size: 1.5rem;
  font-weight: 800;
}

.rating-section {
  background: rgba(255, 196, 0, 0.05);
  border: 1px solid rgba(255, 196, 0, 0.2);
  border-radius: 12px;
  padding: 1.5rem;
}

.rating-display {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
}

.stars {
  display: flex;
  gap: 0.3rem;
}

.star {
  font-size: 1.8rem;
  color: rgba(255, 196, 0, 0.3);
  transition: all 0.2s ease;
}

.star.active {
  color: #ffc400;
  text-shadow: 0 0 10px rgba(255, 196, 0, 0.5);
}

.rating-score {
  font-size: 1.3rem;
  font-weight: 700;
  color: #ffc400;
}

.rating-comment {
  margin: 0;
  font-size: 1rem;
  color: rgba(255, 255, 255, 0.8);
  font-style: italic;
  padding: 1rem;
  background: rgba(0, 0, 0, 0.3);
  border-radius: 8px;
  border-left: 3px solid #ffc400;
  line-height: 1.6;
}

.no-comment, .no-rating {
  color: rgba(255, 255, 255, 0.5);
  font-style: italic;
  text-align: center;
  padding: 1rem;
}

.status-badge {
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 700;
  text-transform: uppercase;
  border: 1px solid currentColor;
  box-shadow: 0 0 10px currentColor;
}

.status-badge.completed {
  color: #29e083;
  background: rgba(41, 224, 131, 0.1);
}

.empty {
  text-align: center;
  padding: 4rem 2rem;
  color: rgba(255, 255, 255, 0.5);
}

.empty-icon {
  font-size: 4rem;
  margin-bottom: 1rem;
  opacity: 0.3;
  filter: grayscale(1);
}

.empty p {
  font-size: 1rem;
  font-weight: 300;
}

.blue-footer-bar {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 4px;
  background-image: linear-gradient(90deg, #ff007f, #ff9100, #ffc400, #29e083, #007bff, #9c27b0, #ff4081);
  background-size: 200% 100%;
  animation: footer-animate 5s linear infinite;
  box-shadow: 0 -2px 20px rgba(255, 0, 127, 0.5);
  z-index: 100;
}

@keyframes footer-animate {
  0% { background-position: 0% 0; }
  100% { background-position: 200% 0; }
}

/* Responsive */
@media (max-width: 1024px) {
  .content-wrapper {
    margin-left: 180px;
    padding: 120px 30px 70px;
  }
}

@media (max-width: 768px) {
  .content-wrapper {
    margin-left: 0;
    padding: 110px 20px 60px;
    max-width: 600px;
  }
  
  .hero-text {
    font-size: 2rem;
  }
  
  .modal-content {
    max-width: 95%;
  }
  
  .modal-header {
    padding: 1.5rem;
  }
  
  .modal-body {
    padding: 1.5rem;
  }
  
  .detail-row {
    flex-direction: column;
    align-items: flex-start;
  }
  
  .detail-value {
    text-align: left;
  }
}

@media (max-width: 480px) {
  .content-wrapper {
    padding: 100px 15px 60px;
  }
  
  .modal-title {
    font-size: 1.5rem;
  }
  
  .stars {
    gap: 0.2rem;
  }
  
  .star {
    font-size: 1.5rem;
  }
}

/* Scrollbar */
.modal-content::-webkit-scrollbar {
  width: 6px;
}

.modal-content::-webkit-scrollbar-track {
  background: rgba(0, 0, 0, 0.3);
}

.modal-content::-webkit-scrollbar-thumb {
  background: rgba(255, 0, 127, 0.5);
  border-radius: 10px;
}

.modal-content::-webkit-scrollbar-thumb:hover {
  background: rgba(255, 0, 127, 0.7);
}
</style>
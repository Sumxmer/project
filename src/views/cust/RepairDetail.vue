<template>
  <div class="page-container">
    <Navcust />
    <div class="content-wrapper">
      <header class="header">
        <h1 class="gradient-text">รายละเอียดงานซ่อม</h1>
        <p class="subtitle" v-if="!isLoading">
          รหัสงาน: {{ $route.params.id }}
        </p>
      </header>

      <div v-if="isLoading" class="loading-state">
        <div class="loading-icon">⏳</div>
        <h3>กำลังโหลดข้อมูล...</h3>
      </div>

      <div v-if="error" class="error-state">
        <div class="error-icon">❌</div>
        <h3>เกิดข้อผิดพลาด</h3>
        <p>{{ error }}</p>
      </div>
      
      <div v-if="!isLoading && !error" class="detail-grid">
        
        <div class="detail-card">
          <h2 class="card-title">ข้อมูลการแจ้งซ่อม</h2>
          
          <div :class="['status-badge', getStatusClass(job.ASTATUS)]">
            {{ getStatusText(job.ASTATUS) }}
          </div>
          
          <div class="detail-item">
            <label>วันที่นัดหมาย</label>
            <span>📅 {{ formatDateTime(job.ADATE) }}</span>
          </div>
          <div class="detail-item">
            <label>ปัญหาที่แจ้ง</label>
            <span>📝 {{ job.ADESC }}</span>
          </div>
          <div class="detail-item">
            <label>สถานที่</label>
            <span>📍 {{ job.LOCANAME }} ({{ job.ADDRESS }})</span>
          </div>
        </div>

        <!-- รูปภาพการแจ้งซ่อม -->
        <div class="detail-card images-card" v-if="job.IMAGES && job.IMAGES.length > 0">
          <h2 class="card-title">📷 รูปภาพที่แนบมา</h2>
          <div class="images-grid">
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
        </div>

        <div class="detail-card" v-else>
          <h2 class="card-title">📷 รูปภาพที่แนบมา</h2>
          <div class="no-data">
            <p>ไม่มีรูปภาพแนบมา</p>
          </div>
        </div>

        <div class="detail-card">
          <h2 class="card-title">ช่างผู้รับผิดชอบ</h2>
          <div class="detail-item">
            <label>ชื่อช่าง</label>
            <span>🔧 {{ job.TE_NAME }} ({{ job.TE_TYPE }})</span>
          </div>
          <div class="detail-item">
            <label>เบอร์ติดต่อช่าง</label>
            <span>📱 {{ job.TPHONE }}</span>
          </div>
          <div class="detail-item">
            <label>ค่าแรง (ต่อชั่วโมง)</label>
            <span>฿ {{ job['WAGES/HOURS'] ? job['WAGES/HOURS'].toFixed(2) : 'N/A' }}</span>
          </div>
        </div>
        
        <div class="detail-card finance">
          <h2 class="card-title">สรุปค่าใช้จ่าย</h2>
          
          <template v-if="job.INVOICES_ID">
            <div class="detail-item price">
              <label>ค่าอะไหล่</label>
              <span>฿{{ job.TOOLPRICE ? job.TOOLPRICE.toFixed(2) : '0.00' }}</span>
            </div>
            <div class="detail-item price">
              <label>ค่าเดินทาง</label>
              <span>฿{{ job.TRANSPRICE ? job.TRANSPRICE.toFixed(2) : '0.00' }}</span>
            </div>
            <div class="detail-item price promo" v-if="job.PROMO_NAME">
              <label>ส่วนลด ({{ job.PROMO_NAME }})</label>
              <span>-฿{{ ((job.TOOLPRICE + job.TRANSPRICE + (job['WAGES/HOURS'] || 0)) * job.DISCOUNT).toFixed(2) }}</span>
            </div>
            
            <div class="total-price">
              <label>ยอดรวมสุทธิ</label>
              <span>฿ {{ job.TOTAL_PRICE.toFixed(2) }}</span>
            </div>
            
            <div class="detail-item">
              <label>สถานะการจ่ายเงิน</label>
              <span :class="job.PAY_STATUS === 'Paid' ? 'paid-status' : 'unpaid-status'">
                {{ job.PAY_STATUS === 'Paid' ? '✅ ชำระแล้ว' : '⏳ รอชำระ' }}
              </span>
            </div>
            <div class="detail-item" v-if="job.PAY_METHOD">
              <label>วิธีชำระเงิน</label>
              <span>💳 {{ job.PAY_METHOD }}</span>
            </div>
            
          </template>
          <template v-else>
            <div class="no-data">
              <p>ช่างยังไม่ได้สร้างใบแจ้งหนี้</p>
            </div>
          </template>
        </div>
        
        <!-- ⭐ ส่วนจ่ายเงิน + ให้คะแนน (ใหม่) -->
        <div v-if="job.ASTATUS === 'Completed'" class="detail-card action-card">
          <h2 class="card-title">การดำเนินการ</h2>
          
          <!-- 💰 จ่ายเงิน -->
          <div v-if="job.PAY_STATUS !== 'Paid'" class="action-section">
            <h3 class="action-subtitle">💰 ชำระเงิน</h3>
            <div class="payment-info">
              <p class="amount-display">ยอดชำระ: <strong>฿{{ job.TOTAL_PRICE.toFixed(2) }}</strong></p>
              <div class="form-group">
                <label>เลือกวิธีชำระเงิน</label>
                <select v-model="paymentMethod" class="select-input">
                  <option value="Cash">เงินสด</option>
                  <option value="Credit Card">บัตรเครดิต</option>
                  <option value="QR Code">QR Code</option>
                  <option value="Bank Transfer">โอนเงิน</option>
                </select>
              </div>
              <button @click="makePayment" class="action-btn pay-btn" :disabled="isProcessing">
                <span v-if="!isProcessing">💳 ชำระเงิน</span>
                <span v-else>กำลังดำเนินการ...</span>
              </button>
            </div>
          </div>

          <!-- ⭐ ให้คะแนน -->
          <div class="action-section rating-section">
            <h3 class="action-subtitle">⭐ ให้คะแนนและรีวิว</h3>
            
            <div v-if="job.SCORE" class="current-rating-display">
              <p>คะแนนปัจจุบัน:</p>
              <div class="rating-stars-display">
                <span v-for="n in 5" :key="n" class="star-display">
                  {{ n <= job.SCORE ? '★' : '☆' }}
                </span>
                <span class="score-number">({{ job.SCORE }}/5)</span>
              </div>
              <p class="comment-display" v-if="job.COMMENT">"{{ job.COMMENT }}"</p>
            </div>

            <div class="rating-form">
              <div class="stars-input">
                <span 
                  v-for="star in 5" 
                  :key="star"
                  @click="rating = star"
                  class="star-input"
                  :class="{ active: star <= rating }"
                >
                  {{ star <= rating ? '★' : '☆' }}
                </span>
              </div>
              <textarea 
                v-model="comment" 
                placeholder="แสดงความคิดเห็น (ไม่จำเป็น)"
                class="comment-textarea"
                rows="3"
              ></textarea>
              <button @click="submitRating" class="action-btn rate-btn" :disabled="!rating || isProcessing">
                <span v-if="!isProcessing">{{ job.SCORE ? '✏️ แก้ไขคะแนน' : '⭐ ส่งคะแนน' }}</span>
                <span v-else>กำลังบันทึก...</span>
              </button>
            </div>
          </div>
        </div>

        <!-- แสดงรีวิว (ถ้างานยังไม่เสร็จ) -->
        <div v-else class="detail-card">
          <h2 class="card-title">รีวิว (Rating)</h2>
          <template v-if="job.SCORE">
             <div class="rating-display">
                <span v-for="n in 5" :key="n" class="star">
                  {{ n <= job.SCORE ? '★' : '☆' }}
                </span>
                <span class="score-text">({{ job.SCORE }}/5)</span>
             </div>
             <div class="detail-item">
               <label>คอมเมนต์:</label>
               <span>"{{ job.COMMENT }}"</span>
             </div>
          </template>
          <template v-else>
            <div class="no-data">
              <p>งานยังไม่เสร็จสิ้น ไม่สามารถให้คะแนนได้</p>
            </div>
          </template>
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

    <!-- Alert Notification -->
    <div v-if="alertMessage" :class="['alert-notification', alertType]">
      {{ alertMessage }}
    </div>

  </div>
</template>

<script>
import Navcust from '../../components/Navcust.vue';
import axios from 'axios';

export default {
  name: 'RepairDetail',
  components: { Navcust },
  
  data() {
    return {
      isLoading: true,
      error: null,
      job: {},
      
      // Modal รูปภาพ
      showImageModal: false,
      selectedImage: null,
      
      // จ่ายเงิน
      paymentMethod: 'Cash',
      
      // ให้คะแนน
      rating: 0,
      comment: '',
      
      // UI State
      isProcessing: false,
      alertMessage: '',
      alertType: 'success'
    }
  },
  
  async created() {
    const loggedInUser = JSON.parse(localStorage.getItem('user'));
    if (!loggedInUser || loggedInUser.role !== 'user') {
      this.$router.push('/login');
      return;
    }
    
    await this.fetchJobDetail();
  },
  
  methods: {
    async fetchJobDetail() {
      const assignmentId = this.$route.params.id;
      
      try {
        this.isLoading = true;
        const response = await axios.get(`http://localhost:3000/api/assignment/${assignmentId}`, {
          withCredentials: true 
        });
        
        console.log('📦 Job Data:', response.data);
        
        this.job = response.data;
        
        // ตั้งค่าคะแนนและความคิดเห็นปัจจุบัน
        if (this.job.SCORE) {
          this.rating = this.job.SCORE;
          this.comment = this.job.COMMENT || '';
        }
        
        this.isLoading = false;
        
      } catch (err) {
        this.isLoading = false;
        if (err.response && err.response.status === 401) {
          alert('Session หมดอายุ กรุณาล็อกอินใหม่');
          this.$router.push('/login');
        } else if (err.response) {
          this.error = `Error ${err.response.status}: ${err.response.data.message}`;
        } else {
          this.error = "ไม่สามารถเชื่อมต่อ Backend ได้";
        }
      }
    },
    
    // 💰 จ่ายเงิน
    async makePayment() {
      if (!confirm(`ยืนยันการชำระเงิน ${this.job.TOTAL_PRICE.toFixed(2)} บาท ด้วย${this.paymentMethod}?`)) {
        return;
      }
      
      this.isProcessing = true;
      try {
        const response = await axios.put(
          `http://localhost:3000/api/payment/${this.job.ASSIGNMENT_ID}`,
          { payMethod: this.paymentMethod },
          { withCredentials: true }
        );
        
        this.showAlert(response.data.message, 'success');
        await this.fetchJobDetail();
        
      } catch (error) {
        console.error('Payment Error:', error);
        this.showAlert('เกิดข้อผิดพลาด: ' + (error.response?.data?.message || error.message), 'error');
      } finally {
        this.isProcessing = false;
      }
    },
    
    // ⭐ ให้คะแนน
    async submitRating() {
      if (!this.rating) {
        this.showAlert('กรุณาให้คะแนน', 'error');
        return;
      }
      
      this.isProcessing = true;
      try {
        const response = await axios.post(
          `http://localhost:3000/api/rating/${this.job.ASSIGNMENT_ID}`,
          { 
            score: this.rating,
            comment: this.comment
          },
          { withCredentials: true }
        );
        
        this.showAlert(response.data.message, 'success');
        await this.fetchJobDetail();
        
      } catch (error) {
        console.error('Rating Error:', error);
        this.showAlert('เกิดข้อผิดพลาด: ' + (error.response?.data?.message || error.message), 'error');
      } finally {
        this.isProcessing = false;
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
    
    handleImageError(event) {
      event.target.src = 'https://via.placeholder.com/300x300?text=Image+Not+Found';
    },
    
    showAlert(message, type) {
      this.alertMessage = message;
      this.alertType = type;
      setTimeout(() => {
        this.alertMessage = '';
      }, 5000);
    },
    
    getStatusText(status) {
      const statusMap = {
        'Pending': '⏳ รอดำเนินการ',
        'In Progress': '🔧 กำลังซ่อม',
        'Completed': '✅ เสร็จสิ้น',
        'Cancelled': '❌ ยกเลิก'
      };
      return statusMap[status] || status;
    },
    
    getStatusClass(status) {
      if (status === 'In Progress') return 'processing';
      if (status === 'Completed') return 'done';
      if (status === 'Cancelled') return 'cancelled';
      return 'pending';
    },
    
    formatDateTime(isoString) {
      if (!isoString) return 'N/A';
      const date = new Date(isoString);
      return date.toLocaleString('th-TH', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    }
  }
}
</script>

<style scoped>
/* CSS เดิม... */
.page-container {
  min-height: 100vh;
  background: linear-gradient(135deg, #000000 0%, #1a1a1a 100%);
  font-family: 'Space Grotesk', sans-serif;
}
.content-wrapper {
  margin-left: 250px;
  padding: 3rem 2rem;
  min-height: 100vh;
}
.header {
  text-align: center;
  margin-bottom: 3rem;
  animation: fadeInDown 0.8s ease;
}
@keyframes fadeInDown { from { opacity: 0; transform: translateY(-30px); } to { opacity: 1; transform: translateY(0); } }
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

.loading-state, .error-state {
  text-align: center;
  color: rgba(255, 255, 255, 0.7);
  padding: 4rem;
}
.loading-icon, .error-icon {
  font-size: 4rem;
  margin-bottom: 1rem;
}
.error-state p {
  color: #ff4d4d;
}

.detail-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 1.5rem;
  max-width: 1200px;
  margin: 0 auto;
}

.detail-card {
  background: linear-gradient(135deg, rgba(26, 26, 26, 0.9), rgba(0, 0, 0, 0.9));
  backdrop-filter: blur(10px);
  border-radius: 20px;
  padding: 2rem;
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4);
  animation: fadeInUp 0.6s ease;
}
@keyframes fadeInUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }

.card-title {
  color: #fff;
  font-size: 1.6rem;
  font-weight: 700;
  margin-top: 0;
  margin-bottom: 2rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid rgba(255, 0, 127, 0.3);
}

.detail-item {
  margin-bottom: 1.5rem;
}
.detail-item label {
  display: block;
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.6);
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 0.5rem;
}
.detail-item span {
  font-size: 1.1rem;
  color: #fff;
  line-height: 1.5;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}
.no-data {
  text-align: center;
  color: rgba(255, 255, 255, 0.5);
  padding: 1rem 0;
}

.status-badge {
  padding: 0.5rem 1.2rem;
  border-radius: 20px;
  font-size: 1rem;
  font-weight: 600;
  white-space: nowrap;
  display: inline-block;
  margin-bottom: 1.5rem;
}
.status-badge.pending { background: linear-gradient(135deg, rgba(255, 196, 0, 0.2), rgba(255, 196, 0, 0.1)); color: #ffc400; border: 1px solid rgba(255, 196, 0, 0.3); }
.status-badge.processing { background: linear-gradient(135deg, rgba(0, 123, 255, 0.2), rgba(0, 123, 255, 0.1)); color: #007bff; border: 1px solid rgba(0, 123, 255, 0.3); }
.status-badge.done { background: linear-gradient(135deg, rgba(41, 224, 131, 0.2), rgba(41, 224, 131, 0.1)); color: #29e083; border: 1px solid rgba(41, 224, 131, 0.3); }
.status-badge.cancelled { background: linear-gradient(135deg, rgba(255, 0, 0, 0.2), rgba(255, 0, 0, 0.1)); color: #ff4d4d; border: 1px solid rgba(255, 0, 0, 0.3); }

.images-card {
  border-color: rgba(255, 0, 127, 0.3);
}

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
  box-shadow: 0 0 20px rgba(255, 0, 127, 0.6);
}

.job-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: all 0.3s ease;
}

.image-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.image-item:hover .image-overlay {
  opacity: 1;
}

.zoom-icon {
  font-size: 2rem;
  color: #fff;
}

.detail-card.finance {
  background: linear-gradient(135deg, rgba(26, 26, 26, 0.9), rgba(0, 0, 0, 0.9));
  border-color: rgba(41, 224, 131, 0.3);
}
.finance .card-title { border-color: rgba(41, 224, 131, 0.3); }
.detail-item.price {
  display: flex;
  justify-content: space-between;
  border-bottom: 1px dashed rgba(255, 255, 255, 0.1);
  padding-bottom: 1rem;
}
.detail-item.price label { margin: 0; }
.detail-item.price span { font-size: 1.1rem; }
.detail-item.promo span { color: #ff4d4d; }
.total-price {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 1.5rem;
  padding: 1rem;
  background: rgba(41, 224, 131, 0.1);
  border-radius: 12px;
}
.total-price label {
  font-size: 1.2rem;
  font-weight: 700;
  color: #29e083;
  margin: 0;
}
.total-price span {
  font-size: 1.5rem;
  font-weight: 700;
  color: #29e083;
}

.paid-status {
  color: #29e083 !important;
  font-weight: 700;
}

.unpaid-status {
  color: #ffc400 !important;
  font-weight: 700;
}

.rating-display {
  display: flex;
  align-items: center;
  gap: 0.25rem;
  margin-bottom: 1rem;
}
.star {
  font-size: 2rem;
  color: #ffc400;
}
.score-text {
  font-size: 1.1rem;
  color: #ffc400;
  margin-left: 0.5rem;
}

/* ⭐ Action Card (ใหม่) */
.action-card {
  grid-column: 1 / -1;
  border-color: rgba(255, 196, 0, 0.3);
}

.action-section {
  margin-bottom: 2rem;
  padding-bottom: 2rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.action-section:last-child {
  margin-bottom: 0;
  padding-bottom: 0;
  border-bottom: none;
}

.action-subtitle {
  color: #ffc400;
  font-size: 1.2rem;
  margin-bottom: 1.5rem;
  font-weight: 600;
}

.payment-info {
  max-width: 500px;
}

.amount-display {
  font-size: 1.3rem;
  color: #29e083;
  margin-bottom: 1.5rem;
}

.amount-display strong {
  font-size: 1.6rem;
  font-weight: 700;
}

.form-group {
  margin-bottom: 1.5rem;
}

.form-group label {
  display: block;
  color: rgba(255, 255, 255, 0.8);
  margin-bottom: 0.5rem;
  font-size: 0.9rem;
  font-weight: 600;
}

.select-input {
  width: 100%;
  padding: 0.8rem;
  background: rgba(0, 0, 0, 0.4);
  border: 1px solid rgba(255, 0, 127, 0.3);
  border-radius: 8px;
  color: #ffffff;
  font-size: 1rem;
  font-family: inherit;
}

.action-btn {
  width: 100%;
  padding: 1rem;
  border: none;
  color: #ffffff;
  font-size: 1.1rem;
  font-weight: 700;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.action-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.pay-btn {
  background: linear-gradient(135deg, #29e083 0%, #1fc66f 100%);
  box-shadow: 0 4px 20px rgba(41, 224, 131, 0.3);
}

.pay-btn:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 6px 30px rgba(41, 224, 131, 0.5);
}

.rating-section {
  max-width: 600px;
}

.current-rating-display {
  background: rgba(255, 196, 0, 0.1);
  border: 1px solid rgba(255, 196, 0, 0.3);
  border-radius: 12px;
  padding: 1.5rem;
  margin-bottom: 1.5rem;
}

.current-rating-display p {
  color: rgba(255, 255, 255, 0.8);
  margin-bottom: 0.5rem;
}

.rating-stars-display {
  display: flex;
  align-items: center;
  gap: 0.25rem;
  margin-bottom: 0.5rem;
}

.star-display {
  font-size: 2rem;
  color: #ffc400;
}

.score-number {
  font-size: 1.1rem;
  color: #ffc400;
  margin-left: 0.5rem;
}

.comment-display {
  color: rgba(255, 255, 255, 0.7);
  font-style: italic;
  margin-top: 0.5rem;
}

.rating-form {
  /* styling */
}

.stars-input {
  display: flex;
  gap: 0.5rem;
  justify-content: center;
  margin-bottom: 1.5rem;
}

.star-input {
  font-size: 2.5rem;
  cursor: pointer;
  color: rgba(255, 196, 0, 0.3);
  transition: all 0.2s ease;
}

.star-input.active {
  color: #ffc400;
  transform: scale(1.1);
}

.star-input:hover {
  transform: scale(1.2);
}

.comment-textarea {
  width: 100%;
  padding: 1rem;
  background: rgba(0, 0, 0, 0.4);
  border: 1px solid rgba(255, 0, 127, 0.3);
  border-radius: 8px;
  color: #ffffff;
  font-family: inherit;
  font-size: 1rem;
  resize: vertical;
  margin-bottom: 1.5rem;
}

.comment-textarea::placeholder {
  color: rgba(255, 255, 255, 0.3);
}

.rate-btn {
  background: linear-gradient(135deg, #ff007f 0%, #ff4da6 100%);
  box-shadow: 0 4px 20px rgba(255, 0, 127, 0.3);
}

.rate-btn:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 6px 30px rgba(255, 0, 127, 0.5);
}

/* Image Modal */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.9);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2000;
  animation: fadeIn 0.3s ease;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

.image-modal-content {
  position: relative;
  max-width: 90%;
  max-height: 90%;
  animation: zoomIn 0.3s ease;
}

@keyframes zoomIn {
  from { transform: scale(0.8); opacity: 0; }
  to { transform: scale(1); opacity: 1; }
}

.image-modal-content img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  border-radius: 12px;
  box-shadow: 0 0 50px rgba(255, 0, 127, 0.5);
}

.close-btn {
  position: absolute;
  top: -50px;
  right: 0;
  background: rgba(255, 0, 127, 0.8);
  border: none;
  color: #fff;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  font-size: 1.8rem;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  justify-content: center;
  align-items: center;
}

.close-btn:hover {
  background: #ff007f;
  transform: rotate(90deg) scale(1.1);
  box-shadow: 0 0 20px rgba(255, 0, 127, 0.8);
}

/* Alert Notification */
.alert-notification {
  position: fixed;
  top: 100px;
  right: 20px;
  padding: 1rem 1.5rem;
  border-radius: 12px;
  font-weight: 600;
  z-index: 9999;
  animation: slideIn 0.3s ease;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.3);
}

.alert-notification.success {
  background: linear-gradient(135deg, rgba(41, 224, 131, 0.95), rgba(31, 198, 111, 0.95));
  color: #ffffff;
}

.alert-notification.error {
  background: linear-gradient(135deg, rgba(220, 53, 69, 0.95), rgba(255, 77, 77, 0.95));
  color: #ffffff;
}

@keyframes slideIn {
  from {
    transform: translateX(100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}

/* Responsive */
@media (max-width: 900px) {
  .detail-grid {
    grid-template-columns: 1fr;
  }
  .action-card {
    grid-column: 1;
  }
}

@media (max-width: 768px) {
  .content-wrapper {
    margin-left: 0;
    padding: 2rem 1rem;
    padding-bottom: 100px;
  }
  .gradient-text {
    font-size: 2rem;
  }
  .images-grid {
    grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
  }
  .close-btn {
    top: -40px;
    width: 40px;
    height: 40px;
    font-size: 1.5rem;
  }
  .stars-input {
    gap: 0.3rem;
  }
  .star-input {
    font-size: 2rem;
  }
}
</style>
<template>
  <div class="hero-section">
    <Navtech />
    <div class="content-wrapper">
      <header class="header">
        <div class="header-content">
          <div class="header-icon">⚙️</div>
          <h1 class="hero-text">งานที่ได้รับมอบหมาย</h1>
          <p class="hero-subtitle">รายการงานที่คุณต้องดำเนินการ</p>
        </div>
      </header>

      <div class="jobs-container">
        <div v-if="jobs.length === 0" class="empty">
          <div class="empty-icon">📭</div>
          <p>ไม่มีงานในขณะนี้</p>
        </div>

        <div v-for="job in jobs" :key="job.id" class="job-card">
          <div class="card-top">
            <div class="category-badge">{{ job.category }}</div>
            <span :class="['status-dot', getStatusClass(job.status)]"></span>
          </div>

          <div class="card-content">
            <div class="info-item">
              <span class="info-icon">👤</span>
              <div class="info-text">
                <span class="info-label">ลูกค้า</span>
                <span class="info-value">{{ job.customer }}</span>
              </div>
            </div>

            <div class="info-item">
              <span class="info-icon">📍</span>
              <div class="info-text">
                <span class="info-label">ที่อยู่</span>
                <span class="info-value">{{ job.address }}</span>
              </div>
            </div>

            <div class="info-item">
              <span class="info-icon">📅</span>
              <div class="info-text">
                <span class="info-label">วันที่แจ้งซ่อม</span>
                <span class="info-value">{{ formatDate(job.date) }}</span>
              </div>
            </div>

            <div class="status-row">
              <span class="status-label">สถานะ</span>
              <span :class="['status-badge', getStatusClass(job.status)]">
                {{ job.status }}
              </span>
            </div>
          </div>

          <button @click="viewDetail(job.id)" class="detail-btn">
            <span>ดูรายละเอียด</span>
            <span class="btn-arrow">→</span>
          </button>
        </div>
      </div>
    </div>

    <div class="blue-footer-bar"></div>
  </div>
</template>

<script>
import Navtech from '../../components/Navtech.vue';

export default {
  name: 'JobList',
  components: { Navtech },
  data() {
    return {
      jobs: [
        {
          id: 1,
          category: 'ไฟฟ้า',
          customer: 'สมชาย ใจดี',
          address: 'ซอยสุขุมวิท 10',
          status: 'รอดำเนินการ',
          date: '2025-10-28'
        },
        {
          id: 2,
          category: 'แอร์',
          customer: 'สมหญิง แสนดี',
          address: 'ซอยสุขุมวิท 15',
          status: 'กำลังทำ',
          date: '2025-10-25'
        },
        {
          id: 3,
          category: 'ประปา',
          customer: 'สมศรี รักดี',
          address: 'ซอยสุขุมวิท 20',
          status: 'เสร็จแล้ว',
          date: '2025-10-20'
        }
      ]
    }
  },
  methods: {
    viewDetail(id) {
      this.$router.push(`/job-detail/${id}`);
    },
    getStatusClass(status) {
      const statusMap = {
        'รอดำเนินการ': 'pending',
        'กำลังทำ': 'processing',
        'เสร็จแล้ว': 'completed'
      };
      return statusMap[status] || 'pending';
    },
    formatDate(dateString) {
      const date = new Date(dateString);
      return date.toLocaleDateString('th-TH', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      });
    }
  }
}
</script>

<style scoped>
/* ================================================= */
/* พื้นหลังสีดำทั่วทั้งหน้า */
:global(html),
:global(body),
:global(#app) {
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

/* ================================================= */
/* Hero Section */
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

/* Particle Effect */
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

/* ================================================= */
/* Content Wrapper */
.content-wrapper {
  margin-left: 220px;
  padding: 100px 40px 60px 40px;
  min-height: 100vh;
  max-width: 1400px;
  position: relative;
  z-index: 1;
}

/* ================================================= */
/* Header */
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

/* ================================================= */
/* Jobs Container */
.jobs-container {
  max-width: 900px;
  margin: 0 auto;
  display: grid;
  gap: 1.5rem;
}

/* ================================================= */
/* Job Card */
.job-card {
  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 0, 127, 0.3);
  border-radius: 15px;
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

/* Card Top */
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

/* Status Dot */
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
  0%, 100% { opacity: 0.3; transform: scale(1); }
  50% { opacity: 0.1; transform: scale(1.2); }
}

.status-dot.pending { 
  background: #ff9100; 
  color: #ff9100; 
}

.status-dot.processing { 
  background: #ff007f; 
  color: #ff007f; 
}

.status-dot.completed { 
  background: #29e083; 
  color: #29e083; 
}

/* Card Content */
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

/* Status Row */
.status-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 1px solid rgba(255, 0, 127, 0.2);
}

.status-label {
  font-size: 0.75rem;
  color: rgba(255, 255, 255, 0.5);
  text-transform: uppercase;
  letter-spacing: 1px;
}

.status-badge {
  padding: 0.4rem 1rem;
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  border: 1px solid currentColor;
  box-shadow: 0 0 10px currentColor;
}

.status-badge.pending {
  color: #ff9100;
  background: rgba(255, 145, 0, 0.1);
}

.status-badge.processing {
  color: #ff007f;
  background: rgba(255, 0, 127, 0.1);
}

.status-badge.completed {
  color: #29e083;
  background: rgba(41, 224, 131, 0.1);
}

/* ================================================= */
/* Detail Button - Glowing Pink */
.detail-btn {
  width: 100%;
  padding: 1rem;
  background: linear-gradient(135deg, #ff007f 0%, #ff4da6 100%);
  border: none;
  color: #fff;
  font-size: 1rem;
  font-weight: 700;
  letter-spacing: 0.5px;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  position: relative;
  overflow: hidden;
  box-shadow: 0 0 20px rgba(255, 0, 127, 0.3);
  animation: glowPink 2s ease-in-out infinite alternate;
}

.detail-btn::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
  transition: left 0.5s;
}

.detail-btn:hover::before {
  left: 100%;
}

.detail-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 0 30px rgba(255, 0, 127, 0.5),
              0 0 60px rgba(255, 0, 127, 0.3);
}

@keyframes glowPink {
  0% { 
    box-shadow: 0 0 20px rgba(255, 0, 127, 0.3);
  }
  100% { 
    box-shadow: 0 0 30px rgba(255, 0, 127, 0.5),
                0 0 60px rgba(255, 0, 127, 0.3);
  }
}

.btn-arrow {
  transition: transform 0.3s ease;
  font-size: 1.2rem;
}

.detail-btn:hover .btn-arrow {
  transform: translateX(5px);
}

/* ================================================= */
/* Empty State */
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

/* ================================================= */
/* Footer Bar */
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

/* ================================================= */
/* Responsive */
@media (max-width: 1024px) {
  .content-wrapper {
    margin-left: 180px;
    padding: 90px 30px 50px 30px;
  }
}

@media (max-width: 768px) {
  .content-wrapper {
    margin-left: 0;
    padding: 80px 20px 50px 20px;
  }

  .hero-text { font-size: 2rem; }
  .hero-subtitle { font-size: 1rem; }
  .header-icon { font-size: 2.5rem; }
}

@media (max-width: 480px) {
  .content-wrapper {
    padding: 70px 15px 50px 15px;
  }

  .hero-text { font-size: 1.5rem; }
  .category-badge { font-size: 1rem; }
  .detail-btn { font-size: 0.9rem; padding: 0.9rem; }
}

/* ================================================= */
/* Scrollbar */
.content-wrapper::-webkit-scrollbar { 
  width: 6px; 
}

.content-wrapper::-webkit-scrollbar-track { 
  background: rgba(0, 0, 0, 0.3); 
}

.content-wrapper::-webkit-scrollbar-thumb {
  background: rgba(255, 0, 127, 0.5);
  border-radius: 10px;
}

.content-wrapper::-webkit-scrollbar-thumb:hover {
  background: rgba(255, 0, 127, 0.7);
}
</style>
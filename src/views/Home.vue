<template>
  <div class="page-wrapper">
    <header class="navbar">
      <div class="navbar-container">
        <div class="logo">
          <span class="logo-text">FIT<span class="logo-highlight">ถึงใจ</span></span>
        </div>
        <nav class="nav-links">
          <a href="#home" class="nav-item">หน้าหลัก</a>
          <a href="#stats" class="nav-item">สถิติ</a>
          <a href="#services" class="nav-item">บริการ</a>
          <a href="#reviews" class="nav-item">รีวิว</a>
        </nav>
      </div>
    </header>

    <div class="hero-section" id="home">
      <div class="hero-content">
        <h1 class="hero-text">Fixถึงใจที่ถึงที่</h1>
        <p class="hero-subtitle">บริการคุณภาพ พร้อมฟิตเนสทุกที่ทุกเวลา</p>
        
        <!-- ปุ่มชมพูเรืองแสง -->
        <router-link to="/login" class="GlowingButton">
          <span class="GlowingButton__content">
            <span>เข้าสู่ระบบ</span>
          </span>
        </router-link>

        <!-- ⭐ Popup Cards Section ⭐ -->
        <div class="popup-cards-container" id="stats">
          
          <!-- Card 1: สถิติภาพรวม -->
          <div class="popup-card">
            <div class="card-icon">📊</div>
            <h3 class="card-title">สถิติภาพรวม</h3>
            
            <div v-if="loadingStats" class="card-loading">
              <div class="spinner"></div>
              <p>กำลังโหลด...</p>
            </div>
            
            <div v-else-if="overview" class="card-content">
              <div class="mini-stat">
                <span class="mini-icon">👨‍🔧</span>
                <span class="mini-value">{{ overview.TOTAL_TECHNICIANS }}</span>
                <span class="mini-label">ช่างทั้งหมด</span>
              </div>
              <div class="mini-stat">
                <span class="mini-icon">👥</span>
                <span class="mini-value">{{ overview.TOTAL_CUSTOMERS }}</span>
                <span class="mini-label">ลูกค้า</span>
              </div>
              <div class="mini-stat">
                <span class="mini-icon">✅</span>
                <span class="mini-value">{{ overview.COMPLETED_JOBS }}</span>
                <span class="mini-label">งานสำเร็จ</span>
              </div>
              <div class="mini-stat highlight">
                <span class="mini-icon">⭐</span>
                <span class="mini-value">{{ overview.OVERALL_RATING }}</span>
                <span class="mini-label">คะแนนเฉลี่ย</span>
              </div>
            </div>
            
            <div v-else class="card-error">
              <p>❌ ไม่สามารถโหลดข้อมูลได้</p>
            </div>
          </div>

          <!-- Card 2: บริการยอดนิยม -->
          <div class="popup-card" id="services">
            <div class="card-icon">🔥</div>
            <h3 class="card-title">บริการยอดนิยม</h3>
            
            <div v-if="loadingServices" class="card-loading">
              <div class="spinner"></div>
              <p>กำลังโหลด...</p>
            </div>
            
            <div v-else-if="topServices.length > 0" class="card-content">
              <div 
                v-for="(service, index) in topServices.slice(0, 3)" 
                :key="service.SERVICE_ID" 
                class="service-item"
              >
                <span class="service-rank">#{{ index + 1 }}</span>
                <span class="service-name">{{ service.SERVICE_NAME }}</span>
                <span class="service-count">{{ service.BOOKING_COUNT }} จอง</span>
              </div>
              <div class="service-more">
                <span>+ อีก {{ topServices.length - 3 }} บริการ</span>
              </div>
            </div>
            
            <div v-else class="card-error">
              <p>❌ ไม่พบข้อมูลบริการ</p>
            </div>
            
            <button class="card-btn" @click="showAllServices">ดูทั้งหมด</button>
          </div>

          <!-- Card 3: รีวิวล่าสุด -->
          <div class="popup-card" id="reviews">
            <div class="card-icon">💬</div>
            <h3 class="card-title">รีวิวล่าสุด</h3>
            
            <div v-if="loadingReviews" class="card-loading">
              <div class="spinner"></div>
              <p>กำลังโหลด...</p>
            </div>
            
            <div v-else-if="latestReviews.length > 0" class="card-content">
              <div 
                v-for="review in latestReviews.slice(0, 2)" 
                :key="review.RATING_ID" 
                class="review-item"
              >
                <div class="review-stars">
                  <span v-for="i in Math.floor(review.SCORE)" :key="i" class="star filled">⭐</span>
                  <span v-for="i in (5 - Math.floor(review.SCORE))" :key="'empty-'+i" class="star">☆</span>
                </div>
                <p class="review-text">{{ truncateText(review.SHORT_COMMENT, 60) }}</p>
                <div class="review-meta">
                  <span class="review-author">{{ review.CUSTOMER_NAME }}</span>
                  <span class="review-date">{{ review.JOB_DATE }}</span>
                </div>
              </div>
            </div>
            
            <div v-else class="card-error">
              <p>❌ ไม่พบรีวิว</p>
            </div>
            
            <button class="card-btn" @click="showAllReviews">ดูทั้งหมด</button>
          </div>

        </div>
      </div>
    </div>

    <div class="blue-footer-bar"></div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';

const router = useRouter();

// ⭐ Reactive Data
const overview = ref(null);
const topServices = ref([]);
const latestReviews = ref([]);

const loadingStats = ref(true);
const loadingServices = ref(true);
const loadingReviews = ref(true);

// ⭐ Load Data จาก API
onMounted(async () => {
  await loadAllData();
});

async function loadAllData() {
  await Promise.all([
    loadSystemOverview(),
    loadTopServices(),
    loadLatestReviews()
  ]);
}

async function loadSystemOverview() {
  try {
    const response = await axios.get('http://localhost:3000/api/public/system-overview');
    overview.value = response.data;
    console.log('✅ สถิติภาพรวม:', overview.value);
  } catch (error) {
    console.error('❌ Error loading overview:', error);
  } finally {
    loadingStats.value = false;
  }
}

async function loadTopServices() {
  try {
    const response = await axios.get('http://localhost:3000/api/public/top-services');
    topServices.value = response.data;
    console.log('✅ บริการยอดนิยม:', topServices.value.length, 'รายการ');
  } catch (error) {
    console.error('❌ Error loading services:', error);
  } finally {
    loadingServices.value = false;
  }
}

async function loadLatestReviews() {
  try {
    const response = await axios.get('http://localhost:3000/api/public/latest-reviews');
    latestReviews.value = response.data;
    console.log('✅ รีวิวล่าสุด:', latestReviews.value.length, 'รายการ');
  } catch (error) {
    console.error('❌ Error loading reviews:', error);
  } finally {
    loadingReviews.value = false;
  }
}

// ⭐ Helper Functions
function truncateText(text, maxLength) {
  if (!text) return '';
  return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
}

function showAllServices() {
  alert('🔥 กำลังไปหน้าบริการทั้งหมด...');
  // router.push('/services'); // ถ้ามีหน้า Services
}

function showAllReviews() {
  alert('💬 กำลังไปหน้ารีวิวทั้งหมด...');
  // router.push('/reviews'); // ถ้ามีหน้า Reviews
}
</script>

<style>
/* ================================================= */
/* Global Reset - แก้ปัญหาช่องว่าง */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html {
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
  overflow-x: hidden;
  scroll-behavior: smooth;
}

body {
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
  background-color: #000000;
  overflow-x: hidden;
  font-family: 'Space Grotesk', 'Kanit', -apple-system, BlinkMacSystemFont, sans-serif;
}

#app {
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
  background-color: #000000;
}
</style>

<style scoped>
/* ================================================= */
/* Page Wrapper - ครอบทั้งหมด */
.page-wrapper {
  position: relative;
  width: 100vw;
  min-height: 100vh;
  margin: 0;
  padding: 0;
  background: linear-gradient(135deg, #000000 0%, #1a1a1a 100%);
  overflow-x: hidden;
}

/* ================================================= */
/* Navbar */
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  padding: 0;
  background: rgba(0, 0, 0, 0.85);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid rgba(255, 0, 127, 0.3);
  z-index: 100;
  box-shadow: 0 4px 30px rgba(255, 0, 127, 0.1);
}

.navbar-container {
  max-width: 1400px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.2rem 2rem;
}

/* Logo */
.logo {
  font-size: 1.8rem;
  font-weight: 900;
  cursor: pointer;
  transition: transform 0.3s ease;
}

.logo:hover {
  transform: scale(1.05);
}

.logo-text {
  color: #fff;
  text-shadow: 0 0 10px rgba(255, 0, 127, 0.5);
}

.logo-highlight {
  color: #ff007f;
  text-shadow: 0 0 20px rgba(255, 0, 127, 0.8);
}

/* Navigation Links */
.nav-links {
  display: flex;
  gap: 2.5rem;
  align-items: center;
}

.nav-item {
  color: rgba(255, 255, 255, 0.9);
  text-decoration: none;
  font-weight: 600;
  font-size: 1rem;
  position: relative;
  padding: 0.5rem 0;
  transition: color 0.3s ease;
}

/* Underline effect */
.nav-item::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 0;
  height: 2px;
  background: linear-gradient(90deg, #ff007f, #ffc400);
  transition: width 0.3s ease;
}

.nav-item:hover {
  color: #ff007f;
}

.nav-item:hover::after {
  width: 100%;
}

/* ================================================= */
/* Hero Section */
.hero-section {
  position: relative;
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 140px 2rem 2rem;
  overflow: hidden;
}

/* เพิ่มพื้นหลัง particle effect */
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
}

@keyframes particles {
  0%, 100% { background-position: 0% 0%; }
  50% { background-position: 100% 100%; }
}

/* Hero Content */
.hero-content {
  position: relative;
  z-index: 1;
  margin-top: 4rem;
  width: 100%;
  max-width: 1400px;
}

/* ข้อความหัวเรื่อง ขยับขึ้นลงเล็กน้อย */
.hero-text {
  font-size: 5rem;
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
  0% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
  100% { transform: translateY(0); }
}

.hero-subtitle {
  font-size: 1.5rem;
  margin-bottom: 2rem;
  color: rgba(255, 255, 255, 0.8);
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.5);
}

/* ================================================= */
/* Glowing Pink Button */
.GlowingButton {
  position: relative;
  display: inline-flex;
  height: 55px;
  width: 200px;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  margin-top: 1.5rem;
  border-radius: 30px;
  color: #fff;
  font-weight: 700;
  font-size: 1.2rem;
  text-align: center;
  background: linear-gradient(135deg, #ff007f 0%, #ff4da6 100%);
  box-shadow: 0 0 20px rgba(255, 0, 127, 0.5), 
              0 0 40px rgba(255, 0, 127, 0.3),
              0 0 60px rgba(255, 0, 127, 0.1);
  transition: all 0.3s ease;
  animation: glowPink 2s ease-in-out infinite alternate;
  overflow: hidden;
}

.GlowingButton::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
  transition: left 0.5s;
}

.GlowingButton:hover::before {
  left: 100%;
}

.GlowingButton:hover {
  transform: translateY(-3px) scale(1.05);
  box-shadow: 0 0 30px rgba(255, 0, 127, 0.7), 
              0 0 60px rgba(255, 0, 127, 0.5),
              0 0 90px rgba(255, 0, 127, 0.3);
}

@keyframes glowPink {
  0% { 
    box-shadow: 0 0 20px rgba(255, 0, 127, 0.5), 
                0 0 40px rgba(255, 0, 127, 0.3),
                0 0 60px rgba(255, 0, 127, 0.1);
  }
  100% { 
    box-shadow: 0 0 30px rgba(255, 0, 127, 0.7), 
                0 0 60px rgba(255, 0, 127, 0.5),
                0 0 90px rgba(255, 0, 127, 0.3);
  }
}

.GlowingButton__content {
  color: #fff;
  position: relative;
  z-index: 1;
  text-shadow: 0 2px 5px rgba(0, 0, 0, 0.3);
}

/* ================================================= */
/* ⭐ Popup Cards Container */
.popup-cards-container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
  margin-top: 4rem;
  max-width: 1200px;
  width: 100%;
  margin-left: auto;
  margin-right: auto;
}

/* Popup Card */
.popup-card {
  background: rgba(20, 20, 20, 0.85);
  backdrop-filter: blur(15px);
  border: 1px solid rgba(255, 0, 127, 0.3);
  border-radius: 20px;
  padding: 2rem;
  text-align: center;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
  animation: fadeInUp 0.6s ease-out forwards;
  opacity: 0;
  transform: translateY(30px);
}

@keyframes fadeInUp {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.popup-card:nth-child(1) { animation-delay: 0.1s; }
.popup-card:nth-child(2) { animation-delay: 0.2s; }
.popup-card:nth-child(3) { animation-delay: 0.3s; }

.popup-card::before {
  content: '';
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: radial-gradient(circle, rgba(255, 0, 127, 0.1), transparent 70%);
  opacity: 0;
  transition: opacity 0.3s;
}

.popup-card:hover::before {
  opacity: 1;
}

.popup-card:hover {
  transform: translateY(-10px) scale(1.02);
  border-color: rgba(255, 0, 127, 0.6);
  box-shadow: 0 20px 60px rgba(255, 0, 127, 0.3);
}

/* Card Icon */
.card-icon {
  font-size: 3.5rem;
  margin-bottom: 1rem;
  filter: drop-shadow(0 0 10px rgba(255, 0, 127, 0.5));
  animation: float 3s ease-in-out infinite;
}

@keyframes float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
}

/* Card Title */
.card-title {
  font-size: 1.5rem;
  font-weight: 700;
  color: #ff007f;
  margin-bottom: 1.5rem;
  text-shadow: 0 0 10px rgba(255, 0, 127, 0.5);
}

/* Card Loading */
.card-loading {
  color: rgba(255, 255, 255, 0.6);
  padding: 2rem 0;
  font-size: 0.9rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  min-height: 200px;
  justify-content: center;
}

.spinner {
  width: 40px;
  height: 40px;
  border: 3px solid rgba(255, 0, 127, 0.2);
  border-top-color: #ff007f;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

/* Card Error */
.card-error {
  color: rgba(255, 100, 100, 0.8);
  padding: 2rem 0;
  min-height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* Card Content */
.card-content {
  margin-bottom: 1.5rem;
  min-height: 200px;
}

/* Mini Stats (สำหรับ Card 1) */
.mini-stat {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0.75rem;
  margin-bottom: 0.75rem;
  background: rgba(0, 0, 0, 0.3);
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: all 0.3s;
}

.mini-stat:hover {
  background: rgba(255, 0, 127, 0.1);
  border-color: rgba(255, 0, 127, 0.3);
  transform: scale(1.05);
}

.mini-stat.highlight {
  background: rgba(255, 196, 0, 0.1);
  border-color: rgba(255, 196, 0, 0.3);
}

.mini-icon {
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
}

.mini-value {
  font-size: 1.8rem;
  font-weight: bold;
  color: #ff007f;
  margin-bottom: 0.25rem;
}

.mini-stat.highlight .mini-value {
  color: #ffc400;
}

.mini-label {
  font-size: 0.8rem;
  color: rgba(255, 255, 255, 0.6);
}

/* Service Items (สำหรับ Card 2) */
.service-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.75rem;
  margin-bottom: 0.5rem;
  background: rgba(0, 0, 0, 0.3);
  border-radius: 8px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: all 0.3s;
}

.service-item:hover {
  background: rgba(255, 0, 127, 0.1);
  border-color: rgba(255, 0, 127, 0.3);
  transform: translateX(5px);
}

.service-rank {
  font-size: 1.2rem;
  font-weight: bold;
  color: #ffc400;
  min-width: 30px;
}

.service-name {
  flex: 1;
  color: white;
  font-size: 0.9rem;
  text-align: left;
  padding: 0 0.5rem;
}

.service-count {
  font-size: 0.8rem;
  color: rgba(255, 255, 255, 0.6);
}

.service-more {
  text-align: center;
  padding: 0.5rem;
  color: rgba(255, 255, 255, 0.5);
  font-size: 0.85rem;
  font-style: italic;
}

/* Review Items (สำหรับ Card 3) */
.review-item {
  padding: 1rem;
  margin-bottom: 0.75rem;
  background: rgba(0, 0, 0, 0.3);
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: all 0.3s;
}

.review-item:hover {
  background: rgba(255, 0, 127, 0.1);
  border-color: rgba(255, 0, 127, 0.3);
  transform: scale(1.02);
}

.review-stars {
  margin-bottom: 0.5rem;
  font-size: 0.9rem;
}

.star {
  color: rgba(255, 196, 0, 0.3);
  margin-right: 2px;
}

.star.filled {
  color: #ffc400;
}

.review-text {
  color: rgba(255, 255, 255, 0.8);
  font-size: 0.85rem;
  line-height: 1.4;
  margin-bottom: 0.5rem;
  text-align: left;
}

.review-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.review-author {
  font-size: 0.75rem;
  color: rgba(255, 255, 255, 0.5);
}

.review-date {
  font-size: 0.75rem;
  color: rgba(255, 255, 255, 0.4);
}

/* Card Button */
.card-btn {
  width: 100%;
  padding: 0.75rem;
  background: linear-gradient(135deg, rgba(255, 0, 127, 0.2), rgba(255, 0, 127, 0.4));
  border: 1px solid rgba(255, 0, 127, 0.5);
  color: white;
  font-weight: 600;
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.3s;
  font-size: 0.9rem;
}

.card-btn:hover {
  background: linear-gradient(135deg, rgba(255, 0, 127, 0.4), rgba(255, 0, 127, 0.6));
  border-color: rgba(255, 0, 127, 0.8);
  transform: translateY(-2px);
  box-shadow: 0 5px 20px rgba(255, 0, 127, 0.4);
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
  z-index: 999;
}

@keyframes footer-animate {
  0% { background-position: 0% 0; }
  100% { background-position: 200% 0; }
}

/* ================================================= */
/* Responsive for Popup Cards */
@media screen and (max-width: 1024px) {
  .popup-cards-container {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .navbar-container {
    padding: 1rem 1.5rem;
  }
  
  .logo {
    font-size: 1.5rem;
  }
  
  .nav-links {
    gap: 1.5rem;
  }
  
  .nav-item {
    font-size: 0.9rem;
  }
  
  .hero-text { 
    font-size: 3.5rem; 
  }
  
  .hero-subtitle { 
    font-size: 1.2rem; 
  }
}

@media screen and (max-width: 768px) {
  .popup-cards-container {
    grid-template-columns: 1fr;
    gap: 1.5rem;
    margin-top: 3rem;
  }
  
  .navbar-container {
    flex-direction: column;
    gap: 1rem;
    padding: 1rem;
  }
  
  .nav-links {
    gap: 1rem;
    flex-wrap: wrap;
    justify-content: center;
  }
  
  .hero-text { 
    font-size: 2.5rem; 
  }
  
  .hero-subtitle { 
    font-size: 1rem; 
  }
  
  .GlowingButton { 
    width: 160px; 
    height: 45px; 
    font-size: 1rem; 
  }
  
  .card-icon {
    font-size: 2.5rem;
  }
  
  .card-title {
    font-size: 1.2rem;
  }
}

@media screen and (max-width: 480px) {
  .hero-text { 
    font-size: 2rem; 
  }
  
  .hero-subtitle { 
    font-size: 0.9rem; 
  }
  
  .nav-item {
    font-size: 0.85rem;
  }
  
  .popup-card {
    padding: 1.5rem;
  }
}
</style>
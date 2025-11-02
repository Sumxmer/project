<template>
  <div class="page-container">
    <Navcust />
    
    <div class="content-wrapper">
      <header class="header">
        <h1 class="gradient-text">ประวัติการซ่อม</h1>
        <p class="subtitle">ตรวจสอบสถานะงานซ่อมของคุณ</p>
      </header>

      <div class="filter-tabs">
        <button 
          :class="['tab', { active: activeTab === 'all' }]"
          @click="activeTab = 'all'"
        >
          ทั้งหมด
        </button>
        <button 
          :class="['tab', { active: activeTab === 'Pending' }]"
          @click="activeTab = 'Pending'"
        >
          รอดำเนินการ
        </button>
        <button 
          :class="['tab', { active: activeTab === 'In Progress' }]"
          @click="activeTab = 'In Progress'"
        >
          กำลังซ่อม
        </button>
        <button 
          :class="['tab', { active: activeTab === 'Completed' }]"
          @click="activeTab = 'Completed'"
        >
          เสร็จสิ้น
        </button>
      </div>

      <div class="repairs-container">
        <div 
          v-for="repair in filteredRepairs" 
          :key="repair.ASSIGNMENT_ID"
          class="repair-card"
        >
          <div class="card-header">
            <div class="repair-info">
              <h2>ซ่อม {{ repair.TE_TYPE }}</h2> 
              <p class="repair-date">📅 {{ formatDateTime(repair.ADATE) }}</p> 
            </div>
            <div :class="['status-badge', getStatusClass(repair.ASTATUS)]">
              {{ getStatusText(repair.ASTATUS) }}
            </div>
          </div>
          <div class="card-body">
            <div class="detail-row">
              <span class="detail-icon">🔧</span>
              <span class="detail-text">ช่าง: {{ repair.TE_NAME }}</span> 
            </div>
            <div class="detail-row">
              <span class="detail-icon">📍</span>
              <span class="detail-text">{{ repair.ADDRESS }}</span> 
            </div>
            <div class="detail-row">
              <span class="detail-icon">📝</span>
              <span class="detail-text">{{ repair.ADESC }}</span> 
            </div>
          </div>
          <div class="card-footer">
            <button 
              class="detail-button" 
              @click="viewDetail(repair.ASSIGNMENT_ID)"
            >
              ดูรายละเอียด
            </button>
          </div>
        </div>
        
        <div v-if="!isLoading && filteredRepairs.length === 0" class="empty-state">
          <div class="empty-icon">📭</div>
          <h3>ไม่พบข้อมูล</h3>
          <p>ยังไม่มีประวัติการซ่อมในหมวดนี้</p>
        </div>
        <div v-if="isLoading" class="empty-state">
           <div class="empty-icon">⏳</div>
           <h3>กำลังโหลดข้อมูล...</h3>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Navcust from '../../components/Navcust.vue';
import axios from 'axios';

export default {
  name: 'RepairHistory',
  components: { 
    Navcust 
  },
  data() {
    return {
      activeTab: 'all',
      isLoading: true,
      repairs: [] 
    }
  },
  
  computed: {
    filteredRepairs() {
      if (this.activeTab === 'all') {
        return this.repairs;
      }
      return this.repairs.filter(repair => repair.ASTATUS === this.activeTab);
    }
  },
  
  methods: {
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
    },
    
    // ⭐️ "แก้ไข" ฟังก์ชันนี้ (จาก alert -> router.push) ⭐️
    viewDetail(id) {
      this.$router.push({ 
        name: 'RepairDetail', 
        params: { id: id } 
      });
    },
    
    async fetchRepairs() {
      this.isLoading = true;
      try {
        const response = await axios.get('http://localhost:3000/api/history/my-jobs', {
            withCredentials: true
        });
        this.repairs = response.data;
        this.isLoading = false;
        
      } catch (error) {
        this.isLoading = false;
        if (error.response && error.response.status === 401) {
            alert('Session หมดอายุ กรุณาล็อกอินใหม่');
            localStorage.removeItem('user');
            this.$router.push('/login');
        } else {
            console.error('Error fetching repairs:', error);
        }
      }
    }
  },
  
  created() {
    const loggedInUser = JSON.parse(localStorage.getItem('user'));
    if (!loggedInUser || loggedInUser.role !== 'user') {
      this.$router.push('/login');
      return;
    }
    this.fetchRepairs();
  },
}
</script>

<style scoped>
/* (CSS ของคุณ... ไม่ต้องแก้) */
.page-container { min-height: 100vh; background: linear-gradient(135deg, #000000 0%, #1a1a1a 100%); font-family: 'Space Grotesk', sans-serif; }
.content-wrapper { margin-left: 250px; padding: 3rem 2rem; min-height: 100vh; }
.header { text-align: center; margin-bottom: 3rem; animation: fadeInDown 0.8s ease; }
@keyframes fadeInDown { from { opacity: 0; transform: translateY(-30px); } to { opacity: 1; transform: translateY(0); } }
.gradient-text { font-size: 3rem; font-weight: 900; margin-bottom: 1rem; background: linear-gradient(135deg, #ff007f 0%, #ff66b2 50%, #ffc400 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; filter: drop-shadow(0 0 20px rgba(255, 0, 127, 0.5)); }
.subtitle { color: rgba(255, 255, 255, 0.8); font-size: 1.2rem; }
.filter-tabs { display: flex; gap: 1rem; justify-content: center; margin-bottom: 2.5rem; flex-wrap: wrap; }
.tab { padding: 0.8rem 1.8rem; background: rgba(255, 255, 255, 0.05); color: rgba(255, 255, 255, 0.7); border: 1px solid rgba(255, 255, 255, 0.1); border-radius: 25px; font-size: 1rem; font-weight: 600; cursor: pointer; transition: all 0.3s ease; }
.tab:hover { background: rgba(255, 0, 127, 0.1); border-color: rgba(255, 0, 127, 0.3); color: #ff007f; }
.tab.active { background: linear-gradient(135deg, #ff007f, #ff4da6); color: #fff; border-color: #ff007f; box-shadow: 0 5px 20px rgba(255, 0, 127, 0.4); }
.repairs-container { max-width: 1000px; margin: 0 auto; display: flex; flex-direction: column; gap: 1.5rem; }
.repair-card { background: linear-gradient(135deg, rgba(26, 26, 26, 0.9), rgba(0, 0, 0, 0.9)); backdrop-filter: blur(10px); -webkit-backdrop-filter: blur(10px); border-radius: 20px; padding: 2rem; border: 1px solid rgba(255, 255, 255, 0.1); box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4); transition: all 0.3s ease; animation: fadeInUp 0.6s ease; }
@keyframes fadeInUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
.repair-card:hover { transform: translateY(-5px); box-shadow: 0 15px 40px rgba(255, 0, 127, 0.3); border-color: rgba(255, 0, 127, 0.3); }
.card-header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 1.5rem; padding-bottom: 1.5rem; border-bottom: 1px solid rgba(255, 255, 255, 0.1); }
.repair-info h2 { color: #fff; font-size: 1.5rem; font-weight: 700; margin: 0 0 0.5rem 0; }
.repair-date { color: rgba(255, 255, 255, 0.6); font-size: 0.95rem; margin: 0; }
.status-badge { padding: 0.5rem 1.2rem; border-radius: 20px; font-size: 0.9rem; font-weight: 600; white-space: nowrap; }
.status-badge.pending { background: linear-gradient(135deg, rgba(255, 196, 0, 0.2), rgba(255, 196, 0, 0.1)); color: #ffc400; border: 1px solid rgba(255, 196, 0, 0.3); }
.status-badge.processing { background: linear-gradient(135deg, rgba(0, 123, 255, 0.2), rgba(0, 123, 255, 0.1)); color: #007bff; border: 1px solid rgba(0, 123, 255, 0.3); }
.status-badge.done { background: linear-gradient(135deg, rgba(41, 224, 131, 0.2), rgba(41, 224, 131, 0.1)); color: #29e083; border: 1px solid rgba(41, 224, 131, 0.3); }
.status-badge.cancelled { background: linear-gradient(135deg, rgba(255, 0, 0, 0.2), rgba(255, 0, 0, 0.1)); color: #ff4d4d; border: 1px solid rgba(255, 0, 0, 0.3); }
.card-body { margin-bottom: 1.5rem; }
.detail-row { display: flex; align-items: flex-start; gap: 1rem; margin-bottom: 1rem; padding: 0.8rem; background: rgba(255, 255, 255, 0.03); border-radius: 10px; transition: all 0.3s ease; }
.detail-row:hover { background: rgba(255, 0, 127, 0.05); }
.detail-icon { font-size: 1.3rem; width: 35px; flex-shrink: 0; }
.detail-text { color: rgba(255, 255, 255, 0.8); font-size: 1rem; line-height: 1.5; }
.card-footer { display: flex; justify-content: flex-end; }
.detail-button { padding: 0.8rem 2rem; background: linear-gradient(135deg, rgba(255, 0, 127, 0.2), rgba(255, 0, 127, 0.1)); color: #ff007f; border: 1px solid rgba(255, 0, 127, 0.3); border-radius: 12px; font-size: 1rem; font-weight: 600; cursor: pointer; transition: all 0.3s ease; }
.detail-button:hover { background: linear-gradient(135deg, #ff007f, #ff4da6); color: #fff; border-color: #ff007f; box-shadow: 0 5px 20px rgba(255, 0, 127, 0.4); transform: translateY(-2px); }
.empty-state { text-align: center; padding: 4rem 2rem; animation: fadeIn 0.8s ease; }
@keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
.empty-icon { font-size: 5rem; margin-bottom: 1.5rem; filter: grayscale(1) opacity(0.5); }
.empty-state h3 { color: rgba(255, 255, 255, 0.7); font-size: 1.8rem; margin-bottom: 0.5rem; }
.empty-state p { color: rgba(255, 255, 255, 0.5); font-size: 1.1rem; }
@media (max-width: 768px) { .content-wrapper { margin-left: 0; padding: 2rem 1rem; padding-bottom: 100px; } .gradient-text { font-size: 2rem; } .filter-tabs { gap: 0.5rem; } .tab { padding: 0.6rem 1.2rem; font-size: 0.9rem; } .card-header { flex-direction: column; gap: 1rem; } .status-badge { align-self: flex-start; } .repair-info h2 { font-size: 1.3rem; } .detail-button { width: 100%; } }
</style>
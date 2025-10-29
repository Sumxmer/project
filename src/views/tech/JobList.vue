<template>
  <div>
    <Navtech />
    <div class="content-wrapper">
      <header class="header">
        <h1>งานที่ได้รับมอบหมาย</h1>
        <p>งานที่คุณกดรับไว้ จะปรากฏที่นี่</p>
      </header>

      <div v-if="assignedJobs.length === 0" class="empty">
        ยังไม่มีงานที่รับ
      </div>

      <div class="jobs-container">
        <div v-for="job in assignedJobs" :key="job.id" class="job-card">
          <h3>{{ job.category }}</h3>
          <p><strong>ลูกค้า:</strong> {{ job.customer }}</p>
          <p><strong>ที่อยู่:</strong> {{ job.address }}</p>
          <p><strong>สถานะ:</strong> <span :class="job.status.toLowerCase()">{{ job.status }}</span></p>
          <p><strong>วันที่แจ้งซ่อม:</strong> {{ job.date }}</p>
          <button @click="viewDetail(job.id)">ดูรายละเอียด</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Navtech from '../../components/Navtech.vue';

export default {
  name: 'JobList',
  components: { Navtech },
  data() {
    return {
      // งานทั้งหมด (ปกติเอาจาก API)
      jobs: [
        { id: 1, category: 'ไฟฟ้า', customer: 'สมชาย ใจดี', address: 'ซอยสุขุมวิท 10', status: 'รอดำเนินการ', date: '2025-10-28' },
        { id: 2, category: 'แอร์', customer: 'สมหญิง แสนดี', address: 'ซอยสุขุมวิท 15', status: 'กำลังทำ', date: '2025-10-25' }
      ],
      // งานที่ช่างรับไว้
      assignedJobs: []
    }
  },
  created() {
    // ตัวอย่าง: โหลด assignedJobs จาก localStorage หรือ API
    const saved = localStorage.getItem('assignedJobs');
    if (saved) this.assignedJobs = JSON.parse(saved);
  },
  methods: {
    viewDetail(id) {
      this.$router.push(`/job-detail/${id}`);
    },
    // รับงานจากหน้าแรก
    acceptJob(job) {
      if (!this.assignedJobs.find(j => j.id === job.id)) {
        this.assignedJobs.push(job);
        localStorage.setItem('assignedJobs', JSON.stringify(this.assignedJobs));
      }
    }
  }
}
</script>

<style scoped>
.content-wrapper {
  margin-left: 200px;
  padding: 20px;
  font-family: Arial, sans-serif;
}

.header {
  text-align: center;
  margin-bottom: 20px;
}

.header h1 { font-size: 2em; margin-bottom: 5px; }
.header p { color: #555; }

/* Jobs container */
.jobs-container { display: flex; flex-direction: column; gap: 15px; }

.job-card {
  background-color: #fff;
  border-radius: 15px;
  padding: 20px;
  box-shadow: 0 4px 15px rgba(0,0,0,0.1);
}

.job-card h3 { margin-top: 0; color: #007bff; }

.job-card button {
  margin-top: 10px; padding: 10px; width: 100%;
  background-color: #007bff; color: white;
  border: none; border-radius: 10px; cursor: pointer;
  transition: background 0.3s;
}

.job-card button:hover { background-color: #0056b3; }

.รอดำเนินการ { color: #ff9800; font-weight: bold; }
.กำลังทำ { color: #2196f3; font-weight: bold; }
.เสร็จแล้ว { color: #4caf50; font-weight: bold; }

.empty { text-align: center; color: #777; font-style: italic; }

@media (max-width: 768px) {
  .content-wrapper { margin-left: 0; padding: 15px; }
}
</style>

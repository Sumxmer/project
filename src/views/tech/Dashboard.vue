<template>
  <div>
    <Navtech />
    <div class="content-wrapper">
      <header class="header">
        <h1>งานแจ้งซ่อมใหม่</h1>
        <p>กดรับงานเพื่อเพิ่มลงในงานของคุณ</p>
      </header>

      <div v-if="jobs.length === 0" class="empty">
        ไม่มีงานแจ้งซ่อมใหม่
      </div>

      <div class="jobs-container">
        <div v-for="job in jobs" :key="job.id" class="job-card">
          <h3>{{ job.category }}</h3>
          <p><strong>ลูกค้า:</strong> {{ job.customer }}</p>
          <p><strong>ที่อยู่:</strong> {{ job.address }}</p>
          <p><strong>วันที่แจ้งซ่อม:</strong> {{ job.date }}</p>
          <button @click="acceptJob(job)">รับงาน</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Navtech from '../../components/Navtech.vue';

export default {
  name: 'Dashboard',
  components: { Navtech },
  data() {
    return {
      // งานแจ้งซ่อมใหม่ทั้งหมด (ปกติดึงจาก API)
      jobs: [
        { id: 1, category: 'ไฟฟ้า', customer: 'สมชาย ใจดี', address: 'ซอยสุขุมวิท 10', date: '2025-10-28' },
        { id: 2, category: 'แอร์', customer: 'สมหญิง แสนดี', address: 'ซอยสุขุมวิท 15', date: '2025-10-25' }
      ]
    }
  },
  methods: {
    acceptJob(job) {
      // เก็บ job ที่รับไว้ใน localStorage หรือส่ง API
      let myJobs = JSON.parse(localStorage.getItem('myJobs') || '[]');
      if (!myJobs.find(j => j.id === job.id)) {
        myJobs.push({ ...job, status: 'รอดำเนินการ' });
        localStorage.setItem('myJobs', JSON.stringify(myJobs));
        // เอา job ออกจาก dashboard (Inbox)
        this.jobs = this.jobs.filter(j => j.id !== job.id);
      }
      alert('คุณรับงานเรียบร้อยแล้ว งานจะไปอยู่ที่หน้าของฉัน');
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

.jobs-container { display: flex; flex-direction: column; gap: 15px; }

.job-card {
  background-color: #fff;
  border-radius: 15px;
  padding: 20px;
  box-shadow: 0 4px 15px rgba(0,0,0,0.1);
}

.job-card h3 { margin-top: 0; color: #007bff; }

.job-card button {
  margin-top: 10px;
  padding: 10px;
  width: 100%;
  background-color: #28a745;
  color: white;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  transition: background 0.3s;
}

.job-card button:hover { background-color: #218838; }

.empty {
  text-align: center;
  color: #777;
  font-style: italic;
}

@media (max-width: 768px) {
  .content-wrapper { margin-left: 0; padding: 15px; }
}
</style>

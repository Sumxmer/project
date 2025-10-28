<template>
  <div>
    <Navtech />
    <div class="content-wrapper">
      <header class="header">
        <h1>งานที่ได้รับมอบหมาย</h1>
        <p>รายการงานที่คุณต้องดำเนินการ</p>
      </header>

      <div v-if="jobs.length === 0" class="empty">
        ไม่มีงานในขณะนี้
      </div>

      <div v-for="job in jobs" :key="job.id" class="job-card">
        <h3>{{ job.category }}</h3>
        <p><strong>ลูกค้า:</strong> {{ job.customer }}</p>
        <p><strong>ที่อยู่:</strong> {{ job.address }}</p>
        <p><strong>สถานะ:</strong> <span :class="job.status.toLowerCase()">{{ job.status }}</span></p>
        <p><strong>วันที่แจ้งซ่อม:</strong> {{ job.date }}</p>
        <button @click="viewDetail(job.id)">ดูรายละเอียด</button>
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
        }
      ]
    }
  },
  methods: {
    viewDetail(id) {
      // ตัวอย่างนำไปหน้า JobDetail.vue
      this.$router.push(`/job-detail/${id}`);
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

/* Header */
.header {
  text-align: center;
  margin-bottom: 30px;
}

.header h1 {
  font-size: 2em;
  margin-bottom: 5px;
}

.header p {
  color: #555;
}

/* Job Card */
.job-card {
  background-color: #fff;
  border-radius: 15px;
  padding: 20px;
  margin-bottom: 20px;
  box-shadow: 0 4px 15px rgba(0,0,0,0.1);
}

.job-card h3 {
  margin-top: 0;
  color: #007bff;
}

.job-card button {
  margin-top: 10px;
  padding: 10px;
  width: 100%;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  transition: background 0.3s;
}

.job-card button:hover {
  background-color: #0056b3;
}

/* Status */
.รอดำเนินการ { color: #ff9800; font-weight: bold; }
.กำลังทำ { color: #2196f3; font-weight: bold; }
.เสร็จแล้ว { color: #4caf50; font-weight: bold; }

/* Empty */
.empty {
  text-align: center;
  color: #777;
  font-style: italic;
}

/* Responsive */
@media (max-width: 600px) {
  .content-wrapper { margin-left: 0; }
}
</style>

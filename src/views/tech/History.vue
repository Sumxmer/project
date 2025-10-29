<template>
  <div>
    <Navtech />
    <div class="content-wrapper">
      <header class="header">
        <h1>ประวัติการซ่อม</h1>
        <p>งานที่คุณทำเสร็จเรียบร้อยแล้วทั้งหมด</p>
      </header>

      <div v-if="completedJobs.length === 0" class="empty">
        ยังไม่มีงานที่ทำเสร็จ
      </div>

      <div class="jobs-container">
        <div v-for="job in completedJobs" :key="job.id" class="job-card">
          <h3>{{ job.category }}</h3>
          <p><strong>ลูกค้า:</strong> {{ job.customer }}</p>
          <p><strong>ที่อยู่:</strong> {{ job.address }}</p>
          <p><strong>สถานะ:</strong> <span class="เสร็จแล้ว">{{ job.status }}</span></p>
          <p><strong>วันที่เสร็จ:</strong> {{ job.completedDate }}</p>
          <p v-if="job.note"><strong>หมายเหตุ:</strong> {{ job.note }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Navtech from '../../components/Navtech.vue';

export default {
  name: 'History',
  components: { Navtech },
  data() {
    return {
      jobs: [
        { id: 1, category: 'ไฟฟ้า', customer: 'สมชาย ใจดี', address: 'ซอยสุขุมวิท 10', status: 'เสร็จแล้ว', completedDate: '2025-10-28', note: 'เปลี่ยนปลั๊กไฟเรียบร้อย' },
        { id: 2, category: 'แอร์', customer: 'สมหญิง แสนดี', address: 'ซอยสุขุมวิท 15', status: 'เสร็จแล้ว', completedDate: '2025-10-20' },
        { id: 3, category: 'ประปา', customer: 'สมปอง ดีมาก', address: 'ซอยสุขุมวิท 20', status: 'กำลังทำ', completedDate: '', note: '' }
      ]
    }
  },
  computed: {
    completedJobs() {
      // กรองเฉพาะงานที่เสร็จแล้ว
      return this.jobs.filter(job => job.status === 'เสร็จแล้ว');
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

.header h1 { font-size: 2em; margin-bottom: 5px; }
.header p { color: #555; }

/* Jobs container */
.jobs-container { display: flex; flex-direction: column; gap: 15px; }

/* Job Card */
.job-card {
  background-color: #fff;
  border-radius: 15px;
  padding: 20px;
  box-shadow: 0 4px 15px rgba(0,0,0,0.1);
}

.job-card h3 { margin-top: 0; color: #007bff; }

/* Status */
.เสร็จแล้ว { color: #4caf50; font-weight: bold; }

/* Empty */
.empty { text-align: center; color: #777; font-style: italic; }

/* Responsive */
@media (max-width: 768px) {
  .content-wrapper { margin-left: 0; padding: 15px; }
}
</style>

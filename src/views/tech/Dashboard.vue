    <template>
  <div>
    <Navtech />
    <div class="content-wrapper">
      <header class="header">
        <h1>แดชบอร์ดช่าง</h1>
        <p>สรุปงานและสถานะล่าสุด</p>
      </header>

      <!-- Summary -->
      <div class="summary-cards">
        <div class="card">
          <h2>งานรอดำเนินการ</h2>
          <p>{{ summary.pending }}</p>
        </div>
        <div class="card">
          <h2>งานเสร็จแล้ว</h2>
          <p>{{ summary.completed }}</p>
        </div>
      </div>

      <!-- Recent Jobs -->
      <h2>งานล่าสุด</h2>
      <div v-if="jobs.length === 0" class="empty">
        ไม่มีงานในขณะนี้
      </div>

      <div v-for="job in jobs" :key="job.id" class="job-card">
        <h3>{{ job.category }}</h3>
        <p><strong>ลูกค้า:</strong> {{ job.customer }}</p>
        <p><strong>ที่อยู่:</strong> {{ job.address }}</p>
        <p><strong>สถานะ:</strong> <span :class="job.status.toLowerCase()">{{ job.status }}</span></p>
        <p><strong>วันที่แจ้งซ่อม:</strong> {{ job.date }}</p>
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
      summary: {
        pending: 3,
        completed: 5
      },
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
          status: 'เสร็จแล้ว',
          date: '2025-10-20'
        }
      ]
    }
  }
}
</script>

<style scoped>
.content-wrapper {
  margin-left: 200px; /* เว้นพื้นที่ navbar */
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

/* Summary Cards */
.summary-cards {
  display: flex;
  gap: 20px;
  margin-bottom: 30px;
  justify-content: center;
}

.summary-cards .card {
  background-color: #fff;
  border-radius: 15px;
  padding: 20px;
  width: 150px;
  text-align: center;
  box-shadow: 0 4px 15px rgba(0,0,0,0.1);
  color: #007bff;
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

/* Status */
.รอดำเนินการ { color: #ff9800; font-weight: bold; }
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
  .summary-cards { flex-direction: column; align-items: center; }
}
</style>
